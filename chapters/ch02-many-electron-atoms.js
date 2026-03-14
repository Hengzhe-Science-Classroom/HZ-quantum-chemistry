// === Chapter 2: Many-Electron Atoms ===
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch02',
    number: 2,
    title: 'Many-Electron Atoms',
    subtitle: 'When exact solutions fail: approximations for interacting electrons',
    sections: [
        // ========== SECTION 1: The Many-Electron Problem ==========
        {
            id: 'sec01-many-electron-problem',
            title: 'The Many-Electron Problem',
            content: `
<h2>2.1 The Many-Electron Problem</h2>

<p>In Chapter 1, we solved the hydrogen atom exactly: a single electron moving in the Coulomb field of a nucleus. Nature, however, is far more complicated. Helium has two electrons, lithium has three, and uranium has ninety-two. The moment we add a second electron, the problem becomes qualitatively different, and exact analytical solutions are no longer possible.</p>

<div class="env-block intuition">
<div class="env-title">Why Does One Extra Electron Change Everything?</div>
<div class="env-body">
<p>For hydrogen, the electron moves in a fixed Coulomb potential \\(-Z/r\\). The Schrodinger equation separates in spherical coordinates, and the resulting ODEs yield closed-form solutions (Laguerre and spherical harmonic functions). The key structural feature is that the potential depends only on one coordinate, \\(r\\).</p>
<p>For helium, each electron experiences the nuclear attraction \\(-Z/r_i\\) <em>and</em> the repulsion \\(1/r_{12}\\) from the other electron. This electron-electron repulsion term couples the coordinates of the two electrons: the potential depends on \\(|\\mathbf{r}_1 - \\mathbf{r}_2|\\), which cannot be separated into independent single-particle problems. This is the fundamental origin of the many-body problem in quantum chemistry.</p>
</div>
</div>

<h3>The Full Hamiltonian</h3>

<p>Consider an atom with nuclear charge \\(Z\\) and \\(N\\) electrons. In atomic units (\\(\\hbar = m_e = e = 4\\pi\\varepsilon_0 = 1\\)), the non-relativistic, clamped-nucleus (Born-Oppenheimer) electronic Hamiltonian is:</p>

<div class="env-block definition">
<div class="env-title">Definition 2.1.1 (Many-Electron Atomic Hamiltonian)</div>
<div class="env-body">
\\[
\\hat{H} = \\sum_{i=1}^{N} \\hat{h}(i) + \\sum_{i=1}^{N} \\sum_{j>i}^{N} \\frac{1}{r_{ij}}
\\]
where the one-electron operator is
\\[
\\hat{h}(i) = -\\frac{1}{2}\\nabla_i^2 - \\frac{Z}{r_i}
\\]
and \\(r_{ij} = |\\mathbf{r}_i - \\mathbf{r}_j|\\) is the interelectronic distance. The first sum contains \\(N\\) one-electron terms (kinetic energy plus nuclear attraction). The double sum contains \\(N(N-1)/2\\) two-electron repulsion terms.
</div>
</div>

<p>For helium (\\(N = 2, Z = 2\\)), this becomes:</p>
\\[
\\hat{H} = -\\frac{1}{2}\\nabla_1^2 - \\frac{1}{2}\\nabla_2^2 - \\frac{2}{r_1} - \\frac{2}{r_2} + \\frac{1}{r_{12}}
\\]

<p>The electron-electron repulsion \\(1/r_{12}\\) is the problematic term. It couples the motion of electron 1 to electron 2, making the Schrodinger equation \\(\\hat{H}\\Psi = E\\Psi\\) a partial differential equation in six spatial variables (plus spin) that does not separate.</p>

<div class="env-block theorem">
<div class="env-title">Theorem 2.1.2 (Non-Separability)</div>
<div class="env-body">
<p>The Schrodinger equation for the helium atom (and, more generally, any atom with \\(N \\geq 2\\) electrons) does not admit separation of variables in any known coordinate system. No closed-form analytical solution exists.</p>
</div>
</div>

<div class="env-block proof">
<div class="env-title">Proof Sketch</div>
<div class="env-body">
<p>Suppose \\(\\Psi(\\mathbf{r}_1, \\mathbf{r}_2) = \\phi(\\mathbf{r}_1)\\chi(\\mathbf{r}_2)\\). Substituting into \\(\\hat{H}\\Psi = E\\Psi\\) and dividing by \\(\\phi\\chi\\):</p>
\\[
\\frac{\\hat{h}(1)\\phi(\\mathbf{r}_1)}{\\phi(\\mathbf{r}_1)} + \\frac{\\hat{h}(2)\\chi(\\mathbf{r}_2)}{\\chi(\\mathbf{r}_2)} + \\frac{1}{r_{12}} = E
\\]
<p>The first term depends only on \\(\\mathbf{r}_1\\), the second only on \\(\\mathbf{r}_2\\), but \\(1/r_{12}\\) depends on both. No rearrangement can isolate the variables. Thus the product ansatz fails, and the equation does not separate.</p>
<div class="qed">&#8718;</div>
</div>
</div>

<h3>Scaling of the Problem</h3>

<p>The number of electron-electron repulsion integrals grows as \\(N(N-1)/2 \\sim O(N^2)\\). But the true difficulty is worse: the wavefunction \\(\\Psi(\\mathbf{r}_1, \\mathbf{r}_2, \\ldots, \\mathbf{r}_N)\\) lives in a \\(3N\\)-dimensional configuration space. Even a modest grid of 10 points per coordinate for a 10-electron atom requires \\(10^{30}\\) grid points, far beyond any computer.</p>

<div class="env-block remark">
<div class="env-title">Remark 2.1.3 (The Exponential Wall)</div>
<div class="env-body">
<p>Walter Kohn called this the "exponential wall" of many-body quantum mechanics. Direct numerical solution of the full Schrodinger equation is intractable for all but the smallest systems. This motivates the approximation methods developed in the rest of this chapter and the entire field of quantum chemistry.</p>
</div>
</div>

<h3>Exactly Solvable Limits</h3>

<p>Although the full problem is intractable, two limiting cases <em>are</em> exactly solvable:</p>

<ol>
<li><strong>Non-interacting electrons</strong> (\\(1/r_{ij} \\to 0\\)): The Hamiltonian separates into \\(N\\) independent hydrogen-like problems. The total wavefunction is a product of one-electron orbitals, and the total energy is the sum of orbital energies.</li>
<li><strong>Classical limit</strong> (\\(\\hbar \\to 0\\)): Electrons are point charges at equilibrium positions. This is the Thomson problem (minimizing electrostatic energy of \\(N\\) charges on a sphere).</li>
</ol>

<p>The first limit forms the basis of the <em>independent particle model</em>, which we develop in the next section.</p>

<div class="env-block example">
<div class="env-title">Example 2.1.4 (Helium: Non-Interacting Estimate)</div>
<div class="env-body">
<p>Set \\(1/r_{12} = 0\\) for helium. Then \\(\\hat{H} = \\hat{h}(1) + \\hat{h}(2)\\) with \\(Z = 2\\). Each electron independently occupies the hydrogen-like \\(1s\\) orbital with energy \\(E_{1s} = -Z^2/2 = -2\\) Hartree. The total energy is:</p>
\\[
E^{(0)} = 2 \\times (-2) = -4 \\text{ Hartree} = -108.8 \\text{ eV}
\\]
<p>The experimental value is \\(-2.9037\\) Hartree (\\(-79.0\\) eV). The non-interacting estimate overshoots by 38%, showing that electron-electron repulsion is not a small perturbation.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-energy-comparison"></div>
`,
            visualizations: [
                {
                    id: 'viz-energy-comparison',
                    title: 'Helium Energy: Non-Interacting vs. Exact',
                    description: 'Compare the non-interacting estimate with the exact ground-state energy. The electron-electron repulsion raises the energy by about 1.1 Hartree.',
                    setup(body, controls) {
                        const viz = new VizEngine(body, { scale: 60, originX: 80, originY: 40, height: 340, width: 560 });

                        function draw() {
                            viz.clear();
                            const ctx = viz.ctx;
                            const W = viz.width, H = viz.height;

                            // Title
                            viz.screenText('Helium Ground-State Energy', W / 2, 25, viz.colors.white, 15, 'center');

                            // Energy scale
                            const eMin = -4.2, eMax = 0.2;
                            const barWidth = 80;
                            const spacing = 140;
                            const x0 = 120;

                            function eToY(e) {
                                return 50 + (eMax - e) / (eMax - eMin) * (H - 90);
                            }

                            // Draw energy axis
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(60, 50);
                            ctx.lineTo(60, H - 30);
                            ctx.stroke();
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'right';
                            ctx.textBaseline = 'middle';
                            for (let e = -4; e <= 0; e += 1) {
                                const y = eToY(e);
                                ctx.fillText(e.toFixed(0), 55, y);
                                ctx.strokeStyle = viz.colors.grid;
                                ctx.beginPath();
                                ctx.moveTo(60, y);
                                ctx.lineTo(W - 20, y);
                                ctx.stroke();
                            }
                            viz.screenText('E (Hartree)', 55, 42, viz.colors.text, 10, 'right');

                            // Bar 1: Non-interacting
                            const y1 = eToY(-4.0);
                            ctx.fillStyle = viz.colors.red + '88';
                            ctx.fillRect(x0, y1, barWidth, eToY(0) - y1);
                            ctx.strokeStyle = viz.colors.red;
                            ctx.lineWidth = 2;
                            ctx.strokeRect(x0, y1, barWidth, eToY(0) - y1);
                            viz.screenText('Non-interacting', x0 + barWidth / 2, H - 12, viz.colors.red, 11, 'center');
                            viz.screenText('-4.00 Ha', x0 + barWidth / 2, y1 - 10, viz.colors.red, 11, 'center');

                            // Bar 2: Exact
                            const y2 = eToY(-2.9037);
                            ctx.fillStyle = viz.colors.green + '88';
                            ctx.fillRect(x0 + spacing, y2, barWidth, eToY(0) - y2);
                            ctx.strokeStyle = viz.colors.green;
                            ctx.lineWidth = 2;
                            ctx.strokeRect(x0 + spacing, y2, barWidth, eToY(0) - y2);
                            viz.screenText('Exact', x0 + spacing + barWidth / 2, H - 12, viz.colors.green, 11, 'center');
                            viz.screenText('-2.904 Ha', x0 + spacing + barWidth / 2, y2 - 10, viz.colors.green, 11, 'center');

                            // Bar 3: Repulsion energy
                            const y3a = eToY(-4.0);
                            const y3b = eToY(-2.9037);
                            ctx.fillStyle = viz.colors.orange + '55';
                            ctx.fillRect(x0 + 2 * spacing, y3b, barWidth, y3a - y3b);
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 2;
                            ctx.strokeRect(x0 + 2 * spacing, y3b, barWidth, y3a - y3b);
                            viz.screenText('Repulsion', x0 + 2 * spacing + barWidth / 2, H - 12, viz.colors.orange, 11, 'center');
                            viz.screenText('+1.096 Ha', x0 + 2 * spacing + barWidth / 2, (y3a + y3b) / 2, viz.colors.orange, 11, 'center');

                            // Zero line
                            ctx.strokeStyle = viz.colors.white + '44';
                            ctx.lineWidth = 1;
                            ctx.setLineDash([4, 4]);
                            ctx.beginPath();
                            ctx.moveTo(60, eToY(0));
                            ctx.lineTo(W - 20, eToY(0));
                            ctx.stroke();
                            ctx.setLineDash([]);
                            viz.screenText('E = 0', W - 15, eToY(0), viz.colors.text, 10, 'left');
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Write down the full Hamiltonian for lithium (\\(Z = 3, N = 3\\)) in atomic units. How many electron-electron repulsion terms are there?',
                    hint: 'Count the number of distinct pairs \\((i,j)\\) with \\(i < j\\) for \\(N = 3\\).',
                    solution: 'The Hamiltonian is \\[\\hat{H} = \\sum_{i=1}^{3}\\left(-\\frac{1}{2}\\nabla_i^2 - \\frac{3}{r_i}\\right) + \\frac{1}{r_{12}} + \\frac{1}{r_{13}} + \\frac{1}{r_{23}}.\\] There are \\(\\binom{3}{2} = 3\\) electron-electron repulsion terms.'
                },
                {
                    question: 'For the non-interacting helium atom, the ground-state wavefunction is \\(\\Psi(\\mathbf{r}_1, \\mathbf{r}_2) = \\phi_{1s}(\\mathbf{r}_1)\\phi_{1s}(\\mathbf{r}_2)\\) with \\(\\phi_{1s}(\\mathbf{r}) = \\frac{Z^{3/2}}{\\sqrt{\\pi}} e^{-Zr}\\). Verify by direct substitution that this is an eigenfunction of the non-interacting Hamiltonian and find the eigenvalue.',
                    hint: 'Each factor satisfies the hydrogen-like Schrodinger equation \\(\\hat{h}(i)\\phi_{1s}(\\mathbf{r}_i) = (-Z^2/2)\\phi_{1s}(\\mathbf{r}_i)\\).',
                    solution: 'Since \\(\\hat{H}_0 = \\hat{h}(1) + \\hat{h}(2)\\) and \\(\\Psi = \\phi_{1s}(1)\\phi_{1s}(2)\\), we have \\[\\hat{H}_0\\Psi = [\\hat{h}(1)\\phi_{1s}(1)]\\phi_{1s}(2) + \\phi_{1s}(1)[\\hat{h}(2)\\phi_{1s}(2)] = \\left(-\\frac{Z^2}{2} - \\frac{Z^2}{2}\\right)\\Psi = -Z^2\\Psi.\\] For \\(Z = 2\\): \\(E = -4\\) Hartree.'
                },
                {
                    question: 'Using first-order perturbation theory, the electron-electron repulsion energy for helium is \\(\\langle\\Psi^{(0)}|1/r_{12}|\\Psi^{(0)}\\rangle = 5Z/8\\). Evaluate this for \\(Z = 2\\) and compare with the exact correction.',
                    hint: 'The exact energy is \\(-2.9037\\) Ha and the zeroth-order energy is \\(-4\\) Ha.',
                    solution: 'First-order correction: \\(E^{(1)} = 5Z/8 = 5(2)/8 = 5/4 = 1.25\\) Ha. First-order total: \\(E^{(0)} + E^{(1)} = -4 + 1.25 = -2.75\\) Ha. Exact: \\(-2.9037\\) Ha. The first-order result is off by \\(0.154\\) Ha (5.3%), a significant improvement over the non-interacting estimate but still imperfect because of the crude product wavefunction.'
                },
                {
                    question: 'Explain physically why the non-interacting estimate gives a total energy that is too low (too negative). Which physical effect is missing?',
                    hint: 'Think about what happens when you ignore the repulsion between electrons.',
                    solution: 'The non-interacting estimate places both electrons in the \\(1s\\) orbital of a bare \\(Z=2\\) nucleus without accounting for their mutual repulsion. In reality, each electron repels the other, raising the total energy. The missing effect is the positive electron-electron repulsion energy (\\(+1.096\\) Ha), which destabilizes the atom relative to the non-interacting picture.'
                },
                {
                    question: 'How many independent spatial coordinates does the wavefunction \\(\\Psi\\) depend on for a neutral neon atom (\\(Z = 10\\))? How many electron-electron repulsion terms appear in the Hamiltonian?',
                    hint: 'Neon has \\(N = 10\\) electrons; each contributes 3 spatial coordinates.',
                    solution: '\\(\\Psi\\) depends on \\(3N = 30\\) spatial coordinates. The number of repulsion terms is \\(\\binom{10}{2} = 45\\).'
                }
            ]
        },

        // ========== SECTION 2: The Independent Particle Model ==========
        {
            id: 'sec02-independent-particle',
            title: 'The Independent Particle Model',
            content: `
<h2>2.2 The Independent Particle Model</h2>

<p>Since we cannot solve the many-electron Schrodinger equation exactly, we seek a physically motivated approximation. The simplest and most fruitful idea is the <em>independent particle model</em> (also called the <em>orbital approximation</em>): pretend that each electron moves independently in some effective potential created by the nucleus and the <em>average</em> field of all other electrons.</p>

<div class="env-block definition">
<div class="env-title">Definition 2.2.1 (Independent Particle Model)</div>
<div class="env-body">
<p>In the independent particle model, the many-electron wavefunction is approximated as a product of one-electron functions (orbitals):</p>
\\[
\\Psi(\\mathbf{r}_1, \\mathbf{r}_2, \\ldots, \\mathbf{r}_N) \\approx \\phi_1(\\mathbf{r}_1)\\,\\phi_2(\\mathbf{r}_2)\\cdots\\phi_N(\\mathbf{r}_N)
\\]
<p>Each orbital \\(\\phi_i\\) satisfies a one-electron Schrodinger equation with an effective potential \\(V_\\text{eff}(r)\\):</p>
\\[
\\left[-\\frac{1}{2}\\nabla^2 + V_\\text{eff}(r)\\right]\\phi_i(\\mathbf{r}) = \\varepsilon_i\\,\\phi_i(\\mathbf{r})
\\]
<p>This is called the <em>Hartree product</em> ansatz.</p>
</div>
</div>

<h3>The Central Field Approximation</h3>

<p>The effective potential \\(V_\\text{eff}(r)\\) is constructed to be spherically symmetric (depending only on \\(r\\), not on angles). This is the <em>central field approximation</em>. The physical reasoning is as follows:</p>

<ul>
<li>The nuclear potential \\(-Z/r\\) is spherically symmetric.</li>
<li>In a filled shell, the total electron density of the other electrons is approximately spherically symmetric.</li>
<li>Therefore, the average repulsion experienced by one electron from all others can be approximated as a central potential.</li>
</ul>

<div class="env-block definition">
<div class="env-title">Definition 2.2.2 (Central Field Potential)</div>
<div class="env-body">
\\[
V_\\text{eff}(r) = -\\frac{Z}{r} + V_\\text{ee}(r)
\\]
where \\(V_\\text{ee}(r)\\) represents the spherically averaged electron-electron repulsion. At small \\(r\\), the electron penetrates close to the nucleus and sees the full nuclear charge \\(Z\\), so \\(V_\\text{eff}(r) \\approx -Z/r\\). At large \\(r\\), the electron is outside all others and sees an effective charge of \\(Z - (N-1) \\approx 1\\) for a neutral atom, so \\(V_\\text{eff}(r) \\approx -1/r\\).
</div>
</div>

<h3>Consequences of the Central Field</h3>

<p>Because \\(V_\\text{eff}\\) is spherically symmetric, the one-electron equation separates in spherical coordinates exactly as for hydrogen. The orbitals have the form:</p>
\\[
\\phi_{nlm}(r, \\theta, \\varphi) = R_{nl}(r)\\, Y_l^m(\\theta, \\varphi)
\\]

<p>The angular part is the same as for hydrogen: spherical harmonics \\(Y_l^m\\). The radial part \\(R_{nl}(r)\\) differs from the hydrogenic case because the effective potential is not a pure Coulomb potential.</p>

<div class="env-block theorem">
<div class="env-title">Theorem 2.2.3 (\\(l\\)-Degeneracy Breaking)</div>
<div class="env-body">
<p>In hydrogen, the energy depends only on \\(n\\): all orbitals with the same \\(n\\) but different \\(l\\) are degenerate (\\(E_{nl} = -1/(2n^2)\\)). In a many-electron atom with a central field, the energy depends on <em>both</em> \\(n\\) and \\(l\\):</p>
\\[
\\varepsilon_{nl} \\neq \\varepsilon_{nl'} \\quad \\text{for } l \\neq l'
\\]
<p>Specifically, for a given \\(n\\), orbitals with lower \\(l\\) have lower energy (they penetrate closer to the nucleus and experience less shielding).</p>
</div>
</div>

<div class="env-block proof">
<div class="env-title">Proof (Physical Argument)</div>
<div class="env-body">
<p>The radial probability distribution \\(r^2|R_{nl}(r)|^2\\) for low-\\(l\\) orbitals has significant density near the nucleus (high penetration). An electron close to the nucleus sees the full charge \\(Z\\), experiencing stronger attraction. High-\\(l\\) orbitals have a centrifugal barrier \\(l(l+1)/(2r^2)\\) that keeps the electron away from the nucleus, so it experiences more shielding from inner electrons. Thus \\(\\varepsilon_{ns} < \\varepsilon_{np} < \\varepsilon_{nd} < \\varepsilon_{nf}\\) for a given \\(n\\).</p>
<div class="qed">&#8718;</div>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example 2.2.4 (Orbital Ordering in the Third Period)</div>
<div class="env-body">
<p>The \\(l\\)-degeneracy breaking explains why the periodic table fills \\(3s\\) before \\(3p\\), and even why \\(4s\\) fills before \\(3d\\): the \\(4s\\) orbital has greater nuclear penetration (a peak near the nucleus) compared to \\(3d\\), making \\(\\varepsilon_{4s} < \\varepsilon_{3d}\\) for neutral potassium and calcium.</p>
</div>
</div>

<h3>Limitations of the Hartree Product</h3>

<div class="env-block warning">
<div class="env-title">Warning: The Hartree Product Is Unphysical</div>
<div class="env-body">
<p>The simple product wavefunction \\(\\Psi = \\phi_1(\\mathbf{r}_1)\\phi_2(\\mathbf{r}_2)\\cdots\\phi_N(\\mathbf{r}_N)\\) has a critical flaw: it treats electrons as distinguishable particles. But electrons are identical fermions, and the wavefunction must be <em>antisymmetric</em> under exchange of any two electrons. The Hartree product satisfies neither antisymmetry nor the Pauli exclusion principle. We will fix this in Section 2.3 using Slater determinants.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-shielding"></div>
`,
            visualizations: [
                {
                    id: 'viz-shielding',
                    title: 'Effective Nuclear Charge and Orbital Penetration',
                    description: 'Compare the effective potential seen by electrons in different orbitals. Low-\\(l\\) orbitals penetrate closer to the nucleus and experience less shielding.',
                    setup(body, controls) {
                        const viz = new VizEngine(body, { scale: 30, originX: 80, originY: 300, width: 600, height: 380 });

                        let selectedL = 0;
                        const Z = 10; // neon

                        const lSlider = VizEngine.createSlider(controls, 'l', 0, 3, 0, 1, (v) => {
                            selectedL = Math.round(v);
                            draw();
                        });

                        function effectiveZ(r, Zn, Ninner) {
                            // simple screening model
                            const sigma = Ninner * (1 - Math.exp(-2 * r));
                            return Zn - sigma;
                        }

                        function radialDensity(n, l, r, Zeff) {
                            // approximate hydrogen-like radial density
                            const rho = 2 * Zeff * r / n;
                            const norm = Math.pow(2 * Zeff / n, 1.5);
                            const R = norm * Math.exp(-rho / 2) * Math.pow(rho, l);
                            return r * r * R * R;
                        }

                        function draw() {
                            viz.clear();
                            const ctx = viz.ctx;

                            // Draw axes
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(80, 300);
                            ctx.lineTo(580, 300);
                            ctx.stroke();
                            ctx.beginPath();
                            ctx.moveTo(80, 20);
                            ctx.lineTo(80, 300);
                            ctx.stroke();

                            viz.screenText('r (a.u.)', 560, 315, viz.colors.text, 11);
                            viz.screenText('r\u00B2|R(r)|\u00B2', 40, 20, viz.colors.text, 11, 'center');

                            // r-axis labels
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            for (let r = 2; r <= 16; r += 2) {
                                const sx = 80 + r * 30;
                                ctx.fillText(r, sx, 315);
                            }

                            const lColors = [viz.colors.blue, viz.colors.teal, viz.colors.orange, viz.colors.purple];
                            const lNames = ['s (l=0)', 'p (l=1)', 'd (l=2)', 'f (l=3)'];
                            const n = selectedL + 1 + (selectedL >= 2 ? 1 : 0); // map to reasonable n

                            // Draw radial density for all l values with n=3
                            for (let l = 0; l <= 3; l++) {
                                const nn = 3;
                                const Zeff = Z - l * 1.5 - 2; // crude effective charge
                                const col = lColors[l];
                                const alpha = l === selectedL ? 'ff' : '44';

                                ctx.strokeStyle = col + alpha;
                                ctx.lineWidth = l === selectedL ? 2.5 : 1;
                                ctx.beginPath();
                                let started = false;
                                for (let i = 0; i <= 300; i++) {
                                    const r = 0.01 + i * 0.06;
                                    const val = radialDensity(nn, l, r, Math.max(Zeff, 1));
                                    const sx = 80 + r * 30;
                                    const sy = 300 - val * 3000;
                                    if (!isFinite(sy) || sy < 10) { started = false; continue; }
                                    if (!started) { ctx.moveTo(sx, sy); started = true; }
                                    else ctx.lineTo(sx, sy);
                                }
                                ctx.stroke();
                            }

                            // Legend
                            for (let l = 0; l <= 3; l++) {
                                const ly = 40 + l * 20;
                                ctx.fillStyle = lColors[l];
                                ctx.font = (l === selectedL ? 'bold ' : '') + '12px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.fillText(lNames[l], 440, ly);
                                ctx.beginPath();
                                ctx.arc(430, ly - 1, 4, 0, Math.PI * 2);
                                ctx.fill();
                            }

                            viz.screenText('n = 3 shell, Z = 10 (Neon)', viz.width / 2, viz.height - 15, viz.colors.text, 11);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'In the central field approximation, explain why the \\(m_l\\) degeneracy is preserved (orbitals with same \\(n, l\\) but different \\(m_l\\) remain degenerate).',
                    hint: 'What symmetry does a central (spherically symmetric) potential possess?',
                    solution: 'A central potential \\(V(r)\\) is spherically symmetric, so the Hamiltonian commutes with all components of \\(\\hat{\\mathbf{L}}\\) and therefore with \\(\\hat{L}_z\\). Orbitals with the same \\(n\\) and \\(l\\) but different \\(m_l\\) are related by rotations, which leave the central Hamiltonian invariant. Hence they must have the same energy.'
                },
                {
                    question: 'For a neutral atom with \\(N = Z\\) electrons, argue that the effective potential at large \\(r\\) behaves as \\(V_\\text{eff}(r) \\approx -1/r\\).',
                    hint: 'At large \\(r\\), the electron is outside all other \\(N - 1\\) electrons.',
                    solution: 'At large \\(r\\), an electron is outside the cloud of the other \\(N - 1\\) electrons. By the shell theorem (Gauss\'s law), these inner electrons screen the nuclear charge by \\(N - 1\\). The effective charge is \\(Z - (N - 1) = Z - Z + 1 = 1\\), giving \\(V_\\text{eff}(r) \\approx -1/r\\). The Rydberg states of any neutral atom thus resemble hydrogen.'
                },
                {
                    question: 'The Hartree product \\(\\Psi = \\phi_a(\\mathbf{r}_1)\\phi_b(\\mathbf{r}_2)\\) implies that the probability of finding electron 1 at \\(\\mathbf{r}_1\\) is independent of where electron 2 is. Is this physically reasonable?',
                    hint: 'Electrons repel each other. If electron 1 is at a certain position, does that affect where electron 2 is likely to be?',
                    solution: 'No. Since electrons repel each other, finding electron 1 at position \\(\\mathbf{r}_1\\) should make it less likely to find electron 2 nearby. The Hartree product gives \\(|\\Psi|^2 = |\\phi_a(\\mathbf{r}_1)|^2 |\\phi_b(\\mathbf{r}_2)|^2\\), which is uncorrelated: the position of one electron does not influence the probability distribution of the other. This neglect of electron correlation is a fundamental limitation corrected partially by antisymmetrization and fully by post-Hartree-Fock methods.'
                },
                {
                    question: 'How many one-electron orbitals are there in the \\(n = 3\\) shell? List them with their \\((n, l, m_l)\\) quantum numbers.',
                    hint: 'For given \\(n\\), \\(l\\) ranges from \\(0\\) to \\(n-1\\), and \\(m_l\\) ranges from \\(-l\\) to \\(+l\\).',
                    solution: 'For \\(n = 3\\): \\(l = 0\\) gives \\(m_l = 0\\) (1 orbital: \\(3s\\)); \\(l = 1\\) gives \\(m_l = -1, 0, +1\\) (3 orbitals: \\(3p\\)); \\(l = 2\\) gives \\(m_l = -2, -1, 0, +1, +2\\) (5 orbitals: \\(3d\\)). Total: \\(1 + 3 + 5 = 9\\) spatial orbitals, or \\(18\\) spin-orbitals (each can hold spin up or down).'
                },
                {
                    question: 'In the non-interacting model, the total energy is the sum of orbital energies: \\(E = \\sum_i \\varepsilon_i\\). Explain why this overcounts the electron-electron repulsion when the orbitals are determined self-consistently.',
                    hint: 'Each orbital energy \\(\\varepsilon_i\\) includes the average repulsion from all other electrons. Count how many times each pair interaction appears.',
                    solution: 'Each orbital energy \\(\\varepsilon_i\\) includes the average repulsion between electron \\(i\\) and all other electrons \\(j \\neq i\\). When we sum \\(\\sum_i \\varepsilon_i\\), the repulsion between each pair \\((i, j)\\) is counted once in \\(\\varepsilon_i\\) (repulsion of \\(i\\) from \\(j\\)) and once in \\(\\varepsilon_j\\) (repulsion of \\(j\\) from \\(i\\)). So each pair is double-counted. The correct energy is \\(E = \\sum_i \\varepsilon_i - V_{ee}\\), subtracting one copy of the total electron-electron repulsion.'
                }
            ]
        },

        // ========== SECTION 3: Electron Spin and the Pauli Principle ==========
        {
            id: 'sec03-spin-pauli',
            title: 'Electron Spin and the Pauli Principle',
            content: `
<h2>2.3 Electron Spin and the Pauli Principle</h2>

<p>The independent particle model of Section 2.2 treated electrons as distinguishable particles, assigning each to a specific orbital. But electrons are <em>identical fermions</em>: there is no physical experiment that can tell "electron 1" from "electron 2." This identity, combined with the half-integer spin of electrons, imposes a profound constraint on allowed wavefunctions.</p>

<h3>Spin Functions</h3>

<div class="env-block definition">
<div class="env-title">Definition 2.3.1 (Electron Spin)</div>
<div class="env-body">
<p>Each electron possesses an intrinsic angular momentum called spin, described by quantum numbers \\(s = 1/2\\) and \\(m_s = \\pm 1/2\\). The spin state is represented by two orthonormal functions:</p>
\\[
\\alpha(\\sigma) \\equiv |{\\uparrow}\\rangle, \\quad m_s = +\\tfrac{1}{2}; \\qquad \\beta(\\sigma) \\equiv |{\\downarrow}\\rangle, \\quad m_s = -\\tfrac{1}{2}
\\]
<p>where \\(\\sigma\\) denotes the spin coordinate. The orthonormality conditions are:</p>
\\[
\\langle \\alpha|\\alpha\\rangle = \\langle\\beta|\\beta\\rangle = 1, \\qquad \\langle \\alpha|\\beta\\rangle = \\langle\\beta|\\alpha\\rangle = 0.
\\]
</div>
</div>

<div class="env-block definition">
<div class="env-title">Definition 2.3.2 (Spin-Orbital)</div>
<div class="env-body">
<p>A <em>spin-orbital</em> \\(\\chi(\\mathbf{x})\\) is a one-electron function of both spatial and spin coordinates \\(\\mathbf{x} = (\\mathbf{r}, \\sigma)\\):</p>
\\[
\\chi(\\mathbf{x}) = \\phi(\\mathbf{r})\\,\\omega(\\sigma)
\\]
<p>where \\(\\phi(\\mathbf{r})\\) is a spatial orbital and \\(\\omega(\\sigma) \\in \\{\\alpha, \\beta\\}\\). Each spatial orbital gives rise to two spin-orbitals.</p>
</div>
</div>

<h3>The Antisymmetry Principle</h3>

<div class="env-block theorem">
<div class="env-title">Theorem 2.3.3 (Pauli's Antisymmetry Principle)</div>
<div class="env-body">
<p>The wavefunction of a system of identical fermions must be <em>antisymmetric</em> under the exchange of any two particles:</p>
\\[
\\Psi(\\mathbf{x}_1, \\ldots, \\mathbf{x}_i, \\ldots, \\mathbf{x}_j, \\ldots, \\mathbf{x}_N) = -\\Psi(\\mathbf{x}_1, \\ldots, \\mathbf{x}_j, \\ldots, \\mathbf{x}_i, \\ldots, \\mathbf{x}_N)
\\]
<p>where \\(\\mathbf{x}_k = (\\mathbf{r}_k, \\sigma_k)\\) denotes all coordinates (spatial and spin) of electron \\(k\\).</p>
</div>
</div>

<div class="env-block corollary">
<div class="env-title">Corollary 2.3.4 (Pauli Exclusion Principle)</div>
<div class="env-body">
<p>No two electrons in an atom can occupy the same spin-orbital. Equivalently, no two electrons can have the same set of quantum numbers \\((n, l, m_l, m_s)\\).</p>
</div>
</div>

<div class="env-block proof">
<div class="env-title">Proof</div>
<div class="env-body">
<p>If electrons \\(i\\) and \\(j\\) occupy the same spin-orbital, then \\(\\chi_i = \\chi_j\\). Setting \\(\\mathbf{x}_i = \\mathbf{x}_j\\) in the antisymmetry condition:</p>
\\[
\\Psi(\\ldots, \\mathbf{x}_i, \\ldots, \\mathbf{x}_i, \\ldots) = -\\Psi(\\ldots, \\mathbf{x}_i, \\ldots, \\mathbf{x}_i, \\ldots)
\\]
<p>This implies \\(\\Psi = -\\Psi\\), hence \\(\\Psi = 0\\). A zero wavefunction is not normalizable, so the state is forbidden.</p>
<div class="qed">&#8718;</div>
</div>
</div>

<h3>Slater Determinants</h3>

<p>How do we construct an antisymmetric wavefunction from one-electron spin-orbitals? The answer is the <em>Slater determinant</em>, introduced by John C. Slater in 1929.</p>

<div class="env-block definition">
<div class="env-title">Definition 2.3.5 (Slater Determinant)</div>
<div class="env-body">
<p>For \\(N\\) electrons occupying spin-orbitals \\(\\chi_1, \\chi_2, \\ldots, \\chi_N\\), the Slater determinant is:</p>
\\[
\\Psi(\\mathbf{x}_1, \\ldots, \\mathbf{x}_N) = \\frac{1}{\\sqrt{N!}}
\\begin{vmatrix}
\\chi_1(\\mathbf{x}_1) & \\chi_2(\\mathbf{x}_1) & \\cdots & \\chi_N(\\mathbf{x}_1) \\\\
\\chi_1(\\mathbf{x}_2) & \\chi_2(\\mathbf{x}_2) & \\cdots & \\chi_N(\\mathbf{x}_2) \\\\
\\vdots & \\vdots & \\ddots & \\vdots \\\\
\\chi_1(\\mathbf{x}_N) & \\chi_2(\\mathbf{x}_N) & \\cdots & \\chi_N(\\mathbf{x}_N)
\\end{vmatrix}
\\]
<p>The factor \\(1/\\sqrt{N!}\\) ensures normalization. This is often written in shorthand as \\(|\\chi_1 \\chi_2 \\cdots \\chi_N\\rangle\\).</p>
</div>
</div>

<div class="env-block proposition">
<div class="env-title">Proposition 2.3.6</div>
<div class="env-body">
<p>The Slater determinant is antisymmetric under exchange of any two electrons and vanishes when any two spin-orbitals are identical.</p>
</div>
</div>

<div class="env-block proof">
<div class="env-title">Proof</div>
<div class="env-body">
<p>Exchanging electrons \\(i\\) and \\(j\\) swaps rows \\(i\\) and \\(j\\) of the determinant. A property of determinants is that swapping two rows changes the sign: \\(\\Psi \\to -\\Psi\\). If two spin-orbitals are identical (\\(\\chi_i = \\chi_j\\)), then two columns are equal, and a determinant with two equal columns is zero.</p>
<div class="qed">&#8718;</div>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example 2.3.7 (Helium Ground State)</div>
<div class="env-body">
<p>For helium, \\(N = 2\\) electrons both occupy the \\(1s\\) spatial orbital with opposite spins: \\(\\chi_1 = 1s\\alpha\\) and \\(\\chi_2 = 1s\\beta\\). The Slater determinant is:</p>
\\[
\\Psi(\\mathbf{x}_1, \\mathbf{x}_2) = \\frac{1}{\\sqrt{2}}
\\begin{vmatrix}
\\phi_{1s}(\\mathbf{r}_1)\\alpha(\\sigma_1) & \\phi_{1s}(\\mathbf{r}_1)\\beta(\\sigma_1) \\\\
\\phi_{1s}(\\mathbf{r}_2)\\alpha(\\sigma_2) & \\phi_{1s}(\\mathbf{r}_2)\\beta(\\sigma_2)
\\end{vmatrix}
\\]
\\[
= \\frac{1}{\\sqrt{2}}\\phi_{1s}(\\mathbf{r}_1)\\phi_{1s}(\\mathbf{r}_2)\\left[\\alpha(\\sigma_1)\\beta(\\sigma_2) - \\beta(\\sigma_1)\\alpha(\\sigma_2)\\right]
\\]
<p>The spatial part is symmetric (both electrons in \\(1s\\)), and the spin part \\(\\alpha\\beta - \\beta\\alpha\\) is the antisymmetric singlet. The overall wavefunction is antisymmetric.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-slater-builder"></div>
`,
            visualizations: [
                {
                    id: 'viz-slater-builder',
                    title: 'Slater Determinant Builder',
                    description: 'Select spin-orbitals to build a Slater determinant. See how the determinant expands and enforces antisymmetry.',
                    setup(body, controls) {
                        const viz = new VizEngine(body, { width: 650, height: 450 });

                        // Available orbitals
                        const orbitals = ['1s\u03B1', '1s\u03B2', '2s\u03B1', '2s\u03B2', '2p\u03B1', '2p\u03B2'];
                        let selected = [0, 1]; // default: 1s alpha, 1s beta

                        // Orbital toggle buttons
                        const orbDiv = document.createElement('div');
                        orbDiv.style.cssText = 'display:flex;flex-wrap:wrap;gap:6px;margin-bottom:4px;';
                        const orbButtons = [];
                        orbitals.forEach((name, i) => {
                            const btn = document.createElement('button');
                            btn.style.cssText = 'padding:3px 10px;border:1px solid #30363d;border-radius:4px;background:#1a1a40;color:#c9d1d9;font-size:0.78rem;cursor:pointer;';
                            btn.textContent = name;
                            btn.addEventListener('click', () => {
                                const idx = selected.indexOf(i);
                                if (idx >= 0) selected.splice(idx, 1);
                                else if (selected.length < 4) selected.push(i);
                                selected.sort((a, b) => a - b);
                                draw();
                            });
                            orbDiv.appendChild(btn);
                            orbButtons.push(btn);
                        });
                        controls.appendChild(orbDiv);

                        function draw() {
                            viz.clear();
                            const ctx = viz.ctx;
                            const N = selected.length;

                            // Highlight selected buttons
                            orbButtons.forEach((btn, i) => {
                                if (selected.includes(i)) {
                                    btn.style.background = '#2a4a3a';
                                    btn.style.borderColor = '#3fb950';
                                    btn.style.color = '#3fb950';
                                } else {
                                    btn.style.background = '#1a1a40';
                                    btn.style.borderColor = '#30363d';
                                    btn.style.color = '#c9d1d9';
                                }
                            });

                            if (N === 0) {
                                viz.screenText('Select spin-orbitals to build a Slater determinant', viz.width / 2, viz.height / 2, viz.colors.text, 14);
                                return;
                            }

                            // Title
                            viz.screenText('Slater Determinant (' + N + ' electrons)', viz.width / 2, 25, viz.colors.white, 14, 'center');
                            viz.screenText('1/\u221A' + N + '!', 40, 25 + (N * 14), viz.colors.teal, 13, 'center');

                            // Draw determinant matrix
                            const cellW = 70;
                            const cellH = 30;
                            const startX = (viz.width - N * cellW) / 2;
                            const startY = 55;

                            // Bracket
                            ctx.strokeStyle = viz.colors.white;
                            ctx.lineWidth = 2;
                            const bw = 6;
                            // left bracket
                            ctx.beginPath();
                            ctx.moveTo(startX - 2, startY - 4);
                            ctx.lineTo(startX - bw - 2, startY - 4);
                            ctx.lineTo(startX - bw - 2, startY + N * cellH + 4);
                            ctx.lineTo(startX - 2, startY + N * cellH + 4);
                            ctx.stroke();
                            // right bracket
                            ctx.beginPath();
                            ctx.moveTo(startX + N * cellW + 2, startY - 4);
                            ctx.lineTo(startX + N * cellW + bw + 2, startY - 4);
                            ctx.lineTo(startX + N * cellW + bw + 2, startY + N * cellH + 4);
                            ctx.lineTo(startX + N * cellW + 2, startY + N * cellH + 4);
                            ctx.stroke();

                            // Matrix entries
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            for (let row = 0; row < N; row++) {
                                for (let col = 0; col < N; col++) {
                                    const orbName = orbitals[selected[col]];
                                    const entry = orbName + '(x' + (row + 1) + ')';
                                    ctx.fillStyle = (row === col) ? viz.colors.blue : viz.colors.text;
                                    ctx.fillText(entry, startX + col * cellW + cellW / 2, startY + row * cellH + cellH / 2);
                                }
                            }

                            // Row labels
                            ctx.fillStyle = viz.colors.muted;
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'right';
                            for (let row = 0; row < N; row++) {
                                ctx.fillText('e' + (row + 1), startX - bw - 8, startY + row * cellH + cellH / 2);
                            }

                            // Expansion below
                            const expandY = startY + N * cellH + 40;
                            viz.screenText('Expanded form (first two terms):', viz.width / 2, expandY, viz.colors.teal, 12, 'center');

                            if (N === 1) {
                                viz.screenText(orbitals[selected[0]] + '(x\u2081)', viz.width / 2, expandY + 25, viz.colors.white, 13, 'center');
                            } else if (N === 2) {
                                const a = orbitals[selected[0]], b = orbitals[selected[1]];
                                const term1 = a + '(x\u2081)' + b + '(x\u2082)';
                                const term2 = a + '(x\u2082)' + b + '(x\u2081)';
                                viz.screenText('\u03A8 = (1/\u221A2)[ ' + term1 + ' \u2212 ' + term2 + ' ]', viz.width / 2, expandY + 25, viz.colors.white, 12, 'center');
                            } else if (N >= 3) {
                                viz.screenText('\u03A8 = (1/\u221A' + N + '!) \u00D7 sum of ' + VizEngine.factorial(N) + ' signed terms', viz.width / 2, expandY + 25, viz.colors.white, 12, 'center');
                            }

                            // Properties
                            const propY = expandY + 60;
                            viz.screenText('Properties:', viz.width / 2, propY, viz.colors.orange, 12, 'center');
                            viz.screenText('\u2022 Swap any two rows \u2192 sign changes (antisymmetry)', viz.width / 2, propY + 20, viz.colors.text, 11, 'center');
                            viz.screenText('\u2022 Two identical columns \u2192 determinant = 0 (Pauli exclusion)', viz.width / 2, propY + 40, viz.colors.text, 11, 'center');

                            // Check for duplicate orbitals
                            const hasDup = new Set(selected).size < selected.length;
                            if (hasDup) {
                                viz.screenText('WARNING: Duplicate orbitals detected! \u03A8 = 0', viz.width / 2, propY + 70, viz.colors.red, 13, 'center');
                            }
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show that for the two-electron Slater determinant in Example 2.3.7, exchanging the coordinates of the two electrons (\\(\\mathbf{x}_1 \\leftrightarrow \\mathbf{x}_2\\)) produces a sign change.',
                    hint: 'Write out \\(\\Psi(\\mathbf{x}_2, \\mathbf{x}_1)\\) explicitly and compare with \\(\\Psi(\\mathbf{x}_1, \\mathbf{x}_2)\\).',
                    solution: '\\(\\Psi(\\mathbf{x}_1, \\mathbf{x}_2) = \\frac{1}{\\sqrt{2}}\\phi_{1s}(\\mathbf{r}_1)\\phi_{1s}(\\mathbf{r}_2)[\\alpha(1)\\beta(2) - \\beta(1)\\alpha(2)]\\). Exchanging: \\(\\Psi(\\mathbf{x}_2, \\mathbf{x}_1) = \\frac{1}{\\sqrt{2}}\\phi_{1s}(\\mathbf{r}_2)\\phi_{1s}(\\mathbf{r}_1)[\\alpha(2)\\beta(1) - \\beta(2)\\alpha(1)] = -\\frac{1}{\\sqrt{2}}\\phi_{1s}(\\mathbf{r}_1)\\phi_{1s}(\\mathbf{r}_2)[\\alpha(1)\\beta(2) - \\beta(1)\\alpha(2)] = -\\Psi(\\mathbf{x}_1, \\mathbf{x}_2)\\). Antisymmetry confirmed.'
                },
                {
                    question: 'Write the Slater determinant for the ground state of lithium (\\(Z = 3\\)) using the orbital configuration \\(1s^2 2s^1\\).',
                    hint: 'Lithium has 3 electrons. The spin-orbitals are \\(1s\\alpha\\), \\(1s\\beta\\), and \\(2s\\alpha\\) (by convention, the unpaired electron is spin-up).',
                    solution: '\\[\\Psi = \\frac{1}{\\sqrt{6}} \\begin{vmatrix} 1s\\alpha(\\mathbf{x}_1) & 1s\\beta(\\mathbf{x}_1) & 2s\\alpha(\\mathbf{x}_1) \\\\ 1s\\alpha(\\mathbf{x}_2) & 1s\\beta(\\mathbf{x}_2) & 2s\\alpha(\\mathbf{x}_2) \\\\ 1s\\alpha(\\mathbf{x}_3) & 1s\\beta(\\mathbf{x}_3) & 2s\\alpha(\\mathbf{x}_3) \\end{vmatrix}\\] This expands to \\(3! = 6\\) terms with alternating signs.'
                },
                {
                    question: 'How many terms does the Slater determinant for carbon (\\(N = 6\\)) expand to?',
                    hint: 'An \\(N \\times N\\) determinant expands to \\(N!\\) terms.',
                    solution: 'The determinant expands to \\(N! = 6! = 720\\) terms. Each term is a product of 6 spin-orbitals evaluated at different electron coordinates, with a sign determined by the parity of the permutation.'
                },
                {
                    question: 'Prove that the Slater determinant is normalized to 1 if the constituent spin-orbitals are orthonormal.',
                    hint: 'Use the expansion of a determinant and the orthonormality of spin-orbitals: \\(\\langle \\chi_i | \\chi_j \\rangle = \\delta_{ij}\\).',
                    solution: 'Write \\(\\Psi = \\frac{1}{\\sqrt{N!}} \\sum_P (-1)^P P[\\chi_1(\\mathbf{x}_1)\\cdots\\chi_N(\\mathbf{x}_N)]\\). Then \\(\\langle\\Psi|\\Psi\\rangle = \\frac{1}{N!}\\sum_{P,Q}(-1)^{P+Q}\\prod_i \\langle\\chi_{P(i)}|\\chi_{Q(i)}\\rangle\\). Orthonormality forces \\(P = Q\\) in all non-vanishing terms, giving \\(\\langle\\Psi|\\Psi\\rangle = \\frac{1}{N!} \\cdot N! = 1\\).'
                },
                {
                    question: 'The antisymmetric spin function for two electrons is \\(\\frac{1}{\\sqrt{2}}[\\alpha(1)\\beta(2) - \\beta(1)\\alpha(2)]\\). Write down the three symmetric (triplet) spin functions.',
                    hint: 'The triplet has \\(S = 1\\), \\(M_S = +1, 0, -1\\).',
                    solution: 'The triplet spin functions are: \\(|S=1, M_S=+1\\rangle = \\alpha(1)\\alpha(2)\\); \\(|S=1, M_S=0\\rangle = \\frac{1}{\\sqrt{2}}[\\alpha(1)\\beta(2) + \\beta(1)\\alpha(2)]\\); \\(|S=1, M_S=-1\\rangle = \\beta(1)\\beta(2)\\). All three are symmetric under exchange of electrons 1 and 2.'
                }
            ]
        },

        // ========== SECTION 4: Aufbau, Hund's Rules, and the Periodic Table ==========
        {
            id: 'sec04-aufbau-hund',
            title: "Aufbau, Hund's Rules, and the Periodic Table",
            content: `
<h2>2.4 Aufbau, Hund's Rules, and the Periodic Table</h2>

<p>With the orbital approximation and Pauli exclusion principle in hand, we can now explain the structure of the periodic table. The <em>Aufbau principle</em> (German for "building up") dictates how electrons fill orbitals to give the ground-state configuration of an atom.</p>

<h3>The Aufbau Principle</h3>

<div class="env-block definition">
<div class="env-title">Definition 2.4.1 (Aufbau Principle)</div>
<div class="env-body">
<p>In the ground state of an atom, electrons fill spin-orbitals in order of increasing orbital energy \\(\\varepsilon_{nl}\\), subject to the Pauli exclusion principle (at most one electron per spin-orbital, or two electrons per spatial orbital).</p>
</div>
</div>

<p>For most of the periodic table, the filling order follows the <em>Madelung rule</em>: orbitals fill in order of increasing \\(n + l\\), and for equal \\(n + l\\), in order of increasing \\(n\\):</p>
\\[
1s \\to 2s \\to 2p \\to 3s \\to 3p \\to 4s \\to 3d \\to 4p \\to 5s \\to 4d \\to 5p \\to 6s \\to 4f \\to \\cdots
\\]

<div class="env-block warning">
<div class="env-title">Warning: Exceptions to the Madelung Rule</div>
<div class="env-body">
<p>The Madelung rule is a useful guideline, not an exact law. Notable exceptions include chromium (Cr: \\([\\text{Ar}]3d^5 4s^1\\) instead of \\(3d^4 4s^2\\)) and copper (Cu: \\([\\text{Ar}]3d^{10} 4s^1\\) instead of \\(3d^9 4s^2\\)). These arise because half-filled and fully filled \\(d\\)-subshells have extra stability due to exchange energy.</p>
</div>
</div>

<h3>Hund's Rules</h3>

<p>When electrons partially fill a subshell (a set of orbitals with the same \\(n\\) and \\(l\\)), how do they distribute among the \\(2l + 1\\) degenerate spatial orbitals? Hund's empirical rules answer this question:</p>

<div class="env-block theorem">
<div class="env-title">Theorem 2.4.2 (Hund's Rules for Ground-State Term)</div>
<div class="env-body">
<p>For a partially filled subshell, the ground-state term has:</p>
<ol>
<li><strong>Maximum \\(S\\):</strong> The total spin \\(S = \\sum m_s\\) is maximized (subject to the Pauli principle). Electrons in different orbitals of the same subshell prefer parallel spins.</li>
<li><strong>Maximum \\(L\\) (for given \\(S\\)):</strong> Among configurations with maximum \\(S\\), the ground state has the largest total orbital angular momentum \\(L\\).</li>
<li><strong>\\(J\\) value:</strong> For a subshell that is less than half-filled, \\(J = |L - S|\\). For a subshell more than half-filled, \\(J = L + S\\). (This is a spin-orbit coupling effect.)</li>
</ol>
</div>
</div>

<div class="env-block intuition">
<div class="env-title">Why Does Maximum \\(S\\) Win?</div>
<div class="env-body">
<p>Hund's first rule has a quantum mechanical origin in the <em>exchange interaction</em>. When two electrons have parallel spins, their spin function is symmetric, so the spatial wavefunction must be antisymmetric. An antisymmetric spatial function has a node when \\(\\mathbf{r}_1 = \\mathbf{r}_2\\), meaning the electrons avoid each other. This reduces the electron-electron repulsion energy, stabilizing the high-spin state. The energy lowering due to parallel spins is called the <em>exchange energy</em> \\(K\\).</p>
</div>
</div>

<h3>Term Symbols</h3>

<div class="env-block definition">
<div class="env-title">Definition 2.4.3 (Term Symbol)</div>
<div class="env-body">
<p>An atomic term is written as \\({}^{2S+1}L_J\\), where:</p>
<ul>
<li>\\(2S + 1\\) is the spin multiplicity (1 = singlet, 2 = doublet, 3 = triplet, ...)</li>
<li>\\(L\\) is the total orbital angular momentum, denoted by letters: \\(S(L{=}0), P(L{=}1), D(L{=}2), F(L{=}3), \\ldots\\)</li>
<li>\\(J\\) is the total angular momentum quantum number</li>
</ul>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example 2.4.4 (Carbon Ground-State Term)</div>
<div class="env-body">
<p>Carbon has configuration \\(1s^2 2s^2 2p^2\\). The two \\(2p\\) electrons are in a partially filled subshell. By Hund's rules:</p>
<ul>
<li>Rule 1: maximize \\(S\\). Both electrons spin-up: \\(S = 1\\), multiplicity \\(2S+1 = 3\\).</li>
<li>Rule 2: maximize \\(L\\). Place electrons in \\(m_l = 1\\) and \\(m_l = 0\\): \\(L = 1+0 = 1\\) (P term).</li>
<li>Rule 3: less than half-filled, so \\(J = |L - S| = |1 - 1| = 0\\).</li>
</ul>
<p>Ground-state term: \\({}^3P_0\\).</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example 2.4.5 (Oxygen Ground-State Term)</div>
<div class="env-body">
<p>Oxygen: \\(1s^2 2s^2 2p^4\\). The four \\(2p\\) electrons: three fill \\(m_l = 1, 0, -1\\) with spin up, the fourth goes in \\(m_l = 1\\) with spin down.</p>
<ul>
<li>\\(S = 3(\\frac{1}{2}) + 1(-\\frac{1}{2}) = 1\\), multiplicity 3.</li>
<li>\\(M_L = (1 + 0 + (-1)) + 1 = 1\\), so \\(L = 1\\) (P term).</li>
<li>More than half-filled: \\(J = L + S = 2\\).</li>
</ul>
<p>Ground-state term: \\({}^3P_2\\).</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-periodic-config"></div>
`,
            visualizations: [
                {
                    id: 'viz-periodic-config',
                    title: 'Periodic Table Electron Configuration Viewer',
                    description: 'Click on an element to see its electron configuration and energy-level filling.',
                    setup(body, controls) {
                        const viz = new VizEngine(body, { width: 700, height: 480 });

                        const elements = [
                            {s:'H',Z:1,c:'1s\u00B9'},{s:'He',Z:2,c:'1s\u00B2'},
                            {s:'Li',Z:3,c:'[He]2s\u00B9'},{s:'Be',Z:4,c:'[He]2s\u00B2'},
                            {s:'B',Z:5,c:'[He]2s\u00B22p\u00B9'},{s:'C',Z:6,c:'[He]2s\u00B22p\u00B2'},
                            {s:'N',Z:7,c:'[He]2s\u00B22p\u00B3'},{s:'O',Z:8,c:'[He]2s\u00B22p\u2074'},
                            {s:'F',Z:9,c:'[He]2s\u00B22p\u2075'},{s:'Ne',Z:10,c:'[He]2s\u00B22p\u2076'},
                            {s:'Na',Z:11,c:'[Ne]3s\u00B9'},{s:'Mg',Z:12,c:'[Ne]3s\u00B2'},
                            {s:'Al',Z:13,c:'[Ne]3s\u00B23p\u00B9'},{s:'Si',Z:14,c:'[Ne]3s\u00B23p\u00B2'},
                            {s:'P',Z:15,c:'[Ne]3s\u00B23p\u00B3'},{s:'S',Z:16,c:'[Ne]3s\u00B23p\u2074'},
                            {s:'Cl',Z:17,c:'[Ne]3s\u00B23p\u2075'},{s:'Ar',Z:18,c:'[Ne]3s\u00B23p\u2076'},
                            {s:'K',Z:19,c:'[Ar]4s\u00B9'},{s:'Ca',Z:20,c:'[Ar]4s\u00B2'},
                            {s:'Sc',Z:21,c:'[Ar]3d\u00B94s\u00B2'},{s:'Ti',Z:22,c:'[Ar]3d\u00B24s\u00B2'},
                            {s:'V',Z:23,c:'[Ar]3d\u00B34s\u00B2'},{s:'Cr',Z:24,c:'[Ar]3d\u20754s\u00B9'},
                            {s:'Mn',Z:25,c:'[Ar]3d\u20754s\u00B2'},{s:'Fe',Z:26,c:'[Ar]3d\u20764s\u00B2'},
                            {s:'Co',Z:27,c:'[Ar]3d\u20774s\u00B2'},{s:'Ni',Z:28,c:'[Ar]3d\u20784s\u00B2'},
                            {s:'Cu',Z:29,c:'[Ar]3d\u00B9\u20704s\u00B9'},{s:'Zn',Z:30,c:'[Ar]3d\u00B9\u20704s\u00B2'},
                            {s:'Ga',Z:31,c:'[Ar]3d\u00B9\u20704s\u00B24p\u00B9'},{s:'Ge',Z:32,c:'[Ar]3d\u00B9\u20704s\u00B24p\u00B2'},
                            {s:'As',Z:33,c:'[Ar]3d\u00B9\u20704s\u00B24p\u00B3'},{s:'Se',Z:34,c:'[Ar]3d\u00B9\u20704s\u00B24p\u2074'},
                            {s:'Br',Z:35,c:'[Ar]3d\u00B9\u20704s\u00B24p\u2075'},{s:'Kr',Z:36,c:'[Ar]3d\u00B9\u20704s\u00B24p\u2076'}
                        ];

                        // Periodic table layout (rows x cols) for Z=1..36
                        const layout = [
                            [{Z:1,col:0},{Z:2,col:17}],
                            [{Z:3,col:0},{Z:4,col:1},{Z:5,col:12},{Z:6,col:13},{Z:7,col:14},{Z:8,col:15},{Z:9,col:16},{Z:10,col:17}],
                            [{Z:11,col:0},{Z:12,col:1},{Z:13,col:12},{Z:14,col:13},{Z:15,col:14},{Z:16,col:15},{Z:17,col:16},{Z:18,col:17}],
                            [{Z:19,col:0},{Z:20,col:1},{Z:21,col:2},{Z:22,col:3},{Z:23,col:4},{Z:24,col:5},{Z:25,col:6},{Z:26,col:7},{Z:27,col:8},{Z:28,col:9},{Z:29,col:10},{Z:30,col:11},{Z:31,col:12},{Z:32,col:13},{Z:33,col:14},{Z:34,col:15},{Z:35,col:16},{Z:36,col:17}]
                        ];

                        let selectedZ = 6; // default carbon

                        // Click handling
                        viz.canvas.addEventListener('click', (e) => {
                            const rect = viz.canvas.getBoundingClientRect();
                            const mx = e.clientX - rect.left;
                            const my = e.clientY - rect.top;

                            const cellW = 34, cellH = 34;
                            const startX = 20, startY = 20;

                            for (let row = 0; row < layout.length; row++) {
                                for (const item of layout[row]) {
                                    const cx = startX + item.col * (cellW + 2);
                                    const cy = startY + row * (cellH + 2);
                                    if (mx >= cx && mx <= cx + cellW && my >= cy && my <= cy + cellH) {
                                        selectedZ = item.Z;
                                        draw();
                                        return;
                                    }
                                }
                            }
                        });

                        function getBlockColor(Z) {
                            const el = elements.find(e => e.Z === Z);
                            if (!el) return viz.colors.muted;
                            if (Z <= 2 || [3,4,11,12,19,20].includes(Z)) return viz.colors.blue;
                            if (Z >= 21 && Z <= 30) return viz.colors.orange;
                            return viz.colors.teal;
                        }

                        function draw() {
                            viz.clear();
                            const ctx = viz.ctx;
                            const cellW = 34, cellH = 34;
                            const startX = 20, startY = 20;

                            // Draw periodic table grid
                            for (let row = 0; row < layout.length; row++) {
                                for (const item of layout[row]) {
                                    const cx = startX + item.col * (cellW + 2);
                                    const cy = startY + row * (cellH + 2);
                                    const el = elements.find(e => e.Z === item.Z);
                                    const isSelected = item.Z === selectedZ;

                                    ctx.fillStyle = isSelected ? getBlockColor(item.Z) + '88' : viz.colors.bg + 'cc';
                                    ctx.strokeStyle = isSelected ? viz.colors.white : getBlockColor(item.Z) + '88';
                                    ctx.lineWidth = isSelected ? 2 : 1;
                                    ctx.fillRect(cx, cy, cellW, cellH);
                                    ctx.strokeRect(cx, cy, cellW, cellH);

                                    if (el) {
                                        ctx.fillStyle = isSelected ? viz.colors.white : getBlockColor(item.Z);
                                        ctx.font = 'bold 12px -apple-system,sans-serif';
                                        ctx.textAlign = 'center';
                                        ctx.textBaseline = 'middle';
                                        ctx.fillText(el.s, cx + cellW / 2, cy + cellH / 2 - 3);
                                        ctx.font = '8px -apple-system,sans-serif';
                                        ctx.fillStyle = viz.colors.muted;
                                        ctx.fillText(el.Z, cx + cellW / 2, cy + cellH / 2 + 10);
                                    }
                                }
                            }

                            // Block labels
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillStyle = viz.colors.blue + 'aa';
                            ctx.fillText('s-block', startX + cellW, startY + 4 * (cellH + 2) + 18);
                            ctx.fillStyle = viz.colors.orange + 'aa';
                            ctx.fillText('d-block', startX + 6.5 * (cellW + 2), startY + 4 * (cellH + 2) + 18);
                            ctx.fillStyle = viz.colors.teal + 'aa';
                            ctx.fillText('p-block', startX + 14.5 * (cellW + 2), startY + 4 * (cellH + 2) + 18);

                            // Selected element info
                            const sel = elements.find(e => e.Z === selectedZ);
                            if (sel) {
                                const infoX = 20, infoY = 195;
                                ctx.fillStyle = viz.colors.white;
                                ctx.font = 'bold 20px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.fillText(sel.s + ' (Z = ' + sel.Z + ')', infoX, infoY);

                                ctx.fillStyle = viz.colors.teal;
                                ctx.font = '14px -apple-system,sans-serif';
                                ctx.fillText('Configuration: ' + sel.c, infoX, infoY + 28);

                                // Draw energy level diagram
                                const diagX = 40, diagY = 250;
                                const levelW = 40, levelGap = 22;

                                // Subshells in filling order
                                const subshells = [
                                    {n:1,l:0,label:'1s',max:2},
                                    {n:2,l:0,label:'2s',max:2},
                                    {n:2,l:1,label:'2p',max:6},
                                    {n:3,l:0,label:'3s',max:2},
                                    {n:3,l:1,label:'3p',max:6},
                                    {n:4,l:0,label:'4s',max:2},
                                    {n:3,l:2,label:'3d',max:10},
                                    {n:4,l:1,label:'4p',max:6}
                                ];

                                let eRemaining = sel.Z;
                                let xOff = diagX;

                                for (const sub of subshells) {
                                    if (eRemaining <= 0) break;
                                    const nElec = Math.min(eRemaining, sub.max);
                                    eRemaining -= nElec;

                                    const nOrbitals = sub.max / 2;
                                    const subWidth = nOrbitals * (levelW + 8);

                                    // Subshell label
                                    ctx.fillStyle = viz.colors.text;
                                    ctx.font = '11px -apple-system,sans-serif';
                                    ctx.textAlign = 'center';
                                    ctx.fillText(sub.label, xOff + subWidth / 2, diagY + 210);

                                    // Energy level lines and electrons
                                    for (let orb = 0; orb < nOrbitals; orb++) {
                                        const lx = xOff + orb * (levelW + 8);
                                        const ly = diagY + 180 - sub.n * 35 + sub.l * 12;

                                        // Level line
                                        ctx.strokeStyle = viz.colors.axis;
                                        ctx.lineWidth = 2;
                                        ctx.beginPath();
                                        ctx.moveTo(lx, ly);
                                        ctx.lineTo(lx + levelW, ly);
                                        ctx.stroke();

                                        // Electrons
                                        const elecInOrb = Math.min(2, nElec - orb * 2);
                                        const midX = lx + levelW / 2;
                                        if (elecInOrb >= 1) {
                                            // up arrow
                                            ctx.strokeStyle = viz.colors.blue;
                                            ctx.lineWidth = 2;
                                            ctx.beginPath();
                                            ctx.moveTo(midX - 6, ly - 4);
                                            ctx.lineTo(midX - 6, ly - 18);
                                            ctx.stroke();
                                            ctx.fillStyle = viz.colors.blue;
                                            ctx.beginPath();
                                            ctx.moveTo(midX - 6, ly - 20);
                                            ctx.lineTo(midX - 10, ly - 14);
                                            ctx.lineTo(midX - 2, ly - 14);
                                            ctx.closePath();
                                            ctx.fill();
                                        }
                                        if (elecInOrb >= 2) {
                                            // down arrow
                                            ctx.strokeStyle = viz.colors.red;
                                            ctx.lineWidth = 2;
                                            ctx.beginPath();
                                            ctx.moveTo(midX + 6, ly - 18);
                                            ctx.lineTo(midX + 6, ly - 4);
                                            ctx.stroke();
                                            ctx.fillStyle = viz.colors.red;
                                            ctx.beginPath();
                                            ctx.moveTo(midX + 6, ly - 2);
                                            ctx.lineTo(midX + 2, ly - 8);
                                            ctx.lineTo(midX + 10, ly - 8);
                                            ctx.closePath();
                                            ctx.fill();
                                        }
                                    }

                                    xOff += subWidth + 16;
                                }
                            }
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Write the ground-state electron configuration and term symbol for nitrogen (\\(Z = 7\\)).',
                    hint: 'Nitrogen has configuration \\(1s^2 2s^2 2p^3\\). Apply Hund\'s rules to the three \\(2p\\) electrons.',
                    solution: 'Configuration: \\(1s^2 2s^2 2p^3\\). Three \\(2p\\) electrons: by Hund\'s rule 1, all three have parallel spins (\\(\\uparrow\\) in each of \\(m_l = 1, 0, -1\\)). \\(S = 3/2\\), multiplicity \\(2S+1 = 4\\). \\(L = 1 + 0 + (-1) = 0\\) (S term). Half-filled, so \\(J = |L - S| = 3/2\\). Term: \\({}^4S_{3/2}\\).'
                },
                {
                    question: 'Explain why chromium has configuration \\([\\text{Ar}]3d^5 4s^1\\) instead of \\([\\text{Ar}]3d^4 4s^2\\).',
                    hint: 'Think about the extra stability of half-filled subshells.',
                    solution: 'A half-filled \\(3d^5\\) subshell has all five \\(d\\) orbitals singly occupied with parallel spins. This maximizes the exchange energy \\(K\\), which is proportional to the number of parallel-spin pairs \\(\\binom{5}{2} = 10\\). In \\(3d^4 4s^2\\), there are only \\(\\binom{4}{2} = 6\\) parallel pairs among the \\(d\\) electrons. The exchange energy gain (\\(\\Delta K \\propto 10 - 6 = 4\\) additional pairs) outweighs the cost of promoting one \\(4s\\) electron to \\(3d\\).'
                },
                {
                    question: 'How many microstates (distinct arrangements of electrons in spin-orbitals) exist for the \\(2p^2\\) configuration of carbon?',
                    hint: 'There are 6 spin-orbitals in the \\(2p\\) subshell. Choose 2.',
                    solution: 'The number of microstates is \\(\\binom{6}{2} = 15\\). These 15 microstates give rise to the terms \\({}^3P\\) (9 states), \\({}^1D\\) (5 states), and \\({}^1S\\) (1 state): \\(9 + 5 + 1 = 15\\).'
                },
                {
                    question: 'Determine the ground-state term symbol for titanium (\\(Z = 22\\), configuration \\([\\text{Ar}]3d^2 4s^2\\)).',
                    hint: 'The closed \\(4s^2\\) shell contributes \\(S = 0, L = 0\\). Only the two \\(3d\\) electrons matter.',
                    solution: 'Two \\(3d\\) electrons: Hund\'s rule 1 gives \\(S = 1\\) (parallel spins). Hund\'s rule 2: maximize \\(L\\). Place electrons in \\(m_l = 2\\) and \\(m_l = 1\\): \\(L = 3\\) (F term). Less than half-filled: \\(J = |L - S| = |3 - 1| = 2\\). Ground-state term: \\({}^3F_2\\).'
                },
                {
                    question: 'The \\(2p\\) subshell can hold at most 6 electrons. Show that a \\(2p^4\\) configuration (like oxygen) produces the same set of terms as \\(2p^2\\) (like carbon).',
                    hint: 'This is the "electron-hole" equivalence. A subshell with \\(k\\) electrons has the same term structure as one with \\(\\text{max} - k\\) electrons (holes).',
                    solution: 'A \\(2p^4\\) configuration has 2 holes in the \\(2p\\) subshell. The term structure depends on the number of ways to arrange the particles (or equivalently, the holes). Since \\(\\binom{6}{4} = \\binom{6}{2} = 15\\), both configurations have 15 microstates and produce the same terms: \\({}^3P\\), \\({}^1D\\), \\({}^1S\\). The only difference is the \\(J\\) ordering (Hund\'s rule 3 reverses for more-than-half-filled shells).'
                }
            ]
        },

        // ========== SECTION 5: The Variational Method for Helium ==========
        {
            id: 'sec05-variational-helium',
            title: 'The Variational Method for Helium',
            content: `
<h2>2.5 The Variational Method for Helium</h2>

<p>We have seen that the non-interacting estimate for helium (\\(E = -4\\) Ha) is far from the experimental value (\\(-2.9037\\) Ha), and first-order perturbation theory (\\(-2.75\\) Ha) improves but remains off by 5%. The <em>variational method</em> provides a systematic, improvable approach to finding the ground-state energy and wavefunction.</p>

<h3>The Variational Principle</h3>

<div class="env-block theorem">
<div class="env-title">Theorem 2.5.1 (Variational Principle)</div>
<div class="env-body">
<p>For any normalized trial wavefunction \\(\\Psi_\\text{trial}\\), the expectation value of the Hamiltonian provides an upper bound to the exact ground-state energy \\(E_0\\):</p>
\\[
E[\\Psi_\\text{trial}] = \\langle \\Psi_\\text{trial} | \\hat{H} | \\Psi_\\text{trial} \\rangle \\geq E_0
\\]
<p>Equality holds if and only if \\(\\Psi_\\text{trial} = \\Psi_0\\) (the exact ground state).</p>
</div>
</div>

<div class="env-block proof">
<div class="env-title">Proof</div>
<div class="env-body">
<p>Expand \\(\\Psi_\\text{trial}\\) in the exact eigenbasis: \\(\\Psi_\\text{trial} = \\sum_n c_n \\Psi_n\\) where \\(\\hat{H}\\Psi_n = E_n\\Psi_n\\) and \\(E_0 \\leq E_1 \\leq E_2 \\leq \\cdots\\). Then:</p>
\\[
E[\\Psi_\\text{trial}] = \\sum_n |c_n|^2 E_n \\geq \\sum_n |c_n|^2 E_0 = E_0 \\sum_n |c_n|^2 = E_0
\\]
<p>where we used \\(E_n \\geq E_0\\) for all \\(n\\) and the normalization \\(\\sum_n |c_n|^2 = 1\\).</p>
<div class="qed">&#8718;</div>
</div>
</div>

<div class="env-block remark">
<div class="env-title">Remark 2.5.2</div>
<div class="env-body">
<p>The variational principle is extraordinarily powerful: we need not know anything about the exact solution. Any guess gives an upper bound, and better guesses give lower (tighter) bounds. The strategy is to parametrize the trial wavefunction and minimize the energy with respect to the parameters.</p>
</div>
</div>

<h3>Application to Helium: Screening Parameter</h3>

<p>The simplest variational trial function for helium uses the idea of <em>screening</em>: each electron partially shields the nucleus from the other. We use a hydrogen-like \\(1s\\) orbital but with an effective nuclear charge \\(Z_\\text{eff}\\) as a variational parameter:</p>

<div class="env-block definition">
<div class="env-title">Definition 2.5.3 (Screened Trial Wavefunction)</div>
<div class="env-body">
\\[
\\Psi_\\text{trial}(\\mathbf{r}_1, \\mathbf{r}_2) = \\frac{Z_\\text{eff}^3}{\\pi}\\, e^{-Z_\\text{eff}(r_1 + r_2)}
\\]
<p>This is a product of two \\(1s\\) orbitals with effective charge \\(Z_\\text{eff}\\) (replacing the true \\(Z = 2\\)). The parameter \\(Z_\\text{eff}\\) is to be determined variationally.</p>
</div>
</div>

<h3>Computing the Variational Energy</h3>

<p>The energy expectation value for this trial function can be evaluated analytically. Each one-electron integral is a hydrogen-like integral scaled by \\(Z_\\text{eff}\\):</p>

\\[
\\langle \\hat{T}_i \\rangle = \\frac{Z_\\text{eff}^2}{2}, \\qquad
\\langle -\\frac{Z}{r_i} \\rangle = -Z \\cdot Z_\\text{eff}
\\]

<p>The electron-electron repulsion integral evaluates to:</p>
\\[
\\langle \\frac{1}{r_{12}} \\rangle = \\frac{5}{8} Z_\\text{eff}
\\]

<p>Summing over both electrons:</p>

<div class="env-block theorem">
<div class="env-title">Theorem 2.5.4 (Variational Energy for Helium)</div>
<div class="env-body">
\\[
E(Z_\\text{eff}) = Z_\\text{eff}^2 - 2Z \\cdot Z_\\text{eff} + \\frac{5}{8}Z_\\text{eff}
\\]
<p>For the helium atom (\\(Z = 2\\)):</p>
\\[
E(Z_\\text{eff}) = Z_\\text{eff}^2 - \\frac{27}{8}Z_\\text{eff} + \\frac{Z_\\text{eff}^2}{\\text{(already included)}}
\\]
<p>More carefully: \\(E(Z_\\text{eff}) = Z_\\text{eff}^2 - 2(2)Z_\\text{eff} + \\frac{5}{8}Z_\\text{eff} = Z_\\text{eff}^2 - \\frac{27}{8}Z_\\text{eff}\\).</p>
</div>
</div>

<h3>Minimization</h3>

<p>Setting \\(dE/dZ_\\text{eff} = 0\\):</p>
\\[
2Z_\\text{eff} - \\frac{27}{8} = 0 \\implies Z_\\text{eff} = \\frac{27}{16} = 1.6875
\\]

<p>The optimal effective charge is less than \\(Z = 2\\), reflecting the screening of the nucleus by the other electron. The variational energy is:</p>
\\[
E_\\text{var} = \\left(\\frac{27}{16}\\right)^2 - \\frac{27}{8} \\cdot \\frac{27}{16} = -\\frac{729}{256} - \\frac{729}{128} = -\\frac{729}{256} \\approx -2.8477 \\text{ Ha}
\\]

<div class="env-block example">
<div class="env-title">Example 2.5.5 (Comparison of Approximations for Helium)</div>
<div class="env-body">
<table style="margin:12px auto;border-collapse:collapse;text-align:center;">
<tr style="border-bottom:2px solid #30363d;"><th style="padding:4px 16px;">Method</th><th style="padding:4px 16px;">Energy (Ha)</th><th style="padding:4px 16px;">Error (%)</th></tr>
<tr><td>Non-interacting (\\(Z_\\text{eff} = 2\\))</td><td>\\(-4.000\\)</td><td>\\(37.8\\)</td></tr>
<tr><td>First-order perturbation</td><td>\\(-2.750\\)</td><td>\\(5.3\\)</td></tr>
<tr><td>Variational (\\(Z_\\text{eff} = 27/16\\))</td><td>\\(-2.848\\)</td><td>\\(1.9\\)</td></tr>
<tr><td>Hartree-Fock limit</td><td>\\(-2.862\\)</td><td>\\(1.4\\)</td></tr>
<tr><td>Exact (Hylleraas, 1929)</td><td>\\(-2.9037\\)</td><td>\\(0.0\\)</td></tr>
</table>
<p>The simple one-parameter variational calculation already captures 98% of the exact energy. The remaining 1.4% is the <em>correlation energy</em>, which requires going beyond a single Slater determinant.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-variational-helium"></div>
`,
            visualizations: [
                {
                    id: 'viz-variational-helium',
                    title: 'Helium Variational Energy vs. Screening Parameter',
                    description: 'Drag the slider to change \\(Z_\\text{eff}\\) and see how the variational energy changes. The minimum gives the optimal screening.',
                    setup(body, controls) {
                        const viz = new VizEngine(body, { width: 600, height: 380, scale: 1, originX: 0, originY: 0 });

                        let zeff = 1.6875;
                        const zSlider = VizEngine.createSlider(controls, 'Z_eff', 0.5, 3.0, zeff, 0.01, (v) => {
                            zeff = v;
                            draw();
                        });

                        function energy(z) {
                            return z * z - (27 / 8) * z;
                        }

                        function draw() {
                            viz.clear();
                            const ctx = viz.ctx;
                            const W = viz.width, H = viz.height;
                            const padL = 70, padR = 30, padT = 40, padB = 50;
                            const plotW = W - padL - padR;
                            const plotH = H - padT - padB;

                            // Plot range
                            const zMin = 0.5, zMax = 3.0;
                            const eMin = -3.2, eMax = 0.5;

                            function toSx(z) { return padL + (z - zMin) / (zMax - zMin) * plotW; }
                            function toSy(e) { return padT + (eMax - e) / (eMax - eMin) * plotH; }

                            // Grid
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 0.5;
                            for (let e = -3; e <= 0; e += 0.5) {
                                const sy = toSy(e);
                                ctx.beginPath(); ctx.moveTo(padL, sy); ctx.lineTo(W - padR, sy); ctx.stroke();
                            }
                            for (let z = 0.5; z <= 3; z += 0.5) {
                                const sx = toSx(z);
                                ctx.beginPath(); ctx.moveTo(sx, padT); ctx.lineTo(sx, H - padB); ctx.stroke();
                            }

                            // Axes
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1.5;
                            ctx.beginPath(); ctx.moveTo(padL, padT); ctx.lineTo(padL, H - padB); ctx.lineTo(W - padR, H - padB); ctx.stroke();

                            // Axis labels
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            for (let z = 0.5; z <= 3; z += 0.5) {
                                ctx.fillText(z.toFixed(1), toSx(z), H - padB + 16);
                            }
                            ctx.textAlign = 'right';
                            for (let e = -3; e <= 0; e += 1) {
                                ctx.fillText(e.toFixed(0), padL - 8, toSy(e) + 4);
                            }

                            viz.screenText('Z_eff', W / 2, H - 8, viz.colors.text, 12);
                            ctx.save();
                            ctx.translate(15, H / 2);
                            ctx.rotate(-Math.PI / 2);
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('E(Z_eff) [Hartree]', 0, 0);
                            ctx.restore();

                            // Plot E(Zeff) curve
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            for (let i = 0; i <= 300; i++) {
                                const z = zMin + (zMax - zMin) * i / 300;
                                const e = energy(z);
                                const sx = toSx(z), sy = toSy(e);
                                if (i === 0) ctx.moveTo(sx, sy);
                                else ctx.lineTo(sx, sy);
                            }
                            ctx.stroke();

                            // Exact energy line
                            ctx.strokeStyle = viz.colors.green;
                            ctx.lineWidth = 1;
                            ctx.setLineDash([6, 4]);
                            ctx.beginPath();
                            ctx.moveTo(padL, toSy(-2.9037));
                            ctx.lineTo(W - padR, toSy(-2.9037));
                            ctx.stroke();
                            ctx.setLineDash([]);
                            viz.screenText('Exact: -2.904 Ha', W - padR - 70, toSy(-2.9037) - 10, viz.colors.green, 10);

                            // Current point
                            const eVal = energy(zeff);
                            const sx = toSx(zeff), sy = toSy(eVal);
                            ctx.fillStyle = viz.colors.orange;
                            ctx.beginPath();
                            ctx.arc(sx, sy, 6, 0, Math.PI * 2);
                            ctx.fill();

                            // Vertical line from point to axis
                            ctx.strokeStyle = viz.colors.orange + '66';
                            ctx.lineWidth = 1;
                            ctx.setLineDash([4, 4]);
                            ctx.beginPath();
                            ctx.moveTo(sx, sy);
                            ctx.lineTo(sx, H - padB);
                            ctx.stroke();
                            ctx.setLineDash([]);

                            // Info text
                            viz.screenText('Z_eff = ' + zeff.toFixed(3), W / 2, 20, viz.colors.orange, 13, 'center');
                            viz.screenText('E = ' + eVal.toFixed(4) + ' Ha', W / 2 + 150, 20, viz.colors.white, 13, 'center');

                            // Optimal point marker
                            const optZ = 27 / 16;
                            const optE = energy(optZ);
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 1;
                            ctx.setLineDash([3, 3]);
                            ctx.beginPath();
                            ctx.moveTo(toSx(optZ), toSy(optE));
                            ctx.lineTo(toSx(optZ), H - padB);
                            ctx.stroke();
                            ctx.setLineDash([]);
                            viz.screenText('Optimal: 27/16', toSx(optZ), H - padB + 30, viz.colors.teal, 10, 'center');
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Verify that \\(E(Z_\\text{eff}) = Z_\\text{eff}^2 - (27/8)Z_\\text{eff}\\) has its minimum at \\(Z_\\text{eff} = 27/16\\) and compute the minimum energy.',
                    hint: 'Take the derivative and set it to zero.',
                    solution: '\\(dE/dZ_\\text{eff} = 2Z_\\text{eff} - 27/8 = 0\\) gives \\(Z_\\text{eff} = 27/16\\). Second derivative: \\(d^2E/dZ_\\text{eff}^2 = 2 > 0\\), confirming a minimum. \\(E_\\min = (27/16)^2 - (27/8)(27/16) = 729/256 - 729/128 = -729/256 \\approx -2.8477\\) Ha.'
                },
                {
                    question: 'Interpret the optimal \\(Z_\\text{eff} = 27/16 \\approx 1.69\\) physically. Why is it less than \\(Z = 2\\)?',
                    hint: 'What does a reduced effective charge mean for each electron?',
                    solution: 'Each electron sees a nuclear charge reduced from \\(Z = 2\\) to \\(Z_\\text{eff} \\approx 1.69\\). The "missing" charge \\(\\sigma = Z - Z_\\text{eff} \\approx 0.3125\\) represents the screening of the nucleus by the other electron. Each electron partially shields the nuclear charge for its partner. The screening constant \\(\\sigma = 5/16\\) is less than 1 because the \\(1s\\) electrons interpenetrate each other, providing only partial screening.'
                },
                {
                    question: 'The correlation energy of helium is defined as \\(E_\\text{corr} = E_\\text{exact} - E_\\text{HF}\\). From the table in Example 2.5.5, calculate it.',
                    hint: 'Use \\(E_\\text{exact} = -2.9037\\) Ha and \\(E_\\text{HF} = -2.8617\\) Ha.',
                    solution: '\\(E_\\text{corr} = -2.9037 - (-2.8617) = -0.0420\\) Ha \\(\\approx -1.14\\) eV. This is a small fraction (1.4%) of the total energy but is chemically significant (\\(\\sim 26\\) kcal/mol), exceeding typical bond energies of weak interactions.'
                },
                {
                    question: 'Propose a two-parameter trial function for helium that should improve on the one-parameter result. What physical effect does the second parameter capture?',
                    hint: 'Consider allowing the two electrons to have different effective charges, or add radial correlation.',
                    solution: 'One option: \\(\\Psi = (e^{-\\alpha r_1} e^{-\\beta r_2} + e^{-\\beta r_1} e^{-\\alpha r_2})\\) with \\(\\alpha \\neq \\beta\\). This allows inner/outer shell differentiation. Another option: \\(\\Psi = e^{-Z_\\text{eff}(r_1 + r_2)}(1 + c\\, r_{12})\\), where the \\(r_{12}\\) term introduces explicit electron-electron correlation (the cusp condition). Both capture correlation effects absent in the simple screening model.'
                },
                {
                    question: 'Apply the variational method with the screened trial function to the hydride ion H\\(^-\\) (\\(Z = 1, N = 2\\)). Find the optimal \\(Z_\\text{eff}\\) and determine whether H\\(^-\\) is predicted to be bound.',
                    hint: 'Use the same formula \\(E(Z_\\text{eff}) = Z_\\text{eff}^2 - 2Z \\cdot Z_\\text{eff} + (5/8)Z_\\text{eff}\\) with \\(Z = 1\\).',
                    solution: '\\(E(Z_\\text{eff}) = Z_\\text{eff}^2 - 2(1)Z_\\text{eff} + (5/8)Z_\\text{eff} = Z_\\text{eff}^2 - (11/8)Z_\\text{eff}\\). Minimum: \\(dE/dZ_\\text{eff} = 2Z_\\text{eff} - 11/8 = 0\\) gives \\(Z_\\text{eff} = 11/16 = 0.6875\\). \\(E_\\min = -121/256 \\approx -0.4727\\) Ha. Compare with H atom energy: \\(-0.5\\) Ha. Since \\(-0.4727 > -0.5\\), this simple trial function predicts H\\(^-\\) is unbound! In reality, H\\(^-\\) is bound (\\(E = -0.5278\\) Ha), but more sophisticated trial functions are needed to demonstrate it variationally.'
                }
            ]
        }
    ]
});
