// === Chapter 10: Coupled Cluster Theory ===
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch10',
    number: 10,
    title: 'Coupled Cluster Theory',
    subtitle: 'The gold standard: exponential ansatz and size-extensive correlation',
    sections: [
        // ========== SECTION 1: The Exponential Ansatz ==========
        {
            id: 'sec10-1-exponential-ansatz',
            title: 'The Exponential Ansatz',
            content: `
<h2>10.1 The Exponential Ansatz</h2>

<div class="env-block intuition"><div class="env-title">Intuition — Why Not Just CI?</div><div class="env-body">
Configuration interaction builds the correlated wavefunction as a linear combination of determinants: \\(|\\Psi_{\\text{CI}}\\rangle = (1 + C_1 + C_2 + \\cdots)|\\Phi_0\\rangle\\). This is conceptually clean, but truncated CI (e.g., CISD) suffers from a fatal flaw: it is <em>not size-extensive</em>. For two non-interacting helium atoms at infinite separation, CISD does not give twice the energy of a single helium atom. Coupled cluster theory cures this deficiency by replacing the linear expansion with an <em>exponential</em> one.
</div></div>

<h3>The CC Wavefunction</h3>

<p>In coupled cluster theory, the exact wavefunction is written as</p>
\\[
|\\Psi_{\\text{CC}}\\rangle = e^{\\hat{T}} |\\Phi_0\\rangle,
\\]
<p>where \\(|\\Phi_0\\rangle\\) is the Hartree-Fock reference determinant and \\(\\hat{T}\\) is the <em>cluster operator</em>. The exponential is defined by its Taylor series:</p>
\\[
e^{\\hat{T}} = 1 + \\hat{T} + \\frac{\\hat{T}^2}{2!} + \\frac{\\hat{T}^3}{3!} + \\cdots
\\]

<div class="env-block definition"><div class="env-title">Definition 10.1.1 — Coupled Cluster Wavefunction</div><div class="env-body">
The coupled cluster wavefunction is
\\[
|\\Psi_{\\text{CC}}\\rangle = e^{\\hat{T}} |\\Phi_0\\rangle,
\\]
where \\(\\hat{T} = \\hat{T}_1 + \\hat{T}_2 + \\cdots + \\hat{T}_N\\) is the cluster operator, with \\(\\hat{T}_k\\) generating all \\(k\\)-fold excitations from the reference determinant, and \\(N\\) is the number of electrons.
</div></div>

<h3>Size Extensivity from the Exponential</h3>

<p>The crucial property of the exponential ansatz is that it automatically guarantees <em>size extensivity</em>. Consider two non-interacting systems \\(A\\) and \\(B\\). If the cluster operators are additive, \\(\\hat{T} = \\hat{T}_A + \\hat{T}_B\\), then the exponential factorizes:</p>
\\[
e^{\\hat{T}_A + \\hat{T}_B} = e^{\\hat{T}_A} e^{\\hat{T}_B},
\\]
<p>because \\(\\hat{T}_A\\) and \\(\\hat{T}_B\\) act on different orbital spaces and therefore commute. The total wavefunction is the product of the subsystem wavefunctions, and the total energy is the sum of subsystem energies.</p>

<div class="env-block theorem"><div class="env-title">Theorem 10.1.2 — Size Extensivity of CC</div><div class="env-body">
Let \\(A\\) and \\(B\\) be two non-interacting subsystems with cluster operators \\(\\hat{T}_A\\) and \\(\\hat{T}_B\\). Then the coupled cluster energy satisfies
\\[
E_{CC}(A + B) = E_{CC}(A) + E_{CC}(B)
\\]
at any truncation level of the cluster operator, provided the truncation is applied consistently.
</div></div>

<div class="env-block proof"><div class="env-title">Proof</div><div class="env-body">
Since \\(A\\) and \\(B\\) do not interact, the Hamiltonian separates: \\(\\hat{H} = \\hat{H}_A + \\hat{H}_B\\) and the reference factorizes: \\(|\\Phi_0\\rangle = |\\Phi_0^A\\rangle|\\Phi_0^B\\rangle\\). The cluster operator is additive: \\(\\hat{T} = \\hat{T}_A + \\hat{T}_B\\) with \\([\\hat{T}_A, \\hat{T}_B] = 0\\). Therefore
\\[
e^{\\hat{T}}|\\Phi_0\\rangle = e^{\\hat{T}_A}|\\Phi_0^A\\rangle \\otimes e^{\\hat{T}_B}|\\Phi_0^B\\rangle.
\\]
The energy, computed as \\(E = \\langle\\Phi_0|e^{-\\hat{T}}\\hat{H}e^{\\hat{T}}|\\Phi_0\\rangle\\), separates into \\(E_A + E_B\\) because the similarity-transformed Hamiltonian also separates.
<div class="qed">∎</div>
</div></div>

<div class="env-block remark"><div class="env-title">Remark — CI vs CC</div><div class="env-body">
In truncated CI, the wavefunction for the combined system \\(A + B\\) includes only up to (say) double excitations globally. But a simultaneous single excitation on \\(A\\) and a single excitation on \\(B\\) constitutes a double excitation of the combined system, while being a product of singles on the subsystems. Truncated CI misses these "disconnected" contributions at higher levels, breaking size extensivity. The exponential ansatz includes them automatically through the powers \\(\\hat{T}^2/2!, \\hat{T}^3/3!, \\ldots\\)
</div></div>

<h3>Exponential vs Linear: A Simple Example</h3>

<p>Consider two identical, non-interacting two-electron systems (e.g., two well-separated He atoms). Each has a doubles correlation energy \\(\\epsilon\\). With the exponential ansatz at the doubles level (CCD):</p>
\\[
e^{\\hat{T}_2} = 1 + \\hat{T}_2 + \\frac{\\hat{T}_2^2}{2!} + \\cdots
\\]
<p>The \\(\\hat{T}_2^2/2!\\) term generates the "simultaneous double excitations on both atoms" (quadruple excitations globally). The resulting energy is exactly \\(2\\epsilon\\). In contrast, CISD misses the \\(\\hat{T}_2^2\\) contribution and gives an energy strictly greater than \\(2\\epsilon\\).</p>

<div class="viz-placeholder" data-viz="viz-cc-vs-ci-energy"></div>

<div class="env-block warning"><div class="env-title">Warning</div><div class="env-body">
Size extensivity is not the same as size consistency. Size extensivity means \\(E(N) \\propto N\\) for \\(N\\) non-interacting identical subsystems. Size consistency is the stronger requirement that \\(E(A\\cdots B) \\to E(A) + E(B)\\) as \\(A\\) and \\(B\\) are separated to infinity, even for interacting fragments. CC is both size-extensive and size-consistent; truncated CI is neither.
</div></div>

<div class="env-block example"><div class="env-title">Example 10.1.3 — Size-Extensivity Error in CISD</div><div class="env-body">
For \\(N\\) non-interacting He atoms, each with CISD correlation energy \\(\\epsilon\\), the CISD energy of the supersystem scales as \\(N\\epsilon + O(N^0)\\) rather than exactly \\(N\\epsilon\\). The error per atom does not vanish as \\(N \\to \\infty\\); instead, it grows as \\(O(\\sqrt{N})\\) relative to the exact result. For CCD, the energy is exactly \\(N\\epsilon\\) by the factorization property of the exponential.
</div></div>
`,
            visualizations: [
                {
                    id: 'viz-cc-vs-ci-energy',
                    title: 'Size Extensivity: CC vs CI',
                    description: 'Compare the correlation energy of \\(N\\) non-interacting He atoms computed with CCD (exact, linear scaling) versus CISD (with size-extensivity error). The gap grows with system size.',
                    setup(body, controls) {
                        const viz = new VizEngine(body, {
                            scale: 30,
                            originX: 80,
                            originY: body.clientHeight ? body.clientHeight * 0.65 - 16 : 260
                        });

                        let epsilonPerAtom = -0.042;

                        const sl = VizEngine.createSlider(controls, 'epsilon', -0.10, -0.01, epsilonPerAtom, 0.005, v => {
                            epsilonPerAtom = v;
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            const ctx = viz.ctx;
                            const w = viz.width, h = viz.height;
                            const eps = epsilonPerAtom;

                            // Axes
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1.5;
                            ctx.beginPath();
                            ctx.moveTo(60, h - 40);
                            ctx.lineTo(w - 20, h - 40);
                            ctx.stroke();
                            ctx.beginPath();
                            ctx.moveTo(60, h - 40);
                            ctx.lineTo(60, 20);
                            ctx.stroke();

                            // Labels
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Number of He atoms (N)', w / 2, h - 8);
                            ctx.save();
                            ctx.translate(16, h / 2);
                            ctx.rotate(-Math.PI / 2);
                            ctx.fillText('Correlation Energy (Eh)', 0, 0);
                            ctx.restore();

                            const maxN = 10;
                            const scaleX = (w - 100) / maxN;
                            const maxE = Math.abs(eps) * maxN * 1.3;
                            const scaleY = (h - 80) / maxE;

                            // Grid lines
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 0.5;
                            for (let n = 1; n <= maxN; n++) {
                                const x = 60 + n * scaleX;
                                ctx.beginPath();
                                ctx.moveTo(x, h - 40);
                                ctx.lineTo(x, 20);
                                ctx.stroke();
                                ctx.fillStyle = viz.colors.text;
                                ctx.textAlign = 'center';
                                ctx.fillText(n, x, h - 26);
                            }

                            // CCD line (exact: E = N * epsilon)
                            ctx.strokeStyle = viz.colors.green;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            for (let n = 0; n <= maxN; n++) {
                                const x = 60 + n * scaleX;
                                const E = n * Math.abs(eps);
                                const y = (h - 40) - E * scaleY;
                                if (n === 0) ctx.moveTo(x, y);
                                else ctx.lineTo(x, y);
                            }
                            ctx.stroke();

                            // CISD line (with size-extensivity error: E ~ N*eps * (1 - alpha*(N-1)/N))
                            ctx.strokeStyle = viz.colors.red;
                            ctx.lineWidth = 2.5;
                            ctx.setLineDash([6, 4]);
                            ctx.beginPath();
                            const alpha = 0.12; // error fraction
                            for (let n = 0; n <= maxN; n++) {
                                const x = 60 + n * scaleX;
                                // CISD recovers less correlation as N grows
                                const E_cisd = n * Math.abs(eps) * (1 - alpha * (n - 1) / Math.max(n, 1));
                                const y = (h - 40) - E_cisd * scaleY;
                                if (n === 0) ctx.moveTo(x, y);
                                else ctx.lineTo(x, y);
                            }
                            ctx.stroke();
                            ctx.setLineDash([]);

                            // FCI reference (same as CCD for non-interacting)
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 1.5;
                            ctx.setLineDash([2, 3]);
                            ctx.beginPath();
                            for (let n = 0; n <= maxN; n++) {
                                const x = 60 + n * scaleX;
                                const E = n * Math.abs(eps);
                                const y = (h - 40) - E * scaleY;
                                if (n === 0) ctx.moveTo(x, y);
                                else ctx.lineTo(x, y);
                            }
                            ctx.stroke();
                            ctx.setLineDash([]);

                            // Error shading between CCD and CISD
                            ctx.fillStyle = viz.colors.red + '22';
                            ctx.beginPath();
                            for (let n = 0; n <= maxN; n++) {
                                const x = 60 + n * scaleX;
                                const E_ccd = n * Math.abs(eps);
                                const y = (h - 40) - E_ccd * scaleY;
                                if (n === 0) ctx.moveTo(x, y);
                                else ctx.lineTo(x, y);
                            }
                            for (let n = maxN; n >= 0; n--) {
                                const x = 60 + n * scaleX;
                                const E_cisd = n * Math.abs(eps) * (1 - alpha * (n - 1) / Math.max(n, 1));
                                const y = (h - 40) - E_cisd * scaleY;
                                ctx.lineTo(x, y);
                            }
                            ctx.closePath();
                            ctx.fill();

                            // Points
                            for (let n = 1; n <= maxN; n++) {
                                const x = 60 + n * scaleX;
                                const E_ccd = n * Math.abs(eps);
                                const y_ccd = (h - 40) - E_ccd * scaleY;
                                ctx.fillStyle = viz.colors.green;
                                ctx.beginPath();
                                ctx.arc(x, y_ccd, 4, 0, Math.PI * 2);
                                ctx.fill();

                                const E_cisd = n * Math.abs(eps) * (1 - alpha * (n - 1) / Math.max(n, 1));
                                const y_cisd = (h - 40) - E_cisd * scaleY;
                                ctx.fillStyle = viz.colors.red;
                                ctx.beginPath();
                                ctx.arc(x, y_cisd, 4, 0, Math.PI * 2);
                                ctx.fill();
                            }

                            // Legend
                            const lx = w - 200, ly = 30;
                            ctx.font = '12px -apple-system,sans-serif';

                            ctx.fillStyle = viz.colors.green;
                            ctx.fillRect(lx, ly, 20, 3);
                            ctx.fillText('CCD (exact)', lx + 28, ly + 3);

                            ctx.fillStyle = viz.colors.red;
                            ctx.fillRect(lx, ly + 20, 20, 3);
                            ctx.fillText('CISD (error grows)', lx + 28, ly + 23);

                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            const errN10 = (10 * Math.abs(eps) - 10 * Math.abs(eps) * (1 - alpha * 9 / 10)).toFixed(4);
                            ctx.fillText('Size-extensivity error at N=10: ' + errN10 + ' Eh', 70, 20);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show that if \\(\\hat{T} = \\hat{T}_A + \\hat{T}_B\\) and \\([\\hat{T}_A, \\hat{T}_B] = 0\\), then \\(e^{\\hat{T}} = e^{\\hat{T}_A}e^{\\hat{T}_B}\\).',
                    hint: 'Expand both sides using the Taylor series and use the commutativity to collect terms via the binomial theorem.',
                    solution: 'Expanding: \\(e^{\\hat{T}_A + \\hat{T}_B} = \\sum_{n=0}^\\infty \\frac{(\\hat{T}_A + \\hat{T}_B)^n}{n!}\\). Since \\([\\hat{T}_A, \\hat{T}_B] = 0\\), the binomial theorem applies: \\((\\hat{T}_A + \\hat{T}_B)^n = \\sum_{k=0}^n \\binom{n}{k} \\hat{T}_A^k \\hat{T}_B^{n-k}\\). Summing: \\(\\sum_{n=0}^\\infty \\sum_{k=0}^n \\frac{\\hat{T}_A^k}{k!} \\frac{\\hat{T}_B^{n-k}}{(n-k)!} = \\left(\\sum_{j=0}^\\infty \\frac{\\hat{T}_A^j}{j!}\\right)\\left(\\sum_{m=0}^\\infty \\frac{\\hat{T}_B^m}{m!}\\right) = e^{\\hat{T}_A}e^{\\hat{T}_B}\\).'
                },
                {
                    question: 'Why is the zero vector excluded from the definition of eigenvectors, yet \\(\\hat{T}|\\Phi_0\\rangle\\) is perfectly well-defined? Explain the distinction between the cluster operator formalism and the eigenvalue problem.',
                    hint: 'The cluster operator is not an eigenvalue equation. \\(\\hat{T}\\) is an excitation operator that maps \\(|\\Phi_0\\rangle\\) to excited determinants.',
                    solution: 'In the eigenvalue problem \\(A\\mathbf{v} = \\lambda\\mathbf{v}\\), we seek special vectors left invariant in direction. The cluster operator \\(\\hat{T}\\) does not satisfy an eigenvalue equation; it maps \\(|\\Phi_0\\rangle\\) into the space of excited determinants. The equation \\(|\\Psi\\rangle = e^{\\hat{T}}|\\Phi_0\\rangle\\) is a parametrization of the wavefunction, not an eigenvalue problem for \\(\\hat{T}\\).'
                },
                {
                    question: 'For a system of \\(N\\) non-interacting He atoms, what is the CISD size-extensivity error per atom in the limit \\(N \\to \\infty\\)?',
                    hint: 'Consider that CISD for the supersystem includes at most double excitations globally, but the exact answer requires up to \\(2N\\)-fold excitations. The disconnected quadruples (simultaneous doubles on two atoms) are missing.',
                    solution: 'Each atom contributes correlation energy \\(\\epsilon\\) (from doubles). For the supersystem, the exact energy is \\(N\\epsilon\\). CISD recovers only connected doubles and misses the disconnected quadruples \\(\\hat{T}_2^A \\hat{T}_2^B\\) and higher. The missing quadruple contribution for any pair \\((A,B)\\) is \\(O(\\epsilon^2)\\). There are \\(\\binom{N}{2}\\) pairs, so the total error is \\(O(N^2 \\epsilon^2)\\) and the error per atom is \\(O(N\\epsilon^2)\\), which diverges. This proves CISD is not size-extensive.'
                },
                {
                    question: 'Show that the CC energy expression \\(E = \\langle\\Phi_0|\\hat{H}e^{\\hat{T}}|\\Phi_0\\rangle\\) can be rewritten as \\(E = \\langle\\Phi_0|\\hat{H}(1 + \\hat{T}_1 + \\hat{T}_2 + \\tfrac{1}{2}\\hat{T}_1^2)|\\Phi_0\\rangle\\) for CCSD, regardless of the higher powers of \\(\\hat{T}\\).',
                    hint: 'Use the Slater-Condon rules: \\(\\langle\\Phi_0|\\hat{H}|\\Phi_{abc\\ldots}^{rst\\ldots}\\rangle = 0\\) if the excitation level exceeds 2.',
                    solution: 'The Hamiltonian contains at most two-body operators, so by the Slater-Condon rules \\(\\langle\\Phi_0|\\hat{H}|\\Phi\\rangle\\) is nonzero only if \\(|\\Phi\\rangle\\) differs from \\(|\\Phi_0\\rangle\\) by at most two spin-orbitals. From \\(e^{\\hat{T}}|\\Phi_0\\rangle\\), only the terms \\(1\\), \\(\\hat{T}_1\\), \\(\\hat{T}_2\\), and \\(\\hat{T}_1^2/2\\) produce determinants within two excitations of \\(|\\Phi_0\\rangle\\). All higher terms (\\(\\hat{T}_1\\hat{T}_2\\), \\(\\hat{T}_3\\), \\(\\hat{T}_1^3/6\\), etc.) generate triply or higher excited determinants, which have zero matrix element with \\(\\langle\\Phi_0|\\hat{H}\\).'
                },
                {
                    question: 'Explain why the intermediate normalization condition \\(\\langle\\Phi_0|\\Psi_{\\text{CC}}\\rangle = 1\\) is automatically satisfied by the exponential ansatz.',
                    hint: 'Expand \\(e^{\\hat{T}}\\) and consider which terms in the expansion have nonzero overlap with \\(|\\Phi_0\\rangle\\).',
                    solution: '\\(\\langle\\Phi_0|e^{\\hat{T}}|\\Phi_0\\rangle = \\langle\\Phi_0|(1 + \\hat{T} + \\hat{T}^2/2! + \\cdots)|\\Phi_0\\rangle\\). Since \\(\\hat{T}_k|\\Phi_0\\rangle\\) produces \\(k\\)-tuply excited determinants orthogonal to \\(|\\Phi_0\\rangle\\) for \\(k \\geq 1\\), every term beyond the identity gives zero overlap: \\(\\langle\\Phi_0|\\hat{T}^n|\\Phi_0\\rangle = 0\\) for \\(n \\geq 1\\). Hence \\(\\langle\\Phi_0|\\Psi_{\\text{CC}}\\rangle = 1\\).'
                }
            ]
        },

        // ========== SECTION 2: Cluster Operators ==========
        {
            id: 'sec10-2-cluster-operators',
            title: 'Cluster Operators',
            content: `
<h2>10.2 Cluster Operators</h2>

<p>The cluster operator \\(\\hat{T}\\) is decomposed into a sum of operators, each responsible for a specific excitation level:</p>
\\[
\\hat{T} = \\hat{T}_1 + \\hat{T}_2 + \\hat{T}_3 + \\cdots + \\hat{T}_N.
\\]

<div class="env-block definition"><div class="env-title">Definition 10.2.1 — Singles Cluster Operator</div><div class="env-body">
The singles operator \\(\\hat{T}_1\\) generates all single excitations from the reference:
\\[
\\hat{T}_1 = \\sum_{i}^{\\text{occ}} \\sum_{a}^{\\text{virt}} t_i^a \\, \\hat{a}^\\dagger_a \\hat{a}_i
\\]
where \\(t_i^a\\) are the singles <em>amplitudes</em>, \\(i\\) runs over occupied spin-orbitals, \\(a\\) over virtual spin-orbitals, and \\(\\hat{a}^\\dagger_a \\hat{a}_i\\) is the excitation operator replacing orbital \\(i\\) with orbital \\(a\\).
</div></div>

<div class="env-block definition"><div class="env-title">Definition 10.2.2 — Doubles Cluster Operator</div><div class="env-body">
The doubles operator \\(\\hat{T}_2\\) generates all double excitations:
\\[
\\hat{T}_2 = \\frac{1}{4} \\sum_{ij}^{\\text{occ}} \\sum_{ab}^{\\text{virt}} t_{ij}^{ab} \\, \\hat{a}^\\dagger_a \\hat{a}^\\dagger_b \\hat{a}_j \\hat{a}_i
\\]
where \\(t_{ij}^{ab}\\) are the doubles amplitudes, antisymmetric under exchange: \\(t_{ij}^{ab} = -t_{ji}^{ab} = -t_{ij}^{ba} = t_{ji}^{ba}\\). The factor \\(1/4\\) prevents overcounting.
</div></div>

<h3>Connected vs Disconnected Clusters</h3>

<p>When we expand the exponential \\(e^{\\hat{T}}\\), the powers of \\(\\hat{T}\\) generate products of cluster operators. These products create excitations that are classified as <em>connected</em> or <em>disconnected</em>:</p>

<div class="env-block definition"><div class="env-title">Definition 10.2.3 — Connected and Disconnected Clusters</div><div class="env-body">
<ul>
<li>A <em>connected</em> cluster is a single application of \\(\\hat{T}_k\\). For example, \\(\\hat{T}_4|\\Phi_0\\rangle\\) is a connected quadruple excitation.</li>
<li>A <em>disconnected</em> cluster arises from products of lower-order operators. For example, \\(\\frac{1}{2}\\hat{T}_2^2|\\Phi_0\\rangle\\) generates quadruple excitations as products of two independent doubles.</li>
</ul>
</div></div>

<p>The expansion of \\(e^{\\hat{T}_1 + \\hat{T}_2}\\) (the CCSD case) produces:</p>
\\[
e^{\\hat{T}_1 + \\hat{T}_2} = 1 + \\hat{T}_1 + \\left(\\hat{T}_2 + \\frac{1}{2}\\hat{T}_1^2\\right) + \\left(\\hat{T}_1\\hat{T}_2 + \\frac{1}{6}\\hat{T}_1^3\\right) + \\left(\\frac{1}{2}\\hat{T}_2^2 + \\frac{1}{2}\\hat{T}_1^2\\hat{T}_2 + \\frac{1}{24}\\hat{T}_1^4\\right) + \\cdots
\\]

<p>Each term in parentheses generates a specific excitation level from \\(|\\Phi_0\\rangle\\):</p>
<ul>
<li>Singles: \\(\\hat{T}_1\\)</li>
<li>Doubles: \\(\\hat{T}_2 + \\frac{1}{2}\\hat{T}_1^2\\)</li>
<li>Triples: \\(\\hat{T}_1\\hat{T}_2 + \\frac{1}{6}\\hat{T}_1^3\\)</li>
<li>Quadruples: \\(\\frac{1}{2}\\hat{T}_2^2 + \\frac{1}{2}\\hat{T}_1^2\\hat{T}_2 + \\frac{1}{24}\\hat{T}_1^4\\)</li>
</ul>

<div class="viz-placeholder" data-viz="viz-cluster-diagram"></div>

<div class="env-block remark"><div class="env-title">Remark — Disconnected Clusters and Size Extensivity</div><div class="env-body">
The disconnected terms (e.g., \\(\\hat{T}_2^2/2\\)) are precisely the terms that restore size extensivity. In CISD, we have \\(C_1 + C_2\\) but <em>not</em> \\(C_2^2/2\\). The exponential ansatz generates these products automatically. This is why size-extensivity failure in truncated CI can also be understood as the absence of disconnected cluster contributions.
</div></div>

<div class="env-block proposition"><div class="env-title">Proposition 10.2.4 — Number of Amplitudes</div><div class="env-body">
For a system with \\(o\\) occupied and \\(v\\) virtual spatial orbitals:
<ul>
<li>\\(\\hat{T}_1\\) has \\(ov\\) independent amplitudes (in spin-orbital basis: \\(2ov\\) accounting for spin).</li>
<li>\\(\\hat{T}_2\\) has \\(\\binom{o}{2}\\binom{v}{2} \\cdot 4\\) spin-orbital amplitudes, or equivalently \\(o^2 v^2\\) in the most common indexing (with antisymmetry reducing independent parameters to \\(\\binom{o}{2}\\binom{v}{2}\\) for same-spin and \\(o^2v^2/4\\) for opposite-spin).</li>
</ul>
</div></div>

<div class="env-block example"><div class="env-title">Example 10.2.5 — Minimal Basis H\\(_2\\)</div><div class="env-body">
In minimal basis H\\(_2\\), there is one occupied spatial orbital (\\(\\sigma_g\\)) and one virtual spatial orbital (\\(\\sigma_u^*\\)). The only possible double excitation is \\(\\sigma_g^2 \\to (\\sigma_u^*)^2\\). Thus \\(\\hat{T}_2\\) has a single independent amplitude \\(t_{12}^{34}\\) (in spin-orbital notation), and \\(\\hat{T}_1 = 0\\) by spatial symmetry. CCD for minimal basis H\\(_2\\) reduces to a single nonlinear equation in one unknown.
</div></div>

<div class="env-block warning"><div class="env-title">Warning</div><div class="env-body">
Do not confuse cluster amplitudes \\(t_i^a, t_{ij}^{ab}\\) with CI coefficients \\(c_i^a, c_{ij}^{ab}\\). In the CI expansion \\(|\\Psi\\rangle = c_0|\\Phi_0\\rangle + \\sum c_i^a|\\Phi_i^a\\rangle + \\cdots\\), the coefficients \\(c\\) are the total weights of each determinant. In CC, the amplitudes \\(t\\) describe only the <em>connected</em> part of the excitation. The total coefficient of a quadruply excited determinant in CCSD includes contributions from \\(\\hat{T}_2^2/2\\), which is built from products of doubles amplitudes.
</div></div>
`,
            visualizations: [
                {
                    id: 'viz-cluster-diagram',
                    title: 'Cluster Operators: Connected vs Disconnected',
                    description: 'Visualize excitation operators \\(\\hat{T}_1\\), \\(\\hat{T}_2\\), and their products. Connected clusters involve simultaneous excitation of multiple electrons; disconnected clusters are independent excitations happening in different parts of the orbital space.',
                    setup(body, controls) {
                        const viz = new VizEngine(body, {
                            scale: 30,
                            originX: 0,
                            originY: 0
                        });
                        const ctx = viz.ctx;
                        const w = viz.width, h = viz.height;

                        let showLevel = 0; // 0: T1, 1: T2, 2: T1^2, 3: T2^2

                        VizEngine.createButton(controls, 'T\u2081', () => { showLevel = 0; draw(); });
                        VizEngine.createButton(controls, 'T\u2082', () => { showLevel = 1; draw(); });
                        VizEngine.createButton(controls, 'T\u2081\u00b2 (disconnected)', () => { showLevel = 2; draw(); });
                        VizEngine.createButton(controls, 'T\u2082\u00b2 (disconnected)', () => { showLevel = 3; draw(); });

                        function drawOrbitalLevel(x, y, width, label, color) {
                            ctx.strokeStyle = color;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(x - width / 2, y);
                            ctx.lineTo(x + width / 2, y);
                            ctx.stroke();
                            if (label) {
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.textAlign = 'right';
                                ctx.fillText(label, x - width / 2 - 8, y + 4);
                            }
                        }

                        function drawElectronArrow(x, y, up, color) {
                            const len = 12;
                            const dir = up ? -1 : 1;
                            ctx.strokeStyle = color;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(x, y + dir * len / 2);
                            ctx.lineTo(x, y - dir * len / 2);
                            ctx.stroke();
                            ctx.fillStyle = color;
                            ctx.beginPath();
                            ctx.moveTo(x, y - dir * len / 2);
                            ctx.lineTo(x - 3, y - dir * len / 2 + dir * 5);
                            ctx.lineTo(x + 3, y - dir * len / 2 + dir * 5);
                            ctx.closePath();
                            ctx.fill();
                        }

                        function drawExcitationArrow(x1, y1, x2, y2, color) {
                            ctx.strokeStyle = color;
                            ctx.lineWidth = 2;
                            ctx.setLineDash([4, 3]);
                            ctx.beginPath();
                            ctx.moveTo(x1, y1);
                            ctx.lineTo(x2, y2);
                            ctx.stroke();
                            ctx.setLineDash([]);
                            // Arrowhead
                            const angle = Math.atan2(y2 - y1, x2 - x1);
                            ctx.fillStyle = color;
                            ctx.beginPath();
                            ctx.moveTo(x2, y2);
                            ctx.lineTo(x2 - 8 * Math.cos(angle - 0.4), y2 - 8 * Math.sin(angle - 0.4));
                            ctx.lineTo(x2 - 8 * Math.cos(angle + 0.4), y2 - 8 * Math.sin(angle + 0.4));
                            ctx.closePath();
                            ctx.fill();
                        }

                        function draw() {
                            viz.clear();

                            const titles = ['T\u2081: Single Excitation (connected)', 'T\u2082: Double Excitation (connected)',
                                'T\u2081\u00b2/2: Two Singles (disconnected doubles)', 'T\u2082\u00b2/2: Two Doubles (disconnected quadruples)'];
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText(titles[showLevel], w / 2, 28);

                            // Draw orbital diagram
                            const cx = w / 2;
                            const occY = [h - 70, h - 110, h - 150]; // occupied levels
                            const virtY = [h - 220, h - 260, h - 300]; // virtual levels
                            const lw = 100;

                            // Draw occupied and virtual labels
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('occupied', cx - 160, h - 110);
                            ctx.fillText('virtual', cx - 160, h - 260);

                            // Separator
                            ctx.strokeStyle = viz.colors.muted;
                            ctx.lineWidth = 1;
                            ctx.setLineDash([4, 4]);
                            ctx.beginPath();
                            ctx.moveTo(cx - 140, h - 185);
                            ctx.lineTo(cx + 140, h - 185);
                            ctx.stroke();
                            ctx.setLineDash([]);
                            ctx.fillStyle = viz.colors.muted;
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.fillText('Fermi level', cx + 100, h - 190);

                            // Draw levels
                            for (let i = 0; i < 3; i++) {
                                drawOrbitalLevel(cx, occY[i], lw, '\u03C6' + (i + 1), viz.colors.blue);
                                drawOrbitalLevel(cx, virtY[i], lw, '\u03C6' + (i + 4), viz.colors.orange);
                            }

                            if (showLevel === 0) {
                                // T1: single excitation i -> a
                                // Electrons in occupied
                                drawElectronArrow(cx - 10, occY[0], true, viz.colors.teal);
                                drawElectronArrow(cx + 10, occY[0], false, viz.colors.teal);
                                drawElectronArrow(cx - 10, occY[1], true, viz.colors.teal);
                                drawElectronArrow(cx + 10, occY[1], false, viz.colors.teal);
                                // Excitation arrow
                                drawExcitationArrow(cx + 10, occY[1] - 8, cx + 10, virtY[0] + 8, viz.colors.green);
                                // Excited electron
                                drawElectronArrow(cx + 10, virtY[0], false, viz.colors.green);
                                ctx.fillStyle = viz.colors.green;
                                ctx.font = '12px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.fillText('t\u1d62\u1d43', cx + 30, (occY[1] + virtY[0]) / 2);
                            } else if (showLevel === 1) {
                                // T2: double excitation ij -> ab
                                drawElectronArrow(cx - 10, occY[0], true, viz.colors.teal);
                                drawElectronArrow(cx + 10, occY[0], false, viz.colors.teal);
                                drawElectronArrow(cx - 10, occY[1], true, viz.colors.teal);
                                drawElectronArrow(cx + 10, occY[1], false, viz.colors.teal);
                                // Two excitation arrows
                                drawExcitationArrow(cx - 10, occY[0] - 8, cx - 10, virtY[0] + 8, viz.colors.purple);
                                drawExcitationArrow(cx + 10, occY[1] - 8, cx + 10, virtY[1] + 8, viz.colors.purple);
                                drawElectronArrow(cx - 10, virtY[0], true, viz.colors.purple);
                                drawElectronArrow(cx + 10, virtY[1], false, viz.colors.purple);
                                ctx.fillStyle = viz.colors.purple;
                                ctx.font = '12px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.fillText('t\u1d62\u2c7c\u1d43\u1d47', cx + 30, (occY[0] + virtY[0]) / 2);
                            } else if (showLevel === 2) {
                                // T1^2: two independent singles (disconnected)
                                // Left subsystem
                                const off = -70;
                                drawElectronArrow(cx + off - 10, occY[0], true, viz.colors.teal);
                                drawElectronArrow(cx + off + 10, occY[0], false, viz.colors.teal);
                                drawExcitationArrow(cx + off - 10, occY[0] - 8, cx + off - 10, virtY[0] + 8, viz.colors.green);
                                drawElectronArrow(cx + off - 10, virtY[0], true, viz.colors.green);

                                // Right subsystem
                                const off2 = 70;
                                drawElectronArrow(cx + off2 - 10, occY[1], true, viz.colors.teal);
                                drawElectronArrow(cx + off2 + 10, occY[1], false, viz.colors.teal);
                                drawExcitationArrow(cx + off2 + 10, occY[1] - 8, cx + off2 + 10, virtY[1] + 8, viz.colors.green);
                                drawElectronArrow(cx + off2 + 10, virtY[1], false, viz.colors.green);

                                // Multiplication sign
                                ctx.fillStyle = viz.colors.white;
                                ctx.font = 'bold 20px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('\u00d7', cx, h / 2 - 20);

                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.fillText('Two independent T\u2081 operations', cx, h - 40);
                                ctx.fillText('produce a doubly-excited determinant', cx, h - 25);
                            } else if (showLevel === 3) {
                                // T2^2: two independent doubles (disconnected quadruples)
                                const off = -70;
                                drawElectronArrow(cx + off - 10, occY[0], true, viz.colors.teal);
                                drawElectronArrow(cx + off + 10, occY[0], false, viz.colors.teal);
                                drawExcitationArrow(cx + off - 10, occY[0] - 8, cx + off - 10, virtY[0] + 8, viz.colors.purple);
                                drawExcitationArrow(cx + off + 10, occY[0] - 8, cx + off + 10, virtY[1] + 8, viz.colors.purple);
                                drawElectronArrow(cx + off - 10, virtY[0], true, viz.colors.purple);
                                drawElectronArrow(cx + off + 10, virtY[1], false, viz.colors.purple);

                                const off2 = 70;
                                drawElectronArrow(cx + off2 - 10, occY[1], true, viz.colors.teal);
                                drawElectronArrow(cx + off2 + 10, occY[1], false, viz.colors.teal);
                                drawExcitationArrow(cx + off2 - 10, occY[1] - 8, cx + off2 - 10, virtY[0] + 8, viz.colors.purple);
                                drawExcitationArrow(cx + off2 + 10, occY[1] - 8, cx + off2 + 10, virtY[2] + 8, viz.colors.purple);
                                drawElectronArrow(cx + off2 - 10, virtY[0], true, viz.colors.purple);
                                drawElectronArrow(cx + off2 + 10, virtY[2], false, viz.colors.purple);

                                ctx.fillStyle = viz.colors.white;
                                ctx.font = 'bold 20px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('\u00d7', cx, h / 2 - 20);

                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.fillText('Two independent T\u2082 operations', cx, h - 40);
                                ctx.fillText('produce a quadruply-excited determinant', cx, h - 25);
                            }
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Write out the full expansion of \\(e^{\\hat{T}_1 + \\hat{T}_2}\\) up to and including all terms that produce quadruple excitations.',
                    hint: 'Collect terms by excitation level. Remember that \\(\\hat{T}_1^k\\) produces \\(k\\)-fold excitations and products like \\(\\hat{T}_1^m \\hat{T}_2^n\\) produce \\((m + 2n)\\)-fold excitations.',
                    solution: 'Singles: \\(\\hat{T}_1\\). Doubles: \\(\\hat{T}_2 + \\frac{1}{2}\\hat{T}_1^2\\). Triples: \\(\\hat{T}_1\\hat{T}_2 + \\frac{1}{6}\\hat{T}_1^3\\). Quadruples: \\(\\frac{1}{2}\\hat{T}_2^2 + \\frac{1}{2}\\hat{T}_1^2\\hat{T}_2 + \\frac{1}{24}\\hat{T}_1^4\\). Each disconnected product carries the appropriate factorial prefactor from the Taylor expansion of the exponential.'
                },
                {
                    question: 'For a system with 5 occupied and 20 virtual spatial orbitals, how many independent \\(\\hat{T}_1\\) and \\(\\hat{T}_2\\) amplitudes are there (in the spatial orbital basis, ignoring spin)?',
                    hint: 'For spatial orbitals, \\(\\hat{T}_1\\) has \\(o \\times v\\) amplitudes. For \\(\\hat{T}_2\\), count the number of unique pairs of occupied and virtual orbitals.',
                    solution: '\\(\\hat{T}_1\\): \\(5 \\times 20 = 100\\) amplitudes. For \\(\\hat{T}_2\\) in the spin-orbital basis: \\(\\binom{10}{2}\\binom{40}{2} = 45 \\times 780 = 35100\\). In the spatial orbital basis with spin adaptation, we get \\(o^2v^2 = 5^2 \\times 20^2 = 10000\\) in the simplest counting (with further reductions from antisymmetry giving roughly \\(o(o+1)v(v+1)/4 \\approx 3150\\) for closed-shell same-spin and opposite-spin blocks combined).'
                },
                {
                    question: 'Explain why \\(\\hat{T}_1\\) is sometimes called the "orbital relaxation" operator.',
                    hint: 'Consider what happens when you apply \\(e^{\\hat{T}_1}\\) to the reference determinant. How does this relate to a change of orbitals?',
                    solution: 'The operator \\(e^{\\hat{T}_1}|\\Phi_0\\rangle\\) can be shown to be equivalent to a single determinant built from rotated orbitals: \\(|\\tilde{\\Phi}_0\\rangle\\) where \\(\\tilde{\\phi}_i = \\phi_i + \\sum_a t_i^a \\phi_a\\). This is a unitary transformation of the occupied orbitals into the virtual space (to first order in \\(t\\)). Hence \\(\\hat{T}_1\\) effectively relaxes the HF orbitals to better describe the correlated state. If the HF orbitals are optimal (Brillouin condition), the \\(t_1\\) amplitudes are small.'
                },
                {
                    question: 'In the CCSD expansion, identify which terms contribute to the coefficient of a triply excited determinant \\(|\\Phi_{ijk}^{abc}\\rangle\\).',
                    hint: 'Since CCSD has \\(\\hat{T} = \\hat{T}_1 + \\hat{T}_2\\), you need products that generate exactly triple excitations.',
                    solution: 'Triple excitations arise from: (1) \\(\\hat{T}_1\\hat{T}_2\\): a single excitation combined with a double excitation. (2) \\(\\frac{1}{6}\\hat{T}_1^3\\): three independent singles. Note that \\(\\hat{T}_3\\) is absent in CCSD by definition, so CCSD has no connected triples. The triples content in CCSD is entirely disconnected, which is why CCSD underestimates triple excitation effects and why perturbative triples (T) corrections are important.'
                },
                {
                    question: 'Show that the antisymmetry \\(t_{ij}^{ab} = -t_{ji}^{ab}\\) follows from the anticommutation relations of the creation and annihilation operators.',
                    hint: 'Use \\(\\hat{a}_i\\hat{a}_j = -\\hat{a}_j\\hat{a}_i\\) for fermionic operators.',
                    solution: 'From the definition \\(\\hat{T}_2 = \\frac{1}{4}\\sum_{ijab} t_{ij}^{ab} \\hat{a}_a^\\dagger \\hat{a}_b^\\dagger \\hat{a}_j \\hat{a}_i\\). Swapping \\(i \\leftrightarrow j\\): \\(\\hat{a}_j\\hat{a}_i \\to \\hat{a}_i\\hat{a}_j = -\\hat{a}_j\\hat{a}_i\\). For the sum to remain the same, we need \\(t_{ji}^{ab}(-1) = t_{ij}^{ab}\\), i.e., \\(t_{ij}^{ab} = -t_{ji}^{ab}\\). Similarly, swapping \\(a \\leftrightarrow b\\) in the creation operators gives \\(t_{ij}^{ab} = -t_{ij}^{ba}\\).'
                }
            ]
        },

        // ========== SECTION 3: The CC Equations ==========
        {
            id: 'sec10-3-cc-equations',
            title: 'The CC Equations',
            content: `
<h2>10.3 The CC Equations</h2>

<p>Unlike CI, where we solve a matrix eigenvalue problem, coupled cluster determines the amplitudes through a set of <em>projected</em> nonlinear equations. The derivation begins with the similarity-transformed Hamiltonian.</p>

<h3>The Similarity-Transformed Hamiltonian</h3>

<div class="env-block definition"><div class="env-title">Definition 10.3.1 — Similarity-Transformed Hamiltonian</div><div class="env-body">
The similarity-transformed Hamiltonian is defined as
\\[
\\bar{H} = e^{-\\hat{T}} \\hat{H} e^{\\hat{T}}.
\\]
The CC Schrodinger equation \\(\\hat{H} e^{\\hat{T}}|\\Phi_0\\rangle = E e^{\\hat{T}}|\\Phi_0\\rangle\\) becomes
\\[
\\bar{H}|\\Phi_0\\rangle = E|\\Phi_0\\rangle.
\\]
</div></div>

<div class="env-block remark"><div class="env-title">Remark</div><div class="env-body">
The transformation \\(\\hat{H} \\to \\bar{H} = e^{-\\hat{T}}\\hat{H}e^{\\hat{T}}\\) is a similarity transformation (not unitary, since \\(\\hat{T}\\) is not anti-Hermitian). This means \\(\\bar{H}\\) has the same eigenvalues as \\(\\hat{H}\\), but it is not Hermitian. The left and right eigenvectors differ.
</div></div>

<h3>The Baker-Campbell-Hausdorff Expansion</h3>

<p>The similarity-transformed Hamiltonian can be expanded using the BCH formula:</p>
\\[
\\bar{H} = \\hat{H} + [\\hat{H}, \\hat{T}] + \\frac{1}{2!}[[\\hat{H}, \\hat{T}], \\hat{T}] + \\frac{1}{3!}[[[\\hat{H}, \\hat{T}], \\hat{T}], \\hat{T}] + \\frac{1}{4!}[[[[\\hat{H}, \\hat{T}], \\hat{T}], \\hat{T}], \\hat{T}]
\\]

<div class="env-block theorem"><div class="env-title">Theorem 10.3.2 — Termination of the BCH Series</div><div class="env-body">
For a Hamiltonian containing at most two-body operators and a cluster operator \\(\\hat{T}\\) composed of one-body and two-body excitation operators, the BCH expansion of \\(\\bar{H} = e^{-\\hat{T}}\\hat{H}e^{\\hat{T}}\\) terminates exactly at the four-fold nested commutator:
\\[
\\bar{H} = \\hat{H} + [\\hat{H},\\hat{T}] + \\frac{1}{2}[[\\hat{H},\\hat{T}],\\hat{T}] + \\frac{1}{6}[[[\\hat{H},\\hat{T}],\\hat{T}],\\hat{T}] + \\frac{1}{24}[[[[\\hat{H},\\hat{T}],\\hat{T}],\\hat{T}],\\hat{T}].
\\]
All higher-order commutators vanish identically.
</div></div>

<div class="env-block proof"><div class="env-title">Proof (sketch)</div><div class="env-body">
The Hamiltonian \\(\\hat{H}\\) in second quantization contains strings of at most four creation/annihilation operators (two-body terms). Each commutator \\([\\cdot, \\hat{T}]\\) can at most increase the operator rank, but due to the normal-ordering property of the cluster operator (which contains only excitation operators), contractions reduce the rank. After four nested commutators, all operators are fully contracted and further commutators yield zero by the anticommutation relations of fermion operators.
<div class="qed">∎</div>
</div></div>

<h3>Projection Equations</h3>

<p>To determine the CC amplitudes, we project the transformed Schrodinger equation onto the reference and onto excited determinants:</p>

<div class="env-block definition"><div class="env-title">Definition 10.3.3 — CC Energy and Amplitude Equations</div><div class="env-body">
<strong>Energy equation:</strong>
\\[
E = \\langle\\Phi_0|\\bar{H}|\\Phi_0\\rangle = \\langle\\Phi_0|\\hat{H} e^{\\hat{T}}|\\Phi_0\\rangle
\\]

<strong>Amplitude equations:</strong> For each excited determinant \\(|\\Phi_\\mu\\rangle\\) at the included excitation level,
\\[
\\langle\\Phi_\\mu|\\bar{H}|\\Phi_0\\rangle = 0
\\]
These are called the <em>CC equations</em>. They form a system of coupled nonlinear algebraic equations for the amplitudes \\(\\{t_i^a, t_{ij}^{ab}, \\ldots\\}\\).
</div></div>

<div class="env-block remark"><div class="env-title">Remark — Why Projection, Not Variational?</div><div class="env-body">
Since \\(\\bar{H}\\) is not Hermitian, the CC energy is not an upper bound to the exact energy. The CC equations are derived by projection, not by minimizing an energy functional. A variational CC formulation exists (expectation-value CC) but is far more expensive and rarely used in practice. The non-variational nature is a small price to pay for the compactness and size extensivity of the standard CC approach.
</div></div>

<div class="env-block proposition"><div class="env-title">Proposition 10.3.4 — Structure of CCSD Equations</div><div class="env-body">
The CCSD amplitude equations take the form:
\\[
\\langle\\Phi_i^a|\\bar{H}|\\Phi_0\\rangle = 0 \\quad \\text{(singles equations, } o \\cdot v \\text{ equations)}
\\]
\\[
\\langle\\Phi_{ij}^{ab}|\\bar{H}|\\Phi_0\\rangle = 0 \\quad \\text{(doubles equations, } o^2 v^2/4 \\text{ equations)}
\\]
These are nonlinear in the amplitudes because \\(\\bar{H}\\) contains products of \\(\\hat{T}\\) operators through the BCH expansion.
</div></div>

<h3>Iterative Solution</h3>

<p>The CC equations are solved iteratively. Writing the amplitude equations schematically as</p>
\\[
\\Omega_\\mu(\\mathbf{t}) = 0,
\\]
<p>where \\(\\mathbf{t}\\) denotes the vector of all amplitudes, the standard approach is a quasi-Newton iteration:</p>
\\[
t_\\mu^{(n+1)} = t_\\mu^{(n)} - \\frac{\\Omega_\\mu(\\mathbf{t}^{(n)})}{\\epsilon_\\mu}
\\]
<p>where \\(\\epsilon_\\mu = \\varepsilon_i + \\varepsilon_j + \\cdots - \\varepsilon_a - \\varepsilon_b - \\cdots\\) are the orbital energy denominators (the diagonal part of the Jacobian). This is essentially the Jacobi method applied to the CC equations, and is closely related to the MP2 guess for the initial amplitudes.</p>

<div class="env-block example"><div class="env-title">Example 10.3.5 — CCD Equations in Detail</div><div class="env-body">
For CCD (\\(\\hat{T} = \\hat{T}_2\\) only), the doubles amplitude equation is:
\\[
\\langle\\Phi_{ij}^{ab}|\\hat{H}|\\Phi_0\\rangle + \\langle\\Phi_{ij}^{ab}|[\\hat{H},\\hat{T}_2]|\\Phi_0\\rangle + \\frac{1}{2}\\langle\\Phi_{ij}^{ab}|[[\\hat{H},\\hat{T}_2],\\hat{T}_2]|\\Phi_0\\rangle = 0.
\\]
The first term gives the two-electron integrals \\(\\langle ab||ij\\rangle\\). The second term is linear in the amplitudes \\(t_{ij}^{ab}\\). The third term is quadratic. This makes the CCD equations a set of coupled quadratic equations.
</div></div>

<div class="env-block warning"><div class="env-title">Warning</div><div class="env-body">
The iterative solution of CC equations can diverge if the initial guess is poor or if the system has strong multireference character. Unlike CI, where the eigenvalue problem is well-defined even for challenging systems, the nonlinear CC equations may have multiple solutions, and convergence to the physical solution is not guaranteed. DIIS (Direct Inversion of the Iterative Subspace) acceleration is essential in practice.
</div></div>
`,
            visualizations: [],
            exercises: [
                {
                    question: 'Verify that if \\(\\bar{H}|\\Phi_0\\rangle = E|\\Phi_0\\rangle + \\sum_\\mu \\Omega_\\mu |\\Phi_\\mu\\rangle\\), then setting all \\(\\Omega_\\mu = 0\\) and projecting onto \\(\\langle\\Phi_0|\\) yields the CC energy equation.',
                    hint: 'Project \\(\\bar{H}|\\Phi_0\\rangle\\) onto \\(\\langle\\Phi_0|\\) using orthonormality of the determinants.',
                    solution: 'Projecting: \\(\\langle\\Phi_0|\\bar{H}|\\Phi_0\\rangle = E\\langle\\Phi_0|\\Phi_0\\rangle + \\sum_\\mu \\Omega_\\mu \\langle\\Phi_0|\\Phi_\\mu\\rangle = E \\cdot 1 + 0 = E\\), since the excited determinants are orthogonal to the reference. The amplitude equations \\(\\Omega_\\mu = 0\\) are precisely the projection onto excited determinants: \\(\\langle\\Phi_\\mu|\\bar{H}|\\Phi_0\\rangle = \\Omega_\\mu = 0\\).'
                },
                {
                    question: 'Show that the BCH expansion \\(e^{-\\hat{T}}\\hat{H}e^{\\hat{T}} = \\hat{H} + [\\hat{H},\\hat{T}] + \\frac{1}{2}[[\\hat{H},\\hat{T}],\\hat{T}] + \\cdots\\) follows from the Taylor expansion of \\(f(\\lambda) = e^{-\\lambda\\hat{T}}\\hat{H}e^{\\lambda\\hat{T}}\\) around \\(\\lambda = 0\\).',
                    hint: 'Compute \\(f\'(\\lambda)\\), \\(f\'\'(\\lambda)\\), etc., and evaluate at \\(\\lambda = 0\\). Then set \\(\\lambda = 1\\).',
                    solution: 'Define \\(f(\\lambda) = e^{-\\lambda \\hat{T}}\\hat{H}e^{\\lambda \\hat{T}}\\). Then \\(f(0) = \\hat{H}\\). Differentiating: \\(f\'(\\lambda) = e^{-\\lambda \\hat{T}}[\\hat{H},\\hat{T}]e^{\\lambda \\hat{T}}\\), so \\(f\'(0) = [\\hat{H},\\hat{T}]\\). Similarly \\(f\'\'(0) = [[\\hat{H},\\hat{T}],\\hat{T}]\\). By Taylor: \\(f(1) = f(0) + f\'(0) + f\'\'(0)/2! + \\cdots\\), giving the BCH series.'
                },
                {
                    question: 'Why do the CC equations have multiple solutions, and how is the physical solution identified?',
                    hint: 'Consider the nonlinearity of the equations and the connection to CI eigenvalues.',
                    solution: 'The CC amplitude equations are polynomial (quadratic for CCD, higher for CCSD). A system of \\(M\\) coupled polynomial equations generally has multiple solutions (by Bezout\'s theorem, up to \\(2^M\\) for quadratic). Each solution corresponds to a different eigenstate of the Hamiltonian, parametrized through the exponential ansatz. The physical (ground-state) solution is identified by: (1) starting the iteration from the MP2 amplitudes (which are close to the ground-state CC amplitudes for weakly correlated systems), and (2) checking that the energy is below the HF energy and consistent with perturbation theory estimates.'
                },
                {
                    question: 'Derive the CCD energy expression \\(E_{\\text{CCD}} = E_{\\text{HF}} + \\frac{1}{4}\\sum_{ijab} \\langle ij||ab\\rangle t_{ij}^{ab}\\), where \\(\\langle ij||ab\\rangle\\) are antisymmetrized two-electron integrals.',
                    hint: 'Use \\(E = \\langle\\Phi_0|\\hat{H}e^{\\hat{T}_2}|\\Phi_0\\rangle\\) and expand the exponential. Apply Slater-Condon rules.',
                    solution: 'Expanding: \\(E = \\langle\\Phi_0|\\hat{H}(1 + \\hat{T}_2 + \\frac{1}{2}\\hat{T}_2^2 + \\cdots)|\\Phi_0\\rangle\\). The term \\(\\langle\\Phi_0|\\hat{H}|\\Phi_0\\rangle = E_{\\text{HF}}\\). By Slater-Condon rules, \\(\\langle\\Phi_0|\\hat{H}|\\Phi_{ij}^{ab}\\rangle = \\langle ij||ab\\rangle\\) (two-electron integrals). Higher excitations have zero matrix element with the reference. So \\(E = E_{\\text{HF}} + \\langle\\Phi_0|\\hat{H}\\hat{T}_2|\\Phi_0\\rangle = E_{\\text{HF}} + \\frac{1}{4}\\sum_{ijab}\\langle ij||ab\\rangle t_{ij}^{ab}\\). The \\(\\hat{T}_2^2\\) and higher terms contribute only via triply and higher excited determinants, which have zero overlap with \\(\\langle\\Phi_0|\\hat{H}\\).'
                },
                {
                    question: 'Explain why the CC energy expression depends only on \\(t_1\\) and \\(t_2\\) amplitudes (for any CC truncation that includes at least doubles), even though higher-order amplitudes are nonzero.',
                    hint: 'The Hamiltonian is a two-body operator. What is the maximum excitation level that has nonzero Hamiltonian matrix element with \\(|\\Phi_0\\rangle\\)?',
                    solution: 'The Hamiltonian contains one- and two-body terms. By the Slater-Condon rules, \\(\\langle\\Phi_0|\\hat{H}|\\Phi_\\mu\\rangle = 0\\) if \\(|\\Phi_\\mu\\rangle\\) differs from \\(|\\Phi_0\\rangle\\) by more than 2 spin-orbitals. Hence in \\(E = \\langle\\Phi_0|\\hat{H}e^{\\hat{T}}|\\Phi_0\\rangle\\), only the terms in \\(e^{\\hat{T}}\\) that create up to double excitations contribute: these are \\(1, \\hat{T}_1, \\hat{T}_2, \\hat{T}_1^2/2\\). All terms involving \\(\\hat{T}_3, \\hat{T}_4, \\ldots\\) (or \\(\\hat{T}_1\\hat{T}_2, \\hat{T}_1^3/6, \\ldots\\)) produce triples or higher, which are orthogonal to \\(\\langle\\Phi_0|\\hat{H}\\).'
                }
            ]
        },

        // ========== SECTION 4: CCD, CCSD, and CCSD(T) ==========
        {
            id: 'sec10-4-ccd-ccsd-ccsdt',
            title: 'CCD, CCSD, and CCSD(T)',
            content: `
<h2>10.4 CCD, CCSD, and CCSD(T)</h2>

<p>The practical hierarchy of coupled cluster methods is determined by the truncation level of the cluster operator. Each successive level improves accuracy at the cost of increased computational expense.</p>

<h3>CCD: Coupled Cluster Doubles</h3>

<div class="env-block definition"><div class="env-title">Definition 10.4.1 — CCD</div><div class="env-body">
In Coupled Cluster Doubles (CCD), only the doubles cluster operator is retained:
\\[
\\hat{T} = \\hat{T}_2, \\qquad |\\Psi_{\\text{CCD}}\\rangle = e^{\\hat{T}_2}|\\Phi_0\\rangle.
\\]
The CCD equations are obtained by projecting onto all doubly excited determinants:
\\[
\\langle\\Phi_{ij}^{ab}|\\bar{H}|\\Phi_0\\rangle = 0 \\quad \\forall\\, i < j,\\, a < b.
\\]
</div></div>

<p>CCD is already size-extensive and captures the most important correlation effects (pair correlations). However, it neglects orbital relaxation effects described by singles.</p>

<h3>CCSD: Coupled Cluster Singles and Doubles</h3>

<div class="env-block definition"><div class="env-title">Definition 10.4.2 — CCSD</div><div class="env-body">
In Coupled Cluster Singles and Doubles (CCSD), both singles and doubles are included:
\\[
\\hat{T} = \\hat{T}_1 + \\hat{T}_2, \\qquad |\\Psi_{\\text{CCSD}}\\rangle = e^{\\hat{T}_1 + \\hat{T}_2}|\\Phi_0\\rangle.
\\]
The amplitude equations are:
\\[
\\langle\\Phi_i^a|\\bar{H}|\\Phi_0\\rangle = 0 \\quad \\text{(singles)}
\\]
\\[
\\langle\\Phi_{ij}^{ab}|\\bar{H}|\\Phi_0\\rangle = 0 \\quad \\text{(doubles)}
\\]
</div></div>

<div class="env-block remark"><div class="env-title">Remark — Role of Singles in CCSD</div><div class="env-body">
By Brillouin's theorem, the singles amplitudes \\(t_i^a\\) would be exactly zero if the HF orbitals were optimal for the correlated state. In practice, they are small but nonzero, and their inclusion improves the description of orbital relaxation. More importantly, \\(\\hat{T}_1\\) interacts with \\(\\hat{T}_2\\) through the BCH expansion, modifying the doubles equations and providing a more balanced treatment. The computational cost of CCSD remains \\(O(N^6)\\), the same as CCD.
</div></div>

<h3>CCSD(T): The Gold Standard</h3>

<p>CCSD captures most of the correlation energy but misses connected triple excitations. Full CCSDT (with \\(\\hat{T}_3\\)) scales as \\(O(N^8)\\) and is prohibitively expensive for most applications. The breakthrough insight of Raghavachari et al. (1989) was to include the effect of triples <em>perturbatively</em>.</p>

<div class="env-block definition"><div class="env-title">Definition 10.4.3 — CCSD(T)</div><div class="env-body">
CCSD(T) adds a perturbative correction for connected triple excitations to the CCSD energy:
\\[
E_{\\text{CCSD(T)}} = E_{\\text{CCSD}} + \\Delta E_{(T)},
\\]
where the triples correction is
\\[
\\Delta E_{(T)} = \\frac{1}{36} \\sum_{ijkabc} \\frac{|W_{ijk}^{abc}|^2}{\\varepsilon_i + \\varepsilon_j + \\varepsilon_k - \\varepsilon_a - \\varepsilon_b - \\varepsilon_c}
\\]
and \\(W_{ijk}^{abc}\\) are computed from the converged CCSD amplitudes and two-electron integrals. This correction scales as \\(O(N^7)\\) and accounts for the dominant connected triples contribution.
</div></div>

<div class="env-block theorem"><div class="env-title">Theorem 10.4.4 — Accuracy Hierarchy</div><div class="env-body">
For single-reference systems near equilibrium geometry, the coupled cluster hierarchy provides systematic convergence to the full CI limit:
\\[
\\text{HF} \\subset \\text{CCD} \\subset \\text{CCSD} \\subset \\text{CCSD(T)} \\subset \\text{CCSDT} \\subset \\text{CCSDTQ} \\subset \\cdots \\subset \\text{FCI}
\\]
CCSD(T) typically recovers 99.5% or more of the correlation energy for well-behaved molecules.
</div></div>

<p>The remarkable accuracy of CCSD(T) for thermochemistry, reaction barriers, and molecular properties has earned it the title of "gold standard of quantum chemistry." It achieves sub-kcal/mol accuracy for many properties when combined with large basis sets and basis set extrapolation.</p>

<div class="env-block example"><div class="env-title">Example 10.4.5 — Atomization Energy of N\\(_2\\)</div><div class="env-body">
The atomization energy of N\\(_2\\) (a notoriously difficult case due to the triple bond) illustrates the hierarchy:
<table style="width:100%;text-align:center;margin:10px 0;">
<tr><th>Method</th><th>D\\(_e\\) (kcal/mol)</th><th>Error</th></tr>
<tr><td>HF</td><td>115</td><td>113</td></tr>
<tr><td>MP2</td><td>218</td><td>10</td></tr>
<tr><td>CCSD</td><td>217</td><td>11</td></tr>
<tr><td>CCSD(T)</td><td>227</td><td>1</td></tr>
<tr><td>Expt.</td><td>228</td><td>-</td></tr>
</table>
The (T) correction adds approximately 10 kcal/mol, bringing the result to within chemical accuracy (1 kcal/mol).
</div></div>

<div class="env-block warning"><div class="env-title">Warning — When CCSD(T) Fails</div><div class="env-body">
CCSD(T) is reliable only for <em>single-reference</em> systems. When the wavefunction has significant multireference character (e.g., bond breaking, biradicals, transition metal complexes with near-degenerate d-orbitals), the perturbative (T) correction can overcorrect or even diverge. The \\(T_1\\) diagnostic (\\(\\|\\mathbf{t}_1\\|/\\sqrt{N}\\)) provides a rough indicator: values above 0.02 suggest potential multireference problems. For such systems, multireference methods (CASPT2, MRCI, DMRG) are more appropriate.
</div></div>
`,
            visualizations: [],
            exercises: [
                {
                    question: 'Explain why CCSD and CCD have the same formal computational scaling of \\(O(N^6)\\), even though CCSD has more amplitude equations.',
                    hint: 'Compare the number of singles amplitudes (\\(O(N^2)\\)) to the number of doubles amplitudes (\\(O(N^4)\\)). Which dominates?',
                    solution: 'The number of singles amplitudes is \\(o \\cdot v \\sim O(N^2)\\), while the number of doubles amplitudes is \\(O(o^2 v^2) \\sim O(N^4)\\). The doubles equations dominate the cost. The most expensive step in both CCD and CCSD is the doubles-doubles coupling term \\(\\sum_{cd} \\langle ab||cd\\rangle t_{ij}^{cd}\\), which involves a contraction over two virtual indices and scales as \\(o^2 v^4 \\sim O(N^6)\\). The singles equations and their coupling to doubles are at most \\(O(N^5)\\), so they do not increase the leading-order scaling.'
                },
                {
                    question: 'The perturbative triples correction \\(\\Delta E_{(T)}\\) is always negative. Why?',
                    hint: 'Look at the structure of the expression: it involves a squared numerator divided by an orbital energy denominator.',
                    solution: 'The correction \\(\\Delta E_{(T)} = \\frac{1}{36}\\sum_{ijkabc} \\frac{|W_{ijk}^{abc}|^2}{\\varepsilon_i + \\varepsilon_j + \\varepsilon_k - \\varepsilon_a - \\varepsilon_b - \\varepsilon_c}\\). The numerator \\(|W|^2 \\geq 0\\). The denominator is \\(\\sum_i \\varepsilon_i - \\sum_a \\varepsilon_a\\), where \\(\\varepsilon_i < 0\\) are occupied orbital energies (below the Fermi level) and \\(\\varepsilon_a > 0\\) are virtual (above). Hence the denominator is always negative (occupied energies minus virtual energies). So each term contributes a non-positive amount, and \\(\\Delta E_{(T)} \\leq 0\\).'
                },
                {
                    question: 'What is the \\(T_1\\) diagnostic, and why is a value above 0.02 concerning?',
                    hint: 'The \\(T_1\\) diagnostic measures the magnitude of the singles amplitudes. What do large singles amplitudes indicate about the HF reference?',
                    solution: 'The \\(T_1\\) diagnostic is \\(T_1 = \\|\\mathbf{t}_1\\| / \\sqrt{N}\\), where \\(\\mathbf{t}_1\\) is the vector of all \\(t_i^a\\) amplitudes and \\(N\\) is the number of correlated electrons. Large singles amplitudes mean the HF determinant is a poor zeroth-order description (the orbitals need significant relaxation). This typically indicates near-degeneracies or multiconfigurational character. When \\(T_1 > 0.02\\), the perturbative (T) correction, which assumes the CCSD wavefunction is a good starting point, may not be reliable. The system may require multireference treatment.'
                },
                {
                    question: 'For a minimal-basis H\\(_2\\) molecule, show that CCD is equivalent to full CI.',
                    hint: 'How many electrons and orbitals are there? What is the highest possible excitation level?',
                    solution: 'Minimal-basis H\\(_2\\) has 2 electrons in 2 spatial orbitals (4 spin-orbitals: \\(\\sigma_g\\alpha, \\sigma_g\\beta, \\sigma_u^*\\alpha, \\sigma_u^*\\beta\\)). The only possible excitation from \\(|\\sigma_g\\alpha\\, \\sigma_g\\beta\\rangle\\) is the double \\(\\to |\\sigma_u^*\\alpha\\, \\sigma_u^*\\beta\\rangle\\). There are no singles (by spatial symmetry, \\(\\langle\\sigma_u^*|h|\\sigma_g\\rangle = 0\\)) and no triples or higher (only 2 electrons). So CCD includes all possible excitations and is identical to FCI. The CCD equation becomes a single quadratic equation: \\(\\langle ab||ij\\rangle + (\\varepsilon_i + \\varepsilon_j - \\varepsilon_a - \\varepsilon_b)t + \\langle ab||ab\\rangle t^2 = 0\\).'
                },
                {
                    question: 'Compare the storage requirements for CCSD and CCSDT amplitudes for a system with \\(o = 10\\) occupied and \\(v = 100\\) virtual orbitals.',
                    hint: 'Count \\(t_1\\) (\\(o \\times v\\)), \\(t_2\\) (\\(o^2 \\times v^2 / 4\\) unique), and \\(t_3\\) (\\(o^3 \\times v^3\\) with antisymmetry).',
                    solution: 'CCSD: \\(t_1\\) has \\(10 \\times 100 = 1000\\) amplitudes. \\(t_2\\) has \\(\\sim o^2 v^2 / 4 = 10^2 \\times 100^2 / 4 = 2.5 \\times 10^6\\) unique amplitudes. Total CCSD: \\(\\sim 2.5 \\times 10^6\\) (doubles dominate). CCSDT adds \\(t_3\\) with \\(\\sim o^3 v^3 / 36 = 10^3 \\times 10^6 / 36 \\approx 2.8 \\times 10^7\\) unique amplitudes. Total CCSDT: \\(\\sim 3 \\times 10^7\\), about 12 times larger than CCSD. At 8 bytes per double, this is \\(\\sim 240\\) MB for CCSDT vs \\(\\sim 20\\) MB for CCSD. The computational cost ratio is even worse: \\(O(N^8)\\) vs \\(O(N^6)\\).'
                }
            ]
        },

        // ========== SECTION 5: Computational Cost and Practical Considerations ==========
        {
            id: 'sec10-5-cost-practical',
            title: 'Computational Cost and Practical Considerations',
            content: `
<h2>10.5 Computational Cost and Practical Considerations</h2>

<p>The usefulness of any quantum chemical method depends on the balance between accuracy and computational tractability. Coupled cluster methods are among the most accurate, but their steep scaling with system size limits applicability.</p>

<h3>Formal Scaling</h3>

<div class="env-block definition"><div class="env-title">Definition 10.5.1 — Computational Scaling of CC Methods</div><div class="env-body">
The formal computational scaling of the standard CC hierarchy (per iteration, with \\(N\\) representing system size, roughly proportional to the number of basis functions):
<table style="width:100%;text-align:center;margin:10px 0;">
<tr><th>Method</th><th>Scaling</th><th>Rate-determining step</th></tr>
<tr><td>HF</td><td>\\(O(N^4)\\)</td><td>Two-electron integrals</td></tr>
<tr><td>MP2</td><td>\\(O(N^5)\\)</td><td>Integral transformation</td></tr>
<tr><td>CCSD</td><td>\\(O(N^6)\\)</td><td>\\(\\sum_{cd}\\langle ab||cd\\rangle t_{ij}^{cd}\\)</td></tr>
<tr><td>CCSD(T)</td><td>\\(O(N^7)\\)</td><td>Triples amplitude construction</td></tr>
<tr><td>CCSDT</td><td>\\(O(N^8)\\)</td><td>Triples amplitude equations</td></tr>
<tr><td>CCSDTQ</td><td>\\(O(N^{10})\\)</td><td>Quadruples amplitude equations</td></tr>
</table>
More precisely, the scaling is \\(O(o^a v^b)\\) where \\(a + b\\) equals the values above and \\(o, v\\) are the numbers of occupied and virtual orbitals respectively. Since typically \\(v \\gg o\\), the virtual index summations dominate.
</div></div>

<div class="viz-placeholder" data-viz="viz-scaling-chart"></div>

<h3>Practical System Size Limits</h3>

<div class="env-block example"><div class="env-title">Example 10.5.2 — Feasibility Estimates (2024)</div><div class="env-body">
With modern hardware and efficient implementations:
<ul>
<li><strong>CCSD:</strong> Routine for systems up to \\(\\sim\\)500 basis functions. Feasible up to \\(\\sim\\)1000 basis functions with density fitting.</li>
<li><strong>CCSD(T):</strong> Routine up to \\(\\sim\\)300 basis functions. The (T) step often dominates wall time and memory.</li>
<li><strong>CCSDT:</strong> Limited to \\(\\sim\\)50-100 basis functions for benchmarking.</li>
</ul>
These limits shift upward by roughly a factor of 2 every 5-7 years due to hardware improvements and algorithmic advances.
</div></div>

<h3>Reducing the Cost: Modern Approaches</h3>

<div class="env-block definition"><div class="env-title">Definition 10.5.3 — Local Correlation Methods</div><div class="env-body">
Local correlation methods exploit the fact that electron correlation is a <em>short-range</em> phenomenon: the correlation between two electrons decays rapidly with distance. By restricting the excitation space to spatially local orbital pairs, the scaling can be reduced dramatically:
<ul>
<li><strong>Local CC (LCC):</strong> Restricts virtual space to projected atomic orbitals (PAOs) near each occupied pair. Achieves near-linear scaling for large molecules.</li>
<li><strong>DLPNO-CCSD(T):</strong> Domain-based local pair natural orbital CCSD(T) (Neese et al.). Uses pair natural orbitals (PNOs) to compress the virtual space for each pair. Achieves near-linear scaling with controllable accuracy. The method can handle systems with >1000 atoms.</li>
<li><strong>PNO-CC:</strong> Pair natural orbital CC methods construct an optimal compact virtual space for each electron pair via the MP2 pair density.</li>
</ul>
</div></div>

<div class="env-block theorem"><div class="env-title">Theorem 10.5.4 — Decay of Pair Correlation</div><div class="env-body">
For insulating systems, the pair correlation energy between localized orbitals \\(i\\) and \\(j\\) separated by distance \\(R_{ij}\\) decays as
\\[
\\epsilon_{ij} \\sim R_{ij}^{-6} \\quad (R_{ij} \\to \\infty),
\\]
which is the same decay rate as the London dispersion interaction. This rapid decay justifies truncating the pair list in local CC methods.
</div></div>

<div class="env-block proof"><div class="env-title">Proof (sketch)</div><div class="env-body">
The pair correlation energy involves the double excitation amplitudes \\(t_{ij}^{ab}\\), which in the perturbative (MP2) limit are proportional to the two-electron integrals \\(\\langle ij|ab\\rangle / (\\varepsilon_i + \\varepsilon_j - \\varepsilon_a - \\varepsilon_b)\\). For localized orbitals, the integral \\(\\langle ij|ab\\rangle = \\int \\phi_i(\\mathbf{r}_1)\\phi_a(\\mathbf{r}_1) \\frac{1}{r_{12}} \\phi_j(\\mathbf{r}_2)\\phi_b(\\mathbf{r}_2)\\,d\\mathbf{r}_1 d\\mathbf{r}_2\\) behaves as a multipole interaction. The leading contribution is the dipole-dipole interaction, decaying as \\(R^{-3}\\). Since \\(\\epsilon_{ij} \\propto |t_{ij}|^2 \\propto |\\langle ij|ab\\rangle|^2 \\propto R^{-6}\\).
<div class="qed">∎</div>
</div></div>

<h3>Other Practical Considerations</h3>

<div class="env-block remark"><div class="env-title">Remark — Density Fitting / Resolution of Identity</div><div class="env-body">
The RI (resolution of identity) or DF (density fitting) approximation replaces four-center two-electron integrals \\(\\langle pq|rs\\rangle\\) with three-center quantities \\(\\sum_P B_{pq}^P B_{rs}^P\\). This reduces the integral transformation step from \\(O(N^5)\\) to \\(O(N^4)\\) or even \\(O(N^3)\\) with suitable screening, making CCSD much more practical. The error introduced is typically \\(<\\) 0.1 kcal/mol with appropriate auxiliary basis sets.
</div></div>

<div class="env-block remark"><div class="env-title">Remark — Frozen Core Approximation</div><div class="env-body">
Core electrons contribute little to relative energies (bond energies, reaction barriers). The <em>frozen core</em> approximation excludes core orbitals from the correlation treatment, reducing the number of occupied orbitals \\(o\\) and the associated computational cost. For example, in a carbon atom, the 1s electrons are frozen, reducing \\(o\\) by 1 (spatial orbital). This is standard practice and introduces errors of typically \\(<\\) 0.1 kcal/mol for relative energies.
</div></div>

<div class="env-block example"><div class="env-title">Example 10.5.5 — DLPNO-CCSD(T) for a Protein Fragment</div><div class="env-body">
A 2017 benchmark by Liakos et al. demonstrated DLPNO-CCSD(T) on the crambin protein (642 atoms, \\(\\sim\\)7000 basis functions with a triple-zeta basis). The calculation required approximately 2 days on a modern workstation. Canonical CCSD(T) for a system this size would require an estimated \\(10^{12}\\) core-hours, making it effectively impossible. The DLPNO error relative to canonical CCSD(T) was estimated at \\(<\\) 1 kcal/mol for relative energies.
</div></div>

<div class="env-block warning"><div class="env-title">Warning</div><div class="env-body">
Local approximations in CC methods introduce a controllable error that depends on user-defined thresholds (pair cutoffs, PNO truncation, domain sizes). Always check convergence with respect to these thresholds. The "TightPNO" settings in programs like ORCA typically provide near-canonical accuracy at modest additional cost compared to "NormalPNO."
</div></div>
`,
            visualizations: [
                {
                    id: 'viz-scaling-chart',
                    title: 'Computational Scaling: HF through CCSDTQ',
                    description: 'Estimated wall time (arbitrary units) as a function of system size \\(N\\) (number of basis functions) for various methods. Note the logarithmic scale on the vertical axis.',
                    setup(body, controls) {
                        const viz = new VizEngine(body, {
                            scale: 30,
                            originX: 0,
                            originY: 0
                        });
                        const ctx = viz.ctx;
                        const w = viz.width, h = viz.height;

                        let maxN = 200;
                        const sl = VizEngine.createSlider(controls, 'Max N', 50, 500, maxN, 10, v => {
                            maxN = v;
                            draw();
                        });

                        function draw() {
                            viz.clear();

                            const padL = 80, padR = 30, padT = 30, padB = 50;
                            const plotW = w - padL - padR;
                            const plotH = h - padT - padB;

                            // Methods with their scaling exponents and colors
                            const methods = [
                                { name: 'HF', exp: 4, color: viz.colors.text, prefactor: 1e-3 },
                                { name: 'MP2', exp: 5, color: viz.colors.blue, prefactor: 1e-4 },
                                { name: 'CCSD', exp: 6, color: viz.colors.green, prefactor: 1e-6 },
                                { name: 'CCSD(T)', exp: 7, color: viz.colors.orange, prefactor: 1e-8 },
                                { name: 'CCSDT', exp: 8, color: viz.colors.red, prefactor: 1e-10 },
                                { name: 'CCSDTQ', exp: 10, color: viz.colors.purple, prefactor: 1e-14 }
                            ];

                            // Log scale for y axis
                            const logMin = -2, logMax = 14;

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

                            // X axis labels
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            for (let n = 0; n <= maxN; n += Math.max(10, Math.round(maxN / 10))) {
                                if (n === 0) continue;
                                const x = padL + (n / maxN) * plotW;
                                ctx.fillText(n, x, h - padB + 6);
                                ctx.strokeStyle = viz.colors.grid;
                                ctx.lineWidth = 0.5;
                                ctx.beginPath();
                                ctx.moveTo(x, h - padB);
                                ctx.lineTo(x, padT);
                                ctx.stroke();
                            }
                            ctx.fillText('N (basis functions)', padL + plotW / 2, h - 10);

                            // Y axis labels (log scale)
                            ctx.textAlign = 'right';
                            ctx.textBaseline = 'middle';
                            for (let p = logMin; p <= logMax; p += 2) {
                                const y = h - padB - ((p - logMin) / (logMax - logMin)) * plotH;
                                ctx.fillStyle = viz.colors.text;
                                ctx.fillText('10^' + p, padL - 8, y);
                                ctx.strokeStyle = viz.colors.grid;
                                ctx.lineWidth = 0.5;
                                ctx.beginPath();
                                ctx.moveTo(padL, y);
                                ctx.lineTo(padL + plotW, y);
                                ctx.stroke();
                            }

                            ctx.save();
                            ctx.translate(14, h / 2);
                            ctx.rotate(-Math.PI / 2);
                            ctx.fillStyle = viz.colors.text;
                            ctx.textAlign = 'center';
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.fillText('Wall time (arb. units)', 0, 0);
                            ctx.restore();

                            // Plot each method
                            for (const m of methods) {
                                ctx.strokeStyle = m.color;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                let started = false;
                                for (let n = 10; n <= maxN; n += 2) {
                                    const t = m.prefactor * Math.pow(n, m.exp);
                                    const logT = Math.log10(t);
                                    if (logT < logMin || logT > logMax) {
                                        if (logT > logMax && started) break;
                                        continue;
                                    }
                                    const x = padL + (n / maxN) * plotW;
                                    const y = h - padB - ((logT - logMin) / (logMax - logMin)) * plotH;
                                    if (!started) { ctx.moveTo(x, y); started = true; }
                                    else ctx.lineTo(x, y);
                                }
                                ctx.stroke();

                                // Label at the end of each line
                                let labelN = maxN;
                                let labelT = m.prefactor * Math.pow(labelN, m.exp);
                                let logLT = Math.log10(labelT);
                                if (logLT > logMax) {
                                    // Find N where logT = logMax - 1
                                    labelN = Math.pow(Math.pow(10, logMax - 1) / m.prefactor, 1 / m.exp);
                                    labelT = m.prefactor * Math.pow(labelN, m.exp);
                                    logLT = Math.log10(labelT);
                                }
                                if (logLT >= logMin && labelN >= 10 && labelN <= maxN) {
                                    const lx = padL + (labelN / maxN) * plotW + 4;
                                    const ly = h - padB - ((logLT - logMin) / (logMax - logMin)) * plotH;
                                    ctx.fillStyle = m.color;
                                    ctx.font = 'bold 11px -apple-system,sans-serif';
                                    ctx.textAlign = 'left';
                                    ctx.textBaseline = 'middle';
                                    ctx.fillText(m.name + ' (N^' + m.exp + ')', lx, ly);
                                }
                            }

                            // Title
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Computational Scaling of Quantum Chemistry Methods', w / 2, 16);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'If a CCSD calculation on a molecule with 100 basis functions takes 1 hour, estimate the wall time for the same molecule with 200 basis functions.',
                    hint: 'Use the \\(O(N^6)\\) scaling. If \\(N\\) doubles, the time increases by a factor of \\(2^6\\).',
                    solution: 'With \\(O(N^6)\\) scaling, doubling \\(N\\) increases the time by \\(2^6 = 64\\). So the calculation with 200 basis functions would take approximately \\(64 \\times 1\\) hour = 64 hours \\(\\approx 2.7\\) days. This is a rough estimate; the actual scaling may be slightly different due to prefactors and the ratio of occupied to virtual orbitals.'
                },
                {
                    question: 'Why does the pair correlation energy \\(\\epsilon_{ij}\\) decay as \\(R^{-6}\\) rather than \\(R^{-3}\\)?',
                    hint: 'The energy involves the <em>square</em> of the amplitude, and each amplitude involves an integral that decays as \\(R^{-3}\\).',
                    solution: 'The pair correlation energy is \\(\\epsilon_{ij} \\approx \\sum_{ab} |t_{ij}^{ab}|^2 (\\varepsilon_i + \\varepsilon_j - \\varepsilon_a - \\varepsilon_b)\\). At the MP2 level, \\(t_{ij}^{ab} \\propto \\langle ij|ab\\rangle / \\Delta\\varepsilon\\). For localized orbitals separated by \\(R\\), the integral \\(\\langle ij|ab\\rangle\\) decays as \\(R^{-3}\\) (dipole-dipole interaction). Since the energy involves \\(|t|^2 \\propto |\\langle ij|ab\\rangle|^2 \\propto R^{-6}\\), the pair correlation energy decays as \\(R^{-6}\\). This is the same physics as London dispersion forces.'
                },
                {
                    question: 'Explain why the frozen core approximation has negligible effect on relative energies but can affect absolute energies significantly.',
                    hint: 'Consider what happens to core electrons during a chemical reaction.',
                    solution: 'Core electrons (e.g., 1s on carbon) are tightly bound and barely change between reactants and products. Their absolute correlation energy is significant (\\(\\sim\\)10-20 mHartree per core pair), but this contribution is nearly identical on both sides of a reaction. Hence it cancels in energy differences. The frozen core approximation removes this constant contribution, introducing errors of \\(<\\) 0.1 kcal/mol for relative energies while changing absolute energies by many kcal/mol. Core-valence correlation effects become important only for high-accuracy work (sub-kJ/mol) or when core electrons participate in bonding (e.g., heavy elements).'
                },
                {
                    question: 'In DLPNO-CCSD(T), what determines the size of the PNO space for each electron pair, and what happens if the PNO truncation threshold is too aggressive?',
                    hint: 'PNOs are the natural orbitals of the pair density from an MP2-like calculation. Their occupation numbers determine importance.',
                    solution: 'The PNO space for each pair \\((i,j)\\) is constructed from the eigenvectors of the MP2-level pair density matrix \\(D_{ij} = T_{ij}T_{ij}^\\dagger\\). The eigenvalues (PNO occupation numbers) decay rapidly, and PNOs with occupation below a threshold \\(\\tau_{\\text{PNO}}\\) are discarded. Typical thresholds are \\(\\tau = 10^{-6}\\) (NormalPNO) to \\(10^{-7}\\) (TightPNO). Too aggressive truncation (large \\(\\tau\\)) discards PNOs that contribute to the pair correlation energy, introducing a systematic positive error (correlation energy is underestimated). This can affect relative energies if different regions of the PES are affected differently.'
                },
                {
                    question: 'A CCSD(T)/cc-pVTZ calculation on benzene (\\(N \\approx 264\\) basis functions) takes 8 hours. Estimate the time for naphthalene (\\(N \\approx 440\\)) at the same level.',
                    hint: 'The (T) step dominates and scales as \\(O(N^7)\\). Compute the ratio \\((440/264)^7\\).',
                    solution: 'The ratio is \\((440/264)^7 = (5/3)^7 \\approx 1.667^7 \\approx 35.6 \\times 1.667 \\approx 59.4 \\times 1.667 \\approx 99\\). Wait, let me compute carefully: \\(1.667^2 = 2.78\\), \\(1.667^3 = 4.63\\), \\(1.667^4 = 7.72\\), \\(1.667^5 = 12.86\\), \\(1.667^6 = 21.44\\), \\(1.667^7 = 35.7\\). So naphthalene would take approximately \\(8 \\times 35.7 \\approx 286\\) hours \\(\\approx 12\\) days. This illustrates why the (T) correction is often the bottleneck for medium-sized molecules, and why local methods like DLPNO-CCSD(T) are essential.'
                },
                {
                    question: 'Prove that the resolution of identity approximation \\(\\langle pq|rs\\rangle \\approx \\sum_P B_{pq}^P B_{rs}^P\\) is exact if the auxiliary basis \\(\\{\\chi_P\\}\\) is complete.',
                    hint: 'Insert the identity \\(\\hat{1} = \\sum_P |\\chi_P\\rangle\\langle\\chi_P|\\) (in the product function space) into the integral.',
                    solution: 'The two-electron integral is \\(\\langle pq|rs\\rangle = \\int \\phi_p(1)\\phi_q(1) r_{12}^{-1} \\phi_r(2)\\phi_s(2)\\). Define \\(\\rho_{pq}(\\mathbf{r}) = \\phi_p(\\mathbf{r})\\phi_q(\\mathbf{r})\\). The RI approximation expands \\(\\rho_{pq} \\approx \\sum_P c_{pq}^P \\chi_P\\) in the auxiliary basis. If the auxiliary basis is complete, this expansion is exact: \\(\\rho_{pq} = \\sum_P c_{pq}^P \\chi_P\\). Then \\(\\langle pq|rs\\rangle = \\sum_{PQ} c_{pq}^P (P|Q) c_{rs}^Q\\). With \\(B_{pq}^P = \\sum_Q c_{pq}^Q (Q|P)^{1/2}\\) (Cholesky or similar factorization of the metric), this becomes \\(\\sum_P B_{pq}^P B_{rs}^P\\), which is exact.'
                }
            ]
        }
    ]
});
