// === Chapter 9: Perturbation Theory & MP2 ===
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch09',
    number: 9,
    title: 'Perturbation Theory & MP2',
    subtitle: 'Systematic corrections to Hartree-Fock via M\u00f8ller-Plesset theory',
    sections: [
        // ========== SECTION 1: Rayleigh-Schrödinger Perturbation Theory ==========
        {
            id: 'ch09-sec01',
            title: 'Rayleigh-Schr\u00f6dinger Perturbation Theory',
            content: `
<h2>9.1 Rayleigh-Schr&ouml;dinger Perturbation Theory</h2>

<div class="env-block intuition">
<div class="env-title">Intuition</div>
<div class="env-body">
The CI approach (Chapter 8) is variational: expand the wavefunction in a basis of determinants and minimize the energy. Perturbation theory takes a complementary approach. Start from a problem you can solve exactly (the "zeroth-order" problem), treat the difference as a small perturbation, and compute corrections order by order. For quantum chemistry, the zeroth-order problem is the Hartree-Fock solution, and the perturbation is the difference between the true electron-electron repulsion and the HF mean-field potential.
</div>
</div>

<h3>The Perturbation Expansion</h3>

<p>Consider a Hamiltonian that depends on a parameter \\(\\lambda\\):</p>
\\[
\\hat{H}(\\lambda) = \\hat{H}^{(0)} + \\lambda \\hat{V}
\\]
<p>where \\(\\hat{H}^{(0)}\\) is the zeroth-order Hamiltonian with known eigenstates \\(\\{|\\Phi_n^{(0)}\\rangle\\}\\) and eigenvalues \\(\\{E_n^{(0)}\\}\\), and \\(\\hat{V}\\) is the perturbation. We seek the exact eigenstates and eigenvalues as power series in \\(\\lambda\\):</p>

<div class="env-block definition">
<div class="env-title">Definition 9.1.1 (RSPT Expansion)</div>
<div class="env-body">
The Rayleigh-Schr&ouml;dinger perturbation theory (RSPT) expands the energy and wavefunction of state \\(n\\) as:
\\[
E_n = E_n^{(0)} + \\lambda E_n^{(1)} + \\lambda^2 E_n^{(2)} + \\lambda^3 E_n^{(3)} + \\cdots
\\]
\\[
|\\Psi_n\\rangle = |\\Phi_n^{(0)}\\rangle + \\lambda |\\Psi_n^{(1)}\\rangle + \\lambda^2 |\\Psi_n^{(2)}\\rangle + \\cdots
\\]
with the intermediate normalization convention \\(\\langle \\Phi_n^{(0)} | \\Psi_n\\rangle = 1\\), which implies \\(\\langle \\Phi_n^{(0)} | \\Psi_n^{(k)}\\rangle = 0\\) for all \\(k \\geq 1\\).
</div>
</div>

<h3>Deriving the Order-by-Order Corrections</h3>

<p>Substituting the expansions into \\(\\hat{H}|\\Psi_n\\rangle = E_n|\\Psi_n\\rangle\\) and collecting terms at each power of \\(\\lambda\\):</p>

<div class="env-block theorem">
<div class="env-title">Theorem 9.1.2 (RSPT Energy Corrections)</div>
<div class="env-body">
<ul>
<li><strong>Zeroth order</strong> (\\(\\lambda^0\\)): \\(\\hat{H}^{(0)}|\\Phi_n^{(0)}\\rangle = E_n^{(0)}|\\Phi_n^{(0)}\\rangle\\) (the unperturbed problem).</li>
<li><strong>First order</strong> (\\(\\lambda^1\\)): \\(E_n^{(1)} = \\langle \\Phi_n^{(0)} | \\hat{V} | \\Phi_n^{(0)} \\rangle\\).</li>
<li><strong>Second order</strong> (\\(\\lambda^2\\)):
\\[
E_n^{(2)} = \\sum_{k \\neq n} \\frac{|\\langle \\Phi_k^{(0)} | \\hat{V} | \\Phi_n^{(0)} \\rangle|^2}{E_n^{(0)} - E_k^{(0)}}
\\]
</li>
<li><strong>First-order wavefunction</strong>:
\\[
|\\Psi_n^{(1)}\\rangle = \\sum_{k \\neq n} \\frac{\\langle \\Phi_k^{(0)} | \\hat{V} | \\Phi_n^{(0)} \\rangle}{E_n^{(0)} - E_k^{(0)}} |\\Phi_k^{(0)}\\rangle
\\]
</li>
</ul>
</div>
</div>

<div class="env-block proof">
<div class="env-title">Proof (Second-Order Energy)</div>
<div class="env-body">
From the \\(\\lambda^2\\) equation: \\((\\hat{H}^{(0)} - E_n^{(0)})|\\Psi_n^{(2)}\\rangle = (E_n^{(2)} - \\hat{V})|\\Psi_n^{(1)}\\rangle + E_n^{(1)}|\\Psi_n^{(1)}\\rangle\\). Projecting onto \\(\\langle \\Phi_n^{(0)}|\\):
\\[
E_n^{(2)} = \\langle \\Phi_n^{(0)} | \\hat{V} | \\Psi_n^{(1)} \\rangle
\\]
Substituting \\(|\\Psi_n^{(1)}\\rangle\\):
\\[
E_n^{(2)} = \\sum_{k \\neq n} \\frac{\\langle \\Phi_n^{(0)} | \\hat{V} | \\Phi_k^{(0)} \\rangle \\langle \\Phi_k^{(0)} | \\hat{V} | \\Phi_n^{(0)} \\rangle}{E_n^{(0)} - E_k^{(0)}} = \\sum_{k \\neq n} \\frac{|V_{kn}|^2}{E_n^{(0)} - E_k^{(0)}}
\\]
<div class="qed">∎</div>
</div>
</div>

<div class="env-block corollary">
<div class="env-title">Corollary 9.1.3</div>
<div class="env-body">
The second-order energy correction for the ground state is always negative: \\(E_0^{(2)} \\leq 0\\), since each term in the sum has \\(E_0^{(0)} - E_k^{(0)} < 0\\) (all excited states have higher zeroth-order energy) and \\(|V_{k0}|^2 \\geq 0\\). Equality holds only if \\(\\hat{V}|\\Phi_0^{(0)}\\rangle\\) is an eigenstate of \\(\\hat{H}^{(0)}\\) with eigenvalue \\(E_0^{(0)}\\).
</div>
</div>

<div class="env-block remark">
<div class="env-title">Remark</div>
<div class="env-body">
The second-order formula has a crucial feature: states that are closer in energy (smaller denominator \\(|E_n^{(0)} - E_k^{(0)}|\\)) contribute more to the correction. This is why near-degeneracies cause problems for perturbation theory and why degenerate perturbation theory requires special treatment.
</div>
</div>

<h3>The 2n+1 Rule</h3>

<div class="env-block theorem">
<div class="env-title">Theorem 9.1.4 (Wigner's 2n+1 Rule)</div>
<div class="env-body">
The \\(k\\)-th order wavefunction determines energy corrections through order \\(2k+1\\):
<ul>
<li>\\(|\\Psi^{(0)}\\rangle\\) gives \\(E^{(0)}\\) and \\(E^{(1)}\\)</li>
<li>\\(|\\Psi^{(1)}\\rangle\\) gives \\(E^{(2)}\\) and \\(E^{(3)}\\)</li>
<li>\\(|\\Psi^{(2)}\\rangle\\) gives \\(E^{(4)}\\) and \\(E^{(5)}\\)</li>
</ul>
This means MP3 is "free" once MP2 is computed (same first-order wavefunction is needed).
</div>
</div>
`,
            visualizations: [],
            exercises: [
                {
                    question: 'Show that \\(E_n^{(1)} = \\langle \\Phi_n^{(0)} | \\hat{V} | \\Phi_n^{(0)} \\rangle\\) by projecting the first-order equation onto \\(\\langle \\Phi_n^{(0)}|\\).',
                    hint: 'The first-order equation is \\((\\hat{H}^{(0)} - E_n^{(0)})|\\Psi_n^{(1)}\\rangle + (\\hat{V} - E_n^{(1)})|\\Phi_n^{(0)}\\rangle = 0\\).',
                    solution: 'Projecting onto \\(\\langle \\Phi_n^{(0)}|\\): \\(\\langle \\Phi_n^{(0)}|(\\hat{H}^{(0)} - E_n^{(0)})|\\Psi_n^{(1)}\\rangle + \\langle \\Phi_n^{(0)}|\\hat{V}|\\Phi_n^{(0)}\\rangle - E_n^{(1)} = 0\\). The first term vanishes because \\(\\langle \\Phi_n^{(0)}|\\hat{H}^{(0)} = E_n^{(0)}\\langle \\Phi_n^{(0)}|\\) (Hermiticity), so \\(\\langle \\Phi_n^{(0)}|(\\hat{H}^{(0)} - E_n^{(0)}) = 0\\). This gives \\(E_n^{(1)} = \\langle \\Phi_n^{(0)} | \\hat{V} | \\Phi_n^{(0)} \\rangle\\).'
                },
                {
                    question: 'For a two-level system with \\(E_1^{(0)} = 0\\), \\(E_2^{(0)} = \\Delta\\), and \\(V_{12} = v\\), compute the exact energies and compare with perturbation theory through second order.',
                    hint: 'The exact eigenvalues of a 2\\(\\times\\)2 matrix \\(\\begin{pmatrix} 0 & v \\\\ v & \\Delta \\end{pmatrix}\\) are \\(E_\\pm = \\frac{\\Delta}{2} \\pm \\frac{1}{2}\\sqrt{\\Delta^2 + 4v^2}\\).',
                    solution: 'Exact: \\(E_- = \\frac{\\Delta}{2} - \\frac{1}{2}\\sqrt{\\Delta^2 + 4v^2}\\). Taylor expanding for \\(v \\ll \\Delta\\): \\(E_- \\approx -\\frac{v^2}{\\Delta} - \\frac{v^4}{\\Delta^3} - \\cdots\\). RSPT: \\(E_1^{(0)} = 0\\), \\(E_1^{(1)} = 0\\) (assuming \\(V_{11} = V_{22} = 0\\)), \\(E_1^{(2)} = \\frac{|v|^2}{0 - \\Delta} = -\\frac{v^2}{\\Delta}\\). The second-order result matches the leading correction exactly. The error is \\(O(v^4/\\Delta^3)\\), confirming that PT is accurate when \\(|v/\\Delta| \\ll 1\\).'
                },
                {
                    question: 'Why does Rayleigh-Schr\\"odinger perturbation theory break down when two zeroth-order states are degenerate?',
                    hint: 'Look at the denominator in the second-order energy expression.',
                    solution: 'If \\(E_n^{(0)} = E_k^{(0)}\\) for some \\(k \\neq n\\), the denominator \\(E_n^{(0)} - E_k^{(0)} = 0\\) in the perturbation sum, causing a divergence. Physically, degenerate states mix at zeroth order (not perturbatively), and one must first diagonalize \\(\\hat{V}\\) within the degenerate subspace before applying perturbation theory to the coupling with non-degenerate states. This is degenerate perturbation theory.'
                },
                {
                    question: 'Prove Wigner\'s 2n+1 rule for \\(n = 0\\): show that the zeroth-order wavefunction determines both \\(E^{(0)}\\) and \\(E^{(1)}\\).',
                    hint: 'Write out the expressions for \\(E^{(0)}\\) and \\(E^{(1)}\\) and show they require only \\(|\\Psi^{(0)}\\rangle\\).',
                    solution: '\\(E^{(0)} = \\langle \\Psi^{(0)} | \\hat{H}^{(0)} | \\Psi^{(0)} \\rangle\\) requires only \\(|\\Psi^{(0)}\\rangle\\). \\(E^{(1)} = \\langle \\Psi^{(0)} | \\hat{V} | \\Psi^{(0)} \\rangle\\) also requires only \\(|\\Psi^{(0)}\\rangle\\). So the zeroth-order wavefunction is sufficient for both \\(E^{(0)}\\) and \\(E^{(1)}\\), confirming the 2(0)+1 = 1 rule (energies through first order from zeroth-order wavefunction). By contrast, \\(E^{(2)} = \\langle \\Psi^{(0)} | \\hat{V} | \\Psi^{(1)} \\rangle\\) requires the first-order wavefunction.'
                },
                {
                    question: 'In RSPT, the second-order energy is not variational (it can overshoot the exact energy). Give a physical argument for why this is the case.',
                    hint: 'Think about what "variational" means and whether the perturbation series has an upper-bound guarantee.',
                    solution: 'A variational method minimizes the energy functional \\(\\langle \\Psi | \\hat{H} | \\Psi \\rangle / \\langle \\Psi | \\Psi \\rangle\\), which by the variational principle is always \\(\\geq E_{\\text{exact}}\\). Perturbation theory instead expands the energy as a Taylor series in \\(\\lambda\\) and truncates. A truncated Taylor series has no guarantee of being an upper (or lower) bound; it can oscillate around the exact answer. In particular, the sum \\(E^{(0)} + E^{(1)} + E^{(2)}\\) can be below the exact energy, since it includes the leading correlation correction but not the infinite series of higher-order terms that would pull it back.'
                }
            ]
        },

        // ========== SECTION 2: Møller-Plesset Partitioning ==========
        {
            id: 'ch09-sec02',
            title: 'M\u00f8ller-Plesset Partitioning',
            content: `
<h2>9.2 M&oslash;ller-Plesset Partitioning</h2>

<p>The general RSPT framework requires a choice of zeroth-order Hamiltonian \\(\\hat{H}^{(0)}\\). M&oslash;ller and Plesset (1934) chose \\(\\hat{H}^{(0)}\\) to be the sum of Fock operators, leading to a particularly elegant perturbation theory for electron correlation.</p>

<h3>The M&oslash;ller-Plesset Partitioning</h3>

<div class="env-block definition">
<div class="env-title">Definition 9.2.1 (M&oslash;ller-Plesset Partitioning)</div>
<div class="env-body">
Define the zeroth-order Hamiltonian as the sum of one-electron Fock operators:
\\[
\\hat{H}^{(0)} = \\hat{F} = \\sum_{i=1}^{N} \\hat{f}(i)
\\]
where \\(\\hat{f}(i) = \\hat{h}(i) + \\hat{v}_{\\text{HF}}(i)\\) is the Fock operator for electron \\(i\\), with \\(\\hat{v}_{\\text{HF}}\\) the Hartree-Fock mean-field potential (Coulomb + Exchange). The perturbation is then:
\\[
\\hat{V} = \\hat{H} - \\hat{H}^{(0)} = \\sum_{i<j} \\frac{1}{r_{ij}} - \\sum_{i=1}^{N} \\hat{v}_{\\text{HF}}(i)
\\]
This is the difference between the exact electron-electron repulsion and the HF mean-field approximation; it is the "fluctuation potential."
</div>
</div>

<h3>Zeroth-Order Energies and Wavefunctions</h3>

<p>Since \\(\\hat{H}^{(0)} = \\sum_i \\hat{f}(i)\\), its eigenstates are Slater determinants built from the Hartree-Fock orbitals, and the eigenvalues are sums of orbital energies:</p>

<div class="env-block proposition">
<div class="env-title">Proposition 9.2.2</div>
<div class="env-body">
The zeroth-order ground-state energy is the sum of occupied orbital energies:
\\[
E_0^{(0)} = \\sum_{i=1}^{N} \\epsilon_i
\\]
The zeroth-order energy of an excited determinant \\(|\\Phi_{ij\\cdots}^{ab\\cdots}\\rangle\\) is:
\\[
E_{ij\\cdots}^{ab\\cdots,(0)} = E_0^{(0)} + (\\epsilon_a + \\epsilon_b + \\cdots) - (\\epsilon_i + \\epsilon_j + \\cdots)
\\]
</div>
</div>

<div class="env-block remark">
<div class="env-title">Remark</div>
<div class="env-body">
Note that \\(E_0^{(0)} = \\sum_i \\epsilon_i \\neq E_{\\text{HF}}\\). The sum of orbital energies double-counts the electron-electron repulsion. The first-order correction precisely fixes this.
</div>
</div>

<h3>First-Order Energy: Recovering Hartree-Fock</h3>

<div class="env-block theorem">
<div class="env-title">Theorem 9.2.3 (MP0 + MP1 = HF)</div>
<div class="env-body">
The sum of zeroth and first-order M&oslash;ller-Plesset energies equals the Hartree-Fock energy:
\\[
E_0^{(0)} + E_0^{(1)} = E_{\\text{HF}}.
\\]
</div>
</div>

<div class="env-block proof">
<div class="env-title">Proof</div>
<div class="env-body">
The first-order energy is:
\\[
E_0^{(1)} = \\langle \\Phi_0 | \\hat{V} | \\Phi_0 \\rangle = \\langle \\Phi_0 | \\hat{H} - \\hat{H}^{(0)} | \\Phi_0 \\rangle = \\langle \\Phi_0 | \\hat{H} | \\Phi_0 \\rangle - \\langle \\Phi_0 | \\hat{H}^{(0)} | \\Phi_0 \\rangle = E_{\\text{HF}} - \\sum_i \\epsilon_i.
\\]
Therefore \\(E_0^{(0)} + E_0^{(1)} = \\sum_i \\epsilon_i + (E_{\\text{HF}} - \\sum_i \\epsilon_i) = E_{\\text{HF}}\\).
<div class="qed">∎</div>
</div>
</div>

<div class="env-block remark">
<div class="env-title">Remark</div>
<div class="env-body">
This result means that the MP perturbation series begins correcting the HF energy at second order. The first non-trivial correction is MP2, which is the leading contribution to the correlation energy.
</div>
</div>

<h3>Why the Fock Operator?</h3>

<p>The choice \\(\\hat{H}^{(0)} = \\hat{F}\\) is motivated by several considerations:</p>
<ul>
<li>The Fock operator is the best one-electron approximation to \\(\\hat{H}\\), so the perturbation \\(\\hat{V}\\) is "small" (the correlation effects).</li>
<li>The eigenstates of \\(\\hat{H}^{(0)}\\) are Slater determinants, which we already have from the HF calculation.</li>
<li>The orbital energies provide natural energy denominators.</li>
<li>Brillouin's theorem holds: \\(\\langle \\Phi_0 | \\hat{V} | \\Phi_i^a \\rangle = \\langle \\Phi_0 | \\hat{H} | \\Phi_i^a \\rangle - \\langle \\Phi_0 | \\hat{F} | \\Phi_i^a \\rangle = 0\\) (since both terms vanish separately for canonical HF orbitals).</li>
</ul>

<div class="env-block definition">
<div class="env-title">Definition 9.2.4 (MPn Energy)</div>
<div class="env-body">
The MPn energy includes all perturbation corrections through order \\(n\\):
\\[
E_{\\text{MP}n} = E_{\\text{HF}} + E_0^{(2)} + E_0^{(3)} + \\cdots + E_0^{(n)}.
\\]
The correlation energy at order \\(n\\) is:
\\[
E_{\\text{corr}}^{\\text{MP}n} = E_0^{(2)} + E_0^{(3)} + \\cdots + E_0^{(n)}.
\\]
</div>
</div>
`,
            visualizations: [],
            exercises: [
                {
                    question: 'Show explicitly that \\(E_0^{(0)} = \\sum_i \\epsilon_i\\) double-counts the electron-electron repulsion by expressing both \\(E_0^{(0)}\\) and \\(E_{\\text{HF}}\\) in terms of one- and two-electron integrals.',
                    hint: 'Recall that \\(\\epsilon_i = h_{ii} + \\sum_j (J_{ij} - K_{ij})\\) and \\(E_{\\text{HF}} = \\sum_i h_{ii} + \\frac{1}{2}\\sum_{ij}(J_{ij} - K_{ij})\\).',
                    solution: '\\(E_0^{(0)} = \\sum_i \\epsilon_i = \\sum_i h_{ii} + \\sum_i \\sum_j (J_{ij} - K_{ij}) = \\sum_i h_{ii} + \\sum_{ij}(J_{ij} - K_{ij})\\). But \\(E_{\\text{HF}} = \\sum_i h_{ii} + \\frac{1}{2}\\sum_{ij}(J_{ij} - K_{ij})\\). Therefore \\(E_0^{(0)} - E_{\\text{HF}} = \\frac{1}{2}\\sum_{ij}(J_{ij} - K_{ij})\\), confirming that \\(E_0^{(0)}\\) counts the electron-electron repulsion twice. The first-order correction \\(E_0^{(1)} = -\\frac{1}{2}\\sum_{ij}(J_{ij} - K_{ij})\\) removes this double counting.'
                },
                {
                    question: 'In the M\\(\\text{\\o}\\)ller-Plesset partitioning, what is the perturbation \\(\\hat{V}\\) physically? Why is it expected to be "small"?',
                    hint: 'Think about what the HF mean-field potential already captures and what it misses.',
                    solution: '\\(\\hat{V} = \\sum_{i<j} r_{ij}^{-1} - \\sum_i \\hat{v}_{\\text{HF}}(i)\\) is the "fluctuation potential": the difference between the instantaneous electron-electron repulsion and the HF mean-field approximation. The HF potential already captures the average repulsion; \\(\\hat{V}\\) represents only the fluctuations around this average (electron correlation). Since HF typically recovers ~99% of the total energy, the perturbation \\(\\hat{V}\\) accounts for only ~1%, making it small. However, "small" in energy does not guarantee fast convergence of the perturbation series.'
                },
                {
                    question: 'Prove that Brillouin\'s theorem is automatically satisfied in the MP framework: show that \\(\\langle \\Phi_0 | \\hat{V} | \\Phi_i^a \\rangle = 0\\).',
                    hint: 'Write \\(\\hat{V} = \\hat{H} - \\hat{F}\\) and evaluate each matrix element separately.',
                    solution: '\\(\\langle \\Phi_0 | \\hat{V} | \\Phi_i^a \\rangle = \\langle \\Phi_0 | \\hat{H} | \\Phi_i^a \\rangle - \\langle \\Phi_0 | \\hat{F} | \\Phi_i^a \\rangle\\). By Brillouin\'s theorem, \\(\\langle \\Phi_0 | \\hat{H} | \\Phi_i^a \\rangle = F_{ai} = 0\\). For the second term: \\(\\langle \\Phi_0 | \\hat{F} | \\Phi_i^a \\rangle = F_{ai} = \\epsilon_a \\delta_{ai} = 0\\) (since \\(a\\) is virtual and \\(i\\) is occupied, \\(a \\neq i\\)). Therefore \\(\\langle \\Phi_0 | \\hat{V} | \\Phi_i^a \\rangle = 0 - 0 = 0\\).'
                },
                {
                    question: 'What is the zeroth-order energy difference between the ground state \\(|\\Phi_0\\rangle\\) and the doubly excited determinant \\(|\\Phi_{ij}^{ab}\\rangle\\) in the MP partitioning?',
                    hint: 'The zeroth-order energies are sums of orbital energies.',
                    solution: '\\(E_{ij}^{ab,(0)} - E_0^{(0)} = (\\epsilon_a + \\epsilon_b) - (\\epsilon_i + \\epsilon_j)\\). Since \\(\\epsilon_a, \\epsilon_b > 0\\) (virtual orbital energies for occupied electrons) and \\(\\epsilon_i, \\epsilon_j < 0\\) (occupied orbital energies are negative), the energy difference \\(\\epsilon_a + \\epsilon_b - \\epsilon_i - \\epsilon_j > 0\\) is always positive, ensuring the perturbation denominators are well-defined (no degeneracies between the ground state and excited determinants, assuming no fractional occupation).'
                }
            ]
        },

        // ========== SECTION 3: MP2 ==========
        {
            id: 'ch09-sec03',
            title: 'MP2: The Second-Order Correction',
            content: `
<h2>9.3 MP2: The Second-Order Correction</h2>

<p>The second-order M&oslash;ller-Plesset correction (MP2) is the simplest and most widely used post-Hartree-Fock method for electron correlation. It provides a significant improvement over HF at modest computational cost.</p>

<h3>Derivation of the MP2 Energy</h3>

<p>From the general RSPT formula (Theorem 9.1.2), the second-order energy is:</p>
\\[
E_0^{(2)} = \\sum_{k \\neq 0} \\frac{|\\langle \\Phi_k | \\hat{V} | \\Phi_0 \\rangle|^2}{E_0^{(0)} - E_k^{(0)}}
\\]

<p>In the MP partitioning, the sum runs over all excited determinants. By Brillouin's theorem, singles do not contribute. By the Slater-Condon rules, the Hamiltonian (and therefore \\(\\hat{V}\\)) connects determinants differing by at most two orbitals. Therefore, only doubles contribute:</p>

<div class="env-block theorem">
<div class="env-title">Theorem 9.3.1 (MP2 Energy)</div>
<div class="env-body">
The MP2 correlation energy is:
\\[
E_{\\text{MP2}} = \\sum_{i<j}^{\\text{occ}} \\sum_{a<b}^{\\text{virt}} \\frac{|\\langle ij \\| ab \\rangle|^2}{\\epsilon_i + \\epsilon_j - \\epsilon_a - \\epsilon_b}
\\]
where \\(\\langle ij \\| ab \\rangle = \\langle ij | ab \\rangle - \\langle ij | ba \\rangle\\) is the antisymmetrized two-electron integral in the molecular orbital basis, and \\(\\epsilon_p\\) are the canonical HF orbital energies.
</div>
</div>

<div class="env-block proof">
<div class="env-title">Proof</div>
<div class="env-body">
The perturbation \\(\\hat{V} = \\hat{H} - \\hat{F}\\) connects \\(|\\Phi_0\\rangle\\) only to doubles \\(|\\Phi_{ij}^{ab}\\rangle\\) (singles give zero by Brillouin's theorem, and triples and higher give zero by the two-body nature of \\(\\hat{V}\\)). The matrix element is:
\\[
\\langle \\Phi_{ij}^{ab} | \\hat{V} | \\Phi_0 \\rangle = \\langle \\Phi_{ij}^{ab} | \\hat{H} | \\Phi_0 \\rangle = \\langle ij \\| ab \\rangle
\\]
(the Fock operator part vanishes by the same Slater-Condon argument). The energy denominator is:
\\[
E_0^{(0)} - E_{ij}^{ab,(0)} = \\epsilon_i + \\epsilon_j - \\epsilon_a - \\epsilon_b
\\]
Substituting into the second-order formula gives the MP2 energy.
<div class="qed">∎</div>
</div>
</div>

<h3>The Spin-Orbital and Spatial-Orbital Forms</h3>

<p>The formula above is in spin-orbital form. For a closed-shell system with \\(N/2\\) doubly occupied spatial orbitals, the spatial-orbital form is:</p>
\\[
E_{\\text{MP2}} = \\sum_{i<j}^{\\text{occ}} \\sum_{a<b}^{\\text{virt}} \\frac{(ia|jb)\\left[2(ia|jb) - (ib|ja)\\right]}{\\epsilon_i + \\epsilon_j - \\epsilon_a - \\epsilon_b}
\\]
<p>where \\((ia|jb)\\) are the chemist's notation two-electron integrals.</p>

<div class="viz-placeholder" data-viz="viz-mp2-energy"></div>

<h3>Physical Interpretation</h3>

<div class="env-block remark">
<div class="env-title">Remark (Pair Correlations)</div>
<div class="env-body">
The MP2 energy can be decomposed into contributions from electron pairs:
\\[
E_{\\text{MP2}} = \\sum_{i<j} e_{ij}, \\qquad e_{ij} = \\sum_{a<b} \\frac{|\\langle ij \\| ab \\rangle|^2}{\\epsilon_i + \\epsilon_j - \\epsilon_a - \\epsilon_b}
\\]
Each \\(e_{ij}\\) represents the second-order correlation energy of the electron pair \\((i,j)\\). This pair-energy decomposition reveals which electron pairs contribute most to correlation (typically valence pairs contribute more than core-core pairs).
</div>
</div>

<h3>Computational Scaling</h3>

<div class="env-block proposition">
<div class="env-title">Proposition 9.3.2 (MP2 Scaling)</div>
<div class="env-body">
The formal computational scaling of MP2 is \\(O(N^5)\\) (or more precisely, \\(O(N_{\\text{occ}}^2 N_{\\text{virt}}^2 N_{\\text{aux}})\\) with auxiliary basis methods), where the bottleneck is the integral transformation from the AO basis to the MO basis:
\\[
(ia|jb) = \\sum_{\\mu\\nu\\lambda\\sigma} C_{\\mu i} C_{\\nu a} (\\mu\\nu|\\lambda\\sigma) C_{\\lambda j} C_{\\sigma b}
\\]
This four-index transformation scales as \\(O(K^5)\\) where \\(K\\) is the basis set size. Once the MO integrals are available, the energy summation is \\(O(N_{\\text{occ}}^2 N_{\\text{virt}}^2)\\).
</div>
</div>

<div class="env-block remark">
<div class="env-title">Remark (MP2 Accuracy)</div>
<div class="env-body">
MP2 typically recovers 80-90% of the correlation energy. For well-behaved single-reference systems, it provides:
<ul>
<li>Bond lengths accurate to ~0.01-0.02 &Aring;</li>
<li>Vibrational frequencies accurate to ~50-100 cm\\(^{-1}\\)</li>
<li>Reaction energies accurate to ~3-5 kcal/mol</li>
</ul>
MP2 is size extensive (unlike CISD) and scales as \\(O(N^5)\\) (vs. \\(O(N^6)\\) for CISD), making it the method of choice for routine treatment of electron correlation.
</div>
</div>

<div class="env-block warning">
<div class="env-title">Warning</div>
<div class="env-body">
MP2 is not variational: the MP2 energy can be (and often is) below the exact energy. This is because the perturbation series is not an upper bound. In practice, MP2 tends to overestimate the magnitude of the correlation energy by 5-10%.
</div>
</div>
`,
            visualizations: [
                {
                    id: 'viz-mp2-energy',
                    title: 'MP2 Energy Correction: Orbital Energy Denominator Contributions',
                    description: 'Visualize how each occupied-virtual pair contributes to the MP2 correlation energy. The size of each cell represents the magnitude of the denominator contribution \\(1/(\\epsilon_i + \\epsilon_j - \\epsilon_a - \\epsilon_b)\\).',
                    setup(body, controls) {
                        const viz = new VizEngine(body, { width: 560, height: 400, scale: 1, originX: 0, originY: 0 });

                        // Model system: 4 occupied, 6 virtual orbitals
                        const occE = [-20.5, -1.35, -0.72, -0.58]; // orbital energies (Eh)
                        const virtE = [0.21, 0.35, 0.68, 1.12, 1.85, 3.20];
                        const occLabels = ['1s', '2s', '2p\u2093', '2p\u2094'];
                        const virtLabels = ['3s', '3p', '4s', '3d', '4p', '5s'];

                        let selectedI = 2, selectedJ = 3; // default pair

                        function draw() {
                            viz.clear();
                            const ctx = viz.ctx;
                            ctx.fillStyle = viz.colors.bg;
                            ctx.fillRect(0, 0, viz.width, viz.height);

                            const px0 = 100, py0 = 50;
                            const cellW = 60, cellH = 40;
                            const nOcc = occE.length;
                            const nVirt = virtE.length;

                            // Title
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('MP2 Pair Energy Contributions for pair (i=' + occLabels[selectedI] + ', j=' + occLabels[selectedJ] + ')', viz.width / 2, 20);

                            // Compute contributions for selected pair
                            const denom = [];
                            let maxAbs = 0;
                            for (let a = 0; a < nVirt; a++) {
                                denom[a] = [];
                                for (let b = 0; b < nVirt; b++) {
                                    const d = occE[selectedI] + occE[selectedJ] - virtE[a] - virtE[b];
                                    const val = 1.0 / d; // proxy for contribution magnitude (integral = 1 for illustration)
                                    denom[a][b] = val;
                                    if (Math.abs(val) > maxAbs) maxAbs = Math.abs(val);
                                }
                            }

                            // Draw heat map
                            for (let a = 0; a < nVirt; a++) {
                                for (let b = 0; b < nVirt; b++) {
                                    const x = px0 + b * cellW;
                                    const y = py0 + a * cellH;
                                    const val = denom[a][b];
                                    const intensity = Math.abs(val) / maxAbs;

                                    // Color: blue for negative denominator contributions
                                    const r = Math.round(20 + 40 * intensity);
                                    const g = Math.round(30 + 100 * intensity);
                                    const bCol = Math.round(60 + 195 * intensity);
                                    ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + bCol + ')';
                                    ctx.fillRect(x + 1, y + 1, cellW - 2, cellH - 2);

                                    // Value
                                    ctx.fillStyle = intensity > 0.5 ? '#fff' : '#aaa';
                                    ctx.font = '10px -apple-system,sans-serif';
                                    ctx.textAlign = 'center';
                                    ctx.textBaseline = 'middle';
                                    ctx.fillText(val.toFixed(2), x + cellW / 2, y + cellH / 2);
                                }
                            }

                            // Virtual orbital labels (columns = b)
                            ctx.fillStyle = viz.colors.teal;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'bottom';
                            for (let b = 0; b < nVirt; b++) {
                                ctx.fillText(virtLabels[b], px0 + b * cellW + cellW / 2, py0 - 3);
                                ctx.fillText(virtE[b].toFixed(2), px0 + b * cellW + cellW / 2, py0 - 15);
                            }
                            ctx.fillText('Virtual orbital b (\u03b5_b)', px0 + nVirt * cellW / 2, py0 - 30);

                            // Virtual orbital labels (rows = a)
                            ctx.textAlign = 'right';
                            ctx.textBaseline = 'middle';
                            for (let a = 0; a < nVirt; a++) {
                                ctx.fillStyle = viz.colors.teal;
                                ctx.fillText(virtLabels[a] + ' ', px0 - 5, py0 + a * cellH + cellH / 2);
                            }
                            ctx.save();
                            ctx.translate(px0 - 55, py0 + nVirt * cellH / 2);
                            ctx.rotate(-Math.PI / 2);
                            ctx.fillStyle = viz.colors.teal;
                            ctx.textAlign = 'center';
                            ctx.fillText('Virtual orbital a (\u03b5_a)', 0, 0);
                            ctx.restore();

                            // Energy level diagram at bottom
                            const ey0 = py0 + nVirt * cellH + 35;
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 11px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Orbital Energy Diagram', viz.width / 2, ey0);

                            const elx0 = 60, elxW = viz.width - 120;
                            const eyH = 50;
                            const allE = [...occE, ...virtE];
                            const eMin = Math.min(...allE) - 0.5;
                            const eMax = Math.max(...allE) + 0.5;
                            const eRange = eMax - eMin;

                            // Draw occupied levels
                            for (let i = 0; i < nOcc; i++) {
                                const x = elx0 + ((occE[i] - eMin) / eRange) * elxW;
                                const isSelected = (i === selectedI || i === selectedJ);
                                const color = isSelected ? viz.colors.orange : viz.colors.blue;
                                ctx.strokeStyle = color;
                                ctx.lineWidth = isSelected ? 3 : 2;
                                ctx.beginPath(); ctx.moveTo(x - 12, ey0 + 20); ctx.lineTo(x + 12, ey0 + 20); ctx.stroke();
                                ctx.fillStyle = color;
                                ctx.font = '9px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText(occLabels[i], x, ey0 + 35);
                            }

                            // Draw virtual levels
                            for (let a = 0; a < nVirt; a++) {
                                const x = elx0 + ((virtE[a] - eMin) / eRange) * elxW;
                                ctx.strokeStyle = viz.colors.teal;
                                ctx.lineWidth = 2;
                                ctx.beginPath(); ctx.moveTo(x - 12, ey0 + 20); ctx.lineTo(x + 12, ey0 + 20); ctx.stroke();
                                ctx.fillStyle = viz.colors.teal;
                                ctx.font = '9px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText(virtLabels[a], x, ey0 + 35);
                            }

                            // Labels
                            ctx.fillStyle = viz.colors.blue;
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('Occupied', elx0, ey0 + 50);
                            ctx.fillStyle = viz.colors.teal;
                            ctx.fillText('Virtual', elx0 + 80, ey0 + 50);

                            // Info box
                            const denomIJ = occE[selectedI] + occE[selectedJ];
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('\u03b5_i + \u03b5_j = ' + denomIJ.toFixed(2) + ' Eh', px0 + nVirt * cellW + 15, py0 + 20);
                            ctx.fillText('Cell value = 1/(\u03b5_i+\u03b5_j-\u03b5_a-\u03b5_b)', px0 + nVirt * cellW + 15, py0 + 40);
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.fillText('Brighter = larger |contribution|', px0 + nVirt * cellW + 15, py0 + 60);
                        }

                        // Pair selector
                        const pairSelect = document.createElement('select');
                        pairSelect.style.cssText = 'padding:4px;border:1px solid #30363d;border-radius:4px;background:#1a1a40;color:#c9d1d9;font-size:0.78rem;margin-right:8px;';
                        for (let i = 0; i < occE.length; i++) {
                            for (let j = i + 1; j < occE.length; j++) {
                                const opt = document.createElement('option');
                                opt.value = i + ',' + j;
                                opt.textContent = 'Pair (' + occLabels[i] + ', ' + occLabels[j] + ')';
                                if (i === selectedI && j === selectedJ) opt.selected = true;
                                pairSelect.appendChild(opt);
                            }
                        }
                        pairSelect.addEventListener('change', () => {
                            const [i, j] = pairSelect.value.split(',').map(Number);
                            selectedI = i; selectedJ = j;
                            draw();
                        });
                        const label = document.createElement('span');
                        label.textContent = 'Occupied pair: ';
                        label.style.cssText = 'color:#c9d1d9;font-size:0.78rem;';
                        controls.appendChild(label);
                        controls.appendChild(pairSelect);

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'For the minimal-basis H\\(_2\\) molecule with \\(\\epsilon_1 = -0.58\\) Eh, \\(\\epsilon_2 = 0.67\\) Eh, and \\(\\langle 11||22\\rangle = 0.18\\) Eh, compute the MP2 correlation energy.',
                    hint: 'There is only one occupied pair and one virtual pair, so the sum has a single term.',
                    solution: 'With one occupied orbital (\\(i=j=1\\), but we need \\(i \\neq j\\) for the spin-orbital formula) and one virtual orbital, the spatial-orbital MP2 formula gives: \\(E_{\\text{MP2}} = \\frac{|\\langle 11|22\\rangle|^2(2 \\cdot \\langle 11|22\\rangle - \\langle 12|21\\rangle)}{2\\epsilon_1 - 2\\epsilon_2}\\). For the spin-orbital doubly excited determinant \\(|\\Phi_{1\\bar{1}}^{2\\bar{2}}\\rangle\\), \\(E_{\\text{MP2}} = \\frac{|\\langle 12||12\\rangle|^2}{2(\\epsilon_1 - \\epsilon_2)} = \\frac{(0.18)^2}{2(-0.58 - 0.67)} = \\frac{0.0324}{-2.50} = -0.01296\\) Eh \\(\\approx -8.1\\) kcal/mol.'
                },
                {
                    question: 'Show that MP2 is size extensive: for two non-interacting systems A and B, \\(E_{\\text{MP2}}(AB) = E_{\\text{MP2}}(A) + E_{\\text{MP2}}(B)\\).',
                    hint: 'The integrals between orbitals on different non-interacting fragments vanish.',
                    solution: 'For non-interacting A and B, the MO integrals \\(\\langle i_A j_B || a_A b_B \\rangle = 0\\) whenever indices span both fragments (no electron-electron interaction between fragments). The MP2 sum therefore separates: terms with all four indices on A give \\(E_{\\text{MP2}}(A)\\), terms with all on B give \\(E_{\\text{MP2}}(B)\\), and cross-terms vanish. Hence \\(E_{\\text{MP2}}(AB) = E_{\\text{MP2}}(A) + E_{\\text{MP2}}(B)\\). This argument holds at every order of MPn, making the entire MP series size extensive.'
                },
                {
                    question: 'Explain why the MP2 energy is always negative (i.e., MP2 always lowers the HF energy for the ground state).',
                    hint: 'Look at the sign of the denominator \\(\\epsilon_i + \\epsilon_j - \\epsilon_a - \\epsilon_b\\) and the numerator.',
                    solution: 'The denominator \\(\\epsilon_i + \\epsilon_j - \\epsilon_a - \\epsilon_b < 0\\) because occupied orbital energies are lower than virtual orbital energies (\\(\\epsilon_i < \\epsilon_a\\) and \\(\\epsilon_j < \\epsilon_b\\)). The numerator \\(|\\langle ij || ab \\rangle|^2 \\geq 0\\). Therefore, each term in the MP2 sum is \\(\\leq 0\\) (negative divided by negative is positive, but the overall formula has the fraction negative/positive ... let me be precise: the denominator is negative, numerator is positive, so each term is negative). Thus \\(E_{\\text{MP2}} \\leq 0\\), and MP2 always stabilizes relative to HF.'
                },
                {
                    question: 'Why does the MP2 correlation energy depend on the orbital energy gap \\(\\epsilon_a - \\epsilon_i\\)? What happens when this gap is small?',
                    hint: 'Small denominators mean large perturbation corrections. Connect this to the convergence of the perturbation series.',
                    solution: 'The MP2 denominator \\(\\epsilon_i + \\epsilon_j - \\epsilon_a - \\epsilon_b\\) involves the energy gap between occupied and virtual orbitals. When this gap is small (e.g., in metallic systems, molecules near bond breaking, or small-gap semiconductors), the denominators are small, causing large individual MP2 contributions. This signals that (1) the HF wavefunction is a poor starting point, (2) the perturbation is not small relative to the excitation energies, and (3) the MP series may converge slowly or diverge. This is why MP2 fails for strongly correlated systems.'
                },
                {
                    question: 'Compute the MP2 pair energy \\(e_{ij}\\) for the HOMO-LUMO pair of a system where \\(\\epsilon_{\\text{HOMO}} = -0.4\\) Eh, \\(\\epsilon_{\\text{LUMO}} = 0.2\\) Eh, and the only significant integral is \\(\\langle ij||ab\\rangle = 0.05\\) Eh (with \\(i=j=\\text{HOMO}\\), \\(a=b=\\text{LUMO}\\)).',
                    hint: 'Substitute directly into the MP2 pair energy formula.',
                    solution: '\\(e_{ij} = \\frac{|\\langle ij||ab\\rangle|^2}{\\epsilon_i + \\epsilon_j - \\epsilon_a - \\epsilon_b} = \\frac{(0.05)^2}{(-0.4) + (-0.4) - 0.2 - 0.2} = \\frac{0.0025}{-1.2} = -0.00208\\) Eh \\(= -1.31\\) kcal/mol. This illustrates that a single pair typically contributes a few kcal/mol of correlation energy.'
                }
            ]
        },

        // ========== SECTION 4: Higher Orders and Convergence ==========
        {
            id: 'ch09-sec04',
            title: 'Higher Orders: MP3, MP4, Convergence Issues',
            content: `
<h2>9.4 Higher Orders: MP3, MP4, Convergence Issues</h2>

<p>While MP2 is the workhorse, one can in principle compute corrections at any order. The MP3 and MP4 formulas are known, but higher orders reveal a troubling feature: the MP series does not always converge.</p>

<h3>MP3: Third-Order Correction</h3>

<div class="env-block definition">
<div class="env-title">Definition 9.4.1 (MP3 Energy)</div>
<div class="env-body">
The third-order energy correction involves the coupling of doubles with doubles through the fluctuation potential:
\\[
E^{(3)} = \\sum_{ijab} \\sum_{klcd} \\frac{\\langle ij \\| ab \\rangle \\langle ab \\| cd \\rangle \\langle cd \\| ij \\rangle}{(\\epsilon_i + \\epsilon_j - \\epsilon_a - \\epsilon_b)(\\epsilon_k + \\epsilon_l - \\epsilon_c - \\epsilon_d)}
\\]
plus additional terms from the coupling of the first-order wavefunction with itself through \\(\\hat{V}\\).
</div>
</div>

<div class="env-block remark">
<div class="env-title">Remark</div>
<div class="env-body">
By Wigner's 2n+1 rule, \\(E^{(3)}\\) can be computed from the first-order wavefunction alone (the same doubles amplitudes \\(t_{ij}^{ab} = \\langle ij\\|ab\\rangle / (\\epsilon_i + \\epsilon_j - \\epsilon_a - \\epsilon_b)\\) needed for MP2). Therefore, MP3 has the same \\(O(N^6)\\) formal scaling as CISD, which limits its practical advantage.
</div>
</div>

<h3>MP4: Fourth-Order Correction</h3>

<p>At fourth order, singles, doubles, triples, and quadruples all contribute. The MP4 energy is conventionally decomposed as:</p>
\\[
E_{\\text{MP4}} = E_{\\text{MP4(SDQ)}} + E_{\\text{MP4(T)}}
\\]

<div class="env-block remark">
<div class="env-title">Remark (MP4 Terms)</div>
<div class="env-body">
<ul>
<li><strong>MP4(S)</strong>: Singles contribute for the first time (coupling through doubles and the fluctuation potential). Scaling: \\(O(N^5)\\).</li>
<li><strong>MP4(D)</strong>: Doubles coupling with doubles. Scaling: \\(O(N^6)\\).</li>
<li><strong>MP4(T)</strong>: Triples contribute for the first time. This is the most expensive part, scaling as \\(O(N^7)\\), and is often the dominant correction at fourth order.</li>
<li><strong>MP4(Q)</strong>: Quadruples contribute for the first time. Scaling: \\(O(N^6)\\) (disconnected part from \\(T_2^2\\)).</li>
</ul>
</div>
</div>

<h3>Convergence of the MP Series</h3>

<div class="env-block warning">
<div class="env-title">Warning (Divergent MP Series)</div>
<div class="env-body">
The MP perturbation series does <strong>not</strong> always converge. Christiansen, Olsen, J&oslash;rgensen and colleagues (1996) showed that for many molecular systems, the MP series exhibits one of three behaviors:
<ol>
<li><strong>Monotonic convergence</strong>: Each order brings the energy closer to the FCI value. Common for small-gap, well-behaved systems.</li>
<li><strong>Oscillatory convergence</strong>: The energy oscillates around the FCI value with decreasing amplitude. Common for many molecular systems.</li>
<li><strong>Divergence</strong>: The corrections grow at each order. This occurs for systems with small HOMO-LUMO gaps, near degeneracies, or strong correlation.</li>
</ol>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-mpn-convergence"></div>

<div class="env-block example">
<div class="env-title">Example 9.4.2 (Oscillatory Convergence)</div>
<div class="env-body">
For the Ne atom with a large basis set, the MP series shows oscillatory convergence:
<table class="data-table" style="margin:12px auto;border-collapse:collapse;text-align:center;">
<tr style="border-bottom:2px solid #30363d;"><th style="padding:4px 16px;">Order</th><th style="padding:4px 16px;">\\(E_{\\text{corr}}^{(n)}\\) (mEh)</th><th style="padding:4px 16px;">Cumulative \\(E_{\\text{corr}}\\) (mEh)</th></tr>
<tr><td>MP2</td><td>-325.0</td><td>-325.0</td></tr>
<tr><td>MP3</td><td>+42.3</td><td>-282.7</td></tr>
<tr><td>MP4</td><td>-35.1</td><td>-317.8</td></tr>
<tr><td>MP5</td><td>+12.8</td><td>-305.0</td></tr>
<tr><td>FCI</td><td>&mdash;</td><td>-310.5</td></tr>
</table>
The series oscillates around the FCI value, with decreasing amplitude.
</div>
</div>

<div class="env-block theorem">
<div class="env-title">Theorem 9.4.3 (Convergence Criterion)</div>
<div class="env-body">
The MP series converges if and only if the spectral radius of the operator \\(\\hat{R}_0 \\hat{V}\\) is less than 1, where \\(\\hat{R}_0 = \\hat{Q}/(E_0^{(0)} - \\hat{H}^{(0)})\\) is the reduced resolvent (\\(\\hat{Q} = 1 - |\\Phi_0\\rangle\\langle\\Phi_0|\\)). This condition is related to the ratio of the perturbation strength to the energy gap. Systems with small HOMO-LUMO gaps or strong multi-reference character tend to have \\(\\rho(\\hat{R}_0\\hat{V}) > 1\\), causing divergence.
</div>
</div>

<h3>Practical Implications</h3>

<div class="env-block remark">
<div class="env-title">Remark</div>
<div class="env-body">
Given the convergence issues, the practical recommendation is:
<ul>
<li><strong>MP2</strong>: Almost always useful. The leading correction is well-behaved for most single-reference systems.</li>
<li><strong>MP3</strong>: Rarely used in practice, as it is expensive (\\(O(N^6)\\)) but offers little improvement over MP2 on average.</li>
<li><strong>MP4</strong>: The triples contribution MP4(T) is important, but CCSD(T) (Chapter 10) incorporates this more robustly.</li>
<li><strong>MP5+</strong>: Generally not used due to convergence concerns and cost.</li>
</ul>
The MP series is best viewed as a hierarchy where MP2 is the workhorse, and higher orders serve primarily as diagnostic tools for the reliability of the perturbation expansion.
</div>
</div>
`,
            visualizations: [
                {
                    id: 'viz-mpn-convergence',
                    title: 'MPn Convergence Behavior',
                    description: 'Observe different convergence behaviors of the M\u00f8ller-Plesset series: monotonic, oscillatory, or divergent. Toggle between examples to see how the series behaves for different systems.',
                    setup(body, controls) {
                        const viz = new VizEngine(body, { width: 560, height: 380, scale: 1, originX: 0, originY: 0 });

                        // Model data for three convergence patterns
                        const patterns = {
                            monotonic: {
                                name: 'Monotonic (H\u2082O)',
                                fci: -0.300,
                                corrections: [0, -0.280, -0.008, -0.015, -0.002, -0.001, 0.0005, -0.0003],
                            },
                            oscillatory: {
                                name: 'Oscillatory (Ne)',
                                fci: -0.310,
                                corrections: [0, -0.325, 0.042, -0.035, 0.013, -0.008, 0.004, -0.002],
                            },
                            divergent: {
                                name: 'Divergent (F\u2082 stretched)',
                                fci: -0.450,
                                corrections: [0, -0.380, 0.050, -0.120, 0.200, -0.350, 0.600, -1.05],
                            }
                        };

                        let currentPattern = 'oscillatory';

                        const btnMono = VizEngine.createButton(controls, 'Monotonic', () => { currentPattern = 'monotonic'; draw(); });
                        const btnOsc = VizEngine.createButton(controls, 'Oscillatory', () => { currentPattern = 'oscillatory'; draw(); });
                        const btnDiv = VizEngine.createButton(controls, 'Divergent', () => { currentPattern = 'divergent'; draw(); });

                        function draw() {
                            viz.clear();
                            const ctx = viz.ctx;
                            ctx.fillStyle = viz.colors.bg;
                            ctx.fillRect(0, 0, viz.width, viz.height);

                            const pat = patterns[currentPattern];
                            const corrs = pat.corrections;
                            const fci = pat.fci;

                            // Compute cumulative energies
                            const cumE = [0]; // HF = 0 correlation
                            let sum = 0;
                            for (let i = 1; i < corrs.length; i++) {
                                sum += corrs[i];
                                cumE.push(sum);
                            }

                            const px0 = 70, py0 = 40, plotW = 430, plotH = 280;
                            const nOrders = cumE.length;

                            // Determine y range
                            const allVals = [...cumE, fci];
                            let yMin = Math.min(...allVals) - 0.05;
                            let yMax = Math.max(...allVals, 0) + 0.05;
                            if (currentPattern === 'divergent') {
                                yMin = Math.min(yMin, -1.2);
                                yMax = Math.max(yMax, 0.1);
                            }
                            const yRange = yMax - yMin;

                            // Axes
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1.5;
                            ctx.beginPath(); ctx.moveTo(px0, py0); ctx.lineTo(px0, py0 + plotH); ctx.lineTo(px0 + plotW, py0 + plotH); ctx.stroke();

                            // Grid
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 0.5;
                            const yStep = yRange > 1 ? 0.2 : 0.05;
                            for (let y = Math.ceil(yMin / yStep) * yStep; y <= yMax; y += yStep) {
                                const sy = py0 + plotH - ((y - yMin) / yRange) * plotH;
                                ctx.beginPath(); ctx.moveTo(px0, sy); ctx.lineTo(px0 + plotW, sy); ctx.stroke();
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '10px -apple-system,sans-serif';
                                ctx.textAlign = 'right';
                                ctx.fillText(y.toFixed(2), px0 - 5, sy + 3);
                            }

                            // FCI reference line
                            const fciy = py0 + plotH - ((fci - yMin) / yRange) * plotH;
                            ctx.strokeStyle = viz.colors.green;
                            ctx.lineWidth = 1.5;
                            ctx.setLineDash([6, 4]);
                            ctx.beginPath(); ctx.moveTo(px0, fciy); ctx.lineTo(px0 + plotW, fciy); ctx.stroke();
                            ctx.setLineDash([]);
                            ctx.fillStyle = viz.colors.green;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('FCI = ' + fci.toFixed(3) + ' Eh', px0 + plotW + 5, fciy);

                            // Zero line (HF)
                            const hfy = py0 + plotH - ((0 - yMin) / yRange) * plotH;
                            ctx.strokeStyle = viz.colors.blue + '66';
                            ctx.lineWidth = 1;
                            ctx.setLineDash([4, 4]);
                            ctx.beginPath(); ctx.moveTo(px0, hfy); ctx.lineTo(px0 + plotW, hfy); ctx.stroke();
                            ctx.setLineDash([]);
                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillText('HF (E_corr=0)', px0 + plotW + 5, hfy);

                            // Plot cumulative energy
                            const orderLabels = ['HF', 'MP2', 'MP3', 'MP4', 'MP5', 'MP6', 'MP7', 'MP8'];
                            const barW = plotW / (nOrders + 0.5);

                            // Line connecting points
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            for (let i = 0; i < nOrders; i++) {
                                const x = px0 + (i + 0.5) * barW;
                                const y = py0 + plotH - ((cumE[i] - yMin) / yRange) * plotH;
                                if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
                            }
                            ctx.stroke();

                            // Points and labels
                            for (let i = 0; i < nOrders; i++) {
                                const x = px0 + (i + 0.5) * barW;
                                const y = py0 + plotH - ((cumE[i] - yMin) / yRange) * plotH;

                                ctx.fillStyle = viz.colors.orange;
                                ctx.beginPath(); ctx.arc(x, y, 5, 0, Math.PI * 2); ctx.fill();
                                ctx.strokeStyle = viz.colors.bg;
                                ctx.lineWidth = 1;
                                ctx.stroke();

                                // Label
                                ctx.fillStyle = viz.colors.white;
                                ctx.font = '10px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText(orderLabels[i], x, py0 + plotH + 16);

                                // Value
                                ctx.fillStyle = viz.colors.orange;
                                ctx.font = '9px -apple-system,sans-serif';
                                const offset = (i % 2 === 0) ? -12 : 12;
                                ctx.fillText(cumE[i].toFixed(3), x, y + offset);
                            }

                            // Correction bars (showing individual contributions)
                            for (let i = 1; i < nOrders; i++) {
                                const x = px0 + (i + 0.5) * barW;
                                const y1 = py0 + plotH - ((cumE[i - 1] - yMin) / yRange) * plotH;
                                const y2 = py0 + plotH - ((cumE[i] - yMin) / yRange) * plotH;
                                ctx.strokeStyle = corrs[i] < 0 ? viz.colors.blue + '66' : viz.colors.red + '66';
                                ctx.lineWidth = 8;
                                ctx.beginPath(); ctx.moveTo(x + 20, y1); ctx.lineTo(x + 20, y2); ctx.stroke();
                            }

                            // Title
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('MPn Convergence: ' + pat.name, px0 + plotW / 2, 20);

                            // Axis labels
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Perturbation order', px0 + plotW / 2, py0 + plotH + 32);
                            ctx.save();
                            ctx.translate(15, py0 + plotH / 2);
                            ctx.rotate(-Math.PI / 2);
                            ctx.fillText('Correlation energy (Eh)', 0, 0);
                            ctx.restore();
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Explain why MP3 is "free" once the MP2 calculation is done, using Wigner\'s 2n+1 rule.',
                    hint: 'The 2n+1 rule states that the \\(n\\)-th order wavefunction determines the energy through order \\(2n+1\\).',
                    solution: 'By Wigner\'s 2n+1 rule, the first-order wavefunction \\(|\\Psi^{(1)}\\rangle\\) determines energy corrections through order \\(2(1)+1 = 3\\). The MP2 calculation already requires \\(|\\Psi^{(1)}\\rangle\\) (the doubles amplitudes \\(t_{ij}^{ab}\\)). Therefore, \\(E^{(3)}\\) can be computed from these same amplitudes without needing the second-order wavefunction. The additional cost is the contraction \\(\\sum_{klcd} t_{ij}^{ab} \\langle ab||cd \\rangle t_{kl}^{cd}\\), which requires the transformed integrals \\(\\langle ab||cd\\rangle\\) (already available) and has \\(O(N^6)\\) scaling. So MP3 requires no new integrals, just additional contractions.'
                },
                {
                    question: 'At what order of MP theory do triples first contribute? Why are they important?',
                    hint: 'By Brillouin\'s theorem and Slater-Condon rules, which excitation levels couple to doubles through \\(\\hat{V}\\)?',
                    solution: 'Triples first contribute at MP4. At second order (MP2), only doubles contribute (by Brillouin\'s theorem and the two-body nature of \\(\\hat{V}\\)). At third order, the first-order doubles amplitudes couple back through \\(\\hat{V}\\) to give only doubles contributions. At fourth order, the second-order wavefunction includes singles, doubles, triples, and quadruples (from coupling of first-order doubles with \\(\\hat{V}\\)). Triples are important because they describe three-body correlation effects, are crucial for accurate reaction energetics (contributing 5-15% of the correlation energy), and are the basis for the "(T)" correction in CCSD(T).'
                },
                {
                    question: 'For a system where the MP series diverges, would you expect CCSD(T) to also fail? Explain.',
                    hint: 'Think about the difference between a perturbative series and an exponential (CC) ansatz.',
                    solution: 'Not necessarily. The MP series diverges when the perturbation is "large" relative to the energy gap (\\(\\rho(\\hat{R}_0\\hat{V}) > 1\\)), but CCSD(T) uses a non-perturbative exponential ansatz for the dominant singles and doubles contributions, with only the triples treated perturbatively. The exponential ansatz \\(e^{\\hat{T}}\\) resums certain classes of diagrams to infinite order, which can converge even when the MP series diverges. However, if the "(T)" triples correction itself is large and poorly converged, CCSD(T) will also struggle. As a rule: if MP2 gives reasonable results (say, \\(|E^{(2)}|\\) is not too large relative to the HOMO-LUMO gap), CCSD(T) is likely reliable.'
                },
                {
                    question: 'The MP2 correlation energy can be decomposed into same-spin (SS) and opposite-spin (OS) components. Show that the OS contribution is typically larger and explain why.',
                    hint: 'Same-spin electron pairs are already partly correlated by the exchange (Fermi) hole. What correlation is missing?',
                    solution: 'The MP2 energy decomposes as \\(E_{\\text{MP2}} = E_{\\text{MP2}}^{\\text{OS}} + E_{\\text{MP2}}^{\\text{SS}}\\), where OS involves \\(\\alpha\\beta\\) pairs and SS involves \\(\\alpha\\alpha\\) and \\(\\beta\\beta\\) pairs. The OS contribution is typically 3-4 times larger because same-spin electrons are already partially correlated by the Pauli exclusion principle (antisymmetry of the wavefunction creates a Fermi hole that keeps same-spin electrons apart). The remaining correlation for SS pairs is smaller. Opposite-spin electrons have no Fermi hole and must be correlated entirely through Coulomb interactions, giving a larger MP2 correction. This insight motivates the SCS-MP2 method (Section 9.5).'
                }
            ]
        },

        // ========== SECTION 5: SCS-MP2 and RI-MP2 ==========
        {
            id: 'ch09-sec05',
            title: 'SCS-MP2 and RI-MP2',
            content: `
<h2>9.5 Spin-Component Scaled MP2 and Resolution of Identity</h2>

<p>Standard MP2 has systematic errors: it overestimates correlation energies and dispersion interactions. Two major refinements address these issues: spin-component scaling (SCS) improves accuracy by reweighting spin components, and the resolution-of-the-identity (RI) approximation dramatically reduces computational cost.</p>

<h3>Spin-Component Scaled MP2 (SCS-MP2)</h3>

<div class="env-block definition">
<div class="env-title">Definition 9.5.1 (SCS-MP2)</div>
<div class="env-body">
Grimme (2003) proposed scaling the opposite-spin (OS) and same-spin (SS) components of the MP2 energy with different empirical parameters:
\\[
E_{\\text{SCS-MP2}} = c_{\\text{OS}} E_{\\text{MP2}}^{\\text{OS}} + c_{\\text{SS}} E_{\\text{MP2}}^{\\text{SS}}
\\]
with \\(c_{\\text{OS}} = 6/5 = 1.20\\) and \\(c_{\\text{SS}} = 1/3 \\approx 0.33\\).
</div>
</div>

<div class="env-block remark">
<div class="env-title">Remark (Physical Motivation)</div>
<div class="env-body">
The scaling factors are physically motivated:
<ul>
<li>Same-spin electrons are already partially correlated by the Fermi hole, so MP2 overcounts their correlation. The reduced weight \\(c_{\\text{SS}} = 1/3\\) compensates.</li>
<li>Opposite-spin correlation, while dominant, is slightly underestimated at MP2 level (MP2 misses screening effects). The increased weight \\(c_{\\text{OS}} = 6/5\\) compensates.</li>
</ul>
The parameters were optimized against a training set of reaction energies, with remarkable transferability to other properties.
</div>
</div>

<p>SCS-MP2 typically outperforms standard MP2 for:</p>
<ul>
<li>Reaction energies and barrier heights (mean error ~2 kcal/mol vs ~4 kcal/mol for MP2)</li>
<li>Non-covalent interaction energies</li>
<li>Conformational energies</li>
</ul>

<div class="env-block example">
<div class="env-title">Example 9.5.2 (SCS-MP2 for a Reaction)</div>
<div class="env-body">
For the reaction CH\\(_4\\) + F\\(^\\bullet\\) \\(\\to\\) CH\\(_3^\\bullet\\) + HF:
<table class="data-table" style="margin:12px auto;border-collapse:collapse;text-align:center;">
<tr style="border-bottom:2px solid #30363d;"><th style="padding:4px 16px;">Method</th><th style="padding:4px 16px;">\\(\\Delta E\\) (kcal/mol)</th><th style="padding:4px 16px;">Error</th></tr>
<tr><td>HF</td><td>-21.3</td><td>+11.9</td></tr>
<tr><td>MP2</td><td>-36.8</td><td>-3.6</td></tr>
<tr><td>SCS-MP2</td><td>-34.0</td><td>-0.8</td></tr>
<tr><td>CCSD(T)</td><td>-33.2</td><td>ref</td></tr>
</table>
</div>
</div>

<h3>Opposite-Spin MP2 (OS-MP2 / RI-SOS-MP2)</h3>

<div class="env-block definition">
<div class="env-title">Definition 9.5.3 (SOS-MP2)</div>
<div class="env-body">
The Scaled Opposite-Spin MP2 (SOS-MP2) by Jung et al. (2004) uses only the opposite-spin component:
\\[
E_{\\text{SOS-MP2}} = c_{\\text{OS}} E_{\\text{MP2}}^{\\text{OS}}, \\qquad c_{\\text{OS}} = 1.3
\\]
Since only OS integrals are needed, and the OS MP2 energy can be formulated without antisymmetrized integrals, this allows a reduction in scaling from \\(O(N^5)\\) to \\(O(N^4)\\) using Laplace transforms.
</div>
</div>

<h3>Resolution of the Identity (RI-MP2)</h3>

<p>The bottleneck of MP2 is the four-index integral transformation. The RI (also called Density Fitting, DF) approximation accelerates this dramatically.</p>

<div class="env-block definition">
<div class="env-title">Definition 9.5.4 (RI Approximation)</div>
<div class="env-body">
The RI approximation expands products of basis functions in an auxiliary basis \\(\\{P\\}\\):
\\[
\\phi_\\mu(\\mathbf{r}) \\phi_\\nu(\\mathbf{r}) \\approx \\sum_P d_{\\mu\\nu}^P \\chi_P(\\mathbf{r})
\\]
where the fitting coefficients \\(d_{\\mu\\nu}^P\\) are determined by minimizing the Coulomb metric error. This factorizes the four-center integrals into three-center quantities:
\\[
(\\mu\\nu|\\lambda\\sigma) \\approx \\sum_{PQ} (\\mu\\nu|P)(P|Q)^{-1}(Q|\\lambda\\sigma)
\\]
The three-center integrals \\((\\mu\\nu|P)\\) are much cheaper to compute and store.
</div>
</div>

<div class="viz-placeholder" data-viz="viz-ri-approximation"></div>

<div class="env-block theorem">
<div class="env-title">Theorem 9.5.5 (RI-MP2 Speedup)</div>
<div class="env-body">
The RI approximation reduces the MP2 scaling from \\(O(N^5)\\) (with prefactor proportional to \\(K^4\\)) to \\(O(N^5)\\) with a much smaller prefactor. The error introduced by the auxiliary basis is typically less than 0.1 kcal/mol per atom with standard auxiliary basis sets (e.g., cc-pVTZ/JK), which is negligible compared to the intrinsic MP2 error.
</div>
</div>

<h3>Cost Comparison</h3>

<div class="env-block remark">
<div class="env-title">Remark (Practical Speedups)</div>
<div class="env-body">
<table class="data-table" style="margin:12px auto;border-collapse:collapse;text-align:center;">
<tr style="border-bottom:2px solid #30363d;"><th style="padding:4px 16px;">Method</th><th style="padding:4px 16px;">Formal Scaling</th><th style="padding:4px 16px;">Typical Speedup vs MP2</th></tr>
<tr><td>MP2</td><td>\\(O(N^5)\\)</td><td>1\\(\\times\\)</td></tr>
<tr><td>RI-MP2</td><td>\\(O(N^5)\\) (small prefactor)</td><td>5-20\\(\\times\\)</td></tr>
<tr><td>SOS-MP2 + Laplace</td><td>\\(O(N^4)\\)</td><td>50-200\\(\\times\\)</td></tr>
<tr><td>Local RI-MP2</td><td>\\(O(N)\\) (linear scaling)</td><td>100-1000\\(\\times\\)</td></tr>
</table>
These speedups make MP2-level calculations feasible for systems with hundreds of atoms.
</div>
</div>

<h3>Double-Hybrid DFT</h3>

<div class="env-block remark">
<div class="env-title">Remark</div>
<div class="env-body">
The success of SCS-MP2 has inspired <em>double-hybrid density functionals</em> (e.g., B2PLYP, DSD-PBEP86) that combine DFT exchange-correlation with a scaled MP2 correlation component:
\\[
E_{\\text{DH-DFT}} = (1 - a_x)E_x^{\\text{DFT}} + a_x E_x^{\\text{HF}} + (1 - a_c)E_c^{\\text{DFT}} + a_c E_c^{\\text{MP2}}
\\]
These represent the current state-of-the-art for general-purpose computational chemistry, achieving near-CCSD(T) accuracy at MP2-like cost.
</div>
</div>
`,
            visualizations: [
                {
                    id: 'viz-ri-approximation',
                    title: 'Resolution of the Identity Approximation',
                    description: 'Visualize how the RI approximation factorizes expensive four-center integrals into products of cheaper three-center integrals using an auxiliary basis.',
                    setup(body, controls) {
                        const viz = new VizEngine(body, { width: 560, height: 350, scale: 1, originX: 0, originY: 0 });

                        let showRI = false;
                        const toggleBtn = VizEngine.createButton(controls, 'Toggle RI Factorization', () => {
                            showRI = !showRI;
                            draw();
                        });

                        function drawGaussian(ctx, cx, cy, w, h, color, label) {
                            ctx.fillStyle = color + '44';
                            ctx.strokeStyle = color;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            for (let x = -2; x <= 2; x += 0.05) {
                                const gx = cx + x * w;
                                const gy = cy - h * Math.exp(-x * x);
                                if (x === -2) ctx.moveTo(gx, gy); else ctx.lineTo(gx, gy);
                            }
                            ctx.lineTo(cx + 2 * w, cy);
                            ctx.lineTo(cx - 2 * w, cy);
                            ctx.closePath();
                            ctx.fill();
                            ctx.stroke();

                            if (label) {
                                ctx.fillStyle = color;
                                ctx.font = 'bold 14px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText(label, cx, cy + 18);
                            }
                        }

                        function draw() {
                            viz.clear();
                            const ctx = viz.ctx;
                            ctx.fillStyle = viz.colors.bg;
                            ctx.fillRect(0, 0, viz.width, viz.height);

                            if (!showRI) {
                                // Conventional four-center integral
                                ctx.fillStyle = viz.colors.white;
                                ctx.font = 'bold 14px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('Conventional: Four-Center Two-Electron Integral', viz.width / 2, 25);

                                ctx.font = '13px -apple-system,sans-serif';
                                ctx.fillText('(\u03bc\u03bd|\u03bb\u03c3) = \u222b\u222b \u03c6\u03bc(r\u2081)\u03c6\u03bd(r\u2081) \u00b7 1/r\u2081\u2082 \u00b7 \u03c6\u03bb(r\u2082)\u03c6\u03c3(r\u2082) dr\u2081dr\u2082', viz.width / 2, 50);

                                // Draw four basis functions
                                const y1 = 150, y2 = 150;
                                drawGaussian(ctx, 80, y1, 25, 50, viz.colors.blue, '\u03c6\u03bc');
                                drawGaussian(ctx, 170, y1, 25, 50, viz.colors.teal, '\u03c6\u03bd');
                                drawGaussian(ctx, 370, y2, 25, 50, viz.colors.orange, '\u03c6\u03bb');
                                drawGaussian(ctx, 460, y2, 25, 50, viz.colors.purple, '\u03c6\u03c3');

                                // Coulomb interaction
                                ctx.strokeStyle = viz.colors.yellow;
                                ctx.lineWidth = 2;
                                ctx.setLineDash([4, 4]);
                                ctx.beginPath(); ctx.moveTo(170, y1 - 30); ctx.lineTo(370, y2 - 30); ctx.stroke();
                                ctx.setLineDash([]);
                                ctx.fillStyle = viz.colors.yellow;
                                ctx.font = '12px -apple-system,sans-serif';
                                ctx.fillText('1/r\u2081\u2082', 270, y1 - 40);

                                // Labels
                                ctx.fillStyle = viz.colors.blue;
                                ctx.font = '12px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('Electron 1', 125, y1 + 40);
                                ctx.fillStyle = viz.colors.orange;
                                ctx.fillText('Electron 2', 415, y2 + 40);

                                // Cost info
                                ctx.fillStyle = viz.colors.red;
                                ctx.font = 'bold 12px -apple-system,sans-serif';
                                ctx.fillText('Storage: O(K\u2074)    Cost: O(K\u2074) integrals', viz.width / 2, 230);
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.fillText('For K=500 basis functions: ~1.6\u00d710\u00b9\u00b0 integrals', viz.width / 2, 255);
                                ctx.fillText('Each integral requires expensive numerical quadrature', viz.width / 2, 275);

                                // Arrow hint
                                ctx.fillStyle = viz.colors.muted;
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.fillText('Click "Toggle RI Factorization" to see the RI approximation', viz.width / 2, 320);

                            } else {
                                // RI factorization
                                ctx.fillStyle = viz.colors.white;
                                ctx.font = 'bold 14px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('RI/Density Fitting: Three-Center Factorization', viz.width / 2, 25);

                                ctx.font = '12px -apple-system,sans-serif';
                                ctx.fillText('(\u03bc\u03bd|\u03bb\u03c3) \u2248 \u03a3_PQ (\u03bc\u03bd|P)(P|Q)\u207B\u00b9(Q|\u03bb\u03c3)', viz.width / 2, 50);

                                // Left three-center integral
                                const y1 = 140;
                                drawGaussian(ctx, 50, y1, 18, 40, viz.colors.blue, '\u03c6\u03bc');
                                drawGaussian(ctx, 120, y1, 18, 40, viz.colors.teal, '\u03c6\u03bd');

                                // Auxiliary function P
                                drawGaussian(ctx, 200, y1, 22, 45, viz.colors.green, '\u03c7_P');

                                // Coulomb arrow
                                ctx.strokeStyle = viz.colors.yellow;
                                ctx.lineWidth = 1.5;
                                ctx.setLineDash([3, 3]);
                                ctx.beginPath(); ctx.moveTo(120, y1 - 25); ctx.lineTo(200, y1 - 25); ctx.stroke();
                                ctx.setLineDash([]);

                                // Equals / approx sign
                                ctx.fillStyle = viz.colors.white;
                                ctx.font = 'bold 20px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('\u00d7', 250, y1 - 10);

                                // Metric matrix
                                ctx.strokeStyle = viz.colors.yellow;
                                ctx.lineWidth = 2;
                                const mx = 295, my = y1 - 35, mw = 40, mh = 40;
                                ctx.strokeRect(mx, my, mw, mh);
                                ctx.fillStyle = viz.colors.yellow;
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.fillText('(P|Q)\u207B\u00b9', mx + mw / 2, my + mh / 2 + 4);

                                // Times sign
                                ctx.fillStyle = viz.colors.white;
                                ctx.font = 'bold 20px -apple-system,sans-serif';
                                ctx.fillText('\u00d7', 350, y1 - 10);

                                // Right three-center integral
                                drawGaussian(ctx, 395, y1, 22, 45, viz.colors.green, '\u03c7_Q');
                                drawGaussian(ctx, 465, y1, 18, 40, viz.colors.orange, '\u03c6\u03bb');
                                drawGaussian(ctx, 530, y1, 18, 40, viz.colors.purple, '\u03c6\u03c3');

                                ctx.strokeStyle = viz.colors.yellow;
                                ctx.setLineDash([3, 3]);
                                ctx.beginPath(); ctx.moveTo(395, y1 - 25); ctx.lineTo(465, y1 - 25); ctx.stroke();
                                ctx.setLineDash([]);

                                // Labels
                                ctx.fillStyle = viz.colors.green;
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('3-center: (\u03bc\u03bd|P)', 120, y1 + 45);
                                ctx.fillText('3-center: (Q|\u03bb\u03c3)', 470, y1 + 45);

                                // Cost comparison
                                ctx.fillStyle = viz.colors.green;
                                ctx.font = 'bold 12px -apple-system,sans-serif';
                                ctx.fillText('Storage: O(K\u00b2M)    Cost: O(K\u00b2M) integrals', viz.width / 2, 225);
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.fillText('M ~ 2-3K auxiliary functions (much smaller than K\u00b2)', viz.width / 2, 248);
                                ctx.fillText('For K=500: ~2.5\u00d710\u2078 3-center integrals (vs 1.6\u00d710\u00b9\u2070)', viz.width / 2, 268);

                                ctx.fillStyle = viz.colors.yellow;
                                ctx.font = 'bold 12px -apple-system,sans-serif';
                                ctx.fillText('Speedup: 5-20\u00d7 with error < 0.1 kcal/mol per atom', viz.width / 2, 295);

                                ctx.fillStyle = viz.colors.muted;
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.fillText('Click again to see conventional form', viz.width / 2, 320);
                            }
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'The SCS-MP2 parameters are \\(c_{\\text{OS}} = 6/5\\) and \\(c_{\\text{SS}} = 1/3\\). If the OS and SS components of the MP2 correlation energy are \\(-0.200\\) Eh and \\(-0.060\\) Eh respectively, compute both the standard MP2 and SCS-MP2 correlation energies.',
                    hint: 'Standard MP2 uses \\(c_{\\text{OS}} = c_{\\text{SS}} = 1\\).',
                    solution: 'Standard MP2: \\(E_{\\text{MP2}} = -0.200 + (-0.060) = -0.260\\) Eh. SCS-MP2: \\(E_{\\text{SCS-MP2}} = \\frac{6}{5}(-0.200) + \\frac{1}{3}(-0.060) = -0.240 + (-0.020) = -0.260\\) Eh. In this case, they happen to be equal. More generally, SCS-MP2 gives a smaller magnitude when the OS/SS ratio is around 3:1, which is typical. (The scaling changes the balance: OS is enhanced, SS is reduced.)'
                },
                {
                    question: 'Explain the physical basis for why \\(c_{\\text{SS}} < 1\\) in SCS-MP2. What kind of correlation is already captured by the HF wavefunction for same-spin electrons?',
                    hint: 'Think about the Pauli exclusion principle and the Fermi hole.',
                    solution: 'The Hartree-Fock wavefunction, being an antisymmetrized product (Slater determinant), automatically enforces the Pauli exclusion principle for same-spin electrons. This creates a "Fermi hole" around each electron that keeps same-spin electrons apart. This exchange correlation is already present in HF. MP2 then adds the Coulomb correlation on top, but for same-spin pairs, the Fermi hole already provides significant "correlation" (spatial separation). Standard MP2 double-counts some of this effect. Setting \\(c_{\\text{SS}} = 1/3\\) reduces the same-spin MP2 contribution to compensate for this overcounting.'
                },
                {
                    question: 'In the RI approximation, the auxiliary basis typically contains 2-3 times as many functions as the orbital basis. Why is this still beneficial despite having more functions?',
                    hint: 'Compare the number of four-center integrals \\(O(K^4)\\) with three-center integrals \\(O(K^2 M)\\) where \\(M \\approx 3K\\).',
                    solution: 'With \\(K\\) orbital basis functions and \\(M \\approx 3K\\) auxiliary functions: Four-center integrals: \\(\\binom{K^2}{2} \\approx K^4/2\\). Three-center integrals: \\(K^2 \\cdot M \\approx 3K^3\\). For \\(K = 500\\): Four-center: \\(\\sim 3 \\times 10^{10}\\). Three-center: \\(\\sim 3.75 \\times 10^8\\). The three-center count is ~80 times smaller. Although we also need the \\(M \\times M\\) metric inverse \\((P|Q)^{-1}\\), this is \\(O(M^3) \\approx O(27K^3)\\), still much less than \\(O(K^4)\\). The key insight is that products \\(\\phi_\\mu \\phi_\\nu\\) live in a function space that can be well-represented by a compact auxiliary basis, because the product functions are smoother and more compact than the individual basis functions.'
                },
                {
                    question: 'The SOS-MP2 method achieves \\(O(N^4)\\) scaling using a Laplace transform. The key identity is \\(\\frac{1}{\\Delta} = \\int_0^\\infty e^{-\\Delta t} \\, dt\\). Explain how this helps factorize the MP2 energy expression.',
                    hint: 'Substitute \\(\\Delta = \\epsilon_a + \\epsilon_b - \\epsilon_i - \\epsilon_j\\) and see how the exponential factorizes over orbital indices.',
                    solution: 'Using the Laplace transform: \\(\\frac{1}{\\epsilon_a + \\epsilon_b - \\epsilon_i - \\epsilon_j} = \\int_0^\\infty e^{-(\\epsilon_a - \\epsilon_i)t} e^{-(\\epsilon_b - \\epsilon_j)t} dt\\). This factorizes the denominator into a product of two terms, each depending on only one pair of indices. The MP2 energy becomes: \\(E_{\\text{MP2}}^{\\text{OS}} \\approx \\sum_\\tau w_\\tau \\sum_{ia} (ia|P) e^{-(\\epsilon_a - \\epsilon_i)t_\\tau} \\sum_{jb} (jb|Q) e^{-(\\epsilon_b - \\epsilon_j)t_\\tau}\\) (using quadrature for the integral). Each factor is an \\(O(N^2 M)\\) contraction, and there are ~5-8 quadrature points. Total: \\(O(N^2 M \\cdot N_{\\text{quad}}) = O(N^3)\\) per quadrature point, giving \\(O(N^4)\\) overall with the integral transformation.'
                },
                {
                    question: 'Double-hybrid functionals like B2PLYP combine DFT and MP2. Why is this combination more robust than pure MP2, especially for systems with small HOMO-LUMO gaps?',
                    hint: 'Think about what DFT provides that MP2 does not, and vice versa.',
                    solution: 'DFT provides a self-consistent treatment of exchange and correlation through the exchange-correlation functional, which includes static correlation effects (through the functional form) and is robust for metallic/small-gap systems. Pure MP2 fails for small gaps because the denominators \\(\\epsilon_a - \\epsilon_i\\) become small, causing divergence. In a double-hybrid, only a fraction (\\(a_c \\approx 0.3\\)) of the correlation is treated by MP2; the rest comes from the DFT functional, which is insensitive to the orbital gap. Furthermore, the DFT exchange-correlation potential modifies the orbital energies (via the Kohn-Sham equations), typically giving larger HOMO-LUMO gaps than HF, which improves the convergence of the MP2 component. The combination leverages the strengths of both approaches: DFT for robustness and MP2 for long-range dispersion and dynamic correlation.'
                }
            ]
        }
    ]
});
