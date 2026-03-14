// === Chapter 7: Electron Correlation ===
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch07',
    number: 7,
    title: 'Electron Correlation',
    subtitle: 'Beyond Hartree-Fock: why electron correlation matters',
    sections: [
        // ========== SECTION 1: What Is Electron Correlation? ==========
        {
            id: 'sec7-1-what-is-correlation',
            title: 'What Is Electron Correlation?',
            content: `
<h2>7.1 What Is Electron Correlation?</h2>

<div class="env-block intuition"><div class="env-title">Intuition — The Mean-Field Approximation Breaks Down</div><div class="env-body">
In Hartree-Fock theory, each electron moves in the average field of all the other electrons. This is like navigating a city using only the <em>average</em> traffic density, ignoring the actual positions of individual cars. In reality, electrons avoid each other instantaneously: when one electron is at position \\(\\mathbf{r}_1\\), the probability of finding another nearby is reduced. This instantaneous avoidance, beyond what HF captures, is <em>electron correlation</em>.
</div></div>

<p>The Hartree-Fock method provides an excellent zeroth-order description of electronic structure, typically recovering 99% or more of the total electronic energy. However, the remaining fraction, the <em>correlation energy</em>, is crucial for chemical accuracy in thermochemistry, reaction barriers, spectroscopy, and intermolecular interactions.</p>

<h3>The Fermi Hole and the Coulomb Hole</h3>

<p>HF theory correctly accounts for the <em>Fermi hole</em>: the exchange interaction ensures that two electrons of the same spin cannot occupy the same point in space (a consequence of the Pauli exclusion principle, built into the Slater determinant). However, HF theory does <em>not</em> account for the <em>Coulomb hole</em>: the reduction in probability of finding any two electrons (regardless of spin) close together due to their mutual Coulomb repulsion.</p>

<div class="env-block definition"><div class="env-title">Definition 7.1.1 — Fermi and Coulomb Holes</div><div class="env-body">
The <em>pair density</em> \\(\\rho_2(\\mathbf{r}_1, \\mathbf{r}_2)\\) gives the probability of simultaneously finding an electron at \\(\\mathbf{r}_1\\) and another at \\(\\mathbf{r}_2\\). We decompose it as:
\\[
\\rho_2(\\mathbf{r}_1, \\mathbf{r}_2) = \\rho(\\mathbf{r}_1)\\rho(\\mathbf{r}_2)\\big[1 + h(\\mathbf{r}_1, \\mathbf{r}_2)\\big],
\\]
where \\(h(\\mathbf{r}_1, \\mathbf{r}_2)\\) is the <em>pair correlation function</em>. This can be split:
<ul>
<li><strong>Fermi hole</strong> (exchange): Present in HF. Ensures \\(\\rho_2^{\\alpha\\alpha}(\\mathbf{r}, \\mathbf{r}) = 0\\) (same-spin electrons cannot coincide).</li>
<li><strong>Coulomb hole</strong> (correlation): Missing in HF. Reduces \\(\\rho_2(\\mathbf{r}_1, \\mathbf{r}_2)\\) for \\(r_{12}\\) small, regardless of spin.</li>
</ul>
</div></div>

<h3>Dynamic vs. Static Correlation</h3>

<div class="env-block definition"><div class="env-title">Definition 7.1.2 — Types of Electron Correlation</div><div class="env-body">
<ul>
<li><strong>Dynamic correlation:</strong> Arises from the instantaneous Coulomb repulsion between electrons. It is a short-range effect: electrons dynamically avoid each other as they move. Present in all systems. Well described by perturbation theory and coupled cluster methods.</li>
<li><strong>Static (nondynamic/strong) correlation:</strong> Arises when two or more electronic configurations (determinants) are nearly degenerate. The HF single-determinant wavefunction is qualitatively wrong; a multi-reference description is needed. Occurs in bond breaking, diradicals, transition metal complexes, and excited states.</li>
</ul>
</div></div>

<div class="env-block example"><div class="env-title">Example 7.1.3 — H\\(_2\\) Dissociation: The Paradigm</div><div class="env-body">
<p>At equilibrium (\\(R \\approx 0.74\\) &Aring;), H\\(_2\\) is well described by a single determinant: \\(|\\sigma_g \\bar{\\sigma}_g|\\). The correlation is purely dynamic.</p>
<p>At dissociation (\\(R \\to \\infty\\)), the exact wavefunction is:</p>
\\[
|\\Psi\\rangle = \\frac{1}{\\sqrt{2}}\\big[|\\sigma_g \\bar{\\sigma}_g| - |\\sigma_u \\bar{\\sigma}_u|\\big],
\\]
<p>which requires two determinants with equal weight. RHF gives \\(|\\sigma_g \\bar{\\sigma}_g|\\) only, which corresponds to 50% H-H + 50% H\\(^+\\)H\\(^-\\), a qualitatively wrong ionic contamination. This is <em>static correlation</em>.</p>
</div></div>

<div class="viz-placeholder" data-viz="viz-h2-dissociation"></div>

<div class="env-block warning"><div class="env-title">Warning — The Correlation Problem Is Hard</div><div class="env-body">
Computing electron correlation exactly (Full CI) scales exponentially with system size. For \\(K\\) basis functions and \\(N\\) electrons, the FCI dimension is \\(\\binom{K}{N/2}^2\\), which grows combinatorially. For a modest system like benzene with a DZ basis (\\(K \\approx 100\\), \\(N = 42\\)), the FCI space has \\(\\sim 10^{30}\\) determinants. Practical correlation methods must make approximations.
</div></div>
`,
            visualizations: [
                {
                    id: 'viz-h2-dissociation',
                    title: 'H\\(_2\\) Dissociation: Dynamic vs. Static Correlation',
                    description: 'The potential energy curve of H\\(_2\\) computed at different levels of theory. RHF fails at dissociation due to missing static correlation. FCI gives the exact result within the basis set.',
                    setup(body, controls) {
                        const viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0, width: 560, height: 400 });
                        const ctx = viz.ctx;

                        function draw() {
                            viz.clear();

                            const px = 70, py = 40, pw = 460, ph = 310;

                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('H₂ Dissociation Curve', px + pw / 2, 25);

                            // Axes
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1.5;
                            ctx.beginPath();
                            ctx.moveTo(px, py);
                            ctx.lineTo(px, py + ph);
                            ctx.lineTo(px + pw, py + ph);
                            ctx.stroke();

                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('R (Angstrom)', px + pw / 2, py + ph + 35);
                            ctx.save();
                            ctx.translate(15, py + ph / 2);
                            ctx.rotate(-Math.PI / 2);
                            ctx.fillText('Energy (hartree)', 0, 0);
                            ctx.restore();

                            // Range: R from 0.4 to 5.0, E from -1.2 to -0.7
                            const rMin = 0.4, rMax = 5.0;
                            const eMin = -1.2, eMax = -0.65;

                            function toSx(r) { return px + (r - rMin) / (rMax - rMin) * pw; }
                            function toSy(e) { return py + ph * (1 - (e - eMin) / (eMax - eMin)); }

                            // Grid
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 0.5;
                            for (let r = 1; r <= 5; r++) {
                                const sx = toSx(r);
                                ctx.beginPath(); ctx.moveTo(sx, py); ctx.lineTo(sx, py + ph); ctx.stroke();
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '9px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText(r.toFixed(0), sx, py + ph + 15);
                            }
                            for (let e = -1.2; e <= -0.7; e += 0.1) {
                                const sy = toSy(e);
                                ctx.beginPath(); ctx.moveTo(px, sy); ctx.lineTo(px + pw, sy); ctx.stroke();
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '9px -apple-system,sans-serif';
                                ctx.textAlign = 'right';
                                ctx.fillText(e.toFixed(1), px - 5, sy + 3);
                            }

                            // Morse-like curves
                            function morse(r, De, re, a, offset) {
                                return De * (1 - Math.exp(-a * (r - re))) * (1 - Math.exp(-a * (r - re))) - De + offset;
                            }

                            function plotCurve(fn, color, lw, dashed) {
                                ctx.strokeStyle = color;
                                ctx.lineWidth = lw || 2;
                                if (dashed) ctx.setLineDash([6, 4]);
                                ctx.beginPath();
                                let started = false;
                                for (let r = rMin; r <= rMax; r += 0.02) {
                                    const e = fn(r);
                                    if (e > eMax || e < eMin) { started = false; continue; }
                                    const sx = toSx(r), sy = toSy(e);
                                    if (!started) { ctx.moveTo(sx, sy); started = true; }
                                    else ctx.lineTo(sx, sy);
                                }
                                ctx.stroke();
                                if (dashed) ctx.setLineDash([]);
                            }

                            // FCI (exact within basis) - proper dissociation to -1.0
                            plotCurve(r => morse(r, 0.175, 0.74, 1.0, -1.175), viz.colors.green, 2.5);

                            // RHF - dissociates too high (~-0.72)
                            plotCurve(r => {
                                const m = morse(r, 0.15, 0.75, 0.95, -1.13);
                                const ionic = 0.4 * Math.exp(-0.5 * r); // ionic contamination correction
                                return r < 1.5 ? m : m + ionic * (r - 1.5) * 0.15;
                            }, viz.colors.red, 2);

                            // MP2
                            plotCurve(r => {
                                if (r > 3.5) return morse(r, 0.19, 0.74, 0.7, -1.19) - 0.03 * Math.exp(-(r - 3.5));
                                return morse(r, 0.19, 0.74, 0.9, -1.19);
                            }, viz.colors.orange, 1.5, true);

                            // CCSD(T)
                            plotCurve(r => {
                                return morse(r, 0.178, 0.74, 0.98, -1.178);
                            }, viz.colors.blue, 1.5, true);

                            // 2E_H reference line
                            ctx.strokeStyle = viz.colors.muted;
                            ctx.lineWidth = 1;
                            ctx.setLineDash([3, 3]);
                            const refY = toSy(-1.0);
                            ctx.beginPath();
                            ctx.moveTo(px, refY);
                            ctx.lineTo(px + pw, refY);
                            ctx.stroke();
                            ctx.setLineDash([]);
                            ctx.fillStyle = viz.colors.muted;
                            ctx.font = '9px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('2 × E(H) = -1.0', px + pw - 100, refY - 6);

                            // Annotations
                            const annX = toSx(3.2);
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillStyle = viz.colors.red;
                            ctx.fillText('RHF (ionic error)', annX, toSy(-0.82));
                            ctx.fillStyle = viz.colors.green;
                            ctx.fillText('FCI (exact)', annX, toSy(-1.0) + 14);
                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillText('MP2', annX + 90, toSy(-1.1));
                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillText('CCSD(T)', annX + 90, toSy(-1.03));

                            // Region labels
                            ctx.fillStyle = viz.colors.teal;
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Dynamic', toSx(0.9), py + 15);
                            ctx.fillText('correlation', toSx(0.9), py + 27);

                            ctx.fillStyle = viz.colors.purple;
                            ctx.fillText('Static correlation', toSx(3.5), py + 15);
                            ctx.fillText('dominates', toSx(3.5), py + 27);

                            // Vertical divider
                            ctx.strokeStyle = viz.colors.muted;
                            ctx.lineWidth = 1;
                            ctx.setLineDash([2, 4]);
                            ctx.beginPath();
                            ctx.moveTo(toSx(2.0), py);
                            ctx.lineTo(toSx(2.0), py + ph);
                            ctx.stroke();
                            ctx.setLineDash([]);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Explain the physical difference between the Fermi hole and the Coulomb hole. Which is included in HF theory?',
                    hint: 'Consider what the Slater determinant enforces about same-spin electrons, and what it misses about opposite-spin electrons.',
                    solution: 'The Fermi hole is the region around each electron where same-spin electrons are excluded, arising from the antisymmetry of the wavefunction (Pauli principle). It is fully captured by the Slater determinant in HF theory. The Coulomb hole is the additional depletion of electron density around each electron due to the Coulomb repulsion, affecting all electron pairs regardless of spin. HF misses the Coulomb hole because it treats electron repulsion only in a mean-field (averaged) way. The correlation energy primarily represents the energetic effect of the missing Coulomb hole.'
                },
                {
                    question: 'Why does the RHF wavefunction for H\\(_2\\) contain ionic terms at dissociation? Write out the RHF determinant in terms of atomic orbitals.',
                    hint: 'Express \\(\\sigma_g = (1s_A + 1s_B)/\\sqrt{2(1+S)}\\) and expand the Slater determinant.',
                    solution: 'The bonding MO is \\(\\sigma_g = c(1s_A + 1s_B)\\). The RHF determinant \\(|\\sigma_g\\bar{\\sigma}_g|\\) expands as \\(c^2[(1s_A\\bar{1s}_A + 1s_A\\bar{1s}_B + 1s_B\\bar{1s}_A + 1s_B\\bar{1s}_B)]\\). The first and last terms are ionic (both electrons on A, or both on B): H\\(^-\\)H\\(^+\\) + H\\(^+\\)H\\(^-\\). The middle terms are covalent: H\\(\\cdot\\)H\\(\\cdot\\). At dissociation, the covalent and ionic contributions have equal weight (50% each), but the ionic terms should vanish for neutral dissociation. This unphysical ionic contamination is the origin of the RHF dissociation error.'
                },
                {
                    question: 'Give three examples of chemical systems where static correlation is important, and explain why in each case.',
                    hint: 'Think about cases where multiple electronic configurations are nearly degenerate.',
                    solution: '(1) <strong>Bond breaking</strong> (e.g., H\\(_2\\) dissociation): The bonding and antibonding configurations become degenerate as \\(R \\to \\infty\\). (2) <strong>Diradicals</strong> (e.g., twisted ethylene, ozone): Two unpaired electrons in nearly degenerate orbitals require at least two determinants. (3) <strong>Transition metal complexes</strong> (e.g., Cr\\(_2\\)): Near-degenerate d-orbitals lead to many configurations with similar energies. Additional examples: excited states with charge-transfer character, molecules near conical intersections, and singlet carbenes.'
                },
                {
                    question: 'The Hartree-Fock energy of He is \\(-2.8617\\) hartree, and the exact nonrelativistic energy is \\(-2.9037\\) hartree. What percentage of the total energy does the correlation energy represent?',
                    hint: 'Compute \\(E_{\\text{corr}} = E_{\\text{exact}} - E_{\\text{HF}}\\) and divide by \\(E_{\\text{exact}}\\).',
                    solution: '\\(E_{\\text{corr}} = -2.9037 - (-2.8617) = -0.0420\\) hartree. As a fraction of the total energy: \\(0.0420/2.9037 = 1.45\\%\\). So HF recovers 98.55% of the total energy but misses 0.042 hartree = 26.3 kcal/mol of correlation energy. This is chemically enormous: bond energies are typically 50-100 kcal/mol, so missing 26 kcal/mol is catastrophic for thermochemistry.'
                },
                {
                    question: 'Why is the correlation energy always negative (i.e., the exact energy is always below the HF energy)?',
                    hint: 'Use the variational principle. Is the HF wavefunction the best possible wavefunction?',
                    solution: 'By the variational principle, the exact ground-state energy is the lowest possible expectation value of the Hamiltonian: \\(E_{\\text{exact}} = \\min_{\\Psi} \\langle \\Psi | \\hat{H} | \\Psi \\rangle\\). The HF energy is the minimum over the restricted space of single Slater determinants: \\(E_{\\text{HF}} = \\min_{\\Phi} \\langle \\Phi | \\hat{H} | \\Phi \\rangle\\). Since the set of single determinants is a subset of all antisymmetric wavefunctions, \\(E_{\\text{exact}} \\leq E_{\\text{HF}}\\), so \\(E_{\\text{corr}} = E_{\\text{exact}} - E_{\\text{HF}} \\leq 0\\).'
                }
            ]
        },

        // ========== SECTION 2: The Correlation Energy ==========
        {
            id: 'sec7-2-correlation-energy',
            title: 'The Correlation Energy',
            content: `
<h2>7.2 The Correlation Energy</h2>

<div class="env-block definition"><div class="env-title">Definition 7.2.1 — Correlation Energy (L&ouml;wdin, 1959)</div><div class="env-body">
The <em>correlation energy</em> is defined as the difference between the exact nonrelativistic energy and the Hartree-Fock energy in the complete basis set (CBS) limit:
\\[
E_{\\text{corr}} = E_{\\text{exact}} - E_{\\text{HF}}^{\\text{CBS}}.
\\]
By the variational principle, \\(E_{\\text{corr}} < 0\\) always.
</div></div>

<div class="env-block remark"><div class="env-title">Remark — Basis Set Incompleteness vs. Correlation</div><div class="env-body">
In practice, both the HF and correlated calculations are performed in a finite basis. The total energy error has two components:
\\[
E_{\\text{exact}} - E(\\text{method/basis}) = \\underbrace{(E_{\\text{exact}} - E_{\\text{HF}}^{\\text{CBS}})}_{\\text{correlation error}} + \\underbrace{(E_{\\text{HF}}^{\\text{CBS}} - E_{\\text{HF}}^{\\text{basis}})}_{\\text{basis set incompleteness}} + \\underbrace{\\text{method error}}_{\\text{correlation truncation}}.
\\]
The HF energy converges quickly with basis set size, but the correlation energy converges slowly (as \\(L^{-3}\\) where \\(L\\) is the angular momentum quantum number of the basis).
</div></div>

<h3>Magnitudes of Correlation Energy</h3>

<div class="env-block example"><div class="env-title">Example 7.2.2 — Correlation Energies of Small Molecules</div><div class="env-body">
<table style="width:100%;border-collapse:collapse;margin:8px 0;">
<tr style="border-bottom:1px solid #30363d;"><th style="text-align:left;padding:4px 8px;">Molecule</th><th style="padding:4px 8px;">\\(E_{\\text{HF}}\\) (hartree)</th><th style="padding:4px 8px;">\\(E_{\\text{corr}}\\) (hartree)</th><th style="padding:4px 8px;">\\(E_{\\text{corr}}\\) (kcal/mol)</th><th style="padding:4px 8px;">% of total</th></tr>
<tr><td style="padding:4px 8px;">He</td><td style="padding:4px 8px;">\\(-2.862\\)</td><td style="padding:4px 8px;">\\(-0.042\\)</td><td style="padding:4px 8px;">\\(-26.3\\)</td><td style="padding:4px 8px;">1.4%</td></tr>
<tr><td style="padding:4px 8px;">H\\(_2\\)O</td><td style="padding:4px 8px;">\\(-76.065\\)</td><td style="padding:4px 8px;">\\(-0.370\\)</td><td style="padding:4px 8px;">\\(-232\\)</td><td style="padding:4px 8px;">0.5%</td></tr>
<tr><td style="padding:4px 8px;">N\\(_2\\)</td><td style="padding:4px 8px;">\\(-108.994\\)</td><td style="padding:4px 8px;">\\(-0.533\\)</td><td style="padding:4px 8px;">\\(-334\\)</td><td style="padding:4px 8px;">0.5%</td></tr>
<tr><td style="padding:4px 8px;">C\\(_6\\)H\\(_6\\)</td><td style="padding:4px 8px;">\\(-230.776\\)</td><td style="padding:4px 8px;">\\(-0.828\\)</td><td style="padding:4px 8px;">\\(-520\\)</td><td style="padding:4px 8px;">0.4%</td></tr>
</table>
The correlation energy is a small fraction of the total energy but is large on a chemical energy scale (1 kcal/mol \\(\\approx\\) 4.2 kJ/mol \\(\\approx\\) 0.0016 hartree).
</div></div>

<div class="env-block definition"><div class="env-title">Definition 7.2.3 — Chemical Accuracy</div><div class="env-body">
<em>Chemical accuracy</em> is conventionally defined as an error of \\(\\pm 1\\) kcal/mol (\\(\\approx 4.2\\) kJ/mol \\(\\approx 0.0016\\) hartree \\(\\approx 43\\) meV) in relative energies (reaction energies, barrier heights, etc.). Achieving this requires recovering a large fraction of the correlation energy, typically 99% or more.
</div></div>

<h3>Scaling of Correlation Energy</h3>

<div class="env-block proposition"><div class="env-title">Proposition 7.2.4</div><div class="env-body">
The correlation energy scales approximately linearly with the number of electron pairs, i.e., it is approximately <em>size-extensive</em>. For \\(N\\) electrons:
\\[
E_{\\text{corr}} \\approx -\\alpha \\cdot \\frac{N(N-1)}{2},
\\]
where \\(\\alpha\\) depends on the system. This extensivity requirement is critical: a correlation method that is not size-extensive will give errors that grow with system size.
</div></div>

<div class="env-block definition"><div class="env-title">Definition 7.2.5 — Size Extensivity and Size Consistency</div><div class="env-body">
<ul>
<li><strong>Size extensive:</strong> The energy scales correctly with the number of particles: \\(E(N) \\propto N\\) for large \\(N\\). Formally, the method must give additive energies for non-interacting subsystems: \\(E(A+B) = E(A) + E(B)\\) when \\(A\\) and \\(B\\) are infinitely separated.</li>
<li><strong>Size consistent:</strong> The energy of a supermolecule dissociates correctly into fragments: \\(E(AB)_{R\\to\\infty} = E(A) + E(B)\\).</li>
</ul>
Size extensivity implies size consistency (but not vice versa in general). HF, MP\\(n\\), and CC methods are size extensive. Truncated CI (CISD, CISDT, ...) is <em>not</em> size extensive.
</div></div>

<div class="viz-placeholder" data-viz="viz-correlation-energies"></div>

<h3>Electron Pair Correlation</h3>

<div class="env-block theorem"><div class="env-title">Theorem 7.2.6 — Pair Natural Orbital Decomposition</div><div class="env-body">
The correlation energy can be decomposed into pair contributions:
\\[
E_{\\text{corr}} = \\sum_{i \\leq j}^{\\text{occ}} \\varepsilon_{ij},
\\]
where \\(\\varepsilon_{ij}\\) is the correlation energy of the electron pair \\((i, j)\\). The largest contributions come from:
<ul>
<li><strong>Same-orbital pairs</strong> (\\(i = j\\), opposite spin): These give the intra-pair correlation energy.</li>
<li><strong>Adjacent pairs</strong> (spatially close occupied orbitals): The inter-pair correlation energy falls off as \\(R^{-6}\\) with distance due to the van der Waals interaction.</li>
</ul>
</div></div>

<div class="env-block remark"><div class="env-title">Remark — Basis Set Convergence of Correlation Energy</div><div class="env-body">
<p>The correlation energy converges slowly with basis set size due to the electron-electron cusp. For a basis with maximum angular momentum \\(L\\):</p>
\\[
E_{\\text{corr}}(L) \\approx E_{\\text{corr}}^{\\text{CBS}} + \\frac{A}{(L + 1/2)^3}.
\\]
<p>This \\(L^{-3}\\) convergence (Schwartz, 1962) means that obtaining the CBS limit from Gaussian basis sets is extremely expensive. Extrapolation using two or more basis sets (e.g., cc-pVTZ and cc-pVQZ) is standard practice.</p>
</div></div>
`,
            visualizations: [
                {
                    id: 'viz-correlation-energies',
                    title: 'Correlation Energy Across the Periodic Table',
                    description: 'Bar chart showing the correlation energy (in hartree) for atoms and small molecules, compared to their total HF energy. The correlation energy is a small fraction of the total but is chemically significant.',
                    setup(body, controls) {
                        const viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0, width: 560, height: 400 });
                        const ctx = viz.ctx;

                        const data = [
                            { name: 'He', ehf: -2.862, ecorr: -0.042 },
                            { name: 'Be', ehf: -14.573, ecorr: -0.094 },
                            { name: 'Ne', ehf: -128.547, ecorr: -0.390 },
                            { name: 'H₂', ehf: -1.133, ecorr: -0.041 },
                            { name: 'H₂O', ehf: -76.065, ecorr: -0.370 },
                            { name: 'N₂', ehf: -108.994, ecorr: -0.533 },
                            { name: 'CO', ehf: -112.791, ecorr: -0.525 },
                            { name: 'F₂', ehf: -198.774, ecorr: -0.746 }
                        ];

                        let showMode = 'absolute';
                        VizEngine.createButton(controls, 'Absolute (hartree)', () => { showMode = 'absolute'; draw(); });
                        VizEngine.createButton(controls, 'kcal/mol', () => { showMode = 'kcal'; draw(); });
                        VizEngine.createButton(controls, '% of total', () => { showMode = 'percent'; draw(); });

                        function draw() {
                            viz.clear();

                            const px = 80, py = 50, pw = 440, ph = 280;

                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            const titles = {
                                absolute: 'Correlation Energy (hartree)',
                                kcal: 'Correlation Energy (kcal/mol)',
                                percent: 'Correlation Energy (% of total)'
                            };
                            ctx.fillText(titles[showMode], px + pw / 2, 25);

                            // Axes
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1.5;
                            ctx.beginPath();
                            ctx.moveTo(px, py);
                            ctx.lineTo(px, py + ph);
                            ctx.lineTo(px + pw, py + ph);
                            ctx.stroke();

                            const barW = pw / data.length * 0.6;
                            const gap = pw / data.length * 0.4;
                            const totalStep = barW + gap;

                            let maxVal;
                            let getVal;
                            if (showMode === 'absolute') {
                                maxVal = 0.8;
                                getVal = d => Math.abs(d.ecorr);
                            } else if (showMode === 'kcal') {
                                maxVal = 500;
                                getVal = d => Math.abs(d.ecorr) * 627.51;
                            } else {
                                maxVal = 3.5;
                                getVal = d => Math.abs(d.ecorr) / Math.abs(d.ehf + d.ecorr) * 100;
                            }

                            // Y ticks
                            const nTicks = 5;
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '9px -apple-system,sans-serif';
                            ctx.textAlign = 'right';
                            for (let i = 0; i <= nTicks; i++) {
                                const val = maxVal * i / nTicks;
                                const sy = py + ph - (val / maxVal) * ph;
                                ctx.fillText(showMode === 'kcal' ? val.toFixed(0) : val.toFixed(showMode === 'percent' ? 1 : 2), px - 5, sy + 3);
                                ctx.strokeStyle = viz.colors.grid;
                                ctx.lineWidth = 0.5;
                                ctx.beginPath();
                                ctx.moveTo(px, sy);
                                ctx.lineTo(px + pw, sy);
                                ctx.stroke();
                            }

                            // Bars
                            data.forEach((d, i) => {
                                const val = getVal(d);
                                const barH = (val / maxVal) * ph;
                                const x = px + i * totalStep + gap / 2;
                                const y = py + ph - barH;

                                // Gradient bar
                                const grad = ctx.createLinearGradient(x, y, x, py + ph);
                                grad.addColorStop(0, viz.colors.blue);
                                grad.addColorStop(1, viz.colors.teal + '44');
                                ctx.fillStyle = grad;
                                ctx.fillRect(x, y, barW, barH);

                                // Border
                                ctx.strokeStyle = viz.colors.blue;
                                ctx.lineWidth = 1;
                                ctx.strokeRect(x, y, barW, barH);

                                // Label
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '10px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText(d.name, x + barW / 2, py + ph + 15);

                                // Value
                                ctx.fillStyle = viz.colors.white;
                                ctx.font = '9px -apple-system,sans-serif';
                                const valText = showMode === 'kcal' ? val.toFixed(0) :
                                               showMode === 'percent' ? val.toFixed(1) + '%' :
                                               val.toFixed(3);
                                ctx.fillText(valText, x + barW / 2, y - 6);
                            });

                            // Chemical accuracy line (only in kcal mode)
                            if (showMode === 'kcal') {
                                const caY = py + ph - (1 / maxVal) * ph;
                                ctx.strokeStyle = viz.colors.yellow;
                                ctx.lineWidth = 1.5;
                                ctx.setLineDash([4, 4]);
                                ctx.beginPath();
                                ctx.moveTo(px, caY);
                                ctx.lineTo(px + pw, caY);
                                ctx.stroke();
                                ctx.setLineDash([]);
                                ctx.fillStyle = viz.colors.yellow;
                                ctx.font = '9px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.fillText('Chemical accuracy (1 kcal/mol)', px + 5, caY - 6);
                            }
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Explain why truncated CI (e.g., CISD) is not size extensive, using the example of two non-interacting He atoms.',
                    hint: 'Consider what CISD includes for He + He versus the He dimer at infinite separation.',
                    solution: 'For a single He atom, CISD includes all excitations (single and double), which is equivalent to FCI for 2 electrons. For two non-interacting He atoms, CISD of the 4-electron system includes singles and doubles but misses <em>quadruple</em> excitations that are products of double excitations on each atom independently: \\(|\\Phi_{\\text{He}_A}^{\\text{double}}\\rangle \\otimes |\\Phi_{\\text{He}_B}^{\\text{double}}\\rangle\\). Therefore \\(E_{\\text{CISD}}(\\text{He}_2) \\neq 2E_{\\text{CISD}}(\\text{He})\\). The missing disconnected quadruples make CISD non-size-extensive. The error grows linearly with the number of subsystems.'
                },
                {
                    question: 'Using the \\(L^{-3}\\) convergence formula, estimate the CBS limit correlation energy given \\(E_{\\text{corr}}(\\text{cc-pVDZ}) = -0.200\\) hartree and \\(E_{\\text{corr}}(\\text{cc-pVTZ}) = -0.250\\) hartree (where DZ has \\(L=2\\), TZ has \\(L=3\\)).',
                    hint: 'Set up two equations: \\(E(L) = E_{\\text{CBS}} + A/(L + 1/2)^3\\) for \\(L = 2\\) and \\(L = 3\\).',
                    solution: 'Two equations: \\(-0.200 = E_{\\text{CBS}} + A/(2.5)^3 = E_{\\text{CBS}} + A/15.625\\) and \\(-0.250 = E_{\\text{CBS}} + A/(3.5)^3 = E_{\\text{CBS}} + A/42.875\\). Subtracting: \\(0.050 = A(1/15.625 - 1/42.875) = A(0.0640 - 0.0233) = 0.0407A\\), so \\(A = 1.229\\). Then \\(E_{\\text{CBS}} = -0.200 - 1.229/15.625 = -0.200 - 0.0787 = -0.279\\) hartree. The CBS extrapolation adds about 29 millihartree beyond the TZ value.'
                },
                {
                    question: 'Why does the correlation energy converge as \\(L^{-3}\\) rather than exponentially with basis set size?',
                    hint: 'Consider the electron-electron cusp condition: the exact wavefunction has a cusp (discontinuous first derivative) when \\(r_{12} \\to 0\\).',
                    solution: 'When two electrons approach each other (\\(r_{12} \\to 0\\)), the exact wavefunction satisfies the Kato cusp condition: \\(\\partial \\Psi/\\partial r_{12}|_{r_{12}=0} = \\frac{1}{2}\\Psi(r_{12}=0)\\). This cusp is a discontinuity in the first derivative that requires very high angular momentum functions to represent. Gaussian basis functions are smooth (infinitely differentiable) and converge slowly to the cusp. The partial-wave expansion of \\(1/r_{12}\\) in terms of Legendre polynomials leads to the \\(L^{-3}\\) convergence. Methods like F12/R12 that include explicit \\(r_{12}\\) dependence bypass this problem and converge much faster.'
                },
                {
                    question: 'The correlation energy of N\\(_2\\) is \\(-0.533\\) hartree. If CCSD(T)/cc-pVTZ recovers 95% of this, what is the error in kcal/mol? Is this within chemical accuracy?',
                    hint: '1 hartree = 627.51 kcal/mol.',
                    solution: 'The recovered correlation energy is \\(0.95 \\times 0.533 = 0.506\\) hartree. The missing correlation energy is \\(0.533 - 0.506 = 0.027\\) hartree = \\(0.027 \\times 627.51 = 16.7\\) kcal/mol. This is far outside chemical accuracy (1 kcal/mol). However, for <em>relative</em> energies (e.g., bond energies), much of this error cancels between reactants and products. The atomization energy error would be much smaller because the correlation energy errors for N\\(_2\\) and 2N partially cancel.'
                },
                {
                    question: 'Prove that the HF method is size extensive: for two non-interacting systems \\(A\\) and \\(B\\), \\(E_{\\text{HF}}(A + B) = E_{\\text{HF}}(A) + E_{\\text{HF}}(B)\\).',
                    hint: 'Show that the Slater determinant for the combined system factorizes, and the energy expression is additive.',
                    solution: 'For non-interacting \\(A\\) and \\(B\\), the Hamiltonian is \\(\\hat{H} = \\hat{H}_A + \\hat{H}_B\\) with no cross terms. The optimal HF determinant for \\(A+B\\) has orbitals localized on \\(A\\) or \\(B\\): \\(|\\Phi_{AB}\\rangle = |\\phi_1^A \\cdots \\phi_a^A \\phi_1^B \\cdots \\phi_b^B\\rangle\\). Because orbitals on \\(A\\) and \\(B\\) are orthogonal (no overlap at infinite separation), all cross-system Coulomb and exchange integrals vanish: \\(J_{ij}^{AB} = K_{ij}^{AB} = 0\\). The energy becomes \\(E = \\langle \\Phi_{AB}|\\hat{H}_A|\\Phi_{AB}\\rangle + \\langle \\Phi_{AB}|\\hat{H}_B|\\Phi_{AB}\\rangle = E_{\\text{HF}}(A) + E_{\\text{HF}}(B)\\).'
                }
            ]
        },

        // ========== SECTION 3: Second Quantization ==========
        {
            id: 'sec7-3-second-quantization',
            title: 'Second Quantization',
            content: `
<h2>7.3 Second Quantization</h2>

<p>To build correlated wavefunctions systematically, we need an algebraic framework for manipulating Slater determinants. Second quantization provides this through creation and annihilation operators, turning many-body quantum mechanics into operator algebra.</p>

<div class="env-block definition"><div class="env-title">Definition 7.3.1 — Creation and Annihilation Operators</div><div class="env-body">
For each spin-orbital \\(\\phi_p\\), define:
<ul>
<li><strong>Creation operator</strong> \\(a_p^\\dagger\\): Adds an electron to spin-orbital \\(p\\). Acting on a determinant that does not contain \\(p\\): \\(a_p^\\dagger |\\cdots\\rangle = |p\\cdots\\rangle\\). If \\(p\\) is already occupied: \\(a_p^\\dagger |\\cdots p \\cdots\\rangle = 0\\).</li>
<li><strong>Annihilation operator</strong> \\(a_p\\): Removes an electron from spin-orbital \\(p\\). \\(a_p |\\cdots p \\cdots\\rangle = \\pm|\\cdots\\rangle\\). If \\(p\\) is not occupied: \\(a_p |\\cdots\\rangle = 0\\).</li>
</ul>
These are the adjoints of each other: \\((a_p^\\dagger)^\\dagger = a_p\\).
</div></div>

<div class="env-block theorem"><div class="env-title">Theorem 7.3.2 — Anticommutation Relations</div><div class="env-body">
The creation and annihilation operators satisfy the fermionic anticommutation relations:
\\[
\\{a_p^\\dagger, a_q^\\dagger\\} = 0, \\qquad \\{a_p, a_q\\} = 0, \\qquad \\{a_p, a_q^\\dagger\\} = \\delta_{pq},
\\]
where \\(\\{A, B\\} = AB + BA\\) is the anticommutator. These relations encode the Pauli exclusion principle algebraically.
</div></div>

<div class="env-block proof"><div class="env-title">Proof (Sketch)</div><div class="env-body">
<p>The relation \\(\\{a_p^\\dagger, a_q^\\dagger\\} = 0\\) means \\(a_p^\\dagger a_q^\\dagger = -a_q^\\dagger a_p^\\dagger\\). Acting on a state: creating electron in \\(q\\) then \\(p\\) gives the same determinant as creating \\(p\\) then \\(q\\), but with opposite sign (swapping two columns of a determinant). In particular, \\(a_p^\\dagger a_p^\\dagger = 0\\): you cannot place two electrons in the same spin-orbital (Pauli principle).</p>
<p>For \\(\\{a_p, a_q^\\dagger\\} = \\delta_{pq}\\): if \\(p = q\\), \\(a_p a_p^\\dagger + a_p^\\dagger a_p = 1\\) because \\(a_p a_p^\\dagger\\) gives 1 on an empty orbital and 0 on an occupied one, while \\(a_p^\\dagger a_p\\) (the number operator) gives 0 on empty and 1 on occupied. Their sum is always 1.</p>
<div class="qed">∎</div>
</div></div>

<h3>Slater Determinants in Second Quantization</h3>

<div class="env-block definition"><div class="env-title">Definition 7.3.3 — Vacuum and Determinants</div><div class="env-body">
The <em>vacuum state</em> \\(|\\text{vac}\\rangle\\) contains no electrons: \\(a_p |\\text{vac}\\rangle = 0\\) for all \\(p\\). A Slater determinant is built by acting with creation operators:
\\[
|\\phi_1 \\phi_2 \\cdots \\phi_N\\rangle = a_1^\\dagger a_2^\\dagger \\cdots a_N^\\dagger |\\text{vac}\\rangle.
\\]
The <em>Hartree-Fock reference</em> (ground state) is:
\\[
|\\Phi_0\\rangle = \\prod_{i=1}^{N} a_i^\\dagger |\\text{vac}\\rangle,
\\]
where the product runs over the \\(N\\) occupied spin-orbitals.
</div></div>

<h3>Operators in Second Quantization</h3>

<div class="env-block theorem"><div class="env-title">Theorem 7.3.4 — One- and Two-Electron Operators</div><div class="env-body">
Any one-electron operator \\(\\hat{O}_1 = \\sum_i \\hat{h}(i)\\) and two-electron operator \\(\\hat{O}_2 = \\sum_{i < j} \\hat{g}(i,j)\\) can be written in second quantization as:
\\[
\\hat{O}_1 = \\sum_{pq} h_{pq}\\, a_p^\\dagger a_q, \\qquad
\\hat{O}_2 = \\frac{1}{2} \\sum_{pqrs} \\langle pq | rs \\rangle\\, a_p^\\dagger a_q^\\dagger a_s a_r,
\\]
where \\(h_{pq} = \\langle p | \\hat{h} | q \\rangle\\) and \\(\\langle pq|rs\\rangle\\) are one- and two-electron integrals. Note the reversed order of the annihilation operators (\\(a_s a_r\\), not \\(a_r a_s\\)) due to the anticommutation.
</div></div>

<div class="env-block definition"><div class="env-title">Definition 7.3.5 — The Electronic Hamiltonian</div><div class="env-body">
The full electronic Hamiltonian in second quantization is:
\\[
\\hat{H} = \\sum_{pq} h_{pq}\\, a_p^\\dagger a_q + \\frac{1}{2} \\sum_{pqrs} \\langle pq \\| rs \\rangle\\, a_p^\\dagger a_q^\\dagger a_s a_r + V_{\\text{nuc}},
\\]
where \\(\\langle pq \\| rs \\rangle = \\langle pq|rs\\rangle - \\langle pq|sr\\rangle\\) are the antisymmetrized two-electron integrals.
</div></div>

<h3>Excited Determinants</h3>

<div class="env-block definition"><div class="env-title">Definition 7.3.6 — Excitation Operators</div><div class="env-body">
<p>We use the convention that indices \\(i, j, k, \\ldots\\) label occupied (hole) orbitals and \\(a, b, c, \\ldots\\) label virtual (particle) orbitals. Excited determinants are constructed by replacing occupied orbitals with virtual ones:</p>
<ul>
<li><strong>Single excitation:</strong> \\(|\\Phi_i^a\\rangle = a_a^\\dagger a_i |\\Phi_0\\rangle\\) (promote electron from \\(i\\) to \\(a\\))</li>
<li><strong>Double excitation:</strong> \\(|\\Phi_{ij}^{ab}\\rangle = a_a^\\dagger a_b^\\dagger a_j a_i |\\Phi_0\\rangle\\) (promote from \\(i,j\\) to \\(a,b\\))</li>
<li><strong>General:</strong> \\(|\\Phi_{ij\\cdots}^{ab\\cdots}\\rangle\\) with the corresponding string of creation and annihilation operators.</li>
</ul>
</div></div>

<div class="env-block theorem"><div class="env-title">Theorem 7.3.7 — Brillouin's Theorem</div><div class="env-body">
For a converged Hartree-Fock reference \\(|\\Phi_0\\rangle\\):
\\[
\\langle \\Phi_i^a | \\hat{H} | \\Phi_0 \\rangle = F_{ai} = 0,
\\]
where \\(F_{ai}\\) is the occupied-virtual block of the Fock matrix. That is, singly excited determinants do not interact directly with the HF reference. Singles contribute to correlation only indirectly, through their coupling with doubles.
</div></div>

<div class="env-block proof"><div class="env-title">Proof</div><div class="env-body">
<p>By Slater's rules (or the second-quantization expression for \\(\\hat{H}\\)), the matrix element \\(\\langle \\Phi_i^a | \\hat{H} | \\Phi_0 \\rangle\\) reduces to the Fock matrix element \\(F_{ai}\\). At HF convergence, the Fock matrix is diagonal in the canonical MO basis: \\(F_{pq} = \\varepsilon_p \\delta_{pq}\\). For \\(a\\) (virtual) \\(\\neq i\\) (occupied), \\(F_{ai} = 0\\).</p>
<div class="qed">∎</div>
</div></div>

<div class="env-block remark"><div class="env-title">Remark — Normal Ordering and Wick's Theorem</div><div class="env-body">
Practical calculations in second quantization rely on <em>normal ordering</em> (all creation operators to the left of annihilation operators, relative to the Fermi vacuum \\(|\\Phi_0\\rangle\\)) and <em>Wick's theorem</em> (which expresses time-ordered products as sums of normal-ordered products with contractions). These tools are essential for deriving the working equations of MP2, CCSD, and other correlation methods. A full treatment is deferred to Chapters 9 and 10.
</div></div>
`,
            exercises: [
                {
                    question: 'Verify the anticommutation relation \\(\\{a_p, a_p^\\dagger\\} = 1\\) by acting on the two possible states of spin-orbital \\(p\\): occupied and unoccupied.',
                    hint: 'Compute \\(a_p a_p^\\dagger |0_p\\rangle\\) and \\(a_p^\\dagger a_p |0_p\\rangle\\) for unoccupied, then \\(a_p a_p^\\dagger |1_p\\rangle\\) and \\(a_p^\\dagger a_p |1_p\\rangle\\) for occupied.',
                    solution: 'Unoccupied state \\(|0_p\\rangle\\): \\(a_p a_p^\\dagger |0_p\\rangle = a_p |1_p\\rangle = |0_p\\rangle\\) and \\(a_p^\\dagger a_p |0_p\\rangle = a_p^\\dagger \\cdot 0 = 0\\). Sum: \\(|0_p\\rangle = 1 \\cdot |0_p\\rangle\\). Occupied state \\(|1_p\\rangle\\): \\(a_p a_p^\\dagger |1_p\\rangle = a_p \\cdot 0 = 0\\) and \\(a_p^\\dagger a_p |1_p\\rangle = a_p^\\dagger |0_p\\rangle = |1_p\\rangle\\). Sum: \\(|1_p\\rangle = 1 \\cdot |1_p\\rangle\\). In both cases, \\(\\{a_p, a_p^\\dagger\\} = 1\\).'
                },
                {
                    question: 'Express the Hartree-Fock energy \\(E_0 = \\langle \\Phi_0 | \\hat{H} | \\Phi_0 \\rangle\\) in terms of one- and two-electron integrals using second quantization.',
                    hint: 'Use Wick\'s theorem or Slater\'s rules. Only fully contracted terms survive when taking the expectation value in the reference.',
                    solution: 'Using the second-quantized Hamiltonian and evaluating in the reference: \\(E_0 = \\sum_i h_{ii} + \\frac{1}{2}\\sum_{ij} \\langle ij \\| ij \\rangle + V_{\\text{nuc}} = \\sum_i h_{ii} + \\frac{1}{2}\\sum_{ij}(\\langle ij|ij\\rangle - \\langle ij|ji\\rangle) + V_{\\text{nuc}}\\). The one-electron sum runs over occupied spin-orbitals, and the two-electron sum runs over all pairs of occupied spin-orbitals. In spatial orbitals: \\(E_0 = 2\\sum_i h_{ii} + \\sum_{ij}(2J_{ij} - K_{ij}) + V_{\\text{nuc}}\\).'
                },
                {
                    question: 'Show that the number operator \\(\\hat{n}_p = a_p^\\dagger a_p\\) has eigenvalues 0 and 1 only.',
                    hint: 'Use the anticommutation relation \\(a_p a_p^\\dagger + a_p^\\dagger a_p = 1\\) and the fact that \\(a_p^\\dagger a_p^\\dagger = 0\\).',
                    solution: 'Let \\(\\hat{n} = a^\\dagger a\\). Compute \\(\\hat{n}^2 = a^\\dagger a a^\\dagger a = a^\\dagger(1 - a^\\dagger a)a = a^\\dagger a - a^\\dagger a^\\dagger a a = \\hat{n} - 0 = \\hat{n}\\), using \\(a^\\dagger a^\\dagger = 0\\). So \\(\\hat{n}^2 = \\hat{n}\\), meaning \\(\\hat{n}(\\hat{n} - 1) = 0\\). The eigenvalues \\(n\\) satisfy \\(n(n-1) = 0\\), giving \\(n = 0\\) or \\(n = 1\\). This is the Pauli exclusion principle: each spin-orbital can hold 0 or 1 electrons.'
                },
                {
                    question: 'Using second quantization, prove Brillouin\'s theorem: \\(\\langle \\Phi_i^a | \\hat{H} | \\Phi_0 \\rangle = F_{ai}\\) where \\(F\\) is the Fock matrix.',
                    hint: 'Express \\(|\\Phi_i^a\\rangle = a_a^\\dagger a_i |\\Phi_0\\rangle\\) and evaluate the matrix element using Slater-Condon rules for determinants differing by one orbital.',
                    solution: 'For determinants differing by one spin-orbital (\\(i \\to a\\)), the Slater-Condon rules give: \\(\\langle \\Phi_i^a | \\hat{H} | \\Phi_0 \\rangle = h_{ai} + \\sum_j \\langle aj \\| ij \\rangle = h_{ai} + \\sum_j(\\langle aj|ij\\rangle - \\langle aj|ji\\rangle)\\). This is exactly the definition of the Fock matrix element \\(F_{ai} = h_{ai} + \\sum_j(J_{aj,ij} - K_{aj,ji})\\). At HF convergence, \\(F_{ai} = 0\\) for all occupied \\(i\\) and virtual \\(a\\), proving Brillouin\'s theorem.'
                },
                {
                    question: 'Write the doubly-excited determinant \\(|\\Phi_{12}^{34}\\rangle\\) (promoting electrons from orbitals 1 and 2 to orbitals 3 and 4) using creation and annihilation operators acting on \\(|\\Phi_0\\rangle = a_1^\\dagger a_2^\\dagger |\\text{vac}\\rangle\\). Verify the sign.',
                    hint: 'The double excitation operator is \\(a_3^\\dagger a_4^\\dagger a_2 a_1\\). Be careful with the ordering and signs from anticommutation.',
                    solution: '\\(|\\Phi_{12}^{34}\\rangle = a_3^\\dagger a_4^\\dagger a_2 a_1 |\\Phi_0\\rangle = a_3^\\dagger a_4^\\dagger a_2 a_1 a_1^\\dagger a_2^\\dagger |\\text{vac}\\rangle\\). Computing: \\(a_1 a_1^\\dagger = 1 - a_1^\\dagger a_1\\), and since \\(a_1|\\text{vac}\\rangle = 0\\), we get \\(a_1 a_1^\\dagger |\\text{vac}\\rangle = |\\text{vac}\\rangle\\). But we must be careful: \\(a_2 a_1 a_1^\\dagger a_2^\\dagger |\\text{vac}\\rangle = a_2 (1 - a_1^\\dagger a_1) a_2^\\dagger |\\text{vac}\\rangle = a_2 a_2^\\dagger |\\text{vac}\\rangle = |\\text{vac}\\rangle\\). So \\(|\\Phi_{12}^{34}\\rangle = a_3^\\dagger a_4^\\dagger |\\text{vac}\\rangle\\), which is the determinant with orbitals 3 and 4 occupied.'
                }
            ]
        },

        // ========== SECTION 4: The Coupled Cluster Hierarchy ==========
        {
            id: 'sec7-4-cc-hierarchy',
            title: 'The Coupled Cluster Hierarchy',
            content: `
<h2>7.4 The Coupled Cluster Hierarchy</h2>

<p>Post-Hartree-Fock methods form a hierarchy of increasingly accurate (and expensive) approximations to the exact correlation energy. Understanding this hierarchy is essential for choosing the right method for a given problem.</p>

<div class="env-block definition"><div class="env-title">Definition 7.4.1 — The Correlation Hierarchy</div><div class="env-body">
Starting from the HF reference, the main post-HF methods in order of increasing accuracy and cost:
\\[
\\text{HF} \\subset \\text{MP2} \\subset \\text{CCSD} \\subset \\text{CCSD(T)} \\subset \\text{CCSDT} \\subset \\cdots \\subset \\text{FCI}
\\]
<ul>
<li><strong>HF:</strong> No correlation. Cost: \\(\\mathcal{O}(K^4)\\) (conventional) or \\(\\mathcal{O}(K^3)\\) (DF-HF). Error: 10-50 kcal/mol for reaction energies.</li>
<li><strong>MP2:</strong> Second-order perturbation theory. Includes double excitations perturbatively. Cost: \\(\\mathcal{O}(K^5)\\). Recovers ~80-90% of correlation energy.</li>
<li><strong>CCSD:</strong> Coupled cluster with singles and doubles. Cost: \\(\\mathcal{O}(K^6)\\). Recovers ~95% of correlation energy.</li>
<li><strong>CCSD(T):</strong> CCSD with perturbative triples. Cost: \\(\\mathcal{O}(K^7)\\). The "gold standard" of quantum chemistry. Typically within 1 kcal/mol of experiment.</li>
<li><strong>CCSDT:</strong> Full iterative triples. Cost: \\(\\mathcal{O}(K^8)\\).</li>
<li><strong>FCI:</strong> Full configuration interaction (exact within the basis). Cost: exponential in \\(K\\).</li>
</ul>
</div></div>

<h3>MP2: The Simplest Correlation Method</h3>

<div class="env-block theorem"><div class="env-title">Theorem 7.4.2 — MP2 Energy Expression</div><div class="env-body">
The second-order M&oslash;ller-Plesset correlation energy is:
\\[
E_{\\text{MP2}} = \\sum_{i < j}^{\\text{occ}} \\sum_{a < b}^{\\text{virt}} \\frac{|\\langle ij \\| ab \\rangle|^2}{\\varepsilon_i + \\varepsilon_j - \\varepsilon_a - \\varepsilon_b},
\\]
or equivalently in spin-orbital form:
\\[
E_{\\text{MP2}} = \\frac{1}{4} \\sum_{ijab} \\frac{|\\langle ij \\| ab \\rangle|^2}{\\varepsilon_i + \\varepsilon_j - \\varepsilon_a - \\varepsilon_b}.
\\]
The denominator is always negative (occupied energies are lower than virtual energies), so \\(E_{\\text{MP2}} < 0\\).
</div></div>

<div class="env-block remark"><div class="env-title">Remark — Why MP2 Works</div><div class="env-body">
MP2 captures the leading contribution to the correlation energy: pair correlations between occupied electrons excited into virtual orbitals. The double excitations \\(|\\Phi_{ij}^{ab}\\rangle\\) are the dominant contributors to the correlation energy (singles do not contribute by Brillouin's theorem, and higher excitations enter at higher perturbative order). MP2 is size extensive but can overestimate correlation for small-gap systems.
</div></div>

<h3>Coupled Cluster Theory</h3>

<div class="env-block definition"><div class="env-title">Definition 7.4.3 — The Coupled Cluster Ansatz</div><div class="env-body">
The coupled cluster wavefunction is:
\\[
|\\Psi_{\\text{CC}}\\rangle = e^{\\hat{T}} |\\Phi_0\\rangle,
\\]
where \\(\\hat{T} = \\hat{T}_1 + \\hat{T}_2 + \\cdots\\) is the cluster operator:
\\[
\\hat{T}_1 = \\sum_{ia} t_i^a\\, a_a^\\dagger a_i, \\qquad
\\hat{T}_2 = \\frac{1}{4}\\sum_{ijab} t_{ij}^{ab}\\, a_a^\\dagger a_b^\\dagger a_j a_i, \\qquad \\ldots
\\]
The amplitudes \\(t_i^a, t_{ij}^{ab}, \\ldots\\) are determined by the CC equations. The exponential ansatz ensures size extensivity.
</div></div>

<div class="env-block theorem"><div class="env-title">Theorem 7.4.4 — Size Extensivity of Coupled Cluster</div><div class="env-body">
The CC energy is size extensive because the exponential parametrization factorizes for non-interacting subsystems:
\\[
e^{\\hat{T}_A + \\hat{T}_B} = e^{\\hat{T}_A} e^{\\hat{T}_B}
\\]
when \\([\\hat{T}_A, \\hat{T}_B] = 0\\) (operators on different subsystems commute). This gives \\(E_{\\text{CC}}(A+B) = E_{\\text{CC}}(A) + E_{\\text{CC}}(B)\\).
</div></div>

<div class="env-block definition"><div class="env-title">Definition 7.4.5 — The CCSD(T) Method</div><div class="env-body">
<p>CCSD(T) combines iterative treatment of singles and doubles with a perturbative estimate of triples:</p>
\\[
E_{\\text{CCSD(T)}} = E_{\\text{CCSD}} + E_{\\text{(T)}},
\\]
<p>where \\(E_{\\text{(T)}}\\) is a noniterative \\(\\mathcal{O}(K^7)\\) correction. CCSD(T) is called the "gold standard" because it typically achieves chemical accuracy (1 kcal/mol) for single-reference systems at a manageable computational cost.</p>
</div></div>

<div class="viz-placeholder" data-viz="viz-method-accuracy"></div>

<h3>Configuration Interaction</h3>

<div class="env-block definition"><div class="env-title">Definition 7.4.6 — CI Wavefunction</div><div class="env-body">
The CI wavefunction is a linear expansion in excited determinants:
\\[
|\\Psi_{\\text{CI}}\\rangle = c_0 |\\Phi_0\\rangle + \\sum_{ia} c_i^a |\\Phi_i^a\\rangle + \\sum_{i<j,a<b} c_{ij}^{ab} |\\Phi_{ij}^{ab}\\rangle + \\cdots
\\]
Truncating at doubles gives CISD; including all excitations gives FCI (exact within the basis). Unlike CC, truncated CI is <em>not</em> size extensive.
</div></div>

<div class="env-block warning"><div class="env-title">Warning — CI vs. CC</div><div class="env-body">
CISD and CCSD both include singles and doubles, but CCSD is far more accurate because:
<ul>
<li>The exponential ansatz \\(e^{\\hat{T}_1 + \\hat{T}_2}\\) generates <em>disconnected</em> quadruples, hextuples, etc. (e.g., \\(\\frac{1}{2}\\hat{T}_2^2\\) gives disconnected quadruples). CISD misses these entirely.</li>
<li>CCSD is size extensive; CISD is not.</li>
<li>For 10 water molecules, the CISD error would be roughly 10 times worse than for 1 water molecule. The CCSD error stays constant per molecule.</li>
</ul>
</div></div>
`,
            visualizations: [
                {
                    id: 'viz-method-accuracy',
                    title: 'Method Accuracy Comparison',
                    description: 'Mean absolute error (MAE) of different quantum chemistry methods on standard benchmark sets, showing the convergence toward chemical accuracy. The "gold standard" CCSD(T)/CBS is highlighted.',
                    setup(body, controls) {
                        const viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0, width: 560, height: 400 });
                        const ctx = viz.ctx;

                        let benchmark = 'thermo';
                        VizEngine.createButton(controls, 'Thermochemistry', () => { benchmark = 'thermo'; draw(); });
                        VizEngine.createButton(controls, 'Barrier Heights', () => { benchmark = 'barrier'; draw(); });
                        VizEngine.createButton(controls, 'Weak Interactions', () => { benchmark = 'weak'; draw(); });

                        const datasets = {
                            thermo: {
                                title: 'Atomization Energies (MAE, kcal/mol)',
                                data: [
                                    { method: 'HF', mae: 32.0, color: '#f85149' },
                                    { method: 'MP2', mae: 5.2, color: '#f0883e' },
                                    { method: 'CISD', mae: 8.5, color: '#d29922' },
                                    { method: 'CCSD', mae: 2.8, color: '#58a6ff' },
                                    { method: 'CCSD(T)', mae: 0.7, color: '#3fb950' },
                                    { method: 'CCSDT(Q)', mae: 0.15, color: '#3fb9a0' },
                                    { method: 'FCI', mae: 0.0, color: '#bc8cff' }
                                ],
                                maxY: 35
                            },
                            barrier: {
                                title: 'Barrier Heights (MAE, kcal/mol)',
                                data: [
                                    { method: 'HF', mae: 14.0, color: '#f85149' },
                                    { method: 'MP2', mae: 3.5, color: '#f0883e' },
                                    { method: 'CISD', mae: 5.0, color: '#d29922' },
                                    { method: 'CCSD', mae: 1.8, color: '#58a6ff' },
                                    { method: 'CCSD(T)', mae: 0.5, color: '#3fb950' },
                                    { method: 'CCSDT(Q)', mae: 0.1, color: '#3fb9a0' },
                                    { method: 'FCI', mae: 0.0, color: '#bc8cff' }
                                ],
                                maxY: 16
                            },
                            weak: {
                                title: 'Weak Interactions (MAE, kcal/mol)',
                                data: [
                                    { method: 'HF', mae: 3.0, color: '#f85149' },
                                    { method: 'MP2', mae: 0.8, color: '#f0883e' },
                                    { method: 'CISD', mae: 1.5, color: '#d29922' },
                                    { method: 'CCSD', mae: 0.5, color: '#58a6ff' },
                                    { method: 'CCSD(T)', mae: 0.12, color: '#3fb950' },
                                    { method: 'CCSDT(Q)', mae: 0.03, color: '#3fb9a0' },
                                    { method: 'FCI', mae: 0.0, color: '#bc8cff' }
                                ],
                                maxY: 3.5
                            }
                        };

                        function draw() {
                            viz.clear();
                            const ds = datasets[benchmark];
                            const data = ds.data;

                            const px = 80, py = 50, pw = 430, ph = 280;

                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText(ds.title, px + pw / 2, 25);

                            // Axes
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1.5;
                            ctx.beginPath();
                            ctx.moveTo(px, py);
                            ctx.lineTo(px, py + ph);
                            ctx.lineTo(px + pw, py + ph);
                            ctx.stroke();

                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center';

                            const maxY = ds.maxY;
                            const barW = pw / data.length * 0.55;
                            const step = pw / data.length;

                            // Y axis ticks
                            const nTick = 5;
                            ctx.textAlign = 'right';
                            ctx.font = '9px -apple-system,sans-serif';
                            for (let i = 0; i <= nTick; i++) {
                                const val = maxY * i / nTick;
                                const sy = py + ph - (val / maxY) * ph;
                                ctx.fillStyle = viz.colors.text;
                                ctx.fillText(val.toFixed(val < 1 ? 1 : 0), px - 5, sy + 3);
                                ctx.strokeStyle = viz.colors.grid;
                                ctx.lineWidth = 0.5;
                                ctx.beginPath();
                                ctx.moveTo(px, sy);
                                ctx.lineTo(px + pw, sy);
                                ctx.stroke();
                            }

                            // Chemical accuracy line
                            const caY = py + ph - (1.0 / maxY) * ph;
                            if (caY > py && caY < py + ph) {
                                ctx.strokeStyle = viz.colors.yellow;
                                ctx.lineWidth = 1.5;
                                ctx.setLineDash([5, 5]);
                                ctx.beginPath();
                                ctx.moveTo(px, caY);
                                ctx.lineTo(px + pw, caY);
                                ctx.stroke();
                                ctx.setLineDash([]);
                                ctx.fillStyle = viz.colors.yellow;
                                ctx.font = '9px -apple-system,sans-serif';
                                ctx.textAlign = 'right';
                                ctx.fillText('Chemical accuracy', px + pw - 5, caY - 6);
                            }

                            // Bars
                            data.forEach((d, i) => {
                                const x = px + i * step + (step - barW) / 2;
                                const barH = Math.max(1, (d.mae / maxY) * ph);
                                const y = py + ph - barH;

                                const grad = ctx.createLinearGradient(x, y, x, py + ph);
                                grad.addColorStop(0, d.color);
                                grad.addColorStop(1, d.color + '44');
                                ctx.fillStyle = grad;
                                ctx.fillRect(x, y, barW, barH);

                                ctx.strokeStyle = d.color;
                                ctx.lineWidth = 1;
                                ctx.strokeRect(x, y, barW, barH);

                                // Label
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '9px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.save();
                                ctx.translate(x + barW / 2, py + ph + 20);
                                ctx.rotate(-0.4);
                                ctx.fillText(d.method, 0, 0);
                                ctx.restore();

                                // Value
                                if (d.mae > 0) {
                                    ctx.fillStyle = viz.colors.white;
                                    ctx.font = '9px -apple-system,sans-serif';
                                    ctx.textAlign = 'center';
                                    ctx.fillText(d.mae.toFixed(d.mae < 1 ? 2 : 1), x + barW / 2, y - 6);
                                }
                            });

                            // Cost annotation
                            ctx.fillStyle = viz.colors.muted;
                            ctx.font = '9px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            const costs = ['K⁴', 'K⁵', 'K⁶', 'K⁶', 'K⁷', 'K⁸', 'exp'];
                            data.forEach((d, i) => {
                                const x = px + i * step + step / 2;
                                ctx.fillText(costs[i], x, py + ph + 38);
                            });
                            ctx.fillText('(scaling)', px - 15, py + ph + 38);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Derive the MP2 energy expression by applying second-order Rayleigh-Schr&ouml;dinger perturbation theory with the M&oslash;ller-Plesset partitioning \\(\\hat{H}_0 = \\hat{f}\\), \\(\\hat{V} = \\hat{H} - \\hat{f}\\).',
                    hint: 'The second-order energy is \\(E^{(2)} = \\sum_{n \\neq 0} \\frac{|\\langle \\Phi_n | \\hat{V} | \\Phi_0 \\rangle|^2}{E_0^{(0)} - E_n^{(0)}}\\). By Brillouin\'s theorem, only doubles contribute.',
                    solution: 'With \\(\\hat{H}_0 = \\sum_p \\varepsilon_p a_p^\\dagger a_p\\), the zeroth-order energies are \\(E_0^{(0)} = \\sum_i \\varepsilon_i\\) and \\(E_{ij}^{ab(0)} = E_0^{(0)} - \\varepsilon_i - \\varepsilon_j + \\varepsilon_a + \\varepsilon_b\\). The perturbation \\(\\hat{V}\\) connects the reference only to doubles (by Brillouin\'s theorem, singles vanish): \\(\\langle \\Phi_{ij}^{ab} | \\hat{V} | \\Phi_0 \\rangle = \\langle ij \\| ab \\rangle\\). The energy denominator is \\(\\varepsilon_i + \\varepsilon_j - \\varepsilon_a - \\varepsilon_b < 0\\). Summing: \\(E^{(2)} = \\frac{1}{4}\\sum_{ijab} \\frac{|\\langle ij \\| ab \\rangle|^2}{\\varepsilon_i + \\varepsilon_j - \\varepsilon_a - \\varepsilon_b}\\).'
                },
                {
                    question: 'Explain why the exponential ansatz \\(|\\Psi\\rangle = e^{\\hat{T}}|\\Phi_0\\rangle\\) guarantees size extensivity, while the linear CI ansatz does not.',
                    hint: 'Consider two non-interacting systems A and B. How does \\(e^{\\hat{T}_A + \\hat{T}_B}\\) factor? How does a linear expansion behave?',
                    solution: 'For non-interacting A and B, \\(\\hat{T} = \\hat{T}_A + \\hat{T}_B\\) with \\([\\hat{T}_A, \\hat{T}_B] = 0\\). The exponential factorizes: \\(e^{\\hat{T}_A + \\hat{T}_B} = e^{\\hat{T}_A} e^{\\hat{T}_B}\\), so \\(|\\Psi_{AB}\\rangle = |\\Psi_A\\rangle \\otimes |\\Psi_B\\rangle\\) and \\(E_{AB} = E_A + E_B\\). For linear CI (e.g., CISD): \\(|\\Psi\\rangle = (1 + \\hat{C}_1 + \\hat{C}_2)|\\Phi_0\\rangle\\). This misses disconnected quadruples \\(\\hat{C}_2^A \\hat{C}_2^B\\), which appear in the product wavefunction but not in CISD. The CI energy does not separate: \\(E_{\\text{CISD}}(AB) \\neq E_{\\text{CISD}}(A) + E_{\\text{CISD}}(B)\\).'
                },
                {
                    question: 'CCSD(T) scales as \\(\\mathcal{O}(K^7)\\). For a molecule with \\(K = 200\\) basis functions, estimate the computational cost relative to a molecule with \\(K = 100\\) basis functions.',
                    hint: 'If cost \\(\\propto K^7\\), what is the ratio \\((200/100)^7\\)?',
                    solution: 'The cost ratio is \\((200/100)^7 = 2^7 = 128\\). So doubling the basis set size makes CCSD(T) 128 times more expensive. If the smaller calculation takes 1 hour, the larger takes approximately 128 hours (about 5 days). This steep scaling is why CCSD(T) is limited to relatively small molecules (10-20 heavy atoms with moderate basis sets). Techniques like local correlation (DLPNO-CCSD(T)) reduce the effective scaling to near-linear for large molecules.'
                },
                {
                    question: 'Why is CCSD(T) called the "gold standard" of quantum chemistry? What are its limitations?',
                    hint: 'Consider both its accuracy for single-reference systems and the cases where it fails.',
                    solution: 'CCSD(T) achieves chemical accuracy (MAE < 1 kcal/mol) for atomization energies, barrier heights, and molecular properties of single-reference molecules, at a manageable cost (\\(\\mathcal{O}(K^7)\\)). Its limitations: (1) it fails for multi-reference systems (bond breaking, diradicals, transition metals) where the perturbative (T) correction can diverge; (2) the \\(K^7\\) scaling limits it to ~20-30 heavy atoms; (3) basis set convergence is slow, requiring CBS extrapolation; (4) it does not describe long-range dispersion correctly at lower truncations, though CCSD(T) itself captures dispersion well.'
                },
                {
                    question: 'Show that the FCI wavefunction for 2 electrons in \\(K\\) spatial orbitals contains \\(\\binom{K}{1}^2 = K^2\\) determinants (for a singlet state). How many determinants are there for 10 electrons in 50 orbitals?',
                    hint: 'For \\(N\\) electrons in \\(K\\) spatial orbitals, the number of determinants is \\(\\binom{K}{N_\\alpha}\\binom{K}{N_\\beta}\\). For a singlet, \\(N_\\alpha = N_\\beta\\).',
                    solution: 'For 2 electrons (singlet: \\(N_\\alpha = N_\\beta = 1\\)) in \\(K\\) spatial orbitals: \\(\\binom{K}{1}\\binom{K}{1} = K^2\\) determinants. For \\(K = 10\\): 100 determinants. For 10 electrons (singlet: \\(N_\\alpha = N_\\beta = 5\\)) in 50 spatial orbitals: \\(\\binom{50}{5}^2 = (2{,}118{,}760)^2 \\approx 4.49 \\times 10^{12}\\) determinants. This is over 4 trillion determinants, making FCI completely intractable. Even for 10 electrons in 20 orbitals: \\(\\binom{20}{5}^2 = (15{,}504)^2 \\approx 2.4 \\times 10^8\\), which is feasible but already expensive.'
                }
            ]
        },

        // ========== SECTION 5: When Does Correlation Matter? ==========
        {
            id: 'sec7-5-when-correlation-matters',
            title: 'When Does Correlation Matter?',
            content: `
<h2>7.5 When Does Correlation Matter?</h2>

<p>Electron correlation is always present, but its <em>chemical importance</em> varies dramatically across different applications. Understanding when correlation makes a qualitative or quantitative difference is essential for choosing the appropriate level of theory.</p>

<h3>Bond Breaking and Reaction Energies</h3>

<div class="env-block theorem"><div class="env-title">Theorem 7.5.1 — Differential Correlation Energy</div><div class="env-body">
For a chemical reaction \\(\\text{A} \\to \\text{B}\\), the error in the HF reaction energy is:
\\[
\\Delta E_{\\text{error}} = \\Delta E_{\\text{corr}}(B) - \\Delta E_{\\text{corr}}(A).
\\]
If the correlation energy changes significantly between reactants and products (different number of electron pairs, different orbital structure), the HF reaction energy will be poor. HF errors are worst for:
<ul>
<li>Reactions that change the number of electron pairs (bond breaking/forming)</li>
<li>Isodesmic reactions have the best error cancellation (same bond types on both sides)</li>
</ul>
</div></div>

<div class="env-block example"><div class="env-title">Example 7.5.2 — Bond Energies</div><div class="env-body">
<p>HF underestimates bond energies systematically because the molecule (more electron pairs close together) has more correlation energy than the separated atoms. Selected examples:</p>
<table style="width:100%;border-collapse:collapse;margin:8px 0;">
<tr style="border-bottom:1px solid #30363d;"><th style="text-align:left;padding:4px 8px;">Bond</th><th style="padding:4px 8px;">HF (kcal/mol)</th><th style="padding:4px 8px;">CCSD(T) (kcal/mol)</th><th style="padding:4px 8px;">Expt. (kcal/mol)</th></tr>
<tr><td style="padding:4px 8px;">H-H</td><td style="padding:4px 8px;">84</td><td style="padding:4px 8px;">109</td><td style="padding:4px 8px;">109</td></tr>
<tr><td style="padding:4px 8px;">N\\(\\equiv\\)N</td><td style="padding:4px 8px;">115</td><td style="padding:4px 8px;">226</td><td style="padding:4px 8px;">228</td></tr>
<tr><td style="padding:4px 8px;">F-F</td><td style="padding:4px 8px;">-37</td><td style="padding:4px 8px;">37</td><td style="padding:4px 8px;">38</td></tr>
</table>
<p>The F-F case is dramatic: HF predicts F\\(_2\\) is <em>unbound</em> (negative dissociation energy), while experiment shows a stable molecule. The strong electron-electron repulsion in the F lone pairs makes correlation essential.</p>
</div></div>

<h3>Transition States and Reaction Barriers</h3>

<div class="env-block remark"><div class="env-title">Remark — HF Overestimates Barriers</div><div class="env-body">
HF typically overestimates reaction barriers by 5-15 kcal/mol because transition states have more stretched/partial bonds than equilibrium structures. Stretched bonds have more static correlation character, which HF misses. Including correlation (at the MP2 or CCSD(T) level) typically lowers barriers significantly.
</div></div>

<h3>Weak Interactions</h3>

<div class="env-block definition"><div class="env-title">Definition 7.5.3 — Dispersion Interactions</div><div class="env-body">
<em>London dispersion</em> is a purely correlation-driven attractive interaction between nonpolar molecules, arising from instantaneous dipole-induced dipole interactions. The interaction energy scales as \\(R^{-6}\\) and is described by:
\\[
E_{\\text{disp}} \\approx -\\frac{C_6}{R^6},
\\]
where \\(C_6\\) depends on the polarizabilities of the interacting species. HF gives <em>zero</em> dispersion energy; it must be captured by correlated methods (MP2, CC) or added empirically (DFT-D).
</div></div>

<div class="env-block example"><div class="env-title">Example 7.5.4 — The Helium Dimer</div><div class="env-body">
<p>He\\(_2\\) has no covalent bond, no dipole, and no hydrogen bond. Its binding energy of 0.022 kcal/mol (0.95 meV) is entirely due to London dispersion. HF predicts zero binding (pure repulsion). MP2 overbinds slightly. CCSD(T) with a large basis and counterpoise correction reproduces the experimental value.</p>
</div></div>

<h3>When Is HF Good Enough?</h3>

<div class="env-block proposition"><div class="env-title">Proposition 7.5.5 — HF is Qualitatively Correct For:</div><div class="env-body">
<ul>
<li>Molecular geometries of closed-shell molecules (errors: 0.01-0.02 &Aring; for bonds, 1-2&deg; for angles)</li>
<li>Conformational energy differences (semi-quantitative)</li>
<li>Vibrational frequencies (overestimates by ~10%, use 0.89 scaling factor)</li>
<li>Dipole moments (overestimates by ~10-20%)</li>
<li>Ionization potentials (via Koopmans' theorem, errors 1-2 eV)</li>
</ul>
</div></div>

<div class="env-block proposition"><div class="env-title">Proposition 7.5.6 — Correlation Is Essential For:</div><div class="env-body">
<ul>
<li>Absolute and relative energies (atomization, reaction, activation energies)</li>
<li>Bond dissociation (qualitatively wrong at HF level)</li>
<li>Weak interactions (dispersion, stacking, halogen bonds)</li>
<li>Transition metal chemistry (near-degenerate d-orbitals)</li>
<li>Excited states and spectroscopy</li>
<li>Electron affinities (HF virtual orbitals are too diffuse)</li>
<li>Magnetic properties (NMR chemical shifts, hyperfine couplings)</li>
</ul>
</div></div>

<div class="viz-placeholder" data-viz="viz-hf-vs-correlated"></div>

<h3>Choosing the Right Method</h3>

<div class="env-block remark"><div class="env-title">Remark — The Pople Diagram</div><div class="env-body">
<p>The "Pople diagram" visualizes the two-dimensional space of approximations: basis set completeness (horizontal) and correlation treatment (vertical). The exact answer lies at the top-right corner (FCI/CBS). Practical calculations navigate trade-offs:</p>
<ul>
<li><strong>Quick survey:</strong> HF/6-31G* or B3LYP/6-31G*</li>
<li><strong>Production DFT:</strong> \\(\\omega\\)B97X-D/def2-TZVPP</li>
<li><strong>Quantitative energetics:</strong> CCSD(T)/cc-pVTZ or DLPNO-CCSD(T)/cc-pVTZ</li>
<li><strong>Benchmark:</strong> CCSD(T)/CBS extrapolation</li>
<li><strong>Multi-reference:</strong> CASPT2/NEVPT2 for bond breaking, transition metals</li>
</ul>
</div></div>
`,
            visualizations: [
                {
                    id: 'viz-hf-vs-correlated',
                    title: 'HF vs. Correlated Methods: Error Comparison',
                    description: 'Compare the errors of HF, MP2, CCSD, and CCSD(T) for different chemical properties. Drag the slider to explore different property types.',
                    setup(body, controls) {
                        const viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0, width: 560, height: 400 });
                        const ctx = viz.ctx;

                        const properties = [
                            {
                                name: 'Bond Lengths (Angstrom)',
                                data: [
                                    { method: 'HF', error: 0.020 },
                                    { method: 'MP2', error: 0.008 },
                                    { method: 'CCSD', error: 0.005 },
                                    { method: 'CCSD(T)', error: 0.002 }
                                ],
                                maxE: 0.025,
                                target: 0.001,
                                targetLabel: '0.001 Å'
                            },
                            {
                                name: 'Atomization Energies (kcal/mol)',
                                data: [
                                    { method: 'HF', error: 32.0 },
                                    { method: 'MP2', error: 5.2 },
                                    { method: 'CCSD', error: 2.8 },
                                    { method: 'CCSD(T)', error: 0.7 }
                                ],
                                maxE: 35,
                                target: 1.0,
                                targetLabel: '1 kcal/mol'
                            },
                            {
                                name: 'Dipole Moments (Debye)',
                                data: [
                                    { method: 'HF', error: 0.30 },
                                    { method: 'MP2', error: 0.10 },
                                    { method: 'CCSD', error: 0.06 },
                                    { method: 'CCSD(T)', error: 0.02 }
                                ],
                                maxE: 0.35,
                                target: 0.05,
                                targetLabel: '0.05 D'
                            },
                            {
                                name: 'Frequencies (cm⁻¹)',
                                data: [
                                    { method: 'HF', error: 150 },
                                    { method: 'MP2', error: 40 },
                                    { method: 'CCSD', error: 25 },
                                    { method: 'CCSD(T)', error: 8 }
                                ],
                                maxE: 170,
                                target: 10,
                                targetLabel: '10 cm⁻¹'
                            }
                        ];

                        let propIdx = 1;
                        VizEngine.createSlider(controls, 'Property', 0, properties.length - 1, 1, 1, v => {
                            propIdx = Math.round(v);
                            draw();
                        });

                        const methodColors = {
                            'HF': viz.colors.red,
                            'MP2': viz.colors.orange,
                            'CCSD': viz.colors.blue,
                            'CCSD(T)': viz.colors.green
                        };

                        function draw() {
                            viz.clear();
                            const prop = properties[propIdx];
                            const data = prop.data;

                            const px = 100, py = 50, pw = 400, ph = 280;

                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Mean Absolute Error: ' + prop.name, px + pw / 2, 25);

                            // Axes
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1.5;
                            ctx.beginPath();
                            ctx.moveTo(px, py);
                            ctx.lineTo(px, py + ph);
                            ctx.lineTo(px + pw, py + ph);
                            ctx.stroke();

                            const maxE = prop.maxE;
                            const barW = 55;
                            const step = pw / data.length;

                            // Y ticks
                            ctx.textAlign = 'right';
                            ctx.font = '9px -apple-system,sans-serif';
                            const nTick = 5;
                            for (let i = 0; i <= nTick; i++) {
                                const val = maxE * i / nTick;
                                const sy = py + ph - (val / maxE) * ph;
                                ctx.fillStyle = viz.colors.text;
                                const fmt = maxE < 1 ? val.toFixed(3) : maxE < 10 ? val.toFixed(1) : val.toFixed(0);
                                ctx.fillText(fmt, px - 5, sy + 3);
                                ctx.strokeStyle = viz.colors.grid;
                                ctx.lineWidth = 0.5;
                                ctx.beginPath();
                                ctx.moveTo(px, sy);
                                ctx.lineTo(px + pw, sy);
                                ctx.stroke();
                            }

                            // Target line
                            if (prop.target <= maxE) {
                                const tgtY = py + ph - (prop.target / maxE) * ph;
                                ctx.strokeStyle = viz.colors.yellow;
                                ctx.lineWidth = 1.5;
                                ctx.setLineDash([5, 5]);
                                ctx.beginPath();
                                ctx.moveTo(px, tgtY);
                                ctx.lineTo(px + pw, tgtY);
                                ctx.stroke();
                                ctx.setLineDash([]);
                                ctx.fillStyle = viz.colors.yellow;
                                ctx.font = '9px -apple-system,sans-serif';
                                ctx.textAlign = 'right';
                                ctx.fillText('Target: ' + prop.targetLabel, px + pw - 5, tgtY - 6);
                            }

                            // Bars
                            data.forEach((d, i) => {
                                const color = methodColors[d.method];
                                const x = px + i * step + (step - barW) / 2;
                                const barH = Math.max(2, (d.error / maxE) * ph);
                                const y = py + ph - barH;

                                const grad = ctx.createLinearGradient(x, y, x, py + ph);
                                grad.addColorStop(0, color);
                                grad.addColorStop(1, color + '33');
                                ctx.fillStyle = grad;
                                ctx.fillRect(x, y, barW, barH);
                                ctx.strokeStyle = color;
                                ctx.lineWidth = 1;
                                ctx.strokeRect(x, y, barW, barH);

                                // Method name
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText(d.method, x + barW / 2, py + ph + 18);

                                // Value
                                ctx.fillStyle = viz.colors.white;
                                ctx.font = 'bold 10px -apple-system,sans-serif';
                                const fmt = d.error < 1 ? d.error.toFixed(3) : d.error < 10 ? d.error.toFixed(1) : d.error.toFixed(0);
                                ctx.fillText(fmt, x + barW / 2, y - 8);
                            });

                            // Improvement factors
                            ctx.fillStyle = viz.colors.muted;
                            ctx.font = '9px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            const ratio = (data[0].error / data[data.length - 1].error).toFixed(0);
                            ctx.fillText('CCSD(T) is ' + ratio + '× better than HF', px + pw / 2, py + ph + 45);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Explain why HF predicts F\\(_2\\) to be unbound (negative bond energy) while experiment shows a stable bond of 38 kcal/mol.',
                    hint: 'Consider the lone pair-lone pair repulsion in F\\(_2\\) and how correlation reduces it.',
                    solution: 'F\\(_2\\) has three lone pairs on each F atom. At the HF level, the electron-electron repulsion between these lone pairs is overestimated because HF does not account for the Coulomb hole: opposite-spin electrons cannot avoid each other in the mean-field picture. The strong intrapair and interpair correlation in the lone pairs significantly reduces the electron-electron repulsion energy. This correlation stabilization is much larger in the molecule (where lone pairs are close) than in the separated atoms. HF gets F + F correctly but F\\(_2\\) is too high, making the bond energy negative. The correlation energy difference between F\\(_2\\) and 2F is about 75 kcal/mol, enough to change the sign of the bond energy.'
                },
                {
                    question: 'Why does MP2 overestimate the binding energy of the methane dimer while CCSD(T) is accurate?',
                    hint: 'Consider the nature of the interaction (dispersion) and how MP2 treats pair correlations.',
                    solution: 'The methane dimer is bound by London dispersion. MP2 includes pair correlations at second order, which captures the \\(R^{-6}\\) dispersion interaction. However, MP2 tends to overestimate dispersion for systems with polarizable electrons because it uses uncoupled pair amplitudes and misses the screening of electron-electron interactions at higher order. MP2 overestimates the second-order contribution to the dispersion energy by 10-30% for systems with \\(\\pi\\) electrons or polarizable atoms. CCSD(T) includes higher-order terms (especially through the (T) triples correction) that partially cancel the MP2 overestimation, giving more balanced results.'
                },
                {
                    question: 'For a geometry optimization, you need bond lengths accurate to 0.005 &Aring;. Which is the cheapest method that achieves this?',
                    hint: 'Refer to the typical errors of different methods for bond lengths.',
                    solution: 'From the data: HF gives errors of ~0.02 &Aring; (too large), MP2 gives ~0.008 &Aring; (close but still outside the target), CCSD gives ~0.005 &Aring; (right at the target), CCSD(T) gives ~0.002 &Aring; (well within). The cheapest method achieving 0.005 &Aring; is CCSD (\\(\\mathcal{O}(K^6)\\)). However, in practice MP2 with a large basis set often achieves this accuracy for most bonds, and DFT with good functionals (e.g., \\(\\omega\\)B97X-D) can also reach 0.005 &Aring; at much lower cost (\\(\\mathcal{O}(K^3)\\)-\\(\\mathcal{O}(K^4)\\)). The practical answer for most applications is DFT or MP2.'
                },
                {
                    question: 'A drug-receptor binding study requires accurate noncovalent interaction energies. HF gives \\(\\Delta E = +2.3\\) kcal/mol (repulsive), while experiment shows \\(\\Delta E = -5.2\\) kcal/mol (bound). Explain the sign error and suggest an appropriate computational approach.',
                    hint: 'HF misses dispersion entirely. What methods include dispersion?',
                    solution: 'The sign error occurs because HF captures only electrostatic and exchange repulsion but completely misses London dispersion, which is the dominant attractive force in most drug-receptor complexes (stacking, CH-\\(\\pi\\) interactions, etc.). Without dispersion, only the exchange repulsion remains, giving a positive (repulsive) interaction. Appropriate methods: (1) DFT-D3 or DFT-D4 (B3LYP-D3, \\(\\omega\\)B97X-D): cheapest, good for geometries, MAE ~0.5-1.0 kcal/mol for noncovalent interactions. (2) MP2 or SCS-MP2: better but tends to overbind \\(\\pi\\)-stacking. (3) DLPNO-CCSD(T): near benchmark accuracy at feasible cost for drug-like molecules. For production work, DFT-D3 is recommended for its accuracy-to-cost ratio.'
                },
                {
                    question: 'Explain the concept of the "Pople diagram" and why both the basis set and correlation axes must be converged for reliable results.',
                    hint: 'What happens if you use a high-level method with a small basis, or a complete basis with HF only?',
                    solution: 'The Pople diagram has the correlation treatment on the vertical axis (HF \\(\\to\\) MP2 \\(\\to\\) CCSD \\(\\to\\) CCSD(T) \\(\\to\\) FCI) and basis set completeness on the horizontal axis (STO-3G \\(\\to\\) 6-31G* \\(\\to\\) cc-pVTZ \\(\\to\\) cc-pVQZ \\(\\to\\) CBS). The exact answer is at the top-right corner (FCI/CBS). Moving along only one axis is insufficient: CCSD(T)/STO-3G uses a great correlation method but the basis is too small to describe the orbitals; HF/cc-pV5Z has a nearly complete basis but no correlation. The total error has components from both dimensions. A balanced approach (e.g., CCSD(T)/cc-pVTZ) moves along both axes simultaneously. Focal-point analysis and composite methods (G4, W1) systematically extrapolate along both axes.'
                },
                {
                    question: 'For the reaction N\\(_2\\) + 3H\\(_2\\) \\(\\to\\) 2NH\\(_3\\), the HF reaction energy error is about 50 kcal/mol. The isodesmic reaction NH\\(_3\\) + CH\\(_4\\) \\(\\to\\) NH\\(_2\\)CH\\(_3\\) + H\\(_2\\) has an HF error of only 2 kcal/mol. Explain this difference.',
                    hint: 'Count the number and types of bonds on each side of each reaction.',
                    solution: 'In the Haber process reaction, the left side has one N\\(\\equiv\\)N triple bond and three H-H bonds, while the right side has six N-H bonds. The bond types change completely, so the correlation energy changes drastically (the triple bond has much more correlation energy than single bonds). In the isodesmic reaction, both sides have the same types of bonds: one N-H bond is broken and one C-N bond is formed, while one C-H bond is broken and one H-H bond is formed. The total number of each bond type is preserved (both sides have the same number of X-H and heavy-atom bonds). This maximizes error cancellation because the correlation energy associated with each bond type cancels between reactants and products. Isodesmic reactions have HF errors of 1-5 kcal/mol versus 10-50 kcal/mol for non-isodesmic reactions.'
                }
            ]
        }
    ]
});
