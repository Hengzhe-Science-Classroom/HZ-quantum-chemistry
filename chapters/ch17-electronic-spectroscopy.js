// === Chapter 17: Electronic Spectroscopy ===
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch17',
    number: 17,
    title: 'Electronic Spectroscopy',
    subtitle: 'Excited states: CIS, TD-DFT, and beyond',
    sections: [
        // ========== SECTION 1: Electronic Transitions ==========
        {
            id: 'sec01-electronic-transitions',
            title: 'Electronic Transitions',
            content: `
<h2>17.1 Electronic Transitions</h2>

<div class="env-block intuition">
<div class="env-title">Motivation</div>
<div class="env-body">
<p>Electronic spectroscopy probes the transitions between different electronic states of a molecule. When a molecule absorbs a photon with energy matching the gap between the ground and an excited electronic state, it undergoes an electronic transition that rearranges the electron density. Understanding these transitions from first principles requires computing excited-state energies and wavefunctions, evaluating transition moments, and accounting for the coupling between electronic and nuclear (vibrational) degrees of freedom. This chapter develops the quantum chemical machinery for all of these tasks.</p>
</div>
</div>

<h3>The Born-Oppenheimer Picture of Electronic Spectra</h3>

<p>Within the Born-Oppenheimer approximation, the total molecular wavefunction is</p>

\\[
\\Psi_{\\text{total}}(\\mathbf{r}, \\mathbf{R}) = \\psi_n^{\\text{elec}}(\\mathbf{r}; \\mathbf{R}) \\cdot \\chi_{n,v}^{\\text{vib}}(\\mathbf{R})
\\]

<p>where \\(\\psi_n^{\\text{elec}}\\) is the electronic wavefunction for state \\(n\\) (parametrically dependent on nuclear coordinates \\(\\mathbf{R}\\)), and \\(\\chi_{n,v}^{\\text{vib}}\\) is the vibrational wavefunction on the \\(n\\)-th electronic PES.</p>

<p>An electronic transition involves a change in both the electronic state (\\(n \\to m\\)) and possibly the vibrational quantum numbers. The transition dipole moment governing the absorption intensity is</p>

\\[
\\boldsymbol{\\mu}_{fi} = \\langle \\Psi_f | \\hat{\\boldsymbol{\\mu}} | \\Psi_i \\rangle = \\int \\chi_f^*(\\mathbf{R}) \\left[ \\int \\psi_f^*(\\mathbf{r};\\mathbf{R}) \\, \\hat{\\boldsymbol{\\mu}}_e \\, \\psi_i(\\mathbf{r};\\mathbf{R}) \\, d\\mathbf{r} \\right] \\chi_i(\\mathbf{R}) \\, d\\mathbf{R}
\\]

<p>where \\(\\hat{\\boldsymbol{\\mu}}_e = -e \\sum_j \\mathbf{r}_j\\) is the electronic dipole moment operator.</p>

<h3>The Franck-Condon Principle</h3>

<div class="env-block theorem">
<div class="env-title">Theorem 17.1.1 (Franck-Condon Principle)</div>
<div class="env-body">
If the electronic transition dipole moment \\(\\boldsymbol{\\mu}_{fi}^{\\text{elec}}(\\mathbf{R}) = \\langle \\psi_f | \\hat{\\boldsymbol{\\mu}}_e | \\psi_i \\rangle\\) varies slowly with \\(\\mathbf{R}\\), it can be evaluated at the equilibrium geometry \\(\\mathbf{R}_0\\) and factored out of the nuclear integral (Condon approximation):
\\[
\\boldsymbol{\\mu}_{fi} \\approx \\boldsymbol{\\mu}_{fi}^{\\text{elec}}(\\mathbf{R}_0) \\cdot \\langle \\chi_f | \\chi_i \\rangle.
\\]
The absorption intensity for the vibronic transition \\((i, v_i) \\to (f, v_f)\\) is proportional to
\\[
I \\propto |\\boldsymbol{\\mu}_{fi}^{\\text{elec}}|^2 \\cdot |\\langle \\chi_{f,v_f} | \\chi_{i,v_i} \\rangle|^2
\\]
where \\(|\\langle \\chi_{f,v_f} | \\chi_{i,v_i} \\rangle|^2\\) is the <em>Franck-Condon factor</em>.
</div>
</div>

<div class="env-block remark">
<div class="env-title">Physical Interpretation</div>
<div class="env-body">
<p>The Franck-Condon principle states that electronic transitions occur "vertically" on a potential energy diagram: the nuclei do not have time to move during the (fast) electronic transition. The intensity distribution across the vibrational progression is governed by the overlap between the initial vibrational wavefunction and the final-state vibrational wavefunctions at the <em>same</em> nuclear geometry.</p>
<p>If the equilibrium geometries of the two electronic states are similar, the \\(0 \\to 0\\) transition dominates (small geometry change, large \\(\\langle 0 | 0 \\rangle\\) overlap). If the geometries differ significantly, the maximum intensity shifts to higher vibrational quanta in the final state.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-franck-condon"></div>

<h3>Selection Rules for Electronic Transitions</h3>

<div class="env-block definition">
<div class="env-title">Definition 17.1.2 (Oscillator Strength)</div>
<div class="env-body">
The dimensionless <em>oscillator strength</em> of a transition from state \\(i\\) to state \\(f\\) is
\\[
f_{if} = \\frac{2 m_e \\omega_{if}}{3 \\hbar e^2} |\\boldsymbol{\\mu}_{if}|^2
\\]
where \\(\\omega_{if} = (E_f - E_i)/\\hbar\\) is the transition frequency and \\(|\\boldsymbol{\\mu}_{if}|^2 = |\\langle f | \\hat{\\mu}_x | i \\rangle|^2 + |\\langle f | \\hat{\\mu}_y | i \\rangle|^2 + |\\langle f | \\hat{\\mu}_z | i \\rangle|^2\\). The oscillator strength satisfies the Thomas-Reiche-Kuhn sum rule: \\(\\sum_f f_{if} = N_e\\) (number of electrons).
</div>
</div>

<div class="env-block theorem">
<div class="env-title">Theorem 17.1.3 (Electronic Selection Rules)</div>
<div class="env-body">
For electric dipole transitions:
<ul>
<li><strong>Spin:</strong> \\(\\Delta S = 0\\) (spin-forbidden transitions become weakly allowed through spin-orbit coupling).</li>
<li><strong>Symmetry:</strong> The direct product \\(\\Gamma_i \\otimes \\Gamma_{\\mu} \\otimes \\Gamma_f\\) must contain the totally symmetric representation.</li>
<li><strong>Laporte rule:</strong> In centrosymmetric molecules, only \\(g \\leftrightarrow u\\) transitions are allowed (parity must change).</li>
</ul>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example 17.1.4 (Formaldehyde \\(n \\to \\pi^*\\) Transition)</div>
<div class="env-body">
<p>In formaldehyde (\\(C_{2v}\\) symmetry), the \\(n \\to \\pi^*\\) transition promotes an electron from the nonbonding oxygen lone pair (\\(b_2\\) symmetry) to the \\(\\pi^*\\) orbital (\\(b_1\\) symmetry). The excited state has symmetry \\(b_2 \\otimes b_1 = A_2\\). Since the transition moment must transform as \\(x\\) (\\(B_1\\)), \\(y\\) (\\(B_2\\)), or \\(z\\) (\\(A_1\\)), and \\(A_1 \\otimes A_2 \\neq\\) any of these, the \\(n \\to \\pi^*\\) transition is symmetry-forbidden. It appears weakly due to vibronic coupling (Herzberg-Teller effect).</p>
<p>The \\(\\pi \\to \\pi^*\\) transition, on the other hand, gives an excited state of \\(A_1\\) symmetry (\\(b_1 \\otimes b_1 = A_1\\)), and \\(A_1 \\otimes A_1 = A_1\\) contains the \\(z\\)-component of the dipole. This transition is allowed and typically much more intense.</p>
</div>
</div>

<h3>Emission: Fluorescence and Phosphorescence</h3>

<div class="env-block definition">
<div class="env-title">Definition 17.1.5 (Radiative Processes)</div>
<div class="env-body">
<ul>
<li><strong>Fluorescence:</strong> Spontaneous emission from an excited singlet state (\\(S_n \\to S_0\\)). Spin-allowed; typical lifetime \\(10^{-9}\\) to \\(10^{-7}\\) s.</li>
<li><strong>Phosphorescence:</strong> Emission from an excited triplet state (\\(T_1 \\to S_0\\)). Spin-forbidden; typical lifetime \\(10^{-3}\\) to \\(10^2\\) s.</li>
</ul>
</div>
</div>

<div class="env-block definition">
<div class="env-title">Definition 17.1.6 (Non-Radiative Processes)</div>
<div class="env-body">
<ul>
<li><strong>Internal conversion (IC):</strong> Non-radiative transition between states of the <em>same</em> spin multiplicity (e.g., \\(S_2 \\to S_1\\)). Mediated by vibronic coupling.</li>
<li><strong>Intersystem crossing (ISC):</strong> Non-radiative transition between states of <em>different</em> spin multiplicity (e.g., \\(S_1 \\to T_1\\)). Requires spin-orbit coupling.</li>
</ul>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-jablonski"></div>

<div class="env-block remark">
<div class="env-title">Kasha's Rule</div>
<div class="env-body">
<p>Kasha's rule states that fluorescence typically occurs from the lowest excited singlet state \\(S_1\\), regardless of which state was initially excited. This is because internal conversion from higher excited states (\\(S_n \\to S_1\\)) is generally much faster than radiative decay. Similarly, phosphorescence occurs from \\(T_1\\). Exceptions exist (azulene, for example, fluoresces from \\(S_2\\)).</p>
</div>
</div>

<div class="env-block proposition">
<div class="env-title">Proposition 17.1.7 (Stokes Shift)</div>
<div class="env-body">
The fluorescence emission spectrum is red-shifted relative to the absorption spectrum. The energy difference between the absorption maximum and the emission maximum is called the <em>Stokes shift</em>. It arises because:
<ol>
<li>After vertical absorption, the molecule relaxes to the equilibrium geometry of the excited state (geometry relaxation).</li>
<li>Emission occurs vertically from the excited-state minimum, landing on vibrationally excited levels of the ground state.</li>
<li>Solvent reorganization further contributes in solution.</li>
</ol>
The Stokes shift is approximately twice the reorganization energy: \\(\\Delta E_{\\text{Stokes}} \\approx 2\\lambda_{\\text{reorg}}\\).
</div>
</div>
`,
            visualizations: [
                {
                    id: 'viz-franck-condon',
                    title: 'Franck-Condon Principle and Vibrational Overlaps',
                    description: 'Observe how the geometry change between ground and excited states affects the Franck-Condon factors. Drag the slider to shift the excited-state equilibrium position. The bar chart shows the vibrational intensity distribution.',
                    setup(body, controls) {
                        const viz = new VizEngine(body, { scale: 35, originX: 180, originY: 340 });
                        let shift = 1.0; // displacement of excited state equilibrium

                        VizEngine.createSlider(controls, 'Geometry shift', 0.0, 3.0, 1.0, 0.1, v => { shift = v; draw(); });

                        // Harmonic oscillator wavefunctions (simplified)
                        function hermite(n, x) {
                            if (n === 0) return 1;
                            if (n === 1) return 2 * x;
                            let h0 = 1, h1 = 2 * x;
                            for (let i = 2; i <= n; i++) {
                                const h2 = 2 * x * h1 - 2 * (i - 1) * h0;
                                h0 = h1; h1 = h2;
                            }
                            return h1;
                        }

                        function hoWfn(n, x, x0, omega) {
                            const alpha = omega;
                            const xi = Math.sqrt(alpha) * (x - x0);
                            const norm = Math.pow(alpha / Math.PI, 0.25) / Math.sqrt(Math.pow(2, n) * factorial(n));
                            return norm * hermite(n, xi) * Math.exp(-xi * xi / 2);
                        }

                        function factorial(n) { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r; }

                        // Franck-Condon factor: overlap integral (numerical)
                        function fcFactor(v_i, v_f, x0_i, x0_f, omega) {
                            const nPts = 500;
                            const xMin = Math.min(x0_i, x0_f) - 5;
                            const xMax = Math.max(x0_i, x0_f) + 5;
                            const dx = (xMax - xMin) / nPts;
                            let sum = 0;
                            for (let i = 0; i <= nPts; i++) {
                                const x = xMin + i * dx;
                                sum += hoWfn(v_i, x, x0_i, omega) * hoWfn(v_f, x, x0_f, omega) * dx;
                            }
                            return sum * sum; // |<v_f|v_i>|^2
                        }

                        function draw() {
                            viz.clear();
                            const ctx = viz.ctx;

                            const omega_g = 1.0;
                            const omega_e = 0.9; // slightly different frequency for excited state
                            const x0_g = 0;
                            const x0_e = shift;
                            const E_gap = 5.0; // vertical gap between potentials

                            // Draw ground state potential
                            viz.drawFunction(x => 0.5 * omega_g * omega_g * (x - x0_g) * (x - x0_g), -4, 6, viz.colors.blue, 2);

                            // Draw excited state potential
                            viz.drawFunction(x => E_gap + 0.5 * omega_e * omega_e * (x - x0_e) * (x - x0_e), -4, 6, viz.colors.orange, 2);

                            // Draw energy levels on ground state
                            for (let n = 0; n < 5; n++) {
                                const en = omega_g * (n + 0.5);
                                const turn = Math.sqrt(2 * en / (omega_g * omega_g));
                                viz.drawSegment(x0_g - turn, en, x0_g + turn, en, viz.colors.blue + '66', 1);
                                if (n <= 3) viz.drawText('' + n, x0_g - turn - 0.4, en, viz.colors.text, 10);
                            }

                            // Draw energy levels on excited state
                            for (let n = 0; n < 6; n++) {
                                const en = E_gap + omega_e * (n + 0.5);
                                const turn = Math.sqrt(2 * (en - E_gap) / (omega_e * omega_e));
                                viz.drawSegment(x0_e - turn, en, x0_e + turn, en, viz.colors.orange + '66', 1);
                            }

                            // Draw vertical transition arrow from v=0 of ground state
                            const e0_g = omega_g * 0.5;
                            viz.drawSegment(x0_g, e0_g, x0_g, E_gap + 0.5 * omega_e * omega_e * (x0_g - x0_e) * (x0_g - x0_e), viz.colors.green, 2);
                            // Arrow head
                            const arrowY = E_gap + 0.5 * omega_e * omega_e * (x0_g - x0_e) * (x0_g - x0_e);
                            const sArr = viz.toScreen(x0_g, arrowY);
                            ctx.fillStyle = viz.colors.green;
                            ctx.beginPath();
                            ctx.moveTo(sArr[0], sArr[1]);
                            ctx.lineTo(sArr[0] - 5, sArr[1] + 10);
                            ctx.lineTo(sArr[0] + 5, sArr[1] + 10);
                            ctx.closePath();
                            ctx.fill();

                            viz.drawText('Absorption', x0_g + 0.6, (e0_g + arrowY) / 2, viz.colors.green, 11, 'left');

                            // Labels
                            viz.drawText('S₀', -3.5, 1, viz.colors.blue, 14);
                            viz.drawText('S₁', -3.5, E_gap + 1, viz.colors.orange, 14);

                            // Compute and display Franck-Condon factors
                            const fcFactors = [];
                            for (let vf = 0; vf < 6; vf++) {
                                fcFactors.push(fcFactor(0, vf, x0_g, x0_e, omega_g));
                            }
                            const maxFC = Math.max(...fcFactors, 0.001);

                            // Draw FC bar chart on the right side
                            const barX = viz.width - 160;
                            const barW = 18;
                            const barMaxH = 120;
                            const barY0 = viz.height - 40;

                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Franck-Condon Factors', barX + 55, barY0 - barMaxH - 15);

                            for (let vf = 0; vf < 6; vf++) {
                                const bh = (fcFactors[vf] / maxFC) * barMaxH;
                                const bx = barX + vf * (barW + 4);
                                const by = barY0 - bh;

                                // Bar
                                ctx.fillStyle = viz.colors.teal + '88';
                                ctx.fillRect(bx, by, barW, bh);
                                ctx.strokeStyle = viz.colors.teal;
                                ctx.lineWidth = 1;
                                ctx.strokeRect(bx, by, barW, bh);

                                // Label
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '9px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('0→' + vf, bx + barW / 2, barY0 + 12);
                                ctx.fillText(fcFactors[vf].toFixed(2), bx + barW / 2, by - 4);
                            }

                            // Baseline for bars
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(barX - 5, barY0);
                            ctx.lineTo(barX + 6 * (barW + 4), barY0);
                            ctx.stroke();

                            viz.screenText('Coordinate Q', viz.width / 2 - 50, viz.height - 10, viz.colors.text, 11);
                            viz.screenText('Shift = ' + shift.toFixed(1), 100, 20, viz.colors.yellow, 12);
                        }

                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-jablonski',
                    title: 'Jablonski Diagram: Photophysical Processes',
                    description: 'Interactive Jablonski diagram showing absorption, fluorescence, phosphorescence, internal conversion (IC), and intersystem crossing (ISC). Click the process buttons to highlight each pathway.',
                    setup(body, controls) {
                        const viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                        const W = viz.width;
                        const H = viz.height;
                        let highlight = 'all'; // 'abs', 'fluor', 'phos', 'ic', 'isc', 'all'

                        VizEngine.createButton(controls, 'All', () => { highlight = 'all'; draw(); });
                        VizEngine.createButton(controls, 'Absorption', () => { highlight = 'abs'; draw(); });
                        VizEngine.createButton(controls, 'Fluorescence', () => { highlight = 'fluor'; draw(); });
                        VizEngine.createButton(controls, 'IC', () => { highlight = 'ic'; draw(); });
                        VizEngine.createButton(controls, 'ISC', () => { highlight = 'isc'; draw(); });
                        VizEngine.createButton(controls, 'Phosphorescence', () => { highlight = 'phos'; draw(); });

                        function draw() {
                            const ctx = viz.ctx;
                            viz.clear();

                            // State positions (px)
                            const sCol = 120;  // singlet column x
                            const tCol = 380;  // triplet column x
                            const levelW = 100;
                            const s0y = H - 60;
                            const s1y = H - 220;
                            const s2y = H - 320;
                            const t1y = H - 190;
                            const t2y = H - 290;

                            // Vibrational sublevels
                            function drawVibLevels(x, y, n, color, alpha) {
                                ctx.strokeStyle = color + alpha;
                                ctx.lineWidth = 1;
                                for (let i = 1; i <= n; i++) {
                                    const dy = i * 15;
                                    ctx.beginPath();
                                    ctx.moveTo(x + 10, y - dy);
                                    ctx.lineTo(x + levelW - 10, y - dy);
                                    ctx.stroke();
                                }
                            }

                            const dimAlpha = (proc) => (highlight === 'all' || highlight === proc) ? 'ff' : '33';
                            const lineAlpha = (proc) => (highlight === 'all' || highlight === proc) ? 1.0 : 0.15;

                            // Draw electronic state levels
                            const drawLevel = (x, y, label, color) => {
                                ctx.strokeStyle = color;
                                ctx.lineWidth = 3;
                                ctx.beginPath();
                                ctx.moveTo(x, y);
                                ctx.lineTo(x + levelW, y);
                                ctx.stroke();
                                ctx.fillStyle = color;
                                ctx.font = 'bold 14px -apple-system,sans-serif';
                                ctx.textAlign = 'right';
                                ctx.textBaseline = 'middle';
                                ctx.fillText(label, x - 8, y);
                            };

                            // S states
                            drawLevel(sCol, s0y, 'S₀', viz.colors.blue);
                            drawLevel(sCol, s1y, 'S₁', viz.colors.blue);
                            drawLevel(sCol, s2y, 'S₂', viz.colors.blue);
                            drawVibLevels(sCol, s0y, 3, viz.colors.blue, '44');
                            drawVibLevels(sCol, s1y, 3, viz.colors.blue, '44');
                            drawVibLevels(sCol, s2y, 2, viz.colors.blue, '44');

                            // T states
                            drawLevel(tCol, t1y, 'T₁', viz.colors.red);
                            drawLevel(tCol, t2y, 'T₂', viz.colors.red);
                            drawVibLevels(tCol, t1y, 3, viz.colors.red, '44');
                            drawVibLevels(tCol, t2y, 2, viz.colors.red, '44');

                            // Column headers
                            ctx.fillStyle = viz.colors.blue;
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Singlet States', sCol + levelW / 2, 25);
                            ctx.fillStyle = viz.colors.red;
                            ctx.fillText('Triplet States', tCol + levelW / 2, 25);

                            // Helper: draw arrow
                            function drawArrow(x1, y1, x2, y2, color, lw, dashed, label, labelSide) {
                                ctx.save();
                                ctx.strokeStyle = color;
                                ctx.lineWidth = lw;
                                if (dashed) ctx.setLineDash([6, 4]);
                                ctx.beginPath();
                                ctx.moveTo(x1, y1);
                                ctx.lineTo(x2, y2);
                                ctx.stroke();
                                ctx.setLineDash([]);

                                // Arrowhead
                                const angle = Math.atan2(y2 - y1, x2 - x1);
                                ctx.fillStyle = color;
                                ctx.beginPath();
                                ctx.moveTo(x2, y2);
                                ctx.lineTo(x2 - 10 * Math.cos(angle - Math.PI / 6), y2 - 10 * Math.sin(angle - Math.PI / 6));
                                ctx.lineTo(x2 - 10 * Math.cos(angle + Math.PI / 6), y2 - 10 * Math.sin(angle + Math.PI / 6));
                                ctx.closePath();
                                ctx.fill();

                                if (label) {
                                    ctx.fillStyle = color;
                                    ctx.font = '11px -apple-system,sans-serif';
                                    ctx.textAlign = labelSide === 'right' ? 'left' : 'right';
                                    ctx.textBaseline = 'middle';
                                    const mx = (x1 + x2) / 2;
                                    const my = (y1 + y2) / 2;
                                    const offset = labelSide === 'right' ? 10 : -10;
                                    ctx.fillText(label, mx + offset, my);
                                }
                                ctx.restore();
                            }

                            // Absorption: S0 -> S1, S0 -> S2
                            const absAlpha = lineAlpha('abs');
                            ctx.globalAlpha = absAlpha;
                            drawArrow(sCol + 25, s0y - 3, sCol + 25, s2y - 30 + 3, viz.colors.purple, 2.5, false, 'Abs.', 'left');
                            drawArrow(sCol + 40, s0y - 3, sCol + 40, s1y - 30 + 3, viz.colors.purple + 'aa', 2, false, '', 'left');
                            ctx.globalAlpha = 1;

                            // Internal conversion: S2 -> S1 (wavy/dashed)
                            ctx.globalAlpha = lineAlpha('ic');
                            drawArrow(sCol + 60, s2y + 3, sCol + 60, s1y - 30 - 5, viz.colors.teal, 2, true, 'IC', 'right');
                            ctx.globalAlpha = 1;

                            // Fluorescence: S1 -> S0
                            ctx.globalAlpha = lineAlpha('fluor');
                            drawArrow(sCol + 80, s1y + 3, sCol + 80, s0y - 45 + 3, viz.colors.green, 2.5, false, 'Fluor.', 'right');
                            ctx.globalAlpha = 1;

                            // ISC: S1 -> T1 (dashed horizontal-ish)
                            ctx.globalAlpha = lineAlpha('isc');
                            drawArrow(sCol + levelW + 5, s1y - 15, tCol - 5, t1y - 15, viz.colors.yellow, 2, true, 'ISC', 'right');
                            ctx.globalAlpha = 1;

                            // Phosphorescence: T1 -> S0
                            ctx.globalAlpha = lineAlpha('phos');
                            drawArrow(tCol + 30, t1y + 3, sCol + levelW - 10, s0y - 45 + 3, viz.colors.pink, 2, true, 'Phos.', 'right');
                            ctx.globalAlpha = 1;

                            // Non-radiative relaxation within S1 (vibrational relaxation)
                            ctx.globalAlpha = lineAlpha('ic');
                            const vrX = sCol + levelW + 30;
                            ctx.fillStyle = viz.colors.text + '88';
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('Vib. relaxation', sCol + levelW + 5, s1y + 5);
                            ctx.globalAlpha = 1;

                            // Legend box
                            const legX = W - 180;
                            const legY = H - 130;
                            ctx.fillStyle = '#111133';
                            ctx.fillRect(legX - 5, legY - 5, 175, 120);
                            ctx.strokeStyle = viz.colors.muted;
                            ctx.lineWidth = 1;
                            ctx.strokeRect(legX - 5, legY - 5, 175, 120);

                            const legendItems = [
                                { color: viz.colors.purple, label: 'Absorption (fast, ~fs)', dash: false },
                                { color: viz.colors.green, label: 'Fluorescence (~ns)', dash: false },
                                { color: viz.colors.pink, label: 'Phosphorescence (~ms-s)', dash: true },
                                { color: viz.colors.teal, label: 'Internal Conversion', dash: true },
                                { color: viz.colors.yellow, label: 'Intersystem Crossing', dash: true }
                            ];

                            legendItems.forEach((item, i) => {
                                const ly = legY + 10 + i * 20;
                                ctx.strokeStyle = item.color;
                                ctx.lineWidth = 2;
                                if (item.dash) ctx.setLineDash([4, 3]);
                                ctx.beginPath();
                                ctx.moveTo(legX, ly);
                                ctx.lineTo(legX + 20, ly);
                                ctx.stroke();
                                ctx.setLineDash([]);
                                ctx.fillStyle = item.color;
                                ctx.font = '10px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.fillText(item.label, legX + 25, ly + 3);
                            });
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'A molecule absorbs at 400 nm and emits fluorescence at 450 nm. Calculate the Stokes shift in eV and in cm\\(^{-1}\\).',
                    hint: 'Convert wavelengths to wavenumbers using \\(\\tilde{\\nu} = 1/\\lambda\\) (in cm), then compute the difference.',
                    solution: '\\(\\tilde{\\nu}_{\\text{abs}} = 1/(400 \\times 10^{-7}\\text{ cm}) = 25000\\) cm\\(^{-1}\\). \\(\\tilde{\\nu}_{\\text{em}} = 1/(450 \\times 10^{-7}\\text{ cm}) = 22222\\) cm\\(^{-1}\\). Stokes shift: \\(\\Delta\\tilde{\\nu} = 25000 - 22222 = 2778\\) cm\\(^{-1}\\). In eV: \\(\\Delta E = hc \\cdot 2778 = 1.24 \\times 10^{-4} \\times 2778 = 0.344\\) eV. (Using \\(1\\) eV \\(= 8066\\) cm\\(^{-1}\\): \\(2778/8066 = 0.344\\) eV.)'
                },
                {
                    question: 'Explain why \\(n \\to \\pi^*\\) transitions typically have much smaller oscillator strengths than \\(\\pi \\to \\pi^*\\) transitions.',
                    hint: 'Consider both symmetry selection rules and the spatial overlap of the orbitals involved.',
                    solution: 'Two factors: (1) <em>Symmetry:</em> In many molecules (e.g., formaldehyde), the \\(n \\to \\pi^*\\) transition is symmetry-forbidden under the Laporte-like rules of the molecular point group, making the transition dipole moment zero to first order. It appears only through vibronic coupling (Herzberg-Teller mechanism). (2) <em>Orbital overlap:</em> The nonbonding \\(n\\) orbital (localized on the heteroatom, often in the molecular plane) and the \\(\\pi^*\\) orbital (perpendicular to the plane) have poor spatial overlap, leading to a small transition dipole even when symmetry allows the transition. Typical oscillator strengths: \\(n \\to \\pi^*\\) is \\(f \\sim 10^{-4}\\) to \\(10^{-2}\\); \\(\\pi \\to \\pi^*\\) is \\(f \\sim 0.1\\) to \\(1\\).'
                },
                {
                    question: 'Using the Franck-Condon principle, explain why the absorption spectrum of a diatomic molecule in the ground vibrational state often shows a maximum at \\(v^{\\prime} > 0\\) in the excited state.',
                    hint: 'Think about the overlap integrals \\(\\langle \\chi_{v^{\\prime}}^{\\prime} | \\chi_0 \\rangle\\) when the excited-state equilibrium bond length differs from the ground state.',
                    solution: 'The ground state vibrational wavefunction \\(\\chi_0\\) is a Gaussian centered at \\(r_e\\). If the excited state has a different equilibrium bond length \\(r_e^{\\prime} \\neq r_e\\), the \\(v^{\\prime} = 0\\) wavefunction of the excited state is centered at \\(r_e^{\\prime}\\) and has poor overlap with \\(\\chi_0\\). Higher \\(v^{\\prime}\\) wavefunctions have nodes and extend further; at some \\(v^{\\prime}\\), the classical turning point of the excited-state oscillator passes through \\(r_e\\), maximizing the overlap. This is the vibrational quantum number where the Franck-Condon factor peaks, determined by the "vertical" energy at the ground-state geometry: the FC maximum occurs where the excited-state potential energy at \\(r_e\\) equals the vibrational energy \\(E_{v^{\\prime}}\\).'
                },
                {
                    question: 'Why does spin-orbit coupling enable phosphorescence, and why is it stronger in molecules containing heavy atoms?',
                    hint: 'Consider the spin-orbit Hamiltonian \\(\\hat{H}_{\\text{SO}} \\propto Z^4 \\hat{\\mathbf{L}} \\cdot \\hat{\\mathbf{S}}\\) and how it mixes singlet and triplet states.',
                    solution: 'The spin-orbit coupling operator \\(\\hat{H}_{\\text{SO}} = \\sum_i \\xi(r_i) \\hat{\\mathbf{l}}_i \\cdot \\hat{\\mathbf{s}}_i\\) couples states with \\(\\Delta S = \\pm 1\\) (since \\(\\hat{\\mathbf{S}}\\) can flip a spin). This mixes a small amount of singlet character into the triplet state: \\(|T_1^{\\prime}\\rangle \\approx |T_1\\rangle + \\epsilon |S_n\\rangle\\). The transition \\(T_1^{\\prime} \\to S_0\\) then has a nonzero (though small) transition dipole moment through the singlet admixture. The coupling constant \\(\\xi \\propto Z^4\\) for atom with nuclear charge \\(Z\\), so heavy atoms (Br, I, Ir, Pt) dramatically enhance \\(\\hat{H}_{\\text{SO}}\\), making ISC faster and phosphorescence more efficient. This is the "heavy atom effect."'
                },
                {
                    question: 'State and prove the Thomas-Reiche-Kuhn (TRK) sum rule for oscillator strengths.',
                    hint: 'Start from the commutator \\([\\hat{x}, \\hat{p}_x] = i\\hbar\\) and evaluate \\(\\langle 0 | [\\hat{x}, \\hat{p}_x] | 0 \\rangle\\) by inserting a complete set of states.',
                    solution: 'Insert a complete set: \\(i\\hbar = \\langle 0 | [\\hat{x}, \\hat{p}_x] | 0 \\rangle = \\sum_n (\\langle 0 | \\hat{x} | n \\rangle \\langle n | \\hat{p}_x | 0 \\rangle - \\langle 0 | \\hat{p}_x | n \\rangle \\langle n | \\hat{x} | 0 \\rangle)\\). Using \\(\\hat{p}_x = im\\omega_{n0}\\hat{x}\\) in the Heisenberg picture: \\(\\langle n | \\hat{p}_x | 0 \\rangle = im_e \\omega_{n0} \\langle n | \\hat{x} | 0 \\rangle\\). Substituting: \\(i\\hbar = \\sum_n 2im_e\\omega_{n0}|\\langle n | \\hat{x} | 0 \\rangle|^2\\). For one electron, \\(f_{0n} = 2m_e\\omega_{n0}|\\langle n|\\hat{x}|0\\rangle|^2/\\hbar\\) (in one dimension). Thus \\(\\sum_n f_{0n} = 1\\) per electron, and for \\(N_e\\) electrons, \\(\\sum_n f_{0n} = N_e\\).'
                }
            ]
        },

        // ========== SECTION 2: Configuration Interaction Singles ==========
        {
            id: 'sec02-cis',
            title: 'Configuration Interaction Singles',
            content: `
<h2>17.2 Configuration Interaction Singles (CIS)</h2>

<p>The simplest <em>ab initio</em> method for computing excited electronic states is Configuration Interaction Singles (CIS). It constructs excited-state wavefunctions as linear combinations of singly excited determinants generated from a Hartree-Fock reference.</p>

<h3>The CIS Wavefunction</h3>

<div class="env-block definition">
<div class="env-title">Definition 17.2.1 (CIS Wavefunction)</div>
<div class="env-body">
The CIS wavefunction for excited state \\(K\\) is
\\[
|\\Psi_K^{\\text{CIS}}\\rangle = \\sum_{i}^{\\text{occ}} \\sum_{a}^{\\text{virt}} c_{ia}^K \\, |\\Phi_i^a\\rangle
\\]
where \\(|\\Phi_i^a\\rangle\\) denotes a singly excited determinant formed by promoting electron \\(i\\) from an occupied orbital to virtual orbital \\(a\\). The coefficients \\(c_{ia}^K\\) and excitation energies \\(\\omega_K\\) are obtained by diagonalizing the CIS Hamiltonian matrix.
</div>
</div>

<div class="env-block remark">
<div class="env-title">Why Not Include the Ground State?</div>
<div class="env-body">
By Brillouin's theorem, the matrix elements between the HF ground state and singly excited determinants vanish: \\(\\langle \\Phi_0 | \\hat{H} | \\Phi_i^a \\rangle = 0\\). Therefore, the CIS excited states are automatically orthogonal to the HF ground state, and the CIS matrix can be diagonalized in the singles-only space without contamination from the ground state.
</div>
</div>

<h3>The CIS Matrix</h3>

<div class="env-block theorem">
<div class="env-title">Theorem 17.2.2 (CIS Matrix Elements)</div>
<div class="env-body">
The CIS Hamiltonian matrix elements in the basis of singly excited determinants are
\\[
\\langle \\Phi_i^a | \\hat{H} | \\Phi_j^b \\rangle = \\delta_{ij}\\delta_{ab}(\\varepsilon_a - \\varepsilon_i) + \\langle aj \\| ib \\rangle
\\]
where \\(\\varepsilon_p\\) are the HF orbital energies and \\(\\langle aj \\| ib \\rangle = \\langle aj | ib \\rangle - \\langle aj | bi \\rangle\\) is the antisymmetrized two-electron integral. The excitation energies are eigenvalues of this matrix shifted by the HF ground-state energy.
</div>
</div>

<div class="env-block proof">
<div class="env-title">Proof (Sketch)</div>
<div class="env-body">
<p>Applying Slater's rules to the matrix element \\(\\langle \\Phi_i^a | \\hat{H} | \\Phi_j^b \\rangle\\): the two determinants differ by at most two spin-orbitals. If \\(i = j\\) and \\(a = b\\) (diagonal element), \\(\\langle \\Phi_i^a | \\hat{H} | \\Phi_i^a \\rangle = E_0 + \\varepsilon_a - \\varepsilon_i - \\langle ia \\| ia \\rangle + \\langle ia \\| ai \\rangle\\). For off-diagonal elements (differing by one or two spin-orbitals), Slater's rules give the two-electron integral \\(\\langle aj \\| ib \\rangle\\). Subtracting \\(E_0\\) from all diagonal elements gives the excitation energies relative to the ground state.</p>
<div class="qed">∎</div>
</div>
</div>

<h3>Properties and Limitations of CIS</h3>

<div class="env-block proposition">
<div class="env-title">Proposition 17.2.3 (Properties of CIS)</div>
<div class="env-body">
<ol>
<li><strong>Size-consistent</strong> for excitation energies (the excitation energy of a composite system AB equals that of the subsystem being excited, when A and B are far apart and noninteracting).</li>
<li><strong>Variational:</strong> CIS excitation energies are upper bounds to the true excitation energies (within the singles space).</li>
<li><strong>No electron correlation:</strong> CIS does not include any correlation effects. Excitation energies are typically overestimated by 1-2 eV.</li>
<li><strong>Orbital relaxation:</strong> CIS partially accounts for orbital relaxation in the excited state through the mixing of singly excited determinants.</li>
</ol>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example 17.2.4 (CIS for Minimal Basis H\\(_2\\))</div>
<div class="env-body">
<p>For H\\(_2\\) in a minimal basis (two basis functions, one occupied \\(\\sigma_g\\) and one virtual \\(\\sigma_u^*\\) orbital), there are exactly two possible single excitations: \\(\\alpha\\)-electron promoted and \\(\\beta\\)-electron promoted. After spin adaptation:</p>
<ul>
<li>Singlet excited state: \\(|\\Psi^1\\rangle = \\frac{1}{\\sqrt{2}}(|\\sigma_g\\bar{\\sigma}_u^*\\rangle + |\\sigma_u^*\\bar{\\sigma}_g\\rangle)\\), energy \\(\\omega_1 = \\varepsilon_{\\sigma_u^*} - \\varepsilon_{\\sigma_g} + 2\\langle \\sigma_g \\sigma_u^* | \\sigma_g \\sigma_u^* \\rangle - \\langle \\sigma_g \\sigma_u^* | \\sigma_u^* \\sigma_g \\rangle\\).</li>
<li>Triplet excited state: \\(|\\Psi^3\\rangle = \\frac{1}{\\sqrt{2}}(|\\sigma_g\\bar{\\sigma}_u^*\\rangle - |\\sigma_u^*\\bar{\\sigma}_g\\rangle)\\), energy \\(\\omega_3 = \\varepsilon_{\\sigma_u^*} - \\varepsilon_{\\sigma_g} - \\langle \\sigma_g \\sigma_u^* | \\sigma_u^* \\sigma_g \\rangle\\).</li>
</ul>
<p>The singlet-triplet splitting is \\(\\Delta E_{ST} = 2K_{gu}\\) where \\(K_{gu} = \\langle \\sigma_g \\sigma_u^* | \\sigma_u^* \\sigma_g \\rangle\\) is the exchange integral.</p>
</div>
</div>

<h3>CIS Transition Properties</h3>

<p>The transition dipole moment between the HF ground state and CIS excited state \\(K\\) is</p>

\\[
\\boldsymbol{\\mu}_{0K} = \\langle \\Phi_0 | \\hat{\\boldsymbol{\\mu}} | \\Psi_K^{\\text{CIS}} \\rangle = \\sum_{ia} c_{ia}^K \\langle \\Phi_0 | \\hat{\\boldsymbol{\\mu}} | \\Phi_i^a \\rangle = \\sum_{ia} c_{ia}^K \\langle i | \\hat{\\boldsymbol{\\mu}} | a \\rangle.
\\]

<p>This simplifies to a sum of one-electron dipole integrals weighted by the CIS coefficients.</p>

<div class="env-block remark">
<div class="env-title">Scaling and Computational Cost</div>
<div class="env-body">
<p>The CIS matrix has dimension \\(N_{\\text{occ}} \\times N_{\\text{virt}}\\), which can be very large. However, we typically need only a few lowest excited states. Iterative diagonalization methods (Davidson algorithm) are used to extract these without forming the full matrix. The formal scaling of CIS is \\(O(N^4)\\) per Davidson iteration (dominated by the two-electron integral transformation), the same as a single HF calculation.</p>
</div>
</div>
`,
            visualizations: [],
            exercises: [
                {
                    question: 'Prove Brillouin\'s theorem: \\(\\langle \\Phi_0 | \\hat{H} | \\Phi_i^a \\rangle = 0\\) when \\(\\Phi_0\\) is the HF determinant.',
                    hint: 'Use Slater\'s rules for matrix elements between determinants differing by one spin-orbital, then recognize that the result is the Fock matrix element \\(F_{ia}\\).',
                    solution: 'By Slater\'s rules, when two determinants differ by one spin-orbital (\\(i \\to a\\)): \\(\\langle \\Phi_0 | \\hat{H} | \\Phi_i^a \\rangle = \\langle i | \\hat{h} | a \\rangle + \\sum_j [\\langle ij | aj \\rangle - \\langle ij | ja \\rangle] = F_{ia}\\), the off-diagonal Fock matrix element between occupied orbital \\(i\\) and virtual orbital \\(a\\). But the HF orbitals are, by definition, eigenvectors of the Fock operator, so the Fock matrix is diagonal in the canonical MO basis: \\(F_{ia} = 0\\) for \\(i \\in \\text{occ}\\), \\(a \\in \\text{virt}\\). Hence \\(\\langle \\Phi_0 | \\hat{H} | \\Phi_i^a \\rangle = 0\\).'
                },
                {
                    question: 'Show that CIS is exact for a two-electron system in a complete basis (i.e., it gives the exact singlet and triplet excited states for He-like systems).',
                    hint: 'In a two-electron system, singles from the ground-state HF determinant span all possible singly excited configurations. What about doubly excited states?',
                    solution: 'For a two-electron system (e.g., He), the ground state HF determinant has two electrons in one spatial orbital. A singly excited determinant promotes one electron to a virtual orbital, which generates all possible configurations with one electron in the original orbital and one in any other orbital. Doubly excited determinants (both electrons promoted) exist but do not couple to singles by the Hamiltonian (Slater\'s rules require at most two-orbital differences for nonzero matrix elements, but the coupling is between same-state determinants only). More precisely, in a two-electron system, the exact excited states are exactly the CIS states because the full CI space decomposes into singles (which give the singly excited states) and doubles (ground-state correlation). The CIS states are thus exact for the excited states of two-electron systems. Note: this assumes the HF reference is a good description of the ground state.'
                },
                {
                    question: 'A CIS calculation on ethylene yields the first singlet excited state at 8.2 eV, while the experimental value is 7.1 eV. Give two reasons for this overestimation.',
                    hint: 'Think about what CIS neglects: electron correlation and the quality of the virtual orbitals.',
                    solution: '(1) <em>Lack of electron correlation:</em> CIS does not include any dynamical electron correlation. The ground state energy is too high (no correlation), and the excited state energy is also too high but by a different amount. The differential correlation between ground and excited states is typically larger for the more diffuse excited state, leading to an overestimated excitation energy. (2) <em>Virtual orbital quality:</em> CIS uses HF virtual orbitals, which are optimized for the \\(N\\)-electron ground state. They tend to be too diffuse and poorly suited for describing the excited state. Including doubles (CIS(D)) or using correlation methods (TD-DFT, EOM-CCSD) significantly improves the result.'
                },
                {
                    question: 'Derive the singlet-triplet splitting in CIS for a transition \\(i \\to a\\) and explain why singlets are always higher in energy than the corresponding triplets.',
                    hint: 'Write the spin-adapted CIS matrix elements for singlet and triplet states and compare.',
                    solution: 'The spin-adapted CIS excitation energies for a single \\(i \\to a\\) transition are: Singlet: \\(\\omega^S = \\varepsilon_a - \\varepsilon_i + 2(ia|ai) - (ia|ia) + (ia|ia) = \\varepsilon_a - \\varepsilon_i + 2K_{ia} - J_{ia} + J_{ia}\\). More carefully: \\(\\omega^S = \\varepsilon_a - \\varepsilon_i + 2(ia|ai)\\) and \\(\\omega^T = \\varepsilon_a - \\varepsilon_i\\) in the diagonal case (using the notation where \\(K_{ia} = (ia|ai)\\) is the exchange integral). The splitting is \\(\\Delta E_{ST} = \\omega^S - \\omega^T = 2K_{ia}\\). Since exchange integrals are always non-negative (\\(K_{ia} = \\int \\phi_i^*(1)\\phi_a(1) (1/r_{12}) \\phi_a^*(2)\\phi_i(2) \\, d1 d2 \\geq 0\\) by the positive definiteness of the Coulomb kernel), the singlet is always at or above the triplet. This is a consequence of the exchange interaction favoring parallel spins (Hund\'s rule).'
                },
                {
                    question: 'Explain why CIS cannot describe doubly excited states such as the \\(2A_g\\) state of butadiene.',
                    hint: 'What is the dominant configuration in the \\(2A_g\\) state?',
                    solution: 'The \\(2A_g\\) state of butadiene has a dominant doubly excited configuration \\((\\pi_1)^2 \\to (\\pi_2^*)^2\\) (simultaneous promotion of two electrons from HOMO to LUMO). Since CIS includes only singly excited determinants, it cannot represent this state. Any attempt to describe it within CIS would require an infinite number of singles, which is impossible. Methods that include double excitations (CIS(D), EOM-CCSD, CASSCF, MRCI) are required. This is a well-known failure case of single-reference excited-state methods and motivates multi-reference approaches discussed in Section 17.4.'
                }
            ]
        },

        // ========== SECTION 3: Time-Dependent DFT ==========
        {
            id: 'sec03-tddft',
            title: 'Time-Dependent DFT',
            content: `
<h2>17.3 Time-Dependent Density Functional Theory</h2>

<p>Time-dependent density functional theory (TD-DFT) is the most widely used method for computing molecular excited states. It combines the computational efficiency of DFT with a formally exact framework for treating time-dependent phenomena through the Runge-Gross theorem and its linear-response formulation (the Casida equations).</p>

<h3>The Runge-Gross Theorem</h3>

<div class="env-block theorem">
<div class="env-title">Theorem 17.3.1 (Runge-Gross, 1984)</div>
<div class="env-body">
For a many-electron system subject to a time-dependent external potential \\(v_{\\text{ext}}(\\mathbf{r}, t)\\), there is a one-to-one correspondence between the time-dependent density \\(\\rho(\\mathbf{r}, t)\\) and the external potential \\(v_{\\text{ext}}(\\mathbf{r}, t)\\) (up to a purely time-dependent function). Consequently, all observables are functionals of the time-dependent density.
</div>
</div>

<div class="env-block remark">
<div class="env-title">Relation to Hohenberg-Kohn</div>
<div class="env-body">
<p>The Runge-Gross theorem is the time-dependent generalization of the Hohenberg-Kohn theorem. Just as the ground-state energy is a functional of the ground-state density, all time-dependent properties are functionals of \\(\\rho(\\mathbf{r}, t)\\). However, unlike the ground-state case, there is no variational principle for the energy in the time-dependent setting; instead, one uses a stationary-action principle.</p>
</div>
</div>

<h3>Linear Response and the Casida Equations</h3>

<p>For computing excitation energies, we do not solve the full time-dependent problem. Instead, we use <em>linear response theory</em>: we perturb the ground-state KS system with a weak time-dependent field and analyze the frequency-dependent response.</p>

<div class="env-block definition">
<div class="env-title">Definition 17.3.2 (Linear Response Density)</div>
<div class="env-body">
The first-order density response to a perturbation \\(\\delta v_{\\text{ext}}(\\mathbf{r}, \\omega)\\) is
\\[
\\delta \\rho(\\mathbf{r}, \\omega) = \\int \\chi(\\mathbf{r}, \\mathbf{r}'; \\omega) \\, \\delta v_{\\text{ext}}(\\mathbf{r}', \\omega) \\, d\\mathbf{r}'
\\]
where \\(\\chi(\\mathbf{r}, \\mathbf{r}'; \\omega)\\) is the density-density response function. Its poles occur at the exact excitation energies of the system.
</div>
</div>

<div class="env-block theorem">
<div class="env-title">Theorem 17.3.3 (Casida Equations)</div>
<div class="env-body">
Within the adiabatic approximation (frequency-independent xc kernel), the excitation energies \\(\\omega_K\\) are obtained from the non-Hermitian eigenvalue problem:
\\[
\\begin{pmatrix} \\mathbf{A} & \\mathbf{B} \\\\ \\mathbf{B}^* & \\mathbf{A}^* \\end{pmatrix}
\\begin{pmatrix} \\mathbf{X}_K \\\\ \\mathbf{Y}_K \\end{pmatrix}
= \\omega_K
\\begin{pmatrix} \\mathbf{1} & \\mathbf{0} \\\\ \\mathbf{0} & -\\mathbf{1} \\end{pmatrix}
\\begin{pmatrix} \\mathbf{X}_K \\\\ \\mathbf{Y}_K \\end{pmatrix}
\\]
where the matrix elements are
\\[
A_{ia,jb} = \\delta_{ij}\\delta_{ab}(\\varepsilon_a - \\varepsilon_i) + (ia|jb) + (ia|f_{xc}|jb)
\\]
\\[
B_{ia,jb} = (ia|bj) + (ia|f_{xc}|bj)
\\]
and \\(f_{xc}(\\mathbf{r}, \\mathbf{r}') = \\delta^2 E_{xc}[\\rho] / \\delta\\rho(\\mathbf{r})\\delta\\rho(\\mathbf{r}')\\) is the exchange-correlation kernel.
</div>
</div>

<div class="env-block definition">
<div class="env-title">Definition 17.3.4 (Tamm-Dancoff Approximation, TDA)</div>
<div class="env-body">
The <em>Tamm-Dancoff approximation</em> (TDA) sets \\(\\mathbf{B} = \\mathbf{0}\\), reducing the Casida equations to the Hermitian eigenvalue problem:
\\[
\\mathbf{A} \\mathbf{X}_K = \\omega_K \\mathbf{X}_K.
\\]
TDA-TDDFT is analogous to CIS but with the DFT kernel replacing the HF exchange. It is computationally simpler, avoids triplet instability issues, and often gives comparable or even better results than full TD-DFT for valence excitations.
</div>
</div>

<h3>Accuracy and Limitations of TD-DFT</h3>

<div class="env-block proposition">
<div class="env-title">Proposition 17.3.5 (TD-DFT Error Characteristics)</div>
<div class="env-body">
<ol>
<li><strong>Valence excitations:</strong> TD-DFT with hybrid functionals (B3LYP, PBE0) typically gives excitation energies within 0.2-0.5 eV of experiment for valence transitions.</li>
<li><strong>Rydberg and charge-transfer states:</strong> Local and GGA functionals severely underestimate these excitation energies due to incorrect long-range behavior of the xc potential. Range-separated hybrids (CAM-B3LYP, \\(\\omega\\)B97X-D) significantly improve these.</li>
<li><strong>Double excitations:</strong> TD-DFT within the adiabatic approximation cannot describe states with double excitation character (the adiabatic kernel has no frequency dependence to generate additional poles).</li>
<li><strong>Conical intersections:</strong> TD-DFT can exhibit unphysical behavior near state crossings (incorrect dimensionality of the intersection seam).</li>
</ol>
</div>
</div>

<div class="env-block warning">
<div class="env-title">The Charge-Transfer Problem</div>
<div class="env-body">
<p>For a charge-transfer (CT) state where an electron transfers from donor D to acceptor A separated by distance \\(R\\), the exact excitation energy behaves as</p>
\\[
\\omega_{\\text{CT}} = \\text{IP}_D - \\text{EA}_A - \\frac{1}{R}
\\]
<p>where the \\(-1/R\\) term represents the Coulomb attraction between the electron and hole. Standard TD-DFT with local/semilocal functionals gives</p>
\\[
\\omega_{\\text{CT}}^{\\text{TD-DFT}} \\approx \\varepsilon_{\\text{LUMO}}^A - \\varepsilon_{\\text{HOMO}}^D
\\]
<p>which lacks the \\(-1/R\\) term entirely. This can underestimate CT excitation energies by several eV. Range-separated hybrids recover the correct \\(-1/R\\) behavior at long range.</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example 17.3.6 (Functional Comparison for Benzene)</div>
<div class="env-body">
<table class="data-table" style="margin:12px auto;border-collapse:collapse;text-align:center;">
<tr style="border-bottom:2px solid #30363d;"><th style="padding:4px 12px;">Method</th><th style="padding:4px 12px;">\\(^1B_{2u}\\) (eV)</th><th style="padding:4px 12px;">\\(^1B_{1u}\\) (eV)</th><th style="padding:4px 12px;">\\(^1E_{1u}\\) (eV)</th></tr>
<tr><td>Expt.</td><td>4.90</td><td>6.20</td><td>6.94</td></tr>
<tr><td>CIS</td><td>6.31</td><td>7.83</td><td>8.49</td></tr>
<tr><td>TD-B3LYP</td><td>5.30</td><td>6.03</td><td>6.76</td></tr>
<tr><td>TD-CAM-B3LYP</td><td>5.39</td><td>6.21</td><td>7.06</td></tr>
<tr><td>EOM-CCSD</td><td>5.08</td><td>6.33</td><td>7.07</td></tr>
</table>
<p>TD-DFT with hybrid functionals gives valence excitation energies much closer to experiment than CIS, at comparable computational cost.</p>
</div>
</div>
`,
            visualizations: [],
            exercises: [
                {
                    question: 'Explain the physical meaning of the \\(\\mathbf{X}\\) and \\(\\mathbf{Y}\\) vectors in the Casida equations.',
                    hint: 'Consider the density response in terms of particle-hole and hole-particle excitations.',
                    solution: 'The \\(\\mathbf{X}\\) vector contains the coefficients for particle-hole excitations (occupied \\(\\to\\) virtual), representing the forward (de-excitation) part of the density response: \\(X_{ia}\\) gives the amplitude for promoting an electron from orbital \\(i\\) to orbital \\(a\\). The \\(\\mathbf{Y}\\) vector contains the coefficients for hole-particle de-excitations (virtual \\(\\to\\) occupied), representing the backward part. In the TDA (\\(\\mathbf{B} = 0\\)), \\(\\mathbf{Y} = 0\\), and the excitations are purely particle-hole, analogous to CIS. The de-excitation amplitudes \\(\\mathbf{Y}\\) account for ground-state correlation effects on the excitation process and become important for describing collective excitations (e.g., plasmons).'
                },
                {
                    question: 'Show that the Casida equations reduce to the CIS equations when the xc functional is Hartree-Fock exchange only (no correlation) and the TDA is applied.',
                    hint: 'What is the xc kernel for HF? And what does the \\(\\mathbf{A}\\) matrix become?',
                    solution: 'For HF, the exchange-correlation functional is purely exchange: \\(E_{xc} = -\\frac{1}{2}\\sum_{ij} (ij|ji)\\). The xc kernel in the orbital basis is \\((ia|f_{xc}|jb) = -(ij|ab)\\) (negative of the exchange integral in the appropriate notation). Substituting into \\(A_{ia,jb}\\): \\(A_{ia,jb} = \\delta_{ij}\\delta_{ab}(\\varepsilon_a - \\varepsilon_i) + (ia|jb) - (ij|ab)\\). This is exactly \\(\\delta_{ij}\\delta_{ab}(\\varepsilon_a - \\varepsilon_i) + \\langle aj || ib \\rangle\\), which is the CIS matrix (Theorem 17.2.2). With TDA (\\(\\mathbf{B} = 0\\)), the eigenvalue problem \\(\\mathbf{A}\\mathbf{X} = \\omega \\mathbf{X}\\) is identical to the CIS eigenvalue problem.'
                },
                {
                    question: 'Why does TD-DFT with the B3LYP functional dramatically underestimate the excitation energy of the charge-transfer state in a donor-acceptor complex with \\(R = 10\\) Å?',
                    hint: 'Consider the fraction of HF exchange in B3LYP (20%) and the long-range behavior of the xc potential.',
                    solution: 'B3LYP has only 20% HF exchange and 80% local/semilocal exchange. The xc kernel thus contains only 20% of the nonlocal exchange contribution that provides the \\(-1/R\\) electron-hole interaction. For a CT state at \\(R = 10\\) Å, the missing Coulomb attraction is approximately \\(0.8 \\times 14.4/10 = 1.15\\) eV (since \\(e^2/(4\\pi\\epsilon_0 R) = 14.4\\) eV/Å). The local xc kernel decays exponentially with \\(|\\mathbf{r} - \\mathbf{r}\'|\\), so it cannot provide the correct \\(-1/R\\) stabilization of the CT state. Range-separated hybrids (CAM-B3LYP, \\(\\omega\\)B97X-D) switch to 100% HF exchange at long range, recovering the correct asymptotic behavior.'
                },
                {
                    question: 'What is the "adiabatic approximation" in TD-DFT, and what physical effects does it miss?',
                    hint: 'The adiabatic approximation uses the ground-state xc functional evaluated at the instantaneous density. What frequency dependence is lost?',
                    solution: 'The adiabatic approximation replaces the exact frequency-dependent xc kernel \\(f_{xc}(\\omega)\\) with the static (\\(\\omega = 0\\)) kernel derived from the ground-state functional: \\(f_{xc}^{\\text{adiab}}(\\mathbf{r}, \\mathbf{r}\') = \\delta^2 E_{xc}[\\rho_0]/\\delta\\rho(\\mathbf{r})\\delta\\rho(\\mathbf{r}\')\\). This misses: (1) <em>Double excitations:</em> The exact \\(f_{xc}(\\omega)\\) has poles at double-excitation energies that generate additional solutions; the adiabatic kernel, being frequency-independent, cannot produce these extra poles. (2) <em>Memory effects:</em> The true xc potential at time \\(t\\) depends on the history \\(\\rho(\\mathbf{r}, t\')\\) for all \\(t\' < t\\), while the adiabatic approximation depends only on the instantaneous density. (3) <em>Charge-transfer excitation corrections:</em> Frequency dependence in the kernel could partially compensate for the missing long-range exchange in semilocal functionals.'
                },
                {
                    question: 'Compute the oscillator strength for a transition with excitation energy 4.5 eV and transition dipole moment \\(|\\boldsymbol{\\mu}_{0K}| = 2.5\\) D (Debye).',
                    hint: 'Convert units: 1 D = \\(3.336 \\times 10^{-30}\\) C m. Use \\(f = \\frac{2m_e \\omega}{3\\hbar e^2} |\\boldsymbol{\\mu}|^2\\).',
                    solution: 'Using the convenient formula \\(f = \\frac{2m_e}{3\\hbar^2 e^2} \\cdot E \\cdot |\\boldsymbol{\\mu}|^2\\) where \\(E\\) is in eV and \\(|\\boldsymbol{\\mu}|^2\\) is in D\\(^2\\), and the conversion \\(f = 4.702 \\times 10^{-7} \\times E_{\\text{eV}} \\times |\\mu_{\\text{D}}|^2 / e^2\\). More directly: \\(f = (E / 27.21 \\text{ eV}) \\times |\\mu|^2_{\\text{a.u.}} \\times 2/3\\). Converting 2.5 D to a.u.: \\(2.5 / 2.5418 = 0.9836\\) a.u. So \\(|\\mu|^2 = 0.9674\\) a.u.\\(^2\\). \\(E = 4.5/27.21 = 0.1654\\) a.u. \\(f = (2/3) \\times 0.1654 \\times 0.9674 = 0.107\\). This is a moderately allowed transition.'
                }
            ]
        },

        // ========== SECTION 4: Multi-Reference Methods ==========
        {
            id: 'sec04-multi-reference',
            title: 'Multi-Reference Methods for Excited States',
            content: `
<h2>17.4 Multi-Reference Methods for Excited States</h2>

<p>Many excited states, especially those involving bond breaking, diradical character, or near-degeneracies, cannot be adequately described by a single Slater determinant. Multi-reference (MR) methods address this fundamental limitation by using a reference wavefunction that is itself a linear combination of determinants.</p>

<h3>Complete Active Space SCF (CASSCF)</h3>

<div class="env-block definition">
<div class="env-title">Definition 17.4.1 (CASSCF)</div>
<div class="env-body">
In a CASSCF(\\(n\\), \\(m\\)) calculation, \\(n\\) electrons are distributed among \\(m\\) orbitals (the <em>active space</em>) in all possible ways (full CI within the active space), while simultaneously optimizing the orbitals:
\\[
|\\Psi_{\\text{CASSCF}}\\rangle = \\sum_I c_I |\\Phi_I\\rangle
\\]
where \\(\\{|\\Phi_I\\rangle\\}\\) spans all possible configurations of \\(n\\) electrons in \\(m\\) orbitals with the correct spin and spatial symmetry. Both the CI coefficients \\(c_I\\) and the orbital shapes are variationally optimized.
</div>
</div>

<div class="env-block remark">
<div class="env-title">Active Space Selection</div>
<div class="env-body">
<p>Choosing the active space is the critical step and requires chemical intuition:</p>
<ul>
<li>Include all orbitals involved in the electronic transition (e.g., \\(\\pi\\) and \\(\\pi^*\\) for conjugated systems).</li>
<li>Include orbitals with near-degenerate occupations (fractional natural orbital occupation numbers, typically 0.02 to 1.98).</li>
<li>Include bonding/antibonding pairs for bonds that break or change character.</li>
<li>Practical limit: \\(m \\lesssim 18\\) orbitals with conventional CASSCF (the number of determinants grows combinatorially).</li>
</ul>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example 17.4.2 (CASSCF for Butadiene Excited States)</div>
<div class="env-body">
<p>For the excited states of butadiene, a CASSCF(4,4) active space includes the four \\(\\pi\\) electrons in the four \\(\\pi/\\pi^*\\) orbitals (\\(\\pi_1, \\pi_2, \\pi_3^*, \\pi_4^*\\)). This generates all singlet and triplet states within the \\(\\pi\\) system:</p>
<ul>
<li>\\(1^1A_g\\) (ground state): primarily \\((\\pi_1)^2(\\pi_2)^2\\)</li>
<li>\\(1^1B_u\\): primarily \\(\\pi_2 \\to \\pi_3^*\\) (HOMO-LUMO, single excitation)</li>
<li>\\(2^1A_g\\): primarily \\((\\pi_2)^2 \\to (\\pi_3^*)^2\\) (double excitation, "dark" state)</li>
</ul>
<p>The \\(2^1A_g\\) state, which has dominant double-excitation character, lies <em>below</em> the \\(1^1B_u\\) state, making butadiene a classic example where TD-DFT and CIS fail qualitatively.</p>
</div>
</div>

<h3>CASPT2: Adding Dynamic Correlation</h3>

<div class="env-block definition">
<div class="env-title">Definition 17.4.3 (CASPT2)</div>
<div class="env-body">
<em>CASPT2</em> (Complete Active Space Second-Order Perturbation Theory) adds dynamic electron correlation on top of a CASSCF reference using second-order Rayleigh-Schrodinger perturbation theory. The zeroth-order Hamiltonian is a generalized Fock operator constructed from the CASSCF density:
\\[
E^{(2)} = \\sum_I \\frac{|\\langle \\Phi_I | \\hat{H} | \\Psi_{\\text{CASSCF}} \\rangle|^2}{E_0 - E_I}
\\]
where the sum runs over all configurations \\(|\\Phi_I\\rangle\\) outside the active space (first-order interacting space).
</div>
</div>

<div class="env-block theorem">
<div class="env-title">Theorem 17.4.4 (CASPT2 Properties)</div>
<div class="env-body">
<ol>
<li>CASPT2 is <strong>not variational</strong>: the CASPT2 energy can be below the exact energy.</li>
<li>CASPT2 is <strong>size-consistent</strong> (when applied consistently).</li>
<li>CASPT2 is susceptible to <strong>intruder states</strong>: when external configurations are nearly degenerate with the reference, the perturbation denominators become small, causing erratic results. The <em>imaginary level shift</em> technique (IPEA shift) partially alleviates this.</li>
<li>Typical accuracy for excitation energies: 0.1-0.3 eV, significantly better than CIS or TD-DFT for multi-reference systems.</li>
</ol>
</div>
</div>

<h3>NEVPT2: An Alternative to CASPT2</h3>

<div class="env-block definition">
<div class="env-title">Definition 17.4.5 (NEVPT2)</div>
<div class="env-body">
<em>NEVPT2</em> (N-Electron Valence State Perturbation Theory) is an alternative multi-reference perturbation theory that uses a different zeroth-order Hamiltonian (the Dyall Hamiltonian). Unlike CASPT2:
<ul>
<li>NEVPT2 is <strong>intruder-state free</strong> by construction (the zeroth-order energies are always well-separated).</li>
<li>NEVPT2 is <strong>size-consistent</strong>.</li>
<li>NEVPT2 does <strong>not require a level shift</strong>.</li>
<li>Accuracy is comparable to CASPT2, though results can differ for specific systems.</li>
</ul>
</div>
</div>

<h3>State Averaging</h3>

<div class="env-block definition">
<div class="env-title">Definition 17.4.6 (SA-CASSCF)</div>
<div class="env-body">
In <em>state-averaged CASSCF</em> (SA-CASSCF), the orbitals are optimized to minimize a weighted average of several state energies:
\\[
E_{\\text{SA}} = \\sum_K w_K E_K[\\text{CASSCF}]
\\]
where \\(w_K \\geq 0\\) and \\(\\sum_K w_K = 1\\). This produces a single set of orbitals that is a balanced compromise for all states, avoiding root-flipping problems and ensuring smooth potential energy surfaces.
</div>
</div>

<div class="env-block warning">
<div class="env-title">The Active Space Dilemma</div>
<div class="env-body">
<p>The exponential scaling of the CASSCF wavefunction with active space size severely limits the method. The number of configurations in a CAS(\\(n\\), \\(m\\)) calculation is</p>
\\[
N_{\\text{det}} = \\binom{m}{n/2}^2 \\quad \\text{(for singlets with } n \\text{ even)}
\\]
<p>For CAS(14,14), this is already \\(\\sim 10^6\\) determinants. Modern extensions include:</p>
<ul>
<li><strong>DMRG-CASSCF:</strong> Uses the density matrix renormalization group to handle active spaces up to \\(\\sim 50\\) orbitals.</li>
<li><strong>Selected CI (CIPSI, HCI):</strong> Only includes the most important determinants, adaptively building the CI space.</li>
<li><strong>FCIQMC:</strong> Stochastically samples the CI space.</li>
</ul>
</div>
</div>
`,
            visualizations: [],
            exercises: [
                {
                    question: 'For the ozone molecule (O\\(_3\\)), suggest an appropriate CASSCF active space for computing the ground and low-lying excited states. Justify your choice.',
                    hint: 'Consider the electronic structure of O\\(_3\\): which orbitals are involved in the multi-reference character of the ground state?',
                    solution: 'Ozone has well-known diradical character in its ground state due to the resonance structure O=O-O \\(\\leftrightarrow\\) O-O=O. An appropriate active space is CAS(12,9): 12 electrons in 9 orbitals, comprising the six \\(2p\\) orbitals of the three oxygens that form the \\(\\pi\\) and lone-pair system (3 bonding/nonbonding + 3 antibonding in the \\(\\pi\\) system, plus 3 in-plane \\(2p\\) orbitals). A minimal active space CAS(2,2) captures only the diradical character but misses the full \\(\\pi\\) correlation. CAS(6,6) including just the \\(\\pi\\) system is a reasonable intermediate choice. The key is to include the terminal O lone-pair orbitals that participate in the resonance.'
                },
                {
                    question: 'Explain the "intruder state" problem in CASPT2 and how it manifests in practice.',
                    hint: 'What happens to the perturbation correction when \\(E_0 - E_I \\approx 0\\) in the CASPT2 energy formula?',
                    solution: 'An intruder state occurs when an external configuration \\(|\\Phi_I\\rangle\\) (outside the active space) has a zeroth-order energy \\(E_I\\) nearly degenerate with the reference energy \\(E_0\\). The perturbation correction \\(E^{(2)} \\sim |V_{0I}|^2/(E_0 - E_I)\\) then diverges or becomes very large, leading to: (1) erratic, unreliable energies, (2) discontinuities in potential energy surfaces, (3) very large perturbation corrections that violate the assumption of small perturbation. In practice, intruder states manifest as anomalously large CASPT2 corrections, negative excitation energies, or sudden jumps in energy along a geometry scan. Remedies: (a) level shift technique (add imaginary or real shift to denominators), (b) enlarge the active space to include the intruding orbital, (c) use NEVPT2, which is intruder-state free.'
                },
                {
                    question: 'Why must state-averaging be used when computing conical intersections or avoided crossings with CASSCF?',
                    hint: 'Consider what happens if you optimize orbitals for each state independently near a state crossing.',
                    solution: 'Near a conical intersection or avoided crossing, two states are nearly degenerate. If orbitals are optimized for each state separately (state-specific CASSCF), each calculation will produce orbitals biased toward its own state. This leads to: (1) different orbital sets for different states, making transition properties inconsistent, (2) root-flipping, where the target state suddenly changes character during optimization, (3) discontinuous potential energy surfaces, because the orbital character changes abruptly as the crossing region is traversed. State-averaging produces a single set of orbitals that treats both states on equal footing, ensuring smooth PES and consistent state descriptions through the crossing region. This is essential for dynamics simulations through conical intersections.'
                },
                {
                    question: 'Compare the formal scaling of CASSCF, CASPT2, and NEVPT2 with active space size \\(m\\) and total number of orbitals \\(M\\).',
                    hint: 'CASSCF scales exponentially with \\(m\\); the perturbation theory adds a polynomial cost in \\(M\\).',
                    solution: 'CASSCF: The CI diagonalization scales as \\(O(N_{\\text{det}}^2)\\) where \\(N_{\\text{det}} \\sim \\binom{m}{n/2}^2\\) grows exponentially with \\(m\\). The orbital optimization adds \\(O(N_{\\text{det}} \\times M^2)\\) per iteration. CASPT2: Adds the cost of computing the first-order wavefunction, which requires solving a system of linear equations in the first-order interacting space. This scales as \\(O(N_{\\text{det}} \\times M^4)\\) (the \\(M^4\\) comes from two-electron integral transformations involving external orbitals). NEVPT2: Similar formal scaling to CASPT2, \\(O(N_{\\text{det}} \\times M^4)\\), but with different prefactors. The NEVPT2 equations decouple into independent subspaces (8 perturber classes), which can be computationally advantageous. All three are dominated by the exponential CAS cost for large \\(m\\).'
                },
                {
                    question: 'The \\(2^1A_g\\) state of butadiene is computed to be at 6.6 eV with TD-B3LYP, 5.4 eV with CIS(D), and 5.2 eV with CASPT2(4,4). The experimental value is approximately 5.2 eV (though debated). Explain the failure of TD-DFT.',
                    hint: 'What is the dominant character of the \\(2^1A_g\\) state?',
                    solution: 'The \\(2^1A_g\\) state of butadiene is dominated by the double excitation \\((\\pi_2)^2 \\to (\\pi_3^*)^2\\). TD-DFT within the adiabatic approximation can only describe states arising from single excitations (the response kernel generates poles corresponding to single particle-hole excitations). A doubly excited state would require frequency-dependent terms in the xc kernel to generate additional poles in the response function. Since the adiabatic approximation uses a static kernel, no such poles appear, and TD-DFT attempts to describe the state through poor single-excitation approximations, leading to a 1.4 eV overestimate. CASPT2(4,4) includes the double excitation explicitly in the active space and gives excellent agreement. This is a textbook failure case for TD-DFT and motivates multi-reference methods.'
                }
            ]
        },

        // ========== SECTION 5: Conical Intersections and Photochemistry ==========
        {
            id: 'sec05-conical-intersections',
            title: 'Conical Intersections and Photochemistry',
            content: `
<h2>17.5 Conical Intersections and Photochemistry</h2>

<p>Conical intersections (CIs) are points in nuclear configuration space where two electronic potential energy surfaces become degenerate. They are ubiquitous in molecular photochemistry and serve as "funnels" through which molecules decay non-radiatively from excited states to the ground state on ultrafast (femtosecond) timescales.</p>

<h3>Non-Adiabatic Effects</h3>

<p>The Born-Oppenheimer approximation assumes that electrons adjust instantaneously to nuclear motion, keeping the molecule on a single adiabatic PES. This breaks down when two electronic states approach each other in energy. The non-adiabatic coupling vector governs the rate of population transfer between surfaces.</p>

<div class="env-block definition">
<div class="env-title">Definition 17.5.1 (Non-Adiabatic Coupling Vector)</div>
<div class="env-body">
The <em>non-adiabatic coupling vector</em> (NACV) between adiabatic states \\(I\\) and \\(J\\) is
\\[
\\mathbf{d}_{IJ}(\\mathbf{R}) = \\langle \\psi_I(\\mathbf{R}) | \\nabla_{\\mathbf{R}} \\psi_J(\\mathbf{R}) \\rangle
\\]
where the integral is over electronic coordinates only. The NACV diverges at a conical intersection (\\(|\\mathbf{d}_{IJ}| \\to \\infty\\) as \\(E_I \\to E_J\\)), signaling complete breakdown of the Born-Oppenheimer approximation.
</div>
</div>

<div class="env-block theorem">
<div class="env-title">Theorem 17.5.2 (Non-Crossing Rule and Conical Intersections)</div>
<div class="env-body">
<p>For a molecule with \\(N_{\\text{int}}\\) internal nuclear degrees of freedom:</p>
<ul>
<li><strong>Same symmetry:</strong> Two states of the same spatial and spin symmetry can only cross in a subspace of dimension \\(N_{\\text{int}} - 2\\) (the <em>seam</em> of the conical intersection). In the remaining two dimensions (the <em>branching space</em>), the degeneracy is lifted linearly, forming a double cone.</li>
<li><strong>Different symmetry:</strong> States of different symmetry can cross in a subspace of dimension \\(N_{\\text{int}} - 1\\) (a seam of dimension one higher).</li>
<li><strong>Diatomics:</strong> For a diatomic molecule (\\(N_{\\text{int}} = 1\\)), same-symmetry states cannot cross (von Neumann-Wigner non-crossing rule). Different-symmetry states can cross at isolated points.</li>
</ul>
</div>
</div>

<div class="env-block proof">
<div class="env-title">Proof (Branching Space Dimensionality)</div>
<div class="env-body">
<p>Consider two states \\(|I\\rangle\\) and \\(|J\\rangle\\). Near a degeneracy, the \\(2 \\times 2\\) effective Hamiltonian is</p>
\\[
\\mathbf{H}_{\\text{eff}} = \\begin{pmatrix} H_{II} & H_{IJ} \\\\ H_{JI} & H_{JJ} \\end{pmatrix}
\\]
<p>For degeneracy, we need \\(H_{II} = H_{JJ}\\) (one condition on nuclear coordinates) AND \\(H_{IJ} = 0\\) (a second condition, unless symmetry forces \\(H_{IJ} = 0\\) identically). Two conditions remove two degrees of freedom from \\(N_{\\text{int}}\\), giving a seam of dimension \\(N_{\\text{int}} - 2\\). For different-symmetry states, \\(H_{IJ} = 0\\) automatically, and only one condition (\\(H_{II} = H_{JJ}\\)) remains, giving a seam of dimension \\(N_{\\text{int}} - 1\\).</p>
<div class="qed">∎</div>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-conical-intersection"></div>

<h3>Topology of a Conical Intersection</h3>

<p>Near a conical intersection point \\(\\mathbf{R}_0\\), the two adiabatic energies behave as</p>

\\[
E_{\\pm}(\\mathbf{R}) = \\bar{E}(\\mathbf{R}_0) + \\mathbf{s} \\cdot \\delta\\mathbf{R} \\pm \\sqrt{(\\mathbf{g} \\cdot \\delta\\mathbf{R})^2 + (\\mathbf{h} \\cdot \\delta\\mathbf{R})^2}
\\]

<p>where \\(\\delta\\mathbf{R} = \\mathbf{R} - \\mathbf{R}_0\\), and:</p>

<div class="env-block definition">
<div class="env-title">Definition 17.5.3 (Branching Space Vectors)</div>
<div class="env-body">
<ul>
<li>\\(\\mathbf{g} = \\frac{1}{2}\\nabla_{\\mathbf{R}}(E_I - E_J)\\): the <em>gradient difference vector</em> (half the difference of the energy gradients).</li>
<li>\\(\\mathbf{h} = \\langle \\psi_I | \\nabla_{\\mathbf{R}} \\hat{H} | \\psi_J \\rangle\\): the <em>derivative coupling vector</em> (proportional to the NACV times the energy gap).</li>
<li>\\(\\mathbf{s} = \\frac{1}{2}\\nabla_{\\mathbf{R}}(E_I + E_J)\\): the <em>mean energy gradient</em>, which tilts the cone.</li>
</ul>
The vectors \\(\\mathbf{g}\\) and \\(\\mathbf{h}\\) span the two-dimensional <em>branching space</em> (or \\(g\\text{-}h\\) plane). All other nuclear coordinates comprise the <em>seam space</em>, in which the degeneracy is preserved.
</div>
</div>

<h3>Surface Hopping Dynamics</h3>

<div class="env-block definition">
<div class="env-title">Definition 17.5.4 (Tully's Fewest Switches Surface Hopping)</div>
<div class="env-body">
<p>In <em>fewest switches surface hopping</em> (FSSH), the nuclei propagate classically on a single adiabatic surface, with stochastic "hops" between surfaces:</p>
<ol>
<li>Propagate the nuclear trajectory on the current adiabatic surface \\(I\\) using classical mechanics: \\(M_A \\ddot{\\mathbf{R}}_A = -\\nabla_A E_I(\\mathbf{R})\\).</li>
<li>Simultaneously propagate the electronic wavefunction amplitudes \\(c_J(t)\\) by integrating the time-dependent Schrodinger equation: \\(i\\hbar \\dot{c}_J = \\sum_K (H_{JK} - i\\hbar \\dot{\\mathbf{R}} \\cdot \\mathbf{d}_{JK}) c_K\\).</li>
<li>At each time step, compute the hopping probability from surface \\(I\\) to \\(J\\): \\(g_{I \\to J} = \\max\\left(0, \\frac{-2 \\operatorname{Re}(c_J^* c_I \\dot{\\mathbf{R}} \\cdot \\mathbf{d}_{IJ})\\Delta t}{|c_I|^2}\\right)\\).</li>
<li>Compare \\(g_{I \\to J}\\) to a random number to decide whether a hop occurs.</li>
<li>If a hop occurs, rescale nuclear velocities along \\(\\mathbf{d}_{IJ}\\) to conserve energy.</li>
</ol>
</div>
</div>

<div class="env-block remark">
<div class="env-title">Alternative Dynamics Methods</div>
<div class="env-body">
<ul>
<li><strong>Ehrenfest dynamics:</strong> Propagates nuclei on a mean-field potential (average of all surfaces weighted by \\(|c_J|^2\\)). Simple but suffers from incorrect asymptotic behavior.</li>
<li><strong>Ab initio multiple spawning (AIMS):</strong> Represents the nuclear wavepacket as a superposition of Gaussian basis functions that "spawn" new basis functions near conical intersections.</li>
<li><strong>Multiconfigurational Ehrenfest (MCE):</strong> Combines aspects of Ehrenfest and spawning.</li>
<li><strong>Exact factorization:</strong> Rigorously decomposes the molecular wavefunction without the Born-Oppenheimer separation.</li>
</ul>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example 17.5.5 (Photoisomerization of Ethylene)</div>
<div class="env-body">
<p>The simplest example of photochemistry through a conical intersection is the photoisomerization of ethylene (C\\(_2\\)H\\(_4\\)):</p>
<ol>
<li>Vertical excitation: \\(\\pi \\to \\pi^*\\) (\\(S_0 \\to S_1\\)), the molecule is in the planar geometry.</li>
<li>On \\(S_1\\), the molecule has no barrier to twisting around the C=C bond (the \\(\\pi^*\\) state favors a perpendicular geometry).</li>
<li>At ~90\\(^\\circ\\) twist, a conical intersection between \\(S_0\\) and \\(S_1\\) is reached (the HOMO and LUMO become degenerate by symmetry at the perpendicular geometry).</li>
<li>The molecule funnels through the CI back to \\(S_0\\), emerging either in the original (<em>cis</em>) or rotated (<em>trans</em>) geometry.</li>
</ol>
<p>This process occurs in ~50 fs, one of the fastest photochemical reactions known.</p>
</div>
</div>

<div class="env-block theorem">
<div class="env-title">Theorem 17.5.6 (Berry Phase at Conical Intersections)</div>
<div class="env-body">
When the nuclear coordinates are transported along a closed loop encircling a conical intersection, the adiabatic electronic wavefunction acquires a geometric (Berry) phase of \\(\\pi\\):
\\[
|\\psi_I(\\mathbf{R})\\rangle \\to -|\\psi_I(\\mathbf{R})\\rangle.
\\]
This sign change has observable consequences: it affects the nodal structure of the nuclear wavefunction and modifies the interference pattern in quantum dynamics near conical intersections. The Berry phase is a topological property, independent of the path taken (as long as it encircles exactly one CI point).
</div>
</div>
`,
            visualizations: [
                {
                    id: 'viz-conical-intersection',
                    title: 'Conical Intersection: Double Cone Topology',
                    description: 'A conical intersection between two potential energy surfaces. The two cones meet at a single point (the CI). The axes represent the two branching-space coordinates (gradient difference \\(\\mathbf{g}\\) and derivative coupling \\(\\mathbf{h}\\)). Adjust the tilt to see how the mean energy gradient \\(\\mathbf{s}\\) skews the cone.',
                    setup(body, controls) {
                        const viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                        const W = viz.width;
                        const H = viz.height;
                        let tilt = 0;
                        let rotation = 0;

                        VizEngine.createSlider(controls, 'Tilt (s)', -2.0, 2.0, 0, 0.1, v => { tilt = v; });
                        VizEngine.createSlider(controls, 'View angle', 0, 360, 0, 5, v => { rotation = v * Math.PI / 180; });

                        // Simple 3D projection
                        function project(x, y, z) {
                            const cosR = Math.cos(rotation + 0.5);
                            const sinR = Math.sin(rotation + 0.5);
                            const xr = x * cosR - y * sinR;
                            const yr = x * sinR + y * cosR;
                            const zr = z;
                            // Isometric-ish projection
                            const px = W / 2 + xr * 100 - yr * 50;
                            const py = H / 2 - zr * 80 + yr * 30;
                            return [px, py, yr]; // yr for depth sorting
                        }

                        function draw(t) {
                            const ctx = viz.ctx;
                            viz.clear();

                            // Animate rotation slowly
                            const autoRot = t * 0.0003;
                            const cosR = Math.cos(rotation + autoRot + 0.5);
                            const sinR = Math.sin(rotation + autoRot + 0.5);

                            function proj(x, y, z) {
                                const xr = x * cosR - y * sinR;
                                const yr = x * sinR + y * cosR;
                                const px = W / 2 + xr * 90 - yr * 45;
                                const py = H * 0.5 - z * 70 + yr * 25;
                                return [px, py];
                            }

                            // Draw the double cone using wireframe
                            const nRings = 20;
                            const nSegs = 40;

                            // Upper cone (E+)
                            for (let r = 0; r < nRings; r++) {
                                const radius = (r + 1) / nRings * 2.5;
                                const z_upper = radius + tilt * radius * 0.2;
                                ctx.strokeStyle = viz.colors.orange + (r < 5 ? 'cc' : '66');
                                ctx.lineWidth = 0.8;
                                ctx.beginPath();
                                for (let s = 0; s <= nSegs; s++) {
                                    const theta = (s / nSegs) * Math.PI * 2;
                                    const x = radius * Math.cos(theta);
                                    const y = radius * Math.sin(theta);
                                    const [px, py] = proj(x, y, z_upper);
                                    if (s === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
                                }
                                ctx.stroke();
                            }

                            // Lower cone (E-)
                            for (let r = 0; r < nRings; r++) {
                                const radius = (r + 1) / nRings * 2.5;
                                const z_lower = -radius + tilt * radius * 0.2;
                                ctx.strokeStyle = viz.colors.blue + (r < 5 ? 'cc' : '66');
                                ctx.lineWidth = 0.8;
                                ctx.beginPath();
                                for (let s = 0; s <= nSegs; s++) {
                                    const theta = (s / nSegs) * Math.PI * 2;
                                    const x = radius * Math.cos(theta);
                                    const y = radius * Math.sin(theta);
                                    const [px, py] = proj(x, y, z_lower);
                                    if (s === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
                                }
                                ctx.stroke();
                            }

                            // Draw radial lines
                            for (let s = 0; s < 8; s++) {
                                const theta = (s / 8) * Math.PI * 2;
                                const [cx, cy] = proj(0, 0, 0);
                                const radius = 2.5;
                                const z_up = radius + tilt * radius * 0.2;
                                const z_dn = -radius + tilt * radius * 0.2;
                                const x = radius * Math.cos(theta);
                                const y = radius * Math.sin(theta);
                                const [px_up, py_up] = proj(x, y, z_up);
                                const [px_dn, py_dn] = proj(x, y, z_dn);

                                ctx.strokeStyle = viz.colors.orange + '44';
                                ctx.lineWidth = 0.5;
                                ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(px_up, py_up); ctx.stroke();

                                ctx.strokeStyle = viz.colors.blue + '44';
                                ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(px_dn, py_dn); ctx.stroke();
                            }

                            // Draw CI point
                            const [cxCI, cyCI] = proj(0, 0, 0);
                            ctx.fillStyle = viz.colors.white;
                            ctx.beginPath();
                            ctx.arc(cxCI, cyCI, 5, 0, Math.PI * 2);
                            ctx.fill();
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.font = 'bold 12px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('CI point', cxCI + 10, cyCI - 5);

                            // Axes labels
                            const [gx, gy] = proj(3.0, 0, 0);
                            const [hx, hy] = proj(0, 3.0, 0);
                            const [ex, ey] = proj(0, 0, 3.2);

                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('g (grad. diff.)', gx, gy + 15);
                            ctx.fillText('h (deriv. coupling)', hx + 20, hy);

                            ctx.fillStyle = viz.colors.white;
                            ctx.fillText('Energy', ex - 5, ey - 10);

                            // Labels for surfaces
                            const [ux, uy] = proj(2, 0, 2 + tilt * 0.4);
                            const [lx, ly] = proj(2, 0, -2 + tilt * 0.4);
                            ctx.fillStyle = viz.colors.orange;
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.fillText('S₁', ux + 15, uy);
                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillText('S₀', lx + 15, ly);

                            viz.screenText('Tilt s = ' + tilt.toFixed(1), W / 2, H - 15, viz.colors.text, 11);
                        }

                        viz.animate(draw);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'For a triatomic molecule (\\(N_{\\text{int}} = 3\\) for nonlinear), what is the dimensionality of the conical intersection seam between two states of the same symmetry?',
                    hint: 'Use \\(\\dim(\\text{seam}) = N_{\\text{int}} - 2\\).',
                    solution: 'For a nonlinear triatomic, \\(N_{\\text{int}} = 3N - 6 = 3(3) - 6 = 3\\). The CI seam dimensionality is \\(3 - 2 = 1\\). This means the conical intersection is not an isolated point but a one-dimensional curve (a seam) in the three-dimensional internal coordinate space. For a linear triatomic, \\(N_{\\text{int}} = 3(3) - 5 = 4\\), and the seam is two-dimensional.'
                },
                {
                    question: 'Derive the \\(2 \\times 2\\) effective Hamiltonian near a conical intersection and show that the energy splitting is linear in the branching-space coordinates.',
                    hint: 'Expand \\(H_{II}\\), \\(H_{JJ}\\), and \\(H_{IJ}\\) to first order around the CI point \\(\\mathbf{R}_0\\).',
                    solution: 'Near \\(\\mathbf{R}_0\\), expand: \\(H_{II} \\approx E_0 + \\mathbf{g}_I \\cdot \\delta\\mathbf{R}\\), \\(H_{JJ} \\approx E_0 + \\mathbf{g}_J \\cdot \\delta\\mathbf{R}\\), \\(H_{IJ} \\approx 0 + \\mathbf{h} \\cdot \\delta\\mathbf{R}\\) (since \\(H_{IJ} = 0\\) at the CI). The eigenvalues of the \\(2 \\times 2\\) matrix are \\(E_{\\pm} = E_0 + \\frac{1}{2}(\\mathbf{g}_I + \\mathbf{g}_J) \\cdot \\delta\\mathbf{R} \\pm \\sqrt{[\\frac{1}{2}(\\mathbf{g}_I - \\mathbf{g}_J) \\cdot \\delta\\mathbf{R}]^2 + [\\mathbf{h} \\cdot \\delta\\mathbf{R}]^2}\\). Defining \\(\\mathbf{g} = \\frac{1}{2}(\\mathbf{g}_I - \\mathbf{g}_J)\\), the splitting is \\(\\Delta E = 2\\sqrt{(\\mathbf{g} \\cdot \\delta\\mathbf{R})^2 + (\\mathbf{h} \\cdot \\delta\\mathbf{R})^2}\\), which is linear in \\(|\\delta\\mathbf{R}|\\) when moving in the \\(\\mathbf{g}\\)-\\(\\mathbf{h}\\) plane, forming a cone.'
                },
                {
                    question: 'In Tully\'s surface hopping, explain why velocity rescaling after a hop is performed along the non-adiabatic coupling vector rather than uniformly.',
                    hint: 'Consider which direction in nuclear coordinate space the non-adiabatic coupling is maximal.',
                    solution: 'The non-adiabatic coupling vector \\(\\mathbf{d}_{IJ}\\) points in the direction where the electronic character changes most rapidly with nuclear displacement. When a hop occurs, the electronic energy changes by \\(\\Delta E = E_J - E_I\\), and this energy must be compensated by kinetic energy to conserve total energy. Rescaling uniformly would change the velocity in all directions, including the seam space where no coupling occurs. Rescaling along \\(\\mathbf{d}_{IJ}\\) ensures that the energy exchange occurs in the physically relevant direction (the branching space), preserving the component of nuclear momentum perpendicular to the coupling direction. This gives more physically reasonable dynamics and reduces artifacts. If the kinetic energy component along \\(\\mathbf{d}_{IJ}\\) is insufficient to compensate \\(\\Delta E\\), the hop is rejected ("frustrated hop").'
                },
                {
                    question: 'Explain the Berry phase effect at a conical intersection and its physical consequences.',
                    hint: 'Consider transporting the electronic wavefunction around a closed loop encircling the CI, and what the sign change means for nuclear dynamics.',
                    solution: 'When nuclear coordinates traverse a closed loop around a CI, the adiabatic electronic wavefunction acquires a geometric phase of \\(e^{i\\gamma} = e^{i\\pi} = -1\\). This sign change is topological (independent of loop size or shape, depending only on whether the loop encircles the CI). Physical consequences: (1) The nuclear wavefunction must also change sign to keep the total wavefunction single-valued, introducing a nodal line through the CI point. (2) In quantum dynamics, this Berry phase causes destructive interference between nuclear wavepackets passing on opposite sides of the CI, modifying branching ratios and product distributions. (3) For bound states near a CI, the Berry phase shifts the vibrational quantum numbers by 1/2, affecting the energy level pattern. (4) Molecular Aharonov-Bohm effect: the CI acts as a "magnetic flux" in nuclear configuration space.'
                },
                {
                    question: 'Compare surface hopping, Ehrenfest dynamics, and AIMS for simulating photochemical processes. Under what circumstances would you choose each method?',
                    hint: 'Consider computational cost, accuracy near conical intersections, and behavior in the asymptotic (product) region.',
                    solution: 'Surface hopping (FSSH): Nuclei classically on one surface, stochastic hops. Pros: correct asymptotic behavior (molecule ends up on one surface), simple to implement, naturally handles multiple electronic states. Cons: overcoherence problem (electronic amplitudes remain coherent too long), frustrated hops, no quantum nuclear effects. Best for: large molecules, statistical analysis of many trajectories, qualitative branching ratios. Ehrenfest: Nuclei on mean-field surface. Pros: no random numbers, deterministic, cheap. Cons: incorrect asymptotic behavior (molecule stays on a superposition of surfaces forever), poor for reactions with distinct products. Best for: short-time dynamics, processes dominated by a single pathway. AIMS (Ab Initio Multiple Spawning): Nuclear wavepacket as Gaussian basis functions that spawn at CIs. Pros: includes quantum nuclear effects (tunneling, coherence), correct Berry phase, converges to exact quantum result with enough basis functions. Cons: expensive (many Gaussian basis functions needed), complex implementation, requires many electronic structure calculations. Best for: small molecules where quantum effects are important, benchmark calculations, systems with strong coherence effects.'
                },
                {
                    question: 'Why is the conical intersection between \\(S_0\\) and \\(S_1\\) of ethylene located near the 90\\(^\\circ\\) twisted geometry?',
                    hint: 'Consider the orbital symmetry and energetics at the 90\\(^\\circ\\) twisted geometry. What happens to the \\(\\pi\\) and \\(\\pi^*\\) orbitals?',
                    solution: 'At 90\\(^\\circ\\) twist, the two \\(p\\) orbitals (one on each carbon) become orthogonal and hence degenerate by symmetry (both are nonbonding). The HOMO and LUMO have the same energy, making the ground configuration \\((\\pi)^2\\) and the excited configuration \\((\\pi)(\\pi^*)\\) degenerate. More precisely: at planar geometry, \\(\\pi\\) and \\(\\pi^*\\) are split by the conjugation interaction \\(\\beta\\). At 90\\(^\\circ\\), the overlap integral \\(S = 0\\), so \\(\\beta = 0\\) and the orbitals are degenerate. The two configurations \\(|...(p_A)^2\\rangle\\) and \\(|...(p_B)^2\\rangle\\) (ionic) and \\(|...p_A p_B\\rangle\\) (covalent) compete, and the ionic (zwitterionic) and covalent (diradical) states cross. The CI is not exactly at 90\\(^\\circ\\) (it also involves pyramidalization of one CH\\(_2\\) group to break the \\(D_2\\) symmetry), but the twisted geometry is the key coordinate bringing the states together.'
                }
            ]
        }
    ]
});
