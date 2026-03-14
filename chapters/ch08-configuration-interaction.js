// === Chapter 8: Configuration Interaction ===
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch08',
    number: 8,
    title: 'Configuration Interaction',
    subtitle: 'Systematic improvement: mixing excited determinants',
    sections: [
        // ========== SECTION 1: The Full CI Expansion ==========
        {
            id: 'ch08-sec01',
            title: 'The Full CI Expansion',
            content: `
<h2>8.1 The Full CI Expansion</h2>

<div class="env-block intuition">
<div class="env-title">Intuition</div>
<div class="env-body">
The Hartree-Fock wavefunction is the best single-determinant approximation, but it misses electron correlation entirely. The Configuration Interaction (CI) method systematically improves upon Hartree-Fock by expressing the exact wavefunction as a linear combination of all possible Slater determinants that can be constructed from a given basis set. Full CI gives the exact answer within the basis, but its exponential cost makes it impractical for all but the smallest systems.
</div>
</div>

<p>Having established in Chapter 7 that the Hartree-Fock wavefunction recovers only about 99% of the total energy (with the remaining ~1%, the correlation energy, being chemically crucial), we now develop the Configuration Interaction method as the conceptually simplest route to the exact solution.</p>

<h3>The CI Ansatz</h3>

<p>Given a set of \\(K\\) basis functions, the Hartree-Fock procedure yields \\(K\\) molecular orbitals. For an \\(N\\)-electron system, we occupy the lowest \\(N\\) orbitals to form the HF determinant \\(|\\Phi_0\\rangle\\), leaving \\(K - N\\) orbitals unoccupied (virtual). We label the occupied orbitals \\(i, j, k, \\ldots\\) and the virtual orbitals \\(a, b, c, \\ldots\\).</p>

<div class="env-block definition">
<div class="env-title">Definition 8.1.1 (Excited Determinants)</div>
<div class="env-body">
An <em>excited determinant</em> (or excited configuration) is obtained from \\(|\\Phi_0\\rangle\\) by replacing one or more occupied orbitals with virtual orbitals:
<ul>
<li><strong>Singles:</strong> \\(|\\Phi_i^a\\rangle\\) replaces occupied orbital \\(i\\) with virtual orbital \\(a\\).</li>
<li><strong>Doubles:</strong> \\(|\\Phi_{ij}^{ab}\\rangle\\) replaces occupied orbitals \\(i,j\\) with virtual orbitals \\(a,b\\).</li>
<li><strong>Triples:</strong> \\(|\\Phi_{ijk}^{abc}\\rangle\\) replaces \\(i,j,k\\) with \\(a,b,c\\).</li>
<li>And so on, up to \\(N\\)-fold excitations.</li>
</ul>
</div>
</div>

<div class="env-block definition">
<div class="env-title">Definition 8.1.2 (Full CI Wavefunction)</div>
<div class="env-body">
The Full Configuration Interaction (FCI) wavefunction is the most general expansion in the space of all Slater determinants constructible from \\(K\\) molecular orbitals:
\\[
|\\Psi_{\\text{FCI}}\\rangle = c_0 |\\Phi_0\\rangle + \\sum_{i,a} c_i^a |\\Phi_i^a\\rangle + \\sum_{i<j,\\,a<b} c_{ij}^{ab} |\\Phi_{ij}^{ab}\\rangle + \\sum_{i<j<k,\\,a<b<c} c_{ijk}^{abc} |\\Phi_{ijk}^{abc}\\rangle + \\cdots
\\]
The coefficients \\(\\{c_0, c_i^a, c_{ij}^{ab}, \\ldots\\}\\) are determined variationally by diagonalizing the Hamiltonian matrix in this basis of determinants.
</div>
</div>

<h3>The FCI Eigenvalue Problem</h3>

<p>In the basis of all Slater determinants \\(\\{|\\Phi_I\\rangle\\}_{I=1}^{N_{\\text{det}}}\\), the FCI problem reduces to the matrix eigenvalue equation:</p>
\\[
\\mathbf{H} \\mathbf{c} = E \\mathbf{c}, \\qquad H_{IJ} = \\langle \\Phi_I | \\hat{H} | \\Phi_J \\rangle.
\\]

<p>The lowest eigenvalue is the exact ground-state energy within the given basis, and the corresponding eigenvector gives the FCI wavefunction.</p>

<div class="env-block theorem">
<div class="env-title">Theorem 8.1.3 (FCI as Exact Solution Within Basis)</div>
<div class="env-body">
For a given one-electron basis set of \\(K\\) functions, the FCI energy is the exact solution to the electronic Schr&ouml;dinger equation within that basis. The only remaining error is the basis set incompleteness error, i.e., the difference between the FCI/K energy and the complete basis set (CBS) limit.
</div>
</div>

<div class="env-block proof">
<div class="env-title">Proof</div>
<div class="env-body">
The set of all \\(\\binom{K}{N}\\) Slater determinants constructible from \\(K\\) spin-orbitals for \\(N\\) electrons forms a complete basis for the \\(N\\)-electron Hilbert space restricted to this one-particle basis. By the variational principle, diagonalizing \\(\\hat{H}\\) in a complete basis yields the exact eigenvalues. Since the FCI expansion spans this entire space, the lowest eigenvalue equals the exact ground-state energy in the \\(K\\)-orbital space.
<div class="qed">∎</div>
</div>
</div>

<h3>Exponential Scaling of the FCI Space</h3>

<p>The dimension of the FCI space is the binomial coefficient:</p>
\\[
N_{\\text{det}} = \\binom{K}{N_\\alpha} \\binom{K}{N_\\beta}
\\]
<p>where \\(N_\\alpha\\) and \\(N_\\beta\\) are the numbers of alpha and beta electrons and \\(K\\) is the number of spatial orbitals. For a system with \\(N\\) electrons in \\(K\\) orbitals, this grows combinatorially.</p>

<div class="env-block example">
<div class="env-title">Example 8.1.4 (FCI Space Growth)</div>
<div class="env-body">
Consider a system with \\(N = 10\\) electrons (5 alpha, 5 beta):
<ul>
<li>\\(K = 10\\) orbitals: \\(\\binom{10}{5}^2 = 252^2 = 63{,}504\\) determinants</li>
<li>\\(K = 20\\) orbitals: \\(\\binom{20}{5}^2 = 15{,}504^2 \\approx 2.4 \\times 10^8\\) determinants</li>
<li>\\(K = 50\\) orbitals: \\(\\binom{50}{5}^2 \\approx 4.5 \\times 10^{12}\\) determinants</li>
<li>\\(K = 100\\) orbitals: \\(\\binom{100}{5}^2 \\approx 5.7 \\times 10^{16}\\) determinants</li>
</ul>
The dimension grows roughly as \\(K^N\\), making FCI impractical beyond about 18 electrons in 18 orbitals (the "FCI wall").
</div>
</div>

<div class="viz-placeholder" data-viz="viz-fci-dimension"></div>

<h3>Brillouin's Theorem and the Role of Singles</h3>

<div class="env-block theorem">
<div class="env-title">Theorem 8.1.5 (Brillouin's Theorem)</div>
<div class="env-body">
If \\(|\\Phi_0\\rangle\\) is the Hartree-Fock determinant, then singly excited determinants do not interact directly with it:
\\[
\\langle \\Phi_0 | \\hat{H} | \\Phi_i^a \\rangle = 0.
\\]
</div>
</div>

<div class="env-block proof">
<div class="env-title">Proof</div>
<div class="env-body">
By the Slater-Condon rules, \\(\\langle \\Phi_0 | \\hat{H} | \\Phi_i^a \\rangle = F_{ai}\\), where \\(F_{ai}\\) is an off-diagonal element of the Fock matrix between an occupied and a virtual orbital. Since the Hartree-Fock orbitals diagonalize the Fock operator, \\(F_{ai} = \\epsilon_a \\delta_{ai} = 0\\) for \\(a \\neq i\\) (occupied vs. virtual).
<div class="qed">∎</div>
</div>
</div>

<div class="env-block remark">
<div class="env-title">Remark</div>
<div class="env-body">
Brillouin's theorem means that singles do not contribute to the FCI energy at first order. However, they contribute indirectly through their coupling with doubles (and higher excitations), and are essential for properties such as dipole moments and orbital relaxation effects.
</div>
</div>

<h3>Slater-Condon Rules and the Sparsity of the CI Matrix</h3>

<p>The Hamiltonian contains only one- and two-electron operators: \\(\\hat{H} = \\sum_i \\hat{h}(i) + \\sum_{i<j} \\hat{g}(i,j)\\). The Slater-Condon rules state that matrix elements \\(\\langle \\Phi_I | \\hat{H} | \\Phi_J \\rangle\\) vanish when \\(|\\Phi_I\\rangle\\) and \\(|\\Phi_J\\rangle\\) differ by more than two orbital replacements. This makes the FCI matrix extremely sparse: each row has at most \\(O(N^2 K^2)\\) nonzero elements out of \\(N_{\\text{det}}\\) columns.</p>

<div class="env-block warning">
<div class="env-title">Warning</div>
<div class="env-body">
Despite the sparsity, the FCI matrix dimension itself grows combinatorially. Sparsity helps with storage and matrix-vector products, but does not change the fundamental \\(O(K^N)\\) scaling of the eigenvalue problem. The "exponential wall" is intrinsic to the FCI approach.
</div>
</div>
`,
            visualizations: [
                {
                    id: 'viz-fci-dimension',
                    title: 'FCI Dimension Calculator',
                    description: 'See how the Full CI space dimension explodes with the number of electrons and orbitals. Adjust the sliders to observe the combinatorial growth.',
                    setup(body, controls) {
                        const viz = new VizEngine(body, { width: 560, height: 380, scale: 1, originX: 70, originY: 340 });

                        let nElec = 6;
                        let maxK = 30;

                        function binomial(n, k) {
                            if (k < 0 || k > n) return 0;
                            if (k === 0 || k === n) return 1;
                            let result = 1;
                            for (let i = 0; i < k; i++) {
                                result = result * (n - i) / (i + 1);
                            }
                            return Math.round(result);
                        }

                        const elecSlider = VizEngine.createSlider(controls, 'Electrons (N): ', 2, 14, nElec, 2, v => { nElec = Math.round(v); draw(); });
                        const infoDiv = document.createElement('div');
                        infoDiv.style.cssText = 'margin-top:8px;font-family:monospace;font-size:12px;color:#c9d1d9;';
                        controls.appendChild(infoDiv);

                        function draw() {
                            viz.clear();
                            const ctx = viz.ctx;
                            const nAlpha = Math.floor(nElec / 2);
                            const nBeta = nElec - nAlpha;

                            // Compute dimensions for K = N to maxK
                            const data = [];
                            const minK = Math.max(nAlpha, nBeta);
                            for (let K = minK; K <= maxK; K++) {
                                const dim = binomial(K, nAlpha) * binomial(K, nBeta);
                                data.push({ K, dim, logDim: dim > 0 ? Math.log10(dim) : 0 });
                            }

                            if (data.length === 0) return;

                            const maxLog = Math.max(...data.map(d => d.logDim), 1);
                            const plotW = 460, plotH = 290;
                            const px0 = 70, py0 = 30;

                            // Background
                            ctx.fillStyle = viz.colors.bg;
                            ctx.fillRect(0, 0, viz.width, viz.height);

                            // Grid lines
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 0.5;
                            for (let i = 0; i <= Math.ceil(maxLog); i++) {
                                const y = py0 + plotH - (i / maxLog) * plotH;
                                ctx.beginPath(); ctx.moveTo(px0, y); ctx.lineTo(px0 + plotW, y); ctx.stroke();
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '10px -apple-system,sans-serif';
                                ctx.textAlign = 'right';
                                ctx.fillText('10^' + i, px0 - 5, y + 4);
                            }

                            // Axes
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1.5;
                            ctx.beginPath(); ctx.moveTo(px0, py0); ctx.lineTo(px0, py0 + plotH); ctx.lineTo(px0 + plotW, py0 + plotH); ctx.stroke();

                            // Plot bars
                            const barW = Math.max(2, Math.min(12, plotW / data.length - 2));
                            data.forEach((d, i) => {
                                const x = px0 + (i + 0.5) * plotW / data.length;
                                const h = (d.logDim / maxLog) * plotH;
                                const y = py0 + plotH - h;

                                // Color gradient: green for small, orange for medium, red for large
                                let color;
                                if (d.logDim < 4) color = viz.colors.green;
                                else if (d.logDim < 8) color = viz.colors.orange;
                                else if (d.logDim < 12) color = viz.colors.red;
                                else color = viz.colors.pink;

                                ctx.fillStyle = color + 'cc';
                                ctx.fillRect(x - barW / 2, y, barW, h);

                                // X label (every few)
                                if (i % Math.max(1, Math.floor(data.length / 10)) === 0) {
                                    ctx.fillStyle = viz.colors.text;
                                    ctx.font = '10px -apple-system,sans-serif';
                                    ctx.textAlign = 'center';
                                    ctx.fillText(d.K, x, py0 + plotH + 14);
                                }
                            });

                            // Axis labels
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Number of spatial orbitals (K)', px0 + plotW / 2, py0 + plotH + 30);
                            ctx.save();
                            ctx.translate(15, py0 + plotH / 2);
                            ctx.rotate(-Math.PI / 2);
                            ctx.fillText('log\u2081\u2080(N_det)', 0, 0);
                            ctx.restore();

                            // Title
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('FCI Dimension: N=' + nElec + ' electrons (' + nAlpha + '\u03b1, ' + nBeta + '\u03b2)', px0 + plotW / 2, 18);

                            // Feasibility line at 10^9
                            if (maxLog > 9) {
                                const feasY = py0 + plotH - (9 / maxLog) * plotH;
                                ctx.strokeStyle = viz.colors.yellow;
                                ctx.lineWidth = 1;
                                ctx.setLineDash([6, 4]);
                                ctx.beginPath(); ctx.moveTo(px0, feasY); ctx.lineTo(px0 + plotW, feasY); ctx.stroke();
                                ctx.setLineDash([]);
                                ctx.fillStyle = viz.colors.yellow;
                                ctx.font = '10px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.fillText('Practical limit (~10\u2079)', px0 + plotW - 100, feasY - 6);
                            }

                            // Info
                            const lastD = data[data.length - 1];
                            infoDiv.innerHTML =
                                '<strong>N = ' + nElec + ' electrons, K = ' + maxK + ' orbitals</strong><br>' +
                                'N_det = C(' + maxK + ',' + nAlpha + ')\u00B7C(' + maxK + ',' + nBeta + ') \u2248 10^' + lastD.logDim.toFixed(1) + '<br>' +
                                '<span style="color:' + viz.colors.green + '">\u2588</span> Tractable (&lt;10\u2074) ' +
                                '<span style="color:' + viz.colors.orange + '">\u2588</span> Hard (10\u2074-10\u2078) ' +
                                '<span style="color:' + viz.colors.red + '">\u2588</span> Impractical (10\u2078-10\u00B9\u00B2) ' +
                                '<span style="color:' + viz.colors.pink + '">\u2588</span> Impossible (&gt;10\u00B9\u00B2)';
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'For a system with 4 electrons (2\\(\\alpha\\), 2\\(\\beta\\)) in 8 spatial orbitals, compute the total number of Slater determinants in the FCI expansion.',
                    hint: 'Use \\(N_{\\text{det}} = \\binom{K}{N_\\alpha}\\binom{K}{N_\\beta}\\) where \\(K = 8\\), \\(N_\\alpha = N_\\beta = 2\\).',
                    solution: '\\(N_{\\text{det}} = \\binom{8}{2}^2 = 28^2 = 784\\). This is small enough for direct diagonalization.'
                },
                {
                    question: 'Prove that singly excited determinants \\(|\\Phi_i^a\\rangle\\) do not contribute directly to the FCI correlation energy at first order using Brillouin\'s theorem.',
                    hint: 'Write the first-order correction \\(E^{(1)} = \\sum_{ia} c_i^a \\langle \\Phi_0 | \\hat{H} | \\Phi_i^a \\rangle\\) and apply Brillouin\'s theorem.',
                    solution: 'The first-order correction involves \\(\\langle \\Phi_0 | \\hat{H} | \\Phi_i^a \\rangle = F_{ai} = 0\\) by Brillouin\'s theorem (the Fock matrix is diagonal in the canonical MO basis with occupied-virtual blocks vanishing). Thus singles do not mix with the HF reference at first order.'
                },
                {
                    question: 'The CI matrix element between \\(|\\Phi_0\\rangle\\) and a triply excited determinant \\(|\\Phi_{ijk}^{abc}\\rangle\\) is always zero. Why?',
                    hint: 'Think about the Slater-Condon rules and how many orbitals differ between the two determinants.',
                    solution: 'The determinants \\(|\\Phi_0\\rangle\\) and \\(|\\Phi_{ijk}^{abc}\\rangle\\) differ in three spin-orbital occupancies. By the Slater-Condon rules, \\(\\langle \\Phi_I | \\hat{H} | \\Phi_J \\rangle = 0\\) whenever \\(|\\Phi_I\\rangle\\) and \\(|\\Phi_J\\rangle\\) differ by more than two orbitals, since \\(\\hat{H}\\) contains at most two-body operators.'
                },
                {
                    question: 'Explain why the FCI energy is invariant to unitary rotations among the occupied orbitals or among the virtual orbitals, but truncated CI energies are not.',
                    hint: 'Consider what happens to the FCI space under a unitary transformation \\(\\tilde{\\phi}_a = \\sum_b U_{ab} \\phi_b\\).',
                    solution: 'A unitary rotation among occupied (or virtual) orbitals maps each determinant to a linear combination of determinants within the same excitation class. Since FCI includes ALL determinants, the space is invariant under such rotations, so the eigenvalues are unchanged. For truncated CI, rotating orbitals mixes excitation classes (e.g., a double in the old basis becomes a sum of singles, doubles, and triples in the new basis), so the truncated space is not invariant, and the energy depends on the orbital choice.'
                },
                {
                    question: 'Show that the number of doubly excited determinants for \\(N\\) electrons in \\(K\\) orbitals scales as \\(O(N^2 K^2)\\) (more precisely, \\(O(N_{\\text{occ}}^2 N_{\\text{virt}}^2)\\)).',
                    hint: 'Count the number of ways to choose 2 occupied orbitals and 2 virtual orbitals.',
                    solution: 'The number of doubles is \\(\\binom{N_{\\text{occ}}}{2}\\binom{N_{\\text{virt}}}{2}\\) where \\(N_{\\text{occ}} = N/2\\) and \\(N_{\\text{virt}} = K - N/2\\) (for spatial orbitals). This gives \\(\\frac{N_{\\text{occ}}(N_{\\text{occ}}-1)}{2} \\cdot \\frac{N_{\\text{virt}}(N_{\\text{virt}}-1)}{2} = O(N^2 K^2)\\), which is polynomial rather than combinatorial. This is why CISD is feasible when FCI is not.'
                }
            ]
        },

        // ========== SECTION 2: Truncated CI ==========
        {
            id: 'ch08-sec02',
            title: 'Truncated CI: CIS, CISD, CISDT',
            content: `
<h2>8.2 Truncated CI: CIS, CISD, CISDT</h2>

<p>Since Full CI is computationally intractable for most systems of chemical interest, we truncate the CI expansion at a given excitation level. The resulting methods, CIS, CISD, CISDT, etc., offer a hierarchy of increasingly accurate (but increasingly expensive) approximations.</p>

<div class="env-block definition">
<div class="env-title">Definition 8.2.1 (Truncated CI Methods)</div>
<div class="env-body">
The truncated CI wavefunction includes excitations only up to a specified level:
<ul>
<li><strong>CIS</strong> (CI Singles): \\(|\\Psi_{\\text{CIS}}\\rangle = c_0|\\Phi_0\\rangle + \\sum_{ia} c_i^a |\\Phi_i^a\\rangle\\)</li>
<li><strong>CID</strong> (CI Doubles): \\(|\\Psi_{\\text{CID}}\\rangle = c_0|\\Phi_0\\rangle + \\sum_{ijab} c_{ij}^{ab} |\\Phi_{ij}^{ab}\\rangle\\)</li>
<li><strong>CISD</strong> (CI Singles and Doubles): \\(|\\Psi_{\\text{CISD}}\\rangle = c_0|\\Phi_0\\rangle + \\sum_{ia} c_i^a |\\Phi_i^a\\rangle + \\sum_{ijab} c_{ij}^{ab} |\\Phi_{ij}^{ab}\\rangle\\)</li>
<li><strong>CISDT</strong>: Adds triples: \\(+ \\sum_{ijkabc} c_{ijk}^{abc} |\\Phi_{ijk}^{abc}\\rangle\\)</li>
<li><strong>CISDTQ</strong>: Further adds quadruples.</li>
</ul>
</div>
</div>

<h3>CIS: Excited States Only</h3>

<p>By Brillouin's theorem, \\(\\langle \\Phi_0 | \\hat{H} | \\Phi_i^a \\rangle = 0\\), so singles do not mix with the HF ground state. Consequently, CIS does not improve the ground-state energy at all. However, CIS is useful for computing excited-state energies and is the simplest method for UV-Vis spectroscopy.</p>

<div class="env-block proposition">
<div class="env-title">Proposition 8.2.2</div>
<div class="env-body">
The CIS ground-state energy is identical to the Hartree-Fock energy: \\(E_{\\text{CIS}}^{(0)} = E_{\\text{HF}}\\). CIS excited states are obtained by diagonalizing the CIS Hamiltonian matrix \\(A_{ia,jb} = \\langle \\Phi_i^a | \\hat{H} | \\Phi_j^b \\rangle\\).
</div>
</div>

<p>The CIS matrix elements, by the Slater-Condon rules, are:</p>
\\[
A_{ia,jb} = \\delta_{ij}\\delta_{ab}(\\epsilon_a - \\epsilon_i) + \\langle aj \\| ib \\rangle
\\]
<p>where \\(\\epsilon_a, \\epsilon_i\\) are orbital energies and \\(\\langle aj \\| ib \\rangle = \\langle aj | ib \\rangle - \\langle aj | bi \\rangle\\) is an antisymmetrized two-electron integral.</p>

<h3>CISD: The Workhorse</h3>

<p>CISD is historically the most widely used CI method for ground-state correlation. The wavefunction includes both singles and doubles, and the energy is obtained by diagonalizing the CISD Hamiltonian matrix.</p>

<div class="env-block definition">
<div class="env-title">Definition 8.2.3 (CISD Energy)</div>
<div class="env-body">
The CISD energy is the lowest eigenvalue of the Hamiltonian projected onto the space \\(\\{|\\Phi_0\\rangle, |\\Phi_i^a\\rangle, |\\Phi_{ij}^{ab}\\rangle\\}\\). The CISD correlation energy is:
\\[
E_{\\text{corr}}^{\\text{CISD}} = E_{\\text{CISD}} - E_{\\text{HF}} = \\sum_{i<j,\\,a<b} c_{ij}^{ab} \\langle \\Phi_0 | \\hat{H} | \\Phi_{ij}^{ab} \\rangle
\\]
where the second equality follows from Brillouin's theorem (the singles contribution to the energy is indirect, through their coupling with doubles).
</div>
</div>

<h3>Scaling of Truncated CI Methods</h3>

<div class="env-block remark">
<div class="env-title">Remark (Computational Scaling)</div>
<div class="env-body">
<table class="data-table" style="margin:12px auto;border-collapse:collapse;text-align:center;">
<tr style="border-bottom:2px solid #30363d;"><th style="padding:4px 16px;">Method</th><th style="padding:4px 16px;">Determinants</th><th style="padding:4px 16px;">Formal Scaling</th></tr>
<tr><td>CIS</td><td>\\(O(NK)\\)</td><td>\\(O(N^2K^2)\\)</td></tr>
<tr><td>CISD</td><td>\\(O(N^2K^2)\\)</td><td>\\(O(N^2K^4)\\)</td></tr>
<tr><td>CISDT</td><td>\\(O(N^3K^3)\\)</td><td>\\(O(N^3K^5)\\)</td></tr>
<tr><td>CISDTQ</td><td>\\(O(N^4K^4)\\)</td><td>\\(O(N^4K^6)\\)</td></tr>
<tr><td>FCI</td><td>\\(\\binom{K}{N}\\)</td><td>Exponential</td></tr>
</table>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-ci-expansion"></div>

<h3>The Intermediate Normalization Convention</h3>

<p>In CI theory, we adopt the <em>intermediate normalization</em> convention: \\(\\langle \\Phi_0 | \\Psi_{\\text{CI}} \\rangle = c_0 = 1\\) (unnormalized). This simplifies the energy expression to:</p>
\\[
E_{\\text{CI}} = \\langle \\Phi_0 | \\hat{H} | \\Psi_{\\text{CI}} \\rangle = E_{\\text{HF}} + \\sum_{i<j,a<b} c_{ij}^{ab} \\langle \\Phi_0 | \\hat{H} | \\Phi_{ij}^{ab} \\rangle
\\]

<div class="env-block warning">
<div class="env-title">Warning</div>
<div class="env-body">
Although the CI hierarchy (CIS \\(\\subset\\) CISD \\(\\subset\\) CISDT \\(\\subset\\) \\(\\cdots\\) \\(\\subset\\) FCI) converges to the exact answer, the convergence can be extremely slow. Recovering 95% of the correlation energy typically requires triples or higher. The reason is that the wavefunction must describe the electron-electron cusp, which requires very high excitations.
</div>
</div>
`,
            visualizations: [
                {
                    id: 'viz-ci-expansion',
                    title: 'CI Expansion Visualizer',
                    description: 'Watch how adding higher excitation levels (S, D, T, Q) progressively lowers the energy toward the FCI limit. The bar chart shows the energy contribution of each excitation class.',
                    setup(body, controls) {
                        const viz = new VizEngine(body, { width: 560, height: 380, scale: 1, originX: 0, originY: 0 });

                        let excLevel = 0; // 0=HF, 1=S, 2=SD, 3=SDT, 4=SDTQ, 5=FCI

                        // Model energies (in hartree, relative to HF)
                        const energyContribs = {
                            HF: 0,
                            S: -0.002,   // very small by Brillouin
                            D: -0.180,   // dominant
                            T: -0.025,   // significant
                            Q: -0.008,   // smaller
                            higher: -0.005 // rest
                        };
                        const labels = ['HF', '+S', '+SD', '+SDT', '+SDTQ', 'FCI'];
                        const cumEnergies = [0];
                        let sum = 0;
                        sum += energyContribs.S; cumEnergies.push(sum);
                        sum += energyContribs.D; cumEnergies.push(sum);
                        sum += energyContribs.T; cumEnergies.push(sum);
                        sum += energyContribs.Q; cumEnergies.push(sum);
                        sum += energyContribs.higher; cumEnergies.push(sum);
                        const totalCorr = sum;

                        const levelBtn = VizEngine.createButton(controls, 'Add Next Excitation Level', () => {
                            if (excLevel < 5) { excLevel++; draw(); }
                        });
                        const resetBtn = VizEngine.createButton(controls, 'Reset to HF', () => {
                            excLevel = 0; draw();
                        });

                        const infoDiv = document.createElement('div');
                        infoDiv.style.cssText = 'margin-top:8px;font-family:monospace;font-size:12px;color:#c9d1d9;';
                        controls.appendChild(infoDiv);

                        function draw() {
                            viz.clear();
                            const ctx = viz.ctx;
                            const px0 = 80, py0 = 40, plotW = 400, plotH = 260;

                            // Energy level diagram on left
                            const eMin = totalCorr * 1.15;
                            const eMax = 0.02;
                            const eRange = eMax - eMin;

                            // Background
                            ctx.fillStyle = viz.colors.bg;
                            ctx.fillRect(0, 0, viz.width, viz.height);

                            // Y axis
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1.5;
                            ctx.beginPath(); ctx.moveTo(px0, py0); ctx.lineTo(px0, py0 + plotH); ctx.stroke();

                            // FCI line (dashed)
                            const fciy = py0 + (1 - (totalCorr - eMin) / eRange) * plotH;
                            ctx.strokeStyle = viz.colors.green + '88';
                            ctx.lineWidth = 1;
                            ctx.setLineDash([6, 4]);
                            ctx.beginPath(); ctx.moveTo(px0, fciy); ctx.lineTo(px0 + plotW, fciy); ctx.stroke();
                            ctx.setLineDash([]);
                            ctx.fillStyle = viz.colors.green;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('FCI limit', px0 + plotW + 5, fciy + 4);

                            // HF line
                            const hfy = py0 + (1 - (0 - eMin) / eRange) * plotH;
                            ctx.strokeStyle = viz.colors.blue + '88';
                            ctx.lineWidth = 1;
                            ctx.setLineDash([6, 4]);
                            ctx.beginPath(); ctx.moveTo(px0, hfy); ctx.lineTo(px0 + plotW, hfy); ctx.stroke();
                            ctx.setLineDash([]);
                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillText('HF', px0 + plotW + 5, hfy + 4);

                            // Draw energy levels for each included method
                            const barW = plotW / 7;
                            const methodColors = [viz.colors.blue, viz.colors.teal, viz.colors.orange, viz.colors.purple, viz.colors.pink, viz.colors.green];

                            for (let i = 0; i <= excLevel; i++) {
                                const e = cumEnergies[i];
                                const y = py0 + (1 - (e - eMin) / eRange) * plotH;
                                const x = px0 + (i + 0.5) * barW + 20;

                                // Energy level line
                                ctx.strokeStyle = methodColors[i];
                                ctx.lineWidth = 3;
                                ctx.beginPath(); ctx.moveTo(x - barW * 0.35, y); ctx.lineTo(x + barW * 0.35, y); ctx.stroke();

                                // Label
                                ctx.fillStyle = methodColors[i];
                                ctx.font = 'bold 11px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText(labels[i], x, py0 + plotH + 18);

                                // Energy value
                                ctx.font = '10px -apple-system,sans-serif';
                                ctx.fillText(e.toFixed(3) + ' Eh', x, y - 10);

                                // Arrow from previous
                                if (i > 0) {
                                    const ePrev = cumEnergies[i - 1];
                                    const yPrev = py0 + (1 - (ePrev - eMin) / eRange) * plotH;
                                    ctx.strokeStyle = methodColors[i] + '66';
                                    ctx.lineWidth = 1;
                                    ctx.setLineDash([3, 3]);
                                    ctx.beginPath(); ctx.moveTo(x, yPrev); ctx.lineTo(x, y); ctx.stroke();
                                    ctx.setLineDash([]);
                                }
                            }

                            // Y axis label
                            ctx.save();
                            ctx.translate(15, py0 + plotH / 2);
                            ctx.rotate(-Math.PI / 2);
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Correlation energy (Eh)', 0, 0);
                            ctx.restore();

                            // Title
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('CI Hierarchy: Energy Lowering', viz.width / 2, 18);

                            // Info
                            const pct = excLevel > 0 ? ((cumEnergies[excLevel] / totalCorr) * 100).toFixed(1) : '0.0';
                            infoDiv.innerHTML = '<strong>Current: ' + labels[excLevel] + '</strong><br>' +
                                'Correlation recovered: ' + pct + '%<br>' +
                                'E_corr = ' + cumEnergies[excLevel].toFixed(4) + ' Eh (FCI: ' + totalCorr.toFixed(4) + ' Eh)';
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Explain why CIS does not improve the ground-state energy of a closed-shell molecule, but is useful for excited states.',
                    hint: 'Use Brillouin\'s theorem and the structure of the CIS Hamiltonian matrix.',
                    solution: 'By Brillouin\'s theorem, \\(\\langle \\Phi_0 | \\hat{H} | \\Phi_i^a \\rangle = 0\\), so the HF determinant does not mix with singly excited determinants. The CIS Hamiltonian in the \\(\\{|\\Phi_0\\rangle, |\\Phi_i^a\\rangle\\}\\) space is block-diagonal between \\(|\\Phi_0\\rangle\\) and the singles block. The ground-state eigenvalue remains \\(E_{\\text{HF}}\\). However, the eigenvalues of the singles-only block give CIS excited-state energies, which approximate the true excitation energies.'
                },
                {
                    question: 'For a minimal-basis H\\(_2\\) molecule (2 electrons, 2 orbitals), write out the complete CISD wavefunction. How does it compare to the FCI wavefunction?',
                    hint: 'With 2 electrons in 2 orbitals, what is the maximum possible excitation level?',
                    solution: 'With 2 electrons (1\\(\\alpha\\), 1\\(\\beta\\)) and 2 spatial orbitals, the occupied orbital is \\(\\sigma_g\\) and the virtual orbital is \\(\\sigma_u^*\\). The only possible excitations are: single \\(|\\Phi_1^2\\rangle\\) (but this is spin-forbidden for a singlet), and double \\(|\\Phi_{11}^{22}\\rangle = |\\sigma_u^* \\bar{\\sigma}_u^*|\\). So \\(|\\Psi_{\\text{CISD}}\\rangle = c_0|\\sigma_g \\bar{\\sigma}_g| + c_{11}^{22}|\\sigma_u^* \\bar{\\sigma}_u^*|\\). Since the maximum excitation is already doubles, CISD = FCI for minimal-basis H\\(_2\\).'
                },
                {
                    question: 'Derive the number of singly, doubly, and triply excited spatial determinants for a system with \\(N_{\\text{occ}} = 5\\) occupied and \\(N_{\\text{virt}} = 15\\) virtual spatial orbitals.',
                    hint: 'Singles: choose 1 occupied and 1 virtual. Doubles: choose 2 of each. Triples: choose 3 of each.',
                    solution: 'Singles: \\(\\binom{5}{1}\\binom{15}{1} = 75\\). Doubles: \\(\\binom{5}{2}\\binom{15}{2} = 10 \\times 105 = 1050\\). Triples: \\(\\binom{5}{3}\\binom{15}{3} = 10 \\times 455 = 4550\\). Note the rapid growth: from 75 to 1050 to 4550. (These counts are for spatial orbital substitutions; accounting for spin roughly multiplies each by a factor of 2-4 depending on the spin case.)'
                },
                {
                    question: 'Why does the correlation energy from CISD typically recover only 80-95% of the FCI correlation energy, even though doubles dominate the correlation?',
                    hint: 'Think about higher-order coupling effects and the importance of disconnected quadruples.',
                    solution: 'Although doubles provide the dominant direct contribution to correlation, they couple to the reference through connected quadruples (two independent double excitations occurring simultaneously). Truncating at doubles misses these "disconnected" quadruple contributions. The missing higher excitations (T, Q, ...) contribute 5-20% of the correlation energy. Furthermore, triples are needed to correctly describe three-body correlation effects that arise in bond-breaking scenarios.'
                },
                {
                    question: 'Show that the CISD wavefunction is not invariant to rotations among the occupied orbitals. Give a concrete example.',
                    hint: 'Consider rotating two occupied orbitals: \\(\\tilde{\\phi}_1 = \\cos\\theta\\, \\phi_1 + \\sin\\theta\\, \\phi_2\\). What happens to the doubly excited determinant \\(|\\Phi_{12}^{ab}\\rangle\\)?',
                    solution: 'Under the rotation \\(\\tilde{\\phi}_1 = \\cos\\theta\\, \\phi_1 + \\sin\\theta\\, \\phi_2\\), a doubly excited determinant like \\(|\\Phi_{12}^{ab}\\rangle\\) transforms into a linear combination involving the original double \\(|\\Phi_{12}^{ab}\\rangle\\) but also triples and quadruples (from replacing the transformed occupied orbitals). These triples and quadruples lie outside the CISD space. Therefore, the CISD energy depends on the specific choice of occupied orbitals, unlike the FCI energy. This is why canonical HF orbitals are typically used, but localized-orbital CISD gives different results.'
                }
            ]
        },

        // ========== SECTION 3: The CI Matrix and Davidson Diagonalization ==========
        {
            id: 'ch08-sec03',
            title: 'The CI Matrix and Davidson Diagonalization',
            content: `
<h2>8.3 The CI Matrix and Davidson Diagonalization</h2>

<p>The CI eigenvalue problem \\(\\mathbf{H}\\mathbf{c} = E\\mathbf{c}\\) involves matrices too large to store or diagonalize directly. The Davidson algorithm exploits the sparsity and diagonal dominance of the CI matrix to find a few lowest eigenvalues iteratively.</p>

<h3>Structure of the CI Matrix</h3>

<p>The CI Hamiltonian matrix has a special structure dictated by the Slater-Condon rules:</p>

<div class="env-block proposition">
<div class="env-title">Proposition 8.3.1 (Block Structure)</div>
<div class="env-body">
The CI matrix in the \\(\\{|\\Phi_0\\rangle, S, D, T, Q, \\ldots\\}\\) basis has the structure:
\\[
\\mathbf{H} = \\begin{pmatrix}
\\langle 0|H|0\\rangle & 0 & \\langle 0|H|D\\rangle & 0 & 0 & \\cdots \\\\
0 & \\langle S|H|S\\rangle & \\langle S|H|D\\rangle & \\langle S|H|T\\rangle & 0 & \\cdots \\\\
\\langle D|H|0\\rangle & \\langle D|H|S\\rangle & \\langle D|H|D\\rangle & \\langle D|H|T\\rangle & \\langle D|H|Q\\rangle & \\cdots \\\\
0 & \\langle T|H|S\\rangle & \\langle T|H|D\\rangle & \\langle T|H|T\\rangle & \\langle T|H|Q\\rangle & \\cdots \\\\
0 & 0 & \\langle Q|H|D\\rangle & \\langle Q|H|T\\rangle & \\langle Q|H|Q\\rangle & \\cdots \\\\
\\vdots & \\vdots & \\vdots & \\vdots & \\vdots & \\ddots
\\end{pmatrix}
\\]
Zero blocks arise because the Hamiltonian can connect determinants differing by at most 2 orbitals (Slater-Condon), and Brillouin's theorem zeroes the \\(\\langle 0|H|S\\rangle\\) block.
</div>
</div>

<h3>Diagonal Dominance</h3>

<p>The diagonal elements of the CI matrix are:</p>
\\[
H_{II} = \\langle \\Phi_I | \\hat{H} | \\Phi_I \\rangle = E_{\\text{HF}} + \\sum_{a \\in \\text{virt}} \\epsilon_a - \\sum_{i \\in \\text{occ}} \\epsilon_i + \\text{(two-electron corrections)}
\\]
<p>Higher excitations have larger diagonal elements (since replacing low-energy occupied orbitals with high-energy virtual orbitals increases the energy). This diagonal dominance is key to the efficiency of iterative eigensolvers.</p>

<h3>The Davidson Algorithm</h3>

<div class="env-block definition">
<div class="env-title">Definition 8.3.2 (Davidson Diagonalization)</div>
<div class="env-body">
The Davidson algorithm finds the lowest eigenvalue(s) of a large sparse matrix \\(\\mathbf{H}\\) iteratively:
<ol>
<li><strong>Initial guess:</strong> Choose \\(\\mathbf{b}_1\\) (typically a unit vector along the dominant diagonal element).</li>
<li><strong>Sigma vector:</strong> Compute \\(\\boldsymbol{\\sigma}_k = \\mathbf{H}\\mathbf{b}_k\\) (the only step requiring the full matrix).</li>
<li><strong>Subspace Hamiltonian:</strong> Form the projected matrix \\(\\tilde{H}_{ij} = \\mathbf{b}_i^\\top \\boldsymbol{\\sigma}_j\\) in the subspace \\(\\{\\mathbf{b}_1, \\ldots, \\mathbf{b}_k\\}\\).</li>
<li><strong>Diagonalize \\(\\tilde{\\mathbf{H}}\\):</strong> Obtain approximate eigenvalue \\(\\theta\\) and eigenvector \\(\\mathbf{s}\\).</li>
<li><strong>Ritz vector:</strong> \\(\\mathbf{x} = \\sum_i s_i \\mathbf{b}_i\\).</li>
<li><strong>Residual:</strong> \\(\\mathbf{r} = (\\boldsymbol{\\sigma} \\cdot \\mathbf{s}) - \\theta \\mathbf{x}\\). If \\(\\|\\mathbf{r}\\| < \\text{tol}\\), converged.</li>
<li><strong>Correction:</strong> \\(\\delta_I = -r_I / (H_{II} - \\theta)\\) (preconditioned with diagonal).</li>
<li><strong>Expand subspace:</strong> Orthogonalize \\(\\boldsymbol{\\delta}\\) against existing \\(\\{\\mathbf{b}_k\\}\\), add as \\(\\mathbf{b}_{k+1}\\). Go to step 2.</li>
</ol>
</div>
</div>

<div class="env-block theorem">
<div class="env-title">Theorem 8.3.3 (Convergence of Davidson)</div>
<div class="env-body">
For a diagonally dominant matrix, the Davidson algorithm converges much faster than the Lanczos algorithm because the diagonal preconditioner \\((H_{II} - \\theta)^{-1}\\) effectively maps the correction vector toward the true eigenvector. Typical CI calculations converge in 10-30 iterations, each requiring one sigma-vector formation (the bottleneck at \\(O(N_{\\text{det}} \\cdot N_{\\text{nonzero}})\\)).
</div>
</div>

<div class="env-block remark">
<div class="env-title">Remark</div>
<div class="env-body">
The sigma vector \\(\\boldsymbol{\\sigma} = \\mathbf{H}\\mathbf{b}\\) is never formed by explicit matrix-vector multiplication (the matrix is too large to store). Instead, it is computed "on the fly" using the Slater-Condon rules: for each determinant \\(|\\Phi_I\\rangle\\), we enumerate all determinants \\(|\\Phi_J\\rangle\\) that differ by at most 2 orbitals, compute \\(H_{IJ}\\), and accumulate \\(\\sigma_I \\mathrel{+}= H_{IJ} c_J\\). This "direct CI" approach was pioneered by Roos and Siegbahn (1977).
</div>
</div>

<h3>Comparison with Other Eigensolvers</h3>

<div class="env-block remark">
<div class="env-title">Remark (Davidson vs. Lanczos)</div>
<div class="env-body">
<table class="data-table" style="margin:12px auto;border-collapse:collapse;text-align:center;">
<tr style="border-bottom:2px solid #30363d;"><th style="padding:4px 16px;">Feature</th><th style="padding:4px 16px;">Davidson</th><th style="padding:4px 16px;">Lanczos</th></tr>
<tr><td>Preconditioner</td><td>Diagonal (essential)</td><td>None</td></tr>
<tr><td>Best for</td><td>Diag. dominant matrices</td><td>General sparse matrices</td></tr>
<tr><td>Iterations (CI)</td><td>10-30</td><td>100-1000+</td></tr>
<tr><td>Memory</td><td>\\(k\\) subspace vectors</td><td>3 vectors (Lanczos recurrence)</td></tr>
<tr><td>Multiple roots</td><td>Natural extension</td><td>Possible but less robust</td></tr>
</table>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-davidson-convergence"></div>
`,
            visualizations: [
                {
                    id: 'viz-davidson-convergence',
                    title: 'Davidson Diagonalization Convergence',
                    description: 'Visualize how the Davidson algorithm iteratively converges to the lowest eigenvalue. The blue curve shows approximate eigenvalue vs. iteration, and the red curve shows residual norm.',
                    setup(body, controls) {
                        const viz = new VizEngine(body, { width: 560, height: 380, scale: 1, originX: 0, originY: 0 });

                        // Simulate Davidson convergence for a model problem
                        // Diag. dominant matrix: eigenvalues near diagonal entries
                        const exactE = -76.2345;
                        const startE = -75.8;

                        // Simulated convergence data
                        const iterations = [];
                        let currentE = startE;
                        let residual = 1.0;
                        for (let k = 0; k <= 25; k++) {
                            iterations.push({ k, E: currentE, res: residual });
                            const conv = 0.35 + 0.1 * Math.sin(k * 0.5);
                            currentE = exactE + (currentE - exactE) * conv;
                            residual *= conv * 0.8;
                        }

                        let showResidual = true;
                        const toggleBtn = VizEngine.createButton(controls, 'Toggle Residual', () => {
                            showResidual = !showResidual;
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            const ctx = viz.ctx;
                            const px0 = 70, py0 = 30, plotW = 440, plotH = 140;

                            ctx.fillStyle = viz.colors.bg;
                            ctx.fillRect(0, 0, viz.width, viz.height);

                            // Upper panel: Energy convergence
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.moveTo(px0, py0); ctx.lineTo(px0, py0 + plotH); ctx.lineTo(px0 + plotW, py0 + plotH); ctx.stroke();

                            const eMin = exactE - 0.05;
                            const eMax = startE + 0.1;
                            const eRange = eMax - eMin;

                            // Exact energy line
                            const exactY = py0 + plotH - ((exactE - eMin) / eRange) * plotH;
                            ctx.strokeStyle = viz.colors.green + '66';
                            ctx.setLineDash([4, 4]);
                            ctx.beginPath(); ctx.moveTo(px0, exactY); ctx.lineTo(px0 + plotW, exactY); ctx.stroke();
                            ctx.setLineDash([]);
                            ctx.fillStyle = viz.colors.green;
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('Exact: ' + exactE.toFixed(4), px0 + plotW + 5, exactY);

                            // Energy curve
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            iterations.forEach((it, idx) => {
                                const x = px0 + (it.k / 25) * plotW;
                                const y = py0 + plotH - ((it.E - eMin) / eRange) * plotH;
                                if (idx === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
                            });
                            ctx.stroke();

                            // Points
                            iterations.forEach(it => {
                                const x = px0 + (it.k / 25) * plotW;
                                const y = py0 + plotH - ((it.E - eMin) / eRange) * plotH;
                                ctx.fillStyle = viz.colors.blue;
                                ctx.beginPath(); ctx.arc(x, y, 3, 0, Math.PI * 2); ctx.fill();
                            });

                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Energy Convergence', px0 + plotW / 2, py0 - 5);

                            ctx.save();
                            ctx.translate(15, py0 + plotH / 2);
                            ctx.rotate(-Math.PI / 2);
                            ctx.fillStyle = viz.colors.blue;
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.fillText('E (Eh)', 0, 0);
                            ctx.restore();

                            if (showResidual) {
                                // Lower panel: Residual convergence (log scale)
                                const py1 = py0 + plotH + 50;
                                const plotH2 = 120;

                                ctx.strokeStyle = viz.colors.axis;
                                ctx.lineWidth = 1;
                                ctx.beginPath(); ctx.moveTo(px0, py1); ctx.lineTo(px0, py1 + plotH2); ctx.lineTo(px0 + plotW, py1 + plotH2); ctx.stroke();

                                const logMin = -14;
                                const logMax = 1;
                                const logRange = logMax - logMin;

                                // Convergence threshold
                                const threshY = py1 + plotH2 - ((-8 - logMin) / logRange) * plotH2;
                                ctx.strokeStyle = viz.colors.yellow + '66';
                                ctx.setLineDash([4, 4]);
                                ctx.beginPath(); ctx.moveTo(px0, threshY); ctx.lineTo(px0 + plotW, threshY); ctx.stroke();
                                ctx.setLineDash([]);
                                ctx.fillStyle = viz.colors.yellow;
                                ctx.font = '10px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.fillText('tol = 10\u207B\u2078', px0 + plotW + 5, threshY);

                                // Residual curve
                                ctx.strokeStyle = viz.colors.red;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                iterations.forEach((it, idx) => {
                                    const x = px0 + (it.k / 25) * plotW;
                                    const logR = Math.log10(Math.max(it.res, 1e-15));
                                    const y = py1 + plotH2 - ((logR - logMin) / logRange) * plotH2;
                                    if (idx === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
                                });
                                ctx.stroke();

                                iterations.forEach(it => {
                                    const x = px0 + (it.k / 25) * plotW;
                                    const logR = Math.log10(Math.max(it.res, 1e-15));
                                    const y = py1 + plotH2 - ((logR - logMin) / logRange) * plotH2;
                                    ctx.fillStyle = viz.colors.red;
                                    ctx.beginPath(); ctx.arc(x, y, 3, 0, Math.PI * 2); ctx.fill();
                                });

                                ctx.fillStyle = viz.colors.white;
                                ctx.font = 'bold 12px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('Residual Norm (log scale)', px0 + plotW / 2, py1 - 5);

                                ctx.save();
                                ctx.translate(15, py1 + plotH2 / 2);
                                ctx.rotate(-Math.PI / 2);
                                ctx.fillStyle = viz.colors.red;
                                ctx.font = '10px -apple-system,sans-serif';
                                ctx.fillText('log\u2081\u2080||r||', 0, 0);
                                ctx.restore();

                                // X axis label
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('Davidson iteration', px0 + plotW / 2, py1 + plotH2 + 18);
                            }
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Explain why the Davidson algorithm requires only the matrix-vector product \\(\\boldsymbol{\\sigma} = \\mathbf{H}\\mathbf{c}\\) and not the full matrix \\(\\mathbf{H}\\).',
                    hint: 'Consider the subspace projection step and how the small matrix \\(\\tilde{\\mathbf{H}}\\) is formed.',
                    solution: 'The algorithm only needs \\(\\boldsymbol{\\sigma}_k = \\mathbf{H}\\mathbf{b}_k\\) for each trial vector \\(\\mathbf{b}_k\\). The small projected matrix \\(\\tilde{H}_{ij} = \\mathbf{b}_i^\\top \\boldsymbol{\\sigma}_j\\) is formed from the stored trial vectors and sigma vectors. The preconditioner uses only the diagonal \\(H_{II}\\). None of these steps require the full matrix \\(\\mathbf{H}\\) to be stored; the sigma vector can be computed "on-the-fly" using Slater-Condon rules by looping over pairs of connected determinants.'
                },
                {
                    question: 'The Davidson preconditioner is \\(\\delta_I = -r_I / (H_{II} - \\theta)\\). What happens if \\(H_{II} \\approx \\theta\\) for some determinant \\(I\\)?',
                    hint: 'Think about the denominator and what it implies physically.',
                    solution: 'If \\(H_{II} \\approx \\theta\\), the denominator is near zero, causing \\(\\delta_I\\) to blow up. This occurs when a determinant has a diagonal energy close to the eigenvalue, indicating strong mixing. Practically, one adds a level shift or damping: \\(\\delta_I = -r_I / \\max(|H_{II} - \\theta|, \\epsilon)\\). Physically, this situation arises in near-degenerate problems (e.g., multi-reference cases) where the Davidson algorithm may converge slowly or to the wrong root.'
                },
                {
                    question: 'Prove that the Slater-Condon rules guarantee \\(\\langle \\Phi_I | \\hat{H} | \\Phi_J \\rangle = 0\\) if \\(|\\Phi_I\\rangle\\) and \\(|\\Phi_J\\rangle\\) differ by more than two orbitals.',
                    hint: 'Write \\(\\hat{H} = \\sum_{pq} h_{pq} a_p^\\dagger a_q + \\frac{1}{2} \\sum_{pqrs} \\langle pq||rs \\rangle a_p^\\dagger a_q^\\dagger a_s a_r\\). Each term can change at most 1 or 2 orbitals.',
                    solution: 'The Hamiltonian \\(\\hat{H}\\) is a sum of one-body operators \\(a_p^\\dagger a_q\\) (which can change at most 1 orbital) and two-body operators \\(a_p^\\dagger a_q^\\dagger a_s a_r\\) (which can change at most 2 orbitals). If \\(|\\Phi_I\\rangle\\) and \\(|\\Phi_J\\rangle\\) differ by \\(k > 2\\) orbitals, then applying any term in \\(\\hat{H}\\) to \\(|\\Phi_J\\rangle\\) still leaves at least \\(k - 2 \\geq 1\\) orbitals different from \\(|\\Phi_I\\rangle\\). Since two Slater determinants with different orbital occupancies are orthogonal, the matrix element vanishes.'
                },
                {
                    question: 'In the Davidson algorithm, why is the initial guess vector typically chosen as the unit vector corresponding to the HF determinant (i.e., \\(c_0 = 1\\), all other \\(c_I = 0\\))?',
                    hint: 'Think about diagonal dominance and where the lowest diagonal element is.',
                    solution: 'The HF determinant has the lowest diagonal matrix element \\(H_{00} = E_{\\text{HF}}\\), which is the smallest among all determinants (excited determinants have higher orbital energies). Since the Davidson algorithm is essentially a diagonal-preconditioned scheme, starting from the unit vector along the smallest diagonal entry provides the best initial approximation to the ground-state eigenvector. The ground-state wavefunction is typically dominated by \\(c_0 \\approx 0.9\\) anyway, so this is physically motivated.'
                },
                {
                    question: 'The Davidson subspace grows by one vector per iteration. In practice, what happens when it becomes too large, and how is this handled?',
                    hint: 'Think about memory and orthogonality maintenance.',
                    solution: 'As the subspace grows, memory consumption increases (each vector has \\(N_{\\text{det}}\\) elements) and numerical orthogonality degrades. When the subspace reaches a maximum size (typically 50-100 vectors), a "restart" is performed: the current best Ritz vectors (one per desired root) are kept as the new starting vectors, and the old subspace is discarded. This process, called the Davidson-Liu restart, maintains memory bounds while preserving the converged information. Restarting causes a minor setback in convergence but is essential for practical feasibility.'
                }
            ]
        },

        // ========== SECTION 4: Size Consistency and Size Extensivity ==========
        {
            id: 'ch08-sec04',
            title: 'Size Consistency and Size Extensivity',
            content: `
<h2>8.4 Size Consistency and Size Extensivity</h2>

<p>One of the most serious deficiencies of truncated CI is the failure of size consistency. This section defines size consistency and size extensivity, demonstrates the failure of CISD, and introduces corrections.</p>

<div class="env-block definition">
<div class="env-title">Definition 8.4.1 (Size Consistency)</div>
<div class="env-body">
A method is <em>size consistent</em> if the energy of two non-interacting subsystems \\(A\\) and \\(B\\) at infinite separation equals the sum of the individual energies:
\\[
E(A \\cdots B)_{R \\to \\infty} = E(A) + E(B).
\\]
Equivalently, the method should give the correct dissociation limit for bond breaking.
</div>
</div>

<div class="env-block definition">
<div class="env-title">Definition 8.4.2 (Size Extensivity)</div>
<div class="env-body">
A method is <em>size extensive</em> if the energy scales linearly with the number of particles in the thermodynamic limit. For \\(n\\) identical non-interacting subsystems:
\\[
E(n \\text{ copies}) = n \\cdot E(\\text{one copy}).
\\]
</div>
</div>

<div class="env-block remark">
<div class="env-title">Remark</div>
<div class="env-body">
Size extensivity implies size consistency for non-interacting fragments, but the converse is not always true. Size consistency is the more chemically relevant property since it governs dissociation curves and reaction energies.
</div>
</div>

<h3>Failure of Truncated CI</h3>

<div class="env-block theorem">
<div class="env-title">Theorem 8.4.3 (CISD is Not Size Consistent)</div>
<div class="env-body">
For two non-interacting helium atoms \\(A\\) and \\(B\\), the CISD energy of the combined system is not equal to twice the CISD energy of a single atom:
\\[
E_{\\text{CISD}}(\\text{He}_2) \\neq 2 E_{\\text{CISD}}(\\text{He}).
\\]
</div>
</div>

<div class="env-block proof">
<div class="env-title">Proof</div>
<div class="env-body">
Consider two He atoms at infinite separation. Each atom has 2 electrons. For a single He, CISD includes all excitations (singles and doubles) and equals FCI (since there are only 2 electrons). For the He\\(_2\\) "supermolecule" with 4 electrons, the exact (FCI) wavefunction includes quadruple excitations (two simultaneous doubles, one on each atom). CISD for He\\(_2\\) truncates at doubles, missing these quadruples. Since these "disconnected quadruples" contribute to the energy of non-interacting pairs, \\(E_{\\text{CISD}}(\\text{He}_2) > E_{\\text{CISD}}(\\text{He}_A) + E_{\\text{CISD}}(\\text{He}_B)\\) (the error is positive, meaning too little correlation energy is recovered for the supersystem).
<div class="qed">∎</div>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-size-consistency"></div>

<h3>Mathematical Analysis of the Error</h3>

<p>For \\(n\\) non-interacting copies of a system, each with CISD correlation energy \\(\\epsilon\\), the total exact energy is \\(n\\epsilon\\). The CISD energy of the supersystem gives approximately:</p>
\\[
E_{\\text{CISD}}^{\\text{corr}}(n \\text{ copies}) \\approx n\\epsilon + \\frac{n(n-1)}{2} \\cdot \\delta
\\]
<p>where \\(\\delta > 0\\) is the missing quadruples contribution per pair. The error grows as \\(O(n^2)\\), making CISD increasingly worse for larger systems.</p>

<div class="env-block warning">
<div class="env-title">Warning</div>
<div class="env-body">
The size-consistency error is not merely academic. For a reaction \\(A + B \\to AB\\), the CISD binding energy \\(\\Delta E = E(AB) - E(A) - E(B)\\) is contaminated by different size-consistency errors on each side. This can lead to errors of 5-20 kcal/mol for reactions involving moderate-sized molecules, rendering the results chemically meaningless.
</div>
</div>

<h3>The Davidson Correction (+Q)</h3>

<div class="env-block definition">
<div class="env-title">Definition 8.4.4 (Davidson Correction)</div>
<div class="env-body">
The Davidson correction (also called the +Q correction) is an a posteriori estimate of the contribution of quadruple excitations:
\\[
\\Delta E_Q \\approx (1 - c_0^2) \\cdot E_{\\text{corr}}^{\\text{CISD}}
\\]
where \\(c_0\\) is the coefficient of the HF determinant in the normalized CISD wavefunction. The corrected energy is:
\\[
E_{\\text{CISD+Q}} = E_{\\text{CISD}} + \\Delta E_Q.
\\]
</div>
</div>

<div class="env-block remark">
<div class="env-title">Remark</div>
<div class="env-body">
The Davidson correction is based on the observation that for \\(n\\) non-interacting pairs, \\(c_0^2 \\approx (c_0^{\\text{monomer}})^{2n}\\) and the missing energy is proportional to \\((1 - c_0^2)\\). While approximate, CISD+Q often recovers 90-95% of the size-consistency error and is widely used.
</div>
</div>

<h3>Methods That Are Size Consistent</h3>

<p>Several methods have been designed to maintain size consistency:</p>
<ul>
<li><strong>Full CI</strong>: Exact, so trivially size consistent.</li>
<li><strong>Coupled Cluster (CC)</strong>: The exponential ansatz \\(e^{\\hat{T}}|\\Phi_0\\rangle\\) automatically includes disconnected higher excitations. CCSD is size consistent (Chapter 10).</li>
<li><strong>MP2/MPn</strong>: Perturbation theory is size extensive order by order (Chapter 9).</li>
<li><strong>CEPA</strong> (Coupled Electron Pair Approximation): A modified CI that restores size consistency.</li>
</ul>
`,
            visualizations: [
                {
                    id: 'viz-size-consistency',
                    title: 'Size Consistency Failure of CISD',
                    description: 'Compare the CISD energy of n non-interacting He atoms with n times the CISD energy of one He atom. The growing gap reveals the size-consistency error.',
                    setup(body, controls) {
                        const viz = new VizEngine(body, { width: 560, height: 380, scale: 1, originX: 0, originY: 0 });

                        // Model: E_corr(He, FCI=CISD for 1 atom) = -0.042 Eh
                        const eCorr1 = -0.042;
                        // For n atoms, exact = n * eCorr1
                        // CISD misses disconnected Q: error ~ n(n-1)/2 * delta
                        const delta = 0.0015; // quadruples error per pair

                        const maxN = 10;

                        function draw() {
                            viz.clear();
                            const ctx = viz.ctx;
                            const px0 = 70, py0 = 35, plotW = 420, plotH = 280;

                            ctx.fillStyle = viz.colors.bg;
                            ctx.fillRect(0, 0, viz.width, viz.height);

                            // Compute data
                            const exactData = [];
                            const cisdData = [];
                            for (let n = 1; n <= maxN; n++) {
                                const exact = n * eCorr1;
                                const cisd = n * eCorr1 + n * (n - 1) / 2 * delta;
                                exactData.push({ n, E: exact });
                                cisdData.push({ n, E: cisd });
                            }

                            const eMin = maxN * eCorr1 - 0.05;
                            const eMax = 0.02;
                            const eRange = eMax - eMin;

                            // Axes
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1.5;
                            ctx.beginPath(); ctx.moveTo(px0, py0); ctx.lineTo(px0, py0 + plotH); ctx.lineTo(px0 + plotW, py0 + plotH); ctx.stroke();

                            // Grid
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 0.5;
                            for (let e = Math.ceil(eMin * 10) / 10; e <= eMax; e += 0.05) {
                                const y = py0 + plotH - ((e - eMin) / eRange) * plotH;
                                ctx.beginPath(); ctx.moveTo(px0, y); ctx.lineTo(px0 + plotW, y); ctx.stroke();
                            }

                            // Plot exact (green line)
                            ctx.strokeStyle = viz.colors.green;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            exactData.forEach((d, i) => {
                                const x = px0 + (d.n / maxN) * plotW;
                                const y = py0 + plotH - ((d.E - eMin) / eRange) * plotH;
                                if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
                            });
                            ctx.stroke();

                            // Plot CISD (orange line)
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            cisdData.forEach((d, i) => {
                                const x = px0 + (d.n / maxN) * plotW;
                                const y = py0 + plotH - ((d.E - eMin) / eRange) * plotH;
                                if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
                            });
                            ctx.stroke();

                            // Points and error bars
                            for (let i = 0; i < maxN; i++) {
                                const xp = px0 + ((i + 1) / maxN) * plotW;
                                const yExact = py0 + plotH - ((exactData[i].E - eMin) / eRange) * plotH;
                                const yCISD = py0 + plotH - ((cisdData[i].E - eMin) / eRange) * plotH;

                                // Error shading
                                ctx.fillStyle = viz.colors.red + '22';
                                ctx.fillRect(xp - 8, yCISD, 16, yExact - yCISD);

                                // Points
                                ctx.fillStyle = viz.colors.green;
                                ctx.beginPath(); ctx.arc(xp, yExact, 4, 0, Math.PI * 2); ctx.fill();
                                ctx.fillStyle = viz.colors.orange;
                                ctx.beginPath(); ctx.arc(xp, yCISD, 4, 0, Math.PI * 2); ctx.fill();

                                // n label
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '10px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText(i + 1, xp, py0 + plotH + 14);
                            }

                            // Legend
                            ctx.fillStyle = viz.colors.green;
                            ctx.fillRect(px0 + plotW - 180, py0 + 10, 12, 3);
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('Exact: n \u00D7 E(He)', px0 + plotW - 163, py0 + 15);
                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillRect(px0 + plotW - 180, py0 + 28, 12, 3);
                            ctx.fillText('CISD(n He)', px0 + plotW - 163, py0 + 33);
                            ctx.fillStyle = viz.colors.red + '44';
                            ctx.fillRect(px0 + plotW - 180, py0 + 43, 12, 8);
                            ctx.fillStyle = viz.colors.red;
                            ctx.fillText('Size-consistency error', px0 + plotW - 163, py0 + 51);

                            // Axis labels
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Number of He atoms (n)', px0 + plotW / 2, py0 + plotH + 30);
                            ctx.save();
                            ctx.translate(15, py0 + plotH / 2);
                            ctx.rotate(-Math.PI / 2);
                            ctx.fillText('Correlation energy (Eh)', 0, 0);
                            ctx.restore();

                            // Title
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.fillText('Size Consistency Failure: CISD vs Exact for n He atoms', px0 + plotW / 2, 18);

                            // Error annotation
                            const errN = maxN;
                            const err = cisdData[errN - 1].E - exactData[errN - 1].E;
                            ctx.fillStyle = viz.colors.red;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'right';
                            ctx.fillText('Error at n=' + errN + ': ' + (err * 627.5).toFixed(1) + ' kcal/mol', px0 + plotW, py0 + plotH - 10);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show explicitly that for two non-interacting He atoms, the exact wavefunction requires quadruple excitations that CISD cannot describe.',
                    hint: 'Write the exact wavefunction as a product \\(|\\Psi\\rangle = |\\Psi_A\\rangle \\otimes |\\Psi_B\\rangle\\) and expand each factor in its CI form.',
                    solution: 'For each He atom, CISD is exact: \\(|\\Psi_A\\rangle = c_0^A|\\Phi_0^A\\rangle + c_D^A|\\Phi_D^A\\rangle\\) (and similarly for B). The product wavefunction is \\(|\\Psi\\rangle = c_0^A c_0^B |\\Phi_0^A\\Phi_0^B\\rangle + c_0^A c_D^B |\\Phi_0^A\\Phi_D^B\\rangle + c_D^A c_0^B |\\Phi_D^A\\Phi_0^B\\rangle + c_D^A c_D^B |\\Phi_D^A\\Phi_D^B\\rangle\\). The last term \\(c_D^A c_D^B |\\Phi_D^A\\Phi_D^B\\rangle\\) is a quadruple excitation relative to the full-system HF determinant, since both atoms are doubly excited simultaneously. CISD cannot include this term, leading to the size-consistency error.'
                },
                {
                    question: 'Estimate the Davidson correction \\(\\Delta E_Q\\) for a CISD calculation where \\(c_0 = 0.95\\) and \\(E_{\\text{corr}}^{\\text{CISD}} = -0.300\\) Eh.',
                    hint: 'Use \\(\\Delta E_Q \\approx (1 - c_0^2) \\cdot E_{\\text{corr}}^{\\text{CISD}}\\).',
                    solution: '\\(\\Delta E_Q \\approx (1 - 0.95^2) \\times (-0.300) = (1 - 0.9025) \\times (-0.300) = 0.0975 \\times (-0.300) = -0.02925\\) Eh \\(\\approx -18.4\\) kcal/mol. This is a significant correction, indicating that quadruple excitations contribute roughly 10% additional correlation energy.'
                },
                {
                    question: 'Why is Coupled Cluster (CCSD) size consistent while CISD is not, even though both methods truncate at doubles?',
                    hint: 'Consider the exponential ansatz \\(e^{\\hat{T}_1 + \\hat{T}_2}|\\Phi_0\\rangle\\) vs. the linear ansatz \\((1 + \\hat{C}_1 + \\hat{C}_2)|\\Phi_0\\rangle\\).',
                    solution: 'The CC exponential ansatz \\(e^{\\hat{T}}\\) automatically generates "disconnected" higher excitations: \\(e^{\\hat{T}_2} = 1 + \\hat{T}_2 + \\frac{1}{2}\\hat{T}_2^2 + \\cdots\\), where \\(\\frac{1}{2}\\hat{T}_2^2\\) contains disconnected quadruples. For two non-interacting systems \\(A\\) and \\(B\\), \\(\\hat{T} = \\hat{T}_A + \\hat{T}_B\\) and \\(e^{\\hat{T}_A + \\hat{T}_B} = e^{\\hat{T}_A} e^{\\hat{T}_B}\\) (since operators on different subsystems commute), giving \\(E = E_A + E_B\\). The linear CI ansatz \\((1 + \\hat{C}_2)|\\Phi_0\\rangle\\) has no mechanism to generate the product \\(\\hat{C}_2^A \\hat{C}_2^B\\), so it misses disconnected quadruples.'
                },
                {
                    question: 'For \\(n\\) identical non-interacting molecules each with CISD correlation energy \\(\\epsilon\\), show that the size-extensivity error of CISD grows quadratically as \\(O(n^2)\\).',
                    hint: 'The CISD of the supersystem can describe at most one pair of doubles simultaneously. Count how many disconnected-quadruple pairs are missing.',
                    solution: 'The exact correlation energy is \\(n\\epsilon\\). In the supersystem, disconnected quadruples correspond to simultaneous double excitations on two different monomers. There are \\(\\binom{n}{2} = n(n-1)/2\\) such pairs. Each missing pair contributes an error \\(\\delta\\) (the product of the double-excitation coefficients). Therefore, \\(E_{\\text{CISD}}^{\\text{corr}} \\approx n\\epsilon + \\binom{n}{2}\\delta\\), and the error \\(\\binom{n}{2}\\delta = O(n^2)\\) grows quadratically. This means the error per particle grows linearly with system size, which is catastrophic for large systems.'
                },
                {
                    question: 'Is Full CI (FCI) size consistent? Is it size extensive? Justify your answer.',
                    hint: 'FCI is exact within the basis. What does "exact" imply about separability?',
                    solution: 'FCI is both size consistent and size extensive. It is size consistent because it solves the Schr\\"odinger equation exactly within the basis; for non-interacting fragments at infinite separation, the Hamiltonian is block-diagonal, and the FCI energy separates as \\(E(A \\cdots B) = E(A) + E(B)\\). It is size extensive because adding identical non-interacting fragments yields \\(E(n) = nE(1)\\) exactly, as the FCI wavefunction correctly factorizes into products when the fragments do not interact. The only caveat is that the basis set itself must be separable (no basis set superposition error), but this is a basis set issue, not a method issue.'
                }
            ]
        },

        // ========== SECTION 5: Multi-Reference CI ==========
        {
            id: 'ch08-sec05',
            title: 'Multi-Reference CI (MRCI)',
            content: `
<h2>8.5 Multi-Reference CI (MRCI)</h2>

<p>When the Hartree-Fock wavefunction is qualitatively wrong (e.g., near bond dissociation, transition states, open-shell systems), a single-reference CI fails. Multi-Reference CI (MRCI) begins with multiple reference determinants to capture static correlation, then adds dynamic correlation via excitations from each reference.</p>

<h3>When Single-Reference CI Fails</h3>

<div class="env-block example">
<div class="env-title">Example 8.5.1 (H\\(_2\\) Dissociation)</div>
<div class="env-body">
Consider \\(\\text{H}_2\\) stretching to dissociation. The RHF wavefunction
\\[
|\\Psi_{\\text{RHF}}\\rangle = |\\sigma_g \\bar{\\sigma}_g\\rangle
\\]
dissociates to a mixture of \\(\\text{H} + \\text{H}\\) and \\(\\text{H}^+ + \\text{H}^-\\), which is qualitatively incorrect. The correct wavefunction at dissociation requires two determinants:
\\[
|\\Psi\\rangle \\approx c_1 |\\sigma_g \\bar{\\sigma}_g\\rangle + c_2 |\\sigma_u^* \\bar{\\sigma}_u^*\\rangle
\\]
with \\(c_1 \\approx c_2\\) at large \\(R\\). No amount of dynamic correlation (higher excitations) can fix the qualitative failure if only one reference is used.
</div>
</div>

<h3>The MRCI Framework</h3>

<div class="env-block definition">
<div class="env-title">Definition 8.5.2 (Reference Space)</div>
<div class="env-body">
The <em>reference space</em> (or model space) \\(\\mathcal{P}\\) is a set of determinants \\(\\{|\\Phi_\\mu\\rangle\\}_{\\mu=1}^{M}\\) chosen to qualitatively describe the electronic state of interest. Typically, these are the determinants from a Complete Active Space (CAS) calculation, involving all possible distributions of \\(n\\) electrons in \\(m\\) "active" orbitals.
</div>
</div>

<div class="env-block definition">
<div class="env-title">Definition 8.5.3 (MRCI Wavefunction)</div>
<div class="env-body">
The MRCI wavefunction includes all single and double excitations from every reference determinant:
\\[
|\\Psi_{\\text{MRCI}}\\rangle = \\sum_{\\mu=1}^{M} c_\\mu |\\Phi_\\mu\\rangle + \\sum_{\\mu=1}^{M} \\sum_{ia} c_{\\mu,i}^a |\\Phi_{\\mu,i}^a\\rangle + \\sum_{\\mu=1}^{M} \\sum_{ijab} c_{\\mu,ij}^{ab} |\\Phi_{\\mu,ij}^{ab}\\rangle
\\]
This is called MR-CISD. Note that a double excitation from one reference may be a single, triple, or quadruple relative to another reference, so the effective excitation space is larger than single-reference CISD.
</div>
</div>

<h3>Complete Active Space (CAS) and the Reference</h3>

<p>The reference space is usually generated by a CASSCF (Complete Active Space Self-Consistent Field) calculation. CASSCF performs FCI within a small "active space" of orbitals while optimizing the orbitals.</p>

<div class="env-block definition">
<div class="env-title">Definition 8.5.4 (CAS(n,m))</div>
<div class="env-body">
A CAS(n,m) active space distributes \\(n\\) electrons among \\(m\\) orbitals in all possible ways. The number of CAS determinants is:
\\[
N_{\\text{CAS}} = \\binom{m}{n_\\alpha} \\binom{m}{n_\\beta}.
\\]
Typical active spaces range from CAS(2,2) (2 electrons in 2 orbitals, for H\\(_2\\) or a single bond) to CAS(14,14) (practical upper limit).
</div>
</div>

<h3>Internally Contracted MRCI (ic-MRCI)</h3>

<div class="env-block definition">
<div class="env-title">Definition 8.5.5 (Internal Contraction)</div>
<div class="env-body">
In <em>internally contracted MRCI</em> (Werner &amp; Knowles, 1988), excitations are generated from the CASSCF wavefunction as a whole, rather than from each reference determinant individually:
\\[
|\\Phi_{ij}^{ab}\\rangle_{\\text{ic}} = \\hat{E}_{ai} \\hat{E}_{bj} |\\Psi_{\\text{CAS}}\\rangle
\\]
where \\(\\hat{E}_{ai} = \\sum_\\sigma a_{a\\sigma}^\\dagger a_{i\\sigma}\\) is a singlet excitation operator. This drastically reduces the CI space from \\(M \\times O(N^2K^2)\\) to \\(O(N^2K^2)\\) (independent of the number of reference determinants), making MRCI feasible with large reference spaces.
</div>
</div>

<div class="env-block theorem">
<div class="env-title">Theorem 8.5.6</div>
<div class="env-body">
Internally contracted MRCI-SD with a CAS reference recovers both static and dynamic correlation simultaneously:
<ul>
<li>Static correlation is captured by the CAS reference (multi-determinant character).</li>
<li>Dynamic correlation is captured by the single and double excitations from the CAS.</li>
</ul>
The ic-MRCI method with the Davidson +Q correction (MRCI+Q) is one of the most accurate methods available for small to medium-sized molecules, typically achieving errors of 1-3 kcal/mol.
</div>
</div>

<h3>MRCI Size Consistency and Corrections</h3>

<p>Like single-reference CISD, MRCI-SD is not size consistent. Several corrections exist:</p>
<ul>
<li><strong>Davidson +Q</strong>: \\(\\Delta E_Q \\approx (1 - \\sum_\\mu c_\\mu^2) E_{\\text{corr}}\\)</li>
<li><strong>Pople correction</strong>: \\(E_{\\text{corr}}^{\\text{Pople}} = E_{\\text{corr}}^{\\text{MRCI}} / \\sum_\\mu c_\\mu^2\\)</li>
<li><strong>ACPF/AQCC</strong>: Size-consistency-corrected CI variants (Gdanitz &amp; Ahlrichs, 1988)</li>
</ul>

<div class="env-block remark">
<div class="env-title">Remark (Practical MRCI)</div>
<div class="env-body">
Modern MRCI implementations (e.g., in MOLPRO) can handle systems with up to ~30 correlated electrons and basis sets of moderate size (triple-zeta). The computational cost scales as \\(O(M \\cdot N^2 K^4)\\) for uncontracted MRCI and \\(O(N^2 K^4)\\) for internally contracted MRCI. Key applications include:
<ul>
<li>Accurate potential energy surfaces for small molecules</li>
<li>Spectroscopic constants (\\(r_e\\), \\(\\omega_e\\), \\(D_e\\))</li>
<li>Excited states of photochemically relevant molecules</li>
<li>Benchmark calculations for testing DFT and other methods</li>
</ul>
</div>
</div>

<div class="env-block warning">
<div class="env-title">Warning (Active Space Selection)</div>
<div class="env-body">
The choice of active space in MRCI is critical and non-trivial. An inadequate active space can miss important configurations, leading to qualitatively wrong results. General guidelines:
<ul>
<li>Include all orbitals involved in bond breaking/formation.</li>
<li>Include the corresponding antibonding orbitals.</li>
<li>Include lone pairs that participate in the chemistry.</li>
<li>Verify results by enlarging the active space and checking convergence.</li>
</ul>
</div>
</div>
`,
            visualizations: [],
            exercises: [
                {
                    question: 'For H\\(_2\\) dissociation, explain why a CAS(2,2) reference is the minimal choice for MRCI, and write out the two reference determinants.',
                    hint: 'Which orbitals are involved in the \\(\\sigma\\) bond of H\\(_2\\)?',
                    solution: 'The \\(\\sigma\\) bond in H\\(_2\\) involves the bonding orbital \\(\\sigma_g = \\frac{1}{\\sqrt{2}}(1s_A + 1s_B)\\) and the antibonding orbital \\(\\sigma_u^* = \\frac{1}{\\sqrt{2}}(1s_A - 1s_B)\\). At equilibrium, the wavefunction is dominated by \\(|\\sigma_g \\bar{\\sigma}_g\\rangle\\), but at dissociation, \\(|\\sigma_u^* \\bar{\\sigma}_u^*\\rangle\\) becomes equally important. CAS(2,2) distributes 2 electrons in these 2 orbitals, giving reference determinants \\(|\\sigma_g \\bar{\\sigma}_g\\rangle\\) and \\(|\\sigma_u^* \\bar{\\sigma}_u^*\\rangle\\). This is the minimum needed to describe dissociation correctly.'
                },
                {
                    question: 'Calculate the number of CAS determinants for CAS(6,6) (6 electrons in 6 orbitals with 3\\(\\alpha\\), 3\\(\\beta\\)).',
                    hint: 'Use \\(N_{\\text{CAS}} = \\binom{6}{3}^2\\).',
                    solution: '\\(N_{\\text{CAS}} = \\binom{6}{3}^2 = 20^2 = 400\\) determinants. This is a commonly used active space for systems like benzene (6 \\(\\pi\\) electrons in 6 \\(\\pi\\) orbitals) and is easily manageable as a reference for MRCI.'
                },
                {
                    question: 'Explain the advantage of internal contraction in MRCI. Why does it reduce the computational cost so dramatically?',
                    hint: 'Compare the number of excited determinants with and without contraction.',
                    solution: 'Without contraction, MRCI generates singles and doubles from each of the \\(M\\) reference determinants separately, giving \\(O(M \\cdot N^2 K^2)\\) excited configurations. With internal contraction, excitations are generated from the entire CAS wavefunction \\(|\\Psi_{\\text{CAS}}\\rangle = \\sum_\\mu c_\\mu |\\Phi_\\mu\\rangle\\), giving only \\(O(N^2 K^2)\\) contracted configurations (independent of \\(M\\)). For CAS(10,10) with \\(M \\approx 63{,}504\\), this is a reduction by a factor of ~60,000. The price is that the contracted functions are more complex (they are not single determinants), requiring more sophisticated integral processing.'
                },
                {
                    question: 'Why is MRCI particularly important for excited electronic states, and why might single-reference methods fail for such states?',
                    hint: 'Think about the nature of excited states and near-degeneracies.',
                    solution: 'Excited states often have multi-reference character: they may involve configurations where electrons are promoted to different virtual orbitals with similar energies, leading to near-degeneracies. For example, a \\(\\pi \\to \\pi^*\\) excited state of a conjugated molecule may mix strongly with a \\(\\sigma \\to \\pi^*\\) state at similar energy. Single-reference methods (CISD, CCSD) assume the wavefunction is dominated by one determinant, which fails when multiple configurations contribute comparably. MRCI with a CASSCF reference naturally handles these near-degeneracies by including all important configurations in the reference space.'
                },
                {
                    question: 'The ACPF (Averaged Coupled Pair Functional) method modifies the CI equations to restore size extensivity. The key idea is to add a term \\(-g_\\mu E_{\\text{corr}} c_\\mu\\) to the CI equations for each reference determinant \\(\\mu\\). What value of \\(g_\\mu\\) achieves size extensivity for \\(M\\) equivalent reference determinants?',
                    hint: 'For \\(n\\) non-interacting identical systems, the energy should scale as \\(nE_{\\text{corr}}^{(1)}\\). Derive the condition on \\(g_\\mu\\).',
                    solution: 'For ACPF with \\(M\\) equivalent references, Gdanitz and Ahlrichs showed that \\(g_\\mu = 2/M\\) restores size extensivity. The modified CI equations become \\((\\hat{H} - E_0)|\\Psi_{\\text{ext}}\\rangle = (E_{\\text{corr}} - \\frac{2}{M}E_{\\text{corr}}\\sum_\\mu |\\Phi_\\mu\\rangle\\langle\\Phi_\\mu|)|\\Psi_{\\text{ext}}\\rangle\\), which reduces to coupled-pair equations in the single-reference limit (\\(M = 1\\), \\(g = 2\\) giving CEPA(0)). The factor \\(2/M\\) ensures that disconnected quadruples are approximately accounted for, restoring the correct \\(n\\)-scaling.'
                }
            ]
        }
    ]
});
