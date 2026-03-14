window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch00',
    number: 0,
    title: 'Mathematical Foundations',
    subtitle: 'The mathematical language of quantum chemistry: linear algebra, calculus, and probability',
    sections: [
        // ===================== Section 1: Hilbert Spaces and Dirac Notation =====================
        {
            id: 'ch00-sec01',
            title: 'Hilbert Spaces and Dirac Notation',
            content: `<h2>Hilbert Spaces and Dirac Notation</h2>

                <div class="env-block intuition">
                    <div class="env-title">Why Hilbert Spaces?</div>
                    <div class="env-body"><p>Quantum mechanics lives in infinite-dimensional vector spaces equipped with an inner product. The mathematical framework of <strong>Hilbert spaces</strong> provides the rigorous foundation for everything from atomic orbitals to molecular electronic structure. Dirac's bra-ket notation, invented to tame these infinite-dimensional objects, is the lingua franca of quantum chemistry.</p></div>
                </div>

                <h3>Vector Spaces over \\(\\mathbb{C}\\)</h3>
                <p>A quantum state is an element of a complex vector space. Recall that a <strong>vector space</strong> \\(V\\) over \\(\\mathbb{C}\\) is a set equipped with addition and scalar multiplication satisfying the usual axioms (closure, associativity, commutativity of addition, existence of zero vector and additive inverses, distributivity). In quantum mechanics, the scalars are complex numbers because interference phenomena require complex amplitudes.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition (Inner Product Space)</div>
                    <div class="env-body"><p>An <strong>inner product</strong> on a complex vector space \\(V\\) is a map \\(\\langle \\cdot | \\cdot \\rangle : V \\times V \\to \\mathbb{C}\\) satisfying:</p>
                    <ol>
                        <li><strong>Conjugate symmetry:</strong> \\(\\langle \\phi | \\psi \\rangle = \\langle \\psi | \\phi \\rangle^*\\)</li>
                        <li><strong>Linearity in second argument:</strong> \\(\\langle \\phi | \\alpha\\psi_1 + \\beta\\psi_2 \\rangle = \\alpha\\langle \\phi | \\psi_1 \\rangle + \\beta\\langle \\phi | \\psi_2 \\rangle\\)</li>
                        <li><strong>Positive definiteness:</strong> \\(\\langle \\psi | \\psi \\rangle \\geq 0\\), with equality iff \\(|\\psi\\rangle = 0\\)</li>
                    </ol>
                    <p>The convention above (linear in the second slot) is the <strong>physics convention</strong>; mathematicians often choose linearity in the first slot.</p></div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition (Hilbert Space)</div>
                    <div class="env-body"><p>A <strong>Hilbert space</strong> \\(\\mathcal{H}\\) is a complete inner product space: every Cauchy sequence in \\(\\mathcal{H}\\) converges to an element of \\(\\mathcal{H}\\). Completeness ensures that infinite linear combinations (needed for expanding wavefunctions in basis sets) are well-defined.</p></div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example (\\(L^2\\) Space)</div>
                    <div class="env-body"><p>The space \\(L^2(\\mathbb{R}^3)\\) of square-integrable functions is the Hilbert space of spatial wavefunctions:
                    \\[\\langle \\phi | \\psi \\rangle = \\int_{\\mathbb{R}^3} \\phi^*(\\mathbf{r})\\,\\psi(\\mathbf{r})\\,d^3\\mathbf{r}\\]
                    The norm \\(\\|\\psi\\| = \\sqrt{\\langle \\psi | \\psi \\rangle}\\) must be finite, which physically means the probability of finding the particle somewhere is finite (and normalized to 1).</p></div>
                </div>

                <h3>Dirac Notation</h3>
                <p>Dirac's bra-ket notation provides a powerful, basis-independent way to write quantum mechanical expressions.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition (Kets, Bras, and Brackets)</div>
                    <div class="env-body">
                    <ul>
                        <li>A <strong>ket</strong> \\(|\\psi\\rangle\\) represents a vector (state) in \\(\\mathcal{H}\\).</li>
                        <li>A <strong>bra</strong> \\(\\langle\\phi|\\) is the dual vector (linear functional) corresponding to \\(|\\phi\\rangle\\) via the Riesz representation theorem.</li>
                        <li>The <strong>bracket</strong> \\(\\langle\\phi|\\psi\\rangle\\) is the inner product, a complex number.</li>
                        <li>The <strong>outer product</strong> \\(|\\psi\\rangle\\langle\\phi|\\) is a linear operator mapping \\(|\\chi\\rangle \\mapsto \\langle\\phi|\\chi\\rangle\\,|\\psi\\rangle\\).</li>
                    </ul></div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem (Riesz Representation)</div>
                    <div class="env-body"><p>For every bounded linear functional \\(f: \\mathcal{H} \\to \\mathbb{C}\\) on a Hilbert space, there exists a unique \\(|\\phi\\rangle \\in \\mathcal{H}\\) such that \\(f(|\\psi\\rangle) = \\langle\\phi|\\psi\\rangle\\) for all \\(|\\psi\\rangle \\in \\mathcal{H}\\). This theorem justifies the bra-ket duality.</p></div>
                </div>

                <h3>Orthonormal Bases and Completeness</h3>
                <p>An <strong>orthonormal set</strong> \\(\\{|e_i\\rangle\\}\\) satisfies \\(\\langle e_i | e_j \\rangle = \\delta_{ij}\\). If the set spans the entire Hilbert space, it is an <strong>orthonormal basis</strong> (or complete orthonormal system).</p>

                <div class="env-block theorem">
                    <div class="env-title">Theorem (Completeness Relation / Resolution of the Identity)</div>
                    <div class="env-body"><p>If \\(\\{|e_i\\rangle\\}\\) is a complete orthonormal basis for \\(\\mathcal{H}\\), then
                    \\[\\sum_i |e_i\\rangle\\langle e_i| = \\hat{I}\\]
                    where \\(\\hat{I}\\) is the identity operator. For continuous bases (e.g., position eigenstates), the sum becomes an integral:
                    \\[\\int |\\mathbf{r}\\rangle\\langle\\mathbf{r}|\\,d^3\\mathbf{r} = \\hat{I}\\]
                    This allows any state to be expanded as \\(|\\psi\\rangle = \\sum_i \\langle e_i|\\psi\\rangle\\,|e_i\\rangle\\), where \\(c_i = \\langle e_i|\\psi\\rangle\\) are the expansion coefficients.</p></div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof Sketch</div>
                    <div class="env-body"><p>For any \\(|\\psi\\rangle\\), define \\(|\\psi_N\\rangle = \\sum_{i=1}^N \\langle e_i|\\psi\\rangle\\,|e_i\\rangle\\). By Bessel's inequality, \\(\\sum_i |\\langle e_i|\\psi\\rangle|^2 \\leq \\|\\psi\\|^2\\), so the partial sums form a Cauchy sequence. By completeness of \\(\\mathcal{H}\\), the limit exists. The basis being complete means \\(\\|\\psi - \\psi_N\\| \\to 0\\), yielding Parseval's equality \\(\\sum_i |\\langle e_i|\\psi\\rangle|^2 = \\|\\psi\\|^2\\).</p>
                    <div class="qed">&#8718;</div></div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example (Position and Momentum Representations)</div>
                    <div class="env-body"><p>Inserting the position completeness relation:
                    \\[\\psi(\\mathbf{r}) = \\langle\\mathbf{r}|\\psi\\rangle\\]
                    This is the wavefunction in position representation. Similarly, inserting the momentum completeness relation gives the momentum-space wavefunction:
                    \\[\\tilde{\\psi}(\\mathbf{p}) = \\langle\\mathbf{p}|\\psi\\rangle = \\frac{1}{(2\\pi\\hbar)^{3/2}} \\int e^{-i\\mathbf{p}\\cdot\\mathbf{r}/\\hbar}\\,\\psi(\\mathbf{r})\\,d^3\\mathbf{r}\\]
                    which is the Fourier transform of \\(\\psi(\\mathbf{r})\\).</p></div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark</div>
                    <div class="env-body"><p>The "position eigenstates" \\(|\\mathbf{r}\\rangle\\) are not normalizable (they are distributions, not \\(L^2\\) functions). This is handled rigorously via <strong>rigged Hilbert spaces</strong> (Gel'fand triples): \\(\\Phi \\subset \\mathcal{H} \\subset \\Phi'\\), where \\(\\Phi\\) is a dense nuclear subspace and \\(\\Phi'\\) its topological dual. For practical quantum chemistry, we work with finite basis sets and avoid these subtleties.</p></div>
                </div>

                <div class="viz-placeholder" data-viz="viz-superposition"></div>`,

            visualizations: [
                {
                    id: 'viz-superposition',
                    title: 'Wavefunction Superposition and Probability Density',
                    description: 'Adjust coefficients \\(c_1\\) and \\(c_2\\) to form the superposition \\(\\psi(x) = c_1\\phi_1(x) + c_2\\phi_2(x)\\) of the first two particle-in-a-box states. Observe how the probability density \\(|\\psi|^2\\) changes.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {scale: 40, originX: 60, originY: body.clientHeight ? body.clientHeight * 0.55 : 220});
                        var c1 = 0.8, c2 = 0.6;
                        var L = 8;

                        VizEngine.createSlider(controls, 'c\u2081', -1, 1, c1, 0.05, function(v) { c1 = v; draw(); });
                        VizEngine.createSlider(controls, 'c\u2082', -1, 1, c2, 0.05, function(v) { c2 = v; draw(); });

                        function phi(n, x) {
                            if (x < 0 || x > L) return 0;
                            return Math.sqrt(2 / L) * Math.sin(n * Math.PI * x / L);
                        }

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            var norm = Math.sqrt(c1 * c1 + c2 * c2);
                            var a1 = norm > 1e-10 ? c1 / norm : c1;
                            var a2 = norm > 1e-10 ? c2 / norm : c2;

                            // phi_1
                            viz.drawFunction(function(x) { return phi(1, x); }, 0, L, viz.colors.blue, 1.5);
                            // phi_2
                            viz.drawFunction(function(x) { return phi(2, x); }, 0, L, viz.colors.teal, 1.5);
                            // superposition
                            viz.drawFunction(function(x) { return a1 * phi(1, x) + a2 * phi(2, x); }, 0, L, viz.colors.orange, 2.5);
                            // probability density
                            viz.drawFunction(function(x) {
                                var psi = a1 * phi(1, x) + a2 * phi(2, x);
                                return psi * psi;
                            }, 0, L, viz.colors.purple, 2);

                            var ctx = viz.ctx;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillStyle = viz.colors.blue; ctx.fillText('\u03c6\u2081(x)', viz.width - 130, 20);
                            ctx.fillStyle = viz.colors.teal; ctx.fillText('\u03c6\u2082(x)', viz.width - 130, 38);
                            ctx.fillStyle = viz.colors.orange; ctx.fillText('\u03c8(x) = c\u2081\u03c6\u2081 + c\u2082\u03c6\u2082', viz.width - 130, 56);
                            ctx.fillStyle = viz.colors.purple; ctx.fillText('|\u03c8(x)|\u00b2', viz.width - 130, 74);

                            ctx.fillStyle = viz.colors.white; ctx.font = '11px -apple-system,sans-serif';
                            ctx.fillText('Norm: ' + norm.toFixed(3) + (Math.abs(norm - 1) < 0.01 ? ' (normalized)' : ' (renormalized)'), 10, 20);
                        }
                        draw();
                        return viz;
                    }
                }
            ],

            exercises: [
                {
                    question: 'Show that the inner product \\(\\langle\\phi|\\psi\\rangle = \\int_{-\\infty}^{\\infty} \\phi^*(x)\\psi(x)\\,dx\\) satisfies conjugate symmetry and positive definiteness.',
                    hint: 'For conjugate symmetry, use \\((z^*)^* = z\\). For positive definiteness, note \\(|\\psi(x)|^2 \\geq 0\\) pointwise.',
                    solution: '<p><strong>Conjugate symmetry:</strong> \\(\\langle\\psi|\\phi\\rangle = \\int \\psi^*(x)\\phi(x)\\,dx = \\left(\\int \\phi^*(x)\\psi(x)\\,dx\\right)^* = \\langle\\phi|\\psi\\rangle^*\\).</p><p><strong>Positive definiteness:</strong> \\(\\langle\\psi|\\psi\\rangle = \\int |\\psi(x)|^2\\,dx \\geq 0\\). Equality holds iff \\(|\\psi(x)|^2 = 0\\) a.e., i.e., \\(\\psi = 0\\) in \\(L^2\\).</p>'
                },
                {
                    question: 'Given the orthonormal basis \\(\\{|1\\rangle, |2\\rangle\\}\\) and state \\(|\\psi\\rangle = \\frac{3}{5}|1\\rangle + \\frac{4}{5}|2\\rangle\\), compute \\(\\langle\\psi|\\psi\\rangle\\) and verify normalization.',
                    hint: 'Use linearity: \\(\\langle\\psi|\\psi\\rangle = |c_1|^2 + |c_2|^2\\).',
                    solution: '<p>\\(\\langle\\psi|\\psi\\rangle = \\left(\\frac{3}{5}\\right)^2 + \\left(\\frac{4}{5}\\right)^2 = \\frac{9}{25} + \\frac{16}{25} = 1\\). The state is normalized.</p>'
                },
                {
                    question: 'Prove that \\(\\langle\\phi|\\psi\\rangle = 0\\) implies \\(\\||\\phi\\rangle + |\\psi\\rangle\\|^2 = \\|\\phi\\|^2 + \\|\\psi\\|^2\\) (the Pythagorean theorem for Hilbert spaces).',
                    hint: 'Expand the norm squared using linearity of the inner product.',
                    solution: '<p>\\(\\||\\phi\\rangle + |\\psi\\rangle\\|^2 = \\langle\\phi + \\psi|\\phi + \\psi\\rangle = \\langle\\phi|\\phi\\rangle + \\langle\\phi|\\psi\\rangle + \\langle\\psi|\\phi\\rangle + \\langle\\psi|\\psi\\rangle\\). Since \\(\\langle\\phi|\\psi\\rangle = 0\\), we also have \\(\\langle\\psi|\\phi\\rangle = \\langle\\phi|\\psi\\rangle^* = 0\\). Thus the cross terms vanish, giving \\(\\|\\phi\\|^2 + \\|\\psi\\|^2\\).</p>'
                },
                {
                    question: 'Show that the completeness relation \\(\\sum_i |e_i\\rangle\\langle e_i| = \\hat{I}\\) implies Parseval\'s equality: \\(\\langle\\psi|\\psi\\rangle = \\sum_i |\\langle e_i|\\psi\\rangle|^2\\).',
                    hint: 'Insert the completeness relation between the bra and ket in \\(\\langle\\psi|\\psi\\rangle\\).',
                    solution: '<p>\\(\\langle\\psi|\\psi\\rangle = \\langle\\psi|\\hat{I}|\\psi\\rangle = \\langle\\psi|\\left(\\sum_i |e_i\\rangle\\langle e_i|\\right)|\\psi\\rangle = \\sum_i \\langle\\psi|e_i\\rangle\\langle e_i|\\psi\\rangle = \\sum_i |\\langle e_i|\\psi\\rangle|^2\\).</p>'
                },
                {
                    question: 'Prove the Cauchy-Schwarz inequality \\(|\\langle\\phi|\\psi\\rangle|^2 \\leq \\langle\\phi|\\phi\\rangle\\langle\\psi|\\psi\\rangle\\) for an inner product space.',
                    hint: 'Consider \\(|\\chi\\rangle = |\\psi\\rangle - \\frac{\\langle\\phi|\\psi\\rangle}{\\langle\\phi|\\phi\\rangle}|\\phi\\rangle\\) and use \\(\\langle\\chi|\\chi\\rangle \\geq 0\\).',
                    solution: '<p>Assume \\(|\\phi\\rangle \\neq 0\\). Let \\(\\lambda = \\frac{\\langle\\phi|\\psi\\rangle}{\\langle\\phi|\\phi\\rangle}\\) and \\(|\\chi\\rangle = |\\psi\\rangle - \\lambda|\\phi\\rangle\\). Then \\(0 \\leq \\langle\\chi|\\chi\\rangle = \\langle\\psi|\\psi\\rangle - \\lambda^*\\langle\\phi|\\psi\\rangle - \\lambda\\langle\\psi|\\phi\\rangle + |\\lambda|^2\\langle\\phi|\\phi\\rangle = \\langle\\psi|\\psi\\rangle - \\frac{|\\langle\\phi|\\psi\\rangle|^2}{\\langle\\phi|\\phi\\rangle}\\). Rearranging gives the result.</p>'
                }
            ]
        },

        // ===================== Section 2: Operators and Eigenvalue Problems =====================
        {
            id: 'ch00-sec02',
            title: 'Operators and Eigenvalue Problems',
            content: `<h2>Operators and Eigenvalue Problems</h2>

                <p>In quantum mechanics, physical observables (energy, momentum, position, angular momentum) are represented by <strong>linear operators</strong> acting on the Hilbert space. The possible outcomes of a measurement are the <strong>eigenvalues</strong> of the corresponding operator; the states that give definite measurement outcomes are the <strong>eigenstates</strong>.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition (Linear Operator)</div>
                    <div class="env-body"><p>A <strong>linear operator</strong> \\(\\hat{A}: \\mathcal{H} \\to \\mathcal{H}\\) satisfies
                    \\[\\hat{A}(\\alpha|\\psi\\rangle + \\beta|\\phi\\rangle) = \\alpha\\hat{A}|\\psi\\rangle + \\beta\\hat{A}|\\phi\\rangle\\]
                    for all \\(\\alpha, \\beta \\in \\mathbb{C}\\) and \\(|\\psi\\rangle, |\\phi\\rangle \\in \\mathcal{H}\\).</p></div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition (Hermitian / Self-Adjoint Operator)</div>
                    <div class="env-body"><p>An operator \\(\\hat{A}\\) is <strong>Hermitian</strong> (self-adjoint) if \\(\\hat{A} = \\hat{A}^\\dagger\\), meaning
                    \\[\\langle\\phi|\\hat{A}|\\psi\\rangle = \\langle\\hat{A}\\phi|\\psi\\rangle \\quad \\text{for all } |\\phi\\rangle, |\\psi\\rangle \\in \\mathcal{D}(\\hat{A})\\]
                    where \\(\\hat{A}^\\dagger\\) is the adjoint defined by \\(\\langle\\phi|\\hat{A}^\\dagger|\\psi\\rangle = \\langle\\hat{A}\\phi|\\psi\\rangle\\). In matrix representation, \\(A^\\dagger = (A^T)^* = \\bar{A}^T\\).</p></div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem (Properties of Hermitian Operators)</div>
                    <div class="env-body"><p>Let \\(\\hat{A}\\) be Hermitian. Then:</p>
                    <ol>
                        <li><strong>Real eigenvalues:</strong> If \\(\\hat{A}|a\\rangle = a|a\\rangle\\), then \\(a \\in \\mathbb{R}\\).</li>
                        <li><strong>Orthogonal eigenstates:</strong> If \\(\\hat{A}|a\\rangle = a|a\\rangle\\) and \\(\\hat{A}|a'\\rangle = a'|a'\\rangle\\) with \\(a \\neq a'\\), then \\(\\langle a|a'\\rangle = 0\\).</li>
                        <li><strong>Spectral decomposition:</strong> \\(\\hat{A} = \\sum_a a\\,|a\\rangle\\langle a|\\) (for non-degenerate discrete spectrum).</li>
                    </ol></div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body"><p><strong>(1)</strong> \\(a\\langle a|a\\rangle = \\langle a|\\hat{A}|a\\rangle = \\langle\\hat{A}a|a\\rangle = a^*\\langle a|a\\rangle\\). Since \\(\\langle a|a\\rangle > 0\\), we get \\(a = a^*\\), so \\(a \\in \\mathbb{R}\\).</p>
                    <p><strong>(2)</strong> \\(a\\langle a'|a\\rangle = \\langle a'|\\hat{A}|a\\rangle = \\langle\\hat{A}a'|a\\rangle = a'^*\\langle a'|a\\rangle = a'\\langle a'|a\\rangle\\) (using part 1). Thus \\((a - a')\\langle a'|a\\rangle = 0\\). Since \\(a \\neq a'\\), we conclude \\(\\langle a'|a\\rangle = 0\\).</p>
                    <p><strong>(3)</strong> Follows from completeness of the eigenstates and the eigenvalue equation.</p>
                    <div class="qed">&#8718;</div></div>
                </div>

                <h3>Commutators and Compatible Observables</h3>

                <div class="env-block definition">
                    <div class="env-title">Definition (Commutator)</div>
                    <div class="env-body"><p>The <strong>commutator</strong> of two operators is
                    \\[[\\hat{A}, \\hat{B}] = \\hat{A}\\hat{B} - \\hat{B}\\hat{A}\\]
                    If \\([\\hat{A}, \\hat{B}] = 0\\), the operators <strong>commute</strong> and are called <strong>compatible observables</strong>. Compatible observables share a complete set of simultaneous eigenstates.</p></div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example (Canonical Commutation Relation)</div>
                    <div class="env-body"><p>The position and momentum operators satisfy
                    \\[[\\hat{x}, \\hat{p}] = i\\hbar\\]
                    To verify in position representation where \\(\\hat{x} = x\\) and \\(\\hat{p} = -i\\hbar\\frac{\\partial}{\\partial x}\\):
                    \\[[\\hat{x}, \\hat{p}]\\psi = x(-i\\hbar)\\psi' - (-i\\hbar)\\frac{\\partial}{\\partial x}(x\\psi) = -i\\hbar x\\psi' + i\\hbar\\psi + i\\hbar x\\psi' = i\\hbar\\psi\\]
                    Thus \\([\\hat{x}, \\hat{p}] = i\\hbar\\hat{I}\\).</p></div>
                </div>

                <h3>The Uncertainty Principle</h3>

                <div class="env-block theorem">
                    <div class="env-title">Theorem (Generalized Uncertainty Principle)</div>
                    <div class="env-body"><p>For any two Hermitian operators \\(\\hat{A}\\) and \\(\\hat{B}\\),
                    \\[\\Delta A \\cdot \\Delta B \\geq \\frac{1}{2}|\\langle[\\hat{A}, \\hat{B}]\\rangle|\\]
                    where \\(\\Delta A = \\sqrt{\\langle\\hat{A}^2\\rangle - \\langle\\hat{A}\\rangle^2}\\) is the standard deviation of \\(\\hat{A}\\) in state \\(|\\psi\\rangle\\).</p></div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body"><p>Define \\(\\hat{A}' = \\hat{A} - \\langle\\hat{A}\\rangle\\) and \\(\\hat{B}' = \\hat{B} - \\langle\\hat{B}\\rangle\\). Note \\([\\hat{A}', \\hat{B}'] = [\\hat{A}, \\hat{B}]\\). Consider \\(|\\chi\\rangle = (\\hat{A}' + i\\lambda\\hat{B}')|\\psi\\rangle\\) for real \\(\\lambda\\). Then \\(\\langle\\chi|\\chi\\rangle \\geq 0\\) gives:
                    \\[(\\Delta A)^2 + \\lambda^2(\\Delta B)^2 + i\\lambda\\langle[\\hat{A}', \\hat{B}']\\rangle \\geq 0\\]
                    Since \\(\\langle[\\hat{A}, \\hat{B}]\\rangle\\) is purely imaginary for Hermitian operators, write \\(\\langle[\\hat{A}, \\hat{B}]\\rangle = iC\\) with \\(C \\in \\mathbb{R}\\). This becomes \\((\\Delta A)^2 + \\lambda^2(\\Delta B)^2 - \\lambda C \\geq 0\\) for all \\(\\lambda\\). Minimizing over \\(\\lambda\\): \\(\\lambda_{\\min} = C/(2(\\Delta B)^2)\\), substituting back yields \\((\\Delta A)^2(\\Delta B)^2 \\geq C^2/4\\). Taking square roots: \\(\\Delta A \\cdot \\Delta B \\geq |C|/2 = \\frac{1}{2}|\\langle[\\hat{A}, \\hat{B}]\\rangle|\\).</p>
                    <div class="qed">&#8718;</div></div>
                </div>

                <div class="env-block corollary">
                    <div class="env-title">Corollary (Heisenberg Uncertainty Principle)</div>
                    <div class="env-body"><p>For position and momentum: \\(\\Delta x \\cdot \\Delta p \\geq \\frac{\\hbar}{2}\\). The minimum uncertainty is achieved by Gaussian wavepackets.</p></div>
                </div>

                <div class="viz-placeholder" data-viz="viz-uncertainty"></div>

                <div class="env-block remark">
                    <div class="env-title">Remark (Commutator Algebra)</div>
                    <div class="env-body"><p>Useful identities for commutator calculations:</p>
                    <ul>
                        <li>\\([\\hat{A}, \\hat{B}\\hat{C}] = [\\hat{A}, \\hat{B}]\\hat{C} + \\hat{B}[\\hat{A}, \\hat{C}]\\)</li>
                        <li>\\([\\hat{A}\\hat{B}, \\hat{C}] = \\hat{A}[\\hat{B}, \\hat{C}] + [\\hat{A}, \\hat{C}]\\hat{B}\\)</li>
                        <li>\\([\\hat{A}, [\\hat{B}, \\hat{C}]] + [\\hat{B}, [\\hat{C}, \\hat{A}]] + [\\hat{C}, [\\hat{A}, \\hat{B}]] = 0\\) (Jacobi identity)</li>
                    </ul></div>
                </div>`,

            visualizations: [
                {
                    id: 'viz-uncertainty',
                    title: 'Uncertainty Principle Demonstrator',
                    description: 'A Gaussian wavepacket \\(\\psi(x) \\propto e^{-x^2/(4\\sigma_x^2)}\\) has momentum-space width \\(\\sigma_p = \\hbar/(2\\sigma_x)\\). Drag the slider to see how narrowing the position distribution broadens the momentum distribution, and vice versa. The product \\(\\Delta x \\cdot \\Delta p = \\hbar/2\\) remains at the minimum.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {scale: 30, originX: body.clientWidth ? body.clientWidth * 0.25 : 140, originY: body.clientHeight ? body.clientHeight * 0.5 : 180});
                        var sigmaX = 1.5;
                        var hbar = 1.0;

                        VizEngine.createSlider(controls, '\u03c3\u2093 (position width)', 0.3, 4, sigmaX, 0.1, function(v) {
                            sigmaX = v; draw();
                        });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var halfW = viz.width / 2;

                            // LEFT PANEL: position space
                            ctx.save();
                            ctx.beginPath();
                            ctx.rect(0, 0, halfW, viz.height);
                            ctx.clip();

                            var vizLeft = {
                                toScreen: function(x, y) { return [halfW * 0.5 + x * 30, viz.height * 0.5 - y * 80]; }
                            };

                            // Grid and axis for left panel
                            ctx.strokeStyle = viz.colors.grid; ctx.lineWidth = 0.5;
                            var lox = vizLeft.toScreen(0, 0);
                            ctx.beginPath(); ctx.moveTo(20, lox[1]); ctx.lineTo(halfW - 5, lox[1]); ctx.stroke();
                            ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.moveTo(20, lox[1]); ctx.lineTo(halfW - 5, lox[1]); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(lox[0], 10); ctx.lineTo(lox[0], viz.height - 10); ctx.stroke();

                            // Draw psi(x)
                            ctx.strokeStyle = viz.colors.blue; ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            var started = false;
                            for (var i = 0; i <= 200; i++) {
                                var x = -5 + 10 * i / 200;
                                var y = (1 / (sigmaX * Math.sqrt(2 * Math.PI))) * Math.exp(-x * x / (2 * sigmaX * sigmaX));
                                var sp = vizLeft.toScreen(x, y);
                                if (!started) { ctx.moveTo(sp[0], sp[1]); started = true; } else { ctx.lineTo(sp[0], sp[1]); }
                            }
                            ctx.stroke();

                            // Fill under curve
                            ctx.fillStyle = viz.colors.blue + '22';
                            ctx.lineTo(vizLeft.toScreen(5, 0)[0], vizLeft.toScreen(5, 0)[1]);
                            ctx.lineTo(vizLeft.toScreen(-5, 0)[0], vizLeft.toScreen(-5, 0)[1]);
                            ctx.closePath(); ctx.fill();

                            ctx.fillStyle = viz.colors.white; ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Position space |\u03c8(x)|\u00b2', halfW * 0.5, 25);
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillText('\u0394x = ' + sigmaX.toFixed(2), halfW * 0.5, 45);

                            ctx.restore();

                            // RIGHT PANEL: momentum space
                            ctx.save();
                            ctx.beginPath();
                            ctx.rect(halfW, 0, halfW, viz.height);
                            ctx.clip();

                            var sigmaP = hbar / (2 * sigmaX);
                            var vizRight = {
                                toScreen: function(p, y) { return [halfW + halfW * 0.5 + p * 30, viz.height * 0.5 - y * 80]; }
                            };

                            // Axis
                            var rox = vizRight.toScreen(0, 0);
                            ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.moveTo(halfW + 5, rox[1]); ctx.lineTo(viz.width - 5, rox[1]); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(rox[0], 10); ctx.lineTo(rox[0], viz.height - 10); ctx.stroke();

                            // Draw psi_tilde(p)
                            ctx.strokeStyle = viz.colors.orange; ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            started = false;
                            for (var i = 0; i <= 200; i++) {
                                var p = -5 + 10 * i / 200;
                                var y = (1 / (sigmaP * Math.sqrt(2 * Math.PI))) * Math.exp(-p * p / (2 * sigmaP * sigmaP));
                                var sp = vizRight.toScreen(p, y);
                                if (!started) { ctx.moveTo(sp[0], sp[1]); started = true; } else { ctx.lineTo(sp[0], sp[1]); }
                            }
                            ctx.stroke();

                            ctx.fillStyle = viz.colors.orange + '22';
                            ctx.lineTo(vizRight.toScreen(5, 0)[0], vizRight.toScreen(5, 0)[1]);
                            ctx.lineTo(vizRight.toScreen(-5, 0)[0], vizRight.toScreen(-5, 0)[1]);
                            ctx.closePath(); ctx.fill();

                            ctx.fillStyle = viz.colors.white; ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Momentum space |\u03c8\u0303(p)|\u00b2', halfW + halfW * 0.5, 25);
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillText('\u0394p = ' + sigmaP.toFixed(2), halfW + halfW * 0.5, 45);

                            ctx.restore();

                            // Divider
                            ctx.strokeStyle = viz.colors.muted; ctx.lineWidth = 1;
                            ctx.setLineDash([4, 4]);
                            ctx.beginPath(); ctx.moveTo(halfW, 0); ctx.lineTo(halfW, viz.height); ctx.stroke();
                            ctx.setLineDash([]);

                            // Uncertainty product
                            var product = sigmaX * sigmaP;
                            ctx.fillStyle = viz.colors.green; ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('\u0394x \u00b7 \u0394p = ' + product.toFixed(3) + ' = \u0127/2 (minimum)', viz.width / 2, viz.height - 15);
                        }
                        draw();
                        return viz;
                    }
                }
            ],

            exercises: [
                {
                    question: 'Show that if \\(\\hat{A}\\) is Hermitian and \\(\\hat{U} = e^{i\\hat{A}}\\), then \\(\\hat{U}\\) is unitary (\\(\\hat{U}^\\dagger\\hat{U} = \\hat{I}\\)).',
                    hint: 'Use the fact that \\((e^{i\\hat{A}})^\\dagger = e^{-i\\hat{A}^\\dagger} = e^{-i\\hat{A}}\\) when \\(\\hat{A}^\\dagger = \\hat{A}\\).',
                    solution: '<p>\\(\\hat{U}^\\dagger = (e^{i\\hat{A}})^\\dagger = e^{-i\\hat{A}^\\dagger} = e^{-i\\hat{A}}\\) since \\(\\hat{A}\\) is Hermitian. Then \\(\\hat{U}^\\dagger \\hat{U} = e^{-i\\hat{A}}e^{i\\hat{A}} = e^0 = \\hat{I}\\), using \\([\\hat{A}, \\hat{A}] = 0\\) so the Baker-Campbell-Hausdorff formula gives \\(e^{-i\\hat{A}}e^{i\\hat{A}} = e^{(-i+i)\\hat{A}} = \\hat{I}\\).</p>'
                },
                {
                    question: 'Compute \\([\\hat{x}^2, \\hat{p}]\\) using the commutator identity \\([\\hat{A}\\hat{B}, \\hat{C}] = \\hat{A}[\\hat{B}, \\hat{C}] + [\\hat{A}, \\hat{C}]\\hat{B}\\).',
                    hint: 'Set \\(\\hat{A} = \\hat{B} = \\hat{x}\\), \\(\\hat{C} = \\hat{p}\\).',
                    solution: '<p>\\([\\hat{x}^2, \\hat{p}] = \\hat{x}[\\hat{x}, \\hat{p}] + [\\hat{x}, \\hat{p}]\\hat{x} = \\hat{x}(i\\hbar) + (i\\hbar)\\hat{x} = 2i\\hbar\\hat{x}\\).</p>'
                },
                {
                    question: 'For the harmonic oscillator Hamiltonian \\(\\hat{H} = \\frac{\\hat{p}^2}{2m} + \\frac{1}{2}m\\omega^2\\hat{x}^2\\), show that \\([\\hat{H}, \\hat{x}] = -\\frac{i\\hbar}{m}\\hat{p}\\).',
                    hint: 'Use \\([\\hat{p}^2, \\hat{x}] = \\hat{p}[\\hat{p}, \\hat{x}] + [\\hat{p}, \\hat{x}]\\hat{p}\\) and \\([\\hat{x}^2, \\hat{x}] = 0\\).',
                    solution: '<p>\\([\\hat{H}, \\hat{x}] = \\frac{1}{2m}[\\hat{p}^2, \\hat{x}] + \\frac{m\\omega^2}{2}[\\hat{x}^2, \\hat{x}]\\). The second commutator vanishes. For the first: \\([\\hat{p}^2, \\hat{x}] = \\hat{p}[\\hat{p}, \\hat{x}] + [\\hat{p}, \\hat{x}]\\hat{p} = \\hat{p}(-i\\hbar) + (-i\\hbar)\\hat{p} = -2i\\hbar\\hat{p}\\). Thus \\([\\hat{H}, \\hat{x}] = \\frac{-2i\\hbar\\hat{p}}{2m} = -\\frac{i\\hbar}{m}\\hat{p}\\).</p>'
                },
                {
                    question: 'Prove that the eigenvalues of a unitary operator \\(\\hat{U}\\) lie on the unit circle in the complex plane.',
                    hint: 'If \\(\\hat{U}|u\\rangle = \\lambda|u\\rangle\\), compute \\(\\langle u|\\hat{U}^\\dagger\\hat{U}|u\\rangle\\) two ways.',
                    solution: '<p>\\(\\langle u|\\hat{U}^\\dagger\\hat{U}|u\\rangle = \\langle u|u\\rangle = 1\\). Also \\(\\langle u|\\hat{U}^\\dagger\\hat{U}|u\\rangle = (\\lambda^*)(\\lambda)\\langle u|u\\rangle = |\\lambda|^2\\). So \\(|\\lambda|^2 = 1\\), meaning \\(\\lambda\\) lies on the unit circle: \\(\\lambda = e^{i\\theta}\\) for some real \\(\\theta\\).</p>'
                },
                {
                    question: 'The energy-time uncertainty relation \\(\\Delta E \\cdot \\Delta t \\geq \\hbar/2\\) is often quoted but its derivation differs from the position-momentum case because time is not an operator in non-relativistic QM. Derive the Mandelstam-Tamm form: \\(\\Delta E \\cdot \\tau_A \\geq \\hbar/2\\) where \\(\\tau_A = \\Delta A / |d\\langle\\hat{A}\\rangle/dt|\\) for any observable \\(\\hat{A}\\).',
                    hint: 'Use the generalized uncertainty relation for \\(\\hat{H}\\) and \\(\\hat{A}\\), together with the Ehrenfest relation \\(d\\langle\\hat{A}\\rangle/dt = (i/\\hbar)\\langle[\\hat{H}, \\hat{A}]\\rangle\\).',
                    solution: '<p>The generalized uncertainty principle gives \\(\\Delta H \\cdot \\Delta A \\geq \\frac{1}{2}|\\langle[\\hat{H}, \\hat{A}]\\rangle|\\). Ehrenfest\'s theorem (for time-independent \\(\\hat{A}\\)) states \\(\\frac{d\\langle\\hat{A}\\rangle}{dt} = \\frac{i}{\\hbar}\\langle[\\hat{H}, \\hat{A}]\\rangle\\), so \\(|\\langle[\\hat{H}, \\hat{A}]\\rangle| = \\hbar\\left|\\frac{d\\langle\\hat{A}\\rangle}{dt}\\right|\\). Substituting: \\(\\Delta E \\cdot \\Delta A \\geq \\frac{\\hbar}{2}\\left|\\frac{d\\langle\\hat{A}\\rangle}{dt}\\right|\\). Defining \\(\\tau_A = \\Delta A / |d\\langle\\hat{A}\\rangle/dt|\\) (the time for \\(\\langle\\hat{A}\\rangle\\) to change by one standard deviation): \\(\\Delta E \\cdot \\tau_A \\geq \\hbar/2\\).</p>'
                }
            ]
        },

        // ===================== Section 3: Postulates of Quantum Mechanics =====================
        {
            id: 'ch00-sec03',
            title: 'Postulates of Quantum Mechanics',
            content: `<h2>Postulates of Quantum Mechanics</h2>

                <p>The entire mathematical structure of quantum mechanics rests on a small number of postulates. These postulates cannot be derived from more fundamental principles; they are axioms validated by the extraordinary agreement between their predictions and experiment. We state them here in the language of Hilbert spaces and Dirac notation developed in the preceding sections.</p>

                <div class="env-block definition">
                    <div class="env-title">Postulate 1 (State Space)</div>
                    <div class="env-body"><p>The state of a quantum system is completely described by a <strong>state vector</strong> \\(|\\psi\\rangle\\) in a Hilbert space \\(\\mathcal{H}\\). Two state vectors that differ only by a nonzero complex scalar represent the same physical state (i.e., the physical state space is the <strong>projective Hilbert space</strong> \\(\\mathbb{P}\\mathcal{H}\\)).</p></div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Postulate 2 (Observables)</div>
                    <div class="env-body"><p>Every physical observable \\(A\\) is associated with a Hermitian operator \\(\\hat{A}\\) acting on \\(\\mathcal{H}\\). The possible outcomes of measuring \\(A\\) are the eigenvalues of \\(\\hat{A}\\).</p></div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Postulate 3 (Measurement / Born Rule)</div>
                    <div class="env-body"><p>If the system is in state \\(|\\psi\\rangle\\) and observable \\(\\hat{A}\\) is measured, the probability of obtaining eigenvalue \\(a\\) is
                    \\[P(a) = |\\langle a|\\psi\\rangle|^2\\]
                    where \\(|a\\rangle\\) is the normalized eigenstate of \\(\\hat{A}\\) with eigenvalue \\(a\\). For degenerate eigenvalues, \\(P(a) = \\sum_i |\\langle a, i|\\psi\\rangle|^2\\) where the sum runs over an orthonormal basis of the eigenspace.</p></div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Postulate 4 (Collapse)</div>
                    <div class="env-body"><p>Immediately after a measurement of \\(\\hat{A}\\) yielding outcome \\(a\\), the state collapses to the projection onto the eigenspace:
                    \\[|\\psi\\rangle \\to \\frac{\\hat{P}_a|\\psi\\rangle}{\\|\\hat{P}_a|\\psi\\rangle\\|}\\]
                    where \\(\\hat{P}_a = \\sum_i |a,i\\rangle\\langle a,i|\\) is the projector onto the eigenspace of eigenvalue \\(a\\).</p></div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Postulate 5 (Time Evolution)</div>
                    <div class="env-body"><p>Between measurements, the state evolves according to the <strong>time-dependent Schr&ouml;dinger equation</strong>:
                    \\[i\\hbar\\frac{\\partial}{\\partial t}|\\psi(t)\\rangle = \\hat{H}|\\psi(t)\\rangle\\]
                    where \\(\\hat{H}\\) is the Hamiltonian (total energy operator). For time-independent \\(\\hat{H}\\), the formal solution is
                    \\[|\\psi(t)\\rangle = e^{-i\\hat{H}t/\\hbar}|\\psi(0)\\rangle\\]
                    The time-evolution operator \\(\\hat{U}(t) = e^{-i\\hat{H}t/\\hbar}\\) is unitary, ensuring probability conservation.</p></div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem (Time-Independent Schr&ouml;dinger Equation)</div>
                    <div class="env-body"><p>If \\(\\hat{H}\\) is time-independent, separation of variables \\(|\\psi(t)\\rangle = e^{-iEt/\\hbar}|E\\rangle\\) reduces the TDSE to the <strong>time-independent Schr&ouml;dinger equation</strong>:
                    \\[\\hat{H}|E\\rangle = E|E\\rangle\\]
                    This is the central eigenvalue equation of quantum chemistry. The general solution is \\(|\\psi(t)\\rangle = \\sum_n c_n e^{-iE_n t/\\hbar}|E_n\\rangle\\) where \\(c_n = \\langle E_n|\\psi(0)\\rangle\\).</p></div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body"><p>Substitute \\(|\\psi(t)\\rangle = T(t)|\\phi\\rangle\\) into the TDSE:
                    \\[i\\hbar \\dot{T}(t)|\\phi\\rangle = \\hat{H}T(t)|\\phi\\rangle\\]
                    Dividing both sides by \\(T(t)|\\phi\\rangle\\) (in the appropriate sense) gives \\(i\\hbar\\dot{T}/T = \\hat{H}|\\phi\\rangle/|\\phi\\rangle\\). The left side depends only on \\(t\\), the right only on spatial coordinates, so both equal a constant \\(E\\). This yields \\(T(t) = e^{-iEt/\\hbar}\\) and \\(\\hat{H}|\\phi\\rangle = E|\\phi\\rangle\\).</p>
                    <div class="qed">&#8718;</div></div>
                </div>

                <h3>Expectation Values and Ehrenfest's Theorem</h3>

                <div class="env-block proposition">
                    <div class="env-title">Proposition (Expectation Value)</div>
                    <div class="env-body"><p>The expectation value of observable \\(\\hat{A}\\) in state \\(|\\psi\\rangle\\) is
                    \\[\\langle\\hat{A}\\rangle = \\langle\\psi|\\hat{A}|\\psi\\rangle = \\sum_a a\\,P(a)\\]
                    This equals the statistical average of measurement outcomes over many identically prepared systems.</p></div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem (Ehrenfest's Theorem)</div>
                    <div class="env-body"><p>For a time-independent observable \\(\\hat{A}\\),
                    \\[\\frac{d}{dt}\\langle\\hat{A}\\rangle = \\frac{i}{\\hbar}\\langle[\\hat{H}, \\hat{A}]\\rangle\\]
                    In particular: \\(\\frac{d\\langle\\hat{x}\\rangle}{dt} = \\frac{\\langle\\hat{p}\\rangle}{m}\\) and \\(\\frac{d\\langle\\hat{p}\\rangle}{dt} = -\\langle\\nabla V\\rangle\\), recovering Newton's second law for expectation values.</p></div>
                </div>

                <div class="env-block warning">
                    <div class="env-title">Warning</div>
                    <div class="env-body"><p>Ehrenfest's theorem does <em>not</em> say quantum mechanics reduces to classical mechanics. The equation \\(\\frac{d\\langle\\hat{p}\\rangle}{dt} = -\\langle\\nabla V\\rangle \\neq -\\nabla V(\\langle\\hat{x}\\rangle)\\) in general. The classical limit only holds when the wavepacket is sharply peaked so \\(\\langle f(\\hat{x})\\rangle \\approx f(\\langle\\hat{x}\\rangle)\\).</p></div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark (Density Matrices)</div>
                    <div class="env-body"><p>For mixed states (statistical ensembles), the state is described by a <strong>density operator</strong> \\(\\hat{\\rho} = \\sum_i p_i |\\psi_i\\rangle\\langle\\psi_i|\\) with \\(p_i \\geq 0\\), \\(\\sum_i p_i = 1\\). Expectation values become \\(\\langle\\hat{A}\\rangle = \\text{Tr}(\\hat{\\rho}\\hat{A})\\). Time evolution: \\(i\\hbar\\dot{\\hat{\\rho}} = [\\hat{H}, \\hat{\\rho}]\\) (von Neumann equation). This formalism is essential for open quantum systems and thermal states in quantum chemistry.</p></div>
                </div>`,

            exercises: [
                {
                    question: 'A spin-1/2 particle is in state \\(|\\psi\\rangle = \\frac{1}{\\sqrt{3}}|\\uparrow\\rangle + \\sqrt{\\frac{2}{3}}|\\downarrow\\rangle\\). What are the probabilities of measuring spin-up and spin-down along \\(z\\)? What is \\(\\langle\\hat{S}_z\\rangle\\)?',
                    hint: 'Use the Born rule. Recall \\(\\hat{S}_z|\\uparrow\\rangle = \\frac{\\hbar}{2}|\\uparrow\\rangle\\) and \\(\\hat{S}_z|\\downarrow\\rangle = -\\frac{\\hbar}{2}|\\downarrow\\rangle\\).',
                    solution: '<p>\\(P(\\uparrow) = |1/\\sqrt{3}|^2 = 1/3\\), \\(P(\\downarrow) = |\\sqrt{2/3}|^2 = 2/3\\). Expectation: \\(\\langle\\hat{S}_z\\rangle = \\frac{1}{3}\\cdot\\frac{\\hbar}{2} + \\frac{2}{3}\\cdot(-\\frac{\\hbar}{2}) = -\\frac{\\hbar}{6}\\).</p>'
                },
                {
                    question: 'A particle is in the superposition \\(|\\psi\\rangle = c_1|E_1\\rangle + c_2|E_2\\rangle\\) of two energy eigenstates. Show that the expectation value \\(\\langle\\hat{x}(t)\\rangle\\) oscillates at the Bohr frequency \\(\\omega_{12} = (E_2 - E_1)/\\hbar\\).',
                    hint: 'Write \\(|\\psi(t)\\rangle\\) with the time-dependent phases and compute \\(\\langle\\psi(t)|\\hat{x}|\\psi(t)\\rangle\\). Cross terms produce oscillation.',
                    solution: '<p>\\(|\\psi(t)\\rangle = c_1 e^{-iE_1 t/\\hbar}|E_1\\rangle + c_2 e^{-iE_2 t/\\hbar}|E_2\\rangle\\). Then \\(\\langle\\hat{x}(t)\\rangle = |c_1|^2 x_{11} + |c_2|^2 x_{22} + 2\\text{Re}(c_1^* c_2\\, x_{12}\\, e^{-i\\omega_{12}t})\\) where \\(x_{ij} = \\langle E_i|\\hat{x}|E_j\\rangle\\). The last term oscillates at \\(\\omega_{12} = (E_2 - E_1)/\\hbar\\).</p>'
                },
                {
                    question: 'Prove that the time-evolution operator \\(\\hat{U}(t) = e^{-i\\hat{H}t/\\hbar}\\) preserves the norm: \\(\\|\\hat{U}(t)|\\psi\\rangle\\| = \\||\\psi\\rangle\\|\\).',
                    hint: 'Show \\(\\hat{U}^\\dagger \\hat{U} = \\hat{I}\\) using \\(\\hat{H}^\\dagger = \\hat{H}\\).',
                    solution: '<p>Since \\(\\hat{H}\\) is Hermitian, \\(\\hat{U}^\\dagger(t) = e^{i\\hat{H}^\\dagger t/\\hbar} = e^{i\\hat{H}t/\\hbar}\\). Thus \\(\\hat{U}^\\dagger(t)\\hat{U}(t) = e^{i\\hat{H}t/\\hbar}e^{-i\\hat{H}t/\\hbar} = \\hat{I}\\). Therefore \\(\\|\\hat{U}|\\psi\\rangle\\|^2 = \\langle\\psi|\\hat{U}^\\dagger\\hat{U}|\\psi\\rangle = \\langle\\psi|\\psi\\rangle = \\||\\psi\\rangle\\|^2\\).</p>'
                },
                {
                    question: 'Show that \\(\\hat{\\rho}\\) is a valid density matrix (positive semi-definite, trace one, Hermitian) when \\(\\hat{\\rho} = |\\psi\\rangle\\langle\\psi|\\) for a normalized pure state.',
                    hint: 'Check the three conditions directly. For positive semi-definiteness, compute \\(\\langle\\phi|\\hat{\\rho}|\\phi\\rangle\\).',
                    solution: '<p><strong>Hermitian:</strong> \\(\\hat{\\rho}^\\dagger = (|\\psi\\rangle\\langle\\psi|)^\\dagger = |\\psi\\rangle\\langle\\psi| = \\hat{\\rho}\\). <strong>Trace one:</strong> \\(\\text{Tr}(\\hat{\\rho}) = \\sum_i \\langle e_i|\\psi\\rangle\\langle\\psi|e_i\\rangle = \\sum_i |\\langle e_i|\\psi\\rangle|^2 = \\langle\\psi|\\psi\\rangle = 1\\). <strong>Positive semi-definite:</strong> \\(\\langle\\phi|\\hat{\\rho}|\\phi\\rangle = \\langle\\phi|\\psi\\rangle\\langle\\psi|\\phi\\rangle = |\\langle\\phi|\\psi\\rangle|^2 \\geq 0\\).</p>'
                },
                {
                    question: 'Derive the continuity equation \\(\\frac{\\partial \\rho}{\\partial t} + \\nabla \\cdot \\mathbf{j} = 0\\) from the TDSE, where \\(\\rho = |\\psi|^2\\) and \\(\\mathbf{j} = \\frac{\\hbar}{2mi}(\\psi^*\\nabla\\psi - \\psi\\nabla\\psi^*)\\) is the probability current.',
                    hint: 'Compute \\(\\partial\\rho/\\partial t = \\dot{\\psi}^*\\psi + \\psi^*\\dot{\\psi}\\) using \\(i\\hbar\\dot{\\psi} = -\\frac{\\hbar^2}{2m}\\nabla^2\\psi + V\\psi\\).',
                    solution: '<p>From the TDSE: \\(\\dot{\\psi} = \\frac{1}{i\\hbar}(-\\frac{\\hbar^2}{2m}\\nabla^2 + V)\\psi\\). Then \\(\\frac{\\partial\\rho}{\\partial t} = \\dot{\\psi}^*\\psi + \\psi^*\\dot{\\psi} = \\frac{i\\hbar}{2m}(\\psi\\nabla^2\\psi^* - \\psi^*\\nabla^2\\psi)\\) (the \\(V\\) terms cancel). This equals \\(-\\nabla \\cdot \\mathbf{j}\\) where \\(\\mathbf{j} = \\frac{\\hbar}{2mi}(\\psi^*\\nabla\\psi - \\psi\\nabla\\psi^*)\\), since \\(\\nabla \\cdot \\mathbf{j} = \\frac{\\hbar}{2mi}(\\psi^*\\nabla^2\\psi - \\psi\\nabla^2\\psi^*)\\).</p>'
                }
            ]
        },

        // ===================== Section 4: Variational Principle =====================
        {
            id: 'ch00-sec04',
            title: 'Variational Principle',
            content: `<h2>The Variational Principle</h2>

                <div class="env-block intuition">
                    <div class="env-title">Why the Variational Principle Matters</div>
                    <div class="env-body"><p>Exact solutions to the Schr&ouml;dinger equation exist only for a handful of systems (hydrogen atom, harmonic oscillator, particle in a box). For every molecule of chemical interest, we need approximate methods. The <strong>variational principle</strong> provides the most important such method: guess a wavefunction, compute the energy, and know with certainty that you have an <strong>upper bound</strong> to the true ground-state energy. The entire Hartree-Fock method, and by extension most of computational quantum chemistry, rests on this single theorem.</p></div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem (Rayleigh-Ritz Variational Principle)</div>
                    <div class="env-body"><p>For any normalized trial wavefunction \\(|\\tilde{\\psi}\\rangle\\), the expectation value of the Hamiltonian provides an upper bound to the exact ground-state energy \\(E_0\\):
                    \\[E[\\tilde{\\psi}] = \\langle\\tilde{\\psi}|\\hat{H}|\\tilde{\\psi}\\rangle \\geq E_0\\]
                    with equality if and only if \\(|\\tilde{\\psi}\\rangle\\) is the exact ground state \\(|\\psi_0\\rangle\\).</p></div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body"><p>Expand the trial function in the exact eigenbasis: \\(|\\tilde{\\psi}\\rangle = \\sum_n c_n |\\psi_n\\rangle\\) with \\(\\hat{H}|\\psi_n\\rangle = E_n|\\psi_n\\rangle\\) and \\(E_0 \\leq E_1 \\leq E_2 \\leq \\cdots\\). Then:
                    \\[E[\\tilde{\\psi}] = \\sum_n |c_n|^2 E_n \\geq \\sum_n |c_n|^2 E_0 = E_0 \\sum_n |c_n|^2 = E_0\\]
                    using normalization \\(\\sum_n |c_n|^2 = 1\\). Equality requires \\(|c_n|^2(E_n - E_0) = 0\\) for all \\(n\\), which means only \\(c_0 \\neq 0\\), i.e., \\(|\\tilde{\\psi}\\rangle = e^{i\\phi}|\\psi_0\\rangle\\).</p>
                    <div class="qed">&#8718;</div></div>
                </div>

                <h3>Linear Variational Method</h3>
                <p>The most systematic application of the variational principle uses a trial function that is a <strong>linear combination</strong> of known basis functions:</p>
                \\[|\\tilde{\\psi}\\rangle = \\sum_{i=1}^{N} c_i |\\phi_i\\rangle\\]
                <p>The optimal coefficients minimize the energy functional \\(E[\\{c_i\\}] = \\frac{\\sum_{ij} c_i^* c_j H_{ij}}{\\sum_{ij} c_i^* c_j S_{ij}}\\), where \\(H_{ij} = \\langle\\phi_i|\\hat{H}|\\phi_j\\rangle\\) and \\(S_{ij} = \\langle\\phi_i|\\phi_j\\rangle\\).</p>

                <div class="env-block theorem">
                    <div class="env-title">Theorem (Secular Equations)</div>
                    <div class="env-body"><p>Setting \\(\\partial E/\\partial c_k^* = 0\\) for each \\(k\\) yields the <strong>generalized eigenvalue problem</strong>:
                    \\[\\mathbf{H}\\mathbf{c} = E\\,\\mathbf{S}\\mathbf{c}\\]
                    where \\(\\mathbf{H}\\) is the Hamiltonian matrix, \\(\\mathbf{S}\\) is the overlap matrix, and \\(\\mathbf{c}\\) is the coefficient vector. Non-trivial solutions require
                    \\[\\det(\\mathbf{H} - E\\mathbf{S}) = 0\\]
                    This <strong>secular equation</strong> yields \\(N\\) roots \\(E_1 \\leq E_2 \\leq \\cdots \\leq E_N\\), each an upper bound to the corresponding exact energy: \\(E_k \\geq E_k^{\\text{exact}}\\) (<strong>Hylleraas-Undheim-MacDonald theorem</strong>).</p></div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof (Derivation of the Secular Equation)</div>
                    <div class="env-body"><p>Write \\(E = \\frac{\\mathbf{c}^\\dagger \\mathbf{H} \\mathbf{c}}{\\mathbf{c}^\\dagger \\mathbf{S} \\mathbf{c}}\\). Setting the variation \\(\\delta E = 0\\): differentiating with respect to \\(c_k^*\\) using the quotient rule,
                    \\[\\frac{\\partial}{\\partial c_k^*}\\left(\\frac{\\mathbf{c}^\\dagger \\mathbf{H}\\mathbf{c}}{\\mathbf{c}^\\dagger \\mathbf{S}\\mathbf{c}}\\right) = 0 \\implies \\sum_j H_{kj}c_j - E\\sum_j S_{kj}c_j = 0\\]
                    This holds for each \\(k\\), giving the matrix equation \\(\\mathbf{Hc} = E\\mathbf{Sc}\\). For orthonormal bases (\\(S_{ij} = \\delta_{ij}\\)), this simplifies to the standard eigenvalue problem \\(\\mathbf{Hc} = E\\mathbf{c}\\).</p>
                    <div class="qed">&#8718;</div></div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example (H&uuml;ckel Theory for Ethylene)</div>
                    <div class="env-body"><p>For the \\(\\pi\\) system of ethylene with two carbon \\(2p_z\\) orbitals \\(|\\phi_1\\rangle\\) and \\(|\\phi_2\\rangle\\), the H&uuml;ckel approximation gives \\(H_{11} = H_{22} = \\alpha\\), \\(H_{12} = H_{21} = \\beta\\), \\(S = \\mathbf{I}\\). The secular equation is:
                    \\[\\det\\begin{pmatrix} \\alpha - E & \\beta \\\\ \\beta & \\alpha - E \\end{pmatrix} = 0\\]
                    \\[(\\alpha - E)^2 - \\beta^2 = 0 \\implies E = \\alpha \\pm \\beta\\]
                    Since \\(\\beta < 0\\), the bonding orbital has energy \\(E_1 = \\alpha + \\beta\\) (lower) with \\(\\mathbf{c}_1 = \\frac{1}{\\sqrt{2}}(1, 1)^T\\), and the antibonding orbital has \\(E_2 = \\alpha - \\beta\\) with \\(\\mathbf{c}_2 = \\frac{1}{\\sqrt{2}}(1, -1)^T\\).</p></div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem (Hylleraas-Undheim-MacDonald)</div>
                    <div class="env-body"><p>If the basis is expanded from \\(N\\) to \\(N+1\\) functions, the variational energies <strong>interleave</strong>:
                    \\[E_k^{(N+1)} \\leq E_k^{(N)} \\quad \\text{for all } k = 1, \\ldots, N\\]
                    That is, adding basis functions can only improve (lower) the variational estimates. Furthermore, each \\(E_k^{(N)} \\geq E_k^{\\text{exact}}\\). This theorem guarantees systematic convergence as the basis set is enlarged, which is the conceptual foundation of basis set expansions in quantum chemistry.</p></div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark (Non-Linear Variational Parameters)</div>
                    <div class="env-body"><p>One can also optimize non-linear parameters (e.g., orbital exponents \\(\\zeta\\) in Slater-type orbitals). This does not yield an eigenvalue problem but requires numerical minimization:
                    \\[\\frac{\\partial E}{\\partial \\zeta} = 0\\]
                    For the helium atom with trial function \\(\\psi = e^{-\\zeta(r_1 + r_2)}\\), the optimal \\(\\zeta = Z - 5/16 = 27/16\\) gives \\(E = -2.848\\) a.u. vs. the exact \\(E = -2.904\\) a.u. The difference arises from neglecting electron correlation.</p></div>
                </div>`,

            exercises: [
                {
                    question: 'Use the trial function \\(\\psi(x) = A(a^2 - x^2)\\) for \\(|x| \\leq a\\) (zero otherwise) to estimate the ground-state energy of the infinite square well of width \\(2a\\) centered at the origin. Compare with the exact \\(E_1 = \\frac{\\pi^2\\hbar^2}{8ma^2}\\).',
                    hint: 'Compute \\(\\langle\\hat{H}\\rangle = \\frac{\\int_{-a}^{a}\\psi(-\\frac{\\hbar^2}{2m}\\psi\'\')dx}{\\int_{-a}^{a}|\\psi|^2 dx}\\). Note \\(\\psi\'\'(x) = -2A\\).',
                    solution: '<p>\\(\\psi\'\' = -2A\\), so \\(\\langle T \\rangle = \\frac{\\hbar^2}{2m}\\cdot 2A \\int_{-a}^{a} A(a^2 - x^2)dx = \\frac{\\hbar^2 A^2}{m}\\cdot \\frac{4a^3}{3}\\). Normalization: \\(\\int_{-a}^{a}A^2(a^2-x^2)^2 dx = A^2 \\frac{16a^5}{15}\\). Thus \\(E = \\frac{(\\hbar^2/m)(4a^3/3)}{16a^5/15} = \\frac{5\\hbar^2}{4ma^2}\\). Compare: \\(5/(4) = 1.25\\) vs \\(\\pi^2/8 \\approx 1.234\\). The variational estimate is \\(1.3\\%\\) above the exact value, confirming the upper bound.</p>'
                },
                {
                    question: 'Prove the Hylleraas-Undheim-MacDonald theorem for the lowest eigenvalue: show that adding one basis function cannot raise \\(E_1\\).',
                    hint: 'The \\(N+1\\)-dimensional variational space contains all \\(N\\)-dimensional trial functions as a subspace.',
                    solution: '<p>Let \\(\\{|\\phi_1\\rangle, \\ldots, |\\phi_N\\rangle\\}\\) be the original basis and \\(|\\phi_{N+1}\\rangle\\) the added function. Any trial function in the original \\(N\\)-dimensional space is also in the \\((N+1)\\)-dimensional space (with \\(c_{N+1}=0\\)). Since \\(E_1^{(N+1)}\\) is the minimum over a larger set, \\(E_1^{(N+1)} \\leq E_1^{(N)}\\).</p>'
                },
                {
                    question: 'For the helium atom with trial function \\(\\psi = e^{-\\zeta(r_1 + r_2)}\\), show that the variational energy is \\(E(\\zeta) = \\zeta^2 - 2Z\\zeta + \\frac{5}{8}\\zeta\\) (in atomic units) and find the optimal \\(\\zeta\\).',
                    hint: 'The kinetic energy for a hydrogenic 1s with exponent \\(\\zeta\\) is \\(\\zeta^2/2\\), the nuclear attraction is \\(-Z\\zeta\\), and the electron-electron repulsion integral is \\(5\\zeta/8\\).',
                    solution: '<p>For each electron: \\(\\langle T \\rangle = \\zeta^2/2\\), \\(\\langle V_{ne} \\rangle = -Z\\zeta\\). The \\(1/r_{12}\\) integral for two \\(1s\\) functions with exponent \\(\\zeta\\) is \\(5\\zeta/8\\). Total: \\(E(\\zeta) = 2(\\zeta^2/2) - 2Z\\zeta + 5\\zeta/8 = \\zeta^2 - 2Z\\zeta + 5\\zeta/8\\). Setting \\(dE/d\\zeta = 2\\zeta - 2Z + 5/8 = 0\\) gives \\(\\zeta = Z - 5/16\\). For He (\\(Z=2\\)): \\(\\zeta = 27/16 = 1.6875\\), \\(E = -(27/16)^2 = -2.848\\) a.u.</p>'
                },
                {
                    question: 'Set up and solve the secular equation for the allyl system (3 carbon chain) in H&uuml;ckel theory. Find the three energy levels and MO coefficients.',
                    hint: 'The H&uuml;ckel matrix is tridiagonal: \\(H_{11} = H_{22} = H_{33} = \\alpha\\), \\(H_{12} = H_{23} = \\beta\\), all others zero. Set \\(x = (\\alpha - E)/\\beta\\).',
                    solution: '<p>The secular determinant with \\(x = (\\alpha - E)/\\beta\\): \\(\\det\\begin{pmatrix} x & 1 & 0 \\\\ 1 & x & 1 \\\\ 0 & 1 & x \\end{pmatrix} = x^3 - 2x = x(x^2-2) = 0\\). Solutions: \\(x = 0, \\pm\\sqrt{2}\\), giving \\(E_1 = \\alpha + \\sqrt{2}\\beta\\), \\(E_2 = \\alpha\\), \\(E_3 = \\alpha - \\sqrt{2}\\beta\\). The bonding MO is \\(\\mathbf{c}_1 = \\frac{1}{2}(1, \\sqrt{2}, 1)^T\\); the nonbonding MO is \\(\\mathbf{c}_2 = \\frac{1}{\\sqrt{2}}(1, 0, -1)^T\\); the antibonding MO is \\(\\mathbf{c}_3 = \\frac{1}{2}(1, -\\sqrt{2}, 1)^T\\).</p>'
                }
            ]
        },

        // ===================== Section 5: Perturbation Theory Basics =====================
        {
            id: 'ch00-sec05',
            title: 'Perturbation Theory Basics',
            content: `<h2>Perturbation Theory</h2>

                <div class="env-block intuition">
                    <div class="env-title">The Idea</div>
                    <div class="env-body"><p>Many problems in quantum chemistry are "close" to exactly solvable ones. The electron-electron repulsion in helium perturbs the hydrogen-like solution. The anharmonicity of a molecular vibration perturbs the harmonic oscillator. <strong>Perturbation theory</strong> provides a systematic way to compute corrections order by order. It is the conceptual ancestor of M&oslash;ller-Plesset perturbation theory (MP2, MP3, ...) used daily in computational chemistry.</p></div>
                </div>

                <h3>Non-Degenerate Rayleigh-Schr&ouml;dinger Perturbation Theory</h3>

                <p>Partition the Hamiltonian as \\(\\hat{H} = \\hat{H}_0 + \\lambda\\hat{V}\\), where the eigenstates \\(|n^{(0)}\\rangle\\) and energies \\(E_n^{(0)}\\) of \\(\\hat{H}_0\\) are known exactly. Expand in powers of \\(\\lambda\\):
                \\[|n\\rangle = |n^{(0)}\\rangle + \\lambda|n^{(1)}\\rangle + \\lambda^2|n^{(2)}\\rangle + \\cdots\\]
                \\[E_n = E_n^{(0)} + \\lambda E_n^{(1)} + \\lambda^2 E_n^{(2)} + \\cdots\\]</p>

                <div class="env-block theorem">
                    <div class="env-title">Theorem (Perturbation Theory Corrections)</div>
                    <div class="env-body"><p>For non-degenerate level \\(n\\):</p>
                    <p><strong>First-order energy:</strong>
                    \\[E_n^{(1)} = \\langle n^{(0)}|\\hat{V}|n^{(0)}\\rangle = V_{nn}\\]</p>
                    <p><strong>First-order wavefunction:</strong>
                    \\[|n^{(1)}\\rangle = \\sum_{m \\neq n} \\frac{V_{mn}}{E_n^{(0)} - E_m^{(0)}}\\,|m^{(0)}\\rangle\\]</p>
                    <p><strong>Second-order energy:</strong>
                    \\[E_n^{(2)} = \\sum_{m \\neq n} \\frac{|V_{mn}|^2}{E_n^{(0)} - E_m^{(0)}}\\]
                    where \\(V_{mn} = \\langle m^{(0)}|\\hat{V}|n^{(0)}\\rangle\\).</p></div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body"><p>Substituting the expansions into \\((\\hat{H}_0 + \\lambda\\hat{V})|n\\rangle = E_n|n\\rangle\\) and equating powers of \\(\\lambda\\):</p>
                    <p><strong>Order \\(\\lambda^0\\):</strong> \\(\\hat{H}_0|n^{(0)}\\rangle = E_n^{(0)}|n^{(0)}\\rangle\\) (assumed known).</p>
                    <p><strong>Order \\(\\lambda^1\\):</strong> \\(\\hat{H}_0|n^{(1)}\\rangle + \\hat{V}|n^{(0)}\\rangle = E_n^{(0)}|n^{(1)}\\rangle + E_n^{(1)}|n^{(0)}\\rangle\\). Left-multiply by \\(\\langle n^{(0)}|\\): using \\(\\langle n^{(0)}|\\hat{H}_0 = E_n^{(0)}\\langle n^{(0)}|\\) and intermediate normalization \\(\\langle n^{(0)}|n^{(1)}\\rangle = 0\\):
                    \\[E_n^{(1)} = \\langle n^{(0)}|\\hat{V}|n^{(0)}\\rangle\\]
                    Left-multiply by \\(\\langle m^{(0)}|\\) (\\(m \\neq n\\)): \\((E_n^{(0)} - E_m^{(0)})\\langle m^{(0)}|n^{(1)}\\rangle = -V_{mn}\\), giving the first-order wavefunction coefficients.</p>
                    <p><strong>Order \\(\\lambda^2\\):</strong> Project \\(\\hat{H}_0|n^{(2)}\\rangle + \\hat{V}|n^{(1)}\\rangle = E_n^{(0)}|n^{(2)}\\rangle + E_n^{(1)}|n^{(1)}\\rangle + E_n^{(2)}|n^{(0)}\\rangle\\) onto \\(\\langle n^{(0)}|\\) to get \\(E_n^{(2)} = \\langle n^{(0)}|\\hat{V}|n^{(1)}\\rangle = \\sum_{m \\neq n}\\frac{|V_{mn}|^2}{E_n^{(0)} - E_m^{(0)}}\\).</p>
                    <div class="qed">&#8718;</div></div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark (Sign of Second-Order Correction)</div>
                    <div class="env-body"><p>For the ground state (\\(n=0\\)), all terms in \\(E_0^{(2)}\\) have \\(E_0^{(0)} - E_m^{(0)} < 0\\), so \\(E_0^{(2)} \\leq 0\\). Second-order corrections always <strong>lower</strong> the ground-state energy, consistent with the variational principle. This is why MP2 always lowers the Hartree-Fock energy.</p></div>
                </div>

                <h3>Degenerate Perturbation Theory</h3>

                <p>When the unperturbed level \\(E_n^{(0)}\\) is \\(g\\)-fold degenerate (states \\(|n, \\alpha\\rangle\\), \\(\\alpha = 1, \\ldots, g\\)), the non-degenerate formulas fail because \\(E_n^{(0)} - E_m^{(0)} = 0\\) for states within the degenerate subspace.</p>

                <div class="env-block theorem">
                    <div class="env-title">Theorem (Degenerate Perturbation Theory)</div>
                    <div class="env-body"><p>For a \\(g\\)-fold degenerate level, the first-order energy corrections are the eigenvalues of the \\(g \\times g\\) matrix \\(\\mathbf{V}\\) restricted to the degenerate subspace:
                    \\[V_{\\alpha\\beta} = \\langle n, \\alpha|\\hat{V}|n, \\beta\\rangle\\]
                    The "correct" zeroth-order states are the eigenvectors of this matrix. Diagonalizing \\(\\mathbf{V}\\) within the degenerate subspace lifts (partially or fully) the degeneracy at first order.</p></div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example (Stark Effect in Hydrogen, n=2)</div>
                    <div class="env-body"><p>The \\(n=2\\) level of hydrogen is 4-fold degenerate (\\(2s, 2p_0, 2p_{\\pm 1}\\)). An external electric field \\(\\hat{V} = eEz = eEr\\cos\\theta\\) breaks this degeneracy. The perturbation matrix in the \\(\\{|2,0,0\\rangle, |2,1,0\\rangle, |2,1,1\\rangle, |2,1,-1\\rangle\\}\\) basis has only one non-zero off-diagonal element: \\(\\langle 2,0,0|\\hat{V}|2,1,0\\rangle = -3eEa_0\\). The eigenvalues give the linear Stark splitting \\(\\Delta E = \\pm 3eEa_0\\), while the \\(m = \\pm 1\\) states are unaffected (selection rule \\(\\Delta m = 0\\) for \\(z\\)-polarized fields).</p></div>
                </div>

                <h3>Time-Dependent Perturbation Theory</h3>

                <p>When a perturbation is turned on at \\(t=0\\), \\(\\hat{H}(t) = \\hat{H}_0 + \\hat{V}(t)\\), we expand \\(|\\psi(t)\\rangle = \\sum_n c_n(t)e^{-iE_n^{(0)}t/\\hbar}|n^{(0)}\\rangle\\) and solve for \\(c_n(t)\\).</p>

                <div class="env-block theorem">
                    <div class="env-title">Theorem (Fermi's Golden Rule)</div>
                    <div name="env-body" class="env-body"><p>For a harmonic perturbation \\(\\hat{V}(t) = \\hat{V}_0 e^{-i\\omega t} + \\hat{V}_0^\\dagger e^{i\\omega t}\\) turned on at \\(t = 0\\), the transition rate from initial state \\(|i\\rangle\\) to a continuum of final states \\(|f\\rangle\\) is:
                    \\[\\Gamma_{i \\to f} = \\frac{2\\pi}{\\hbar}|\\langle f|\\hat{V}_0|i\\rangle|^2 \\rho(E_f)\\]
                    where \\(\\rho(E_f)\\) is the density of final states at energy \\(E_f = E_i + \\hbar\\omega\\). This formula governs optical absorption, emission, and non-radiative transitions in molecules.</p></div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof Sketch</div>
                    <div class="env-body"><p>First-order TDPT gives \\(c_f^{(1)}(t) = -\\frac{i}{\\hbar}\\int_0^t \\langle f|\\hat{V}(t')|i\\rangle e^{i\\omega_{fi}t'}dt'\\) where \\(\\omega_{fi} = (E_f - E_i)/\\hbar\\). For the resonant term (\\(\\omega \\approx \\omega_{fi}\\)):
                    \\[|c_f^{(1)}(t)|^2 = \\frac{|V_{fi}|^2}{\\hbar^2}\\cdot\\frac{4\\sin^2((\\omega_{fi} - \\omega)t/2)}{(\\omega_{fi} - \\omega)^2}\\]
                    As \\(t \\to \\infty\\), \\(\\frac{\\sin^2(xt/2)}{x^2 t} \\to \\frac{\\pi}{2}\\delta(x)\\). The transition rate \\(\\Gamma = d|c_f|^2/dt\\) then gives Fermi's golden rule after summing over the density of states.</p>
                    <div class="qed">&#8718;</div></div>
                </div>

                <div class="env-block warning">
                    <div class="env-title">Warning (Convergence of Perturbation Series)</div>
                    <div class="env-body"><p>The perturbation series is not guaranteed to converge. In quantum chemistry, the M&oslash;ller-Plesset series can diverge for systems with small HOMO-LUMO gaps or strong correlation. Diagnostics like the \\(T_1\\) diagnostic and the ratio \\(E^{(2)}/E^{(1)}\\) help assess reliability. Divergent series may still be useful through Pad&eacute; resummation or by treating the first few orders as asymptotic approximations.</p></div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark (Connection to MP2)</div>
                    <div class="env-body"><p>M&oslash;ller-Plesset perturbation theory sets \\(\\hat{H}_0 = \\sum_i \\hat{f}(i)\\) (sum of Fock operators) and \\(\\hat{V} = \\hat{H} - \\hat{H}_0\\) (the fluctuation potential). The first-order correction is zero (by Brillouin's theorem), and MP2 is the second-order energy:
                    \\[E^{(2)} = \\sum_{i<j}\\sum_{a<b} \\frac{|\\langle ij||ab\\rangle|^2}{\\varepsilon_i + \\varepsilon_j - \\varepsilon_a - \\varepsilon_b}\\]
                    where \\(i,j\\) are occupied and \\(a,b\\) virtual orbitals. This is the workhorse of correlated electronic structure theory.</p></div>
                </div>`,

            exercises: [
                {
                    question: 'For a one-dimensional harmonic oscillator \\(\\hat{H}_0 = \\hbar\\omega(\\hat{n} + 1/2)\\) with perturbation \\(\\hat{V} = \\epsilon x^3 = \\epsilon\\left(\\frac{\\hbar}{2m\\omega}\\right)^{3/2}(\\hat{a} + \\hat{a}^\\dagger)^3\\), compute the first-order energy correction \\(E_n^{(1)}\\) and show it vanishes.',
                    hint: 'The first-order correction is \\(\\langle n|\\hat{V}|n\\rangle\\). Expand \\((\\hat{a} + \\hat{a}^\\dagger)^3\\) and use selection rules: \\(\\langle n|(\\hat{a})^p(\\hat{a}^\\dagger)^q|n\\rangle = 0\\) unless the total change in quantum number is zero.',
                    solution: '<p>\\((\\hat{a} + \\hat{a}^\\dagger)^3\\) produces terms that change the quantum number by \\(\\pm 3\\) or \\(\\pm 1\\). No combination gives a net change of zero in the diagonal element \\(\\langle n|\\cdots|n\\rangle\\). Therefore \\(E_n^{(1)} = 0\\). This reflects the symmetry: \\(x^3\\) is an odd function, and the harmonic oscillator wavefunctions have definite parity, so the diagonal matrix element of an odd operator vanishes.</p>'
                },
                {
                    question: 'Compute the second-order energy correction for the ground state of the harmonic oscillator perturbed by \\(\\hat{V} = \\lambda x^4\\).',
                    hint: 'Express \\(x^4\\) in terms of ladder operators. You need \\(\\langle 0|x^4|0\\rangle\\) for \\(E^{(1)}\\) and \\(|\\langle m|x^4|0\\rangle|^2/(E_0 - E_m)\\) for \\(E^{(2)}\\). The non-zero matrix elements connect \\(|0\\rangle\\) to \\(|2\\rangle\\) and \\(|4\\rangle\\).',
                    solution: '<p>In ladder operator form: \\(x = \\sqrt{\\frac{\\hbar}{2m\\omega}}(\\hat{a} + \\hat{a}^\\dagger)\\), so \\(x^4 = \\left(\\frac{\\hbar}{2m\\omega}\\right)^2 (\\hat{a} + \\hat{a}^\\dagger)^4\\). Expanding and normal-ordering: \\(\\langle 0|x^4|0\\rangle = \\frac{3}{4}\\left(\\frac{\\hbar}{m\\omega}\\right)^2\\), giving \\(E_0^{(1)} = \\frac{3\\lambda}{4}\\left(\\frac{\\hbar}{m\\omega}\\right)^2\\). For \\(E^{(2)}\\): the non-zero off-diagonal elements are \\(\\langle 2|x^4|0\\rangle\\) and \\(\\langle 4|x^4|0\\rangle\\). After calculation: \\(E_0^{(2)} = -\\frac{21\\lambda^2}{8}\\left(\\frac{\\hbar}{m\\omega}\\right)^4 \\frac{1}{\\hbar\\omega}\\).</p>'
                },
                {
                    question: 'Show that for the ground state, the second-order energy is always negative: \\(E_0^{(2)} \\leq 0\\). Relate this to the variational principle.',
                    hint: 'In the formula \\(E_0^{(2)} = \\sum_{m \\neq 0}\\frac{|V_{m0}|^2}{E_0^{(0)} - E_m^{(0)}}\\), what is the sign of each denominator?',
                    solution: '<p>For the ground state, \\(E_0^{(0)} \\leq E_m^{(0)}\\) for all \\(m \\neq 0\\), so each denominator \\(E_0^{(0)} - E_m^{(0)} \\leq 0\\). Each numerator \\(|V_{m0}|^2 \\geq 0\\). Hence every term in the sum is \\(\\leq 0\\), giving \\(E_0^{(2)} \\leq 0\\). This is consistent with the variational principle: first-order perturbation theory gives a variational estimate using only \\(|0^{(0)}\\rangle\\), and including the first-order wavefunction correction provides a better trial function, which must lower the energy.</p>'
                },
                {
                    question: 'In degenerate perturbation theory for the \\(n=2\\) hydrogen atom in an electric field \\(\\hat{V} = eEz\\), evaluate the matrix element \\(\\langle 2,0,0|eEr\\cos\\theta|2,1,0\\rangle = -3eEa_0\\).',
                    hint: 'Use \\(\\psi_{200} = \\frac{1}{4\\sqrt{2\\pi}}a_0^{-3/2}(2 - r/a_0)e^{-r/(2a_0)}\\) and \\(\\psi_{210} = \\frac{1}{4\\sqrt{2\\pi}}a_0^{-3/2}\\frac{r}{a_0}e^{-r/(2a_0)}\\cos\\theta\\). Separate the integral into radial and angular parts.',
                    solution: '<p>The angular integral: \\(\\int Y_0^0 \\cos\\theta\\, Y_1^0 \\,d\\Omega = \\int_0^{2\\pi}d\\phi\\int_0^{\\pi} \\frac{1}{\\sqrt{4\\pi}}\\cos\\theta \\cdot \\sqrt{\\frac{3}{4\\pi}}\\cos\\theta \\sin\\theta\\,d\\theta = \\frac{\\sqrt{3}}{4\\pi}\\cdot 2\\pi \\cdot \\frac{2}{3} = \\frac{1}{\\sqrt{3}}\\). The radial integral: \\(\\int_0^{\\infty} R_{20}(r)\\cdot r \\cdot R_{21}(r)\\cdot r^2 dr = \\int_0^{\\infty}\\frac{1}{2\\sqrt{6}}a_0^{-3}(2 - r/a_0)(r/a_0)e^{-r/a_0} r^3 dr = -3\\sqrt{6}a_0\\). Combining all factors with \\(eE\\) gives \\(-3eEa_0\\).</p>'
                },
                {
                    question: 'Derive Fermi\'s golden rule starting from the first-order transition amplitude for a constant perturbation turned on at \\(t=0\\): \\(c_f^{(1)}(t) = \\frac{V_{fi}}{E_i - E_f}(e^{i\\omega_{fi}t} - 1)\\).',
                    hint: 'Compute \\(|c_f(t)|^2\\), then the transition rate \\(W = d|c_f|^2/dt\\). Use the identity \\(\\lim_{t\\to\\infty}\\frac{\\sin^2(\\omega t/2)}{\\pi t(\\omega/2)^2} = \\delta(\\omega)\\) and sum over final states with density \\(\\rho(E_f)\\).',
                    solution: '<p>\\(|c_f(t)|^2 = \\frac{|V_{fi}|^2}{\\hbar^2}\\frac{4\\sin^2(\\omega_{fi}t/2)}{\\omega_{fi}^2}\\). The function \\(\\frac{\\sin^2(\\omega t/2)}{\\omega^2 t/4}\\) becomes \\(\\pi\\delta(\\omega/2) = 2\\pi\\delta(\\omega)\\) as \\(t \\to \\infty\\). So \\(|c_f(t)|^2 \\to \\frac{2\\pi t}{\\hbar^2}|V_{fi}|^2 \\delta(\\omega_{fi})\\). The transition rate per unit time is \\(W = \\frac{2\\pi}{\\hbar^2}|V_{fi}|^2\\delta(\\omega_{fi})\\). Converting \\(\\delta(\\omega_{fi}) = \\hbar\\delta(E_f - E_i)\\) and integrating over final states: \\(\\Gamma = \\frac{2\\pi}{\\hbar}|V_{fi}|^2\\rho(E_f)\\).</p>'
                }
            ]
        }
    ]
});
