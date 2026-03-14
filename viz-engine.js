// === VizEngine: Visualization toolkit for interactive science ===
class VizEngine {
    constructor(container, opts = {}) {
        const containerWidth = container.clientWidth ? container.clientWidth - 32 : 0;
        const defaultWidth = containerWidth > 560 ? Math.min(containerWidth, 900) : 560;
        this.width = opts.width || defaultWidth;
        this.height = opts.height || Math.round(this.width * 0.65);
        this.scale = opts.scale || 40;
        this.originX = opts.originX ?? this.width / 2;
        this.originY = opts.originY ?? this.height / 2;

        const dpr = window.devicePixelRatio || 1;
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.width * dpr;
        this.canvas.height = this.height * dpr;
        this.canvas.style.width = this.width + 'px';
        this.canvas.style.height = this.height + 'px';
        this.ctx = this.canvas.getContext('2d');
        this.ctx.scale(dpr, dpr);
        container.appendChild(this.canvas);

        this.colors = {
            bg:'#0c0c20', grid:'#1a1a40', axis:'#4a4a7a', text:'#8b949e',
            white:'#f0f6fc', blue:'#58a6ff', teal:'#3fb9a0', orange:'#f0883e',
            green:'#3fb950', purple:'#bc8cff', red:'#f85149', yellow:'#d29922', pink:'#f778ba',
            muted:'#6e7681'
        };
        this.draggables = [];
        this.animationId = null;
        this._dragBound = false;
        this.dragState = null;
    }

    toScreen(x, y) { return [this.originX + x * this.scale, this.originY - y * this.scale]; }
    toMath(sx, sy) { return [(sx - this.originX) / this.scale, (this.originY - sy) / this.scale]; }

    clear() {
        this.ctx.fillStyle = this.colors.bg;
        this.ctx.fillRect(0, 0, this.width, this.height);
    }

    drawGrid(spacing = 1) {
        const ctx = this.ctx;
        const minX = Math.floor(-this.originX / this.scale / spacing) * spacing;
        const maxX = Math.ceil((this.width - this.originX) / this.scale / spacing) * spacing;
        const minY = Math.floor(-(this.height - this.originY) / this.scale / spacing) * spacing;
        const maxY = Math.ceil(this.originY / this.scale / spacing) * spacing;
        ctx.strokeStyle = this.colors.grid; ctx.lineWidth = 0.5;
        for (let x = minX; x <= maxX; x += spacing) {
            const [sx] = this.toScreen(x, 0);
            ctx.beginPath(); ctx.moveTo(sx, 0); ctx.lineTo(sx, this.height); ctx.stroke();
        }
        for (let y = minY; y <= maxY; y += spacing) {
            const [, sy] = this.toScreen(0, y);
            ctx.beginPath(); ctx.moveTo(0, sy); ctx.lineTo(this.width, sy); ctx.stroke();
        }
    }

    drawAxes() {
        const ctx = this.ctx;
        ctx.strokeStyle = this.colors.axis; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(0, this.originY); ctx.lineTo(this.width, this.originY); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(this.originX, 0); ctx.lineTo(this.originX, this.height); ctx.stroke();
        ctx.fillStyle = this.colors.text; ctx.font = '11px -apple-system,sans-serif';
        ctx.textAlign = 'center'; ctx.textBaseline = 'top';
        const minX = Math.ceil(-this.originX / this.scale), maxX = Math.floor((this.width - this.originX) / this.scale);
        for (let x = minX; x <= maxX; x++) { if (x === 0) continue; const [sx] = this.toScreen(x, 0); ctx.fillText(x, sx, this.originY + 4); }
        ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
        const minY = Math.ceil(-(this.height - this.originY) / this.scale), maxY = Math.floor(this.originY / this.scale);
        for (let y = minY; y <= maxY; y++) { if (y === 0) continue; const [, sy] = this.toScreen(0, y); ctx.fillText(y, this.originX - 6, sy); }
    }

    drawVector(x1, y1, x2, y2, color, label, lw = 2) {
        const ctx = this.ctx;
        const [sx1, sy1] = this.toScreen(x1, y1);
        const [sx2, sy2] = this.toScreen(x2, y2);
        const dx = sx2 - sx1, dy = sy2 - sy1, len = Math.sqrt(dx * dx + dy * dy);
        if (len < 1) return;
        const angle = Math.atan2(dy, dx);
        ctx.strokeStyle = color; ctx.lineWidth = lw;
        ctx.beginPath(); ctx.moveTo(sx1, sy1); ctx.lineTo(sx2 - Math.cos(angle) * 10, sy2 - Math.sin(angle) * 10); ctx.stroke();
        ctx.fillStyle = color; ctx.beginPath();
        ctx.moveTo(sx2, sy2);
        ctx.lineTo(sx2 - 12 * Math.cos(angle - Math.PI / 6), sy2 - 12 * Math.sin(angle - Math.PI / 6));
        ctx.lineTo(sx2 - 12 * Math.cos(angle + Math.PI / 6), sy2 - 12 * Math.sin(angle + Math.PI / 6));
        ctx.closePath(); ctx.fill();
        if (label) {
            const ux = -dy / len, uy = dx / len;
            ctx.fillStyle = color; ctx.font = 'bold 14px -apple-system,sans-serif';
            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
            ctx.fillText(label, (sx1 + sx2) / 2 + ux * 16, (sy1 + sy2) / 2 + uy * 16);
        }
    }

    drawVec(x, y, color, label, lw) {
        this.drawVector(0, 0, x, y, color, label, lw);
    }

    drawPoint(x, y, color, label, r = 5) {
        const ctx = this.ctx; const [sx, sy] = this.toScreen(x, y);
        ctx.fillStyle = color; ctx.beginPath(); ctx.arc(sx, sy, r, 0, Math.PI * 2); ctx.fill();
        if (label) { ctx.fillStyle = color; ctx.font = '12px -apple-system,sans-serif'; ctx.textAlign = 'left'; ctx.textBaseline = 'bottom'; ctx.fillText(label, sx + r + 4, sy - r); }
    }

    drawLine(x1, y1, x2, y2, color, lw = 1, dashed = false) {
        const ctx = this.ctx;
        const [sx1, sy1] = this.toScreen(x1, y1), [sx2, sy2] = this.toScreen(x2, y2);
        const dx = sx2 - sx1, dy = sy2 - sy1, len = Math.sqrt(dx * dx + dy * dy);
        if (len < 0.1) return;
        const ux = dx / len, uy = dy / len, ext = Math.max(this.width, this.height) * 2;
        ctx.strokeStyle = color; ctx.lineWidth = lw;
        if (dashed) ctx.setLineDash([6, 4]);
        ctx.beginPath(); ctx.moveTo(sx1 - ux * ext, sy1 - uy * ext); ctx.lineTo(sx2 + ux * ext, sy2 + uy * ext); ctx.stroke();
        if (dashed) ctx.setLineDash([]);
    }

    drawSegment(x1, y1, x2, y2, color, lw = 1, dashed = false) {
        const ctx = this.ctx;
        const [sx1, sy1] = this.toScreen(x1, y1), [sx2, sy2] = this.toScreen(x2, y2);
        ctx.strokeStyle = color; ctx.lineWidth = lw;
        if (dashed) ctx.setLineDash([6, 4]);
        ctx.beginPath(); ctx.moveTo(sx1, sy1); ctx.lineTo(sx2, sy2); ctx.stroke();
        if (dashed) ctx.setLineDash([]);
    }

    drawPolygon(points, fill, stroke, lw = 1) {
        const ctx = this.ctx; ctx.beginPath();
        points.forEach(([x, y], i) => { const [sx, sy] = this.toScreen(x, y); i === 0 ? ctx.moveTo(sx, sy) : ctx.lineTo(sx, sy); });
        ctx.closePath();
        if (fill) { ctx.fillStyle = fill; ctx.fill(); }
        if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.stroke(); }
    }

    drawCircle(cx, cy, r, fill, stroke, lw = 1) {
        const ctx = this.ctx; const [sx, sy] = this.toScreen(cx, cy);
        ctx.beginPath(); ctx.arc(sx, sy, r * this.scale, 0, Math.PI * 2);
        if (fill) { ctx.fillStyle = fill; ctx.fill(); }
        if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.stroke(); }
    }

    drawEllipse(cx, cy, rx, ry, angle, fill, stroke) {
        const ctx = this.ctx; const [sx, sy] = this.toScreen(cx, cy);
        ctx.save(); ctx.translate(sx, sy); ctx.rotate(-angle);
        ctx.beginPath(); ctx.ellipse(0, 0, rx * this.scale, ry * this.scale, 0, 0, Math.PI * 2);
        if (fill) { ctx.fillStyle = fill; ctx.fill(); }
        if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = 1.5; ctx.stroke(); }
        ctx.restore();
    }

    drawText(text, x, y, color, size = 14, align = 'center', baseline = 'middle') {
        const ctx = this.ctx; const [sx, sy] = this.toScreen(x, y);
        ctx.fillStyle = color || this.colors.white; ctx.font = size + 'px -apple-system,sans-serif';
        ctx.textAlign = align; ctx.textBaseline = baseline; ctx.fillText(text, sx, sy);
    }

    screenText(text, px, py, color, size = 14, align = 'center', baseline = 'middle') {
        const ctx = this.ctx;
        ctx.fillStyle = color || this.colors.white; ctx.font = size + 'px -apple-system,sans-serif';
        ctx.textAlign = align; ctx.textBaseline = baseline; ctx.fillText(text, px, py);
    }

    drawFunction(f, xMin, xMax, color, lw = 2, steps = 300) {
        const ctx = this.ctx;
        ctx.strokeStyle = color; ctx.lineWidth = lw;
        ctx.beginPath();
        let started = false;
        for (let i = 0; i <= steps; i++) {
            const x = xMin + (xMax - xMin) * i / steps;
            const y = f(x);
            if (!isFinite(y) || Math.abs(y) > 1e6) { started = false; continue; }
            const [sx, sy] = this.toScreen(x, y);
            if (!started) { ctx.moveTo(sx, sy); started = true; } else { ctx.lineTo(sx, sy); }
        }
        ctx.stroke();
    }

    drawMatrix(matrix, px, py, color, cellW, cellH, fontSize) {
        const ctx = this.ctx;
        cellW = cellW || 50; cellH = cellH || 28; fontSize = fontSize || 13;
        const rows = matrix.length, cols = matrix[0].length;
        const totalW = cols * cellW, totalH = rows * cellH;
        ctx.strokeStyle = color || this.colors.white; ctx.lineWidth = 2;
        const bw = 6;
        ctx.beginPath(); ctx.moveTo(px, py - 4); ctx.lineTo(px - bw, py - 4); ctx.lineTo(px - bw, py + totalH + 4); ctx.lineTo(px, py + totalH + 4); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(px + totalW, py - 4); ctx.lineTo(px + totalW + bw, py - 4); ctx.lineTo(px + totalW + bw, py + totalH + 4); ctx.lineTo(px + totalW, py + totalH + 4); ctx.stroke();
        ctx.fillStyle = color || this.colors.white; ctx.font = fontSize + 'px -apple-system,sans-serif';
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        for (let i = 0; i < rows; i++)
            for (let j = 0; j < cols; j++) {
                const val = matrix[i][j];
                const text = Number.isInteger(val) ? val.toString() : val.toFixed(2);
                ctx.fillText(text, px + j * cellW + cellW / 2, py + i * cellH + cellH / 2);
            }
    }

    // Quantum chemistry specific: draw radial wavefunction
    drawRadialFunction(f, rMin, rMax, color, lw = 2, steps = 300) {
        const ctx = this.ctx;
        ctx.strokeStyle = color; ctx.lineWidth = lw;
        ctx.beginPath();
        let started = false;
        for (let i = 0; i <= steps; i++) {
            const r = rMin + (rMax - rMin) * i / steps;
            const y = f(r);
            if (!isFinite(y) || Math.abs(y) > 1e6) { started = false; continue; }
            const [sx, sy] = this.toScreen(r, y);
            if (!started) { ctx.moveTo(sx, sy); started = true; } else { ctx.lineTo(sx, sy); }
        }
        ctx.stroke();
    }

    // Draw energy level diagram
    drawEnergyLevel(y, xStart, xEnd, color, label, lw = 2) {
        const ctx = this.ctx;
        const [sx1, sy] = this.toScreen(xStart, y);
        const [sx2] = this.toScreen(xEnd, y);
        ctx.strokeStyle = color; ctx.lineWidth = lw;
        ctx.beginPath(); ctx.moveTo(sx1, sy); ctx.lineTo(sx2, sy); ctx.stroke();
        if (label) {
            ctx.fillStyle = color; ctx.font = '12px -apple-system,sans-serif';
            ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
            ctx.fillText(label, sx2 + 8, sy);
        }
    }

    // Draw electron (up/down arrow on energy level)
    drawElectron(x, y, up, color) {
        const ctx = this.ctx;
        const [sx, sy] = this.toScreen(x, y);
        const arrowLen = 14;
        const dir = up ? -1 : 1;
        ctx.strokeStyle = color || this.colors.blue; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(sx, sy + dir * arrowLen / 2); ctx.lineTo(sx, sy - dir * arrowLen / 2); ctx.stroke();
        ctx.fillStyle = color || this.colors.blue; ctx.beginPath();
        ctx.moveTo(sx, sy - dir * arrowLen / 2);
        ctx.lineTo(sx - 4, sy - dir * arrowLen / 2 + dir * 6);
        ctx.lineTo(sx + 4, sy - dir * arrowLen / 2 + dir * 6);
        ctx.closePath(); ctx.fill();
    }

    // Draw orbital contour (simplified 2D cross-section)
    drawOrbitalContour(cx, cy, type, scale, color) {
        const ctx = this.ctx;
        const [sx, sy] = this.toScreen(cx, cy);
        const s = scale * this.scale;
        ctx.save();
        ctx.translate(sx, sy);
        if (type === 's') {
            ctx.beginPath(); ctx.arc(0, 0, s, 0, Math.PI * 2);
            ctx.fillStyle = color + '44'; ctx.fill();
            ctx.strokeStyle = color; ctx.lineWidth = 1.5; ctx.stroke();
        } else if (type === 'px') {
            ctx.fillStyle = color + '44'; ctx.strokeStyle = color; ctx.lineWidth = 1.5;
            ctx.beginPath(); ctx.ellipse(s * 0.6, 0, s * 0.8, s * 0.5, 0, 0, Math.PI * 2);
            ctx.fill(); ctx.stroke();
            ctx.fillStyle = this.colors.red + '44'; ctx.strokeStyle = this.colors.red;
            ctx.beginPath(); ctx.ellipse(-s * 0.6, 0, s * 0.8, s * 0.5, 0, 0, Math.PI * 2);
            ctx.fill(); ctx.stroke();
        } else if (type === 'py') {
            ctx.fillStyle = color + '44'; ctx.strokeStyle = color; ctx.lineWidth = 1.5;
            ctx.beginPath(); ctx.ellipse(0, -s * 0.6, s * 0.5, s * 0.8, 0, 0, Math.PI * 2);
            ctx.fill(); ctx.stroke();
            ctx.fillStyle = this.colors.red + '44'; ctx.strokeStyle = this.colors.red;
            ctx.beginPath(); ctx.ellipse(0, s * 0.6, s * 0.5, s * 0.8, 0, 0, Math.PI * 2);
            ctx.fill(); ctx.stroke();
        } else if (type === 'pz') {
            // Same as py for 2D cross-section
            this.drawOrbitalContour(cx, cy, 'py', scale / this.scale, color);
        } else if (type === 'dxy') {
            ctx.fillStyle = color + '44'; ctx.strokeStyle = color; ctx.lineWidth = 1.5;
            for (let i = 0; i < 4; i++) {
                ctx.save(); ctx.rotate(i * Math.PI / 2 + Math.PI / 4);
                ctx.beginPath(); ctx.ellipse(s * 0.5, 0, s * 0.45, s * 0.3, 0, 0, Math.PI * 2);
                ctx.fillStyle = (i % 2 === 0) ? color + '44' : this.colors.red + '44';
                ctx.strokeStyle = (i % 2 === 0) ? color : this.colors.red;
                ctx.fill(); ctx.stroke();
                ctx.restore();
            }
        }
        ctx.restore();
    }

    addDraggable(id, x, y, color, radius = 8, onDrag) {
        const d = { id, x, y, color, radius: radius || 8, onDrag };
        this.draggables.push(d);
        if (!this._dragBound) {
            this._dragBound = true;
            const getPos = (e) => {
                const r = this.canvas.getBoundingClientRect();
                const cx = (e.touches ? e.touches[0].clientX : e.clientX) - r.left;
                const cy = (e.touches ? e.touches[0].clientY : e.clientY) - r.top;
                return this.toMath(cx, cy);
            };
            const startDrag = (e) => {
                const [wx, wy] = getPos(e);
                for (const dr of this.draggables) {
                    if (Math.sqrt((wx - dr.x) ** 2 + (wy - dr.y) ** 2) < dr.radius / this.scale * 2.5) {
                        this.dragState = dr; e.preventDefault(); break;
                    }
                }
            };
            const moveDrag = (e) => {
                if (!this.dragState) return;
                e.preventDefault();
                const [wx, wy] = getPos(e);
                this.dragState.x = wx; this.dragState.y = wy;
                if (this.dragState.onDrag) this.dragState.onDrag(wx, wy);
            };
            const endDrag = () => { this.dragState = null; };
            this.canvas.addEventListener('mousedown', startDrag);
            this.canvas.addEventListener('mousemove', moveDrag);
            this.canvas.addEventListener('mouseup', endDrag);
            this.canvas.addEventListener('mouseleave', endDrag);
            this.canvas.addEventListener('touchstart', startDrag, { passive: false });
            this.canvas.addEventListener('touchmove', moveDrag, { passive: false });
            this.canvas.addEventListener('touchend', endDrag);
        }
        return d;
    }

    drawDraggables() {
        for (const d of this.draggables) {
            const [sx, sy] = this.toScreen(d.x, d.y);
            const ctx = this.ctx;
            ctx.fillStyle = d.color + '33'; ctx.beginPath(); ctx.arc(sx, sy, d.radius + 4, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = d.color; ctx.beginPath(); ctx.arc(sx, sy, d.radius, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = '#ffffff44'; ctx.beginPath(); ctx.arc(sx - 2, sy - 2, d.radius * 0.3, 0, Math.PI * 2); ctx.fill();
        }
    }

    animate(drawFrame) {
        const loop = (t) => { drawFrame(t); this.animationId = requestAnimationFrame(loop); };
        this.animationId = requestAnimationFrame(loop);
    }

    stopAnimation() { if (this.animationId) { cancelAnimationFrame(this.animationId); this.animationId = null; } }

    static createSlider(container, label, min, max, val, step, onChange) {
        const g = document.createElement('div'); g.className = 'viz-slider-group';
        const l = document.createElement('span'); l.className = 'viz-slider-label'; l.textContent = label;
        const s = document.createElement('input'); s.type = 'range'; s.className = 'viz-slider';
        s.min = min; s.max = max; s.value = val; s.step = step || 0.1;
        const v = document.createElement('span'); v.className = 'viz-slider-value'; v.textContent = parseFloat(val).toFixed(step < 1 ? 1 : 0);
        s.addEventListener('input', () => { v.textContent = parseFloat(s.value).toFixed(step < 1 ? 1 : 0); onChange(parseFloat(s.value)); });
        g.appendChild(l); g.appendChild(s); g.appendChild(v); container.appendChild(g);
        return s;
    }

    static createButton(container, label, onClick) {
        const b = document.createElement('button');
        b.style.cssText = 'padding:4px 12px;border:1px solid #30363d;border-radius:4px;background:#1a1a40;color:#c9d1d9;font-size:0.78rem;cursor:pointer;';
        b.textContent = label; b.addEventListener('click', onClick); container.appendChild(b); return b;
    }

    // === Quantum chemistry utilities ===
    static factorial(n) { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r; }
    static laguerre(n, a, x) {
        if (n === 0) return 1;
        if (n === 1) return 1 + a - x;
        let p0 = 1, p1 = 1 + a - x;
        for (let k = 2; k <= n; k++) {
            const pk = ((2 * k - 1 + a - x) * p1 - (k - 1 + a) * p0) / k;
            p0 = p1; p1 = pk;
        }
        return p1;
    }
    static legendreP(l, m, x) {
        if (l === 0) return 1;
        if (l === 1 && m === 0) return x;
        if (l === 1 && Math.abs(m) === 1) return -Math.sqrt(1 - x * x);
        // General associated Legendre via recurrence
        let pmm = 1;
        const am = Math.abs(m);
        if (am > 0) {
            const somx2 = Math.sqrt((1 - x) * (1 + x));
            let fact = 1;
            for (let i = 1; i <= am; i++) { pmm *= -fact * somx2; fact += 2; }
        }
        if (l === am) return pmm;
        let pmmp1 = x * (2 * am + 1) * pmm;
        if (l === am + 1) return pmmp1;
        let pll = 0;
        for (let ll = am + 2; ll <= l; ll++) {
            pll = (x * (2 * ll - 1) * pmmp1 - (ll + am - 1) * pmm) / (ll - am);
            pmm = pmmp1; pmmp1 = pll;
        }
        return pll;
    }
    static hydrogenR(n, l, r) {
        const a0 = 1; // in atomic units
        const rho = 2 * r / (n * a0);
        const norm = Math.sqrt(Math.pow(2 / (n * a0), 3) * VizEngine.factorial(n - l - 1) / (2 * n * Math.pow(VizEngine.factorial(n + l), 3)));
        return norm * Math.exp(-rho / 2) * Math.pow(rho, l) * VizEngine.laguerre(n - l - 1, 2 * l + 1, rho);
    }
    static sphericalHarmonicReal(l, m, theta, phi) {
        const am = Math.abs(m);
        const norm = Math.sqrt((2 * l + 1) / (4 * Math.PI) * VizEngine.factorial(l - am) / VizEngine.factorial(l + am));
        const plm = VizEngine.legendreP(l, am, Math.cos(theta));
        if (m > 0) return norm * plm * Math.cos(m * phi) * Math.sqrt(2);
        if (m < 0) return norm * plm * Math.sin(am * phi) * Math.sqrt(2);
        return norm * plm;
    }

    static lerp(a, b, t) { return a + (b - a) * t; }
    static normalize(v) { const l = Math.sqrt(v[0]*v[0]+v[1]*v[1]); return l < 1e-10 ? [0,0] : [v[0]/l, v[1]/l]; }
    static dot(u, v) { return u[0]*v[0]+u[1]*v[1]; }
    static vecLen(v) { return Math.sqrt(v[0]*v[0]+v[1]*v[1]); }
}
window.VizEngine = VizEngine;
