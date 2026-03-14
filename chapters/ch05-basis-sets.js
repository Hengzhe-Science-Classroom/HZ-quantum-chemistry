// === Chapter 5: Basis Sets ===
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch05',
    number: 5,
    title: 'Basis Sets',
    subtitle: 'Representing orbitals: from Slater functions to Gaussian contractions',
    sections: [
        // ========== SECTION 1: The LCAO Expansion and Matrix Equations ==========
        {
            id: 'sec05-1-lcao-roothaan',
            title: 'The LCAO Expansion and Matrix Equations',
            content: `
<h2>5.1 The LCAO Expansion and Matrix Equations</h2>

<div class="env-block intuition"><div class="env-title">Intuition — Why Expand in a Basis?</div><div class="env-body">
The Hartree-Fock equations \\(\\hat{f}\\phi_a = \\varepsilon_a \\phi_a\\) are integro-differential equations in a continuous function space, which is intractable on a computer. The key idea: expand each molecular orbital as a linear combination of known basis functions. This converts the differential equations into a matrix eigenvalue problem that can be solved with standard linear algebra.
</div></div>

<h3>The LCAO Ansatz</h3>

<p>We expand each spatial molecular orbital \\(\\phi_i\\) in a set of \\(K\\) known basis functions \\(\\{\\mu_1, \\mu_2, \\ldots, \\mu_K\\}\\):</p>
\\[
\\phi_i(\\mathbf{r}) = \\sum_{\\mu=1}^{K} C_{\\mu i}\\, \\chi_\\mu(\\mathbf{r}), \\qquad i = 1, 2, \\ldots, K.
\\]
<p>Here LCAO stands for "Linear Combination of Atomic Orbitals," though the basis functions need not be actual atomic orbitals. The expansion coefficients \\(C_{\\mu i}\\) are the unknowns to be determined.</p>

<div class="env-block remark"><div class="env-title">Remark</div><div class="env-body">
The basis set is typically not orthonormal: \\(\\langle \\chi_\\mu | \\chi_\\nu \\rangle = S_{\\mu\\nu} \\neq \\delta_{\\mu\\nu}\\) in general. This is because the basis functions are typically centered on different atoms and have nonzero overlap.
</div></div>

<h3>Deriving the Roothaan-Hall Equations</h3>

<p>Substituting the LCAO expansion into the HF equation \\(\\hat{f}\\phi_i = \\varepsilon_i \\phi_i\\):</p>
\\[
\\hat{f} \\sum_\\nu C_{\\nu i} \\chi_\\nu = \\varepsilon_i \\sum_\\nu C_{\\nu i} \\chi_\\nu.
\\]
<p>Multiplying on the left by \\(\\chi_\\mu^*\\) and integrating:</p>
\\[
\\sum_\\nu F_{\\mu\\nu} C_{\\nu i} = \\varepsilon_i \\sum_\\nu S_{\\mu\\nu} C_{\\nu i},
\\]
<p>where \\(F_{\\mu\\nu} = \\langle \\chi_\\mu | \\hat{f} | \\chi_\\nu \\rangle\\) is the Fock matrix element and \\(S_{\\mu\\nu} = \\langle \\chi_\\mu | \\chi_\\nu \\rangle\\) is the overlap matrix element.</p>

<div class="env-block theorem"><div class="env-title">Theorem 5.1.1 — Roothaan-Hall Equations</div><div class="env-body">
The LCAO-HF problem reduces to the generalized matrix eigenvalue equation
\\[
\\mathbf{FC} = \\mathbf{SC\\varepsilon},
\\]
where:
<ul>
<li>\\(\\mathbf{F}\\) is the \\(K \\times K\\) Fock matrix with elements \\(F_{\\mu\\nu} = H_{\\mu\\nu}^{\\text{core}} + \\sum_{\\lambda\\sigma} P_{\\lambda\\sigma}[(\\mu\\nu|\\lambda\\sigma) - \\frac{1}{2}(\\mu\\sigma|\\lambda\\nu)]\\),</li>
<li>\\(\\mathbf{S}\\) is the \\(K \\times K\\) overlap matrix with elements \\(S_{\\mu\\nu} = \\langle \\chi_\\mu | \\chi_\\nu \\rangle\\),</li>
<li>\\(\\mathbf{C}\\) is the \\(K \\times K\\) coefficient matrix,</li>
<li>\\(\\boldsymbol{\\varepsilon}\\) is the diagonal matrix of orbital energies.</li>
</ul>
This is a generalized eigenvalue problem due to the non-orthogonality of the basis (\\(\\mathbf{S} \\neq \\mathbf{I}\\)).
</div></div>

<div class="env-block definition"><div class="env-title">Definition 5.1.2 — Density Matrix</div><div class="env-body">
The density matrix (or first-order reduced density matrix in the AO basis) is
\\[
P_{\\mu\\nu} = 2\\sum_{a=1}^{N/2} C_{\\mu a} C_{\\nu a},
\\]
where the sum runs over the \\(N/2\\) occupied spatial orbitals. The factor of 2 accounts for double occupancy (closed shell). The density matrix encodes all the information about the occupied orbitals needed to construct the Fock matrix.
</div></div>

<div class="env-block definition"><div class="env-title">Definition 5.1.3 — Fock Matrix Elements</div><div class="env-body">
The Fock matrix in the AO basis has elements
\\[
F_{\\mu\\nu} = H_{\\mu\\nu}^{\\text{core}} + G_{\\mu\\nu},
\\]
where the core Hamiltonian matrix is
\\[
H_{\\mu\\nu}^{\\text{core}} = \\langle \\chi_\\mu | -\\tfrac{1}{2}\\nabla^2 - \\sum_A Z_A/r_{iA} | \\chi_\\nu \\rangle,
\\]
and the two-electron part is
\\[
G_{\\mu\\nu} = \\sum_{\\lambda\\sigma} P_{\\lambda\\sigma} \\left[(\\mu\\nu|\\lambda\\sigma) - \\tfrac{1}{2}(\\mu\\sigma|\\lambda\\nu)\\right].
\\]
Here \\((\\mu\\nu|\\lambda\\sigma) = \\int\\int \\chi_\\mu(1)\\chi_\\nu(1) r_{12}^{-1} \\chi_\\lambda(2)\\chi_\\sigma(2)\\,d\\mathbf{r}_1 d\\mathbf{r}_2\\) are the two-electron integrals in chemists' notation.
</div></div>

<div class="env-block proposition"><div class="env-title">Proposition 5.1.4 — Number of Two-Electron Integrals</div><div class="env-body">
For a basis of \\(K\\) functions, the number of unique two-electron integrals \\((\\mu\\nu|\\lambda\\sigma)\\) is approximately \\(K^4/8\\) (exploiting permutational symmetry). This \\(O(K^4)\\) scaling is the computational bottleneck of Hartree-Fock.
</div></div>

<div class="env-block proof"><div class="env-title">Proof</div><div class="env-body">
The four indices \\(\\mu, \\nu, \\lambda, \\sigma\\) each run from 1 to \\(K\\). The integral \\((\\mu\\nu|\\lambda\\sigma)\\) is symmetric under: (i) \\(\\mu \\leftrightarrow \\nu\\), (ii) \\(\\lambda \\leftrightarrow \\sigma\\), (iii) \\((\\mu\\nu) \\leftrightarrow (\\lambda\\sigma)\\) (for real orbitals). This gives a factor of \\(2 \\times 2 \\times 2 = 8\\) reduction, so the number of unique integrals is \\(\\binom{K(K+1)/2 + 1}{2} \\approx K^4/8\\) for large \\(K\\).
<div class="qed">∎</div>
</div></div>

<h3>Solving the Generalized Eigenvalue Problem</h3>

<p>The generalized eigenvalue problem \\(\\mathbf{FC} = \\mathbf{SC\\varepsilon}\\) can be converted to a standard eigenvalue problem by orthogonalizing the basis. The most common approach uses the symmetric orthogonalization \\(\\mathbf{X} = \\mathbf{S}^{-1/2}\\):</p>
\\[
\\mathbf{F}' = \\mathbf{X}^\\dagger \\mathbf{F} \\mathbf{X}, \\qquad \\mathbf{F}'\\mathbf{C}' = \\mathbf{C}'\\boldsymbol{\\varepsilon}, \\qquad \\mathbf{C} = \\mathbf{X}\\mathbf{C}'.
\\]

<div class="env-block warning"><div class="env-title">Warning — Near-Linear Dependence</div><div class="env-body">
If the basis set is nearly linearly dependent (some eigenvalues of \\(\\mathbf{S}\\) are very small), \\(\\mathbf{S}^{-1/2}\\) amplifies numerical noise. In practice, eigenvalues of \\(\\mathbf{S}\\) below a threshold (typically \\(10^{-6}\\)) are discarded, effectively reducing the basis set size. This is common with large, diffuse basis sets.
</div></div>
`,
            visualizations: [],
            exercises: [
                {
                    question: 'For H\\(_2\\) in a minimal basis (one 1s function per atom), the overlap matrix is \\(\\mathbf{S} = \\begin{pmatrix} 1 & S \\\\ S & 1 \\end{pmatrix}\\) where \\(S = \\langle 1s_A | 1s_B \\rangle\\). Find \\(\\mathbf{S}^{-1/2}\\).',
                    hint: 'Diagonalize \\(\\mathbf{S}\\) first. The eigenvectors of \\(\\begin{pmatrix} 1 & S \\\\ S & 1 \\end{pmatrix}\\) are \\(\\frac{1}{\\sqrt{2}}\\begin{pmatrix} 1 \\\\ 1 \\end{pmatrix}\\) and \\(\\frac{1}{\\sqrt{2}}\\begin{pmatrix} 1 \\\\ -1 \\end{pmatrix}\\).',
                    solution: 'The eigenvalues are \\(1 + S\\) and \\(1 - S\\). With eigenvectors \\(\\mathbf{U} = \\frac{1}{\\sqrt{2}}\\begin{pmatrix} 1 & 1 \\\\ 1 & -1 \\end{pmatrix}\\), we have \\(\\mathbf{S} = \\mathbf{U}\\begin{pmatrix} 1+S & 0 \\\\ 0 & 1-S \\end{pmatrix}\\mathbf{U}^T\\). Therefore \\(\\mathbf{S}^{-1/2} = \\mathbf{U}\\begin{pmatrix} (1+S)^{-1/2} & 0 \\\\ 0 & (1-S)^{-1/2} \\end{pmatrix}\\mathbf{U}^T = \\frac{1}{2}\\begin{pmatrix} (1+S)^{-1/2} + (1-S)^{-1/2} & (1+S)^{-1/2} - (1-S)^{-1/2} \\\\ (1+S)^{-1/2} - (1-S)^{-1/2} & (1+S)^{-1/2} + (1-S)^{-1/2} \\end{pmatrix}\\).'
                },
                {
                    question: 'Show that the HF energy can be written in terms of the density and Fock matrices as \\(E_{\\text{HF}} = \\frac{1}{2}\\mathrm{tr}[\\mathbf{P}(\\mathbf{H}^{\\text{core}} + \\mathbf{F})] + V_{NN}\\).',
                    hint: 'Use \\(\\mathbf{F} = \\mathbf{H}^{\\text{core}} + \\mathbf{G}\\) and \\(E = \\mathrm{tr}(\\mathbf{PH}^{\\text{core}}) + \\frac{1}{2}\\mathrm{tr}(\\mathbf{PG}) + V_{NN}\\).',
                    solution: '\\(E_{\\text{HF}} = \\sum_{\\mu\\nu} P_{\\nu\\mu} H_{\\mu\\nu}^{\\text{core}} + \\frac{1}{2}\\sum_{\\mu\\nu} P_{\\nu\\mu} G_{\\mu\\nu} + V_{NN} = \\mathrm{tr}(\\mathbf{PH}^{\\text{core}}) + \\frac{1}{2}\\mathrm{tr}(\\mathbf{PG}) + V_{NN}\\). Since \\(\\mathbf{F} = \\mathbf{H}^{\\text{core}} + \\mathbf{G}\\), we have \\(\\mathrm{tr}(\\mathbf{PF}) = \\mathrm{tr}(\\mathbf{PH}^{\\text{core}}) + \\mathrm{tr}(\\mathbf{PG})\\). Therefore \\(E_{\\text{HF}} = \\mathrm{tr}(\\mathbf{PH}^{\\text{core}}) + \\frac{1}{2}[\\mathrm{tr}(\\mathbf{PF}) - \\mathrm{tr}(\\mathbf{PH}^{\\text{core}})] + V_{NN} = \\frac{1}{2}\\mathrm{tr}[\\mathbf{P}(\\mathbf{H}^{\\text{core}} + \\mathbf{F})] + V_{NN}\\).'
                },
                {
                    question: 'How many unique two-electron integrals are there for a basis set with \\(K = 100\\) functions? Express the answer in millions.',
                    hint: 'The number of unique pairs \\((\\mu\\nu)\\) with \\(\\mu \\geq \\nu\\) is \\(K(K+1)/2\\). The number of unique integrals is \\(\\binom{K(K+1)/2 + 1}{2}\\).',
                    solution: 'The number of unique integrals is \\(M(M+1)/2\\) where \\(M = K(K+1)/2 = 100 \\cdot 101/2 = 5050\\). So the count is \\(5050 \\cdot 5051/2 = 12{,}753{,}775 \\approx 12.8\\) million. The \\(K^4/8\\) approximation gives \\(10^8/8 = 12.5\\) million, which is close. This \\(O(K^4)\\) scaling means that doubling the basis size increases the integral count by a factor of ~16.'
                },
                {
                    question: 'The Pople-Nesbet equations are the unrestricted analog of the Roothaan-Hall equations. Write them in matrix form.',
                    hint: 'In UHF, there are separate coefficient matrices \\(\\mathbf{C}^\\alpha\\) and \\(\\mathbf{C}^\\beta\\), and separate Fock matrices \\(\\mathbf{F}^\\alpha\\) and \\(\\mathbf{F}^\\beta\\).',
                    solution: 'The Pople-Nesbet equations are two coupled generalized eigenvalue problems: \\(\\mathbf{F}^\\alpha \\mathbf{C}^\\alpha = \\mathbf{S} \\mathbf{C}^\\alpha \\boldsymbol{\\varepsilon}^\\alpha\\) and \\(\\mathbf{F}^\\beta \\mathbf{C}^\\beta = \\mathbf{S} \\mathbf{C}^\\beta \\boldsymbol{\\varepsilon}^\\beta\\). The coupling arises because \\(\\mathbf{F}^\\alpha\\) depends on both \\(\\mathbf{P}^\\alpha\\) and \\(\\mathbf{P}^\\beta\\) (and vice versa): \\(F_{\\mu\\nu}^\\alpha = H_{\\mu\\nu}^{\\text{core}} + \\sum_{\\lambda\\sigma}[(P_{\\lambda\\sigma}^\\alpha + P_{\\lambda\\sigma}^\\beta)(\\mu\\nu|\\lambda\\sigma) - P_{\\lambda\\sigma}^\\alpha(\\mu\\sigma|\\lambda\\nu)]\\).'
                },
                {
                    question: 'Why does the Roothaan-Hall equation require an iterative (SCF) procedure even though it looks like a standard eigenvalue problem?',
                    hint: 'What enters the Fock matrix \\(\\mathbf{F}\\)?',
                    solution: 'The Fock matrix \\(\\mathbf{F}\\) depends on the density matrix \\(\\mathbf{P}\\), which in turn depends on the occupied MO coefficients \\(\\mathbf{C}\\). But \\(\\mathbf{C}\\) is what we are trying to find by solving the eigenvalue problem. This circular dependence means we must iterate: guess \\(\\mathbf{C}\\) (or \\(\\mathbf{P}\\)), build \\(\\mathbf{F}\\), solve \\(\\mathbf{FC} = \\mathbf{SC\\varepsilon}\\), extract new \\(\\mathbf{C}\\), form new \\(\\mathbf{P}\\), check convergence, and repeat. This is the self-consistent field (SCF) procedure.'
                }
            ]
        },

        // ========== SECTION 2: STO vs GTO ==========
        {
            id: 'sec05-2-sto-vs-gto',
            title: 'Slater-Type vs Gaussian-Type Orbitals',
            content: `
<h2>5.2 Slater-Type vs Gaussian-Type Orbitals</h2>

<p>The choice of basis functions \\(\\{\\chi_\\mu\\}\\) profoundly affects both the accuracy and computational cost of a quantum chemical calculation. The two fundamental types are Slater-type orbitals (STOs) and Gaussian-type orbitals (GTOs).</p>

<div class="env-block definition"><div class="env-title">Definition 5.2.1 — Slater-Type Orbital (STO)</div><div class="env-body">
A Slater-type orbital centered on atom \\(A\\) is
\\[
\\chi^{\\text{STO}}(\\mathbf{r}) = N\\, r_A^{n-1}\\, e^{-\\zeta r_A}\\, Y_l^m(\\theta, \\phi),
\\]
where \\(n, l, m\\) are quantum numbers, \\(\\zeta\\) is the orbital exponent, \\(r_A = |\\mathbf{r} - \\mathbf{R}_A|\\), and \\(Y_l^m\\) is a spherical harmonic. STOs have the correct:
<ul>
<li>Cusp at the nucleus (\\(e^{-\\zeta r}\\) has a discontinuous derivative at \\(r = 0\\)),</li>
<li>Exponential decay at large \\(r\\).</li>
</ul>
</div></div>

<div class="env-block definition"><div class="env-title">Definition 5.2.2 — Gaussian-Type Orbital (GTO)</div><div class="env-body">
A Gaussian-type orbital (in Cartesian form) centered on atom \\(A\\) is
\\[
\\chi^{\\text{GTO}}(\\mathbf{r}) = N\\, x_A^{l_x}\\, y_A^{l_y}\\, z_A^{l_z}\\, e^{-\\alpha r_A^2},
\\]
where \\(\\alpha\\) is the Gaussian exponent and \\(l_x + l_y + l_z = L\\) determines the angular momentum (\\(L = 0\\) for s, \\(L = 1\\) for p, \\(L = 2\\) for d, etc.).
</div></div>

<div class="viz-placeholder" data-viz="viz-sto-vs-gto"></div>

<h3>Why Gaussians Win: The Gaussian Product Theorem</h3>

<p>The decisive advantage of GTOs is that the product of two Gaussians centered on different atoms is itself a Gaussian centered at an intermediate point:</p>

<div class="env-block theorem"><div class="env-title">Theorem 5.2.3 — Gaussian Product Theorem</div><div class="env-body">
Given two Gaussian functions centered at \\(\\mathbf{A}\\) and \\(\\mathbf{B}\\):
\\[
e^{-\\alpha |\\mathbf{r} - \\mathbf{A}|^2} \\cdot e^{-\\beta |\\mathbf{r} - \\mathbf{B}|^2} = K_{AB}\\, e^{-(\\alpha + \\beta)|\\mathbf{r} - \\mathbf{P}|^2},
\\]
where \\(\\mathbf{P} = \\frac{\\alpha \\mathbf{A} + \\beta \\mathbf{B}}{\\alpha + \\beta}\\) is the weighted midpoint and \\(K_{AB} = e^{-\\frac{\\alpha\\beta}{\\alpha+\\beta}|\\mathbf{A} - \\mathbf{B}|^2}\\) is a constant prefactor.
</div></div>

<div class="env-block proof"><div class="env-title">Proof</div><div class="env-body">
Expand the exponents:
\\[
\\alpha|\\mathbf{r} - \\mathbf{A}|^2 + \\beta|\\mathbf{r} - \\mathbf{B}|^2 = (\\alpha + \\beta)\\mathbf{r}^2 - 2(\\alpha\\mathbf{A} + \\beta\\mathbf{B})\\cdot\\mathbf{r} + \\alpha\\mathbf{A}^2 + \\beta\\mathbf{B}^2.
\\]
Complete the square in \\(\\mathbf{r}\\): this gives \\((\\alpha+\\beta)|\\mathbf{r} - \\mathbf{P}|^2 + \\frac{\\alpha\\beta}{\\alpha+\\beta}|\\mathbf{A} - \\mathbf{B}|^2\\), confirming the result.
<div class="qed">∎</div>
</div></div>

<div class="env-block remark"><div class="env-title">Remark — Computational Consequence</div><div class="env-body">
<p>The Gaussian product theorem reduces a four-center two-electron integral to a sum of two-center integrals. For STOs, no such simplification exists: multi-center integrals over STOs require expensive numerical integration. This computational advantage is so overwhelming that all modern molecular quantum chemistry codes use GTOs, despite their inferior per-function accuracy.</p>
<p>The trade-off: a single STO captures the physics better than a single GTO, but 3-6 GTOs can approximate one STO well, and the integrals over those GTOs are far cheaper.</p>
</div></div>

<h3>Deficiencies of GTOs</h3>

<div class="env-block warning"><div class="env-title">Warning — GTO Deficiencies</div><div class="env-body">
<ol>
<li><strong>No cusp at the nucleus:</strong> \\(e^{-\\alpha r^2}\\) has zero slope at \\(r = 0\\), while the exact wavefunction has a cusp (Kato cusp condition). This requires many tight Gaussians to approximate the correct behavior near nuclei.</li>
<li><strong>Wrong long-range decay:</strong> \\(e^{-\\alpha r^2}\\) falls off too quickly compared to the correct \\(e^{-\\zeta r}\\). This requires diffuse Gaussians to describe the tail of the wavefunction, important for anions and excited states.</li>
</ol>
</div></div>

<table style="width:100%; border-collapse:collapse; margin:1em 0;">
<tr style="border-bottom:2px solid #30363d;">
<th style="text-align:left;padding:8px;">Property</th>
<th style="text-align:left;padding:8px;">STO</th>
<th style="text-align:left;padding:8px;">GTO</th>
</tr>
<tr style="border-bottom:1px solid #21262d;">
<td style="padding:8px;">Nuclear cusp</td>
<td style="padding:8px;">Correct (\\(e^{-\\zeta r}\\))</td>
<td style="padding:8px;">Wrong (\\(e^{-\\alpha r^2}\\), zero slope)</td>
</tr>
<tr style="border-bottom:1px solid #21262d;">
<td style="padding:8px;">Long-range decay</td>
<td style="padding:8px;">Correct (\\(e^{-\\zeta r}\\))</td>
<td style="padding:8px;">Too fast (\\(e^{-\\alpha r^2}\\))</td>
</tr>
<tr style="border-bottom:1px solid #21262d;">
<td style="padding:8px;">Multi-center integrals</td>
<td style="padding:8px;">Very expensive (numerical)</td>
<td style="padding:8px;">Analytical (product theorem)</td>
</tr>
<tr style="border-bottom:1px solid #21262d;">
<td style="padding:8px;">Functions needed per STO</td>
<td style="padding:8px;">1</td>
<td style="padding:8px;">~3-6 to match accuracy</td>
</tr>
<tr>
<td style="padding:8px;">Used in practice</td>
<td style="padding:8px;">ADF, some DFT codes</td>
<td style="padding:8px;">Virtually all molecular codes</td>
</tr>
</table>
`,
            visualizations: [
                {
                    id: 'viz-sto-vs-gto',
                    title: 'STO vs GTO Comparison',
                    description: 'Compare a Slater-type orbital \\(e^{-\\zeta r}\\) (blue) with a Gaussian-type orbital \\(e^{-\\alpha r^2}\\) (red). The GTO exponent \\(\\alpha\\) is chosen to match the STO at its maximum. Notice the cusp at the nucleus (\\(r = 0\\)) for the STO and the smooth, rounded top of the GTO. The STO also decays more slowly at large \\(r\\).',
                    setup(body, controls) {
                        const viz = new VizEngine(body, { scale: 50, originX: 60, originY: 300 });

                        let zeta = 1.0;
                        VizEngine.createSlider(controls, '\u03B6 (STO exponent)', 0.5, 3.0, zeta, 0.1, v => { zeta = v; draw(); });

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            const alpha = zeta * zeta / 2; // Match at peak

                            // STO: N * exp(-zeta * r)
                            const stoNorm = 2 * zeta * Math.sqrt(zeta); // normalization for 1s STO
                            viz.drawFunction(r => {
                                if (r < 0) return 0;
                                return stoNorm * Math.exp(-zeta * r);
                            }, 0, 8, viz.colors.blue, 2.5);

                            // GTO: N * exp(-alpha * r^2)
                            const gtoNorm = Math.pow(2 * alpha / Math.PI, 0.75) * 2;
                            viz.drawFunction(r => {
                                if (r < 0) return 0;
                                return gtoNorm * Math.exp(-alpha * r * r);
                            }, 0, 8, viz.colors.red, 2.5);

                            // r^2 * |STO|^2 (radial distribution)
                            viz.drawFunction(r => {
                                if (r <= 0) return 0;
                                const val = stoNorm * Math.exp(-zeta * r);
                                return r * r * val * val * 0.3;
                            }, 0.01, 8, viz.colors.blue + '66', 1.5);

                            // r^2 * |GTO|^2 (radial distribution)
                            viz.drawFunction(r => {
                                if (r <= 0) return 0;
                                const val = gtoNorm * Math.exp(-alpha * r * r);
                                return r * r * val * val * 0.3;
                            }, 0.01, 8, viz.colors.red + '66', 1.5);

                            // Mark the cusp vs smooth behavior
                            // STO has finite slope at r=0+
                            viz.drawPoint(0, stoNorm, viz.colors.blue, '', 4);
                            viz.drawPoint(0, gtoNorm, viz.colors.red, '', 4);

                            // Legend
                            viz.screenText('STO: exp(-\u03B6r),  \u03B6 = ' + zeta.toFixed(1), 140, 24, viz.colors.blue, 13, 'left');
                            viz.screenText('GTO: exp(-\u03B1r\u00B2), \u03B1 = ' + alpha.toFixed(2), 140, 44, viz.colors.red, 13, 'left');
                            viz.screenText('Faded: radial distribution r\u00B2|\u03C7|\u00B2', 140, 64, viz.colors.muted, 11, 'left');

                            // Axis labels
                            viz.screenText('r (bohr)', viz.width - 50, viz.originY - 12, viz.colors.text, 12);
                            viz.screenText('\u03C7(r)', viz.originX + 10, 10, viz.colors.text, 12);

                            // Annotate cusp
                            const ctx = viz.ctx;
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'left'; ctx.textBaseline = 'bottom';
                            const [sx0, sy0] = viz.toScreen(0.15, stoNorm * 0.9);
                            ctx.fillText('cusp', sx0, sy0);
                            const [sx1, sy1] = viz.toScreen(0.15, gtoNorm * 0.85);
                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillText('smooth (no cusp)', sx1, sy1);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Prove the Gaussian product theorem for two 1D Gaussians: \\(e^{-\\alpha(x-A)^2} \\cdot e^{-\\beta(x-B)^2} = K \\cdot e^{-(\\alpha+\\beta)(x-P)^2}\\). Find \\(P\\) and \\(K\\).',
                    hint: 'Expand both quadratics, collect terms in \\(x^2\\), \\(x\\), and constants, then complete the square.',
                    solution: 'Expanding: \\(\\alpha(x-A)^2 + \\beta(x-B)^2 = (\\alpha+\\beta)x^2 - 2(\\alpha A + \\beta B)x + \\alpha A^2 + \\beta B^2\\). Complete the square: \\((\\alpha+\\beta)[x - \\frac{\\alpha A + \\beta B}{\\alpha+\\beta}]^2 + \\frac{\\alpha\\beta}{\\alpha+\\beta}(A-B)^2\\). So \\(P = \\frac{\\alpha A + \\beta B}{\\alpha+\\beta}\\) and \\(K = e^{-\\frac{\\alpha\\beta}{\\alpha+\\beta}(A-B)^2}\\).'
                },
                {
                    question: 'A 1s STO with exponent \\(\\zeta = 1.0\\) satisfies the Kato cusp condition \\(\\lim_{r\\to 0^+} \\frac{d\\psi/dr}{\\psi} = -Z\\). Verify this for a hydrogen atom (\\(Z = 1\\)).',
                    hint: 'For \\(\\psi = N e^{-\\zeta r}\\), compute \\(d\\psi/dr\\) and evaluate the ratio at \\(r \\to 0^+\\).',
                    solution: '\\(\\psi = Ne^{-\\zeta r}\\), so \\(d\\psi/dr = -N\\zeta e^{-\\zeta r}\\). The ratio \\(\\frac{d\\psi/dr}{\\psi} = \\frac{-N\\zeta e^{-\\zeta r}}{Ne^{-\\zeta r}} = -\\zeta\\). For \\(\\zeta = 1\\) and \\(Z = 1\\): the ratio is \\(-1 = -Z\\). The cusp condition is satisfied. For a GTO, \\(\\psi = Ne^{-\\alpha r^2}\\), \\(d\\psi/dr = -2N\\alpha r e^{-\\alpha r^2} \\to 0\\) as \\(r \\to 0\\), so the cusp condition is never satisfied.'
                },
                {
                    question: 'How many Cartesian Gaussian functions are there for a given angular momentum \\(L\\)? List them explicitly for \\(L = 2\\) (d-type).',
                    hint: 'Count the number of non-negative integer solutions to \\(l_x + l_y + l_z = L\\).',
                    solution: 'The number of Cartesian components is \\(\\binom{L+2}{2} = (L+1)(L+2)/2\\). For \\(L = 2\\): \\(\\binom{4}{2} = 6\\) functions: \\(x^2, y^2, z^2, xy, xz, yz\\). Note that these 6 Cartesian d-functions contain 5 "pure" d-functions plus one redundant s-function (\\(x^2 + y^2 + z^2 = r^2\\), which is spherically symmetric). Codes must either remove this contamination or use spherical harmonic (pure) Gaussians, which give exactly \\(2L + 1 = 5\\) d-functions.'
                },
                {
                    question: 'Estimate the overlap integral \\(\\langle g_1 | g_2 \\rangle\\) for two s-type Gaussians \\(g_1 = e^{-\\alpha r_A^2}\\), \\(g_2 = e^{-\\beta r_B^2}\\) with \\(\\alpha = \\beta = 1.0\\) and \\(|\\mathbf{A} - \\mathbf{B}| = 2.0\\) bohr (omit normalization constants).',
                    hint: 'Use the Gaussian product theorem to combine the two Gaussians into one, then integrate. The integral of \\(e^{-\\gamma r^2}\\) over all space is \\((\\pi/\\gamma)^{3/2}\\).',
                    solution: 'By the product theorem: \\(g_1 g_2 = K \\cdot e^{-2r_P^2}\\) where \\(K = e^{-\\frac{1 \\cdot 1}{2}(2)^2} = e^{-2}\\). The unnormalized overlap is \\(K \\cdot \\int e^{-2r^2} d^3r = e^{-2} \\cdot (\\pi/2)^{3/2} = e^{-2} \\cdot 1.968 \\approx 0.266\\). The overlap decays as \\(e^{-\\alpha\\beta/(\\alpha+\\beta) \\cdot R^2}\\), showing exponential decay with distance for Gaussian overlaps.'
                },
                {
                    question: 'A common misconception is that GTOs are "wrong" while STOs are "right." Argue that in a complete basis set, the choice of GTO vs STO is irrelevant.',
                    hint: 'What does "complete basis set" mean?',
                    solution: 'A complete basis set spans the entire Hilbert space. If the set of all GTOs (with exponents ranging from 0 to infinity) forms a complete set, then any function, including an STO, can be expanded in terms of GTOs. Indeed, the GTO set is complete for \\(L^2\\) functions. The STO/GTO distinction matters only for finite, practical basis sets, where STOs give better per-function accuracy but GTOs have vastly cheaper integrals. In the complete basis set limit, both give the exact same HF energy and wavefunction.'
                }
            ]
        },

        // ========== SECTION 3: Contracted Gaussian Basis Sets ==========
        {
            id: 'sec05-3-contracted-gaussians',
            title: 'Contracted Gaussian Basis Sets',
            content: `
<h2>5.3 Contracted Gaussian Basis Sets</h2>

<p>Individual Gaussian functions (primitives) are poor approximations to atomic orbitals, but fixed linear combinations of them can be remarkably accurate. This leads to the concept of <em>contracted</em> basis sets.</p>

<div class="env-block definition"><div class="env-title">Definition 5.3.1 — Primitive and Contracted Gaussians</div><div class="env-body">
A <em>primitive Gaussian</em> is a single Gaussian function \\(g_p(\\mathbf{r}) = N_p\\, x^{l_x} y^{l_y} z^{l_z}\\, e^{-\\alpha_p r^2}\\). A <em>contracted Gaussian function</em> (CGF) is a fixed linear combination of primitives:
\\[
\\chi_\\mu(\\mathbf{r}) = \\sum_{p=1}^{L} d_{p\\mu}\\, g_p(\\mathbf{r}),
\\]
where the contraction coefficients \\(d_{p\\mu}\\) and exponents \\(\\alpha_p\\) are predetermined (not optimized in the molecular calculation) and \\(L\\) is the contraction length. Only the LCAO expansion coefficients \\(C_{\\mu i}\\) are optimized.
</div></div>

<div class="env-block remark"><div class="env-title">Remark — General vs Segmented Contraction</div><div class="env-body">
<ul>
<li><strong>Segmented contraction:</strong> Each primitive appears in only one contracted function. This is the Pople convention (e.g., STO-3G, 6-31G). It leads to more efficient integral evaluation.</li>
<li><strong>General contraction:</strong> Each primitive can contribute to multiple contracted functions. This is the Dunning convention (e.g., cc-pVDZ). It is more flexible but requires more complex integral code.</li>
</ul>
</div></div>

<h3>STO-\\(n\\)G Basis Sets</h3>

<div class="env-block definition"><div class="env-title">Definition 5.3.2 — STO-\\(n\\)G</div><div class="env-body">
The STO-\\(n\\)G basis uses \\(n\\) primitive Gaussians to approximate each Slater-type orbital by least-squares fitting. The most common variant is STO-3G (3 Gaussians per STO), which is the smallest reasonable basis set.
</div></div>

<div class="viz-placeholder" data-viz="viz-sto3g-fit"></div>

<div class="env-block example"><div class="env-title">Example 5.3.3 — STO-3G for Hydrogen (1s)</div><div class="env-body">
The STO-3G fit to a 1s STO with \\(\\zeta = 1.24\\) uses three Gaussians:
<table style="width:60%; margin:0.5em auto; border-collapse:collapse;">
<tr style="border-bottom:2px solid #30363d;"><th style="padding:4px;">\\(p\\)</th><th style="padding:4px;">\\(\\alpha_p\\)</th><th style="padding:4px;">\\(d_p\\)</th></tr>
<tr style="border-bottom:1px solid #21262d;"><td style="padding:4px;">1</td><td style="padding:4px;">3.42525</td><td style="padding:4px;">0.15433</td></tr>
<tr style="border-bottom:1px solid #21262d;"><td style="padding:4px;">2</td><td style="padding:4px;">0.62391</td><td style="padding:4px;">0.53533</td></tr>
<tr><td style="padding:4px;">3</td><td style="padding:4px;">0.16886</td><td style="padding:4px;">0.44463</td></tr>
</table>
The tight Gaussian (\\(\\alpha_1 = 3.43\\)) captures the near-nucleus region, the medium Gaussian (\\(\\alpha_2 = 0.62\\)) captures the bulk, and the diffuse Gaussian (\\(\\alpha_3 = 0.17\\)) captures the tail.
</div></div>

<h3>Split-Valence Basis Sets (Pople Family)</h3>

<div class="env-block definition"><div class="env-title">Definition 5.3.4 — Pople Notation</div><div class="env-body">
<p>Pople basis sets use a naming convention \\(X\\text{-}YZ\\text{G}\\) (or \\(X\\text{-}YZW\\text{G}\\) for triple-zeta valence):</p>
<ul>
<li><strong>\\(X\\):</strong> Number of primitives for each core orbital (single contraction).</li>
<li><strong>\\(YZ\\):</strong> The valence shell is split into two functions: one contracted from \\(Y\\) primitives and one from \\(Z\\) primitives (double-zeta valence).</li>
</ul>
<p>Examples: 3-21G, 6-31G, 6-311G.</p>
</div></div>

<div class="env-block example"><div class="env-title">Example 5.3.5 — 6-31G for Carbon</div><div class="env-body">
<ul>
<li><strong>Core 1s:</strong> One contracted function from 6 primitive Gaussians (tightly contracted).</li>
<li><strong>Inner valence (2s, 2p):</strong> One contracted function from 3 primitives each.</li>
<li><strong>Outer valence (2s', 2p'):</strong> One uncontracted primitive each.</li>
</ul>
Total for carbon: 1 (core) + 4 (inner valence: 1s + 3p) + 4 (outer valence: 1s + 3p) = 9 basis functions from 6 + 3 + 1 + 3 + 1 = 14 primitives (for s) plus additional for p.
</div></div>

<h3>Polarization and Diffuse Functions</h3>

<div class="env-block definition"><div class="env-title">Definition 5.3.6 — Polarization Functions</div><div class="env-body">
<em>Polarization functions</em> are basis functions of higher angular momentum than those occupied in the free atom. For example, d-functions on carbon (which has only s and p in its ground state) or p-functions on hydrogen. They allow the electron density to distort (polarize) in response to the molecular environment.
<p>Notation: 6-31G(d) or 6-31G* adds d-functions on heavy atoms; 6-31G(d,p) or 6-31G** adds p-functions on H as well.</p>
</div></div>

<div class="env-block definition"><div class="env-title">Definition 5.3.7 — Diffuse Functions</div><div class="env-body">
<em>Diffuse functions</em> are Gaussians with very small exponents that extend far from the nucleus. They are essential for:
<ul>
<li>Anions (loosely bound extra electron),</li>
<li>Excited states and Rydberg states,</li>
<li>Intermolecular interactions (hydrogen bonding, van der Waals),</li>
<li>Molecular properties (polarizabilities, dipole moments).</li>
</ul>
<p>Notation: + prefix (e.g., 6-31+G) for diffuse functions on heavy atoms; ++ (e.g., 6-31++G) for diffuse functions on H as well.</p>
</div></div>

<div class="env-block warning"><div class="env-title">Warning — Minimal Basis Limitations</div><div class="env-body">
STO-3G (a minimal basis) is useful only for qualitative orbital pictures and quick geometry checks. It makes large errors in energetics: typical energy errors are 20-50 kcal/mol for reaction energies. No publication-quality result should use STO-3G for energetics. The minimum for semi-quantitative work is a split-valence basis with polarization (e.g., 6-31G(d)).
</div></div>
`,
            visualizations: [
                {
                    id: 'viz-sto3g-fit',
                    title: 'STO-3G Fitting Visualizer',
                    description: 'Three Gaussians (dashed) are combined with fixed coefficients to approximate a Slater-type orbital (blue). The sum (green) closely matches the STO. Adjust the STO exponent \\(\\zeta\\) to see how the fit quality changes.',
                    setup(body, controls) {
                        const viz = new VizEngine(body, { scale: 50, originX: 60, originY: 300 });

                        let zeta = 1.0;
                        VizEngine.createSlider(controls, '\u03B6 (STO exponent)', 0.5, 3.0, zeta, 0.1, v => { zeta = v; draw(); });

                        // STO-3G exponents and coefficients (for zeta=1.0 1s STO)
                        // These are the standard STO-3G parameters, scaled by zeta^2
                        const baseAlphas = [2.22766, 0.40577, 0.10980];
                        const baseCoeffs = [0.15433, 0.53533, 0.44463];

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            // Scale exponents by zeta^2
                            const alphas = baseAlphas.map(a => a * zeta * zeta);

                            // STO
                            const stoFunc = r => {
                                if (r < 0) return 0;
                                return 2 * Math.pow(zeta, 1.5) * Math.exp(-zeta * r);
                            };
                            viz.drawFunction(stoFunc, 0, 8, viz.colors.blue, 2.5);

                            // Individual Gaussians (dashed)
                            const gColors = [viz.colors.orange + '99', viz.colors.purple + '99', viz.colors.teal + '99'];
                            const ctx = viz.ctx;

                            for (let i = 0; i < 3; i++) {
                                const alpha = alphas[i];
                                const coeff = baseCoeffs[i];
                                const norm = Math.pow(2 * alpha / Math.PI, 0.75);
                                const gFunc = r => {
                                    if (r < 0) return 0;
                                    return coeff * norm * Math.exp(-alpha * r * r);
                                };

                                // Draw dashed
                                ctx.setLineDash([5, 4]);
                                viz.drawFunction(gFunc, 0, 8, gColors[i], 1.5);
                                ctx.setLineDash([]);
                            }

                            // Contracted sum (STO-3G fit)
                            const fitFunc = r => {
                                if (r < 0) return 0;
                                let sum = 0;
                                for (let i = 0; i < 3; i++) {
                                    const alpha = alphas[i];
                                    const norm = Math.pow(2 * alpha / Math.PI, 0.75);
                                    sum += baseCoeffs[i] * norm * Math.exp(-alpha * r * r);
                                }
                                return sum;
                            };
                            viz.drawFunction(fitFunc, 0, 8, viz.colors.green, 2.5);

                            // Error (magnified)
                            viz.drawFunction(r => {
                                if (r < 0) return 0;
                                return (stoFunc(r) - fitFunc(r)) * 5;
                            }, 0, 8, viz.colors.red + '88', 1.5);

                            // Compute RMS error
                            let sumSq = 0, count = 0;
                            for (let r = 0; r <= 6; r += 0.01) {
                                const diff = stoFunc(r) - fitFunc(r);
                                sumSq += diff * diff * r * r; // r^2 weight for radial
                                count++;
                            }
                            const rms = Math.sqrt(sumSq / count);

                            // Legend
                            viz.screenText('STO (exact)', 140, 20, viz.colors.blue, 12, 'left');
                            viz.screenText('STO-3G (fit)', 140, 38, viz.colors.green, 12, 'left');
                            viz.screenText('Gaussians (dashed)', 140, 56, viz.colors.orange, 12, 'left');
                            viz.screenText('Error \u00d75 (red)', 140, 74, viz.colors.red, 12, 'left');
                            viz.screenText('RMS error: ' + rms.toFixed(4), 140, 94, viz.colors.muted, 11, 'left');

                            // Axis labels
                            viz.screenText('r (bohr)', viz.width - 50, viz.originY - 12, viz.colors.text, 12);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'For STO-3G on H\\(_2\\)O (O: 1s, 2s, 2p; H: 1s), count the total number of contracted basis functions and the total number of primitives.',
                    hint: 'O has a 1s core, a 2s valence, and 2p (three components) valence. Each H has a 1s. In STO-3G, each AO is represented by one contracted function from 3 primitives.',
                    solution: 'Oxygen: 1s + 2s + 2p\\(_x\\) + 2p\\(_y\\) + 2p\\(_z\\) = 5 contracted functions, each from 3 primitives = 15 primitives. Each hydrogen: 1s = 1 contracted function from 3 primitives = 3 primitives. Total: 5 + 1 + 1 = 7 contracted basis functions, 15 + 3 + 3 = 21 primitives. The Roothaan-Hall eigenvalue problem is \\(7 \\times 7\\), but the integrals involve 21 primitives.'
                },
                {
                    question: 'How many basis functions does 6-31G(d,p) provide for a water molecule? Compare with STO-3G.',
                    hint: 'For O in 6-31G(d,p): core = 1s contracted (from 6 primitives), inner valence = 1s + 3p (from 3 primitives each), outer valence = 1s + 3p (1 primitive each), polarization = 6 Cartesian d (or 5 pure d). For H: inner 1s (2 primitives), outer 1s (1 primitive), polarization 3p.',
                    solution: 'Oxygen: 1(core) + 4(inner valence) + 4(outer valence) + 6(d polarization, Cartesian) = 15 functions. Each hydrogen: 1(inner) + 1(outer) + 3(p polarization) = 5 functions. Total: 15 + 5 + 5 = 25 basis functions (vs. 7 for STO-3G). If using pure d-functions (5 instead of 6): 14 + 5 + 5 = 24 functions.'
                },
                {
                    question: 'Explain why the 6-31G basis set is called "split-valence double-zeta" and why the core orbitals are not split.',
                    hint: 'Consider how many functions describe each shell and what "double-zeta" means in terms of flexibility.',
                    solution: '"Double-zeta" means each valence orbital is described by two basis functions with different radial extents (different effective exponents or "zetas"). This allows the radial shape to adjust between a compact (inner) and diffuse (outer) combination. The core orbitals are not split because: (1) core electrons are tightly bound and relatively insensitive to the chemical environment, (2) splitting them would add basis functions and integrals without significantly improving chemical properties, and (3) the computational savings from a single core contraction are significant. This philosophy, called "split-valence," prioritizes flexibility where it matters most.'
                },
                {
                    question: 'Demonstrate that adding polarization functions to hydrogen (p-functions) is important for describing the O-H bond angle in water.',
                    hint: 'Consider what happens when you try to describe electron density between O and H using only s-functions on hydrogen.',
                    solution: 'With only an s-function on H, the electron density around hydrogen is spherically symmetric. The bonding density between O and H can only be described by the overlap of O\'s p-orbitals with H\'s s-orbital. Adding p-functions on H allows the hydrogen basis to distort toward the oxygen, creating a polarized charge distribution. For the bond angle: the optimal H-O-H angle depends on the balance between sp hybridization on O and the H-H repulsion. Without p-functions on H, the basis cannot properly describe the angular variation of the bonding density, leading to bond angle errors of several degrees. With p-polarization (6-31G**), the H-O-H angle is ~105.5 degrees, much closer to experiment (~104.5 degrees) than 6-31G (~111.6 degrees).'
                },
                {
                    question: 'Why are diffuse functions especially important for anions like F\\(^-\\)? What happens if you optimize F\\(^-\\) with 6-31G (no diffuse functions)?',
                    hint: 'The extra electron in F\\(^-\\) is loosely bound. Standard basis functions are optimized for neutral atoms.',
                    solution: 'F\\(^-\\) has an extra electron that is weakly bound (electron affinity of F is only 3.4 eV). This extra electron occupies a diffuse orbital extending far from the nucleus. Standard basis sets (e.g., 6-31G) have exponents optimized for neutral F, which are too tight to describe this diffuse density. Without diffuse functions, HF/6-31G predicts F\\(^-\\) to be unbound (positive electron affinity), because the basis cannot accommodate the extended charge distribution. Adding diffuse functions (6-31+G) allows the extra electron to spread out, and the calculation correctly predicts a stable anion.'
                }
            ]
        },

        // ========== SECTION 4: Correlation-Consistent Basis Sets ==========
        {
            id: 'sec05-4-cc-basis-sets',
            title: 'Correlation-Consistent Basis Sets',
            content: `
<h2>5.4 Correlation-Consistent Basis Sets</h2>

<p>The Pople basis sets (Section 5.3) were designed largely for HF calculations. For correlated methods (MP2, CCSD(T), etc.), the Dunning correlation-consistent basis sets provide a systematic path to the complete basis set (CBS) limit.</p>

<div class="env-block definition"><div class="env-title">Definition 5.4.1 — Correlation-Consistent Basis Sets (cc-pVXZ)</div><div class="env-body">
The correlation-consistent polarized valence X-zeta basis sets, denoted cc-pVXZ (X = D, T, Q, 5, 6, ...), are designed so that:
<ul>
<li>Shells of functions that contribute similar amounts of correlation energy are added together.</li>
<li>Increasing \\(X\\) systematically improves the basis toward the CBS limit.</li>
</ul>
The notation: cc = correlation consistent, p = polarized, V = valence, X = zeta level (D = double, T = triple, Q = quadruple, 5 = quintuple).
</div></div>

<div class="env-block example"><div class="env-title">Example 5.4.2 — cc-pVXZ for Carbon</div><div class="env-body">
<table style="width:100%; border-collapse:collapse; margin:0.5em 0;">
<tr style="border-bottom:2px solid #30363d;">
<th style="padding:6px;">Basis</th>
<th style="padding:6px;">Functions on C</th>
<th style="padding:6px;">Total per C</th>
<th style="padding:6px;">Polarization added</th>
</tr>
<tr style="border-bottom:1px solid #21262d;">
<td style="padding:6px;">cc-pVDZ</td>
<td style="padding:6px;">3s2p1d</td>
<td style="padding:6px;">14</td>
<td style="padding:6px;">1d</td>
</tr>
<tr style="border-bottom:1px solid #21262d;">
<td style="padding:6px;">cc-pVTZ</td>
<td style="padding:6px;">4s3p2d1f</td>
<td style="padding:6px;">30</td>
<td style="padding:6px;">2d1f</td>
</tr>
<tr style="border-bottom:1px solid #21262d;">
<td style="padding:6px;">cc-pVQZ</td>
<td style="padding:6px;">5s4p3d2f1g</td>
<td style="padding:6px;">55</td>
<td style="padding:6px;">3d2f1g</td>
</tr>
<tr>
<td style="padding:6px;">cc-pV5Z</td>
<td style="padding:6px;">6s5p4d3f2g1h</td>
<td style="padding:6px;">91</td>
<td style="padding:6px;">4d3f2g1h</td>
</tr>
</table>
<p>Note the systematic addition of higher angular momentum functions: each step from X to X+1 adds one more function in each angular momentum channel, plus a new highest angular momentum.</p>
</div></div>

<h3>Complete Basis Set Extrapolation</h3>

<p>The systematic improvement of cc-pVXZ basis sets enables extrapolation to the complete basis set (CBS) limit. The two most common extrapolation formulas are:</p>

<div class="env-block theorem"><div class="env-title">Theorem 5.4.3 — CBS Extrapolation Formulas</div><div class="env-body">
For the HF energy, the convergence is exponential:
\\[
E_{\\text{HF}}(X) \\approx E_{\\text{HF}}^{\\text{CBS}} + A\\, e^{-\\alpha X},
\\]
where \\(X\\) is the cardinal number (2 for DZ, 3 for TZ, etc.). For the correlation energy, the convergence follows an inverse power law (Helgaker et al.):
\\[
E_{\\text{corr}}(X) \\approx E_{\\text{corr}}^{\\text{CBS}} + \\frac{B}{X^3}.
\\]
With energies at two consecutive zeta levels (e.g., TZ and QZ), \\(E_{\\text{corr}}^{\\text{CBS}}\\) can be estimated analytically.
</div></div>

<div class="viz-placeholder" data-viz="viz-basis-convergence"></div>

<div class="env-block example"><div class="env-title">Example 5.4.4 — CBS Extrapolation for N\\(_2\\)</div><div class="env-body">
CCSD(T) correlation energies for N\\(_2\\) (in mHartree):
<table style="width:60%; margin:0.5em auto; border-collapse:collapse;">
<tr style="border-bottom:2px solid #30363d;"><th style="padding:4px;">Basis</th><th style="padding:4px;">X</th><th style="padding:4px;">\\(E_{\\text{corr}}\\)</th></tr>
<tr style="border-bottom:1px solid #21262d;"><td style="padding:4px;">cc-pVDZ</td><td style="padding:4px;">2</td><td style="padding:4px;">-311.1</td></tr>
<tr style="border-bottom:1px solid #21262d;"><td style="padding:4px;">cc-pVTZ</td><td style="padding:4px;">3</td><td style="padding:4px;">-388.1</td></tr>
<tr style="border-bottom:1px solid #21262d;"><td style="padding:4px;">cc-pVQZ</td><td style="padding:4px;">4</td><td style="padding:4px;">-416.8</td></tr>
<tr><td style="padding:4px;">CBS (TZ/QZ)</td><td style="padding:4px;">\\(\\infty\\)</td><td style="padding:4px;">-435.5</td></tr>
</table>
Using the two-point formula: \\(E^{\\text{CBS}} = \\frac{4^3 E(4) - 3^3 E(3)}{4^3 - 3^3} = \\frac{64(-416.8) - 27(-388.1)}{37} \\approx -435.5\\) mHartree.
</div></div>

<div class="env-block definition"><div class="env-title">Definition 5.4.5 — Augmented Basis Sets (aug-cc-pVXZ)</div><div class="env-body">
The prefix "aug-" denotes the addition of one set of diffuse functions for each angular momentum already present in the basis. For example, aug-cc-pVDZ for carbon adds diffuse s, p, d functions to the cc-pVDZ set. These are essential for:
<ul>
<li>Anions and weakly bound species,</li>
<li>Excited states and response properties,</li>
<li>Noncovalent interactions (dispersion, hydrogen bonding),</li>
<li>Electric properties (polarizabilities, hyperpolarizabilities).</li>
</ul>
</div></div>

<div class="env-block remark"><div class="env-title">Remark — Basis Set Hierarchy</div><div class="env-body">
The Dunning hierarchy provides a systematic approach to basis set convergence: cc-pVDZ \\(\\subset\\) cc-pVTZ \\(\\subset\\) cc-pVQZ \\(\\subset \\cdots \\to\\) CBS. Each step improves both the HF and correlation energies in a balanced way. This is in contrast to the Pople basis sets, where adding polarization, diffuse functions, and increasing the valence splitting are independent choices, making systematic convergence studies more difficult.
</div></div>
`,
            visualizations: [
                {
                    id: 'viz-basis-convergence',
                    title: 'Basis Set Convergence',
                    description: 'Energy convergence as a function of basis set quality. The HF energy converges exponentially fast, while the correlation energy converges much more slowly (as \\(X^{-3}\\)). Adjust the molecule to see different convergence patterns.',
                    setup(body, controls) {
                        const viz = new VizEngine(body, { scale: 1, originX: 80, originY: 30 });
                        const ctx = viz.ctx;

                        // Model data for different molecules
                        const molecules = {
                            'H2O': {
                                hf:   [-76.010, -76.058, -76.065, -76.067, -76.068],
                                corr: [-0.213, -0.301, -0.342, -0.360, -0.370]
                            },
                            'N2': {
                                hf:   [-108.95, -108.98, -108.99, -108.993, -108.994],
                                corr: [-0.311, -0.388, -0.417, -0.430, -0.435]
                            },
                            'CH4': {
                                hf:   [-40.18, -40.21, -40.217, -40.219, -40.220],
                                corr: [-0.155, -0.230, -0.262, -0.276, -0.283]
                            }
                        };

                        let currentMol = 'H2O';
                        const labels = ['DZ', 'TZ', 'QZ', '5Z', 'CBS'];
                        const xvals = [2, 3, 4, 5, 6]; // cardinal numbers (6 = CBS proxy)

                        VizEngine.createButton(controls, 'H\u2082O', () => { currentMol = 'H2O'; draw(); });
                        VizEngine.createButton(controls, 'N\u2082', () => { currentMol = 'N2'; draw(); });
                        VizEngine.createButton(controls, 'CH\u2084', () => { currentMol = 'CH4'; draw(); });

                        function draw() {
                            viz.clear();

                            const data = molecules[currentMol];
                            const hf = data.hf;
                            const corr = data.corr;
                            const cbsHF = hf[4];
                            const cbsCorr = corr[4];

                            // Compute percentage recovered
                            const hfPct = hf.map(e => (1 - (e - cbsHF) / (hf[0] - cbsHF)) * 100);
                            const corrPct = corr.map(e => (1 - (e - cbsCorr) / (corr[0] - cbsCorr)) * 100);

                            // Chart dimensions
                            const chartLeft = 90;
                            const chartRight = viz.width - 40;
                            const chartTop = 50;
                            const chartBottom = viz.height - 60;
                            const chartW = chartRight - chartLeft;
                            const chartH = chartBottom - chartTop;

                            // Background
                            ctx.fillStyle = '#0e1117';
                            ctx.fillRect(chartLeft, chartTop, chartW, chartH);

                            // Grid lines
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 0.5;
                            for (let pct = 0; pct <= 100; pct += 20) {
                                const y = chartBottom - (pct / 100) * chartH;
                                ctx.beginPath(); ctx.moveTo(chartLeft, y); ctx.lineTo(chartRight, y); ctx.stroke();
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '10px -apple-system,sans-serif';
                                ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
                                ctx.fillText(pct + '%', chartLeft - 6, y);
                            }

                            // X axis labels
                            ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                            for (let i = 0; i < 5; i++) {
                                const x = chartLeft + (i / 4) * chartW;
                                ctx.fillStyle = viz.colors.text;
                                ctx.fillText(labels[i], x, chartBottom + 8);

                                // Vertical grid
                                ctx.strokeStyle = viz.colors.grid;
                                ctx.beginPath(); ctx.moveTo(x, chartTop); ctx.lineTo(x, chartBottom); ctx.stroke();
                            }

                            // Plot HF convergence
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            for (let i = 0; i < 5; i++) {
                                const x = chartLeft + (i / 4) * chartW;
                                const y = chartBottom - (hfPct[i] / 100) * chartH;
                                if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
                            }
                            ctx.stroke();

                            // Plot correlation convergence
                            ctx.strokeStyle = viz.colors.red;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            for (let i = 0; i < 5; i++) {
                                const x = chartLeft + (i / 4) * chartW;
                                const y = chartBottom - (corrPct[i] / 100) * chartH;
                                if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
                            }
                            ctx.stroke();

                            // Data points
                            for (let i = 0; i < 5; i++) {
                                const x = chartLeft + (i / 4) * chartW;
                                const yHF = chartBottom - (hfPct[i] / 100) * chartH;
                                const yCorr = chartBottom - (corrPct[i] / 100) * chartH;
                                ctx.fillStyle = viz.colors.blue;
                                ctx.beginPath(); ctx.arc(x, yHF, 4, 0, Math.PI * 2); ctx.fill();
                                ctx.fillStyle = viz.colors.red;
                                ctx.beginPath(); ctx.arc(x, yCorr, 4, 0, Math.PI * 2); ctx.fill();
                            }

                            // CBS line at 100%
                            ctx.setLineDash([4, 4]);
                            ctx.strokeStyle = viz.colors.green;
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(chartLeft, chartBottom - chartH);
                            ctx.lineTo(chartRight, chartBottom - chartH);
                            ctx.stroke();
                            ctx.setLineDash([]);

                            // Legend
                            ctx.font = '12px -apple-system,sans-serif'; ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
                            const lx = chartLeft + 15, ly = chartTop + 18;
                            ctx.fillStyle = viz.colors.blue;
                            ctx.beginPath(); ctx.arc(lx, ly, 4, 0, Math.PI * 2); ctx.fill();
                            ctx.fillText('HF energy (fast, exponential)', lx + 12, ly);
                            ctx.fillStyle = viz.colors.red;
                            ctx.beginPath(); ctx.arc(lx, ly + 20, 4, 0, Math.PI * 2); ctx.fill();
                            ctx.fillText('Correlation energy (slow, X\u207B\u00B3)', lx + 12, ly + 20);

                            // Title
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Basis Set Convergence: ' + currentMol, viz.width / 2, 20);

                            // Axis labels
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Basis set (cc-pVXZ)', (chartLeft + chartRight) / 2, viz.height - 10);

                            ctx.save();
                            ctx.translate(15, (chartTop + chartBottom) / 2);
                            ctx.rotate(-Math.PI / 2);
                            ctx.textAlign = 'center';
                            ctx.fillText('% of CBS energy recovered', 0, 0);
                            ctx.restore();

                            // Actual energy values
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.muted;
                            ctx.textAlign = 'left';
                            ctx.fillText('E_HF(CBS) = ' + cbsHF.toFixed(3) + ' Ha', chartLeft + 10, chartBottom + 30);
                            ctx.fillText('E_corr(CBS) = ' + cbsCorr.toFixed(3) + ' Ha', chartLeft + 10, chartBottom + 44);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Using the \\(X^{-3}\\) extrapolation formula, estimate the CBS correlation energy from cc-pVDZ (\\(E_{\\text{corr}} = -0.213\\) Ha) and cc-pVTZ (\\(E_{\\text{corr}} = -0.301\\) Ha) data.',
                    hint: 'Set up two equations: \\(E(2) = E^{\\text{CBS}} + B/8\\) and \\(E(3) = E^{\\text{CBS}} + B/27\\). Solve for \\(E^{\\text{CBS}}\\).',
                    solution: '\\(-0.213 = E^{\\text{CBS}} + B/8\\) and \\(-0.301 = E^{\\text{CBS}} + B/27\\). Subtracting: \\(0.088 = B(1/8 - 1/27) = B \\cdot 19/216\\), so \\(B = 0.088 \\times 216/19 = 1.001\\). Then \\(E^{\\text{CBS}} = -0.213 - 1.001/8 = -0.213 - 0.125 = -0.338\\) Ha. (Note: DZ/TZ extrapolation is less reliable than TZ/QZ. The actual CBS limit for H\\(_2\\)O is about -0.370 Ha, showing the DZ/TZ extrapolation still has significant error.)'
                },
                {
                    question: 'Explain why the correlation energy converges as \\(X^{-3}\\) while the HF energy converges exponentially. What is the physical origin of this slow convergence?',
                    hint: 'Think about the electron-electron cusp (coalescence condition). How well can a product of one-electron functions describe two electrons at the same point?',
                    solution: 'The slow \\(X^{-3}\\) convergence of the correlation energy arises from the electron-electron cusp: when \\(r_{12} \\to 0\\), the exact wavefunction has a linear cusp (\\(\\Psi \\propto 1 + r_{12}/2 + \\cdots\\)). Representing this cusp with products of one-electron basis functions (which is what CI/CC methods do) requires high angular momentum functions and converges slowly. The HF energy has no such problem because it involves only one-electron functions and the nuclear cusp (which STOs handle exactly and GTOs approximate well). This is the basis for explicitly correlated methods (F12), which include \\(r_{12}\\) directly in the wavefunction to accelerate convergence.'
                },
                {
                    question: 'How many basis functions does cc-pVTZ provide for a water molecule? Compare with 6-31G(d,p).',
                    hint: 'For cc-pVTZ: O has 4s3p2d1f, and H has 3s2p1d. Count using \\(2l+1\\) for pure spherical harmonics.',
                    solution: 'Oxygen cc-pVTZ: 4s + 3\\(\\times\\)3p + 2\\(\\times\\)5d + 1\\(\\times\\)7f = 4 + 9 + 10 + 7 = 30 functions. Hydrogen cc-pVTZ: 3s + 2\\(\\times\\)3p + 1\\(\\times\\)5d = 3 + 6 + 5 = 14 functions. Total: 30 + 14 + 14 = 58 functions. Compare with 6-31G(d,p): ~25 functions. The cc-pVTZ basis is more than twice as large, but it provides a much more systematic and reliable description of both HF and correlation effects.'
                },
                {
                    question: 'The cc-pCVXZ basis sets add extra tight functions for core-valence correlation. Explain why standard cc-pVXZ sets are insufficient if you want to correlate the core electrons.',
                    hint: 'Standard cc-pVXZ exponents are optimized for valence correlation. What exponent range is needed to describe core-core and core-valence correlation?',
                    solution: 'Core-valence correlation involves excitations from the core orbitals (e.g., 1s on C) into virtual orbitals. The core orbital is very compact, so correlating it requires virtual functions with large exponents (tight functions) that overlap with the core region. Standard cc-pVXZ basis sets have exponents optimized for the valence region and lack these tight functions. The cc-pCVXZ sets add extra contracted functions with high exponents designed to describe the core-core and core-valence correlation. Without these, the frozen-core approximation should be used (correlating only valence electrons), which is the default in most codes.'
                },
                {
                    question: 'Suppose you have a CCSD(T)/cc-pVQZ energy of \\(-76.360\\) Hartree and a CCSD(T)/cc-pV5Z energy of \\(-76.368\\) Hartree for a molecule. Estimate the CBS limit using the \\(X^{-3}\\) formula for the correlation energy and the exponential formula for the HF energy.',
                    hint: 'You need the HF and correlation energies separately at each level. Assume HF/cc-pVQZ = \\(-76.067\\), HF/cc-pV5Z = \\(-76.068\\), so the correlation energies can be obtained by subtraction.',
                    solution: 'Correlation energies: \\(E_{\\text{corr}}(4) = -76.360 - (-76.067) = -0.293\\) Ha, \\(E_{\\text{corr}}(5) = -76.368 - (-76.068) = -0.300\\) Ha. CBS extrapolation: \\(E_{\\text{corr}}^{\\text{CBS}} = \\frac{5^3(-0.300) - 4^3(-0.293)}{5^3 - 4^3} = \\frac{-37.500 + 18.752}{61} = \\frac{-18.748}{61} = -0.307\\) Ha. For HF: the exponential convergence means HF/cc-pV5Z is essentially converged, so \\(E_{\\text{HF}}^{\\text{CBS}} \\approx -76.068\\) Ha. Total: \\(E^{\\text{CBS}} \\approx -76.068 + (-0.307) = -76.375\\) Ha.'
                }
            ]
        },

        // ========== SECTION 5: BSSE and Effective Core Potentials ==========
        {
            id: 'sec05-5-bsse-ecp',
            title: 'BSSE and Effective Core Potentials',
            content: `
<h2>5.5 Basis Set Superposition Error and Effective Core Potentials</h2>

<p>Two practical challenges arise in finite basis set calculations: artificial energy lowering when molecules interact (BSSE), and the prohibitive cost of treating core electrons in heavy atoms. Both have elegant solutions.</p>

<h3>Basis Set Superposition Error (BSSE)</h3>

<div class="env-block definition"><div class="env-title">Definition 5.5.1 — Basis Set Superposition Error</div><div class="env-body">
<em>Basis set superposition error</em> (BSSE) is the artificial lowering of the computed interaction energy between two fragments (A and B) that arises because each fragment can "borrow" basis functions from the other fragment to improve its own description. The interaction energy
\\[
\\Delta E = E(AB) - E(A) - E(B)
\\]
is biased toward overbinding because \\(E(AB)\\) is computed with the basis functions of both A and B, while \\(E(A)\\) and \\(E(B)\\) are computed with their own basis functions only.
</div></div>

<div class="env-block remark"><div class="env-title">Remark — BSSE Intuition</div><div class="env-body">
<p>Consider the He\\(\\cdots\\)He interaction. Monomer He is computed with its own basis functions centered on one atom. But in the dimer, each He atom has access to the other atom's basis functions, effectively enlarging its basis set. By the variational principle, a larger basis always gives a lower (better) energy. This artificial improvement of the monomer energies within the dimer artificially lowers the dimer energy, making the interaction appear more attractive than it truly is.</p>
</div></div>

<div class="env-block definition"><div class="env-title">Definition 5.5.2 — Counterpoise Correction (Boys-Bernardi)</div><div class="env-body">
The counterpoise (CP) correction eliminates BSSE by computing each monomer energy using the full dimer basis set. The corrected interaction energy is
\\[
\\Delta E^{\\text{CP}} = E(AB)_{\\text{dimer basis}} - E(A)_{\\text{dimer basis}} - E(B)_{\\text{dimer basis}},
\\]
where \\(E(A)_{\\text{dimer basis}}\\) means the energy of fragment A computed with the basis functions of both A and B present (B's basis functions are "ghost" functions with no nuclear charge).
</div></div>

<div class="env-block proposition"><div class="env-title">Proposition 5.5.3 — BSSE Magnitude</div><div class="env-body">
BSSE is most significant for:
<ul>
<li>Small basis sets (minimal or double-zeta),</li>
<li>Weak interactions (where the interaction energy is comparable to the BSSE),</li>
<li>Short intermolecular distances (where the ghost functions are most beneficial).</li>
</ul>
For large basis sets (cc-pVQZ or larger), BSSE is typically negligible for covalent bonds but can still be significant for noncovalent interactions.
</div></div>

<div class="env-block example"><div class="env-title">Example 5.5.4 — BSSE for the Water Dimer</div><div class="env-body">
<table style="width:80%; margin:0.5em auto; border-collapse:collapse;">
<tr style="border-bottom:2px solid #30363d;">
<th style="padding:6px;">Basis</th>
<th style="padding:6px;">\\(\\Delta E\\) (kcal/mol)</th>
<th style="padding:6px;">\\(\\Delta E^{\\text{CP}}\\) (kcal/mol)</th>
<th style="padding:6px;">BSSE (kcal/mol)</th>
</tr>
<tr style="border-bottom:1px solid #21262d;"><td style="padding:6px;">6-31G(d)</td><td style="padding:6px;">-7.0</td><td style="padding:6px;">-4.5</td><td style="padding:6px;">2.5</td></tr>
<tr style="border-bottom:1px solid #21262d;"><td style="padding:6px;">cc-pVDZ</td><td style="padding:6px;">-5.8</td><td style="padding:6px;">-4.3</td><td style="padding:6px;">1.5</td></tr>
<tr style="border-bottom:1px solid #21262d;"><td style="padding:6px;">cc-pVTZ</td><td style="padding:6px;">-5.2</td><td style="padding:6px;">-4.8</td><td style="padding:6px;">0.4</td></tr>
<tr><td style="padding:6px;">cc-pVQZ</td><td style="padding:6px;">-5.0</td><td style="padding:6px;">-4.9</td><td style="padding:6px;">0.1</td></tr>
</table>
<p>The experimental binding energy is about \\(-5.0\\) kcal/mol. Note that the uncorrected value with 6-31G(d) overbinds by 2 kcal/mol (a 40% error!), while the CP-corrected values converge smoothly.</p>
</div></div>

<h3>Effective Core Potentials (Pseudopotentials)</h3>

<div class="env-block definition"><div class="env-title">Definition 5.5.5 — Effective Core Potential (ECP)</div><div class="env-body">
An <em>effective core potential</em> (ECP), also called a pseudopotential, replaces the explicit treatment of core electrons with an effective potential that acts on the valence electrons:
\\[
\\hat{H} = \\sum_{i}^{N_v} \\left[-\\frac{1}{2}\\nabla_i^2 + \\hat{V}_{\\text{ECP}}(i)\\right] + \\sum_{i<j}^{N_v} \\frac{1}{r_{ij}},
\\]
where \\(N_v\\) is the number of valence electrons and \\(\\hat{V}_{\\text{ECP}}\\) is a semi-local potential fitted to reproduce all-electron atomic calculations.
</div></div>

<div class="env-block remark"><div class="env-title">Remark — Why ECPs?</div><div class="env-body">
<ul>
<li><strong>Computational savings:</strong> For heavy atoms (e.g., Au with 79 electrons), treating all electrons requires enormous basis sets. An ECP reduces Au to 19 valence electrons (or even 11), dramatically reducing cost.</li>
<li><strong>Relativistic effects:</strong> ECPs can implicitly include scalar relativistic effects (mass-velocity, Darwin terms) that are important for heavy elements but would otherwise require a relativistic Hamiltonian.</li>
<li><strong>Chemical intuition:</strong> Core electrons do not participate directly in chemical bonding. Replacing them with a potential is both physically motivated and computationally efficient.</li>
</ul>
</div></div>

<div class="env-block definition"><div class="env-title">Definition 5.5.6 — Small-Core vs Large-Core ECPs</div><div class="env-body">
<ul>
<li><strong>Small-core ECP:</strong> Only the innermost electrons are replaced (e.g., [Ar] core for a 4th-row element, leaving all n=3 and n=4 electrons explicit). More accurate, treats semi-core correlation.</li>
<li><strong>Large-core ECP:</strong> More electrons are frozen (e.g., [Kr] core, leaving only 4d and 5s as valence). Cheaper but can miss important semi-core effects.</li>
</ul>
Common ECP families: LANL2DZ (Hay-Wadt), Stuttgart/Dresden (SDD), Stevens-Basch-Krauss (SBK).
</div></div>

<div class="env-block theorem"><div class="env-title">Theorem 5.5.7 — ECP Form</div><div class="env-body">
A semi-local ECP has the general form
\\[
\\hat{V}_{\\text{ECP}} = V_{\\text{local}}(r) + \\sum_{l=0}^{l_{\\max}} \\sum_{k} B_{lk}\\, r^{n_{lk}}\\, e^{-\\beta_{lk} r^2}\\, \\hat{P}_l,
\\]
where \\(\\hat{P}_l = \\sum_{m=-l}^{l} |lm\\rangle\\langle lm|\\) is the projector onto angular momentum \\(l\\), and the parameters \\(B_{lk}, n_{lk}, \\beta_{lk}\\) are fitted to all-electron (often relativistic) atomic calculations.
</div></div>

<div class="env-block warning"><div class="env-title">Warning — ECP Limitations</div><div class="env-body">
<ol>
<li>ECPs are not universally transferable: they are fitted to atomic data and may perform poorly in unusual chemical environments.</li>
<li>Core-valence correlation is lost unless a core-polarization potential (CPP) is added.</li>
<li>Properties that depend on the core electron density (e.g., NMR chemical shifts, Mossbauer parameters) cannot be computed with ECPs.</li>
<li>Large-core ECPs can give qualitatively wrong results when semi-core electrons participate in bonding (common for transition metals).</li>
</ol>
</div></div>

<div class="env-block example"><div class="env-title">Example 5.5.8 — Gold Chemistry with ECPs</div><div class="env-body">
<p>Gold (Au, Z=79) with an all-electron calculation would require a basis set for 79 electrons, including scalar relativistic effects. Using the Stuttgart small-core ECP (60 core electrons frozen, 19 valence: 5s\\(^2\\)5p\\(^6\\)5d\\(^{10}\\)6s\\(^1\\)), the calculation is reduced to 19 explicit electrons, the ECP includes relativistic effects implicitly, and results for Au-X bond lengths and binding energies are typically within 0.02 A and 5 kcal/mol of all-electron relativistic calculations.</p>
</div></div>
`,
            visualizations: [],
            exercises: [
                {
                    question: 'Explain why BSSE always leads to overbinding (\\(\\Delta E\\) too negative). Can BSSE ever make an interaction appear more repulsive?',
                    hint: 'Consider the variational principle: adding basis functions can only lower or maintain the energy.',
                    solution: 'In the dimer calculation, each monomer has access to the partner\'s basis functions. By the variational principle, this can only lower (or not change) the energy of each monomer. Since the dimer energy is lowered relative to the sum of monomer energies computed in their own basis, the interaction energy becomes more negative (more attractive). BSSE cannot make an interaction more repulsive because it always improves the description of each monomer within the dimer. The BSSE is always non-negative: \\(\\text{BSSE} = \\Delta E - \\Delta E^{\\text{CP}} \\leq 0\\) (recalling that \\(\\Delta E < \\Delta E^{\\text{CP}} < 0\\) for a bound complex).'
                },
                {
                    question: 'In a counterpoise calculation for the water dimer, you need to compute \\(E(\\text{H}_2\\text{O})\\) with "ghost" basis functions at the partner molecule\'s position. How many ghost functions are there if the partner is described by cc-pVDZ?',
                    hint: 'A ghost atom has basis functions but no nuclear charge or electrons. Count the cc-pVDZ functions for one water molecule.',
                    solution: 'For H\\(_2\\)O in cc-pVDZ: O has 3s2p1d = 3 + 6 + 5 = 14 functions, each H has 2s1p = 2 + 3 = 5 functions. Total per H\\(_2\\)O: 14 + 5 + 5 = 24 functions. So the ghost functions add 24 basis functions (centered at the partner\'s atomic positions) with no associated nuclear charge or electrons. The monomer calculation thus uses 24 (own) + 24 (ghost) = 48 basis functions, the same size as the dimer basis.'
                },
                {
                    question: 'For a 5th-row element like iodine (Z = 53), compare the number of electrons treated explicitly with: (a) all-electron, (b) large-core ECP [Kr] (36 core), (c) small-core ECP [Ar + 3d] (28 core).',
                    hint: 'Just subtract the number of core electrons from the total.',
                    solution: '(a) All-electron: 53 electrons. (b) Large-core [Kr]: 53 - 36 = 17 valence electrons (4d\\(^{10}\\)5s\\(^2\\)5p\\(^5\\)). (c) Small-core [Ar+3d]: 53 - 28 = 25 valence electrons (4s\\(^2\\)4p\\(^6\\)4d\\(^{10}\\)5s\\(^2\\)5p\\(^5\\)). The small-core ECP treats the 4s and 4p semi-core electrons explicitly, which is important because they can participate in bonding and correlation effects. The computational savings are: all-electron requires ~53 basis functions minimum, large-core ~17, small-core ~25.'
                },
                {
                    question: 'Show that the half-counterpoise scheme, \\(\\Delta E^{\\text{half-CP}} = \\frac{1}{2}(\\Delta E + \\Delta E^{\\text{CP}})\\), sometimes gives better results than either uncorrected or fully corrected energies. Why might this be?',
                    hint: 'The uncorrected energy overbinds (BSSE), while the CP-corrected energy can underbind (basis set incompleteness error of the monomer). The true interaction energy may lie between them.',
                    solution: 'The uncorrected \\(\\Delta E\\) has BSSE (which overbinds) but also benefits from the ghost functions partially correcting the basis set incompleteness error (BSIE) of each monomer. The CP correction removes BSSE but also removes this beneficial effect of the ghost functions, leaving the BSIE of the individual monomer calculations. Since BSSE and BSIE have opposite signs, the true interaction energy often lies between \\(\\Delta E\\) and \\(\\Delta E^{\\text{CP}}\\). The half-CP scheme averages the two, capturing a partial cancellation. This is an empirical observation and not a rigorous result, but it often works well for medium-sized basis sets.'
                },
                {
                    question: 'Why do relativistic ECPs work well for heavy elements even though the valence electrons are described nonrelativistically? Briefly explain the physical picture.',
                    hint: 'Relativistic effects primarily affect core s and p electrons. How do these affect the valence electrons indirectly?',
                    solution: 'The dominant scalar relativistic effects (mass-velocity contraction, Darwin term) primarily affect the core s and p electrons, which have high probability density near the nucleus where the electron speed approaches the speed of light. These contracted core orbitals provide more effective screening of the nuclear charge for valence electrons, indirectly modifying the valence potential. By fitting the ECP to reproduce relativistic all-electron atomic eigenvalues and pseudo-orbitals, the relativistic effects on the core are "folded into" the ECP parameters. The valence electrons then experience the correct effective potential without needing an explicit relativistic treatment. This is why ECPs are often more accurate than nonrelativistic all-electron calculations for heavy elements.'
                },
                {
                    question: 'Design a "basis set protocol" for computing the binding energy of a halogen-bonded complex R-I\\(\\cdots\\)NH\\(_3\\) to chemical accuracy. Specify the basis set, whether to use an ECP for iodine, and whether BSSE correction is needed.',
                    hint: 'Consider: (1) iodine needs relativistic effects, (2) the interaction is weak (~5 kcal/mol), (3) chemical accuracy requires errors below 1 kcal/mol.',
                    solution: 'Recommended protocol: Use a small-core relativistic ECP for iodine (e.g., Stuttgart ECP28) with the associated aug-cc-pVTZ-PP basis set. For N, C, H, use aug-cc-pVTZ. The "aug-" diffuse functions are important for the halogen bond (a noncovalent interaction). Counterpoise correction is recommended at the TZ level where BSSE is ~0.5 kcal/mol (significant for a ~5 kcal/mol interaction). Alternatively, use aug-cc-pVQZ to make BSSE negligible. For chemical accuracy, use CCSD(T) or MP2 with CBS extrapolation (TZ/QZ). The ECP handles relativistic effects on I implicitly. This protocol balances accuracy, cost, and correct physics.'
                }
            ]
        }
    ]
});
