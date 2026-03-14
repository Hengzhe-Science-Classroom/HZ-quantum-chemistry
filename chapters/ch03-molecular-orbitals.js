// === Chapter 3: Molecular Orbital Theory ===
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch03',
    number: 3,
    title: 'Molecular Orbital Theory',
    subtitle: 'From atoms to molecules: the LCAO approach',
    sections: [
        // ========== SECTION 1: The Born-Oppenheimer Approximation ==========
        {
            id: 'sec01-born-oppenheimer',
            title: 'The Born-Oppenheimer Approximation',
            content: `
<h2>3.1 The Born-Oppenheimer Approximation</h2>

<p>Molecules consist of nuclei <em>and</em> electrons. A molecule with \\(M\\) nuclei and \\(N\\) electrons has a full Hamiltonian that includes the kinetic energy of all particles and all pairwise Coulomb interactions. Before we can discuss molecular orbitals, we must address a fundamental question: how do we separate the nuclear motion from the electronic motion?</p>

<h3>The Full Molecular Hamiltonian</h3>

<div class="env-block definition">
<div class="env-title">Definition 3.1.1 (Full Molecular Hamiltonian)</div>
<div class="env-body">
<p>In atomic units, the full non-relativistic Hamiltonian for a molecule with \\(M\\) nuclei (charges \\(Z_A\\), masses \\(M_A\\)) and \\(N\\) electrons is:</p>
\\[
\\hat{H}_\\text{mol} = -\\sum_{A=1}^{M} \\frac{1}{2M_A}\\nabla_A^2 - \\sum_{i=1}^{N} \\frac{1}{2}\\nabla_i^2 - \\sum_{i=1}^{N}\\sum_{A=1}^{M} \\frac{Z_A}{r_{iA}} + \\sum_{i<j}^{N} \\frac{1}{r_{ij}} + \\sum_{A<B}^{M} \\frac{Z_A Z_B}{R_{AB}}
\\]
<p>The five terms are, in order: nuclear kinetic energy, electronic kinetic energy, electron-nuclear attraction, electron-electron repulsion, and nuclear-nuclear repulsion.</p>
</div>
</div>

<h3>The Born-Oppenheimer Separation</h3>

<p>The key physical insight, due to Born and Oppenheimer (1927), is that nuclei are much heavier than electrons: \\(M_A \\geq 1836\\, m_e\\). Consequently, nuclei move much more slowly than electrons. On the timescale of electronic motion, the nuclei are essentially stationary.</p>

<div class="env-block theorem">
<div class="env-title">Theorem 3.1.2 (Born-Oppenheimer Approximation)</div>
<div class="env-body">
<p>In the Born-Oppenheimer approximation, the molecular wavefunction is factored as:</p>
\\[
\\Psi_\\text{mol}(\\mathbf{r}, \\mathbf{R}) \\approx \\psi_\\text{elec}(\\mathbf{r};\\mathbf{R})\\,\\chi_\\text{nuc}(\\mathbf{R})
\\]
<p>where \\(\\mathbf{r}\\) denotes all electronic coordinates and \\(\\mathbf{R}\\) all nuclear coordinates. The electronic wavefunction \\(\\psi_\\text{elec}\\) depends parametrically on \\(\\mathbf{R}\\) (the nuclear positions appear as fixed parameters, not dynamical variables). It satisfies the <em>electronic Schrodinger equation</em>:</p>
\\[
\\hat{H}_\\text{elec}\\,\\psi_\\text{elec}(\\mathbf{r};\\mathbf{R}) = E_\\text{elec}(\\mathbf{R})\\,\\psi_\\text{elec}(\\mathbf{r};\\mathbf{R})
\\]
<p>with the electronic Hamiltonian:</p>
\\[
\\hat{H}_\\text{elec} = -\\sum_{i=1}^{N} \\frac{1}{2}\\nabla_i^2 - \\sum_{i,A} \\frac{Z_A}{r_{iA}} + \\sum_{i<j} \\frac{1}{r_{ij}}
\\]
<p>The total energy at fixed nuclear geometry is \\(U(\\mathbf{R}) = E_\\text{elec}(\\mathbf{R}) + \\sum_{A<B} Z_A Z_B / R_{AB}\\), which serves as the <em>potential energy surface</em> (PES) for nuclear motion.</p>
</div>
</div>

<div class="env-block proof">
<div class="env-title">Proof Sketch</div>
<div class="env-body">
<p>The nuclear kinetic energy operator scales as \\(1/M_A\\). In the limit \\(M_A \\to \\infty\\), this term vanishes, and the nuclei become classical fixed charges. The full Hamiltonian reduces to \\(\\hat{H}_\\text{elec}\\) plus the constant nuclear repulsion. The electronic wavefunction is then solved at each fixed nuclear configuration \\(\\mathbf{R}\\). The correction terms (non-adiabatic couplings) are of order \\((m_e/M_A)^{1/4}\\) and are neglected.</p>
<div class="qed">&#8718;</div>
</div>
</div>

<div class="env-block intuition">
<div class="env-title">Physical Picture</div>
<div class="env-body">
<p>Imagine the nuclei moving in slow motion. At each instant, the electrons "instantaneously" adjust to the current nuclear positions, finding their optimal distribution. The electronic energy \\(E_\\text{elec}(\\mathbf{R})\\), computed at each nuclear geometry, traces out a potential energy surface on which the nuclei subsequently move. This separation is the foundation of computational chemistry: first solve the electronic problem, then use the resulting PES for nuclear dynamics.</p>
</div>
</div>

<div class="env-block warning">
<div class="env-title">Warning: When Born-Oppenheimer Fails</div>
<div class="env-body">
<p>The Born-Oppenheimer approximation breaks down when two electronic states become nearly degenerate at some nuclear geometry (a <em>conical intersection</em> or <em>avoided crossing</em>). At such points, electronic and nuclear motions couple strongly, and non-adiabatic effects (vibronic coupling) become important. This occurs in photochemistry, Jahn-Teller distortions, and ultrafast dynamics.</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example 3.1.3 (H\\(_2^+\\): The Simplest Molecule)</div>
<div class="env-body">
<p>For H\\(_2^+\\) (two protons, one electron), the Born-Oppenheimer electronic Hamiltonian is:</p>
\\[
\\hat{H}_\\text{elec} = -\\frac{1}{2}\\nabla^2 - \\frac{1}{r_A} - \\frac{1}{r_B}
\\]
<p>where \\(r_A\\) and \\(r_B\\) are the distances from the electron to nuclei A and B. The nuclear repulsion \\(1/R\\) is added as a constant. This is a one-electron problem and can be solved exactly in confocal elliptic coordinates, but it already illustrates the key concepts of bonding and antibonding that we develop in the next section.</p>
</div>
</div>
`,
            visualizations: [],
            exercises: [
                {
                    question: 'Write the full molecular Hamiltonian for H\\(_2\\) (two protons, two electrons) in atomic units. Identify all five types of terms.',
                    hint: 'Use \\(M = 2\\) nuclei with \\(Z_A = Z_B = 1\\) and \\(N = 2\\) electrons.',
                    solution: '\\[\\hat{H} = -\\frac{1}{2M_p}(\\nabla_A^2 + \\nabla_B^2) - \\frac{1}{2}(\\nabla_1^2 + \\nabla_2^2) - \\frac{1}{r_{1A}} - \\frac{1}{r_{1B}} - \\frac{1}{r_{2A}} - \\frac{1}{r_{2B}} + \\frac{1}{r_{12}} + \\frac{1}{R_{AB}}\\] Terms: nuclear KE (2), electronic KE (2), electron-nuclear attraction (4), electron-electron repulsion (1), nuclear-nuclear repulsion (1).'
                },
                {
                    question: 'Explain why the Born-Oppenheimer approximation becomes exact in the limit \\(M_A \\to \\infty\\).',
                    hint: 'What happens to the nuclear kinetic energy?',
                    solution: 'As \\(M_A \\to \\infty\\), the nuclear kinetic energy \\(-\\nabla_A^2/(2M_A) \\to 0\\). The nuclei become infinitely heavy, classical, stationary charges. The electronic Schrodinger equation at fixed \\(\\mathbf{R}\\) becomes exact (no corrections from nuclear motion). The non-adiabatic coupling terms, which involve derivatives of the electronic wavefunction with respect to nuclear coordinates multiplied by \\(1/M_A\\), vanish identically.'
                },
                {
                    question: 'For a diatomic molecule, the potential energy surface \\(U(R)\\) is a function of a single variable: the internuclear distance \\(R\\). Sketch the qualitative shape of \\(U(R)\\) for a stable molecule and identify the equilibrium bond length \\(R_e\\) and dissociation energy \\(D_e\\).',
                    hint: 'At small \\(R\\), nuclear repulsion dominates. At large \\(R\\), the atoms are non-interacting.',
                    solution: '\\(U(R)\\) has a minimum at \\(R = R_e\\) (equilibrium bond length) where the attractive and repulsive forces balance. For \\(R < R_e\\), the nuclear-nuclear repulsion and electron kinetic energy increase steeply (the curve rises sharply). For \\(R > R_e\\), the curve rises toward \\(U(\\infty)\\), the energy of the separated atoms. The dissociation energy \\(D_e = U(\\infty) - U(R_e)\\) is the depth of the potential well.'
                },
                {
                    question: 'The mass of a proton is \\(M_p = 1836\\, m_e\\). Estimate the ratio of nuclear to electronic velocities for H\\(_2\\).',
                    hint: 'If both have similar kinetic energies, \\(\\frac{1}{2}Mv^2 \\sim \\frac{1}{2}m_e v_e^2\\).',
                    solution: 'In the ground state, kinetic energies are comparable: \\(\\frac{1}{2}M_p v_N^2 \\sim \\frac{1}{2}m_e v_e^2\\). Thus \\(v_N/v_e \\sim \\sqrt{m_e/M_p} = 1/\\sqrt{1836} \\approx 1/43\\). The nuclei move about 43 times slower than the electrons, justifying the Born-Oppenheimer separation.'
                },
                {
                    question: 'Give an example of a physical situation where the Born-Oppenheimer approximation fails.',
                    hint: 'Think about when electronic energy surfaces cross.',
                    solution: 'The Born-Oppenheimer approximation fails near conical intersections, where two electronic potential energy surfaces become degenerate. Examples: (1) the photoisomerization of retinal in vision, where the excited state crosses the ground state; (2) the Jahn-Teller effect in octahedral transition metal complexes with degenerate electronic states; (3) non-adiabatic transitions in charge-transfer reactions. At these points, the nuclear motion cannot be separated from the electronic motion because the electronic state changes character during the nuclear motion.'
                }
            ]
        },

        // ========== SECTION 2: H2+: The Simplest Molecule ==========
        {
            id: 'sec02-h2-plus',
            title: 'H\u2082\u207A: The Simplest Molecule',
            content: `
<h2>3.2 H\\(_2^+\\): The Simplest Molecule</h2>

<p>The hydrogen molecular ion H\\(_2^+\\) consists of two protons and a single electron. It is the simplest possible molecule, and the only molecular system for which the electronic Schrodinger equation can be solved exactly (in confocal elliptic coordinates). More importantly, it provides the archetype for understanding <em>chemical bonding</em> through the <em>linear combination of atomic orbitals</em> (LCAO) approach.</p>

<h3>The LCAO Ansatz</h3>

<p>Instead of solving the exact problem, consider an approximate approach: construct molecular orbitals (MOs) as linear combinations of atomic orbitals (AOs) centered on the two nuclei.</p>

<div class="env-block definition">
<div class="env-title">Definition 3.2.1 (LCAO-MO for H\\(_2^+\\))</div>
<div class="env-body">
<p>Let \\(\\phi_A(\\mathbf{r}) = \\frac{1}{\\sqrt{\\pi}}e^{-r_A}\\) and \\(\\phi_B(\\mathbf{r}) = \\frac{1}{\\sqrt{\\pi}}e^{-r_B}\\) be hydrogen \\(1s\\) orbitals centered on nuclei A and B respectively. The LCAO molecular orbitals are:</p>
\\[
\\psi_\\pm = \\frac{1}{\\sqrt{2(1 \\pm S)}}\\left(\\phi_A \\pm \\phi_B\\right)
\\]
<p>where \\(S = \\langle \\phi_A | \\phi_B \\rangle\\) is the <em>overlap integral</em>. The \\(+\\) combination is the <em>bonding</em> orbital (\\(\\sigma_g\\)), and the \\(-\\) combination is the <em>antibonding</em> orbital (\\(\\sigma_u^*\\)).</p>
</div>
</div>

<h3>Key Integrals</h3>

<p>The energy of each LCAO-MO is determined by three types of integrals:</p>

<div class="env-block definition">
<div class="env-title">Definition 3.2.2 (Fundamental Molecular Integrals)</div>
<div class="env-body">
<ul>
<li><strong>Overlap integral:</strong> \\(S = \\langle \\phi_A | \\phi_B \\rangle = e^{-R}\\left(1 + R + \\frac{R^2}{3}\\right)\\)</li>
<li><strong>Coulomb integral:</strong> \\(H_{AA} = \\langle \\phi_A | \\hat{H}_\\text{elec} | \\phi_A \\rangle = E_{1s} - \\frac{1}{R}\\left[1 - (1+R)e^{-2R}\\right]\\)</li>
<li><strong>Resonance (exchange) integral:</strong> \\(H_{AB} = \\langle \\phi_A | \\hat{H}_\\text{elec} | \\phi_B \\rangle = (E_{1s} - \\frac{1}{R})S + \\frac{1}{R}(1+R)e^{-R}\\) (where \\(E_{1s} = -1/2\\) Ha is the hydrogen ground-state energy)</li>
</ul>
</div>
</div>

<h3>Bonding and Antibonding Energies</h3>

<div class="env-block theorem">
<div class="env-title">Theorem 3.2.3 (LCAO-MO Energies for H\\(_2^+\\))</div>
<div class="env-body">
<p>The energies of the bonding and antibonding molecular orbitals are:</p>
\\[
E_\\pm = \\frac{H_{AA} \\pm H_{AB}}{1 \\pm S} + \\frac{1}{R}
\\]
<p>where the \\(+1/R\\) adds the nuclear-nuclear repulsion. The bonding orbital \\(\\psi_+\\) has lower energy (\\(E_+\\)) and the antibonding orbital \\(\\psi_-\\) has higher energy (\\(E_-\\)).</p>
</div>
</div>

<div class="env-block proof">
<div class="env-title">Proof</div>
<div class="env-body">
<p>By the Rayleigh-Ritz variational method, write \\(\\psi = c_A \\phi_A + c_B \\phi_B\\) and minimize \\(E = \\langle\\psi|\\hat{H}|\\psi\\rangle / \\langle\\psi|\\psi\\rangle\\). This leads to the secular equation:</p>
\\[
\\begin{vmatrix}
H_{AA} - ES & H_{AB} - ES \\\\
H_{AB} - ES & H_{BB} - ES
\\end{vmatrix} = 0
\\]
<p>By symmetry, \\(H_{AA} = H_{BB}\\). Expanding the determinant: \\((H_{AA} - ES)^2 - (H_{AB} - ES)^2 = 0\\), giving \\(H_{AA} - ES = \\pm(H_{AB} - ES)\\), which yields \\(E_\\pm = (H_{AA} \\pm H_{AB})/(1 \\pm S)\\).</p>
<div class="qed">&#8718;</div>
</div>
</div>

<h3>Physical Interpretation of Bonding</h3>

<div class="env-block intuition">
<div class="env-title">Why Does the Bonding Orbital Lower the Energy?</div>
<div class="env-body">
<p>In the bonding orbital \\(\\psi_+ \\propto \\phi_A + \\phi_B\\), the wavefunctions on the two centers <em>add constructively</em> in the internuclear region. This produces enhanced electron density between the nuclei, where the electron can simultaneously attract both protons, lowering the potential energy. The antibonding orbital \\(\\psi_- \\propto \\phi_A - \\phi_B\\) has a <em>node</em> (zero) at the midpoint between the nuclei: destructive interference depletes the electron density in the bonding region, raising the energy.</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">Remark 3.2.4 (Asymmetry of Stabilization)</div>
<div class="env-body">
<p>The antibonding orbital is destabilized <em>more</em> than the bonding orbital is stabilized, relative to the atomic level. Quantitatively, \\(|E_- - H_{AA}| > |E_+ - H_{AA}|\\) because of the \\(1/(1 \\pm S)\\) factors. This asymmetry is crucial: it means that filling both bonding and antibonding orbitals (as in He\\(_2\\)) does not produce a net bond.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-h2plus-lcao"></div>
`,
            visualizations: [
                {
                    id: 'viz-h2plus-lcao',
                    title: 'H\u2082\u207A Bonding and Antibonding Orbitals',
                    description: 'Visualize the bonding (\\(\\psi_+\\)) and antibonding (\\(\\psi_-\\)) LCAO molecular orbitals. Drag the slider to change the internuclear distance \\(R\\).',
                    setup(body, controls) {
                        const viz = new VizEngine(body, { width: 620, height: 400, scale: 40, originX: 310, originY: 200 });

                        let R = 2.0;
                        let showBonding = true;

                        VizEngine.createSlider(controls, 'R', 0.5, 5.0, R, 0.1, (v) => { R = v; draw(); });
                        const bondBtn = VizEngine.createButton(controls, 'Bonding', () => { showBonding = true; draw(); });
                        const antiBtn = VizEngine.createButton(controls, 'Antibonding', () => { showBonding = false; draw(); });

                        function phi1s(r) {
                            return (1 / Math.sqrt(Math.PI)) * Math.exp(-r);
                        }

                        function overlapS(R) {
                            return Math.exp(-R) * (1 + R + R * R / 3);
                        }

                        function draw() {
                            viz.clear();
                            const ctx = viz.ctx;

                            // Nuclei positions
                            const xA = -R / 2, xB = R / 2;

                            // Draw horizontal axis
                            viz.drawSegment(-7, 0, 7, 0, viz.colors.axis + '44', 1);

                            // Draw nuclei
                            viz.drawPoint(xA, 0, viz.colors.white, 'A', 6);
                            viz.drawPoint(xB, 0, viz.colors.white, 'B', 6);

                            // Compute and draw wavefunction
                            const S = overlapS(R);
                            const norm = 1 / Math.sqrt(2 * (1 + (showBonding ? S : -S)));
                            const sign = showBonding ? 1 : -1;

                            const xMin = -7, xMax = 7;
                            const steps = 400;

                            // Draw the MO along the internuclear axis
                            ctx.strokeStyle = showBonding ? viz.colors.blue : viz.colors.red;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            let started = false;
                            for (let i = 0; i <= steps; i++) {
                                const x = xMin + (xMax - xMin) * i / steps;
                                const rA = Math.abs(x - xA);
                                const rB = Math.abs(x - xB);
                                const psi = norm * (phi1s(rA) + sign * phi1s(rB));
                                const y = psi * 3; // scale for visibility
                                const [sx, sy] = viz.toScreen(x, y);
                                if (!started) { ctx.moveTo(sx, sy); started = true; }
                                else ctx.lineTo(sx, sy);
                            }
                            ctx.stroke();

                            // Draw individual AOs (faded)
                            ctx.strokeStyle = viz.colors.muted;
                            ctx.lineWidth = 1;
                            ctx.setLineDash([4, 4]);
                            // phi_A
                            ctx.beginPath();
                            started = false;
                            for (let i = 0; i <= steps; i++) {
                                const x = xMin + (xMax - xMin) * i / steps;
                                const rA = Math.abs(x - xA);
                                const y = phi1s(rA) * 3;
                                const [sx, sy] = viz.toScreen(x, y);
                                if (!started) { ctx.moveTo(sx, sy); started = true; }
                                else ctx.lineTo(sx, sy);
                            }
                            ctx.stroke();
                            // phi_B
                            ctx.beginPath();
                            started = false;
                            for (let i = 0; i <= steps; i++) {
                                const x = xMin + (xMax - xMin) * i / steps;
                                const rB = Math.abs(x - xB);
                                const y = phi1s(rB) * 3;
                                const [sx, sy] = viz.toScreen(x, y);
                                if (!started) { ctx.moveTo(sx, sy); started = true; }
                                else ctx.lineTo(sx, sy);
                            }
                            ctx.stroke();
                            ctx.setLineDash([]);

                            // Draw |psi|^2 (electron density) below
                            const densityOffset = -3.5;
                            ctx.strokeStyle = showBonding ? viz.colors.teal : viz.colors.orange;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            started = false;
                            for (let i = 0; i <= steps; i++) {
                                const x = xMin + (xMax - xMin) * i / steps;
                                const rA = Math.abs(x - xA);
                                const rB = Math.abs(x - xB);
                                const psi = norm * (phi1s(rA) + sign * phi1s(rB));
                                const density = psi * psi * 8; // scale
                                const [sx, sy] = viz.toScreen(x, density + densityOffset);
                                if (!started) { ctx.moveTo(sx, sy); started = true; }
                                else ctx.lineTo(sx, sy);
                            }
                            ctx.stroke();

                            // Zero line for density
                            viz.drawSegment(-7, densityOffset, 7, densityOffset, viz.colors.axis + '44', 1, true);

                            // Labels
                            const label = showBonding ? '\u03C8\u208A = \u03C3g (bonding)' : '\u03C8\u208B = \u03C3u* (antibonding)';
                            viz.screenText(label, viz.width / 2, 20, showBonding ? viz.colors.blue : viz.colors.red, 14, 'center');
                            viz.screenText('\u03C8(x)', 20, 80, viz.colors.text, 11, 'left');
                            viz.screenText('|\u03C8|\u00B2', 20, viz.height - 60, viz.colors.text, 11, 'left');
                            viz.screenText('R = ' + R.toFixed(1) + ' a\u2080', viz.width / 2, viz.height - 15, viz.colors.text, 11, 'center');
                            viz.screenText('S = ' + S.toFixed(3), viz.width / 2 + 120, viz.height - 15, viz.colors.teal, 11, 'center');

                            // Highlight button state
                            bondBtn.style.borderColor = showBonding ? '#58a6ff' : '#30363d';
                            bondBtn.style.color = showBonding ? '#58a6ff' : '#c9d1d9';
                            antiBtn.style.borderColor = !showBonding ? '#f85149' : '#30363d';
                            antiBtn.style.color = !showBonding ? '#f85149' : '#c9d1d9';
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show that the overlap integral \\(S = \\langle \\phi_A | \\phi_B \\rangle\\) satisfies \\(0 \\leq S \\leq 1\\) and find its value at \\(R = 0\\) and \\(R \\to \\infty\\).',
                    hint: 'At \\(R = 0\\), the two orbitals coincide. At \\(R \\to \\infty\\), they do not overlap.',
                    solution: 'At \\(R = 0\\): \\(\\phi_A = \\phi_B\\), so \\(S = \\langle \\phi_A | \\phi_A \\rangle = 1\\). Using the formula: \\(S = e^0(1 + 0 + 0) = 1\\). At \\(R \\to \\infty\\): \\(S = e^{-R}(1 + R + R^2/3) \\to 0\\) since the exponential decay dominates. Since the orbitals are real and normalized, by Cauchy-Schwarz, \\(0 \\leq S \\leq 1\\).'
                },
                {
                    question: 'At the midpoint between the two nuclei (\\(x = 0\\), \\(r_A = r_B = R/2\\)), compute the ratio of electron density in the bonding vs. antibonding orbitals.',
                    hint: 'Evaluate \\(|\\psi_+|^2/|\\psi_-|^2\\) at the midpoint.',
                    solution: 'At \\(r_A = r_B = R/2\\): \\(\\phi_A = \\phi_B = \\phi_0\\). Bonding: \\(\\psi_+ = 2\\phi_0/\\sqrt{2(1+S)}\\), so \\(|\\psi_+|^2 = 4\\phi_0^2/[2(1+S)] = 2\\phi_0^2/(1+S)\\). Antibonding: \\(\\psi_- = 0\\) (exact node at the midpoint!). The ratio is infinite: the antibonding orbital has zero density at the midpoint, while the bonding orbital has maximum constructive interference there.'
                },
                {
                    question: 'Derive the secular equation for the LCAO coefficients \\(c_A, c_B\\) by minimizing the Rayleigh quotient.',
                    hint: 'Write \\(E = \\langle\\psi|\\hat{H}|\\psi\\rangle/\\langle\\psi|\\psi\\rangle\\) with \\(\\psi = c_A\\phi_A + c_B\\phi_B\\) and set \\(\\partial E/\\partial c_A = \\partial E/\\partial c_B = 0\\).',
                    solution: 'Numerator: \\(c_A^2 H_{AA} + 2c_A c_B H_{AB} + c_B^2 H_{BB}\\). Denominator: \\(c_A^2 + 2c_A c_B S + c_B^2\\). Setting \\(\\partial E/\\partial c_A = 0\\) (using the quotient rule): \\(c_A(H_{AA} - E) + c_B(H_{AB} - ES) = 0\\). Similarly for \\(c_B\\): \\(c_A(H_{AB} - ES) + c_B(H_{BB} - E) = 0\\). For non-trivial solutions, the determinant must vanish: \\(\\begin{vmatrix} H_{AA}-E & H_{AB}-ES \\\\ H_{AB}-ES & H_{BB}-E \\end{vmatrix} = 0\\).'
                },
                {
                    question: 'The LCAO equilibrium bond length of H\\(_2^+\\) is \\(R_e \\approx 2.49\\) a\\(_0\\) with energy \\(E \\approx -0.565\\) Ha. The exact values are \\(R_e = 2.00\\) a\\(_0\\) and \\(E = -0.6026\\) Ha. Why is the LCAO result so poor?',
                    hint: 'Think about the flexibility of the trial function.',
                    solution: 'The LCAO trial function uses only two basis functions (\\(1s\\) AOs on each center) with no variational parameters for the orbital exponents. This basis is too inflexible: (1) the exponent is fixed at \\(\\zeta = 1\\) (appropriate for a free H atom but not the molecular environment where the effective charge changes); (2) no higher angular momentum (\\(p, d\\)) functions are included to describe polarization of the electron cloud; (3) no diffuse functions for the long-range tail. Adding a variational exponent \\(\\zeta\\) and/or more basis functions dramatically improves the result.'
                },
                {
                    question: 'Show that the antibonding orbital \\(\\psi_-\\) is destabilized more than the bonding orbital \\(\\psi_+\\) is stabilized, relative to the atomic energy \\(H_{AA}\\).',
                    hint: 'Compare \\(|E_+ - H_{AA}|\\) and \\(|E_- - H_{AA}|\\), noting that \\(S > 0\\).',
                    solution: 'Destabilization of antibonding: \\(E_- - H_{AA} = (H_{AA} - H_{AB})/(1 - S) - H_{AA} = -(H_{AB} - H_{AA}S)/(1-S)\\). Stabilization of bonding: \\(H_{AA} - E_+ = H_{AA} - (H_{AA} + H_{AB})/(1 + S) = (H_{AA}S - H_{AB})/(1+S) = (H_{AB} - H_{AA}S)/(1+S)\\). Since \\(S > 0\\), the denominator \\(1 - S < 1 + S\\), so the magnitude of the destabilization exceeds the stabilization: \\(|E_- - H_{AA}| = |H_{AB} - H_{AA}S|/(1-S) > |H_{AB} - H_{AA}S|/(1+S) = |E_+ - H_{AA}|\\). The asymmetry is due to the overlap integral.'
                }
            ]
        },

        // ========== SECTION 3: Molecular Orbital Diagrams ==========
        {
            id: 'sec03-mo-diagrams',
            title: 'Molecular Orbital Diagrams',
            content: `
<h2>3.3 Molecular Orbital Diagrams</h2>

<p>For homonuclear diatomic molecules (A\\(_2\\)), molecular orbitals can be classified by their symmetry properties. The LCAO approach generalizes from H\\(_2^+\\): atomic orbitals on both atoms combine to form bonding and antibonding MOs, and the relative energies of these MOs determine the electronic structure, bond order, and magnetic properties of the molecule.</p>

<h3>Symmetry Classification</h3>

<div class="env-block definition">
<div class="env-title">Definition 3.3.1 (MO Symmetry Labels)</div>
<div class="env-body">
<p>Molecular orbitals for a homonuclear diatomic are labeled by:</p>
<ul>
<li><strong>\\(\\sigma\\) vs. \\(\\pi\\):</strong> \\(\\sigma\\) orbitals are cylindrically symmetric about the bond axis (\\(m_l = 0\\) along the axis); \\(\\pi\\) orbitals have a nodal plane containing the bond axis (\\(|m_l| = 1\\)).</li>
<li><strong>\\(g\\) vs. \\(u\\):</strong> gerade (\\(g\\), even) orbitals are symmetric under inversion through the bond center; ungerade (\\(u\\), odd) are antisymmetric.</li>
<li><strong>Bonding vs. antibonding:</strong> Antibonding MOs are denoted with an asterisk (\\(^*\\)).</li>
</ul>
</div>
</div>

<h3>Building MO Diagrams for Homonuclear Diatomics</h3>

<p>For second-row homonuclear diatomics (Li\\(_2\\) through Ne\\(_2\\)), the atomic \\(1s\\), \\(2s\\), and \\(2p\\) orbitals combine as follows:</p>

<ul>
<li>\\(1s + 1s \\to \\sigma_{1s}\\) (bonding) and \\(\\sigma_{1s}^*\\) (antibonding)</li>
<li>\\(2s + 2s \\to \\sigma_{2s}\\) and \\(\\sigma_{2s}^*\\)</li>
<li>\\(2p_z + 2p_z \\to \\sigma_{2p}\\) and \\(\\sigma_{2p}^*\\) (head-on overlap)</li>
<li>\\(2p_x + 2p_x \\to \\pi_{2p}\\) and \\(\\pi_{2p}^*\\) (side-on overlap; doubly degenerate with \\(2p_y\\))</li>
</ul>

<div class="env-block definition">
<div class="env-title">Definition 3.3.2 (Bond Order)</div>
<div class="env-body">
\\[
\\text{Bond Order} = \\frac{1}{2}(n_b - n_a)
\\]
<p>where \\(n_b\\) is the number of electrons in bonding MOs and \\(n_a\\) is the number in antibonding MOs. A bond order of 0 means no bond (molecule is unstable); 1 is a single bond; 2 is a double bond; 3 is a triple bond.</p>
</div>
</div>

<div class="env-block warning">
<div class="env-title">Warning: The \\(\\sigma\\)-\\(\\pi\\) Ordering Crossover</div>
<div class="env-body">
<p>For O\\(_2\\) and F\\(_2\\) (and Ne\\(_2\\)), the \\(\\sigma_{2p}\\) orbital lies below the \\(\\pi_{2p}\\) orbitals. But for B\\(_2\\), C\\(_2\\), and N\\(_2\\), the ordering is reversed: \\(\\pi_{2p}\\) lies below \\(\\sigma_{2p}\\). This crossover is due to \\(2s\\)-\\(2p\\) mixing (hybridization), which pushes the \\(\\sigma_{2p}\\) orbital up in energy for the lighter elements where the \\(2s\\)-\\(2p\\) energy gap is smaller.</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example 3.3.3 (Key Homonuclear Diatomics)</div>
<div class="env-body">
<p><strong>N\\(_2\\) (14 electrons):</strong> Configuration: \\((\\sigma_{1s})^2(\\sigma_{1s}^*)^2(\\sigma_{2s})^2(\\sigma_{2s}^*)^2(\\pi_{2p})^4(\\sigma_{2p})^2\\). Bond order: \\(\\frac{1}{2}(10 - 4) = 3\\). Triple bond. Diamagnetic.</p>
<p><strong>O\\(_2\\) (16 electrons):</strong> Configuration: \\((\\sigma_{1s})^2(\\sigma_{1s}^*)^2(\\sigma_{2s})^2(\\sigma_{2s}^*)^2(\\sigma_{2p})^2(\\pi_{2p})^4(\\pi_{2p}^*)^2\\). Bond order: \\(\\frac{1}{2}(10 - 6) = 2\\). Double bond. <em>Paramagnetic</em> because the two \\(\\pi_{2p}^*\\) electrons occupy different degenerate orbitals with parallel spins (Hund's rule).</p>
</div>
</div>

<div class="env-block theorem">
<div class="env-title">Theorem 3.3.4 (O\\(_2\\) Paramagnetism)</div>
<div class="env-body">
<p>Molecular orbital theory correctly predicts that O\\(_2\\) is paramagnetic with two unpaired electrons, a result that is <em>impossible</em> to explain with Lewis structures or valence bond theory (which predict all electrons paired in a double bond). This was one of the early triumphs of MO theory.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-mo-diagram"></div>
`,
            visualizations: [
                {
                    id: 'viz-mo-diagram',
                    title: 'MO Diagram Builder for Homonuclear Diatomics',
                    description: 'Select a second-row diatomic molecule to see its molecular orbital diagram, electron filling, bond order, and magnetic properties.',
                    setup(body, controls) {
                        const viz = new VizEngine(body, { width: 650, height: 460 });

                        const molecules = [
                            {name:'Li\u2082', Z:3, totalE:6},
                            {name:'Be\u2082', Z:4, totalE:8},
                            {name:'B\u2082', Z:5, totalE:10},
                            {name:'C\u2082', Z:6, totalE:12},
                            {name:'N\u2082', Z:7, totalE:14},
                            {name:'O\u2082', Z:8, totalE:16},
                            {name:'F\u2082', Z:9, totalE:18},
                            {name:'Ne\u2082', Z:10, totalE:20}
                        ];

                        let selectedIdx = 4; // N2

                        const molDiv = document.createElement('div');
                        molDiv.style.cssText = 'display:flex;gap:4px;flex-wrap:wrap;';
                        molecules.forEach((mol, i) => {
                            const btn = document.createElement('button');
                            btn.style.cssText = 'padding:3px 8px;border:1px solid #30363d;border-radius:4px;background:#1a1a40;color:#c9d1d9;font-size:0.78rem;cursor:pointer;';
                            btn.textContent = mol.name;
                            btn.addEventListener('click', () => { selectedIdx = i; draw(); });
                            molDiv.appendChild(btn);
                        });
                        controls.appendChild(molDiv);

                        // MO levels: [label, energy(relative), type('b'=bonding,'a'=antibonding), degeneracy]
                        // For Z <= 7 (B2,C2,N2): pi below sigma
                        // For Z >= 8 (O2,F2): sigma below pi
                        function getLevels(Z) {
                            if (Z <= 7) {
                                return [
                                    {label:'\u03C3\u2081s',  y:40,  type:'b', deg:1},
                                    {label:'\u03C3*\u2081s', y:80,  type:'a', deg:1},
                                    {label:'\u03C3\u2082s',  y:140, type:'b', deg:1},
                                    {label:'\u03C3*\u2082s', y:180, type:'a', deg:1},
                                    {label:'\u03C0\u2082p',  y:240, type:'b', deg:2},
                                    {label:'\u03C3\u2082p',  y:290, type:'b', deg:1},
                                    {label:'\u03C0*\u2082p', y:340, type:'a', deg:2},
                                    {label:'\u03C3*\u2082p', y:390, type:'a', deg:1}
                                ];
                            } else {
                                return [
                                    {label:'\u03C3\u2081s',  y:40,  type:'b', deg:1},
                                    {label:'\u03C3*\u2081s', y:80,  type:'a', deg:1},
                                    {label:'\u03C3\u2082s',  y:140, type:'b', deg:1},
                                    {label:'\u03C3*\u2082s', y:180, type:'a', deg:1},
                                    {label:'\u03C3\u2082p',  y:240, type:'b', deg:1},
                                    {label:'\u03C0\u2082p',  y:270, type:'b', deg:2},
                                    {label:'\u03C0*\u2082p', y:340, type:'a', deg:2},
                                    {label:'\u03C3*\u2082p', y:390, type:'a', deg:1}
                                ];
                            }
                        }

                        function draw() {
                            viz.clear();
                            const ctx = viz.ctx;
                            const mol = molecules[selectedIdx];
                            const levels = getLevels(mol.Z);
                            const totalE = mol.totalE;

                            // Title
                            viz.screenText(mol.name + ' Molecular Orbital Diagram', viz.width / 2, 20, viz.colors.white, 15, 'center');

                            // Atomic levels on sides
                            const atomX_L = 80, atomX_R = viz.width - 80;
                            const moX = viz.width / 2;
                            const levelW = 40;

                            // Draw atom labels
                            viz.screenText('Atom A', atomX_L, 45, viz.colors.text, 11, 'center');
                            viz.screenText('Atom B', atomX_R, 45, viz.colors.text, 11, 'center');
                            viz.screenText('MOs', moX, 45, viz.colors.teal, 12, 'center');

                            // Atomic energy levels (2s and 2p)
                            const ao2sY = 360, ao2pY = 200;
                            ctx.strokeStyle = viz.colors.muted;
                            ctx.lineWidth = 2;
                            // 2s
                            ctx.beginPath(); ctx.moveTo(atomX_L - levelW/2, ao2sY); ctx.lineTo(atomX_L + levelW/2, ao2sY); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(atomX_R - levelW/2, ao2sY); ctx.lineTo(atomX_R + levelW/2, ao2sY); ctx.stroke();
                            viz.screenText('2s', atomX_L - levelW/2 - 15, ao2sY, viz.colors.muted, 10, 'right');
                            viz.screenText('2s', atomX_R + levelW/2 + 15, ao2sY, viz.colors.muted, 10, 'left');
                            // 2p
                            for (let k = -1; k <= 1; k++) {
                                ctx.beginPath(); ctx.moveTo(atomX_L - levelW/2 + k*15, ao2pY); ctx.lineTo(atomX_L + levelW/2 + k*15, ao2pY); ctx.stroke();
                                ctx.beginPath(); ctx.moveTo(atomX_R - levelW/2 + k*15, ao2pY); ctx.lineTo(atomX_R + levelW/2 + k*15, ao2pY); ctx.stroke();
                            }
                            viz.screenText('2p', atomX_L - levelW/2 - 25, ao2pY, viz.colors.muted, 10, 'right');
                            viz.screenText('2p', atomX_R + levelW/2 + 25, ao2pY, viz.colors.muted, 10, 'left');

                            // Draw MO levels and fill electrons
                            let eRemaining = totalE;
                            let nBonding = 0, nAntibonding = 0;
                            let unpaired = 0;

                            // skip 1s core (4 electrons)
                            const coreLevels = levels.slice(0, 2);
                            const valLevels = levels.slice(2);

                            // Fill core
                            let coreE = 4;
                            for (const lev of coreLevels) {
                                const maxE = lev.deg * 2;
                                const fill = Math.min(coreE, maxE);
                                coreE -= fill;
                                if (lev.type === 'b') nBonding += fill;
                                else nAntibonding += fill;
                            }
                            eRemaining -= 4;

                            // Draw valence MO levels
                            for (const lev of valLevels) {
                                const maxE = lev.deg * 2;
                                const fill = Math.min(eRemaining, maxE);
                                eRemaining -= fill;

                                if (lev.type === 'b') nBonding += fill;
                                else nAntibonding += fill;

                                const yPos = viz.height - lev.y + 30;
                                const col = lev.type === 'b' ? viz.colors.blue : viz.colors.red;

                                if (lev.deg === 1) {
                                    // Single level
                                    ctx.strokeStyle = col;
                                    ctx.lineWidth = 2;
                                    ctx.beginPath();
                                    ctx.moveTo(moX - levelW/2, yPos);
                                    ctx.lineTo(moX + levelW/2, yPos);
                                    ctx.stroke();

                                    // Label
                                    viz.screenText(lev.label, moX + levelW/2 + 10, yPos, col, 10, 'left');

                                    // Electrons
                                    if (fill >= 1) drawArrow(ctx, moX - 6, yPos, true, viz.colors.blue);
                                    if (fill >= 2) drawArrow(ctx, moX + 6, yPos, false, viz.colors.red);
                                    if (fill === 1) unpaired++;

                                    // Connection lines to AOs
                                    ctx.strokeStyle = col + '33';
                                    ctx.lineWidth = 0.5;
                                    const aoY = lev.label.includes('2p') ? ao2pY : ao2sY;
                                    ctx.beginPath(); ctx.moveTo(atomX_L + levelW/2, aoY); ctx.lineTo(moX - levelW/2, yPos); ctx.stroke();
                                    ctx.beginPath(); ctx.moveTo(atomX_R - levelW/2, aoY); ctx.lineTo(moX + levelW/2, yPos); ctx.stroke();
                                } else {
                                    // Doubly degenerate
                                    for (let d = 0; d < 2; d++) {
                                        const dx = (d === 0) ? -25 : 25;
                                        ctx.strokeStyle = col;
                                        ctx.lineWidth = 2;
                                        ctx.beginPath();
                                        ctx.moveTo(moX + dx - levelW/3, yPos);
                                        ctx.lineTo(moX + dx + levelW/3, yPos);
                                        ctx.stroke();

                                        // Fill this degenerate orbital
                                        const orbFill = Math.min(fill - d * 2, 2);
                                        if (d === 0 && fill >= 1) {
                                            // Hund's rule: fill each degen orbital singly first
                                            if (fill <= 2) {
                                                // 1 or 2 electrons: one in each
                                                drawArrow(ctx, moX + dx, yPos, true, viz.colors.blue);
                                                if (fill === 1) unpaired++;
                                            } else {
                                                // 3 or 4: first orbital gets 2
                                                drawArrow(ctx, moX + dx - 4, yPos, true, viz.colors.blue);
                                                drawArrow(ctx, moX + dx + 4, yPos, false, viz.colors.red);
                                            }
                                        }
                                        if (d === 1) {
                                            if (fill >= 2 && fill <= 2) {
                                                drawArrow(ctx, moX + dx, yPos, true, viz.colors.blue);
                                                if (fill === 2) unpaired++;
                                            } else if (fill >= 3) {
                                                drawArrow(ctx, moX + dx - 4, yPos, true, viz.colors.blue);
                                                if (fill >= 4) drawArrow(ctx, moX + dx + 4, yPos, false, viz.colors.red);
                                                else unpaired++;
                                            }
                                        }
                                    }
                                    viz.screenText(lev.label, moX + levelW/2 + 35, yPos, col, 10, 'left');

                                    // Connection lines
                                    ctx.strokeStyle = col + '33';
                                    ctx.lineWidth = 0.5;
                                    ctx.beginPath(); ctx.moveTo(atomX_L + levelW/2 + 10, ao2pY); ctx.lineTo(moX - 25 - levelW/3, yPos); ctx.stroke();
                                    ctx.beginPath(); ctx.moveTo(atomX_R - levelW/2 - 10, ao2pY); ctx.lineTo(moX + 25 + levelW/3, yPos); ctx.stroke();
                                }
                            }

                            // Summary info
                            const bondOrder = (nBonding - nAntibonding) / 2;
                            const magnetic = unpaired > 0 ? 'Paramagnetic (' + unpaired + ' unpaired)' : 'Diamagnetic';

                            viz.screenText('Bond Order: ' + bondOrder.toFixed(1), 100, viz.height - 20, viz.colors.teal, 12, 'center');
                            viz.screenText(magnetic, viz.width / 2, viz.height - 20, unpaired > 0 ? viz.colors.orange : viz.colors.green, 12, 'center');
                            viz.screenText('Total e\u207B: ' + mol.totalE, viz.width - 100, viz.height - 20, viz.colors.text, 12, 'center');

                            // Highlight selected button
                            const btns = molDiv.querySelectorAll('button');
                            btns.forEach((btn, i) => {
                                btn.style.borderColor = i === selectedIdx ? '#3fb9a0' : '#30363d';
                                btn.style.color = i === selectedIdx ? '#3fb9a0' : '#c9d1d9';
                            });
                        }

                        function drawArrow(ctx, x, y, up, color) {
                            const len = 12;
                            const dir = up ? -1 : 1;
                            ctx.strokeStyle = color;
                            ctx.lineWidth = 1.5;
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

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Determine the bond order and predict the magnetic behavior of B\\(_2\\) (10 electrons).',
                    hint: 'For B\\(_2\\), the \\(\\pi_{2p}\\) orbitals lie below \\(\\sigma_{2p}\\). After filling core and \\(\\sigma_{2s}, \\sigma_{2s}^*\\), two electrons remain for the \\(\\pi_{2p}\\) level.',
                    solution: 'Configuration: \\((\\sigma_{1s})^2(\\sigma_{1s}^*)^2(\\sigma_{2s})^2(\\sigma_{2s}^*)^2(\\pi_{2p})^2\\). The two \\(\\pi_{2p}\\) electrons go into the two degenerate \\(\\pi\\) orbitals with parallel spins (Hund). Bonding electrons: 8, antibonding: 4. Bond order: \\((8-4)/2 = 2\\)... wait, let me recount. \\(\\sigma_{1s}(2)\\): bonding. \\(\\sigma_{1s}^*(2)\\): antibonding. \\(\\sigma_{2s}(2)\\): bonding. \\(\\sigma_{2s}^*(2)\\): antibonding. \\(\\pi_{2p}(2)\\): bonding. So bonding = 6, antibonding = 4, bond order = 1. B\\(_2\\) is paramagnetic with 2 unpaired electrons.'
                },
                {
                    question: 'Use MO theory to explain why He\\(_2\\) does not form a stable molecule.',
                    hint: 'He\\(_2\\) has 4 electrons. Fill the \\(\\sigma_{1s}\\) and \\(\\sigma_{1s}^*\\) orbitals.',
                    solution: 'He\\(_2\\): 4 electrons fill \\((\\sigma_{1s})^2(\\sigma_{1s}^*)^2\\). Bonding electrons: 2, antibonding: 2. Bond order = \\((2-2)/2 = 0\\). Zero bond order means no net bonding interaction. Furthermore, the antibonding orbital is destabilized more than the bonding orbital is stabilized (due to overlap), so the total energy is actually higher than two separated He atoms. He\\(_2\\) does not exist as a stable molecule.'
                },
                {
                    question: 'The ionization of O\\(_2\\) to O\\(_2^+\\) removes an electron from the \\(\\pi_{2p}^*\\) orbital. Predict the bond order of O\\(_2^+\\) and whether it should have a shorter or longer bond than O\\(_2\\).',
                    hint: 'Removing an antibonding electron changes the bond order.',
                    solution: 'O\\(_2\\) bond order = 2. Removing one \\(\\pi_{2p}^*\\) electron: bonding = 10, antibonding = 5. Bond order of O\\(_2^+\\) = \\((10-5)/2 = 2.5\\). Higher bond order means stronger, shorter bond. Indeed, the bond length of O\\(_2^+\\) (1.12 A) is shorter than O\\(_2\\) (1.21 A), and the stretching frequency is higher.'
                },
                {
                    question: 'Draw the MO diagram for C\\(_2\\) and determine if it has a double bond despite having no \\(\\sigma\\) bond in the valence shell.',
                    hint: 'C\\(_2\\) has 12 electrons. Use the \\(Z \\leq 7\\) ordering where \\(\\pi_{2p}\\) lies below \\(\\sigma_{2p}\\).',
                    solution: 'C\\(_2\\) (12e): \\((\\sigma_{1s})^2(\\sigma_{1s}^*)^2(\\sigma_{2s})^2(\\sigma_{2s}^*)^2(\\pi_{2p})^4\\). Bond order: bonding = 8 (2+2+4), antibonding = 4 (2+2). Bond order = \\((8-4)/2 = 2\\). Remarkably, the double bond consists entirely of two \\(\\pi\\) bonds with no \\(\\sigma\\) bond in the valence shell. This unusual electronic structure is confirmed experimentally (C\\(_2\\) exists in flames and comets).'
                },
                {
                    question: 'Predict the bond orders of N\\(_2\\), N\\(_2^+\\), and N\\(_2^-\\). Which has the strongest bond?',
                    hint: 'N\\(_2\\) has 14 electrons. Adding or removing one gives 15 or 13.',
                    solution: 'N\\(_2\\) (14e): bond order = 3. N\\(_2^+\\) (13e, remove from \\(\\sigma_{2p}\\)): bond order = 2.5. N\\(_2^-\\) (15e, add to \\(\\pi_{2p}^*\\)): bond order = 2.5. N\\(_2\\) has the highest bond order (3) and the strongest bond. Both the cation and anion have bond order 2.5 and weaker bonds. N\\(_2\\) has one of the strongest bonds in chemistry (945 kJ/mol), reflected in the inertness of molecular nitrogen.'
                }
            ]
        },

        // ========== SECTION 4: Heteronuclear Diatomics ==========
        {
            id: 'sec04-heteronuclear',
            title: 'Heteronuclear Diatomics',
            content: `
<h2>3.4 Heteronuclear Diatomics</h2>

<p>When the two atoms in a diatomic molecule are different (heteronuclear), the perfect symmetry of homonuclear diatomics is broken. The atomic orbitals on the two centers have different energies, and the molecular orbitals are no longer equal mixtures of the two AOs. This leads to <em>polar bonds</em> and provides the quantum mechanical foundation for electronegativity.</p>

<h3>Unequal LCAO Coefficients</h3>

<div class="env-block theorem">
<div class="env-title">Theorem 3.4.1 (Heteronuclear LCAO)</div>
<div class="env-body">
<p>For a heteronuclear diatomic AB, the molecular orbitals have the form:</p>
\\[
\\psi = c_A \\phi_A + c_B \\phi_B
\\]
<p>where in general \\(|c_A| \\neq |c_B|\\). If atom B is more electronegative (lower AO energy, \\(\\alpha_B < \\alpha_A\\) where \\(\\alpha = \\langle\\phi|\\hat{H}|\\phi\\rangle\\)), then:</p>
<ul>
<li>In the <em>bonding</em> MO: \\(|c_B| > |c_A|\\). The electron density is concentrated on the more electronegative atom.</li>
<li>In the <em>antibonding</em> MO: \\(|c_A| > |c_B|\\). The electron density is concentrated on the less electronegative atom.</li>
</ul>
</div>
</div>

<div class="env-block proof">
<div class="env-title">Proof</div>
<div class="env-body">
<p>The secular equation for a heteronuclear diatomic is:</p>
\\[
\\begin{vmatrix}
\\alpha_A - E & \\beta - ES \\\\
\\beta - ES & \\alpha_B - E
\\end{vmatrix} = 0
\\]
<p>where \\(\\alpha_A = H_{AA}\\), \\(\\alpha_B = H_{BB}\\), and \\(\\beta = H_{AB}\\). For the bonding solution \\(E_+\\), the ratio \\(c_A/c_B = -(\\beta - E_+ S)/(\\alpha_A - E_+)\\). Since \\(E_+\\) is closer to the lower energy \\(\\alpha_B\\), and \\(\\beta < 0\\), one finds \\(|c_B| > |c_A|\\) for the bonding MO.</p>
<div class="qed">&#8718;</div>
</div>
</div>

<h3>Polarity and Electronegativity</h3>

<div class="env-block definition">
<div class="env-title">Definition 3.4.2 (Bond Polarity)</div>
<div class="env-body">
<p>The <em>polarity</em> of a bond is determined by the asymmetry of the electron density. A useful measure is the <em>charge parameter</em>:</p>
\\[
\\lambda = \\frac{|c_B|^2 - |c_A|^2}{|c_A|^2 + |c_B|^2}
\\]
<p>\\(\\lambda = 0\\) for a homonuclear (nonpolar) bond, and \\(\\lambda \\to 1\\) for a purely ionic bond where all electron density resides on atom B.</p>
</div>
</div>

<div class="env-block intuition">
<div class="env-title">The Ionic-Covalent Spectrum</div>
<div class="env-body">
<p>Every heteronuclear bond lies on a spectrum between purely covalent (\\(c_A = c_B\\)) and purely ionic (\\(c_B \\gg c_A\\)). The LCAO framework naturally interpolates between these limits. When the energy difference \\(|\\alpha_A - \\alpha_B|\\) is small compared to the coupling \\(|\\beta|\\), the bond is nearly covalent. When \\(|\\alpha_A - \\alpha_B| \\gg |\\beta|\\), the bonding MO is essentially the lower-energy AO, and the bond is nearly ionic.</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example 3.4.3 (HF: Hydrogen Fluoride)</div>
<div class="env-body">
<p>In HF, the relevant AOs are H \\(1s\\) (\\(\\alpha_H = -13.6\\) eV) and F \\(2p\\) (\\(\\alpha_F = -18.6\\) eV). Since fluorine is much more electronegative, \\(\\alpha_F < \\alpha_H\\), and the bonding MO has more F \\(2p\\) character:</p>
\\[
\\psi_\\text{bond} \\approx 0.33\\,\\phi_{H,1s} + 0.94\\,\\phi_{F,2p_z}
\\]
<p>The electron density is strongly shifted toward F, giving HF a large dipole moment (1.83 D). The \\(|c_F|^2 \\approx 0.88\\), meaning about 88% of the bonding electron density resides on fluorine.</p>
</div>
</div>

<h3>Non-Bonding Orbitals</h3>

<div class="env-block remark">
<div class="env-title">Remark 3.4.4 (Lone Pairs as Non-Bonding MOs)</div>
<div class="env-body">
<p>In HF, the F \\(2p_x\\) and \\(2p_y\\) orbitals (perpendicular to the bond axis) have zero overlap with the H \\(1s\\) orbital by symmetry. These remain unchanged as <em>non-bonding</em> molecular orbitals, localized entirely on fluorine. They correspond to the "lone pairs" of Lewis structure theory. The F \\(2s\\) orbital also has poor overlap with H \\(1s\\) due to the energy mismatch and is essentially non-bonding.</p>
</div>
</div>
`,
            visualizations: [],
            exercises: [
                {
                    question: 'For a heteronuclear diatomic AB with \\(\\alpha_A = -10\\) eV, \\(\\alpha_B = -14\\) eV, \\(\\beta = -3\\) eV, and \\(S = 0\\) (neglecting overlap), find the bonding and antibonding energies.',
                    hint: 'With \\(S = 0\\), the secular equation simplifies to \\((\\alpha_A - E)(\\alpha_B - E) - \\beta^2 = 0\\).',
                    solution: 'The secular equation is \\(E^2 - (\\alpha_A + \\alpha_B)E + \\alpha_A\\alpha_B - \\beta^2 = 0\\). Substituting: \\(E^2 + 24E + 140 - 9 = 0\\), i.e., \\(E^2 + 24E + 131 = 0\\). Using the quadratic formula: \\(E = (-24 \\pm \\sqrt{576 - 524})/2 = (-24 \\pm \\sqrt{52})/2 = (-24 \\pm 7.21)/2\\). Bonding: \\(E_+ = -15.61\\) eV; antibonding: \\(E_- = -8.39\\) eV.'
                },
                {
                    question: 'In the limit \\(|\\alpha_A - \\alpha_B| \\gg |\\beta|\\), show that the bonding energy approaches \\(\\alpha_B\\) (the lower AO energy) and the antibonding approaches \\(\\alpha_A\\).',
                    hint: 'Expand the quadratic solution for the secular equation in the limit of large \\(\\Delta\\alpha = \\alpha_A - \\alpha_B\\).',
                    solution: 'With \\(S = 0\\), \\(E_\\pm = \\frac{\\alpha_A + \\alpha_B}{2} \\pm \\frac{1}{2}\\sqrt{(\\alpha_A - \\alpha_B)^2 + 4\\beta^2}\\). When \\(|\\Delta\\alpha| \\gg |\\beta|\\): \\(\\sqrt{\\Delta\\alpha^2 + 4\\beta^2} \\approx |\\Delta\\alpha|(1 + 2\\beta^2/\\Delta\\alpha^2)\\). So \\(E_+ \\approx \\alpha_B - \\beta^2/\\Delta\\alpha\\) and \\(E_- \\approx \\alpha_A + \\beta^2/\\Delta\\alpha\\). In the extreme ionic limit, the bonding MO is essentially the lower AO with a small perturbative correction.'
                },
                {
                    question: 'Explain why CO (carbon monoxide) has a small dipole moment despite the large electronegativity difference between C and O.',
                    hint: 'Consider the direction of the \\(\\sigma\\) bond polarity versus the lone pair on carbon.',
                    solution: 'In CO, the \\(\\sigma\\) bonding MOs have more oxygen character (oxygen is more electronegative), creating a C\\(^+\\)O\\(^-\\) bond polarity. However, the lone pair on carbon (the HOMO, a \\(\\sigma\\) orbital directed away from O) places significant electron density on the carbon side. These two effects partially cancel: the bond polarity favors C\\(^+\\)O\\(^-\\), but the carbon lone pair contributes a C\\(^-\\)O\\(^+\\) dipole. The net dipole is small (0.11 D) and actually points toward carbon (C\\(^-\\)O\\(^+\\)), contrary to the naive electronegativity prediction.'
                },
                {
                    question: 'For HCl, the relevant overlap is between H \\(1s\\) and Cl \\(3p_z\\). If \\(\\alpha_H = -13.6\\) eV and \\(\\alpha_{Cl} = -15.5\\) eV, qualitatively predict the LCAO coefficients.',
                    hint: 'The energy difference is moderate. How does this compare to the HF case?',
                    solution: 'The energy gap \\(|\\Delta\\alpha| = 1.9\\) eV is much smaller than in HF (\\(5.0\\) eV). The bonding MO has more Cl character but not as dramatically as in HF: \\(\\psi_\\text{bond} = c_H \\phi_{H} + c_{Cl} \\phi_{Cl}\\) with \\(|c_{Cl}| > |c_H|\\) but the ratio is closer to 1. The bond is less polar than HF, consistent with HCl having a smaller dipole moment (1.08 D vs. 1.83 D for HF).'
                },
                {
                    question: 'Why do the \\(g/u\\) symmetry labels disappear for heteronuclear diatomics?',
                    hint: 'What operation defines \\(g\\) and \\(u\\)?',
                    solution: 'The \\(g/u\\) classification requires an inversion center (a point through which the molecule looks the same when inverted). Homonuclear diatomics have an inversion center at the bond midpoint. Heteronuclear diatomics do not: inverting through the midpoint maps atom A to the position of atom B and vice versa, but since they are different atoms, the molecule is not invariant. Without inversion symmetry, the \\(g/u\\) labels are undefined. The \\(\\sigma/\\pi\\) labels (based on rotational symmetry about the bond axis) remain valid.'
                }
            ]
        },

        // ========== SECTION 5: From Diatomics to Polyatomics ==========
        {
            id: 'sec05-polyatomics-huckel',
            title: 'From Diatomics to Polyatomics',
            content: `
<h2>3.5 From Diatomics to Polyatomics</h2>

<p>The LCAO-MO framework extends naturally from diatomics to polyatomic molecules. For large molecules, the size of the secular determinant grows, but the same variational principle applies. In this section, we introduce <em>Huckel molecular orbital theory</em>, a remarkably simple and instructive model for the \\(\\pi\\) electrons of conjugated systems, and briefly preview the role of molecular symmetry.</p>

<h3>Huckel Theory</h3>

<div class="env-block definition">
<div class="env-title">Definition 3.5.1 (Huckel Approximations)</div>
<div class="env-body">
<p>Huckel theory treats only the \\(\\pi\\) electrons in conjugated planar molecules, using the following simplifications:</p>
<ol>
<li>Each carbon contributes one \\(2p_z\\) orbital perpendicular to the molecular plane.</li>
<li>The Coulomb integral is the same for all carbons: \\(H_{ii} = \\alpha\\).</li>
<li>The resonance integral is non-zero only for bonded pairs: \\(H_{ij} = \\beta\\) if \\(i\\) and \\(j\\) are bonded, 0 otherwise. (\\(\\beta < 0\\).)</li>
<li>The overlap matrix is the identity: \\(S_{ij} = \\delta_{ij}\\).</li>
</ol>
<p>These reduce the secular equation to \\(\\det(\\mathbf{H} - E\\mathbf{I}) = 0\\), where \\(\\mathbf{H}\\) is determined entirely by the molecular connectivity.</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example 3.5.2 (Ethylene, C\\(_2\\)H\\(_4\\))</div>
<div class="env-body">
<p>Two carbon \\(2p_z\\) orbitals, bonded. The secular determinant:</p>
\\[
\\begin{vmatrix}
\\alpha - E & \\beta \\\\
\\beta & \\alpha - E
\\end{vmatrix} = 0
\\]
<p>Let \\(x = (\\alpha - E)/\\beta\\). Then \\(x^2 - 1 = 0\\), giving \\(x = \\pm 1\\), so \\(E = \\alpha \\mp \\beta\\). Since \\(\\beta < 0\\), the bonding level is \\(E_1 = \\alpha + |\\beta|\\) (lower) and the antibonding level is \\(E_2 = \\alpha - |\\beta|\\) (higher). Two \\(\\pi\\) electrons fill the bonding orbital: \\(\\pi\\) bond energy = \\(2(\\alpha + |\\beta|) - 2\\alpha = 2|\\beta|\\).</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example 3.5.3 (Butadiene, C\\(_4\\)H\\(_6\\))</div>
<div class="env-body">
<p>Four carbons in a chain. The Huckel matrix:</p>
\\[
\\mathbf{H} = \\begin{pmatrix}
\\alpha & \\beta & 0 & 0 \\\\
\\beta & \\alpha & \\beta & 0 \\\\
0 & \\beta & \\alpha & \\beta \\\\
0 & 0 & \\beta & \\alpha
\\end{pmatrix}
\\]
<p>The eigenvalues are \\(E_k = \\alpha + 2\\beta\\cos\\!\\left(\\frac{k\\pi}{5}\\right)\\) for \\(k = 1, 2, 3, 4\\), giving:</p>
\\[
E_1 = \\alpha + 1.618|\\beta|, \\quad E_2 = \\alpha + 0.618|\\beta|, \\quad E_3 = \\alpha - 0.618|\\beta|, \\quad E_4 = \\alpha - 1.618|\\beta|
\\]
<p>Four \\(\\pi\\) electrons fill \\(E_1\\) and \\(E_2\\). Total \\(\\pi\\) energy: \\(4\\alpha + 4.472|\\beta|\\). The delocalization energy (compared to two isolated ethylene \\(\\pi\\) bonds) is \\(4.472|\\beta| - 4|\\beta| = 0.472|\\beta|\\), showing that conjugation stabilizes the molecule.</p>
</div>
</div>

<div class="env-block theorem">
<div class="env-title">Theorem 3.5.4 (Huckel Energies for Linear Polyenes)</div>
<div class="env-body">
<p>For a linear conjugated chain of \\(n\\) carbon atoms, the Huckel orbital energies are:</p>
\\[
E_k = \\alpha + 2\\beta\\cos\\!\\left(\\frac{k\\pi}{n + 1}\\right), \\qquad k = 1, 2, \\ldots, n
\\]
</div>
</div>

<div class="env-block theorem">
<div class="env-title">Theorem 3.5.5 (Huckel Energies for Cyclic Systems)</div>
<div class="env-body">
<p>For a cyclic conjugated system with \\(n\\) carbon atoms (annulene), the Huckel orbital energies are:</p>
\\[
E_k = \\alpha + 2\\beta\\cos\\!\\left(\\frac{2\\pi k}{n}\\right), \\qquad k = 0, 1, \\ldots, n-1
\\]
<p>The lowest level (\\(k = 0\\)) is non-degenerate, and higher levels come in degenerate pairs (Frost circle mnemonic).</p>
</div>
</div>

<div class="env-block corollary">
<div class="env-title">Corollary 3.5.6 (Huckel's Rule)</div>
<div class="env-body">
<p>A planar cyclic conjugated molecule is <em>aromatic</em> (extra stable) if it has \\(4n + 2\\) \\(\\pi\\) electrons (\\(n = 0, 1, 2, \\ldots\\)), and <em>antiaromatic</em> (destabilized) if it has \\(4n\\) \\(\\pi\\) electrons. This follows directly from the degeneracy pattern of the cyclic Huckel eigenvalues: \\(4n + 2\\) electrons exactly fill all bonding levels, while \\(4n\\) electrons leave degenerate levels half-filled.</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example 3.5.7 (Benzene)</div>
<div class="env-body">
<p>Benzene (\\(n = 6\\)) is the prototypical aromatic molecule. The Huckel energies are \\(E_k = \\alpha + 2\\beta\\cos(2\\pi k/6)\\) for \\(k = 0, \\ldots, 5\\):</p>
\\[
E_0 = \\alpha + 2|\\beta|, \\quad E_1 = E_5 = \\alpha + |\\beta|, \\quad E_2 = E_4 = \\alpha - |\\beta|, \\quad E_3 = \\alpha - 2|\\beta|
\\]
<p>Six \\(\\pi\\) electrons fill \\(E_0\\), \\(E_1\\), and \\(E_5\\): total \\(\\pi\\) energy = \\(6\\alpha + 8|\\beta|\\). Compared to three isolated double bonds (\\(6\\alpha + 6|\\beta|\\)), the delocalization energy is \\(2|\\beta| \\approx 150\\) kJ/mol, agreeing well with experimental estimates of benzene's aromatic stabilization.</p>
</div>
</div>

<h3>Symmetry and Group Theory Preview</h3>

<div class="env-block remark">
<div class="env-title">Remark 3.5.8 (The Power of Symmetry)</div>
<div class="env-body">
<p>For polyatomic molecules, group theory provides a systematic way to classify molecular orbitals by their symmetry properties (irreducible representations of the molecular point group). Symmetry determines:</p>
<ul>
<li>Which AOs can combine (only AOs of the same symmetry species mix).</li>
<li>The degeneracy of MOs (determined by the dimension of the irreducible representation).</li>
<li>Selection rules for spectroscopic transitions.</li>
</ul>
<p>For benzene (point group \\(D_{6h}\\)), the six \\(\\pi\\) MOs transform as \\(a_{2u} + e_{1g} + e_{2u} + b_{2g}\\), which immediately gives the degeneracy pattern (1, 2, 2, 1) matching the Huckel result. Group theory is developed fully in Chapter 5.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-huckel-calc"></div>
`,
            visualizations: [
                {
                    id: 'viz-huckel-calc',
                    title: 'Huckel \u03C0-Orbital Calculator',
                    description: 'Compute Huckel energy levels for linear chains and cyclic systems. Adjust the number of carbons and see the orbital energies.',
                    setup(body, controls) {
                        const viz = new VizEngine(body, { width: 620, height: 420 });

                        let nCarbon = 6;
                        let isCyclic = true;

                        VizEngine.createSlider(controls, 'n', 2, 12, nCarbon, 1, (v) => {
                            nCarbon = Math.round(v);
                            draw();
                        });

                        const cycBtn = VizEngine.createButton(controls, 'Cyclic', () => { isCyclic = true; draw(); });
                        const linBtn = VizEngine.createButton(controls, 'Linear', () => { isCyclic = false; draw(); });

                        function getEnergies(n, cyclic) {
                            const energies = [];
                            if (cyclic) {
                                for (let k = 0; k < n; k++) {
                                    energies.push(2 * Math.cos(2 * Math.PI * k / n));
                                }
                            } else {
                                for (let k = 1; k <= n; k++) {
                                    energies.push(2 * Math.cos(Math.PI * k / (n + 1)));
                                }
                            }
                            energies.sort((a, b) => b - a); // descending (most bonding first)
                            return energies;
                        }

                        function draw() {
                            viz.clear();
                            const ctx = viz.ctx;
                            const W = viz.width, H = viz.height;

                            const energies = getEnergies(nCarbon, isCyclic);
                            const nElec = nCarbon; // one pi electron per C

                            // Title
                            const typeLabel = isCyclic ? 'Cyclic' : 'Linear';
                            viz.screenText(typeLabel + ' C' + nCarbon + ' Huckel \u03C0-Orbitals', W / 2, 22, viz.colors.white, 14, 'center');

                            // Energy diagram area
                            const padL = 100, padR = 200, padT = 50, padB = 50;
                            const plotW = W - padL - padR;
                            const plotH = H - padT - padB;

                            // Energy range
                            const eMax = 2.5, eMin = -2.5;
                            function toY(e) { return padT + (eMax - e) / (eMax - eMin) * plotH; }

                            // Draw energy axis
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(padL - 10, padT);
                            ctx.lineTo(padL - 10, H - padB);
                            ctx.stroke();

                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'right';
                            for (let e = -2; e <= 2; e++) {
                                const y = toY(e);
                                ctx.fillText('\u03B1 ' + (e >= 0 ? '+' : '') + e + '\u03B2', padL - 15, y + 3);
                                ctx.strokeStyle = viz.colors.grid;
                                ctx.beginPath();
                                ctx.moveTo(padL - 10, y);
                                ctx.lineTo(padL + plotW, y);
                                ctx.stroke();
                            }

                            // Alpha line
                            ctx.strokeStyle = viz.colors.yellow + '44';
                            ctx.lineWidth = 1;
                            ctx.setLineDash([6, 4]);
                            ctx.beginPath();
                            ctx.moveTo(padL - 10, toY(0));
                            ctx.lineTo(padL + plotW, toY(0));
                            ctx.stroke();
                            ctx.setLineDash([]);
                            viz.screenText('\u03B1 (non-bonding)', padL + plotW + 5, toY(0), viz.colors.yellow, 9, 'left');

                            // Group degenerate levels
                            const tol = 0.001;
                            const groups = [];
                            let i = 0;
                            while (i < energies.length) {
                                let j = i;
                                while (j < energies.length && Math.abs(energies[j] - energies[i]) < tol) j++;
                                groups.push({ energy: energies[i], deg: j - i, startIdx: i });
                                i = j;
                            }

                            // Fill electrons
                            let eLeft = nElec;
                            const levelW = 50;

                            for (const grp of groups) {
                                const y = toY(grp.energy);
                                const maxE = grp.deg * 2;
                                const fill = Math.min(eLeft, maxE);
                                eLeft -= fill;

                                const isBonding = grp.energy > tol;
                                const isNonBonding = Math.abs(grp.energy) < tol;
                                const col = isBonding ? viz.colors.blue : (isNonBonding ? viz.colors.yellow : viz.colors.red);

                                // Draw level lines
                                for (let d = 0; d < grp.deg; d++) {
                                    const lx = padL + (plotW - grp.deg * (levelW + 10)) / 2 + d * (levelW + 10);

                                    ctx.strokeStyle = col;
                                    ctx.lineWidth = 2;
                                    ctx.beginPath();
                                    ctx.moveTo(lx, y);
                                    ctx.lineTo(lx + levelW, y);
                                    ctx.stroke();

                                    // Fill electrons (Hund's rule for degenerate)
                                    const elecPerOrb = grp.deg > 1 ?
                                        (fill <= grp.deg ? (d < fill ? 1 : 0) : Math.min(2, fill - grp.deg + (d < fill - grp.deg ? 2 : (d < fill - (fill - grp.deg) * 1 ? 1 : 0)))) :
                                        Math.min(2, fill);

                                    // Simpler electron filling
                                    let eInOrb = 0;
                                    if (grp.deg === 1) {
                                        eInOrb = Math.min(fill, 2);
                                    } else {
                                        // distribute evenly first
                                        const base = Math.floor(fill / grp.deg);
                                        const extra = fill % grp.deg;
                                        eInOrb = base + (d < extra ? 1 : 0);
                                    }

                                    const midX = lx + levelW / 2;
                                    if (eInOrb >= 1) {
                                        drawArrow(ctx, midX - 5, y, true, viz.colors.teal);
                                    }
                                    if (eInOrb >= 2) {
                                        drawArrow(ctx, midX + 5, y, false, viz.colors.orange);
                                    }
                                }

                                // Energy label
                                const labelX = padL + plotW + 10;
                                const eStr = grp.energy > 0 ? '+' + grp.energy.toFixed(3) : grp.energy.toFixed(3);
                                viz.screenText('\u03B1 ' + eStr + '\u03B2' + (grp.deg > 1 ? ' (\u00D7' + grp.deg + ')' : ''), labelX, y, col, 10, 'left');
                            }

                            // Compute total pi energy and delocalization energy
                            let totalPiE = 0;
                            let eLeftCalc = nElec;
                            for (const grp of groups) {
                                const fill = Math.min(eLeftCalc, grp.deg * 2);
                                totalPiE += fill * grp.energy;
                                eLeftCalc -= fill;
                            }
                            const isolatedE = Math.floor(nElec / 2) * 2; // pairs * 2|beta| from ethylene bonds
                            const delocE = totalPiE - isolatedE;

                            // Info box
                            viz.screenText('\u03C0 electrons: ' + nElec, W - 90, H - 80, viz.colors.text, 11, 'center');
                            viz.screenText('Total E\u03C0: ' + nElec + '\u03B1 + ' + totalPiE.toFixed(3) + '|\u03B2|', W - 90, H - 60, viz.colors.teal, 11, 'center');
                            viz.screenText('Deloc. energy: ' + delocE.toFixed(3) + '|\u03B2|', W - 90, H - 40, viz.colors.green, 11, 'center');

                            // Aromatic check for cyclic
                            if (isCyclic) {
                                const mod = nElec % 4;
                                let arom = '';
                                if (mod === 2) arom = 'AROMATIC (4n+2)';
                                else if (mod === 0) arom = 'ANTIAROMATIC (4n)';
                                else arom = 'neither';
                                const aromColor = mod === 2 ? viz.colors.green : (mod === 0 ? viz.colors.red : viz.colors.text);
                                viz.screenText(arom, W / 2, H - 12, aromColor, 12, 'center');
                            }

                            // Button styling
                            cycBtn.style.borderColor = isCyclic ? '#3fb9a0' : '#30363d';
                            cycBtn.style.color = isCyclic ? '#3fb9a0' : '#c9d1d9';
                            linBtn.style.borderColor = !isCyclic ? '#58a6ff' : '#30363d';
                            linBtn.style.color = !isCyclic ? '#58a6ff' : '#c9d1d9';
                        }

                        function drawArrow(ctx, x, y, up, color) {
                            const len = 12;
                            const dir = up ? -1 : 1;
                            ctx.strokeStyle = color;
                            ctx.lineWidth = 1.5;
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

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Solve the Huckel secular determinant for the allyl system (3 carbons in a chain) and find the three orbital energies.',
                    hint: 'The Huckel matrix is tridiagonal. Let \\(x = (\\alpha - E)/\\beta\\) and solve \\(\\det = 0\\).',
                    solution: 'The secular determinant: \\(\\begin{vmatrix} x & 1 & 0 \\\\ 1 & x & 1 \\\\ 0 & 1 & x \\end{vmatrix} = x(x^2 - 1) - x = x^3 - 2x = x(x^2 - 2) = 0\\). Solutions: \\(x = 0, \\pm\\sqrt{2}\\). Energies: \\(E_1 = \\alpha + \\sqrt{2}|\\beta|\\), \\(E_2 = \\alpha\\), \\(E_3 = \\alpha - \\sqrt{2}|\\beta|\\). The middle level is non-bonding (\\(E = \\alpha\\)).'
                },
                {
                    question: 'For cyclobutadiene (\\(n = 4\\), cyclic), determine the Huckel energies and explain why it is antiaromatic.',
                    hint: 'Use \\(E_k = \\alpha + 2\\beta\\cos(2\\pi k/4)\\) for \\(k = 0, 1, 2, 3\\).',
                    solution: 'Energies: \\(E_0 = \\alpha + 2|\\beta|\\); \\(E_1 = E_3 = \\alpha\\) (degenerate, non-bonding); \\(E_2 = \\alpha - 2|\\beta|\\). Four \\(\\pi\\) electrons: 2 fill \\(E_0\\), 2 go into the degenerate \\(E_1 = E_3\\) pair. By Hund\'s rule, these two electrons are unpaired (one in each), making cyclobutadiene a paramagnetic diradical. Total \\(\\pi\\) energy: \\(4\\alpha + 4|\\beta|\\), same as two isolated double bonds (\\(2 \\times 2|\\beta|\\)). No delocalization energy. The \\(4n\\) electron count (\\(n=1\\)) makes it antiaromatic: destabilized relative to the open-chain form, and predicted to be rectangular (Jahn-Teller distortion lifts the degeneracy).'
                },
                {
                    question: 'Calculate the delocalization energy of naphthalene (\\(n = 10\\), treat as two fused six-membered rings) using the Huckel model. You may look up or compute that the Huckel eigenvalues are \\(\\pm 2.303, \\pm 1.618, \\pm 1.303, \\pm 1.000, \\pm 0.618\\) (in units of \\(|\\beta|\\)).',
                    hint: 'Naphthalene has 10 \\(\\pi\\) electrons. Five bonding levels are filled.',
                    solution: 'Total \\(\\pi\\) energy: \\(2(2.303 + 1.618 + 1.303 + 1.000 + 0.618)|\\beta| = 2 \\times 6.842|\\beta| = 13.684|\\beta|\\). Five isolated double bonds would give \\(5 \\times 2|\\beta| = 10|\\beta|\\). Delocalization energy: \\(13.684 - 10 = 3.684|\\beta|\\). With \\(|\\beta| \\approx 75\\) kJ/mol, this is about 276 kJ/mol, consistent with naphthalene\'s high aromatic stability.'
                },
                {
                    question: 'Derive the Huckel energy formula for cyclic systems, \\(E_k = \\alpha + 2\\beta\\cos(2\\pi k/n)\\), by solving the eigenvalue problem with periodic boundary conditions.',
                    hint: 'The Huckel matrix for a cyclic system is a circulant matrix. Try the ansatz \\(c_j = e^{2\\pi i j k/n}\\).',
                    solution: 'The Huckel equation for atom \\(j\\) in a ring: \\(\\beta c_{j-1} + \\alpha c_j + \\beta c_{j+1} = E c_j\\) with \\(c_{j+n} = c_j\\). Substituting \\(c_j = e^{2\\pi i j k/n}\\): \\(\\beta e^{-2\\pi ik/n} + \\alpha + \\beta e^{2\\pi ik/n} = E\\). Using \\(e^{i\\theta} + e^{-i\\theta} = 2\\cos\\theta\\): \\(E = \\alpha + 2\\beta\\cos(2\\pi k/n)\\), \\(k = 0, 1, \\ldots, n-1\\). The ansatz satisfies the periodic boundary condition automatically since \\(c_{j+n} = e^{2\\pi i(j+n)k/n} = e^{2\\pi ijk/n} \\cdot e^{2\\pi ik} = c_j\\).'
                },
                {
                    question: 'Use Huckel theory to explain why the cyclopentadienyl anion C\\(_5\\)H\\(_5^-\\) is aromatic but the cation C\\(_5\\)H\\(_5^+\\) is not.',
                    hint: 'Count the \\(\\pi\\) electrons in each species and apply the \\(4n+2\\) rule.',
                    solution: 'C\\(_5\\)H\\(_5^-\\) (anion): 5 carbons + 1 extra electron = 6 \\(\\pi\\) electrons. \\(6 = 4(1) + 2\\), satisfying Huckel\'s rule. Aromatic. All bonding levels are filled, the non-bonding degenerate pair is completely occupied. C\\(_5\\)H\\(_5^+\\) (cation): 5 carbons - 1 electron = 4 \\(\\pi\\) electrons. \\(4 = 4(1)\\), antiaromatic. The degenerate HOMO pair has only 2 electrons (half-filled), leading to Jahn-Teller instability. This explains why cyclopentadiene (pKa ~16) is unusually acidic for a hydrocarbon: losing H\\(^+\\) creates the aromatic anion.'
                }
            ]
        }
    ]
});
