window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch01',
    number: 1,
    title: 'The Hydrogen Atom',
    subtitle: 'The exactly solvable problem that grounds all of chemistry',
    sections: [
        // ===================== Section 1: The Schrödinger Equation for Hydrogen =====================
        {
            id: 'ch01-sec01',
            title: 'The Schr\u00f6dinger Equation for Hydrogen',
            content: `<h2>The Schr&ouml;dinger Equation for Hydrogen</h2>

                <div class="env-block intuition">
                    <div class="env-title">Why Hydrogen?</div>
                    <div class="env-body"><p>The hydrogen atom is the only chemically relevant system whose Schr&ouml;dinger equation can be solved <strong>exactly</strong>. Every concept in quantum chemistry (atomic orbitals, basis sets, electron correlation, molecular orbital theory) is built by analogy with, or perturbation from, the hydrogen atom solution. Understanding this solution in detail is not optional; it is the foundation on which all of computational chemistry rests.</p></div>
                </div>

                <h3>The Hamiltonian</h3>
                <p>For a single electron of mass \\(m_e\\) and charge \\(-e\\) orbiting a nucleus of charge \\(+Ze\\) and mass \\(M\\), the Hamiltonian in SI units is:
                \\[\\hat{H} = -\\frac{\\hbar^2}{2m_e}\\nabla_e^2 - \\frac{\\hbar^2}{2M}\\nabla_N^2 - \\frac{Ze^2}{4\\pi\\epsilon_0 r}\\]
                where \\(r = |\\mathbf{r}_e - \\mathbf{r}_N|\\) is the electron-nucleus distance.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition (Center of Mass Separation)</div>
                    <div class="env-body"><p>Introducing the center-of-mass coordinate \\(\\mathbf{R} = \\frac{m_e\\mathbf{r}_e + M\\mathbf{r}_N}{m_e + M}\\) and relative coordinate \\(\\mathbf{r} = \\mathbf{r}_e - \\mathbf{r}_N\\), with <strong>reduced mass</strong> \\(\\mu = \\frac{m_e M}{m_e + M}\\), the Hamiltonian separates:
                    \\[\\hat{H} = -\\frac{\\hbar^2}{2(m_e + M)}\\nabla_R^2 + \\left[-\\frac{\\hbar^2}{2\\mu}\\nabla^2 - \\frac{Ze^2}{4\\pi\\epsilon_0 r}\\right]\\]
                    The first term describes free center-of-mass motion. The second (in brackets) is the <strong>internal Hamiltonian</strong> that determines the atomic structure. Since \\(M \\gg m_e\\) for hydrogen, \\(\\mu \\approx m_e\\).</p></div>
                </div>

                <p>In <strong>atomic units</strong> (\\(\\hbar = m_e = e = 4\\pi\\epsilon_0 = 1\\), length in Bohr \\(a_0 = 0.529\\) &Aring;, energy in Hartree \\(E_h = 27.21\\) eV), the internal Schr&ouml;dinger equation becomes:
                \\[\\left[-\\frac{1}{2}\\nabla^2 - \\frac{Z}{r}\\right]\\psi(\\mathbf{r}) = E\\psi(\\mathbf{r})\\]</p>

                <h3>Separation of Variables in Spherical Coordinates</h3>
                <p>Since the potential \\(V(r) = -Z/r\\) is spherically symmetric, we use spherical coordinates \\((r, \\theta, \\phi)\\). The Laplacian becomes:
                \\[\\nabla^2 = \\frac{1}{r^2}\\frac{\\partial}{\\partial r}\\left(r^2\\frac{\\partial}{\\partial r}\\right) + \\frac{1}{r^2}\\hat{\\Lambda}^2\\]
                where \\(\\hat{\\Lambda}^2\\) is the <strong>angular part</strong> (related to angular momentum \\(\\hat{L}^2 = -\\hbar^2\\hat{\\Lambda}^2\\)):
                \\[\\hat{\\Lambda}^2 = \\frac{1}{\\sin\\theta}\\frac{\\partial}{\\partial\\theta}\\left(\\sin\\theta\\frac{\\partial}{\\partial\\theta}\\right) + \\frac{1}{\\sin^2\\theta}\\frac{\\partial^2}{\\partial\\phi^2}\\]</p>

                <div class="env-block theorem">
                    <div class="env-title">Theorem (Separation of Variables)</div>
                    <div class="env-body"><p>Writing \\(\\psi(r, \\theta, \\phi) = R(r) \\cdot Y(\\theta, \\phi)\\) and substituting into the Schr&ouml;dinger equation, multiplying by \\(-2r^2/\\psi\\), the equation separates into:</p>
                    <p><strong>Angular equation:</strong>
                    \\[\\hat{\\Lambda}^2 Y(\\theta, \\phi) = -l(l+1)Y(\\theta, \\phi)\\]</p>
                    <p><strong>Radial equation:</strong>
                    \\[\\frac{d}{dr}\\left(r^2\\frac{dR}{dr}\\right) + 2r^2\\left(E + \\frac{Z}{r}\\right)R = l(l+1)R\\]</p>
                    <p>or equivalently, substituting \\(u(r) = rR(r)\\):
                    \\[-\\frac{1}{2}\\frac{d^2u}{dr^2} + \\left[-\\frac{Z}{r} + \\frac{l(l+1)}{2r^2}\\right]u = Eu\\]
                    The term \\(l(l+1)/(2r^2)\\) is the <strong>centrifugal barrier</strong>, which prevents the electron from reaching \\(r = 0\\) when \\(l \\geq 1\\).</p></div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body"><p>Substitute \\(\\psi = R(r)Y(\\theta,\\phi)\\) into \\(-\\frac{1}{2}\\left[\\frac{1}{r^2}\\frac{d}{dr}(r^2 R') Y + \\frac{R}{r^2}\\hat{\\Lambda}^2 Y\\right] - \\frac{Z}{r}RY = ERY\\). Divide by \\(RY\\) and multiply by \\(-2r^2\\):
                    \\[\\frac{1}{R}\\frac{d}{dr}(r^2 R') + 2r^2\\left(E + \\frac{Z}{r}\\right) = -\\frac{\\hat{\\Lambda}^2 Y}{Y}\\]
                    The left side depends only on \\(r\\); the right only on \\((\\theta, \\phi)\\). Both must equal a constant, conventionally written \\(l(l+1)\\).</p>
                    <div class="qed">&#8718;</div></div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark (Atomic Units)</div>
                    <div class="env-body"><p>Throughout quantum chemistry, atomic units simplify formulas enormously. Key conversions: 1 Hartree = 27.2114 eV = 627.51 kcal/mol, 1 Bohr = 0.5292 &Aring;. The fine-structure constant \\(\\alpha = e^2/(4\\pi\\epsilon_0\\hbar c) = 1/c \\approx 1/137\\) in atomic units, showing that relativistic effects are of order \\(\\alpha^2\\).</p></div>
                </div>`,

            exercises: [
                {
                    question: 'Show that the reduced mass correction changes the hydrogen Rydberg constant by a factor \\(\\mu/m_e = M/(m_e + M) \\approx 1 - m_e/M\\). For hydrogen (\\(M = 1836\\,m_e\\)), what is the fractional correction?',
                    hint: 'The energy scales as \\(\\mu\\), so \\(E_n = -\\frac{\\mu}{2\\hbar^2}\\left(\\frac{Ze^2}{4\\pi\\epsilon_0}\\right)^2 \\frac{1}{n^2}\\).',
                    solution: '<p>\\(\\mu/m_e = M/(m_e + M) = 1/(1 + m_e/M) \\approx 1 - m_e/M\\). For hydrogen: \\(\\mu/m_e = 1836/1837 \\approx 0.99946\\). The fractional correction is \\(m_e/M \\approx 5.4 \\times 10^{-4}\\), shifting the ionization energy from 13.606 to 13.598 eV.</p>'
                },
                {
                    question: 'Express the hydrogen atom Hamiltonian in atomic units and verify that the ground-state energy is \\(E_1 = -1/2\\) Hartree.',
                    hint: 'In atomic units (\\(\\hbar = m_e = e = 4\\pi\\epsilon_0 = 1\\)), \\(\\hat{H} = -\\frac{1}{2}\\nabla^2 - \\frac{1}{r}\\). The virial theorem gives \\(\\langle T \\rangle = -\\langle V \\rangle/2 = -E\\).',
                    solution: '<p>The energy eigenvalues are \\(E_n = -Z^2/(2n^2)\\) Hartree. For hydrogen (\\(Z=1\\), \\(n=1\\)): \\(E_1 = -1/2\\) Hartree \\(= -13.6\\) eV. By the virial theorem: \\(\\langle T \\rangle = 1/2\\) Hartree, \\(\\langle V \\rangle = -1\\) Hartree, \\(E = \\langle T \\rangle + \\langle V \\rangle = -1/2\\) Hartree.</p>'
                },
                {
                    question: 'Verify that the centrifugal term \\(l(l+1)/(2r^2)\\) has units of energy (in atomic units) and is repulsive. Sketch the effective potential \\(V_{\\text{eff}}(r) = -Z/r + l(l+1)/(2r^2)\\) for \\(l = 0, 1, 2\\).',
                    hint: 'In atomic units, \\(r\\) has units of Bohr and energy has units of Hartree. Both \\(Z/r\\) and \\(l(l+1)/r^2\\) have units of \\(1/a_0 = E_h/E_h\\).',
                    solution: '<p>In atomic units, \\(r\\) is dimensionless (in units of \\(a_0\\)), and energies are in Hartree. \\(l(l+1)/(2r^2)\\) is dimensionless (Hartree), positive for \\(l \\geq 1\\), and diverges as \\(r \\to 0\\), creating a repulsive barrier. For \\(l=0\\): \\(V_{\\text{eff}} = -Z/r\\), attractive everywhere. For \\(l=1\\): \\(V_{\\text{eff}} = -Z/r + 1/r^2\\), with a minimum at \\(r = 2/Z\\). For \\(l=2\\): minimum at \\(r = 6/(2Z) = 3/Z\\), with a higher barrier.</p>'
                },
                {
                    question: 'Show that the angular equation \\(\\hat{\\Lambda}^2 Y = -l(l+1)Y\\) further separates into \\(\\Phi(\\phi) = e^{im\\phi}/\\sqrt{2\\pi}\\) (with \\(m = 0, \\pm 1, \\ldots, \\pm l\\)) and the associated Legendre equation for \\(\\Theta(\\theta)\\).',
                    hint: 'Write \\(Y(\\theta, \\phi) = \\Theta(\\theta)\\Phi(\\phi)\\) and separate variables again. Single-valuedness requires \\(\\Phi(\\phi + 2\\pi) = \\Phi(\\phi)\\).',
                    solution: '<p>Substituting \\(Y = \\Theta\\Phi\\) into \\(\\hat{\\Lambda}^2 Y = -l(l+1)Y\\) and dividing by \\(\\Theta\\Phi\\): \\(\\frac{\\sin\\theta}{\\Theta}\\frac{d}{d\\theta}(\\sin\\theta\\,\\Theta\') + l(l+1)\\sin^2\\theta = -\\frac{\\Phi\'\'}{\\Phi}\\). Left side depends on \\(\\theta\\), right on \\(\\phi\\), so both equal a constant \\(m^2\\). The \\(\\phi\\) equation: \\(\\Phi\'\' = -m^2\\Phi\\), solution \\(\\Phi = e^{im\\phi}/\\sqrt{2\\pi}\\). Single-valuedness: \\(e^{im(\\phi + 2\\pi)} = e^{im\\phi}\\) requires \\(m \\in \\mathbb{Z}\\). The \\(\\theta\\) equation becomes the associated Legendre equation with solutions \\(P_l^m(\\cos\\theta)\\), requiring \\(|m| \\leq l\\).</p>'
                },
                {
                    question: 'For the deuterium atom (nuclear mass \\(M_D = 3672\\,m_e\\)), compute the isotope shift of the 1s-2p Lyman-\\(\\alpha\\) transition compared to hydrogen.',
                    hint: 'The transition energy is \\(\\Delta E = \\frac{\\mu}{2}(1 - 1/4) = \\frac{3\\mu}{8}\\) in atomic units. Compute for both \\(\\mu_H\\) and \\(\\mu_D\\).',
                    solution: '<p>\\(\\mu_H = 1836/1837 \\cdot m_e\\), \\(\\mu_D = 3672/3673 \\cdot m_e\\). The transition energy ratio: \\(\\Delta E_D/\\Delta E_H = \\mu_D/\\mu_H = (3672/3673)/(1836/1837) = (3672 \\cdot 1837)/(3673 \\cdot 1836) = 1.000272\\). The fractional isotope shift is \\(\\approx 2.7 \\times 10^{-4}\\), corresponding to about 0.028 nm shift in the Lyman-\\(\\alpha\\) line at 121.567 nm.</p>'
                }
            ]
        },

        // ===================== Section 2: Angular Solutions =====================
        {
            id: 'ch01-sec02',
            title: 'Angular Solutions: Spherical Harmonics',
            content: `<h2>Angular Solutions: Spherical Harmonics</h2>

                <p>The angular part of the hydrogen wavefunction is universal: it appears in every central-force problem and determines the shapes of atomic orbitals. The solutions are the <strong>spherical harmonics</strong> \\(Y_l^m(\\theta, \\phi)\\), which are simultaneous eigenfunctions of \\(\\hat{L}^2\\) and \\(\\hat{L}_z\\).</p>

                <div class="env-block definition">
                    <div class="env-title">Definition (Spherical Harmonics)</div>
                    <div class="env-body"><p>The <strong>spherical harmonics</strong> are defined as:
                    \\[Y_l^m(\\theta, \\phi) = (-1)^m \\sqrt{\\frac{(2l+1)}{4\\pi}\\frac{(l-|m|)!}{(l+|m|)!}}\\,P_l^{|m|}(\\cos\\theta)\\,e^{im\\phi}\\]
                    where \\(P_l^m\\) are the <strong>associated Legendre polynomials</strong> and the \\((-1)^m\\) factor is the Condon-Shortley phase convention. The quantum numbers satisfy \\(l = 0, 1, 2, \\ldots\\) and \\(m = -l, -l+1, \\ldots, l-1, l\\).</p></div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem (Properties of Spherical Harmonics)</div>
                    <div class="env-body">
                    <ol>
                        <li><strong>Eigenvalue equations:</strong>
                        \\[\\hat{L}^2 Y_l^m = \\hbar^2 l(l+1)\\,Y_l^m, \\qquad \\hat{L}_z Y_l^m = \\hbar m\\,Y_l^m\\]</li>
                        <li><strong>Orthonormality:</strong>
                        \\[\\int_0^{2\\pi}\\int_0^{\\pi} Y_l^m(\\theta,\\phi)^* Y_{l'}^{m'}(\\theta,\\phi)\\,\\sin\\theta\\,d\\theta\\,d\\phi = \\delta_{ll'}\\delta_{mm'}\\]</li>
                        <li><strong>Completeness:</strong>
                        \\[\\sum_{l=0}^{\\infty}\\sum_{m=-l}^{l} Y_l^m(\\theta,\\phi)^* Y_l^m(\\theta',\\phi') = \\frac{\\delta(\\cos\\theta - \\cos\\theta')\\delta(\\phi - \\phi')}{1}\\]</li>
                        <li><strong>Parity:</strong> \\(Y_l^m(-\\hat{\\mathbf{r}}) = Y_l^m(\\pi - \\theta, \\phi + \\pi) = (-1)^l Y_l^m(\\theta, \\phi)\\). Thus \\(s\\) (\\(l=0\\)) and \\(d\\) (\\(l=2\\)) orbitals are even; \\(p\\) (\\(l=1\\)) and \\(f\\) (\\(l=3\\)) orbitals are odd.</li>
                        <li><strong>Addition theorem:</strong>
                        \\[P_l(\\cos\\gamma) = \\frac{4\\pi}{2l+1}\\sum_{m=-l}^{l} Y_l^m(\\theta_1,\\phi_1)^*\\,Y_l^m(\\theta_2,\\phi_2)\\]
                        where \\(\\gamma\\) is the angle between directions \\((\\theta_1,\\phi_1)\\) and \\((\\theta_2,\\phi_2)\\).</li>
                    </ol></div>
                </div>

                <h3>Real Spherical Harmonics</h3>
                <p>In chemistry, we typically use <strong>real combinations</strong> of the complex spherical harmonics, since atomic orbitals are conventionally real-valued:</p>
                <div class="env-block definition">
                    <div class="env-title">Definition (Real Spherical Harmonics)</div>
                    <div class="env-body">
                    \\[Y_{lm}^{\\text{real}} = \\begin{cases} \\frac{1}{\\sqrt{2}}(Y_l^{-|m|} + (-1)^m Y_l^{|m|}) & m > 0 \\quad (\\text{cosine combination}) \\\\ Y_l^0 & m = 0 \\\\ \\frac{1}{i\\sqrt{2}}(Y_l^{-|m|} - (-1)^m Y_l^{|m|}) & m < 0 \\quad (\\text{sine combination}) \\end{cases}\\]
                    <p>Explicit examples:</p>
                    <ul>
                        <li>\\(s\\): \\(Y_0^0 = \\frac{1}{\\sqrt{4\\pi}}\\) (spherically symmetric)</li>
                        <li>\\(p_z\\): \\(Y_1^0 \\propto \\cos\\theta\\); \\(p_x\\): \\(\\propto \\sin\\theta\\cos\\phi\\); \\(p_y\\): \\(\\propto \\sin\\theta\\sin\\phi\\)</li>
                        <li>\\(d_{z^2}\\): \\(Y_2^0 \\propto 3\\cos^2\\theta - 1\\); \\(d_{xz}\\): \\(\\propto \\sin\\theta\\cos\\theta\\cos\\phi\\); \\(d_{yz}\\): \\(\\propto \\sin\\theta\\cos\\theta\\sin\\phi\\); \\(d_{xy}\\): \\(\\propto \\sin^2\\theta\\sin 2\\phi\\); \\(d_{x^2-y^2}\\): \\(\\propto \\sin^2\\theta\\cos 2\\phi\\)</li>
                    </ul></div>
                </div>

                <div class="env-block proposition">
                    <div class="env-title">Proposition (Selection Rules)</div>
                    <div class="env-body"><p>Electric dipole transitions require \\(\\Delta l = \\pm 1\\) and \\(\\Delta m = 0, \\pm 1\\). These arise from the integral:
                    \\[\\int Y_{l'}^{m'*}\\, r Y_1^q\\, Y_l^m\\, d\\Omega \\neq 0 \\iff \\begin{cases} l' = l \\pm 1 \\\\ m' = m + q \\end{cases}\\]
                    This is a direct consequence of the Wigner-Eckart theorem and the properties of Clebsch-Gordan coefficients.</p></div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example (Angular Momentum Algebra)</div>
                    <div class="env-body"><p>The ladder operators \\(\\hat{L}_{\\pm} = \\hat{L}_x \\pm i\\hat{L}_y\\) raise/lower \\(m\\) by 1:
                    \\[\\hat{L}_{\\pm} Y_l^m = \\hbar\\sqrt{l(l+1) - m(m \\pm 1)}\\,Y_l^{m \\pm 1}\\]
                    Starting from \\(Y_1^1 \\propto \\sin\\theta\\,e^{i\\phi}\\), applying \\(\\hat{L}_-\\) gives \\(Y_1^0 \\propto \\cos\\theta\\), and applying again gives \\(Y_1^{-1} \\propto \\sin\\theta\\,e^{-i\\phi}\\).</p></div>
                </div>`,

            exercises: [
                {
                    question: 'Verify the orthonormality \\(\\langle Y_1^0 | Y_1^1 \\rangle = 0\\) by explicit integration.',
                    hint: 'The \\(\\phi\\) integral of \\(e^{i\\phi}\\) over \\([0, 2\\pi]\\) vanishes.',
                    solution: '<p>\\(Y_1^0 = \\sqrt{\\frac{3}{4\\pi}}\\cos\\theta\\), \\(Y_1^1 = -\\sqrt{\\frac{3}{8\\pi}}\\sin\\theta\\,e^{i\\phi}\\). The integral factors: \\(\\int_0^{2\\pi} e^{i\\phi}d\\phi = 0\\). Thus the entire integral vanishes regardless of the \\(\\theta\\) part, confirming orthonormality for different \\(m\\) values.</p>'
                },
                {
                    question: 'Show that \\(p_x = \\frac{1}{\\sqrt{2}}(-Y_1^1 + Y_1^{-1})\\) is proportional to \\(\\sin\\theta\\cos\\phi\\).',
                    hint: 'Use \\(Y_1^{\\pm 1} = \\mp\\sqrt{\\frac{3}{8\\pi}}\\sin\\theta\\,e^{\\pm i\\phi}\\) and Euler\'s formula.',
                    solution: '<p>\\(-Y_1^1 + Y_1^{-1} = \\sqrt{\\frac{3}{8\\pi}}\\sin\\theta(e^{i\\phi} + e^{-i\\phi}) = 2\\sqrt{\\frac{3}{8\\pi}}\\sin\\theta\\cos\\phi\\). Thus \\(p_x = \\frac{1}{\\sqrt{2}} \\cdot 2\\sqrt{\\frac{3}{8\\pi}}\\sin\\theta\\cos\\phi = \\sqrt{\\frac{3}{4\\pi}}\\sin\\theta\\cos\\phi\\).</p>'
                },
                {
                    question: 'Prove the selection rule \\(\\Delta l = \\pm 1\\) for electric dipole transitions by evaluating \\(\\int Y_2^0 \\cos\\theta\\, Y_0^0 \\,d\\Omega\\) and \\(\\int Y_2^0 \\cos\\theta\\, Y_2^0 \\,d\\Omega\\).',
                    hint: 'Use \\(\\cos\\theta = \\sqrt{\\frac{4\\pi}{3}}Y_1^0\\) and the triple integral formula involving Clebsch-Gordan coefficients.',
                    solution: '<p>\\(\\cos\\theta = \\sqrt{4\\pi/3}\\,Y_1^0\\). First integral: \\(\\sqrt{4\\pi/3}\\int Y_2^0 Y_1^0 Y_0^0 d\\Omega\\). By the triple integral formula, this is nonzero because \\(|2-1| \\leq 0 \\leq 2+1\\) is not satisfied (we need \\(l_3 = 0\\), and \\(|l_1 - l_2| = 1 \\leq 0\\) fails). Actually: the triple integral \\(\\int Y_2^{0*} Y_1^0 Y_0^0 d\\Omega = 0\\) because the triangle condition requires \\(|2-0| \\leq 1 \\leq 2+0\\), i.e., \\(2 \\leq 1\\), which fails. For \\(\\int Y_2^0 \\cos\\theta\\, Y_2^0 = \\sqrt{4\\pi/3}\\int Y_2^{0*} Y_1^0 Y_2^0\\): triangle \\(|2-2| \\leq 1 \\leq 2+2\\) gives \\(0 \\leq 1 \\leq 4\\), OK. But parity: \\((-1)^{2+1+2} = -1\\) and we need even parity for a nonzero integral. So this vanishes. Only \\(\\Delta l = \\pm 1\\) survives.</p>'
                },
                {
                    question: 'Show that the total number of spherical harmonics for a given \\(l\\) is \\(2l+1\\), and that the sum \\(\\sum_{m=-l}^{l} |Y_l^m(\\theta,\\phi)|^2 = \\frac{2l+1}{4\\pi}\\) is independent of \\((\\theta, \\phi)\\).',
                    hint: 'The first part is immediate from \\(m \\in \\{-l, \\ldots, l\\}\\). For the second, use the addition theorem with \\(\\gamma = 0\\).',
                    solution: '<p>There are \\(l - (-l) + 1 = 2l + 1\\) integer values of \\(m\\). For the sum: setting \\(\\hat{\\mathbf{r}}_1 = \\hat{\\mathbf{r}}_2\\) in the addition theorem gives \\(P_l(1) = \\frac{4\\pi}{2l+1}\\sum_m |Y_l^m|^2\\). Since \\(P_l(1) = 1\\), we get \\(\\sum_m |Y_l^m|^2 = (2l+1)/(4\\pi)\\). This result shows that a filled subshell (all \\(2l+1\\) orbitals occupied) has a spherically symmetric electron density.</p>'
                },
                {
                    question: 'Compute \\(\\hat{L}_+ Y_2^1\\) and verify that the result is proportional to \\(Y_2^2\\).',
                    hint: 'Use \\(\\hat{L}_+ Y_l^m = \\hbar\\sqrt{l(l+1) - m(m+1)}\\,Y_l^{m+1}\\).',
                    solution: '<p>\\(\\hat{L}_+ Y_2^1 = \\hbar\\sqrt{2(3) - 1(2)}\\,Y_2^2 = \\hbar\\sqrt{4}\\,Y_2^2 = 2\\hbar\\,Y_2^2\\).</p>'
                }
            ]
        },

        // ===================== Section 3: Radial Solutions =====================
        {
            id: 'ch01-sec03',
            title: 'Radial Solutions: Laguerre Polynomials',
            content: `<h2>Radial Solutions: Laguerre Polynomials</h2>

                <p>With the angular part settled, we now solve the radial equation. This is where the quantization of energy emerges: the requirement that the radial wavefunction be normalizable selects only discrete energy levels \\(E_n = -Z^2/(2n^2)\\).</p>

                <div class="env-block theorem">
                    <div class="env-title">Theorem (Radial Wavefunctions)</div>
                    <div class="env-body"><p>The normalized radial wavefunctions for hydrogen-like atoms are:
                    \\[R_{nl}(r) = -\\sqrt{\\left(\\frac{2Z}{na_0}\\right)^3 \\frac{(n-l-1)!}{2n[(n+l)!]^3}}\\,e^{-\\rho/2}\\,\\rho^l\\,L_{n-l-1}^{2l+1}(\\rho)\\]
                    where \\(\\rho = 2Zr/(na_0)\\) and \\(L_p^q\\) are the <strong>associated Laguerre polynomials</strong>:
                    \\[L_p^q(x) = \\sum_{k=0}^{p} (-1)^k \\frac{(p+q)!}{(p-k)!(q+k)!k!}\\,x^k\\]
                    The quantum numbers satisfy \\(n = 1, 2, 3, \\ldots\\) and \\(l = 0, 1, \\ldots, n-1\\).</p></div>
                </div>

                <h3>Energy Eigenvalues</h3>

                <div class="env-block theorem">
                    <div class="env-title">Theorem (Hydrogen Energy Levels)</div>
                    <div class="env-body"><p>The bound-state energies of the hydrogen-like atom are:
                    \\[E_n = -\\frac{Z^2}{2n^2} \\text{ (Hartree)} = -\\frac{Z^2 \\cdot 13.6\\text{ eV}}{n^2}\\]
                    Each level has degeneracy \\(g_n = n^2\\) (or \\(2n^2\\) including spin). The energies depend <strong>only on \\(n\\)</strong>, not on \\(l\\) or \\(m\\). This "accidental" degeneracy (beyond the \\(2l+1\\) degeneracy from rotational symmetry) reflects a hidden \\(SO(4)\\) symmetry (the Laplace-Runge-Lenz vector is conserved).</p></div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof Sketch (Quantization)</div>
                    <div class="env-body"><p>The asymptotic analysis of the radial equation shows \\(R(r) \\sim e^{-\\sqrt{-2E}\\,r}\\) as \\(r \\to \\infty\\) (for bound states with \\(E < 0\\)). Near \\(r = 0\\), \\(R \\sim r^l\\). Writing \\(R = e^{-\\rho/2}\\rho^l F(\\rho)\\) and substituting into the radial equation yields the associated Laguerre equation:
                    \\[\\rho F'' + (2l + 2 - \\rho)F' + (n - l - 1)F = 0\\]
                    For \\(F\\) to be a polynomial (necessary for normalizability), we need \\(n - l - 1 = p \\geq 0\\) to be a non-negative integer. This forces \\(n \\geq l + 1\\) and quantizes the energy as \\(E_n = -Z^2/(2n^2)\\).</p>
                    <div class="qed">&#8718;</div></div>
                </div>

                <h3>Explicit Radial Wavefunctions</h3>
                <p>The first few (in atomic units, \\(Z = 1\\)):</p>
                <div class="env-block example">
                    <div class="env-title">Example (Low-Lying Radial Functions)</div>
                    <div class="env-body">
                    \\[R_{10}(r) = 2e^{-r} \\qquad \\text{(1s)}\\]
                    \\[R_{20}(r) = \\frac{1}{2\\sqrt{2}}(2 - r)e^{-r/2} \\qquad \\text{(2s)}\\]
                    \\[R_{21}(r) = \\frac{1}{2\\sqrt{6}}\\,r\\,e^{-r/2} \\qquad \\text{(2p)}\\]
                    \\[R_{30}(r) = \\frac{2}{81\\sqrt{3}}(27 - 18r + 2r^2)e^{-r/3} \\qquad \\text{(3s)}\\]
                    <p>Key features: \\(R_{nl}\\) has \\(n - l - 1\\) <strong>radial nodes</strong> (zeros, excluding \\(r = 0\\) and \\(r = \\infty\\)). The 2s wavefunction has one node at \\(r = 2\\,a_0\\); the 3s has two nodes.</p></div>
                </div>

                <h3>Radial Distribution Function</h3>
                <div class="env-block definition">
                    <div class="env-title">Definition (Radial Distribution Function)</div>
                    <div class="env-body"><p>The probability of finding the electron between \\(r\\) and \\(r + dr\\) (regardless of direction) is:
                    \\[P(r)\\,dr = r^2|R_{nl}(r)|^2\\,dr\\]
                    The function \\(P(r) = r^2|R_{nl}|^2\\) is the <strong>radial distribution function</strong>. Its maximum gives the most probable distance from the nucleus.</p></div>
                </div>

                <div class="env-block proposition">
                    <div class="env-title">Proposition (Expectation Values of \\(r^k\\))</div>
                    <div class="env-body"><p>For hydrogen-like atoms (in atomic units):
                    \\[\\langle r \\rangle = \\frac{a_0}{2Z}[3n^2 - l(l+1)]\\]
                    \\[\\langle r^2 \\rangle = \\frac{a_0^2 n^2}{2Z^2}[5n^2 + 1 - 3l(l+1)]\\]
                    \\[\\langle 1/r \\rangle = \\frac{Z}{n^2 a_0}\\]
                    \\[\\langle 1/r^2 \\rangle = \\frac{Z^2}{n^3(l + 1/2)a_0^2}\\]
                    Note: \\(\\langle r \\rangle\\) depends on \\(l\\), so \\(s\\) electrons penetrate closer to the nucleus on average than \\(p\\) electrons of the same \\(n\\), even though the energy is the same for hydrogen.</p></div>
                </div>

                <div class="viz-placeholder" data-viz="viz-radial-wavefunction"></div>`,

            visualizations: [
                {
                    id: 'viz-radial-wavefunction',
                    title: 'Interactive Radial Wavefunction Plotter',
                    description: 'Select quantum numbers \\(n\\) and \\(l\\) to plot the radial wavefunction \\(R_{nl}(r)\\) (blue) and the radial distribution function \\(r^2|R_{nl}|^2\\) (orange). Nodes are marked with dots.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {scale: 20, originX: 60, originY: body.clientHeight ? body.clientHeight * 0.6 : 230});
                        var nQ = 1, lQ = 0;

                        VizEngine.createSlider(controls, 'n', 1, 5, nQ, 1, function(v) {
                            nQ = Math.round(v);
                            if (lQ >= nQ) lQ = nQ - 1;
                            draw();
                        });
                        VizEngine.createSlider(controls, 'l', 0, 4, lQ, 1, function(v) {
                            lQ = Math.round(v);
                            if (lQ >= nQ) lQ = nQ - 1;
                            draw();
                        });

                        function hydrogenR(n, l, r) {
                            if (r < 0) return 0;
                            var rho = 2 * r / n;
                            var p = n - l - 1;
                            var q = 2 * l + 1;
                            // Normalization
                            var nFact = VizEngine.factorial;
                            var normSq = Math.pow(2 / n, 3) * nFact(p) / (2 * n * Math.pow(nFact(n + l), 1));
                            // Fix normalization using correct formula
                            var norm = Math.sqrt(Math.pow(2 / n, 3) * nFact(n - l - 1) / (2 * n * nFact(n + l)));
                            var lag = VizEngine.laguerre(p, q, rho);
                            return norm * Math.exp(-rho / 2) * Math.pow(rho, l) * lag;
                        }

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            var rMax = nQ * nQ * 3 + 5;
                            var scale = rMax / ((viz.width - 80) / viz.scale);
                            var xMax = (viz.width - 80) / viz.scale;

                            // R_nl(r)
                            var maxR = 0;
                            for (var i = 0; i <= 500; i++) {
                                var r = i / 500 * rMax;
                                var val = Math.abs(hydrogenR(nQ, lQ, r));
                                if (val > maxR) maxR = val;
                            }
                            var scaleFactor = maxR > 0 ? 3 / maxR : 1;

                            viz.drawFunction(function(x) {
                                var r = x * rMax / xMax;
                                if (r < 0) return 0;
                                return hydrogenR(nQ, lQ, r) * scaleFactor;
                            }, 0, xMax, viz.colors.blue, 2.5);

                            // r^2 |R_nl|^2
                            var maxP = 0;
                            for (var i = 0; i <= 500; i++) {
                                var r = i / 500 * rMax;
                                var val = r * r * Math.pow(hydrogenR(nQ, lQ, r), 2);
                                if (val > maxP) maxP = val;
                            }
                            var scaleP = maxP > 0 ? 3 / maxP : 1;

                            viz.drawFunction(function(x) {
                                var r = x * rMax / xMax;
                                if (r < 0) return 0;
                                return r * r * Math.pow(hydrogenR(nQ, lQ, r), 2) * scaleP;
                            }, 0, xMax, viz.colors.orange, 2.5);

                            // Mark nodes
                            var prevSign = 0;
                            for (var i = 1; i <= 500; i++) {
                                var r = i / 500 * rMax;
                                var val = hydrogenR(nQ, lQ, r);
                                var sign = val > 0 ? 1 : (val < 0 ? -1 : 0);
                                if (prevSign !== 0 && sign !== 0 && sign !== prevSign) {
                                    var xPos = (r - rMax / 1000) * xMax / rMax;
                                    viz.drawPoint(xPos, 0, viz.colors.red, '', 5);
                                }
                                if (sign !== 0) prevSign = sign;
                            }

                            // Labels
                            var ctx = viz.ctx;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillText('R\u2099\u2097(r) [scaled]', viz.width - 160, 20);
                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillText('r\u00b2|R\u2099\u2097|\u00b2 [scaled]', viz.width - 160, 38);
                            ctx.fillStyle = viz.colors.red;
                            ctx.fillText('Radial nodes: ' + (nQ - lQ - 1), viz.width - 160, 56);
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            var orbName = ['s','p','d','f','g'][lQ] || '?';
                            ctx.fillText('n=' + nQ + ', l=' + lQ + ' (' + nQ + orbName + ')', 10, 20);
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.teal;
                            ctx.fillText('E\u2099 = -' + (13.6 / (nQ * nQ)).toFixed(2) + ' eV', 10, 38);
                            ctx.fillText('r axis: 0 to ' + rMax.toFixed(0) + ' a\u2080', 10, 56);
                        }
                        draw();
                        return viz;
                    }
                }
            ],

            exercises: [
                {
                    question: 'Verify that \\(R_{10}(r) = 2e^{-r}\\) (atomic units) is normalized: \\(\\int_0^{\\infty} |R_{10}|^2 r^2\\,dr = 1\\).',
                    hint: 'Use \\(\\int_0^{\\infty} r^n e^{-ar}dr = n!/a^{n+1}\\).',
                    solution: '<p>\\(\\int_0^{\\infty} 4e^{-2r} r^2\\,dr = 4 \\cdot \\frac{2!}{2^3} = 4 \\cdot \\frac{2}{8} = 1\\). The wavefunction is correctly normalized.</p>'
                },
                {
                    question: 'Find the radial node(s) of \\(R_{20}(r) = \\frac{1}{2\\sqrt{2}}(2 - r)e^{-r/2}\\) and compute the most probable radius from the radial distribution function.',
                    hint: 'Set \\(R_{20} = 0\\) for the node. For the most probable radius, set \\(dP/dr = 0\\) where \\(P(r) = r^2|R_{20}|^2\\).',
                    solution: '<p><strong>Node:</strong> \\(2 - r = 0 \\implies r = 2\\,a_0\\). <strong>Most probable radius:</strong> \\(P(r) \\propto r^2(2-r)^2 e^{-r}\\). Setting \\(P\'(r) = 0\\): differentiate and solve. The result gives \\(r_{\\text{mp}} = 3 + \\sqrt{5} \\approx 5.24\\,a_0\\) for the outer maximum, which dominates. (There is also a local maximum near \\(r \\approx 0.76\\,a_0\\).)</p>'
                },
                {
                    question: 'Show that \\(\\langle 1/r \\rangle_{1s} = 1/a_0\\) (in atomic units, \\(= 1\\)). Use this to verify the virial theorem \\(\\langle V \\rangle = 2E\\) for the 1s state.',
                    hint: '\\(\\langle 1/r \\rangle = \\int_0^{\\infty} R_{10}^2 \\cdot (1/r) \\cdot r^2\\,dr = 4\\int_0^{\\infty} r\\,e^{-2r}\\,dr\\).',
                    solution: '<p>\\(\\langle 1/r \\rangle = 4\\int_0^{\\infty} r\\,e^{-2r}\\,dr = 4 \\cdot \\frac{1!}{2^2} = 1\\) (in a.u.). Then \\(\\langle V \\rangle = -Z\\langle 1/r \\rangle = -1\\) Hartree. Since \\(E = -1/2\\) Hartree, \\(\\langle V \\rangle = 2E\\), confirming the virial theorem for Coulomb potentials.</p>'
                },
                {
                    question: 'How many radial nodes does the \\(4f\\) orbital have? What is the most probable distance in terms of \\(a_0\\)?',
                    hint: 'Radial nodes = \\(n - l - 1\\). For the most probable distance, note that \\(R_{43} \\propto r^3 e^{-r/4} L_0^7(r/2)\\), and \\(L_0^7 = 1\\).',
                    solution: '<p>Radial nodes = \\(4 - 3 - 1 = 0\\). The 4f has <em>no</em> radial nodes. Since \\(L_0^7 = 1\\), \\(R_{43} \\propto r^3 e^{-r/4}\\). The radial distribution function \\(P(r) \\propto r^8 e^{-r/2}\\). Setting \\(dP/dr = 0\\): \\(8r^7 e^{-r/2} - \\frac{1}{2}r^8 e^{-r/2} = 0\\), giving \\(r = 16\\,a_0\\). This is consistent with the general formula \\(r_{\\text{mp}} = n^2 a_0\\) for the outermost (and only) maximum when \\(l = n-1\\).</p>'
                },
                {
                    question: 'Compute \\(\\langle r \\rangle\\) for the 2p state using the formula \\(\\langle r \\rangle = \\frac{a_0}{2Z}[3n^2 - l(l+1)]\\) and verify by direct integration with \\(R_{21}\\).',
                    hint: 'For \\(n=2, l=1, Z=1\\): plug into the formula. For direct calculation: \\(\\langle r \\rangle = \\int_0^{\\infty} R_{21}^2 \\cdot r \\cdot r^2\\,dr\\).',
                    solution: '<p>Formula: \\(\\langle r \\rangle = \\frac{1}{2}[3(4) - 1(2)] = \\frac{1}{2}(10) = 5\\,a_0\\). Direct: \\(R_{21} = \\frac{1}{2\\sqrt{6}}r\\,e^{-r/2}\\), so \\(\\langle r \\rangle = \\frac{1}{24}\\int_0^{\\infty} r^2 \\cdot r \\cdot r^2\\,e^{-r}\\,dr = \\frac{1}{24}\\int_0^{\\infty} r^5 e^{-r}\\,dr = \\frac{5!}{24} = \\frac{120}{24} = 5\\,a_0\\). Both agree.</p>'
                }
            ]
        },

        // ===================== Section 4: Atomic Orbitals =====================
        {
            id: 'ch01-sec04',
            title: 'Atomic Orbitals: Shapes and Nodes',
            content: `<h2>Atomic Orbitals: Shapes and Nodes</h2>

                <p>The complete hydrogen wavefunction is the product of radial and angular parts:
                \\[\\psi_{nlm}(r, \\theta, \\phi) = R_{nl}(r)\\,Y_l^m(\\theta, \\phi)\\]
                In chemistry, we use the real spherical harmonics to obtain <strong>real atomic orbitals</strong> with familiar directional shapes. Understanding these shapes is essential for molecular orbital theory and chemical bonding.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition (Nodal Surfaces)</div>
                    <div class="env-body"><p>A <strong>node</strong> is a surface where \\(\\psi = 0\\). There are two types:</p>
                    <ul>
                        <li><strong>Radial (spherical) nodes:</strong> Surfaces \\(r = r_0\\) where \\(R_{nl}(r_0) = 0\\). Count: \\(n - l - 1\\).</li>
                        <li><strong>Angular (planar/conical) nodes:</strong> Surfaces where \\(Y_l^m = 0\\). Count: \\(l\\).</li>
                    </ul>
                    <p>Total nodes: \\(n - 1\\) (always). The number of nodes increases with energy, consistent with the general principle that higher-energy states oscillate more rapidly.</p></div>
                </div>

                <h3>The s Orbitals (\\(l = 0\\))</h3>
                <p>s orbitals are spherically symmetric (\\(Y_0^0 = 1/\\sqrt{4\\pi}\\)). The 1s has no nodes; the 2s has one spherical node at \\(r = 2a_0\\); the 3s has two spherical nodes.</p>
                \\[\\psi_{1s} = \\frac{1}{\\sqrt{\\pi}}e^{-r} \\qquad \\psi_{2s} = \\frac{1}{4\\sqrt{2\\pi}}(2-r)e^{-r/2}\\]

                <h3>The p Orbitals (\\(l = 1\\))</h3>
                <p>p orbitals have one angular node (a plane through the nucleus). Using real spherical harmonics:</p>
                \\[p_z \\propto r\\,e^{-r/2}\\cos\\theta, \\quad p_x \\propto r\\,e^{-r/2}\\sin\\theta\\cos\\phi, \\quad p_y \\propto r\\,e^{-r/2}\\sin\\theta\\sin\\phi\\]
                <p>The nodal planes are \\(z = 0\\) (for \\(p_z\\)), \\(x = 0\\) (for \\(p_x\\)), and \\(y = 0\\) (for \\(p_y\\)). Each p orbital has a dumbbell shape with two lobes of opposite sign.</p>

                <h3>The d Orbitals (\\(l = 2\\))</h3>
                <p>d orbitals have two angular nodes. The five 3d orbitals are:</p>
                <ul>
                    <li>\\(d_{z^2} \\propto (3\\cos^2\\theta - 1)\\): axial symmetry, two conical nodes</li>
                    <li>\\(d_{xz} \\propto \\sin\\theta\\cos\\theta\\cos\\phi\\): lobes in the \\(xz\\) plane</li>
                    <li>\\(d_{yz} \\propto \\sin\\theta\\cos\\theta\\sin\\phi\\): lobes in the \\(yz\\) plane</li>
                    <li>\\(d_{xy} \\propto \\sin^2\\theta\\sin 2\\phi\\): lobes between \\(x\\) and \\(y\\) axes</li>
                    <li>\\(d_{x^2-y^2} \\propto \\sin^2\\theta\\cos 2\\phi\\): lobes along \\(x\\) and \\(y\\) axes</li>
                </ul>

                <div class="viz-placeholder" data-viz="viz-orbital-contour"></div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem (Electron Density at the Nucleus)</div>
                    <div class="env-body"><p>The probability density at the nucleus (\\(r = 0\\)) is:
                    \\[|\\psi_{nlm}(0)|^2 = \\frac{Z^3}{\\pi n^3 a_0^3}\\,\\delta_{l,0}\\]
                    Only s orbitals (\\(l = 0\\)) have nonzero density at the nucleus, because \\(R_{nl}(0) \\propto \\delta_{l,0}\\). This has important consequences: s electrons experience the full nuclear charge (leading to lower energy in multi-electron atoms), and the Fermi contact interaction (relevant to NMR chemical shifts) is proportional to \\(|\\psi(0)|^2\\).</p></div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark (Cusp Condition)</div>
                    <div class="env-body"><p>At the nucleus, the wavefunction satisfies the <strong>Kato cusp condition</strong>:
                    \\[\\left.\\frac{\\partial \\bar{\\psi}}{\\partial r}\\right|_{r=0} = -Z\\,\\bar{\\psi}(0)\\]
                    where \\(\\bar{\\psi}\\) denotes the spherical average. This condition ensures the kinetic energy singularity cancels the Coulomb singularity. Gaussian basis functions do not satisfy the cusp condition (they are flat at the origin), which is one reason GTOs converge more slowly than STOs.</p></div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark (Orbital Visualization Conventions)</div>
                    <div class="env-body"><p>Orbital isosurface plots typically show the surface where \\(|\\psi| = c\\) for some cutoff \\(c\\), enclosing (say) 90% of the electron density. The sign of \\(\\psi\\) is indicated by color (e.g., blue positive, red negative). Contour plots show the cross-section in a plane through the nucleus. Both representations are used extensively in understanding bonding, antibonding, and nonbonding interactions.</p></div>
                </div>`,

            visualizations: [
                {
                    id: 'viz-orbital-contour',
                    title: 'Orbital Cross-Section Visualizer',
                    description: 'Select an orbital to view the 2D cross-section of \\(|\\psi|^2\\) in the \\(xz\\)-plane. The color intensity represents probability density; blue and red indicate positive and negative lobes of \\(\\psi\\).',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {scale: 20, originX: body.clientWidth ? body.clientWidth / 2 : 280, originY: body.clientHeight ? body.clientHeight / 2 : 180});
                        var currentOrbital = '1s';

                        var orbitalList = ['1s', '2s', '2p', '3s', '3p', '3d'];
                        orbitalList.forEach(function(orb) {
                            VizEngine.createButton(controls, orb, function() { currentOrbital = orb; draw(); });
                        });

                        function getWavefunction(orb, x, z) {
                            var r = Math.sqrt(x * x + z * z);
                            if (r < 0.01) r = 0.01;
                            var cosTheta = z / r;
                            var sinTheta = Math.abs(x) / r;

                            if (orb === '1s') {
                                return (1 / Math.sqrt(Math.PI)) * Math.exp(-r);
                            } else if (orb === '2s') {
                                return (1 / (4 * Math.sqrt(2 * Math.PI))) * (2 - r) * Math.exp(-r / 2);
                            } else if (orb === '2p') {
                                // 2p_z
                                return (1 / (4 * Math.sqrt(2 * Math.PI))) * r * Math.exp(-r / 2) * cosTheta;
                            } else if (orb === '3s') {
                                return (1 / (81 * Math.sqrt(3 * Math.PI))) * (27 - 18 * r + 2 * r * r) * Math.exp(-r / 3);
                            } else if (orb === '3p') {
                                // 3p_z
                                return (Math.sqrt(2) / (81 * Math.sqrt(Math.PI))) * (6 - r) * r * Math.exp(-r / 3) * cosTheta;
                            } else if (orb === '3d') {
                                // 3d_z2
                                return (1 / (81 * Math.sqrt(6 * Math.PI))) * r * r * Math.exp(-r / 3) * (3 * cosTheta * cosTheta - 1);
                            }
                            return 0;
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            // Determine range based on orbital
                            var rRange = 6;
                            if (currentOrbital[0] === '2') rRange = 12;
                            if (currentOrbital[0] === '3') rRange = 24;

                            // Compute pixel data
                            var imageData = ctx.createImageData(w, h);
                            var data = imageData.data;
                            var maxVal = 0;

                            // First pass: find max
                            var values = new Float32Array(w * h);
                            for (var py = 0; py < h; py++) {
                                for (var px = 0; px < w; px++) {
                                    var x = (px - w / 2) / (w / 2) * rRange;
                                    var z = -(py - h / 2) / (h / 2) * rRange;
                                    var val = getWavefunction(currentOrbital, x, z);
                                    values[py * w + px] = val;
                                    if (Math.abs(val) > maxVal) maxVal = Math.abs(val);
                                }
                            }

                            // Second pass: render
                            if (maxVal < 1e-10) maxVal = 1;
                            for (var py = 0; py < h; py++) {
                                for (var px = 0; px < w; px++) {
                                    var idx = (py * w + px) * 4;
                                    var val = values[py * w + px];
                                    var norm = val / maxVal;
                                    var intensity = Math.pow(Math.abs(norm), 0.4) * 255;

                                    if (norm > 0.001) {
                                        // Blue for positive
                                        data[idx] = Math.round(30 + intensity * 0.3);
                                        data[idx + 1] = Math.round(30 + intensity * 0.5);
                                        data[idx + 2] = Math.round(40 + intensity * 0.85);
                                    } else if (norm < -0.001) {
                                        // Red for negative
                                        data[idx] = Math.round(40 + intensity * 0.85);
                                        data[idx + 1] = Math.round(30 + intensity * 0.2);
                                        data[idx + 2] = Math.round(30 + intensity * 0.2);
                                    } else {
                                        // Background
                                        data[idx] = 12; data[idx + 1] = 12; data[idx + 2] = 32;
                                    }
                                    data[idx + 3] = 255;
                                }
                            }
                            ctx.putImageData(imageData, 0, 0);

                            // Axis lines
                            ctx.strokeStyle = 'rgba(255,255,255,0.2)';
                            ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.moveTo(0, h / 2); ctx.lineTo(w, h / 2); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(w / 2, 0); ctx.lineTo(w / 2, h); ctx.stroke();

                            // Nucleus
                            ctx.fillStyle = '#ffffff';
                            ctx.beginPath(); ctx.arc(w / 2, h / 2, 3, 0, Math.PI * 2); ctx.fill();

                            // Labels
                            ctx.fillStyle = viz.colors.white; ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText(currentOrbital + ' orbital (xz-plane)', 10, 22);
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.fillStyle = '#88aaff';
                            ctx.fillText('Blue = \u03c8 > 0', 10, 42);
                            ctx.fillStyle = '#ff6666';
                            ctx.fillText('Red = \u03c8 < 0', 10, 58);
                            ctx.fillStyle = viz.colors.text;
                            ctx.fillText('Range: \u00b1' + rRange + ' a\u2080', 10, 74);
                            ctx.fillText('x \u2192', w - 30, h / 2 - 8);
                            ctx.fillText('z \u2191', w / 2 + 8, 15);
                        }
                        draw();
                        return viz;
                    }
                }
            ],

            exercises: [
                {
                    question: 'How many total nodes (radial + angular) does the 4d orbital have? List the types.',
                    hint: 'Total nodes = \\(n - 1\\). Radial nodes = \\(n - l - 1\\). Angular nodes = \\(l\\).',
                    solution: '<p>Total = \\(4 - 1 = 3\\). Radial = \\(4 - 2 - 1 = 1\\). Angular = \\(2\\). So the 4d orbital has 1 spherical node and 2 planar/conical angular nodes.</p>'
                },
                {
                    question: 'Show that the 1s wavefunction \\(\\psi_{1s} = \\frac{1}{\\sqrt{\\pi}}e^{-r}\\) satisfies the Kato cusp condition \\(\\left.\\frac{d\\psi}{dr}\\right|_{r=0} = -Z\\,\\psi(0)\\) for \\(Z=1\\).',
                    hint: 'Since the 1s is spherically symmetric, the spherical average is the function itself.',
                    solution: '<p>\\(\\psi_{1s}(r) = \\frac{1}{\\sqrt{\\pi}}e^{-r}\\). \\(\\frac{d\\psi}{dr} = -\\frac{1}{\\sqrt{\\pi}}e^{-r}\\). At \\(r=0\\): \\(\\psi\'(0) = -\\frac{1}{\\sqrt{\\pi}}\\) and \\(\\psi(0) = \\frac{1}{\\sqrt{\\pi}}\\). So \\(\\psi\'(0)/\\psi(0) = -1 = -Z\\). The cusp condition is satisfied.</p>'
                },
                {
                    question: 'Explain why Gaussian functions \\(\\psi \\propto e^{-\\alpha r^2}\\) violate the cusp condition and compute the error at \\(r = 0\\).',
                    hint: 'Compute \\(d\\psi/dr\\) at \\(r = 0\\) for a Gaussian.',
                    solution: '<p>For \\(\\psi = A e^{-\\alpha r^2}\\): \\(d\\psi/dr = -2\\alpha r A e^{-\\alpha r^2}\\). At \\(r = 0\\): \\(d\\psi/dr = 0\\), not \\(-Z\\psi(0) = -ZA \\neq 0\\). The Gaussian has zero slope at the origin instead of the required negative slope. This means Gaussians are too "flat" near the nucleus. In practice, large Gaussian exponents (tight functions) are needed to partially compensate, but perfect cusp behavior is never achieved with a finite Gaussian expansion.</p>'
                },
                {
                    question: 'For the \\(d_{x^2-y^2}\\) orbital, identify the two angular nodal surfaces and show they are the planes \\(x = y\\) and \\(x = -y\\).',
                    hint: '\\(d_{x^2-y^2} \\propto \\sin^2\\theta\\cos 2\\phi\\). Set \\(\\cos 2\\phi = 0\\).',
                    solution: '<p>\\(\\cos 2\\phi = 0\\) when \\(2\\phi = \\pi/2 + n\\pi\\), i.e., \\(\\phi = \\pi/4, 3\\pi/4, 5\\pi/4, 7\\pi/4\\). These correspond to the planes \\(y = x\\) and \\(y = -x\\) (i.e., \\(x = y\\) and \\(x = -y\\)). The two angular nodes are the planes bisecting the \\(xy\\) axes at 45 degrees. The lobes point along the \\(x\\) and \\(y\\) axes.</p>'
                },
                {
                    question: 'Show that a filled p subshell (\\(p_x^2 p_y^2 p_z^2\\)) has spherically symmetric electron density by computing \\(|p_x|^2 + |p_y|^2 + |p_z|^2\\).',
                    hint: 'Use \\(p_x \\propto R(r)\\sin\\theta\\cos\\phi\\), etc., and the identity \\(\\sin^2\\theta\\cos^2\\phi + \\sin^2\\theta\\sin^2\\phi + \\cos^2\\theta = 1\\).',
                    solution: '<p>\\(|p_x|^2 + |p_y|^2 + |p_z|^2 \\propto R(r)^2[\\sin^2\\theta\\cos^2\\phi + \\sin^2\\theta\\sin^2\\phi + \\cos^2\\theta] = R(r)^2 \\cdot 1\\). The angular dependence completely cancels, leaving a spherically symmetric density \\(\\propto R(r)^2\\). This is a special case of the general result \\(\\sum_m |Y_l^m|^2 = (2l+1)/(4\\pi)\\).</p>'
                }
            ]
        },

        // ===================== Section 5: Hydrogen-like Atoms and Quantum Numbers =====================
        {
            id: 'ch01-sec05',
            title: 'Hydrogen-like Atoms and Quantum Numbers',
            content: `<h2>Hydrogen-like Atoms and Quantum Numbers</h2>

                <p>The hydrogen atom solution extends directly to any one-electron ion with nuclear charge \\(Z\\): He\\(^+\\), Li\\(^{2+}\\), Be\\(^{3+}\\), etc. These <strong>hydrogen-like atoms</strong> provide the starting point for multi-electron theories.</p>

                <h3>Z-Scaling</h3>
                <div class="env-block theorem">
                    <div class="env-title">Theorem (Hydrogen-like Atom Scaling)</div>
                    <div class="env-body"><p>For a hydrogen-like atom with nuclear charge \\(Z\\):</p>
                    <ul>
                        <li><strong>Energy:</strong> \\(E_n = -\\frac{Z^2}{2n^2}\\) Hartree \\(= -\\frac{13.6 Z^2}{n^2}\\) eV</li>
                        <li><strong>Wavefunction:</strong> \\(\\psi_{nlm}^{(Z)}(\\mathbf{r}) = Z^{3/2}\\,\\psi_{nlm}^{(Z=1)}(Z\\mathbf{r})\\)</li>
                        <li><strong>Mean radius:</strong> \\(\\langle r \\rangle \\propto 1/Z\\) (the atom contracts)</li>
                        <li><strong>Ionization energy:</strong> \\(\\text{IE} = Z^2 \\times 13.6\\) eV (from \\(n=1\\))</li>
                    </ul>
                    <p>The scaling with \\(Z^2\\) for energy and \\(1/Z\\) for size means that inner-shell electrons in heavy atoms experience very high effective nuclear charges and are tightly bound.</p></div>
                </div>

                <h3>The Complete Set of Quantum Numbers</h3>
                <p>Including electron spin, each electron state is specified by four quantum numbers:</p>

                <div class="env-block definition">
                    <div class="env-title">Definition (Quantum Numbers)</div>
                    <div class="env-body">
                    <table style="width:100%; border-collapse:collapse;">
                    <tr style="border-bottom:1px solid #30363d;"><th style="text-align:left;padding:4px 8px;">Symbol</th><th style="text-align:left;padding:4px 8px;">Name</th><th style="text-align:left;padding:4px 8px;">Values</th><th style="text-align:left;padding:4px 8px;">Physical meaning</th></tr>
                    <tr><td style="padding:4px 8px;">\\(n\\)</td><td style="padding:4px 8px;">Principal</td><td style="padding:4px 8px;">\\(1, 2, 3, \\ldots\\)</td><td style="padding:4px 8px;">Energy, overall size</td></tr>
                    <tr><td style="padding:4px 8px;">\\(l\\)</td><td style="padding:4px 8px;">Angular momentum</td><td style="padding:4px 8px;">\\(0, 1, \\ldots, n-1\\)</td><td style="padding:4px 8px;">Shape (\\(s, p, d, f, \\ldots\\))</td></tr>
                    <tr><td style="padding:4px 8px;">\\(m_l\\)</td><td style="padding:4px 8px;">Magnetic</td><td style="padding:4px 8px;">\\(-l, \\ldots, +l\\)</td><td style="padding:4px 8px;">Orientation</td></tr>
                    <tr><td style="padding:4px 8px;">\\(m_s\\)</td><td style="padding:4px 8px;">Spin</td><td style="padding:4px 8px;">\\(+1/2, -1/2\\)</td><td style="padding:4px 8px;">Intrinsic angular momentum</td></tr>
                    </table></div>
                </div>

                <h3>Electron Spin</h3>

                <div class="env-block definition">
                    <div class="env-title">Definition (Spin Angular Momentum)</div>
                    <div class="env-body"><p>Electrons possess an intrinsic angular momentum called <strong>spin</strong>, with quantum number \\(s = 1/2\\). The spin operators satisfy:
                    \\[\\hat{S}^2|s, m_s\\rangle = \\hbar^2 s(s+1)|s, m_s\\rangle = \\frac{3}{4}\\hbar^2|s, m_s\\rangle\\]
                    \\[\\hat{S}_z|s, m_s\\rangle = \\hbar m_s|s, m_s\\rangle, \\quad m_s = \\pm\\frac{1}{2}\\]
                    The two spin states are commonly denoted \\(\\alpha\\) (spin-up, \\(m_s = +1/2\\)) and \\(\\beta\\) (spin-down, \\(m_s = -1/2\\)). Spin is a purely quantum mechanical property with no classical analog.</p></div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition (Spin-Orbital)</div>
                    <div class="env-body"><p>A <strong>spin-orbital</strong> is the product of a spatial orbital and a spin function:
                    \\[\\chi(\\mathbf{x}) = \\psi_{nlm}(\\mathbf{r})\\,\\sigma(s)\\]
                    where \\(\\mathbf{x} = (\\mathbf{r}, s)\\) denotes both spatial and spin coordinates, and \\(\\sigma \\in \\{\\alpha, \\beta\\}\\). Each spatial orbital gives rise to two spin-orbitals.</p></div>
                </div>

                <div class="viz-placeholder" data-viz="viz-energy-levels"></div>

                <h3>Degeneracy and Symmetry</h3>

                <div class="env-block theorem">
                    <div class="env-title">Theorem (Degeneracy of Hydrogen-like Atoms)</div>
                    <div class="env-body"><p>The \\(n\\)-th energy level has degeneracy:
                    \\[g_n = 2\\sum_{l=0}^{n-1}(2l+1) = 2n^2\\]
                    (including spin). This "accidental" \\(l\\)-degeneracy is unique to the \\(1/r\\) potential and is broken in multi-electron atoms by electron-electron repulsion (which makes \\(s\\) orbitals lower in energy than \\(p\\) orbitals of the same \\(n\\)).</p></div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body"><p>For each \\(l\\) from \\(0\\) to \\(n-1\\), there are \\(2l+1\\) values of \\(m_l\\), each with 2 spin states. Total: \\(2\\sum_{l=0}^{n-1}(2l+1)\\). The sum \\(\\sum_{l=0}^{n-1}(2l+1) = n^2\\) (sum of first \\(n\\) odd numbers). Thus \\(g_n = 2n^2\\).</p>
                    <div class="qed">&#8718;</div></div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark (The Laplace-Runge-Lenz Vector)</div>
                    <div class="env-body"><p>The \\(l\\)-degeneracy of hydrogen arises from a hidden symmetry. The <strong>Laplace-Runge-Lenz vector</strong>
                    \\[\\hat{\\mathbf{A}} = \\frac{1}{2}(\\hat{\\mathbf{p}} \\times \\hat{\\mathbf{L}} - \\hat{\\mathbf{L}} \\times \\hat{\\mathbf{p}}) - \\frac{Z}{r}\\hat{\\mathbf{r}}\\]
                    commutes with \\(\\hat{H}\\) for the Coulomb potential: \\([\\hat{H}, \\hat{\\mathbf{A}}] = 0\\). Together with \\(\\hat{\\mathbf{L}}\\), the six components of \\(\\hat{\\mathbf{L}}\\) and \\(\\hat{\\mathbf{A}}\\) generate the Lie algebra of \\(SO(4)\\) (for bound states), explaining the \\(n^2\\) degeneracy. For any other central potential, this extra symmetry is absent, and \\(l\\)-degeneracy is broken.</p></div>
                </div>

                <h3>Connection to Multi-Electron Atoms</h3>

                <div class="env-block warning">
                    <div class="env-title">Warning (Breakdown of Hydrogen-like Picture)</div>
                    <div class="env-body"><p>In multi-electron atoms, the orbital picture changes in crucial ways:</p>
                    <ul>
                        <li>\\(l\\)-degeneracy is broken: \\(E_{ns} < E_{np} < E_{nd}\\) because s electrons penetrate closer to the nucleus and experience less shielding.</li>
                        <li>For \\(n \\geq 3\\), this can even cause level crossings: \\(E_{4s} < E_{3d}\\) in potassium.</li>
                        <li>The Aufbau principle, Hund's rules, and the Pauli exclusion principle determine the electron configuration.</li>
                        <li>The orbital approximation itself (each electron in a definite orbital) is only approximate; electron correlation means the true wavefunction is not a single Slater determinant.</li>
                    </ul></div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark (Spectroscopic Notation)</div>
                    <div class="env-body"><p>Atomic states are labeled \\(^{2S+1}L_J\\), where \\(S\\) is the total spin, \\(L\\) the total orbital angular momentum (\\(S, P, D, F, \\ldots\\) for \\(L = 0, 1, 2, 3, \\ldots\\)), and \\(J = |L - S|, \\ldots, L + S\\) the total angular momentum. For hydrogen in its ground state: \\(^2S_{1/2}\\) (\\(S = 1/2\\), \\(L = 0\\), \\(J = 1/2\\)). For the \\(2p\\) state: \\(^2P_{1/2}\\) and \\(^2P_{3/2}\\) (the spin-orbit splitting gives the famous Lamb shift and fine structure).</p></div>
                </div>`,

            visualizations: [
                {
                    id: 'viz-energy-levels',
                    title: 'Hydrogen Energy Level Diagram',
                    description: 'Energy levels for hydrogen-like atoms with adjustable nuclear charge \\(Z\\). Each level shows the orbital degeneracy and electron capacity.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {scale: 30, originX: 80, originY: 30});
                        var Z = 1;

                        VizEngine.createSlider(controls, 'Z (nuclear charge)', 1, 6, Z, 1, function(v) {
                            Z = Math.round(v);
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            // Energy axis
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1.5;
                            ctx.beginPath(); ctx.moveTo(50, 30); ctx.lineTo(50, h - 20); ctx.stroke();

                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.save();
                            ctx.translate(15, h / 2);
                            ctx.rotate(-Math.PI / 2);
                            ctx.fillText('Energy (eV)', 0, 0);
                            ctx.restore();

                            // Draw energy levels for n=1 to 5
                            var nMax = 5;
                            var E1 = -13.6 * Z * Z;
                            var yBottom = h - 40;
                            var yTop = 50;
                            var energyToY = function(E) {
                                // Map energy range [E1, 0] to [yBottom, yTop]
                                if (E <= E1) return yBottom;
                                return yTop + (yBottom - yTop) * E / E1;
                            };

                            // Draw ionization limit
                            ctx.strokeStyle = viz.colors.muted;
                            ctx.setLineDash([4, 4]);
                            ctx.beginPath(); ctx.moveTo(50, yTop); ctx.lineTo(w - 20, yTop); ctx.stroke();
                            ctx.setLineDash([]);
                            ctx.fillStyle = viz.colors.muted;
                            ctx.textAlign = 'left';
                            ctx.fillText('E = 0 (ionization)', w - 130, yTop - 8);

                            var subshellNames = ['s', 'p', 'd', 'f', 'g'];
                            var colors = [viz.colors.blue, viz.colors.teal, viz.colors.orange, viz.colors.purple, viz.colors.pink];

                            for (var n = 1; n <= nMax; n++) {
                                var En = -13.6 * Z * Z / (n * n);
                                var y = energyToY(En);

                                // Energy label on left
                                ctx.fillStyle = viz.colors.text;
                                ctx.textAlign = 'right';
                                ctx.font = '10px -apple-system,sans-serif';
                                ctx.fillText(En.toFixed(1) + ' eV', 46, y + 3);

                                // Draw subshell levels (spread horizontally)
                                var totalSubshells = n; // l=0 to n-1
                                var xStart = 80;
                                var xSpacing = Math.min(100, (w - 140) / totalSubshells);

                                for (var l = 0; l < n; l++) {
                                    var x1 = xStart + l * xSpacing;
                                    var x2 = x1 + xSpacing * 0.7;
                                    var col = colors[l % colors.length];

                                    // In hydrogen, all l have same energy (draw slightly offset for visibility)
                                    var yOff = y;

                                    ctx.strokeStyle = col;
                                    ctx.lineWidth = 2.5;
                                    ctx.beginPath(); ctx.moveTo(x1, yOff); ctx.lineTo(x2, yOff); ctx.stroke();

                                    // Label
                                    ctx.fillStyle = col;
                                    ctx.font = 'bold 11px -apple-system,sans-serif';
                                    ctx.textAlign = 'center';
                                    ctx.fillText(n + subshellNames[l], (x1 + x2) / 2, yOff - 10);

                                    // Degeneracy
                                    ctx.font = '9px -apple-system,sans-serif';
                                    ctx.fillStyle = viz.colors.muted;
                                    ctx.fillText('(' + (2 * (2 * l + 1)) + 'e\u207b)', (x1 + x2) / 2, yOff + 14);
                                }

                                // n label
                                ctx.fillStyle = viz.colors.white;
                                ctx.font = 'bold 12px -apple-system,sans-serif';
                                ctx.textAlign = 'right';
                                ctx.fillText('n=' + n, w - 15, y + 4);
                            }

                            // Title
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            var elemNames = ['', 'H', 'He\u207a', 'Li\u00b2\u207a', 'Be\u00b3\u207a', 'B\u2074\u207a', 'C\u2075\u207a'];
                            ctx.fillText(elemNames[Z] + ' (Z=' + Z + ') Energy Levels', w / 2, 18);

                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.green;
                            ctx.fillText('Total degeneracy n=' + 1 + ': ' + (2 * 1 * 1), w / 2, h - 8);
                        }
                        draw();
                        return viz;
                    }
                }
            ],

            exercises: [
                {
                    question: 'Compute the ionization energy of Li\\(^{2+}\\) (\\(Z = 3\\)) from the \\(n = 1\\) state, in both Hartree and eV.',
                    hint: 'Ionization energy = \\(-E_1 = Z^2/(2n^2)\\) Hartree.',
                    solution: '<p>\\(E_1 = -Z^2/2 = -9/2 = -4.5\\) Hartree. IE = 4.5 Hartree = \\(4.5 \\times 27.21 = 122.5\\) eV. Equivalently, \\(13.6 \\times 9 = 122.4\\) eV.</p>'
                },
                {
                    question: 'Show that the degeneracy formula \\(g_n = 2n^2\\) gives the correct values for \\(n = 1, 2, 3\\): namely 2, 8, 18.',
                    hint: 'List all \\((l, m_l, m_s)\\) combinations for each \\(n\\).',
                    solution: '<p>\\(n=1\\): \\(l=0, m_l=0, m_s=\\pm 1/2\\) gives 2 states. \\(n=2\\): \\(l=0\\) gives 2; \\(l=1, m_l \\in \\{-1,0,1\\}\\) gives \\(3 \\times 2 = 6\\); total 8. \\(n=3\\): \\(l=0\\) (2) + \\(l=1\\) (6) + \\(l=2, m_l \\in \\{-2,-1,0,1,2\\}\\) (10) = 18. Check: \\(2(1)^2 = 2\\), \\(2(2)^2 = 8\\), \\(2(3)^2 = 18\\).</p>'
                },
                {
                    question: 'The Lyman series corresponds to transitions from \\(n \\geq 2\\) to \\(n = 1\\). Compute the wavelength of the Lyman-\\(\\alpha\\) line (\\(n=2 \\to 1\\)) in nm.',
                    hint: 'Photon energy: \\(\\Delta E = 13.6(1 - 1/4) = 10.2\\) eV. Use \\(\\lambda = hc/\\Delta E\\).',
                    solution: '<p>\\(\\Delta E = 13.6(1 - 1/4) = 10.2\\) eV. \\(\\lambda = 1240\\text{ eV}\\cdot\\text{nm}/10.2\\text{ eV} = 121.6\\) nm (ultraviolet). This is in the vacuum UV, consistent with the known Lyman-\\(\\alpha\\) wavelength of 121.567 nm.</p>'
                },
                {
                    question: 'Explain why \\(E_{3s} < E_{3p} < E_{3d}\\) in multi-electron atoms (e.g., sodium), even though all three are degenerate in hydrogen. Relate this to the concept of "penetration" and "shielding."',
                    hint: 'Consider the radial distribution function near the nucleus for different \\(l\\) values.',
                    solution: '<p>In multi-electron atoms, inner electrons shield the nuclear charge. The effective potential is no longer \\(-Z/r\\) but depends on distance. The 3s wavefunction has density near the nucleus (it penetrates the inner electron cloud), experiencing a large effective \\(Z\\). The 3d wavefunction has most density far from the nucleus (no penetration for \\(l=2\\); recall \\(R \\propto r^l\\) near the origin), experiencing a heavily shielded \\(Z_{\\text{eff}} \\approx 1\\). Since more penetration means lower energy, \\(E_{3s} < E_{3p} < E_{3d}\\). This breaks the \\(l\\)-degeneracy of the pure Coulomb potential.</p>'
                },
                {
                    question: 'The spin-orbit coupling energy in hydrogen is \\(\\Delta E_{SO} = \\frac{\\alpha^2 E_n}{n}\\frac{1}{l(l+1/2)(l+1)}\\left[\\frac{j(j+1) - l(l+1) - s(s+1)}{2}\\right]\\) where \\(\\alpha \\approx 1/137\\). Estimate the fine-structure splitting of the 2p level.',
                    hint: 'For 2p: \\(n=2, l=1, s=1/2\\). The two possible \\(j\\) values are \\(1/2\\) and \\(3/2\\). The splitting is the difference in \\(\\Delta E_{SO}\\) for these two \\(j\\) values.',
                    solution: '<p>For \\(j = 3/2\\): \\([j(j+1) - l(l+1) - s(s+1)]/2 = [(15/4) - 2 - (3/4)]/2 = 1/2\\). For \\(j = 1/2\\): \\([(3/4) - 2 - (3/4)]/2 = -1\\). The splitting: \\(\\Delta = \\frac{\\alpha^2 |E_2|}{2 \\cdot 1 \\cdot (3/2) \\cdot 2}(1/2 - (-1)) = \\frac{\\alpha^2 \\cdot 3.4\\text{ eV}}{6} \\cdot \\frac{3}{2}\\). With \\(\\alpha^2 \\approx 5.3 \\times 10^{-5}\\): \\(\\Delta \\approx 4.5 \\times 10^{-5}\\) eV \\(\\approx 0.365\\) cm\\(^{-1}\\), consistent with the observed hydrogen fine structure.</p>'
                }
            ]
        }
    ]
});
