// === Chapter 4: The Hartree-Fock Approximation ===
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch04',
    number: 4,
    title: 'The Hartree-Fock Approximation',
    subtitle: 'The best single-determinant wavefunction: Fock operators and orbital equations',
    sections: [
        // ========== SECTION 1: The Hartree-Fock Idea ==========
        {
            id: 'sec04-1-hf-idea',
            title: 'The Hartree-Fock Idea',
            content: `
<h2>4.1 The Hartree-Fock Idea</h2>

<div class="env-block intuition"><div class="env-title">Intuition — Why a Single Determinant?</div><div class="env-body">
The exact many-electron wavefunction is hopelessly complicated. The Hartree-Fock method makes a radical but powerful simplification: approximate the \\(N\\)-electron wavefunction by a single Slater determinant. This is the best possible independent-particle model consistent with the Pauli exclusion principle. Every electron moves in the average field created by all the others.
</div></div>

<h3>The Electronic Hamiltonian</h3>

<p>We work within the Born-Oppenheimer approximation. The electronic Hamiltonian for \\(N\\) electrons in the field of \\(M\\) fixed nuclei is (in atomic units):</p>
\\[
\\hat{H} = \\sum_{i=1}^{N} \\hat{h}(i) + \\sum_{i=1}^{N}\\sum_{j>i}^{N} \\frac{1}{r_{ij}},
\\]
<p>where the one-electron operator is</p>
\\[
\\hat{h}(i) = -\\frac{1}{2}\\nabla_i^2 - \\sum_{A=1}^{M} \\frac{Z_A}{r_{iA}}.
\\]
<p>The first term is the kinetic energy of electron \\(i\\), and the second is the nuclear attraction. The two-electron term \\(1/r_{ij}\\) is the electron-electron repulsion, and it is precisely this term that makes the problem unsolvable in closed form for \\(N \\geq 2\\).</p>

<div class="env-block definition"><div class="env-title">Definition 4.1.1 — Slater Determinant</div><div class="env-body">
Given \\(N\\) orthonormal spin-orbitals \\(\\{\\chi_1, \\chi_2, \\ldots, \\chi_N\\}\\), the Slater determinant is
\\[
|\\Phi_0\\rangle = \\frac{1}{\\sqrt{N!}} \\begin{vmatrix} \\chi_1(\\mathbf{x}_1) & \\chi_2(\\mathbf{x}_1) & \\cdots & \\chi_N(\\mathbf{x}_1) \\\\ \\chi_1(\\mathbf{x}_2) & \\chi_2(\\mathbf{x}_2) & \\cdots & \\chi_N(\\mathbf{x}_2) \\\\ \\vdots & \\vdots & \\ddots & \\vdots \\\\ \\chi_1(\\mathbf{x}_N) & \\chi_2(\\mathbf{x}_N) & \\cdots & \\chi_N(\\mathbf{x}_N) \\end{vmatrix},
\\]
where \\(\\mathbf{x}_i = (\\mathbf{r}_i, \\sigma_i)\\) denotes the combined spatial and spin coordinates of electron \\(i\\). Each spin-orbital is a product \\(\\chi_a(\\mathbf{x}) = \\phi_a(\\mathbf{r})\\,\\omega(\\sigma)\\), where \\(\\omega\\) is either \\(\\alpha\\) (spin-up) or \\(\\beta\\) (spin-down).
</div></div>

<div class="env-block remark"><div class="env-title">Remark</div><div class="env-body">
The Slater determinant automatically satisfies the antisymmetry requirement: exchanging two rows (two electrons) changes the sign. If two spin-orbitals are identical, two columns are equal, and the determinant vanishes, recovering the Pauli exclusion principle.
</div></div>

<h3>The Variational Principle Applied to a Single Determinant</h3>

<p>The variational theorem guarantees that for any normalized trial wavefunction \\(|\\Phi\\rangle\\),</p>
\\[
E_0 \\leq \\langle \\Phi | \\hat{H} | \\Phi \\rangle,
\\]
<p>with equality if and only if \\(|\\Phi\\rangle\\) is the exact ground-state wavefunction. The Hartree-Fock approach restricts \\(|\\Phi\\rangle\\) to the form of a single Slater determinant and minimizes the energy functional over all possible choices of orthonormal spin-orbitals:</p>
\\[
E_{\\text{HF}} = \\min_{\\{\\chi_a\\}} \\langle \\Phi_0 | \\hat{H} | \\Phi_0 \\rangle \\quad \\text{subject to} \\quad \\langle \\chi_a | \\chi_b \\rangle = \\delta_{ab}.
\\]

<div class="env-block theorem"><div class="env-title">Theorem 4.1.2 — The Hartree-Fock Energy</div><div class="env-body">
For a Slater determinant \\(|\\Phi_0\\rangle\\) built from \\(N\\) orthonormal spin-orbitals \\(\\{\\chi_a\\}\\), the expectation value of the electronic Hamiltonian is
\\[
E_{\\text{HF}} = \\sum_{a=1}^{N} \\langle a | \\hat{h} | a \\rangle + \\frac{1}{2}\\sum_{a=1}^{N}\\sum_{b=1}^{N} \\bigl( \\langle ab || ab \\rangle \\bigr),
\\]
where \\(\\langle a|\\hat{h}|a\\rangle\\) is the one-electron integral and \\(\\langle ab || ab \\rangle = \\langle ab | ab \\rangle - \\langle ab | ba \\rangle\\) is the antisymmetrized two-electron integral (physicists' notation). Equivalently,
\\[
E_{\\text{HF}} = \\sum_{a=1}^{N} h_{aa} + \\frac{1}{2}\\sum_{a=1}^{N}\\sum_{b=1}^{N} (J_{ab} - K_{ab}),
\\]
where \\(J_{ab}\\) and \\(K_{ab}\\) are the Coulomb and exchange integrals, respectively.
</div></div>

<div class="env-block proof"><div class="env-title">Proof (Sketch)</div><div class="env-body">
Using the Slater-Condon rules for matrix elements of one- and two-electron operators between Slater determinants:
<ul>
<li>The one-electron part gives \\(\\sum_a \\langle a | \\hat{h} | a \\rangle\\) by summing the expectation value of \\(\\hat{h}\\) over all occupied spin-orbitals.</li>
<li>The two-electron part gives \\(\\frac{1}{2}\\sum_{a,b}(\\langle ab|ab\\rangle - \\langle ab|ba\\rangle)\\). The factor \\(\\frac{1}{2}\\) avoids double-counting. The direct term \\(\\langle ab|ab\\rangle\\) is the Coulomb integral \\(J_{ab}\\), and the exchange term \\(\\langle ab|ba\\rangle\\) is \\(K_{ab}\\).</li>
</ul>
<div class="qed">∎</div>
</div></div>

<h3>Constrained Minimization and the Fock Equations</h3>

<p>We minimize \\(E_{\\text{HF}}[\\{\\chi_a\\}]\\) subject to the orthonormality constraints \\(\\langle \\chi_a | \\chi_b \\rangle = \\delta_{ab}\\) using the method of Lagrange multipliers. Introducing multipliers \\(\\varepsilon_{ba}\\) and requiring the energy functional to be stationary under orbital variations \\(\\chi_a \\to \\chi_a + \\delta\\chi_a\\), one obtains the Hartree-Fock equations:</p>
\\[
\\hat{f}(1)\\,\\chi_a(1) = \\sum_{b=1}^{N} \\varepsilon_{ba}\\,\\chi_b(1),
\\]
<p>where \\(\\hat{f}\\) is the Fock operator (derived in Section 4.2). A unitary transformation among the occupied orbitals diagonalizes the matrix of Lagrange multipliers, yielding the canonical Hartree-Fock equations:</p>
\\[
\\hat{f}\\,\\chi_a = \\varepsilon_a\\,\\chi_a.
\\]

<div class="env-block definition"><div class="env-title">Definition 4.1.3 — Canonical Hartree-Fock Equations</div><div class="env-body">
The canonical Hartree-Fock equations are the eigenvalue problem
\\[
\\hat{f}(\\mathbf{x}_1)\\,\\chi_a(\\mathbf{x}_1) = \\varepsilon_a\\,\\chi_a(\\mathbf{x}_1), \\quad a = 1, 2, \\ldots, N,
\\]
where \\(\\hat{f}\\) is the Fock operator (an effective one-electron Hamiltonian), and the eigenvalues \\(\\varepsilon_a\\) are the orbital energies.
</div></div>

<div class="env-block warning"><div class="env-title">Warning</div><div class="env-body">
The HF equations are pseudo-eigenvalue equations, not standard eigenvalue equations: the Fock operator \\(\\hat{f}\\) itself depends on its own eigenfunctions (through the Coulomb and exchange operators). This means the equations must be solved iteratively by the self-consistent field (SCF) procedure, covered in Chapter 6.
</div></div>
`,
            visualizations: [],
            exercises: [
                {
                    question: 'Write out the Slater determinant explicitly for a two-electron system (e.g., He) with spin-orbitals \\(\\chi_1 = \\phi_1 \\alpha\\) and \\(\\chi_2 = \\phi_1 \\beta\\). Show that it is antisymmetric under exchange of the two electrons.',
                    hint: 'The \\(2 \\times 2\\) determinant is \\(\\frac{1}{\\sqrt{2}}[\\chi_1(\\mathbf{x}_1)\\chi_2(\\mathbf{x}_2) - \\chi_2(\\mathbf{x}_1)\\chi_1(\\mathbf{x}_2)]\\). Swap \\(\\mathbf{x}_1 \\leftrightarrow \\mathbf{x}_2\\).',
                    solution: '\\(|\\Phi_0\\rangle = \\frac{1}{\\sqrt{2}}[\\chi_1(\\mathbf{x}_1)\\chi_2(\\mathbf{x}_2) - \\chi_2(\\mathbf{x}_1)\\chi_1(\\mathbf{x}_2)]\\). Under \\(\\mathbf{x}_1 \\leftrightarrow \\mathbf{x}_2\\): \\(\\frac{1}{\\sqrt{2}}[\\chi_1(\\mathbf{x}_2)\\chi_2(\\mathbf{x}_1) - \\chi_2(\\mathbf{x}_2)\\chi_1(\\mathbf{x}_1)] = -|\\Phi_0\\rangle\\). Antisymmetry is confirmed.'
                },
                {
                    question: 'For a two-electron system with a single spatial orbital \\(\\phi_1\\), write the Hartree-Fock energy \\(E_{\\text{HF}}\\) in terms of \\(h_{11}\\), \\(J_{11}\\), and \\(K_{11}\\).',
                    hint: 'The two spin-orbitals share the same spatial orbital but have opposite spins. Evaluate the sums \\(\\sum_a h_{aa}\\) and \\(\\frac{1}{2}\\sum_{a,b}(J_{ab} - K_{ab})\\) for \\(a,b \\in \\{1\\alpha, 1\\beta\\}\\).',
                    solution: 'Both spin-orbitals have the same spatial part, so \\(h_{1\\alpha,1\\alpha} = h_{1\\beta,1\\beta} = h_{11}\\). For the two-electron terms: \\(J_{1\\alpha,1\\beta} = J_{11}\\), and \\(K_{1\\alpha,1\\beta} = 0\\) (opposite spins). Also \\(J_{1\\alpha,1\\alpha} = J_{11}\\) and \\(K_{1\\alpha,1\\alpha} = J_{11}\\) (same orbital), so \\(J_{aa} - K_{aa} = 0\\). Thus \\(E_{\\text{HF}} = 2h_{11} + J_{11}\\).'
                },
                {
                    question: 'Explain why the Hartree-Fock energy is an upper bound to the exact ground-state energy. Under what circumstance would they be equal?',
                    hint: 'Invoke the variational principle. When is a single Slater determinant exact?',
                    solution: 'The variational principle states \\(E_0 \\leq \\langle \\Phi | \\hat{H} | \\Phi \\rangle\\) for any trial wavefunction. Since the HF wavefunction is a particular trial function (a single Slater determinant), \\(E_{\\text{HF}} \\geq E_0\\). Equality holds only if the exact ground state is itself a single Slater determinant, which occurs only for non-interacting electrons (or certain special cases like the hydrogen atom).'
                },
                {
                    question: 'Show that the Slater determinant for \\(N\\) electrons can be written compactly as \\(|\\Phi_0\\rangle = \\hat{a}_1^\\dagger \\hat{a}_2^\\dagger \\cdots \\hat{a}_N^\\dagger |\\text{vac}\\rangle\\) using creation operators. What happens if you try to create two electrons in the same spin-orbital?',
                    hint: 'Creation operators satisfy \\(\\{\\hat{a}_a^\\dagger, \\hat{a}_b^\\dagger\\} = 0\\). What does \\((\\hat{a}_a^\\dagger)^2\\) equal?',
                    solution: 'By the anticommutation relations, \\(\\hat{a}_a^\\dagger \\hat{a}_a^\\dagger = -\\hat{a}_a^\\dagger \\hat{a}_a^\\dagger\\), which implies \\((\\hat{a}_a^\\dagger)^2 = 0\\). You cannot create two electrons in the same spin-orbital; the result is the zero state. This is the second-quantization statement of the Pauli exclusion principle.'
                },
                {
                    question: 'The HF energy expression has \\(N\\) one-electron terms and \\(N(N-1)/2\\) distinct two-electron pairs. Verify this counting for a four-electron system.',
                    hint: 'Count the number of one-electron integrals \\(h_{aa}\\) and the number of distinct pairs \\((a,b)\\) with \\(a < b\\) contributing \\(J_{ab} - K_{ab}\\).',
                    solution: 'For \\(N = 4\\): the one-electron sum \\(\\sum_{a=1}^4 h_{aa}\\) has 4 terms. The double sum \\(\\frac{1}{2}\\sum_{a}\\sum_{b}(J_{ab} - K_{ab})\\) has \\(4 \\times 4 = 16\\) terms in total, but \\(J_{aa} = K_{aa}\\) for each \\(a\\) (4 terms vanish), and the remaining 12 terms come in 6 pairs, giving \\(\\binom{4}{2} = 6\\) distinct Coulomb-exchange pairs.'
                }
            ]
        },

        // ========== SECTION 2: The Fock Operator ==========
        {
            id: 'sec04-2-fock-operator',
            title: 'The Fock Operator',
            content: `
<h2>4.2 The Fock Operator</h2>

<p>The Fock operator is the central object of Hartree-Fock theory. It defines an effective one-electron Hamiltonian in which each electron moves under the combined influence of the nuclei and the average field of all other electrons.</p>

<div class="env-block definition"><div class="env-title">Definition 4.2.1 — The Fock Operator</div><div class="env-body">
The Fock operator is
\\[
\\hat{f}(1) = \\hat{h}(1) + \\sum_{b=1}^{N} \\bigl[\\hat{J}_b(1) - \\hat{K}_b(1)\\bigr],
\\]
where \\(\\hat{h}(1)\\) is the one-electron core Hamiltonian (kinetic energy + nuclear attraction), and \\(\\hat{J}_b\\) and \\(\\hat{K}_b\\) are the Coulomb and exchange operators associated with the occupied spin-orbital \\(\\chi_b\\).
</div></div>

<div class="env-block definition"><div class="env-title">Definition 4.2.2 — Coulomb Operator \\(\\hat{J}_b\\)</div><div class="env-body">
The Coulomb operator due to spin-orbital \\(\\chi_b\\) acts on an arbitrary spin-orbital \\(\\chi_a\\) as
\\[
\\hat{J}_b(1)\\,\\chi_a(1) = \\left[\\int |\\chi_b(2)|^2 \\frac{1}{r_{12}} \\,d\\mathbf{x}_2 \\right] \\chi_a(1).
\\]
It represents the average electrostatic repulsion that electron 1 experiences from the charge distribution \\(|\\chi_b(2)|^2\\) of electron 2.
</div></div>

<div class="env-block definition"><div class="env-title">Definition 4.2.3 — Exchange Operator \\(\\hat{K}_b\\)</div><div class="env-body">
The exchange operator due to spin-orbital \\(\\chi_b\\) is defined by its action:
\\[
\\hat{K}_b(1)\\,\\chi_a(1) = \\left[\\int \\chi_b^*(2)\\,\\chi_a(2) \\frac{1}{r_{12}} \\,d\\mathbf{x}_2 \\right] \\chi_b(1).
\\]
Note the exchange of \\(\\chi_a\\) and \\(\\chi_b\\) in the result: the orbital acted upon (\\(\\chi_a\\)) appears inside the integral, and the operator's defining orbital (\\(\\chi_b\\)) appears outside.
</div></div>

<div class="env-block remark"><div class="env-title">Remark — Nature of Exchange</div><div class="env-body">
<p>The Coulomb operator \\(\\hat{J}_b\\) has a transparent classical interpretation: it is the electrostatic potential due to the charge cloud \\(|\\chi_b|^2\\). By contrast, the exchange operator \\(\\hat{K}_b\\) has no classical analogue. It arises purely from the antisymmetry requirement (Pauli principle) and is nonlocal: its action on \\(\\chi_a(1)\\) depends on the value of \\(\\chi_a\\) at all points in space (via the integral over \\(\\mathbf{x}_2\\)).</p>
</div></div>

<h3>The Coulomb and Exchange Integrals</h3>

<p>Taking matrix elements of the Coulomb and exchange operators in the orbital basis yields the Coulomb and exchange integrals:</p>

<div class="env-block definition"><div class="env-title">Definition 4.2.4 — Coulomb and Exchange Integrals</div><div class="env-body">
\\[
J_{ab} = \\langle ab | ab \\rangle = \\int\\int \\frac{|\\chi_a(1)|^2\\,|\\chi_b(2)|^2}{r_{12}}\\,d\\mathbf{x}_1\\,d\\mathbf{x}_2,
\\]
\\[
K_{ab} = \\langle ab | ba \\rangle = \\int\\int \\frac{\\chi_a^*(1)\\chi_b(1)\\,\\chi_b^*(2)\\chi_a(2)}{r_{12}}\\,d\\mathbf{x}_1\\,d\\mathbf{x}_2.
\\]
Both \\(J_{ab}\\) and \\(K_{ab}\\) are real and non-negative, and \\(J_{ab} \\geq K_{ab} \\geq 0\\). Furthermore, \\(J_{aa} = K_{aa}\\).
</div></div>

<div class="viz-placeholder" data-viz="viz-j-k-operators"></div>

<div class="env-block proposition"><div class="env-title">Proposition 4.2.5 — Self-Interaction Cancellation</div><div class="env-body">
In the Fock operator, the term \\(b = a\\) in the sum \\(\\sum_b (\\hat{J}_b - \\hat{K}_b)\\) vanishes identically:
\\[
\\hat{J}_a\\,\\chi_a = \\hat{K}_a\\,\\chi_a.
\\]
Hence the Hartree-Fock potential is free of self-interaction: an electron does not repel itself.
</div></div>

<div class="env-block proof"><div class="env-title">Proof</div><div class="env-body">
For \\(b = a\\): \\(\\hat{J}_a(1)\\chi_a(1) = [\\int |\\chi_a(2)|^2 r_{12}^{-1}\\,d\\mathbf{x}_2]\\chi_a(1)\\). Meanwhile, \\(\\hat{K}_a(1)\\chi_a(1) = [\\int \\chi_a^*(2)\\chi_a(2) r_{12}^{-1}\\,d\\mathbf{x}_2]\\chi_a(1) = [\\int |\\chi_a(2)|^2 r_{12}^{-1}\\,d\\mathbf{x}_2]\\chi_a(1)\\). The two expressions are identical.
<div class="qed">∎</div>
</div></div>

<h3>The Hartree-Fock Potential</h3>

<div class="env-block definition"><div class="env-title">Definition 4.2.6 — Hartree-Fock Potential</div><div class="env-body">
The Hartree-Fock (or mean-field) potential experienced by an electron in spin-orbital \\(\\chi_a\\) is
\\[
v^{\\text{HF}}(1) = \\sum_{b=1}^{N} \\bigl[\\hat{J}_b(1) - \\hat{K}_b(1)\\bigr],
\\]
so that \\(\\hat{f} = \\hat{h} + v^{\\text{HF}}\\). The Fock operator is a one-electron operator, and the full \\(N\\)-electron problem has been reduced to \\(N\\) coupled one-electron equations.
</div></div>

<div class="env-block example"><div class="env-title">Example 4.2.7 — Helium Atom</div><div class="env-body">
For He, \\(N = 2\\), with \\(\\chi_1 = \\phi_1\\alpha\\), \\(\\chi_2 = \\phi_1\\beta\\). Both electrons occupy the same spatial orbital \\(\\phi_1\\). The Fock operator (integrated over spin) reduces to
\\[
\\hat{f}(1) = \\hat{h}(1) + 2\\hat{J}_1(1) - \\hat{K}_1(1),
\\]
where the factor of 2 comes from summing \\(\\hat{J}\\) over both spin-orbitals (they share the same spatial orbital), and only the same-spin exchange survives integration over spin variables. In practice, one often writes the <em>closed-shell</em> Fock operator (after spin integration) as \\(\\hat{f} = \\hat{h} + \\sum_a^{N/2}(2\\hat{J}_a - \\hat{K}_a)\\), where the sum is over spatial orbitals.
</div></div>

<div class="env-block warning"><div class="env-title">Warning — Nonlinearity</div><div class="env-body">
The Fock operator depends on its own solutions (the occupied orbitals define \\(\\hat{J}_b\\) and \\(\\hat{K}_b\\)). This makes \\(\\hat{f}\\chi_a = \\varepsilon_a \\chi_a\\) a nonlinear eigenvalue problem. One must solve it iteratively: guess orbitals, build \\(\\hat{f}\\), solve, update orbitals, repeat until self-consistency (Chapter 6).
</div></div>
`,
            visualizations: [
                {
                    id: 'viz-j-k-operators',
                    title: 'Coulomb vs Exchange Operators',
                    description: 'Schematic illustration of the Coulomb (\\(\\hat{J}\\)) and exchange (\\(\\hat{K}\\)) operators. The Coulomb operator represents a classical electrostatic interaction, while the exchange operator involves a permutation of electron labels with no classical analogue. Adjust the orbital separation to see how both integrals decay with distance.',
                    setup(body, controls) {
                        const viz = new VizEngine(body, { scale: 50, originX: 280, originY: 220 });

                        let separation = 2.0;
                        const sepSlider = VizEngine.createSlider(controls, 'Orbital separation', 0.5, 5, separation, 0.1, v => { separation = v; draw(); });

                        function gaussian(x, mu, sigma) {
                            return Math.exp(-((x - mu) ** 2) / (2 * sigma * sigma));
                        }

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            const sigma = 0.6;
                            const muA = -separation / 2;
                            const muB = separation / 2;

                            // Draw orbital a (blue)
                            viz.drawFunction(x => gaussian(x, muA, sigma) * 2, -5, 5, viz.colors.blue, 2.5);
                            // Draw orbital b (orange)
                            viz.drawFunction(x => gaussian(x, muB, sigma) * 2, -5, 5, viz.colors.orange, 2.5);

                            // Draw |chi_a|^2 (faded blue)
                            viz.drawFunction(x => gaussian(x, muA, sigma) ** 2 * 2, -5, 5, viz.colors.blue + '88', 1.5);
                            // Draw |chi_b|^2 (faded orange)
                            viz.drawFunction(x => gaussian(x, muB, sigma) ** 2 * 2, -5, 5, viz.colors.orange + '88', 1.5);

                            // Overlap product chi_a * chi_b (exchange density, green)
                            viz.drawFunction(x => gaussian(x, muA, sigma) * gaussian(x, muB, sigma) * 2, -5, 5, viz.colors.green, 2, 300);

                            // Compute approximate J and K
                            let J = 0, K = 0;
                            const dx = 0.05;
                            for (let x1 = -6; x1 <= 6; x1 += dx) {
                                for (let x2 = -6; x2 <= 6; x2 += dx) {
                                    const r12 = Math.abs(x1 - x2) + 0.1; // regularize
                                    const rhoA1 = gaussian(x1, muA, sigma) ** 2;
                                    const rhoB2 = gaussian(x2, muB, sigma) ** 2;
                                    J += rhoA1 * rhoB2 / r12 * dx * dx;

                                    const overlapDensity = gaussian(x1, muA, sigma) * gaussian(x1, muB, sigma)
                                                        * gaussian(x2, muB, sigma) * gaussian(x2, muA, sigma);
                                    K += overlapDensity / r12 * dx * dx;
                                }
                            }

                            // Labels
                            viz.screenText('\u03C7\u2090', 30, 30, viz.colors.blue, 14, 'left');
                            viz.screenText('\u03C7\u1D47', 30, 50, viz.colors.orange, 14, 'left');
                            viz.screenText('\u03C7\u2090\u03C7\u1D47 (exchange density)', 30, 70, viz.colors.green, 12, 'left');

                            viz.screenText('J\u2090\u1D47 \u2248 ' + J.toFixed(3), viz.width - 160, 30, viz.colors.teal, 14, 'left');
                            viz.screenText('K\u2090\u1D47 \u2248 ' + K.toFixed(3), viz.width - 160, 50, viz.colors.green, 14, 'left');
                            viz.screenText('J \u2265 K \u2265 0', viz.width - 160, 70, viz.colors.text, 12, 'left');

                            // Arrows marking the orbital centers
                            viz.drawPoint(muA, 0, viz.colors.blue, 'a', 4);
                            viz.drawPoint(muB, 0, viz.colors.orange, 'b', 4);

                            // Axis label
                            viz.screenText('r', viz.width - 15, viz.originY - 12, viz.colors.text, 13);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show that the Coulomb integral \\(J_{ab} \\geq 0\\) for any pair of spin-orbitals. Under what conditions is \\(J_{ab} = 0\\)?',
                    hint: 'The integrand of \\(J_{ab}\\) is \\(|\\chi_a(1)|^2 |\\chi_b(2)|^2 / r_{12}\\). What can you say about the sign of each factor?',
                    solution: 'Every factor in the integrand is non-negative: \\(|\\chi_a(1)|^2 \\geq 0\\), \\(|\\chi_b(2)|^2 \\geq 0\\), and \\(1/r_{12} > 0\\). So the integral is non-negative. \\(J_{ab} = 0\\) only if the two charge distributions have zero overlap in a measure-theoretic sense, which in practice does not happen for realistic molecular orbitals occupying the same spatial region.'
                },
                {
                    question: 'Verify that \\(\\hat{K}_b\\) is a nonlocal operator by showing that \\(\\hat{K}_b(1)\\chi_a(1)\\) cannot be written as \\(V(\\mathbf{r}_1)\\chi_a(\\mathbf{r}_1)\\) for some function \\(V\\).',
                    hint: 'A local operator \\(V(\\mathbf{r}_1)\\chi_a(1)\\) depends on \\(\\chi_a\\) only at the point \\(\\mathbf{r}_1\\). Does the exchange operator satisfy this?',
                    solution: '\\(\\hat{K}_b(1)\\chi_a(1) = [\\int \\chi_b^*(2)\\chi_a(2) r_{12}^{-1} d\\mathbf{x}_2]\\chi_b(1)\\). The result depends on the integral of \\(\\chi_a(2)\\) over all space (not just at \\(\\mathbf{r}_1\\)). Hence it cannot be written as \\(V(\\mathbf{r}_1)\\chi_a(\\mathbf{r}_1)\\) for any fixed function \\(V\\). This is the hallmark of a nonlocal (integral) operator.'
                },
                {
                    question: 'For a closed-shell system with \\(N\\) electrons (\\(N\\) even) and \\(N/2\\) doubly occupied spatial orbitals, show that the Fock operator (after spin integration) is \\(\\hat{f} = \\hat{h} + \\sum_{a=1}^{N/2}(2\\hat{J}_a - \\hat{K}_a)\\), where the sum is over spatial orbitals.',
                    hint: 'Each spatial orbital contributes two spin-orbitals. The Coulomb operator is spin-independent, so both spin-orbitals contribute \\(\\hat{J}_a\\). The exchange operator requires same spin.',
                    solution: 'For each spatial orbital \\(\\phi_a\\), there are two spin-orbitals: \\(\\phi_a\\alpha\\) and \\(\\phi_a\\beta\\). Both contribute a Coulomb term \\(\\hat{J}_a\\), giving \\(2\\hat{J}_a\\). The exchange operator \\(\\hat{K}\\) requires the spin parts to overlap (same spin). When we sum over both alpha and beta spin-orbitals for each spatial orbital, spin integration yields one net exchange term \\(\\hat{K}_a\\) per spatial orbital. Hence \\(v^{\\text{HF}} = \\sum_a (2\\hat{J}_a - \\hat{K}_a)\\).'
                },
                {
                    question: 'Prove that the exchange integral satisfies the Schwarz-like inequality \\(K_{ab}^2 \\leq J_{aa} \\cdot J_{bb}\\).',
                    hint: 'Use the Cauchy-Schwarz inequality for the inner product defined by \\(\\langle f, g \\rangle = \\int\\int f^*(1,2)g(1,2)/r_{12}\\, d\\mathbf{x}_1 d\\mathbf{x}_2\\).',
                    solution: 'Define \\(f(1,2) = \\chi_a^*(1)\\chi_a(2)\\) and \\(g(1,2) = \\chi_b^*(1)\\chi_b(2)\\). Then \\(J_{aa} = \\langle f, f \\rangle\\), \\(J_{bb} = \\langle g, g \\rangle\\), and \\(K_{ab} = \\langle f, g \\rangle\\) (up to complex conjugation rearrangements). By Cauchy-Schwarz, \\(|\\langle f, g \\rangle|^2 \\leq \\langle f,f\\rangle \\langle g,g\\rangle\\), giving \\(K_{ab}^2 \\leq J_{aa} J_{bb}\\).'
                },
                {
                    question: 'The Hartree method (without exchange) uses a product wavefunction instead of a Slater determinant. Show that the Hartree energy for two electrons is \\(E_H = 2h_{11} + J_{11}\\) (same as HF for this case). Does this always coincide with HF?',
                    hint: 'For two electrons in the same spatial orbital, the exchange term vanishes due to spin orthogonality. What about open-shell systems?',
                    solution: 'For two electrons in the same spatial orbital with opposite spins, \\(K_{12} = 0\\) after spin integration, so \\(E_{\\text{HF}} = 2h_{11} + J_{11} = E_H\\). However, for systems with more electrons or open shells, the Hartree method misses exchange entirely: it gives \\(E_H = \\sum_a h_{aa} + \\frac{1}{2}\\sum_{a \\neq b} J_{ab}\\), while HF gives \\(E_{\\text{HF}} = \\sum_a h_{aa} + \\frac{1}{2}\\sum_{a,b}(J_{ab} - K_{ab})\\). The Hartree method also suffers from self-interaction error (\\(J_{aa}\\) terms remain) and does not produce an antisymmetric wavefunction.'
                }
            ]
        },

        // ========== SECTION 3: Restricted vs Unrestricted HF ==========
        {
            id: 'sec04-3-rhf-uhf',
            title: 'Restricted vs Unrestricted HF',
            content: `
<h2>4.3 Restricted vs Unrestricted HF</h2>

<p>The general HF equations are formulated for spin-orbitals \\(\\chi_a(\\mathbf{x}) = \\phi_a(\\mathbf{r})\\omega(\\sigma)\\). In practice, how we constrain the spatial parts of the alpha and beta spin-orbitals defines different flavors of HF theory.</p>

<div class="env-block definition"><div class="env-title">Definition 4.3.1 — Restricted Hartree-Fock (RHF)</div><div class="env-body">
In <em>Restricted Hartree-Fock</em> (RHF), each spatial orbital is doubly occupied: one with \\(\\alpha\\) spin, one with \\(\\beta\\) spin. The alpha and beta electrons share the same spatial orbitals:
\\[
\\chi_{2a-1}(\\mathbf{x}) = \\phi_a(\\mathbf{r})\\,\\alpha(\\sigma), \\qquad \\chi_{2a}(\\mathbf{x}) = \\phi_a(\\mathbf{r})\\,\\beta(\\sigma), \\qquad a = 1, \\ldots, N/2.
\\]
This applies to closed-shell systems (even \\(N\\), all orbitals doubly occupied).
</div></div>

<div class="env-block definition"><div class="env-title">Definition 4.3.2 — Unrestricted Hartree-Fock (UHF)</div><div class="env-body">
In <em>Unrestricted Hartree-Fock</em> (UHF), the alpha and beta electrons are allowed to occupy different spatial orbitals:
\\[
\\chi_a^\\alpha(\\mathbf{x}) = \\phi_a^\\alpha(\\mathbf{r})\\,\\alpha(\\sigma), \\qquad \\chi_b^\\beta(\\mathbf{x}) = \\phi_b^\\beta(\\mathbf{r})\\,\\beta(\\sigma).
\\]
This leads to two coupled sets of Fock equations (Pople-Nesbet equations):
\\[
\\hat{f}^\\alpha \\phi_a^\\alpha = \\varepsilon_a^\\alpha \\phi_a^\\alpha, \\qquad \\hat{f}^\\beta \\phi_b^\\beta = \\varepsilon_b^\\beta \\phi_b^\\beta.
\\]
</div></div>

<div class="env-block definition"><div class="env-title">Definition 4.3.3 — Restricted Open-Shell Hartree-Fock (ROHF)</div><div class="env-body">
<em>ROHF</em> enforces that the doubly occupied orbitals share the same spatial function (like RHF), but allows singly occupied orbitals for open-shell systems. The wavefunction is an eigenfunction of \\(\\hat{S}^2\\), unlike UHF. The price is a more complicated Fock operator that differs for doubly and singly occupied orbitals.
</div></div>

<h3>When to Use Each Method</h3>

<table style="width:100%; border-collapse:collapse; margin:1em 0;">
<tr style="border-bottom:2px solid #30363d;">
<th style="text-align:left;padding:8px;">Method</th>
<th style="text-align:left;padding:8px;">Use When</th>
<th style="text-align:left;padding:8px;">Advantages</th>
<th style="text-align:left;padding:8px;">Limitations</th>
</tr>
<tr style="border-bottom:1px solid #21262d;">
<td style="padding:8px;">RHF</td>
<td style="padding:8px;">Closed-shell ground states</td>
<td style="padding:8px;">Simple, \\(\\hat{S}^2\\) eigenfunction</td>
<td style="padding:8px;">Cannot describe bond breaking, open shells</td>
</tr>
<tr style="border-bottom:1px solid #21262d;">
<td style="padding:8px;">UHF</td>
<td style="padding:8px;">Open shells, bond dissociation</td>
<td style="padding:8px;">Flexible, lower energy</td>
<td style="padding:8px;">Spin contamination (\\(\\langle \\hat{S}^2 \\rangle \\neq S(S+1)\\))</td>
</tr>
<tr>
<td style="padding:8px;">ROHF</td>
<td style="padding:8px;">Open shells needing pure spin states</td>
<td style="padding:8px;">Proper \\(\\hat{S}^2\\) eigenfunction</td>
<td style="padding:8px;">More complicated equations, less variational flexibility than UHF</td>
</tr>
</table>

<div class="env-block theorem"><div class="env-title">Theorem 4.3.4 — UHF Energy Is at Least as Low as RHF</div><div class="env-body">
For any system, \\(E_{\\text{UHF}} \\leq E_{\\text{RHF}}\\), since the UHF ansatz includes the RHF wavefunction as a special case (set \\(\\phi_a^\\alpha = \\phi_a^\\beta\\)).
</div></div>

<h3>The H\\(_2\\) Dissociation Problem</h3>

<p>The classic illustration of the RHF/UHF difference is H\\(_2\\) dissociation. At equilibrium, RHF is excellent. But as the bond stretches to infinity, the molecule should dissociate into two neutral hydrogen atoms. RHF cannot do this correctly.</p>

<div class="env-block example"><div class="env-title">Example 4.3.5 — RHF Failure for H\\(_2\\) Dissociation</div><div class="env-body">
In the minimal basis (one function per atom), the RHF wavefunction for H\\(_2\\) is
\\[
|\\Phi_{\\text{RHF}}\\rangle = |\\sigma_g \\bar{\\sigma}_g\\rangle,
\\]
where \\(\\sigma_g = (1s_A + 1s_B)/\\sqrt{2(1+S)}\\) is the bonding orbital. Expanding:
\\[
\\sigma_g(1)\\sigma_g(2) \\propto [1s_A(1) + 1s_B(1)][1s_A(2) + 1s_B(2)] = 1s_A(1)1s_A(2) + 1s_B(1)1s_B(2) + \\text{covalent terms}.
\\]
The first two terms represent both electrons on atom A or both on atom B (ionic: H\\(^-\\)H\\(^+\\)). At dissociation, these ionic terms have equal weight as the covalent terms, which is physically wrong: H\\(_2\\) dissociates into two neutral atoms.
</div></div>

<div class="viz-placeholder" data-viz="viz-h2-dissociation"></div>

<div class="env-block definition"><div class="env-title">Definition 4.3.6 — Spin Contamination</div><div class="env-body">
A UHF wavefunction is generally not an eigenfunction of \\(\\hat{S}^2\\). The expectation value \\(\\langle \\hat{S}^2 \\rangle\\) deviates from the ideal value \\(S(S+1)\\). The difference
\\[
\\Delta S^2 = \\langle \\hat{S}^2 \\rangle - S(S+1)
\\]
is called the <em>spin contamination</em>. Significant spin contamination (\\(\\Delta S^2 > 0.1\\) or so) signals that the UHF wavefunction mixes in higher spin states and should be interpreted with caution.
</div></div>

<div class="env-block remark"><div class="env-title">Remark — Coulson-Fischer Point</div><div class="env-body">
For H\\(_2\\), the UHF solution coincides with RHF at short bond lengths (both give a spin-restricted solution). At the <em>Coulson-Fischer point</em>, a critical internuclear distance \\(R_{\\text{CF}}\\), the UHF solution spontaneously breaks spatial symmetry and the alpha and beta orbitals begin to localize on different atoms. Beyond \\(R_{\\text{CF}}\\), UHF correctly dissociates to two hydrogen atoms but at the cost of spin contamination.
</div></div>
`,
            visualizations: [
                {
                    id: 'viz-h2-dissociation',
                    title: 'RHF vs UHF for H\u2082 Dissociation',
                    description: 'Potential energy curves for H\\(_2\\) computed with RHF and UHF in a minimal basis. RHF gives the wrong dissociation limit (too high in energy), while UHF breaks symmetry beyond the Coulson-Fischer point and dissociates correctly. The exact curve (Full CI) is shown for reference.',
                    setup(body, controls) {
                        const viz = new VizEngine(body, { scale: 55, originX: 80, originY: 300 });

                        // Model potential energy curves for H2
                        // Using Morse-like potentials with correct qualitative behavior

                        function rhfEnergy(R) {
                            if (R < 0.3) return 5.0;
                            // RHF: correct near equilibrium, wrong dissociation limit
                            const De = 0.17; // depth in Hartree
                            const Re = 1.4;  // equilibrium distance in bohr
                            const alpha = 1.0;
                            const morse = De * (1 - Math.exp(-alpha * (R - Re))) ** 2 - De;
                            // Add ionic contamination at large R
                            const ionic = 0.3 * Math.exp(-0.5 * R);
                            return morse + ionic - 1.0;
                        }

                        function uhfEnergy(R) {
                            if (R < 0.3) return 5.0;
                            const De = 0.17;
                            const Re = 1.4;
                            const alpha = 1.0;
                            const Rcf = 2.3; // Coulson-Fischer point
                            if (R <= Rcf) {
                                // Same as RHF before CF point
                                return rhfEnergy(R);
                            }
                            // After CF point: proper dissociation
                            const morse = De * (1 - Math.exp(-alpha * (R - Re))) ** 2 - De;
                            const t = (R - Rcf) / (10 - Rcf);
                            const ionic = 0.3 * Math.exp(-0.5 * R) * (1 - Math.min(t * 3, 1));
                            return morse + ionic - 1.0;
                        }

                        function exactEnergy(R) {
                            if (R < 0.3) return 5.0;
                            // Full CI: correct everywhere
                            const De = 0.175;
                            const Re = 1.4;
                            const alpha = 1.05;
                            return De * (1 - Math.exp(-alpha * (R - Re))) ** 2 - De - 1.0;
                        }

                        function draw() {
                            viz.clear();

                            // Custom grid
                            const ctx = viz.ctx;
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 0.5;
                            for (let x = 0; x <= 8; x++) {
                                const [sx] = viz.toScreen(x, 0);
                                ctx.beginPath(); ctx.moveTo(sx, 0); ctx.lineTo(sx, viz.height); ctx.stroke();
                            }
                            for (let y = -1.2; y <= 0.5; y += 0.2) {
                                const [, sy] = viz.toScreen(0, y);
                                ctx.beginPath(); ctx.moveTo(0, sy); ctx.lineTo(viz.width, sy); ctx.stroke();
                            }

                            // Axes
                            ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1.5;
                            const [sx0, sy0] = viz.toScreen(0, -1.25);
                            const [sxMax] = viz.toScreen(8, 0);
                            const [, syMax] = viz.toScreen(0, 0.3);
                            ctx.beginPath(); ctx.moveTo(sx0, syMax); ctx.lineTo(sx0, viz.height); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(sx0, sy0 + 70); ctx.lineTo(sxMax, sy0 + 70); ctx.stroke();

                            // Tick labels for R
                            ctx.fillStyle = viz.colors.text; ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                            for (let R = 1; R <= 7; R++) {
                                const [sx] = viz.toScreen(R, 0);
                                ctx.fillText(R, sx, sy0 + 74);
                            }

                            // Tick labels for energy
                            ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
                            for (let e = -1.2; e <= 0.2; e += 0.2) {
                                const [, sy] = viz.toScreen(0, e);
                                ctx.fillText(e.toFixed(1), sx0 - 6, sy);
                            }

                            // Draw curves
                            viz.drawFunction(R => exactEnergy(R), 0.5, 8, viz.colors.white, 2.5);
                            viz.drawFunction(R => rhfEnergy(R), 0.5, 8, viz.colors.red, 2);
                            viz.drawFunction(R => uhfEnergy(R), 0.5, 8, viz.colors.blue, 2);

                            // Mark Coulson-Fischer point
                            const Rcf = 2.3;
                            const Ecf = uhfEnergy(Rcf);
                            viz.drawPoint(Rcf, Ecf, viz.colors.yellow, '', 5);
                            const [sxcf, sycf] = viz.toScreen(Rcf, Ecf);
                            ctx.fillStyle = viz.colors.yellow; ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'left'; ctx.textBaseline = 'bottom';
                            ctx.fillText('Coulson-Fischer', sxcf + 6, sycf - 4);

                            // Mark equilibrium
                            viz.drawPoint(1.4, exactEnergy(1.4), viz.colors.green, '', 4);
                            const [sxeq, syeq] = viz.toScreen(1.4, exactEnergy(1.4));
                            ctx.fillStyle = viz.colors.green;
                            ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                            ctx.fillText('Re', sxeq, syeq + 6);

                            // Dissociation limit markers
                            const [, syDissRHF] = viz.toScreen(0, rhfEnergy(7.5));
                            const [, syDissExact] = viz.toScreen(0, exactEnergy(7.5));
                            ctx.setLineDash([4, 4]);
                            ctx.strokeStyle = viz.colors.red + '88'; ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.moveTo(sx0, syDissRHF); ctx.lineTo(sxMax, syDissRHF); ctx.stroke();
                            ctx.strokeStyle = viz.colors.white + '44';
                            ctx.beginPath(); ctx.moveTo(sx0, syDissExact); ctx.lineTo(sxMax, syDissExact); ctx.stroke();
                            ctx.setLineDash([]);

                            // Legend
                            const lx = viz.width - 180, ly = 20;
                            ctx.font = '12px -apple-system,sans-serif'; ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
                            ctx.fillStyle = viz.colors.white; ctx.fillText('Exact (Full CI)', lx + 20, ly);
                            ctx.fillStyle = viz.colors.red; ctx.fillText('RHF', lx + 20, ly + 18);
                            ctx.fillStyle = viz.colors.blue; ctx.fillText('UHF', lx + 20, ly + 36);

                            ctx.fillStyle = viz.colors.white; ctx.beginPath(); ctx.arc(lx + 8, ly, 4, 0, Math.PI * 2); ctx.fill();
                            ctx.fillStyle = viz.colors.red; ctx.beginPath(); ctx.arc(lx + 8, ly + 18, 4, 0, Math.PI * 2); ctx.fill();
                            ctx.fillStyle = viz.colors.blue; ctx.beginPath(); ctx.arc(lx + 8, ly + 36, 4, 0, Math.PI * 2); ctx.fill();

                            // Axis labels
                            viz.screenText('R (bohr)', viz.width / 2, viz.height - 10, viz.colors.text, 13);
                            ctx.save(); ctx.translate(14, viz.height / 2); ctx.rotate(-Math.PI / 2);
                            ctx.fillStyle = viz.colors.text; ctx.font = '13px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.fillText('Energy (Hartree)', 0, 0);
                            ctx.restore();
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'For H\\(_2\\) in a minimal basis, write the RHF wavefunction in terms of atomic orbitals \\(1s_A\\) and \\(1s_B\\). Identify the covalent and ionic contributions explicitly.',
                    hint: 'Expand \\(\\sigma_g(1)\\sigma_g(2)\\) where \\(\\sigma_g \\propto 1s_A + 1s_B\\).',
                    solution: '\\(\\sigma_g = (1s_A + 1s_B)/\\sqrt{2(1+S)}\\). The spatial part of the RHF wavefunction is \\(\\sigma_g(1)\\sigma_g(2) \\propto 1s_A(1)1s_B(2) + 1s_B(1)1s_A(2) + 1s_A(1)1s_A(2) + 1s_B(1)1s_B(2)\\). The first two terms are covalent (one electron on each atom), and the last two are ionic (both electrons on the same atom: H\\(^-\\)H\\(^+\\)). RHF gives 50% ionic character at all bond lengths, which is qualitatively wrong at dissociation.'
                },
                {
                    question: 'Explain why the UHF wavefunction for H\\(_2\\) at large \\(R\\) is not an eigenfunction of \\(\\hat{S}^2\\), even though it correctly describes two separated hydrogen atoms.',
                    hint: 'At large \\(R\\), the UHF alpha orbital localizes on atom A and the beta orbital on atom B. What is the spin state of \\(|\\phi_A\\alpha\\, \\phi_B\\beta\\rangle\\)?',
                    solution: 'At large \\(R\\), the UHF solution has \\(\\phi^\\alpha \\approx 1s_A\\) and \\(\\phi^\\beta \\approx 1s_B\\). The Slater determinant \\(|1s_A\\alpha\\, 1s_B\\beta\\rangle = \\frac{1}{\\sqrt{2}}[1s_A(1)\\alpha(1)1s_B(2)\\beta(2) - 1s_B(1)\\beta(1)1s_A(2)\\alpha(2)]\\). This is a mixture of singlet (\\(S=0\\)) and triplet (\\(S=1\\)) components, so it is not an eigenfunction of \\(\\hat{S}^2\\). The correct dissociation should be a pure singlet \\(\\frac{1}{\\sqrt{2}}[1s_A(1)1s_B(2) + 1s_B(1)1s_A(2)] \\cdot \\frac{1}{\\sqrt{2}}[\\alpha(1)\\beta(2) - \\beta(1)\\alpha(2)]\\).'
                },
                {
                    question: 'For a lithium atom (\\(Z=3\\), \\(1s^2 2s^1\\)), which HF method is appropriate: RHF, UHF, or ROHF? Justify your choice and discuss the alternatives.',
                    hint: 'Li has 3 electrons (odd number), so it cannot be a closed-shell singlet. Consider how each method handles an unpaired electron.',
                    solution: 'RHF is not applicable because Li has an odd number of electrons and cannot form a closed shell. Both UHF and ROHF can handle the open shell. ROHF forces the \\(1s\\) pair to share the same spatial orbital and adds the singly occupied \\(2s\\). This ensures the wavefunction is an eigenfunction of \\(\\hat{S}^2\\) with \\(S = 1/2\\). UHF allows different \\(1s^\\alpha\\) and \\(1s^\\beta\\) orbitals, which may give a slightly lower energy but introduces spin contamination. For a ground-state doublet, ROHF is conceptually cleaner, while UHF is computationally simpler.'
                },
                {
                    question: 'Show that for a closed-shell system, the UHF energy equals the RHF energy (i.e., the UHF solution does not break spin symmetry).',
                    hint: 'At the RHF solution, \\(\\phi_a^\\alpha = \\phi_a^\\beta\\) for all \\(a\\). Is this a stationary point of the UHF energy functional?',
                    solution: 'If we set \\(\\phi_a^\\alpha = \\phi_a^\\beta = \\phi_a\\) for all \\(a\\), the UHF energy functional reduces to the RHF energy functional. Since the RHF solution is a stationary point of the RHF energy, and the RHF constraint space is a subset of the UHF constraint space, the RHF solution is also a stationary point of the UHF functional. For stable closed-shell molecules near equilibrium, this stationary point is a minimum, so UHF and RHF give the same energy. (At stretched geometries, the RHF solution may become a saddle point of the UHF functional, leading to the Coulson-Fischer instability.)'
                },
                {
                    question: 'The spin contamination in UHF can be computed as \\(\\langle \\hat{S}^2 \\rangle = S(S+1) + N_\\beta - \\sum_{i,j} |\\langle \\phi_i^\\alpha | \\phi_j^\\beta \\rangle|^2\\), where the sum is over occupied orbitals. For a closed-shell singlet where \\(\\phi_i^\\alpha = \\phi_i^\\beta\\), verify that \\(\\langle \\hat{S}^2 \\rangle = 0\\).',
                    hint: 'For a closed-shell system, \\(S = 0\\), \\(N_\\alpha = N_\\beta = N/2\\), and the alpha and beta orbitals are identical and orthonormal.',
                    solution: 'With \\(S = 0\\) and \\(\\phi_i^\\alpha = \\phi_i^\\beta\\): the sum \\(\\sum_{i,j} |\\langle \\phi_i^\\alpha | \\phi_j^\\beta \\rangle|^2 = \\sum_{i,j} |\\delta_{ij}|^2 = N_\\beta\\) (since the orbitals are orthonormal). Therefore \\(\\langle \\hat{S}^2 \\rangle = 0 + N_\\beta - N_\\beta = 0\\), confirming no spin contamination for a proper closed-shell solution.'
                }
            ]
        },

        // ========== SECTION 4: Koopmans' Theorem ==========
        {
            id: 'sec04-4-koopmans',
            title: "Koopmans' Theorem",
            content: `
<h2>4.4 Koopmans' Theorem</h2>

<p>The orbital energies \\(\\varepsilon_a\\) that emerge from the Hartree-Fock equations have a direct physical interpretation, thanks to a remarkable theorem proved by Tjalling Koopmans in 1934.</p>

<div class="env-block theorem"><div class="env-title">Theorem 4.4.1 — Koopmans' Theorem</div><div class="env-body">
Within the Hartree-Fock approximation, if the orbitals are frozen (not re-optimized) upon removal of an electron, the ionization potential for removing an electron from occupied orbital \\(\\chi_k\\) is
\\[
\\text{IP}_k = E(N-1, k) - E(N) = -\\varepsilon_k,
\\]
where \\(E(N)\\) is the \\(N\\)-electron HF energy and \\(E(N-1,k)\\) is the \\((N-1)\\)-electron HF energy with orbital \\(k\\) removed. Similarly, the electron affinity for adding an electron to virtual orbital \\(\\chi_r\\) is
\\[
\\text{EA}_r = E(N) - E(N+1, r) = -\\varepsilon_r.
\\]
</div></div>

<div class="env-block proof"><div class="env-title">Proof</div><div class="env-body">
The HF energy of the \\(N\\)-electron system is
\\[
E(N) = \\sum_{a=1}^{N} h_{aa} + \\frac{1}{2}\\sum_{a=1}^{N}\\sum_{b=1}^{N}(J_{ab} - K_{ab}).
\\]
Remove electron \\(k\\) without changing the remaining orbitals (frozen orbital approximation):
\\[
E(N-1, k) = \\sum_{a \\neq k} h_{aa} + \\frac{1}{2}\\sum_{a \\neq k}\\sum_{b \\neq k}(J_{ab} - K_{ab}).
\\]
The difference is:
\\[
E(N) - E(N-1,k) = h_{kk} + \\frac{1}{2}\\sum_{b \\neq k}(J_{kb} - K_{kb}) + \\frac{1}{2}\\sum_{a \\neq k}(J_{ak} - K_{ak}) = h_{kk} + \\sum_{b=1}^{N}(J_{kb} - K_{kb}) - (J_{kk} - K_{kk}).
\\]
Since \\(J_{kk} = K_{kk}\\), this simplifies to \\(h_{kk} + \\sum_{b=1}^{N}(J_{kb} - K_{kb})\\). But the orbital energy is
\\[
\\varepsilon_k = h_{kk} + \\sum_{b=1}^{N}(J_{kb} - K_{kb}),
\\]
so \\(\\text{IP}_k = -\\varepsilon_k\\).
<div class="qed">∎</div>
</div></div>

<div class="env-block remark"><div class="env-title">Remark — Orbital Energy Interpretation</div><div class="env-body">
<p>The orbital energy \\(\\varepsilon_k\\) is <em>not</em> simply the energy of one electron. It includes the kinetic energy, nuclear attraction, and the full interaction with all other electrons (Coulomb minus exchange). It therefore double-counts the electron-electron interaction when summed over all electrons:</p>
\\[
\\sum_{a=1}^{N} \\varepsilon_a = \\sum_{a=1}^{N} h_{aa} + \\sum_{a=1}^{N}\\sum_{b=1}^{N}(J_{ab} - K_{ab}) = E_{\\text{HF}} + \\frac{1}{2}\\sum_{a,b}(J_{ab} - K_{ab}).
\\]
Hence \\(E_{\\text{HF}} \\neq \\sum_a \\varepsilon_a\\). The correct relation is \\(E_{\\text{HF}} = \\sum_a \\varepsilon_a - \\frac{1}{2}\\sum_{a,b}(J_{ab} - K_{ab})\\).
</p>
</div></div>

<div class="env-block warning"><div class="env-title">Warning — Limitations of Koopmans' Theorem</div><div class="env-body">
<p>Koopmans' theorem relies on two approximations that partially cancel:</p>
<ol>
<li><strong>Frozen orbitals:</strong> In reality, the remaining orbitals relax upon ionization, lowering the ion energy. This <em>orbital relaxation</em> effect makes the true IP smaller than \\(-\\varepsilon_k\\).</li>
<li><strong>Neglect of electron correlation:</strong> Correlation energy is typically larger for the \\(N\\)-electron system than the \\((N-1)\\)-electron ion (more electron pairs). This makes the true IP larger than \\(-\\varepsilon_k\\).</li>
</ol>
<p>These two errors partially cancel, which is why Koopmans' theorem often gives reasonable IPs (within 1-2 eV) despite its approximations.</p>
</div></div>

<div class="env-block example"><div class="env-title">Example 4.4.2 — Ionization Potentials of H\\(_2\\)O</div><div class="env-body">
For H\\(_2\\)O at the HF/cc-pVTZ level, the occupied orbital energies (in eV) are approximately:
<table style="width:60%; margin:0.5em auto; border-collapse:collapse;">
<tr style="border-bottom:1px solid #30363d;"><th style="padding:4px;">Orbital</th><th style="padding:4px;">\\(-\\varepsilon_k\\) (eV)</th><th style="padding:4px;">Expt. IP (eV)</th></tr>
<tr><td style="padding:4px;">\\(1a_1\\) (O 1s)</td><td style="padding:4px;">559.5</td><td style="padding:4px;">539.7</td></tr>
<tr><td style="padding:4px;">\\(2a_1\\)</td><td style="padding:4px;">36.7</td><td style="padding:4px;">32.2</td></tr>
<tr><td style="padding:4px;">\\(1b_2\\)</td><td style="padding:4px;">19.5</td><td style="padding:4px;">18.5</td></tr>
<tr><td style="padding:4px;">\\(3a_1\\)</td><td style="padding:4px;">15.9</td><td style="padding:4px;">14.7</td></tr>
<tr><td style="padding:4px;">\\(1b_1\\) (HOMO)</td><td style="padding:4px;">13.8</td><td style="padding:4px;">12.6</td></tr>
</table>
<p>The ordering is correct, and the valence IPs agree to within about 1 eV, illustrating the partial cancellation of relaxation and correlation effects.</p>
</div></div>

<div class="env-block proposition"><div class="env-title">Proposition 4.4.3 — Ordering of Orbital Energies</div><div class="env-body">
In a canonical HF calculation, the occupied orbital energies are all negative (\\(\\varepsilon_k < 0\\) for occupied orbitals), while virtual orbital energies can be positive or negative. The highest occupied molecular orbital (HOMO) energy gives the first ionization potential via Koopmans' theorem:
\\[
\\text{IP}_1 = -\\varepsilon_{\\text{HOMO}}.
\\]
</div></div>
`,
            visualizations: [],
            exercises: [
                {
                    question: 'Derive the relationship \\(E_{\\text{HF}} = \\frac{1}{2}\\sum_a (h_{aa} + \\varepsilon_a)\\) for the closed-shell HF energy.',
                    hint: 'Start from \\(\\varepsilon_a = h_{aa} + \\sum_b (J_{ab} - K_{ab})\\) and \\(E_{\\text{HF}} = \\sum_a h_{aa} + \\frac{1}{2}\\sum_{a,b}(J_{ab} - K_{ab})\\).',
                    solution: '\\(\\sum_a \\varepsilon_a = \\sum_a h_{aa} + \\sum_a \\sum_b (J_{ab} - K_{ab})\\). Also, \\(E_{\\text{HF}} = \\sum_a h_{aa} + \\frac{1}{2}\\sum_{a,b}(J_{ab} - K_{ab})\\). Therefore \\(\\sum_a \\varepsilon_a = E_{\\text{HF}} + \\frac{1}{2}\\sum_{a,b}(J_{ab} - K_{ab}) = 2E_{\\text{HF}} - \\sum_a h_{aa}\\). Rearranging: \\(E_{\\text{HF}} = \\frac{1}{2}(\\sum_a h_{aa} + \\sum_a \\varepsilon_a) = \\frac{1}{2}\\sum_a(h_{aa} + \\varepsilon_a)\\).'
                },
                {
                    question: 'Explain why Koopmans\' theorem works better for valence ionizations than for core ionizations.',
                    hint: 'Consider the magnitude of orbital relaxation for removing a core electron vs. a valence electron.',
                    solution: 'Core ionization (e.g., removing a 1s electron) creates a very different effective potential for the remaining electrons: the nuclear charge is now much less screened, causing substantial orbital contraction (relaxation). This large relaxation effect is not captured by the frozen-orbital approximation, leading to large errors (tens of eV for deep core levels). For valence ionizations, the change in the effective potential is much smaller, so orbital relaxation is modest and the cancellation with correlation effects works better.'
                },
                {
                    question: 'If the HOMO energy of a molecule is \\(\\varepsilon_{\\text{HOMO}} = -0.5\\) Hartree and the LUMO energy is \\(\\varepsilon_{\\text{LUMO}} = +0.2\\) Hartree, estimate the first ionization potential and first electron affinity using Koopmans\' theorem. Convert to eV (1 Hartree = 27.211 eV).',
                    hint: 'IP \\(\\approx -\\varepsilon_{\\text{HOMO}}\\), EA \\(\\approx -\\varepsilon_{\\text{LUMO}}\\).',
                    solution: 'IP \\(\\approx -\\varepsilon_{\\text{HOMO}} = 0.5\\) Hartree \\(= 13.6\\) eV. EA \\(\\approx -\\varepsilon_{\\text{LUMO}} = -0.2\\) Hartree \\(= -5.4\\) eV. The negative EA means the anion is unstable (higher in energy than the neutral), so the molecule does not bind an extra electron at this level of theory.'
                },
                {
                    question: 'Show that the total HF energy cannot be written as a sum of orbital energies. Specifically, show that \\(E_{\\text{HF}} < \\sum_{a=1}^N \\varepsilon_a\\) for any system with \\(N \\geq 2\\).',
                    hint: 'The difference \\(\\sum_a \\varepsilon_a - E_{\\text{HF}} = \\frac{1}{2}\\sum_{a,b}(J_{ab} - K_{ab})\\). What is the sign of \\(J_{ab} - K_{ab}\\)?',
                    solution: 'We have \\(\\sum_a \\varepsilon_a - E_{\\text{HF}} = \\frac{1}{2}\\sum_{a,b}(J_{ab} - K_{ab})\\). Since \\(J_{ab} \\geq K_{ab} \\geq 0\\) for all pairs, the double sum is non-negative. It is strictly positive whenever \\(N \\geq 2\\) (there is at least one pair with \\(J_{ab} > K_{ab}\\), specifically pairs with different spin). Therefore \\(\\sum_a \\varepsilon_a > E_{\\text{HF}}\\), and the orbital energies double-count the electron-electron interaction.'
                },
                {
                    question: 'A photoelectron spectrum of N\\(_2\\) shows ionization peaks at 15.6 eV, 16.7 eV, and 18.8 eV. The HF orbital energies (in eV) are \\(-\\varepsilon_{3\\sigma_g} = 17.2\\), \\(-\\varepsilon_{1\\pi_u} = 17.1\\), \\(-\\varepsilon_{2\\sigma_u} = 21.1\\). Assign each peak and comment on the ordering.',
                    hint: 'The HF orbital ordering for N\\(_2\\) is known to swap the \\(3\\sigma_g\\) and \\(1\\pi_u\\) levels compared to the experimental ordering. Which orbital has the lowest IP?',
                    solution: 'Experimentally, the ordering is \\(3\\sigma_g\\) (15.6 eV), \\(1\\pi_u\\) (16.7 eV), \\(2\\sigma_u\\) (18.8 eV). The HF values predict \\(-\\varepsilon_{1\\pi_u} = 17.1\\) eV and \\(-\\varepsilon_{3\\sigma_g} = 17.2\\) eV, which nearly swaps the order (the energy gap is tiny). This is the famous N\\(_2\\) orbital ordering problem: Koopmans\' theorem, combined with HF, barely gets the HOMO identity right. Correlation and relaxation effects are needed to definitively resolve the ordering. The assignment is: 15.6 eV \\(\\to 3\\sigma_g\\), 16.7 eV \\(\\to 1\\pi_u\\), 18.8 eV \\(\\to 2\\sigma_u\\).'
                }
            ]
        },

        // ========== SECTION 5: HF Energy Expression and Correlation Energy ==========
        {
            id: 'sec04-5-hf-energy-correlation',
            title: 'HF Energy and Correlation Energy',
            content: `
<h2>4.5 HF Energy Expression and Correlation Energy</h2>

<p>Having established the Hartree-Fock framework, we now examine the total energy in detail and ask: what does HF get right, what does it miss, and how much does the missing piece matter?</p>

<h3>Breakdown of the HF Energy</h3>

<div class="env-block theorem"><div class="env-title">Theorem 4.5.1 — Closed-Shell HF Energy Decomposition</div><div class="env-body">
For a closed-shell molecule with \\(N/2\\) doubly occupied spatial orbitals, the HF energy is
\\[
E_{\\text{HF}} = 2\\sum_{a=1}^{N/2} h_{aa} + \\sum_{a=1}^{N/2}\\sum_{b=1}^{N/2}(2J_{ab} - K_{ab}) + V_{NN},
\\]
where:
<ul>
<li>\\(h_{aa} = \\langle \\phi_a | -\\frac{1}{2}\\nabla^2 - \\sum_A Z_A/r_{iA} | \\phi_a \\rangle\\) contains the kinetic energy \\(T\\) and nuclear attraction \\(V_{eN}\\),</li>
<li>\\(J_{ab} = (aa|bb)\\) is the Coulomb integral (classical electron-electron repulsion),</li>
<li>\\(K_{ab} = (ab|ba)\\) is the exchange integral (quantum mechanical correction),</li>
<li>\\(V_{NN} = \\sum_{A>B} Z_A Z_B / R_{AB}\\) is the nuclear-nuclear repulsion (a constant in the BO approximation).</li>
</ul>
The sums run over spatial orbitals. The factor of 2 accounts for double occupancy.
</div></div>

<div class="viz-placeholder" data-viz="viz-energy-decomposition"></div>

<h3>What Hartree-Fock Gets Right</h3>

<div class="env-block remark"><div class="env-title">Remark</div><div class="env-body">
<p>Hartree-Fock typically captures ~99% of the total electronic energy. For molecules near equilibrium geometry, HF gives:</p>
<ul>
<li>Qualitatively correct molecular geometries (bond lengths within ~0.02 A)</li>
<li>Reasonable vibrational frequencies (typically 5-10% too high)</li>
<li>Correct qualitative orbital picture and symmetry assignments</li>
<li>Good electron densities (though slightly too contracted)</li>
</ul>
<p>The remaining ~1% of the energy is the electron correlation energy, which, despite being a small fraction of the total, is often decisive for chemical accuracy.</p>
</div></div>

<h3>The Correlation Energy</h3>

<div class="env-block definition"><div class="env-title">Definition 4.5.2 — Correlation Energy (Lowdin)</div><div class="env-body">
The <em>correlation energy</em> is the difference between the exact nonrelativistic energy and the Hartree-Fock limit energy:
\\[
E_{\\text{corr}} = E_{\\text{exact}} - E_{\\text{HF}}.
\\]
By the variational principle, \\(E_{\\text{corr}} \\leq 0\\) (the HF energy is always above or equal to the exact energy). Note that \\(E_{\\text{HF}}\\) here means the Hartree-Fock limit, i.e., the HF energy in a complete (infinite) basis set.
</div></div>

<div class="env-block example"><div class="env-title">Example 4.5.3 — Correlation Energies of Small Molecules</div><div class="env-body">
<table style="width:80%; margin:0.5em auto; border-collapse:collapse;">
<tr style="border-bottom:2px solid #30363d;">
<th style="padding:6px;">Molecule</th>
<th style="padding:6px;">\\(E_{\\text{HF}}\\) (Hartree)</th>
<th style="padding:6px;">\\(E_{\\text{corr}}\\) (Hartree)</th>
<th style="padding:6px;">% of total</th>
</tr>
<tr style="border-bottom:1px solid #21262d;"><td style="padding:6px;">He</td><td style="padding:6px;">\\(-2.8617\\)</td><td style="padding:6px;">\\(-0.0421\\)</td><td style="padding:6px;">1.5%</td></tr>
<tr style="border-bottom:1px solid #21262d;"><td style="padding:6px;">H\\(_2\\)O</td><td style="padding:6px;">\\(-76.065\\)</td><td style="padding:6px;">\\(-0.370\\)</td><td style="padding:6px;">0.5%</td></tr>
<tr style="border-bottom:1px solid #21262d;"><td style="padding:6px;">N\\(_2\\)</td><td style="padding:6px;">\\(-108.99\\)</td><td style="padding:6px;">\\(-0.530\\)</td><td style="padding:6px;">0.5%</td></tr>
<tr><td style="padding:6px;">C\\(_2\\)H\\(_4\\)</td><td style="padding:6px;">\\(-78.07\\)</td><td style="padding:6px;">\\(-0.371\\)</td><td style="padding:6px;">0.5%</td></tr>
</table>
<p>The correlation energy is a small fraction of the total, but note that 0.370 Hartree \\(\\approx\\) 232 kcal/mol for water, far larger than typical chemical energy differences (~1-10 kcal/mol). This is why post-HF methods (CI, MP2, CC) are essential for quantitative chemistry.</p>
</div></div>

<h3>Sources of Correlation</h3>

<div class="env-block definition"><div class="env-title">Definition 4.5.4 — Dynamic and Static Correlation</div><div class="env-body">
<p>Electron correlation is conventionally divided into two types:</p>
<ul>
<li><strong>Dynamic correlation:</strong> Arises from the instantaneous electron-electron repulsion that the mean-field HF potential cannot capture. Electrons avoid each other more than the HF wavefunction predicts (they have a "correlation hole"). This is the dominant contribution for molecules near equilibrium.</li>
<li><strong>Static (nondynamic) correlation:</strong> Arises when the ground state has nearly degenerate configurations, making a single-determinant description qualitatively wrong. Examples: bond breaking, diradicals, transition states, transition metal complexes with nearly degenerate d-orbitals.</li>
</ul>
</div></div>

<div class="env-block theorem"><div class="env-title">Theorem 4.5.5 — Brillouin's Theorem</div><div class="env-body">
Singly excited determinants do not interact directly with the HF ground-state determinant:
\\[
\\langle \\Phi_0 | \\hat{H} | \\Phi_a^r \\rangle = 0,
\\]
where \\(\\Phi_a^r\\) is obtained from \\(\\Phi_0\\) by replacing occupied orbital \\(\\chi_a\\) with virtual orbital \\(\\chi_r\\). This means that the leading correction to the HF wavefunction comes from double excitations.
</div></div>

<div class="env-block proof"><div class="env-title">Proof</div><div class="env-body">
By the Slater-Condon rules, \\(\\langle \\Phi_0 | \\hat{H} | \\Phi_a^r \\rangle = \\langle \\chi_a | \\hat{f} | \\chi_r \\rangle + \\sum_{b}^{\\text{occ}} \\langle ab || rb \\rangle\\). The second term equals \\(\\sum_b (\\langle ab|rb\\rangle - \\langle ab|br\\rangle)\\), which combined with \\(h_{ar}\\) gives \\(f_{ar} = \\langle \\chi_a | \\hat{f} | \\chi_r \\rangle\\). But since \\(\\chi_a\\) and \\(\\chi_r\\) are canonical HF orbitals (eigenfunctions of \\(\\hat{f}\\) with different eigenvalues), \\(f_{ar} = \\varepsilon_r \\delta_{ar} = 0\\) for \\(a\\) occupied and \\(r\\) virtual.
<div class="qed">∎</div>
</div></div>

<div class="env-block remark"><div class="env-title">Remark — Implications of Brillouin's Theorem</div><div class="env-body">
<p>Brillouin's theorem has important consequences:</p>
<ol>
<li>The HF wavefunction is already optimal with respect to single excitations (this is equivalent to the HF stationarity condition).</li>
<li>The leading correlation correction is of second order, involving double excitations \\(\\Phi_{ab}^{rs}\\). This is the basis of MP2 (Chapter 9).</li>
<li>Singles still contribute to properties (e.g., dipole moments) because Brillouin's theorem only constrains the Hamiltonian matrix element, not other operators.</li>
</ol>
</div></div>

<div class="env-block warning"><div class="env-title">Warning — Chemical Accuracy</div><div class="env-body">
<p>"Chemical accuracy" is conventionally defined as errors below 1 kcal/mol (~4.2 kJ/mol, ~0.0016 Hartree, ~43 meV). Hartree-Fock alone rarely achieves this for relative energies (reaction energies, barrier heights). Post-HF methods (MP2, CCSD(T)) or DFT with suitable functionals are needed for quantitative thermochemistry.</p>
</div></div>
`,
            visualizations: [
                {
                    id: 'viz-energy-decomposition',
                    title: 'HF Energy Decomposition',
                    description: 'Breakdown of the Hartree-Fock energy into its components: kinetic energy (\\(T\\)), nuclear attraction (\\(V_{eN}\\)), Coulomb repulsion (\\(J\\)), exchange (\\(K\\)), and nuclear repulsion (\\(V_{NN}\\)). Adjust the nuclear charge \\(Z\\) to see how each component scales for a helium-like atom.',
                    setup(body, controls) {
                        const viz = new VizEngine(body, { scale: 1, originX: 60, originY: 30 });
                        const ctx = viz.ctx;

                        let Z = 2;
                        VizEngine.createSlider(controls, 'Nuclear charge Z', 1, 10, Z, 1, v => { Z = v; draw(); });

                        function draw() {
                            viz.clear();

                            // Model HF energy components for a He-like atom (2 electrons)
                            // Using approximate scaling relations
                            const T = Z * Z * 0.5 * 2;          // Kinetic ~ Z^2
                            const VeN = -Z * Z * 2;              // Nuclear attraction ~ -Z^2 * N
                            const Jval = Z * 0.625;              // Coulomb ~ Z * 5/8
                            const Kval = 0;                       // For 2-electron closed shell, K is absorbed
                            const Vnn = 0;                        // Single nucleus

                            const components = [
                                { label: 'T (kinetic)', value: T, color: viz.colors.blue },
                                { label: 'V_eN (nuc. attr.)', value: VeN, color: viz.colors.red },
                                { label: 'J (Coulomb)', value: Jval, color: viz.colors.orange },
                                { label: 'E_HF (total)', value: T + VeN + Jval, color: viz.colors.green }
                            ];

                            // Draw bar chart
                            const barWidth = 100;
                            const maxAbsVal = Math.max(...components.map(c => Math.abs(c.value)));
                            const chartHeight = viz.height - 80;
                            const chartTop = 50;
                            const zeroY = chartTop + chartHeight * 0.45;
                            const scale = (chartHeight * 0.4) / maxAbsVal;

                            // Zero line
                            ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.moveTo(40, zeroY); ctx.lineTo(viz.width - 20, zeroY); ctx.stroke();
                            ctx.fillStyle = viz.colors.text; ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
                            ctx.fillText('0', 35, zeroY);

                            // Bars
                            const startX = 80;
                            const gap = (viz.width - startX - 40) / components.length;
                            components.forEach((comp, i) => {
                                const x = startX + i * gap + (gap - barWidth) / 2;
                                const barH = comp.value * scale;

                                ctx.fillStyle = comp.color + 'cc';
                                if (comp.value >= 0) {
                                    ctx.fillRect(x, zeroY - barH, barWidth, barH);
                                } else {
                                    ctx.fillRect(x, zeroY, barWidth, -barH);
                                }

                                // Border
                                ctx.strokeStyle = comp.color;
                                ctx.lineWidth = 1.5;
                                if (comp.value >= 0) {
                                    ctx.strokeRect(x, zeroY - barH, barWidth, barH);
                                } else {
                                    ctx.strokeRect(x, zeroY, barWidth, -barH);
                                }

                                // Label
                                ctx.fillStyle = comp.color;
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                                ctx.fillText(comp.label, x + barWidth / 2, zeroY + Math.abs(barH) + 8 + (comp.value < 0 ? -barH - 8 : barH + 2));

                                // Value
                                ctx.fillStyle = viz.colors.white;
                                ctx.font = 'bold 12px -apple-system,sans-serif';
                                ctx.textBaseline = comp.value >= 0 ? 'bottom' : 'top';
                                const valY = comp.value >= 0 ? zeroY - barH - 4 : zeroY - barH + 4;
                                ctx.fillText(comp.value.toFixed(2) + ' Ha', x + barWidth / 2, valY);

                                // Bottom label
                                ctx.fillStyle = comp.color;
                                ctx.font = '10px -apple-system,sans-serif';
                                ctx.textBaseline = 'top';
                                ctx.textAlign = 'center';
                                ctx.fillText(comp.label, x + barWidth / 2, viz.height - 25);
                            });

                            // Title
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                            ctx.fillText('HF Energy Components for He-like atom (Z = ' + Z + ')', viz.width / 2, 10);

                            // Virial theorem note
                            ctx.fillStyle = viz.colors.muted;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'left'; ctx.textBaseline = 'top';
                            ctx.fillText('Virial: T = -E_total, V = 2E_total', 10, viz.height - 12);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Using the data in Example 4.5.3, compute the correlation energy of water in kcal/mol and compare it to typical bond dissociation energies (~100 kcal/mol for O-H).',
                    hint: '1 Hartree = 627.51 kcal/mol.',
                    solution: '\\(E_{\\text{corr}} = -0.370\\) Hartree \\(\\times 627.51\\) kcal/mol/Hartree \\(\\approx -232\\) kcal/mol. This is about 2.3 times the O-H bond dissociation energy (~100 kcal/mol). While the correlation energy is a small percentage of the total energy (~76 Hartree), it is enormous compared to chemically relevant energy differences. Fortunately, most of the correlation energy is associated with core electrons and cancels in relative energies.'
                },
                {
                    question: 'Prove Brillouin\'s theorem using the fact that the HF orbitals are stationary points of the energy functional.',
                    hint: 'Consider a small mixing of occupied orbital \\(\\chi_a\\) with virtual orbital \\(\\chi_r\\): \\(\\chi_a \\to \\chi_a + \\epsilon \\chi_r\\). The energy must be stationary (\\(dE/d\\epsilon|_{\\epsilon=0} = 0\\)).',
                    solution: 'The first-order change in energy upon mixing \\(\\chi_a\\) with \\(\\chi_r\\) is proportional to \\(\\langle \\Phi_0 | \\hat{H} | \\Phi_a^r \\rangle\\) (this can be shown by expanding the perturbed determinant). Since the HF orbitals minimize the energy, the first derivative must vanish: \\(dE/d\\epsilon|_{\\epsilon=0} = 0\\). This directly implies \\(\\langle \\Phi_0 | \\hat{H} | \\Phi_a^r \\rangle = 0\\). The stationarity of the HF energy with respect to occupied-virtual rotations is equivalent to Brillouin\'s theorem.'
                },
                {
                    question: 'Explain why Hartree-Fock overestimates vibrational frequencies by about 5-10%. How does the missing correlation energy contribute?',
                    hint: 'The vibrational frequency depends on the curvature of the potential energy surface at the minimum. Does correlation energy vary with geometry?',
                    solution: 'HF overestimates vibrational frequencies because it overestimates force constants (the curvature of the PES). The correlation energy is more negative at the equilibrium geometry (where electrons are closer together) than at displaced geometries (where the molecule is distorted). This means the true PES is slightly flatter than the HF PES near the minimum, so the true curvature is smaller and the frequency is lower. A standard empirical correction is to scale HF frequencies by ~0.89-0.91.'
                },
                {
                    question: 'For the hydrogen molecule at equilibrium, \\(E_{\\text{HF}} = -1.1336\\) Hartree and \\(E_{\\text{exact}} = -1.1745\\) Hartree. What fraction of the correlation energy is recovered by HF? If the bond dissociation energy (De) is 0.1745 Hartree exactly, what does HF predict for De?',
                    hint: 'Compute \\(E_{\\text{corr}}\\) and the HF dissociation energy. The dissociation limit for two H atoms is \\(-1.0\\) Hartree exactly.',
                    solution: '\\(E_{\\text{corr}} = -1.1745 - (-1.1336) = -0.0409\\) Hartree. HF captures \\(1.1336/1.1745 \\approx 96.5\\%\\) of the total energy. The exact \\(D_e = 1.1745 - 1.0 = 0.1745\\) Hartree. HF predicts \\(D_e = 1.1336 - 1.0 = 0.1336\\) Hartree, an error of 0.0409 Hartree (23%). While HF gets 96.5% of the total energy, it only gets 77% of the bond energy, illustrating how small correlation energy errors become large fractional errors in relative energies.'
                },
                {
                    question: 'Classify the following situations as primarily dynamic or static correlation problems: (a) Ne atom, (b) O\\(_3\\) (ozone) ground state, (c) Cr\\(_2\\) bond, (d) CH\\(_4\\) at equilibrium.',
                    hint: 'Static correlation arises when near-degenerate configurations are important. Dynamic correlation is the "normal" instantaneous electron-electron avoidance.',
                    solution: '(a) Ne: Primarily dynamic. Closed shell, no near-degenerate configurations. (b) O\\(_3\\): Significant static correlation. Ozone has important diradical character; the two resonance structures correspond to nearly degenerate determinants. (c) Cr\\(_2\\): Extreme static correlation. The Cr-Cr bond involves near-degenerate 3d orbitals, and the ground state is a superposition of many configurations. A single determinant is qualitatively wrong. (d) CH\\(_4\\): Primarily dynamic. Methane is a well-behaved closed-shell molecule with a large HOMO-LUMO gap. HF gives a qualitatively correct description.'
                }
            ]
        }
    ]
});
