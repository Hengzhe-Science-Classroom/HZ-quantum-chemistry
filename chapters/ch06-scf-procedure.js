// === Chapter 6: The SCF Procedure ===
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch06',
    number: 6,
    title: 'The SCF Procedure',
    subtitle: 'Solving the Hartree-Fock equations iteratively: from guess to convergence',
    sections: [
        // ========== SECTION 1: The Roothaan-Hall Equations ==========
        {
            id: 'sec6-1-roothaan-hall',
            title: 'The Roothaan-Hall Equations',
            content: `
<h2>6.1 The Roothaan-Hall Equations</h2>

<div class="env-block intuition"><div class="env-title">Intuition — From Integro-Differential to Matrix Equation</div><div class="env-body">
The Hartree-Fock equations are integro-differential equations that cannot be solved analytically for molecules. Roothaan (1951) and Hall (1951) independently showed that by expanding molecular orbitals in a finite basis set, the HF equations reduce to a generalized matrix eigenvalue problem. This transforms an infinite-dimensional functional problem into finite-dimensional linear algebra.
</div></div>

<p>Recall the Hartree-Fock equation for a canonical molecular orbital \\(\\phi_i\\):</p>
\\[
\\hat{f}\\,\\phi_i = \\varepsilon_i\\,\\phi_i,
\\]
<p>where \\(\\hat{f}\\) is the Fock operator. We expand each MO in a basis of \\(K\\) known functions \\(\\{\\chi_\\mu\\}_{\\mu=1}^K\\):</p>
\\[
\\phi_i = \\sum_{\\mu=1}^{K} C_{\\mu i}\\,\\chi_\\mu.
\\]

<p>Substituting into the HF equation and projecting onto \\(\\chi_\\nu\\) (multiplying from the left and integrating):</p>
\\[
\\sum_\\mu C_{\\mu i} \\int \\chi_\\nu^*(\\mathbf{r})\\,\\hat{f}\\,\\chi_\\mu(\\mathbf{r})\\,d\\mathbf{r}
= \\varepsilon_i \\sum_\\mu C_{\\mu i} \\int \\chi_\\nu^*(\\mathbf{r})\\,\\chi_\\mu(\\mathbf{r})\\,d\\mathbf{r}.
\\]

<div class="env-block definition"><div class="env-title">Definition 6.1.1 — Fock and Overlap Matrices</div><div class="env-body">
The <em>Fock matrix</em> \\(\\mathbf{F}\\) and <em>overlap matrix</em> \\(\\mathbf{S}\\) have elements:
\\[
F_{\\nu\\mu} = \\int \\chi_\\nu^*(\\mathbf{r})\\,\\hat{f}\\,\\chi_\\mu(\\mathbf{r})\\,d\\mathbf{r}, \\qquad
S_{\\nu\\mu} = \\int \\chi_\\nu^*(\\mathbf{r})\\,\\chi_\\mu(\\mathbf{r})\\,d\\mathbf{r}.
\\]
The overlap matrix is symmetric positive definite (for linearly independent basis functions). The Fock matrix is Hermitian.
</div></div>

<div class="env-block theorem"><div class="env-title">Theorem 6.1.2 — The Roothaan-Hall Equations</div><div class="env-body">
In a finite basis, the Hartree-Fock equations become the generalized eigenvalue problem:
\\[
\\mathbf{F}\\mathbf{C} = \\mathbf{S}\\mathbf{C}\\boldsymbol{\\varepsilon},
\\]
where \\(\\mathbf{C}\\) is the \\(K \\times K\\) matrix of MO coefficients and \\(\\boldsymbol{\\varepsilon} = \\operatorname{diag}(\\varepsilon_1, \\ldots, \\varepsilon_K)\\) is the diagonal matrix of orbital energies. The MO coefficients satisfy the orthonormality condition \\(\\mathbf{C}^\\dagger \\mathbf{S} \\mathbf{C} = \\mathbf{I}\\).
</div></div>

<div class="env-block proof"><div class="env-title">Proof</div><div class="env-body">
<p>Starting from \\(\\hat{f}\\phi_i = \\varepsilon_i \\phi_i\\) with \\(\\phi_i = \\sum_\\mu C_{\\mu i} \\chi_\\mu\\), project onto \\(\\chi_\\nu\\):</p>
\\[
\\sum_\\mu F_{\\nu\\mu} C_{\\mu i} = \\varepsilon_i \\sum_\\mu S_{\\nu\\mu} C_{\\mu i}.
\\]
<p>Writing this for all \\(\\nu\\) and all \\(i\\) simultaneously gives the matrix equation \\(\\mathbf{F}\\mathbf{C} = \\mathbf{S}\\mathbf{C}\\boldsymbol{\\varepsilon}\\). The orthonormality \\(\\langle \\phi_i | \\phi_j \\rangle = \\delta_{ij}\\) translates to \\(\\mathbf{C}^\\dagger \\mathbf{S} \\mathbf{C} = \\mathbf{I}\\).</p>
<div class="qed">∎</div>
</div></div>

<h3>Orthogonalization of the Basis</h3>

<p>Because \\(\\mathbf{S} \\neq \\mathbf{I}\\) in general, the Roothaan-Hall equation is a <em>generalized</em> eigenvalue problem. We convert it to a standard eigenvalue problem via an orthogonalization transformation.</p>

<div class="env-block definition"><div class="env-title">Definition 6.1.3 — Orthogonalization Matrix</div><div class="env-body">
An orthogonalization matrix \\(\\mathbf{X}\\) satisfies \\(\\mathbf{X}^\\dagger \\mathbf{S} \\mathbf{X} = \\mathbf{I}\\). Two common choices are:
<ul>
<li><strong>Symmetric (L&ouml;wdin) orthogonalization:</strong> \\(\\mathbf{X} = \\mathbf{S}^{-1/2}\\)</li>
<li><strong>Canonical orthogonalization:</strong> \\(\\mathbf{X} = \\mathbf{U}\\mathbf{s}^{-1/2}\\), where \\(\\mathbf{S} = \\mathbf{U}\\mathbf{s}\\mathbf{U}^\\dagger\\)</li>
</ul>
</div></div>

<p>Substituting \\(\\mathbf{C} = \\mathbf{X}\\mathbf{C}'\\) into the Roothaan-Hall equation:</p>
\\[
\\mathbf{F}\\mathbf{X}\\mathbf{C}' = \\mathbf{S}\\mathbf{X}\\mathbf{C}'\\boldsymbol{\\varepsilon}.
\\]
<p>Left-multiplying by \\(\\mathbf{X}^\\dagger\\):</p>
\\[
\\mathbf{X}^\\dagger\\mathbf{F}\\mathbf{X}\\,\\mathbf{C}' = \\mathbf{X}^\\dagger\\mathbf{S}\\mathbf{X}\\,\\mathbf{C}'\\boldsymbol{\\varepsilon} = \\mathbf{I}\\,\\mathbf{C}'\\boldsymbol{\\varepsilon}.
\\]

<div class="env-block corollary"><div class="env-title">Corollary 6.1.4 — Transformed Eigenvalue Problem</div><div class="env-body">
Defining \\(\\mathbf{F}' = \\mathbf{X}^\\dagger \\mathbf{F} \\mathbf{X}\\), the Roothaan-Hall equations become the standard eigenvalue problem:
\\[
\\mathbf{F}'\\mathbf{C}' = \\mathbf{C}'\\boldsymbol{\\varepsilon},
\\]
with \\(\\mathbf{C} = \\mathbf{X}\\mathbf{C}'\\).
</div></div>

<h3>The Fock Matrix Decomposition</h3>

<p>The Fock matrix consists of one-electron and two-electron parts:</p>
\\[
F_{\\mu\\nu} = H^{\\text{core}}_{\\mu\\nu} + G_{\\mu\\nu},
\\]
<p>where \\(H^{\\text{core}}_{\\mu\\nu} = \\langle \\chi_\\mu | \\hat{h} | \\chi_\\nu \\rangle\\) contains kinetic energy and nuclear attraction, and</p>
\\[
G_{\\mu\\nu} = \\sum_{\\lambda\\sigma} P_{\\lambda\\sigma} \\Big[ (\\mu\\nu|\\lambda\\sigma) - \\tfrac{1}{2}(\\mu\\lambda|\\nu\\sigma) \\Big]
\\]
<p>contains the Coulomb and exchange contributions built from the density matrix \\(\\mathbf{P}\\) and two-electron integrals.</p>

<div class="env-block definition"><div class="env-title">Definition 6.1.5 — Density Matrix (Closed-Shell RHF)</div><div class="env-body">
For a closed-shell system with \\(N\\) electrons (\\(N/2\\) doubly occupied orbitals):
\\[
P_{\\mu\\nu} = 2 \\sum_{a=1}^{N/2} C_{\\mu a} C_{\\nu a}^*,
\\]
where the sum runs over occupied orbitals only.
</div></div>

<div class="env-block warning"><div class="env-title">Warning — The Nonlinearity</div><div class="env-body">
The Fock matrix \\(\\mathbf{F}\\) depends on the density matrix \\(\\mathbf{P}\\), which depends on the MO coefficients \\(\\mathbf{C}\\), which are the eigenvectors of \\(\\mathbf{F}\\). This circular dependence is why the Roothaan-Hall equations must be solved iteratively: the self-consistent field (SCF) procedure.
</div></div>

<div class="viz-placeholder" data-viz="viz-roothaan-hall-schematic"></div>
`,
            visualizations: [
                {
                    id: 'viz-roothaan-hall-schematic',
                    title: 'Roothaan-Hall Equation Structure',
                    description: 'Schematic view of the matrix equation FC = SC\\(\\varepsilon\\). The Fock matrix F depends on the density matrix P, which depends on C, creating a nonlinear self-consistency requirement.',
                    setup(body, controls) {
                        const viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0, width: 560, height: 380 });
                        const ctx = viz.ctx;

                        function drawMatrixBox(x, y, w, h, label, color, entries) {
                            ctx.strokeStyle = color;
                            ctx.lineWidth = 2;
                            ctx.strokeRect(x, y, w, h);
                            ctx.fillStyle = color + '22';
                            ctx.fillRect(x, y, w, h);
                            ctx.fillStyle = color;
                            ctx.font = 'bold 16px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            ctx.fillText(label, x + w / 2, y + h / 2);
                            if (entries) {
                                ctx.font = '10px -apple-system,sans-serif';
                                ctx.fillStyle = viz.colors.text;
                                ctx.fillText(entries, x + w / 2, y + h + 14);
                            }
                        }

                        function drawArrow(x1, y1, x2, y2, color) {
                            const dx = x2 - x1, dy = y2 - y1;
                            const len = Math.sqrt(dx * dx + dy * dy);
                            const ux = dx / len, uy = dy / len;
                            ctx.strokeStyle = color;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(x1, y1);
                            ctx.lineTo(x2 - ux * 8, y2 - uy * 8);
                            ctx.stroke();
                            ctx.fillStyle = color;
                            ctx.beginPath();
                            ctx.moveTo(x2, y2);
                            ctx.lineTo(x2 - 10 * ux - 5 * uy, y2 - 10 * uy + 5 * ux);
                            ctx.lineTo(x2 - 10 * ux + 5 * uy, y2 - 10 * uy - 5 * ux);
                            ctx.closePath();
                            ctx.fill();
                        }

                        viz.clear();

                        // Title
                        ctx.fillStyle = viz.colors.white;
                        ctx.font = 'bold 14px -apple-system,sans-serif';
                        ctx.textAlign = 'center';
                        ctx.fillText('The Roothaan-Hall Equation: FC = SCε', 280, 25);

                        // Draw equation: F C = S C ε
                        const mw = 60, mh = 60, y0 = 55;
                        drawMatrixBox(60, y0, mw, mh, 'F', viz.colors.orange, 'K × K');
                        drawMatrixBox(135, y0, mw, mh, 'C', viz.colors.blue, 'K × K');

                        ctx.fillStyle = viz.colors.white;
                        ctx.font = 'bold 20px -apple-system,sans-serif';
                        ctx.textAlign = 'center';
                        ctx.fillText('=', 220, y0 + 30);

                        drawMatrixBox(245, y0, mw, mh, 'S', viz.colors.green, 'K × K');
                        drawMatrixBox(320, y0, mw, mh, 'C', viz.colors.blue, 'K × K');
                        drawMatrixBox(395, y0, mw, mh, 'ε', viz.colors.purple, 'K × K');

                        // Dependency cycle
                        const cy = 200;
                        ctx.fillStyle = viz.colors.white;
                        ctx.font = 'bold 13px -apple-system,sans-serif';
                        ctx.textAlign = 'center';
                        ctx.fillText('Self-Consistency Cycle', 280, cy - 20);

                        const boxes = [
                            { x: 80, y: cy, label: 'C (MO coeffs)', color: viz.colors.blue },
                            { x: 280, y: cy, label: 'P (density)', color: viz.colors.teal },
                            { x: 430, y: cy + 80, label: 'F (Fock)', color: viz.colors.orange },
                            { x: 130, y: cy + 80, label: 'Diagonalize F\'', color: viz.colors.purple }
                        ];

                        boxes.forEach(b => {
                            ctx.fillStyle = b.color + '33';
                            ctx.fillRect(b.x - 55, b.y, 110, 32);
                            ctx.strokeStyle = b.color;
                            ctx.lineWidth = 1.5;
                            ctx.strokeRect(b.x - 55, b.y, 110, 32);
                            ctx.fillStyle = b.color;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText(b.label, b.x, b.y + 18);
                        });

                        // Arrows between boxes
                        drawArrow(135, cy + 16, 225, cy + 16, viz.colors.text);
                        drawArrow(335, cy + 20, 400, cy + 80, viz.colors.text);
                        drawArrow(375, cy + 96, 185, cy + 96, viz.colors.text);
                        drawArrow(100, cy + 80, 70, cy + 32, viz.colors.text);

                        // Arrow labels
                        ctx.fillStyle = viz.colors.muted;
                        ctx.font = '10px -apple-system,sans-serif';
                        ctx.textAlign = 'center';
                        ctx.fillText('P = 2CC†', 180, cy + 10);
                        ctx.fillText('F = H + G(P)', 390, cy + 52);
                        ctx.fillText('F\' = X†FX', 280, cy + 88);
                        ctx.fillText('C = XC\'', 58, cy + 58);

                        // Convergence note
                        ctx.fillStyle = viz.colors.muted;
                        ctx.font = '11px -apple-system,sans-serif';
                        ctx.textAlign = 'center';
                        ctx.fillText('Iterate until |P(new) - P(old)| < threshold', 280, cy + 135);

                        // Energy expression
                        ctx.fillStyle = viz.colors.yellow;
                        ctx.font = '12px -apple-system,sans-serif';
                        ctx.fillText('E = ½ Tr[P(H + F)] + V_nuc', 280, cy + 160);

                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Starting from the LCAO expansion \\(\\phi_i = \\sum_\\mu C_{\\mu i} \\chi_\\mu\\), derive the Roothaan-Hall equation \\(\\mathbf{FC} = \\mathbf{SC}\\boldsymbol{\\varepsilon}\\) by projecting the Hartree-Fock equation onto the basis.',
                    hint: 'Substitute the expansion into \\(\\hat{f}\\phi_i = \\varepsilon_i \\phi_i\\), multiply both sides by \\(\\chi_\\nu^*\\), and integrate.',
                    solution: 'Substituting \\(\\phi_i = \\sum_\\mu C_{\\mu i} \\chi_\\mu\\) into \\(\\hat{f}\\phi_i = \\varepsilon_i \\phi_i\\): \\(\\sum_\\mu C_{\\mu i} \\hat{f}\\chi_\\mu = \\varepsilon_i \\sum_\\mu C_{\\mu i} \\chi_\\mu\\). Multiplying by \\(\\chi_\\nu^*\\) and integrating: \\(\\sum_\\mu F_{\\nu\\mu} C_{\\mu i} = \\varepsilon_i \\sum_\\mu S_{\\nu\\mu} C_{\\mu i}\\). For all \\(\\nu, i\\) this is \\(\\mathbf{FC} = \\mathbf{SC}\\boldsymbol{\\varepsilon}\\).'
                },
                {
                    question: 'Show that the symmetric orthogonalization matrix \\(\\mathbf{X} = \\mathbf{S}^{-1/2}\\) satisfies \\(\\mathbf{X}^\\dagger \\mathbf{S} \\mathbf{X} = \\mathbf{I}\\).',
                    hint: 'Use the fact that \\(\\mathbf{S}\\) is real symmetric, so \\(\\mathbf{S}^{-1/2}\\) is also real symmetric and \\((\\mathbf{S}^{-1/2})^\\dagger = \\mathbf{S}^{-1/2}\\).',
                    solution: '\\(\\mathbf{X}^\\dagger \\mathbf{S} \\mathbf{X} = \\mathbf{S}^{-1/2} \\mathbf{S} \\mathbf{S}^{-1/2} = \\mathbf{S}^{-1/2} \\mathbf{S}^{1/2} = \\mathbf{I}\\), using \\(\\mathbf{S}^{1/2}\\mathbf{S}^{1/2} = \\mathbf{S}\\) and \\(\\mathbf{S}^{-1/2}\\mathbf{S}^{1/2} = \\mathbf{I}\\).'
                },
                {
                    question: 'For a minimal basis H\\(_2\\) calculation with two basis functions, write out the Roothaan-Hall equation explicitly as a \\(2 \\times 2\\) system.',
                    hint: 'With \\(K = 2\\), write \\(\\mathbf{F}\\), \\(\\mathbf{S}\\), and \\(\\mathbf{C}\\) as \\(2 \\times 2\\) matrices and expand the matrix equation.',
                    solution: 'We have \\(\\begin{pmatrix} F_{11} & F_{12} \\\\ F_{21} & F_{22} \\end{pmatrix} \\begin{pmatrix} C_{11} & C_{12} \\\\ C_{21} & C_{22} \\end{pmatrix} = \\begin{pmatrix} S_{11} & S_{12} \\\\ S_{21} & S_{22} \\end{pmatrix} \\begin{pmatrix} C_{11} & C_{12} \\\\ C_{21} & C_{22} \\end{pmatrix} \\begin{pmatrix} \\varepsilon_1 & 0 \\\\ 0 & \\varepsilon_2 \\end{pmatrix}\\). For H\\(_2\\), by symmetry \\(F_{11} = F_{22}\\), \\(S_{11} = S_{22} = 1\\), and \\(S_{12} = S_{21} = S\\). The bonding orbital has \\(\\varepsilon_1 = (F_{11} + F_{12})/(1 + S)\\) and the antibonding has \\(\\varepsilon_2 = (F_{11} - F_{12})/(1 - S)\\).'
                },
                {
                    question: 'Prove that the total RHF electronic energy can be written as \\(E_{\\text{elec}} = \\frac{1}{2}\\operatorname{Tr}[\\mathbf{P}(\\mathbf{H}^{\\text{core}} + \\mathbf{F})]\\).',
                    hint: 'Start from \\(E = \\sum_a^{N/2} 2h_{aa} + \\sum_{ab}^{N/2} (2J_{ab} - K_{ab})\\) in the MO basis, and express in terms of the density and Fock matrices.',
                    solution: 'The electronic energy is \\(E = \\sum_{\\mu\\nu} P_{\\nu\\mu} H^{\\text{core}}_{\\mu\\nu} + \\frac{1}{2}\\sum_{\\mu\\nu} P_{\\nu\\mu} G_{\\mu\\nu}\\). Since \\(F_{\\mu\\nu} = H^{\\text{core}}_{\\mu\\nu} + G_{\\mu\\nu}\\), we get \\(G_{\\mu\\nu} = F_{\\mu\\nu} - H^{\\text{core}}_{\\mu\\nu}\\), so \\(E = \\sum_{\\mu\\nu} P_{\\nu\\mu} H^{\\text{core}}_{\\mu\\nu} + \\frac{1}{2}\\sum_{\\mu\\nu} P_{\\nu\\mu}(F_{\\mu\\nu} - H^{\\text{core}}_{\\mu\\nu}) = \\frac{1}{2}\\sum_{\\mu\\nu} P_{\\nu\\mu}(H^{\\text{core}}_{\\mu\\nu} + F_{\\mu\\nu}) = \\frac{1}{2}\\operatorname{Tr}[\\mathbf{P}(\\mathbf{H}^{\\text{core}} + \\mathbf{F})]\\).'
                },
                {
                    question: 'Explain why canonical orthogonalization is preferred over symmetric orthogonalization when the basis set is nearly linearly dependent.',
                    hint: 'Consider what happens to \\(\\mathbf{S}^{-1/2}\\) when \\(\\mathbf{S}\\) has eigenvalues near zero.',
                    solution: 'When the overlap matrix has eigenvalues near zero, \\(\\mathbf{S}^{-1/2}\\) involves dividing by \\(\\sqrt{s_i}\\) where \\(s_i \\approx 0\\), leading to numerical instability and loss of precision. Canonical orthogonalization can discard the eigenvectors corresponding to near-zero eigenvalues (those below a threshold, typically \\(10^{-6}\\)), reducing the basis dimension but maintaining numerical stability. This is essential for large basis sets with diffuse functions.'
                }
            ]
        },

        // ========== SECTION 2: Two-Electron Integrals ==========
        {
            id: 'sec6-2-two-electron-integrals',
            title: 'Two-Electron Integrals',
            content: `
<h2>6.2 Two-Electron Integrals</h2>

<p>The computational bottleneck of Hartree-Fock theory is the evaluation and handling of two-electron repulsion integrals (ERIs). Their number scales as \\(\\mathcal{O}(K^4)\\), making their efficient computation and storage critical for practical calculations.</p>

<div class="env-block definition"><div class="env-title">Definition 6.2.1 — Two-Electron Repulsion Integral (ERI)</div><div class="env-body">
The two-electron integral in the chemists' notation is:
\\[
(\\mu\\nu|\\lambda\\sigma) = \\iint \\chi_\\mu^*(\\mathbf{r}_1)\\chi_\\nu(\\mathbf{r}_1) \\frac{1}{r_{12}} \\chi_\\lambda^*(\\mathbf{r}_2)\\chi_\\sigma(\\mathbf{r}_2)\\,d\\mathbf{r}_1\\,d\\mathbf{r}_2.
\\]
In the physicists' notation (Dirac bracket): \\(\\langle \\mu\\lambda|\\nu\\sigma \\rangle = (\\mu\\nu|\\lambda\\sigma)\\). The two notations differ in the ordering of indices.
</div></div>

<div class="env-block remark"><div class="env-title">Remark — Integral Count</div><div class="env-body">
For a basis of \\(K\\) functions, there are formally \\(K^4\\) ERIs. Using the eight-fold permutational symmetry (for real basis functions):
\\[
(\\mu\\nu|\\lambda\\sigma) = (\\nu\\mu|\\lambda\\sigma) = (\\mu\\nu|\\sigma\\lambda) = (\\nu\\mu|\\sigma\\lambda) = (\\lambda\\sigma|\\mu\\nu) = \\ldots
\\]
the number of unique integrals is approximately \\(K^4/8\\). For \\(K = 100\\), this is about 12.5 million unique integrals; for \\(K = 1000\\), about \\(1.25 \\times 10^{11}\\).
</div></div>

<h3>The Fock Matrix Build</h3>

<p>The two-electron part of the Fock matrix involves the Coulomb and exchange contributions:</p>
\\[
G_{\\mu\\nu} = \\sum_{\\lambda\\sigma} P_{\\lambda\\sigma} \\Big[ (\\mu\\nu|\\lambda\\sigma) - \\tfrac{1}{2}(\\mu\\lambda|\\nu\\sigma) \\Big].
\\]

<div class="env-block definition"><div class="env-title">Definition 6.2.2 — Coulomb and Exchange Matrices</div><div class="env-body">
The <em>Coulomb matrix</em> \\(\\mathbf{J}\\) and <em>exchange matrix</em> \\(\\mathbf{K}\\) are:
\\[
J_{\\mu\\nu} = \\sum_{\\lambda\\sigma} P_{\\lambda\\sigma}(\\mu\\nu|\\lambda\\sigma), \\qquad
K_{\\mu\\nu} = \\sum_{\\lambda\\sigma} P_{\\lambda\\sigma}(\\mu\\lambda|\\nu\\sigma),
\\]
so that \\(G_{\\mu\\nu} = J_{\\mu\\nu} - \\frac{1}{2}K_{\\mu\\nu}\\) and \\(\\mathbf{F} = \\mathbf{H}^{\\text{core}} + \\mathbf{J} - \\frac{1}{2}\\mathbf{K}\\).
</div></div>

<h3>Schwarz Screening</h3>

<p>Many ERIs are negligibly small, and we can avoid computing them entirely using the Schwarz inequality.</p>

<div class="env-block theorem"><div class="env-title">Theorem 6.2.3 — Schwarz Inequality for ERIs</div><div class="env-body">
For real basis functions:
\\[
|(\\mu\\nu|\\lambda\\sigma)| \\leq \\sqrt{(\\mu\\nu|\\mu\\nu)}\\,\\sqrt{(\\lambda\\sigma|\\lambda\\sigma)}.
\\]
If we precompute the diagonal integrals \\(Q_{\\mu\\nu} = \\sqrt{(\\mu\\nu|\\mu\\nu)}\\), any ERI can be screened: if \\(Q_{\\mu\\nu} \\cdot Q_{\\lambda\\sigma} < \\tau\\) for some threshold \\(\\tau\\), the integral \\((\\mu\\nu|\\lambda\\sigma)\\) can be set to zero.
</div></div>

<div class="env-block proof"><div class="env-title">Proof</div><div class="env-body">
<p>Define the product function \\(f(\\mathbf{r}) = \\chi_\\mu(\\mathbf{r})\\chi_\\nu(\\mathbf{r})\\) and \\(g(\\mathbf{r}) = \\chi_\\lambda(\\mathbf{r})\\chi_\\sigma(\\mathbf{r})\\). The ERI is an inner product in the Coulomb metric:</p>
\\[
(\\mu\\nu|\\lambda\\sigma) = \\iint f(\\mathbf{r}_1) \\frac{1}{r_{12}} g(\\mathbf{r}_2)\\,d\\mathbf{r}_1\\,d\\mathbf{r}_2 = (f|g)_{\\text{Coul}}.
\\]
<p>The Cauchy-Schwarz inequality gives \\(|(f|g)|^2 \\leq (f|f)(g|g) = (\\mu\\nu|\\mu\\nu)(\\lambda\\sigma|\\lambda\\sigma)\\).</p>
<div class="qed">∎</div>
</div></div>

<div class="env-block example"><div class="env-title">Example 6.2.4 — Screening Efficiency</div><div class="env-body">
For a linear alkane chain with \\(K\\) basis functions, the number of significant ERIs scales as \\(\\mathcal{O}(K^2)\\) rather than \\(\\mathcal{O}(K^4)\\) due to the spatial locality of the basis functions. For a benzene molecule (\\(K \\approx 100\\) with a double-zeta basis), Schwarz screening typically eliminates 70-90% of the ERIs.
</div></div>

<h3>Integral Storage Strategies</h3>

<div class="env-block definition"><div class="env-title">Definition 6.2.5 — Integral Handling Modes</div><div class="env-body">
<ul>
<li><strong>Conventional:</strong> Compute all ERIs once and store on disk. Cost: \\(\\mathcal{O}(K^4)\\) storage, one integral evaluation pass.</li>
<li><strong>Direct:</strong> Recompute ERIs each SCF iteration. Cost: no storage, but \\(\\sim\\!10\\times\\) more integral evaluations.</li>
<li><strong>Semi-direct:</strong> Store some integrals, recompute others. A hybrid approach.</li>
</ul>
Modern programs almost universally use the <em>direct</em> SCF approach (Alml&ouml;f, Faegri, Korsell, 1982), as integral recomputation is cheaper than disk I/O for large systems.
</div></div>

<h3>Density Fitting / Resolution of the Identity</h3>

<p>The RI/DF approximation reduces the formal scaling of the Fock build from \\(\\mathcal{O}(K^4)\\) to \\(\\mathcal{O}(K^3)\\):</p>
\\[
(\\mu\\nu|\\lambda\\sigma) \\approx \\sum_{PQ} (\\mu\\nu|P)(P|Q)^{-1}(Q|\\lambda\\sigma),
\\]
<p>where \\(\\{P\\}\\) is an auxiliary basis set. This three-index approximation introduces errors of order \\(10^{-4}\\) to \\(10^{-5}\\) hartree per atom, which is negligible for most applications.</p>

<div class="viz-placeholder" data-viz="viz-eri-schematic"></div>
`,
            visualizations: [
                {
                    id: 'viz-eri-schematic',
                    title: 'Two-Electron Integral Scaling and Screening',
                    description: 'Visualize how the number of significant integrals grows with basis set size, and how Schwarz screening reduces the effective count from O(K\\(^4\\)) toward O(K\\(^2\\)).',
                    setup(body, controls) {
                        const viz = new VizEngine(body, { scale: 40, originX: 70, originY: 330, width: 560, height: 380 });

                        let threshold = 1e-10;
                        const slider = VizEngine.createSlider(controls, 'log₁₀(τ)', -14, -4, -10, 1, v => {
                            threshold = Math.pow(10, v);
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            const ctx = viz.ctx;

                            // Custom axes
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1.5;
                            ctx.beginPath();
                            ctx.moveTo(70, 330);
                            ctx.lineTo(540, 330);
                            ctx.stroke();
                            ctx.beginPath();
                            ctx.moveTo(70, 330);
                            ctx.lineTo(70, 30);
                            ctx.stroke();

                            // Axis labels
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Basis set size K', 300, 360);
                            ctx.save();
                            ctx.translate(20, 180);
                            ctx.rotate(-Math.PI / 2);
                            ctx.fillText('log₁₀(Number of integrals)', 0, 0);
                            ctx.restore();

                            // Plot curves
                            const kVals = [];
                            for (let k = 10; k <= 500; k += 10) kVals.push(k);

                            const xScale = (540 - 70) / (500 - 10);
                            const yScale = (330 - 30) / 12; // log scale from 0 to 12

                            function toSx(k) { return 70 + (k - 10) * xScale; }
                            function toSy(logN) { return 330 - logN * yScale; }

                            // K^4 / 8 curve
                            ctx.strokeStyle = viz.colors.red;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            kVals.forEach((k, i) => {
                                const logN = Math.log10(Math.pow(k, 4) / 8);
                                const sx = toSx(k), sy = toSy(logN);
                                if (sy < 30) return;
                                i === 0 ? ctx.moveTo(sx, sy) : ctx.lineTo(sx, sy);
                            });
                            ctx.stroke();

                            // Screened ~ K^2.5 (approximate)
                            const logThresh = Math.log10(threshold);
                            const screenExp = 2.0 + 0.1 * (-logThresh - 4) / 10; // ranges from ~2.0 to ~2.3
                            ctx.strokeStyle = viz.colors.green;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            let started = false;
                            kVals.forEach((k, i) => {
                                const logN = Math.min(
                                    Math.log10(Math.pow(k, 4) / 8),
                                    screenExp * Math.log10(k) + 1.5
                                );
                                const sx = toSx(k), sy = toSy(logN);
                                if (sy < 30) return;
                                if (!started) { ctx.moveTo(sx, sy); started = true; }
                                else ctx.lineTo(sx, sy);
                            });
                            ctx.stroke();

                            // K^2 lower bound
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 1.5;
                            ctx.setLineDash([6, 4]);
                            ctx.beginPath();
                            kVals.forEach((k, i) => {
                                const logN = 2 * Math.log10(k);
                                const sx = toSx(k), sy = toSy(logN);
                                i === 0 ? ctx.moveTo(sx, sy) : ctx.lineTo(sx, sy);
                            });
                            ctx.stroke();
                            ctx.setLineDash([]);

                            // Tick marks
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            [50, 100, 200, 300, 400, 500].forEach(k => {
                                const sx = toSx(k);
                                ctx.fillText(k, sx, 345);
                                ctx.strokeStyle = viz.colors.grid;
                                ctx.lineWidth = 0.5;
                                ctx.beginPath();
                                ctx.moveTo(sx, 330);
                                ctx.lineTo(sx, 30);
                                ctx.stroke();
                            });

                            ctx.textAlign = 'right';
                            for (let l = 2; l <= 12; l += 2) {
                                const sy = toSy(l);
                                ctx.fillText('10^' + l, 65, sy + 3);
                                ctx.strokeStyle = viz.colors.grid;
                                ctx.lineWidth = 0.5;
                                ctx.beginPath();
                                ctx.moveTo(70, sy);
                                ctx.lineTo(540, sy);
                                ctx.stroke();
                            }

                            // Legend
                            const lx = 90, ly = 45;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'left';

                            ctx.fillStyle = viz.colors.red;
                            ctx.fillRect(lx, ly, 20, 3);
                            ctx.fillText('Total ERIs: K⁴/8', lx + 28, ly + 4);

                            ctx.fillStyle = viz.colors.green;
                            ctx.fillRect(lx, ly + 18, 20, 3);
                            ctx.fillText('After Schwarz screening (τ = 10^' + logThresh.toFixed(0) + ')', lx + 28, ly + 22);

                            ctx.fillStyle = viz.colors.blue;
                            ctx.setLineDash([6, 4]);
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.beginPath();
                            ctx.moveTo(lx, ly + 36);
                            ctx.lineTo(lx + 20, ly + 36);
                            ctx.stroke();
                            ctx.setLineDash([]);
                            ctx.fillText('Linear scaling limit: K²', lx + 28, ly + 40);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'How many unique two-electron integrals are there for a basis set with \\(K = 50\\) functions? How does this compare to the total \\(K^4\\)?',
                    hint: 'The number of unique integrals using eight-fold symmetry is \\(\\frac{1}{8}K(K+1)/2 \\cdot [K(K+1)/2 + 1]\\) approximately \\(K^4/8\\).',
                    solution: 'Total: \\(50^4 = 6{,}250{,}000\\). With eight-fold symmetry: approximately \\(6{,}250{,}000/8 \\approx 781{,}250\\) unique integrals. The exact formula gives \\(n = K(K+1)/2 = 1275\\) unique pairs, and \\(n(n+1)/2 = 813{,}150\\) unique integrals.'
                },
                {
                    question: 'Prove the eight-fold symmetry of two-electron integrals for real basis functions: \\((\\mu\\nu|\\lambda\\sigma) = (\\nu\\mu|\\lambda\\sigma) = (\\mu\\nu|\\sigma\\lambda) = (\\lambda\\sigma|\\mu\\nu)\\).',
                    hint: 'Use the fact that for real functions the integral is unchanged by relabeling within each electron, and by swapping electron labels.',
                    solution: 'For real functions: (1) \\((\\mu\\nu|\\lambda\\sigma) = (\\nu\\mu|\\lambda\\sigma)\\) since \\(\\chi_\\mu(\\mathbf{r}_1)\\chi_\\nu(\\mathbf{r}_1) = \\chi_\\nu(\\mathbf{r}_1)\\chi_\\mu(\\mathbf{r}_1)\\) (commutativity of multiplication). (2) Similarly for the second electron: \\((\\mu\\nu|\\lambda\\sigma) = (\\mu\\nu|\\sigma\\lambda)\\). (3) Swapping electrons 1 and 2: \\((\\mu\\nu|\\lambda\\sigma) = (\\lambda\\sigma|\\mu\\nu)\\) since \\(1/r_{12}\\) is symmetric. These three generate the full 8-fold group.'
                },
                {
                    question: 'Explain why the direct SCF method is preferred over conventional (stored) integrals for large molecules, despite recomputing integrals at each iteration.',
                    hint: 'Consider the relative speed of modern CPUs versus disk I/O, and the memory requirements for storing \\(\\mathcal{O}(K^4)\\) integrals.',
                    solution: 'For large \\(K\\), the \\(\\mathcal{O}(K^4/8)\\) integrals require enormous storage (e.g., for \\(K = 1000\\): \\(\\sim 10^{11}\\) integrals \\(\\times\\) 8 bytes \\(\\approx 800\\) GB). Modern CPUs can recompute integrals faster than reading them from disk, especially with Schwarz screening eliminating most calculations. Direct SCF trades CPU time for memory, which is the right tradeoff given that compute speeds have grown faster than I/O bandwidth.'
                },
                {
                    question: 'In the density fitting approximation, why does introducing an auxiliary basis \\(\\{P\\}\\) reduce the scaling from \\(\\mathcal{O}(K^4)\\) to \\(\\mathcal{O}(K^3)\\)?',
                    hint: 'Count the number of three-index integrals \\((\\mu\\nu|P)\\) and compare to the number of four-index integrals.',
                    solution: 'The four-index ERIs number \\(\\sim K^4/8\\). With DF, we compute three-index integrals \\((\\mu\\nu|P)\\): there are \\(\\sim K^2/2 \\times K_{\\text{aux}}\\) of these, where \\(K_{\\text{aux}} \\sim 3K\\). So the three-index integrals number \\(\\sim 3K^3/2\\). The Fock matrix build then involves contracting these three-index quantities with the density matrix, which is also \\(\\mathcal{O}(K^3)\\). The bottleneck shifts from integral computation to linear algebra.'
                },
                {
                    question: 'Show that the Coulomb matrix \\(J_{\\mu\\nu} = \\sum_{\\lambda\\sigma} P_{\\lambda\\sigma}(\\mu\\nu|\\lambda\\sigma)\\) is symmetric if the density matrix is symmetric.',
                    hint: 'Use the symmetry \\((\\mu\\nu|\\lambda\\sigma) = (\\nu\\mu|\\lambda\\sigma)\\).',
                    solution: '\\(J_{\\nu\\mu} = \\sum_{\\lambda\\sigma} P_{\\lambda\\sigma}(\\nu\\mu|\\lambda\\sigma) = \\sum_{\\lambda\\sigma} P_{\\lambda\\sigma}(\\mu\\nu|\\lambda\\sigma) = J_{\\mu\\nu}\\), where we used \\((\\nu\\mu|\\lambda\\sigma) = (\\mu\\nu|\\lambda\\sigma)\\) for real basis functions. Hence \\(\\mathbf{J}\\) is symmetric whenever \\(\\mathbf{P}\\) is symmetric (which it always is for RHF).'
                }
            ]
        },

        // ========== SECTION 3: The SCF Algorithm ==========
        {
            id: 'sec6-3-scf-algorithm',
            title: 'The SCF Algorithm',
            content: `
<h2>6.3 The SCF Algorithm</h2>

<p>The self-consistent field procedure is the iterative algorithm that solves the Roothaan-Hall equations. At each iteration, we build a new Fock matrix from the current density, diagonalize it to get new orbitals, form a new density, and repeat until convergence.</p>

<div class="env-block definition"><div class="env-title">Definition 6.3.1 — The Basic SCF Algorithm (RHF)</div><div class="env-body">
<ol>
<li><strong>Input:</strong> Nuclear coordinates, basis set, number of electrons \\(N\\).</li>
<li><strong>Compute one-electron integrals:</strong> \\(\\mathbf{S}\\), \\(\\mathbf{H}^{\\text{core}}\\), nuclear repulsion \\(V_{\\text{nuc}}\\).</li>
<li><strong>Compute two-electron integrals</strong> (or prepare for direct computation).</li>
<li><strong>Orthogonalization:</strong> Diagonalize \\(\\mathbf{S}\\), form \\(\\mathbf{X} = \\mathbf{S}^{-1/2}\\).</li>
<li><strong>Initial guess:</strong> Obtain starting density \\(\\mathbf{P}^{(0)}\\).</li>
<li><strong>Begin SCF iteration</strong> (for \\(n = 0, 1, 2, \\ldots\\)):
    <ol type="a">
    <li>Build Fock matrix: \\(\\mathbf{F}^{(n)} = \\mathbf{H}^{\\text{core}} + \\mathbf{G}(\\mathbf{P}^{(n)})\\)</li>
    <li>Transform: \\(\\mathbf{F}' = \\mathbf{X}^\\dagger \\mathbf{F}^{(n)} \\mathbf{X}\\)</li>
    <li>Diagonalize: \\(\\mathbf{F}'\\mathbf{C}' = \\mathbf{C}'\\boldsymbol{\\varepsilon}\\)</li>
    <li>Back-transform: \\(\\mathbf{C} = \\mathbf{X}\\mathbf{C}'\\)</li>
    <li>Form new density: \\(P_{\\mu\\nu}^{(n+1)} = 2\\sum_{a=1}^{N/2} C_{\\mu a} C_{\\nu a}\\)</li>
    <li>Compute energy: \\(E^{(n+1)} = \\frac{1}{2}\\operatorname{Tr}[\\mathbf{P}^{(n+1)}(\\mathbf{H}^{\\text{core}} + \\mathbf{F}^{(n)})] + V_{\\text{nuc}}\\)</li>
    <li>Check convergence: if \\(|E^{(n+1)} - E^{(n)}| < \\delta_E\\) and \\(\\|\\mathbf{P}^{(n+1)} - \\mathbf{P}^{(n)}\\| < \\delta_P\\), stop.</li>
    </ol>
</li>
</ol>
</div></div>

<h3>Initial Guess Strategies</h3>

<p>The quality of the initial guess significantly affects the number of iterations required and whether the SCF converges at all. Common choices:</p>

<div class="env-block definition"><div class="env-title">Definition 6.3.2 — Common Initial Guesses</div><div class="env-body">
<ul>
<li><strong>Core Hamiltonian (Hcore):</strong> Set \\(\\mathbf{F}^{(0)} = \\mathbf{H}^{\\text{core}}\\). This ignores electron-electron repulsion and is the simplest guess. Often requires 15-30 iterations.</li>
<li><strong>Generalized Wolfsberg-Helmholtz (GWH):</strong> \\(F^{(0)}_{\\mu\\nu} = \\frac{1}{2}K(H^{\\text{core}}_{\\mu\\mu} + H^{\\text{core}}_{\\nu\\nu})S_{\\mu\\nu}\\) with \\(K \\approx 1.75\\).</li>
<li><strong>Superposition of Atomic Densities (SAD):</strong> Construct \\(\\mathbf{P}^{(0)}\\) from converged atomic HF calculations. Usually the best general-purpose guess, requiring 8-15 iterations.</li>
<li><strong>Previous calculation:</strong> Use orbitals from a nearby geometry (geometry optimization) or a lower level of theory.</li>
</ul>
</div></div>

<h3>Convergence Criteria</h3>

<div class="env-block definition"><div class="env-title">Definition 6.3.3 — Standard Convergence Criteria</div><div class="env-body">
The SCF is considered converged when:
<ul>
<li>Energy change: \\(|\\Delta E| = |E^{(n+1)} - E^{(n)}| < \\delta_E\\) (typically \\(10^{-8}\\) to \\(10^{-10}\\) hartree)</li>
<li>Density change: \\(\\Delta_P = \\sqrt{\\sum_{\\mu\\nu}(P_{\\mu\\nu}^{(n+1)} - P_{\\mu\\nu}^{(n)})^2/K^2} < \\delta_P\\) (typically \\(10^{-6}\\) to \\(10^{-8}\\))</li>
<li>Orbital gradient: \\(\\|[\\mathbf{F},\\mathbf{P}\\mathbf{S}]\\| < \\delta_G\\) (typically \\(10^{-6}\\)). This is the commutator condition; at convergence, \\(\\mathbf{FPS} = \\mathbf{SPF}\\).</li>
</ul>
</div></div>

<div class="env-block theorem"><div class="env-title">Theorem 6.3.4 — Commutator Condition for SCF Convergence</div><div class="env-body">
The Roothaan-Hall equations are satisfied if and only if the commutator of the Fock and density matrices in the orthogonal basis vanishes:
\\[
[\\mathbf{F}, \\mathbf{PS}] = \\mathbf{FPS} - \\mathbf{SPF} = \\mathbf{0}.
\\]
This is equivalent to requiring that \\(\\mathbf{P}\\) is idempotent in the orthogonal basis: \\(\\mathbf{P}\\mathbf{S}\\mathbf{P} = 2\\mathbf{P}\\) (for RHF).
</div></div>

<div class="env-block proof"><div class="env-title">Proof</div><div class="env-body">
<p>At convergence, \\(\\mathbf{FC} = \\mathbf{SC}\\boldsymbol{\\varepsilon}\\). Thus \\(\\mathbf{FP} = \\mathbf{F}(2\\mathbf{C}_o\\mathbf{C}_o^\\dagger) = 2\\mathbf{SC}_o\\boldsymbol{\\varepsilon}_o\\mathbf{C}_o^\\dagger\\), where subscript \\(o\\) denotes occupied columns. Similarly, \\(\\mathbf{SPF} = 2\\mathbf{SC}_o\\mathbf{C}_o^\\dagger\\mathbf{SC}_o\\boldsymbol{\\varepsilon}_o\\mathbf{C}_o^\\dagger\\mathbf{S}^{-1}\\mathbf{S}\\). Using \\(\\mathbf{C}_o^\\dagger\\mathbf{S}\\mathbf{C}_o = \\mathbf{I}\\), the commutator \\([\\mathbf{F}, \\mathbf{PS}]\\) vanishes because the occupied-virtual blocks decouple when \\(\\mathbf{F}\\) and \\(\\mathbf{PS}\\) share eigenvectors.</p>
<div class="qed">∎</div>
</div></div>

<div class="viz-placeholder" data-viz="viz-scf-convergence"></div>

<div class="env-block warning"><div class="env-title">Warning — SCF Convergence Is Not Guaranteed</div><div class="env-body">
The basic SCF algorithm can oscillate, diverge, or converge to a saddle point of the energy. Systems prone to convergence difficulties include:
<ul>
<li>Transition metal complexes (near-degenerate orbitals)</li>
<li>Open-shell systems and diradicals</li>
<li>Anions (diffuse basis functions)</li>
<li>Stretched bonds (near dissociation)</li>
<li>Large basis sets with near-linear dependencies</li>
</ul>
Convergence acceleration techniques (Section 6.4) are essential for robust SCF implementations.
</div></div>
`,
            visualizations: [
                {
                    id: 'viz-scf-convergence',
                    title: 'SCF Convergence: Energy vs. Iteration',
                    description: 'Simulated SCF convergence for a small molecule. Toggle between a well-behaved case and a difficult case showing oscillation. The energy should decrease monotonically toward the converged value.',
                    setup(body, controls) {
                        const viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0, width: 560, height: 400 });
                        const ctx = viz.ctx;

                        let mode = 'easy';
                        VizEngine.createButton(controls, 'Well-behaved', () => { mode = 'easy'; draw(); });
                        VizEngine.createButton(controls, 'Oscillating', () => { mode = 'oscillate'; draw(); });
                        VizEngine.createButton(controls, 'With DIIS', () => { mode = 'diis'; draw(); });

                        // Simulated SCF energies
                        const easyE = [-74.5, -75.8, -75.92, -75.975, -75.990, -75.9958, -75.9982, -75.9993, -75.9998, -75.99995, -76.0000, -76.0000];
                        const oscE = [-74.5, -76.3, -75.6, -76.15, -75.85, -76.08, -75.93, -76.03, -75.98, -76.01, -75.995, -76.003, -75.999, -76.001, -76.0001, -76.0000, -76.0000, -76.0000];
                        const diisE = [-74.5, -75.8, -75.95, -75.998, -75.9999, -76.0000, -76.0000];

                        function draw() {
                            viz.clear();
                            const data = mode === 'easy' ? easyE : mode === 'oscillate' ? oscE : diisE;
                            const label = mode === 'easy' ? 'Well-Behaved SCF (H₂O/STO-3G)' :
                                         mode === 'oscillate' ? 'Oscillating SCF (no acceleration)' :
                                         'SCF with DIIS Acceleration';
                            const color = mode === 'easy' ? viz.colors.green :
                                         mode === 'oscillate' ? viz.colors.red :
                                         viz.colors.blue;

                            const px = 70, py = 40, pw = 470, ph = 300;

                            // Title
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText(label, px + pw / 2, 25);

                            // Axes
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1.5;
                            ctx.beginPath();
                            ctx.moveTo(px, py);
                            ctx.lineTo(px, py + ph);
                            ctx.lineTo(px + pw, py + ph);
                            ctx.stroke();

                            // Axis labels
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('SCF Iteration', px + pw / 2, py + ph + 35);
                            ctx.save();
                            ctx.translate(15, py + ph / 2);
                            ctx.rotate(-Math.PI / 2);
                            ctx.fillText('Energy (hartree)', 0, 0);
                            ctx.restore();

                            // Scale
                            const eMin = -76.4, eMax = -74.2;
                            const nMax = data.length;
                            const xStep = pw / Math.max(nMax - 1, 1);

                            function toSx(i) { return px + i * xStep; }
                            function toSy(e) { return py + ph * (1 - (e - eMin) / (eMax - eMin)); }

                            // Grid lines
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 0.5;
                            for (let e = -76; e <= -74.5; e += 0.5) {
                                const sy = toSy(e);
                                ctx.beginPath();
                                ctx.moveTo(px, sy);
                                ctx.lineTo(px + pw, sy);
                                ctx.stroke();
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '9px -apple-system,sans-serif';
                                ctx.textAlign = 'right';
                                ctx.fillText(e.toFixed(1), px - 5, sy + 3);
                            }

                            // Converged line
                            ctx.strokeStyle = viz.colors.yellow;
                            ctx.lineWidth = 1;
                            ctx.setLineDash([4, 4]);
                            const convY = toSy(-76.0);
                            ctx.beginPath();
                            ctx.moveTo(px, convY);
                            ctx.lineTo(px + pw, convY);
                            ctx.stroke();
                            ctx.setLineDash([]);
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('E_conv = -76.0000', px + pw - 110, convY - 6);

                            // Iteration ticks
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '9px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            for (let i = 0; i < nMax; i++) {
                                if (nMax <= 10 || i % 2 === 0) {
                                    ctx.fillText(i + 1, toSx(i), py + ph + 15);
                                }
                            }

                            // Data line
                            ctx.strokeStyle = color;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            data.forEach((e, i) => {
                                const sx = toSx(i), sy = toSy(e);
                                i === 0 ? ctx.moveTo(sx, sy) : ctx.lineTo(sx, sy);
                            });
                            ctx.stroke();

                            // Data points
                            data.forEach((e, i) => {
                                const sx = toSx(i), sy = toSy(e);
                                ctx.fillStyle = color;
                                ctx.beginPath();
                                ctx.arc(sx, sy, 4, 0, Math.PI * 2);
                                ctx.fill();
                            });

                            // Iteration count
                            ctx.fillStyle = viz.colors.muted;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('Converged in ' + data.length + ' iterations', px + 10, py + 15);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Why must the SCF procedure be iterative? Why can we not simply solve the Roothaan-Hall equations in a single diagonalization?',
                    hint: 'Consider the dependence of \\(\\mathbf{F}\\) on the MO coefficients \\(\\mathbf{C}\\).',
                    solution: 'The Fock matrix \\(\\mathbf{F}\\) depends on the density matrix \\(\\mathbf{P}\\), which is constructed from the MO coefficients \\(\\mathbf{C}\\), which are the eigenvectors of \\(\\mathbf{F}\\). This circular dependence means we cannot know \\(\\mathbf{F}\\) until we know \\(\\mathbf{C}\\), and vice versa. We must iterate: guess \\(\\mathbf{P}\\), build \\(\\mathbf{F}\\), diagonalize to get new \\(\\mathbf{C}\\) and \\(\\mathbf{P}\\), and repeat until the input and output densities agree (self-consistency).'
                },
                {
                    question: 'Describe the superposition of atomic densities (SAD) initial guess. Why is it generally superior to the core Hamiltonian guess?',
                    hint: 'What physical information does SAD include that the core Hamiltonian guess lacks?',
                    solution: 'SAD constructs the initial density by superposing converged atomic HF densities: \\(\\mathbf{P}^{(0)} = \\sum_A \\mathbf{P}_A\\), where \\(\\mathbf{P}_A\\) is the density matrix of isolated atom \\(A\\) in the molecular basis. This includes electron-electron repulsion at the atomic level, providing a physically reasonable starting point. The core Hamiltonian guess (\\(\\mathbf{F} = \\mathbf{H}^{\\text{core}}\\)) ignores all electron-electron interactions, leading to very diffuse starting orbitals and slow convergence. SAD typically needs 8-15 iterations vs. 15-30 for Hcore.'
                },
                {
                    question: 'Show that the RHF energy expression \\(E = \\frac{1}{2}\\operatorname{Tr}[\\mathbf{P}(\\mathbf{H}^{\\text{core}} + \\mathbf{F})] + V_{\\text{nuc}}\\) does <em>not</em> simply equal \\(\\sum_a \\varepsilon_a\\). What is the correct relationship between the orbital energies and the total energy?',
                    hint: 'Expand \\(\\varepsilon_a = h_{aa} + \\sum_b (2J_{ab} - K_{ab})\\) and sum over occupied orbitals. Compare with the total electronic energy.',
                    solution: 'Summing orbital energies: \\(\\sum_{a=1}^{N/2} 2\\varepsilon_a = \\sum_a 2h_{aa} + \\sum_{ab}(4J_{ab} - 2K_{ab})\\). The electronic energy is \\(E_{\\text{elec}} = \\sum_a 2h_{aa} + \\sum_{ab}(2J_{ab} - K_{ab})\\). The difference is \\(\\sum_{ab}(2J_{ab} - K_{ab})\\), which is the electron-electron repulsion. Thus \\(E_{\\text{elec}} = 2\\sum_a \\varepsilon_a - \\sum_{ab}(2J_{ab} - K_{ab}) = 2\\sum_a \\varepsilon_a - \\frac{1}{2}\\operatorname{Tr}[\\mathbf{PG}]\\). The orbital energies double-count the electron-electron repulsion.'
                },
                {
                    question: 'For a minimal basis \\(\\text{HeH}^+\\) calculation (2 electrons, 2 basis functions), write out the complete first SCF iteration using the core Hamiltonian guess. Assume \\(H^{\\text{core}} = \\begin{pmatrix} -2.5 & -1.2 \\\\ -1.2 & -1.5 \\end{pmatrix}\\) and \\(S = \\begin{pmatrix} 1.0 & 0.6 \\\\ 0.6 & 1.0 \\end{pmatrix}\\).',
                    hint: 'Compute \\(\\mathbf{S}^{-1/2}\\), form \\(\\mathbf{F}\' = \\mathbf{S}^{-1/2}\\mathbf{H}^{\\text{core}}\\mathbf{S}^{-1/2}\\), diagonalize, back-transform, and form the density matrix with 1 occupied orbital.',
                    solution: 'Eigenvalues of \\(\\mathbf{S}\\): \\(s_1 = 1.6, s_2 = 0.4\\). \\(\\mathbf{S}^{-1/2}\\) has eigenvalues \\(1/\\sqrt{1.6}, 1/\\sqrt{0.4}\\). Transform \\(\\mathbf{F}\' = \\mathbf{X}^\\dagger \\mathbf{H}^{\\text{core}} \\mathbf{X}\\), diagonalize to get \\(\\varepsilon_1, \\varepsilon_2\\) and \\(\\mathbf{C}\'\\). Back-transform \\(\\mathbf{C} = \\mathbf{X}\\mathbf{C}\'\\). Form \\(P_{\\mu\\nu} = 2 C_{\\mu 1} C_{\\nu 1}\\) (1 occupied orbital for 2 electrons). This density enters the next iteration to build the full Fock matrix including two-electron terms.'
                },
                {
                    question: 'Prove that at SCF convergence, the RHF energy is stationary with respect to orbital rotations between occupied and virtual orbitals.',
                    hint: 'Consider an infinitesimal rotation \\(\\phi_a \\to \\phi_a + \\epsilon\\,\\phi_r\\) and compute \\(\\partial E/\\partial \\epsilon\\).',
                    solution: 'Under an occupied-virtual rotation \\(\\phi_a \\to \\phi_a + \\epsilon\\,\\phi_r\\), \\(\\phi_r \\to \\phi_r - \\epsilon\\,\\phi_a\\), the energy change to first order is \\(\\partial E/\\partial \\epsilon = 4(F_{ra} - \\varepsilon_a \\delta_{ra}) = 4F_{ra}\\) (off-diagonal Fock element in the MO basis). At convergence, \\(\\mathbf{F}\\) is diagonal in the canonical MO basis, so \\(F_{ra} = 0\\) for all occupied \\(a\\) and virtual \\(r\\). Hence \\(\\partial E/\\partial \\epsilon = 0\\), confirming stationarity. The Brillouin theorem \\(\\langle \\Phi_a^r | \\hat{H} | \\Phi_0 \\rangle = 0\\) is the many-body equivalent.'
                }
            ]
        },

        // ========== SECTION 4: Convergence Acceleration ==========
        {
            id: 'sec6-4-convergence-acceleration',
            title: 'Convergence Acceleration',
            content: `
<h2>6.4 Convergence Acceleration</h2>

<p>The basic SCF algorithm often converges slowly or not at all. Over the decades, several techniques have been developed to accelerate and stabilize SCF convergence. The most important of these is DIIS (Direct Inversion in the Iterative Subspace), invented by Pulay in 1980.</p>

<h3>Simple Damping</h3>

<div class="env-block definition"><div class="env-title">Definition 6.4.1 — Density Damping</div><div class="env-body">
Instead of using the new density \\(\\mathbf{P}^{(n+1)}_{\\text{new}}\\) directly, form a damped density:
\\[
\\mathbf{P}^{(n+1)} = \\alpha\\,\\mathbf{P}^{(n+1)}_{\\text{new}} + (1 - \\alpha)\\mathbf{P}^{(n)},
\\]
where \\(0 < \\alpha \\leq 1\\) is the damping factor. Typical values: \\(\\alpha = 0.3\\) to \\(0.7\\). Smaller \\(\\alpha\\) gives more damping (slower but more stable).
</div></div>

<div class="env-block remark"><div class="env-title">Remark</div><div class="env-body">
Damping prevents large oscillations but slows convergence. It is often used for the first few iterations before switching to DIIS. The damped density is not idempotent (\\(\\mathbf{PSP} \\neq 2\\mathbf{P}\\)), which can cause issues in some formulations.
</div></div>

<h3>Level Shifting</h3>

<div class="env-block definition"><div class="env-title">Definition 6.4.2 — Level Shifting</div><div class="env-body">
Modify the Fock matrix by adding a shift to the virtual-virtual block in the MO basis:
\\[
F'_{rs} \\to F'_{rs} + b\\,\\delta_{rs} \\quad \\text{for virtual orbitals } r, s,
\\]
where \\(b > 0\\) is the level shift parameter. This increases the HOMO-LUMO gap artificially, preventing orbital swapping and stabilizing convergence. The shift must be removed (or gradually reduced) as convergence is approached.
</div></div>

<div class="env-block proposition"><div class="env-title">Proposition 6.4.3</div><div class="env-body">
Level shifting by \\(b\\) is equivalent to adding \\(-b(\\mathbf{I} - \\mathbf{PS}/2)\\) to the Fock matrix in the AO basis, which penalizes deviation from the current density.
</div></div>

<h3>DIIS: Direct Inversion in the Iterative Subspace</h3>

<p>DIIS is the most successful SCF convergence acceleration technique. It extrapolates from the history of Fock matrices to find the optimal linear combination.</p>

<div class="env-block definition"><div class="env-title">Definition 6.4.4 — DIIS Error Vector</div><div class="env-body">
At iteration \\(n\\), the DIIS error vector is:
\\[
\\mathbf{e}^{(n)} = \\mathbf{F}^{(n)}\\mathbf{P}^{(n)}\\mathbf{S} - \\mathbf{S}\\mathbf{P}^{(n)}\\mathbf{F}^{(n)},
\\]
which is the commutator \\([\\mathbf{F}^{(n)}, \\mathbf{P}^{(n)}\\mathbf{S}]\\). At convergence, \\(\\mathbf{e} = \\mathbf{0}\\).
</div></div>

<div class="env-block theorem"><div class="env-title">Theorem 6.4.5 — DIIS Extrapolation (Pulay, 1980)</div><div class="env-body">
Given a history of Fock matrices \\(\\{\\mathbf{F}^{(1)}, \\ldots, \\mathbf{F}^{(m)}\\}\\) and error vectors \\(\\{\\mathbf{e}^{(1)}, \\ldots, \\mathbf{e}^{(m)}\\}\\), the optimal extrapolated Fock matrix is:
\\[
\\mathbf{F}_{\\text{DIIS}} = \\sum_{i=1}^{m} c_i\\,\\mathbf{F}^{(i)},
\\]
where the coefficients \\(\\{c_i\\}\\) minimize \\(\\|\\sum_i c_i \\mathbf{e}^{(i)}\\|^2\\) subject to \\(\\sum_i c_i = 1\\). This leads to the linear system:
\\[
\\begin{pmatrix} B_{11} & \\cdots & B_{1m} & -1 \\\\ \\vdots & \\ddots & \\vdots & \\vdots \\\\ B_{m1} & \\cdots & B_{mm} & -1 \\\\ -1 & \\cdots & -1 & 0 \\end{pmatrix}
\\begin{pmatrix} c_1 \\\\ \\vdots \\\\ c_m \\\\ \\lambda \\end{pmatrix}
= \\begin{pmatrix} 0 \\\\ \\vdots \\\\ 0 \\\\ -1 \\end{pmatrix},
\\]
where \\(B_{ij} = \\operatorname{Tr}[\\mathbf{e}^{(i)\\dagger}\\mathbf{e}^{(j)}]\\) and \\(\\lambda\\) is a Lagrange multiplier.
</div></div>

<div class="env-block proof"><div class="env-title">Proof</div><div class="env-body">
<p>We seek to minimize \\(\\|\\mathbf{e}_{\\text{DIIS}}\\|^2 = \\|\\sum_i c_i \\mathbf{e}^{(i)}\\|^2 = \\sum_{ij} c_i c_j \\operatorname{Tr}[\\mathbf{e}^{(i)\\dagger}\\mathbf{e}^{(j)}] = \\sum_{ij} c_i c_j B_{ij}\\) subject to \\(\\sum_i c_i = 1\\).</p>
<p>Introducing the Lagrange multiplier \\(\\lambda\\), we minimize \\(L = \\sum_{ij} c_i c_j B_{ij} - \\lambda(\\sum_i c_i - 1)\\). Setting \\(\\partial L/\\partial c_k = 0\\) gives \\(2\\sum_j B_{kj} c_j - \\lambda = 0\\), or (absorbing the factor of 2 into \\(\\lambda\\)): \\(\\sum_j B_{kj} c_j - \\lambda = 0\\) for all \\(k\\), with \\(\\sum_i c_i = 1\\). This is the system shown above.</p>
<div class="qed">∎</div>
</div></div>

<div class="env-block example"><div class="env-title">Example 6.4.6 — DIIS in Practice</div><div class="env-body">
<p>Consider an SCF calculation where the basic algorithm would require 25 iterations. With DIIS (keeping the last 6-8 error vectors), convergence typically improves to 8-12 iterations. The DIIS subspace is usually limited to 6-10 vectors; older vectors are discarded. A typical modern implementation:</p>
<ol>
<li>Perform 2-3 iterations with damping to get a reasonable starting density.</li>
<li>Switch to DIIS, accumulating error vectors.</li>
<li>At each iteration, solve the DIIS equations and use \\(\\mathbf{F}_{\\text{DIIS}}\\) instead of the raw Fock matrix.</li>
</ol>
</div></div>

<div class="viz-placeholder" data-viz="viz-diis-comparison"></div>

<h3>Other Acceleration Techniques</h3>

<div class="env-block definition"><div class="env-title">Definition 6.4.7 — Additional Methods</div><div class="env-body">
<ul>
<li><strong>EDIIS (Energy DIIS, Kudin &amp; Scuseria 2002):</strong> Minimizes an interpolated energy rather than the error norm. Better for early iterations far from convergence.</li>
<li><strong>ADIIS (Augmented DIIS, Hu &amp; Yang 2010):</strong> Combines EDIIS and DIIS, switching automatically.</li>
<li><strong>Second-order SCF (SOSCF):</strong> Uses the orbital Hessian to take Newton-Raphson steps. Quadratic convergence near the solution but expensive per step.</li>
<li><strong>Maximum Overlap Method (MOM, Gilbert et al. 2008):</strong> Prevents orbital swapping by choosing orbitals that maximize overlap with the previous iteration. Useful for excited-state SCF.</li>
</ul>
</div></div>

<div class="env-block warning"><div class="env-title">Warning — DIIS Can Converge to Saddle Points</div><div class="env-body">
DIIS minimizes the orbital gradient norm, not the energy. It can converge to SCF solutions that are saddle points on the energy surface (not the lowest-energy solution). Stability analysis (Section 6.5) is needed to verify that the converged solution is a true minimum.
</div></div>
`,
            visualizations: [
                {
                    id: 'viz-diis-comparison',
                    title: 'Convergence Comparison: Damping vs. DIIS',
                    description: 'Compare the convergence of the SCF density matrix RMS error with different acceleration strategies. DIIS typically achieves convergence in fewer iterations with superlinear convergence near the solution.',
                    setup(body, controls) {
                        const viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0, width: 560, height: 400 });
                        const ctx = viz.ctx;

                        // Simulated convergence data (log10 of density error)
                        const noDamp = [0, -0.3, -0.1, -0.5, -0.2, -0.6, -0.4, -0.7, -0.5, -0.8, -0.7, -0.9, -0.85, -1.0, -0.95, -1.1, -1.05, -1.2, -1.15, -1.3, -1.25, -1.4, -1.35, -1.5, -1.55, -1.7, -1.9, -2.1, -2.4, -2.8, -3.3, -3.9, -4.6, -5.4, -6.3, -7.3];
                        const damped = [0, -0.4, -0.7, -1.0, -1.2, -1.4, -1.6, -1.8, -2.0, -2.2, -2.4, -2.6, -2.8, -3.0, -3.2, -3.4, -3.6, -3.8, -4.0, -4.2, -4.5, -4.8, -5.1, -5.5, -5.9, -6.4, -7.0];
                        const diisData = [0, -0.4, -0.7, -1.2, -2.0, -3.2, -4.8, -6.5, -8.0];
                        const adiisData = [0, -0.5, -1.0, -1.8, -3.0, -4.5, -6.2, -8.0];

                        function draw() {
                            viz.clear();

                            const px = 70, py = 40, pw = 460, ph = 310;

                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('SCF Convergence: Density RMS Error', px + pw / 2, 25);

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
                            ctx.fillText('Iteration', px + pw / 2, py + ph + 35);
                            ctx.save();
                            ctx.translate(15, py + ph / 2);
                            ctx.rotate(-Math.PI / 2);
                            ctx.fillText('log₁₀(ΔP_rms)', 0, 0);
                            ctx.restore();

                            const maxIter = 36;
                            const logMin = -9, logMax = 1;
                            function toSx(i) { return px + i / maxIter * pw; }
                            function toSy(logE) { return py + ph * (1 - (logE - logMin) / (logMax - logMin)); }

                            // Grid
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 0.5;
                            for (let l = -8; l <= 0; l += 2) {
                                const sy = toSy(l);
                                ctx.beginPath();
                                ctx.moveTo(px, sy);
                                ctx.lineTo(px + pw, sy);
                                ctx.stroke();
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '9px -apple-system,sans-serif';
                                ctx.textAlign = 'right';
                                ctx.fillText('10^' + l, px - 5, sy + 3);
                            }

                            for (let i = 0; i <= maxIter; i += 5) {
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '9px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText(i, toSx(i), py + ph + 15);
                            }

                            // Convergence threshold line
                            ctx.strokeStyle = viz.colors.yellow;
                            ctx.lineWidth = 1;
                            ctx.setLineDash([4, 4]);
                            const threshY = toSy(-6);
                            ctx.beginPath();
                            ctx.moveTo(px, threshY);
                            ctx.lineTo(px + pw, threshY);
                            ctx.stroke();
                            ctx.setLineDash([]);
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.font = '9px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('convergence threshold', px + pw - 120, threshY - 6);

                            // Plot functions
                            function plotCurve(data, color, lw) {
                                ctx.strokeStyle = color;
                                ctx.lineWidth = lw || 2;
                                ctx.beginPath();
                                data.forEach((v, i) => {
                                    const sx = toSx(i), sy = toSy(v);
                                    i === 0 ? ctx.moveTo(sx, sy) : ctx.lineTo(sx, sy);
                                });
                                ctx.stroke();
                                data.forEach((v, i) => {
                                    const sx = toSx(i), sy = toSy(v);
                                    ctx.fillStyle = color;
                                    ctx.beginPath();
                                    ctx.arc(sx, sy, 2.5, 0, Math.PI * 2);
                                    ctx.fill();
                                });
                            }

                            plotCurve(noDamp, viz.colors.red);
                            plotCurve(damped, viz.colors.orange);
                            plotCurve(diisData, viz.colors.blue);
                            plotCurve(adiisData, viz.colors.green);

                            // Legend
                            const lx = px + 10, ly = py + 5;
                            const items = [
                                { label: 'No acceleration (oscillating)', color: viz.colors.red },
                                { label: 'Damping (α = 0.5)', color: viz.colors.orange },
                                { label: 'DIIS', color: viz.colors.blue },
                                { label: 'ADIIS', color: viz.colors.green }
                            ];
                            items.forEach((item, i) => {
                                ctx.fillStyle = item.color;
                                ctx.fillRect(lx, ly + i * 16, 14, 3);
                                ctx.font = '10px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.fillText(item.label, lx + 20, ly + i * 16 + 4);
                            });
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show that the DIIS error vector \\(\\mathbf{e} = \\mathbf{FPS} - \\mathbf{SPF}\\) vanishes at SCF convergence.',
                    hint: 'At convergence, \\(\\mathbf{FC} = \\mathbf{SC}\\boldsymbol{\\varepsilon}\\). What does this imply about \\(\\mathbf{F}\\) in the orthogonal MO basis?',
                    solution: 'At convergence, the Fock matrix is diagonal in the MO basis: \\(\\mathbf{C}^\\dagger \\mathbf{F} \\mathbf{C} = \\boldsymbol{\\varepsilon}\\). The density matrix is \\(\\mathbf{P} = 2\\mathbf{C}_o\\mathbf{C}_o^\\dagger\\). Then \\(\\mathbf{FPS} = \\mathbf{SC}\\boldsymbol{\\varepsilon}\\mathbf{C}^\\dagger \\cdot 2\\mathbf{C}_o\\mathbf{C}_o^\\dagger \\mathbf{S}\\) and \\(\\mathbf{SPF} = \\mathbf{S} \\cdot 2\\mathbf{C}_o\\mathbf{C}_o^\\dagger \\mathbf{SC}\\boldsymbol{\\varepsilon}\\mathbf{C}^\\dagger\\). Since \\(\\boldsymbol{\\varepsilon}\\) is diagonal and the occupied-virtual blocks of \\(\\mathbf{C}^\\dagger \\mathbf{SC}_o = (\\mathbf{I} | \\mathbf{0})^T\\), the commutator vanishes.'
                },
                {
                    question: 'Derive the DIIS linear system by applying the method of Lagrange multipliers to minimize \\(\\|\\sum_i c_i \\mathbf{e}^{(i)}\\|^2\\) subject to \\(\\sum_i c_i = 1\\).',
                    hint: 'Define \\(B_{ij} = \\operatorname{Tr}[\\mathbf{e}^{(i)\\dagger}\\mathbf{e}^{(j)}]\\) and set up the Lagrangian \\(L = \\sum_{ij} c_i c_j B_{ij} - \\lambda(\\sum_i c_i - 1)\\).',
                    solution: 'The Lagrangian is \\(L = \\sum_{ij} c_i c_j B_{ij} - \\lambda(\\sum_i c_i - 1)\\). Taking \\(\\partial L/\\partial c_k = 0\\): \\(\\sum_j (B_{kj} + B_{jk}) c_j - \\lambda = 0\\). Since \\(B_{ij} = B_{ji}\\) (the error matrix products commute under the trace), this gives \\(2\\sum_j B_{kj} c_j = \\lambda\\). Absorbing the factor of 2 into \\(\\lambda\\): \\(\\sum_j B_{kj} c_j = \\lambda\\) for \\(k = 1,\\ldots,m\\), plus \\(\\sum_i c_i = 1\\). In matrix form, this is the bordered system shown in Theorem 6.4.5.'
                },
                {
                    question: 'Explain why level shifting helps convergence for systems with a small HOMO-LUMO gap.',
                    hint: 'Consider what happens when virtual orbitals are close in energy to occupied orbitals during the SCF iteration.',
                    solution: 'When the HOMO-LUMO gap is small, small changes in the Fock matrix can cause occupied and virtual orbitals to swap, leading to large density changes and oscillation. Level shifting adds a positive constant \\(b\\) to all virtual orbital energies, artificially increasing the gap. This stabilizes the orbital ordering and prevents swapping. The effective mixing between occupied and virtual orbitals is proportional to \\(F_{ai}/(\\varepsilon_a - \\varepsilon_i)\\); increasing \\(\\varepsilon_a - \\varepsilon_i\\) by \\(b\\) reduces this mixing, making the iteration more contractive.'
                },
                {
                    question: 'In the DIIS procedure, what goes wrong if the error vectors \\(\\mathbf{e}^{(i)}\\) become linearly dependent? How is this handled in practice?',
                    hint: 'Consider the condition number of the \\(\\mathbf{B}\\) matrix in the DIIS system.',
                    solution: 'If the error vectors become linearly dependent, the matrix \\(\\mathbf{B}\\) becomes singular or ill-conditioned, and the DIIS linear system cannot be solved reliably. The DIIS coefficients can become very large (with opposite signs), leading to a poorly conditioned extrapolation. In practice, this is handled by: (1) limiting the DIIS subspace to 6-10 vectors and dropping the oldest; (2) checking the condition number of \\(\\mathbf{B}\\) and resetting the subspace if it exceeds a threshold; (3) using regularization or singular value truncation.'
                },
                {
                    question: 'Compare the convergence rate of damped SCF (linear convergence with rate \\(\\alpha\\)) versus DIIS (superlinear convergence). For a system requiring a density accuracy of \\(10^{-8}\\), estimate how many iterations each method needs if the initial error is \\(10^{0}\\).',
                    hint: 'For linear convergence with factor \\(\\alpha\\), the error at step \\(n\\) is \\(\\sim \\alpha^n \\epsilon_0\\). For DIIS, convergence is approximately quadratic once in the basin.',
                    solution: 'With damping factor \\(\\alpha = 0.5\\): error at step \\(n\\) is \\(\\sim 0.5^n\\). To reach \\(10^{-8}\\): \\(0.5^n = 10^{-8}\\), so \\(n = 8/\\log_{10}(2) \\approx 27\\) iterations. With DIIS showing approximately quadratic convergence (error\\(^2\\) each step): starting at 1, after 1 step: \\(10^{-1}\\), after 2: \\(10^{-2}\\), after 3: \\(10^{-4}\\), after 4: \\(10^{-8}\\). In practice DIIS is not purely quadratic, but 8-12 iterations is typical versus 25-30 for damping. The speedup is dramatic.'
                }
            ]
        },

        // ========== SECTION 5: Post-SCF Analysis ==========
        {
            id: 'sec6-5-post-scf-analysis',
            title: 'Post-SCF Analysis',
            content: `
<h2>6.5 Post-SCF Analysis</h2>

<p>Once the SCF procedure has converged, the resulting wavefunction and density matrix contain a wealth of information about the electronic structure. We extract molecular properties through various analyses.</p>

<h3>Mulliken Population Analysis</h3>

<div class="env-block definition"><div class="env-title">Definition 6.5.1 — Mulliken Population Analysis</div><div class="env-body">
The total electron population is:
\\[
N = \\operatorname{Tr}[\\mathbf{PS}] = \\sum_{\\mu\\nu} P_{\\mu\\nu} S_{\\nu\\mu}.
\\]
The <em>Mulliken gross population</em> of basis function \\(\\mu\\) is \\((\\mathbf{PS})_{\\mu\\mu}\\), and the <em>Mulliken atomic charge</em> of atom \\(A\\) is:
\\[
q_A = Z_A - \\sum_{\\mu \\in A} (\\mathbf{PS})_{\\mu\\mu},
\\]
where the sum runs over all basis functions centered on atom \\(A\\), and \\(Z_A\\) is the nuclear charge.
</div></div>

<div class="env-block warning"><div class="env-title">Warning — Mulliken Analysis Limitations</div><div class="env-body">
Mulliken charges are:
<ul>
<li>Strongly basis-set dependent (they can change sign when diffuse functions are added)</li>
<li>Not well-defined in the complete basis set limit</li>
<li>Capable of producing unphysical fractional electron counts on atoms</li>
</ul>
More robust alternatives include L&ouml;wdin population analysis (using the symmetric orthogonalization), Natural Population Analysis (NPA), and Bader's Atoms in Molecules (AIM).
</div></div>

<div class="env-block proposition"><div class="env-title">Proposition 6.5.2 — L&ouml;wdin Population</div><div class="env-body">
The L&ouml;wdin population analysis uses the symmetrically orthogonalized density:
\\[
\\tilde{\\mathbf{P}} = \\mathbf{S}^{1/2}\\mathbf{P}\\mathbf{S}^{1/2}.
\\]
The population of atom \\(A\\) is \\(\\sum_{\\mu \\in A} \\tilde{P}_{\\mu\\mu}\\). This is less basis-set dependent than Mulliken analysis because the overlap is distributed symmetrically between atoms.
</div></div>

<h3>Dipole Moment</h3>

<div class="env-block definition"><div class="env-title">Definition 6.5.3 — Dipole Moment</div><div class="env-body">
The molecular dipole moment has electronic and nuclear contributions:
\\[
\\boldsymbol{\\mu} = \\boldsymbol{\\mu}_{\\text{nuc}} + \\boldsymbol{\\mu}_{\\text{elec}} = \\sum_A Z_A \\mathbf{R}_A - \\operatorname{Tr}[\\mathbf{P}\\boldsymbol{\\mu}_{\\text{AO}}],
\\]
where \\((\\mu_{\\text{AO},\\alpha})_{\\mu\\nu} = \\langle \\chi_\\mu | \\hat{r}_\\alpha | \\chi_\\nu \\rangle\\) are the dipole integrals in the AO basis for each Cartesian component \\(\\alpha \\in \\{x, y, z\\}\\).
</div></div>

<div class="env-block example"><div class="env-title">Example 6.5.4 — Water Dipole Moment</div><div class="env-body">
For water (H\\(_2\\)O) at the HF/6-31G* level, the computed dipole moment is approximately 2.2 D (Debye), compared to the experimental value of 1.85 D. The overestimation is characteristic of HF theory, which overestimates the ionic character of bonds due to the neglect of electron correlation.
</div></div>

<h3>Orbital Energies and Koopmans' Theorem</h3>

<div class="env-block theorem"><div class="env-title">Theorem 6.5.5 — Koopmans' Theorem (1934)</div><div class="env-body">
Within the frozen-orbital approximation, the ionization potential for removing an electron from occupied orbital \\(\\phi_a\\) is:
\\[
\\text{IP}_a \\approx -\\varepsilon_a,
\\]
and the electron affinity for adding an electron to virtual orbital \\(\\phi_r\\) is:
\\[
\\text{EA}_r \\approx -\\varepsilon_r.
\\]
This assumes that the remaining orbitals do not relax upon ionization (frozen-orbital approximation).
</div></div>

<div class="env-block remark"><div class="env-title">Remark — Limitations of Koopmans' Theorem</div><div class="env-body">
<p>Koopmans' theorem involves two competing errors:</p>
<ul>
<li><strong>Orbital relaxation</strong> (neglected): The remaining electrons rearrange upon ionization, lowering the ion energy. This makes the true IP smaller than \\(-\\varepsilon_a\\).</li>
<li><strong>Correlation effects</strong> (neglected): Correlation energy is generally larger for the neutral (more electrons) than for the cation. This makes the true IP larger than the Koopmans estimate.</li>
</ul>
<p>For valence ionizations, these errors partially cancel, making Koopmans' theorem surprisingly accurate (errors of 1-2 eV). For core ionizations or electron affinities, the cancellation is poor.</p>
</div></div>

<h3>Stability Analysis</h3>

<div class="env-block definition"><div class="env-title">Definition 6.5.6 — SCF Stability</div><div class="env-body">
An SCF solution is <em>stable</em> if the energy is a local minimum with respect to all orbital rotations. The stability is determined by the eigenvalues of the orbital Hessian:
<ul>
<li><strong>Internal stability:</strong> The solution is a minimum within the same spin symmetry (e.g., RHF \\(\\to\\) RHF).</li>
<li><strong>External stability:</strong> The solution is a minimum with respect to symmetry-breaking perturbations (e.g., RHF \\(\\to\\) UHF).</li>
</ul>
If any eigenvalue of the Hessian is negative, the solution is a saddle point and a lower-energy solution exists.
</div></div>

<div class="env-block example"><div class="env-title">Example 6.5.7 — RHF Instability in H\\(_2\\) Dissociation</div><div class="env-body">
For H\\(_2\\) at large internuclear separation, the RHF solution becomes externally unstable: the UHF solution (which breaks spin symmetry) has lower energy. This is because RHF forces both electrons into the same spatial orbital, leading to unphysical ionic contributions \\(\\text{H}^+\\text{H}^-\\) at dissociation. The RHF-to-UHF instability signals the onset of strong correlation.
</div></div>

<div class="viz-placeholder" data-viz="viz-density-matrix-evolution"></div>

<h3>Total Energy Decomposition</h3>

<div class="env-block definition"><div class="env-title">Definition 6.5.8 — Energy Components</div><div class="env-body">
The total HF energy can be decomposed as:
\\[
E_{\\text{HF}} = E_{\\text{kin}} + E_{\\text{nuc-el}} + E_{\\text{Coulomb}} + E_{\\text{exchange}} + V_{\\text{nuc}},
\\]
where:
\\[
E_{\\text{kin}} = \\operatorname{Tr}[\\mathbf{P}\\mathbf{T}], \\quad
E_{\\text{nuc-el}} = \\operatorname{Tr}[\\mathbf{P}\\mathbf{V}], \\quad
E_{\\text{Coulomb}} = \\tfrac{1}{2}\\operatorname{Tr}[\\mathbf{P}\\mathbf{J}], \\quad
E_{\\text{exchange}} = -\\tfrac{1}{4}\\operatorname{Tr}[\\mathbf{P}\\mathbf{K}].
\\]
The virial ratio \\(-E_{\\text{total}}/E_{\\text{kin}}\\) should be exactly 2 at the equilibrium geometry for a converged HF calculation (by the virial theorem).
</div></div>
`,
            visualizations: [
                {
                    id: 'viz-density-matrix-evolution',
                    title: 'Density Matrix Evolution Through SCF Iterations',
                    description: 'Visualize how the density matrix elements change through the SCF iterations for a minimal basis H\\(_2\\) model. The matrix converges from the initial guess to the self-consistent solution.',
                    setup(body, controls) {
                        const viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0, width: 560, height: 380 });
                        const ctx = viz.ctx;

                        // Simulated 2x2 density matrices for H2 SCF iterations
                        const densities = [
                            [[0.50, 0.50], [0.50, 0.50]],  // initial guess
                            [[0.58, 0.52], [0.52, 0.58]],  // iter 1
                            [[0.61, 0.55], [0.55, 0.61]],  // iter 2
                            [[0.60, 0.58], [0.58, 0.60]],  // iter 3
                            [[0.59, 0.59], [0.59, 0.59]],  // iter 4
                            [[0.595, 0.592], [0.592, 0.595]],  // iter 5
                            [[0.593, 0.593], [0.593, 0.593]],  // converged
                        ];
                        const energies = [-1.500, -1.785, -1.820, -1.828, -1.830, -1.8305, -1.8307];

                        let iter = 0;
                        const iterSlider = VizEngine.createSlider(controls, 'Iteration', 0, densities.length - 1, 0, 1, v => {
                            iter = Math.round(v);
                            draw();
                        });

                        function drawHeatmap(mat, x0, y0, cellSize, label) {
                            const n = mat.length;
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText(label, x0 + n * cellSize / 2, y0 - 10);

                            for (let i = 0; i < n; i++) {
                                for (let j = 0; j < n; j++) {
                                    const val = mat[i][j];
                                    const intensity = Math.min(1, Math.abs(val));
                                    const r = Math.round(88 + 167 * intensity);
                                    const g = Math.round(166 - 30 * intensity);
                                    const b = Math.round(255 - 95 * intensity);
                                    ctx.fillStyle = `rgb(${r},${g},${b})`;
                                    ctx.fillRect(x0 + j * cellSize, y0 + i * cellSize, cellSize - 2, cellSize - 2);

                                    ctx.fillStyle = viz.colors.white;
                                    ctx.font = '13px -apple-system,sans-serif';
                                    ctx.textAlign = 'center';
                                    ctx.textBaseline = 'middle';
                                    ctx.fillText(val.toFixed(3), x0 + j * cellSize + cellSize / 2 - 1, y0 + i * cellSize + cellSize / 2);
                                }
                            }

                            // Labels
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            for (let i = 0; i < n; i++) {
                                ctx.fillText('χ' + (i + 1), x0 + i * cellSize + cellSize / 2, y0 + n * cellSize + 14);
                                ctx.textAlign = 'right';
                                ctx.fillText('χ' + (i + 1), x0 - 5, y0 + i * cellSize + cellSize / 2);
                                ctx.textAlign = 'center';
                            }
                        }

                        function draw() {
                            viz.clear();
                            const P = densities[iter];

                            // Title
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Density Matrix P at SCF Iteration ' + iter, 280, 25);

                            // Draw density matrix
                            drawHeatmap(P, 160, 55, 80, 'Density Matrix P');

                            // Energy
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('E = ' + energies[iter].toFixed(4) + ' hartree', 280, 260);

                            // Convergence info
                            if (iter > 0) {
                                const dE = Math.abs(energies[iter] - energies[iter - 1]);
                                let dP = 0;
                                for (let i = 0; i < 2; i++)
                                    for (let j = 0; j < 2; j++)
                                        dP += Math.pow(densities[iter][i][j] - densities[iter - 1][i][j], 2);
                                dP = Math.sqrt(dP / 4);

                                ctx.fillStyle = viz.colors.teal;
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.fillText('ΔE = ' + dE.toExponential(2), 200, 285);
                                ctx.fillText('ΔP_rms = ' + dP.toExponential(2), 360, 285);
                            }

                            // Bar chart of matrix elements
                            const barX = 60, barY = 310, barW = 440, barH = 50;
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Matrix element values', barX + barW / 2, barY);

                            const elements = [
                                { label: 'P₁₁', val: P[0][0] },
                                { label: 'P₁₂', val: P[0][1] },
                                { label: 'P₂₁', val: P[1][0] },
                                { label: 'P₂₂', val: P[1][1] }
                            ];
                            const bw = 60, gap = 30;
                            const startX = barX + (barW - elements.length * (bw + gap) + gap) / 2;
                            elements.forEach((el, i) => {
                                const x = startX + i * (bw + gap);
                                const h = el.val / 0.7 * barH;
                                ctx.fillStyle = viz.colors.blue + '88';
                                ctx.fillRect(x, barY + 15 + barH - h, bw, h);
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '10px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText(el.label, x + bw / 2, barY + 15 + barH + 12);
                                ctx.fillStyle = viz.colors.white;
                                ctx.fillText(el.val.toFixed(3), x + bw / 2, barY + 15 + barH - h - 6);
                            });

                            if (iter === densities.length - 1) {
                                ctx.fillStyle = viz.colors.green;
                                ctx.font = 'bold 12px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('CONVERGED', 280, 245);
                            }
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'For a minimal basis H\\(_2\\) calculation with density matrix \\(P = \\begin{pmatrix} 0.593 & 0.593 \\\\ 0.593 & 0.593 \\end{pmatrix}\\) and overlap matrix \\(S = \\begin{pmatrix} 1.0 & 0.66 \\\\ 0.66 & 1.0 \\end{pmatrix}\\), compute the Mulliken populations on each atom.',
                    hint: 'Compute \\(\\mathbf{PS}\\) and take the diagonal elements.',
                    solution: '\\(\\mathbf{PS} = \\begin{pmatrix} 0.593 + 0.391 & 0.391 + 0.593 \\\\ 0.593 + 0.391 & 0.391 + 0.593 \\end{pmatrix} = \\begin{pmatrix} 0.984 & 0.984 \\\\ 0.984 & 0.984 \\end{pmatrix}\\). Wait, let me recompute: \\((\\mathbf{PS})_{11} = 0.593(1.0) + 0.593(0.66) = 0.593 + 0.391 = 0.984\\), \\((\\mathbf{PS})_{22} = 0.593(0.66) + 0.593(1.0) = 0.984\\). Total: \\(0.984 + 0.984 = 1.968 \\approx 2\\). Each H atom has Mulliken population 0.984, giving charges \\(q = 1 - 0.984 = +0.016\\), essentially neutral as expected for homonuclear H\\(_2\\).'
                },
                {
                    question: 'Prove Koopmans\' theorem: show that within the frozen-orbital approximation, the ionization potential for removing an electron from orbital \\(\\phi_a\\) is \\(-\\varepsilon_a\\).',
                    hint: 'Compare the HF energy of the \\(N\\)-electron system with the energy of the \\((N-1)\\)-electron cation, assuming the orbitals do not change.',
                    solution: 'The \\(N\\)-electron HF energy is \\(E_N = \\sum_i h_{ii} + \\frac{1}{2}\\sum_{ij}(2J_{ij} - K_{ij})\\) summed over all occupied pairs. Removing electron from orbital \\(a\\) (frozen orbitals): \\(E_{N-1} = \\sum_{i \\neq a} h_{ii} + \\frac{1}{2}\\sum_{i,j \\neq a}(2J_{ij} - K_{ij})\\). The IP is \\(E_{N-1} - E_N = -h_{aa} - \\sum_{j}(2J_{aj} - K_{aj}) + \\frac{1}{2}\\sum_j(2J_{aj} - K_{aj}) + \\frac{1}{2}\\sum_i(2J_{ia} - K_{ia})\\). Using symmetry of J and K: \\(\\text{IP} = -h_{aa} - \\sum_j(2J_{aj} - K_{aj}) = -\\varepsilon_a\\), since \\(\\varepsilon_a = h_{aa} + \\sum_j(2J_{aj} - K_{aj})\\).'
                },
                {
                    question: 'The converged RHF/STO-3G calculation of water gives orbital energies: \\(\\varepsilon_1 = -20.56\\), \\(\\varepsilon_2 = -1.34\\), \\(\\varepsilon_3 = -0.71\\), \\(\\varepsilon_4 = -0.57\\), \\(\\varepsilon_5 = -0.50\\) hartree. Predict the first ionization potential in eV.',
                    hint: 'Apply Koopmans\' theorem to the HOMO. 1 hartree = 27.21 eV.',
                    solution: 'The HOMO is \\(\\varepsilon_5 = -0.50\\) hartree (the lone pair orbital of oxygen). By Koopmans\' theorem, IP \\(\\approx -\\varepsilon_5 = 0.50\\) hartree \\(= 0.50 \\times 27.21 = 13.6\\) eV. The experimental first IP of water is 12.6 eV, so the Koopmans estimate overestimates by about 1 eV (typical for HF, due to neglect of orbital relaxation and correlation).'
                },
                {
                    question: 'Explain why Mulliken populations are basis-set dependent while physical observables (like the dipole moment) are not.',
                    hint: 'Consider how Mulliken analysis partitions overlap populations. Is this partitioning unique?',
                    solution: 'Mulliken analysis equally splits the overlap population \\(P_{\\mu\\nu}S_{\\mu\\nu}\\) between the two atoms hosting \\(\\chi_\\mu\\) and \\(\\chi_\\nu\\). This partition is arbitrary; as the basis set grows, functions on one atom can describe density near another atom, and the Mulliken charge assignment becomes meaningless. In the CBS limit, a complete set on any single atom can describe the entire density, making atom-based partitioning ill-defined. The dipole moment, by contrast, is computed from \\(\\operatorname{Tr}[\\mathbf{P}\\boldsymbol{\\mu}]\\) without any partitioning; it depends only on the total density, which converges to the exact result in the CBS limit.'
                },
                {
                    question: 'What does it mean for an RHF solution to be "externally unstable"? Give a physical example.',
                    hint: 'External instability means a lower-energy UHF solution exists. When does restricting both electrons to the same spatial orbital become problematic?',
                    solution: 'External (RHF \\(\\to\\) UHF) instability means the RHF energy can be lowered by allowing \\(\\alpha\\) and \\(\\beta\\) electrons to occupy different spatial orbitals. This breaks spin symmetry but gives a lower variational energy. The classic example is H\\(_2\\) dissociation: at large \\(R\\), RHF gives \\(\\psi = |\\sigma_g \\bar{\\sigma}_g|\\) which contains 50% ionic character (H\\(^+\\)H\\(^-\\)). UHF localizes \\(\\alpha\\) on one H and \\(\\beta\\) on the other, correctly giving two neutral atoms. The RHF instability typically appears when bonds are stretched beyond about 1.5 times the equilibrium distance.'
                },
                {
                    question: 'Verify that \\(\\operatorname{Tr}[\\mathbf{PS}] = N\\) (the total number of electrons) for a density matrix built from orthonormal MOs satisfying \\(\\mathbf{C}^\\dagger \\mathbf{S} \\mathbf{C} = \\mathbf{I}\\).',
                    hint: 'Substitute the definition \\(P_{\\mu\\nu} = 2\\sum_a C_{\\mu a} C_{\\nu a}\\) and use the orthonormality condition.',
                    solution: '\\(\\operatorname{Tr}[\\mathbf{PS}] = \\sum_{\\mu\\nu} P_{\\mu\\nu} S_{\\nu\\mu} = \\sum_{\\mu\\nu} 2\\sum_a C_{\\mu a} C_{\\nu a} S_{\\nu\\mu} = 2\\sum_a \\sum_{\\mu\\nu} C_{\\nu a} S_{\\nu\\mu} C_{\\mu a} = 2\\sum_a (\\mathbf{C}^\\dagger \\mathbf{S} \\mathbf{C})_{aa} = 2\\sum_a \\delta_{aa} = 2 \\cdot N/2 = N\\).'
                }
            ]
        }
    ]
});
