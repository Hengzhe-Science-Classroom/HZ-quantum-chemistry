// === Chapter 15: Potential Energy Surfaces ===
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch15',
    number: 15,
    title: 'Potential Energy Surfaces',
    subtitle: 'The landscape of chemistry: minima, saddle points, and reaction paths',
    sections: [
        // ========== SECTION 1: The Born-Oppenheimer Surface ==========
        {
            id: 'sec15-1-bo-surface',
            title: 'The Born-Oppenheimer Surface',
            content: `
<h2>15.1 The Born-Oppenheimer Surface</h2>

<div class="env-block intuition"><div class="env-title">Intuition — Chemistry as Landscape</div><div class="env-body">
The Born-Oppenheimer approximation separates nuclear and electronic motion. For each fixed nuclear geometry \\(\\mathbf{R}\\), we solve the electronic Schrodinger equation to get \\(E_{\\text{elec}}(\\mathbf{R})\\). Adding nuclear repulsion gives the potential energy surface (PES): a high-dimensional landscape whose valleys are stable molecules, whose mountain passes are transition states, and whose downhill paths are chemical reactions.
</div></div>

<div class="env-block definition"><div class="env-title">Definition 15.1.1 — Potential Energy Surface</div><div class="env-body">
The Born-Oppenheimer potential energy surface for electronic state \\(k\\) is the function
\\[
V_k(\\mathbf{R}) = E_{\\text{elec}}^{(k)}(\\mathbf{R}) + V_{NN}(\\mathbf{R}),
\\]
where \\(E_{\\text{elec}}^{(k)}\\) is the \\(k\\)-th electronic eigenvalue at nuclear configuration \\(\\mathbf{R}\\) and \\(V_{NN} = \\sum_{A<B} Z_A Z_B / |\\mathbf{R}_A - \\mathbf{R}_B|\\) is the nuclear repulsion energy.
</div></div>

<h3>Dimensionality</h3>

<div class="env-block proposition"><div class="env-title">Proposition 15.1.2 — Degrees of Freedom</div><div class="env-body">
For a molecule with \\(N\\) atoms:
<ul>
<li>The full configuration space has \\(3N\\) dimensions.</li>
<li>Removing 3 translations and 3 rotations (2 for linear molecules), the PES is a function of \\(3N - 6\\) internal coordinates (\\(3N - 5\\) for linear molecules).</li>
</ul>
For example: H\\(_2\\)O has \\(3(3) - 6 = 3\\) internal coordinates (two bond lengths and one angle). A 10-atom molecule has 24 internal degrees of freedom, making the PES impossible to visualize directly.
</div></div>

<div class="env-block remark"><div class="env-title">Remark — When Born-Oppenheimer Breaks Down</div><div class="env-body">
The BO approximation fails when two electronic states become degenerate or near-degenerate. At such points, the nonadiabatic coupling \\(\\langle \\Psi_k | \\nabla_{\\mathbf{R}} \\Psi_l \\rangle\\) diverges. These degeneracies form (\\(3N - 8\\))-dimensional <em>seams of intersection</em>. In the two-dimensional branching space, the intersection has a double-cone topology called a <em>conical intersection</em>. Conical intersections are central to photochemistry: they provide ultrafast (femtosecond) nonradiative decay channels.
</div></div>

<h3>Characterizing Critical Points</h3>

<div class="env-block definition"><div class="env-title">Definition 15.1.3 — Gradient and Hessian</div><div class="env-body">
The energy gradient (force vector) is:
\\[
g_i = \\frac{\\partial V}{\\partial R_i}, \\quad i = 1, \\ldots, 3N-6.
\\]
The Hessian (force constant matrix) is:
\\[
H_{ij} = \\frac{\\partial^2 V}{\\partial R_i \\partial R_j}.
\\]
A <em>stationary point</em> satisfies \\(\\mathbf{g} = \\mathbf{0}\\). The nature of the stationary point is determined by the eigenvalues of \\(\\mathbf{H}\\).
</div></div>

<div class="env-block theorem"><div class="env-title">Theorem 15.1.4 — Classification of Stationary Points</div><div class="env-body">
At a stationary point (\\(\\mathbf{g} = \\mathbf{0}\\)), the Hessian \\(\\mathbf{H}\\) is a real symmetric matrix. Let \\(n_-\\) denote the number of negative eigenvalues (the <em>index</em> of the stationary point). Then:
<ul>
<li>\\(n_- = 0\\): local minimum (stable molecular geometry).</li>
<li>\\(n_- = 1\\): first-order saddle point (transition state).</li>
<li>\\(n_- = k > 1\\): \\(k\\)-th order saddle point (generally not chemically relevant).</li>
</ul>
</div></div>

<div class="viz-placeholder" data-viz="viz-pes-2d"></div>

<div class="env-block example"><div class="env-title">Example 15.1.5 — PES of H\\(_3\\)</div><div class="env-body">
The H + H\\(_2\\) \\(\\to\\) H\\(_2\\) + H reaction has a 3-dimensional PES (3 atoms, \\(3(3)-6=3\\) internal coordinates). For the collinear geometry \\(\\text{H}_A\\text{--H}_B\\text{--H}_C\\), the PES reduces to 2D: \\(V(R_{AB}, R_{BC})\\). The PES has:
<ul>
<li>Two equivalent minima (reactant H\\(_A\\) + H\\(_B\\)H\\(_C\\) and product H\\(_A\\)H\\(_B\\) + H\\(_C\\)).</li>
<li>A saddle point at the symmetric configuration \\(R_{AB} = R_{BC}\\) (the transition state).</li>
</ul>
The barrier height (\\(\\sim 0.42\\) eV at the MRCI level) determines the reaction rate.
</div></div>
`,
            visualizations: [
                {
                    id: 'viz-pes-2d',
                    title: 'Interactive 2D Potential Energy Surface',
                    description: 'The Muller-Brown surface, a classic model PES with three minima and two saddle points. Gradient arrows show the direction of steepest descent. Drag the point to explore the energy landscape.',
                    setup(body, controls) {
                        const viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                        const ctx = viz.ctx;
                        const W = viz.width, H = viz.height;
                        const margin = { left: 50, right: 30, top: 30, bottom: 50 };
                        const pW = W - margin.left - margin.right;
                        const pH = H - margin.top - margin.bottom;

                        // Muller-Brown potential parameters
                        const A = [-200, -100, -170, 15];
                        const a = [-1, -1, -6.5, 0.7];
                        const b = [0, 0, 11, 0.6];
                        const c = [-10, -10, -6.5, 0.7];
                        const x0 = [1, 0, -0.5, -1];
                        const y0 = [0, 0.5, 1.5, 1];

                        const xMin = -1.5, xMax = 1.2, yMin = -0.5, yMax = 2.0;

                        function V(x, y) {
                            let val = 0;
                            for (let i = 0; i < 4; i++) {
                                val += A[i] * Math.exp(
                                    a[i] * (x - x0[i]) ** 2 +
                                    b[i] * (x - x0[i]) * (y - y0[i]) +
                                    c[i] * (y - y0[i]) ** 2
                                );
                            }
                            return val;
                        }

                        function gradV(x, y) {
                            let gx = 0, gy = 0;
                            for (let i = 0; i < 4; i++) {
                                const ex = Math.exp(
                                    a[i] * (x - x0[i]) ** 2 +
                                    b[i] * (x - x0[i]) * (y - y0[i]) +
                                    c[i] * (y - y0[i]) ** 2
                                );
                                gx += A[i] * ex * (2 * a[i] * (x - x0[i]) + b[i] * (y - y0[i]));
                                gy += A[i] * ex * (b[i] * (x - x0[i]) + 2 * c[i] * (y - y0[i]));
                            }
                            return [gx, gy];
                        }

                        function toPlot(x, y) {
                            return [
                                margin.left + (x - xMin) / (xMax - xMin) * pW,
                                margin.top + (1 - (y - yMin) / (yMax - yMin)) * pH
                            ];
                        }
                        function fromPlot(px, py) {
                            return [
                                xMin + (px - margin.left) / pW * (xMax - xMin),
                                yMin + (1 - (py - margin.top) / pH) * (yMax - yMin)
                            ];
                        }

                        let probeX = 0.6, probeY = 0.0;
                        let showGrad = true;

                        VizEngine.createButton(controls, 'Toggle Gradients', () => { showGrad = !showGrad; draw(); });

                        // Drag handling
                        let dragging = false;
                        viz.canvas.addEventListener('mousedown', e => {
                            const r = viz.canvas.getBoundingClientRect();
                            const px = e.clientX - r.left, py = e.clientY - r.top;
                            const [sx, sy] = toPlot(probeX, probeY);
                            if (Math.sqrt((px - sx) ** 2 + (py - sy) ** 2) < 15) {
                                dragging = true; e.preventDefault();
                            }
                        });
                        viz.canvas.addEventListener('mousemove', e => {
                            if (!dragging) return;
                            e.preventDefault();
                            const r = viz.canvas.getBoundingClientRect();
                            const [x, y] = fromPlot(e.clientX - r.left, e.clientY - r.top);
                            probeX = Math.max(xMin, Math.min(xMax, x));
                            probeY = Math.max(yMin, Math.min(yMax, y));
                            draw();
                        });
                        viz.canvas.addEventListener('mouseup', () => { dragging = false; });
                        viz.canvas.addEventListener('mouseleave', () => { dragging = false; });

                        function draw() {
                            ctx.fillStyle = viz.colors.bg;
                            ctx.fillRect(0, 0, W, H);

                            // Compute color map
                            const res = 2;
                            const vMin = -150, vMax = 100;
                            for (let px = margin.left; px < margin.left + pW; px += res) {
                                for (let py = margin.top; py < margin.top + pH; py += res) {
                                    const [x, y] = fromPlot(px, py);
                                    let v = V(x, y);
                                    v = Math.max(vMin, Math.min(vMax, v));
                                    const t = (v - vMin) / (vMax - vMin);
                                    const r2 = Math.floor(10 + 40 * t);
                                    const g2 = Math.floor(15 + 60 * (1 - t) * t * 4);
                                    const b2 = Math.floor(50 + 180 * (1 - t));
                                    ctx.fillStyle = 'rgb(' + r2 + ',' + g2 + ',' + b2 + ')';
                                    ctx.fillRect(px, py, res, res);
                                }
                            }

                            // Contour lines
                            const levels = [-140, -120, -100, -80, -60, -40, -20, 0, 20, 50, 80];
                            ctx.strokeStyle = 'rgba(255,255,255,0.25)';
                            ctx.lineWidth = 0.8;
                            const cRes = 3;
                            for (const lev of levels) {
                                for (let px = margin.left; px < margin.left + pW - cRes; px += cRes) {
                                    for (let py = margin.top; py < margin.top + pH - cRes; py += cRes) {
                                        const [x1, y1] = fromPlot(px, py);
                                        const [x2, y2] = fromPlot(px + cRes, py);
                                        const [x3, y3] = fromPlot(px + cRes, py + cRes);
                                        const [x4, y4] = fromPlot(px, py + cRes);
                                        const v1 = V(x1, y1), v2 = V(x2, y2);
                                        const v3 = V(x3, y3), v4 = V(x4, y4);
                                        // Simple marching squares: check edges
                                        const edges = [
                                            [v1, v2, px, py, px + cRes, py],
                                            [v2, v3, px + cRes, py, px + cRes, py + cRes],
                                            [v3, v4, px + cRes, py + cRes, px, py + cRes],
                                            [v4, v1, px, py + cRes, px, py]
                                        ];
                                        const pts = [];
                                        for (const [va, vb, ax, ay, bx, by] of edges) {
                                            if ((va - lev) * (vb - lev) < 0) {
                                                const t2 = (lev - va) / (vb - va);
                                                pts.push([ax + t2 * (bx - ax), ay + t2 * (by - ay)]);
                                            }
                                        }
                                        if (pts.length >= 2) {
                                            ctx.beginPath();
                                            ctx.moveTo(pts[0][0], pts[0][1]);
                                            ctx.lineTo(pts[1][0], pts[1][1]);
                                            ctx.stroke();
                                        }
                                    }
                                }
                            }

                            // Gradient arrows
                            if (showGrad) {
                                const gStep = 0.15;
                                ctx.strokeStyle = 'rgba(255,255,255,0.3)';
                                ctx.lineWidth = 1;
                                for (let gx = xMin + 0.1; gx < xMax; gx += gStep) {
                                    for (let gy = yMin + 0.1; gy < yMax; gy += gStep) {
                                        const [dgx, dgy] = gradV(gx, gy);
                                        const glen = Math.sqrt(dgx * dgx + dgy * dgy);
                                        if (glen < 1) continue;
                                        const scale = Math.min(0.06, 8 / glen);
                                        const [sx, sy] = toPlot(gx, gy);
                                        const [ex, ey] = toPlot(gx - dgx * scale, gy - dgy * scale);
                                        ctx.beginPath();
                                        ctx.moveTo(sx, sy);
                                        ctx.lineTo(ex, ey);
                                        ctx.stroke();
                                    }
                                }
                            }

                            // Mark known stationary points
                            const minima = [[-0.558, 1.442], [0.623, 0.028], [-0.050, 0.467]];
                            const saddles = [[- 0.822, 0.624], [0.212, 0.293]];
                            for (const [mx, my] of minima) {
                                const [sx, sy] = toPlot(mx, my);
                                ctx.fillStyle = viz.colors.green;
                                ctx.beginPath(); ctx.arc(sx, sy, 5, 0, Math.PI * 2); ctx.fill();
                                ctx.fillStyle = '#fff'; ctx.font = '10px -apple-system,sans-serif';
                                ctx.textAlign = 'center'; ctx.fillText('min', sx, sy - 9);
                            }
                            for (const [sx2, sy2] of saddles) {
                                const [spx, spy] = toPlot(sx2, sy2);
                                ctx.fillStyle = viz.colors.orange;
                                ctx.beginPath(); ctx.arc(spx, spy, 5, 0, Math.PI * 2); ctx.fill();
                                ctx.fillStyle = '#fff'; ctx.font = '10px -apple-system,sans-serif';
                                ctx.textAlign = 'center'; ctx.fillText('TS', spx, spy - 9);
                            }

                            // Probe point
                            const [spx, spy] = toPlot(probeX, probeY);
                            const vProbe = V(probeX, probeY);
                            const [gpx, gpy] = gradV(probeX, probeY);
                            const gnorm = Math.sqrt(gpx * gpx + gpy * gpy);

                            // Gradient arrow at probe
                            if (gnorm > 0.5) {
                                const gs = Math.min(0.15, 30 / gnorm);
                                const [gex, gey] = toPlot(probeX - gpx * gs, probeY - gpy * gs);
                                ctx.strokeStyle = viz.colors.red;
                                ctx.lineWidth = 2.5;
                                ctx.beginPath();
                                ctx.moveTo(spx, spy);
                                ctx.lineTo(gex, gey);
                                ctx.stroke();
                                // arrowhead
                                const ang = Math.atan2(gey - spy, gex - spx);
                                ctx.fillStyle = viz.colors.red;
                                ctx.beginPath();
                                ctx.moveTo(gex, gey);
                                ctx.lineTo(gex - 8 * Math.cos(ang - 0.4), gey - 8 * Math.sin(ang - 0.4));
                                ctx.lineTo(gex - 8 * Math.cos(ang + 0.4), gey - 8 * Math.sin(ang + 0.4));
                                ctx.closePath(); ctx.fill();
                            }

                            ctx.fillStyle = viz.colors.blue;
                            ctx.beginPath(); ctx.arc(spx, spy, 7, 0, Math.PI * 2); ctx.fill();
                            ctx.fillStyle = '#ffffff44';
                            ctx.beginPath(); ctx.arc(spx - 2, spy - 2, 2, 0, Math.PI * 2); ctx.fill();

                            // Info panel
                            ctx.fillStyle = 'rgba(12,12,32,0.85)';
                            ctx.fillRect(W - 190, 8, 182, 72);
                            ctx.fillStyle = viz.colors.white; ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('x = ' + probeX.toFixed(3), W - 180, 26);
                            ctx.fillText('y = ' + probeY.toFixed(3), W - 180, 44);
                            ctx.fillStyle = viz.colors.teal;
                            ctx.fillText('V = ' + vProbe.toFixed(1), W - 180, 62);
                            ctx.fillStyle = viz.colors.red;
                            ctx.fillText('|g| = ' + gnorm.toFixed(1), W - 100, 62);

                            // Axes
                            ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.moveTo(margin.left, margin.top + pH); ctx.lineTo(margin.left + pW, margin.top + pH); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(margin.left, margin.top); ctx.lineTo(margin.left, margin.top + pH); ctx.stroke();
                            ctx.fillStyle = viz.colors.text; ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.fillText('x', margin.left + pW / 2, H - 8);
                            ctx.save(); ctx.translate(14, margin.top + pH / 2); ctx.rotate(-Math.PI / 2);
                            ctx.fillText('y', 0, 0); ctx.restore();
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'For a nonlinear molecule with \\(N\\) atoms, explain why the PES has \\(3N - 6\\) dimensions. What happens for a linear molecule?',
                    hint: 'Count the total degrees of freedom, then subtract translations and rotations.',
                    solution: 'Each atom has 3 spatial coordinates, giving \\(3N\\) total. Three describe center-of-mass translation (uniform motion, no change in internal energy). Three describe overall rotation (for nonlinear; only 2 for linear, since rotation about the molecular axis is undefined). The remaining \\(3N - 6\\) (or \\(3N - 5\\)) are internal coordinates that change the PES. For linear molecules, the rotation about the molecular axis has zero moment of inertia and is not a degree of freedom, hence \\(3N - 5\\).'
                },
                {
                    question: 'Show that a first-order saddle point has exactly one direction of negative curvature (one imaginary frequency) and all others positive.',
                    hint: 'At a stationary point, expand \\(V\\) to second order: \\(V \\approx V_0 + \\frac{1}{2}\\mathbf{q}^T \\mathbf{H} \\mathbf{q}\\) in normal mode coordinates.',
                    solution: 'At a stationary point, \\(\\mathbf{g} = 0\\), so \\(V(\\mathbf{R}_0 + \\mathbf{q}) \\approx V_0 + \\frac{1}{2}\\sum_{ij} H_{ij} q_i q_j\\). Diagonalizing \\(\\mathbf{H}\\) into normal modes: \\(V \\approx V_0 + \\frac{1}{2}\\sum_k \\lambda_k Q_k^2\\). For a first-order saddle point, exactly one eigenvalue \\(\\lambda_1 < 0\\) (the reaction coordinate) and all others \\(\\lambda_k > 0\\). The frequency is \\(\\omega_k = \\sqrt{\\lambda_k/m}\\); for \\(\\lambda_1 < 0\\), \\(\\omega_1\\) is imaginary. Moving along \\(Q_1\\) lowers the energy (like a mountain pass), while all perpendicular directions curve upward.'
                },
                {
                    question: 'Why do conical intersections occur in subspaces of dimension \\(3N - 8\\)?',
                    hint: 'Two conditions must be satisfied simultaneously for degeneracy: \\(H_{11} = H_{22}\\) and \\(H_{12} = 0\\) in a diabatic basis.',
                    solution: 'In a two-state diabatic basis, degeneracy requires: (1) \\(H_{11}(\\mathbf{R}) = H_{22}(\\mathbf{R})\\) and (2) \\(H_{12}(\\mathbf{R}) = 0\\). These are two independent conditions on the \\(3N - 6\\) internal coordinates, constraining the intersection seam to a \\((3N - 6) - 2 = 3N - 8\\) dimensional subspace. The remaining two coordinates (the "branching plane" or "g-h plane") lift the degeneracy linearly, creating the characteristic double-cone topology. For a triatomic (\\(3N-6 = 3\\)), the seam is \\(3 - 2 = 1\\) dimensional (a line).'
                },
                {
                    question: 'For the Morse potential \\(V(R) = D_e(1 - e^{-\\beta(R-R_e)})^2\\), find all stationary points and classify them.',
                    hint: 'Compute \\(dV/dR\\) and set it to zero. Then check the sign of \\(d^2V/dR^2\\) at each stationary point.',
                    solution: '\\(dV/dR = 2D_e \\beta (1 - e^{-\\beta(R-R_e)}) e^{-\\beta(R-R_e)} = 0\\). Solutions: (i) \\(e^{-\\beta(R-R_e)} = 1\\), i.e., \\(R = R_e\\); (ii) \\(e^{-\\beta(R-R_e)} = 0\\), i.e., \\(R \\to \\infty\\). At \\(R = R_e\\): \\(d^2V/dR^2 = 2D_e\\beta^2 > 0\\), so it is a minimum. As \\(R \\to \\infty\\): \\(V \\to D_e\\) and \\(dV/dR \\to 0^+\\), this is an asymptotic plateau (dissociation limit), not a true stationary point in the finite domain. There are no saddle points; the Morse potential is a 1D potential with a single minimum.'
                },
                {
                    question: 'Explain the concept of a "valley-ridge inflection point" (VRI) on a PES and why it is important for reaction dynamics.',
                    hint: 'A VRI occurs when a valley along the reaction path becomes a ridge. Consider what happens to the Hessian eigenvalues perpendicular to the path.',
                    solution: 'A VRI is a point on the PES where a Hessian eigenvalue perpendicular to the reaction path changes sign from positive (valley) to negative (ridge). At the VRI, the curvature perpendicular to the path is zero. Beyond the VRI, the path sits on a ridge and a bifurcation occurs: the system can fall off to either side into different product valleys. VRIs are important because they indicate reaction path bifurcations, where a single transition state leads to two or more products. Standard transition state theory (which assumes the reaction follows the minimum energy path) fails at VRIs; dynamic effects determine the product ratio.'
                }
            ]
        },

        // ========== SECTION 2: Geometry Optimization ==========
        {
            id: 'sec15-2-geometry-optimization',
            title: 'Geometry Optimization',
            content: `
<h2>15.2 Geometry Optimization</h2>

<div class="env-block intuition"><div class="env-title">Intuition — Finding the Bottom of the Valley</div><div class="env-body">
The equilibrium geometry of a molecule corresponds to a minimum on the PES. Finding this minimum is an optimization problem: we seek the nuclear coordinates \\(\\mathbf{R}^*\\) where the gradient vanishes and the Hessian is positive definite. Since ab initio calculations are expensive, we need efficient algorithms that converge in few steps.
</div></div>

<h3>Steepest Descent</h3>

<div class="env-block definition"><div class="env-title">Definition 15.2.1 — Steepest Descent Method</div><div class="env-body">
The steepest descent update takes a step in the direction of the negative gradient:
\\[
\\mathbf{R}_{k+1} = \\mathbf{R}_k - \\alpha_k \\mathbf{g}_k,
\\]
where \\(\\mathbf{g}_k = \\nabla V(\\mathbf{R}_k)\\) and \\(\\alpha_k > 0\\) is a step size (determined by line search or a fixed value).
</div></div>

<div class="env-block warning"><div class="env-title">Warning — Steepest Descent is Slow</div><div class="env-body">
Steepest descent exhibits poor convergence for ill-conditioned problems. The iterates zigzag across narrow valleys, making only small progress toward the minimum. The convergence rate depends on the condition number \\(\\kappa = \\lambda_{\\max}/\\lambda_{\\min}\\) of the Hessian: large \\(\\kappa\\) means slow convergence. For molecular PESs, \\(\\kappa\\) can be \\(10^2\\text{--}10^4\\), making steepest descent impractical.
</div></div>

<h3>Newton-Raphson Method</h3>

<div class="env-block theorem"><div class="env-title">Theorem 15.2.2 — Newton-Raphson Update</div><div class="env-body">
The Newton-Raphson method approximates the PES locally as a quadratic and steps directly to the minimum of that quadratic:
\\[
\\mathbf{R}_{k+1} = \\mathbf{R}_k - \\mathbf{H}_k^{-1} \\mathbf{g}_k.
\\]
Near a minimum (where the quadratic approximation is accurate), Newton-Raphson converges quadratically: the error at step \\(k+1\\) is proportional to the square of the error at step \\(k\\).
</div></div>

<div class="env-block proof"><div class="env-title">Proof (Quadratic Convergence)</div><div class="env-body">
Expand \\(V(\\mathbf{R})\\) around the minimum \\(\\mathbf{R}^*\\): \\(\\mathbf{g}(\\mathbf{R}) = \\mathbf{H}^*(\\mathbf{R} - \\mathbf{R}^*) + O(|\\mathbf{R} - \\mathbf{R}^*|^2)\\). The NR step gives:
\\[
\\mathbf{R}_{k+1} - \\mathbf{R}^* = (\\mathbf{R}_k - \\mathbf{R}^*) - \\mathbf{H}_k^{-1}\\mathbf{H}^*(\\mathbf{R}_k - \\mathbf{R}^*) + O(|\\mathbf{e}_k|^2).
\\]
When \\(\\mathbf{H}_k \\approx \\mathbf{H}^*\\), the first-order term cancels, leaving \\(|\\mathbf{e}_{k+1}| = O(|\\mathbf{e}_k|^2)\\).
<div class="qed">∎</div>
</div></div>

<div class="env-block remark"><div class="env-title">Remark — Cost of the Hessian</div><div class="env-body">
The full Hessian requires \\(O((3N)^2)\\) second derivatives of the energy, which is expensive for large molecules. For HF and DFT, analytic second derivatives are available but still cost \\(\\sim 10\\times\\) more than the energy. For correlated methods (MP2, CCSD), analytic Hessians are much more costly or unavailable.
</div></div>

<h3>Quasi-Newton Methods</h3>

<div class="env-block definition"><div class="env-title">Definition 15.2.3 — Quasi-Newton Update (BFGS)</div><div class="env-body">
The Broyden-Fletcher-Goldfarb-Shanno (BFGS) method maintains an approximate Hessian \\(\\mathbf{B}_k\\) that is updated at each step using only gradient information:
\\[
\\mathbf{B}_{k+1} = \\mathbf{B}_k - \\frac{\\mathbf{B}_k \\mathbf{s}_k \\mathbf{s}_k^T \\mathbf{B}_k}{\\mathbf{s}_k^T \\mathbf{B}_k \\mathbf{s}_k} + \\frac{\\mathbf{y}_k \\mathbf{y}_k^T}{\\mathbf{y}_k^T \\mathbf{s}_k},
\\]
where \\(\\mathbf{s}_k = \\mathbf{R}_{k+1} - \\mathbf{R}_k\\) and \\(\\mathbf{y}_k = \\mathbf{g}_{k+1} - \\mathbf{g}_k\\). This maintains positive definiteness and satisfies the secant condition \\(\\mathbf{B}_{k+1}\\mathbf{s}_k = \\mathbf{y}_k\\).
</div></div>

<div class="viz-placeholder" data-viz="viz-opt-path"></div>

<div class="env-block proposition"><div class="env-title">Proposition 15.2.4 — Superlinear Convergence of BFGS</div><div class="env-body">
Under standard assumptions (smooth, strongly convex objective, Lipschitz-continuous Hessian), the BFGS method converges superlinearly:
\\[
\\lim_{k \\to \\infty} \\frac{|\\mathbf{R}_{k+1} - \\mathbf{R}^*|}{|\\mathbf{R}_k - \\mathbf{R}^*|} = 0,
\\]
even though the approximate Hessian \\(\\mathbf{B}_k\\) does not converge to the true Hessian.
</div></div>

<h3>Practical Considerations</h3>

<div class="env-block definition"><div class="env-title">Definition 15.2.5 — Redundant Internal Coordinates</div><div class="env-body">
Optimization is most efficient in internal coordinates (bond lengths, angles, dihedrals) rather than Cartesian coordinates, because:
<ul>
<li>The PES is better approximated as quadratic in internal coordinates.</li>
<li>The Hessian has a smaller condition number.</li>
<li>Translations and rotations are automatically excluded.</li>
</ul>
Redundant internal coordinates use more coordinates than \\(3N - 6\\), with constraints handled via a projection matrix. This provides a nearly diagonal initial Hessian estimate.
</div></div>

<div class="env-block example"><div class="env-title">Example 15.2.6 — Convergence Criteria</div><div class="env-body">
Typical convergence criteria in quantum chemistry programs:
<ul>
<li>Maximum force component: \\(|g_i|_{\\max} < 4.5 \\times 10^{-4}\\) a.u.</li>
<li>RMS force: \\(|\\mathbf{g}|_{\\text{rms}} < 3.0 \\times 10^{-4}\\) a.u.</li>
<li>Maximum displacement: \\(|\\Delta R_i|_{\\max} < 1.8 \\times 10^{-3}\\) a.u.</li>
<li>RMS displacement: \\(|\\Delta \\mathbf{R}|_{\\text{rms}} < 1.2 \\times 10^{-3}\\) a.u.</li>
</ul>
All four criteria must be satisfied simultaneously (e.g., Gaussian default).
</div></div>
`,
            visualizations: [
                {
                    id: 'viz-opt-path',
                    title: 'Geometry Optimization Path',
                    description: 'Watch different optimization algorithms find the minimum of a 2D surface. Steepest descent zigzags; Newton-Raphson steps directly. The Rosenbrock function \\(V = (1-x)^2 + 100(y-x^2)^2\\) provides a challenging, narrow valley.',
                    setup(body, controls) {
                        const viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                        const ctx = viz.ctx;
                        const W = viz.width, H = viz.height;
                        const margin = { left: 50, right: 20, top: 20, bottom: 50 };
                        const pW = W - margin.left - margin.right;
                        const pH = H - margin.top - margin.bottom;

                        const xMin = -2, xMax = 2, yMin = -1, yMax = 3;

                        function V(x, y) { return (1 - x) ** 2 + 100 * (y - x * x) ** 2; }
                        function gV(x, y) {
                            return [
                                -2 * (1 - x) - 400 * x * (y - x * x),
                                200 * (y - x * x)
                            ];
                        }
                        function hV(x, y) {
                            return [
                                [2 + 1200 * x * x - 400 * y, -400 * x],
                                [-400 * x, 200]
                            ];
                        }

                        function toP(x, y) {
                            return [
                                margin.left + (x - xMin) / (xMax - xMin) * pW,
                                margin.top + (1 - (y - yMin) / (yMax - yMin)) * pH
                            ];
                        }

                        let paths = [];
                        let method = 'bfgs';

                        function runSD(x0, y0, steps) {
                            const path = [[x0, y0]];
                            let x = x0, y = y0;
                            for (let i = 0; i < steps; i++) {
                                const [gx, gy] = gV(x, y);
                                const gn = Math.sqrt(gx * gx + gy * gy);
                                if (gn < 1e-6) break;
                                // Line search (simple backtracking)
                                let alpha = 0.001;
                                const dx = -gx, dy = -gy;
                                for (let j = 0; j < 20; j++) {
                                    if (V(x + alpha * dx, y + alpha * dy) < V(x, y) - 0.0001 * alpha * gn * gn) break;
                                    alpha *= 0.5;
                                }
                                x += alpha * dx;
                                y += alpha * dy;
                                path.push([x, y]);
                            }
                            return path;
                        }

                        function runNR(x0, y0, steps) {
                            const path = [[x0, y0]];
                            let x = x0, y = y0;
                            for (let i = 0; i < steps; i++) {
                                const [gx, gy] = gV(x, y);
                                const gn = Math.sqrt(gx * gx + gy * gy);
                                if (gn < 1e-6) break;
                                const h = hV(x, y);
                                const det = h[0][0] * h[1][1] - h[0][1] * h[1][0];
                                if (Math.abs(det) < 1e-12) break;
                                const dx = -(h[1][1] * gx - h[0][1] * gy) / det;
                                const dy = -(-h[1][0] * gx + h[0][0] * gy) / det;
                                // Trust region
                                const sn = Math.sqrt(dx * dx + dy * dy);
                                const maxStep = 0.5;
                                const sc = sn > maxStep ? maxStep / sn : 1;
                                x += sc * dx;
                                y += sc * dy;
                                path.push([x, y]);
                            }
                            return path;
                        }

                        function runBFGS(x0, y0, steps) {
                            const path = [[x0, y0]];
                            let x = x0, y = y0;
                            // Initial Hessian approximation = identity
                            let B = [[1, 0], [0, 1]];
                            for (let i = 0; i < steps; i++) {
                                const [gx, gy] = gV(x, y);
                                const gn = Math.sqrt(gx * gx + gy * gy);
                                if (gn < 1e-6) break;
                                // Solve B * d = -g
                                const det = B[0][0] * B[1][1] - B[0][1] * B[1][0];
                                if (Math.abs(det) < 1e-15) break;
                                const dx = -(B[1][1] * gx - B[0][1] * gy) / det;
                                const dy = -(-B[1][0] * gx + B[0][0] * gy) / det;
                                const sn = Math.sqrt(dx * dx + dy * dy);
                                const maxS = 0.3;
                                const sc = sn > maxS ? maxS / sn : 1;
                                const sx = sc * dx, sy = sc * dy;
                                const nx = x + sx, ny = y + sy;
                                const [ngx, ngy] = gV(nx, ny);
                                const yx2 = ngx - gx, yy = ngy - gy;
                                const sy2 = sx * yx2 + sy * yy;
                                if (Math.abs(sy2) > 1e-15) {
                                    // BFGS update
                                    const Bs = [B[0][0] * sx + B[0][1] * sy, B[1][0] * sx + B[1][1] * sy];
                                    const sBs = sx * Bs[0] + sy * Bs[1];
                                    for (let r = 0; r < 2; r++)
                                        for (let c2 = 0; c2 < 2; c2++) {
                                            B[r][c2] -= Bs[r] * Bs[c2] / sBs;
                                            B[r][c2] += [yx2, yy][r] * [yx2, yy][c2] / sy2;
                                        }
                                }
                                x = nx; y = ny;
                                path.push([x, y]);
                            }
                            return path;
                        }

                        function compute() {
                            const x0 = -1.5, y0 = 2.5;
                            if (method === 'sd') paths = [{ pts: runSD(x0, y0, 500), color: viz.colors.red, label: 'Steepest Descent' }];
                            else if (method === 'nr') paths = [{ pts: runNR(x0, y0, 50), color: viz.colors.green, label: 'Newton-Raphson' }];
                            else if (method === 'bfgs') paths = [{ pts: runBFGS(x0, y0, 200), color: viz.colors.blue, label: 'BFGS' }];
                            else paths = [
                                { pts: runSD(x0, y0, 500), color: viz.colors.red, label: 'SD' },
                                { pts: runNR(x0, y0, 50), color: viz.colors.green, label: 'NR' },
                                { pts: runBFGS(x0, y0, 200), color: viz.colors.blue, label: 'BFGS' }
                            ];
                        }

                        VizEngine.createButton(controls, 'Steepest Descent', () => { method = 'sd'; compute(); draw(); });
                        VizEngine.createButton(controls, 'Newton-Raphson', () => { method = 'nr'; compute(); draw(); });
                        VizEngine.createButton(controls, 'BFGS', () => { method = 'bfgs'; compute(); draw(); });
                        VizEngine.createButton(controls, 'Compare All', () => { method = 'all'; compute(); draw(); });

                        function draw() {
                            ctx.fillStyle = viz.colors.bg;
                            ctx.fillRect(0, 0, W, H);

                            // Contour plot
                            const levels = [0.5, 1, 2, 5, 10, 25, 50, 100, 200, 500, 1000];
                            // Background fill
                            const res = 3;
                            for (let px = margin.left; px < margin.left + pW; px += res) {
                                for (let py = margin.top; py < margin.top + pH; py += res) {
                                    const fx = xMin + (px - margin.left) / pW * (xMax - xMin);
                                    const fy = yMin + (1 - (py - margin.top) / pH) * (yMax - yMin);
                                    const v = V(fx, fy);
                                    const lv = Math.log10(v + 1);
                                    const t = Math.min(1, lv / 3.5);
                                    const cr = Math.floor(12 + 30 * t);
                                    const cg = Math.floor(12 + 20 * t);
                                    const cb = Math.floor(32 + 30 * (1 - t));
                                    ctx.fillStyle = 'rgb(' + cr + ',' + cg + ',' + cb + ')';
                                    ctx.fillRect(px, py, res, res);
                                }
                            }

                            // Contour lines
                            ctx.strokeStyle = 'rgba(255,255,255,0.3)';
                            ctx.lineWidth = 0.7;
                            const cRes = 4;
                            for (const lev of levels) {
                                for (let px = margin.left; px < margin.left + pW - cRes; px += cRes) {
                                    for (let py = margin.top; py < margin.top + pH - cRes; py += cRes) {
                                        const fx1 = xMin + (px - margin.left) / pW * (xMax - xMin);
                                        const fy1 = yMin + (1 - (py - margin.top) / pH) * (yMax - yMin);
                                        const fx2 = xMin + (px + cRes - margin.left) / pW * (xMax - xMin);
                                        const fy2 = yMin + (1 - (py + cRes - margin.top) / pH) * (yMax - yMin);
                                        const v1 = V(fx1, fy1), v2 = V(fx2, fy1);
                                        const v3 = V(fx2, fy2), v4 = V(fx1, fy2);
                                        const edges = [
                                            [v1, v2, px, py, px + cRes, py],
                                            [v2, v3, px + cRes, py, px + cRes, py + cRes],
                                            [v3, v4, px + cRes, py + cRes, px, py + cRes],
                                            [v4, v1, px, py + cRes, px, py]
                                        ];
                                        const pts = [];
                                        for (const [va, vb, ax, ay, bx, by] of edges) {
                                            if ((va - lev) * (vb - lev) < 0) {
                                                const t2 = (lev - va) / (vb - va);
                                                pts.push([ax + t2 * (bx - ax), ay + t2 * (by - ay)]);
                                            }
                                        }
                                        if (pts.length >= 2) {
                                            ctx.beginPath();
                                            ctx.moveTo(pts[0][0], pts[0][1]);
                                            ctx.lineTo(pts[1][0], pts[1][1]);
                                            ctx.stroke();
                                        }
                                    }
                                }
                            }

                            // Minimum marker
                            const [mx, my] = toP(1, 1);
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.beginPath(); ctx.arc(mx, my, 6, 0, Math.PI * 2); ctx.fill();
                            ctx.fillStyle = '#fff'; ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.fillText('min', mx, my - 10);

                            // Draw paths
                            let yOff = 20;
                            for (const p of paths) {
                                ctx.strokeStyle = p.color;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                for (let i = 0; i < p.pts.length; i++) {
                                    const [sx, sy] = toP(p.pts[i][0], p.pts[i][1]);
                                    if (i === 0) ctx.moveTo(sx, sy);
                                    else ctx.lineTo(sx, sy);
                                }
                                ctx.stroke();

                                // Start/end markers
                                const [s0x, s0y] = toP(p.pts[0][0], p.pts[0][1]);
                                ctx.fillStyle = p.color;
                                ctx.beginPath(); ctx.arc(s0x, s0y, 5, 0, Math.PI * 2); ctx.fill();

                                // Step dots
                                for (let i = 1; i < Math.min(p.pts.length, 100); i++) {
                                    const [dpx, dpy] = toP(p.pts[i][0], p.pts[i][1]);
                                    ctx.beginPath(); ctx.arc(dpx, dpy, 2.5, 0, Math.PI * 2); ctx.fill();
                                }

                                // Legend
                                ctx.fillStyle = p.color;
                                ctx.font = '12px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.fillText(p.label + ' (' + p.pts.length + ' steps)', 14, yOff);
                                yOff += 18;
                            }

                            // Axes
                            ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.moveTo(margin.left, margin.top + pH); ctx.lineTo(margin.left + pW, margin.top + pH); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(margin.left, margin.top); ctx.lineTo(margin.left, margin.top + pH); ctx.stroke();
                            ctx.fillStyle = viz.colors.text; ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('x', margin.left + pW / 2, H - 8);
                            ctx.fillText('f(x,y) = (1-x)\u00b2 + 100(y-x\u00b2)\u00b2', margin.left + pW / 2, H - 24);
                        }
                        compute();
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show that steepest descent with exact line search produces successive search directions that are orthogonal: \\(\\mathbf{g}_{k+1}^T \\mathbf{g}_k = 0\\).',
                    hint: 'With exact line search, \\(\\alpha_k\\) minimizes \\(\\phi(\\alpha) = V(\\mathbf{R}_k - \\alpha \\mathbf{g}_k)\\). Differentiate \\(\\phi\\) and set to zero.',
                    solution: '\\(\\phi(\\alpha) = V(\\mathbf{R}_k - \\alpha \\mathbf{g}_k)\\). At the minimum, \\(0 = \\phi^\\prime(\\alpha_k) = -\\nabla V(\\mathbf{R}_{k+1})^T \\mathbf{g}_k = -\\mathbf{g}_{k+1}^T \\mathbf{g}_k\\). Hence \\(\\mathbf{g}_{k+1} \\perp \\mathbf{g}_k\\). This explains the zigzag behavior: each step is perpendicular to the previous one, which is very inefficient in narrow valleys where we need to make progress along the valley floor.'
                },
                {
                    question: 'Verify that the BFGS update satisfies the secant condition \\(\\mathbf{B}_{k+1}\\mathbf{s}_k = \\mathbf{y}_k\\).',
                    hint: 'Multiply the BFGS formula by \\(\\mathbf{s}_k\\) and simplify.',
                    solution: '\\(\\mathbf{B}_{k+1}\\mathbf{s}_k = \\mathbf{B}_k\\mathbf{s}_k - \\frac{\\mathbf{B}_k\\mathbf{s}_k(\\mathbf{s}_k^T\\mathbf{B}_k\\mathbf{s}_k)}{\\mathbf{s}_k^T\\mathbf{B}_k\\mathbf{s}_k} + \\frac{\\mathbf{y}_k(\\mathbf{y}_k^T\\mathbf{s}_k)}{\\mathbf{y}_k^T\\mathbf{s}_k} = \\mathbf{B}_k\\mathbf{s}_k - \\mathbf{B}_k\\mathbf{s}_k + \\mathbf{y}_k = \\mathbf{y}_k\\). The first two terms cancel, leaving the secant condition satisfied.'
                },
                {
                    question: 'Why is optimization in internal coordinates (bond lengths, angles) more efficient than in Cartesian coordinates?',
                    hint: 'Consider the Hessian condition number in both coordinate systems. Also think about what the initial Hessian guess looks like.',
                    solution: 'In Cartesian coordinates, the Hessian mixes stretching, bending, and torsional modes, leading to a large condition number \\(\\kappa\\) (stretching force constants \\(\\sim 1\\) a.u. vs. torsional \\(\\sim 0.001\\) a.u., so \\(\\kappa \\sim 1000\\)). In internal coordinates, the Hessian is more nearly diagonal: each coordinate corresponds to a natural vibration mode. The initial guess (e.g., Schlegel empirical force constants) is much better in internals. Additionally, internal coordinates automatically separate out translations and rotations, reducing the dimensionality from \\(3N\\) to \\(3N - 6\\). The result: fewer optimization steps (typically 2-5x fewer).'
                },
                {
                    question: 'The Newton-Raphson method can converge to a saddle point instead of a minimum. Explain when this happens and how to prevent it.',
                    hint: 'Consider what happens if a Hessian eigenvalue is negative. The NR step follows the quadratic model.',
                    solution: 'NR steps to the stationary point of the local quadratic model. If a Hessian eigenvalue is negative, the quadratic has a saddle point, and NR will converge to it. This happens when the starting geometry is on the "wrong side" of a ridge. To prevent this, use the Rational Function Optimization (RFO) method, which shifts the Hessian eigenvalues to ensure all are positive: \\(\\mathbf{R}_{k+1} = \\mathbf{R}_k - (\\mathbf{H}_k - \\mu \\mathbf{I})^{-1}\\mathbf{g}_k\\), where \\(\\mu\\) is chosen so that \\(\\mathbf{H}_k - \\mu\\mathbf{I}\\) is positive definite. Equivalently, negative eigenvalues are reflected: \\(\\lambda_i \\to |\\lambda_i|\\).'
                },
                {
                    question: 'Estimate the number of optimization steps needed for a molecule with 50 atoms using BFGS versus steepest descent, assuming the Hessian condition number is \\(\\kappa = 500\\).',
                    hint: 'Steepest descent convergence rate is \\(O((\\kappa - 1)/(\\kappa + 1))^{2k}\\). BFGS has superlinear convergence, typically requiring \\(O(n)\\) to \\(O(n^2)\\) steps to build up Hessian information.',
                    solution: 'Steepest descent: The error reduction per step is \\(\\rho = (\\kappa - 1)/(\\kappa + 1) = 499/501 \\approx 0.996\\). To reduce the error by \\(10^{-6}\\): \\(\\rho^{2k} = 10^{-6}\\), so \\(k = 6\\ln 10/(2\\ln(1/\\rho)) \\approx 6 \\times 2.303/(2 \\times 0.004) \\approx 1730\\) steps. BFGS: With \\(3N - 6 = 144\\) internal coordinates, BFGS typically needs \\(O(n)\\) to \\(O(2n)\\) steps to build a good Hessian approximation, then converges superlinearly. Practically, ~50-150 steps. The speedup is \\(\\sim 10\\text{--}30\\times\\).'
                }
            ]
        },

        // ========== SECTION 3: Saddle Points and Transition States ==========
        {
            id: 'sec15-3-saddle-points',
            title: 'Saddle Points and Transition States',
            content: `
<h2>15.3 Saddle Points and Transition States</h2>

<div class="env-block intuition"><div class="env-title">Intuition — The Mountain Pass</div><div class="env-body">
A transition state (TS) is the highest point along the lowest-energy path connecting reactants and products. Mathematically, it is a first-order saddle point: a minimum in all directions except one (the reaction coordinate), along which it is a maximum. Finding the TS is harder than finding a minimum, because we must maximize along one direction while minimizing along all others.
</div></div>

<div class="env-block definition"><div class="env-title">Definition 15.3.1 — Transition State</div><div class="env-body">
A transition state is a first-order saddle point on the PES:
<ul>
<li>The gradient vanishes: \\(\\nabla V = \\mathbf{0}\\).</li>
<li>The Hessian has exactly one negative eigenvalue: the eigenvector corresponding to this eigenvalue defines the <em>transition vector</em> (reaction coordinate).</li>
</ul>
The transition vector typically corresponds to the bond being broken/formed.
</div></div>

<div class="env-block theorem"><div class="env-title">Theorem 15.3.2 — Transition State Theory (Eyring)</div><div class="env-body">
The thermal rate constant for a reaction passing through a single TS is:
\\[
k(T) = \\frac{k_B T}{h} \\frac{Q^{\\ddagger}}{Q_R} \\exp\\left(-\\frac{\\Delta E^{\\ddagger}}{k_B T}\\right),
\\]
where \\(Q^{\\ddagger}\\) and \\(Q_R\\) are the partition functions of the TS (excluding the reaction coordinate) and reactants, and \\(\\Delta E^{\\ddagger}\\) is the barrier height (energy difference between TS and reactants, including zero-point energy).
</div></div>

<h3>Methods for Finding Transition States</h3>

<div class="env-block definition"><div class="env-title">Definition 15.3.3 — Eigenvector Following</div><div class="env-body">
The eigenvector-following method modifies the Newton-Raphson step to converge to a saddle point:
<ul>
<li>Along the eigenvector of the lowest Hessian eigenvalue (the mode to be maximized): step <em>uphill</em>.</li>
<li>Along all other eigenvectors: step <em>downhill</em> (as in normal optimization).</li>
</ul>
Formally, if \\(\\mathbf{H} = \\sum_i \\lambda_i |\\mathbf{u}_i\\rangle\\langle\\mathbf{u}_i|\\), the step is:
\\[
\\Delta \\mathbf{R} = -\\sum_{i \\neq 1} \\frac{\\mathbf{u}_i^T \\mathbf{g}}{\\lambda_i} \\mathbf{u}_i + \\frac{\\mathbf{u}_1^T \\mathbf{g}}{|\\lambda_1|} \\mathbf{u}_1.
\\]
</div></div>

<div class="env-block definition"><div class="env-title">Definition 15.3.4 — Nudged Elastic Band (NEB)</div><div class="env-body">
NEB is a chain-of-states method for finding minimum energy paths:
<ol>
<li>Construct an initial path of \\(N\\) images (geometries) connecting reactant and product.</li>
<li>Connect adjacent images with "springs" (harmonic restraints) to maintain equal spacing.</li>
<li>Optimize each image under a modified force: the component of the true force <em>perpendicular</em> to the path, plus the spring force <em>parallel</em> to the path (the "nudging").</li>
</ol>
The highest-energy image approximates the TS. The climbing-image NEB (CI-NEB) variant drives the highest image to the exact saddle point.
</div></div>

<div class="env-block remark"><div class="env-title">Remark — Synchronous Transit Methods</div><div class="env-body">
Synchronous transit methods (LST/QST) provide initial TS guesses:
<ul>
<li><strong>Linear Synchronous Transit (LST):</strong> Interpolates linearly between reactant and product geometries; the maximum along this path is a TS guess.</li>
<li><strong>Quadratic Synchronous Transit (QST):</strong> Uses a quadratic interpolation through reactant, product, and an intermediate guess. QST2 requires only the two endpoints; QST3 requires an additional intermediate point.</li>
</ul>
These are used as starting points for eigenvector-following refinement.
</div></div>

<div class="env-block example"><div class="env-title">Example 15.3.5 — S\\(_N\\)2 Reaction</div><div class="env-body">
The S\\(_N\\)2 reaction Cl\\(^-\\) + CH\\(_3\\)Br \\(\\to\\) ClCH\\(_3\\) + Br\\(^-\\) has a transition state with \\(D_{3h}\\) symmetry (trigonal bipyramidal). The transition vector is the asymmetric C-Cl/C-Br stretch (the Cl approaching while Br leaves). The barrier height is \\(\\sim 10\\) kcal/mol in the gas phase. At the TS:
<ul>
<li>The Hessian has exactly one negative eigenvalue (imaginary frequency \\(\\sim 400i\\) cm\\(^{-1}\\)).</li>
<li>All other frequencies are real and positive.</li>
<li>The C-Cl and C-Br distances are approximately equal (~2.3 A).</li>
</ul>
</div></div>

<div class="env-block warning"><div class="env-title">Warning — Verifying Transition States</div><div class="env-body">
Finding a stationary point with one imaginary frequency is necessary but not sufficient to confirm a TS. One must also verify that:
<ol>
<li>The imaginary frequency mode corresponds to the expected reaction coordinate (animate the mode).</li>
<li>Following the transition vector in both directions leads to the expected reactant and product (via IRC calculation, Section 15.4).</li>
</ol>
It is common to find "wrong" saddle points that connect to unintended minima.
</div></div>
`,
            visualizations: [],
            exercises: [
                {
                    question: 'Explain why a transition state must have exactly one imaginary frequency, and what would it mean to find two imaginary frequencies.',
                    hint: 'Consider the physical meaning: a TS is a maximum along one coordinate and a minimum along all others. What does a second imaginary frequency imply?',
                    solution: 'A TS is a first-order saddle point: a maximum along the reaction coordinate and a minimum in all other directions. One negative Hessian eigenvalue gives one imaginary frequency (the reaction mode). Two imaginary frequencies means the structure is a second-order saddle point: it is a maximum along two independent coordinates, meaning there is a lower-energy path to both reactants and products. Such a structure is not a true TS (transition state theory requires a first-order saddle point). A second-order saddle point indicates the need to search along the second imaginary mode for a lower-energy first-order saddle point.'
                },
                {
                    question: 'Derive the Arrhenius equation \\(k = A e^{-E_a/k_BT}\\) from Eyring transition state theory.',
                    hint: 'Take the high-temperature limit where the partition functions become classical, and identify \\(E_a\\) with the barrier height.',
                    solution: 'From Eyring: \\(k = (k_BT/h)(Q^\\ddagger/Q_R)e^{-\\Delta E^\\ddagger/k_BT}\\). For classical vibrations, \\(Q_{\\text{vib}} \\approx \\prod_i k_BT/(h\\nu_i)\\). The ratio \\(Q^\\ddagger/Q_R\\) becomes temperature-independent (a ratio of products of frequencies), giving the pre-exponential factor \\(A = (k_BT/h)\\prod_i \\nu_i^R / \\prod_j \\nu_j^\\ddagger\\). With \\(E_a = \\Delta E^\\ddagger + \\frac{1}{2}k_BT\\) (accounting for the linear \\(T\\) factor), we get \\(k \\approx A e^{-E_a/k_BT}\\). The Arrhenius activation energy is \\(E_a = -d\\ln k/d(1/k_BT) = \\Delta E^\\ddagger + \\frac{1}{2}k_BT \\approx \\Delta E^\\ddagger\\) at moderate \\(T\\).'
                },
                {
                    question: 'In eigenvector following, explain why we must step uphill along the lowest eigenvector but downhill along all others. What happens if we follow the wrong eigenvector?',
                    hint: 'The goal is to converge to a point where the gradient vanishes and the Hessian has exactly one negative eigenvalue.',
                    solution: 'At a first-order saddle point, the Hessian has one negative eigenvalue (\\(\\lambda_1 < 0\\)) and all others positive (\\(\\lambda_i > 0\\) for \\(i > 1\\)). To converge to such a point, we must: (1) maximize along the mode with \\(\\lambda_1 < 0\\) (step uphill, against the gradient component), and (2) minimize along all other modes (step downhill). If we follow the wrong eigenvector (e.g., mode 2 instead of mode 1), we converge to a saddle point where mode 2 has the negative eigenvalue, which may correspond to a different reaction path or a higher-order saddle point. This is why it is critical to verify the TS by checking that the imaginary mode corresponds to the expected reaction coordinate.'
                },
                {
                    question: 'A reaction has a barrier of 15 kcal/mol. Calculate the rate constant at 298 K using transition state theory, assuming the pre-exponential factor \\(k_BT/h = 6.25 \\times 10^{12}\\) s\\(^{-1}\\) and \\(Q^\\ddagger/Q_R = 1\\).',
                    hint: 'Convert kcal/mol to J/molecule and use \\(k = (k_BT/h)(Q^\\ddagger/Q_R)e^{-\\Delta E^\\ddagger/k_BT}\\).',
                    solution: '\\(\\Delta E^\\ddagger = 15 \\times 4184 / 6.022 \\times 10^{23} = 1.042 \\times 10^{-19}\\) J. \\(k_BT = 1.381 \\times 10^{-23} \\times 298 = 4.116 \\times 10^{-21}\\) J. \\(\\Delta E^\\ddagger/(k_BT) = 1.042 \\times 10^{-19}/4.116 \\times 10^{-21} = 25.31\\). \\(k = 6.25 \\times 10^{12} \\times e^{-25.31} = 6.25 \\times 10^{12} \\times 9.9 \\times 10^{-12} = 61.9\\) s\\(^{-1}\\). This corresponds to a half-life of about 11 ms, a fast reaction.'
                },
                {
                    question: 'Explain the "nudging" in the NEB method: why is it necessary to decompose forces into parallel and perpendicular components?',
                    hint: 'Without nudging, the spring forces and true forces interfere. Springs pull images toward the endpoints (corner-cutting), and true forces pull them off the path.',
                    solution: 'Without nudging, there are two problems: (1) The spring force has a perpendicular component that pulls images away from the minimum energy path toward a straight line (corner-cutting). (2) The true force has a parallel component that pushes images away from the barrier region toward the minima (sliding down). The nudging fixes this: only the perpendicular component of the true force (minimizing energy perpendicular to the path) and only the parallel component of the spring force (maintaining even spacing) are retained. This ensures images converge to the minimum energy path while staying evenly distributed along it.'
                }
            ]
        },

        // ========== SECTION 4: Intrinsic Reaction Coordinate ==========
        {
            id: 'sec15-4-irc',
            title: 'Intrinsic Reaction Coordinate',
            content: `
<h2>15.4 Intrinsic Reaction Coordinate</h2>

<div class="env-block intuition"><div class="env-title">Intuition — Tracing the Reaction Path</div><div class="env-body">
Given a transition state, we want to trace the minimum energy path (MEP) connecting it to reactants and products. The intrinsic reaction coordinate (IRC) follows the path of steepest descent from the TS in mass-weighted coordinates. It is the path a "ball" would follow if released from the TS with zero kinetic energy in a viscous medium.
</div></div>

<div class="env-block definition"><div class="env-title">Definition 15.4.1 — Intrinsic Reaction Coordinate</div><div class="env-body">
The IRC is the steepest descent path in mass-weighted coordinates, defined by the differential equation:
\\[
\\frac{d\\mathbf{q}}{ds} = -\\frac{\\mathbf{g}(\\mathbf{q})}{|\\mathbf{g}(\\mathbf{q})|},
\\]
where \\(\\mathbf{q}\\) are mass-weighted Cartesian coordinates (\\(q_i = \\sqrt{m_i} x_i\\)), \\(\\mathbf{g} = \\nabla_\\mathbf{q} V\\) is the gradient in these coordinates, and \\(s\\) is the arc length along the path.
</div></div>

<div class="env-block theorem"><div class="env-title">Theorem 15.4.2 — Properties of the IRC</div><div class="env-body">
The IRC has the following properties:
<ol>
<li>It passes through the transition state at \\(s = 0\\).</li>
<li>At every point, it is tangent to the negative gradient (steepest descent direction).</li>
<li>It is invariant under changes of coordinate system (when defined in mass-weighted coordinates).</li>
<li>It terminates at local minima (reactant for \\(s < 0\\), product for \\(s > 0\\)).</li>
<li>The energy decreases monotonically along the IRC (in both directions from the TS).</li>
</ol>
</div></div>

<div class="viz-placeholder" data-viz="viz-irc-path"></div>

<h3>Algorithms for IRC Following</h3>

<div class="env-block definition"><div class="env-title">Definition 15.4.3 — Gonzalez-Schlegel IRC Algorithm</div><div class="env-body">
The second-order Gonzalez-Schlegel algorithm traces the IRC by:
<ol>
<li>Take a constrained step of size \\(\\Delta s\\) along the gradient direction.</li>
<li>Find the point on a hypersphere of radius \\(\\Delta s\\) centered at the current point that has zero gradient perpendicular to the path.</li>
</ol>
The constraint (fixed arc length \\(\\Delta s\\)) prevents the path from overshooting and ensures even spacing of points along the IRC.
</div></div>

<h3>The Hammond Postulate</h3>

<div class="env-block theorem"><div class="env-title">Theorem 15.4.4 — Hammond Postulate (Qualitative)</div><div class="env-body">
For an exothermic reaction (\\(\\Delta E < 0\\)), the transition state geometry resembles the reactant more than the product. For an endothermic reaction (\\(\\Delta E > 0\\)), the TS resembles the product. Formally:
<ul>
<li>If \\(\\Delta E < 0\\): \\(s^{\\ddagger}\\) (the IRC arc length from reactant to TS) is short relative to the total path length.</li>
<li>If \\(\\Delta E > 0\\): \\(s^{\\ddagger}\\) is long (the TS is closer to the product side).</li>
</ul>
This is a consequence of the principle that a TS with lower energy tends to be closer in structure to the nearest minimum.
</div></div>

<div class="env-block remark"><div class="env-title">Remark — Limitations of the IRC</div><div class="env-body">
The IRC is a zero-temperature, zero-kinetic-energy path. Real reactions at finite temperature may deviate significantly:
<ul>
<li><strong>Tunneling:</strong> Hydrogen transfer reactions often proceed through the barrier rather than over it.</li>
<li><strong>Dynamical effects:</strong> Momentum can carry the system over intermediate barriers (non-IRC dynamics).</li>
<li><strong>Bifurcations:</strong> At valley-ridge inflection points, the steepest descent path bifurcates, and dynamics determines which product forms.</li>
</ul>
Ab initio molecular dynamics (Section 15.5) captures these effects.
</div></div>

<div class="env-block example"><div class="env-title">Example 15.4.5 — IRC of the Diels-Alder Reaction</div><div class="env-body">
The Diels-Alder reaction between butadiene and ethylene forms cyclohexene through a concerted [4+2] cycloaddition. The IRC shows:
<ul>
<li>At \\(s = 0\\) (TS): Both new C-C bonds are partially formed (~2.2 A each, symmetric).</li>
<li>For \\(s < 0\\) (toward reactants): The C-C distances increase symmetrically as the fragments separate.</li>
<li>For \\(s > 0\\) (toward product): Both bonds shorten simultaneously to the final ~1.54 A.</li>
</ul>
The symmetric IRC confirms the synchronous (concerted) mechanism. An asymmetric IRC would indicate a stepwise mechanism.
</div></div>
`,
            visualizations: [
                {
                    id: 'viz-irc-path',
                    title: 'IRC Path on a 2D Surface',
                    description: 'The steepest descent path from a transition state to reactant and product minima. The blue curve shows the IRC; arrows indicate the gradient direction at each point. The reaction coordinate \\(s\\) parametrizes the path.',
                    setup(body, controls) {
                        const viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                        const ctx = viz.ctx;
                        const W = viz.width, H = viz.height;
                        const margin = { left: 50, right: 30, top: 30, bottom: 50 };
                        const pW = W - margin.left - margin.right;
                        const pH = H - margin.top - margin.bottom;

                        // Simple double-well potential: V = (x^2 - 1)^2 + 2*y^2 + 0.5*x*y
                        const xMin = -2, xMax = 2, yMin = -1.5, yMax = 1.5;

                        function V(x, y) {
                            return (x * x - 1) * (x * x - 1) + 2 * y * y + 0.3 * x * y;
                        }
                        function gV(x, y) {
                            return [
                                4 * x * (x * x - 1) + 0.3 * y,
                                4 * y + 0.3 * x
                            ];
                        }

                        function toP(x, y) {
                            return [
                                margin.left + (x - xMin) / (xMax - xMin) * pW,
                                margin.top + (1 - (y - yMin) / (yMax - yMin)) * pH
                            ];
                        }

                        // Trace IRC from saddle point at (0, 0)
                        function traceIRC(startX, startY, dirX, dirY, steps, ds) {
                            const path = [];
                            let x = startX + dirX * ds;
                            let y = startY + dirY * ds;
                            path.push([x, y]);
                            for (let i = 0; i < steps; i++) {
                                const [gx, gy] = gV(x, y);
                                const gn = Math.sqrt(gx * gx + gy * gy);
                                if (gn < 1e-6) break;
                                x -= ds * gx / gn;
                                y -= ds * gy / gn;
                                if (x < xMin || x > xMax || y < yMin || y > yMax) break;
                                path.push([x, y]);
                            }
                            return path;
                        }

                        let showEnergy = false;
                        VizEngine.createButton(controls, 'Toggle Energy Profile', () => { showEnergy = !showEnergy; draw(); });

                        function draw() {
                            ctx.fillStyle = viz.colors.bg;
                            ctx.fillRect(0, 0, W, H);

                            if (showEnergy) {
                                // Energy along IRC
                                const ircFwd = traceIRC(0, 0, 1, 0, 200, 0.02);
                                const ircBwd = traceIRC(0, 0, -1, 0, 200, 0.02);
                                const fullPath = ircBwd.reverse().concat([[0, 0]], ircFwd);
                                // Compute arc length and energy
                                const arcE = [];
                                let cumS = 0;
                                for (let i = 0; i < fullPath.length; i++) {
                                    if (i > 0) {
                                        const dx = fullPath[i][0] - fullPath[i - 1][0];
                                        const dy = fullPath[i][1] - fullPath[i - 1][1];
                                        cumS += Math.sqrt(dx * dx + dy * dy);
                                    }
                                    arcE.push([cumS, V(fullPath[i][0], fullPath[i][1])]);
                                }
                                // Normalize s to [-sMax, sMax]
                                const tsIdx = ircBwd.length; // index of TS
                                const sTS = arcE[tsIdx][0];
                                const sMax = Math.max(sTS, arcE[arcE.length - 1][0] - sTS);

                                // Plot E vs s
                                const eMin = -0.2, eMax = 1.2;
                                const sRange = arcE[arcE.length - 1][0];

                                ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1;
                                ctx.beginPath(); ctx.moveTo(margin.left, margin.top + pH); ctx.lineTo(margin.left + pW, margin.top + pH); ctx.stroke();
                                ctx.beginPath(); ctx.moveTo(margin.left, margin.top); ctx.lineTo(margin.left, margin.top + pH); ctx.stroke();

                                ctx.strokeStyle = viz.colors.teal; ctx.lineWidth = 2.5;
                                ctx.beginPath();
                                for (let i = 0; i < arcE.length; i++) {
                                    const px = margin.left + (arcE[i][0] / sRange) * pW;
                                    const py = margin.top + (1 - (arcE[i][1] - eMin) / (eMax - eMin)) * pH;
                                    if (i === 0) ctx.moveTo(px, py);
                                    else ctx.lineTo(px, py);
                                }
                                ctx.stroke();

                                // Mark TS
                                const tsPx = margin.left + (arcE[tsIdx][0] / sRange) * pW;
                                const tsPy = margin.top + (1 - (arcE[tsIdx][1] - eMin) / (eMax - eMin)) * pH;
                                ctx.fillStyle = viz.colors.orange;
                                ctx.beginPath(); ctx.arc(tsPx, tsPy, 6, 0, Math.PI * 2); ctx.fill();
                                ctx.fillStyle = viz.colors.orange; ctx.font = '12px -apple-system,sans-serif';
                                ctx.textAlign = 'center'; ctx.fillText('TS', tsPx, tsPy - 12);

                                // Mark minima
                                const rPx = margin.left + (arcE[0][0] / sRange) * pW;
                                const rPy = margin.top + (1 - (arcE[0][1] - eMin) / (eMax - eMin)) * pH;
                                ctx.fillStyle = viz.colors.green;
                                ctx.beginPath(); ctx.arc(rPx, rPy, 6, 0, Math.PI * 2); ctx.fill();
                                ctx.fillText('R', rPx, rPy - 12);

                                const pPx = margin.left + (arcE[arcE.length - 1][0] / sRange) * pW;
                                const pPy = margin.top + (1 - (arcE[arcE.length - 1][1] - eMin) / (eMax - eMin)) * pH;
                                ctx.fillStyle = viz.colors.green;
                                ctx.beginPath(); ctx.arc(pPx, pPy, 6, 0, Math.PI * 2); ctx.fill();
                                ctx.fillText('P', pPx, pPy - 12);

                                // Labels
                                ctx.fillStyle = viz.colors.text; ctx.font = '11px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('Reaction coordinate s', margin.left + pW / 2, H - 10);
                                ctx.save(); ctx.translate(14, margin.top + pH / 2); ctx.rotate(-Math.PI / 2);
                                ctx.fillText('E(s)', 0, 0); ctx.restore();

                                // Barrier label
                                ctx.fillStyle = viz.colors.yellow; ctx.font = '11px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.fillText('\u0394E\u2021 = ' + arcE[tsIdx][1].toFixed(3), tsPx + 10, tsPy + 4);
                                return;
                            }

                            // Contour plot
                            const res = 2;
                            const vMin2 = -0.1, vMax2 = 2.0;
                            for (let px = margin.left; px < margin.left + pW; px += res) {
                                for (let py = margin.top; py < margin.top + pH; py += res) {
                                    const fx = xMin + (px - margin.left) / pW * (xMax - xMin);
                                    const fy = yMin + (1 - (py - margin.top) / pH) * (yMax - yMin);
                                    let v = V(fx, fy);
                                    v = Math.max(vMin2, Math.min(vMax2, v));
                                    const t = (v - vMin2) / (vMax2 - vMin2);
                                    const cr = Math.floor(10 + 45 * t);
                                    const cg = Math.floor(15 + 50 * (1 - t) * t * 4);
                                    const cb = Math.floor(45 + 180 * (1 - t));
                                    ctx.fillStyle = 'rgb(' + cr + ',' + cg + ',' + cb + ')';
                                    ctx.fillRect(px, py, res, res);
                                }
                            }

                            // Contour lines
                            const levels = [0.01, 0.05, 0.1, 0.2, 0.4, 0.6, 0.8, 1.0, 1.5, 2.0];
                            ctx.strokeStyle = 'rgba(255,255,255,0.25)';
                            ctx.lineWidth = 0.7;
                            const cRes = 3;
                            for (const lev of levels) {
                                for (let px = margin.left; px < margin.left + pW - cRes; px += cRes) {
                                    for (let py = margin.top; py < margin.top + pH - cRes; py += cRes) {
                                        const fx1 = xMin + (px - margin.left) / pW * (xMax - xMin);
                                        const fy1 = yMin + (1 - (py - margin.top) / pH) * (yMax - yMin);
                                        const fx2 = xMin + (px + cRes - margin.left) / pW * (xMax - xMin);
                                        const fy2 = yMin + (1 - (py + cRes - margin.top) / pH) * (yMax - yMin);
                                        const v1 = V(fx1, fy1), v2 = V(fx2, fy1);
                                        const v3 = V(fx2, fy2), v4 = V(fx1, fy2);
                                        const edges = [
                                            [v1, v2, px, py, px + cRes, py],
                                            [v2, v3, px + cRes, py, px + cRes, py + cRes],
                                            [v3, v4, px + cRes, py + cRes, px, py + cRes],
                                            [v4, v1, px, py + cRes, px, py]
                                        ];
                                        const pts = [];
                                        for (const [va, vb, ax, ay, bx, by] of edges) {
                                            if ((va - lev) * (vb - lev) < 0) {
                                                const t2 = (lev - va) / (vb - va);
                                                pts.push([ax + t2 * (bx - ax), ay + t2 * (by - ay)]);
                                            }
                                        }
                                        if (pts.length >= 2) {
                                            ctx.beginPath();
                                            ctx.moveTo(pts[0][0], pts[0][1]);
                                            ctx.lineTo(pts[1][0], pts[1][1]);
                                            ctx.stroke();
                                        }
                                    }
                                }
                            }

                            // IRC paths
                            const ircFwd = traceIRC(0, 0, 0.5, 0, 300, 0.015);
                            const ircBwd = traceIRC(0, 0, -0.5, 0, 300, 0.015);

                            // Draw IRC forward (to product)
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            const [tsx, tsy] = toP(0, 0);
                            ctx.moveTo(tsx, tsy);
                            for (const [ix, iy] of ircFwd) {
                                const [px, py] = toP(ix, iy);
                                ctx.lineTo(px, py);
                            }
                            ctx.stroke();

                            // Draw IRC backward (to reactant)
                            ctx.beginPath();
                            ctx.moveTo(tsx, tsy);
                            for (const [ix, iy] of ircBwd) {
                                const [px, py] = toP(ix, iy);
                                ctx.lineTo(px, py);
                            }
                            ctx.stroke();

                            // Mark TS
                            ctx.fillStyle = viz.colors.orange;
                            ctx.beginPath(); ctx.arc(tsx, tsy, 7, 0, Math.PI * 2); ctx.fill();
                            ctx.fillStyle = '#fff'; ctx.font = 'bold 11px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.fillText('TS', tsx, tsy - 12);

                            // Mark minima
                            const minima = [[-1, 0.0375], [1, -0.0375]];
                            for (let mi = 0; mi < minima.length; mi++) {
                                const [mx, my] = toP(minima[mi][0], minima[mi][1]);
                                ctx.fillStyle = viz.colors.green;
                                ctx.beginPath(); ctx.arc(mx, my, 6, 0, Math.PI * 2); ctx.fill();
                                ctx.fillStyle = '#fff'; ctx.font = '11px -apple-system,sans-serif';
                                ctx.fillText(mi === 0 ? 'R' : 'P', mx, my - 10);
                            }

                            // Gradient arrows along IRC
                            ctx.strokeStyle = viz.colors.red + '88';
                            ctx.lineWidth = 1;
                            const allIRC = ircBwd.reverse().concat(ircFwd);
                            for (let i = 0; i < allIRC.length; i += 8) {
                                const [ix, iy] = allIRC[i];
                                const [gx, gy] = gV(ix, iy);
                                const gn = Math.sqrt(gx * gx + gy * gy);
                                if (gn < 0.01) continue;
                                const sc = 0.12;
                                const [a1x, a1y] = toP(ix, iy);
                                const [a2x, a2y] = toP(ix - gx * sc / gn, iy - gy * sc / gn);
                                ctx.beginPath(); ctx.moveTo(a1x, a1y); ctx.lineTo(a2x, a2y); ctx.stroke();
                            }

                            // Legend
                            ctx.fillStyle = viz.colors.blue; ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'left'; ctx.fillText('IRC path', 14, 20);
                            ctx.fillStyle = viz.colors.red + 'aa'; ctx.fillText('-\u2207V (gradient)', 14, 38);

                            // Axes
                            ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.moveTo(margin.left, margin.top + pH); ctx.lineTo(margin.left + pW, margin.top + pH); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(margin.left, margin.top); ctx.lineTo(margin.left, margin.top + pH); ctx.stroke();
                            ctx.fillStyle = viz.colors.text; ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('V = (x\u00b2-1)\u00b2 + 2y\u00b2 + 0.3xy', margin.left + pW / 2, H - 10);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show that the energy decreases monotonically along the IRC (in both directions from the TS).',
                    hint: 'Compute \\(dE/ds\\) using the chain rule and the definition of the IRC.',
                    solution: '\\(\\frac{dV}{ds} = \\nabla V \\cdot \\frac{d\\mathbf{q}}{ds} = \\mathbf{g} \\cdot \\left(-\\frac{\\mathbf{g}}{|\\mathbf{g}|}\\right) = -|\\mathbf{g}| \\leq 0\\). Since the gradient magnitude \\(|\\mathbf{g}| \\geq 0\\), the energy is non-increasing along the IRC. Equality holds only at stationary points (minima), where the IRC terminates. Thus the energy strictly decreases along the IRC until a minimum is reached.'
                },
                {
                    question: 'Why must the IRC be defined in mass-weighted coordinates rather than ordinary Cartesian coordinates? Give a physical argument.',
                    hint: 'Consider two atoms of very different mass (e.g., H and Pb) connected by a spring. Which atom moves more?',
                    solution: 'In ordinary Cartesians, the steepest descent path depends on the arbitrary choice of mass units and gives unphysical results: a light atom (H) and heavy atom (Pb) with equal force would take equal coordinate steps, but physically the light atom should move much more. Mass-weighting \\(q_i = \\sqrt{m_i}x_i\\) ensures that the path corresponds to the classical motion in the infinite-friction limit. It is coordinate-invariant and gives a physically meaningful reaction coordinate where each atom moves in proportion to the force divided by its mass. The resulting path is the one the molecule would follow at 0 K with infinitesimal kinetic energy.'
                },
                {
                    question: 'Explain the Hammond postulate in terms of the curvature of the PES. Under what conditions might it fail?',
                    hint: 'Consider the shape of the energy profile along the IRC for exothermic vs. endothermic reactions. The postulate assumes the PES is "smooth."',
                    solution: 'For an exothermic reaction, the TS lies closer in energy to the reactants. If the PES is smooth (no intermediate barriers), the TS geometry should also be closer to the reactants, since less structural change is needed to reach the (nearby) TS energy. Mathematically, if the energy profile \\(E(s)\\) is a smooth function with the TS at \\(s = 0\\), reactant at \\(s = -s_R\\), and product at \\(s = s_P\\), exothermicity (\\(E(-s_R) > E(s_P)\\)) tends to place the TS closer to \\(s_R\\). The postulate fails when: (1) there are intermediates (non-monotonic energy profile), (2) the reaction coordinate involves orthogonal motions in reactant and product regions, or (3) the PES has highly anharmonic features that break the smooth curvature assumption.'
                },
                {
                    question: 'In the Gonzalez-Schlegel algorithm, why is it important to take constrained steps on a hypersphere rather than simple Euler steps?',
                    hint: 'Consider what happens with Euler steps in a region of high curvature on the PES.',
                    solution: 'Simple Euler steps \\(\\mathbf{q}_{k+1} = \\mathbf{q}_k - \\Delta s \\cdot \\mathbf{g}/|\\mathbf{g}|\\) follow the local gradient, but in regions of high curvature the path curves significantly within one step, causing the Euler step to "cut corners" and deviate from the true IRC. The Gonzalez-Schlegel method constrains the step to lie on a hypersphere of radius \\(\\Delta s\\), then optimizes the endpoint to minimize energy perpendicular to the path. This second-order correction accounts for curvature, maintains the path on the true IRC, and allows larger step sizes (fewer expensive energy evaluations). The result is a more accurate and efficient IRC path.'
                },
                {
                    question: 'A reaction has \\(\\Delta E^\\ddagger = 20\\) kcal/mol and \\(\\Delta E_{\\text{rxn}} = -30\\) kcal/mol. Using the Marcus equation \\(\\Delta E^\\ddagger = (\\lambda + \\Delta E)^2 / (4\\lambda)\\), estimate the reorganization energy \\(\\lambda\\) and discuss whether the Hammond postulate holds.',
                    hint: 'Substitute the known values and solve the quadratic for \\(\\lambda\\).',
                    solution: '\\(20 = (\\lambda - 30)^2 / (4\\lambda) = (\\lambda^2 - 60\\lambda + 900)/(4\\lambda)\\). So \\(80\\lambda = \\lambda^2 - 60\\lambda + 900\\), i.e., \\(\\lambda^2 - 140\\lambda + 900 = 0\\). By the quadratic formula: \\(\\lambda = (140 \\pm \\sqrt{19600 - 3600})/2 = (140 \\pm 126.5)/2\\). Taking the physical solution: \\(\\lambda = 133.2\\) kcal/mol (the other root \\(\\lambda = 6.75\\) gives \\(\\Delta E^\\ddagger < 0\\), unphysical here since \\(|\\Delta E| > \\lambda\\) for that root). With \\(\\lambda = 133.2\\) and \\(\\Delta E = -30\\): the TS position is at \\(s^\\ddagger/s_{\\text{total}} \\approx (\\lambda + \\Delta E)/(2\\lambda) = 103.2/266.4 \\approx 0.39\\), confirming the Hammond postulate: the TS is closer to the reactant side (\\(<0.5\\)) for this exothermic reaction.'
                }
            ]
        },

        // ========== SECTION 5: Ab Initio Molecular Dynamics ==========
        {
            id: 'sec15-5-aimd',
            title: 'Ab Initio Molecular Dynamics',
            content: `
<h2>15.5 Ab Initio Molecular Dynamics</h2>

<div class="env-block intuition"><div class="env-title">Intuition — Beyond the Static Picture</div><div class="env-body">
The PES is a static landscape. Real chemistry involves nuclei moving on this landscape at finite temperature, with kinetic energy, momentum, and the full complexity of classical (or quantum) dynamics. Ab initio molecular dynamics (AIMD) propagates the nuclear equations of motion "on the fly," computing the electronic energy and forces at each time step from first principles.
</div></div>

<h3>Born-Oppenheimer Molecular Dynamics</h3>

<div class="env-block definition"><div class="env-title">Definition 15.5.1 — Born-Oppenheimer MD (BOMD)</div><div class="env-body">
In BOMD, the nuclei obey classical Newton's equations on the BO surface:
\\[
M_A \\ddot{\\mathbf{R}}_A(t) = -\\nabla_{\\mathbf{R}_A} E_{\\text{BO}}(\\mathbf{R}(t)),
\\]
where at each time step \\(t\\), the electronic Schrodinger equation is solved to convergence to obtain \\(E_{\\text{BO}}\\) and the forces \\(-\\nabla_{\\mathbf{R}_A} E_{\\text{BO}}\\). The time step is typically \\(\\Delta t \\approx 0.5\\text{--}1.0\\) fs.
</div></div>

<div class="env-block definition"><div class="env-title">Definition 15.5.2 — Velocity Verlet Integrator</div><div class="env-body">
The Velocity Verlet algorithm propagates positions and velocities:
\\[
\\mathbf{R}(t + \\Delta t) = \\mathbf{R}(t) + \\mathbf{v}(t)\\Delta t + \\frac{1}{2}\\mathbf{a}(t)(\\Delta t)^2,
\\]
\\[
\\mathbf{v}(t + \\Delta t) = \\mathbf{v}(t) + \\frac{1}{2}[\\mathbf{a}(t) + \\mathbf{a}(t + \\Delta t)]\\Delta t.
\\]
It is symplectic (preserves phase-space volume), time-reversible, and has \\(O((\\Delta t)^2)\\) global error in positions. These properties make it the standard integrator for MD.
</div></div>

<h3>Car-Parrinello Molecular Dynamics</h3>

<div class="env-block theorem"><div class="env-title">Theorem 15.5.3 — Car-Parrinello Lagrangian</div><div class="env-body">
The Car-Parrinello method avoids solving the electronic problem to convergence at each step by introducing a fictitious dynamics for the electronic degrees of freedom. The extended Lagrangian is:
\\[
\\mathcal{L}_{\\text{CP}} = \\frac{1}{2}\\sum_A M_A \\dot{R}_A^2 + \\frac{1}{2}\\mu \\sum_i \\langle \\dot{\\psi}_i | \\dot{\\psi}_i \\rangle - E_{\\text{KS}}[\\{\\psi_i\\}, \\{\\mathbf{R}_A\\}] + \\text{constraints},
\\]
where \\(\\mu\\) is a fictitious electron mass and the constraints enforce orbital orthonormality. The electrons "follow" the nuclei adiabatically if \\(\\mu\\) is small enough and the HOMO-LUMO gap is large enough.
</div></div>

<div class="env-block remark"><div class="env-title">Remark — CPMD vs. BOMD</div><div class="env-body">
<ul>
<li><strong>CPMD advantages:</strong> No iterative SCF convergence at each step; the electronic orbitals evolve continuously. This can be cheaper per step.</li>
<li><strong>CPMD limitations:</strong> Requires a small time step (\\(\\sim 0.1\\) fs) due to the fictitious electron dynamics. The fictitious mass \\(\\mu\\) must be chosen carefully; too large causes energy transfer between nuclear and electronic subsystems (adiabatic breakdown). Not suitable for metallic systems (zero gap).</li>
<li><strong>BOMD advantages:</strong> No fictitious dynamics; larger time steps possible. More robust for systems with small gaps.</li>
<li><strong>BOMD limitations:</strong> Requires full SCF convergence at each step; wavefunction extrapolation helps but adds complexity.</li>
</ul>
</div></div>

<h3>Thermostats and Ensembles</h3>

<div class="env-block definition"><div class="env-title">Definition 15.5.4 — Nose-Hoover Thermostat</div><div class="env-body">
To simulate the canonical (NVT) ensemble, the Nose-Hoover thermostat introduces an additional degree of freedom \\(s\\) coupled to the kinetic energy:
\\[
M_A \\ddot{\\mathbf{R}}_A = \\mathbf{F}_A - \\xi M_A \\dot{\\mathbf{R}}_A, \\qquad Q\\dot{\\xi} = \\sum_A M_A |\\dot{\\mathbf{R}}_A|^2 - gk_BT,
\\]
where \\(\\xi\\) is the thermostat variable, \\(Q\\) is the thermostat mass, and \\(g = 3N - 3\\) is the number of degrees of freedom. The friction term \\(-\\xi M_A \\dot{\\mathbf{R}}_A\\) adds or removes kinetic energy to maintain the target temperature.
</div></div>

<div class="env-block example"><div class="env-title">Example 15.5.5 — AIMD of Water</div><div class="env-body">
AIMD simulations of liquid water (typically 64-128 molecules, DFT/PBE or revPBE-D3) have revealed:
<ul>
<li>The O-H radial distribution function agrees well with neutron diffraction data.</li>
<li>The self-diffusion coefficient is sensitive to the DFT functional; GGA functionals tend to over-structure liquid water.</li>
<li>Proton transfer events (Grotthuss mechanism) can be directly observed on the ~ps timescale.</li>
<li>Dispersion corrections (D3, vdW-DF) significantly improve the density and structure.</li>
</ul>
A typical simulation: 64 H\\(_2\\)O molecules, PBE-D3, plane-wave basis (cutoff 400 eV), \\(\\Delta t = 0.5\\) fs, total 20-50 ps. Cost: thousands of CPU hours.
</div></div>

<div class="env-block example"><div class="env-title">Example 15.5.6 — Metadynamics</div><div class="env-body">
Rare events (reactions with barriers \\(\\gg k_BT\\)) are inaccessible to standard AIMD. Enhanced sampling methods overcome this:
<ul>
<li><strong>Metadynamics:</strong> Adds history-dependent Gaussian potentials along collective variables (CVs), gradually filling energy basins and pushing the system to explore new configurations. The accumulated bias potential converges to the negative of the free energy surface \\(F(\\text{CV})\\).</li>
<li><strong>Umbrella sampling:</strong> Applies harmonic restraints along the reaction coordinate in multiple windows; the weighted histogram analysis method (WHAM) reconstructs the free energy profile.</li>
<li><strong>Blue moon ensemble:</strong> Constrains the reaction coordinate and samples the constraint force to obtain \\(dF/d\\xi\\).</li>
</ul>
</div></div>

<div class="env-block warning"><div class="env-title">Warning — Nuclear Quantum Effects</div><div class="env-body">
Classical nuclear dynamics misses:
<ul>
<li><strong>Zero-point energy:</strong> The classical kinetic energy can flow entirely into one mode, violating the quantum constraint \\(E_i \\geq \\hbar\\omega_i/2\\).</li>
<li><strong>Tunneling:</strong> Proton and hydrogen transfer through barriers is unaccounted for.</li>
<li><strong>Quantized vibrations:</strong> At low temperature, high-frequency modes are frozen out quantum-mechanically but remain active classically.</li>
</ul>
Path integral MD (PIMD) accounts for these effects by replacing each nucleus with a "ring polymer" of \\(P\\) beads connected by harmonic springs, at the cost of \\(P\\times\\) more force evaluations.
</div></div>
`,
            visualizations: [],
            exercises: [
                {
                    question: 'Show that the Velocity Verlet algorithm is time-reversible: replacing \\(\\Delta t \\to -\\Delta t\\) and propagating one step returns to the original state.',
                    hint: 'Substitute \\(-\\Delta t\\) into the Verlet equations and show that \\(\\mathbf{R}(t)\\) and \\(\\mathbf{v}(t)\\) are recovered.',
                    solution: 'Starting from \\((\\mathbf{R}(t+\\Delta t), \\mathbf{v}(t+\\Delta t))\\), apply the algorithm with \\(-\\Delta t\\): \\(\\mathbf{R}^\\prime = \\mathbf{R}(t+\\Delta t) + \\mathbf{v}(t+\\Delta t)(-\\Delta t) + \\frac{1}{2}\\mathbf{a}(t+\\Delta t)(\\Delta t)^2\\). Substituting the Verlet expressions: \\(\\mathbf{R}^\\prime = [\\mathbf{R}(t) + \\mathbf{v}(t)\\Delta t + \\frac{1}{2}\\mathbf{a}(t)(\\Delta t)^2] - [\\mathbf{v}(t) + \\frac{1}{2}(\\mathbf{a}(t) + \\mathbf{a}(t+\\Delta t))\\Delta t]\\Delta t + \\frac{1}{2}\\mathbf{a}(t+\\Delta t)(\\Delta t)^2 = \\mathbf{R}(t)\\). Similarly for \\(\\mathbf{v}^\\prime = \\mathbf{v}(t)\\). Time-reversibility ensures no systematic drift in energy for conservative systems.'
                },
                {
                    question: 'In Car-Parrinello MD, explain the adiabaticity condition. What happens if the fictitious mass \\(\\mu\\) is too large?',
                    hint: 'The electronic and nuclear frequencies must be well separated: \\(\\omega_{\\text{elec}} \\gg \\omega_{\\text{nuc}}\\).',
                    solution: 'The fictitious electronic frequency scales as \\(\\omega_{\\text{elec}} \\sim \\sqrt{E_{\\text{gap}}/\\mu}\\). The nuclear frequency is \\(\\omega_{\\text{nuc}} \\sim \\sqrt{k/M}\\). Adiabaticity requires \\(\\omega_{\\text{elec}} \\gg \\omega_{\\text{nuc}}\\), i.e., \\(\\mu \\ll M \\cdot E_{\\text{gap}} / k\\). If \\(\\mu\\) is too large, the electronic and nuclear frequency spectra overlap, causing resonant energy transfer from nuclei to fictitious electronic kinetic energy. The electrons heat up, leave the BO surface, and the simulation becomes unphysical. For systems with small gaps (metals, near-degenerate states), no \\(\\mu\\) satisfies adiabaticity, and BOMD must be used instead.'
                },
                {
                    question: 'Estimate the maximum time step for BOMD of a molecule containing hydrogen atoms, given that the highest vibrational frequency is ~4000 cm\\(^{-1}\\) (O-H stretch).',
                    hint: 'The Nyquist criterion requires at least 2 samples per oscillation period. In practice, 10-20 samples per period are needed for accuracy.',
                    solution: 'Frequency: \\(\\nu = 4000\\) cm\\(^{-1}\\) \\(= 4000 \\times 3 \\times 10^{10}\\) Hz \\(= 1.2 \\times 10^{14}\\) Hz. Period: \\(T = 1/\\nu = 8.3\\) fs. Nyquist limit: \\(\\Delta t < T/2 = 4.2\\) fs. For accurate energy conservation (10-20 steps per period): \\(\\Delta t \\approx T/10 = 0.83\\) fs. In practice, \\(\\Delta t = 0.5\\text{--}1.0\\) fs is used for systems with H atoms. Deuterium substitution (\\(\\nu \\approx 2900\\) cm\\(^{-1}\\)) allows \\(\\Delta t \\approx 1.0\\text{--}1.5\\) fs. For systems without light atoms, \\(\\Delta t \\approx 2\\) fs is feasible.'
                },
                {
                    question: 'Why does the Nose-Hoover thermostat produce the correct canonical distribution, while simple velocity rescaling does not?',
                    hint: 'Velocity rescaling fixes the instantaneous kinetic energy, giving a microcanonical (constant-E) kinetic energy distribution. The canonical ensemble requires kinetic energy fluctuations.',
                    solution: 'In the canonical ensemble, the kinetic energy follows a chi-squared distribution with \\(g = 3N-3\\) degrees of freedom, with significant fluctuations: \\(\\langle (\\delta K)^2 \\rangle = \\frac{3}{2}gk_B^2T^2\\). Simple velocity rescaling forces \\(K = \\frac{g}{2}k_BT\\) exactly at each step, eliminating fluctuations and sampling the isokinetic (not canonical) ensemble. The Nose-Hoover thermostat introduces a friction variable \\(\\xi\\) that adds/removes energy dynamically, generating the correct canonical fluctuations. Nose proved that the extended system microcanonical ensemble is isomorphic to the canonical ensemble of the physical system, provided the thermostat mass \\(Q\\) is properly chosen.'
                },
                {
                    question: 'In path integral MD, explain why \\(P\\) beads are needed to represent quantum nuclear effects, and estimate \\(P\\) for water at 300 K.',
                    hint: 'Each bead samples the thermal de Broglie wavelength. The convergence condition is \\(P > \\hbar\\omega_{\\max}/(k_BT)\\).',
                    solution: 'In PIMD, each quantum nucleus is represented by a ring polymer of \\(P\\) classical beads connected by harmonic springs of frequency \\(\\omega_P = P k_BT/\\hbar\\). To resolve the quantum fluctuations of a mode with frequency \\(\\omega\\), we need \\(\\omega_P > \\omega\\), i.e., \\(P > \\hbar\\omega/(k_BT)\\). For water at 300 K: \\(k_BT = 0.026\\) eV \\(= 209\\) cm\\(^{-1}\\). The highest frequency is \\(\\omega_{\\max} \\approx 3700\\) cm\\(^{-1}\\) (O-H stretch). So \\(P > 3700/209 \\approx 18\\). In practice, \\(P = 32\\text{--}64\\) beads are used for convergence. This means PIMD is 32-64 times more expensive than classical AIMD, making it feasible only with DFT or machine-learned potentials.'
                }
            ]
        }
    ]
});
