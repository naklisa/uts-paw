import { NavLink } from "react-router-dom";

export default function Layout({ children, subjudul = "Tema: Portofolio Proyek"}) {
    return (
        <div id="ap-wrapper" className="Layout-container">
            <header id="header-utama" className="site-header">
                <div className="Header-brand">
                    <span className="brand-title">Portofolio Proyek</span>
                    <span className="brand-subtitle">{subjudul}</span>
                </div>
                <nav aria-label="Navigasi Utama" className="site-nav">
                    <NavLink to="/" end className="nav-link">
                        Beranda
                    </NavLink>
                    <NavLink to="/koleksi" className="nav-link">
                        Koleksi
                    </NavLink>
                    <NavLink to="/tambah" className="nav-link">
                        Tambah
                    </NavLink>
                    <NavLink to="/statistik" className="nav-link">
                        statistik
                    </NavLink>
                    <NavLink to="/tentang" className="nav-link">
                        tentang
                    </NavLink>
                </nav>
            </header>

            <main id="konten-utama" className="site-main">
                {children}
            </main>

            <footer className="site-footer">
                <p>&copy; 2026 Portofolio Proyek - UTS Pengembangan Aplikasi Web (NIM 123140049) </p>
            </footer>
        </div>
    );
}
