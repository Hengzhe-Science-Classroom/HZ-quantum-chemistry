// === Chapter 11: DFT: Foundations ===
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch11',
    number: 11,
    title: 'DFT: Foundations',
    subtitle: 'From wavefunctions to electron density: the Hohenberg-Kohn revolution',
    sections: [
        // ========== SECTION 1: The Electron Density as Basic Variable ==========
        {
            id: 'sec11-1-electron-density',
            title: 'The Electron Density as Basic Variable',
            content: `
<h2>11.1 The Electron Density as Basic Variable</h2>

<div class="env-block intuition"><div class="env-title">Intuition — Why the Density?</div><div class="env-body">
The wavefunction of an \\(N\\)-electron system is a function of \\(3N\\) spatial coordinates (plus spin). For a 100-electron system, this means \\(10^{300}\\) coordinates on any reasonable grid, an object far beyond any conceivable computer. The electron density \\(\\rho(\\mathbf{r})\\), by contrast, is always a function of just 3 spatial variables, regardless of \\(N\\). If the density contains all the information needed to determine the ground-state energy and properties, we can bypass the wavefunction entirely.
</div></div>

<h3>Definition and Basic Properties</h3>

<div class="env-block definition"><div class="env-title">Definition 11.1.1 — Electron Density</div><div class="env-body">
For an \\(N\\)-electron system with wavefunction \\(\\Psi(\\mathbf{x}_1, \\mathbf{x}_2, \\ldots, \\mathbf{x}_N)\\) (where \\(\\mathbf{x}_i = (\\mathbf{r}_i, \\sigma_i)\\) includes spatial and spin coordinates), the electron density is
\\[
\\rho(\\mathbf{r}) = N \\sum_{\\sigma_1} \\int |\\Psi(\\mathbf{r}\\sigma_1, \\mathbf{x}_2, \\ldots, \\mathbf{x}_N)|^2 \\, d\\mathbf{x}_2 \\cdots d\\mathbf{x}_N.
\\]
It gives the probability per unit volume of finding <em>any</em> electron at position \\(\\mathbf{r}\\), regardless of the positions of the other electrons or the spin.
</div></div>

<div class="env-block proposition"><div class="env-title">Proposition 11.1.2 — Properties of the Density</div><div class="env-body">
The electron density satisfies:
<ol>
<li>\\(\\rho(\\mathbf{r}) \\geq 0\\) everywhere.</li>
<li>\\(\\int \\rho(\\mathbf{r})\\, d\\mathbf{r} = N\\) (integrates to the total number of electrons).</li>
<li>\\(\\rho(\\mathbf{r}) \\to 0\\) as \\(|\\mathbf{r}| \\to \\infty\\).</li>
<li>At a nuclear position \\(\\mathbf{R}_A\\) with charge \\(Z_A\\), \\(\\rho\\) satisfies the cusp condition:
\\[
\\left.\\frac{d\\bar{\\rho}}{dr}\\right|_{r=0} = -2Z_A \\bar{\\rho}(0),
\\]
where \\(\\bar{\\rho}\\) is the spherical average of \\(\\rho\\) around \\(\\mathbf{R}_A\\).</li>
</ol>
</div></div>

<div class="viz-placeholder" data-viz="viz-density-vs-wfn"></div>

<h3>Information Content of the Density</h3>

<p>The density is an observable: it can be measured experimentally by X-ray diffraction. Remarkably, it also encodes more information than one might expect:</p>

<div class="env-block proposition"><div class="env-title">Proposition 11.1.3 — What the Density Determines</div><div class="env-body">
From the electron density \\(\\rho(\\mathbf{r})\\) alone, one can determine:
<ul>
<li>The number of electrons: \\(N = \\int \\rho\\, d\\mathbf{r}\\).</li>
<li>The positions and charges of the nuclei: from the cusps in \\(\\rho\\) (Kato's theorem).</li>
<li>Hence the external potential \\(v(\\mathbf{r}) = -\\sum_A Z_A / |\\mathbf{r} - \\mathbf{R}_A|\\) is determined.</li>
<li>With \\(N\\) and \\(v(\\mathbf{r})\\) known, the Hamiltonian is fully specified, and all properties follow (at least in principle).</li>
</ul>
</div></div>

<h3>N-Representability</h3>

<div class="env-block definition"><div class="env-title">Definition 11.1.4 — N-Representability</div><div class="env-body">
A non-negative function \\(\\rho(\\mathbf{r})\\) is said to be <em>N-representable</em> if there exists an \\(N\\)-electron antisymmetric wavefunction \\(\\Psi\\) that yields \\(\\rho\\) as its density. The necessary and sufficient conditions (Gilbert, 1975; Harriman, 1981) are:
<ol>
<li>\\(\\rho(\\mathbf{r}) \\geq 0\\).</li>
<li>\\(\\int \\rho(\\mathbf{r})\\, d\\mathbf{r} = N\\).</li>
<li>\\(\\sqrt{\\rho} \\in H^1(\\mathbb{R}^3)\\), i.e., \\(\\int |\\nabla\\sqrt{\\rho}|^2\\, d\\mathbf{r} < \\infty\\).</li>
</ol>
These conditions are surprisingly mild; essentially any "reasonable" non-negative function integrating to \\(N\\) with finite kinetic energy is N-representable.
</div></div>

<div class="env-block remark"><div class="env-title">Remark</div><div class="env-body">
N-representability should not be confused with <em>v-representability</em> (whether \\(\\rho\\) is the ground-state density of some external potential \\(v\\)). V-representability is a more restrictive condition and is central to the Hohenberg-Kohn theorems discussed in the next section.
</div></div>

<div class="env-block example"><div class="env-title">Example 11.1.5 — Hydrogen Atom Density</div><div class="env-body">
The ground-state density of hydrogen is
\\[
\\rho(r) = \\frac{1}{\\pi a_0^3} e^{-2r/a_0},
\\]
where \\(a_0\\) is the Bohr radius. This satisfies \\(\\int \\rho\\, d\\mathbf{r} = 1\\), and the cusp condition gives \\(d\\bar{\\rho}/dr|_{r=0} = -2(1)\\rho(0) = -2/\\pi a_0^3\\), consistent with \\(Z = 1\\).
</div></div>
`,
            visualizations: [
                {
                    id: 'viz-density-vs-wfn',
                    title: 'Density vs Wavefunction: Dimensionality',
                    description: 'The wavefunction lives in \\(3N\\)-dimensional space; the density lives in 3D. This visualization shows how the number of variables explodes for the wavefunction while the density stays compact.',
                    setup(body, controls) {
                        const viz = new VizEngine(body, { scale: 30, originX: 0, originY: 0 });
                        const ctx = viz.ctx;
                        const w = viz.width, h = viz.height;

                        let nElectrons = 10;
                        VizEngine.createSlider(controls, 'N electrons', 1, 100, nElectrons, 1, v => {
                            nElectrons = Math.round(v);
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            const N = nElectrons;
                            const wfnDim = 3 * N;
                            const denDim = 3;

                            const cx = w / 2, barW = 100;
                            const topY = 50, botY = h - 40;
                            const barH = botY - topY;

                            // Log scale for wavefunction dimensions
                            const maxLog = Math.log10(300);
                            const wfnLog = Math.log10(Math.max(wfnDim, 1));
                            const denLog = Math.log10(denDim);

                            const wfnH = Math.min((wfnLog / maxLog) * barH, barH);
                            const denH = (denLog / maxLog) * barH;

                            // Wavefunction bar
                            const wfnX = cx - 120;
                            ctx.fillStyle = viz.colors.red + '88';
                            ctx.fillRect(wfnX - barW / 2, botY - wfnH, barW, wfnH);
                            ctx.strokeStyle = viz.colors.red;
                            ctx.lineWidth = 2;
                            ctx.strokeRect(wfnX - barW / 2, botY - wfnH, barW, wfnH);

                            // Density bar
                            const denX = cx + 120;
                            ctx.fillStyle = viz.colors.green + '88';
                            ctx.fillRect(denX - barW / 2, botY - denH, barW, denH);
                            ctx.strokeStyle = viz.colors.green;
                            ctx.lineWidth = 2;
                            ctx.strokeRect(denX - barW / 2, botY - denH, barW, denH);

                            // Labels
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'bottom';
                            ctx.fillText('\u03A8(\u2026)', wfnX, botY - wfnH - 8);
                            ctx.fillText('\u03C1(r)', denX, botY - denH - 8);

                            // Dimension numbers
                            ctx.font = 'bold 16px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.red;
                            ctx.textBaseline = 'top';
                            ctx.fillText(wfnDim + ' variables', wfnX, botY + 6);
                            ctx.fillStyle = viz.colors.green;
                            ctx.fillText(denDim + ' variables', denX, botY + 6);

                            // Title
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textBaseline = 'top';
                            ctx.fillText('N = ' + N + ' electrons', cx, 10);

                            // Grid points comparison
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.text;
                            ctx.textBaseline = 'middle';
                            const gridPts = 10;
                            const wfnGrid = Math.pow(gridPts, wfnDim);
                            const denGrid = Math.pow(gridPts, denDim);
                            const wfnStr = wfnDim <= 30 ? '10^' + wfnDim : '10^' + wfnDim;
                            ctx.textAlign = 'center';
                            ctx.fillText('Grid points (10 per dim):', cx, topY + 10);
                            ctx.fillStyle = viz.colors.red;
                            ctx.fillText('\u03A8: ' + wfnStr + ' points', cx - 100, topY + 28);
                            ctx.fillStyle = viz.colors.green;
                            ctx.fillText('\u03C1: 10\u00b3 = 1000 points', cx + 100, topY + 28);

                            // Arrow showing the dramatic difference
                            if (N > 1) {
                                ctx.fillStyle = viz.colors.yellow;
                                ctx.font = '12px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                const ratio = wfnDim / denDim;
                                ctx.fillText('Ratio: ' + ratio + '\u00d7 more dimensions', cx, h / 2 + 20);
                                ctx.fillText('for the wavefunction', cx, h / 2 + 36);
                            }
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Verify that the hydrogen atom density \\(\\rho(r) = \\frac{1}{\\pi a_0^3}e^{-2r/a_0}\\) integrates to 1.',
                    hint: 'Use spherical coordinates: \\(\\int \\rho\\, d\\mathbf{r} = \\int_0^\\infty \\rho(r) 4\\pi r^2\\, dr\\).',
                    solution: '\\(\\int \\rho\\, d\\mathbf{r} = \\frac{4\\pi}{\\pi a_0^3} \\int_0^\\infty r^2 e^{-2r/a_0}\\, dr = \\frac{4}{a_0^3} \\cdot \\frac{2}{(2/a_0)^3} = \\frac{4}{a_0^3} \\cdot \\frac{2a_0^3}{8} = \\frac{4}{a_0^3} \\cdot \\frac{a_0^3}{4} = 1\\). We used \\(\\int_0^\\infty r^2 e^{-\\alpha r}\\, dr = 2/\\alpha^3\\).'
                },
                {
                    question: 'Show that the cusp condition \\(d\\bar{\\rho}/dr|_{r=0} = -2Z\\bar{\\rho}(0)\\) is satisfied by the hydrogen atom density.',
                    hint: 'For hydrogen, the density is already spherically symmetric, so \\(\\bar{\\rho} = \\rho\\).',
                    solution: '\\(\\rho(r) = \\frac{1}{\\pi a_0^3}e^{-2r/a_0}\\). Differentiating: \\(\\frac{d\\rho}{dr} = \\frac{1}{\\pi a_0^3}(-2/a_0)e^{-2r/a_0}\\). At \\(r = 0\\): \\(\\frac{d\\rho}{dr}|_{r=0} = -\\frac{2}{\\pi a_0^4}\\). And \\(-2Z\\rho(0) = -2(1)\\frac{1}{\\pi a_0^3}\\). In atomic units (\\(a_0 = 1\\)): \\(d\\rho/dr|_0 = -2/\\pi\\) and \\(-2\\rho(0) = -2/\\pi\\). They agree.'
                },
                {
                    question: 'For a two-electron system (e.g., He), write \\(\\rho(\\mathbf{r})\\) in terms of the spatial wavefunction \\(\\psi(\\mathbf{r}_1, \\mathbf{r}_2)\\) assuming a singlet state.',
                    hint: 'For a singlet, the spatial part is symmetric: \\(\\Psi = \\psi(\\mathbf{r}_1,\\mathbf{r}_2)[\\alpha(1)\\beta(2) - \\beta(1)\\alpha(2)]/\\sqrt{2}\\). Sum over spins.',
                    solution: 'For a singlet state, after summing over spins: \\(\\rho(\\mathbf{r}) = 2\\int|\\psi(\\mathbf{r}, \\mathbf{r}_2)|^2\\, d\\mathbf{r}_2\\). The factor 2 comes from the two electrons being in the same spatial orbital (with opposite spins). In the Hartree-Fock approximation for He, \\(\\psi(\\mathbf{r}_1,\\mathbf{r}_2) = \\phi(\\mathbf{r}_1)\\phi(\\mathbf{r}_2)\\), giving \\(\\rho(\\mathbf{r}) = 2|\\phi(\\mathbf{r})|^2\\).'
                },
                {
                    question: 'Explain why the condition \\(\\int|\\nabla\\sqrt{\\rho}|^2\\, d\\mathbf{r} < \\infty\\) is related to the finiteness of the kinetic energy.',
                    hint: 'Express the kinetic energy in terms of \\(\\rho\\) using the von Weizsacker functional: \\(T_W[\\rho] = \\frac{1}{8}\\int \\frac{|\\nabla\\rho|^2}{\\rho}\\, d\\mathbf{r}\\).',
                    solution: 'The von Weizsacker kinetic energy is \\(T_W = \\frac{1}{8}\\int\\frac{|\\nabla\\rho|^2}{\\rho}\\,d\\mathbf{r}\\). Writing \\(\\rho = (\\sqrt{\\rho})^2\\), we get \\(\\nabla\\rho = 2\\sqrt{\\rho}\\nabla\\sqrt{\\rho}\\), so \\(|\\nabla\\rho|^2/\\rho = 4|\\nabla\\sqrt{\\rho}|^2\\). Hence \\(T_W = \\frac{1}{2}\\int|\\nabla\\sqrt{\\rho}|^2\\,d\\mathbf{r}\\). This is exactly a lower bound to the true kinetic energy (the Hoffmann-Ostenhof inequality). So \\(\\int|\\nabla\\sqrt{\\rho}|^2 < \\infty\\) ensures finite kinetic energy, which is necessary for any physical wavefunction.'
                },
                {
                    question: 'How many grid points would be needed to represent the wavefunction of a 20-electron system on a grid with 10 points per coordinate, versus the density?',
                    hint: 'The wavefunction has \\(3N = 60\\) dimensions; the density has 3.',
                    solution: 'Wavefunction: \\(10^{60}\\) grid points. Density: \\(10^3 = 1000\\) grid points. The ratio is \\(10^{57}\\), which is far more than the number of atoms in the observable universe (\\(\\sim 10^{80}\\), but storage of \\(10^{60}\\) numbers at 8 bytes each would require \\(\\sim 10^{49}\\) TB). This illustrates why direct wavefunction methods are fundamentally limited for large \\(N\\), and why reformulating quantum mechanics in terms of the density is so attractive.'
                }
            ]
        },

        // ========== SECTION 2: The Hohenberg-Kohn Theorems ==========
        {
            id: 'sec11-2-hohenberg-kohn',
            title: 'The Hohenberg-Kohn Theorems',
            content: `
<h2>11.2 The Hohenberg-Kohn Theorems</h2>

<p>In 1964, Pierre Hohenberg and Walter Kohn proved two remarkable theorems that placed density functional theory on rigorous mathematical footing. These theorems establish that the ground-state electron density uniquely determines the external potential (up to a constant) and that there exists a variational principle for the energy as a functional of the density.</p>

<h3>The First Hohenberg-Kohn Theorem</h3>

<div class="env-block theorem"><div class="env-title">Theorem 11.2.1 — Hohenberg-Kohn I (Existence Theorem)</div><div class="env-body">
The external potential \\(v(\\mathbf{r})\\) is determined, to within an additive constant, by the ground-state electron density \\(\\rho_0(\\mathbf{r})\\). Consequently, the ground-state density determines the Hamiltonian and hence all properties of the system.
</div></div>

<div class="env-block proof"><div class="env-title">Proof (by contradiction, Hohenberg-Kohn 1964)</div><div class="env-body">
Assume two different external potentials \\(v_1(\\mathbf{r})\\) and \\(v_2(\\mathbf{r})\\) (differing by more than a constant) give rise to the same ground-state density \\(\\rho_0(\\mathbf{r})\\). Let \\(\\hat{H}_1, \\hat{H}_2\\) be the corresponding Hamiltonians with ground states \\(\\Psi_1, \\Psi_2\\) and energies \\(E_1, E_2\\).

By the variational principle applied to \\(\\hat{H}_1\\) with trial wavefunction \\(\\Psi_2\\):
\\[
E_1 < \\langle\\Psi_2|\\hat{H}_1|\\Psi_2\\rangle = \\langle\\Psi_2|\\hat{H}_2|\\Psi_2\\rangle + \\langle\\Psi_2|\\hat{H}_1 - \\hat{H}_2|\\Psi_2\\rangle = E_2 + \\int [v_1(\\mathbf{r}) - v_2(\\mathbf{r})]\\rho_0(\\mathbf{r})\\, d\\mathbf{r}.
\\]
Similarly, using \\(\\Psi_1\\) as a trial for \\(\\hat{H}_2\\):
\\[
E_2 < E_1 + \\int [v_2(\\mathbf{r}) - v_1(\\mathbf{r})]\\rho_0(\\mathbf{r})\\, d\\mathbf{r}.
\\]
Adding these two inequalities:
\\[
E_1 + E_2 < E_2 + E_1,
\\]
a contradiction. Therefore, two different potentials cannot produce the same ground-state density.
<div class="qed">∎</div>
</div></div>

<div class="env-block remark"><div class="env-title">Remark — Assumptions and Limitations</div><div class="env-body">
The original proof assumes: (1) a non-degenerate ground state, and (2) the densities are v-representable (i.e., they arise as ground states of some potential). The non-degeneracy assumption was later relaxed by Levy (1979). The v-representability issue is more subtle; the constrained-search formulation of Levy avoids it entirely by working with N-representable densities instead.
</div></div>

<h3>The Hohenberg-Kohn Functional</h3>

<p>Since the density determines the Hamiltonian, the ground-state energy is a functional of the density:</p>
\\[
E[\\rho] = T[\\rho] + V_{ee}[\\rho] + \\int v(\\mathbf{r})\\rho(\\mathbf{r})\\, d\\mathbf{r}
\\]

<div class="env-block definition"><div class="env-title">Definition 11.2.2 — Hohenberg-Kohn Functional</div><div class="env-body">
The universal Hohenberg-Kohn functional is
\\[
F_{HK}[\\rho] = T[\\rho] + V_{ee}[\\rho] = \\langle\\Psi[\\rho]|\\hat{T} + \\hat{V}_{ee}|\\Psi[\\rho]\\rangle,
\\]
where \\(\\Psi[\\rho]\\) is the ground-state wavefunction corresponding to density \\(\\rho\\). This functional is <em>universal</em>: it does not depend on the external potential \\(v(\\mathbf{r})\\) and is the same for all electronic systems.
</div></div>

<h3>The Second Hohenberg-Kohn Theorem</h3>

<div class="env-block theorem"><div class="env-title">Theorem 11.2.3 — Hohenberg-Kohn II (Variational Principle)</div><div class="env-body">
For a trial density \\(\\tilde{\\rho}(\\mathbf{r})\\) such that \\(\\tilde{\\rho} \\geq 0\\) and \\(\\int \\tilde{\\rho}\\, d\\mathbf{r} = N\\), the energy functional satisfies
\\[
E_0 \\leq E[\\tilde{\\rho}] = F_{HK}[\\tilde{\\rho}] + \\int v(\\mathbf{r})\\tilde{\\rho}(\\mathbf{r})\\, d\\mathbf{r},
\\]
with equality if and only if \\(\\tilde{\\rho} = \\rho_0\\), the true ground-state density. The ground-state energy is obtained by minimizing \\(E[\\rho]\\) over all v-representable \\(N\\)-electron densities.
</div></div>

<div class="env-block proof"><div class="env-title">Proof</div><div class="env-body">
By Theorem 11.2.1, each v-representable density \\(\\tilde{\\rho}\\) determines a unique external potential \\(\\tilde{v}\\) and hence a unique ground-state wavefunction \\(\\tilde{\\Psi}\\). By the variational principle for wavefunctions:
\\[
E_0 = \\langle\\Psi_0|\\hat{H}|\\Psi_0\\rangle \\leq \\langle\\tilde{\\Psi}|\\hat{H}|\\tilde{\\Psi}\\rangle = F_{HK}[\\tilde{\\rho}] + \\int v(\\mathbf{r})\\tilde{\\rho}(\\mathbf{r})\\, d\\mathbf{r} = E[\\tilde{\\rho}].
\\]
<div class="qed">∎</div>
</div></div>

<h3>Levy's Constrained-Search Formulation</h3>

<div class="env-block definition"><div class="env-title">Definition 11.2.4 — Levy-Lieb Functional</div><div class="env-body">
The Levy constrained-search functional avoids the v-representability problem:
\\[
F_{LL}[\\rho] = \\min_{\\Psi \\to \\rho} \\langle\\Psi|\\hat{T} + \\hat{V}_{ee}|\\Psi\\rangle,
\\]
where the minimization is over all antisymmetric \\(N\\)-electron wavefunctions \\(\\Psi\\) that yield the density \\(\\rho\\). This is defined for all N-representable densities, a much larger class than v-representable densities.
</div></div>

<div class="env-block remark"><div class="env-title">Remark — The v-Representability Problem</div><div class="env-body">
Not every well-behaved density is the ground-state density of some local external potential \\(v(\\mathbf{r})\\). The set of v-representable densities is a proper subset of N-representable densities. The Levy formulation sidesteps this issue entirely: the energy minimization
\\[
E_0 = \\min_{\\rho \\to N} \\left\\{ F_{LL}[\\rho] + \\int v(\\mathbf{r})\\rho(\\mathbf{r})\\, d\\mathbf{r} \\right\\}
\\]
is taken over all N-representable densities, with the inner minimization (over wavefunctions) and outer minimization (over densities) both well-defined.
</div></div>

<div class="env-block warning"><div class="env-title">Warning</div><div class="env-body">
The HK theorems prove that a universal functional \\(F_{HK}[\\rho]\\) exists and has a variational minimum at the true density. They say nothing about the <em>form</em> of this functional. Finding accurate approximations to \\(F_{HK}\\), particularly its kinetic energy component \\(T[\\rho]\\), is the central challenge of DFT.
</div></div>
`,
            visualizations: [],
            exercises: [
                {
                    question: 'In the HK proof, why is the strict inequality \\(E_1 < \\langle\\Psi_2|\\hat{H}_1|\\Psi_2\\rangle\\) used rather than \\(\\leq\\)?',
                    hint: 'What does the variational principle say about the trial wavefunction being the exact ground state?',
                    solution: 'The strict inequality holds because we assumed \\(v_1 \\neq v_2 + \\text{const}\\), which implies \\(\\hat{H}_1 \\neq \\hat{H}_2 + \\text{const}\\). Therefore \\(\\Psi_2\\) cannot be the ground state of \\(\\hat{H}_1\\) (since different Hamiltonians, barring accidental degeneracy, have different ground states). The variational principle gives strict inequality when the trial function is not the exact ground state. If the ground state is degenerate, one must be more careful (Levy\'s generalization handles this).'
                },
                {
                    question: 'Show that if two potentials \\(v_1 = v_2 + C\\) (constant), they produce the same ground-state density.',
                    hint: 'How does adding a constant to \\(v\\) change the Hamiltonian and its eigenstates?',
                    solution: 'If \\(v_1 = v_2 + C\\), then \\(\\hat{H}_1 = \\hat{H}_2 + C \\cdot N\\) (since \\(\\int v_1 \\hat{\\rho}\\, d\\mathbf{r} = \\int v_2 \\hat{\\rho}\\, d\\mathbf{r} + CN\\)). The eigenstates are identical: \\(\\Psi_1 = \\Psi_2\\), with \\(E_1 = E_2 + CN\\). Since the wavefunctions are the same, the densities are the same: \\(\\rho_1 = \\rho_2\\). This is why HK I says the density determines \\(v\\) only up to an additive constant.'
                },
                {
                    question: 'Explain why \\(F_{HK}[\\rho]\\) is called a "universal" functional.',
                    hint: 'What parts of the Hamiltonian does it include, and what part is left out?',
                    solution: '\\(F_{HK}[\\rho] = T[\\rho] + V_{ee}[\\rho]\\) contains the kinetic energy and electron-electron repulsion. These operators (\\(\\hat{T} + \\hat{V}_{ee}\\)) are the same for all electronic systems, regardless of the number of nuclei, their positions, or their charges. The system-specific information is entirely in the external potential \\(v(\\mathbf{r})\\), which appears separately as \\(\\int v\\rho\\, d\\mathbf{r}\\). Hence \\(F_{HK}\\) applies universally to atoms, molecules, and solids alike.'
                },
                {
                    question: 'The constrained-search functional \\(F_{LL}[\\rho] = \\min_{\\Psi\\to\\rho}\\langle\\Psi|\\hat{T}+\\hat{V}_{ee}|\\Psi\\rangle\\) involves a minimization. Why is this minimization guaranteed to have a solution?',
                    hint: 'Consider the mathematical properties of the set of wavefunctions yielding a given density.',
                    solution: 'The set \\(\\{\\Psi : \\Psi \\to \\rho\\}\\) of all antisymmetric wavefunctions yielding density \\(\\rho\\) is a closed, convex subset of Hilbert space (when \\(\\rho\\) is N-representable). The functional \\(\\langle\\Psi|\\hat{T}+\\hat{V}_{ee}|\\Psi\\rangle\\) is bounded below (by zero for \\(\\hat{T}\\), and by the Lieb-Oxford bound for \\(\\hat{V}_{ee}\\)) and weakly lower semicontinuous. By standard results in functional analysis (the direct method of the calculus of variations), the infimum is attained. Lieb (1983) gave the rigorous proof using the ensemble formulation.'
                },
                {
                    question: 'Does the HK theorem apply to excited states? If not, what goes wrong?',
                    hint: 'The variational principle used in the proof is specific to the ground state.',
                    solution: 'The HK theorem does not directly apply to excited states. The proof relies on the variational principle \\(E_0 \\leq \\langle\\Psi|\\hat{H}|\\Psi\\rangle\\) for the ground state. For an excited state, there is no analogous strict variational bound with an arbitrary trial wavefunction. Moreover, different excited states can have the same density (violating the one-to-one mapping). Extensions to excited states exist (e.g., the Gross-Oliveira-Kohn theorems for ensembles, time-dependent DFT for excitation energies), but the straightforward HK mapping does not hold.'
                }
            ]
        },

        // ========== SECTION 3: The Kohn-Sham Approach ==========
        {
            id: 'sec11-3-kohn-sham',
            title: 'The Kohn-Sham Approach',
            content: `
<h2>11.3 The Kohn-Sham Approach</h2>

<p>The HK theorems guarantee that the exact ground-state energy can be obtained by minimizing an energy functional over densities. The challenge is that \\(F_{HK}[\\rho]\\) is unknown. In particular, computing the kinetic energy directly from the density (the Thomas-Fermi approach) gives errors of 10-20%. Kohn and Sham (1965) solved this problem with an ingenious trick: compute most of the kinetic energy exactly by introducing a <em>non-interacting reference system</em>.</p>

<h3>The Non-Interacting Reference System</h3>

<div class="env-block definition"><div class="env-title">Definition 11.3.1 — Kohn-Sham System</div><div class="env-body">
The Kohn-Sham (KS) system is a fictitious system of \\(N\\) non-interacting electrons moving in an effective local potential \\(v_s(\\mathbf{r})\\), chosen such that the ground-state density of the non-interacting system equals the exact ground-state density of the interacting system:
\\[
\\rho_s(\\mathbf{r}) = \\sum_{i=1}^{N} |\\phi_i(\\mathbf{r})|^2 = \\rho_0(\\mathbf{r}),
\\]
where \\(\\{\\phi_i\\}\\) are the KS orbitals, single-particle eigenstates of the KS Hamiltonian
\\[
\\hat{h}_s \\phi_i = \\left[-\\frac{1}{2}\\nabla^2 + v_s(\\mathbf{r})\\right]\\phi_i = \\varepsilon_i \\phi_i.
\\]
</div></div>

<div class="viz-placeholder" data-viz="viz-ks-scheme"></div>

<h3>Energy Decomposition</h3>

<p>The total energy functional is decomposed as:</p>
\\[
E[\\rho] = T_s[\\rho] + J[\\rho] + E_{xc}[\\rho] + \\int v(\\mathbf{r})\\rho(\\mathbf{r})\\, d\\mathbf{r},
\\]
<p>where each term is defined as follows:</p>

<div class="env-block definition"><div class="env-title">Definition 11.3.2 — Kohn-Sham Energy Components</div><div class="env-body">
<ul>
<li><strong>Non-interacting kinetic energy:</strong> \\(T_s[\\rho] = \\sum_{i=1}^N \\langle\\phi_i|-\\frac{1}{2}\\nabla^2|\\phi_i\\rangle = -\\frac{1}{2}\\sum_i \\int \\phi_i^*(\\mathbf{r})\\nabla^2\\phi_i(\\mathbf{r})\\, d\\mathbf{r}\\).</li>
<li><strong>Classical Coulomb (Hartree) energy:</strong> \\(J[\\rho] = \\frac{1}{2}\\iint \\frac{\\rho(\\mathbf{r})\\rho(\\mathbf{r}')}{|\\mathbf{r}-\\mathbf{r}'|}\\, d\\mathbf{r}\\, d\\mathbf{r}'\\).</li>
<li><strong>Exchange-correlation energy:</strong> \\(E_{xc}[\\rho] = (T[\\rho] - T_s[\\rho]) + (V_{ee}[\\rho] - J[\\rho])\\).</li>
</ul>
The exchange-correlation energy contains: (1) the kinetic correlation energy \\(T[\\rho] - T_s[\\rho]\\) (the difference between the true and non-interacting kinetic energies), and (2) all non-classical electron-electron interaction effects (exchange and correlation).
</div></div>

<div class="env-block remark"><div class="env-title">Remark — The Genius of the KS Approach</div><div class="env-body">
By computing \\(T_s\\) from orbitals (exactly), the KS approach captures \\(\\sim\\)99% of the kinetic energy without any approximation. The remaining kinetic correlation \\(T - T_s\\) (typically small) is absorbed into \\(E_{xc}\\), which also handles exchange and electron correlation. The only quantity that must be approximated is \\(E_{xc}[\\rho]\\), and since it represents a relatively small fraction of the total energy, even crude approximations can yield useful results.
</div></div>

<h3>The Kohn-Sham Equations</h3>

<p>Minimizing \\(E[\\rho]\\) with respect to the KS orbitals (subject to orthonormality constraints) yields the Kohn-Sham equations:</p>

<div class="env-block theorem"><div class="env-title">Theorem 11.3.3 — The Kohn-Sham Equations</div><div class="env-body">
The KS orbitals satisfy the self-consistent eigenvalue equations
\\[
\\left[-\\frac{1}{2}\\nabla^2 + v_{\\text{eff}}(\\mathbf{r})\\right]\\phi_i(\\mathbf{r}) = \\varepsilon_i \\phi_i(\\mathbf{r}),
\\]
where the effective (KS) potential is
\\[
v_{\\text{eff}}(\\mathbf{r}) = v(\\mathbf{r}) + \\int \\frac{\\rho(\\mathbf{r}')}{|\\mathbf{r}-\\mathbf{r}'|}\\, d\\mathbf{r}' + v_{xc}(\\mathbf{r}),
\\]
with the exchange-correlation potential defined as the functional derivative
\\[
v_{xc}(\\mathbf{r}) = \\frac{\\delta E_{xc}[\\rho]}{\\delta \\rho(\\mathbf{r})}.
\\]
</div></div>

<div class="env-block remark"><div class="env-title">Remark — Comparison with Hartree-Fock</div><div class="env-body">
The KS equations are structurally identical to the Hartree equations (not Hartree-Fock): each electron moves in a local effective potential. The key difference is that \\(v_{xc}\\) replaces the nonlocal HF exchange operator and also includes correlation effects. Unlike HF, where the exchange operator \\(\\hat{K}\\) is orbital-dependent and nonlocal, \\(v_{xc}\\) is a simple multiplicative (local) potential. This makes KS-DFT computationally simpler than HF for large systems.
</div></div>

<div class="env-block proposition"><div class="env-title">Proposition 11.3.4 — Self-Consistent Procedure</div><div class="env-body">
The KS equations must be solved self-consistently because \\(v_{\\text{eff}}\\) depends on the density, which depends on the orbitals:
<ol>
<li>Guess an initial density \\(\\rho^{(0)}\\).</li>
<li>Construct \\(v_{\\text{eff}}^{(n)}\\) from \\(\\rho^{(n)}\\).</li>
<li>Solve the KS equations to get new orbitals \\(\\{\\phi_i^{(n+1)}\\}\\).</li>
<li>Compute \\(\\rho^{(n+1)} = \\sum_i |\\phi_i^{(n+1)}|^2\\).</li>
<li>If \\(\\|\\rho^{(n+1)} - \\rho^{(n)}\\| < \\text{threshold}\\), converged. Otherwise, mix densities and go to step 2.</li>
</ol>
This is entirely analogous to the HF SCF procedure, with the same convergence acceleration techniques (DIIS, level shifting, damping).
</div></div>

<div class="env-block example"><div class="env-title">Example 11.3.5 — KS vs Thomas-Fermi for Atoms</div><div class="env-body">
The Thomas-Fermi model approximates the kinetic energy as \\(T_{TF}[\\rho] = C_F \\int \\rho^{5/3}\\, d\\mathbf{r}\\) with \\(C_F = \\frac{3}{10}(3\\pi^2)^{2/3}\\). This is a functional of the density alone (no orbitals). However, it fails qualitatively: it predicts no shell structure, no binding of molecules, and errors of 10-20% in atomic total energies. The KS approach, by computing \\(T_s\\) exactly from orbitals, recovers shell structure and gives total energies accurate to \\(<\\)1% even with the simplest \\(E_{xc}\\) approximations (LDA).
</div></div>
`,
            visualizations: [
                {
                    id: 'viz-ks-scheme',
                    title: 'The Kohn-Sham Mapping',
                    description: 'The interacting many-electron system (left) is mapped to a non-interacting system (right) with the same ground-state density. The effective KS potential \\(v_s\\) replaces the electron-electron interaction.',
                    setup(body, controls) {
                        const viz = new VizEngine(body, { scale: 30, originX: 0, originY: 0 });
                        const ctx = viz.ctx;
                        const w = viz.width, h = viz.height;

                        function drawBox(x, y, bw, bh, color, label, sublabel) {
                            ctx.strokeStyle = color;
                            ctx.lineWidth = 2;
                            ctx.fillStyle = color + '18';
                            ctx.beginPath();
                            ctx.roundRect(x - bw / 2, y - bh / 2, bw, bh, 8);
                            ctx.fill();
                            ctx.stroke();
                            ctx.fillStyle = color;
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            ctx.fillText(label, x, y - 10);
                            if (sublabel) {
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.fillStyle = viz.colors.text;
                                ctx.fillText(sublabel, x, y + 10);
                            }
                        }

                        function drawArrow(x1, y1, x2, y2, color, label) {
                            ctx.strokeStyle = color;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(x1, y1);
                            ctx.lineTo(x2, y2);
                            ctx.stroke();
                            const angle = Math.atan2(y2 - y1, x2 - x1);
                            ctx.fillStyle = color;
                            ctx.beginPath();
                            ctx.moveTo(x2, y2);
                            ctx.lineTo(x2 - 10 * Math.cos(angle - 0.3), y2 - 10 * Math.sin(angle - 0.3));
                            ctx.lineTo(x2 - 10 * Math.cos(angle + 0.3), y2 - 10 * Math.sin(angle + 0.3));
                            ctx.closePath();
                            ctx.fill();
                            if (label) {
                                ctx.fillStyle = color;
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'bottom';
                                ctx.fillText(label, (x1 + x2) / 2, Math.min(y1, y2) - 6);
                            }
                        }

                        function draw() {
                            viz.clear();

                            const leftX = w * 0.22, rightX = w * 0.78;
                            const topY = 60;

                            // Title
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('The Kohn-Sham Scheme', w / 2, 22);

                            // Left: Interacting system
                            drawBox(leftX, topY, 180, 50, viz.colors.red, 'Interacting System', 'H = T + V_ee + V_ext');

                            // Right: Non-interacting system
                            drawBox(rightX, topY, 180, 50, viz.colors.blue, 'Non-Interacting System', 'h_s = -\u00BD\u2207\u00b2 + v_s(r)');

                            // Double arrow between them
                            drawArrow(leftX + 100, topY, rightX - 100, topY, viz.colors.yellow, 'same \u03C1\u2080(r)');
                            drawArrow(rightX - 100, topY + 8, leftX + 100, topY + 8, viz.colors.yellow);

                            // Middle: density
                            const midY = topY + 80;
                            drawBox(w / 2, midY, 200, 44, viz.colors.green, '\u03C1(r) = \u03A3|\u03C6\u1d62(r)|\u00b2', 'Same density for both systems');

                            drawArrow(leftX, topY + 30, w / 2 - 40, midY - 22, viz.colors.red + '88');
                            drawArrow(rightX, topY + 30, w / 2 + 40, midY - 22, viz.colors.blue + '88');

                            // Energy decomposition
                            const ey = midY + 70;
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Energy Decomposition', w / 2, ey - 10);

                            const components = [
                                { name: 'T_s[\u03C1]', desc: 'KS kinetic', color: viz.colors.blue, frac: 0.60 },
                                { name: 'J[\u03C1]', desc: 'Hartree', color: viz.colors.orange, frac: 0.25 },
                                { name: '\u222Bv\u03C1', desc: 'External', color: viz.colors.teal, frac: 0.10 },
                                { name: 'E_xc[\u03C1]', desc: 'XC (unknown!)', color: viz.colors.red, frac: 0.05 }
                            ];

                            const barY = ey + 10;
                            const barW = w - 100;
                            const barH = 30;
                            let cx = 50;

                            for (const comp of components) {
                                const cw = comp.frac * barW;
                                ctx.fillStyle = comp.color + '66';
                                ctx.fillRect(cx, barY, cw, barH);
                                ctx.strokeStyle = comp.color;
                                ctx.lineWidth = 1.5;
                                ctx.strokeRect(cx, barY, cw, barH);

                                ctx.fillStyle = comp.color;
                                ctx.font = 'bold 11px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                if (cw > 40) {
                                    ctx.fillText(comp.name, cx + cw / 2, barY + barH / 2 - 2);
                                    ctx.font = '9px -apple-system,sans-serif';
                                    ctx.fillStyle = viz.colors.text;
                                    ctx.fillText(comp.desc, cx + cw / 2, barY + barH / 2 + 10);
                                }
                                cx += cw;
                            }

                            // Label the small E_xc
                            ctx.strokeStyle = viz.colors.red;
                            ctx.lineWidth = 1;
                            const xcX = 50 + 0.95 * barW + 0.025 * barW;
                            ctx.beginPath();
                            ctx.moveTo(xcX, barY + barH);
                            ctx.lineTo(xcX, barY + barH + 30);
                            ctx.stroke();
                            ctx.fillStyle = viz.colors.red;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('E_xc: small but crucial!', xcX, barY + barH + 42);
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.fillText('Contains exchange + correlation + kinetic correction', xcX - 30, barY + barH + 56);

                            // SCF loop illustration
                            const loopY = barY + barH + 85;
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Self-Consistent Loop', w / 2, loopY - 8);

                            const steps = [
                                { label: '\u03C1(r)', color: viz.colors.green },
                                { label: 'v_eff(r)', color: viz.colors.orange },
                                { label: 'KS eqns', color: viz.colors.blue },
                                { label: '{\u03C6\u1d62}', color: viz.colors.purple },
                            ];
                            const stepW = 90, gap = 30;
                            const totalW = steps.length * stepW + (steps.length - 1) * gap;
                            let sx = (w - totalW) / 2;

                            for (let i = 0; i < steps.length; i++) {
                                const s = steps[i];
                                ctx.fillStyle = s.color + '22';
                                ctx.strokeStyle = s.color;
                                ctx.lineWidth = 1.5;
                                ctx.beginPath();
                                ctx.roundRect(sx, loopY + 5, stepW, 30, 6);
                                ctx.fill();
                                ctx.stroke();
                                ctx.fillStyle = s.color;
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText(s.label, sx + stepW / 2, loopY + 22);

                                if (i < steps.length - 1) {
                                    drawArrow(sx + stepW + 4, loopY + 20, sx + stepW + gap - 4, loopY + 20, viz.colors.text);
                                }
                                sx += stepW + gap;
                            }

                            // Loop back arrow
                            const loopBackY = loopY + 42;
                            const startX = (w + totalW) / 2 - stepW / 2;
                            const endX = (w - totalW) / 2 + stepW / 2;
                            ctx.strokeStyle = viz.colors.yellow;
                            ctx.lineWidth = 1.5;
                            ctx.setLineDash([4, 3]);
                            ctx.beginPath();
                            ctx.moveTo(startX, loopY + 35);
                            ctx.lineTo(startX, loopBackY + 8);
                            ctx.lineTo(endX, loopBackY + 8);
                            ctx.lineTo(endX, loopY + 35);
                            ctx.stroke();
                            ctx.setLineDash([]);
                            // arrowhead
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.beginPath();
                            ctx.moveTo(endX, loopY + 35);
                            ctx.lineTo(endX - 4, loopY + 42);
                            ctx.lineTo(endX + 4, loopY + 42);
                            ctx.closePath();
                            ctx.fill();
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.textAlign = 'center';
                            ctx.fillText('iterate until converged', w / 2, loopBackY + 20);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show that the KS kinetic energy \\(T_s[\\rho]\\) is not a pure functional of the density; it depends on the orbitals.',
                    hint: 'Two different sets of orbitals can give the same density. Do they necessarily give the same \\(T_s\\)?',
                    solution: 'Consider two different orbital sets \\(\\{\\phi_i\\}\\) and \\(\\{\\phi_i\'\\}\\) with \\(\\sum_i|\\phi_i|^2 = \\sum_i|\\phi_i\'|^2 = \\rho\\). The kinetic energies \\(T_s = -\\frac{1}{2}\\sum_i\\langle\\phi_i|\\nabla^2|\\phi_i\\rangle\\) and \\(T_s\' = -\\frac{1}{2}\\sum_i\\langle\\phi_i\'|\\nabla^2|\\phi_i\'\\rangle\\) are in general different. \\(T_s\\) depends on the gradient structure of the individual orbitals, not just their summed squares. The Levy constrained-search selects the orbitals that minimize \\(T_s\\) for a given \\(\\rho\\), making \\(T_s\\) an implicit functional of \\(\\rho\\).'
                },
                {
                    question: 'The KS potential \\(v_s(\\mathbf{r})\\) is a local, multiplicative potential. Why is this a significant simplification compared to Hartree-Fock?',
                    hint: 'Compare the KS potential \\(v_s(\\mathbf{r})\\phi_i(\\mathbf{r})\\) with the HF exchange operator \\(\\hat{K}\\phi_i(\\mathbf{r}) = \\sum_j \\int \\frac{\\phi_j^*(\\mathbf{r}\')\\phi_i(\\mathbf{r}\')}{|\\mathbf{r}-\\mathbf{r}\'|}d\\mathbf{r}\' \\phi_j(\\mathbf{r})\\).',
                    solution: 'In HF, the exchange operator \\(\\hat{K}\\) is nonlocal: \\(\\hat{K}\\phi_i(\\mathbf{r}) = \\int K(\\mathbf{r},\\mathbf{r}\')\\phi_i(\\mathbf{r}\')d\\mathbf{r}\'\\), which depends on \\(\\phi_i\\) at all points \\(\\mathbf{r}\'\\). This requires \\(O(N^2)\\) storage for the exchange matrix and \\(O(N^4)\\) computation for exact exchange. In KS-DFT, \\(v_{xc}(\\mathbf{r})\\) is a simple function of position (local), so \\(v_{xc}\\phi_i\\) is just pointwise multiplication. This reduces the cost of constructing the effective potential from \\(O(N^4)\\) to \\(O(N)\\) (for LDA/GGA functionals), making KS-DFT scale as \\(O(N^3)\\) overall (matrix diagonalization is the bottleneck).'
                },
                {
                    question: 'Derive the Euler-Lagrange equation for minimizing \\(E[\\rho] = T_s[\\rho] + J[\\rho] + E_{xc}[\\rho] + \\int v\\rho\\, d\\mathbf{r}\\) subject to \\(\\int\\rho = N\\).',
                    hint: 'Introduce a Lagrange multiplier \\(\\mu\\) for the constraint and take the functional derivative \\(\\delta E/\\delta\\rho = \\mu\\).',
                    solution: 'The constrained minimization gives \\(\\frac{\\delta E}{\\delta\\rho(\\mathbf{r})} = \\mu\\), where \\(\\mu\\) is the chemical potential (Lagrange multiplier). Computing each functional derivative: \\(\\frac{\\delta T_s}{\\delta\\rho} = -\\frac{1}{2}\\frac{\\nabla^2\\sqrt{\\rho}}{\\sqrt{\\rho}}\\) (von Weizsacker form for single-orbital case), \\(\\frac{\\delta J}{\\delta\\rho} = \\int\\frac{\\rho(\\mathbf{r}\')}{|\\mathbf{r}-\\mathbf{r}\'|}d\\mathbf{r}\'\\), \\(\\frac{\\delta E_{xc}}{\\delta\\rho} = v_{xc}(\\mathbf{r})\\). So: \\(\\frac{\\delta T_s}{\\delta\\rho} + v(\\mathbf{r}) + \\int\\frac{\\rho(\\mathbf{r}\')}{|\\mathbf{r}-\\mathbf{r}\'|}d\\mathbf{r}\' + v_{xc}(\\mathbf{r}) = \\mu\\). This is equivalent to the KS eigenvalue equation when \\(\\rho\\) is represented by orbitals.'
                },
                {
                    question: 'Do the Kohn-Sham orbital energies \\(\\varepsilon_i\\) have physical meaning?',
                    hint: 'Compare with Koopmans\' theorem in HF. Is there an analogous result for KS?',
                    solution: 'In general, KS orbital energies are not ionization energies (unlike the approximate Koopmans\' theorem in HF). However, one exact result holds: by Janak\'s theorem, \\(\\varepsilon_i = \\partial E / \\partial n_i\\) where \\(n_i\\) is the occupation number. For the highest occupied orbital (HOMO), this gives \\(\\varepsilon_{\\text{HOMO}} = -I\\) (the exact ionization potential) if the exact \\(E_{xc}\\) is used. This is a theorem, not an approximation. In practice, with approximate functionals, KS HOMO energies underestimate \\(I\\) by 2-5 eV (for semilocal functionals). Virtual orbital energies have even less physical significance.'
                },
                {
                    question: 'Why does the Thomas-Fermi model fail to predict molecular binding?',
                    hint: 'Consider the Teller non-binding theorem and the role of the kinetic energy functional.',
                    solution: 'Teller (1962) proved that in the Thomas-Fermi model, molecules do not bind: the energy of any molecule is always higher than the sum of the separated atoms. The root cause is that \\(T_{TF}[\\rho] = C_F\\int\\rho^{5/3}\\) is too crude; it treats the electrons as a uniform gas locally and misses the shell structure and bonding charge accumulation in the internuclear region. Specifically, the TF kinetic pressure is too high, preventing charge accumulation between nuclei. Including the von Weizsacker gradient correction \\(\\frac{1}{8}\\int|\\nabla\\rho|^2/\\rho\\) partially fixes this, but only the KS orbital approach gives reliable binding energies.'
                }
            ]
        },

        // ========== SECTION 4: The Exchange-Correlation Energy ==========
        {
            id: 'sec11-4-exchange-correlation',
            title: 'The Exchange-Correlation Energy',
            content: `
<h2>11.4 The Exchange-Correlation Energy</h2>

<p>The exchange-correlation functional \\(E_{xc}[\\rho]\\) is the only unknown quantity in the Kohn-Sham framework. Understanding its exact properties, even without knowing its explicit form, provides guiding principles for constructing approximations.</p>

<h3>Decomposition of \\(E_{xc}\\)</h3>

<div class="env-block definition"><div class="env-title">Definition 11.4.1 — Exchange and Correlation Components</div><div class="env-body">
The exchange-correlation energy can be separated into exchange and correlation parts:
\\[
E_{xc}[\\rho] = E_x[\\rho] + E_c[\\rho],
\\]
where:
<ul>
<li><strong>Exchange energy:</strong> \\(E_x[\\rho] = \\langle\\Phi_s[\\rho]|\\hat{V}_{ee}|\\Phi_s[\\rho]\\rangle - J[\\rho]\\), where \\(\\Phi_s\\) is the KS Slater determinant. This is the Fock exchange evaluated with KS orbitals.</li>
<li><strong>Correlation energy:</strong> \\(E_c[\\rho] = (T[\\rho] - T_s[\\rho]) + (\\langle\\Psi|\\hat{V}_{ee}|\\Psi\\rangle - \\langle\\Phi_s|\\hat{V}_{ee}|\\Phi_s\\rangle)\\), encompassing kinetic and potential correlation.</li>
</ul>
</div></div>

<h3>The Adiabatic Connection</h3>

<p>The adiabatic connection provides a rigorous path from the non-interacting KS system to the fully interacting system, with the density held fixed throughout:</p>

<div class="env-block definition"><div class="env-title">Definition 11.4.2 — Adiabatic Connection</div><div class="env-body">
Define a family of Hamiltonians parametrized by the coupling constant \\(\\lambda \\in [0, 1]\\):
\\[
\\hat{H}_\\lambda = \\hat{T} + \\lambda \\hat{V}_{ee} + \\hat{V}_\\lambda,
\\]
where \\(\\hat{V}_\\lambda\\) is an external potential chosen so that the ground-state density is \\(\\rho_0(\\mathbf{r})\\) for all \\(\\lambda\\):
<ul>
<li>At \\(\\lambda = 0\\): no electron-electron interaction, \\(\\hat{V}_0 = \\hat{v}_s\\) (the KS potential). The ground state is the KS determinant \\(\\Phi_s\\).</li>
<li>At \\(\\lambda = 1\\): full interaction, \\(\\hat{V}_1 = \\hat{v}_{\\text{ext}}\\) (the physical external potential). The ground state is the exact \\(\\Psi\\).</li>
</ul>
</div></div>

<div class="env-block theorem"><div class="env-title">Theorem 11.4.3 — Adiabatic Connection Formula</div><div class="env-body">
The exchange-correlation energy is given by
\\[
E_{xc}[\\rho] = \\int_0^1 \\langle\\Psi_\\lambda|\\hat{V}_{ee}|\\Psi_\\lambda\\rangle\\, d\\lambda - J[\\rho],
\\]
or equivalently,
\\[
E_{xc}[\\rho] = \\int_0^1 W_{xc}(\\lambda)\\, d\\lambda,
\\]
where \\(W_{xc}(\\lambda) = \\langle\\Psi_\\lambda|\\hat{V}_{ee}|\\Psi_\\lambda\\rangle - J[\\rho]\\) is the exchange-correlation potential energy at coupling strength \\(\\lambda\\).
</div></div>

<div class="viz-placeholder" data-viz="viz-adiabatic-connection"></div>

<div class="env-block remark"><div class="env-title">Remark — Interpreting the Adiabatic Connection</div><div class="env-body">
<ul>
<li>At \\(\\lambda = 0\\): \\(W_{xc}(0) = E_x\\) (pure exchange, no correlation since electrons don't interact).</li>
<li>As \\(\\lambda\\) increases, correlation effects grow, and \\(W_{xc}(\\lambda)\\) becomes more negative.</li>
<li>\\(W_{xc}(\\lambda)\\) is a monotonically decreasing, concave function of \\(\\lambda\\).</li>
<li>\\(E_{xc}\\) is the area under the \\(W_{xc}(\\lambda)\\) curve from 0 to 1.</li>
</ul>
This picture motivates hybrid functionals: if we approximate \\(W_{xc}\\) as linear in \\(\\lambda\\), we get \\(E_{xc} \\approx \\frac{1}{2}[W_{xc}(0) + W_{xc}(1)] = \\frac{1}{2}[E_x^{\\text{exact}} + W_{xc}^{\\text{DFA}}(1)]\\).
</div></div>

<h3>Exact Constraints on \\(E_{xc}\\)</h3>

<div class="env-block proposition"><div class="env-title">Proposition 11.4.4 — Key Exact Constraints</div><div class="env-body">
The exact \\(E_{xc}[\\rho]\\) satisfies numerous known constraints:
<ol>
<li><strong>Negativity of exchange:</strong> \\(E_x[\\rho] \\leq 0\\) for all \\(\\rho\\).</li>
<li><strong>Exchange scaling:</strong> \\(E_x[\\rho_\\gamma] = \\gamma E_x[\\rho]\\), where \\(\\rho_\\gamma(\\mathbf{r}) = \\gamma^3\\rho(\\gamma\\mathbf{r})\\) is the uniformly scaled density.</li>
<li><strong>Correlation scaling:</strong> \\(E_c[\\rho_\\gamma] > \\gamma E_c[\\rho]\\) for \\(\\gamma > 1\\) (correlation energy is less negative under compression).</li>
<li><strong>Lieb-Oxford bound:</strong> \\(E_{xc}[\\rho] \\geq -C_{LO} \\int \\rho^{4/3}\\, d\\mathbf{r}\\) with \\(C_{LO} \\leq 1.68\\).</li>
<li><strong>Self-interaction free:</strong> For a one-electron system, \\(E_{xc}[\\rho] = -J[\\rho]\\) (exchange exactly cancels the spurious self-Coulomb).</li>
<li><strong>Uniform gas limit:</strong> For a uniform density, \\(E_{xc}\\) reduces to the known exchange-correlation energy of the homogeneous electron gas.</li>
</ol>
</div></div>

<div class="env-block example"><div class="env-title">Example 11.4.5 — The Exchange-Correlation Hole</div><div class="env-body">
The xc energy can also be written in terms of the exchange-correlation hole \\(h_{xc}(\\mathbf{r}, \\mathbf{r}')\\):
\\[
E_{xc}[\\rho] = \\frac{1}{2} \\iint \\frac{\\rho(\\mathbf{r}) h_{xc}(\\mathbf{r}, \\mathbf{r}')}{|\\mathbf{r} - \\mathbf{r}'|}\\, d\\mathbf{r}\\, d\\mathbf{r}'.
\\]
The xc hole describes how the presence of an electron at \\(\\mathbf{r}\\) depletes the probability of finding another electron at \\(\\mathbf{r}'\\). It integrates to exactly \\(-1\\) (one electron is "missing" from the hole), which is the sum rule: \\(\\int h_{xc}(\\mathbf{r}, \\mathbf{r}')\\, d\\mathbf{r}' = -1\\).
</div></div>
`,
            visualizations: [
                {
                    id: 'viz-adiabatic-connection',
                    title: 'Adiabatic Connection Integrand',
                    description: 'The exchange-correlation energy is the area under the curve \\(W_{xc}(\\lambda)\\) from \\(\\lambda=0\\) to \\(\\lambda=1\\). At \\(\\lambda=0\\), only exchange is present. As \\(\\lambda\\) increases, correlation grows. Hybrid functionals approximate this curve.',
                    setup(body, controls) {
                        const viz = new VizEngine(body, {
                            scale: 40,
                            originX: 80,
                            originY: 60
                        });
                        const ctx = viz.ctx;
                        const w = viz.width, h = viz.height;

                        let hybridFrac = 0.25; // fraction of exact exchange (like B3LYP)
                        VizEngine.createSlider(controls, 'Exact exchange fraction', 0, 1, hybridFrac, 0.05, v => {
                            hybridFrac = v;
                            draw();
                        });

                        function draw() {
                            viz.clear();

                            const padL = 80, padR = 40, padT = 40, padB = 50;
                            const plotW = w - padL - padR;
                            const plotH = h - padT - padB;

                            // Model W_xc(lambda) curve: concave, decreasing
                            const Ex = -0.8;  // exchange energy (lambda=0)
                            const Wxc1 = -1.2; // W_xc at lambda=1

                            function Wxc(lam) {
                                // Concave interpolation
                                return Ex + (Wxc1 - Ex) * (1 - Math.pow(1 - lam, 1.5));
                            }

                            // Axes
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1.5;
                            ctx.beginPath();
                            ctx.moveTo(padL, h - padB);
                            ctx.lineTo(padL + plotW, h - padB);
                            ctx.stroke();
                            ctx.beginPath();
                            ctx.moveTo(padL, h - padB);
                            ctx.lineTo(padL, padT);
                            ctx.stroke();

                            // Axis labels
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            ctx.fillText('\u03bb (coupling strength)', padL + plotW / 2, h - 15);
                            ctx.textAlign = 'center';
                            ctx.fillText('0', padL, h - padB + 14);
                            ctx.fillText('1', padL + plotW, h - padB + 14);

                            ctx.save();
                            ctx.translate(18, padT + plotH / 2);
                            ctx.rotate(-Math.PI / 2);
                            ctx.fillText('W_xc(\u03bb)', 0, 0);
                            ctx.restore();

                            // Y scale
                            const yMin = -1.5, yMax = 0;
                            function toY(val) {
                                return h - padB - ((val - yMin) / (yMax - yMin)) * plotH;
                            }
                            function toX(lam) {
                                return padL + lam * plotW;
                            }

                            // Grid
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 0.5;
                            for (let v = yMin; v <= yMax; v += 0.5) {
                                const y = toY(v);
                                ctx.beginPath();
                                ctx.moveTo(padL, y);
                                ctx.lineTo(padL + plotW, y);
                                ctx.stroke();
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '10px -apple-system,sans-serif';
                                ctx.textAlign = 'right';
                                ctx.fillText(v.toFixed(1), padL - 6, y + 3);
                            }

                            // Shaded area (exact E_xc)
                            ctx.fillStyle = viz.colors.green + '33';
                            ctx.beginPath();
                            ctx.moveTo(toX(0), toY(0));
                            for (let i = 0; i <= 100; i++) {
                                const lam = i / 100;
                                ctx.lineTo(toX(lam), toY(Wxc(lam)));
                            }
                            ctx.lineTo(toX(1), toY(0));
                            ctx.closePath();
                            ctx.fill();

                            // The exact curve
                            ctx.strokeStyle = viz.colors.green;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            for (let i = 0; i <= 100; i++) {
                                const lam = i / 100;
                                const x = toX(lam);
                                const y = toY(Wxc(lam));
                                if (i === 0) ctx.moveTo(x, y);
                                else ctx.lineTo(x, y);
                            }
                            ctx.stroke();

                            // Hybrid approximation line (linear from exact exchange at 0 to DFA at 1)
                            // The hybrid uses a fraction 'a' of exact exchange
                            const Wxc_hybrid_0 = Ex; // exact exchange
                            const Wxc_hybrid_1 = Wxc(1); // DFA value at lambda=1
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 1.5;
                            ctx.setLineDash([6, 4]);
                            ctx.beginPath();
                            ctx.moveTo(toX(0), toY(Wxc_hybrid_0));
                            ctx.lineTo(toX(1), toY(Wxc_hybrid_1));
                            ctx.stroke();
                            ctx.setLineDash([]);

                            // Points at lambda=0 and lambda=1
                            ctx.fillStyle = viz.colors.blue;
                            ctx.beginPath();
                            ctx.arc(toX(0), toY(Ex), 5, 0, Math.PI * 2);
                            ctx.fill();
                            ctx.fillStyle = viz.colors.red;
                            ctx.beginPath();
                            ctx.arc(toX(1), toY(Wxc(1)), 5, 0, Math.PI * 2);
                            ctx.fill();

                            // Labels
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillText('E_x (exact exchange)', toX(0) + 8, toY(Ex) - 8);
                            ctx.fillStyle = viz.colors.red;
                            ctx.fillText('W_xc(1)', toX(1) + 8, toY(Wxc(1)) + 4);

                            // Legend
                            const lx = padL + plotW - 180, ly = padT + 10;
                            ctx.fillStyle = viz.colors.green;
                            ctx.fillRect(lx, ly, 16, 3);
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('Exact W_xc(\u03bb)', lx + 22, ly + 4);

                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillRect(lx, ly + 18, 16, 3);
                            ctx.fillText('Linear approx (hybrid)', lx + 22, ly + 22);

                            // Hybrid annotation
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Hybrid: ' + (hybridFrac * 100).toFixed(0) + '% exact exchange', w / 2, padT + plotH + 30);
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.text;
                            const Exc_exact = 0;
                            let areaExact = 0;
                            for (let i = 0; i < 1000; i++) {
                                areaExact += Wxc(i / 1000) / 1000;
                            }
                            ctx.fillText('E_xc (area) \u2248 ' + areaExact.toFixed(3) + ' (model units)', w / 2, padT + plotH + 44);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show that for a one-electron system (e.g., hydrogen atom), the exact \\(E_{xc}\\) is \\(-J[\\rho]\\) and the correlation energy is zero.',
                    hint: 'For one electron, \\(\\hat{V}_{ee} = 0\\) (no electron-electron repulsion). What does \\(J[\\rho]\\) represent?',
                    solution: 'For one electron, \\(V_{ee} = 0\\) exactly, so the true total electron-electron energy is zero. The Hartree term \\(J[\\rho] = \\frac{1}{2}\\iint\\frac{\\rho(\\mathbf{r})\\rho(\\mathbf{r}\')}{|\\mathbf{r}-\\mathbf{r}\'|}d\\mathbf{r}d\\mathbf{r}\'\\) is the self-interaction of the single electron with itself, a spurious quantity. Since \\(E = T_s + J + E_{xc} + \\int v\\rho\\) and the true energy has no \\(V_{ee}\\), we need \\(E_{xc} = -J\\) to cancel the self-interaction. Furthermore, \\(T_s = T\\) exactly (one electron means no correlation), so \\(E_c = (T - T_s) + (V_{ee,\\text{true}} - V_{ee,KS}) = 0 + 0 = 0\\). Thus \\(E_{xc} = E_x = -J\\).'
                },
                {
                    question: 'Derive the exchange scaling relation \\(E_x[\\rho_\\gamma] = \\gamma E_x[\\rho]\\) for the uniformly scaled density \\(\\rho_\\gamma(\\mathbf{r}) = \\gamma^3\\rho(\\gamma\\mathbf{r})\\).',
                    hint: 'Write \\(E_x\\) as the Fock exchange integral with KS orbitals and use the fact that KS orbitals scale as \\(\\phi_i^\\gamma(\\mathbf{r}) = \\gamma^{3/2}\\phi_i(\\gamma\\mathbf{r})\\).',
                    solution: 'Under uniform scaling, the KS orbitals become \\(\\phi_i^\\gamma(\\mathbf{r}) = \\gamma^{3/2}\\phi_i(\\gamma\\mathbf{r})\\) (to maintain normalization). The exchange energy is \\(E_x = -\\frac{1}{2}\\sum_{ij}\\iint\\frac{\\phi_i^*(\\mathbf{r})\\phi_j(\\mathbf{r})\\phi_j^*(\\mathbf{r}\')\\phi_i(\\mathbf{r}\')}{|\\mathbf{r}-\\mathbf{r}\'|}d\\mathbf{r}d\\mathbf{r}\'\\). Substituting \\(\\phi_i^\\gamma\\) and changing variables \\(\\mathbf{u} = \\gamma\\mathbf{r}\\), \\(\\mathbf{u}\' = \\gamma\\mathbf{r}\'\\): the \\(\\gamma^{3/2}\\) factors give \\(\\gamma^6\\), the volume elements give \\(\\gamma^{-6}\\), and \\(|\\mathbf{r}-\\mathbf{r}\'| = |\\mathbf{u}-\\mathbf{u}\'|/\\gamma\\) gives an extra \\(\\gamma\\). Total: \\(\\gamma^1 E_x[\\rho]\\).'
                },
                {
                    question: 'Why is the concavity of \\(W_{xc}(\\lambda)\\) physically expected?',
                    hint: 'Consider how the wavefunction adjusts as the electron-electron interaction is turned on gradually.',
                    solution: 'As \\(\\lambda\\) increases from 0, the electrons begin to avoid each other (correlation). The wavefunction \\(\\Psi_\\lambda\\) develops a correlation hole. The initial effect of turning on the interaction is large (the electrons, previously independent, start to correlate strongly). But further increases in \\(\\lambda\\) have a diminishing marginal effect because the wavefunction has already partially adjusted. Mathematically, \\(\\frac{d^2 W_{xc}}{d\\lambda^2} \\leq 0\\) follows from the concavity of the energy with respect to a linear perturbation parameter (a consequence of second-order perturbation theory giving a negative correction).'
                },
                {
                    question: 'The exchange-correlation hole integrates to \\(-1\\). Show this using the definition and the normalization of the pair density.',
                    hint: 'The pair density \\(\\rho_2(\\mathbf{r},\\mathbf{r}\') = \\rho(\\mathbf{r})[\\rho(\\mathbf{r}\') + h_{xc}(\\mathbf{r},\\mathbf{r}\')]\\) integrates to \\(N(N-1)\\).',
                    solution: 'The pair density satisfies \\(\\iint \\rho_2(\\mathbf{r},\\mathbf{r}\')d\\mathbf{r}d\\mathbf{r}\' = N(N-1)\\) and \\(\\int\\rho_2(\\mathbf{r},\\mathbf{r}\')d\\mathbf{r}\' = (N-1)\\rho(\\mathbf{r})\\). Writing \\(\\rho_2(\\mathbf{r},\\mathbf{r}\') = \\rho(\\mathbf{r})[\\rho(\\mathbf{r}\') + h_{xc}(\\mathbf{r},\\mathbf{r}\')]\\), integrate over \\(\\mathbf{r}\'\\): \\((N-1)\\rho(\\mathbf{r}) = \\rho(\\mathbf{r})[N + \\int h_{xc}(\\mathbf{r},\\mathbf{r}\')d\\mathbf{r}\']\\). Dividing by \\(\\rho(\\mathbf{r})\\): \\(N - 1 = N + \\int h_{xc}\\, d\\mathbf{r}\'\\), so \\(\\int h_{xc}(\\mathbf{r},\\mathbf{r}\')d\\mathbf{r}\' = -1\\).'
                },
                {
                    question: 'The Lieb-Oxford bound states \\(E_{xc}[\\rho] \\geq -C_{LO}\\int\\rho^{4/3}d\\mathbf{r}\\). Why does this have the form \\(\\rho^{4/3}\\)?',
                    hint: 'Consider dimensional analysis. The exchange energy of a uniform gas has the form \\(\\int\\rho^{4/3}\\).',
                    solution: 'By dimensional analysis in atomic units: \\(E_{xc}\\) has dimensions of energy (Hartree). The only way to construct an energy from the density (dimension: length\\(^{-3}\\)) without introducing other length scales is \\(\\int \\rho^{4/3}d\\mathbf{r}\\). Checking: \\([\\rho^{4/3}] = L^{-4}\\), and \\([d\\mathbf{r}] = L^3\\), giving \\([\\int \\rho^{4/3}d\\mathbf{r}] = L^{-1} = E_h/a_0 \\cdot a_0 = E_h\\). This is the same form as the Dirac exchange energy of the uniform electron gas: \\(E_x^{\\text{LDA}} = -C_x\\int\\rho^{4/3}d\\mathbf{r}\\) with \\(C_x = \\frac{3}{4}(3/\\pi)^{1/3}\\). The Lieb-Oxford bound generalizes this to all densities and includes correlation.'
                }
            ]
        },

        // ========== SECTION 5: Self-Interaction Error and the Band Gap Problem ==========
        {
            id: 'sec11-5-sie-band-gap',
            title: 'Self-Interaction Error and the Band Gap Problem',
            content: `
<h2>11.5 Self-Interaction Error and the Band Gap Problem</h2>

<p>The exact Kohn-Sham DFT is, in principle, as accurate as FCI. In practice, every functional in use is approximate, and certain systematic errors arise. The two most important are the self-interaction error (SIE) and the band gap problem, both traceable to deficiencies in \\(E_{xc}\\) approximations.</p>

<h3>Self-Interaction Error</h3>

<div class="env-block definition"><div class="env-title">Definition 11.5.1 — Self-Interaction Error</div><div class="env-body">
For a one-electron system, the exact conditions require \\(E_x[\\rho] = -J[\\rho]\\) and \\(E_c[\\rho] = 0\\), so that the electron does not interact with itself. In approximate functionals (LDA, GGA), these conditions are violated:
\\[
\\text{SIE} = J[\\rho_i] + E_{xc}^{\\text{approx}}[\\rho_i] \\neq 0,
\\]
where \\(\\rho_i = |\\phi_i|^2\\) is the density of a single orbital. The residual self-interaction causes systematic errors.
</div></div>

<div class="env-block proposition"><div class="env-title">Proposition 11.5.2 — Consequences of SIE</div><div class="env-body">
Self-interaction error leads to:
<ul>
<li><strong>Over-delocalization:</strong> Electrons spread out artificially to reduce the spurious self-repulsion. This causes errors in charge-transfer states, dissociation curves, and barrier heights.</li>
<li><strong>Underestimated reaction barriers:</strong> Transition states have stretched bonds with partially delocalized electrons; SIE spuriously stabilizes these structures.</li>
<li><strong>Wrong dissociation limits:</strong> For \\(\\text{H}_2^+\\) dissociation, LDA/GGA predicts fractional charges (\\(\\text{H}^{0.5+} + \\text{H}^{0.5+}\\)) instead of the correct \\(\\text{H} + \\text{H}^+\\).</li>
<li><strong>Too diffuse anions:</strong> The extra electron in F\\(^-\\) or O\\(^{2-}\\) is spuriously destabilized by the potential decay error.</li>
</ul>
</div></div>

<div class="env-block example"><div class="env-title">Example 11.5.3 — SIE in \\(\\text{H}_2^+\\) Dissociation</div><div class="env-body">
For \\(\\text{H}_2^+\\) (one electron, two nuclei), the exact energy curve at dissociation gives one electron localized on one proton: \\(E \\to E(\\text{H}) + E(\\text{H}^+)\\). With LDA or GGA, the self-interaction error causes the electron to delocalize equally over both protons even at large separation, giving an energy approximately \\(J[\\rho/2]\\) too low. The error can exceed 50 kcal/mol at large bond distances.
</div></div>

<h3>The Derivative Discontinuity</h3>

<p>A closely related issue involves the behavior of the energy as a function of electron number:</p>

<div class="env-block definition"><div class="env-title">Definition 11.5.4 — Derivative Discontinuity</div><div class="env-body">
For the exact exchange-correlation functional, the derivative of the total energy with respect to electron number \\(N\\) has a discontinuity at integer values:
\\[
\\left.\\frac{\\partial E}{\\partial N}\\right|_{N^+} - \\left.\\frac{\\partial E}{\\partial N}\\right|_{N^-} = \\Delta_{xc} \\neq 0.
\\]
This <em>derivative discontinuity</em> \\(\\Delta_{xc}\\) means that the KS potential \\(v_{xc}(\\mathbf{r})\\) jumps by a spatially uniform constant when the electron number passes through an integer.
</div></div>

<div class="env-block theorem"><div class="env-title">Theorem 11.5.5 — Band Gap and the Derivative Discontinuity</div><div class="env-body">
The fundamental band gap \\(E_g\\) of a system is
\\[
E_g = I - A = \\varepsilon_{\\text{gap}}^{KS} + \\Delta_{xc},
\\]
where \\(I\\) is the ionization potential, \\(A\\) is the electron affinity, \\(\\varepsilon_{\\text{gap}}^{KS} = \\varepsilon_{N+1} - \\varepsilon_N\\) is the KS HOMO-LUMO gap, and \\(\\Delta_{xc}\\) is the derivative discontinuity. Even with the exact \\(v_{xc}\\), the KS gap \\(\\varepsilon_{\\text{gap}}^{KS}\\) is not equal to the true gap; the missing piece is \\(\\Delta_{xc}\\).
</div></div>

<div class="env-block remark"><div class="env-title">Remark — Why LDA/GGA Underestimates Band Gaps</div><div class="env-body">
Semilocal functionals (LDA, GGA) have a smooth, continuous dependence on the density. They have \\(\\Delta_{xc} \\approx 0\\) (no derivative discontinuity). Therefore:
\\[
E_g^{\\text{LDA/GGA}} \\approx \\varepsilon_{\\text{gap}}^{KS},
\\]
which is typically 30-50% smaller than the true gap. This is the famous "band gap problem" of DFT. It is not a failure of DFT itself (the exact KS theory with \\(\\Delta_{xc}\\) gives the correct gap) but a failure of semilocal approximations to \\(E_{xc}\\).
</div></div>

<h3>Remedies</h3>

<div class="env-block definition"><div class="env-title">Definition 11.5.6 — Self-Interaction Correction (SIC)</div><div class="env-body">
The Perdew-Zunger self-interaction correction (PZ-SIC, 1981) removes the one-electron SIE orbital by orbital:
\\[
E_{xc}^{\\text{SIC}} = E_{xc}^{\\text{approx}}[\\rho] - \\sum_{i=1}^N \\left\\{ J[\\rho_i] + E_{xc}^{\\text{approx}}[\\rho_i] \\right\\},
\\]
where \\(\\rho_i = |\\phi_i|^2\\). This ensures the one-electron condition is satisfied. However, PZ-SIC breaks orbital invariance (results depend on which orbitals are used) and is difficult to implement efficiently.
</div></div>

<div class="env-block proposition"><div class="env-title">Proposition 11.5.7 — Approaches to the Band Gap Problem</div><div class="env-body">
Several approaches partially address the band gap problem:
<ul>
<li><strong>Hybrid functionals (B3LYP, PBE0, HSE):</strong> Mix in a fraction of exact (Fock) exchange, which is SIE-free. This opens the gap but does not fully capture \\(\\Delta_{xc}\\). Typical improvement: gaps are 70-90% of experiment.</li>
<li><strong>GW approximation:</strong> A many-body perturbation theory approach that computes quasiparticle energies \\(\\varepsilon_i^{QP}\\), naturally including self-energy corrections. The gap \\(\\varepsilon_{\\text{LUMO}}^{QP} - \\varepsilon_{\\text{HOMO}}^{QP}\\) closely approximates \\(I - A\\).</li>
<li><strong>Range-separated hybrids (\\(\\omega\\)B97X-D, CAM-B3LYP):</strong> Use 100% exact exchange at long range, eliminating the long-range SIE. Especially effective for charge-transfer excitations and reaction barriers.</li>
<li><strong>DFT+U:</strong> Adds a Hubbard-like correction to localized (d, f) orbitals, effectively penalizing fractional occupations. Widely used for transition metal oxides and correlated materials.</li>
</ul>
</div></div>

<div class="env-block example"><div class="env-title">Example 11.5.8 — Band Gaps of Common Semiconductors</div><div class="env-body">
<table style="width:100%;text-align:center;margin:10px 0;">
<tr><th>Material</th><th>Expt. (eV)</th><th>LDA</th><th>PBE0</th><th>HSE06</th><th>GW</th></tr>
<tr><td>Si</td><td>1.17</td><td>0.52</td><td>1.72</td><td>1.20</td><td>1.15</td></tr>
<tr><td>GaAs</td><td>1.52</td><td>0.30</td><td>1.85</td><td>1.33</td><td>1.55</td></tr>
<tr><td>MgO</td><td>7.83</td><td>4.70</td><td>8.20</td><td>6.55</td><td>7.60</td></tr>
<tr><td>NaCl</td><td>8.50</td><td>5.00</td><td>8.70</td><td>6.80</td><td>8.40</td></tr>
</table>
LDA systematically underestimates by 30-60%. HSE06 and GW provide much better agreement with experiment.
</div></div>

<div class="env-block warning"><div class="env-title">Warning</div><div class="env-body">
The band gap problem and SIE are distinct issues with a common origin (delocalization error in semilocal functionals). Fixing SIE does not automatically fix the band gap, and vice versa. A comprehensive solution requires either (1) the exact \\(E_{xc}\\) functional (unknown), or (2) a combination of approaches tailored to the property of interest. There is no universal "fix" within semilocal DFT.
</div></div>
`,
            visualizations: [],
            exercises: [
                {
                    question: 'For the hydrogen atom, compute the SIE of the LDA exchange functional \\(E_x^{\\text{LDA}} = -C_x \\int \\rho^{4/3}\\, d\\mathbf{r}\\) and show it does not exactly cancel \\(J[\\rho]\\).',
                    hint: 'Use \\(\\rho(r) = \\frac{1}{\\pi}e^{-2r}\\) (atomic units). Compute \\(J[\\rho]\\) and \\(E_x^{\\text{LDA}}[\\rho]\\) separately.',
                    solution: 'In atomic units, \\(\\rho = \\frac{1}{\\pi}e^{-2r}\\). The Hartree self-energy is \\(J = \\frac{1}{2}\\iint\\frac{\\rho(\\mathbf{r})\\rho(\\mathbf{r}\')}{|\\mathbf{r}-\\mathbf{r}\'|}d\\mathbf{r}d\\mathbf{r}\' = \\frac{5}{16}\\) Eh (standard result for 1s hydrogen). The LDA exchange is \\(E_x^{\\text{LDA}} = -C_x\\int\\rho^{4/3}d\\mathbf{r} = -\\frac{3}{4}(3/\\pi)^{1/3} \\cdot 4\\pi\\int_0^\\infty (\\pi^{-1}e^{-2r})^{4/3} r^2\\, dr = -0.2680\\) Eh. The SIE is \\(J + E_x^{\\text{LDA}} = 0.3125 - 0.2680 = 0.0445\\) Eh \\(\\approx 28\\) kcal/mol. This is a significant error for a single electron, demonstrating that LDA exchange does not fully cancel the Hartree self-interaction.'
                },
                {
                    question: 'Explain the "delocalization error" of semilocal functionals using the convexity argument for fractional electron numbers.',
                    hint: 'The exact energy \\(E(N)\\) is piecewise linear between integers. What shape does LDA/GGA give?',
                    solution: 'For the exact functional, \\(E(N)\\) is piecewise linear between integers (straight line from \\(E(M)\\) to \\(E(M+1)\\) for \\(M \\leq N \\leq M+1\\)). This follows from the ensemble theorem (Perdew et al., 1982). Semilocal functionals, however, give a concave (curved downward) \\(E(N)\\), meaning they assign too low an energy to fractional electron numbers. This spurious stabilization of fractional charges is the "delocalization error": the functional favors spreading charge over multiple centers (fractional occupancy) rather than localizing it (integer occupancy). This directly causes the over-delocalization in stretched bonds, wrong dissociation limits, and underestimated barriers.'
                },
                {
                    question: 'Show that the fundamental gap \\(I - A\\) equals the KS gap plus the derivative discontinuity.',
                    hint: 'Use \\(I = E(N-1) - E(N)\\), \\(A = E(N) - E(N+1)\\), and Janak\'s theorem \\(\\varepsilon_i = \\partial E/\\partial n_i\\).',
                    solution: 'The ionization potential is \\(I = E(N-1) - E(N) = -\\partial E/\\partial N|_{N^-}\\) and the electron affinity is \\(A = E(N) - E(N+1) = -\\partial E/\\partial N|_{N^+}\\). By Janak\'s theorem, \\(-\\partial E/\\partial N|_{N^-} = -\\varepsilon_N^{KS}(N^-)\\) (the HOMO energy just below \\(N\\)) and \\(-\\partial E/\\partial N|_{N^+} = -\\varepsilon_{N+1}^{KS}(N^+)\\) (the LUMO energy just above \\(N\\)). But \\(v_{xc}\\) jumps by \\(\\Delta_{xc}\\) at \\(N\\), so \\(\\varepsilon_{N+1}(N^+) = \\varepsilon_{N+1}(N^-) + \\Delta_{xc}\\). Thus \\(I - A = \\varepsilon_{N+1}(N^-) - \\varepsilon_N(N^-) + \\Delta_{xc} = \\varepsilon_{\\text{gap}}^{KS} + \\Delta_{xc}\\).'
                },
                {
                    question: 'Why do range-separated hybrid functionals fix the long-range SIE while global hybrids (e.g., B3LYP) do not fully resolve it?',
                    hint: 'Consider the Coulomb interaction \\(1/r_{12}\\) split into short-range and long-range parts. Which part causes the SIE at dissociation?',
                    solution: 'In a global hybrid like B3LYP, a fixed fraction (20%) of exact exchange is mixed in everywhere. At long range, the 80% of semilocal exchange still contains SIE. For a dissociating system like H\\(_2^+\\), the electron on one center interacts with the other center primarily through the long-range Coulomb interaction. Since only 20% of this is treated with exact (SIE-free) exchange, 80% of the long-range SIE persists. Range-separated hybrids partition \\(1/r_{12} = \\frac{\\text{erfc}(\\omega r_{12})}{r_{12}} + \\frac{\\text{erf}(\\omega r_{12})}{r_{12}}\\), using semilocal exchange only for the short-range part and 100% exact exchange for the long-range part. This completely eliminates the long-range SIE, giving correct dissociation limits and charge-transfer energetics.'
                },
                {
                    question: 'The Perdew-Zunger SIC breaks orbital invariance. Explain what this means and why it is problematic.',
                    hint: 'Unitary transformations among occupied orbitals do not change the Slater determinant. What happens to the PZ-SIC energy under such a transformation?',
                    solution: 'The total HF-like energy (and the uncorrected KS energy) is invariant under unitary rotations among occupied orbitals: \\(\\phi_i \\to \\sum_j U_{ij}\\phi_j\\) with \\(U^\\dagger U = I\\). The density \\(\\rho = \\sum_i|\\phi_i|^2\\) is invariant under such rotations. However, the PZ-SIC correction \\(-\\sum_i[J[\\rho_i] + E_{xc}[\\rho_i]]\\) depends on individual orbital densities \\(\\rho_i = |\\phi_i|^2\\), which do change under rotations. Thus the PZ-SIC energy depends on which orbitals are used, making results ambiguous. In practice, one must find the "optimal" orbitals that minimize the PZ-SIC energy, adding computational complexity and sometimes giving multiple local minima.'
                },
                {
                    question: 'For a periodic solid, the KS band structure has a gap \\(\\varepsilon_{\\text{gap}}^{KS}\\). Estimate the true gap for Si if \\(\\varepsilon_{\\text{gap}}^{KS} = 0.52\\) eV and \\(\\Delta_{xc} \\approx 0.65\\) eV.',
                    hint: 'Use the exact relation \\(E_g = \\varepsilon_{\\text{gap}}^{KS} + \\Delta_{xc}\\).',
                    solution: '\\(E_g = 0.52 + 0.65 = 1.17\\) eV, which matches the experimental band gap of silicon exactly. This demonstrates that the "band gap problem" of LDA is not a failure of KS-DFT but of the missing derivative discontinuity in semilocal functionals. If we could compute \\(\\Delta_{xc}\\) exactly, the KS gap plus this correction would give the exact fundamental gap. The GW approximation effectively captures \\(\\Delta_{xc}\\) through the self-energy, explaining why it gives much better gaps than LDA/GGA.'
                }
            ]
        }
    ]
});
