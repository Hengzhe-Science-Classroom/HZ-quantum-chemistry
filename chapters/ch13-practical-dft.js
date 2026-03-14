window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch13',
    number: 13,
    title: 'Practical DFT',
    subtitle: 'Running real calculations: input, output, and interpretation',
    sections: [
        // ============================================================
        // SECTION 1: Setting Up a DFT Calculation
        // ============================================================
        {
            id: 'ch13-sec01',
            title: 'Setting Up a DFT Calculation',
            content: `
                <h2>Setting Up a DFT Calculation</h2>

                <p class="section-roadmap"><strong>Section roadmap.</strong> We walk through the essential decisions for setting up a DFT calculation: specifying the molecular geometry, choosing a basis set, selecting an exchange-correlation functional, and setting convergence criteria. Each choice affects accuracy, cost, and reliability.</p>

                <p>A practical DFT calculation requires four fundamental inputs: (1) the molecular geometry, (2) a basis set, (3) an exchange-correlation functional, and (4) convergence parameters. Getting these right is the difference between a meaningful result and a waste of CPU time.</p>

                <div class="viz-placeholder" data-viz="dft-workflow"></div>

                <h3>Molecular Geometry</h3>

                <div class="env-block definition">
                    <div class="env-title">Definition 13.1 (Geometry Specification)</div>
                    <div class="env-body">
                        <p>The nuclear coordinates \\(\\{\\mathbf{R}_A\\}\\) can be specified as:</p>
                        <ul>
                            <li><strong>Cartesian coordinates:</strong> \\((x_A, y_A, z_A)\\) for each atom \\(A\\). Unambiguous, but redundant (3N coordinates for N atoms, minus 5 or 6 for translation/rotation).</li>
                            <li><strong>Z-matrix (internal coordinates):</strong> Bond lengths, bond angles, and dihedral angles. Natural for chemistry but can have singularities (linear molecules).</li>
                        </ul>
                        <p>The input geometry serves as the starting point for geometry optimization or as the fixed geometry for a single-point energy calculation.</p>
                    </div>
                </div>

                <div class="env-block warning">
                    <div class="env-title">Symmetry Considerations</div>
                    <div class="env-body">
                        <p>Most codes detect and exploit molecular symmetry to reduce computational cost. However:</p>
                        <ul>
                            <li>Symmetry-constrained optimization can miss lower-symmetry minima. Consider breaking symmetry for transition state searches.</li>
                            <li>Numerical noise can break exact symmetry. Use symmetry-adapted basis sets when available.</li>
                            <li>For Jahn-Teller systems, forcing high symmetry gives the wrong electronic state.</li>
                        </ul>
                    </div>
                </div>

                <h3>Basis Set Selection</h3>

                <p>The basis set determines the quality of the Kohn-Sham orbital expansion. Chapter 5 covers basis sets in detail; here we give practical guidance for DFT calculations.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 13.2 (Basis Set Families for DFT)</div>
                    <div class="env-body">
                        <p>The most common basis set families for molecular DFT calculations:</p>
                        <ul>
                            <li><strong>Pople:</strong> 6-31G(d), 6-311+G(2d,p). Widely used with B3LYP. Adequate for quick calculations but not systematic.</li>
                            <li><strong>Dunning:</strong> cc-pVDZ, cc-pVTZ, aug-cc-pVTZ. Correlation-consistent, systematic extrapolation to CBS. Best for benchmarking.</li>
                            <li><strong>Karlsruhe (def2):</strong> def2-SVP, def2-TZVPP, def2-QZVPP. Efficient, well-balanced for DFT. Recommended default family.</li>
                        </ul>
                        <p>For DFT, basis set convergence is faster than for correlated wavefunction methods. A triple-zeta basis (def2-TZVPP or cc-pVTZ) is usually sufficient.</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 13.3 (Basis Set Convergence in DFT)</div>
                    <div class="env-body">
                        <p>For semilocal DFT functionals, the basis set incompleteness error (BSIE) converges as</p>
                        \\[\\Delta E \\sim A \\cdot X^{-3}\\]
                        <p>where \\(X\\) is the cardinal number (2 for DZ, 3 for TZ, etc.), compared to \\(X^{-3}\\) for HF and \\(X^{-3}\\) to \\(X^{-7}\\) for MP2/CCSD(T). In practice, DFT/def2-TZVPP energies are typically within 0.5 kcal/mol of the CBS limit for main-group thermochemistry.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 13.4 (Practical Basis Set Recommendations)</div>
                    <div class="env-body">
                        <p><strong>Quick screening:</strong> def2-SVP (fast, qualitative). About 2-5 kcal/mol BSIE.</p>
                        <p><strong>Production:</strong> def2-TZVPP (balanced cost/accuracy). About 0.2-0.5 kcal/mol BSIE.</p>
                        <p><strong>High accuracy:</strong> def2-QZVPP or CBS extrapolation. BSIE < 0.1 kcal/mol.</p>
                        <p><strong>Anions/weak interactions:</strong> Add diffuse functions: ma-def2-TZVPP or aug-cc-pVTZ.</p>
                        <p><strong>Heavy elements (Z > 36):</strong> Use effective core potentials (ECPs): def2-TZVPP automatically includes Stuttgart ECPs for heavy elements.</p>
                    </div>
                </div>

                <h3>Functional Selection</h3>

                <p>Chapter 12 provides detailed guidance. For quick reference:</p>

                <div class="env-block remark">
                    <div class="env-title">Quick Functional Selection Guide</div>
                    <div class="env-body">
                        <p>If you must choose one functional for general organic chemistry: <strong>\\(\\omega\\)B97X-D/def2-TZVPP</strong>. It handles geometries, thermochemistry, barriers, and non-covalent interactions with consistent accuracy.</p>
                        <p>If computational cost is a concern (large systems): <strong>r\\(^2\\)SCAN-D4/def2-TZVPP</strong>. Meta-GGA cost with near-hybrid accuracy for many properties.</p>
                        <p>If you need the absolute best DFT accuracy: <strong>revDSD-PBEP86-D4/def2-QZVPP</strong> (double hybrid).</p>
                    </div>
                </div>

                <h3>Convergence Criteria</h3>

                <div class="env-block definition">
                    <div class="env-title">Definition 13.5 (Key Convergence Parameters)</div>
                    <div class="env-body">
                        <p>Three convergence thresholds govern a DFT calculation:</p>
                        <ul>
                            <li><strong>SCF convergence:</strong> Change in total energy between iterations. Typical: \\(10^{-6}{-}10^{-8}\\) hartree. Tighter for frequency calculations (\\(10^{-8}\\) or better).</li>
                            <li><strong>Geometry optimization:</strong> Maximum gradient (force) and displacement. Typical: gradient < \\(3 \\times 10^{-4}\\) hartree/bohr, displacement < \\(1.2 \\times 10^{-3}\\) bohr.</li>
                            <li><strong>Integration grid:</strong> Quality of numerical quadrature for the xc functional (discussed in Section 2).</li>
                        </ul>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">The Consistency Principle</div>
                    <div class="env-body">
                        <p>All thresholds should be mutually consistent. There is no point converging SCF to \\(10^{-10}\\) hartree if your integration grid only supports \\(10^{-6}\\) accuracy. Conversely, tight geometry convergence requires tight SCF convergence. For energy differences (reaction energies), the errors partially cancel, but only if the <em>same</em> settings are used for all species.</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'dft-workflow',
                    title: 'DFT Calculation Workflow',
                    description: 'Click each step to see its details, common settings, and pitfalls.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 400 });
                        var ctx = viz.ctx;
                        var selectedStep = -1;

                        var steps = [
                            {
                                name: 'Geometry',
                                x: 80, y: 50, w: 120, h: 45,
                                color: '#58a6ff',
                                details: [
                                    'Cartesian or Z-matrix input',
                                    'Check symmetry, multiplicity',
                                    'Starting geometry matters for',
                                    'optimization convergence'
                                ]
                            },
                            {
                                name: 'Basis Set',
                                x: 80, y: 120, w: 120, h: 45,
                                color: '#3fb9a0',
                                details: [
                                    'def2-SVP: fast screening',
                                    'def2-TZVPP: production',
                                    'Add diffuse for anions',
                                    'ECPs for heavy elements'
                                ]
                            },
                            {
                                name: 'Functional',
                                x: 80, y: 190, w: 120, h: 45,
                                color: '#f0883e',
                                details: [
                                    '\u03C9B97X-D: general purpose',
                                    'PBE: solids, large systems',
                                    'B2PLYP-D3: highest accuracy',
                                    'Always add dispersion (D3/D4)'
                                ]
                            },
                            {
                                name: 'Grid & SCF',
                                x: 80, y: 260, w: 120, h: 45,
                                color: '#bc8cff',
                                details: [
                                    'Grid: (99,590) for production',
                                    'SCF convergence: 1e-7 E_h',
                                    'DIIS for acceleration',
                                    'Level shifting if problematic'
                                ]
                            },
                            {
                                name: 'Run & Check',
                                x: 80, y: 330, w: 120, h: 45,
                                color: '#3fb950',
                                details: [
                                    'Check SCF convergence',
                                    'Verify geometry (no imaginary',
                                    'freqs except at TS)',
                                    'Compare with experiment/ref'
                                ]
                            }
                        ];

                        viz.canvas.addEventListener('click', function(e) {
                            var rect = viz.canvas.getBoundingClientRect();
                            var mx = e.clientX - rect.left;
                            var my = e.clientY - rect.top;
                            selectedStep = -1;
                            for (var i = 0; i < steps.length; i++) {
                                var s = steps[i];
                                if (mx >= s.x && mx <= s.x + s.w && my >= s.y && my <= s.y + s.h) {
                                    selectedStep = i;
                                    break;
                                }
                            }
                        });

                        function draw() {
                            viz.clear();

                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('DFT Calculation Workflow', 280, 25);

                            // Draw arrows between steps
                            ctx.strokeStyle = viz.colors.muted;
                            ctx.lineWidth = 2;
                            for (var i = 0; i < steps.length - 1; i++) {
                                var s1 = steps[i], s2 = steps[i + 1];
                                var ax = s1.x + s1.w / 2;
                                var ay1 = s1.y + s1.h;
                                var ay2 = s2.y;
                                ctx.beginPath(); ctx.moveTo(ax, ay1 + 2); ctx.lineTo(ax, ay2 - 2); ctx.stroke();
                                // Arrow head
                                ctx.fillStyle = viz.colors.muted;
                                ctx.beginPath();
                                ctx.moveTo(ax, ay2 - 2);
                                ctx.lineTo(ax - 5, ay2 - 10);
                                ctx.lineTo(ax + 5, ay2 - 10);
                                ctx.closePath(); ctx.fill();
                            }

                            // Draw step boxes
                            for (var i = 0; i < steps.length; i++) {
                                var s = steps[i];
                                var isSelected = (i === selectedStep);

                                // Box
                                ctx.fillStyle = isSelected ? s.color + '44' : '#14142e';
                                ctx.strokeStyle = isSelected ? s.color : s.color + '88';
                                ctx.lineWidth = isSelected ? 2.5 : 1.5;
                                ctx.beginPath();
                                ctx.roundRect(s.x, s.y, s.w, s.h, 8);
                                ctx.fill(); ctx.stroke();

                                // Step number
                                ctx.fillStyle = s.color;
                                ctx.font = '10px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.fillText('Step ' + (i + 1), s.x + 8, s.y + 16);

                                // Name
                                ctx.fillStyle = isSelected ? viz.colors.white : viz.colors.text;
                                ctx.font = (isSelected ? 'bold ' : '') + '13px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText(s.name, s.x + s.w / 2, s.y + 34);
                            }

                            // Detail panel
                            if (selectedStep >= 0) {
                                var ss = steps[selectedStep];
                                var px = 240, py = ss.y;

                                ctx.fillStyle = '#14142e';
                                ctx.strokeStyle = ss.color;
                                ctx.lineWidth = 1.5;
                                ctx.beginPath();
                                ctx.roundRect(px, py, 290, 80, 8);
                                ctx.fill(); ctx.stroke();

                                // Connector line
                                ctx.strokeStyle = ss.color + '66';
                                ctx.lineWidth = 1;
                                ctx.setLineDash([4, 3]);
                                ctx.beginPath();
                                ctx.moveTo(ss.x + ss.w, ss.y + ss.h / 2);
                                ctx.lineTo(px, py + 40);
                                ctx.stroke();
                                ctx.setLineDash([]);

                                ctx.fillStyle = ss.color;
                                ctx.font = 'bold 12px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.fillText(ss.name + ' Details', px + 12, py + 18);

                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '11px -apple-system,sans-serif';
                                for (var d = 0; d < ss.details.length; d++) {
                                    ctx.fillText('\u2022 ' + ss.details[d], px + 12, py + 35 + d * 14);
                                }
                            } else {
                                ctx.fillStyle = viz.colors.muted;
                                ctx.font = '12px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('Click a step for details', 390, 200);
                            }
                        }

                        viz.animate(draw);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'A geometry optimization of a 50-atom organic molecule with B3LYP/6-31G(d) converges to a structure with one imaginary frequency of \\(-15\\) cm\\(^{-1}\\). What does this indicate, and what should you do?',
                    hint: 'An imaginary frequency means the structure is not a true minimum. Consider the magnitude of the imaginary frequency.',
                    solution: 'One imaginary frequency indicates a first-order saddle point (transition state), not a minimum. However, the very small magnitude (\\(-15\\) cm\\(^{-1}\\)) suggests this is likely a numerical artifact from: (1) insufficient integration grid (use a finer grid, e.g., ultrafine/Grid6), (2) loose SCF convergence (tighten to \\(10^{-8}\\)), or (3) insufficient geometry convergence (tighten gradient threshold). Re-optimize with tighter settings. If the imaginary mode corresponds to a physically meaningful motion (e.g., methyl rotation), it may indicate a nearly flat potential energy surface where a slightly different conformer is the true minimum. Displace along the imaginary mode and re-optimize.'
                },
                {
                    question: 'You need to compute the proton affinity of ammonia: \\(\\mathrm{NH}_3 + \\mathrm{H}^+ \\to \\mathrm{NH}_4^+\\). Which basis set effects are important, and how would you handle them?',
                    hint: 'Consider that this reaction involves a cation and a neutral. The proton has no basis functions. Think about basis set superposition error.',
                    solution: 'Key basis set issues: (1) The proton has no electrons and thus no basis functions, so there is no BSSE in the usual sense. However, the basis set must describe the change from a lone pair on nitrogen to an N-H bond. (2) Use a basis with adequate polarization on both N and H: at least def2-TZVPP. (3) Diffuse functions are less important here (no anions), but help describe the nitrogen lone pair. (4) For the reference proton, the electronic energy is zero, so the proton affinity is PA = \\(E(\\mathrm{NH}_3) - E(\\mathrm{NH}_4^+)\\) plus thermal corrections. (5) Include zero-point energy (ZPE) and thermal enthalpy corrections from frequency calculations. Protocol: optimize both species at the same level, compute frequencies, compute \\(\\Delta H_{298}\\).'
                },
                {
                    question: 'Compare the computational cost (in terms of basis function count) of a single-point B3LYP calculation on benzene using 6-31G(d), def2-SVP, cc-pVDZ, and def2-TZVPP.',
                    hint: 'Count the number of basis functions per atom for each basis set. Benzene has 6 C and 6 H atoms.',
                    solution: 'For benzene (C\\(_6\\)H\\(_6\\)): 6-31G(d): C has 15 functions (3s3sp1d), H has 2 (1s1sp) = \\(6 \\times 15 + 6 \\times 2 = 102\\). def2-SVP: C has 14, H has 5 = \\(6 \\times 14 + 6 \\times 5 = 114\\). cc-pVDZ: C has 14, H has 5 = 114. def2-TZVPP: C has 31, H has 14 = \\(6 \\times 31 + 6 \\times 14 = 270\\). Since HF exchange in B3LYP scales as \\(\\sim N_{\\mathrm{bf}}^{2.5{-}4}\\), def2-TZVPP is roughly \\((270/102)^3 \\approx 18\\) times more expensive than 6-31G(d) for the exchange integrals. In practice, screening and RI reduce this significantly.'
                },
                {
                    question: 'You are studying a reaction that involves both a neutral organic molecule and a transition metal complex. Can you use the same functional and basis set for both? What adjustments are needed?',
                    hint: 'Consider that transition metals have near-degenerate d orbitals and may require different amounts of exact exchange than organic molecules.',
                    solution: 'Challenges: (1) Functionals: B3LYP (20% HF) is good for organics but can give wrong spin states for transition metals (biased toward low-spin). PBE0 (25% HF) or TPSSh (10% HF) are better for 3d metals. Compromise: use PBE0-D3(BJ), which is reasonable for both. (2) Basis set: use def2-TZVPP for all atoms; it automatically includes ECPs for heavy metals. (3) Spin state: check multiple spin states for the metal complex. (4) DFT-D3(BJ) is important if the metal-ligand interaction has dispersion contributions. (5) For more rigorous work, use a composite protocol: optimize everything with one functional, then compute single-point energies with DLPNO-CCSD(T) for the organic part and a multireference method (CASPT2 or NEVPT2) for the metal center.'
                },
                {
                    question: 'Why is it important to use the same computational protocol (functional, basis set, grid, convergence criteria) for all species in a reaction energy calculation?',
                    hint: 'Consider systematic error cancellation and what happens when different approximations introduce different biases.',
                    solution: 'Systematic error cancellation is the key reason DFT reaction energies are more accurate than absolute energies. If the same functional overestimates exchange by a fixed amount per electron pair, the error cancels in a balanced reaction. This cancellation fails if different settings are used: (1) Different basis sets have different BSSE, introducing artificial energy differences. (2) Different grids give different numerical integration errors that do not cancel. (3) Different SCF convergence thresholds mean the energies have different residual errors. (4) Mixing functionals is especially dangerous because each has different systematic biases. Even changing the version of a code can introduce inconsistencies. Best practice: run all species in a single batch with identical keywords, same code version, same hardware if possible (floating-point results can vary across architectures).'
                }
            ]
        },

        // ============================================================
        // SECTION 2: Integration Grids and Numerical Issues
        // ============================================================
        {
            id: 'ch13-sec02',
            title: 'Integration Grids & Numerical Issues',
            content: `
                <h2>Integration Grids and Numerical Issues</h2>

                <p class="section-roadmap"><strong>Section roadmap.</strong> Unlike Hartree-Fock, DFT requires numerical integration of the exchange-correlation functional. We discuss Becke partitioning, Lebedev-Laikov angular grids, radial quadratures, grid pruning, and how grid quality affects accuracy and computational cost.</p>

                <h3>The Numerical Integration Problem</h3>

                <p>The exchange-correlation energy and potential involve integrals of the form</p>
                \\[E_{xc} = \\int f(\\rho(\\mathbf{r}), \\nabla\\rho(\\mathbf{r}), \\tau(\\mathbf{r}))\\, d\\mathbf{r}\\]
                <p>which cannot be evaluated analytically (unlike the Coulomb and overlap integrals in Hartree-Fock). Instead, we approximate by numerical quadrature:</p>
                \\[E_{xc} \\approx \\sum_{g=1}^{N_g} w_g\\, f(\\rho(\\mathbf{r}_g), \\nabla\\rho(\\mathbf{r}_g), \\tau(\\mathbf{r}_g))\\]
                <p>where \\(\\{\\mathbf{r}_g, w_g\\}\\) are quadrature points and weights.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 13.6 (Becke Partitioning)</div>
                    <div class="env-body">
                        <p>Becke (1988) proposed partitioning the molecular integral into atom-centered contributions:</p>
                        \\[\\int f(\\mathbf{r})\\, d\\mathbf{r} = \\sum_A \\int P_A(\\mathbf{r})\\, f(\\mathbf{r})\\, d\\mathbf{r}\\]
                        <p>where \\(P_A(\\mathbf{r})\\) is a smooth partition function satisfying \\(\\sum_A P_A(\\mathbf{r}) = 1\\) everywhere. Becke's partition uses the confocal elliptic coordinate \\(\\mu_{AB} = (r_A - r_B)/R_{AB}\\) with a step function \\(s(\\mu)\\) iterated \\(k\\) times for smoothness:</p>
                        \\[s(\\mu) = \\frac{1}{2}\\left(1 - p(p(p(\\mu)))\\right), \\qquad p(\\mu) = \\frac{3\\mu - \\mu^3}{2}\\]
                        <p>Each atom-centered integral is then evaluated using a product of radial and angular quadratures.</p>
                    </div>
                </div>

                <h3>Radial and Angular Quadrature</h3>

                <div class="env-block definition">
                    <div class="env-title">Definition 13.7 (Atom-Centered Grids)</div>
                    <div class="env-body">
                        <p>Each atom-centered integral uses a product grid:</p>
                        <ul>
                            <li><strong>Radial:</strong> Gauss-Chebyshev or Euler-Maclaurin quadrature with a coordinate transformation \\(r(x)\\) that maps \\([0, \\infty)\\) to a finite interval. Typical: 75-99 radial points per atom. The Mura-Knowles or Treutler-Ahlrichs transformations are common.</li>
                            <li><strong>Angular:</strong> Lebedev-Laikov grids on the unit sphere, which integrate spherical harmonics exactly up to order \\(l\\). Common sizes: 302 points (\\(l \\leq 29\\)), 590 points (\\(l \\leq 41\\)), 770 points (\\(l \\leq 47\\)).</li>
                        </ul>
                        <p>A "(99,590)" grid means 99 radial points and 590 angular points per shell, giving \\(99 \\times 590 \\approx 58{,}000\\) grid points per atom. For a 50-atom molecule, this is roughly 3 million grid points total.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="grid-accuracy"></div>

                <h3>Grid Pruning</h3>

                <div class="env-block definition">
                    <div class="env-title">Definition 13.8 (Grid Pruning)</div>
                    <div class="env-body">
                        <p><strong>Pruning</strong> reduces the number of angular points near the nucleus (where the density is nearly spherical) and far from the nucleus (where the density is small). The SG-1 (Standard Grid 1) of Gill, Johnson, and Pople uses:</p>
                        <ul>
                            <li>6 angular points for the innermost radial shells</li>
                            <li>38 angular points for the next shells</li>
                            <li>86 points for middle shells</li>
                            <li>194 or 302 points for the outermost shells</li>
                        </ul>
                        <p>This reduces the total grid by a factor of 3-5 with negligible loss of accuracy for most applications.</p>
                    </div>
                </div>

                <div class="env-block warning">
                    <div class="env-title">When Grid Quality Matters</div>
                    <div class="env-body">
                        <p>Insufficiently fine grids cause problems for:</p>
                        <ul>
                            <li><strong>Vibrational frequencies:</strong> Grid noise creates artifacts in the Hessian. Use at least (99,590) or "ultrafine" grids.</li>
                            <li><strong>Weak interactions:</strong> Dispersion-bound complexes have small energy differences that require smooth potential surfaces.</li>
                            <li><strong>Meta-GGA functionals:</strong> The kinetic energy density \\(\\tau\\) requires denser grids than GGA functionals. SCAN is particularly sensitive.</li>
                            <li><strong>Geometry optimization:</strong> Grid noise can prevent convergence to tight thresholds.</li>
                        </ul>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 13.9 (Grid Sensitivity)</div>
                    <div class="env-body">
                        <p>The benzene dimer (parallel-displaced) interaction energy at PBE-D3(BJ)/def2-TZVPP with different grids:</p>
                        <ul>
                            <li>SG-1 (\\(\\sim\\)25 pts/atom): \\(-2.31\\) kcal/mol (noisy, 0.2 kcal/mol error)</li>
                            <li>(75,302): \\(-2.48\\) kcal/mol (adequate)</li>
                            <li>(99,590): \\(-2.51\\) kcal/mol (converged)</li>
                            <li>(150,770): \\(-2.51\\) kcal/mol (same as above, overkill)</li>
                        </ul>
                        <p>For this system, (99,590) is sufficient. The SG-1 grid introduces a noticeable error of 0.2 kcal/mol, which is significant for weak interactions.</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Proposition 13.10 (Grid Convergence Test)</div>
                    <div class="env-body">
                        <p>To verify that your results are grid-converged, repeat the calculation with a larger grid. If the energy changes by less than 0.1 kcal/mol (for energy differences) or 0.001 &Aring; (for bond lengths), the original grid is adequate. For publication-quality results, always report the grid used.</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Computational Cost of Grids</div>
                    <div class="env-body">
                        <p>The numerical integration step scales as \\(\\mathcal{O}(N_g \\cdot N_{\\mathrm{bf}}^2)\\) where \\(N_g\\) is the number of grid points and \\(N_{\\mathrm{bf}}\\) is the number of basis functions. For large molecules, the grid evaluation can dominate the total cost of a GGA calculation. However, grid points far from any atom contribute negligibly; screening based on basis function extent reduces the effective grid dramatically.</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'grid-accuracy',
                    title: 'Grid Quality vs. Accuracy Tradeoff',
                    description: 'Shows how integration error decreases as the number of grid points increases for different functional types. The diminishing returns of larger grids are evident.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 380 });
                        var ctx = viz.ctx;

                        function draw() {
                            viz.clear();

                            var margin = { top: 45, right: 40, bottom: 55, left: 75 };
                            var w = viz.width - margin.left - margin.right;
                            var h = viz.height - margin.top - margin.bottom;

                            // Title
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Integration Error vs Grid Size (log-log)', viz.width / 2, 20);

                            // Axes
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1.5;
                            ctx.beginPath(); ctx.moveTo(margin.left, margin.top); ctx.lineTo(margin.left, margin.top + h); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(margin.left, margin.top + h); ctx.lineTo(margin.left + w, margin.top + h); ctx.stroke();

                            // Data: grid points (per atom) vs error (kcal/mol)
                            var gridPts = [50, 100, 300, 1000, 5000, 20000, 60000];
                            var lgaErr = [5.0, 2.0, 0.5, 0.08, 0.005, 0.001, 0.0003]; // LDA
                            var ggaErr = [8.0, 3.5, 0.8, 0.12, 0.01, 0.002, 0.0005]; // GGA
                            var mgErr  = [12, 5.0, 1.5, 0.25, 0.03, 0.005, 0.001]; // meta-GGA

                            var logXmin = Math.log10(30), logXmax = Math.log10(100000);
                            var logYmin = Math.log10(0.0001), logYmax = Math.log10(20);

                            function toPlotX(gp) { return margin.left + (Math.log10(gp) - logXmin) / (logXmax - logXmin) * w; }
                            function toPlotY(err) { return margin.top + h - (Math.log10(err) - logYmin) / (logYmax - logYmin) * h; }

                            // Grid lines
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 0.5;
                            var xTicks = [100, 1000, 10000, 100000];
                            for (var xi = 0; xi < xTicks.length; xi++) {
                                var tx = toPlotX(xTicks[xi]);
                                ctx.beginPath(); ctx.moveTo(tx, margin.top); ctx.lineTo(tx, margin.top + h); ctx.stroke();
                            }
                            var yTicks = [0.001, 0.01, 0.1, 1.0, 10.0];
                            for (var yi = 0; yi < yTicks.length; yi++) {
                                var ty = toPlotY(yTicks[yi]);
                                ctx.beginPath(); ctx.moveTo(margin.left, ty); ctx.lineTo(margin.left + w, ty); ctx.stroke();
                            }

                            // Axis labels
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            for (var xi = 0; xi < xTicks.length; xi++) {
                                ctx.fillText(xTicks[xi].toLocaleString(), toPlotX(xTicks[xi]), margin.top + h + 6);
                            }
                            ctx.textAlign = 'right';
                            ctx.textBaseline = 'middle';
                            for (var yi = 0; yi < yTicks.length; yi++) {
                                ctx.fillText(yTicks[yi].toString(), margin.left - 8, toPlotY(yTicks[yi]));
                            }

                            // Axis titles
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Grid points per atom', viz.width / 2, margin.top + h + 35);
                            ctx.save();
                            ctx.translate(15, viz.height / 2);
                            ctx.rotate(-Math.PI / 2);
                            ctx.fillText('Error (kcal/mol)', 0, 0);
                            ctx.restore();

                            // Draw curves
                            function drawCurve(data, color, label) {
                                ctx.strokeStyle = color;
                                ctx.lineWidth = 2.5;
                                ctx.beginPath();
                                for (var i = 0; i < gridPts.length; i++) {
                                    var px = toPlotX(gridPts[i]);
                                    var py = toPlotY(data[i]);
                                    if (i === 0) ctx.moveTo(px, py);
                                    else ctx.lineTo(px, py);
                                }
                                ctx.stroke();

                                // Points
                                for (var i = 0; i < gridPts.length; i++) {
                                    var px = toPlotX(gridPts[i]);
                                    var py = toPlotY(data[i]);
                                    ctx.fillStyle = color;
                                    ctx.beginPath(); ctx.arc(px, py, 3, 0, Math.PI * 2); ctx.fill();
                                }

                                // Label at end
                                ctx.fillStyle = color;
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.fillText(label, toPlotX(gridPts[gridPts.length - 1]) + 6, toPlotY(data[data.length - 1]));
                            }

                            drawCurve(lgaErr, viz.colors.blue, 'LDA');
                            drawCurve(ggaErr, viz.colors.teal, 'GGA');
                            drawCurve(mgErr, viz.colors.orange, 'mGGA');

                            // Chemical accuracy line
                            var caY = toPlotY(1.0);
                            ctx.strokeStyle = '#3fb95066';
                            ctx.lineWidth = 1;
                            ctx.setLineDash([6, 4]);
                            ctx.beginPath(); ctx.moveTo(margin.left, caY); ctx.lineTo(margin.left + w, caY); ctx.stroke();
                            ctx.setLineDash([]);
                            ctx.fillStyle = '#3fb950';
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'right';
                            ctx.fillText('1 kcal/mol', margin.left + w - 5, caY - 6);

                            // Typical grid annotations
                            ctx.fillStyle = viz.colors.muted;
                            ctx.font = '9px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            var annotations = [
                                { gp: 300, label: 'SG-1' },
                                { gp: 5000, label: '(75,302)' },
                                { gp: 60000, label: '(99,590)' }
                            ];
                            for (var a = 0; a < annotations.length; a++) {
                                var ax = toPlotX(annotations[a].gp);
                                ctx.strokeStyle = viz.colors.muted;
                                ctx.lineWidth = 0.8;
                                ctx.setLineDash([2, 3]);
                                ctx.beginPath(); ctx.moveTo(ax, margin.top + h); ctx.lineTo(ax, margin.top + h + 18); ctx.stroke();
                                ctx.setLineDash([]);
                                ctx.fillText(annotations[a].label, ax, margin.top + h + 20);
                            }
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'A Lebedev grid with 590 points integrates spherical harmonics exactly up to \\(l = 41\\). If a GGA functional depends on \\(\\rho\\) and \\(|\\nabla\\rho|\\), and the density is expanded in a basis of Gaussians with angular momentum up to \\(l = 2\\) (d functions), what is the maximum angular momentum that needs to be integrated?',
                    hint: 'The density \\(\\rho = \\sum_i |\\psi_i|^2\\) involves products of basis functions. A product of two d-type Gaussians has angular momentum up to \\(l = 4\\). Then \\(\\rho^{4/3}\\) involves higher angular momenta.',
                    solution: 'Products of d-type Gaussians (\\(l=2\\)) give angular components up to \\(l=4\\) (for \\(\\rho\\)). The gradient \\(\\nabla\\rho\\) increases this by 1 to \\(l=5\\). For GGA, the integrand involves functions like \\(\\rho^{4/3}\\) and \\(|\\nabla\\rho|^2/\\rho^{4/3}\\). These non-integer powers of \\(\\rho\\) do not have finite angular momentum; they generate all angular momenta. However, higher components decay rapidly, so a grid exact to \\(l \\sim 29{-}41\\) captures essentially all contributions. For a pure GGA with d-type basis, 302 angular points (\\(l \\leq 29\\)) is usually sufficient. Meta-GGAs need more because \\(\\tau\\) involves \\(|\\nabla\\psi|^2\\), adding another unit of angular momentum.'
                },
                {
                    question: 'Explain why the Becke partitioning function must be smooth (infinitely differentiable) rather than, say, a simple step function that assigns each point to the nearest atom.',
                    hint: 'Consider what happens to forces (energy gradients) if the partition function has discontinuities.',
                    solution: 'A discontinuous partition (Voronoi partitioning) would cause discontinuities in the energy as atoms move, because grid points would suddenly "jump" from one atomic partition to another. This makes the potential energy surface non-smooth, causing forces to be undefined at partition boundaries, and geometry optimization would fail to converge. Becke\'s smooth partition ensures that \\(P_A(\\mathbf{r})\\) changes continuously as nuclei move, giving continuous forces. The three iterations of \\(p(\\mu) = (3\\mu - \\mu^3)/2\\) ensure the partition is smooth (the transition is a degree-27 polynomial in \\(\\mu\\)), and higher iterations make it even smoother. Stratmann-Scuseria further improved this with a piecewise partition that is exactly 0 and 1 far from partition boundaries, reducing the number of grid points needed.'
                },
                {
                    question: 'Estimate the total number of grid points for a protein fragment of 200 atoms using the (99,590) grid. Compare the memory required to store \\(\\rho\\) at all grid points (double precision, 8 bytes per value) with the memory for the density matrix in a def2-SVP basis.',
                    hint: 'For 200 atoms with 99 radial and 590 angular points each. For def2-SVP, estimate ~15 basis functions per atom on average.',
                    solution: 'Grid points: \\(200 \\times 99 \\times 590 \\approx 11.7 \\times 10^6\\) points. Memory for \\(\\rho\\): \\(11.7 \\times 10^6 \\times 8\\) bytes \\(\\approx 94\\) MB. For meta-GGA, also store \\(\\nabla\\rho\\) (3 components) and \\(\\tau\\): \\(5 \\times 94 \\approx 470\\) MB. Density matrix with def2-SVP: \\(N_{\\mathrm{bf}} \\approx 200 \\times 15 = 3000\\). Symmetric matrix: \\(3000 \\times 3001/2 \\times 8 \\approx 36\\) MB. So the grid data is about 3x larger than the density matrix for GGA, 13x for meta-GGA. With grid pruning, the actual grid is 3-5x smaller, making it comparable to the density matrix in practice.'
                },
                {
                    question: 'Why does the SCAN functional require finer integration grids than PBE, even though both are evaluated on the same grid?',
                    hint: 'Consider the functional form of SCAN, particularly its dependence on the iso-orbital indicator \\(\\alpha\\), and how sharp features in the integrand affect quadrature accuracy.',
                    solution: 'SCAN uses the iso-orbital indicator \\(\\alpha = (\\tau - \\tau_W)/\\tau^{\\mathrm{UEG}}\\), which involves the ratio of kinetic energy densities. Near covalent bonds, \\(\\alpha\\) switches rapidly from 0 (single orbital) to 1 (uniform gas), creating sharp features in the enhancement factor \\(F_x(s, \\alpha)\\). These sharp transitions correspond to high-frequency angular components that require more grid points to integrate accurately. PBE\'s enhancement factor \\(F_x(s)\\) is a smooth, monotonically increasing function with no sharp transitions, so it is easier to integrate. The r\\(^2\\)SCAN functional was developed specifically to regularize these sharp transitions, making it less grid-sensitive while preserving most of SCAN\'s accuracy.'
                }
            ]
        },

        // ============================================================
        // SECTION 3: SCF Convergence in DFT
        // ============================================================
        {
            id: 'ch13-sec03',
            title: 'SCF Convergence in DFT',
            content: `
                <h2>SCF Convergence in DFT</h2>

                <p class="section-roadmap"><strong>Section roadmap.</strong> We discuss the self-consistent field (SCF) procedure in DFT, focusing on convergence difficulties and their solutions: DIIS, level shifting, damping, fractional occupation (smearing), and second-order SCF methods. Understanding these techniques is essential for robust calculations on challenging systems.</p>

                <h3>The Kohn-Sham SCF Cycle</h3>

                <p>The Kohn-Sham equations must be solved self-consistently because the effective potential depends on the density, which in turn depends on the orbitals:</p>
                \\[\\hat{f}^{\\mathrm{KS}}[\\rho]\\, \\psi_i = \\varepsilon_i \\psi_i, \\qquad \\rho(\\mathbf{r}) = \\sum_{i}^{\\mathrm{occ}} |\\psi_i(\\mathbf{r})|^2\\]

                <div class="env-block definition">
                    <div class="env-title">Definition 13.11 (SCF Iteration)</div>
                    <div class="env-body">
                        <p>Each SCF iteration consists of:</p>
                        <ol>
                            <li>Construct the KS matrix \\(\\mathbf{F}^{\\mathrm{KS}} = \\mathbf{h} + \\mathbf{J}[\\rho] + \\mathbf{V}_{xc}[\\rho]\\) (plus \\(a_0 \\mathbf{K}\\) for hybrids)</li>
                            <li>Solve the generalized eigenvalue problem \\(\\mathbf{F}^{\\mathrm{KS}} \\mathbf{C} = \\mathbf{S} \\mathbf{C} \\boldsymbol{\\varepsilon}\\)</li>
                            <li>Construct the new density matrix \\(\\mathbf{P} = \\mathbf{C}_{\\mathrm{occ}} \\mathbf{C}_{\\mathrm{occ}}^T\\)</li>
                            <li>Check convergence: \\(|\\Delta E| < \\epsilon_E\\) and \\(\\|\\mathbf{P}^{(n)} - \\mathbf{P}^{(n-1)}\\| < \\epsilon_P\\)</li>
                        </ol>
                    </div>
                </div>

                <h3>DIIS Acceleration</h3>

                <div class="env-block definition">
                    <div class="env-title">Definition 13.12 (DIIS)</div>
                    <div class="env-body">
                        <p><strong>Direct Inversion in the Iterative Subspace</strong> (DIIS, Pulay 1980) is the standard acceleration technique. It constructs the Fock matrix for the next iteration as a linear combination of previous Fock matrices:</p>
                        \\[\\mathbf{F}^{\\mathrm{DIIS}} = \\sum_{i} c_i \\mathbf{F}^{(i)}\\]
                        <p>where the coefficients \\(\\{c_i\\}\\) minimize the norm of the error vector \\(\\mathbf{e} = \\mathbf{F}\\mathbf{P}\\mathbf{S} - \\mathbf{S}\\mathbf{P}\\mathbf{F}\\) (the commutator, which vanishes at self-consistency). The coefficients are found by solving a small linear system (Lagrangian with constraint \\(\\sum c_i = 1\\)).</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark 13.13</div>
                    <div class="env-body">
                        <p>DIIS typically reduces the number of SCF iterations from 30-50 (simple mixing) to 10-15. It is the default in virtually all quantum chemistry codes. However, DIIS can fail for systems with near-degenerate frontier orbitals, where the SCF oscillates between different orbital occupations.</p>
                    </div>
                </div>

                <h3>Level Shifting</h3>

                <div class="env-block definition">
                    <div class="env-title">Definition 13.14 (Level Shifting)</div>
                    <div class="env-body">
                        <p><strong>Level shifting</strong> adds a constant \\(b\\) to the diagonal elements of the virtual block of the Fock matrix:</p>
                        \\[\\tilde{\\varepsilon}_a = \\varepsilon_a + b, \\qquad a \\in \\text{virtual}\\]
                        <p>This increases the HOMO-LUMO gap artificially, stabilizing the occupied orbitals and preventing orbital swapping between iterations. Typical values: \\(b = 0.2{-}1.0\\) hartree. After convergence is reached with level shifting, reduce \\(b\\) gradually to zero and re-converge.</p>
                    </div>
                </div>

                <h3>Fractional Occupation (Smearing)</h3>

                <div class="env-block definition">
                    <div class="env-title">Definition 13.15 (Fermi-Dirac Smearing)</div>
                    <div class="env-body">
                        <p>For metallic systems or near-degenerate states, a <strong>Fermi-Dirac smearing</strong> replaces the sharp occupation numbers (0 or 1) with smooth Fermi-Dirac occupation:</p>
                        \\[n_i = \\frac{1}{1 + \\exp((\\varepsilon_i - \\mu)/k_B T_e)}\\]
                        <p>where \\(T_e\\) is the electronic temperature (not the physical temperature) and \\(\\mu\\) is the chemical potential determined by \\(\\sum_i n_i = N\\). The free energy \\(A = E - T_e S\\) with \\(S = -k_B \\sum_i [n_i \\ln n_i + (1-n_i)\\ln(1-n_i)]\\) is variational.</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">When to Use Smearing</div>
                    <div class="env-body">
                        <p>Smearing is essential for:</p>
                        <ul>
                            <li><strong>Metals:</strong> The Fermi surface has zero gap; integer occupation causes SCF oscillation. Use \\(T_e = 0.01{-}0.1\\) eV for metals.</li>
                            <li><strong>Transition metal complexes:</strong> Near-degenerate d-orbitals cause convergence difficulties. Use small \\(T_e \\approx 0.005\\) eV.</li>
                            <li><strong>Spin-state crossover:</strong> When different spin states have similar energies.</li>
                        </ul>
                        <p>For molecules with a clear HOMO-LUMO gap (> 1 eV), smearing is unnecessary and should not be used (it introduces a small entropic error \\(T_e S\\)).</p>
                    </div>
                </div>

                <h3>SCF Convergence Problems and Solutions</h3>

                <div class="env-block example">
                    <div class="env-title">Example 13.16 (Troubleshooting SCF)</div>
                    <div class="env-body">
                        <p>Common SCF convergence failures and remedies:</p>
                        <ul>
                            <li><strong>Energy oscillates:</strong> Reduce DIIS start iteration, add damping (mix old and new density: \\(\\rho^{(n+1)} = \\alpha \\rho^{\\mathrm{new}} + (1-\\alpha)\\rho^{(n)}\\) with \\(\\alpha = 0.3{-}0.7\\)).</li>
                            <li><strong>Energy diverges:</strong> Level shift (0.5-1.0 hartree). Check for linear dependencies in basis (near-singular overlap matrix).</li>
                            <li><strong>Wrong electronic state:</strong> Change initial guess (superposition of atomic densities, extended H&uuml;ckel, or read orbitals from a smaller basis calculation). Try different spin states.</li>
                            <li><strong>Near-degenerate orbitals:</strong> Use fractional occupation or MOM (Maximum Overlap Method) to lock orbital occupation.</li>
                            <li><strong>Slow convergence:</strong> Increase DIIS subspace (8-20 vectors). Try SOSCF (second-order SCF) or EDIIS+DIIS switching.</li>
                        </ul>
                    </div>
                </div>

                <div class="env-block warning">
                    <div class="env-title">Converged to the Wrong State?</div>
                    <div class="env-body">
                        <p>SCF convergence does <strong>not</strong> guarantee you have found the ground state. The SCF can converge to a saddle point in orbital space, a metastable excited configuration, or a broken-symmetry solution. Always check:</p>
                        <ul>
                            <li>Is the HOMO-LUMO gap reasonable?</li>
                            <li>Are orbital symmetries as expected?</li>
                            <li>Does a stability analysis confirm this is a minimum? (Use the "stable" keyword in Gaussian or "stability" in ORCA.)</li>
                            <li>For open-shell systems, check \\(\\langle S^2 \\rangle\\) for spin contamination.</li>
                        </ul>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Proposition 13.17 (SCF Stability)</div>
                    <div class="env-body">
                        <p>An SCF solution is <strong>stable</strong> if the electronic Hessian (the matrix of second derivatives of the energy with respect to orbital rotations) is positive definite. Instabilities are classified as:</p>
                        <ul>
                            <li><strong>Internal (same symmetry):</strong> A lower-energy solution exists within the same symmetry. The solution is a saddle point.</li>
                            <li><strong>RHF\\(\\to\\)UHF:</strong> The restricted solution is unstable toward spin-symmetry breaking. Common in stretched bonds and diradicals.</li>
                        </ul>
                    </div>
                </div>
            `,
            visualizations: [],
            exercises: [
                {
                    question: 'In DIIS, the error vector is \\(\\mathbf{e} = \\mathbf{FPS} - \\mathbf{SPF}\\). Show that \\(\\mathbf{e} = 0\\) at self-consistency, i.e., when \\(\\mathbf{F}\\) and \\(\\mathbf{P}\\) are simultaneously diagonal in the same basis.',
                    hint: 'At self-consistency, \\(\\mathbf{P} = \\sum_i^{\\mathrm{occ}} \\mathbf{c}_i \\mathbf{c}_i^T\\) where \\(\\mathbf{Fc}_i = \\varepsilon_i \\mathbf{Sc}_i\\). Use the idempotency of \\(\\mathbf{P}\\) in the orthonormal basis.',
                    solution: 'At self-consistency, the orbitals satisfy \\(\\mathbf{Fc}_i = \\varepsilon_i \\mathbf{Sc}_i\\). Then \\(\\mathbf{FP} = \\mathbf{F}\\sum_i \\mathbf{c}_i \\mathbf{c}_i^T = \\sum_i \\varepsilon_i \\mathbf{Sc}_i \\mathbf{c}_i^T\\). Similarly, \\(\\mathbf{PF}^T = \\sum_i \\mathbf{c}_i (\\mathbf{Fc}_i)^T = \\sum_i \\mathbf{c}_i \\mathbf{c}_i^T \\mathbf{F}^T\\). Since \\(\\mathbf{F}\\) is symmetric, \\(\\mathbf{FPS} = \\sum_i \\varepsilon_i \\mathbf{Sc}_i \\mathbf{c}_i^T \\mathbf{S} = \\mathbf{SPF}\\) (using the symmetry of the bilinear form). Hence \\(\\mathbf{e} = \\mathbf{FPS} - \\mathbf{SPF} = 0\\). The commutator vanishes because \\(\\mathbf{F}\\) and \\(\\mathbf{P}\\) share the same eigenvectors (in the \\(\\mathbf{S}\\)-orthogonal sense).'
                },
                {
                    question: 'A transition metal complex with a small HOMO-LUMO gap (0.1 eV) fails to converge with standard DIIS. Propose a step-by-step convergence strategy.',
                    hint: 'Start with robust but slow methods, then switch to faster methods once the density is close to self-consistency.',
                    solution: 'Step-by-step strategy: (1) Start with an extended H&uuml;ckel or superposition of atomic densities initial guess. (2) Apply damping (\\(\\alpha = 0.3\\)) for the first 5-10 iterations without DIIS to stabilize the density. (3) Add level shifting (\\(b = 0.5\\) hartree) to prevent orbital swapping. (4) Switch on DIIS after iteration 5-10 while keeping level shifting. (5) If still oscillating, use Fermi-Dirac smearing with \\(T_e = 300\\) K (\\(\\approx 0.026\\) eV). (6) Once converged with smearing, gradually reduce \\(T_e\\) to near zero and re-converge. (7) Run a stability analysis to confirm the ground state. (8) If all fails, try SOSCF (Newton-Raphson in orbital rotation space), which has quadratic convergence near the solution. (9) As a last resort, converge with a smaller basis set, then project the orbitals into the larger basis as an initial guess.'
                },
                {
                    question: 'Explain the difference between damping and DIIS. Under what circumstances would you prefer one over the other?',
                    hint: 'Damping is a local method (only uses the current and previous iteration), while DIIS uses information from multiple iterations.',
                    solution: 'Damping: \\(\\rho^{(n+1)} = \\alpha \\rho_{\\mathrm{new}} + (1-\\alpha)\\rho^{(n)}\\). It is a simple linear mixing that slows down changes, preventing oscillation. It always converges (for small enough \\(\\alpha\\)) but can be very slow (hundreds of iterations). DIIS: uses error vectors from multiple iterations to extrapolate toward the self-consistent solution. It converges in 10-15 iterations when it works, but can fail or oscillate for near-degenerate systems. Preference: Use damping for the first few iterations of difficult systems (to get the density into the "basin of attraction"), then switch to DIIS for fast convergence. For well-behaved molecules, DIIS alone suffices. For metals and strongly correlated systems, use EDIIS (energy-DIIS) for early iterations and switch to DIIS when close to convergence.'
                },
                {
                    question: 'Why does Fermi-Dirac smearing make the free energy \\(A = E - T_e S\\) variational (i.e., a minimum at self-consistency) even though the physical system has zero electronic temperature?',
                    hint: 'Consider the Mermin theorem, which extends the Hohenberg-Kohn theorem to finite temperature.',
                    solution: 'At finite electronic temperature \\(T_e\\), Mermin (1965) proved that the grand potential \\(\\Omega[\\rho] = E[\\rho] - T_e S[\\rho] - \\mu N\\) is a functional of the equilibrium density at temperature \\(T_e\\), and is minimized by the self-consistent density. The entropy term \\(T_e S\\) regularizes the functional, smoothing the step-function occupation and making the energy landscape convex near the minimum. As \\(T_e \\to 0\\), the free energy reduces to the ground-state energy. The key insight is that smearing is not a physical approximation of the temperature; it is a mathematical regularization that makes the optimization well-conditioned. The entropic correction \\(T_e S\\) is small (typically < 0.01 eV for reasonable \\(T_e\\)) and can be removed by extrapolation: \\(E_0 \\approx A + T_e S/2\\) (Gillan correction).'
                },
                {
                    question: 'A restricted DFT calculation on a stretched H\\(_2\\) molecule (\\(R = 5\\) bohr) converges but gives an energy higher than two isolated H atoms. What has gone wrong, and how would you fix it?',
                    hint: 'Consider what happens to the RHF/RDFT wavefunction at dissociation. Is the restricted solution stable?',
                    solution: 'At large separation, the restricted solution forces both electrons into the same spatial orbital: \\(\\psi = \\sigma_g\\). This gives a density that is symmetric, but the wavefunction contains an equal mixture of \\(\\mathrm{H} + \\mathrm{H}\\) (covalent) and \\(\\mathrm{H}^+ + \\mathrm{H}^-\\) (ionic) configurations. The ionic component raises the energy above the correct dissociation limit. Fix: use an unrestricted calculation (UDFT), which allows \\(\\alpha\\) and \\(\\beta\\) electrons to occupy different spatial orbitals. The unrestricted solution will break spin symmetry (\\(\\langle S^2 \\rangle \\neq 0\\)) but gives the correct dissociation energy. A stability analysis of the restricted solution would reveal an RKS\\(\\to\\)UKS instability. For a rigorous treatment, use multireference methods (CASSCF or CASPT2).'
                }
            ]
        },

        // ============================================================
        // SECTION 4: Interpreting DFT Results
        // ============================================================
        {
            id: 'ch13-sec04',
            title: 'Interpreting DFT Results',
            content: `
                <h2>Interpreting DFT Results</h2>

                <p class="section-roadmap"><strong>Section roadmap.</strong> We discuss how to extract physical information from a DFT calculation: total energies and their meaning, Kohn-Sham orbital energies (Koopmans' theorem in DFT), density analysis methods (Mulliken, L&ouml;wdin, NBO, QTAIM), and the interpretation of molecular orbitals.</p>

                <h3>Total Energy</h3>

                <div class="env-block definition">
                    <div class="env-title">Definition 13.18 (DFT Energy Components)</div>
                    <div class="env-body">
                        <p>The Kohn-Sham total energy decomposes as:</p>
                        \\[E_{\\mathrm{KS}} = T_s[\\rho] + E_{\\mathrm{ne}}[\\rho] + J[\\rho] + E_{xc}[\\rho] + V_{nn}\\]
                        <p>where:</p>
                        <ul>
                            <li>\\(T_s\\): non-interacting kinetic energy (from KS orbitals)</li>
                            <li>\\(E_{\\mathrm{ne}}\\): nuclear-electron attraction</li>
                            <li>\\(J\\): classical Coulomb (Hartree) electron-electron repulsion</li>
                            <li>\\(E_{xc}\\): exchange-correlation energy (the DFT part)</li>
                            <li>\\(V_{nn}\\): nuclear-nuclear repulsion</li>
                        </ul>
                    </div>
                </div>

                <div class="env-block warning">
                    <div class="env-title">Absolute vs. Relative Energies</div>
                    <div class="env-body">
                        <p>DFT total energies are <strong>not</strong> physically meaningful in isolation. They depend on the functional, basis set, and even numerical settings. Only <strong>energy differences</strong> (reaction energies, barrier heights, binding energies) are meaningful, and only when computed with the same protocol for all species. Never compare absolute energies from different functionals or basis sets.</p>
                    </div>
                </div>

                <h3>Kohn-Sham Orbital Energies</h3>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 13.19 (Janak's Theorem)</div>
                    <div class="env-body">
                        <p>For the exact KS functional, the orbital energy of the highest occupied orbital equals (minus) the ionization potential:</p>
                        \\[\\varepsilon_{\\mathrm{HOMO}} = -IP\\]
                        <p>This is the DFT analog of Koopmans' theorem. However, for approximate functionals, \\(\\varepsilon_{\\mathrm{HOMO}}\\) is a poor approximation to IP because:</p>
                        <ul>
                            <li>LDA/GGA: self-interaction error makes \\(|\\varepsilon_{\\mathrm{HOMO}}|\\) too small (typically 3-5 eV too low).</li>
                            <li>Hybrids (B3LYP): partially correct, still ~1-2 eV too low.</li>
                            <li>Range-separated hybrids (\\(\\omega\\)B97X-D): much better, within ~0.5 eV.</li>
                        </ul>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark 13.20 (LUMO and Band Gap)</div>
                    <div class="env-body">
                        <p>The KS HOMO-LUMO gap is <strong>not</strong> the fundamental gap (\\(IP - EA\\)) or the optical gap. The exact KS gap underestimates the fundamental gap by the derivative discontinuity \\(\\Delta_{xc}\\):</p>
                        \\[E_{\\mathrm{gap}}^{\\mathrm{fund}} = \\varepsilon_{\\mathrm{LUMO}}^{\\mathrm{KS}} - \\varepsilon_{\\mathrm{HOMO}}^{\\mathrm{KS}} + \\Delta_{xc}\\]
                        <p>For approximate semilocal functionals, \\(\\Delta_{xc}\\) is missing entirely, leading to band gaps that are 30-50% too small. This is the infamous "band gap problem" of DFT. Hybrid and range-separated hybrid functionals partially recover \\(\\Delta_{xc}\\) through the exact exchange contribution.</p>
                    </div>
                </div>

                <h3>Population Analysis</h3>

                <div class="env-block definition">
                    <div class="env-title">Definition 13.21 (Population Analysis Methods)</div>
                    <div class="env-body">
                        <p>Several methods partition the electron density among atoms:</p>
                        <ul>
                            <li><strong>Mulliken:</strong> \\(q_A = Z_A - \\sum_{\\mu \\in A} (\\mathbf{PS})_{\\mu\\mu}\\). Simple but strongly basis-set dependent. Not recommended for quantitative work.</li>
                            <li><strong>L&ouml;wdin:</strong> Uses orthogonalized basis: \\(\\tilde{\\mathbf{P}} = \\mathbf{S}^{1/2}\\mathbf{P}\\mathbf{S}^{1/2}\\). Less basis-dependent than Mulliken.</li>
                            <li><strong>NBO (Natural Bond Orbital):</strong> Transforms to natural atomic orbitals, then localized bond/lone pair orbitals. Gives chemically intuitive charges, bonds, and lone pairs. Basis-set stable.</li>
                            <li><strong>QTAIM (Bader):</strong> Partitions space using zero-flux surfaces of \\(\\nabla\\rho\\). Rigorous quantum mechanical definition, but computationally demanding and sometimes gives counter-intuitive charges.</li>
                            <li><strong>Hirshfeld / CM5:</strong> Partitions density using pro-molecular reference. Smooth, basis-set independent charges suitable for force field parametrization.</li>
                        </ul>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 13.22 (Charges in Water)</div>
                    <div class="env-body">
                        <p>Partial charges on oxygen in H\\(_2\\)O (B3LYP/def2-TZVPP):</p>
                        <ul>
                            <li>Mulliken: \\(-0.58\\) e (basis-dependent, ranges from \\(-0.3\\) to \\(-0.9\\) with different basis sets)</li>
                            <li>NBO: \\(-0.95\\) e (consistent across basis sets, reflects high electronegativity)</li>
                            <li>QTAIM: \\(-1.10\\) e (integrates all density "belonging" to O, includes lone pair density)</li>
                            <li>Hirshfeld: \\(-0.33\\) e (divides density more "fairly," smaller charges)</li>
                            <li>CM5: \\(-0.72\\) e (calibrated to reproduce electrostatic potentials)</li>
                        </ul>
                        <p>No single method is "correct"; the choice depends on the application. For electrostatic interactions (solvation, force fields), CM5 or RESP charges are appropriate. For chemical bonding analysis, NBO is most informative.</p>
                    </div>
                </div>

                <h3>Molecular Orbital Interpretation</h3>

                <div class="env-block intuition">
                    <div class="env-title">Are KS Orbitals "Real"?</div>
                    <div class="env-body">
                        <p>Strictly, Kohn-Sham orbitals are mathematical constructs for building the density; only the total density \\(\\rho\\) has physical meaning. However, in practice, KS orbitals provide excellent qualitative pictures of bonding, with shapes and symmetries that closely match those from Hartree-Fock and correlated calculations. The key difference is that KS orbital energies include correlation effects (unlike HF orbital energies), making their ordering and spacing more physically meaningful for spectroscopic interpretation.</p>
                        <p>The occupied-virtual gap and orbital shapes are useful for predicting reactivity (frontier molecular orbital theory), UV-Vis spectra (TD-DFT uses KS orbitals as the starting point), and NMR chemical shifts.</p>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 13.23 (Localized Orbitals)</div>
                    <div class="env-body">
                        <p>Canonical KS orbitals are delocalized over the entire molecule. <strong>Localization</strong> transforms them (by unitary rotation within the occupied space) into orbitals that correspond to bonds, lone pairs, and core electrons:</p>
                        <ul>
                            <li><strong>Foster-Boys:</strong> Minimize \\(\\sum_i \\langle \\psi_i | (\\mathbf{r} - \\langle\\mathbf{r}\\rangle_i)^2 | \\psi_i \\rangle\\) (spatial extent).</li>
                            <li><strong>Pipek-Mezey:</strong> Maximize \\(\\sum_A \\sum_i (q_{iA})^2\\), the sum of squared Mulliken charges.</li>
                            <li><strong>Intrinsic Bond Orbitals (IBO):</strong> Based on intrinsic atomic orbitals. Robust, basis-set independent, chemically intuitive.</li>
                        </ul>
                    </div>
                </div>
            `,
            visualizations: [],
            exercises: [
                {
                    question: 'The B3LYP/def2-TZVPP HOMO energy of water is \\(-0.291\\) hartree (\\(-7.92\\) eV). The experimental ionization potential is 12.62 eV. Explain the discrepancy and estimate the IP from the orbital energy.',
                    hint: 'Consider self-interaction error in B3LYP. The HOMO energy of the exact functional would equal \\(-IP\\).',
                    solution: 'The discrepancy (7.92 vs 12.62 eV, a 4.7 eV error) arises from self-interaction error in B3LYP. The approximate xc potential decays exponentially (rather than as \\(-1/r\\)), so the HOMO is too weakly bound. B3LYP with 20% HF exchange recovers only 20% of the correct long-range potential. A better estimate uses the \\(\\Delta\\)SCF method: \\(IP = E(\\mathrm{H}_2\\mathrm{O}^+) - E(\\mathrm{H}_2\\mathrm{O})\\), which typically gives IPs within 0.2-0.3 eV of experiment at the B3LYP level. Range-separated hybrids like \\(\\omega\\)B97X-D give HOMO energies much closer to \\(-IP\\) (within 0.5 eV) because they have 100% HF exchange at long range, giving the correct \\(-1/r\\) asymptotic potential.'
                },
                {
                    question: 'Explain why Mulliken charges are strongly basis-set dependent. Specifically, what happens to the Mulliken charge on an atom when you add diffuse basis functions?',
                    hint: 'Mulliken analysis assigns overlap density equally to the two atoms sharing it. Diffuse functions extend far from the atom they are centered on.',
                    solution: 'Mulliken charges partition the overlap density \\((\\mathbf{PS})_{\\mu\\nu}\\) equally between atoms, regardless of which atom the density is closer to. When diffuse functions are added to atom A, they extend far into the region around atom B. The overlap between A\'s diffuse functions and B\'s compact functions is assigned half to A and half to B, but physically this density is near B. This artificially transfers charge from B to A, making A more negative and B more positive. In extreme cases (very diffuse functions), Mulliken charges become meaningless: adding a diffuse s-function to hydrogen in HF can change its Mulliken charge by 0.3e. NBO avoids this by first transforming to natural atomic orbitals that are compact and atom-centered, making the charges insensitive to the addition of diffuse functions.'
                },
                {
                    question: 'You compute the reaction energy \\(\\mathrm{CH}_4 + \\mathrm{Cl}_2 \\to \\mathrm{CH}_3\\mathrm{Cl} + \\mathrm{HCl}\\) using B3LYP-D3(BJ)/def2-TZVPP and get \\(\\Delta E = -25.3\\) kcal/mol. The experimental \\(\\Delta H^\\circ_{298}\\) is \\(-24.6\\) kcal/mol. Are these directly comparable?',
                    hint: 'Consider the difference between electronic energy (\\(\\Delta E\\)) and enthalpy at 298 K (\\(\\Delta H^\\circ_{298}\\)).',
                    solution: 'No, \\(\\Delta E\\) (electronic energy) and \\(\\Delta H^\\circ_{298}\\) (enthalpy at 298 K) are not the same. To compare: \\(\\Delta H^\\circ_{298} = \\Delta E + \\Delta\\mathrm{ZPE} + \\Delta H_{\\mathrm{thermal}}(0 \\to 298\\mathrm{K})\\). The zero-point energy correction is typically \\(-1\\) to \\(+2\\) kcal/mol for isogyric reactions. The thermal correction at 298 K adds about \\(\\Delta(\\mathrm{P}V) = \\Delta n_{\\mathrm{gas}} RT\\) plus vibrational/rotational contributions. For this reaction (\\(\\Delta n_{\\mathrm{gas}} = 0\\)), \\(\\Delta(PV) = 0\\) and the thermal corrections largely cancel. To properly compare: compute vibrational frequencies for all species, apply ZPE and thermal corrections via standard statistical mechanics formulas. The close agreement (25.3 vs 24.6 kcal/mol) is partly fortuitous, as the missing ZPE correction (~1 kcal/mol) and the DFT functional error partially cancel.'
                },
                {
                    question: 'A colleague uses Mulliken bond orders to argue that the C-O bond in formaldehyde is a "double bond with bond order 1.95." Is this analysis reliable?',
                    hint: 'Consider basis-set dependence, and whether Mulliken bond orders can distinguish bonding types (\\(\\sigma\\) vs \\(\\pi\\)).',
                    solution: 'Mulliken bond orders (Wiberg/Mayer bond indices computed from the Mulliken-partitioned density matrix) are qualitatively useful but quantitatively unreliable: (1) They are basis-set dependent (the value 1.95 would change to ~1.7 or ~2.1 with a different basis). (2) They do not distinguish \\(\\sigma\\) and \\(\\pi\\) bonding contributions. (3) The "ideal" value of 2.0 for a double bond is not guaranteed. Better alternatives: NBO analysis gives a clear \\(\\sigma + \\pi\\) bonding picture with Lewis structure contributions and occupancies (the NBO C=O double bond in formaldehyde has occupancy 1.99 for \\(\\sigma\\) and 1.98 for \\(\\pi\\)). IBO analysis gives localized orbitals that visually show the \\(\\sigma\\) and \\(\\pi\\) bonds. QTAIM bond critical point analysis gives the electron density \\(\\rho_{\\mathrm{BCP}}\\) at the bond critical point, which correlates with bond strength.'
                },
                {
                    question: 'Derive the relationship between Janak\'s theorem \\(\\varepsilon_i = \\partial E/\\partial n_i\\) and the ionization potential. Under what conditions does \\(-\\varepsilon_{\\mathrm{HOMO}} = IP\\)?',
                    hint: 'Integrate Janak\'s theorem from \\(n_{\\mathrm{HOMO}} = 1\\) to \\(n_{\\mathrm{HOMO}} = 0\\). Consider how \\(\\varepsilon_{\\mathrm{HOMO}}\\) changes during the process.',
                    solution: 'Janak\'s theorem states \\(\\partial E/\\partial n_i = \\varepsilon_i(n_i)\\). Integrating for the HOMO: \\(IP = E(N-1) - E(N) = -\\int_1^0 \\varepsilon_{\\mathrm{HOMO}}(n)\\, dn = \\int_0^1 \\varepsilon_{\\mathrm{HOMO}}(n)\\, dn\\). For the exact functional, \\(\\varepsilon_{\\mathrm{HOMO}}(n)\\) is constant for \\(n \\in (0,1)\\) (the exact functional has a derivative discontinuity at integer occupations), so \\(IP = -\\varepsilon_{\\mathrm{HOMO}}(1)\\). For approximate functionals, \\(\\varepsilon_{\\mathrm{HOMO}}(n)\\) varies smoothly with \\(n\\) (no derivative discontinuity), and the integral gives \\(IP \\approx -\\varepsilon_{\\mathrm{HOMO}}(1/2)\\), not \\(-\\varepsilon_{\\mathrm{HOMO}}(1)\\). This "midpoint" value is closer to experiment than the \\(n=1\\) orbital energy, which is the basis of the Slater transition state approximation.'
                }
            ]
        },

        // ============================================================
        // SECTION 5: Common Pitfalls and Best Practices
        // ============================================================
        {
            id: 'ch13-sec05',
            title: 'Pitfalls & Best Practices',
            content: `
                <h2>Common Pitfalls and Best Practices</h2>

                <p class="section-roadmap"><strong>Section roadmap.</strong> We collect the most common mistakes in practical DFT calculations and provide a checklist of best practices. This section draws on accumulated experience from the computational chemistry community and can save weeks of wasted computation.</p>

                <h3>Pitfall 1: Ignoring Dispersion</h3>

                <div class="env-block warning">
                    <div class="env-title">The Dispersion Tax</div>
                    <div class="env-body">
                        <p>Any DFT calculation without a dispersion correction (D3, D4, or non-local VV10) is suspect for:</p>
                        <ul>
                            <li>Conformational energies (errors of 1-5 kcal/mol per rotatable bond)</li>
                            <li>Reaction energies involving ring formation/opening</li>
                            <li>Anything with aromatic stacking</li>
                            <li>Adsorption energies</li>
                        </ul>
                        <p><strong>Rule:</strong> Always add -D3(BJ) or -D4 to your functional. The computational overhead is negligible (<0.1% of total cost), and the improvement is substantial.</p>
                    </div>
                </div>

                <h3>Pitfall 2: Basis Set Superposition Error (BSSE)</h3>

                <div class="env-block definition">
                    <div class="env-title">Definition 13.24 (BSSE and Counterpoise)</div>
                    <div class="env-body">
                        <p><strong>BSSE</strong> occurs because fragment A borrows basis functions from fragment B to improve its description, and vice versa. This artificial stabilization overestimates binding energies. The <strong>counterpoise correction</strong> (Boys-Bernardi) estimates BSSE:</p>
                        \\[\\Delta E_{\\mathrm{CP}} = E_A^{AB} - E_A^A + E_B^{AB} - E_B^B\\]
                        <p>where \\(E_A^{AB}\\) is the energy of fragment A computed in the full dimer basis (ghost functions on B). BSSE is negligible with quadruple-zeta or larger basis sets, but can be 1-3 kcal/mol with double-zeta bases.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="functional-decision-tree"></div>

                <h3>Pitfall 3: Wrong Spin State</h3>

                <div class="env-block warning">
                    <div class="env-title">Spin State Traps</div>
                    <div class="env-body">
                        <p>For transition metal complexes, DFT can converge to the wrong spin state:</p>
                        <ul>
                            <li>B3LYP favors low-spin states (20% HF exchange destabilizes high-spin)</li>
                            <li>PBE favors high-spin states (self-interaction stabilizes d-electrons)</li>
                            <li>The "correct" spin state depends sensitively on the functional</li>
                        </ul>
                        <p><strong>Best practice:</strong> Always compute all plausible spin states and compare energies. Report the sensitivity to functional choice. For critical cases, use CASSCF/CASPT2 or CCSD(T) to arbitrate.</p>
                    </div>
                </div>

                <h3>Pitfall 4: Neglecting Zero-Point and Thermal Corrections</h3>

                <div class="env-block example">
                    <div class="env-title">Example 13.25</div>
                    <div class="env-body">
                        <p>Zero-point vibrational energy (ZPE) corrections can change relative energies by 1-5 kcal/mol:</p>
                        <ul>
                            <li>H-transfer reactions: ZPE lowers the barrier by 1-3 kcal/mol (lighter isotope tunnels more)</li>
                            <li>Conformational energies: ZPE can swap the energy ordering of conformers</li>
                            <li>Dissociation energies: ZPE reduces \\(D_e\\) to \\(D_0\\) by half the stretching frequency</li>
                        </ul>
                        <p>For comparison with experimental \\(\\Delta H^\\circ_{298}\\), always include ZPE and thermal corrections from a frequency calculation.</p>
                    </div>
                </div>

                <h3>Pitfall 5: Self-Interaction Error</h3>

                <div class="env-block definition">
                    <div class="env-title">Definition 13.26 (Self-Interaction Error)</div>
                    <div class="env-body">
                        <p>In exact DFT, the exchange energy exactly cancels the Coulomb self-interaction of each orbital: \\(J[\\phi_i] + E_x[\\phi_i] = 0\\) for any one-electron density. Approximate functionals violate this, leading to <strong>self-interaction error</strong> (SIE), also called delocalization error. Symptoms:</p>
                        <ul>
                            <li>Spurious charge delocalization (fractional charges on separated fragments)</li>
                            <li>Underestimated barrier heights</li>
                            <li>Incorrect dissociation of radical cations (e.g., H\\(_2^+\\) dissociates to H\\(^{0.5+}\\) + H\\(^{0.5+}\\) instead of H + H\\(^+\\))</li>
                            <li>Underestimated band gaps</li>
                        </ul>
                        <p>Hybrid and range-separated hybrid functionals reduce SIE by incorporating exact exchange.</p>
                    </div>
                </div>

                <h3>Best Practices Checklist</h3>

                <div class="env-block intuition">
                    <div class="env-title">DFT Calculation Checklist</div>
                    <div class="env-body">
                        <ol>
                            <li><strong>Functional + dispersion:</strong> Choose a well-benchmarked functional with dispersion correction. Default: \\(\\omega\\)B97X-D/def2-TZVPP or B3LYP-D3(BJ)/def2-TZVPP.</li>
                            <li><strong>Basis set:</strong> At least triple-zeta for energetics. Add diffuse functions for anions. Use ECPs for heavy elements.</li>
                            <li><strong>Grid:</strong> At least (99,590) for production. Tighter for frequencies and meta-GGA.</li>
                            <li><strong>SCF convergence:</strong> \\(10^{-7}\\) hartree for energies, \\(10^{-8}\\) for frequencies.</li>
                            <li><strong>Geometry:</strong> Optimize at the same level as the single-point, or document the protocol.</li>
                            <li><strong>Frequencies:</strong> Always compute to verify the stationary point (0 imaginary = minimum, 1 imaginary = TS) and obtain ZPE/thermal corrections.</li>
                            <li><strong>Spin states:</strong> For transition metals, check all plausible multiplicities.</li>
                            <li><strong>Stability:</strong> Run a stability analysis for open-shell and near-degenerate systems.</li>
                            <li><strong>BSSE:</strong> Use counterpoise for interaction energies with DZ/TZ basis, or use a QZ basis where BSSE is negligible.</li>
                            <li><strong>Reproducibility:</strong> Report full computational details (functional, basis, grid, code, version).</li>
                        </ol>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark 13.27 (The Cost of Getting It Wrong)</div>
                    <div class="env-body">
                        <p>A single DFT calculation is cheap (minutes to hours). But drawing wrong conclusions from a poorly set up calculation can waste months of experimental follow-up. The time invested in choosing the right protocol is always worth it. When in doubt, consult the recent literature for benchmarks on your specific problem class.</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'functional-decision-tree',
                    title: 'Functional Selection Decision Tree',
                    description: 'An interactive flowchart to help select the appropriate functional. Click each decision node to navigate.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 450 });
                        var ctx = viz.ctx;

                        var nodes = [
                            { id: 0, x: 280, y: 35, w: 180, h: 30, text: 'What is your system?', type: 'question', color: '#58a6ff', children: [1, 2, 3] },
                            { id: 1, x: 80, y: 100, w: 130, h: 28, text: 'Organic molecule', type: 'answer', color: '#3fb950', children: [4] },
                            { id: 2, x: 280, y: 100, w: 130, h: 28, text: 'TM complex', type: 'answer', color: '#f0883e', children: [5] },
                            { id: 3, x: 460, y: 100, w: 110, h: 28, text: 'Solid / surface', type: 'answer', color: '#bc8cff', children: [6] },
                            { id: 4, x: 80, y: 165, w: 180, h: 28, text: 'What property?', type: 'question', color: '#58a6ff', children: [7, 8, 9] },
                            { id: 5, x: 300, y: 165, w: 200, h: 28, text: 'PBE0-D3 or TPSSh', type: 'result', color: '#d29922', children: [] },
                            { id: 6, x: 460, y: 165, w: 180, h: 28, text: 'PBE-D3 or r\u00B2SCAN', type: 'result', color: '#d29922', children: [] },
                            { id: 7, x: 20, y: 235, w: 120, h: 28, text: 'Thermo/kinetics', type: 'answer', color: '#3fb950', children: [10] },
                            { id: 8, x: 155, y: 235, w: 110, h: 28, text: 'Non-covalent', type: 'answer', color: '#3fb950', children: [11] },
                            { id: 9, x: 280, y: 235, w: 100, h: 28, text: 'Spectra', type: 'answer', color: '#3fb950', children: [12] },
                            { id: 10, x: 20, y: 305, w: 170, h: 28, text: '\u03C9B97X-D / B3LYP-D3', type: 'result', color: '#d29922', children: [13] },
                            { id: 11, x: 200, y: 305, w: 150, h: 28, text: '\u03C9B97X-D / SCAN-D4', type: 'result', color: '#d29922', children: [] },
                            { id: 12, x: 370, y: 305, w: 170, h: 28, text: 'CAM-B3LYP / \u03C9B97X', type: 'result', color: '#d29922', children: [] },
                            { id: 13, x: 20, y: 375, w: 190, h: 28, text: 'Need < 1 kcal/mol?', type: 'question', color: '#58a6ff', children: [14, 15] },
                            { id: 14, x: 20, y: 425, w: 130, h: 28, text: 'B2PLYP-D3(BJ)', type: 'result', color: '#f85149', children: [] },
                            { id: 15, x: 180, y: 425, w: 130, h: 28, text: 'DLPNO-CCSD(T)', type: 'result', color: '#f85149', children: [] }
                        ];

                        var highlighted = -1;

                        viz.canvas.addEventListener('click', function(e) {
                            var rect = viz.canvas.getBoundingClientRect();
                            var mx = e.clientX - rect.left;
                            var my = e.clientY - rect.top;
                            highlighted = -1;
                            for (var i = 0; i < nodes.length; i++) {
                                var n = nodes[i];
                                if (mx >= n.x - n.w/2 && mx <= n.x + n.w/2 && my >= n.y - n.h/2 && my <= n.y + n.h/2) {
                                    highlighted = i;
                                    break;
                                }
                            }
                        });

                        function draw() {
                            viz.clear();

                            // Draw edges first
                            ctx.strokeStyle = viz.colors.muted;
                            ctx.lineWidth = 1;
                            for (var i = 0; i < nodes.length; i++) {
                                var n = nodes[i];
                                for (var c = 0; c < n.children.length; c++) {
                                    var child = nodes[n.children[c]];
                                    var isHighlighted = (highlighted === i || highlighted === n.children[c]);
                                    ctx.strokeStyle = isHighlighted ? viz.colors.teal : viz.colors.muted + '66';
                                    ctx.lineWidth = isHighlighted ? 2 : 1;
                                    ctx.beginPath();
                                    ctx.moveTo(n.x, n.y + n.h/2);
                                    ctx.lineTo(child.x, child.y - child.h/2);
                                    ctx.stroke();
                                }
                            }

                            // Draw nodes
                            for (var i = 0; i < nodes.length; i++) {
                                var n = nodes[i];
                                var isHl = (highlighted === i);

                                var rx = n.x - n.w/2, ry = n.y - n.h/2;
                                ctx.fillStyle = isHl ? n.color + '44' : '#14142e';
                                ctx.strokeStyle = isHl ? n.color : n.color + '88';
                                ctx.lineWidth = isHl ? 2 : 1;
                                ctx.beginPath();
                                if (n.type === 'question') {
                                    // Diamond-ish rounded rect
                                    ctx.roundRect(rx, ry, n.w, n.h, 6);
                                } else if (n.type === 'result') {
                                    ctx.roundRect(rx, ry, n.w, n.h, 14);
                                } else {
                                    ctx.roundRect(rx, ry, n.w, n.h, 4);
                                }
                                ctx.fill(); ctx.stroke();

                                ctx.fillStyle = isHl ? viz.colors.white : viz.colors.text;
                                ctx.font = (isHl ? 'bold ' : '') + (n.type === 'result' ? '11' : '11') + 'px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'middle';
                                ctx.fillText(n.text, n.x, n.y);
                            }

                            // Legend
                            ctx.fillStyle = viz.colors.muted;
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'right';
                            ctx.fillText('Click nodes to highlight paths', viz.width - 10, viz.height - 10);
                        }

                        viz.animate(draw);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'You compute the interaction energy of a methane dimer at B3LYP/6-31G(d) and get \\(-1.8\\) kcal/mol. The CCSD(T)/CBS reference is \\(-0.53\\) kcal/mol. Identify all sources of error.',
                    hint: 'Consider: (1) missing dispersion, (2) BSSE, (3) basis set incompleteness, (4) functional error. Which effects go in which direction?',
                    solution: 'The \\(-1.8\\) kcal/mol result is overbinding by 1.3 kcal/mol. Sources: (1) Missing dispersion: B3LYP without D3 should underbind, giving a less negative interaction energy. So dispersion is NOT causing the overbinding here. (2) BSSE: with a small basis (6-31G(d)), BSSE is very large, ~1.5-2.0 kcal/mol, artificially stabilizing the dimer. This is the dominant error. (3) B3LYP without dispersion misses the \\(-0.5\\) kcal/mol attraction. (4) Net: the large BSSE (~1.8 kcal/mol overbinding) plus the missing dispersion (~0.5 kcal/mol underbinding) plus small functional error gives the net \\(-1.8\\) kcal/mol. Fix: use counterpoise correction (reduces to ~\\(-0.1\\) kcal/mol without D3), then add D3 correction (~\\(-0.5\\)), giving ~\\(-0.6\\) kcal/mol, close to the reference. Better: use def2-TZVPP (minimal BSSE) with D3.'
                },
                {
                    question: 'You optimize the geometry of an iron porphyrin complex with B3LYP and find a singlet ground state. With PBE, you find a triplet ground state. How do you determine which is correct?',
                    hint: 'Different functionals have different biases for spin states. What external references can break the tie?',
                    solution: 'Neither functional can be trusted alone for iron spin states. Strategy: (1) Compute both spin states with multiple functionals: B3LYP (biased low-spin), PBE (biased high-spin), TPSSh (10% HF, less biased), PBE0 (25% HF). (2) If available, compare with experimental data (magnetic susceptibility, M&ouml;ssbauer spectroscopy, X-ray structures that show bond lengths characteristic of a spin state). (3) For a definitive answer, use CASSCF/CASPT2 or DMRG-CASPT2 with a (12,14) or larger active space including Fe 3d, 4d, and relevant porphyrin pi orbitals. CCSD(T) is unreliable for transition metals with strong multireference character. (4) The spin-state energy gap is typically 2-10 kcal/mol, within the range of functional sensitivity. Report results as "spin state depends on functional; singlet by B3LYP (\\(\\Delta E = -3\\) kcal/mol), triplet by PBE (\\(\\Delta E = +5\\) kcal/mol); multireference treatment needed for definitive assignment."'
                },
                {
                    question: 'Explain why DFT gives qualitatively wrong dissociation curves for H\\(_2^+\\) (the simplest one-electron system). What does this tell us about the self-interaction error?',
                    hint: 'H\\(_2^+\\) has one electron. The exact exchange should exactly cancel the Coulomb self-interaction. What do approximate functionals do?',
                    solution: 'H\\(_2^+\\) has one electron, so there is no electron-electron interaction; the exact energy is just kinetic + nuclear attraction + nuclear repulsion. The Coulomb (Hartree) term \\(J[\\rho]\\) represents self-interaction of the electron with itself. In exact DFT, \\(E_x[\\rho] = -J[\\rho]\\) exactly for a one-electron system. But approximate xc functionals (LDA, GGA) only partially cancel \\(J\\), leaving a residual self-interaction energy. At large \\(R\\), the exact solution has the electron on one nucleus: \\(E \\to E(\\mathrm{H}) + E(\\mathrm{H}^+)\\). With approximate DFT, the self-interaction stabilizes half an electron on each nucleus: \\(E \\to 2E(\\mathrm{H}^{0.5+})\\), which is too low by ~5 eV. The curve does not dissociate correctly. HF exchange is self-interaction free for one electron, which is why hybrid functionals improve (B3LYP corrects 20% of the error). This single-electron failure is the prototype of all delocalization errors in DFT.'
                },
                {
                    question: 'A publication reports B3LYP/6-311G(d,p) energies "without further correction." List five methodological concerns a reviewer should raise.',
                    hint: 'Consider dispersion, basis set quality, thermal corrections, comparison with experiment, and the choice of functional.',
                    solution: '(1) No dispersion correction: B3LYP without D3/D4 systematically misses van der Waals interactions, affecting conformational and intermolecular energies. (2) No thermal/ZPE corrections: comparing electronic energies directly with experimental enthalpies or free energies is invalid. (3) Pople basis set (6-311G) is not systematic and has known imbalances; def2-TZVPP would be more reliable. (4) No benchmarking: without comparison to higher-level methods (CCSD(T)) or experiment for at least a subset of reactions, the accuracy is unknown. (5) No BSSE correction if interaction energies are reported with a triple-split-valence basis. Additional concerns: (6) no grid specification, (7) no stability analysis for open-shell species, (8) no consideration of alternative spin states for metal complexes, (9) no reporting of code/version for reproducibility.'
                },
                {
                    question: 'You want to compute the pK\\(_a\\) of a drug molecule (expected pK\\(_a\\) \\(\\approx 5\\)) in aqueous solution using DFT. Outline a protocol and estimate the accuracy you can achieve.',
                    hint: 'pK\\(_a\\) involves solvation free energies. An error of 1.4 kcal/mol in \\(\\Delta G\\) gives a 1-unit error in pK\\(_a\\).',
                    solution: 'Protocol: (1) Identify the protonation site(s). Optimize both protonated (AH) and deprotonated (A\\(^-\\)) forms in gas phase at \\(\\omega\\)B97X-D/def2-TZVPP. (2) Compute gas-phase free energies: \\(G_{\\mathrm{gas}} = E + ZPE + H_{\\mathrm{thermal}} - TS\\) from frequency calculations. (3) Compute solvation free energies \\(\\Delta G_{\\mathrm{solv}}\\) using an implicit solvation model (SMD or COSMO-RS) at the same level. (4) Compute the aqueous deprotonation free energy: \\(\\Delta G_{\\mathrm{aq}} = G(\\mathrm{A}^-_{\\mathrm{aq}}) + G(\\mathrm{H}^+_{\\mathrm{aq}}) - G(\\mathrm{AH}_{\\mathrm{aq}})\\). Use the experimental solvation free energy of the proton (\\(-265.9\\) kcal/mol). (5) pK\\(_a\\) = \\(\\Delta G_{\\mathrm{aq}}/(2.303 RT)\\). Accuracy: The \\(\\Delta G_{\\mathrm{solv}}\\) errors are typically 1-2 kcal/mol for each species. The gas-phase deprotonation energy is accurate to ~1 kcal/mol. Total error in \\(\\Delta G_{\\mathrm{aq}}\\): 2-4 kcal/mol, giving pK\\(_a\\) accuracy of 1.5-3 units. This is only semi-quantitative. For better accuracy (0.5 pK\\(_a\\) units), use explicit solvent QM/MM or COSMO-RS with empirical corrections.'
                }
            ]
        }
    ]
});
