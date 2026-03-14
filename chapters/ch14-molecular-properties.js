// === Chapter 14: Molecular Properties ===
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch14',
    number: 14,
    title: 'Molecular Properties',
    subtitle: 'From energy to observables: derivatives, response, and spectroscopy',
    sections: [
        // ========== SECTION 1: Energy Derivatives and the Hellmann-Feynman Theorem ==========
        {
            id: 'sec14-1-energy-derivatives',
            title: 'Energy Derivatives and the Hellmann-Feynman Theorem',
            content: `
<h2>14.1 Energy Derivatives and the Hellmann-Feynman Theorem</h2>

<div class="env-block intuition"><div class="env-title">Intuition — Why Derivatives of the Energy?</div><div class="env-body">
The total electronic energy \\(E\\) is a function of nuclear coordinates, external fields, and other parameters. Almost every measurable molecular property (forces, dipole moments, polarizabilities, vibrational frequencies) can be expressed as a derivative of \\(E\\) with respect to some perturbation parameter. The energy surface is therefore the master function from which all observables flow.
</div></div>

<p>Let the electronic Hamiltonian depend on a parameter \\(\\lambda\\) (which could be a nuclear coordinate, an electric field component, etc.). We write \\(\\hat{H}(\\lambda)\\) and denote the exact energy and wavefunction by \\(E(\\lambda)\\) and \\(|\\Psi(\\lambda)\\rangle\\), respectively.</p>

<div class="env-block theorem"><div class="env-title">Theorem 14.1.1 — The Hellmann-Feynman Theorem</div><div class="env-body">
If \\(|\\Psi(\\lambda)\\rangle\\) is an exact eigenstate of \\(\\hat{H}(\\lambda)\\) with eigenvalue \\(E(\\lambda)\\), and if \\(|\\Psi(\\lambda)\\rangle\\) is normalized for all \\(\\lambda\\), then
\\[
\\frac{dE}{d\\lambda} = \\left\\langle \\Psi(\\lambda) \\left| \\frac{\\partial \\hat{H}}{\\partial \\lambda} \\right| \\Psi(\\lambda) \\right\\rangle.
\\]
</div></div>

<div class="env-block proof"><div class="env-title">Proof</div><div class="env-body">
Starting from \\(E(\\lambda) = \\langle \\Psi(\\lambda) | \\hat{H}(\\lambda) | \\Psi(\\lambda) \\rangle\\) and differentiating:
\\[
\\frac{dE}{d\\lambda} = \\left\\langle \\frac{\\partial \\Psi}{\\partial \\lambda} \\bigg| \\hat{H} \\bigg| \\Psi \\right\\rangle + \\left\\langle \\Psi \\bigg| \\frac{\\partial \\hat{H}}{\\partial \\lambda} \\bigg| \\Psi \\right\\rangle + \\left\\langle \\Psi \\bigg| \\hat{H} \\bigg| \\frac{\\partial \\Psi}{\\partial \\lambda} \\right\\rangle.
\\]
Since \\(\\hat{H}|\\Psi\\rangle = E|\\Psi\\rangle\\), the first and third terms combine to give \\(E \\frac{d}{d\\lambda}\\langle \\Psi | \\Psi \\rangle = 0\\) (by normalization). Only the middle term survives.
<div class="qed">∎</div>
</div></div>

<div class="env-block remark"><div class="env-title">Remark — Electrostatic Hellmann-Feynman Theorem</div><div class="env-body">
When \\(\\lambda\\) is a nuclear coordinate \\(R_A\\), the theorem yields the force on nucleus \\(A\\):
\\[
F_A = -\\frac{\\partial E}{\\partial R_A} = -\\left\\langle \\Psi \\left| \\frac{\\partial \\hat{H}}{\\partial R_A} \\right| \\Psi \\right\\rangle.
\\]
Since only the nuclear-electron and nuclear-nuclear terms depend on \\(R_A\\), this reduces to a purely classical electrostatic expression: the force on nucleus \\(A\\) equals the Coulomb force exerted by the electron density \\(\\rho(\\mathbf{r})\\) and the other nuclei. This is the <em>electrostatic theorem</em>.
</div></div>

<h3>Approximate Wavefunctions and the Pulay Force</h3>

<div class="env-block warning"><div class="env-title">Warning — Hellmann-Feynman Fails for Approximate Wavefunctions</div><div class="env-body">
For variational wavefunctions expanded in a <em>fixed</em> basis, the Hellmann-Feynman theorem does not hold exactly. Differentiating \\(E = \\langle \\Psi | \\hat{H} | \\Psi \\rangle\\) with respect to a nuclear coordinate generates additional terms because the basis functions (typically atom-centered Gaussians) move with the nuclei. These extra contributions are called <em>Pulay forces</em>.
</div></div>

<div class="env-block definition"><div class="env-title">Definition 14.1.2 — Pulay Force</div><div class="env-body">
For a wavefunction expanded in a basis \\(\\{\\chi_\\mu(\\mathbf{r}; \\mathbf{R})\\}\\) that depends on nuclear coordinates, the analytic gradient of the energy includes Pulay correction terms:
\\[
\\frac{dE}{dR_A} = \\left\\langle \\Psi \\left| \\frac{\\partial \\hat{H}}{\\partial R_A} \\right| \\Psi \\right\\rangle + \\sum_{\\mu\\nu} W_{\\mu\\nu} \\frac{\\partial S_{\\mu\\nu}}{\\partial R_A},
\\]
where \\(W_{\\mu\\nu}\\) is the energy-weighted density matrix and \\(S_{\\mu\\nu} = \\langle \\chi_\\mu | \\chi_\\nu \\rangle\\) is the overlap matrix.
</div></div>

<h3>Higher-Order Energy Derivatives</h3>

<p>The hierarchy of energy derivatives with respect to perturbation parameters defines the full spectrum of molecular properties:</p>

<div class="env-block definition"><div class="env-title">Definition 14.1.3 — Property Hierarchy via Energy Derivatives</div><div class="env-body">
Let \\(E(\\boldsymbol{\\lambda})\\) be the energy as a function of perturbation parameters. Then:
<ul>
<li><strong>First derivatives:</strong> Forces (\\(\\partial E / \\partial R\\)), dipole moments (\\(-\\partial E / \\partial \\mathcal{E}\\)).</li>
<li><strong>Second derivatives:</strong> Force constants / Hessian (\\(\\partial^2 E / \\partial R_i \\partial R_j\\)), polarizability (\\(-\\partial^2 E / \\partial \\mathcal{E}_\\alpha \\partial \\mathcal{E}_\\beta\\)), IR intensities (\\(\\partial^2 E / \\partial R_i \\partial \\mathcal{E}_\\alpha\\)).</li>
<li><strong>Third derivatives:</strong> Hyperpolarizability, anharmonic force constants, Raman intensities.</li>
</ul>
</div></div>

<div class="env-block proposition"><div class="env-title">Proposition 14.1.4 — Wigner's 2n+1 Rule</div><div class="env-body">
If the wavefunction is known through order \\(n\\) in perturbation theory, then the energy can be computed through order \\(2n+1\\). In particular, the first-order wavefunction suffices to compute the energy through third order, and hence second-order properties (polarizability, force constants) require only the first-order perturbed wavefunction.
</div></div>

<div class="env-block proof"><div class="env-title">Proof (Sketch)</div><div class="env-body">
Write \\(E = E^{(0)} + \\lambda E^{(1)} + \\lambda^2 E^{(2)} + \\cdots\\) and \\(|\\Psi\\rangle = |\\Psi^{(0)}\\rangle + \\lambda|\\Psi^{(1)}\\rangle + \\cdots\\). Then \\(E^{(2k+1)} = \\langle \\Psi^{(k)} | \\hat{H}^{(1)} | \\Psi^{(k)} \\rangle + \\ldots\\) involves at most the \\(k\\)-th order wavefunction. The result follows from the variational condition \\(\\langle \\delta \\Psi | \\hat{H}^{(0)} - E^{(0)} | \\Psi^{(k)} \\rangle = \\ldots\\) which constrains each order.
<div class="qed">∎</div>
</div></div>

<div class="env-block example"><div class="env-title">Example 14.1.5 — Forces on H\\(_2\\)</div><div class="env-body">
For the H\\(_2\\) molecule at internuclear distance \\(R\\), the force on nucleus A along the bond axis is
\\[
F = -\\frac{dE}{dR}.
\\]
At the equilibrium geometry \\(R_e\\), \\(F = 0\\). The force constant is \\(k = d^2E/dR^2|_{R_e}\\), directly related to the vibrational frequency \\(\\omega = \\sqrt{k/\\mu}\\) where \\(\\mu\\) is the reduced mass.
</div></div>
`,
            visualizations: [
                {
                    id: 'viz-energy-derivative',
                    title: 'Energy Curve and Force on a Diatomic',
                    description: 'A Morse-like potential \\(E(R)\\) for a diatomic molecule. The red arrow shows the force \\(F = -dE/dR\\) at the draggable point. At equilibrium (minimum), the force vanishes.',
                    setup(body, controls) {
                        const viz = new VizEngine(body, { scale: 50, originX: 80, originY: 280 });

                        const De = 4.0, a = 1.2, Re = 3.0;
                        function morse(R) {
                            if (R < 0.3) return 20;
                            return De * (1 - Math.exp(-a * (R - Re))) ** 2 - De;
                        }
                        function dMorse(R) {
                            if (R < 0.3) return 0;
                            return 2 * De * a * (1 - Math.exp(-a * (R - Re))) * Math.exp(-a * (R - Re));
                        }

                        const probe = viz.addDraggable('R', 2.0, morse(2.0), viz.colors.blue, 8, (x, y) => {
                            if (x < 0.5) probe.x = 0.5;
                            if (x > 8) probe.x = 8;
                            probe.y = morse(probe.x);
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            // Draw Morse curve
                            viz.drawFunction(morse, 0.5, 8, viz.colors.teal, 2.5);

                            // Equilibrium line
                            viz.drawSegment(Re, -De - 0.5, Re, 1, viz.colors.muted, 1, true);
                            viz.drawText('Re', Re, -De - 0.8, viz.colors.muted, 11);

                            // Current point
                            const R = probe.x;
                            const E = morse(R);
                            probe.y = E;

                            // Force arrow (negative derivative)
                            const force = -dMorse(R);
                            const arrowScale = 0.5;
                            if (Math.abs(force) > 0.05) {
                                viz.drawVector(R, E, R + force * arrowScale, E, viz.colors.red, '', 2.5);
                            }

                            // Labels
                            viz.screenText('R = ' + R.toFixed(2) + ' a\u2080', viz.width - 20, 20, viz.colors.white, 13, 'right');
                            viz.screenText('E(R) = ' + E.toFixed(3) + ' Eh', viz.width - 20, 40, viz.colors.teal, 13, 'right');
                            viz.screenText('F = ' + force.toFixed(3) + ' Eh/a\u2080', viz.width - 20, 60, viz.colors.red, 13, 'right');
                            viz.screenText('E(R) = De(1 - e^{-a(R-Re)})\u00b2 - De', 14, viz.height - 16, viz.colors.muted, 11, 'left');

                            // Axis labels
                            viz.screenText('R (bohr)', viz.width - 40, viz.originY + 20, viz.colors.text, 11);
                            viz.screenText('E (Eh)', 50, 14, viz.colors.text, 11);

                            viz.drawDraggables();
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Prove the Hellmann-Feynman theorem starting from \\(E(\\lambda) = \\langle \\Psi(\\lambda) | \\hat{H}(\\lambda) | \\Psi(\\lambda) \\rangle\\). Clearly identify where the normalization condition \\(\\langle \\Psi | \\Psi \\rangle = 1\\) is used.',
                    hint: 'Differentiate the product of three \\(\\lambda\\)-dependent factors using the product rule. Use \\(\\hat{H}|\\Psi\\rangle = E|\\Psi\\rangle\\) to simplify the first and third terms.',
                    solution: 'Differentiating: \\(dE/d\\lambda = \\langle \\partial_\\lambda \\Psi | \\hat{H} | \\Psi \\rangle + \\langle \\Psi | \\partial_\\lambda \\hat{H} | \\Psi \\rangle + \\langle \\Psi | \\hat{H} | \\partial_\\lambda \\Psi \\rangle\\). Since \\(\\hat{H}|\\Psi\\rangle = E|\\Psi\\rangle\\) and \\(\\langle \\Psi|\\hat{H} = E\\langle \\Psi|\\), the first + third terms = \\(E(\\langle \\partial_\\lambda \\Psi | \\Psi \\rangle + \\langle \\Psi | \\partial_\\lambda \\Psi \\rangle) = E \\frac{d}{d\\lambda}\\langle \\Psi | \\Psi \\rangle = 0\\). Only the middle term survives.'
                },
                {
                    question: 'For H\\(_2^+\\) (one electron), the Hamiltonian in atomic units is \\(\\hat{H} = -\\frac{1}{2}\\nabla^2 - \\frac{1}{r_A} - \\frac{1}{r_B} + \\frac{1}{R}\\). Identify which terms contribute to \\(\\partial \\hat{H}/\\partial R\\) and interpret the resulting force expression.',
                    hint: 'Only terms involving \\(R\\) or \\(r_B\\) (distance from electron to nucleus B) depend on the internuclear distance \\(R\\).',
                    solution: '\\(\\partial \\hat{H}/\\partial R = \\partial(-1/r_B)/\\partial R + \\partial(1/R)/\\partial R\\). The first term gives the electron-nucleus B force component along the bond axis; the second gives \\(-1/R^2\\), the nuclear repulsion force. By Hellmann-Feynman, \\(F = -\\langle \\Psi | \\partial_R \\hat{H} | \\Psi \\rangle = \\int \\rho(\\mathbf{r}) \\frac{\\partial(1/r_B)}{\\partial R} d\\mathbf{r} + 1/R^2\\). This is purely electrostatic: the force on B is the Coulomb attraction from the electron cloud minus the nuclear repulsion.'
                },
                {
                    question: 'Explain why the Hellmann-Feynman theorem does not hold for a Hartree-Fock wavefunction expanded in a finite, atom-centered basis set. What additional terms arise?',
                    hint: 'The basis functions \\(\\chi_\\mu(\\mathbf{r} - \\mathbf{R}_A)\\) depend on nuclear coordinates. Differentiating the expansion coefficients and basis functions with respect to \\(R_A\\) produces extra terms.',
                    solution: 'In HF with atom-centered bases, the wavefunction parameters (MO coefficients) and basis functions both depend on nuclear coordinates. Even though HF satisfies the variational condition \\(\\partial E/\\partial C_{\\mu i} = 0\\), differentiating the basis functions yields overlap-derivative terms (Pulay forces): \\(\\sum_{\\mu\\nu} W_{\\mu\\nu} \\partial S_{\\mu\\nu}/\\partial R_A\\). These vanish only for a complete basis or a basis independent of nuclear positions (e.g., plane waves).'
                },
                {
                    question: 'Using the 2n+1 rule, determine the highest-order energy that can be computed from the zeroth-order wavefunction (i.e., the unperturbed eigenstate) alone.',
                    hint: 'Set \\(n = 0\\) in the 2n+1 rule.',
                    solution: 'With \\(n = 0\\): \\(2(0) + 1 = 1\\). The zeroth-order wavefunction suffices for \\(E^{(0)}\\) and \\(E^{(1)}\\). Indeed, \\(E^{(1)} = \\langle \\Psi^{(0)} | \\hat{H}^{(1)} | \\Psi^{(0)} \\rangle\\) requires only the unperturbed state. For \\(E^{(2)}\\), the first-order wavefunction is needed.'
                },
                {
                    question: 'Show that the force constant (second derivative of energy) at equilibrium is related to the curvature of the Morse potential \\(V(R) = D_e(1 - e^{-a(R-R_e)})^2\\).',
                    hint: 'Compute \\(d^2V/dR^2\\) and evaluate at \\(R = R_e\\).',
                    solution: '\\(dV/dR = 2D_e a (1 - e^{-a(R-R_e)}) e^{-a(R-R_e)}\\). \\(d^2V/dR^2 = 2D_e a^2 [2e^{-2a(R-R_e)} - e^{-a(R-R_e)}]\\). At \\(R = R_e\\): \\(d^2V/dR^2 = 2D_e a^2 (2 - 1) = 2D_e a^2\\). So \\(k = 2D_e a^2\\) and \\(\\omega = \\sqrt{2D_e a^2 / \\mu}\\).'
                }
            ]
        },

        // ========== SECTION 2: Electric Properties ==========
        {
            id: 'sec14-2-electric-properties',
            title: 'Electric Properties',
            content: `
<h2>14.2 Electric Properties</h2>

<div class="env-block intuition"><div class="env-title">Intuition — Molecules in Electric Fields</div><div class="env-body">
When a molecule is placed in a static electric field \\(\\boldsymbol{\\mathcal{E}}\\), its energy changes. The leading correction is proportional to the permanent dipole moment; the next correction involves the polarizability. These quantities characterize how charge is distributed in the molecule and how easily that distribution deforms.
</div></div>

<h3>The Multipole Expansion of Molecular Energy</h3>

<p>The energy of a neutral molecule in a uniform static electric field \\(\\boldsymbol{\\mathcal{E}}\\) can be expanded as:</p>
\\[
E(\\boldsymbol{\\mathcal{E}}) = E_0 - \\sum_\\alpha \\mu_\\alpha \\mathcal{E}_\\alpha - \\frac{1}{2}\\sum_{\\alpha\\beta} \\alpha_{\\alpha\\beta} \\mathcal{E}_\\alpha \\mathcal{E}_\\beta - \\frac{1}{6}\\sum_{\\alpha\\beta\\gamma} \\beta_{\\alpha\\beta\\gamma} \\mathcal{E}_\\alpha \\mathcal{E}_\\beta \\mathcal{E}_\\gamma - \\cdots
\\]

<div class="env-block definition"><div class="env-title">Definition 14.2.1 — Permanent Dipole Moment</div><div class="env-body">
The permanent electric dipole moment is the first derivative of the energy with respect to the electric field, evaluated at zero field:
\\[
\\mu_\\alpha = -\\frac{\\partial E}{\\partial \\mathcal{E}_\\alpha}\\bigg|_{\\boldsymbol{\\mathcal{E}}=0} = \\sum_A Z_A R_{A\\alpha} - \\int \\rho(\\mathbf{r})\\, r_\\alpha\\, d\\mathbf{r},
\\]
where \\(\\alpha \\in \\{x, y, z\\}\\), \\(Z_A\\) are nuclear charges, and \\(\\rho(\\mathbf{r})\\) is the electron density.
</div></div>

<div class="env-block definition"><div class="env-title">Definition 14.2.2 — Polarizability Tensor</div><div class="env-body">
The static electric polarizability is the second derivative:
\\[
\\alpha_{\\alpha\\beta} = -\\frac{\\partial^2 E}{\\partial \\mathcal{E}_\\alpha \\partial \\mathcal{E}_\\beta}\\bigg|_{\\boldsymbol{\\mathcal{E}}=0}.
\\]
It is a symmetric \\(3 \\times 3\\) tensor that describes the linear response of the dipole moment to an applied field: \\(\\Delta \\mu_\\alpha = \\sum_\\beta \\alpha_{\\alpha\\beta} \\mathcal{E}_\\beta\\).
</div></div>

<div class="viz-placeholder" data-viz="viz-dipole-moment"></div>

<div class="env-block definition"><div class="env-title">Definition 14.2.3 — First Hyperpolarizability</div><div class="env-body">
The first hyperpolarizability is the third derivative:
\\[
\\beta_{\\alpha\\beta\\gamma} = -\\frac{\\partial^3 E}{\\partial \\mathcal{E}_\\alpha \\partial \\mathcal{E}_\\beta \\partial \\mathcal{E}_\\gamma}\\bigg|_{\\boldsymbol{\\mathcal{E}}=0}.
\\]
It governs nonlinear optical effects such as second-harmonic generation. By symmetry, \\(\\beta = 0\\) for centrosymmetric molecules.
</div></div>

<h3>Computing the Dipole Moment</h3>

<div class="env-block proposition"><div class="env-title">Proposition 14.2.4 — Dipole from the One-Electron Density</div><div class="env-body">
For any method that yields a one-particle density matrix \\(D_{\\mu\\nu}\\), the dipole moment components are:
\\[
\\mu_\\alpha = \\sum_A Z_A R_{A\\alpha} - \\sum_{\\mu\\nu} D_{\\mu\\nu} \\langle \\chi_\\mu | r_\\alpha | \\chi_\\nu \\rangle.
\\]
</div></div>

<h3>Computing the Polarizability</h3>

<div class="env-block theorem"><div class="env-title">Theorem 14.2.5 — Sum-Over-States Expression for Polarizability</div><div class="env-body">
The static polarizability can be written as a sum over excited states:
\\[
\\alpha_{\\alpha\\beta} = 2 \\sum_{n \\neq 0} \\frac{\\langle 0 | \\hat{\\mu}_\\alpha | n \\rangle \\langle n | \\hat{\\mu}_\\beta | 0 \\rangle}{E_n - E_0},
\\]
where \\(|0\\rangle\\) is the ground state, \\(|n\\rangle\\) are excited states, and \\(\\hat{\\mu}_\\alpha\\) is the \\(\\alpha\\)-component of the dipole operator.
</div></div>

<div class="env-block proof"><div class="env-title">Proof</div><div class="env-body">
Add \\(-\\hat{\\boldsymbol{\\mu}} \\cdot \\boldsymbol{\\mathcal{E}}\\) to the Hamiltonian as a perturbation. By second-order perturbation theory:
\\[
E^{(2)} = -\\sum_{n \\neq 0} \\frac{|\\langle n | \\hat{\\boldsymbol{\\mu}} \\cdot \\boldsymbol{\\mathcal{E}} | 0 \\rangle|^2}{E_n - E_0}.
\\]
Expanding and identifying with \\(-\\frac{1}{2}\\alpha_{\\alpha\\beta}\\mathcal{E}_\\alpha \\mathcal{E}_\\beta\\) yields the result.
<div class="qed">∎</div>
</div></div>

<div class="viz-placeholder" data-viz="viz-polarizability"></div>

<div class="env-block corollary"><div class="env-title">Corollary 14.2.6</div><div class="env-body">
The polarizability is always positive semi-definite (as a matrix), since every term in the sum-over-states expression has \\(E_n - E_0 > 0\\) and the numerator is a squared matrix element.
</div></div>

<div class="env-block example"><div class="env-title">Example 14.2.7 — Polarizability of the Hydrogen Atom</div><div class="env-body">
For the hydrogen atom in the ground state, the exact static polarizability is \\(\\alpha = \\frac{9}{2} a_0^3 = 4.5\\) a.u. This can be obtained analytically using the Dalgarno-Lewis method or by explicit summation (including the continuum). The dominant contribution comes from the \\(1s \\to 2p\\) transition.
</div></div>

<div class="env-block example"><div class="env-title">Example 14.2.8 — Finite-Field Method</div><div class="env-body">
In practice, the polarizability can be computed numerically via finite differences:
\\[
\\alpha_{xx} \\approx -\\frac{E(+\\mathcal{E}_x) - 2E(0) + E(-\\mathcal{E}_x)}{\\mathcal{E}_x^2},
\\]
using a small field strength \\(\\mathcal{E}_x \\sim 0.001\\) a.u. This avoids the need for analytic derivative code but suffers from numerical precision issues.
</div></div>
`,
            visualizations: [
                {
                    id: 'viz-dipole-moment',
                    title: 'Dipole Moment of a Diatomic',
                    description: 'Visualizes the charge distribution and dipole moment vector for a heteronuclear diatomic. Adjust the electronegativity difference to see how the dipole moment changes.',
                    setup(body, controls) {
                        const viz = new VizEngine(body, { scale: 40, originX: 280, originY: 200 });
                        let deltaEN = 1.5;

                        VizEngine.createSlider(controls, '\u0394EN', 0, 3, deltaEN, 0.1, v => { deltaEN = v; draw(); });

                        function draw() {
                            viz.clear();
                            const ctx = viz.ctx;

                            // Background
                            ctx.fillStyle = viz.colors.bg;
                            ctx.fillRect(0, 0, viz.width, viz.height);

                            // Atom positions
                            const xA = -2.5, xB = 2.5, yAtom = 0;
                            const [sxA, syA] = viz.toScreen(xA, yAtom);
                            const [sxB, syB] = viz.toScreen(xB, yAtom);

                            // Electron density cloud (shifted toward more electronegative atom B)
                            const shift = deltaEN * 0.3;
                            const cloudCenterX = (xA + xB) / 2 + shift;
                            const cloudWidth = 5.5;
                            const cloudHeight = 1.8;

                            // Draw density as gradient ellipse
                            const [scx, scy] = viz.toScreen(cloudCenterX, yAtom);
                            const gradient = ctx.createRadialGradient(scx, scy, 0, scx, scy, cloudWidth * viz.scale);
                            gradient.addColorStop(0, 'rgba(88, 166, 255, 0.35)');
                            gradient.addColorStop(0.5, 'rgba(88, 166, 255, 0.15)');
                            gradient.addColorStop(1, 'rgba(88, 166, 255, 0)');
                            ctx.fillStyle = gradient;
                            ctx.beginPath();
                            ctx.ellipse(scx, scy, cloudWidth * viz.scale, cloudHeight * viz.scale, 0, 0, Math.PI * 2);
                            ctx.fill();

                            // Bond
                            ctx.strokeStyle = viz.colors.muted;
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            ctx.moveTo(sxA, syA);
                            ctx.lineTo(sxB, syB);
                            ctx.stroke();

                            // Nuclei
                            const rA = 18, rB = 22;
                            // Atom A (less electronegative)
                            ctx.fillStyle = viz.colors.orange;
                            ctx.beginPath(); ctx.arc(sxA, syA, rA, 0, Math.PI * 2); ctx.fill();
                            ctx.fillStyle = '#fff'; ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                            ctx.fillText('A', sxA, syA);

                            // Atom B (more electronegative)
                            ctx.fillStyle = viz.colors.red;
                            ctx.beginPath(); ctx.arc(sxB, syB, rB, 0, Math.PI * 2); ctx.fill();
                            ctx.fillStyle = '#fff';
                            ctx.fillText('B', sxB, syB);

                            // Partial charges
                            const q = deltaEN * 0.2;
                            if (deltaEN > 0.05) {
                                ctx.font = '14px -apple-system,sans-serif';
                                ctx.fillStyle = viz.colors.orange;
                                ctx.fillText('\u03B4+ = ' + q.toFixed(2), sxA, syA - rA - 16);
                                ctx.fillStyle = viz.colors.red;
                                ctx.fillText('\u03B4\u2212 = ' + q.toFixed(2), sxB, syB - rB - 16);
                            }

                            // Dipole moment vector (from negative to positive charge center in physics convention,
                            // but chemists draw from + to -)
                            if (deltaEN > 0.05) {
                                const dipMag = q * 5.0; // q * R
                                // Physics convention: dipole points from - to +
                                // We draw it below the molecule
                                const arrowY = -2.5;
                                const arrowStartX = -dipMag / 2;
                                const arrowEndX = dipMag / 2;
                                viz.drawVector(arrowStartX, arrowY, arrowEndX, arrowY, viz.colors.green, '', 2.5);
                                viz.drawText('\u03BC = ' + dipMag.toFixed(2) + ' D', 0, arrowY - 0.7, viz.colors.green, 14);

                                // Direction label
                                viz.screenText('\u03BC (+ \u2192 \u2212)', viz.width / 2, viz.height - 20, viz.colors.muted, 11);
                            } else {
                                viz.drawText('\u03BC = 0 (homonuclear)', 0, -2.5, viz.colors.muted, 14);
                            }

                            // Title area info
                            viz.screenText('\u0394EN = ' + deltaEN.toFixed(1), 14, 20, viz.colors.white, 13, 'left');
                            viz.screenText('|\u03BC| = ' + (q * 5.0).toFixed(2) + ' Debye', 14, 40, viz.colors.green, 13, 'left');
                        }
                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-polarizability',
                    title: 'Polarizability Ellipsoid',
                    description: 'The electron cloud deforms under an applied electric field. The polarizability ellipsoid shows how easily the molecule polarizes along different directions. Adjust the field strength and the principal polarizabilities.',
                    setup(body, controls) {
                        const viz = new VizEngine(body, { scale: 35, originX: 280, originY: 200 });
                        let axx = 2.0, ayy = 1.0, fieldAngle = 0, fieldStrength = 0.5;

                        VizEngine.createSlider(controls, '\u03B1_xx', 0.5, 4, axx, 0.1, v => { axx = v; draw(); });
                        VizEngine.createSlider(controls, '\u03B1_yy', 0.5, 4, ayy, 0.1, v => { ayy = v; draw(); });
                        VizEngine.createSlider(controls, 'Field angle', 0, 360, 0, 1, v => { fieldAngle = v * Math.PI / 180; draw(); });
                        VizEngine.createSlider(controls, 'Field |E|', 0, 1.5, fieldStrength, 0.05, v => { fieldStrength = v; draw(); });

                        function draw() {
                            viz.clear();
                            const ctx = viz.ctx;

                            // Draw unpolarized cloud (circle)
                            const [cx, cy] = viz.toScreen(0, 0);
                            ctx.strokeStyle = viz.colors.muted + '66';
                            ctx.lineWidth = 1;
                            ctx.setLineDash([4, 4]);
                            ctx.beginPath();
                            ctx.arc(cx, cy, 1.5 * viz.scale, 0, Math.PI * 2);
                            ctx.stroke();
                            ctx.setLineDash([]);

                            // Compute induced dipole
                            const Ex = fieldStrength * Math.cos(fieldAngle);
                            const Ey = fieldStrength * Math.sin(fieldAngle);
                            const dMux = axx * Ex;
                            const dMuy = ayy * Ey;

                            // Draw polarized ellipsoid
                            // Radii scale with sqrt of polarizability for visual
                            const baseR = 1.5;
                            const rx = baseR + fieldStrength * axx * 0.3;
                            const ry = baseR + fieldStrength * ayy * 0.3;

                            // Shift center along induced dipole direction
                            const shiftX = dMux * 0.3;
                            const shiftY = dMuy * 0.3;

                            const [ecx, ecy] = viz.toScreen(shiftX, shiftY);
                            ctx.fillStyle = 'rgba(88, 166, 255, 0.15)';
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.ellipse(ecx, ecy, rx * viz.scale, ry * viz.scale, 0, 0, Math.PI * 2);
                            ctx.fill();
                            ctx.stroke();

                            // Nucleus at center
                            viz.drawPoint(0, 0, viz.colors.orange, '', 6);

                            // Electric field arrow
                            if (fieldStrength > 0.01) {
                                const fScale = 3.0;
                                viz.drawVector(
                                    -Ex * fScale, -Ey * fScale,
                                    Ex * fScale, Ey * fScale,
                                    viz.colors.yellow, 'E', 2
                                );
                            }

                            // Induced dipole arrow
                            if (fieldStrength > 0.01) {
                                viz.drawVector(0, 0, dMux * 1.5, dMuy * 1.5, viz.colors.green, '\u0394\u03BC', 2.5);
                            }

                            // Polarizability ellipsoid axes
                            viz.drawSegment(-axx * 0.8, 0, axx * 0.8, 0, viz.colors.purple + '66', 1, true);
                            viz.drawSegment(0, -ayy * 0.8, 0, ayy * 0.8, viz.colors.purple + '66', 1, true);

                            // Labels
                            viz.screenText('\u03B1_xx = ' + axx.toFixed(1), 14, 20, viz.colors.white, 13, 'left');
                            viz.screenText('\u03B1_yy = ' + ayy.toFixed(1), 14, 38, viz.colors.white, 13, 'left');
                            viz.screenText('\u0394\u03BC = \u03B1 \u00b7 E', 14, 56, viz.colors.green, 12, 'left');
                            viz.screenText('Dashed circle: unperturbed', 14, viz.height - 16, viz.colors.muted, 11, 'left');
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show that the polarizability tensor \\(\\alpha_{\\alpha\\beta}\\) is symmetric, i.e., \\(\\alpha_{\\alpha\\beta} = \\alpha_{\\beta\\alpha}\\).',
                    hint: 'Use the sum-over-states expression and note that the dipole operator is Hermitian.',
                    solution: 'From the sum-over-states formula: \\(\\alpha_{\\alpha\\beta} = 2\\sum_{n \\neq 0} \\frac{\\langle 0|\\hat{\\mu}_\\alpha|n\\rangle\\langle n|\\hat{\\mu}_\\beta|0\\rangle}{E_n - E_0}\\). Since \\(\\hat{\\mu}\\) is Hermitian, \\(\\langle n|\\hat{\\mu}_\\beta|0\\rangle = \\overline{\\langle 0|\\hat{\\mu}_\\beta|n\\rangle}\\). For real wavefunctions, \\(\\alpha_{\\alpha\\beta} = 2\\sum_n \\frac{\\langle 0|\\hat{\\mu}_\\alpha|n\\rangle \\langle 0|\\hat{\\mu}_\\beta|n\\rangle}{E_n - E_0} = \\alpha_{\\beta\\alpha}\\).'
                },
                {
                    question: 'The dipole moment of HF is 1.826 D and the bond length is 0.917 A. Calculate the effective partial charges on H and F.',
                    hint: '1 Debye = 3.336 \\(\\times 10^{-30}\\) C m. Use \\(\\mu = q \\cdot d\\).',
                    solution: '\\(\\mu = 1.826 \\times 3.336 \\times 10^{-30} = 6.092 \\times 10^{-30}\\) C m. \\(d = 0.917 \\times 10^{-10}\\) m. \\(q = \\mu/d = 6.092 \\times 10^{-30} / 9.17 \\times 10^{-11} = 6.64 \\times 10^{-20}\\) C \\(= 0.415e\\). So \\(\\delta = 0.415\\), indicating about 41.5% ionic character.'
                },
                {
                    question: 'Explain why centrosymmetric molecules (e.g., CO\\(_2\\), benzene) have zero first hyperpolarizability \\(\\beta_{\\alpha\\beta\\gamma} = 0\\).',
                    hint: 'Consider how the dipole operator transforms under the inversion operation.',
                    solution: 'Under inversion \\(\\hat{i}\\), the dipole operator changes sign: \\(\\hat{i}\\hat{\\mu}_\\alpha\\hat{i}^{-1} = -\\hat{\\mu}_\\alpha\\). For a centrosymmetric molecule, eigenstates have definite parity (gerade or ungerade). The matrix element \\(\\langle n|\\hat{\\mu}_\\alpha|0\\rangle\\) is nonzero only if \\(|n\\rangle\\) and \\(|0\\rangle\\) have opposite parity. The third-order SOS expression for \\(\\beta\\) involves products of three dipole matrix elements, each connecting states of opposite parity. Tracing through the parity requirements shows the sum vanishes identically by symmetry.'
                },
                {
                    question: 'Derive the finite-field expression for \\(\\alpha_{xx}\\) using a three-point central difference formula.',
                    hint: 'Expand \\(E(+\\mathcal{E})\\) and \\(E(-\\mathcal{E})\\) in a Taylor series around \\(\\mathcal{E} = 0\\).',
                    solution: '\\(E(\\pm\\mathcal{E}) = E_0 \\mp \\mu_x \\mathcal{E} - \\frac{1}{2}\\alpha_{xx}\\mathcal{E}^2 \\mp \\frac{1}{6}\\beta_{xxx}\\mathcal{E}^3 - \\cdots\\). Adding: \\(E(+\\mathcal{E}) + E(-\\mathcal{E}) = 2E_0 - \\alpha_{xx}\\mathcal{E}^2 + O(\\mathcal{E}^4)\\). Hence \\(\\alpha_{xx} = -(E(+\\mathcal{E}) - 2E_0 + E(-\\mathcal{E}))/\\mathcal{E}^2 + O(\\mathcal{E}^2)\\).'
                },
                {
                    question: 'The polarizability of helium is \\(\\alpha = 1.38\\) a.u. Estimate the dominant contribution from the \\(1s \\to 2p\\) transition, given \\(E_{2p} - E_{1s} = 0.75\\) a.u. and \\(|\\langle 1s|z|2p_0\\rangle|^2 = 2^{15}/(3^{10}) \\approx 0.559\\) a.u.',
                    hint: 'Use the SOS formula with just the dominant term. For a spherical atom, \\(\\alpha = \\alpha_{zz} = \\frac{2}{3}\\alpha_{\\text{total per component}} \\times 3\\).',
                    solution: '\\(\\alpha \\approx 2 \\times \\frac{|\\langle 1s|z|2p_0\\rangle|^2}{E_{2p} - E_{1s}} \\times 3 = 2 \\times \\frac{0.559}{0.75} \\times 1 = 1.49\\) a.u. (the factor of 3 accounts for three \\(p\\) orientations, but we sum only the \\(z\\) component for \\(\\alpha_{zz}\\), so \\(\\alpha_{zz} = 2 \\times 0.559/0.75 = 1.49\\)). This overestimates the true value (1.38) because the SOS includes negative higher-order contributions and we used approximate one-electron energies.'
                }
            ]
        },

        // ========== SECTION 3: Magnetic Properties ==========
        {
            id: 'sec14-3-magnetic-properties',
            title: 'Magnetic Properties',
            content: `
<h2>14.3 Magnetic Properties</h2>

<div class="env-block intuition"><div class="env-title">Intuition — Molecules in Magnetic Fields</div><div class="env-body">
Magnetic fields interact with molecular electronic structure through two mechanisms: the orbital motion of electrons (orbital angular momentum) and the intrinsic spin. Nuclear spins provide an additional magnetic probe. The resulting properties (chemical shifts, coupling constants, magnetizability) are the foundation of NMR spectroscopy.
</div></div>

<h3>The Hamiltonian in a Magnetic Field</h3>

<p>In the presence of a uniform external magnetic field \\(\\mathbf{B}\\) and nuclear magnetic moments, the electronic Hamiltonian acquires additional terms:</p>

<div class="env-block definition"><div class="env-title">Definition 14.3.1 — Magnetic Perturbation Hamiltonian</div><div class="env-body">
The interaction of the electrons with external field \\(\\mathbf{B}\\) and nuclear magnetic moments \\(\\{\\mathbf{m}_K\\}\\) introduces:
\\[
\\hat{H}_{\\text{mag}} = \\hat{H}_{\\text{orbital}} + \\hat{H}_{\\text{spin}} + \\hat{H}_{\\text{diamag}},
\\]
where
<ul>
<li>\\(\\hat{H}_{\\text{orbital}} = \\frac{1}{2c}\\mathbf{B} \\cdot \\hat{\\mathbf{L}}\\) (paramagnetic orbital term),</li>
<li>\\(\\hat{H}_{\\text{spin}} = \\frac{1}{c}\\mathbf{B} \\cdot \\hat{\\mathbf{S}} + \\text{hyperfine terms}\\),</li>
<li>\\(\\hat{H}_{\\text{diamag}} = \\frac{1}{8c^2}\\sum_i (\\mathbf{B} \\times \\mathbf{r}_i)^2\\) (diamagnetic gauge term).</li>
</ul>
Here \\(c\\) is the speed of light in atomic units (\\(c \\approx 137\\)).
</div></div>

<h3>NMR Chemical Shift</h3>

<div class="env-block definition"><div class="env-title">Definition 14.3.2 — Nuclear Shielding Tensor</div><div class="env-body">
The nuclear shielding tensor \\(\\sigma_{\\alpha\\beta}^K\\) for nucleus \\(K\\) relates the effective field at the nucleus to the applied field:
\\[
B_{\\alpha}^{\\text{eff}}(K) = \\sum_\\beta (\\delta_{\\alpha\\beta} - \\sigma_{\\alpha\\beta}^K) B_\\beta.
\\]
It is a mixed second derivative of the energy:
\\[
\\sigma_{\\alpha\\beta}^K = \\frac{\\partial^2 E}{\\partial m_{K\\alpha}\\, \\partial B_\\beta}\\bigg|_{\\mathbf{B}=0,\\,\\mathbf{m}=0}.
\\]
</div></div>

<div class="env-block theorem"><div class="env-title">Theorem 14.3.3 — Ramsey's Formula for Nuclear Shielding</div><div class="env-body">
The isotropic nuclear shielding can be decomposed into diamagnetic and paramagnetic contributions:
\\[
\\sigma^K = \\sigma_{\\text{dia}}^K + \\sigma_{\\text{para}}^K,
\\]
where
\\[
\\sigma_{\\text{dia}}^K = \\frac{e^2}{3m_e c^2} \\left\\langle 0 \\left| \\sum_i \\frac{1}{r_{iK}} \\right| 0 \\right\\rangle
\\]
(the Lamb formula, involving only the ground-state density) and
\\[
\\sigma_{\\text{para}}^K = -\\frac{2}{3c^2} \\sum_{n \\neq 0} \\frac{\\text{Re}\\left[\\langle 0 | \\hat{L} | n \\rangle \\cdot \\langle n | \\hat{L}_K / r_{iK}^3 | 0 \\rangle\\right]}{E_n - E_0},
\\]
involving a sum over excited states.
</div></div>

<div class="viz-placeholder" data-viz="viz-nmr-shift"></div>

<div class="env-block remark"><div class="env-title">Remark — The Gauge-Origin Problem</div><div class="env-body">
The vector potential \\(\\mathbf{A} = \\frac{1}{2}\\mathbf{B} \\times (\\mathbf{r} - \\mathbf{R}_O)\\) depends on the choice of gauge origin \\(\\mathbf{R}_O\\). For exact wavefunctions, physical properties are gauge-invariant. For approximate (truncated basis) calculations, results depend on \\(\\mathbf{R}_O\\) unless special techniques are used. The most common solution is <em>Gauge-Including Atomic Orbitals</em> (GIAOs), also called London orbitals:
\\[
\\chi_\\mu^{\\text{GIAO}}(\\mathbf{r}) = \\exp\\left(-\\frac{i}{2c}\\mathbf{B} \\cdot (\\mathbf{R}_\\mu \\times \\mathbf{r})\\right) \\chi_\\mu(\\mathbf{r}),
\\]
which ensure gauge-origin independence for any basis set size.
</div></div>

<h3>Spin-Spin Coupling Constants</h3>

<div class="env-block definition"><div class="env-title">Definition 14.3.4 — Indirect Nuclear Spin-Spin Coupling</div><div class="env-body">
The indirect (J) coupling tensor between nuclei \\(K\\) and \\(L\\) is:
\\[
J_{\\alpha\\beta}^{KL} = \\frac{\\partial^2 E}{\\partial m_{K\\alpha}\\, \\partial m_{L\\beta}}\\bigg|_{\\mathbf{m}=0}.
\\]
The isotropic coupling constant \\(J_{KL} = \\frac{1}{3}\\text{Tr}(\\mathbf{J}^{KL})\\) is what is measured in solution NMR as line splittings.
</div></div>

<div class="env-block theorem"><div class="env-title">Theorem 14.3.5 — Ramsey Decomposition of J-Coupling</div><div class="env-body">
The J-coupling has four contributions:
\\[
J^{KL} = J_{\\text{FC}}^{KL} + J_{\\text{SD}}^{KL} + J_{\\text{PSO}}^{KL} + J_{\\text{DSO}}^{KL},
\\]
where FC = Fermi contact (dominant for most couplings involving \\(^1\\)H), SD = spin-dipolar, PSO = paramagnetic spin-orbit, and DSO = diamagnetic spin-orbit. Only the Fermi contact term depends on electron density at the nuclei: \\(\\hat{H}_{\\text{FC}}^K = \\frac{8\\pi}{3}\\gamma_K \\delta(\\mathbf{r}_K) \\hat{\\mathbf{S}}\\).
</div></div>

<h3>Magnetizability</h3>

<div class="env-block definition"><div class="env-title">Definition 14.3.6 — Magnetizability Tensor</div><div class="env-body">
The magnetizability (magnetic susceptibility per molecule) is the second derivative of the energy with respect to the magnetic field:
\\[
\\xi_{\\alpha\\beta} = -\\frac{\\partial^2 E}{\\partial B_\\alpha \\partial B_\\beta}\\bigg|_{\\mathbf{B}=0}.
\\]
Negative \\(\\xi\\) indicates diamagnetic behavior (most closed-shell molecules); positive \\(\\xi\\) indicates paramagnetism.
</div></div>

<div class="env-block example"><div class="env-title">Example 14.3.7 — Chemical Shift Trends</div><div class="env-body">
In \\(^1\\)H NMR, proton chemical shifts typically range from 0 to 12 ppm:
<ul>
<li>Alkyl protons (TMS reference): \\(\\delta \\approx 0\\text{--}2\\) ppm</li>
<li>Vinyl protons: \\(\\delta \\approx 4.5\\text{--}6.5\\) ppm</li>
<li>Aromatic protons: \\(\\delta \\approx 6.5\\text{--}8.5\\) ppm (ring current deshielding)</li>
<li>Aldehyde protons: \\(\\delta \\approx 9\\text{--}10\\) ppm</li>
<li>Carboxylic acid protons: \\(\\delta \\approx 10\\text{--}12\\) ppm</li>
</ul>
The trend reflects increasing deshielding from paramagnetic currents and electronegative substituents.
</div></div>
`,
            visualizations: [
                {
                    id: 'viz-nmr-shift',
                    title: 'NMR Chemical Shift Diagram',
                    description: 'A schematic NMR spectrum showing chemical shifts for different functional groups. The shielding/deshielding regions illustrate how electron density around a nucleus affects its resonance frequency.',
                    setup(body, controls) {
                        const viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                        const ctx = viz.ctx;
                        const W = viz.width, H = viz.height;

                        // Chemical shift data: {group, shift, color}
                        const groups = [
                            { name: 'TMS\n(ref)', shift: 0.0, color: viz.colors.muted },
                            { name: 'R-CH\u2083', shift: 0.9, color: viz.colors.blue },
                            { name: 'R\u2082-CH\u2082', shift: 1.3, color: viz.colors.blue },
                            { name: 'R\u2083-CH', shift: 1.5, color: viz.colors.teal },
                            { name: 'C=C-H', shift: 5.3, color: viz.colors.green },
                            { name: 'Ar-H', shift: 7.3, color: viz.colors.purple },
                            { name: 'CHO', shift: 9.5, color: viz.colors.orange },
                            { name: 'COOH', shift: 11.0, color: viz.colors.red }
                        ];

                        let showType = 'H1';
                        VizEngine.createButton(controls, '\u00b9H NMR', () => { showType = 'H1'; draw(); });
                        VizEngine.createButton(controls, '\u00b9\u00b3C NMR', () => { showType = 'C13'; draw(); });

                        const c13groups = [
                            { name: 'R-CH\u2083', shift: 15, color: viz.colors.blue },
                            { name: 'R\u2082CH\u2082', shift: 30, color: viz.colors.blue },
                            { name: 'C-O', shift: 60, color: viz.colors.teal },
                            { name: 'C=C', shift: 125, color: viz.colors.green },
                            { name: 'Ar-C', shift: 135, color: viz.colors.purple },
                            { name: 'C=O', shift: 195, color: viz.colors.orange },
                            { name: 'COOH', shift: 175, color: viz.colors.red }
                        ];

                        function draw() {
                            ctx.fillStyle = viz.colors.bg;
                            ctx.fillRect(0, 0, W, H);

                            const data = showType === 'H1' ? groups : c13groups;
                            const maxShift = showType === 'H1' ? 13 : 220;
                            const margin = { left: 60, right: 40, top: 50, bottom: 60 };
                            const plotW = W - margin.left - margin.right;
                            const plotH = H - margin.top - margin.bottom;
                            const axisY = margin.top + plotH;

                            // Axis (reversed: high ppm on left)
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1.5;
                            ctx.beginPath();
                            ctx.moveTo(margin.left, axisY);
                            ctx.lineTo(margin.left + plotW, axisY);
                            ctx.stroke();

                            // Tick marks
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            const step = showType === 'H1' ? 1 : 20;
                            for (let s = 0; s <= maxShift; s += step) {
                                const x = margin.left + plotW * (1 - s / maxShift);
                                ctx.beginPath();
                                ctx.moveTo(x, axisY);
                                ctx.lineTo(x, axisY + 5);
                                ctx.stroke();
                                ctx.fillText(s.toString(), x, axisY + 8);
                            }

                            // Axis label
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.white;
                            ctx.fillText('\u03B4 (ppm)', margin.left + plotW / 2, axisY + 30);

                            // Title
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.fillText(showType === 'H1' ? '\u00b9H Chemical Shifts' : '\u00b9\u00b3C Chemical Shifts', margin.left + plotW / 2, 20);

                            // Shielded / Deshielded labels
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.green + 'aa';
                            ctx.textAlign = 'right';
                            ctx.fillText('\u2190 Shielded (upfield)', margin.left + plotW - 5, axisY + 48);
                            ctx.fillStyle = viz.colors.red + 'aa';
                            ctx.textAlign = 'left';
                            ctx.fillText('Deshielded (downfield) \u2192', margin.left + 5, axisY + 48);

                            // Draw peaks
                            data.forEach(g => {
                                const x = margin.left + plotW * (1 - g.shift / maxShift);
                                const peakH = plotH * 0.6;

                                // Peak line
                                ctx.strokeStyle = g.color;
                                ctx.lineWidth = 3;
                                ctx.beginPath();
                                ctx.moveTo(x, axisY);
                                ctx.lineTo(x, axisY - peakH);
                                ctx.stroke();

                                // Peak top circle
                                ctx.fillStyle = g.color;
                                ctx.beginPath();
                                ctx.arc(x, axisY - peakH, 4, 0, Math.PI * 2);
                                ctx.fill();

                                // Label
                                ctx.fillStyle = g.color;
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'bottom';
                                const lines = g.name.split('\n');
                                lines.forEach((line, i) => {
                                    ctx.fillText(line, x, axisY - peakH - 8 - (lines.length - 1 - i) * 14);
                                });
                            });
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Explain the physical origin of the diamagnetic and paramagnetic contributions to nuclear shielding. Why is the paramagnetic term negative (deshielding)?',
                    hint: 'The diamagnetic term arises from the circulation of ground-state electrons induced by the field. The paramagnetic term involves virtual excitations to excited states.',
                    solution: 'The diamagnetic contribution (Lamb term) reflects the ground-state electron density circulating around the nucleus, generating a secondary field opposing \\(\\mathbf{B}\\) (the Lenz law), hence shielding. The paramagnetic contribution involves mixing of excited states into the ground state via the angular momentum operator; this mixing can create circulations that reinforce \\(\\mathbf{B}\\) at the nucleus, causing deshielding. The paramagnetic term involves \\(1/(E_n - E_0)\\), so low-lying excited states cause larger deshielding. For \\(^1\\)H, the paramagnetic term is small (no low-lying excitations from 1s); for heavier nuclei (\\(^{13}\\)C, \\(^{15}\\)N), it dominates.'
                },
                {
                    question: 'Why do aromatic protons appear deshielded (\\(\\delta \\approx 7\\text{--}8\\) ppm) while protons above or below an aromatic ring are shielded?',
                    hint: 'Consider the ring current model: the \\(\\pi\\) electrons circulate in the magnetic field, creating a secondary magnetic field.',
                    solution: 'The external field \\(\\mathbf{B}_0\\) induces a ring current in the \\(\\pi\\) system. This current generates a secondary field that opposes \\(\\mathbf{B}_0\\) inside the ring but reinforces it outside (in the plane of the ring). Protons at the ring periphery experience an enhanced local field (deshielded, higher \\(\\delta\\)). Protons above/below the ring (e.g., in cyclophanes or metal complexes) sit in the opposing-field region and are shielded (lower \\(\\delta\\), sometimes negative).'
                },
                {
                    question: 'Show that for a spherically symmetric atom, the diamagnetic shielding reduces to \\(\\sigma_{\\text{dia}} = \\frac{e^2}{3m_e c^2}\\langle 1/r \\rangle\\).',
                    hint: 'For a spherically symmetric density, there is only one electron-nucleus distance to average over. The Lamb formula involves \\(\\langle \\sum_i 1/r_{iK} \\rangle\\).',
                    solution: 'For a one-electron atom, \\(\\sigma_{\\text{dia}} = \\frac{e^2}{3m_e c^2}\\langle 1/r \\rangle\\). For hydrogen, \\(\\langle 1/r \\rangle_{1s} = 1/a_0\\), so \\(\\sigma_{\\text{dia}} = e^2/(3m_e c^2 a_0) = \\alpha^2/3 \\approx 17.8\\) ppm (where \\(\\alpha = 1/137\\) is the fine-structure constant). This accounts for nearly all of the hydrogen shielding since the paramagnetic term vanishes for 1s states by symmetry.'
                },
                {
                    question: 'Explain why GIAOs (London orbitals) solve the gauge-origin problem in magnetic property calculations.',
                    hint: 'The gauge transformation of the vector potential corresponds to multiplying the wavefunction by a phase factor. GIAOs incorporate this phase into each basis function.',
                    solution: 'Under a gauge transformation \\(\\mathbf{A} \\to \\mathbf{A} + \\nabla f\\), the exact wavefunction acquires a phase \\(\\exp(ief/\\hbar c)\\). GIAOs attach the correct field-dependent phase to each basis function centered at \\(\\mathbf{R}_\\mu\\). This means that the overlap integrals \\(\\langle \\chi_\\mu^{\\text{GIAO}}|\\chi_\\nu^{\\text{GIAO}}\\rangle\\) depend only on the difference \\(\\mathbf{R}_\\mu - \\mathbf{R}_\\nu\\), not on the gauge origin. As a result, even a finite basis set produces gauge-origin-independent results, leading to much faster basis set convergence for magnetic properties.'
                },
                {
                    question: 'The Fermi contact contribution to \\(J_{HH}\\) coupling in ethane is about 8 Hz. Qualitatively explain why \\(^1J_{CH}\\) couplings are much larger (typically 125 Hz for sp\\(^3\\) carbon).',
                    hint: 'The Fermi contact term depends on s-orbital electron density at the coupled nuclei.',
                    solution: 'The Fermi contact mechanism requires finite electron density at both nuclei (\\(\\delta(\\mathbf{r}_K)\\)). For \\(^1J_{CH}\\), the electrons in the C-H bond have significant s-character at both C and H, giving a large matrix element. For \\(^3J_{HH}\\) in ethane, the coupling is transmitted through three bonds, and the intervening C-C bond dilutes the spin polarization. Additionally, one-bond couplings benefit from the direct overlap of the bonding orbital with both nuclei, while multi-bond couplings rely on successive polarization of the electron spins, each step attenuating the effect. The s-character scales \\(^1J_{CH}\\): sp\\(^3\\) (25% s) gives ~125 Hz, sp\\(^2\\) (33%) gives ~160 Hz, sp (50%) gives ~250 Hz.'
                }
            ]
        },

        // ========== SECTION 4: Response Theory ==========
        {
            id: 'sec14-4-response-theory',
            title: 'Response Theory',
            content: `
<h2>14.4 Response Theory</h2>

<div class="env-block intuition"><div class="env-title">Intuition — From Static to Dynamic</div><div class="env-body">
So far we have considered static properties: the molecule's response to a time-independent perturbation. But many important properties (optical absorption, dynamic polarizability, optical rotation) involve time-dependent fields. Response theory provides a unified framework for all these frequency-dependent properties.
</div></div>

<h3>Time-Dependent Perturbation Theory</h3>

<p>Consider a system in its ground state \\(|0\\rangle\\) perturbed by an oscillating field \\(\\hat{V}(t) = \\hat{V}^\\omega e^{-i\\omega t} + \\hat{V}^{-\\omega} e^{i\\omega t}\\), switched on adiabatically. The first-order change in any observable \\(\\hat{A}\\) is:</p>

<div class="env-block definition"><div class="env-title">Definition 14.4.1 — Linear Response Function</div><div class="env-body">
The frequency-dependent linear response of observable \\(\\hat{A}\\) to perturbation \\(\\hat{V}\\) is given by the response function (or polarization propagator):
\\[
\\langle\\langle \\hat{A}; \\hat{V} \\rangle\\rangle_\\omega = \\sum_{n \\neq 0} \\left[ \\frac{\\langle 0 | \\hat{A} | n \\rangle \\langle n | \\hat{V} | 0 \\rangle}{\\omega_{n0} - \\omega} + \\frac{\\langle 0 | \\hat{V} | n \\rangle \\langle n | \\hat{A} | 0 \\rangle}{\\omega_{n0} + \\omega} \\right],
\\]
where \\(\\omega_{n0} = E_n - E_0\\).
</div></div>

<div class="env-block theorem"><div class="env-title">Theorem 14.4.2 — Dynamic Polarizability</div><div class="env-body">
The frequency-dependent polarizability is the linear response of the dipole moment to a dipole perturbation:
\\[
\\alpha_{\\alpha\\beta}(\\omega) = -\\langle\\langle \\hat{\\mu}_\\alpha; \\hat{\\mu}_\\beta \\rangle\\rangle_\\omega = \\sum_{n \\neq 0} \\left[ \\frac{\\langle 0 | \\hat{\\mu}_\\alpha | n \\rangle \\langle n | \\hat{\\mu}_\\beta | 0 \\rangle}{\\omega_{n0} - \\omega} + \\frac{\\langle 0 | \\hat{\\mu}_\\beta | n \\rangle \\langle n | \\hat{\\mu}_\\alpha | 0 \\rangle}{\\omega_{n0} + \\omega} \\right].
\\]
At \\(\\omega = 0\\), this reduces to the static polarizability (Theorem 14.2.5).
</div></div>

<div class="env-block proof"><div class="env-title">Proof</div><div class="env-body">
The perturbation is \\(\\hat{V} = -\\hat{\\boldsymbol{\\mu}} \\cdot \\boldsymbol{\\mathcal{E}}(t)\\) with \\(\\boldsymbol{\\mathcal{E}}(t) = \\boldsymbol{\\mathcal{E}}_0 \\cos(\\omega t)\\). The induced dipole moment \\(\\Delta\\mu_\\alpha(\\omega) = \\sum_\\beta \\alpha_{\\alpha\\beta}(\\omega) \\mathcal{E}_{0\\beta}\\). Using the definition of the linear response function with \\(\\hat{A} = \\hat{\\mu}_\\alpha\\) and \\(\\hat{V} = -\\hat{\\mu}_\\beta \\mathcal{E}_{0\\beta}\\), we identify \\(\\alpha_{\\alpha\\beta}(\\omega) = -\\langle\\langle \\hat{\\mu}_\\alpha; \\hat{\\mu}_\\beta \\rangle\\rangle_\\omega\\).
<div class="qed">∎</div>
</div></div>

<h3>Poles and Residues</h3>

<div class="env-block proposition"><div class="env-title">Proposition 14.4.3 — Poles of the Response Function</div><div class="env-body">
The linear response function \\(\\langle\\langle \\hat{A}; \\hat{V} \\rangle\\rangle_\\omega\\) has simple poles at \\(\\omega = \\pm \\omega_{n0}\\) for each excited state \\(|n\\rangle\\). The residues at these poles yield:
<ul>
<li>The <em>excitation energies</em> \\(\\omega_{n0}\\) from the pole positions,</li>
<li>The <em>transition moments</em> \\(\\langle 0 | \\hat{A} | n \\rangle\\) from the residues.</li>
</ul>
This means that the entire excited-state spectrum is encoded in the linear response function.
</div></div>

<h3>Coupled-Perturbed and Response Equations</h3>

<div class="env-block definition"><div class="env-title">Definition 14.4.4 — Coupled-Perturbed Hartree-Fock (CPHF) Equations</div><div class="env-body">
At the Hartree-Fock level, the frequency-dependent response is obtained by solving the CPHF (or random phase approximation, RPA) equations:
\\[
\\begin{pmatrix} \\mathbf{A} & \\mathbf{B} \\\\ \\mathbf{B}^* & \\mathbf{A}^* \\end{pmatrix} \\begin{pmatrix} \\mathbf{X} \\\\ \\mathbf{Y} \\end{pmatrix} = \\omega \\begin{pmatrix} \\mathbf{1} & \\mathbf{0} \\\\ \\mathbf{0} & -\\mathbf{1} \\end{pmatrix} \\begin{pmatrix} \\mathbf{X} \\\\ \\mathbf{Y} \\end{pmatrix},
\\]
where \\(A_{ia,jb} = \\delta_{ij}\\delta_{ab}(\\epsilon_a - \\epsilon_i) + (ia||jb)\\) and \\(B_{ia,jb} = (ia||bj)\\) involve two-electron integrals over occupied (\\(i,j\\)) and virtual (\\(a,b\\)) orbitals.
</div></div>

<div class="env-block remark"><div class="env-title">Remark — Connection to TD-DFT</div><div class="env-body">
When the HF exchange is replaced by an exchange-correlation kernel, the same matrix equations become the Casida equations of time-dependent density functional theory (TD-DFT). The eigenvalues give excitation energies and the eigenvectors give transition densities. The formal structure is identical; only the matrix elements differ.
</div></div>

<h3>Nonlinear Response</h3>

<div class="env-block definition"><div class="env-title">Definition 14.4.5 — Quadratic Response Function</div><div class="env-body">
The quadratic response function describes second-order effects and frequency mixing:
\\[
\\langle\\langle \\hat{A}; \\hat{V}, \\hat{W} \\rangle\\rangle_{\\omega_1, \\omega_2} = \\sum_{n,m \\neq 0} \\left[ \\frac{\\langle 0|\\hat{A}|n\\rangle \\langle n|\\bar{V}|m\\rangle \\langle m|\\hat{W}|0\\rangle}{(\\omega_{n0} - \\omega_1 - \\omega_2)(\\omega_{m0} - \\omega_2)} + \\text{permutations} \\right],
\\]
where \\(\\bar{V}_{nm} = V_{nm} - \\delta_{nm}V_{00}\\). This gives the frequency-dependent first hyperpolarizability \\(\\beta(\\omega_1, \\omega_2)\\) relevant to nonlinear optics.
</div></div>

<div class="env-block example"><div class="env-title">Example 14.4.6 — Optical Rotation</div><div class="env-body">
The specific optical rotation of a chiral molecule is determined by the mixed electric-magnetic response:
\\[
\\beta'(\\omega) = -\\text{Im}\\,\\langle\\langle \\hat{\\mu}_\\alpha; \\hat{m}_\\alpha \\rangle\\rangle_\\omega,
\\]
where \\(\\hat{m}\\) is the magnetic dipole operator. The optical rotation angle is proportional to \\(\\omega \\cdot \\beta'(\\omega)\\). This is a purely quantum-mechanical property: it vanishes for achiral molecules and changes sign for enantiomers.
</div></div>
`,
            visualizations: [],
            exercises: [
                {
                    question: 'Show that the dynamic polarizability \\(\\alpha(\\omega)\\) reduces to the static polarizability \\(\\alpha(0)\\) in the limit \\(\\omega \\to 0\\).',
                    hint: 'Set \\(\\omega = 0\\) in the SOS expression for \\(\\alpha(\\omega)\\) and combine the two terms.',
                    solution: 'At \\(\\omega = 0\\): \\(\\alpha_{\\alpha\\beta}(0) = \\sum_{n \\neq 0}\\left[\\frac{\\langle 0|\\hat{\\mu}_\\alpha|n\\rangle\\langle n|\\hat{\\mu}_\\beta|0\\rangle}{\\omega_{n0}} + \\frac{\\langle 0|\\hat{\\mu}_\\beta|n\\rangle\\langle n|\\hat{\\mu}_\\alpha|0\\rangle}{\\omega_{n0}}\\right] = 2\\sum_{n \\neq 0}\\frac{\\langle 0|\\hat{\\mu}_\\alpha|n\\rangle\\langle n|\\hat{\\mu}_\\beta|0\\rangle}{\\omega_{n0}}\\), which matches the static SOS expression (Theorem 14.2.5).'
                },
                {
                    question: 'Explain physically why \\(\\alpha(\\omega)\\) diverges as \\(\\omega \\to \\omega_{n0}\\) for some excited state \\(|n\\rangle\\), and what this means experimentally.',
                    hint: 'What happens when the driving frequency matches a natural transition frequency?',
                    solution: 'When \\(\\omega = \\omega_{n0}\\), the denominator \\(\\omega_{n0} - \\omega \\to 0\\) and \\(\\alpha(\\omega) \\to \\infty\\). Physically, this is resonance: the oscillating field drives the transition \\(|0\\rangle \\to |n\\rangle\\) resonantly, leading to absorption. In reality, the divergence is regularized by the finite lifetime of the excited state (damping \\(\\Gamma\\)): \\(\\omega_{n0} - \\omega \\to \\omega_{n0} - \\omega - i\\Gamma/2\\). The imaginary part of \\(\\alpha(\\omega)\\) gives the absorption cross-section.'
                },
                {
                    question: 'In the CPHF/RPA equations, explain the physical meaning of the \\(\\mathbf{A}\\) and \\(\\mathbf{B}\\) matrices.',
                    hint: 'The \\(\\mathbf{A}\\) matrix describes single excitations from occupied to virtual orbitals. Think about what \\(\\mathbf{B}\\) mixes in.',
                    solution: 'The \\(\\mathbf{A}\\) matrix has diagonal elements \\(\\epsilon_a - \\epsilon_i\\) (orbital energy differences for single excitations \\(i \\to a\\)) plus two-electron corrections (Coulomb and exchange integrals). It describes the direct excitation \\(i \\to a\\) and its coupling to other excitations \\(j \\to b\\). The \\(\\mathbf{B}\\) matrix couples excitation amplitudes \\(\\mathbf{X}\\) (\\(i \\to a\\)) with de-excitation amplitudes \\(\\mathbf{Y}\\) (\\(a \\to i\\)). Setting \\(\\mathbf{B} = 0\\) gives the Tamm-Dancoff approximation (TDA), equivalent to CIS. Including \\(\\mathbf{B}\\) accounts for ground-state correlation effects on excitation energies.'
                },
                {
                    question: 'Show that the poles of the linear response function \\(\\langle\\langle \\hat{\\mu};\\hat{\\mu}\\rangle\\rangle_\\omega\\) are the excitation energies, and explain how this is used in TD-DFT.',
                    hint: 'The response function is a ratio with \\((\\omega_{n0} - \\omega)\\) in denominators. At a pole, the response diverges.',
                    solution: 'The dynamic polarizability has poles at \\(\\omega = \\omega_{n0}\\) for all optically allowed excited states. Near a pole, \\(\\alpha(\\omega) \\approx \\frac{|\\langle 0|\\hat{\\mu}|n\\rangle|^2}{\\omega_{n0} - \\omega}\\). In TD-DFT, instead of summing over unknown exact states, one solves the Casida eigenvalue equation \\(\\mathbf{\\Omega F} = \\omega^2 \\mathbf{F}\\) where \\(\\Omega_{ia,jb} = \\delta_{ij}\\delta_{ab}\\omega_{ia}^2 + 2\\sqrt{\\omega_{ia}}K_{ia,jb}\\sqrt{\\omega_{jb}}\\). The eigenvalues \\(\\omega^2\\) give excitation energies; the eigenvectors give transition dipole moments (oscillator strengths). This avoids the explicit sum over states.'
                },
                {
                    question: 'Explain why the Cauchy expansion \\(\\alpha(\\omega) = A + B\\omega^2 + C\\omega^4 + \\cdots\\) holds for frequencies below the first excitation energy.',
                    hint: 'Expand the denominators \\(1/(\\omega_{n0}^2 - \\omega^2)\\) as a geometric series for \\(\\omega < \\omega_{10}\\).',
                    solution: 'For real \\(\\omega < \\omega_{10}\\) (the lowest excitation), we can rewrite \\(\\alpha(\\omega) = \\sum_n \\frac{2\\omega_{n0}f_n}{\\omega_{n0}^2 - \\omega^2}\\) (using oscillator strengths \\(f_n\\)). Since \\(\\omega < \\omega_{n0}\\) for all \\(n\\), expand: \\(\\frac{1}{\\omega_{n0}^2 - \\omega^2} = \\frac{1}{\\omega_{n0}^2}\\sum_{k=0}^\\infty (\\omega/\\omega_{n0})^{2k}\\). This gives \\(\\alpha(\\omega) = \\sum_k S_{-2(k+1)} \\omega^{2k}\\) where \\(S_{-p} = \\sum_n f_n/\\omega_{n0}^{p-1}\\) are Cauchy moments. The series converges for \\(\\omega < \\omega_{10}\\) and is useful for extrapolation.'
                }
            ]
        },

        // ========== SECTION 5: Excited State Properties ==========
        {
            id: 'sec14-5-excited-states',
            title: 'Excited State Properties',
            content: `
<h2>14.5 Excited State Properties</h2>

<div class="env-block intuition"><div class="env-title">Intuition — What Excited States Tell Us</div><div class="env-body">
Excited states govern a molecule's interaction with light. The transition moment determines whether a state can be reached by photon absorption; the oscillator strength quantifies how strongly. These quantities directly connect quantum chemistry calculations to UV-Vis spectroscopy, photochemistry, and materials design for solar cells, LEDs, and sensors.
</div></div>

<h3>Transition Moments and Selection Rules</h3>

<div class="env-block definition"><div class="env-title">Definition 14.5.1 — Transition Dipole Moment</div><div class="env-body">
The electric dipole transition moment between states \\(|0\\rangle\\) and \\(|n\\rangle\\) is:
\\[
\\boldsymbol{\\mu}_{0n} = \\langle 0 | \\hat{\\boldsymbol{\\mu}} | n \\rangle = -\\langle 0 | \\sum_i \\mathbf{r}_i | n \\rangle.
\\]
It is a vector whose direction determines the polarization of the absorbed/emitted light.
</div></div>

<div class="env-block theorem"><div class="env-title">Theorem 14.5.2 — Selection Rules for Electric Dipole Transitions</div><div class="env-body">
A transition \\(|0\\rangle \\to |n\\rangle\\) is electric-dipole allowed if and only if \\(\\boldsymbol{\\mu}_{0n} \\neq 0\\). Necessary conditions include:
<ul>
<li><strong>Spin selection rule:</strong> \\(\\Delta S = 0\\) (the transition must conserve total spin).</li>
<li><strong>Symmetry selection rule:</strong> The direct product \\(\\Gamma(0) \\otimes \\Gamma(\\hat{\\mu}_\\alpha) \\otimes \\Gamma(n)\\) must contain the totally symmetric irreducible representation for at least one component \\(\\alpha\\).</li>
<li><strong>Laporte rule (for centrosymmetric molecules):</strong> \\(g \\leftrightarrow u\\) transitions are allowed; \\(g \\leftrightarrow g\\) and \\(u \\leftrightarrow u\\) are forbidden.</li>
</ul>
</div></div>

<h3>Oscillator Strength</h3>

<div class="env-block definition"><div class="env-title">Definition 14.5.3 — Oscillator Strength</div><div class="env-body">
The oscillator strength for the \\(0 \\to n\\) transition is the dimensionless quantity:
\\[
f_{0n} = \\frac{2}{3} \\omega_{n0} |\\boldsymbol{\\mu}_{0n}|^2,
\\]
in atomic units. It measures the "strength" of the transition relative to a classical oscillator. Allowed transitions typically have \\(f \\sim 0.1\\text{--}1\\); forbidden transitions have \\(f \\ll 0.01\\).
</div></div>

<div class="env-block theorem"><div class="env-title">Theorem 14.5.4 — Thomas-Reiche-Kuhn Sum Rule</div><div class="env-body">
For an \\(N\\)-electron system, the oscillator strengths satisfy:
\\[
\\sum_{n \\neq 0} f_{0n} = N.
\\]
This exact sum rule constrains the total absorption strength and provides a powerful check on computed spectra.
</div></div>

<div class="env-block proof"><div class="env-title">Proof</div><div class="env-body">
Using the commutator relation \\([\\hat{r}_\\alpha, \\hat{p}_\\alpha] = i\\) and inserting a complete set of states:
\\[
\\sum_n f_{0n} = \\frac{2}{3}\\sum_\\alpha \\sum_n \\omega_{n0} |\\langle 0|\\hat{r}_{\\alpha,\\text{tot}}|n\\rangle|^2 = \\frac{1}{3}\\sum_\\alpha \\langle 0|[\\hat{r}_{\\alpha,\\text{tot}}, \\hat{p}_{\\alpha,\\text{tot}}]|0\\rangle = \\frac{1}{3} \\cdot 3Ni = N,
\\]
where the factor of \\(i\\) cancels with the conventions used to define \\(f\\).
<div class="qed">∎</div>
</div></div>

<h3>Einstein Coefficients and Radiative Lifetimes</h3>

<div class="env-block definition"><div class="env-title">Definition 14.5.5 — Spontaneous Emission Rate</div><div class="env-body">
The Einstein \\(A\\) coefficient for spontaneous emission from state \\(|n\\rangle\\) to \\(|0\\rangle\\) is:
\\[
A_{n \\to 0} = \\frac{\\omega_{n0}^3}{3\\pi \\epsilon_0 \\hbar c^3} |\\boldsymbol{\\mu}_{0n}|^2 = \\frac{4\\alpha^3 \\omega_{n0}^3}{3} f_{0n}/\\omega_{n0} \\quad \\text{(in a.u.)}.
\\]
The radiative lifetime is \\(\\tau_n = 1/\\sum_{m < n} A_{n \\to m}\\).
</div></div>

<div class="env-block example"><div class="env-title">Example 14.5.6 — UV Absorption of Formaldehyde</div><div class="env-body">
Formaldehyde (H\\(_2\\)CO, \\(C_{2v}\\) symmetry) has two characteristic electronic transitions:
<ul>
<li>\\(n \\to \\pi^*\\) at ~280 nm: This is a \\(b_1 \\to b_1\\) (or \\(A_2\\)) transition. Since the ground state is \\(A_1\\), the product \\(A_1 \\otimes \\Gamma(\\hat{\\mu}) \\otimes A_2\\) requires \\(\\hat{\\mu}\\) to have \\(A_2\\) symmetry, but \\(\\hat{\\mu}_{x,y,z}\\) transform as \\(B_1, B_2, A_1\\). No component matches, so the transition is symmetry-forbidden (\\(f \\approx 10^{-4}\\)).</li>
<li>\\(\\pi \\to \\pi^*\\) at ~170 nm: This is an \\(A_1\\) transition, electric-dipole allowed with \\(f \\approx 0.3\\).</li>
</ul>
</div></div>

<h3>Computational Methods for Excited States</h3>

<div class="env-block remark"><div class="env-title">Remark — Hierarchy of Excited-State Methods</div><div class="env-body">
Common methods for computing excited-state properties, in order of increasing accuracy and cost:
<ul>
<li><strong>CIS:</strong> Configuration interaction with singles. Qualitative; systematically overestimates excitation energies.</li>
<li><strong>TD-DFT:</strong> Efficient and often accurate for valence excitations. Fails for charge-transfer and Rydberg states with standard functionals.</li>
<li><strong>EOM-CCSD:</strong> Equation-of-motion coupled cluster with singles and doubles. Reliable for most single excitations (~0.1-0.3 eV error).</li>
<li><strong>CASPT2/NEVPT2:</strong> Multireference perturbation theory. Required for states with multiconfigurational character (bond breaking, conical intersections).</li>
</ul>
</div></div>

<div class="env-block example"><div class="env-title">Example 14.5.7 — Fluorescence and Phosphorescence</div><div class="env-body">
After absorption \\(S_0 \\to S_n\\), a molecule typically relaxes to \\(S_1\\) (Kasha's rule). From \\(S_1\\):
<ul>
<li><strong>Fluorescence:</strong> \\(S_1 \\to S_0\\) emission. Spin-allowed, fast (\\(\\tau \\sim 1\\text{--}10\\) ns). The emitted photon has lower energy than absorbed (Stokes shift).</li>
<li><strong>Intersystem crossing:</strong> \\(S_1 \\rightsquigarrow T_1\\) via spin-orbit coupling. More efficient for heavy atoms.</li>
<li><strong>Phosphorescence:</strong> \\(T_1 \\to S_0\\) emission. Spin-forbidden, slow (\\(\\tau \\sim \\mu\\)s to s).</li>
</ul>
The oscillator strength of the \\(S_1 \\to S_0\\) transition determines the fluorescence rate; the spin-orbit matrix element \\(\\langle S_1|\\hat{H}_{SO}|T_1\\rangle\\) governs the ISC rate.
</div></div>
`,
            visualizations: [],
            exercises: [
                {
                    question: 'Verify the Thomas-Reiche-Kuhn sum rule for the hydrogen atom by showing that the oscillator strengths sum to 1 (one electron).',
                    hint: 'The sum rule states \\(\\sum_n f_{0n} = N\\). For hydrogen, \\(N = 1\\). The sum includes both discrete and continuum states.',
                    solution: 'For hydrogen, the discrete transitions \\(1s \\to np\\) have oscillator strengths \\(f_{1s,np} = \\frac{2^8 n^5 (n-1)^{2n-4}}{3(n+1)^{2n+4}}\\). Summing: \\(f_{1s,2p} = 0.4162\\), \\(f_{1s,3p} = 0.0791\\), \\(f_{1s,4p} = 0.0290\\), etc. The discrete sum converges to about 0.5647. The remaining 0.4353 comes from the continuum (ionization to \\(\\epsilon p\\) states). Together they sum to exactly 1, confirming the sum rule for \\(N = 1\\).'
                },
                {
                    question: 'A molecule has an absorption band at 250 nm with oscillator strength \\(f = 0.15\\). Calculate the transition dipole moment and the molar extinction coefficient.',
                    hint: 'Use \\(f = \\frac{2m_e \\omega}{3\\hbar}|\\mu_{0n}|^2\\) and the relation \\(f = 4.32 \\times 10^{-9} \\int \\epsilon(\\tilde{\\nu}) d\\tilde{\\nu}\\).',
                    solution: '\\(\\omega = 2\\pi c/\\lambda = 2\\pi(3 \\times 10^{10})/(250 \\times 10^{-7}) = 7.54 \\times 10^{15}\\) s\\(^{-1}\\). From \\(f = \\frac{2m_e\\omega}{3\\hbar e^2}|\\mu_{0n}|^2\\) (SI), \\(|\\mu_{0n}|^2 = \\frac{3\\hbar e^2 f}{2m_e \\omega} = \\frac{3(1.055 \\times 10^{-34})(1.6 \\times 10^{-19})^2(0.15)}{2(9.11 \\times 10^{-31})(7.54 \\times 10^{15})} = 8.85 \\times 10^{-60}\\) C\\(^2\\)m\\(^2\\), so \\(|\\mu_{0n}| = 0.94 \\times 10^{-30}\\) Cm \\(= 0.28\\) D. For the extinction coefficient: \\(f \\approx 4.32 \\times 10^{-9} \\epsilon_{\\max} \\Delta\\tilde{\\nu}\\). With a typical bandwidth \\(\\Delta\\tilde{\\nu} \\sim 4000\\) cm\\(^{-1}\\): \\(\\epsilon_{\\max} \\approx f/(4.32 \\times 10^{-9} \\times 4000) \\approx 8700\\) L mol\\(^{-1}\\) cm\\(^{-1}\\).'
                },
                {
                    question: 'Explain why the \\(n \\to \\pi^*\\) transition in formaldehyde is weaker than the \\(\\pi \\to \\pi^*\\) transition, from both symmetry and orbital overlap perspectives.',
                    hint: 'Consider the symmetry of the orbitals involved and the spatial overlap of the transition density.',
                    solution: 'Symmetry: The \\(n \\to \\pi^*\\) transition in \\(C_{2v}\\) formaldehyde takes \\(b_1(n) \\to b_1(\\pi^*)\\), giving transition symmetry \\(A_2\\). No dipole component transforms as \\(A_2\\), so the transition is symmetry-forbidden. Orbital overlap: The nonbonding \\(n\\) orbital (in-plane lone pair on O) is perpendicular to the \\(\\pi^*\\) orbital (out-of-plane). The transition density \\(\\rho_{0n}(\\mathbf{r}) = \\phi_n(\\mathbf{r})\\phi_{\\pi^*}(\\mathbf{r})\\) has a nodal plane and integrates to a very small dipole moment. The \\(\\pi \\to \\pi^*\\) transition has the same symmetry for both orbitals (\\(b_1\\)), is \\(A_1\\) allowed (\\(z\\)-polarized), and has large spatial overlap.'
                },
                {
                    question: 'Calculate the radiative lifetime of an excited state with excitation energy 3.0 eV and oscillator strength \\(f = 0.5\\).',
                    hint: 'Use \\(A = \\frac{\\omega^2 e^2}{3\\pi \\epsilon_0 m_e c^3} f\\) and \\(\\tau = 1/A\\). Convert eV to angular frequency.',
                    solution: '\\(\\omega = E/\\hbar = 3.0 \\times 1.602 \\times 10^{-19} / (1.055 \\times 10^{-34}) = 4.56 \\times 10^{15}\\) rad/s. \\(A = \\frac{e^2 \\omega^2}{3\\pi \\epsilon_0 m_e c^3}f = \\frac{(1.6 \\times 10^{-19})^2(4.56 \\times 10^{15})^2}{3\\pi(8.85 \\times 10^{-12})(9.11 \\times 10^{-31})(3 \\times 10^8)^3}(0.5) \\approx 3.7 \\times 10^8\\) s\\(^{-1}\\). So \\(\\tau = 1/A \\approx 2.7\\) ns. This is typical for a strongly allowed \\(\\pi \\to \\pi^*\\) fluorescence transition.'
                },
                {
                    question: 'Why does spin-orbit coupling enable phosphorescence? Estimate the order of magnitude of phosphorescence lifetimes compared to fluorescence.',
                    hint: 'Phosphorescence is \\(T_1 \\to S_0\\), which is spin-forbidden. Spin-orbit coupling mixes singlet character into the triplet state.',
                    solution: 'The \\(T_1 \\to S_0\\) transition is forbidden because \\(\\Delta S = 1\\). Spin-orbit coupling \\(\\hat{H}_{SO} \\propto \\sum_i \\xi(r_i)\\hat{\\mathbf{l}}_i \\cdot \\hat{\\mathbf{s}}_i\\) mixes a small amount of singlet character into \\(T_1\\): \\(|T_1^\\prime\\rangle \\approx |T_1\\rangle + \\sum_k \\frac{\\langle S_k|\\hat{H}_{SO}|T_1\\rangle}{E_{T_1}-E_{S_k}}|S_k\\rangle\\). The effective transition moment becomes \\(\\mu_{\\text{eff}} \\sim |\\mu_{0n}| \\times \\langle S|\\hat{H}_{SO}|T\\rangle/\\Delta E \\sim \\mu \\times 10^{-3}\\) for light atoms. Since \\(A \\propto |\\mu|^2\\), \\(A_{\\text{phos}} \\sim 10^{-6} A_{\\text{fluor}}\\), giving lifetimes \\(\\sim 10^6\\) times longer: ms to s range instead of ns.'
                }
            ]
        }
    ]
});
