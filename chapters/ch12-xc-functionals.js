window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch12',
    number: 12,
    title: 'Exchange-Correlation Functionals',
    subtitle: 'Jacob\'s ladder: from LDA to double hybrids',
    sections: [
        // ============================================================
        // SECTION 1: The Local Density Approximation (LDA)
        // ============================================================
        {
            id: 'ch12-sec01',
            title: 'The Local Density Approximation',
            content: `
                <h2>The Local Density Approximation (LDA)</h2>

                <p class="section-roadmap"><strong>Section roadmap.</strong> We develop the simplest approximation to the exchange-correlation functional: the Local Density Approximation (LDA). Starting from the uniform electron gas (UEG), we derive the Dirac exchange formula and discuss parametrizations of the correlation energy by Vosko-Wilk-Nusair (VWN) and Perdew-Wang (PW92).</p>

                <p>In Chapter 11 we established that Kohn-Sham DFT is exact in principle, but requires an approximation to the unknown exchange-correlation functional \\(E_{xc}[\\rho]\\). The simplest and historically first approximation is the <strong>Local Density Approximation</strong>, which treats the electron density at each point as if it were locally a uniform electron gas.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 12.1 (Local Density Approximation)</div>
                    <div class="env-body">
                        <p>The <strong>Local Density Approximation</strong> (LDA) approximates the exchange-correlation energy as</p>
                        \\[E_{xc}^{\\mathrm{LDA}}[\\rho] = \\int \\rho(\\mathbf{r})\\, \\varepsilon_{xc}^{\\mathrm{UEG}}(\\rho(\\mathbf{r}))\\, d\\mathbf{r}\\]
                        <p>where \\(\\varepsilon_{xc}^{\\mathrm{UEG}}(\\rho)\\) is the exchange-correlation energy per electron of a uniform electron gas of density \\(\\rho\\). This decomposes as \\(\\varepsilon_{xc} = \\varepsilon_x + \\varepsilon_c\\).</p>
                    </div>
                </div>

                <h3>The Uniform Electron Gas</h3>

                <p>The uniform electron gas (UEG), also called jellium, is a model system in which electrons move through a uniform positive background charge that maintains overall neutrality. Despite its simplicity, it captures the essential physics of metallic bonding and serves as the reference system for density functional approximations.</p>

                <p>The density of the UEG is characterized by a single parameter, the Wigner-Seitz radius \\(r_s\\), defined by</p>
                \\[\\frac{4}{3}\\pi r_s^3 = \\frac{1}{\\rho}, \\qquad r_s = \\left(\\frac{3}{4\\pi\\rho}\\right)^{1/3}.\\]
                <p>Typical metals have \\(r_s \\approx 2{-}6\\) bohr. Small \\(r_s\\) corresponds to high density (kinetic energy dominates), while large \\(r_s\\) corresponds to low density (potential energy dominates, eventually forming a Wigner crystal).</p>

                <h3>Dirac Exchange</h3>

                <p>The exchange energy of the UEG was derived by Dirac (1930) and Bloch (1929). For a spin-unpolarized gas:</p>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 12.2 (Dirac Exchange Formula)</div>
                    <div class="env-body">
                        <p>The exchange energy per electron of a uniform electron gas with density \\(\\rho\\) is</p>
                        \\[\\varepsilon_x^{\\mathrm{UEG}}(\\rho) = -\\frac{3}{4}\\left(\\frac{3}{\\pi}\\right)^{1/3} \\rho^{1/3} = -\\frac{3}{4\\pi}\\left(\\frac{9\\pi}{4}\\right)^{1/3} \\frac{1}{r_s}\\]
                        <p>so the total LDA exchange energy is</p>
                        \\[E_x^{\\mathrm{LDA}}[\\rho] = -C_x \\int \\rho^{4/3}(\\mathbf{r})\\, d\\mathbf{r}, \\qquad C_x = \\frac{3}{4}\\left(\\frac{3}{\\pi}\\right)^{1/3} \\approx 0.7386.\\]
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof (Sketch)</div>
                    <div class="env-body">
                        <p>For a UEG in a box of volume \\(V\\), the occupied orbitals are plane waves \\(\\psi_{\\mathbf{k}}(\\mathbf{r}) = V^{-1/2} e^{i\\mathbf{k}\\cdot\\mathbf{r}}\\) with \\(|\\mathbf{k}| \\leq k_F\\), where \\(k_F = (3\\pi^2\\rho)^{1/3}\\) is the Fermi wavevector. The exchange energy is the Fock integral evaluated with these plane waves:</p>
                        \\[E_x = -\\frac{1}{2}\\sum_{\\sigma}\\sum_{\\mathbf{k},\\mathbf{k}'}^{\\mathrm{occ}} \\int\\int \\frac{\\psi_{\\mathbf{k}\\sigma}^*(\\mathbf{r})\\psi_{\\mathbf{k}'\\sigma}(\\mathbf{r})\\psi_{\\mathbf{k}'\\sigma}^*(\\mathbf{r}')\\psi_{\\mathbf{k}\\sigma}(\\mathbf{r}')}{|\\mathbf{r}-\\mathbf{r}'|}\\,d\\mathbf{r}\\,d\\mathbf{r}'.\\]
                        <p>Converting the sum to an integral over \\(\\mathbf{k}\\)-space and evaluating using the Fourier transform of the Coulomb interaction gives \\(E_x/N = -(3k_F)/(4\\pi)\\). Substituting \\(k_F = (3\\pi^2\\rho)^{1/3}\\) yields the result.</p>
                        <div class="qed">&#8718;</div>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark 12.3</div>
                    <div class="env-body">
                        <p>The \\(\\rho^{4/3}\\) scaling of LDA exchange has deep consequences. It is the unique power-law form that is consistent with the coordinate scaling relation \\(E_x[\\rho_\\lambda] = \\lambda E_x[\\rho]\\) where \\(\\rho_\\lambda(\\mathbf{r}) = \\lambda^3 \\rho(\\lambda\\mathbf{r})\\) is the uniformly scaled density. Any approximate exchange functional should satisfy this relation.</p>
                    </div>
                </div>

                <h3>The Exchange-Correlation Hole</h3>

                <p>The exchange-correlation energy can be expressed through the <strong>exchange-correlation hole</strong> \\(h_{xc}(\\mathbf{r}, \\mathbf{r}')\\), which describes how the presence of an electron at \\(\\mathbf{r}\\) depletes electron density at \\(\\mathbf{r}'\\):</p>
                \\[E_{xc}[\\rho] = \\frac{1}{2}\\int\\int \\frac{\\rho(\\mathbf{r})\\, h_{xc}(\\mathbf{r}, \\mathbf{r}')}{|\\mathbf{r} - \\mathbf{r}'|}\\, d\\mathbf{r}\\, d\\mathbf{r}'.\\]
                <p>The hole satisfies the sum rule \\(\\int h_{xc}(\\mathbf{r}, \\mathbf{r}')\\, d\\mathbf{r}' = -1\\), reflecting that each electron excludes exactly one electron's worth of charge from its vicinity. In the LDA, the hole is approximated by the UEG hole, which is spherically symmetric around the reference electron.</p>

                <div class="viz-placeholder" data-viz="lda-xc-hole"></div>

                <h3>Correlation Energy: VWN and PW92</h3>

                <p>Unlike exchange, the correlation energy of the UEG has no closed-form expression. It must be determined numerically, historically through quantum Monte Carlo (QMC) simulations by Ceperley and Alder (1980).</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 12.4 (LDA Correlation Parametrizations)</div>
                    <div class="env-body">
                        <p>The correlation energy per electron \\(\\varepsilon_c(r_s)\\) of the UEG is parametrized by analytic interpolation formulas fitted to QMC data. Two widely used forms are:</p>
                        <ul>
                            <li><strong>VWN (1980):</strong> Vosko, Wilk, and Nusair used a Pad&eacute; approximant in \\(\\sqrt{r_s}\\).</li>
                            <li><strong>PW92 (1992):</strong> Perdew and Wang used the form \\(\\varepsilon_c(r_s) = -2A(1 + \\alpha_1 r_s)\\ln\\left(1 + \\frac{1}{2A(\\beta_1 r_s^{1/2} + \\beta_2 r_s + \\beta_3 r_s^{3/2} + \\beta_4 r_s^2)}\\right)\\) which satisfies known high- and low-density limits.</li>
                        </ul>
                        <p>Both give essentially the same numerical results but PW92 has the advantage of satisfying exact limiting behaviors.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 12.5 (Limiting Behaviors)</div>
                    <div class="env-body">
                        <p>In the high-density limit (\\(r_s \\to 0\\)), perturbation theory gives</p>
                        \\[\\varepsilon_c(r_s) \\to A\\ln r_s + B + \\mathcal{O}(r_s \\ln r_s)\\]
                        <p>where \\(A = (1-\\ln 2)/\\pi^2 \\approx 0.0311\\) hartree (Gell-Mann and Brueckner, 1957). In the low-density limit (\\(r_s \\to \\infty\\)), the electrons crystallize and</p>
                        \\[\\varepsilon_c(r_s) \\to -\\frac{d_0}{r_s} + \\frac{d_1}{r_s^{3/2}} + \\cdots\\]
                        <p>The PW92 parametrization interpolates smoothly between these limits.</p>
                    </div>
                </div>

                <h3>Spin-Polarized LDA (LSDA)</h3>

                <p>For open-shell systems, we need the <strong>Local Spin Density Approximation</strong> (LSDA), which depends on both spin densities \\(\\rho_\\alpha\\) and \\(\\rho_\\beta\\), or equivalently on \\(\\rho = \\rho_\\alpha + \\rho_\\beta\\) and the spin polarization \\(\\zeta = (\\rho_\\alpha - \\rho_\\beta)/\\rho\\):</p>
                \\[E_{xc}^{\\mathrm{LSDA}}[\\rho_\\alpha, \\rho_\\beta] = \\int \\rho(\\mathbf{r})\\, \\varepsilon_{xc}(\\rho(\\mathbf{r}), \\zeta(\\mathbf{r}))\\, d\\mathbf{r}.\\]

                <div class="env-block warning">
                    <div class="env-title">Strengths and Limitations of LDA</div>
                    <div class="env-body">
                        <p><strong>Strengths:</strong> LDA gives surprisingly good geometries (bond lengths typically within 1-3% of experiment), reasonable vibrational frequencies, and qualitatively correct band structures. It is exact for the UEG and satisfies many exact constraints.</p>
                        <p><strong>Limitations:</strong> LDA systematically overbinds molecules (atomization energies too large by 1-2 eV), underestimates band gaps, and fails for systems where the density varies rapidly (hydrogen bonds, van der Waals complexes). These failures motivate gradient corrections.</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Why Does LDA Work At All?</div>
                    <div class="env-body">
                        <p>LDA replaces the true xc hole with the UEG hole. While the true hole can be highly non-spherical, the exchange-correlation energy depends only on the <em>spherical average</em> of the hole (because \\(1/|\\mathbf{r}-\\mathbf{r}'|\\) depends only on the interelectronic distance). The UEG hole is spherical by construction, and it satisfies the sum rule \\(\\int h_{xc} d\\mathbf{r}' = -1\\) exactly. These two features explain much of LDA's success.</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'lda-xc-hole',
                    title: 'LDA Exchange-Correlation Hole',
                    description: 'Visualize the exchange hole around a reference electron in the uniform electron gas. Adjust the density parameter \\(r_s\\) to see how the hole shape changes with electron density.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 50, originX: 280, originY: 240 });
                        var rs = 2.0;

                        VizEngine.createSlider(controls, 'rs:', 0.5, 8, rs, 0.1, function(v) { rs = v; });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Draw axes
                            ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1.5;
                            ctx.beginPath(); ctx.moveTo(40, viz.height - 40); ctx.lineTo(viz.width - 20, viz.height - 40); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(60, 20); ctx.lineTo(60, viz.height - 20); ctx.stroke();

                            // Labels
                            ctx.fillStyle = viz.colors.text; ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                            ctx.fillText('r / r_s', viz.width / 2, viz.height - 18);
                            ctx.save(); ctx.translate(18, viz.height / 2); ctx.rotate(-Math.PI / 2);
                            ctx.fillText('h_x(r)', 0, 0); ctx.restore();

                            // Compute exchange hole for UEG
                            // h_x(r) = -(9/(2*kf^2)) * [sin(kf*r) - kf*r*cos(kf*r)]^2 / (kf*r)^6 * rho
                            // Simplified: normalized exchange hole
                            var kf = Math.pow(9 * Math.PI / 4, 1.0/3.0) / rs;
                            var rho = 3.0 / (4 * Math.PI * rs * rs * rs);

                            var ox = 60, oy = viz.height - 40;
                            var scaleX = (viz.width - 100) / 6.0;
                            var scaleY = 180;

                            // Draw the exchange hole
                            ctx.strokeStyle = viz.colors.blue; ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            var started = false;
                            for (var i = 0; i <= 500; i++) {
                                var u = i / 500 * 6.0; // r/r_s
                                var r = u * rs;
                                var kr = kf * r;
                                var hx;
                                if (kr < 0.001) {
                                    hx = -rho; // at origin
                                } else {
                                    var j1 = (Math.sin(kr) - kr * Math.cos(kr)) / (kr * kr);
                                    hx = -rho * 9 * j1 * j1 / (kr < 0.01 ? 1 : 1);
                                    // Full formula: h_x(r) = -(1/(2*pi^2)) * [3*(sin(kf*r) - kf*r*cos(kf*r))/(kf*r)^3]^2
                                    var x2 = kr;
                                    var spherical_j1 = (Math.sin(x2) - x2 * Math.cos(x2)) / (x2 * x2 * x2);
                                    hx = -rho * (3 * spherical_j1) * (3 * spherical_j1) * 0.5;
                                }

                                // Normalize by rho for display
                                var hn = hx / rho; // ranges from -1 to 0

                                var px = ox + u * scaleX;
                                var py = oy + hn * scaleY; // hn is negative, so py < oy

                                if (!started) { ctx.moveTo(px, py); started = true; }
                                else ctx.lineTo(px, py);
                            }
                            ctx.stroke();

                            // Draw zero line
                            ctx.strokeStyle = viz.colors.muted; ctx.lineWidth = 0.5;
                            ctx.setLineDash([4, 4]);
                            ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(viz.width - 20, oy); ctx.stroke();
                            ctx.setLineDash([]);

                            // Draw -rho line
                            ctx.strokeStyle = viz.colors.red + '66'; ctx.lineWidth = 1;
                            ctx.setLineDash([4, 4]);
                            var negRhoY = oy - scaleY;
                            ctx.beginPath(); ctx.moveTo(ox, negRhoY); ctx.lineTo(viz.width - 20, negRhoY); ctx.stroke();
                            ctx.setLineDash([]);
                            ctx.fillStyle = viz.colors.red; ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'left'; ctx.fillText('h_x = -\u03C1', viz.width - 70, negRhoY - 6);

                            // Tick marks on x-axis
                            ctx.fillStyle = viz.colors.text; ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                            for (var t = 0; t <= 6; t++) {
                                var tx = ox + t * scaleX;
                                ctx.beginPath(); ctx.moveTo(tx, oy); ctx.lineTo(tx, oy + 4); ctx.strokeStyle = viz.colors.text; ctx.lineWidth = 1; ctx.stroke();
                                ctx.fillText(t.toString(), tx, oy + 6);
                            }

                            // Info
                            ctx.fillStyle = viz.colors.white; ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'left'; ctx.textBaseline = 'top';
                            ctx.fillText('Uniform Electron Gas Exchange Hole', 80, 15);
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.teal;
                            ctx.fillText('r_s = ' + rs.toFixed(1) + ' bohr', 80, 35);
                            ctx.fillStyle = viz.colors.text;
                            var rhoVal = 3.0 / (4 * Math.PI * rs * rs * rs);
                            ctx.fillText('\u03C1 = ' + rhoVal.toFixed(4) + ' e/bohr\u00B3', 80, 52);
                            ctx.fillText('k_F = ' + kf.toFixed(3) + ' bohr\u207B\u00B9', 80, 69);

                            // Exchange energy per electron
                            var ex = -0.75 * Math.pow(3.0 / Math.PI, 1.0/3.0) * Math.pow(rhoVal, 1.0/3.0);
                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillText('\u03B5_x = ' + ex.toFixed(4) + ' hartree', 80, 86);
                        }

                        viz.animate(draw);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Derive the Fermi wavevector \\(k_F = (3\\pi^2 \\rho)^{1/3}\\) for a uniform electron gas of density \\(\\rho\\) (for one spin channel, or total density with the factor of 2 for spin).',
                    hint: 'Count the number of occupied states in a sphere of radius \\(k_F\\) in \\(k\\)-space, using the density of states \\(V/(2\\pi)^3\\) per spin channel.',
                    solution: 'In a box of volume \\(V\\), the allowed wavevectors form a grid with spacing \\(2\\pi/L\\). The number of states per spin in a \\(k\\)-sphere of radius \\(k_F\\) is \\(N/2 = \\frac{V}{(2\\pi)^3} \\cdot \\frac{4}{3}\\pi k_F^3\\). Solving \\(\\rho = N/V\\) for \\(k_F\\): \\(k_F = (3\\pi^2 \\rho)^{1/3}\\).'
                },
                {
                    question: 'Show that LDA exchange satisfies the coordinate scaling relation \\(E_x[\\rho_\\lambda] = \\lambda E_x[\\rho]\\), where \\(\\rho_\\lambda(\\mathbf{r}) = \\lambda^3 \\rho(\\lambda\\mathbf{r})\\).',
                    hint: 'Substitute \\(\\rho_\\lambda\\) into \\(E_x^{\\mathrm{LDA}} = -C_x \\int \\rho^{4/3} d\\mathbf{r}\\) and change variables \\(\\mathbf{u} = \\lambda \\mathbf{r}\\).',
                    solution: '\\(E_x[\\rho_\\lambda] = -C_x \\int [\\lambda^3 \\rho(\\lambda\\mathbf{r})]^{4/3} d\\mathbf{r} = -C_x \\lambda^4 \\int \\rho^{4/3}(\\lambda\\mathbf{r}) d\\mathbf{r}\\). Let \\(\\mathbf{u} = \\lambda\\mathbf{r}\\), so \\(d\\mathbf{r} = \\lambda^{-3}d\\mathbf{u}\\). Then \\(E_x[\\rho_\\lambda] = -C_x \\lambda^4 \\lambda^{-3} \\int \\rho^{4/3}(\\mathbf{u}) d\\mathbf{u} = \\lambda E_x[\\rho]\\).'
                },
                {
                    question: 'For sodium metal, \\(r_s \\approx 3.93\\) bohr. Compute the LDA exchange energy per electron \\(\\varepsilon_x\\) in eV.',
                    hint: 'Use \\(\\varepsilon_x = -(3/(4\\pi))(9\\pi/4)^{1/3}/r_s\\) in hartree, then convert: 1 hartree = 27.211 eV.',
                    solution: '\\(\\varepsilon_x = -(3/(4\\pi))(9\\pi/4)^{1/3}/r_s = -(0.4582)/3.93 = -0.1166\\) hartree \\(= -3.17\\) eV. This is the exchange stabilization per electron in sodium.'
                },
                {
                    question: 'The LDA exchange hole at the reference point satisfies \\(h_x(\\mathbf{r}, \\mathbf{r}) = -\\rho(\\mathbf{r})/2\\) for each spin channel. Explain physically why the hole equals minus the same-spin density at coalescence.',
                    hint: 'Consider the Pauli exclusion principle and the conditional probability of finding a same-spin electron at the same point.',
                    solution: 'The exchange hole represents the reduction in same-spin electron density around a reference electron. At coalescence (\\(\\mathbf{r}\' = \\mathbf{r}\\)), the Pauli principle completely excludes finding another same-spin electron, so the hole equals \\(-\\rho_\\sigma(\\mathbf{r})\\). For each spin channel \\(\\sigma\\), \\(h_{x,\\sigma\\sigma}(\\mathbf{r},\\mathbf{r}) = -\\rho_\\sigma(\\mathbf{r})\\). For an unpolarized system \\(\\rho_\\alpha = \\rho_\\beta = \\rho/2\\), the total on-top hole is \\(-\\rho/2\\).'
                },
                {
                    question: 'Verify that the exchange-correlation hole sum rule \\(\\int h_{xc}(\\mathbf{r},\\mathbf{r}\')\\, d\\mathbf{r}\' = -1\\) is satisfied by the LDA, and explain its physical meaning.',
                    hint: 'The sum rule follows from the normalization of the pair density. What does "displacing exactly one electron" mean?',
                    solution: 'The sum rule states that the total charge missing from the vicinity of each electron is exactly one electronic charge. This is because the xc hole describes the depletion in conditional density: \\(\\rho_2(\\mathbf{r},\\mathbf{r}\') = \\rho(\\mathbf{r})[\\rho(\\mathbf{r}\') + h_{xc}(\\mathbf{r},\\mathbf{r}\')]\\). Since \\(\\int \\rho_2 d\\mathbf{r}\' = (N-1)\\rho(\\mathbf{r})\\) and \\(\\int \\rho d\\mathbf{r}\' = N\\), the hole integrates to \\(-1\\). The LDA inherits this from the UEG, where it holds exactly.'
                }
            ]
        },

        // ============================================================
        // SECTION 2: Generalized Gradient Approximation (GGA)
        // ============================================================
        {
            id: 'ch12-sec02',
            title: 'Generalized Gradient Approximation',
            content: `
                <h2>Generalized Gradient Approximation (GGA)</h2>

                <p class="section-roadmap"><strong>Section roadmap.</strong> We go beyond LDA by incorporating information about density gradients. We derive the gradient expansion, explain why a simple truncation fails, and develop the Generalized Gradient Approximation (GGA) through the key functionals: B88 exchange, LYP and PBE correlation, and the PBE and BLYP composite functionals.</p>

                <p>LDA assumes the density is locally uniform, but real molecules have rapidly varying densities near nuclei and in bonding regions. The next rung on Jacob's ladder incorporates the gradient of the density \\(|\\nabla\\rho|\\).</p>

                <h3>The Gradient Expansion and Its Failure</h3>

                <p>The naive approach is a Taylor expansion of \\(\\varepsilon_{xc}\\) around the uniform limit. For exchange, the second-order gradient expansion approximation (GEA) gives</p>
                \\[E_x^{\\mathrm{GEA}}[\\rho] = E_x^{\\mathrm{LDA}}[\\rho] + \\int C_x^{\\mathrm{GEA}} \\frac{|\\nabla\\rho|^2}{\\rho^{4/3}}\\, d\\mathbf{r}\\]
                <p>where \\(C_x^{\\mathrm{GEA}} = -10/(432\\pi(3\\pi^2)^{1/3})\\). However, GEA performs <em>worse</em> than LDA for atoms and molecules.</p>

                <div class="env-block warning">
                    <div class="env-title">Why the Gradient Expansion Fails</div>
                    <div class="env-body">
                        <p>The gradient expansion of the exchange hole violates the negativity constraint \\(h_x(\\mathbf{r},\\mathbf{r}') \\leq 0\\) and the normalization sum rule. The resulting hole develops unphysical positive regions, making the total energy unreliable. The GGA "fixes" this by using a more sophisticated, non-perturbative modification of the exchange-correlation functional that respects these constraints.</p>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 12.6 (GGA Form)</div>
                    <div class="env-body">
                        <p>A <strong>Generalized Gradient Approximation</strong> writes the exchange-correlation energy as</p>
                        \\[E_{xc}^{\\mathrm{GGA}}[\\rho_\\alpha, \\rho_\\beta] = \\int f(\\rho_\\alpha, \\rho_\\beta, \\nabla\\rho_\\alpha, \\nabla\\rho_\\beta)\\, d\\mathbf{r}\\]
                        <p>The gradient information is typically encoded through the <strong>reduced density gradient</strong></p>
                        \\[s = \\frac{|\\nabla\\rho|}{2k_F\\rho} = \\frac{|\\nabla\\rho|}{2(3\\pi^2)^{1/3}\\rho^{4/3}}\\]
                        <p>which measures how rapidly the density varies on the scale of the local Fermi wavelength. For a slowly varying density, \\(s \\ll 1\\); near a nucleus, \\(s\\) can be large.</p>
                    </div>
                </div>

                <h3>Exchange: B88 and PBE</h3>

                <div class="env-block definition">
                    <div class="env-title">Definition 12.7 (B88 Exchange)</div>
                    <div class="env-body">
                        <p>The Becke 1988 (B88) exchange functional adds a gradient correction to LDA:</p>
                        \\[E_x^{\\mathrm{B88}} = E_x^{\\mathrm{LDA}} - \\beta \\sum_\\sigma \\int \\frac{\\rho_\\sigma^{4/3} x_\\sigma^2}{1 + 6\\beta x_\\sigma \\sinh^{-1}(x_\\sigma)}\\, d\\mathbf{r}\\]
                        <p>where \\(x_\\sigma = |\\nabla\\rho_\\sigma|/\\rho_\\sigma^{4/3}\\) and \\(\\beta = 0.0042\\) hartree is a single empirical parameter fitted to Hartree-Fock exchange energies of noble gas atoms.</p>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 12.8 (PBE Exchange Enhancement Factor)</div>
                    <div class="env-body">
                        <p>The Perdew-Burke-Ernzerhof (PBE, 1996) exchange uses an <strong>enhancement factor</strong> \\(F_x(s)\\) over LDA:</p>
                        \\[E_x^{\\mathrm{PBE}} = \\int \\rho\\, \\varepsilon_x^{\\mathrm{UEG}}(\\rho)\\, F_x(s)\\, d\\mathbf{r}\\]
                        \\[F_x^{\\mathrm{PBE}}(s) = 1 + \\kappa - \\frac{\\kappa}{1 + \\mu s^2/\\kappa}\\]
                        <p>where \\(\\mu = 0.21951\\) and \\(\\kappa = 0.804\\). Note \\(F_x(0) = 1\\) (recovers LDA) and \\(F_x(s) \\to 1 + \\kappa\\) as \\(s \\to \\infty\\) (Lieb-Oxford bound). PBE has <strong>no empirical parameters</strong>; all constants are determined by exact constraints.</p>
                    </div>
                </div>

                <h3>Correlation: LYP and PBE</h3>

                <div class="env-block definition">
                    <div class="env-title">Definition 12.9 (LYP Correlation)</div>
                    <div class="env-body">
                        <p>The Lee-Yang-Parr (LYP, 1988) correlation functional is based on the Colle-Salvetti formula for the correlation energy in terms of the second-order density matrix. Unlike most functionals, LYP is <strong>not</strong> built on the UEG; it does not reduce to the correct UEG correlation limit. It uses four empirical parameters (\\(a, b, c, d\\)) fitted to the helium atom.</p>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 12.10 (PBE Correlation)</div>
                    <div class="env-body">
                        <p>PBE correlation adds a gradient correction to LDA correlation:</p>
                        \\[E_c^{\\mathrm{PBE}} = \\int \\rho\\left[\\varepsilon_c^{\\mathrm{UEG}}(r_s, \\zeta) + H(r_s, \\zeta, t)\\right] d\\mathbf{r}\\]
                        <p>where \\(t = |\\nabla\\rho|/(2k_s\\rho)\\) with \\(k_s\\) the Thomas-Fermi screening wavevector. The function \\(H\\) is chosen to satisfy: (1) the correct second-order gradient expansion for slowly varying densities, (2) \\(E_c \\to 0\\) in the rapidly varying limit (\\(t \\to \\infty\\)), and (3) uniform scaling to the high-density limit.</p>
                    </div>
                </div>

                <h3>Composite GGA Functionals</h3>

                <div class="env-block example">
                    <div class="env-title">Example 12.11 (Major GGA Functionals)</div>
                    <div class="env-body">
                        <p><strong>PBE</strong> = PBE exchange + PBE correlation. Non-empirical, satisfies 11 exact constraints. Workhorse for solid-state physics.</p>
                        <p><strong>BLYP</strong> = B88 exchange + LYP correlation. Semi-empirical (\\(\\beta\\) in B88 + 4 params in LYP). Popular in chemistry for thermochemistry.</p>
                        <p><strong>BP86</strong> = B88 exchange + P86 correlation. Early GGA that was widely used in the 1990s.</p>
                        <p><strong>PW91</strong> = PW91 exchange + PW91 correlation. Precursor to PBE with more complicated functional form but similar performance.</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Philosophy: Non-Empirical vs. Semi-Empirical</div>
                    <div class="env-body">
                        <p>PBE represents the "constraint satisfaction" philosophy: every parameter is fixed by an exact condition. B88/LYP represents the "fitted" philosophy: parameters are optimized against reference data. Both approaches have merits. Non-empirical functionals are more transferable but may sacrifice accuracy on specific properties. Semi-empirical functionals can be very accurate within their training domain but may fail outside it.</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark 12.12 (Performance of GGA)</div>
                    <div class="env-body">
                        <p>GGAs reduce the LDA overbinding error by roughly a factor of 5, bringing atomization energy errors from ~1.5 eV to ~0.3 eV. Bond lengths improve to within 1% of experiment. However, GGAs still fail for: weak interactions (van der Waals), strongly correlated systems, band gaps, and reaction barrier heights (underestimated by 3-5 kcal/mol on average).</p>
                    </div>
                </div>
            `,
            visualizations: [],
            exercises: [
                {
                    question: 'Show that the reduced density gradient \\(s\\) is dimensionless and estimate its typical value at a bond midpoint in H\\(_2\\) (\\(R = 1.4\\) bohr).',
                    hint: 'Check the dimensions of \\(|\\nabla\\rho|\\) and \\(\\rho^{4/3}\\). For H\\(_2\\), the density at the bond midpoint is approximately 0.27 e/bohr\\(^3\\) with \\(|\\nabla\\rho| \\approx 0\\) by symmetry.',
                    solution: '\\(|\\nabla\\rho|\\) has dimensions of (density/length) = bohr\\(^{-4}\\). \\(\\rho^{4/3}\\) has dimensions bohr\\(^{-4}\\). So \\(s\\) is dimensionless. At the H\\(_2\\) bond midpoint, \\(|\\nabla\\rho| = 0\\) by symmetry, hence \\(s = 0\\) and the GGA reduces to LDA there. Away from the midpoint toward a nucleus, \\(s\\) increases rapidly to values around \\(s \\approx 0.5{-}2\\).'
                },
                {
                    question: 'Verify that the PBE enhancement factor \\(F_x(s)\\) satisfies the Lieb-Oxford bound \\(E_x[\\rho] \\geq -1.679 \\int \\rho^{4/3} d\\mathbf{r}\\) pointwise when \\(\\kappa = 0.804\\).',
                    hint: 'The LDA exchange energy density is \\(\\varepsilon_x^{\\mathrm{LDA}} \\rho = -C_x \\rho^{4/3}\\) with \\(C_x \\approx 0.7386\\). The Lieb-Oxford bound requires \\(C_x F_x(s) \\leq 1.679\\) for all \\(s\\).',
                    solution: 'The maximum of \\(F_x(s) = 1 + \\kappa - \\kappa/(1 + \\mu s^2/\\kappa)\\) is at \\(s \\to \\infty\\): \\(F_x^{\\max} = 1 + \\kappa = 1.804\\). Then \\(C_x \\cdot F_x^{\\max} = 0.7386 \\times 1.804 = 1.332 < 1.679\\). So the local Lieb-Oxford bound is satisfied everywhere. The value \\(\\kappa = 0.804\\) was chosen to be as large as possible while still respecting this bound.'
                },
                {
                    question: 'Explain why the LYP correlation functional does not reduce to the correct UEG correlation energy in the uniform density limit. Is this a serious deficiency?',
                    hint: 'Consider how LYP was constructed (from the Colle-Salvetti formula for He) and what the UEG limit physically represents.',
                    solution: 'LYP was derived from the Colle-Salvetti second-order density matrix formula, which was parametrized for the helium atom, not the UEG. In the uniform limit (\\(\\nabla\\rho \\to 0\\)), LYP gives a correlation energy that differs from the exact UEG result by about 5 mhartree per electron. In practice, this is partially compensated by the B88 exchange when forming BLYP. For molecules, the error is small because molecular densities are far from uniform. For extended metallic systems, this deficiency is more problematic, which is why PBE (which is exact for UEG) is preferred in solid-state applications.'
                },
                {
                    question: 'The gradient expansion for exchange gives a correction \\(\\propto |\\nabla\\rho|^2/\\rho^{4/3}\\) (i.e., \\(\\propto s^2\\) for small \\(s\\)). Show that both B88 and PBE reduce to the correct gradient expansion coefficient for small \\(s\\).',
                    hint: 'Expand \\(F_x^{\\mathrm{PBE}}(s)\\) for small \\(s\\). For B88, expand the correction term using \\(\\sinh^{-1}(x) \\approx x\\) for small \\(x\\).',
                    solution: 'For PBE: \\(F_x(s) = 1 + \\kappa - \\kappa/(1 + \\mu s^2/\\kappa) \\approx 1 + \\mu s^2\\) for small \\(s\\). The coefficient \\(\\mu = \\beta_{\\mathrm{GE}} \\pi^2/3 = 0.21951\\) reproduces the exact gradient expansion. For B88: setting \\(x = |\\nabla\\rho|/\\rho^{4/3}\\) small, \\(\\sinh^{-1}(x) \\approx x\\), so the correction \\(\\sim \\beta x^2 / (1 + 6\\beta x^2)\\approx \\beta x^2\\), which gives the same \\(s^2\\) behavior when expressed in terms of the reduced gradient.'
                },
                {
                    question: 'Why do GGA functionals systematically underestimate reaction barrier heights? Relate this to the behavior of the enhancement factor at large reduced gradients.',
                    hint: 'At a transition state, the density is more delocalized than at the reactant or product. Consider how this affects the exchange energy.',
                    solution: 'Transition states are characterized by stretched, partially broken bonds where the electron density is delocalized over a larger region. This gives smaller \\(|\\nabla\\rho|/\\rho^{4/3}\\) and hence smaller \\(s\\) than in compact molecules. GGA exchange enhancement factors increase with \\(s\\), meaning compact densities (reactants/products) get more exchange stabilization than diffuse ones (transition states). Since GGAs already over-stabilize covalent bonds relative to exact exchange (they include too much self-interaction), transition states are destabilized less than they should be, leading to barriers that are too low. This is the "delocalization error" of GGA.'
                }
            ]
        },

        // ============================================================
        // SECTION 3: Meta-GGA and Hybrid Functionals
        // ============================================================
        {
            id: 'ch12-sec03',
            title: 'Meta-GGA and Hybrid Functionals',
            content: `
                <h2>Meta-GGA and Hybrid Functionals</h2>

                <p class="section-roadmap"><strong>Section roadmap.</strong> We climb two more rungs of Jacob's ladder: meta-GGAs (which add the kinetic energy density \\(\\tau\\)) and hybrid functionals (which mix in a fraction of exact Hartree-Fock exchange). We discuss TPSS, SCAN, B3LYP, PBE0, and range-separated hybrids like CAM-B3LYP and \\(\\omega\\)B97X-D.</p>

                <h3>Meta-GGA: Adding the Kinetic Energy Density</h3>

                <p>A meta-GGA adds the Kohn-Sham kinetic energy density as a third ingredient beyond \\(\\rho\\) and \\(\\nabla\\rho\\):</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 12.13 (Kinetic Energy Density)</div>
                    <div class="env-body">
                        <p>The <strong>Kohn-Sham kinetic energy density</strong> is</p>
                        \\[\\tau(\\mathbf{r}) = \\frac{1}{2}\\sum_{i}^{\\mathrm{occ}} |\\nabla\\psi_i(\\mathbf{r})|^2\\]
                        <p>A meta-GGA exchange-correlation functional has the form</p>
                        \\[E_{xc}^{\\mathrm{mGGA}} = \\int f(\\rho, \\nabla\\rho, \\tau)\\, d\\mathbf{r}\\]
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Why Is \\(\\tau\\) Useful?</div>
                    <div class="env-body">
                        <p>The kinetic energy density \\(\\tau\\) provides information that \\(\\rho\\) and \\(\\nabla\\rho\\) alone cannot. The key insight is the <strong>iso-orbital indicator</strong></p>
                        \\[\\alpha = \\frac{\\tau - \\tau_W}{\\tau^{\\mathrm{UEG}}}\\]
                        <p>where \\(\\tau_W = |\\nabla\\rho|^2/(8\\rho)\\) is the von Weizs&auml;cker (single-orbital) kinetic energy density and \\(\\tau^{\\mathrm{UEG}} = (3/10)(3\\pi^2)^{2/3}\\rho^{5/3}\\) is the UEG value. This indicator distinguishes three regimes:</p>
                        <ul>
                            <li>\\(\\alpha = 0\\): single-orbital regions (covalent bonds, lone pairs)</li>
                            <li>\\(\\alpha \\approx 1\\): slowly varying density (bulk metallic bonding)</li>
                            <li>\\(\\alpha \\gg 1\\): weakly overlapping density tails (non-covalent interactions)</li>
                        </ul>
                        <p>No combination of \\(\\rho\\) and \\(\\nabla\\rho\\) can distinguish these three cases.</p>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 12.14 (SCAN Functional)</div>
                    <div class="env-body">
                        <p>The <strong>Strongly Constrained and Appropriately Normed</strong> (SCAN) functional of Sun, Ruzsinszky, and Perdew (2015) satisfies all 17 known exact constraints that a meta-GGA can satisfy. Its exchange enhancement factor \\(F_x(s, \\alpha)\\) smoothly interpolates between different behaviors using \\(\\alpha\\) as a switching variable:</p>
                        <ul>
                            <li>\\(\\alpha = 0\\): recovers the exact exchange for a single-orbital system</li>
                            <li>\\(\\alpha \\to 1\\): recovers the gradient expansion for slowly varying densities</li>
                            <li>\\(\\alpha \\to \\infty\\): gives appropriate behavior for weakly overlapping densities</li>
                        </ul>
                    </div>
                </div>

                <h3>Hybrid Functionals: Mixing Exact Exchange</h3>

                <p>A fundamentally different strategy is to mix exact (Hartree-Fock) exchange with DFT exchange-correlation:</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 12.15 (Global Hybrid Functional)</div>
                    <div class="env-body">
                        <p>A <strong>global hybrid</strong> functional has the form</p>
                        \\[E_{xc}^{\\mathrm{hybrid}} = a_0 E_x^{\\mathrm{HF}} + (1 - a_0) E_x^{\\mathrm{DFT}} + E_c^{\\mathrm{DFT}}\\]
                        <p>where \\(E_x^{\\mathrm{HF}} = -\\frac{1}{2}\\sum_{ij}^{\\mathrm{occ}} \\langle ij | ji \\rangle\\) is the exact exchange energy computed from the Kohn-Sham orbitals, and \\(a_0\\) is the fraction of exact exchange.</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 12.16 (Adiabatic Connection Formula)</div>
                    <div class="env-body">
                        <p>The exact exchange-correlation energy is given by the <strong>adiabatic connection formula</strong></p>
                        \\[E_{xc} = \\int_0^1 \\langle \\Psi_\\lambda | \\hat{V}_{ee} | \\Psi_\\lambda \\rangle\\, d\\lambda - J[\\rho]\\]
                        <p>where \\(\\Psi_\\lambda\\) minimizes \\(\\langle \\hat{T} + \\lambda \\hat{V}_{ee} \\rangle\\) subject to giving density \\(\\rho\\). At \\(\\lambda = 0\\), this is the Kohn-Sham (exact exchange) limit; at \\(\\lambda = 1\\), the fully interacting limit. The integrand \\(W_{xc}(\\lambda)\\) is a monotonically decreasing, convex function of \\(\\lambda\\).</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Motivation for 25% Exact Exchange</div>
                    <div class="env-body">
                        <p>If \\(W_{xc}(\\lambda)\\) were linear in \\(\\lambda\\), the integral would give the trapezoidal rule:</p>
                        \\[E_{xc} = \\frac{1}{2}[W_{xc}(0) + W_{xc}(1)] = \\frac{1}{2}E_x^{\\mathrm{HF}} + \\frac{1}{2}W_{xc}(1).\\]
                        <p>Perdew, Ernzerhof, and Burke (1996) argued that \\(W_{xc}(1) \\approx E_{xc}^{\\mathrm{DFT}}\\), giving approximately \\(a_0 = 1/4\\). More sophisticated arguments based on the curvature of \\(W_{xc}(\\lambda)\\) and perturbation theory of the adiabatic connection also support \\(a_0 \\approx 0.2{-}0.25\\).</p>
                        <div class="qed">&#8718;</div>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 12.17 (B3LYP and PBE0)</div>
                    <div class="env-body">
                        <p><strong>B3LYP</strong> (Becke, three-parameter, Lee-Yang-Parr) is the most widely used functional in chemistry:</p>
                        \\[E_{xc}^{\\mathrm{B3LYP}} = (1-a_0)E_x^{\\mathrm{LDA}} + a_0 E_x^{\\mathrm{HF}} + a_x \\Delta E_x^{\\mathrm{B88}} + (1-a_c)E_c^{\\mathrm{VWN}} + a_c E_c^{\\mathrm{LYP}}\\]
                        <p>with \\(a_0 = 0.20\\), \\(a_x = 0.72\\), \\(a_c = 0.81\\) fitted to the G2 thermochemistry set.</p>
                        <p><strong>PBE0</strong> (Adamo and Barone, 1999) is non-empirical:</p>
                        \\[E_{xc}^{\\mathrm{PBE0}} = \\frac{1}{4}E_x^{\\mathrm{HF}} + \\frac{3}{4}E_x^{\\mathrm{PBE}} + E_c^{\\mathrm{PBE}}\\]
                        <p>The 1/4 mixing comes from the perturbation theory argument above.</p>
                    </div>
                </div>

                <h3>Range-Separated Hybrids</h3>

                <p>A key limitation of global hybrids is that the optimal fraction of exact exchange depends on the property being computed. Range-separated hybrids resolve this by using different amounts of exact exchange at short and long range:</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 12.18 (Range Separation)</div>
                    <div class="env-body">
                        <p>The Coulomb operator is split into short-range (SR) and long-range (LR) parts:</p>
                        \\[\\frac{1}{r_{12}} = \\underbrace{\\frac{\\mathrm{erfc}(\\omega r_{12})}{r_{12}}}_{\\text{SR}} + \\underbrace{\\frac{\\mathrm{erf}(\\omega r_{12})}{r_{12}}}_{\\text{LR}}\\]
                        <p>where \\(\\omega\\) is the range-separation parameter and \\(\\mathrm{erf}\\) is the error function. DFT exchange handles the short-range part (where it is accurate), while exact HF exchange handles the long-range part (giving correct asymptotic behavior).</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 12.19 (Range-Separated Hybrids)</div>
                    <div class="env-body">
                        <p><strong>CAM-B3LYP</strong> (Coulomb-attenuating method): uses \\(\\alpha = 0.19\\) SR exact exchange growing to \\(\\alpha + \\beta = 0.65\\) at LR, with \\(\\omega = 0.33\\) bohr\\(^{-1}\\).</p>
                        <p><strong>\\(\\omega\\)B97X-D</strong>: 100% LR exact exchange, empirically optimized SR exchange, with dispersion corrections. One of the most accurate functionals for general chemistry.</p>
                        <p><strong>LC-\\(\\omega\\)PBE</strong>: 0% SR exact exchange, 100% LR exact exchange. Non-empirical range separation.</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Why Range Separation Matters</div>
                    <div class="env-body">
                        <p>DFT exchange has a self-interaction error: an electron interacts with its own density. For short-range interactions, this error partially cancels the missing correlation, which is why GGA exchange works well locally. At long range, self-interaction causes catastrophic failures: charge-transfer excitations are too low, ionization potentials are wrong, and the exchange-correlation potential decays exponentially instead of as \\(-1/r\\). Using 100% HF exchange at long range fixes these problems while preserving the good short-range behavior of DFT exchange.</p>
                    </div>
                </div>
            `,
            visualizations: [],
            exercises: [
                {
                    question: 'Show that for a single Kohn-Sham orbital \\(\\psi\\), the kinetic energy density equals the von Weizs&auml;cker form: \\(\\tau = |\\nabla\\psi|^2/2 = |\\nabla\\rho|^2/(8\\rho)\\), so \\(\\alpha = 0\\).',
                    hint: 'For a single orbital, \\(\\rho = |\\psi|^2\\). Compute \\(\\nabla\\rho\\) and \\(|\\nabla\\rho|^2\\) in terms of \\(\\psi\\) and \\(\\nabla\\psi\\), assuming \\(\\psi\\) is real.',
                    solution: 'For a single real orbital, \\(\\rho = \\psi^2\\), so \\(\\nabla\\rho = 2\\psi\\nabla\\psi\\) and \\(|\\nabla\\rho|^2 = 4\\psi^2|\\nabla\\psi|^2 = 4\\rho|\\nabla\\psi|^2\\). Then \\(\\tau_W = |\\nabla\\rho|^2/(8\\rho) = |\\nabla\\psi|^2/2 = \\tau\\). Hence \\(\\alpha = (\\tau - \\tau_W)/\\tau^{\\mathrm{UEG}} = 0\\).'
                },
                {
                    question: 'In B3LYP, what is the total fraction of exact exchange? How does this compare with PBE0?',
                    hint: 'Read off \\(a_0\\) from the B3LYP formula. For PBE0, the fraction is 1/4.',
                    solution: 'B3LYP has \\(a_0 = 0.20\\), so it uses 20% exact exchange. PBE0 uses 25%. The 5% difference is notable: B3LYP\'s parameters were empirically fitted to thermochemistry data, while PBE0\'s 25% comes from the adiabatic connection perturbation theory argument. For most main-group thermochemistry, both perform similarly, but for properties sensitive to self-interaction (barrier heights, charge transfer), PBE0\'s higher exact exchange fraction is slightly advantageous.'
                },
                {
                    question: 'Explain why the adiabatic connection integrand \\(W_{xc}(\\lambda)\\) must be monotonically decreasing in \\(\\lambda\\). What happens at \\(\\lambda = 0\\) and \\(\\lambda = 1\\)?',
                    hint: 'At \\(\\lambda = 0\\), the wavefunction is the Kohn-Sham determinant. As \\(\\lambda\\) increases, electron correlation becomes stronger. How does correlation affect the exchange-correlation energy?',
                    solution: 'At \\(\\lambda = 0\\), \\(\\Psi_0\\) is the KS determinant, and \\(W_{xc}(0) = E_x^{\\mathrm{HF}}\\) (pure exchange, no correlation). At \\(\\lambda = 1\\), \\(\\Psi_1\\) is the fully interacting ground state. As \\(\\lambda\\) increases from 0 to 1, electron correlation deepens the xc hole, making it more negative near the reference electron. By the Hellmann-Feynman theorem, \\(W_{xc}(\\lambda) = \\langle \\Psi_\\lambda|\\hat{V}_{ee}|\\Psi_\\lambda\\rangle - J[\\rho]\\), and since correlation concentrates the hole, the electron-electron repulsion decreases relative to the mean-field value. The convexity follows from \\(dW_{xc}/d\\lambda = 2E_c^{\\mathrm{GL2}}/\\lambda + \\ldots \\leq 0\\) from second-order G&ouml;rling-Levy perturbation theory.'
                },
                {
                    question: 'For range-separated hybrids, the error function satisfies \\(\\mathrm{erf}(0) = 0\\) and \\(\\mathrm{erf}(\\infty) = 1\\). Verify that the range separation identity is exact and explain the physical meaning of \\(\\omega\\).',
                    hint: 'Check that \\(\\mathrm{erfc}(x) + \\mathrm{erf}(x) = 1\\) for all \\(x \\geq 0\\).',
                    solution: 'Since \\(\\mathrm{erfc}(x) = 1 - \\mathrm{erf}(x)\\), we have \\(\\mathrm{erfc}(\\omega r)/r + \\mathrm{erf}(\\omega r)/r = [1 - \\mathrm{erf}(\\omega r) + \\mathrm{erf}(\\omega r)]/r = 1/r\\). The parameter \\(\\omega\\) controls the crossover distance \\(r^* \\sim 1/\\omega\\): for \\(r_{12} \\ll 1/\\omega\\), \\(\\mathrm{erfc}(\\omega r_{12}) \\approx 1\\) (SR dominates, DFT exchange used); for \\(r_{12} \\gg 1/\\omega\\), \\(\\mathrm{erf}(\\omega r_{12}) \\approx 1\\) (LR dominates, HF exchange used). Typical \\(\\omega \\approx 0.2{-}0.5\\) bohr\\(^{-1}\\) corresponds to crossover at 2-5 bohr.'
                },
                {
                    question: 'B3LYP uses VWN correlation for the "local" part and LYP for the "gradient-corrected" part. Explain the inconsistency and why it matters less than one might think.',
                    hint: 'Consider what happens in the uniform density limit for B3LYP versus for PBE0.',
                    solution: 'In B3LYP, the correlation is \\((1-a_c)E_c^{\\mathrm{VWN}} + a_c E_c^{\\mathrm{LYP}}\\) with \\(a_c = 0.81\\). VWN is an LDA parametrization (correct UEG limit), while LYP does not reduce to the correct UEG correlation. So B3LYP gives an incorrect UEG limit. In practice this matters little because: (1) real molecular densities are far from uniform, (2) the empirical parameters \\(a_0, a_x, a_c\\) partially absorb the inconsistency, and (3) the fitting to thermochemical data means the functional is optimized for the "right answer" on molecules, not for UEG correctness. Still, this theoretical inconsistency is why purists prefer PBE0 or SCAN0.'
                }
            ]
        },

        // ============================================================
        // SECTION 4: Double Hybrid and Dispersion Corrections
        // ============================================================
        {
            id: 'ch12-sec04',
            title: 'Double Hybrids & Dispersion',
            content: `
                <h2>Double Hybrid and Dispersion Corrections</h2>

                <p class="section-roadmap"><strong>Section roadmap.</strong> We reach the fifth rung of Jacob's ladder with double hybrid functionals, which incorporate a fraction of MP2-type correlation alongside HF exchange. We then discuss the crucial problem of dispersion (van der Waals) interactions in DFT and the DFT-D3, DFT-D4, and many-body dispersion (MBD) correction schemes.</p>

                <h3>Double Hybrid Functionals</h3>

                <div class="env-block definition">
                    <div class="env-title">Definition 12.20 (Double Hybrid)</div>
                    <div class="env-body">
                        <p>A <strong>double hybrid</strong> functional mixes both exact exchange and a perturbative (MP2-like) correlation correction:</p>
                        \\[E_{xc}^{\\mathrm{DH}} = a_x E_x^{\\mathrm{HF}} + (1 - a_x) E_x^{\\mathrm{DFT}} + (1 - a_c) E_c^{\\mathrm{DFT}} + a_c E_c^{\\mathrm{MP2}}\\]
                        <p>where the MP2 correlation is evaluated using Kohn-Sham orbitals and eigenvalues:</p>
                        \\[E_c^{\\mathrm{MP2}} = \\sum_{ia}\\sum_{jb} \\frac{|\\langle ij || ab \\rangle|^2}{\\varepsilon_i + \\varepsilon_j - \\varepsilon_a - \\varepsilon_b}\\]
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 12.21 (B2PLYP)</div>
                    <div class="env-body">
                        <p><strong>B2PLYP</strong> (Grimme, 2006) uses \\(a_x = 0.53\\) and \\(a_c = 0.27\\):</p>
                        \\[E_{xc}^{\\mathrm{B2PLYP}} = 0.53\\, E_x^{\\mathrm{HF}} + 0.47\\, E_x^{\\mathrm{B88}} + 0.73\\, E_c^{\\mathrm{LYP}} + 0.27\\, E_c^{\\mathrm{MP2}}\\]
                        <p>Double hybrids are the most accurate general-purpose density functionals for thermochemistry, achieving mean absolute errors below 2 kcal/mol on standard benchmark sets. The trade-off is computational cost: the MP2 step scales as \\(\\mathcal{O}(N^5)\\) versus \\(\\mathcal{O}(N^3)\\) for GGA/hybrid SCF.</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark 12.22 (Theoretical Foundation)</div>
                    <div class="env-body">
                        <p>The theoretical basis for double hybrids comes from G&ouml;rling-Levy second-order perturbation theory applied to the adiabatic connection. The MP2-like term approximates the correlation contribution to \\(E_{xc}\\) that is beyond the reach of semilocal functionals. The large fraction of exact exchange (\\(\\sim\\)50%) is needed because the MP2 correlation is evaluated with exchange-only (rather than exchange-correlation) orbitals.</p>
                    </div>
                </div>

                <h3>The Dispersion Problem</h3>

                <p>Standard density functionals (LDA through hybrids) fail qualitatively for van der Waals (dispersion) interactions. This is because dispersion arises from correlated <em>instantaneous</em> dipole fluctuations between non-overlapping fragments, a genuinely non-local effect that cannot be captured by any semilocal functional.</p>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 12.23 (Failure of Semilocal DFT for Dispersion)</div>
                    <div class="env-body">
                        <p>The London dispersion interaction between two neutral atoms at large separation \\(R\\) scales as \\(-C_6/R^6\\). Any semilocal exchange-correlation functional \\(E_{xc} = \\int f(\\rho, \\nabla\\rho, \\tau) d\\mathbf{r}\\) gives an interaction energy that decays <em>exponentially</em> with \\(R\\) (since the density overlap decays exponentially), and therefore cannot capture the \\(R^{-6}\\) dispersion tail.</p>
                    </div>
                </div>

                <h3>DFT-D3 and DFT-D4</h3>

                <div class="env-block definition">
                    <div class="env-title">Definition 12.24 (DFT-D3 Dispersion Correction)</div>
                    <div class="env-body">
                        <p>The <strong>DFT-D3</strong> method of Grimme et al. (2010) adds a pairwise dispersion energy to the DFT total energy:</p>
                        \\[E_{\\mathrm{DFT-D3}} = E_{\\mathrm{DFT}} - \\sum_{n=6,8} s_n \\sum_{A>B} \\frac{C_n^{AB}}{R_{AB}^n} f_{\\mathrm{damp},n}(R_{AB})\\]
                        <p>Key features:</p>
                        <ul>
                            <li>\\(C_6^{AB}\\) coefficients depend on the <strong>coordination number</strong> (chemical environment) of atoms A and B, computed from precomputed reference data using time-dependent DFT.</li>
                            <li>The Becke-Johnson (BJ) damping function \\(f_{\\mathrm{damp}}\\) smoothly switches off the correction at short range to avoid double-counting with the DFT functional.</li>
                            <li>Three-body Axilrod-Teller-Muto (ATM) terms can be included for improved accuracy in condensed phases.</li>
                        </ul>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 12.25 (DFT-D4)</div>
                    <div class="env-body">
                        <p><strong>DFT-D4</strong> (Caldeweyher et al., 2019) improves on D3 by making the \\(C_6\\) coefficients depend on the <strong>atomic partial charges</strong>, providing a better description of charge-transfer effects on dispersion. It uses electronegativity-equilibration (EEQ) charges and includes:</p>
                        <ul>
                            <li>Charge-dependent \\(C_6\\) via interpolation of reference polarizabilities</li>
                            <li>Improved many-body contributions</li>
                            <li>Self-consistent coupling (optional)</li>
                        </ul>
                    </div>
                </div>

                <h3>Many-Body Dispersion (MBD)</h3>

                <div class="env-block definition">
                    <div class="env-title">Definition 12.26 (Many-Body Dispersion)</div>
                    <div class="env-body">
                        <p>The <strong>Many-Body Dispersion</strong> (MBD) method of Tkatchenko et al. maps the system onto a set of quantum harmonic oscillators (one per atom) coupled through the dipole interaction tensor. The dispersion energy is obtained by diagonalizing the coupled oscillator Hamiltonian:</p>
                        \\[E_{\\mathrm{MBD}} = \\frac{1}{2}\\sum_p \\omega_p - \\frac{3N}{2}\\bar{\\omega}\\]
                        <p>where \\(\\omega_p\\) are the \\(3N\\) eigenfrequencies of the coupled system and \\(\\bar{\\omega}\\) is the mean uncoupled frequency. MBD captures all orders of many-body dispersion, which is critical for molecular crystals, layered materials, and supramolecular assemblies.</p>
                    </div>
                </div>

                <div class="env-block warning">
                    <div class="env-title">When Dispersion Corrections Are Essential</div>
                    <div class="env-body">
                        <p>Dispersion corrections are <strong>mandatory</strong> for:</p>
                        <ul>
                            <li>Non-covalent interaction energies (hydrogen bonds, pi-stacking, CH-pi)</li>
                            <li>Conformational energies of flexible molecules</li>
                            <li>Adsorption on surfaces</li>
                            <li>Crystal structure prediction and lattice energies</li>
                            <li>Protein-ligand binding free energies</li>
                        </ul>
                        <p>Without dispersion corrections, DFT can give errors of 50-100% for these properties.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 12.27 (Benzene Dimer)</div>
                    <div class="env-body">
                        <p>The benzene dimer interaction energy (T-shaped, CCSD(T)/CBS reference: \\(-2.73\\) kcal/mol):</p>
                        <ul>
                            <li>B3LYP: \\(-0.2\\) kcal/mol (massive underbinding, 93% error)</li>
                            <li>B3LYP-D3(BJ): \\(-2.8\\) kcal/mol (excellent, 3% error)</li>
                            <li>\\(\\omega\\)B97X-D: \\(-2.6\\) kcal/mol (good, 5% error)</li>
                            <li>B2PLYP-D3(BJ): \\(-2.7\\) kcal/mol (excellent, 1% error)</li>
                        </ul>
                    </div>
                </div>
            `,
            visualizations: [],
            exercises: [
                {
                    question: 'Explain why double hybrids require a larger fraction of exact exchange (\\(\\sim\\)50%) than standard hybrids (\\(\\sim\\)20-25%).',
                    hint: 'Consider that in standard hybrids, the DFT correlation is designed to work with DFT exchange. When you replace part of the DFT correlation with MP2, what happens?',
                    solution: 'Standard DFT correlation functionals are designed to correct for the self-interaction error present in DFT exchange. When part of the DFT correlation is replaced by MP2 correlation, the remaining DFT correlation over-corrects, because MP2 does not have self-interaction error. To compensate, more exact (HF) exchange is needed to reduce the self-interaction error that the DFT correlation is trying to fix. In the adiabatic connection picture, increasing both \\(a_x\\) and \\(a_c\\) simultaneously is consistent: the MP2 term describes the \\(\\lambda\\)-dependence of the xc integrand near \\(\\lambda = 0\\), which requires the \\(\\lambda = 0\\) reference (i.e., HF) to be weighted more heavily.'
                },
                {
                    question: 'The BJ damping function in DFT-D3 has the form \\(f_{\\mathrm{damp},6}(R) = R^6/(R^6 + (a_1 R_0^{AB} + a_2)^6)\\). Show that \\(f \\to 0\\) as \\(R \\to 0\\) and \\(f \\to 1\\) as \\(R \\to \\infty\\). Why is damping necessary?',
                    hint: 'Take the limits directly. For the second part, consider what happens to \\(C_6/R^6\\) at short \\(R\\).',
                    solution: 'As \\(R \\to 0\\): \\(f = R^6/[R^6 + \\text{const}^6] \\to 0\\). As \\(R \\to \\infty\\): \\(f = R^6/[R^6 + \\text{const}^6] \\to 1\\). Damping is necessary because: (1) the \\(C_6/R^6\\) form diverges as \\(R \\to 0\\), which is unphysical, and (2) at short range, the DFT functional already captures short-range correlation; adding the full \\(C_6/R^6\\) would double-count. BJ damping leaves a finite, non-zero correction at \\(R = 0\\), which acts as a short-range repulsion correction and improves geometries compared to zero-damping.'
                },
                {
                    question: 'The computational cost of double hybrids scales as \\(\\mathcal{O}(N^5)\\) due to the MP2 step. Estimate how much slower B2PLYP is compared to B3LYP for a molecule with \\(N = 1000\\) basis functions.',
                    hint: 'B3LYP scales as \\(\\mathcal{O}(N^3)\\) for the Coulomb/XC part but \\(\\mathcal{O}(N^4)\\) with exact exchange using conventional algorithms. With RI (resolution of identity), exact exchange scales as \\(\\mathcal{O}(N^3)\\).',
                    solution: 'With conventional algorithms: B3LYP scales as \\(\\mathcal{O}(N^4)\\) (dominated by exact exchange integrals), B2PLYP as \\(\\mathcal{O}(N^5)\\) (MP2 step). So B2PLYP is roughly \\(N = 1000\\) times slower. With RI approximation: B3LYP reduces to \\(\\mathcal{O}(N^3)\\), RI-B2PLYP to \\(\\mathcal{O}(N^4)\\) or even \\(\\mathcal{O}(N^3)\\) with Laplace transform MP2. In practice, for \\(N = 1000\\), B2PLYP is about 10-100x slower than B3LYP with modern RI implementations. SOS-MP2 variants (scaling opposite-spin only) reduce cost to \\(\\mathcal{O}(N^4)\\) with a prefactor similar to HF.'
                },
                {
                    question: 'Prove that the London dispersion interaction \\(-C_6/R^6\\) between two ground-state hydrogen atoms cannot be captured by any functional of the form \\(\\int f(\\rho(\\mathbf{r}))\\, d\\mathbf{r}\\).',
                    hint: 'At large separation \\(R\\), the density of two hydrogen atoms is \\(\\rho(\\mathbf{r}) \\approx \\rho_A(\\mathbf{r}) + \\rho_B(\\mathbf{r})\\) with exponentially small overlap. Consider how a local functional responds to this density.',
                    solution: 'At separation \\(R \\gg 1\\), the density overlap is \\(\\mathcal{O}(e^{-\\alpha R})\\) for some \\(\\alpha > 0\\). A local functional \\(\\int f(\\rho) d\\mathbf{r}\\) decomposes as \\(\\int f(\\rho_A) d\\mathbf{r} + \\int f(\\rho_B) d\\mathbf{r}\\) plus corrections from the overlap region of volume \\(\\sim R^3\\) but density \\(\\sim e^{-\\alpha R}\\). Since \\(f\\) is smooth, the interaction energy is \\(\\mathcal{O}(R^3 e^{-\\alpha R}) = \\mathcal{O}(e^{-\\alpha R/2})\\), which decays exponentially, not as \\(R^{-6}\\). The same argument extends to any semilocal functional \\(f(\\rho, \\nabla\\rho, \\tau)\\). Dispersion is intrinsically non-local: it requires correlating density fluctuations at two distant points simultaneously.'
                },
                {
                    question: 'In DFT-D3, the \\(C_6\\) coefficient depends on the coordination number (CN). For a carbon atom in methane (CN \\(\\approx 4\\)), ethylene (CN \\(\\approx 3\\)), and benzene (CN \\(\\approx 3\\)), how and why should \\(C_6^{CC}\\) differ?',
                    hint: 'Higher coordination means the atom shares its valence electrons with more neighbors. How does this affect atomic polarizability?',
                    solution: 'Polarizability (and hence \\(C_6\\)) decreases with increasing coordination number because: (1) shared electrons are less polarizable than lone-pair or pi electrons, and (2) the effective "size" of the atomic charge cloud shrinks. So \\(C_6^{CC}\\)(methane) < \\(C_6^{CC}\\)(benzene) \\(\\approx C_6^{CC}\\)(ethylene). Quantitatively, for carbon: \\(C_6 \\approx 18.1\\) for sp\\(^3\\) (CN\\(\\sim\\)4), \\(25.7\\) for sp\\(^2\\) (CN\\(\\sim\\)3), and \\(\\sim 30\\) for sp (CN\\(\\sim\\)2), all in hartree\\(\\cdot\\)bohr\\(^6\\). D3 interpolates between these reference values using a Gaussian weighting in CN-space.'
                }
            ]
        },

        // ============================================================
        // SECTION 5: Choosing a Functional
        // ============================================================
        {
            id: 'ch12-sec05',
            title: 'Choosing a Functional',
            content: `
                <h2>Choosing a Functional: Jacob's Ladder and Benchmarks</h2>

                <p class="section-roadmap"><strong>Section roadmap.</strong> We synthesize the preceding sections into a practical guide for choosing exchange-correlation functionals. We present Jacob's ladder of DFT approximations, discuss systematic benchmark studies, and provide recommendations for different property types.</p>

                <h3>Jacob's Ladder</h3>

                <p>Perdew's "Jacob's ladder" organizes density functional approximations by their ingredients, with each rung adding more information and (typically) more accuracy:</p>

                <div class="viz-placeholder" data-viz="jacobs-ladder"></div>

                <div class="env-block definition">
                    <div class="env-title">Definition 12.28 (Jacob's Ladder of DFT)</div>
                    <div class="env-body">
                        <p>The five rungs of Jacob's ladder, ascending from "Hartree earth" to "chemical accuracy heaven":</p>
                        <ol>
                            <li><strong>LDA</strong>: depends on \\(\\rho\\) only. Ingredients: \\(\\varepsilon_{xc}^{\\mathrm{UEG}}(\\rho)\\). Examples: SVWN, PW92.</li>
                            <li><strong>GGA</strong>: adds \\(|\\nabla\\rho|\\). Examples: PBE, BLYP, BP86.</li>
                            <li><strong>Meta-GGA</strong>: adds \\(\\tau\\) (kinetic energy density). Examples: TPSS, SCAN, r\\(^2\\)SCAN, M06-L.</li>
                            <li><strong>Hybrid</strong>: adds exact exchange \\(E_x^{\\mathrm{HF}}\\). Examples: B3LYP, PBE0, \\(\\omega\\)B97X-D, M06-2X.</li>
                            <li><strong>Double hybrid</strong>: adds virtual orbitals (MP2 correlation). Examples: B2PLYP, PWPB95, DSD-BLYP.</li>
                        </ol>
                    </div>
                </div>

                <div class="env-block warning">
                    <div class="env-title">The Ladder Is Not Monotonic</div>
                    <div class="env-body">
                        <p>Higher rungs do <strong>not</strong> guarantee better results for every property. A poorly designed meta-GGA can perform worse than a well-designed GGA. The ladder describes the <em>potential</em> for accuracy: more ingredients allow satisfying more exact constraints, but the actual performance depends on the functional's design and parametrization.</p>
                    </div>
                </div>

                <h3>Benchmark Studies</h3>

                <p>Modern functional development is guided by extensive benchmark databases. The most important are:</p>

                <div class="env-block example">
                    <div class="env-title">Example 12.29 (Key Benchmark Sets)</div>
                    <div class="env-body">
                        <ul>
                            <li><strong>GMTKN55</strong> (Goerigk et al., 2017): 55 subsets, 1505 data points covering main-group thermochemistry, kinetics, and non-covalent interactions.</li>
                            <li><strong>W4-11</strong> (Karton et al.): 140 atomization energies at near-benchmark (W4) accuracy.</li>
                            <li><strong>S66</strong> (Rezac et al.): 66 non-covalent interaction energies covering hydrogen bonds, dispersion, and mixed interactions.</li>
                            <li><strong>BH76</strong>: 76 barrier heights for hydrogen-transfer, heavy-atom transfer, and nucleophilic substitution reactions.</li>
                            <li><strong>MOR41</strong>: 41 organometallic reaction energies.</li>
                        </ul>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="functional-benchmark"></div>

                <h3>Recommendations by Property</h3>

                <div class="env-block definition">
                    <div class="env-title">Practical Recommendations</div>
                    <div class="env-body">
                        <p><strong>Molecular geometries:</strong> Almost any GGA or better works well. PBE, B3LYP, and \\(\\omega\\)B97X-D all give bond lengths within 0.01-0.02 &Aring; of experiment. Use tight convergence criteria.</p>
                        <p><strong>Thermochemistry (atomization, reaction energies):</strong> Hybrid functionals are the minimum. B3LYP-D3(BJ) or \\(\\omega\\)B97X-D with a triple-zeta basis. For high accuracy, B2PLYP-D3(BJ) or revDSD-PBEP86.</p>
                        <p><strong>Barrier heights:</strong> Use hybrid functionals with \\(\\geq 25\\%\\) exact exchange. M06-2X, \\(\\omega\\)B97X-D, or PBE0-D3(BJ). GGAs systematically underestimate barriers.</p>
                        <p><strong>Non-covalent interactions:</strong> Dispersion correction is mandatory. \\(\\omega\\)B97X-D, B3LYP-D3(BJ), or SCAN-D3(BJ). For benchmarking, use DLPNO-CCSD(T) or symmetry-adapted perturbation theory (SAPT).</p>
                        <p><strong>Transition metals:</strong> More challenging. PBE0, TPSSh (10% HF exchange), or M06 for 3d metals. r\\(^2\\)SCAN for solids. Avoid B3LYP for transition metals (biased toward low-spin states).</p>
                        <p><strong>Band gaps and solid-state:</strong> HSE06 (screened hybrid) for semiconductors. PBE for metals. SCAN for general solid-state properties.</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">The 80/20 Rule of Functional Selection</div>
                    <div class="env-body">
                        <p>For 80% of computational chemistry applications, \\(\\omega\\)B97X-D or B3LYP-D3(BJ) with a def2-TZVPP basis set will give results within "chemical accuracy" (1 kcal/mol). The remaining 20% involves transition metals, excited states, strongly correlated systems, or dispersion-dominated assemblies, where specialist functionals or post-Hartree-Fock methods are needed. Always check your functional choice against available benchmarks for your specific problem class.</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark 12.30 (The Future)</div>
                    <div class="env-body">
                        <p>Current frontiers include: (1) machine-learned functionals (e.g., DM21 from DeepMind, which addresses the delocalization/strong correlation problem), (2) non-local correlation functionals (e.g., VV10 for seamless dispersion), (3) adiabatic-connection-based double hybrids with improved scaling, and (4) embedding methods that combine DFT with wavefunction theory for different parts of a system. The field continues to evolve rapidly.</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'jacobs-ladder',
                    title: 'Jacob\'s Ladder of Density Functional Approximations',
                    description: 'Click on each rung to see the ingredients, example functionals, typical accuracy, and computational cost. Ascending the ladder generally increases accuracy and cost.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 450 });
                        var ctx = viz.ctx;
                        var selectedRung = -1;

                        var rungs = [
                            {
                                name: 'LDA',
                                y: 370,
                                color: '#f85149',
                                ingredients: 'Ingredients: \u03C1 (electron density)',
                                functionals: 'SVWN, PW92',
                                mae: 'MAE atomization: ~40 kcal/mol',
                                cost: 'Cost: O(N\u00B3)',
                                desc: 'Uniform electron gas reference. Good for metals, poor for molecules.'
                            },
                            {
                                name: 'GGA',
                                y: 300,
                                color: '#f0883e',
                                ingredients: 'Ingredients: \u03C1, |\u2207\u03C1|',
                                functionals: 'PBE, BLYP, BP86',
                                mae: 'MAE atomization: ~7 kcal/mol',
                                cost: 'Cost: O(N\u00B3)',
                                desc: 'Gradient corrections. Workhorse for solid-state physics.'
                            },
                            {
                                name: 'meta-GGA',
                                y: 230,
                                color: '#d29922',
                                ingredients: 'Ingredients: \u03C1, |\u2207\u03C1|, \u03C4',
                                functionals: 'SCAN, TPSS, r\u00B2SCAN, M06-L',
                                mae: 'MAE atomization: ~4 kcal/mol',
                                cost: 'Cost: O(N\u00B3)',
                                desc: 'Kinetic energy density distinguishes bonding types.'
                            },
                            {
                                name: 'Hybrid',
                                y: 160,
                                color: '#3fb950',
                                ingredients: 'Ingredients: \u03C1, |\u2207\u03C1|, \u03C4, E_x^HF',
                                functionals: 'B3LYP, PBE0, \u03C9B97X-D, M06-2X',
                                mae: 'MAE atomization: ~2-3 kcal/mol',
                                cost: 'Cost: O(N\u2074)',
                                desc: 'Exact exchange reduces self-interaction. Chemistry standard.'
                            },
                            {
                                name: 'Double Hybrid',
                                y: 90,
                                color: '#58a6ff',
                                ingredients: 'Ingredients: \u03C1, |\u2207\u03C1|, \u03C4, E_x^HF, E_c^MP2',
                                functionals: 'B2PLYP, DSD-BLYP, revDSD-PBEP86',
                                mae: 'MAE atomization: ~1-2 kcal/mol',
                                cost: 'Cost: O(N\u2075)',
                                desc: 'MP2 correlation. Highest accuracy DFT. Near chemical accuracy.'
                            }
                        ];

                        // Click handler
                        viz.canvas.addEventListener('click', function(e) {
                            var rect = viz.canvas.getBoundingClientRect();
                            var mx = e.clientX - rect.left;
                            var my = e.clientY - rect.top;
                            selectedRung = -1;
                            for (var i = 0; i < rungs.length; i++) {
                                if (my > rungs[i].y - 25 && my < rungs[i].y + 15) {
                                    selectedRung = i;
                                    break;
                                }
                            }
                        });

                        function draw() {
                            viz.clear();

                            // Draw ladder sides
                            ctx.strokeStyle = '#4a4a7a';
                            ctx.lineWidth = 3;
                            ctx.beginPath(); ctx.moveTo(80, 400); ctx.lineTo(130, 55); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(280, 400); ctx.lineTo(320, 55); ctx.stroke();

                            // Title
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText("Jacob's Ladder of DFT", 280, 30);

                            // Arrow pointing up
                            ctx.fillStyle = viz.colors.teal;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('\u2191 Accuracy', 340, 80);
                            ctx.fillText('\u2191 Cost', 340, 95);

                            // Labels at bottom and top
                            ctx.fillStyle = viz.colors.muted;
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('"Hartree world"', 180, 420);
                            ctx.fillText('"Chemical accuracy heaven"', 220, 55);

                            // Draw rungs
                            for (var i = 0; i < rungs.length; i++) {
                                var r = rungs[i];
                                var lx1 = 80 + (130 - 80) * (400 - r.y) / (400 - 55);
                                var lx2 = 280 + (320 - 280) * (400 - r.y) / (400 - 55);
                                var isSelected = (i === selectedRung);

                                // Rung bar
                                ctx.strokeStyle = isSelected ? r.color : r.color + '88';
                                ctx.lineWidth = isSelected ? 6 : 4;
                                ctx.beginPath(); ctx.moveTo(lx1, r.y); ctx.lineTo(lx2, r.y); ctx.stroke();

                                // Glow if selected
                                if (isSelected) {
                                    ctx.shadowColor = r.color;
                                    ctx.shadowBlur = 12;
                                    ctx.strokeStyle = r.color;
                                    ctx.lineWidth = 6;
                                    ctx.beginPath(); ctx.moveTo(lx1, r.y); ctx.lineTo(lx2, r.y); ctx.stroke();
                                    ctx.shadowBlur = 0;
                                }

                                // Label on rung
                                ctx.fillStyle = isSelected ? viz.colors.white : viz.colors.text;
                                ctx.font = (isSelected ? 'bold ' : '') + '13px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText(r.name, (lx1 + lx2) / 2, r.y - 10);
                            }

                            // Info panel for selected rung
                            if (selectedRung >= 0) {
                                var sr = rungs[selectedRung];
                                var px = 360, py = 140;

                                ctx.fillStyle = '#14142e';
                                ctx.strokeStyle = sr.color;
                                ctx.lineWidth = 1.5;
                                ctx.beginPath();
                                ctx.roundRect(px, py, 185, 170, 8);
                                ctx.fill(); ctx.stroke();

                                ctx.fillStyle = sr.color;
                                ctx.font = 'bold 14px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.fillText('Rung ' + (selectedRung + 1) + ': ' + sr.name, px + 10, py + 20);

                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '11px -apple-system,sans-serif';
                                var lines = [sr.ingredients, '', sr.functionals, '', sr.mae, sr.cost, '', sr.desc];
                                var ly = py + 40;
                                for (var li = 0; li < lines.length; li++) {
                                    if (lines[li] === '') { ly += 4; continue; }
                                    // Word wrap at ~24 chars
                                    var text = lines[li];
                                    while (text.length > 0) {
                                        var cutoff = Math.min(text.length, 28);
                                        if (cutoff < text.length) {
                                            var sp = text.lastIndexOf(' ', cutoff);
                                            if (sp > 10) cutoff = sp;
                                        }
                                        ctx.fillText(text.substring(0, cutoff), px + 10, ly);
                                        text = text.substring(cutoff).trim();
                                        ly += 14;
                                    }
                                }
                            } else {
                                // Prompt
                                ctx.fillStyle = viz.colors.muted;
                                ctx.font = '12px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('Click a rung for details', 400, 250);
                            }
                        }

                        viz.animate(draw);
                        return viz;
                    }
                },
                {
                    id: 'functional-benchmark',
                    title: 'Functional Accuracy Benchmarks (MAE in kcal/mol)',
                    description: 'Mean absolute errors for representative functionals across different property types. Lower bars indicate better accuracy.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 420 });
                        var ctx = viz.ctx;
                        var category = 0;

                        var categories = ['Atomization', 'Barriers', 'Non-covalent', 'Overall (WTMAD-2)'];
                        var functionals = ['SVWN', 'PBE', 'SCAN', 'B3LYP', 'PBE0', '\u03C9B97X-D', 'B2PLYP-D3'];
                        var colors = ['#f85149', '#f0883e', '#d29922', '#3fb950', '#3fb9a0', '#58a6ff', '#bc8cff'];

                        // MAE data (approximate, representative values in kcal/mol)
                        var data = [
                            [42, 7.0, 3.5, 3.5, 3.0, 2.0, 1.5],   // atomization
                            [15, 8.5, 5.5, 4.8, 3.5, 1.8, 1.2],   // barriers
                            [3.0, 2.5, 1.2, 3.8, 2.8, 0.5, 0.3],  // non-covalent (with D3 where applicable)
                            [30, 7.5, 4.0, 4.5, 3.5, 1.5, 1.0]    // overall WTMAD-2
                        ];

                        VizEngine.createButton(controls, 'Atomization', function() { category = 0; });
                        VizEngine.createButton(controls, 'Barriers', function() { category = 1; });
                        VizEngine.createButton(controls, 'Non-covalent', function() { category = 2; });
                        VizEngine.createButton(controls, 'Overall', function() { category = 3; });

                        function draw() {
                            viz.clear();

                            var margin = { top: 50, right: 30, bottom: 80, left: 70 };
                            var w = viz.width - margin.left - margin.right;
                            var h = viz.height - margin.top - margin.bottom;
                            var vals = data[category];
                            var maxVal = Math.max.apply(null, vals) * 1.15;
                            var barW = w / functionals.length * 0.65;
                            var gap = w / functionals.length;

                            // Title
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText(categories[category] + ' Energies: MAE (kcal/mol)', viz.width / 2, 25);

                            // Y axis
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.moveTo(margin.left, margin.top); ctx.lineTo(margin.left, margin.top + h); ctx.stroke();

                            // X axis
                            ctx.beginPath(); ctx.moveTo(margin.left, margin.top + h); ctx.lineTo(margin.left + w, margin.top + h); ctx.stroke();

                            // Y ticks
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'right';
                            var nTicks = 5;
                            for (var t = 0; t <= nTicks; t++) {
                                var val = maxVal * t / nTicks;
                                var ty = margin.top + h - (val / maxVal) * h;
                                ctx.fillText(val.toFixed(1), margin.left - 8, ty + 3);
                                ctx.strokeStyle = viz.colors.grid;
                                ctx.lineWidth = 0.5;
                                ctx.beginPath(); ctx.moveTo(margin.left, ty); ctx.lineTo(margin.left + w, ty); ctx.stroke();
                            }

                            // Chemical accuracy line
                            if (maxVal > 1.0) {
                                var caY = margin.top + h - (1.0 / maxVal) * h;
                                ctx.strokeStyle = '#3fb95088';
                                ctx.lineWidth = 1.5;
                                ctx.setLineDash([6, 4]);
                                ctx.beginPath(); ctx.moveTo(margin.left, caY); ctx.lineTo(margin.left + w, caY); ctx.stroke();
                                ctx.setLineDash([]);
                                ctx.fillStyle = '#3fb950';
                                ctx.font = '10px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.fillText('Chemical accuracy (1 kcal/mol)', margin.left + 5, caY - 5);
                            }

                            // Bars
                            for (var i = 0; i < functionals.length; i++) {
                                var bx = margin.left + i * gap + (gap - barW) / 2;
                                var bh = (vals[i] / maxVal) * h;
                                var by = margin.top + h - bh;

                                // Bar gradient
                                var grad = ctx.createLinearGradient(bx, by, bx, margin.top + h);
                                grad.addColorStop(0, colors[i]);
                                grad.addColorStop(1, colors[i] + '44');
                                ctx.fillStyle = grad;
                                ctx.fillRect(bx, by, barW, bh);

                                // Border
                                ctx.strokeStyle = colors[i];
                                ctx.lineWidth = 1;
                                ctx.strokeRect(bx, by, barW, bh);

                                // Value on top
                                ctx.fillStyle = colors[i];
                                ctx.font = 'bold 11px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText(vals[i].toFixed(1), bx + barW / 2, by - 6);

                                // Label below
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '10px -apple-system,sans-serif';
                                ctx.save();
                                ctx.translate(bx + barW / 2, margin.top + h + 12);
                                ctx.rotate(Math.PI / 5);
                                ctx.textAlign = 'left';
                                ctx.fillText(functionals[i], 0, 0);
                                ctx.restore();
                            }
                        }

                        viz.animate(draw);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'You need to compute the binding energy of a drug molecule to a protein active site. Which functional would you choose and why? What basis set?',
                    hint: 'Consider that protein-ligand binding involves hydrogen bonds, dispersion, and possibly charge transfer. The system is large (hundreds of atoms).',
                    solution: 'For protein-ligand binding, use \\(\\omega\\)B97X-D or B3LYP-D3(BJ), which capture both hydrogen bonds and dispersion interactions. Basis set: def2-SVP for geometry optimization (speed), def2-TZVPP for single-point energies (accuracy). If the system is very large (>500 atoms), use a GGA like PBE-D3(BJ) or r\\(^2\\)SCAN-D3(BJ) since hybrid functionals are expensive for large systems. Include counterpoise corrections or use a large enough basis to minimize BSSE. For benchmarking, compare against DLPNO-CCSD(T)/CBS on a smaller model of the binding site.'
                },
                {
                    question: 'Explain why B3LYP without dispersion correction is still widely used despite its known deficiencies for non-covalent interactions.',
                    hint: 'Consider historical reasons, software availability, the types of problems for which B3LYP was originally designed, and error cancellation.',
                    solution: 'B3LYP without D3 remains common because: (1) Historical inertia: it was the first widely available hybrid functional, has extensive benchmarks, and many published studies use it. (2) For many problems (covalent bond energies, geometries, vibrational frequencies of small molecules), dispersion is unimportant and B3LYP performs well. (3) Error cancellation: for reaction energies where both reactant and product have similar dispersion interactions, the errors partially cancel. (4) Some codes have more mature B3LYP implementations. However, for any new study involving conformational energies, non-covalent interactions, or large molecules, B3LYP without D3/D4 is no longer defensible. Always add a dispersion correction.'
                },
                {
                    question: 'A colleague claims "SCAN is always better than PBE because it is a higher rung on Jacob\'s ladder." Critique this claim.',
                    hint: 'Consider specific systems and properties where SCAN might not improve over PBE, and the general principle that rungs represent potential, not guaranteed, accuracy.',
                    solution: 'The claim is too strong. While SCAN satisfies more exact constraints than PBE and generally performs better on average, there are cases where PBE is competitive or even superior: (1) For simple metals and metallic bonding, PBE is well-tested and SCAN can sometimes over-structure liquids. (2) SCAN has numerical issues (sensitivity to integration grids, potential energy surface smoothness) that r\\(^2\\)SCAN was designed to fix. (3) For specific reactions where PBE benefits from error cancellation, SCAN may not improve. (4) PBE is more computationally robust (no \\(\\tau\\) needed, simpler SCF convergence). The correct statement is that SCAN has the *potential* for higher accuracy because it can distinguish bonding types via \\(\\alpha\\), but this potential is only realized on average across diverse benchmarks.'
                },
                {
                    question: 'Why is the fraction of exact exchange in hybrid functionals different for different properties? Specifically, why do barrier heights prefer more exact exchange than atomization energies?',
                    hint: 'Consider the self-interaction error and how it affects compact (equilibrium) versus stretched (transition state) geometries differently.',
                    solution: 'Self-interaction error (SIE) in DFT exchange causes electrons to be artificially delocalized. At equilibrium geometries (compact molecules), this delocalization is partially corrected by the DFT correlation, leading to reasonable atomization energies with ~20% HF exchange. At transition states, bonds are partially broken and electrons can delocalize over fragments, making SIE more severe. More exact exchange (which is SIE-free) is needed to properly localize electrons at TS geometries. Quantitatively: B3LYP (20% HF) gives MAE ~4.8 kcal/mol for barriers; M06-2X (54% HF) gives ~1.3 kcal/mol. For atomization energies, the trend reverses: M06-2X (MAE ~2.2 kcal/mol) is only slightly better than B3LYP (MAE ~3.5 kcal/mol), and too much HF exchange degrades atomization energies by reducing beneficial error cancellation between exchange and correlation.'
                },
                {
                    question: 'Design a computational protocol to benchmark a new functional against CCSD(T)/CBS reference data for a set of 50 reaction energies. What sources of error must you control?',
                    hint: 'Consider basis set incompleteness, reference geometry, thermal corrections, relativistic effects, and statistical measures.',
                    solution: 'Protocol: (1) Reference data: CCSD(T)/CBS via extrapolation from aug-cc-pVTZ and aug-cc-pVQZ, or use explicitly correlated CCSD(T)-F12/cc-pVDZ-F12. (2) Geometries: optimize at the DFT level being tested, OR use a common reference geometry (e.g., CCSD(T)/cc-pVTZ). Using DFT-optimized geometries is more realistic but conflates geometry and energy errors. (3) Basis set for DFT: test convergence with def2-SVP, def2-TZVPP, def2-QZVPP. Report results at def2-QZVPP (near CBS). (4) Controls: same integration grids, SCF convergence thresholds, frozen-core approximation. (5) Statistics: report MAE, RMSE, MAX error, and MSD (to detect systematic bias). (6) Subgroup analysis: separate results by reaction type. (7) Potential pitfalls: multireference character (check T1 diagnostic), relativistic effects (use DKH or ZORA for heavy elements), BSSE (use counterpoise or large basis).'
                }
            ]
        }
    ]
});
