window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch19',
    number: 19,
    title: 'Modern Methods & Frontiers',
    subtitle: 'Pushing the boundaries: from local correlation to quantum computing',
    sections: [
        // ============================================================
        // SECTION 1: Local Correlation Methods
        // ============================================================
        {
            id: 'ch19-sec01',
            title: 'Local Correlation Methods',
            content: `
                <h2>Local Correlation Methods</h2>

                <p class="section-roadmap"><strong>Section roadmap.</strong> We introduce the concept of local correlation methods, which exploit the spatial locality of electron correlation to reduce the cost of post-Hartree-Fock methods from polynomial to near-linear scaling. We cover pair natural orbitals (PNOs), domain-based local pair natural orbital CCSD(T) (DLPNO-CCSD(T)), and the rigorous theoretical foundations that guarantee these approximations converge to the canonical result.</p>

                <div class="env-block intuition">
                    <div class="env-title">Why Locality Matters</div>
                    <div class="env-body">
                        <p>Canonical CCSD(T) scales as \\(O(N^7)\\) with system size, limiting it to about 30-50 atoms with reasonable basis sets. Yet electron correlation is fundamentally a local phenomenon: the correlation energy between two electrons decays as \\(r^{-6}\\) with their separation (like London dispersion). A methyl group on one end of a protein does not need to be correlated in detail with a methyl group 20 A away. Local methods exploit this decay to achieve near-linear scaling while preserving the accuracy of the parent method.</p>
                    </div>
                </div>

                <h3>Pair Natural Orbitals</h3>

                <div class="env-block definition">
                    <div class="env-title">Definition 19.1 (Pair Natural Orbitals)</div>
                    <div class="env-body">
                        <p>For a pair of occupied orbitals \\(i, j\\), the <strong>pair density matrix</strong> is defined as</p>
                        \\[D_{ab}^{ij} = T_{ab}^{ij} + T_a^i T_b^j - T_a^j T_b^i\\]
                        <p>where \\(T_{ab}^{ij}\\) and \\(T_a^i\\) are the doubles and singles amplitudes. The <strong>pair natural orbitals</strong> (PNOs) are the eigenfunctions of \\(\\mathbf{D}^{ij}\\):</p>
                        \\[\\mathbf{D}^{ij} \\mathbf{d}_k^{ij} = n_k^{ij} \\mathbf{d}_k^{ij}\\]
                        <p>The eigenvalues \\(n_k^{ij}\\) are the pair occupation numbers. The PNOs with the largest \\(|n_k^{ij}|\\) contribute most to the pair correlation energy.</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 19.2 (PNO Truncation Error)</div>
                    <div class="env-body">
                        <p>The error in the pair correlation energy \\(e_{ij}\\) from truncating the PNO expansion at occupation number threshold \\(\\tau_{\\text{PNO}}\\) satisfies:</p>
                        \\[|\\Delta e_{ij}| \\leq C \\sum_{k : |n_k^{ij}| < \\tau_{\\text{PNO}}} |n_k^{ij}|\\]
                        <p>where \\(C\\) is a system-independent constant. Since PNO occupation numbers decay rapidly (typically exponentially for well-separated pairs), only a compact set of PNOs is needed per pair, with the number being essentially independent of total system size.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="local-correlation-domains"></div>

                <h3>DLPNO-CCSD(T)</h3>

                <div class="env-block definition">
                    <div class="env-title">Definition 19.3 (DLPNO-CCSD(T))</div>
                    <div class="env-body">
                        <p>The <strong>domain-based local pair natural orbital CCSD(T)</strong> (DLPNO-CCSD(T), Neese and coworkers) combines three approximations:</p>
                        <ol>
                            <li><strong>Pair screening:</strong> Occupied orbital pairs \\((i,j)\\) are classified as strong, weak, or distant based on their estimated pair correlation energy. Only strong pairs are treated at the CCSD level; weak pairs use MP2; distant pairs are neglected.</li>
                            <li><strong>PNO truncation:</strong> Each pair's virtual space is compressed to its dominant PNOs (typically 30-60 per pair, independent of system size).</li>
                            <li><strong>Domain construction:</strong> Projected atomic orbitals (PAOs) define spatial domains for each pair, further restricting the virtual space.</li>
                        </ol>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 19.4 (DLPNO-CCSD(T) Scaling)</div>
                    <div class="env-body">
                        <p>Under the assumptions that: (i) the system has a finite electronic gap, (ii) the occupied orbitals are localized, and (iii) the PNO truncation threshold is fixed, DLPNO-CCSD(T) achieves asymptotically <strong>linear scaling</strong> \\(O(N)\\) in the number of correlated pairs, while the PNO compression makes the prefactor manageable. In practice, near-linear scaling is observed for systems from \\(\\sim 50\\) to \\(> 1000\\) atoms.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 19.5 (DLPNO-CCSD(T) Accuracy)</div>
                    <div class="env-body">
                        <p>Benchmark studies (Liakos, Sparta, Kesharwani, Martin, Neese, JCTC 2015) show that DLPNO-CCSD(T) with "TightPNO" settings reproduces canonical CCSD(T) energies to within 0.15 kcal/mol for reaction energies and 0.3 kcal/mol for barrier heights, across diverse test sets. With "NormalPNO" settings, the mean error increases to \\(\\sim 0.5\\) kcal/mol but the calculation is 3-5 times faster.</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">The "Gold Standard" Goes Big</div>
                    <div class="env-body">
                        <p>DLPNO-CCSD(T) has been applied to systems with more than 1000 atoms and 10000 basis functions, including entire enzyme active sites, supramolecular complexes, and surface adsorbates. This was unthinkable with canonical CCSD(T). The method has become the practical "gold standard" for large molecular systems.</p>
                    </div>
                </div>

                <div class="env-block warning">
                    <div class="env-title">Caveats</div>
                    <div class="env-body">
                        <p>Local correlation methods can fail or lose accuracy when: (1) strong static correlation is present (the reference wavefunction must be well-described by a single determinant); (2) the system is metallic or has a vanishing HOMO-LUMO gap (locality breaks down); (3) very tight thresholds are needed for near-degenerate relative energies (e.g., conformational energy differences below 0.1 kcal/mol). Always compare "NormalPNO" and "TightPNO" results to assess convergence.</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'local-correlation-domains',
                    title: 'Local Correlation: PNO Domains',
                    description: 'Visualize how pair natural orbitals are localized around occupied orbital pairs. Adjust the PNO truncation threshold to see how many virtual orbitals are retained per pair. Distant pairs require fewer PNOs.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;
                        var threshold = 1e-7;
                        var thresholdExp = -7;

                        VizEngine.createSlider(controls, 'log\u2081\u2080(\u03C4_PNO): ', -10, -4, thresholdExp, 0.5, function(v) {
                            thresholdExp = v;
                            threshold = Math.pow(10, v);
                        });

                        // Simulate a chain of 8 "atoms" with localized occupied orbitals
                        var nAtoms = 8;
                        var atomX = [];
                        var atomY = [];
                        for (var i = 0; i < nAtoms; i++) {
                            atomX.push(80 + i * (viz.width - 160) / (nAtoms - 1));
                            atomY.push(viz.height / 2);
                        }

                        var selectedPair = [2, 5]; // default pair to highlight
                        var dragging = false;

                        viz.canvas.addEventListener('mousedown', function(e) {
                            var rect = viz.canvas.getBoundingClientRect();
                            var mx = e.clientX - rect.left;
                            var my = e.clientY - rect.top;
                            // Check if clicking on an atom
                            for (var i = 0; i < nAtoms; i++) {
                                if (Math.sqrt((mx - atomX[i]) * (mx - atomX[i]) + (my - atomY[i]) * (my - atomY[i])) < 18) {
                                    if (!dragging) { selectedPair[0] = i; dragging = true; }
                                    else { selectedPair[1] = i; dragging = false; }
                                    break;
                                }
                            }
                        });

                        function pnoCount(dist, thresh) {
                            // Simulate: nearby pairs need more PNOs, distant fewer
                            // PNO occupation numbers decay as ~ exp(-alpha * dist * k)
                            var baseCount = 50;
                            var alpha = 0.5;
                            var count = 0;
                            for (var k = 1; k <= baseCount; k++) {
                                var occ = Math.exp(-alpha * dist * k * 0.3);
                                if (occ >= thresh) count++;
                            }
                            return Math.max(count, 1);
                        }

                        function pairEnergy(dist) {
                            // Simulate pair correlation energy decaying as 1/r^6
                            if (dist < 0.5) return -0.05;
                            return -0.05 / Math.pow(dist, 3);
                        }

                        function draw() {
                            viz.clear();

                            // Title
                            ctx.fillStyle = viz.colors.white; ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'left'; ctx.textBaseline = 'top';
                            ctx.fillText('PNO Domain Visualization (click atoms to select pair)', 14, 10);

                            // Draw bonds
                            ctx.strokeStyle = viz.colors.muted; ctx.lineWidth = 2;
                            for (var i = 0; i < nAtoms - 1; i++) {
                                ctx.beginPath(); ctx.moveTo(atomX[i], atomY[i]); ctx.lineTo(atomX[i + 1], atomY[i + 1]); ctx.stroke();
                            }

                            // For each pair involving selected atoms, show PNO domain
                            var p0 = selectedPair[0];
                            var p1 = selectedPair[1];
                            var dist = Math.abs(p1 - p0);
                            var nPNOs = pnoCount(dist, threshold);
                            var epair = pairEnergy(dist);

                            // Highlight the selected pair's domain
                            var cx = (atomX[p0] + atomX[p1]) / 2;
                            var cy = atomY[p0];
                            var domainRadius = 20 + nPNOs * 1.5;

                            // Draw domain ellipse
                            var rx = Math.abs(atomX[p1] - atomX[p0]) / 2 + domainRadius;
                            var ry = domainRadius;
                            ctx.save();
                            ctx.beginPath();
                            ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
                            ctx.fillStyle = viz.colors.blue + '22';
                            ctx.fill();
                            ctx.strokeStyle = viz.colors.blue; ctx.lineWidth = 1.5;
                            ctx.stroke();
                            ctx.restore();

                            // Draw PNO "orbitals" as small circles within the domain
                            var pnoPerRow = Math.ceil(Math.sqrt(nPNOs));
                            var pnoSize = Math.min(8, (rx * 2 - 20) / (pnoPerRow + 1) / 2);
                            for (var k = 0; k < nPNOs; k++) {
                                var row = Math.floor(k / pnoPerRow);
                                var col = k % pnoPerRow;
                                var px = cx - (pnoPerRow - 1) * pnoSize * 1.5 / 2 + col * pnoSize * 1.5;
                                var py = cy + 30 + row * pnoSize * 1.5;
                                ctx.beginPath();
                                ctx.arc(px, py, pnoSize * 0.6, 0, Math.PI * 2);
                                var occ = Math.exp(-0.5 * dist * (k + 1) * 0.3);
                                var alpha = Math.max(0.2, Math.min(1, occ * 10));
                                ctx.fillStyle = 'rgba(88,166,255,' + alpha.toFixed(2) + ')';
                                ctx.fill();
                            }

                            // Draw atoms
                            for (var i = 0; i < nAtoms; i++) {
                                var isSelected = (i === p0 || i === p1);
                                var rad = isSelected ? 16 : 12;
                                ctx.beginPath(); ctx.arc(atomX[i], atomY[i], rad, 0, Math.PI * 2);
                                ctx.fillStyle = isSelected ? viz.colors.orange : viz.colors.teal;
                                ctx.fill();
                                ctx.fillStyle = '#000'; ctx.font = 'bold 10px -apple-system,sans-serif';
                                ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                                ctx.fillText((i + 1), atomX[i], atomY[i]);
                            }

                            // Info panel
                            ctx.fillStyle = viz.colors.white; ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'left'; ctx.textBaseline = 'top';
                            var infoY = 34;
                            ctx.fillText('Selected pair: (' + (p0 + 1) + ', ' + (p1 + 1) + ')', 14, infoY);
                            ctx.fillText('Distance: ' + dist + ' bonds', 14, infoY + 18);
                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillText('PNOs retained: ' + nPNOs, 14, infoY + 36);
                            ctx.fillStyle = viz.colors.teal;
                            ctx.fillText('Pair energy: ' + (epair * 627.5).toFixed(3) + ' kcal/mol', 14, infoY + 54);
                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillText('\u03C4_PNO = 10^(' + thresholdExp.toFixed(1) + ')', 14, infoY + 72);

                            // Classification
                            var pairClass = dist <= 1 ? 'STRONG' : (dist <= 3 ? 'WEAK' : 'DISTANT');
                            var classColor = pairClass === 'STRONG' ? viz.colors.green : (pairClass === 'WEAK' ? viz.colors.yellow : viz.colors.red);
                            ctx.fillStyle = classColor; ctx.font = 'bold 12px -apple-system,sans-serif';
                            ctx.fillText('Classification: ' + pairClass, 14, infoY + 90);

                            // Bottom legend
                            ctx.fillStyle = viz.colors.text; ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
                            ctx.fillText('Pair correlation energy \u221D 1/r\u2076 \u2014 distant pairs contribute negligibly', viz.width / 2, viz.height - 6);
                        }

                        viz.animate(draw);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Explain why electron correlation is a "local" phenomenon. What is the physical basis for the \\(r^{-6}\\) decay of pair correlation energies?',
                    hint: 'Think about how the instantaneous dipole-dipole interaction between two charge distributions decays with distance.',
                    solution: 'Electron correlation arises from the instantaneous fluctuations in electron positions. When two electrons are well-separated, their correlation is dominated by the London dispersion interaction: an instantaneous dipole on electron \\(i\\) induces a dipole on electron \\(j\\), and the resulting energy decays as \\(r^{-6}\\). More precisely, the second-order perturbation expression for the pair correlation energy involves integrals \\(\\langle ij|ab\\rangle\\) over localized orbitals, and when \\(i\\) and \\(j\\) are spatially separated, these integrals decay exponentially (charge overlap) or as powers of \\(1/r\\). The leading-order contribution for closed-shell pairs is the \\(r^{-6}\\) dispersion term. This locality is the theoretical foundation for all local correlation methods.'
                },
                {
                    question: 'In DLPNO-CCSD(T), how many PNOs are typically needed per pair, and how does this number depend on system size?',
                    hint: 'Think about what determines the number of significant PNOs: the pair density matrix structure, not the total basis set size.',
                    solution: 'Typically 30-60 PNOs per occupied pair are sufficient with TightPNO settings. Crucially, this number is independent of total system size. A nearby pair in a 50-atom molecule needs the same number of PNOs as a nearby pair in a 500-atom molecule; the pair density matrix is a local quantity that depends on the chemical environment of the two occupied orbitals, not on distant parts of the molecule. This independence is the key to achieving linear scaling: the number of significant pairs grows linearly with \\(N\\), and each pair requires a fixed-size PNO space, so total cost is \\(O(N)\\).'
                },
                {
                    question: 'A canonical CCSD(T) calculation on a 30-atom molecule with 500 basis functions takes 10 hours. Estimate the time for a 300-atom molecule with 5000 basis functions using: (a) canonical CCSD(T) (\\(O(N^7)\\)), (b) DLPNO-CCSD(T) (\\(O(N)\\)).',
                    hint: 'Use the scaling relationship: time \\(\\propto N^k\\) where \\(k\\) is the scaling exponent.',
                    solution: '(a) Canonical CCSD(T): Time \\(\\propto N^7\\). Ratio = \\((5000/500)^7 = 10^7\\). Time \\(\\approx 10 \\times 10^7 = 10^8\\) hours \\(\\approx 11{,}400\\) years. This is utterly infeasible. (b) DLPNO-CCSD(T): Time \\(\\propto N\\) (asymptotically). Ratio \\(= 5000/500 = 10\\). Time \\(\\approx 10 \\times 10 = 100\\) hours \\(\\approx 4\\) days. This is entirely feasible on a modern workstation. The contrast illustrates why local correlation methods have been transformative for computational chemistry.'
                },
                {
                    question: 'Why does the locality of correlation break down in metallic systems? What does this imply for applying DLPNO-CCSD(T) to extended metallic surfaces?',
                    hint: 'Consider the HOMO-LUMO gap and the range of electron delocalization in metals.',
                    solution: 'In metals, the HOMO-LUMO gap vanishes (or is very small), and electrons are delocalized across the entire system. The pair correlation energy no longer decays as \\(r^{-6}\\) because the occupied and virtual orbitals cannot be meaningfully localized. Instead, long-range correlation (including screening and plasmon-like excitations) persists to infinite range. DLPNO-CCSD(T) relies on pair screening and PNO truncation, both of which assume rapid spatial decay of correlations. For metals, these approximations break down: all pairs are "strong," PNO spaces cannot be compressed, and the method loses its linear-scaling advantage. For metallic surfaces, one must use either periodic CCSD(T) with specialized techniques, or embedding methods that treat only the local region near an adsorbate with DLPNO-CCSD(T).'
                },
                {
                    question: 'Compare the accuracy of DLPNO-CCSD(T)/TightPNO with DFT-D3(BJ)/def2-TZVP for non-covalent interaction energies. Which would you use for a drug-protein binding energy calculation?',
                    hint: 'Consider the S66 benchmark set errors and the system sizes typically encountered in drug binding.',
                    solution: 'On the S66 benchmark (non-covalent interactions), DLPNO-CCSD(T)/TightPNO with a CBS extrapolation gives MAE \\(\\sim 0.1\\) kcal/mol, while DFT-D3(BJ) with a good functional (e.g., \\(\\omega\\)B97X-D3) gives MAE \\(\\sim 0.3-0.5\\) kcal/mol. For drug-protein binding, the system (active site + drug) may be 200-500 atoms. DLPNO-CCSD(T) is feasible for this size but expensive (days to weeks). DFT-D3 is fast (hours) but less accurate. A practical strategy: (1) geometry optimization with DFT-D3, (2) single-point DLPNO-CCSD(T) on the optimized structure, possibly with a QM/MM partition to reduce the QM region to \\(\\sim 100\\) atoms. This gives near-chemical-accuracy binding energies at manageable cost.'
                }
            ]
        },

        // ============================================================
        // SECTION 2: Explicitly Correlated Methods
        // ============================================================
        {
            id: 'ch19-sec02',
            title: 'Explicitly Correlated Methods',
            content: `
                <h2>Explicitly Correlated Methods</h2>

                <p class="section-roadmap"><strong>Section roadmap.</strong> We examine the electron-electron cusp condition, explain why conventional orbital-based expansions converge slowly with basis set size, and show how explicitly correlated (F12/R12) methods achieve near-complete-basis-set (CBS) accuracy with modest basis sets. This is one of the most important practical advances in modern quantum chemistry.</p>

                <h3>The Coulomb Cusp Problem</h3>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 19.6 (Kato Cusp Condition)</div>
                    <div class="env-body">
                        <p>The exact electronic wavefunction \\(\\Psi\\) satisfies the <strong>Kato cusp condition</strong>: as two electrons approach each other (\\(r_{12} \\to 0\\)), the spherically averaged wavefunction behaves as</p>
                        \\[\\left\\langle \\frac{\\partial \\Psi}{\\partial r_{12}} \\right\\rangle_{r_{12}=0} = \\frac{1}{2} \\Psi(r_{12} = 0)\\]
                        <p>for opposite-spin electrons, and similarly with a factor of \\(1/4\\) for same-spin electrons. This means \\(\\Psi\\) has a cusp (a discontinuous first derivative) at the electron-electron coalescence point.</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Why the Cusp Matters</div>
                    <div class="env-body">
                        <p>The Coulomb repulsion \\(1/r_{12}\\) diverges as \\(r_{12} \\to 0\\). For the local energy \\(\\hat{H}\\Psi/\\Psi\\) to remain finite at the coalescence point, \\(\\Psi\\) must have a cusp that exactly cancels the singularity. Orbital products \\(\\phi_a(\\mathbf{r}_1)\\phi_b(\\mathbf{r}_2)\\), being smooth functions of individual coordinates, can only approximate this cusp through high-order partial wave expansions. The resulting convergence is excruciatingly slow.</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 19.7 (Convergence of Partial Wave Expansion)</div>
                    <div class="env-body">
                        <p>For an orbital-based expansion with maximum angular momentum \\(L\\), the error in the pair correlation energy converges as:</p>
                        \\[\\Delta e_{ij}(L) \\sim \\frac{C}{(L + 1/2)^3}\\]
                        <p>This \\(L^{-3}\\) convergence is extremely slow. To obtain 99% of the correlation energy, one needs \\(L \\sim 10\\) (i.e., up to k-functions in the basis), which is impractical for most molecules.</p>
                    </div>
                </div>

                <h3>The F12 Ansatz</h3>

                <div class="env-block definition">
                    <div class="env-title">Definition 19.8 (F12 Correlation Factor)</div>
                    <div class="env-body">
                        <p>Explicitly correlated methods augment the conventional cluster expansion with terms that depend explicitly on \\(r_{12}\\):</p>
                        \\[|\\Psi_{\\text{F12}}\\rangle = |\\Psi_{\\text{conv}}\\rangle + \\sum_{ij} \\sum_{kl} c_{kl}^{ij} \\hat{Q}_{12} f(r_{12}) |kl\\rangle\\]
                        <p>where \\(f(r_{12})\\) is a <strong>correlation factor</strong> (typically a Slater-type geminal \\(f(r_{12}) = -\\frac{1}{\\gamma} e^{-\\gamma r_{12}}\\)), \\(\\hat{Q}_{12}\\) is a projection operator ensuring orthogonality to the conventional space, and the sum over \\(kl\\) runs over occupied orbitals. The key insight is that \\(f(r_{12})\\) directly models the cusp, bypassing the slow partial-wave convergence.</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 19.9 (Accelerated Convergence)</div>
                    <div class="env-body">
                        <p>With the F12 correlation factor, the basis set convergence is accelerated from \\(L^{-3}\\) to approximately \\(L^{-7}\\):</p>
                        \\[\\Delta e_{ij}^{\\text{F12}}(L) \\sim \\frac{C'}{(L + 1/2)^7}\\]
                        <p>In practice, this means that an MP2-F12 or CCSD(T)-F12 calculation with a triple-zeta basis (cc-pVTZ-F12) achieves accuracy comparable to a conventional calculation with a quintuple-zeta basis (cc-pV5Z) or better.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 19.10 (Basis Set Convergence Comparison)</div>
                    <div class="env-body">
                        <p>Total atomization energy of H\\(_2\\)O (in kcal/mol, relative to CBS limit):</p>
                        <table style="width:100%; border-collapse: collapse; margin: 10px 0;">
                            <tr style="border-bottom: 1px solid #30363d;">
                                <td style="padding: 4px 8px;"><strong>Basis</strong></td>
                                <td style="padding: 4px 8px;"><strong>CCSD(T)</strong></td>
                                <td style="padding: 4px 8px;"><strong>CCSD(T)-F12b</strong></td>
                            </tr>
                            <tr style="border-bottom: 1px solid #30363d;">
                                <td style="padding: 4px 8px;">DZ</td>
                                <td style="padding: 4px 8px;">-7.2</td>
                                <td style="padding: 4px 8px;">-1.3</td>
                            </tr>
                            <tr style="border-bottom: 1px solid #30363d;">
                                <td style="padding: 4px 8px;">TZ</td>
                                <td style="padding: 4px 8px;">-2.8</td>
                                <td style="padding: 4px 8px;">-0.2</td>
                            </tr>
                            <tr style="border-bottom: 1px solid #30363d;">
                                <td style="padding: 4px 8px;">QZ</td>
                                <td style="padding: 4px 8px;">-1.1</td>
                                <td style="padding: 4px 8px;">-0.05</td>
                            </tr>
                            <tr>
                                <td style="padding: 4px 8px;">5Z</td>
                                <td style="padding: 4px 8px;">-0.4</td>
                                <td style="padding: 4px 8px;">-0.01</td>
                            </tr>
                        </table>
                        <p>CCSD(T)-F12b/TZ (modest cost) outperforms conventional CCSD(T)/5Z (very expensive).</p>
                    </div>
                </div>

                <h3>Resolution of the Identity</h3>

                <div class="env-block definition">
                    <div class="env-title">Definition 19.11 (RI Approximation in F12)</div>
                    <div class="env-body">
                        <p>The F12 approach requires many-electron integrals involving \\(f(r_{12})\\) and the Hamiltonian. These are evaluated using the <strong>resolution of the identity</strong> (RI):</p>
                        \\[\\hat{1} \\approx \\sum_{P} |P\\rangle \\langle P|\\]
                        <p>where \\(\\{|P\\rangle\\}\\) is a large auxiliary basis set (complementary auxiliary basis, CABS). The RI approximation reduces the many-electron integrals to products of two-electron integrals, making the F12 correction computationally tractable with only a modest overhead (typically 20-40%) over conventional CCSD(T).</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Practical Impact</div>
                    <div class="env-body">
                        <p>The combination of DLPNO-CCSD(T)-F12 achieves near-CBS coupled cluster accuracy for systems of 50-200 atoms. This is arguably the most powerful "black-box" method in quantum chemistry today for molecular energetics.</p>
                    </div>
                </div>
            `,
            visualizations: [],
            exercises: [
                {
                    question: 'Verify the Kato cusp condition for the helium ground state. The exact wavefunction near \\(r_{12} = 0\\) behaves as \\(\\Psi \\approx \\Psi_0(1 + r_{12}/2 + \\cdots)\\). Show that this satisfies \\(\\langle \\partial \\Psi/\\partial r_{12}\\rangle_{r_{12}=0} = \\Psi_0/2\\).',
                    hint: 'Take the derivative of \\(\\Psi \\approx \\Psi_0(1 + r_{12}/2)\\) with respect to \\(r_{12}\\) and evaluate at \\(r_{12} = 0\\).',
                    solution: 'If \\(\\Psi \\approx \\Psi_0(1 + r_{12}/2 + \\cdots)\\), then \\(\\partial \\Psi/\\partial r_{12} = \\Psi_0/2 + \\cdots\\). At \\(r_{12} = 0\\): \\(\\partial \\Psi/\\partial r_{12}|_{r_{12}=0} = \\Psi_0/2 = (1/2)\\Psi(r_{12}=0)\\). This linear dependence on \\(r_{12}\\) cancels the \\(1/r_{12}\\) singularity in the local energy: \\(\\hat{H}\\Psi/\\Psi\\) remains finite at the coalescence point. Without this cusp, the local energy would diverge, producing large variance in Monte Carlo evaluations and slow convergence in orbital expansions.'
                },
                {
                    question: 'The partial wave convergence for conventional methods is \\(L^{-3}\\), while F12 gives \\(L^{-7}\\). If a DZ basis (\\(L=1\\)) conventional calculation has a 7 kcal/mol basis set error, estimate the error for TZ (\\(L=2\\)) and QZ (\\(L=3\\)) for both conventional and F12.',
                    hint: 'Use the scaling \\(\\Delta E \\propto (L+1/2)^{-k}\\) with \\(k=3\\) (conventional) or \\(k=7\\) (F12).',
                    solution: 'Conventional (\\(k=3\\)): Error at DZ: \\(C/(1.5)^3 = 7\\), so \\(C = 23.6\\). TZ: \\(23.6/(2.5)^3 = 1.51\\) kcal/mol. QZ: \\(23.6/(3.5)^3 = 0.55\\) kcal/mol. F12 (\\(k=7\\)): Calibrate at DZ: \\(C\'/(1.5)^7 = \\Delta E_{\\text{F12,DZ}}\\). From the cusp correction, the F12 DZ error is roughly \\(7 \\times (1.5)^3/(1.5)^7 = 7/(1.5)^4 \\approx 1.38\\) kcal/mol. TZ: \\(1.38 \\times (1.5/2.5)^7 = 1.38 \\times 0.028 = 0.039\\) kcal/mol. QZ: \\(1.38 \\times (1.5/3.5)^7 = 1.38 \\times 0.0013 = 0.002\\) kcal/mol. The F12 convergence is dramatically faster.'
                },
                {
                    question: 'Why can\'t we simply add very tight (high-exponent) basis functions to model the cusp, instead of using explicit \\(r_{12}\\) dependence?',
                    hint: 'Think about how a product of one-electron functions \\(\\phi(r_1)\\phi(r_2)\\) depends on \\(r_{12}\\) and the dimensionality of the expansion.',
                    solution: 'A product of one-electron functions \\(\\phi_a(\\mathbf{r}_1)\\phi_b(\\mathbf{r}_2)\\) depends on \\(\\mathbf{r}_1\\) and \\(\\mathbf{r}_2\\) independently, not on \\(r_{12} = |\\mathbf{r}_1 - \\mathbf{r}_2|\\). To represent the cusp (a function of \\(r_{12}\\)) as a sum of products, one must perform a partial-wave expansion in the relative coordinate, which converges as \\(L^{-3}\\) regardless of how many radial functions are added at each \\(l\\). Adding tight functions improves the radial flexibility at each angular momentum but does not change the partial-wave convergence rate. The problem is fundamentally about the angular momentum expansion, not the radial one. Explicit \\(r_{12}\\) dependence bypasses this decomposition entirely.'
                },
                {
                    question: 'The F12 correlation factor \\(f(r_{12}) = -e^{-\\gamma r_{12}}/\\gamma\\) has a parameter \\(\\gamma\\). What determines the optimal value, and what happens if \\(\\gamma\\) is too large or too small?',
                    hint: 'Consider the cusp condition and the spatial range of the correlation hole.',
                    solution: 'The optimal \\(\\gamma\\) is determined by the shape of the correlation hole. The cusp condition requires \\(f\'(0) = 1/2\\), giving \\(f\'(0) = e^{-\\gamma \\cdot 0} = 1\\), so the normalization is already built in. The parameter \\(\\gamma\\) controls the range: \\(\\gamma \\approx 1.0-1.4\\) a.u. is optimal for most systems. If \\(\\gamma\\) is too large, the correlation factor decays too rapidly and captures only the very short-range cusp, missing medium-range correlation. If \\(\\gamma\\) is too small, the factor extends too far, creating near-linear dependencies with the orbital basis and numerical instabilities. In practice, \\(\\gamma = 1.0\\) a\\(_0^{-1}\\) is robust for light elements, and \\(\\gamma = 1.4\\) a\\(_0^{-1}\\) is sometimes used for heavier elements.'
                },
                {
                    question: 'Explain why the overhead of F12 over conventional CCSD(T) is only 20-40%, despite the introduction of many additional integrals.',
                    hint: 'Consider the number of F12 amplitudes vs conventional amplitudes, and the role of the RI approximation.',
                    solution: 'The number of F12 amplitudes \\(c_{kl}^{ij}\\) scales as \\(O(o^4)\\) (occupied to the fourth), which is much smaller than the number of conventional doubles amplitudes \\(T_{ab}^{ij}\\) that scale as \\(O(o^2 v^2)\\) where \\(v \\gg o\\). The expensive many-electron integrals (3- and 4-electron) are reduced to products of 2-electron integrals via the RI approximation, and the RI integrals share much of the infrastructure with conventional integrals. The F12 correction is essentially a small perturbative addition to the conventional CCSD iteration, not a separate iteration. The dominant cost step (the \\(O(N^7)\\) triples correction) is unchanged. Thus the total overhead is modest, while the accuracy gain is dramatic.'
                }
            ]
        },

        // ============================================================
        // SECTION 3: Multiscale Methods
        // ============================================================
        {
            id: 'ch19-sec03',
            title: 'Multiscale Methods',
            content: `
                <h2>Multiscale Methods</h2>

                <p class="section-roadmap"><strong>Section roadmap.</strong> We develop the theory and practice of multiscale methods that combine different levels of theory for different parts of a system. The central idea is simple but powerful: treat the chemically important region with high accuracy (QM) and the surrounding environment with a cheaper method (MM, lower-level QM, or continuum). We cover QM/MM, ONIOM, and embedding approaches.</p>

                <div class="env-block intuition">
                    <div class="env-title">The Multiscale Philosophy</div>
                    <div class="env-body">
                        <p>An enzyme has thousands of atoms, but the chemical reaction occurs in an active site of perhaps 50-100 atoms. The surrounding protein provides an electrostatic environment and steric constraints but does not directly participate in bond breaking/forming. It would be wasteful to treat the entire protein at the CCSD(T) level; it would be inaccurate to treat the active site with a force field. Multiscale methods achieve the best of both worlds.</p>
                    </div>
                </div>

                <h3>QM/MM: Quantum Mechanics / Molecular Mechanics</h3>

                <div class="env-block definition">
                    <div class="env-title">Definition 19.12 (QM/MM Partitioning)</div>
                    <div class="env-body">
                        <p>In a <strong>QM/MM</strong> calculation, the system is divided into:</p>
                        <ul>
                            <li><strong>QM region:</strong> Treated with a quantum mechanical method (DFT, MP2, CCSD(T), etc.). Contains the reactive site.</li>
                            <li><strong>MM region:</strong> Treated with a classical force field (AMBER, CHARMM, OPLS, etc.). Contains the environment.</li>
                        </ul>
                        <p>The total energy is</p>
                        \\[E_{\\text{QM/MM}} = E_{\\text{QM}} + E_{\\text{MM}} + E_{\\text{QM-MM}}\\]
                        <p>where \\(E_{\\text{QM-MM}}\\) is the interaction between the two regions.</p>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 19.13 (Embedding Schemes)</div>
                    <div class="env-body">
                        <p>The QM-MM interaction can be handled at different levels:</p>
                        <ul>
                            <li><strong>Mechanical embedding:</strong> The QM-MM interaction is computed entirely at the MM level. The QM calculation does not "see" the MM charges. Simplest but least accurate.</li>
                            <li><strong>Electrostatic embedding:</strong> The MM point charges are included in the QM Hamiltonian as external charges. The QM region is polarized by the environment. This is the standard approach.</li>
                            <li><strong>Polarizable embedding:</strong> The MM region has induced dipoles that respond to the QM density. The QM and MM regions mutually polarize each other. Most accurate but most expensive.</li>
                        </ul>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="qmmm-layers"></div>

                <h3>ONIOM</h3>

                <div class="env-block definition">
                    <div class="env-title">Definition 19.14 (ONIOM: Our own N-layered Integrated molecular Orbital and Molecular mechanics)</div>
                    <div class="env-body">
                        <p>ONIOM (Morokuma and coworkers) is a subtractive embedding scheme. For a two-layer ONIOM calculation:</p>
                        \\[E_{\\text{ONIOM2}} = E_{\\text{high}}^{\\text{model}} + E_{\\text{low}}^{\\text{real}} - E_{\\text{low}}^{\\text{model}}\\]
                        <p>where "model" is the small QM region, "real" is the entire system, "high" is the high-level method (e.g., CCSD(T)), and "low" is the low-level method (e.g., DFT or MM). The subtraction removes double-counting.</p>
                        <p>For three layers:</p>
                        \\[E_{\\text{ONIOM3}} = E_{\\text{high}}^{\\text{inner}} + E_{\\text{mid}}^{\\text{middle}} - E_{\\text{mid}}^{\\text{inner}} + E_{\\text{low}}^{\\text{real}} - E_{\\text{low}}^{\\text{middle}}\\]
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 19.15 (ONIOM Error Bound)</div>
                    <div class="env-body">
                        <p>The ONIOM2 energy satisfies</p>
                        \\[E_{\\text{ONIOM2}} = E_{\\text{high}}^{\\text{real}} + \\underbrace{(E_{\\text{low}}^{\\text{real}} - E_{\\text{low}}^{\\text{model}}) - (E_{\\text{high}}^{\\text{real}} - E_{\\text{high}}^{\\text{model}})}_{\\text{ONIOM error}}\\]
                        <p>The error vanishes when the low-level method reproduces the high-level interaction between model and environment exactly. In practice, the error is controlled by choosing a low-level method that captures the dominant environmental effects (electrostatics, Pauli repulsion).</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 19.16 (ONIOM for Enzyme Catalysis)</div>
                    <div class="env-body">
                        <p>In a study of cytochrome P450 catalysis, a three-layer ONIOM approach might use:</p>
                        <ul>
                            <li><strong>Inner layer (\\(\\sim 50\\) atoms):</strong> The iron-porphyrin active site + substrate, treated with B3LYP/6-311+G(2d,2p).</li>
                            <li><strong>Middle layer (\\(\\sim 300\\) atoms):</strong> Nearby protein residues, treated with PM6 (semiempirical).</li>
                            <li><strong>Outer layer (\\(\\sim 5000\\) atoms):</strong> Rest of the protein + solvent, treated with AMBER force field.</li>
                        </ul>
                    </div>
                </div>

                <h3>Density Functional Embedding</h3>

                <div class="env-block definition">
                    <div class="env-title">Definition 19.17 (Frozen Density Embedding)</div>
                    <div class="env-body">
                        <p>In <strong>frozen density embedding</strong> (FDE, Wesolowski-Warshel), the total density is partitioned: \\(\\rho_{\\text{tot}} = \\rho_A + \\rho_B\\), where \\(\\rho_A\\) is the subsystem of interest and \\(\\rho_B\\) is the frozen environment. The embedding potential acting on subsystem A is:</p>
                        \\[v_{\\text{emb}}(\\mathbf{r}) = v_{\\text{nuc}}^B(\\mathbf{r}) + \\int \\frac{\\rho_B(\\mathbf{r}')}{|\\mathbf{r} - \\mathbf{r}'|} d\\mathbf{r}' + \\frac{\\delta T_s^{\\text{nadd}}[\\rho_A, \\rho_B]}{\\delta \\rho_A} + \\frac{\\delta E_{xc}^{\\text{nadd}}[\\rho_A, \\rho_B]}{\\delta \\rho_A}\\]
                        <p>where \\(T_s^{\\text{nadd}}\\) and \\(E_{xc}^{\\text{nadd}}\\) are the non-additive kinetic energy and exchange-correlation functionals. FDE is formally exact but requires approximations for the non-additive kinetic energy.</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">WFT-in-DFT Embedding</div>
                    <div class="env-body">
                        <p>A powerful modern variant embeds a wavefunction theory (WFT) calculation (e.g., CCSD(T)) within a DFT environment. The DFT density provides the embedding potential for the WFT subsystem, allowing coupled-cluster accuracy for the active site with DFT cost for the environment. This "WFT-in-DFT" approach (Manby, Miller, Carter) is increasingly used for surface chemistry and enzymatic reactions.</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'qmmm-layers',
                    title: 'QM/MM Layer Diagram',
                    description: 'Interactive visualization of QM/MM partitioning. Click the buttons to toggle between mechanical, electrostatic, and polarizable embedding. The inner region (orange) is QM; the outer region (blue) is MM. Charges and polarization effects are shown.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;
                        var embedType = 'electrostatic';

                        VizEngine.createButton(controls, 'Mechanical', function() { embedType = 'mechanical'; });
                        VizEngine.createButton(controls, 'Electrostatic', function() { embedType = 'electrostatic'; });
                        VizEngine.createButton(controls, 'Polarizable', function() { embedType = 'polarizable'; });

                        var cx = viz.width / 2, cy = viz.height / 2;
                        var time = 0;

                        // Generate MM "atoms" in outer ring
                        var mmAtoms = [];
                        for (var i = 0; i < 24; i++) {
                            var angle = (i / 24) * Math.PI * 2 + Math.random() * 0.2;
                            var r = 120 + Math.random() * 60;
                            mmAtoms.push({
                                x: cx + r * Math.cos(angle),
                                y: cy + r * Math.sin(angle),
                                charge: (Math.random() > 0.5 ? 1 : -1) * (0.2 + Math.random() * 0.8),
                                angle: angle
                            });
                        }

                        // QM atoms in inner region
                        var qmAtoms = [
                            {x: cx - 20, y: cy - 15, label: 'Fe', color: '#e88'},
                            {x: cx + 25, y: cy - 10, label: 'O', color: '#f44'},
                            {x: cx - 10, y: cy + 25, label: 'N', color: '#44f'},
                            {x: cx + 15, y: cy + 20, label: 'N', color: '#44f'},
                            {x: cx - 30, y: cy + 10, label: 'N', color: '#44f'},
                            {x: cx + 5, y: cy - 30, label: 'N', color: '#44f'},
                            {x: cx + 40, y: cy + 5, label: 'C', color: '#888'},
                            {x: cx - 40, y: cy - 5, label: 'C', color: '#888'}
                        ];

                        function draw() {
                            time += 0.02;
                            viz.clear();

                            // Draw MM region background
                            ctx.beginPath(); ctx.arc(cx, cy, 190, 0, Math.PI * 2);
                            ctx.fillStyle = '#0a1530'; ctx.fill();
                            ctx.strokeStyle = viz.colors.blue + '44'; ctx.lineWidth = 2; ctx.stroke();

                            // Draw QM region background
                            ctx.beginPath(); ctx.arc(cx, cy, 65, 0, Math.PI * 2);
                            ctx.fillStyle = '#1a0a00'; ctx.fill();
                            ctx.strokeStyle = viz.colors.orange; ctx.lineWidth = 2; ctx.stroke();

                            // Region labels
                            ctx.fillStyle = viz.colors.orange; ctx.font = 'bold 11px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                            ctx.fillText('QM Region', cx, cy + 55);
                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillText('MM Region', cx, cy + 175);

                            // Draw embedding effects
                            if (embedType === 'electrostatic' || embedType === 'polarizable') {
                                // Draw field lines from MM charges into QM region
                                for (var i = 0; i < mmAtoms.length; i++) {
                                    var mm = mmAtoms[i];
                                    if (Math.abs(mm.charge) > 0.5) {
                                        var dx = cx - mm.x, dy = cy - mm.y;
                                        var d = Math.sqrt(dx * dx + dy * dy);
                                        var nx = dx / d, ny = dy / d;
                                        // Draw dashed line towards QM region
                                        ctx.strokeStyle = mm.charge > 0 ? '#ff444444' : '#4444ff44';
                                        ctx.lineWidth = 1;
                                        ctx.setLineDash([3, 5]);
                                        ctx.beginPath();
                                        ctx.moveTo(mm.x + nx * 12, mm.y + ny * 12);
                                        ctx.lineTo(mm.x + nx * (d - 65), mm.y + ny * (d - 65));
                                        ctx.stroke();
                                        ctx.setLineDash([]);
                                    }
                                }
                            }

                            if (embedType === 'polarizable') {
                                // Draw induced dipoles on MM atoms
                                for (var i = 0; i < mmAtoms.length; i++) {
                                    var mm = mmAtoms[i];
                                    var dx = cx - mm.x, dy = cy - mm.y;
                                    var d = Math.sqrt(dx * dx + dy * dy);
                                    var nx = dx / d, ny = dy / d;
                                    // Small arrow for induced dipole
                                    var arrowLen = 12 + 4 * Math.sin(time + i);
                                    ctx.strokeStyle = viz.colors.green + '88'; ctx.lineWidth = 1.5;
                                    ctx.beginPath();
                                    ctx.moveTo(mm.x - nx * arrowLen / 2, mm.y - ny * arrowLen / 2);
                                    ctx.lineTo(mm.x + nx * arrowLen / 2, mm.y + ny * arrowLen / 2);
                                    ctx.stroke();
                                    // Arrowhead
                                    ctx.fillStyle = viz.colors.green + '88';
                                    ctx.beginPath();
                                    ctx.moveTo(mm.x + nx * arrowLen / 2, mm.y + ny * arrowLen / 2);
                                    ctx.lineTo(mm.x + nx * arrowLen / 2 - nx * 5 + ny * 3, mm.y + ny * arrowLen / 2 - ny * 5 - nx * 3);
                                    ctx.lineTo(mm.x + nx * arrowLen / 2 - nx * 5 - ny * 3, mm.y + ny * arrowLen / 2 - ny * 5 + nx * 3);
                                    ctx.closePath(); ctx.fill();
                                }
                            }

                            // Draw MM atoms
                            for (var i = 0; i < mmAtoms.length; i++) {
                                var mm = mmAtoms[i];
                                ctx.beginPath(); ctx.arc(mm.x, mm.y, 6, 0, Math.PI * 2);
                                ctx.fillStyle = mm.charge > 0 ? '#ff6666' : '#6666ff';
                                ctx.fill();
                                if (embedType !== 'mechanical') {
                                    ctx.fillStyle = viz.colors.text; ctx.font = '8px -apple-system,sans-serif';
                                    ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                                    ctx.fillText((mm.charge > 0 ? '+' : '') + mm.charge.toFixed(1), mm.x, mm.y + 8);
                                }
                            }

                            // Draw QM atoms
                            for (var i = 0; i < qmAtoms.length; i++) {
                                var qm = qmAtoms[i];
                                ctx.beginPath(); ctx.arc(qm.x, qm.y, 9, 0, Math.PI * 2);
                                ctx.fillStyle = qm.color; ctx.fill();
                                ctx.fillStyle = '#fff'; ctx.font = 'bold 8px -apple-system,sans-serif';
                                ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                                ctx.fillText(qm.label, qm.x, qm.y);
                            }

                            // Draw bonds in QM region
                            ctx.strokeStyle = viz.colors.orange + '88'; ctx.lineWidth = 1.5;
                            var bonds = [[0,2],[0,3],[0,4],[0,5],[0,1],[2,7],[3,6]];
                            for (var b = 0; b < bonds.length; b++) {
                                var a1 = qmAtoms[bonds[b][0]], a2 = qmAtoms[bonds[b][1]];
                                ctx.beginPath(); ctx.moveTo(a1.x, a1.y); ctx.lineTo(a2.x, a2.y); ctx.stroke();
                            }

                            // Boundary indicator
                            ctx.strokeStyle = viz.colors.yellow + '88'; ctx.lineWidth = 1;
                            ctx.setLineDash([4, 4]);
                            ctx.beginPath(); ctx.arc(cx, cy, 65, 0, Math.PI * 2); ctx.stroke();
                            ctx.setLineDash([]);

                            // Info panel
                            ctx.fillStyle = viz.colors.white; ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'left'; ctx.textBaseline = 'top';
                            var embedLabel = embedType.charAt(0).toUpperCase() + embedType.slice(1);
                            ctx.fillText(embedLabel + ' Embedding', 14, 14);

                            ctx.font = '11px -apple-system,sans-serif'; ctx.fillStyle = viz.colors.text;
                            if (embedType === 'mechanical') {
                                ctx.fillText('QM region does not see MM charges', 14, 34);
                                ctx.fillText('Cheapest but least accurate', 14, 50);
                            } else if (embedType === 'electrostatic') {
                                ctx.fillText('MM charges enter QM Hamiltonian', 14, 34);
                                ctx.fillText('QM density polarized by environment', 14, 50);
                            } else {
                                ctx.fillText('Mutual polarization: QM \u2194 MM', 14, 34);
                                ctx.fillText('Induced dipoles on MM atoms', 14, 50);
                                ctx.fillStyle = viz.colors.green;
                                ctx.fillText('\u2192 = induced dipole', 14, 66);
                            }

                            // Energy equation
                            ctx.fillStyle = viz.colors.yellow; ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
                            ctx.fillText('E = E_QM + E_MM + E_QM-MM', viz.width / 2, viz.height - 8);
                        }

                        viz.animate(draw);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'In a QM/MM study of an enzymatic reaction, you find that the barrier height changes by 5 kcal/mol when you switch from mechanical to electrostatic embedding. What does this indicate about the role of the protein environment?',
                    hint: 'Mechanical embedding misses the effect of the environment\'s electric field on the QM region.',
                    solution: 'A 5 kcal/mol change indicates that the electrostatic environment of the protein has a significant catalytic effect. The MM charges create an electric field that stabilizes the transition state relative to the reactants (or destabilizes the reactants relative to the TS). With mechanical embedding, this stabilization is missed because the QM calculation is performed in vacuum; only the QM-MM van der Waals and bonded interactions are included. A 5 kcal/mol effect is chemically significant (roughly 4 orders of magnitude in rate constant at 300 K). This finding would support the "electrostatic catalysis" hypothesis for the enzyme.'
                },
                {
                    question: 'Derive the ONIOM2 extrapolation formula \\(E_{\\text{ONIOM2}} = E_{\\text{high}}^{\\text{model}} + E_{\\text{low}}^{\\text{real}} - E_{\\text{low}}^{\\text{model}}\\) from the assumption that the high-level correction to the model system is transferable.',
                    hint: 'Define the "high-level correction" as \\(\\Delta = E_{\\text{high}}^{\\text{model}} - E_{\\text{low}}^{\\text{model}}\\). The ONIOM assumption is that this correction applies to the whole system.',
                    solution: 'Define the high-level correction: \\(\\Delta = E_{\\text{high}}^{\\text{model}} - E_{\\text{low}}^{\\text{model}}\\). This measures the difference between the high and low levels of theory for the model system. The ONIOM assumption is that this correction is approximately the same for the real (full) system: \\(E_{\\text{high}}^{\\text{real}} \\approx E_{\\text{low}}^{\\text{real}} + \\Delta\\). Substituting: \\(E_{\\text{high}}^{\\text{real}} \\approx E_{\\text{low}}^{\\text{real}} + E_{\\text{high}}^{\\text{model}} - E_{\\text{low}}^{\\text{model}} = E_{\\text{ONIOM2}}\\). The approximation is exact when the environment effect is the same at both levels of theory.'
                },
                {
                    question: 'In a QM/MM calculation with electrostatic embedding, the QM boundary cuts through a C-C bond. Explain the "link atom" approach and potential pitfalls.',
                    hint: 'What happens to the dangling bond when you cut a covalent bond at the QM/MM boundary?',
                    solution: 'When the QM/MM boundary cuts through a covalent bond, the QM atom has a dangling bond. The link atom approach places a hydrogen atom (the link atom) along the cut bond to saturate the valence. Pitfalls: (1) The link atom introduces artificial polarity at the boundary (C-H vs C-C has different electronegativity). (2) If MM charges near the boundary are included in the QM Hamiltonian, they can overpolarize the electron density near the link atom ("charge leak"). Common fixes include zeroing or redistributing MM charges near the boundary (charge shift scheme). (3) The link atom changes the geometry; the C-H bond is shorter than C-C, so the link atom position must be carefully defined (usually scaled along the original C-C bond direction). Alternative approaches include frozen localized orbitals or generalized hybrid orbital (GHO) methods.'
                },
                {
                    question: 'A frozen density embedding (FDE) calculation uses an approximate non-additive kinetic energy functional \\(T_s^{\\text{nadd}}\\). Why is this functional needed, and why is it problematic?',
                    hint: 'Consider what happens when you partition the kinetic energy \\(T_s[\\rho_{\\text{tot}}]\\) into subsystem contributions.',
                    solution: 'The Kohn-Sham kinetic energy is not additive: \\(T_s[\\rho_A + \\rho_B] \\neq T_s[\\rho_A] + T_s[\\rho_B]\\). The difference is the non-additive kinetic energy \\(T_s^{\\text{nadd}}[\\rho_A, \\rho_B] = T_s[\\rho_A + \\rho_B] - T_s[\\rho_A] - T_s[\\rho_B]\\). This functional is unknown and must be approximated. The problem is that no good local or semi-local approximation exists when the subsystem densities overlap significantly (e.g., when there are covalent bonds across the boundary). The Thomas-Fermi and related kinetic energy functionals fail for this case because they cannot describe shell structure. This limits FDE to systems where the subsystems are weakly overlapping (e.g., solute in solvent). For covalently bonded partitions, projection-based embedding (Manby, Miller) avoids the kinetic energy functional entirely by using level-shift operators.'
                },
                {
                    question: 'Compare QM/MM and ONIOM for computing the proton affinity of a histidine residue in a protein. What are the advantages and disadvantages of each?',
                    hint: 'Consider how each method handles the interaction between the QM and MM regions, and the ease of computing energy differences.',
                    solution: 'For the proton affinity of a histidine residue: <strong>QM/MM (electrostatic embedding):</strong> Advantages: (1) the QM wavefunction is directly polarized by the protein electric field; (2) the protonation-induced change in the QM density feeds back into the QM-MM electrostatic interaction. Disadvantages: (1) requires careful choice of QM region boundary; (2) force field parameters must be compatible; (3) MM charges may not be optimized for the specific protonation state. <strong>ONIOM:</strong> Advantages: (1) simpler implementation; (2) no need for force field parameters (can use DFT as the low level); (3) systematic improvability by enlarging the model system. Disadvantages: (1) with mechanical embedding, the QM region is not polarized by the environment; (2) the ONIOM error depends on how well the low-level method captures the environmental effect on proton affinity; (3) with electronic embedding, results depend on the charge model used. For this application, QM/MM with electrostatic embedding is generally preferred because the electrostatic environment is the dominant factor in pKa shifts.'
                }
            ]
        },

        // ============================================================
        // SECTION 4: Machine Learning in Quantum Chemistry
        // ============================================================
        {
            id: 'ch19-sec04',
            title: 'Machine Learning in Quantum Chemistry',
            content: `
                <h2>Machine Learning in Quantum Chemistry</h2>

                <p class="section-roadmap"><strong>Section roadmap.</strong> We survey the rapidly growing intersection of machine learning (ML) and quantum chemistry. We cover neural network potentials, kernel-based methods, molecular descriptors, delta-learning, and the fundamental question of when ML can and cannot replace first-principles calculations. The key insight is that ML excels at interpolation within a learned chemical space but cannot reliably extrapolate to genuinely new chemistry.</p>

                <h3>The Promise and the Problem</h3>

                <div class="env-block intuition">
                    <div class="env-title">Why ML for Quantum Chemistry?</div>
                    <div class="env-body">
                        <p>A single CCSD(T)/CBS energy evaluation on a 50-atom molecule takes hours. A molecular dynamics simulation requiring millions of energy evaluations is therefore impossible at this level. But if we could train an ML model on thousands of CCSD(T) data points and then evaluate the model in milliseconds, we could perform ab initio-quality simulations on previously inaccessible timescales. This is the promise of ML potentials.</p>
                    </div>
                </div>

                <h3>Molecular Descriptors and Representations</h3>

                <div class="env-block definition">
                    <div class="env-title">Definition 19.18 (Molecular Descriptor Requirements)</div>
                    <div class="env-body">
                        <p>A molecular descriptor \\(\\mathbf{d}(\\{\\mathbf{R}_I, Z_I\\})\\) maps atomic positions \\(\\{\\mathbf{R}_I\\}\\) and nuclear charges \\(\\{Z_I\\}\\) to a fixed-length vector suitable for ML. A good descriptor must satisfy:</p>
                        <ol>
                            <li><strong>Invariance:</strong> Unchanged under translation, rotation, and reflection of the molecule.</li>
                            <li><strong>Permutation symmetry:</strong> Unchanged under relabeling of identical atoms.</li>
                            <li><strong>Uniqueness (faithfulness):</strong> Different structures map to different descriptors (up to symmetry).</li>
                            <li><strong>Continuity:</strong> Small changes in geometry produce small changes in the descriptor.</li>
                            <li><strong>Locality:</strong> Decomposable into atomic contributions for extensive properties (energy).</li>
                        </ol>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 19.19 (Common Descriptors)</div>
                    <div class="env-body">
                        <p><strong>Atom-Centered Symmetry Functions (ACSFs, Behler):</strong> Radial \\(G_i^2 = \\sum_j e^{-\\eta(R_{ij} - R_s)^2} f_c(R_{ij})\\) and angular \\(G_i^4 = 2^{1-\\zeta} \\sum_{j,k} (1 + \\cos(\\theta_{ijk} - \\theta_s))^\\zeta e^{-\\eta(R_{ij}^2 + R_{ik}^2 + R_{jk}^2)} f_c(R_{ij})f_c(R_{ik})\\) functions describe the local chemical environment of each atom.</p>
                        <p><strong>Smooth Overlap of Atomic Positions (SOAP):</strong> Rotationally invariant power spectrum of the atomic neighbor density, based on spherical harmonic expansion.</p>
                        <p><strong>Coulomb matrix:</strong> \\(M_{IJ} = Z_I Z_J / R_{IJ}\\) for \\(I \\neq J\\), \\(M_{II} = 0.5 Z_I^{2.4}\\). Simple but not systematic.</p>
                    </div>
                </div>

                <h3>Neural Network Potentials</h3>

                <div class="env-block definition">
                    <div class="env-title">Definition 19.20 (High-Dimensional Neural Network Potential)</div>
                    <div class="env-body">
                        <p>In the Behler-Parrinello scheme, the total energy is decomposed into atomic contributions:</p>
                        \\[E = \\sum_I E_I^{\\text{NN}}(\\mathbf{G}_I)\\]
                        <p>where \\(\\mathbf{G}_I\\) is the vector of symmetry functions for atom \\(I\\), and \\(E_I^{\\text{NN}}\\) is a feedforward neural network. Each element type has its own network architecture. Forces are obtained by automatic differentiation: \\(\\mathbf{F}_I = -\\partial E / \\partial \\mathbf{R}_I\\).</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 19.21 (Modern ML Potentials)</div>
                    <div class="env-body">
                        <p>State-of-the-art architectures include:</p>
                        <ul>
                            <li><strong>SchNet / PaiNN / DimeNet:</strong> Message-passing neural networks that learn representations from atomic positions and charges directly, bypassing hand-crafted descriptors.</li>
                            <li><strong>NequIP / MACE:</strong> Equivariant neural networks that respect E(3) symmetry by construction, achieving higher data efficiency.</li>
                            <li><strong>ANI:</strong> Transferable neural network potentials trained on large DFT datasets, covering CHNO elements with near-DFT accuracy.</li>
                        </ul>
                    </div>
                </div>

                <h3>Delta-Learning</h3>

                <div class="env-block definition">
                    <div class="env-title">Definition 19.22 (Delta-Learning)</div>
                    <div class="env-body">
                        <p><strong>Delta-learning</strong> (\\(\\Delta\\)-ML) trains the ML model not on the target property directly, but on the <em>difference</em> between a cheap baseline (e.g., DFT) and the expensive target (e.g., CCSD(T)):</p>
                        \\[E_{\\text{predict}} = E_{\\text{DFT}}(\\mathbf{R}) + \\Delta E_{\\text{ML}}(\\mathbf{R})\\]
                        <p>where \\(\\Delta E_{\\text{ML}}\\) is trained on \\(\\{\\mathbf{R}_i, E_{\\text{CCSD(T)}}(\\mathbf{R}_i) - E_{\\text{DFT}}(\\mathbf{R}_i)\\}\\). Since the correction \\(\\Delta E\\) is typically smoother and smaller than the total energy, delta-learning requires fewer training points and generalizes better.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="method-accuracy-cost"></div>

                <div class="env-block warning">
                    <div class="env-title">The Extrapolation Problem</div>
                    <div class="env-body">
                        <p>ML potentials are interpolation machines. They work well within the training distribution but can fail catastrophically outside it. Unlike physics-based methods, an ML potential gives no warning when it encounters an unfamiliar structure; it simply produces a (possibly wildly wrong) prediction with apparent confidence. Strategies to mitigate this include: (1) active learning (detect uncertain predictions and add them to the training set), (2) committee models (train multiple models and flag disagreements), and (3) physical constraints (enforce known symmetries, long-range behavior, dissociation limits).</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'method-accuracy-cost',
                    title: 'Method Accuracy vs Computational Cost',
                    description: 'Interactive Pareto frontier showing the trade-off between accuracy (mean absolute error on benchmark sets) and computational cost (wall time for a typical 50-atom molecule). ML methods can shift the frontier dramatically.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;
                        var showML = true;

                        VizEngine.createButton(controls, 'Toggle ML Methods', function() { showML = !showML; });

                        // Methods: {name, cost (log10 seconds), error (kcal/mol), color, category}
                        var methods = [
                            {name: 'HF', cost: 1.5, error: 8.0, color: '#888888', cat: 'ab initio'},
                            {name: 'B3LYP', cost: 2.0, error: 3.5, color: '#58a6ff', cat: 'DFT'},
                            {name: '\u03C9B97X-D', cost: 2.3, error: 2.0, color: '#3fb9a0', cat: 'DFT'},
                            {name: 'M06-2X', cost: 2.2, error: 2.2, color: '#3fb950', cat: 'DFT'},
                            {name: 'DSD-PBEP86', cost: 3.0, error: 1.2, color: '#d29922', cat: 'DH-DFT'},
                            {name: 'MP2', cost: 2.8, error: 2.5, color: '#f0883e', cat: 'ab initio'},
                            {name: 'CCSD', cost: 4.0, error: 1.0, color: '#bc8cff', cat: 'ab initio'},
                            {name: 'CCSD(T)/TZ', cost: 4.8, error: 0.5, color: '#f778ba', cat: 'ab initio'},
                            {name: 'CCSD(T)/CBS', cost: 5.5, error: 0.2, color: '#f85149', cat: 'ab initio'},
                            {name: 'DLPNO-CCSD(T)', cost: 3.5, error: 0.5, color: '#ff9900', cat: 'local'},
                            {name: 'CCSD(T)-F12/TZ', cost: 5.0, error: 0.15, color: '#ff5588', cat: 'F12'},
                            {name: 'PM7', cost: 0.5, error: 6.0, color: '#666', cat: 'SE'},
                            {name: 'GFN2-xTB', cost: 0.8, error: 4.5, color: '#999', cat: 'SE'}
                        ];

                        var mlMethods = [
                            {name: 'ANI-2x', cost: 0.3, error: 2.0, color: '#00ff88', cat: 'ML'},
                            {name: 'MACE-MP-0', cost: 0.5, error: 1.5, color: '#00ffcc', cat: 'ML'},
                            {name: '\u0394-ML(DFT\u2192CC)', cost: 2.5, error: 0.4, color: '#88ff00', cat: 'ML'},
                            {name: 'NequIP (trained)', cost: 0.2, error: 0.8, color: '#44ffaa', cat: 'ML'}
                        ];

                        var hovered = null;

                        viz.canvas.addEventListener('mousemove', function(e) {
                            var rect = viz.canvas.getBoundingClientRect();
                            var mx = e.clientX - rect.left;
                            var my = e.clientY - rect.top;
                            hovered = null;
                            var allMethods = showML ? methods.concat(mlMethods) : methods;
                            for (var i = 0; i < allMethods.length; i++) {
                                var m = allMethods[i];
                                var px = 80 + (m.cost / 6) * (viz.width - 120);
                                var py = viz.height - 50 - ((10 - m.error) / 10) * (viz.height - 90);
                                if (Math.sqrt((mx - px) * (mx - px) + (my - py) * (my - py)) < 12) {
                                    hovered = m; break;
                                }
                            }
                        });

                        function draw() {
                            viz.clear();

                            var plotL = 80, plotR = viz.width - 40, plotT = 40, plotB = viz.height - 50;

                            // Axes
                            ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1.5;
                            ctx.beginPath(); ctx.moveTo(plotL, plotB); ctx.lineTo(plotR, plotB); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(plotL, plotB); ctx.lineTo(plotL, plotT); ctx.stroke();

                            // Axis labels
                            ctx.fillStyle = viz.colors.text; ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                            ctx.fillText('Computational Cost (log\u2081\u2080 seconds)', (plotL + plotR) / 2, plotB + 20);
                            ctx.save(); ctx.translate(14, (plotT + plotB) / 2); ctx.rotate(-Math.PI / 2);
                            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                            ctx.fillText('Mean Absolute Error (kcal/mol)', 0, 0);
                            ctx.restore();

                            // Grid and tick marks
                            ctx.fillStyle = viz.colors.text; ctx.font = '9px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                            for (var t = 0; t <= 6; t++) {
                                var tx = plotL + (t / 6) * (plotR - plotL);
                                ctx.beginPath(); ctx.moveTo(tx, plotB); ctx.lineTo(tx, plotB + 4);
                                ctx.strokeStyle = viz.colors.text; ctx.lineWidth = 1; ctx.stroke();
                                ctx.fillText(t.toString(), tx, plotB + 6);
                                if (t > 0) {
                                    ctx.strokeStyle = viz.colors.grid; ctx.lineWidth = 0.5;
                                    ctx.beginPath(); ctx.moveTo(tx, plotT); ctx.lineTo(tx, plotB); ctx.stroke();
                                }
                            }
                            ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
                            for (var e = 0; e <= 10; e += 2) {
                                var ey = plotB - (e / 10) * (plotB - plotT);
                                ctx.fillText(e.toString(), plotL - 6, ey);
                                if (e > 0) {
                                    ctx.strokeStyle = viz.colors.grid; ctx.lineWidth = 0.5;
                                    ctx.beginPath(); ctx.moveTo(plotL, ey); ctx.lineTo(plotR, ey); ctx.stroke();
                                }
                            }

                            // Chemical accuracy line
                            var caY = plotB - (1 / 10) * (plotB - plotT);
                            ctx.strokeStyle = viz.colors.green + '66'; ctx.lineWidth = 1;
                            ctx.setLineDash([5, 5]);
                            ctx.beginPath(); ctx.moveTo(plotL, caY); ctx.lineTo(plotR, caY); ctx.stroke();
                            ctx.setLineDash([]);
                            ctx.fillStyle = viz.colors.green; ctx.font = '9px -apple-system,sans-serif';
                            ctx.textAlign = 'right'; ctx.textBaseline = 'bottom';
                            ctx.fillText('Chemical accuracy (1 kcal/mol)', plotR, caY - 3);

                            // Draw data points
                            var allMethods = showML ? methods.concat(mlMethods) : methods;
                            for (var i = 0; i < allMethods.length; i++) {
                                var m = allMethods[i];
                                var px = plotL + (m.cost / 6) * (plotR - plotL);
                                var py = plotB - (m.error / 10) * (plotB - plotT);
                                py = Math.max(plotT, Math.min(plotB, py));

                                var isHovered = hovered && hovered.name === m.name;
                                var rad = isHovered ? 9 : 6;

                                ctx.beginPath(); ctx.arc(px, py, rad, 0, Math.PI * 2);
                                ctx.fillStyle = m.color;
                                ctx.fill();
                                if (isHovered) {
                                    ctx.strokeStyle = '#fff'; ctx.lineWidth = 2;
                                    ctx.stroke();
                                }

                                // Label
                                ctx.fillStyle = m.color; ctx.font = '9px -apple-system,sans-serif';
                                ctx.textAlign = 'left'; ctx.textBaseline = 'bottom';
                                ctx.fillText(m.name, px + rad + 3, py - 2);
                            }

                            // Hover info
                            if (hovered) {
                                ctx.fillStyle = '#000000cc';
                                ctx.fillRect(plotR - 200, plotT, 196, 60);
                                ctx.fillStyle = hovered.color; ctx.font = 'bold 12px -apple-system,sans-serif';
                                ctx.textAlign = 'left'; ctx.textBaseline = 'top';
                                ctx.fillText(hovered.name, plotR - 192, plotT + 6);
                                ctx.fillStyle = viz.colors.text; ctx.font = '10px -apple-system,sans-serif';
                                ctx.fillText('Category: ' + hovered.cat, plotR - 192, plotT + 22);
                                ctx.fillText('Cost: 10^' + hovered.cost.toFixed(1) + ' sec', plotR - 192, plotT + 36);
                                ctx.fillText('MAE: ' + hovered.error.toFixed(2) + ' kcal/mol', plotR - 192, plotT + 50);
                            }

                            // Title
                            ctx.fillStyle = viz.colors.white; ctx.font = 'bold 12px -apple-system,sans-serif';
                            ctx.textAlign = 'left'; ctx.textBaseline = 'top';
                            ctx.fillText('Accuracy vs Cost Pareto Frontier', plotL, 10);
                            if (showML) {
                                ctx.fillStyle = viz.colors.green;
                                ctx.fillText('(ML methods shown in green)', plotL + 230, 10);
                            }
                        }

                        viz.animate(draw);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'A neural network potential trained on DFT data for liquid water is used to simulate ice nucleation. What could go wrong?',
                    hint: 'Think about the training distribution vs the target application. What structures appear during nucleation that might not be in a liquid-water training set?',
                    solution: 'Ice nucleation involves ordered crystalline structures that are absent from a liquid-water training set. The NN potential was trained on disordered liquid configurations and has never "seen" the long-range order of ice. It may: (1) assign incorrect energies to ice-like structures, potentially predicting the wrong phase diagram; (2) fail to capture the subtle energy differences between ice polymorphs (which differ by < 1 kJ/mol per molecule); (3) not correctly model the nucleation barrier, which depends on the free energy of small ice-like clusters. Solutions: use active learning to iteratively include ice and pre-critical nucleus structures in the training set; validate against known ice properties (lattice energy, density) before running nucleation simulations.'
                },
                {
                    question: 'Explain why delta-learning (\\(\\Delta\\)-ML) typically requires fewer training points than direct ML for achieving the same accuracy.',
                    hint: 'Compare the smoothness and magnitude of \\(E_{\\text{CCSD(T)}}(\\mathbf{R})\\) vs \\(E_{\\text{CCSD(T)}}(\\mathbf{R}) - E_{\\text{DFT}}(\\mathbf{R})\\).',
                    solution: 'The total potential energy surface \\(E_{\\text{CCSD(T)}}(\\mathbf{R})\\) varies over a wide range (hundreds of kcal/mol across different geometries) and has complex features (cusps, saddle points, dissociation). An ML model must learn all of this structure. The correction \\(\\Delta E = E_{\\text{CCSD(T)}} - E_{\\text{DFT}}\\) is typically much smaller (a few kcal/mol) and smoother (since DFT already captures most of the physics). The ML model only needs to learn the residual error, which is a simpler function requiring fewer training points. Additionally, the DFT baseline provides the correct qualitative behavior (correct topology of the PES, correct dissociation behavior), so the ML correction only needs to refine quantitative accuracy.'
                },
                {
                    question: 'The ANI-2x potential is trained on \\(\\sim 10^7\\) DFT data points for molecules containing H, C, N, O, F, S, Cl. Can it predict the properties of a boron-containing molecule? Why or why not?',
                    hint: 'Consider what the neural network has learned about elemental interactions.',
                    solution: 'No, ANI-2x cannot predict properties of boron-containing molecules. The model uses element-specific neural networks: each element type has its own network architecture and parameters. Boron was not in the training set, so there is no boron network. Even if one could somehow assign boron to an existing network (e.g., carbon\'s, since B is adjacent to C in the periodic table), the interaction parameters between boron and other elements have never been fitted. The model would either crash (no parameters for element B) or produce meaningless results. This highlights a fundamental limitation: ML potentials cannot extrapolate to unseen element types. Extending to boron requires retraining with boron-containing molecules in the dataset.'
                },
                {
                    question: 'A committee of 5 neural network potentials is trained on the same data but with different random initializations. For a new molecular geometry, the 5 predictions are: 10.2, 10.3, 10.1, 15.7, 10.2 kcal/mol. What should you conclude?',
                    hint: 'Look at the spread of predictions. Is the structure likely inside or outside the training distribution?',
                    solution: 'The four predictions (10.1-10.3) are tightly clustered, but one outlier (15.7) disagrees by 5.5 kcal/mol. This suggests the geometry is near the boundary of the training distribution. One of the networks has extrapolated differently in this region. Actions: (1) Flag this geometry as uncertain; the committee standard deviation is high (\\(\\sigma \\approx 2.3\\) kcal/mol). (2) Do not use the committee mean (11.3) as it is biased by the outlier. The median (10.2) is more robust. (3) Add this geometry (and similar ones) to the training set using active learning: compute the reference energy with the target method and retrain. (4) Investigate whether the outlier network has a systematic issue or if this is an isolated extrapolation artifact.'
                },
                {
                    question: 'Prove that a descriptor based on pairwise distances \\(\\{R_{IJ}\\}\\) alone cannot distinguish all molecular structures. Give a counterexample.',
                    hint: 'Consider two structures with the same set of pairwise distances but different 3D arrangements. Think about chirality.',
                    solution: 'Two enantiomers (mirror images) have identical pairwise distance matrices (\\(R_{IJ}\\) is the same for both) but are distinct structures with potentially different chemistry (e.g., different binding to a chiral receptor). More generally, a set of points can have distance-matrix degeneracies: in 3D, a "distance geometry" problem can have multiple solutions corresponding to different embeddings. Specific counterexample: consider 4 atoms at vertices of a tetrahedron labeled ABCD. The two enantiomeric arrangements (ABCD vs the mirror image) have the same 6 pairwise distances but different handedness. A descriptor based only on \\(\\{R_{IJ}\\}\\) cannot distinguish them. To break this degeneracy, one needs angular information (e.g., dihedral angles or 3-body terms) or explicitly include chirality indicators. This is why modern descriptors (ACSFs, SOAP) include 3-body angular terms.'
                }
            ]
        },

        // ============================================================
        // SECTION 5: Quantum Computing for Chemistry
        // ============================================================
        {
            id: 'ch19-sec05',
            title: 'Quantum Computing for Chemistry',
            content: `
                <h2>Quantum Computing for Chemistry</h2>

                <p class="section-roadmap"><strong>Section roadmap.</strong> We examine how quantum computers might solve the electronic structure problem. We cover the variational quantum eigensolver (VQE), quantum phase estimation (QPE), the mapping from fermionic to qubit Hamiltonians, and an honest assessment of current capabilities and limitations. The goal is neither hype nor dismissal, but a rigorous understanding of what quantum advantage means for chemistry and when it might be achieved.</p>

                <h3>The Quantum Advantage Argument</h3>

                <div class="env-block intuition">
                    <div class="env-title">Why Quantum Computers for Chemistry?</div>
                    <div class="env-body">
                        <p>The exact electronic wavefunction for \\(N\\) electrons in \\(K\\) spatial orbitals lives in a Hilbert space of dimension \\(\\binom{2K}{N}\\), which grows exponentially with system size. Classical FCI is limited to \\(\\sim 18\\) electrons in \\(\\sim 18\\) orbitals. A quantum computer with \\(2K\\) qubits can, in principle, represent the full Hilbert space and manipulate it through unitary operations, potentially solving the electronic structure problem in polynomial time.</p>
                    </div>
                </div>

                <div class="env-block warning">
                    <div class="env-title">Nuance Required</div>
                    <div class="env-body">
                        <p>The exponential advantage is not straightforward. (1) The mapping from fermions to qubits introduces overhead. (2) State preparation (finding the ground state, not just representing it) is QMA-hard in general. (3) Noise and decoherence in current quantum hardware severely limit circuit depth. (4) Classical methods (DMRG, selected CI, AFQMC) have also advanced dramatically and can handle many strongly correlated systems that were once considered "exponentially hard." Quantum advantage in chemistry has not yet been demonstrated for any problem of practical interest.</p>
                    </div>
                </div>

                <h3>Fermion-to-Qubit Mappings</h3>

                <div class="env-block definition">
                    <div class="env-title">Definition 19.23 (Jordan-Wigner Transformation)</div>
                    <div class="env-body">
                        <p>The <strong>Jordan-Wigner</strong> mapping encodes the occupation of \\(2K\\) spin-orbitals in \\(2K\\) qubits. The fermionic creation and annihilation operators are mapped as:</p>
                        \\[\\hat{a}_p^\\dagger \\mapsto \\frac{1}{2}(X_p - iY_p) \\otimes Z_{p-1} \\otimes Z_{p-2} \\otimes \\cdots \\otimes Z_0\\]
                        <p>where \\(X_p, Y_p, Z_p\\) are Pauli operators on qubit \\(p\\). The string of \\(Z\\) operators enforces fermionic antisymmetry. The electronic Hamiltonian \\(\\hat{H} = \\sum_{pq} h_{pq} \\hat{a}_p^\\dagger \\hat{a}_q + \\frac{1}{2}\\sum_{pqrs} g_{pqrs} \\hat{a}_p^\\dagger \\hat{a}_r^\\dagger \\hat{a}_s \\hat{a}_q\\) becomes a sum of Pauli strings.</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Hamiltonian Complexity</div>
                    <div class="env-body">
                        <p>The qubit Hamiltonian for a molecule with \\(K\\) spatial orbitals contains \\(O(K^4)\\) Pauli strings (from the two-electron integrals). Each string involves up to \\(2K\\) Pauli operators. Measuring the expectation value of each string requires a separate set of quantum circuit executions, making the measurement cost a significant bottleneck for near-term algorithms.</p>
                    </div>
                </div>

                <h3>Variational Quantum Eigensolver (VQE)</h3>

                <div class="env-block definition">
                    <div class="env-title">Definition 19.24 (VQE)</div>
                    <div class="env-body">
                        <p>The <strong>Variational Quantum Eigensolver</strong> is a hybrid quantum-classical algorithm:</p>
                        <ol>
                            <li>Prepare a parameterized trial state on the quantum computer: \\(|\\psi(\\boldsymbol{\\theta})\\rangle = U(\\boldsymbol{\\theta})|\\text{ref}\\rangle\\), where \\(U(\\boldsymbol{\\theta})\\) is a parameterized unitary circuit (the "ansatz").</li>
                            <li>Measure the expectation value \\(E(\\boldsymbol{\\theta}) = \\langle\\psi(\\boldsymbol{\\theta})|\\hat{H}|\\psi(\\boldsymbol{\\theta})\\rangle\\) on the quantum computer.</li>
                            <li>Use a classical optimizer to minimize \\(E(\\boldsymbol{\\theta})\\) with respect to \\(\\boldsymbol{\\theta}\\).</li>
                            <li>Iterate until convergence.</li>
                        </ol>
                        <p>By the variational principle, \\(E(\\boldsymbol{\\theta}) \\geq E_0\\) for all \\(\\boldsymbol{\\theta}\\), so the minimum gives an upper bound to the ground-state energy.</p>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 19.25 (UCCSD Ansatz)</div>
                    <div class="env-body">
                        <p>The <strong>unitary coupled cluster singles and doubles</strong> (UCCSD) ansatz is:</p>
                        \\[U(\\boldsymbol{\\theta}) = e^{\\hat{T}(\\boldsymbol{\\theta}) - \\hat{T}^\\dagger(\\boldsymbol{\\theta})}\\]
                        <p>where \\(\\hat{T} = \\hat{T}_1 + \\hat{T}_2 = \\sum_{ia} \\theta_i^a \\hat{a}_a^\\dagger \\hat{a}_i + \\sum_{ijab} \\theta_{ij}^{ab} \\hat{a}_a^\\dagger \\hat{a}_b^\\dagger \\hat{a}_j \\hat{a}_i\\). Unlike classical CCSD, UCCSD is variational (since \\(U\\) is unitary). The Trotterized circuit depth for UCCSD is \\(O(K^4)\\) gates, which is prohibitively deep for current hardware.</p>
                    </div>
                </div>

                <h3>Quantum Phase Estimation (QPE)</h3>

                <div class="env-block definition">
                    <div class="env-title">Definition 19.26 (QPE for Electronic Structure)</div>
                    <div class="env-body">
                        <p><strong>Quantum Phase Estimation</strong> extracts eigenvalues of the electronic Hamiltonian. Given an initial state \\(|\\psi_0\\rangle = \\sum_k c_k |E_k\\rangle\\) with non-negligible overlap with the ground state:</p>
                        <ol>
                            <li>Apply controlled time-evolution operators \\(e^{-i\\hat{H}t}\\) for geometrically increasing times.</li>
                            <li>Apply inverse quantum Fourier transform to an ancilla register.</li>
                            <li>Measure the ancilla to obtain the eigenvalue \\(E_0\\) with precision \\(\\epsilon\\).</li>
                        </ol>
                        <p>QPE requires a circuit depth of \\(O(1/\\epsilon)\\) and achieves the ground-state energy to precision \\(\\epsilon\\), but the deep circuits make it a "fault-tolerant era" algorithm, requiring error-corrected qubits.</p>
                    </div>
                </div>

                <h3>Current Reality and Future Outlook</h3>

                <div class="env-block example">
                    <div class="env-title">Example 19.27 (State of the Art, 2025)</div>
                    <div class="env-body">
                        <p>As of 2025, the largest quantum chemistry calculations on quantum hardware have treated systems equivalent to \\(\\sim 10-20\\) qubits with VQE on noisy intermediate-scale quantum (NISQ) devices. The results are typically less accurate than classical FCI (which solves these problems exactly) due to noise, limited circuit depth, and measurement overhead. Specific milestones:</p>
                        <ul>
                            <li>H\\(_2\\) in minimal basis (2 qubits): reproduced FCI to \\(\\sim 1\\) mHartree (2016).</li>
                            <li>LiH, BeH\\(_2\\) (6-12 qubits): errors of \\(\\sim 1-10\\) mHartree with error mitigation (2017-2020).</li>
                            <li>Active-space calculations on small transition metal systems (12-20 qubits): comparable to classical CASCI but not surpassing it (2022-2024).</li>
                        </ul>
                        <p>No quantum advantage has been demonstrated for any molecular system that a classical computer cannot solve more accurately and faster.</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 19.28 (Resource Estimates for Useful Quantum Chemistry)</div>
                    <div class="env-body">
                        <p>To solve a chemically relevant problem (e.g., the FeMoco nitrogen fixation catalyst with \\(\\sim 54\\) active orbitals) on a fault-tolerant quantum computer using QPE:</p>
                        <ul>
                            <li><strong>Logical qubits:</strong> \\(\\sim 100-200\\)</li>
                            <li><strong>T-gate count:</strong> \\(\\sim 10^{10} - 10^{12}\\)</li>
                            <li><strong>Physical qubits</strong> (with surface code, error rate \\(10^{-3}\\)): \\(\\sim 10^6 - 10^7\\)</li>
                            <li><strong>Wall time:</strong> hours to days</li>
                        </ul>
                        <p>Current quantum computers have \\(\\sim 10^2 - 10^3\\) noisy physical qubits with error rates of \\(\\sim 10^{-2} - 10^{-3}\\). The gap between current capabilities and useful quantum chemistry is at least 3-4 orders of magnitude in qubit count and several orders in error rates.</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">A Balanced Perspective</div>
                    <div class="env-body">
                        <p>Quantum computing for chemistry is a scientifically well-motivated long-term goal, not a near-term solution. The theoretical foundations are sound: QPE can, in principle, solve the electronic structure problem efficiently. But the engineering challenges are immense. Meanwhile, classical methods continue to advance: DMRG can handle \\(\\sim 50-100\\) active orbitals, AFQMC scales favorably for many systems, and ML-augmented methods are pushing the accuracy-cost frontier. The most likely near-term impact of "quantum computing for chemistry" is the development of better classical algorithms inspired by quantum information concepts (tensor networks, entanglement measures, quantum Monte Carlo improvements).</p>
                    </div>
                </div>
            `,
            visualizations: [],
            exercises: [
                {
                    question: 'How many qubits are needed to represent a molecule with \\(K = 20\\) spatial orbitals in the Jordan-Wigner encoding? What is the dimension of the full Hilbert space for \\(N = 10\\) electrons?',
                    hint: 'Each spatial orbital has two spin-orbitals. The JW encoding uses one qubit per spin-orbital.',
                    solution: 'Number of qubits = \\(2K = 40\\). The Hilbert space dimension is \\(\\binom{2K}{N} = \\binom{40}{10} = 847{,}660{,}528\\). This is about \\(8.5 \\times 10^8\\), which is at the boundary of what classical FCI can handle (requiring \\(\\sim 6\\) GB of RAM for the CI vector alone). A quantum computer with 40 qubits represents this space implicitly in its \\(2^{40} \\approx 10^{12}\\) dimensional Hilbert space. The "quantum advantage" would only manifest if the quantum algorithm can find the ground state more efficiently than classical methods (DMRG, selected CI) that exploit structure in the problem.'
                },
                {
                    question: 'In VQE, explain why the measurement cost (number of circuit executions) is a major bottleneck. If the Hamiltonian has \\(M\\) Pauli strings and you need precision \\(\\epsilon\\) in the energy, estimate the total number of measurements.',
                    hint: 'The expectation value of each Pauli string has statistical uncertainty \\(\\sim 1/\\sqrt{N_{\\text{shots}}}\\). The total energy is a sum of \\(M\\) terms.',
                    solution: 'Each Pauli string \\(P_k\\) has coefficient \\(h_k\\) and its expectation value \\(\\langle P_k \\rangle\\) is measured with uncertainty \\(\\sigma_k / \\sqrt{N_k}\\), where \\(\\sigma_k \\leq 1\\) (since Pauli eigenvalues are \\(\\pm 1\\)) and \\(N_k\\) is the number of measurement shots. The total energy uncertainty is \\(\\epsilon^2 \\leq \\sum_k h_k^2 / N_k\\). Optimizing shot allocation: \\(N_k \\propto |h_k|\\), giving total measurements \\(N_{\\text{total}} \\sim (\\sum_k |h_k|)^2 / \\epsilon^2\\). For a molecule with \\(K = 20\\) orbitals, \\(M \\sim K^4 \\sim 10^5\\) Pauli strings, and \\(\\sum |h_k| \\sim 10^2\\) (in Hartree units), so \\(N_{\\text{total}} \\sim 10^4 / \\epsilon^2\\). For chemical accuracy (\\(\\epsilon \\sim 10^{-3}\\) Hartree): \\(N_{\\text{total}} \\sim 10^{10}\\) measurements. At \\(\\sim 10^4\\) shots/second, this takes \\(\\sim 10^6\\) seconds \\(\\approx 12\\) days. This is a major practical limitation.'
                },
                {
                    question: 'The UCCSD ansatz has \\(O(N^2 K^2)\\) parameters and requires \\(O(K^4)\\) circuit depth after Trotterization. For \\(K = 50\\), estimate the circuit depth and compare to the coherence time of current superconducting qubits (\\(\\sim 100\\) \\(\\mu\\)s, gate time \\(\\sim 100\\) ns).',
                    hint: 'Estimate the number of gates and multiply by the gate time. Compare to the coherence time.',
                    solution: 'Circuit depth \\(\\sim K^4 = 50^4 = 6.25 \\times 10^6\\) gates. At 100 ns per gate: total time \\(= 6.25 \\times 10^6 \\times 100 \\times 10^{-9}\\) s \\(= 0.625\\) seconds. The coherence time is \\(100 \\times 10^{-6}\\) s \\(= 10^{-4}\\) s. The circuit time exceeds the coherence time by a factor of \\(\\sim 6000\\). The qubits would decohere long before the circuit completes, making the calculation meaningless without error correction. This is why UCCSD on real hardware is limited to very small systems (\\(K < 10\\)), and why deeper ansatze require fault-tolerant quantum computers.'
                },
                {
                    question: 'Explain why the variational principle still holds for VQE on a noisy quantum computer, and what practical problems noise introduces.',
                    hint: 'The variational principle says \\(\\langle \\psi | \\hat{H} | \\psi \\rangle \\geq E_0\\) for any state \\(|\\psi\\rangle\\). What state does a noisy circuit actually prepare?',
                    solution: 'Strictly speaking, the variational principle still holds: for <em>any</em> quantum state \\(\\rho\\) (pure or mixed), \\(\\text{Tr}(\\hat{H}\\rho) \\geq E_0\\). A noisy circuit prepares a mixed state \\(\\rho(\\boldsymbol{\\theta}) \\neq |\\psi(\\boldsymbol{\\theta})\\rangle\\langle\\psi(\\boldsymbol{\\theta})|\\), so the measured energy is still an upper bound. However, noise causes practical problems: (1) The mixed state has higher energy than the pure target state, so the variational optimization converges to a point above the noise-free minimum, potentially above the Hartree-Fock energy. (2) The energy landscape becomes flatter (the "barren plateau" problem is exacerbated by noise), making optimization difficult. (3) Error mitigation techniques (zero-noise extrapolation, probabilistic error cancellation) can partially recover the noise-free energy, but they increase the measurement cost exponentially with circuit depth.'
                },
                {
                    question: 'A news article claims "quantum computer solves chemistry problem 100x faster than any classical computer." Critically evaluate this claim. What information would you need to assess it?',
                    hint: 'Consider the problem size, the classical method used for comparison, the accuracy of the quantum result, and whether the overhead (compilation, error mitigation) is included.',
                    solution: 'To evaluate the claim, one needs: (1) <strong>Problem specification:</strong> What molecule, basis set, and target property? If it is H\\(_2\\) in STO-3G, any classical computer solves it in microseconds; a "100x speedup" would still be slower than classical in absolute terms due to overhead. (2) <strong>Classical comparison:</strong> Was the comparison against the best classical algorithm (e.g., DMRG, selected CI, AFQMC) or a naive FCI? Many "speedup" claims compare against brute-force FCI, ignoring that classical methods exploit structure. (3) <strong>Accuracy:</strong> Is the quantum result as accurate as the classical result? If the quantum energy has 10 mHartree error but the classical has 0.01 mHartree, the comparison is unfair. (4) <strong>Total cost:</strong> Does the "100x" include compilation time, error mitigation overhead, and classical pre/post-processing? (5) <strong>Scalability:</strong> Does the speedup persist for larger systems, or is it an artifact of small-system overhead? As of 2025, no credible quantum advantage claim in chemistry has survived this level of scrutiny.'
                }
            ]
        }
    ]
});
