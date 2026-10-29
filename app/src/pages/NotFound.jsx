import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <section className="Halaman-404">
            <h1> 404 - Halaman Tidak diTemukan</h1>
            <p> Maaf, alamat halamaan yang anda tuju tidak ada.</p>
            <Link to="/" className="btn-utama">
                Kembali Ke Beranda
            </Link>
        </section>
    );
}