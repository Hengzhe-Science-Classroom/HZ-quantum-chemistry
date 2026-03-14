// === Chapter 16: Vibrational Spectroscopy ===
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch16',
    number: 16,
    title: 'Vibrational Spectroscopy',
    subtitle: 'Normal modes, IR intensities, and anharmonicity from first principles',
    sections: [
        // ========== SECTION 1: The Harmonic Approximation ==========
        {
            id: 'sec01-harmonic-approximation',
            title: 'The Harmonic Approximation',
            content: `
<h2>16.1 The Harmonic Approximation</h2>

<div class="env-block intuition">
<div class="env-title">Motivation</div>
<div class="env-body">
<p>Molecules vibrate around their equilibrium geometries. Every infrared spectrum, every zero-point energy correction, and every thermochemical quantity depends on these vibrations. The starting point for all vibrational analysis is the <em>harmonic approximation</em>: expanding the potential energy surface (PES) to second order around the equilibrium geometry. This leads to the Hessian matrix, mass-weighted coordinates, and the concept of normal modes, which are the natural collective vibrations that decouple the molecular motion into independent oscillators.</p>
</div>
</div>

<h3>Taylor Expansion of the Potential Energy Surface</h3>

<p>Consider a molecule with \\(N\\) atoms. Its geometry is specified by \\(3N\\) Cartesian coordinates collected into a vector \\(\\mathbf{x} = (x_1, y_1, z_1, x_2, \\ldots, z_N)^\\top\\). Near the equilibrium geometry \\(\\mathbf{x}_0\\) (a stationary point of the PES), the total energy \\(E(\\mathbf{x})\\) can be expanded as</p>

\\[
E(\\mathbf{x}) = E(\\mathbf{x}_0) + \\sum_i \\left(\\frac{\\partial E}{\\partial x_i}\\right)_{\\mathbf{x}_0} \\!\\! \\Delta x_i + \\frac{1}{2} \\sum_{i,j} \\left(\\frac{\\partial^2 E}{\\partial x_i \\partial x_j}\\right)_{\\mathbf{x}_0} \\!\\! \\Delta x_i \\, \\Delta x_j + \\cdots
\\]

<p>where \\(\\Delta x_i = x_i - x_{0,i}\\). At the equilibrium geometry, the first derivatives (the gradient) vanish by definition:</p>

\\[
\\left(\\frac{\\partial E}{\\partial x_i}\\right)_{\\mathbf{x}_0} = 0 \\quad \\text{for all } i.
\\]

<p>The <em>harmonic approximation</em> truncates the expansion at second order, giving</p>

\\[
E(\\mathbf{x}) \\approx E(\\mathbf{x}_0) + \\frac{1}{2} \\boldsymbol{\\Delta x}^\\top \\mathbf{H} \\, \\boldsymbol{\\Delta x}
\\]

<p>where \\(\\mathbf{H}\\) is the <em>Hessian matrix</em> of second derivatives.</p>

<div class="env-block definition">
<div class="env-title">Definition 16.1.1 (Hessian Matrix)</div>
<div class="env-body">
The <em>Hessian matrix</em> (or force constant matrix) is the \\(3N \\times 3N\\) matrix with elements
\\[
H_{ij} = \\left(\\frac{\\partial^2 E}{\\partial x_i \\partial x_j}\\right)_{\\mathbf{x}_0}.
\\]
It is real and symmetric: \\(H_{ij} = H_{ji}\\). At a true minimum, \\(\\mathbf{H}\\) is positive semi-definite (all eigenvalues \\(\\geq 0\\)).
</div>
</div>

<div class="env-block remark">
<div class="env-title">Computational Methods for the Hessian</div>
<div class="env-body">
<p>The Hessian can be computed in several ways:</p>
<ul>
<li><strong>Numerical differentiation:</strong> Finite differences of analytical gradients. Requires \\(6N\\) gradient evaluations (central differences). Common in DFT codes.</li>
<li><strong>Analytical second derivatives:</strong> Available for HF, DFT, MP2, and some coupled cluster methods. Much more efficient but algorithmically complex.</li>
<li><strong>Semi-numerical:</strong> Analytical first derivatives of analytical gradients with respect to nuclear coordinates.</li>
</ul>
</div>
</div>

<h3>Mass-Weighted Coordinates</h3>

<p>The classical equations of motion for nuclear displacement are</p>

\\[
m_i \\ddot{\\Delta x}_i = -\\sum_j H_{ij} \\, \\Delta x_j
\\]

<p>where \\(m_i\\) is the mass of the atom associated with coordinate \\(i\\). To decouple the mass from the force constants, we introduce <em>mass-weighted coordinates</em>:</p>

\\[
q_i = \\sqrt{m_i} \\, \\Delta x_i.
\\]

<div class="env-block definition">
<div class="env-title">Definition 16.1.2 (Mass-Weighted Hessian)</div>
<div class="env-body">
The <em>mass-weighted Hessian</em> is defined as
\\[
\\tilde{H}_{ij} = \\frac{H_{ij}}{\\sqrt{m_i \\, m_j}}.
\\]
In matrix form, \\(\\tilde{\\mathbf{H}} = \\mathbf{M}^{-1/2} \\mathbf{H} \\, \\mathbf{M}^{-1/2}\\) where \\(\\mathbf{M} = \\operatorname{diag}(m_1, m_1, m_1, m_2, \\ldots, m_N)\\) repeats each atomic mass three times (once per Cartesian direction).
</div>
</div>

<p>The equations of motion in mass-weighted coordinates become</p>

\\[
\\ddot{q}_i = -\\sum_j \\tilde{H}_{ij} \\, q_j
\\]

<p>which is an eigenvalue problem when we seek solutions of the form \\(q_i(t) = A_i \\cos(\\omega t + \\phi)\\).</p>

<h3>Translations and Rotations</h3>

<p>Of the \\(3N\\) eigenvalues of \\(\\tilde{\\mathbf{H}}\\), exactly 6 (for nonlinear molecules) or 5 (for linear molecules) correspond to translations and rotations of the molecule as a whole. These modes have eigenvalue zero (no restoring force). The remaining \\(3N - 6\\) (or \\(3N - 5\\)) eigenvalues are the genuine vibrational frequencies.</p>

<div class="env-block theorem">
<div class="env-title">Theorem 16.1.3 (Vibrational Degrees of Freedom)</div>
<div class="env-body">
A molecule with \\(N\\) atoms has:
<ul>
<li>3 translational degrees of freedom,</li>
<li>3 rotational degrees of freedom (2 if linear),</li>
<li>\\(N_{\\text{vib}} = 3N - 6\\) vibrational modes (\\(3N - 5\\) if linear).</li>
</ul>
At a true equilibrium geometry, the \\(N_{\\text{vib}}\\) vibrational eigenvalues of the mass-weighted Hessian are all strictly positive.
</div>
</div>

<div class="env-block example">
<div class="env-title">Example 16.1.4 (Water Molecule)</div>
<div class="env-body">
<p>Water (H\\(_2\\)O) has \\(N = 3\\) atoms, hence \\(3 \\times 3 - 6 = 3\\) vibrational modes:</p>
<ol>
<li>Symmetric O-H stretch (\\(\\nu_1 \\approx 3657\\) cm\\(^{-1}\\))</li>
<li>H-O-H bend (\\(\\nu_2 \\approx 1595\\) cm\\(^{-1}\\))</li>
<li>Asymmetric O-H stretch (\\(\\nu_3 \\approx 3756\\) cm\\(^{-1}\\))</li>
</ol>
<p>These correspond to the three nonzero eigenvalues of the mass-weighted Hessian.</p>
</div>
</div>

<div class="env-block warning">
<div class="env-title">Imaginary Frequencies</div>
<div class="env-body">
If the Hessian has one or more negative eigenvalues, the corresponding frequencies are reported as <em>imaginary</em> (conventionally printed as negative numbers). This indicates a transition state (one imaginary frequency) or higher-order saddle point (multiple imaginary frequencies), not a true minimum.
</div>
</div>

<div class="viz-placeholder" data-viz="viz-normal-mode-animator"></div>

<h3>Connection to Quantum Mechanics</h3>

<p>Within the harmonic approximation, each normal mode behaves as an independent quantum harmonic oscillator. The energy levels of mode \\(k\\) are</p>

\\[
E_{n_k} = \\hbar \\omega_k \\left(n_k + \\frac{1}{2}\\right), \\quad n_k = 0, 1, 2, \\ldots
\\]

<p>where \\(\\omega_k = \\sqrt{\\lambda_k}\\) and \\(\\lambda_k\\) is the \\(k\\)-th eigenvalue of the mass-weighted Hessian. The zero-point vibrational energy (ZPVE) is the sum of ground-state energies:</p>

\\[
E_{\\text{ZPE}} = \\frac{1}{2} \\sum_{k=1}^{N_{\\text{vib}}} \\hbar \\omega_k.
\\]

<div class="env-block proposition">
<div class="env-title">Proposition 16.1.5 (Frequency Unit Conversion)</div>
<div class="env-body">
The eigenvalue \\(\\lambda_k\\) of the mass-weighted Hessian (in atomic units: \\(E_h / (m_e \\, a_0^2)\\)) converts to a wavenumber \\(\\tilde{\\nu}_k\\) in cm\\(^{-1}\\) via
\\[
\\tilde{\\nu}_k = \\frac{1}{2\\pi c} \\sqrt{\\lambda_k} \\quad \\text{(in appropriate unit system)}.
\\]
In practice, quantum chemistry codes report frequencies directly in cm\\(^{-1}\\) after internal unit conversions.
</div>
</div>
`,
            visualizations: [
                {
                    id: 'viz-normal-mode-animator',
                    title: 'Normal Modes of a Triatomic Molecule',
                    description: 'Watch the three vibrational modes of a bent triatomic molecule (e.g., H\\(_2\\)O). Use the buttons to switch between the symmetric stretch, bend, and asymmetric stretch. The slider controls the amplitude of vibration.',
                    setup(body, controls) {
                        const viz = new VizEngine(body, { scale: 60, originX: 280, originY: 200 });
                        let mode = 0; // 0: sym stretch, 1: bend, 2: asym stretch
                        let amplitude = 0.5;

                        const modeNames = ['Symmetric Stretch', 'Bend', 'Asymmetric Stretch'];
                        const modeFreqs = ['3657 cm⁻¹', '1595 cm⁻¹', '3756 cm⁻¹'];

                        VizEngine.createButton(controls, 'Sym. Stretch', () => { mode = 0; });
                        VizEngine.createButton(controls, 'Bend', () => { mode = 1; });
                        VizEngine.createButton(controls, 'Asym. Stretch', () => { mode = 2; });
                        VizEngine.createSlider(controls, 'Amplitude', 0.1, 1.0, 0.5, 0.05, v => { amplitude = v; });

                        // Equilibrium positions (bent triatomic, angle ~104.5 deg)
                        const angle = 104.5 * Math.PI / 180;
                        const bondLen = 1.2;
                        const eqO = [0, 0.3];
                        const eqH1 = [-bondLen * Math.sin(angle / 2), 0.3 - bondLen * Math.cos(angle / 2)];
                        const eqH2 = [bondLen * Math.sin(angle / 2), 0.3 - bondLen * Math.cos(angle / 2)];

                        function draw(t) {
                            viz.clear();
                            const phase = t * 0.003;
                            const A = amplitude * Math.sin(phase);

                            let oPos, h1Pos, h2Pos;

                            if (mode === 0) {
                                // Symmetric stretch: both H move in/out symmetrically
                                const dx = A * 0.4;
                                const dirH1 = [eqH1[0] - eqO[0], eqH1[1] - eqO[1]];
                                const dirH2 = [eqH2[0] - eqO[0], eqH2[1] - eqO[1]];
                                const len1 = Math.sqrt(dirH1[0] * dirH1[0] + dirH1[1] * dirH1[1]);
                                const len2 = Math.sqrt(dirH2[0] * dirH2[0] + dirH2[1] * dirH2[1]);
                                h1Pos = [eqH1[0] + dx * dirH1[0] / len1, eqH1[1] + dx * dirH1[1] / len1];
                                h2Pos = [eqH2[0] + dx * dirH2[0] / len2, eqH2[1] + dx * dirH2[1] / len2];
                                oPos = [eqO[0], eqO[1]];
                            } else if (mode === 1) {
                                // Bend: angle changes, H atoms move tangentially
                                const dAngle = A * 0.3;
                                const a2 = angle / 2 + dAngle;
                                h1Pos = [-bondLen * Math.sin(a2), 0.3 - bondLen * Math.cos(a2)];
                                h2Pos = [bondLen * Math.sin(a2), 0.3 - bondLen * Math.cos(a2)];
                                oPos = [eqO[0], eqO[1]];
                            } else {
                                // Asymmetric stretch: one H in, other out
                                const dx = A * 0.4;
                                const dirH1 = [eqH1[0] - eqO[0], eqH1[1] - eqO[1]];
                                const dirH2 = [eqH2[0] - eqO[0], eqH2[1] - eqO[1]];
                                const len1 = Math.sqrt(dirH1[0] * dirH1[0] + dirH1[1] * dirH1[1]);
                                const len2 = Math.sqrt(dirH2[0] * dirH2[0] + dirH2[1] * dirH2[1]);
                                h1Pos = [eqH1[0] + dx * dirH1[0] / len1, eqH1[1] + dx * dirH1[1] / len1];
                                h2Pos = [eqH2[0] - dx * dirH2[0] / len2, eqH2[1] - dx * dirH2[1] / len2];
                                // O shifts to conserve center of mass
                                oPos = [eqO[0] + A * 0.05, eqO[1]];
                            }

                            // Draw bonds
                            const ctx = viz.ctx;
                            const [sO] = [viz.toScreen(oPos[0], oPos[1])];
                            const sOx = viz.toScreen(oPos[0], oPos[1]);
                            const sH1 = viz.toScreen(h1Pos[0], h1Pos[1]);
                            const sH2 = viz.toScreen(h2Pos[0], h2Pos[1]);

                            ctx.strokeStyle = viz.colors.muted;
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            ctx.moveTo(sH1[0], sH1[1]);
                            ctx.lineTo(sOx[0], sOx[1]);
                            ctx.stroke();
                            ctx.beginPath();
                            ctx.moveTo(sH2[0], sH2[1]);
                            ctx.lineTo(sOx[0], sOx[1]);
                            ctx.stroke();

                            // Draw atoms
                            // Oxygen (red, larger)
                            ctx.fillStyle = viz.colors.red;
                            ctx.beginPath();
                            ctx.arc(sOx[0], sOx[1], 18, 0, Math.PI * 2);
                            ctx.fill();
                            ctx.fillStyle = '#fff';
                            ctx.font = 'bold 12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            ctx.fillText('O', sOx[0], sOx[1]);

                            // Hydrogens (blue, smaller)
                            ctx.fillStyle = viz.colors.blue;
                            ctx.beginPath();
                            ctx.arc(sH1[0], sH1[1], 12, 0, Math.PI * 2);
                            ctx.fill();
                            ctx.fillStyle = '#fff';
                            ctx.font = 'bold 10px -apple-system,sans-serif';
                            ctx.fillText('H', sH1[0], sH1[1]);

                            ctx.fillStyle = viz.colors.blue;
                            ctx.beginPath();
                            ctx.arc(sH2[0], sH2[1], 12, 0, Math.PI * 2);
                            ctx.fill();
                            ctx.fillStyle = '#fff';
                            ctx.fillText('H', sH2[0], sH2[1]);

                            // Draw displacement arrows for clarity
                            if (mode === 0) {
                                const drawArr = (from, to, col) => {
                                    const dx = to[0] - from[0], dy = to[1] - from[1];
                                    const len = Math.sqrt(dx * dx + dy * dy);
                                    if (len < 2) return;
                                    const sf = viz.toScreen(from[0], from[1]);
                                    const st = viz.toScreen(to[0], to[1]);
                                    ctx.strokeStyle = col;
                                    ctx.lineWidth = 2;
                                    ctx.setLineDash([4, 3]);
                                    ctx.beginPath();
                                    ctx.moveTo(sf[0], sf[1]);
                                    ctx.lineTo(st[0], st[1]);
                                    ctx.stroke();
                                    ctx.setLineDash([]);
                                };
                            }

                            // Labels
                            viz.screenText(modeNames[mode], viz.width / 2, 25, viz.colors.white, 16, 'center');
                            viz.screenText('ν = ' + modeFreqs[mode], viz.width / 2, 48, viz.colors.yellow, 13, 'center');

                            // Equilibrium ghost
                            ctx.globalAlpha = 0.15;
                            const seO = viz.toScreen(eqO[0], eqO[1]);
                            const seH1 = viz.toScreen(eqH1[0], eqH1[1]);
                            const seH2 = viz.toScreen(eqH2[0], eqH2[1]);
                            ctx.strokeStyle = viz.colors.text;
                            ctx.lineWidth = 1.5;
                            ctx.beginPath(); ctx.moveTo(seH1[0], seH1[1]); ctx.lineTo(seO[0], seO[1]); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(seH2[0], seH2[1]); ctx.lineTo(seO[0], seO[1]); ctx.stroke();
                            ctx.beginPath(); ctx.arc(seO[0], seO[1], 18, 0, Math.PI * 2); ctx.stroke();
                            ctx.beginPath(); ctx.arc(seH1[0], seH1[1], 12, 0, Math.PI * 2); ctx.stroke();
                            ctx.beginPath(); ctx.arc(seH2[0], seH2[1], 12, 0, Math.PI * 2); ctx.stroke();
                            ctx.globalAlpha = 1.0;

                            viz.screenText('Ghost = equilibrium geometry', viz.width / 2, viz.height - 15, viz.colors.text, 11, 'center');
                        }

                        viz.animate(draw);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'A diatomic molecule AB has atomic masses \\(m_A\\) and \\(m_B\\) and a force constant \\(k\\). Show that the vibrational frequency is \\(\\omega = \\sqrt{k/\\mu}\\) where \\(\\mu = m_A m_B / (m_A + m_B)\\) is the reduced mass.',
                    hint: 'Write the Hessian in Cartesian coordinates for the two atoms constrained to 1D motion, then transform to mass-weighted coordinates and diagonalize.',
                    solution: 'In 1D, with displacements \\(\\Delta x_A\\) and \\(\\Delta x_B\\), the potential is \\(V = \\frac{k}{2}(\\Delta x_B - \\Delta x_A)^2\\). The Hessian is \\(\\mathbf{H} = \\begin{pmatrix} k & -k \\\\ -k & k \\end{pmatrix}\\). Mass-weighting gives \\(\\tilde{H}_{11} = k/m_A\\), \\(\\tilde{H}_{22} = k/m_B\\), \\(\\tilde{H}_{12} = -k/\\sqrt{m_A m_B}\\). One eigenvalue is 0 (translation) and the other is \\(k(1/m_A + 1/m_B) = k/\\mu\\). Hence \\(\\omega = \\sqrt{k/\\mu}\\).'
                },
                {
                    question: 'How many vibrational modes does CO\\(_2\\) have? List them and explain why the symmetric stretch is IR-inactive.',
                    hint: 'CO\\(_2\\) is linear, so it has \\(3N - 5\\) vibrational modes. Consider the symmetry of each mode and whether it changes the dipole moment.',
                    solution: 'CO\\(_2\\) has \\(N = 3\\) atoms and is linear, giving \\(3(3) - 5 = 4\\) modes: symmetric stretch (\\(\\nu_1\\)), two degenerate bends (\\(\\nu_2\\)), and asymmetric stretch (\\(\\nu_3\\)). The symmetric stretch preserves the center of symmetry and does not change the dipole moment (which remains zero), so \\(\\partial \\mu / \\partial Q_1 = 0\\) and it is IR-inactive. It is Raman-active because the polarizability changes.'
                },
                {
                    question: 'A frequency calculation on a geometry-optimized structure yields one imaginary frequency of \\(-342i\\) cm\\(^{-1}\\). What does this mean, and what should you do?',
                    hint: 'Consider what a negative eigenvalue of the Hessian implies about the curvature of the PES at that geometry.',
                    solution: 'An imaginary frequency means the geometry is a first-order saddle point (transition state), not a minimum. The Hessian has one negative eigenvalue, indicating a direction of negative curvature. You should re-optimize the geometry: either (a) displace along the imaginary mode and re-optimize to find the true minimum, or (b) use a tighter convergence criterion. If you intended to find a transition state, one imaginary frequency confirms it.'
                },
                {
                    question: 'Derive the zero-point energy of H\\(_2\\)O given the experimental frequencies \\(\\nu_1 = 3657\\), \\(\\nu_2 = 1595\\), \\(\\nu_3 = 3756\\) cm\\(^{-1}\\).',
                    hint: 'Convert cm\\(^{-1}\\) to energy using \\(E = hc\\tilde{\\nu}\\), then sum \\(\\frac{1}{2}h c \\tilde{\\nu}_k\\) over all modes.',
                    solution: 'The ZPE is \\(E_{\\text{ZPE}} = \\frac{1}{2} hc (\\tilde{\\nu}_1 + \\tilde{\\nu}_2 + \\tilde{\\nu}_3) = \\frac{1}{2} hc (3657 + 1595 + 3756) = \\frac{1}{2} hc \\times 9008\\) cm\\(^{-1}\\) \\(= 4504 \\, hc\\) cm\\(^{-1}\\). In energy: \\(E_{\\text{ZPE}} = 4504 \\times 1.986 \\times 10^{-23}\\) J \\(\\approx 8.94 \\times 10^{-20}\\) J \\(\\approx 0.559\\) eV \\(\\approx 12.9\\) kcal/mol.'
                },
                {
                    question: 'Why are the six (or five) zero-frequency modes not exactly zero in a practical calculation? Name two numerical reasons.',
                    hint: 'Think about what happens when the geometry optimization does not reach the exact stationary point, and when finite precision arithmetic is used.',
                    solution: 'Two reasons: (1) <em>Incomplete geometry optimization:</em> if residual gradients remain, the expansion point is not exactly a stationary point, so translations/rotations acquire small nonzero eigenvalues. (2) <em>Numerical noise in the Hessian:</em> finite difference steps, basis set superposition, and round-off errors introduce small asymmetries and inaccuracies. Typically these spurious frequencies are \\(<50\\) cm\\(^{-1}\\) and are projected out or ignored.'
                }
            ]
        },

        // ========== SECTION 2: Normal Mode Analysis ==========
        {
            id: 'sec02-normal-mode-analysis',
            title: 'Normal Mode Analysis',
            content: `
<h2>16.2 Normal Mode Analysis</h2>

<p>In this section we formalize the diagonalization procedure that transforms coupled nuclear displacements into independent <em>normal modes</em>. Each normal mode oscillates at a single characteristic frequency, and the total vibrational wavefunction factorizes into a product of one-dimensional harmonic oscillator wavefunctions.</p>

<h3>The Eigenvalue Problem</h3>

<p>Substituting the harmonic ansatz \\(q_i(t) = A_i \\cos(\\omega t + \\phi)\\) into the mass-weighted equations of motion gives</p>

\\[
\\tilde{\\mathbf{H}} \\, \\mathbf{A} = \\omega^2 \\mathbf{A}
\\]

<p>where \\(\\mathbf{A}\\) is the eigenvector (the normal mode) and \\(\\omega^2\\) is the eigenvalue. Since \\(\\tilde{\\mathbf{H}}\\) is real symmetric, all eigenvalues are real, and the eigenvectors can be chosen orthonormal.</p>

<div class="env-block definition">
<div class="env-title">Definition 16.2.1 (Normal Modes)</div>
<div class="env-body">
The <em>normal modes</em> \\(\\{\\mathbf{L}_k\\}_{k=1}^{3N}\\) are the orthonormal eigenvectors of the mass-weighted Hessian \\(\\tilde{\\mathbf{H}}\\). They satisfy
\\[
\\tilde{\\mathbf{H}} \\, \\mathbf{L}_k = \\lambda_k \\mathbf{L}_k, \\quad \\mathbf{L}_k^\\top \\mathbf{L}_l = \\delta_{kl}.
\\]
The corresponding <em>normal coordinates</em> are \\(Q_k = \\mathbf{L}_k^\\top \\mathbf{q}\\), where \\(\\mathbf{q}\\) is the vector of mass-weighted displacements.
</div>
</div>

<div class="env-block theorem">
<div class="env-title">Theorem 16.2.2 (Decoupling of Normal Modes)</div>
<div class="env-body">
In normal coordinates, the harmonic potential energy and kinetic energy both separate into sums of independent terms:
\\[
V = \\frac{1}{2} \\sum_{k=1}^{N_{\\text{vib}}} \\lambda_k Q_k^2, \\qquad T = \\frac{1}{2} \\sum_{k=1}^{N_{\\text{vib}}} \\dot{Q}_k^2.
\\]
Consequently, the total Hamiltonian is a sum of independent harmonic oscillators:
\\[
\\hat{H}_{\\text{vib}} = \\sum_{k=1}^{N_{\\text{vib}}} \\left( -\\frac{\\hbar^2}{2} \\frac{\\partial^2}{\\partial Q_k^2} + \\frac{1}{2} \\omega_k^2 Q_k^2 \\right)
\\]
where \\(\\omega_k = \\sqrt{\\lambda_k}\\).
</div>
</div>

<div class="env-block proof">
<div class="env-title">Proof</div>
<div class="env-body">
<p>Collect the eigenvectors as columns of the orthogonal matrix \\(\\mathbf{L} = [\\mathbf{L}_1 \\mid \\cdots \\mid \\mathbf{L}_{3N}]\\). The transformation \\(\\mathbf{Q} = \\mathbf{L}^\\top \\mathbf{q}\\) gives</p>
\\[
V = \\frac{1}{2} \\mathbf{q}^\\top \\tilde{\\mathbf{H}} \\mathbf{q} = \\frac{1}{2} \\mathbf{Q}^\\top \\mathbf{L}^\\top \\tilde{\\mathbf{H}} \\mathbf{L} \\, \\mathbf{Q} = \\frac{1}{2} \\mathbf{Q}^\\top \\boldsymbol{\\Lambda} \\, \\mathbf{Q} = \\frac{1}{2} \\sum_k \\lambda_k Q_k^2
\\]
<p>since \\(\\mathbf{L}^\\top \\tilde{\\mathbf{H}} \\mathbf{L} = \\boldsymbol{\\Lambda} = \\operatorname{diag}(\\lambda_1, \\ldots, \\lambda_{3N})\\). Similarly, \\(T = \\frac{1}{2} \\dot{\\mathbf{q}}^\\top \\dot{\\mathbf{q}} = \\frac{1}{2} \\dot{\\mathbf{Q}}^\\top \\mathbf{L}^\\top \\mathbf{L} \\dot{\\mathbf{Q}} = \\frac{1}{2} \\dot{\\mathbf{Q}}^\\top \\dot{\\mathbf{Q}}\\) by orthogonality of \\(\\mathbf{L}\\).</p>
<div class="qed">∎</div>
</div>
</div>

<h3>Vibrational Wavefunctions and Selection Rules</h3>

<p>Since the Hamiltonian separates, the total vibrational wavefunction is a product of harmonic oscillator wavefunctions:</p>

\\[
\\Psi_{\\text{vib}}(Q_1, \\ldots, Q_{N_{\\text{vib}}}) = \\prod_{k=1}^{N_{\\text{vib}}} \\psi_{n_k}(Q_k)
\\]

<p>where \\(\\psi_{n_k}\\) is the \\(n_k\\)-th eigenstate of the one-dimensional harmonic oscillator:</p>

\\[
\\psi_n(Q) = \\left(\\frac{\\omega}{\\pi \\hbar}\\right)^{1/4} \\frac{1}{\\sqrt{2^n n!}} H_n\\!\\left(\\sqrt{\\frac{\\omega}{\\hbar}} Q\\right) \\exp\\!\\left(-\\frac{\\omega Q^2}{2\\hbar}\\right).
\\]

<p>Here \\(H_n\\) denotes the physicist's Hermite polynomial of degree \\(n\\).</p>

<div class="env-block proposition">
<div class="env-title">Proposition 16.2.3 (Harmonic Selection Rule)</div>
<div class="env-body">
Within the harmonic approximation, the selection rule for infrared absorption/emission is \\(\\Delta n_k = \\pm 1\\) for exactly one mode \\(k\\) and \\(\\Delta n_j = 0\\) for all \\(j \\neq k\\). The transition frequency is \\(\\omega_k\\), independent of the quantum number \\(n_k\\). Overtones (\\(|\\Delta n| > 1\\)) and combination bands are forbidden in the harmonic model.
</div>
</div>

<h3>Symmetry and Group Theory</h3>

<p>Normal modes transform according to irreducible representations of the molecular point group. This provides a powerful tool for predicting which modes are IR-active, Raman-active, or inactive.</p>

<div class="env-block theorem">
<div class="env-title">Theorem 16.2.4 (Symmetry Selection Rules)</div>
<div class="env-body">
<ul>
<li>A mode is <em>IR-active</em> if and only if its irreducible representation contains the same symmetry species as at least one component of the dipole moment vector \\((\\mu_x, \\mu_y, \\mu_z)\\).</li>
<li>A mode is <em>Raman-active</em> if and only if its irreducible representation contains the same symmetry species as at least one component of the polarizability tensor \\(\\alpha_{ij}\\).</li>
</ul>
</div>
</div>

<div class="env-block corollary">
<div class="env-title">Corollary 16.2.5 (Mutual Exclusion Rule)</div>
<div class="env-body">
For molecules with a center of inversion (point group containing \\(i\\)), no vibrational mode can be simultaneously IR-active and Raman-active.
</div>
</div>

<div class="env-block example">
<div class="env-title">Example 16.2.6 (CO\\(_2\\), \\(D_{\\infty h}\\))</div>
<div class="env-body">
<p>CO\\(_2\\) has \\(D_{\\infty h}\\) symmetry with a center of inversion. Its four modes decompose as:</p>
<ul>
<li>\\(\\nu_1\\) (symmetric stretch): \\(\\Sigma_g^+\\) -- IR-inactive, Raman-active</li>
<li>\\(\\nu_2\\) (degenerate bend): \\(\\Pi_u\\) -- IR-active, Raman-inactive</li>
<li>\\(\\nu_3\\) (asymmetric stretch): \\(\\Sigma_u^+\\) -- IR-active, Raman-inactive</li>
</ul>
<p>This confirms the mutual exclusion rule: no mode is both IR and Raman active.</p>
</div>
</div>
`,
            visualizations: [],
            exercises: [
                {
                    question: 'A molecule has a mass-weighted Hessian with eigenvalues (in atomic units) \\(\\lambda_1 = 0\\), \\(\\lambda_2 = 0\\), \\(\\lambda_3 = 0\\), \\(\\lambda_4 = 0\\), \\(\\lambda_5 = 0\\), \\(\\lambda_6 = 0.0025\\), \\(\\lambda_7 = 0.0081\\), \\(\\lambda_8 = 0.0100\\), \\(\\lambda_9 = 0.0144\\). How many atoms does the molecule have, and is it linear or nonlinear?',
                    hint: 'Count the zero eigenvalues (translations and rotations) and the nonzero ones (vibrations). Use \\(N_{\\text{vib}} = 3N - 6\\) or \\(3N - 5\\).',
                    solution: 'There are 6 zero eigenvalues (3 translations + 3 rotations, so the molecule is nonlinear) and 4 nonzero eigenvalues (vibrations). From \\(3N - 6 = 4\\), we get \\(N = 10/3\\), which is not an integer. Rechecking: 9 total eigenvalues means \\(3N = 9\\), so \\(N = 3\\). With 6 zero modes and 3 vibrational modes, we confirm it is a nonlinear triatomic (\\(3 \\times 3 - 6 = 3\\)). Wait: there are 4 nonzero eigenvalues, implying \\(3N = 10\\), which is impossible. Correcting: there are 5 zero and 4 nonzero, giving \\(3N - 5 = 4 \\Rightarrow N = 3\\), a linear triatomic molecule like CO\\(_2\\).'
                },
                {
                    question: 'Prove that the normal coordinates \\(Q_k\\) are related to the Cartesian displacements by an orthogonal transformation, and hence preserve the total kinetic energy.',
                    hint: 'Use the fact that the eigenvectors of a real symmetric matrix form an orthogonal matrix.',
                    solution: 'Since \\(\\tilde{\\mathbf{H}}\\) is real symmetric, the spectral theorem guarantees orthonormal eigenvectors \\(\\{\\mathbf{L}_k\\}\\). Forming \\(\\mathbf{L}\\) with these as columns, \\(\\mathbf{L}^\\top \\mathbf{L} = \\mathbf{I}\\). The normal coordinates \\(\\mathbf{Q} = \\mathbf{L}^\\top \\mathbf{q}\\) are obtained by an orthogonal transformation. The kinetic energy transforms as \\(T = \\frac{1}{2}\\dot{\\mathbf{q}}^\\top \\dot{\\mathbf{q}} = \\frac{1}{2}(\\mathbf{L}\\dot{\\mathbf{Q}})^\\top(\\mathbf{L}\\dot{\\mathbf{Q}}) = \\frac{1}{2}\\dot{\\mathbf{Q}}^\\top \\mathbf{L}^\\top \\mathbf{L} \\dot{\\mathbf{Q}} = \\frac{1}{2}\\dot{\\mathbf{Q}}^\\top \\dot{\\mathbf{Q}}\\), preserving the form.'
                },
                {
                    question: 'For a triatomic molecule with the character table of \\(C_{2v}\\), decompose the reducible representation of nuclear displacements (\\(\\Gamma_{\\text{cart}}\\)) into irreducible representations, then subtract translations and rotations to find the symmetry species of the vibrational modes.',
                    hint: 'Use \\(\\Gamma_{\\text{cart}} = \\Gamma_{\\text{unmoved}} \\otimes \\Gamma_{xyz}\\) and subtract \\(\\Gamma_{\\text{trans}} = \\Gamma_{xyz}\\) and \\(\\Gamma_{\\text{rot}} = \\Gamma_{R_x, R_y, R_z}\\).',
                    solution: 'For H\\(_2\\)O in \\(C_{2v}\\): \\(\\Gamma_{\\text{cart}} = 3A_1 + A_2 + 3B_1 + 2B_2\\). Translations: \\(A_1 + B_1 + B_2\\). Rotations: \\(A_2 + B_1 + B_2\\). Subtracting: \\(\\Gamma_{\\text{vib}} = 2A_1 + B_1\\). Thus two totally symmetric modes (\\(A_1\\): symmetric stretch and bend) and one antisymmetric mode (\\(B_1\\): asymmetric stretch). All three are both IR- and Raman-active since \\(C_{2v}\\) lacks a center of inversion.'
                },
                {
                    question: 'Show that for a harmonic oscillator, the selection rule \\(\\Delta n = \\pm 1\\) follows from the matrix element \\(\\langle n\' | Q | n \\rangle\\).',
                    hint: 'Use the ladder operator representation \\(Q = \\sqrt{\\hbar/(2\\omega)}(\\hat{a} + \\hat{a}^\\dagger)\\).',
                    solution: 'The position operator in terms of creation/annihilation operators is \\(\\hat{Q} = \\sqrt{\\frac{\\hbar}{2\\omega}}(\\hat{a} + \\hat{a}^\\dagger)\\). Thus \\(\\langle n\' | \\hat{Q} | n \\rangle = \\sqrt{\\frac{\\hbar}{2\\omega}}(\\sqrt{n}\\,\\delta_{n\',n-1} + \\sqrt{n+1}\\,\\delta_{n\',n+1})\\). This is nonzero only when \\(n\' = n \\pm 1\\), establishing the \\(\\Delta n = \\pm 1\\) selection rule.'
                },
                {
                    question: 'Benzene (C\\(_6\\)H\\(_6\\)) has 12 atoms. How many vibrational modes does it have? How many are IR-active and how many are Raman-active? (You may use character tables for \\(D_{6h}\\).)',
                    hint: 'Benzene has \\(3 \\times 12 - 6 = 30\\) vibrational modes. Use the \\(D_{6h}\\) character table and the mutual exclusion rule.',
                    solution: 'Benzene has \\(3(12) - 6 = 30\\) normal modes. From the \\(D_{6h}\\) character table decomposition: \\(\\Gamma_{\\text{vib}} = 2A_{1g} + A_{2g} + 4E_{2g} + A_{2u} + 2B_{1u} + 2B_{2u} + E_{1g} + 3E_{1u} + 2E_{2u} + 2B_{2g}\\). IR-active modes must belong to species containing \\((x,y)\\) or \\(z\\): these are \\(A_{2u}\\) (\\(z\\)) and \\(E_{1u}\\) (\\(x,y\\)), giving \\(1 + 3 \\times 2 = 7\\) IR-active modes. Raman-active modes correspond to species containing \\(\\alpha_{ij}\\) components: \\(A_{1g}\\), \\(E_{1g}\\), \\(E_{2g}\\), giving \\(2 + 1 \\times 2 + 4 \\times 2 = 12\\) Raman-active modes. By mutual exclusion (\\(D_{6h}\\) has inversion), no mode is both IR and Raman active.'
                }
            ]
        },

        // ========== SECTION 3: IR and Raman Intensities ==========
        {
            id: 'sec03-ir-raman-intensities',
            title: 'IR and Raman Intensities',
            content: `
<h2>16.3 IR and Raman Intensities</h2>

<p>Knowing the vibrational frequencies tells us <em>where</em> spectral peaks appear, but to understand the full spectrum we must also compute <em>how intense</em> each peak is. IR intensities depend on dipole moment derivatives, while Raman intensities depend on polarizability derivatives.</p>

<h3>Infrared Absorption Intensities</h3>

<p>The intensity of an infrared transition for mode \\(k\\) is proportional to the square of the transition dipole moment. Within the harmonic approximation and the double-harmonic approximation (linear expansion of the dipole moment in normal coordinates), the IR intensity is</p>

\\[
I_k^{\\text{IR}} \\propto \\left| \\frac{\\partial \\boldsymbol{\\mu}}{\\partial Q_k} \\right|^2 = \\left( \\frac{\\partial \\mu_x}{\\partial Q_k} \\right)^2 + \\left( \\frac{\\partial \\mu_y}{\\partial Q_k} \\right)^2 + \\left( \\frac{\\partial \\mu_z}{\\partial Q_k} \\right)^2
\\]

<p>where \\(\\boldsymbol{\\mu} = (\\mu_x, \\mu_y, \\mu_z)\\) is the molecular dipole moment vector evaluated at the equilibrium geometry.</p>

<div class="env-block definition">
<div class="env-title">Definition 16.3.1 (Double-Harmonic Approximation)</div>
<div class="env-body">
The <em>double-harmonic approximation</em> combines two assumptions:
<ol>
<li>The PES is approximated as harmonic (truncated at second order in nuclear displacements).</li>
<li>The dipole moment surface is approximated as linear (truncated at first order):
\\[
\\boldsymbol{\\mu}(\\mathbf{Q}) \\approx \\boldsymbol{\\mu}_0 + \\sum_k \\frac{\\partial \\boldsymbol{\\mu}}{\\partial Q_k} Q_k.
\\]
</li>
</ol>
</div>
</div>

<div class="env-block theorem">
<div class="env-title">Theorem 16.3.2 (IR Intensity Formula)</div>
<div class="env-body">
Under the double-harmonic approximation, the integrated absorption coefficient for the fundamental transition \\(0 \\to 1\\) of mode \\(k\\) is
\\[
A_k = \\frac{N_A \\pi}{3c^2} \\left| \\frac{\\partial \\boldsymbol{\\mu}}{\\partial Q_k} \\right|^2
\\]
in SI units, where \\(N_A\\) is Avogadro's number and \\(c\\) is the speed of light. The derivative \\(\\partial \\boldsymbol{\\mu} / \\partial Q_k\\) is called the <em>dipole derivative</em> or <em>atomic polar tensor</em> (APT) projected onto mode \\(k\\).
</div>
</div>

<div class="env-block remark">
<div class="env-title">Computational Evaluation</div>
<div class="env-body">
<p>In practice, dipole derivatives are computed by:</p>
<ul>
<li><strong>Numerical differentiation:</strong> Evaluate the dipole moment at displaced geometries along each normal coordinate (or each Cartesian coordinate).</li>
<li><strong>Analytical derivatives:</strong> Available in HF, DFT, and some post-HF methods. Uses coupled-perturbed equations.</li>
</ul>
<p>Modern codes compute the atomic polar tensor \\(P_{\\alpha i}^A = \\partial \\mu_\\alpha / \\partial x_i^A\\) in Cartesian coordinates and then project onto normal modes via the eigenvector matrix \\(\\mathbf{L}\\).</p>
</div>
</div>

<h3>Raman Scattering Intensities</h3>

<p>Raman scattering involves inelastic photon scattering. The intensity depends on derivatives of the electronic polarizability tensor \\(\\boldsymbol{\\alpha}\\) with respect to normal coordinates.</p>

<div class="env-block definition">
<div class="env-title">Definition 16.3.3 (Raman Activity)</div>
<div class="env-body">
The <em>Raman activity</em> of mode \\(k\\) is
\\[
S_k = 45 \\bar{\\alpha}_k^{\\prime 2} + 7 \\gamma_k^{\\prime 2}
\\]
where
\\[
\\bar{\\alpha}_k' = \\frac{1}{3}\\left( \\frac{\\partial \\alpha_{xx}}{\\partial Q_k} + \\frac{\\partial \\alpha_{yy}}{\\partial Q_k} + \\frac{\\partial \\alpha_{zz}}{\\partial Q_k} \\right)
\\]
is the derivative of the mean polarizability, and
\\[
\\gamma_k^{\\prime 2} = \\frac{1}{2}\\left[ \\left(\\frac{\\partial \\alpha_{xx}}{\\partial Q_k} - \\frac{\\partial \\alpha_{yy}}{\\partial Q_k}\\right)^2 + \\left(\\frac{\\partial \\alpha_{yy}}{\\partial Q_k} - \\frac{\\partial \\alpha_{zz}}{\\partial Q_k}\\right)^2 + \\left(\\frac{\\partial \\alpha_{zz}}{\\partial Q_k} - \\frac{\\partial \\alpha_{xx}}{\\partial Q_k}\\right)^2 + 6\\left(\\frac{\\partial \\alpha_{xy}}{\\partial Q_k}\\right)^2 + 6\\left(\\frac{\\partial \\alpha_{xz}}{\\partial Q_k}\\right)^2 + 6\\left(\\frac{\\partial \\alpha_{yz}}{\\partial Q_k}\\right)^2 \\right]
\\]
is the anisotropy squared.
</div>
</div>

<div class="viz-placeholder" data-viz="viz-ir-spectrum"></div>

<h3>Units and Practical Considerations</h3>

<p>IR intensities are typically reported in km/mol (integrated absorption coefficient) or D\\(^2\\)/amu/Å\\(^2\\) (squared dipole derivative). Raman activities are in Å\\(^4\\)/amu. Converting Raman activities to scattering cross-sections requires the excitation wavelength:</p>

\\[
\\frac{d\\sigma_k}{d\\Omega} \\propto \\frac{(\\nu_0 - \\nu_k)^4}{\\nu_k} \\cdot S_k \\cdot \\frac{1}{1 - \\exp(-hc\\nu_k/k_BT)}
\\]

<p>where \\(\\nu_0\\) is the laser frequency and \\(\\nu_k\\) is the vibrational frequency.</p>

<div class="env-block example">
<div class="env-title">Example 16.3.4 (IR vs Raman Activity of CO\\(_2\\))</div>
<div class="env-body">
<table class="data-table" style="margin:12px auto;border-collapse:collapse;text-align:center;">
<tr style="border-bottom:2px solid #30363d;"><th style="padding:4px 12px;">Mode</th><th style="padding:4px 12px;">Frequency</th><th style="padding:4px 12px;">IR Active?</th><th style="padding:4px 12px;">Raman Active?</th></tr>
<tr><td>\\(\\nu_1\\) (sym. stretch)</td><td>1388 cm\\(^{-1}\\)</td><td>No</td><td>Yes</td></tr>
<tr><td>\\(\\nu_2\\) (bend, 2x degen.)</td><td>667 cm\\(^{-1}\\)</td><td>Yes</td><td>No</td></tr>
<tr><td>\\(\\nu_3\\) (asym. stretch)</td><td>2349 cm\\(^{-1}\\)</td><td>Yes</td><td>No</td></tr>
</table>
<p>The symmetric stretch does not change the dipole moment (remains zero by symmetry), so \\(\\partial\\boldsymbol{\\mu}/\\partial Q_1 = \\mathbf{0}\\). However, it changes the polarizability (bond length change alters electron cloud shape), so it is Raman-active.</p>
</div>
</div>

<div class="env-block warning">
<div class="env-title">Beyond the Double-Harmonic Approximation</div>
<div class="env-body">
The double-harmonic approximation can give qualitatively incorrect intensities for modes with large anharmonicity or strong electrical anharmonicity (nonlinear dipole moment surface). For quantitative comparison with experiment, one should include:
<ul>
<li>Mechanical anharmonicity (cubic and quartic force constants)</li>
<li>Electrical anharmonicity (quadratic and higher dipole derivatives)</li>
<li>Fermi resonance corrections</li>
</ul>
</div>
</div>
`,
            visualizations: [
                {
                    id: 'viz-ir-spectrum',
                    title: 'Simulated IR Spectrum',
                    description: 'A simulated IR spectrum using Lorentzian line shapes from computed frequencies and intensities. Adjust the line width (FWHM) to see how resolution affects the spectrum. The molecule shown has three modes.',
                    setup(body, controls) {
                        const viz = new VizEngine(body, { scale: 1, originX: 60, originY: 50 });
                        const W = viz.width;
                        const H = viz.height;
                        let fwhm = 30;

                        // Model data: frequencies (cm-1) and intensities (relative)
                        const modes = [
                            { freq: 1595, intensity: 0.6, label: 'ν₂ bend' },
                            { freq: 3657, intensity: 0.85, label: 'ν₁ sym' },
                            { freq: 3756, intensity: 1.0, label: 'ν₃ asym' }
                        ];

                        VizEngine.createSlider(controls, 'FWHM (cm⁻¹)', 5, 100, 30, 1, v => { fwhm = v; draw(); });

                        const xMin = 500, xMax = 4200;
                        const margin = { left: 60, right: 30, top: 40, bottom: 45 };
                        const plotW = W - margin.left - margin.right;
                        const plotH = H - margin.top - margin.bottom;

                        function lorentzian(x, x0, gamma) {
                            return gamma * gamma / ((x - x0) * (x - x0) + gamma * gamma);
                        }

                        function draw() {
                            const ctx = viz.ctx;
                            viz.clear();

                            // Background for plot area
                            ctx.fillStyle = '#0e0e2a';
                            ctx.fillRect(margin.left, margin.top, plotW, plotH);

                            // Compute spectrum
                            const gamma = fwhm / 2;
                            const npts = 500;
                            const spectrum = [];
                            let maxVal = 0;
                            for (let i = 0; i <= npts; i++) {
                                const x = xMin + (xMax - xMin) * i / npts;
                                let y = 0;
                                for (const m of modes) {
                                    y += m.intensity * lorentzian(x, m.freq, gamma);
                                }
                                spectrum.push({ x, y });
                                if (y > maxVal) maxVal = y;
                            }

                            // Draw gridlines
                            ctx.strokeStyle = '#1a1a40';
                            ctx.lineWidth = 0.5;
                            for (let f = 1000; f <= 4000; f += 500) {
                                const px = margin.left + (f - xMin) / (xMax - xMin) * plotW;
                                ctx.beginPath(); ctx.moveTo(px, margin.top); ctx.lineTo(px, margin.top + plotH); ctx.stroke();
                            }
                            for (let a = 0.2; a <= 1.0; a += 0.2) {
                                const py = margin.top + plotH - a * plotH;
                                ctx.beginPath(); ctx.moveTo(margin.left, py); ctx.lineTo(margin.left + plotW, py); ctx.stroke();
                            }

                            // Draw spectrum as filled area
                            ctx.beginPath();
                            ctx.moveTo(margin.left, margin.top + plotH);
                            for (const pt of spectrum) {
                                const px = margin.left + (pt.x - xMin) / (xMax - xMin) * plotW;
                                const py = margin.top + plotH - (pt.y / maxVal) * plotH * 0.9;
                                ctx.lineTo(px, py);
                            }
                            ctx.lineTo(margin.left + plotW, margin.top + plotH);
                            ctx.closePath();
                            ctx.fillStyle = 'rgba(88,166,255,0.25)';
                            ctx.fill();

                            // Draw spectrum line
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            let started = false;
                            for (const pt of spectrum) {
                                const px = margin.left + (pt.x - xMin) / (xMax - xMin) * plotW;
                                const py = margin.top + plotH - (pt.y / maxVal) * plotH * 0.9;
                                if (!started) { ctx.moveTo(px, py); started = true; } else { ctx.lineTo(px, py); }
                            }
                            ctx.stroke();

                            // Mark peak positions
                            for (const m of modes) {
                                const px = margin.left + (m.freq - xMin) / (xMax - xMin) * plotW;
                                const peakY = m.intensity * lorentzian(m.freq, m.freq, gamma);
                                const py = margin.top + plotH - (peakY / maxVal) * plotH * 0.9;
                                ctx.fillStyle = viz.colors.orange;
                                ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2); ctx.fill();
                                ctx.fillStyle = viz.colors.orange;
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'bottom';
                                ctx.fillText(m.label, px, py - 8);
                                ctx.fillStyle = viz.colors.text;
                                ctx.fillText(m.freq + ' cm⁻¹', px, py - 22);
                            }

                            // Axes
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1.5;
                            ctx.beginPath();
                            ctx.moveTo(margin.left, margin.top);
                            ctx.lineTo(margin.left, margin.top + plotH);
                            ctx.lineTo(margin.left + plotW, margin.top + plotH);
                            ctx.stroke();

                            // X-axis labels
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            for (let f = 1000; f <= 4000; f += 500) {
                                const px = margin.left + (f - xMin) / (xMax - xMin) * plotW;
                                ctx.fillText(f.toString(), px, margin.top + plotH + 6);
                            }
                            ctx.fillText('Wavenumber (cm⁻¹)', margin.left + plotW / 2, margin.top + plotH + 24);

                            // Y-axis label
                            ctx.save();
                            ctx.translate(15, margin.top + plotH / 2);
                            ctx.rotate(-Math.PI / 2);
                            ctx.textAlign = 'center';
                            ctx.fillText('Absorbance (a.u.)', 0, 0);
                            ctx.restore();

                            // Title
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Simulated IR Spectrum (H₂O model)', W / 2, 20);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Explain why the O-H stretching vibration in water has a much higher IR intensity than the H-O-H bending vibration.',
                    hint: 'Consider the magnitude of \\(\\partial \\boldsymbol{\\mu} / \\partial Q_k\\) for each mode. Which mode causes a larger change in the dipole moment per unit displacement?',
                    solution: 'The O-H bond is highly polar. During the stretching vibration, the bond length changes significantly, causing a large change in dipole moment (large \\(\\partial \\boldsymbol{\\mu} / \\partial Q\\)). During the bend, the O-H bond lengths remain approximately constant; only the angle changes, which produces a smaller change in the dipole moment. Since \\(I \\propto |\\partial \\boldsymbol{\\mu}/\\partial Q|^2\\), the stretch has higher intensity.'
                },
                {
                    question: 'A molecule has a Raman activity of \\(S_k = 0\\) for a particular mode. Does this necessarily mean \\(\\partial \\alpha_{ij} / \\partial Q_k = 0\\) for all components \\(i,j\\)?',
                    hint: 'Write out the formula \\(S_k = 45 \\bar{\\alpha}_k^{\\prime 2} + 7 \\gamma_k^{\\prime 2}\\). Under what conditions can this be zero?',
                    solution: 'Yes. Since both \\(\\bar{\\alpha}_k^{\\prime 2} \\geq 0\\) and \\(\\gamma_k^{\\prime 2} \\geq 0\\), and the coefficients 45 and 7 are positive, \\(S_k = 0\\) requires both \\(\\bar{\\alpha}_k^{\\prime} = 0\\) and \\(\\gamma_k^{\\prime} = 0\\). From the definition of \\(\\gamma_k^{\\prime 2}\\), all off-diagonal derivatives vanish and all diagonal derivatives are equal. Combined with \\(\\bar{\\alpha}_k^{\\prime} = 0\\), this forces all diagonal derivatives to be zero as well. Hence all \\(\\partial \\alpha_{ij}/\\partial Q_k = 0\\).'
                },
                {
                    question: 'Show that the integrated IR intensity is invariant under rotation of the molecular coordinate system.',
                    hint: 'The quantity \\(|\\partial \\boldsymbol{\\mu}/\\partial Q_k|^2\\) is the squared norm of a vector. How does the norm transform under rotation?',
                    solution: 'Under a rotation \\(\\mathbf{R}\\), the dipole moment transforms as \\(\\boldsymbol{\\mu}^{\\prime} = \\mathbf{R} \\boldsymbol{\\mu}\\). Thus \\(\\partial \\boldsymbol{\\mu}^{\\prime}/\\partial Q_k = \\mathbf{R} \\, \\partial \\boldsymbol{\\mu}/\\partial Q_k\\). The squared norm is \\(|\\partial \\boldsymbol{\\mu}^{\\prime}/\\partial Q_k|^2 = (\\mathbf{R} \\partial\\boldsymbol{\\mu}/\\partial Q_k)^\\top (\\mathbf{R} \\partial\\boldsymbol{\\mu}/\\partial Q_k) = (\\partial\\boldsymbol{\\mu}/\\partial Q_k)^\\top \\mathbf{R}^\\top \\mathbf{R} (\\partial\\boldsymbol{\\mu}/\\partial Q_k) = |\\partial\\boldsymbol{\\mu}/\\partial Q_k|^2\\) since \\(\\mathbf{R}^\\top \\mathbf{R} = \\mathbf{I}\\).'
                },
                {
                    question: 'Derive the relationship between the atomic polar tensor (APT) in Cartesian coordinates and the dipole derivative in normal coordinates.',
                    hint: 'Use the chain rule: \\(\\partial \\mu_\\alpha / \\partial Q_k = \\sum_{A,i} (\\partial \\mu_\\alpha / \\partial x_i^A)(\\partial x_i^A / \\partial Q_k)\\). Express \\(\\partial x_i^A / \\partial Q_k\\) in terms of the eigenvector matrix.',
                    solution: 'The APT elements are \\(P_{\\alpha,i}^A = \\partial \\mu_\\alpha / \\partial x_i^A\\). The normal coordinate is \\(Q_k = \\sum_{A,i} L_{Ai,k} \\sqrt{m_A} \\Delta x_i^A\\), so \\(\\partial x_i^A / \\partial Q_k = L_{Ai,k} / \\sqrt{m_A}\\). By the chain rule: \\(\\partial \\mu_\\alpha / \\partial Q_k = \\sum_{A,i} P_{\\alpha,i}^A \\cdot L_{Ai,k} / \\sqrt{m_A}\\). In matrix form: \\(\\partial \\boldsymbol{\\mu} / \\partial Q_k = \\mathbf{P} \\, \\mathbf{M}^{-1/2} \\mathbf{L}_k\\).'
                },
                {
                    question: 'Why are Raman intensities typically much weaker than IR intensities for the same vibrational transition?',
                    hint: 'Consider the physical mechanisms: what type of interaction produces each signal?',
                    solution: 'IR absorption is a first-order process (one-photon resonant absorption) governed by the electric dipole interaction \\(\\hat{H}^{\\prime} \\propto \\boldsymbol{\\mu} \\cdot \\mathbf{E}\\). Raman scattering is a second-order process (two-photon: one absorbed, one emitted) involving a virtual intermediate state, governed by the polarizability. The cross-section scales as \\(\\sigma_{\\text{Raman}} \\sim \\alpha^4 \\omega^4\\), whereas \\(\\sigma_{\\text{IR}} \\sim \\mu^2 \\omega\\). The second-order nature makes Raman inherently weaker by roughly a factor of \\(10^{-6}\\) to \\(10^{-8}\\), which is why Raman measurements require intense laser sources.'
                }
            ]
        },

        // ========== SECTION 4: Anharmonicity and Beyond ==========
        {
            id: 'sec04-anharmonicity',
            title: 'Anharmonicity and Beyond',
            content: `
<h2>16.4 Anharmonicity and Beyond</h2>

<p>Real molecular potentials deviate from the harmonic parabola, especially at large displacements. Anharmonic effects cause overtone and combination bands, frequency shifts, Fermi resonances, and ultimately bond dissociation. In this section we study the leading corrections to the harmonic approximation.</p>

<h3>The Morse Potential</h3>

<p>For a diatomic molecule, the simplest anharmonic model is the Morse potential:</p>

\\[
V(r) = D_e \\left(1 - e^{-a(r - r_e)}\\right)^2
\\]

<p>where \\(D_e\\) is the well depth (dissociation energy from the minimum), \\(r_e\\) is the equilibrium bond length, and \\(a = \\omega_e \\sqrt{\\mu / (2 D_e)}\\) controls the range of the potential.</p>

<div class="env-block definition">
<div class="env-title">Definition 16.4.1 (Morse Potential Parameters)</div>
<div class="env-body">
<ul>
<li>\\(D_e\\): well depth (classical dissociation energy from the minimum)</li>
<li>\\(D_0 = D_e - E_{\\text{ZPE}}\\): dissociation energy from the ground vibrational state</li>
<li>\\(a\\): range parameter (inverse length), related to the force constant by \\(k = 2 D_e a^2\\)</li>
<li>\\(r_e\\): equilibrium bond length</li>
</ul>
</div>
</div>

<div class="env-block theorem">
<div class="env-title">Theorem 16.4.2 (Morse Oscillator Energy Levels)</div>
<div class="env-body">
The Morse oscillator has exact eigenvalues
\\[
E_n = \\hbar \\omega_e \\left(n + \\frac{1}{2}\\right) - \\hbar \\omega_e x_e \\left(n + \\frac{1}{2}\\right)^2
\\]
where the anharmonicity constant is
\\[
x_e = \\frac{\\hbar \\omega_e}{4 D_e}.
\\]
The number of bound states is finite: \\(n_{\\max} = \\lfloor 1/(2x_e) - 1/2 \\rfloor\\).
</div>
</div>

<div class="viz-placeholder" data-viz="viz-harmonic-morse"></div>

<div class="env-block remark">
<div class="env-title">Key Consequences of Anharmonicity</div>
<div class="env-body">
<ol>
<li><strong>Non-equally-spaced levels:</strong> The spacing decreases with increasing \\(n\\), eventually reaching zero at the dissociation limit.</li>
<li><strong>Overtones:</strong> The \\(\\Delta n = \\pm 1\\) selection rule is relaxed; transitions with \\(\\Delta n = 2, 3, \\ldots\\) (overtones) become weakly allowed.</li>
<li><strong>Combination bands:</strong> Simultaneous excitation of two or more modes becomes possible due to mode coupling in the anharmonic potential.</li>
<li><strong>Hot bands:</strong> Transitions from excited vibrational states (\\(n > 0\\)) appear at slightly shifted frequencies.</li>
</ol>
</div>
</div>

<h3>Vibrational Perturbation Theory (VPT2)</h3>

<p>For polyatomic molecules, second-order vibrational perturbation theory (VPT2) is the standard approach to anharmonic corrections. The PES is expanded to quartic order:</p>

\\[
V = \\frac{1}{2} \\sum_k \\omega_k^2 Q_k^2 + \\frac{1}{6} \\sum_{klm} \\phi_{klm} Q_k Q_l Q_m + \\frac{1}{24} \\sum_{klmn} \\phi_{klmn} Q_k Q_l Q_m Q_n
\\]

<p>where \\(\\phi_{klm}\\) and \\(\\phi_{klmn}\\) are the cubic and quartic force constants in normal coordinates.</p>

<div class="env-block theorem">
<div class="env-title">Theorem 16.4.3 (VPT2 Anharmonic Frequencies)</div>
<div class="env-body">
At second order in perturbation theory, the vibrational energy levels are
\\[
E(n_1, \\ldots, n_N) = \\sum_k \\omega_k \\left(n_k + \\frac{1}{2}\\right) + \\sum_{k \\leq l} \\chi_{kl} \\left(n_k + \\frac{1}{2}\\right)\\!\\left(n_l + \\frac{1}{2}\\right)
\\]
where the anharmonic constants \\(\\chi_{kl}\\) depend on the cubic and quartic force constants:
\\[
\\chi_{kk} = \\frac{\\phi_{kkkk}}{16} - \\sum_{l} \\frac{\\phi_{kkl}^2(8\\omega_k^2 - 3\\omega_l^2)}{16\\omega_l(4\\omega_k^2 - \\omega_l^2)}
\\]
\\[
\\chi_{kl} = \\frac{\\phi_{kkll}}{4} - \\sum_m \\frac{\\phi_{kkm}\\phi_{llm}}{4\\omega_m} + \\sum_m \\frac{\\phi_{klm}^2 \\omega_m(\\omega_m^2 - \\omega_k^2 - \\omega_l^2)}{(\\omega_m^2 - (\\omega_k - \\omega_l)^2)(\\omega_m^2 - (\\omega_k + \\omega_l)^2)}
\\]
for \\(k \\neq l\\).
</div>
</div>

<h3>Fermi Resonance</h3>

<p>A <em>Fermi resonance</em> occurs when an overtone or combination band has nearly the same frequency as a fundamental, and the two levels interact through anharmonic coupling. This leads to intensity borrowing and frequency shifts.</p>

<div class="env-block definition">
<div class="env-title">Definition 16.4.4 (Fermi Resonance)</div>
<div class="env-body">
A Fermi resonance between states \\(|n_k = 1\\rangle\\) and \\(|n_l = 2\\rangle\\) (or a combination state) occurs when:
<ol>
<li>The unperturbed energies are nearly degenerate: \\(\\omega_k \\approx 2\\omega_l\\)</li>
<li>The states have the same symmetry species</li>
<li>The cubic coupling constant \\(\\phi_{kll}\\) is nonzero</li>
</ol>
The perturbed energies are
\\[
E_{\\pm} = \\frac{E_k + E_l}{2} \\pm \\sqrt{\\left(\\frac{E_k - E_l}{2}\\right)^2 + W^2}
\\]
where \\(W = \\phi_{kll}/(2\\sqrt{2})\\) is the coupling matrix element.
</div>
</div>

<div class="env-block example">
<div class="env-title">Example 16.4.5 (Fermi Resonance in CO\\(_2\\))</div>
<div class="env-body">
<p>In CO\\(_2\\), the symmetric stretch fundamental \\(\\nu_1 = 1388\\) cm\\(^{-1}\\) is close to twice the bending frequency \\(2\\nu_2 = 2 \\times 667 = 1334\\) cm\\(^{-1}\\). Both belong to the \\(\\Sigma_g^+\\) representation. The Fermi resonance pushes them apart: the observed Raman peaks appear at 1285 and 1388 cm\\(^{-1}\\), with roughly equal intensity instead of the expected strong fundamental and weak overtone.</p>
</div>
</div>

<div class="env-block warning">
<div class="env-title">Resonance Denominators in VPT2</div>
<div class="env-body">
The VPT2 expressions contain denominators of the form \\((\\omega_k^2 - \\omega_l^2)\\). When two frequencies are nearly equal (near-degeneracy), these denominators become small and the perturbation expansion diverges. Fermi resonances must be treated by explicit diagonalization of a small matrix (deperturbed VPT2, or DVPT2). Similar issues arise for Darling-Dennison resonances (between overtones).
</div>
</div>
`,
            visualizations: [
                {
                    id: 'viz-harmonic-morse',
                    title: 'Harmonic vs. Morse Potential',
                    description: 'Compare the harmonic potential (dashed blue) with the Morse potential (solid orange). Adjust the anharmonicity parameter \\(x_e\\) and observe how the energy levels become non-equally spaced. The dissociation limit \\(D_e\\) is shown as a horizontal line.',
                    setup(body, controls) {
                        const viz = new VizEngine(body, { scale: 40, originX: 120, originY: 330 });
                        let xe = 0.02;
                        let showLevels = true;

                        VizEngine.createSlider(controls, 'xₑ (anharmonicity)', 0.005, 0.08, 0.02, 0.001, v => { xe = v; draw(); });
                        VizEngine.createButton(controls, 'Toggle Levels', () => { showLevels = !showLevels; draw(); });

                        function draw() {
                            viz.clear();

                            const ctx = viz.ctx;
                            const De = 5.0; // well depth in display units
                            const omega = 1.0;
                            const a_param = Math.sqrt(omega / (2 * De * xe * 4)); // derived from xe = omega/(4De)
                            // Actually let's just set De = omega / (4*xe)
                            const DeCalc = omega / (4 * xe);

                            // Harmonic potential
                            viz.drawFunction(x => {
                                if (x < 0) return NaN;
                                return 0.5 * omega * omega * (x * x);
                            }, 0, 6, viz.colors.blue, 2);

                            // Draw harmonic as dashed
                            const ctx2 = viz.ctx;
                            ctx2.setLineDash([6, 4]);
                            viz.drawFunction(x => {
                                return 0.5 * omega * omega * (x * x);
                            }, -2, 6, viz.colors.blue + '66', 1.5);
                            ctx2.setLineDash([]);

                            // Morse potential: V(x) = De * (1 - exp(-a*x))^2 where x is displacement from equilibrium
                            // Map r -> displacement from equilibrium, put eq at x=3 in plot
                            const rEq = 3; // plot position of equilibrium
                            const aMorse = Math.sqrt(omega * omega / (2 * DeCalc));

                            const morseV = x => {
                                const disp = x - rEq;
                                return DeCalc * Math.pow(1 - Math.exp(-aMorse * disp), 2);
                            };

                            // Also draw harmonic centered at rEq
                            viz.drawFunction(x => {
                                const disp = x - rEq;
                                return 0.5 * omega * omega * disp * disp;
                            }, rEq - 3, rEq + 3, viz.colors.blue + '55', 1.5);

                            // Morse curve
                            viz.drawFunction(morseV, rEq - 2, rEq + 8, viz.colors.orange, 2.5);

                            // Dissociation limit
                            viz.drawSegment(rEq - 2, DeCalc, rEq + 8, DeCalc, viz.colors.red + '88', 1, true);
                            viz.drawText('Dₑ = ' + DeCalc.toFixed(1), rEq + 6, DeCalc + 0.3, viz.colors.red, 12);

                            // Energy levels
                            if (showLevels) {
                                const nMax = Math.floor(1 / (2 * xe) - 0.5);
                                const nShow = Math.min(nMax, 12);

                                for (let n = 0; n <= nShow; n++) {
                                    // Morse level
                                    const eMorse = omega * (n + 0.5) - omega * xe * (n + 0.5) * (n + 0.5);
                                    if (eMorse < 0 || eMorse > DeCalc) break;

                                    // Find classical turning points for Morse
                                    // V(r) = E => De*(1-exp(-a*(r-re)))^2 = E
                                    // 1-exp(-a*d) = +-sqrt(E/De)
                                    const ratio = Math.sqrt(eMorse / DeCalc);
                                    const d1 = -Math.log(1 - ratio) / aMorse; // right turning point displacement
                                    const d2 = -Math.log(1 + ratio) / aMorse; // left turning point displacement

                                    const rLeft = rEq + Math.min(d1, d2);
                                    const rRight = rEq + Math.max(d1, d2);

                                    viz.drawSegment(rLeft, eMorse, rRight, eMorse, viz.colors.orange, 1.2);

                                    // Harmonic level for comparison
                                    const eHarm = omega * (n + 0.5);
                                    const harmTurn = Math.sqrt(2 * eHarm / (omega * omega));
                                    if (eHarm < DeCalc * 1.5) {
                                        viz.drawSegment(rEq - harmTurn, eHarm, rEq + harmTurn, eHarm, viz.colors.blue + '55', 1, true);
                                    }

                                    // Label
                                    if (n <= 6) {
                                        viz.drawText('n=' + n, rRight + 0.3, eMorse, viz.colors.text, 10, 'left');
                                    }
                                }
                            }

                            // Axes labels
                            viz.screenText('Displacement from equilibrium', viz.width / 2, viz.height - 10, viz.colors.text, 12);
                            viz.screenText('Energy', 15, viz.height / 2, viz.colors.text, 12);

                            // Legend
                            const lx = viz.width - 170, ly = 25;
                            ctx.strokeStyle = viz.colors.orange; ctx.lineWidth = 2;
                            ctx.beginPath(); ctx.moveTo(lx, ly); ctx.lineTo(lx + 25, ly); ctx.stroke();
                            viz.screenText('Morse', lx + 30, ly, viz.colors.orange, 11, 'left');

                            ctx.strokeStyle = viz.colors.blue; ctx.lineWidth = 1.5;
                            ctx.setLineDash([4, 3]);
                            ctx.beginPath(); ctx.moveTo(lx, ly + 18); ctx.lineTo(lx + 25, ly + 18); ctx.stroke();
                            ctx.setLineDash([]);
                            viz.screenText('Harmonic', lx + 30, ly + 18, viz.colors.blue, 11, 'left');

                            viz.screenText('xₑ = ' + xe.toFixed(3), viz.width / 2, 20, viz.colors.yellow, 13, 'center');
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'For the Morse oscillator, derive the condition for the highest bound state \\(n_{\\max}\\) and show that the number of bound states is finite.',
                    hint: 'The energy spacing \\(E_{n+1} - E_n\\) must be positive for the state to be below the dissociation limit.',
                    solution: 'The spacing is \\(\\Delta E_n = E_{n+1} - E_n = \\hbar\\omega_e[1 - 2x_e(n+1)]\\). This is positive when \\(n+1 < 1/(2x_e)\\), i.e., \\(n < 1/(2x_e) - 1\\). Thus \\(n_{\\max} = \\lfloor 1/(2x_e) - 1/2 \\rfloor\\). Since \\(x_e > 0\\), this is finite. The total number of bound states is \\(n_{\\max} + 1 \\approx 1/(2x_e)\\).'
                },
                {
                    question: 'For HCl, the fundamental frequency is \\(\\omega_e = 2991\\) cm\\(^{-1}\\) and \\(x_e = 0.0174\\). Calculate the first overtone frequency and compare it to \\(2\\omega_e\\).',
                    hint: 'The transition \\(0 \\to 2\\) has frequency \\(E_2 - E_0\\). Use the Morse energy formula.',
                    solution: '\\(E_n = \\omega_e(n + 1/2) - \\omega_e x_e(n + 1/2)^2\\). The fundamental is \\(E_1 - E_0 = \\omega_e(1 - 2x_e) = 2991(1 - 0.0348) = 2886.9\\) cm\\(^{-1}\\). The overtone is \\(E_2 - E_0 = 2\\omega_e(1 - 3x_e) = 2 \\times 2991 \\times (1 - 0.0522) = 5669.6\\) cm\\(^{-1}\\). Compared to \\(2\\omega_e = 5982\\) cm\\(^{-1}\\), the anharmonic overtone is red-shifted by 312 cm\\(^{-1}\\). This is less than twice the fundamental (\\(2 \\times 2886.9 = 5773.8\\) cm\\(^{-1}\\)), illustrating the decreasing level spacing.'
                },
                {
                    question: 'Explain physically why the harmonic approximation becomes worse for higher vibrational quantum numbers.',
                    hint: 'Think about the shape of the true potential vs. the harmonic parabola at large displacements.',
                    solution: 'The harmonic potential \\(V \\propto Q^2\\) grows without bound and has equal restoring force for compression and extension. In reality: (1) bond stretching eventually leads to dissociation (the potential plateaus at \\(D_e\\)), so the harmonic approximation grossly overestimates the potential at large positive displacements. (2) Compression is opposed by nuclear repulsion, making the real potential steeper than harmonic. Higher quantum numbers access larger displacements where these deviations from the parabola are most pronounced, making the harmonic approximation increasingly inaccurate.'
                },
                {
                    question: 'In a VPT2 calculation, what is the significance of a "resonance" and how is it typically handled computationally?',
                    hint: 'Look at the denominator terms in the VPT2 expressions for \\(\\chi_{kl}\\).',
                    solution: 'A resonance occurs when denominator terms like \\(\\omega_m^2 - (\\omega_k \\pm \\omega_l)^2\\) or \\(4\\omega_k^2 - \\omega_l^2\\) approach zero, causing the perturbation correction to diverge. This signals a near-degeneracy between states coupled by the cubic/quartic potential. Computationally, resonances are handled by: (1) identifying near-degenerate pairs using a threshold criterion (e.g., Martin test), (2) removing the divergent terms from the perturbative sum, and (3) treating the resonant states by explicit matrix diagonalization (deperturbed VPT2, DVPT2 or GVPT2). This combines the best of perturbation theory (for non-resonant terms) and variational treatment (for resonant ones).'
                },
                {
                    question: 'The fundamental frequency of D\\(_2\\) is approximately \\(\\omega_e / \\sqrt{2}\\) times that of H\\(_2\\). Explain this isotope effect using the harmonic model.',
                    hint: 'In the harmonic model, the force constant \\(k\\) depends only on the electronic structure, not on the nuclear masses.',
                    solution: 'In the Born-Oppenheimer approximation, the PES (and hence the force constant \\(k\\)) is determined by the electronic Hamiltonian and is independent of nuclear masses. The harmonic frequency is \\(\\omega = \\sqrt{k/\\mu}\\). For H\\(_2\\), \\(\\mu_{\\text{H}_2} = m_H/2\\). For D\\(_2\\), \\(\\mu_{\\text{D}_2} = m_D/2 \\approx m_H\\). Thus \\(\\omega_{\\text{D}_2}/\\omega_{\\text{H}_2} = \\sqrt{\\mu_{\\text{H}_2}/\\mu_{\\text{D}_2}} = \\sqrt{(m_H/2)/m_H} = 1/\\sqrt{2}\\). This \\(1/\\sqrt{2}\\) factor (~0.707) is the classical isotope effect on vibrational frequencies.'
                }
            ]
        },

        // ========== SECTION 5: Thermochemistry from Frequencies ==========
        {
            id: 'sec05-thermochemistry',
            title: 'Thermochemistry from Frequencies',
            content: `
<h2>16.5 Thermochemistry from Frequencies</h2>

<p>Vibrational frequencies are not merely spectroscopic data; they are essential ingredients for computing thermodynamic quantities from first principles. In this section we connect the quantum vibrational partition function to the macroscopic observables: enthalpy, entropy, Gibbs free energy, and heat capacity.</p>

<h3>Statistical Mechanics Framework</h3>

<p>Within the rigid-rotor harmonic-oscillator (RRHO) approximation, the molecular partition function separates into independent contributions:</p>

\\[
q = q_{\\text{trans}} \\cdot q_{\\text{rot}} \\cdot q_{\\text{vib}} \\cdot q_{\\text{elec}}
\\]

<p>The vibrational partition function for a single mode with frequency \\(\\omega_k\\) is</p>

\\[
q_{\\text{vib},k} = \\sum_{n=0}^{\\infty} e^{-\\beta \\hbar \\omega_k (n + 1/2)} = \\frac{e^{-\\beta \\hbar \\omega_k / 2}}{1 - e^{-\\beta \\hbar \\omega_k}}
\\]

<p>where \\(\\beta = 1/(k_B T)\\). For \\(N_{\\text{vib}}\\) independent modes, \\(q_{\\text{vib}} = \\prod_{k=1}^{N_{\\text{vib}}} q_{\\text{vib},k}\\).</p>

<div class="env-block definition">
<div class="env-title">Definition 16.5.1 (Vibrational Temperature)</div>
<div class="env-body">
The <em>vibrational temperature</em> of mode \\(k\\) is defined as
\\[
\\Theta_{\\text{vib},k} = \\frac{\\hbar \\omega_k}{k_B} = \\frac{h c \\tilde{\\nu}_k}{k_B}
\\]
so that \\(q_{\\text{vib},k} = e^{-\\Theta_{\\text{vib},k}/(2T)} / (1 - e^{-\\Theta_{\\text{vib},k}/T})\\).
</div>
</div>

<div class="env-block theorem">
<div class="env-title">Theorem 16.5.2 (Vibrational Thermodynamic Functions)</div>
<div class="env-body">
For a single harmonic mode with vibrational temperature \\(\\Theta\\), the thermodynamic contributions are:

<p><strong>Zero-point energy:</strong></p>
\\[
E_{\\text{ZPE},k} = \\frac{1}{2} k_B \\Theta_k
\\]

<p><strong>Internal energy (thermal contribution):</strong></p>
\\[
U_{\\text{vib},k} = k_B \\Theta_k \\left( \\frac{1}{2} + \\frac{1}{e^{\\Theta_k/T} - 1} \\right) = E_{\\text{ZPE},k} + k_B \\Theta_k \\cdot \\frac{1}{e^{\\Theta_k/T} - 1}
\\]

<p><strong>Entropy:</strong></p>
\\[
S_{\\text{vib},k} = k_B \\left[ \\frac{\\Theta_k / T}{e^{\\Theta_k/T} - 1} - \\ln\\!\\left(1 - e^{-\\Theta_k/T}\\right) \\right]
\\]

<p><strong>Heat capacity:</strong></p>
\\[
C_{V,\\text{vib},k} = k_B \\left(\\frac{\\Theta_k}{T}\\right)^2 \\frac{e^{\\Theta_k/T}}{\\left(e^{\\Theta_k/T} - 1\\right)^2}
\\]
</div>
</div>

<div class="env-block proof">
<div class="env-title">Proof (Entropy Derivation)</div>
<div class="env-body">
<p>From the partition function \\(q = e^{-u/2}/(1 - e^{-u})\\) where \\(u = \\Theta/T\\):</p>
\\[
\\ln q = -\\frac{u}{2} - \\ln(1 - e^{-u})
\\]
\\[
\\frac{\\partial \\ln q}{\\partial T} = \\frac{u}{2T} \\cdot \\frac{\\Theta}{T} \\cdot \\frac{1}{T} + \\frac{e^{-u} \\cdot u/T}{1 - e^{-u}} \\cdot \\frac{1}{T}
\\]
<p>Using \\(S = k_B(\\ln q + T \\partial \\ln q / \\partial T)\\) and simplifying with \\(u = \\Theta/T\\):</p>
\\[
S = k_B \\left[ \\frac{u}{e^u - 1} - \\ln(1 - e^{-u}) \\right].
\\]
<div class="qed">∎</div>
</div>
</div>

<h3>Practical Thermochemistry Workflow</h3>

<p>In a typical computational chemistry workflow, thermochemical quantities are computed as follows:</p>

<ol>
<li><strong>Geometry optimization:</strong> Find the equilibrium geometry (stationary point on the PES).</li>
<li><strong>Frequency calculation:</strong> Compute the Hessian, diagonalize to obtain frequencies. Verify all real (no imaginary frequencies for a minimum).</li>
<li><strong>Thermal corrections:</strong> Use the RRHO model to compute \\(H(T)\\) and \\(G(T)\\) at standard conditions (typically \\(T = 298.15\\) K, \\(P = 1\\) atm).</li>
</ol>

<p>The total enthalpy at temperature \\(T\\) is</p>

\\[
H(T) = E_{\\text{elec}} + E_{\\text{ZPE}} + E_{\\text{thermal}}(T) + k_B T
\\]

<p>where \\(E_{\\text{thermal}}(T)\\) includes translational (\\(\\frac{3}{2}k_BT\\)), rotational (\\(\\frac{3}{2}k_BT\\) for nonlinear, \\(k_BT\\) for linear), and vibrational thermal contributions. The \\(k_BT\\) term converts from \\(U\\) to \\(H = U + PV = U + nRT\\) for an ideal gas.</p>

<div class="env-block example">
<div class="env-title">Example 16.5.3 (Reaction Enthalpy)</div>
<div class="env-body">
<p>For the reaction A \\(\\to\\) B, the reaction enthalpy at 298 K is</p>
\\[
\\Delta H^\\circ_{298} = [E_{\\text{elec}}(\\text{B}) + H_{\\text{corr}}(\\text{B})] - [E_{\\text{elec}}(\\text{A}) + H_{\\text{corr}}(\\text{A})]
\\]
<p>where \\(H_{\\text{corr}} = E_{\\text{ZPE}} + E_{\\text{thermal}} + k_BT\\) is the thermal correction to enthalpy.</p>
</div>
</div>

<div class="env-block warning">
<div class="env-title">Low-Frequency Mode Problem</div>
<div class="env-body">
<p>Modes with very low frequencies (\\(< 100\\) cm\\(^{-1}\\)), such as internal rotations or floppy torsions, are poorly described by the harmonic oscillator model. They contribute disproportionately to the entropy because \\(S \\to \\infty\\) as \\(\\omega \\to 0\\) in the harmonic formula. Common remedies:</p>
<ul>
<li><strong>Quasi-RRHO model</strong> (Grimme, 2012): Replace the harmonic entropy for low-frequency modes with a free-rotor entropy, smoothly interpolated.</li>
<li><strong>Hindered rotor model:</strong> Treat specific torsions as hindered internal rotors with an explicit torsional potential.</li>
<li><strong>Frequency cutoff:</strong> Replace all frequencies below a threshold (e.g., 100 cm\\(^{-1}\\)) with the threshold value.</li>
</ul>
</div>
</div>

<div class="env-block proposition">
<div class="env-title">Proposition 16.5.4 (High- and Low-Temperature Limits)</div>
<div class="env-body">
<ul>
<li><strong>Low temperature</strong> (\\(T \\ll \\Theta_k\\)): The mode is "frozen out." \\(C_{V,k} \\to 0\\), \\(S_k \\to 0\\), and only the ZPE contributes.</li>
<li><strong>High temperature</strong> (\\(T \\gg \\Theta_k\\)): The classical limit applies. \\(C_{V,k} \\to k_B\\) (equipartition), \\(U_k \\approx k_BT\\).</li>
</ul>
</div>
</div>

<h3>Scale Factors</h3>

<p>Harmonic frequencies computed at a given level of theory are systematically overestimated (for most methods) because the harmonic approximation neglects anharmonicity and the electronic structure method introduces its own errors. Empirical <em>scale factors</em> correct for these effects:</p>

\\[
\\tilde{\\nu}_{\\text{scaled}} = \\lambda \\cdot \\tilde{\\nu}_{\\text{computed}}
\\]

<p>Typical scale factors: HF/6-31G(d): 0.8929; B3LYP/6-31G(d): 0.9614; B3LYP/cc-pVTZ: 0.9691; MP2/cc-pVTZ: 0.9523. Separate scale factors are recommended for ZPE and for fundamental frequencies.</p>
`,
            visualizations: [],
            exercises: [
                {
                    question: 'Derive the vibrational heat capacity \\(C_{V,k}\\) from the partition function \\(q_{\\text{vib},k}\\).',
                    hint: 'Use \\(U = k_BT^2 (\\partial \\ln q / \\partial T)\\) and \\(C_V = \\partial U / \\partial T\\).',
                    solution: 'Let \\(u = \\Theta/T\\). Then \\(\\ln q = -u/2 - \\ln(1-e^{-u})\\). \\(\\partial \\ln q/\\partial T = u^2 e^{-u} / [T(1-e^{-u})] \\cdot (1/T) + u/(2T^2)\\). After simplification, \\(U = k_B\\Theta[1/2 + 1/(e^u - 1)]\\). Taking \\(C_V = dU/dT\\): \\(C_V = k_B u^2 e^u/(e^u-1)^2\\), which is the Einstein heat capacity for a single oscillator. At low \\(T\\) (\\(u \\to \\infty\\)), \\(C_V \\to k_B u^2 e^{-u} \\to 0\\). At high \\(T\\) (\\(u \\to 0\\)), \\(C_V \\to k_B\\).'
                },
                {
                    question: 'Show that the total ZPE of a molecule is typically the dominant vibrational correction to the electronic energy at 298 K.',
                    hint: 'Compare the magnitude of ZPE (\\(\\sum \\hbar\\omega_k/2\\)) to the thermal vibrational energy (\\(\\sum \\hbar\\omega_k/(e^{\\Theta_k/T}-1)\\)) for typical frequencies.',
                    solution: 'For a typical C-H stretch at 3000 cm\\(^{-1}\\), \\(\\Theta = hc\\tilde{\\nu}/k_B = 1.44 \\times 3000 = 4314\\) K. At \\(T = 298\\) K, \\(u = 4314/298 = 14.5\\), so \\(1/(e^u - 1) \\approx 5 \\times 10^{-7}\\). The thermal excitation is negligible compared to the ZPE contribution of \\(\\hbar\\omega/2\\). Even for the lowest typical vibration at 400 cm\\(^{-1}\\) (\\(\\Theta = 576\\) K), \\(u = 1.93\\) and \\(1/(e^u - 1) = 0.17\\), still small compared to the 0.5 ZPE factor. Hence ZPE dominates the vibrational correction, typically accounting for >90% of the total vibrational energy correction at room temperature.'
                },
                {
                    question: 'A molecule has vibrational frequencies of 500 and 2000 cm\\(^{-1}\\). At what temperature does the 500 cm\\(^{-1}\\) mode contribute exactly \\(k_B/2\\) to the heat capacity?',
                    hint: 'Set \\(C_V = k_B u^2 e^u/(e^u - 1)^2 = k_B/2\\) and solve numerically for \\(u = \\Theta/T\\).',
                    solution: 'We need \\(u^2 e^u/(e^u - 1)^2 = 0.5\\). This transcendental equation must be solved numerically. By trial: \\(u = 2 \\Rightarrow 4 \\cdot 7.389 / (6.389)^2 = 29.56/40.82 = 0.724\\). \\(u = 3 \\Rightarrow 9 \\cdot 20.09 / (19.09)^2 = 180.8/364.4 = 0.496\\). So \\(u \\approx 3.02\\). With \\(\\Theta_{500} = 1.44 \\times 500 = 720\\) K, \\(T = 720/3.02 \\approx 238\\) K. The 500 cm\\(^{-1}\\) mode contributes \\(k_B/2\\) to the heat capacity at about 238 K.'
                },
                {
                    question: 'Explain why the Gibbs free energy, not the enthalpy, is the relevant quantity for determining equilibrium constants and reaction spontaneity at finite temperature.',
                    hint: 'Recall the thermodynamic relationship \\(\\Delta G = \\Delta H - T\\Delta S\\) and the connection to the equilibrium constant \\(K = e^{-\\Delta G^\\circ/RT}\\).',
                    solution: 'At constant temperature and pressure, the criterion for spontaneity is \\(\\Delta G < 0\\), not \\(\\Delta H < 0\\). The Gibbs free energy \\(G = H - TS\\) accounts for both the energetic favorability (enthalpy) and the entropic contribution (disorder). A reaction with \\(\\Delta H > 0\\) can still be spontaneous if \\(T\\Delta S > \\Delta H\\). The equilibrium constant is \\(K = e^{-\\Delta G^\\circ/(RT)}\\), directly linking free energy to the position of equilibrium. The vibrational entropy, computed from the frequencies, can significantly alter \\(\\Delta G\\) relative to \\(\\Delta H\\), especially for reactions that change the number of low-frequency modes.'
                },
                {
                    question: 'Why is it important to use different scale factors for ZPE corrections and fundamental frequency predictions? What physical distinction underlies the difference?',
                    hint: 'The ZPE depends on all modes equally weighted, while the fundamental frequency is a single transition energy. Anharmonicity affects these differently.',
                    solution: 'The fundamental transition frequency (\\(0 \\to 1\\)) depends on the shape of the potential near both \\(n=0\\) and \\(n=1\\), incorporating anharmonic corrections that typically red-shift the frequency from the harmonic value. The ZPE is \\(\\sum \\omega_k/2\\), which samples only the bottom of the well (ground state). Anharmonicity affects the ZPE differently (typically a smaller correction) than the fundamental. Additionally, basis set incompleteness and electron correlation errors affect the curvature at the minimum (relevant for ZPE) differently from the energy difference between vibrational levels. Empirically, ZPE scale factors are closer to 1.0 (e.g., 0.989 for B3LYP) while fundamental frequency scale factors are smaller (e.g., 0.961), reflecting the larger anharmonic correction for fundamentals.'
                },
                {
                    question: 'Describe how Grimme\'s quasi-RRHO approach treats low-frequency modes differently from the standard RRHO model, and why this matters for conformational free energies.',
                    hint: 'Consider what happens to the harmonic oscillator entropy as \\(\\omega \\to 0\\).',
                    solution: 'In the standard RRHO model, \\(S_{\\text{vib}} \\to \\infty\\) as \\(\\omega \\to 0\\), which is unphysical; a free rotation has finite entropy \\(S_{\\text{rot}} \\sim \\frac{1}{2}k_B(1 + \\ln(8\\pi^3 \\mu k_B T / h^2))\\). Grimme\'s quasi-RRHO replaces the vibrational entropy of each mode with a weighted average of the harmonic oscillator and free-rotor entropies: \\(S = w(\\omega) S_{\\text{RRHO}} + (1 - w(\\omega)) S_{\\text{free-rot}}\\), where \\(w = 1/(1 + (\\omega_0/\\omega)^4)\\) is a damping function with a cutoff \\(\\omega_0\\) (typically 100 cm\\(^{-1}\\)). For conformational free energies, different conformers may have very different low-frequency modes (torsions), and the standard RRHO model amplifies these differences unrealistically. The quasi-RRHO approach gives much more reliable relative free energies.'
                }
            ]
        }
    ]
});
