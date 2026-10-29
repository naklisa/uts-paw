import { Link, useNavigate, useParams } from "react-router-dom";
import { useKoleksi } from "../context/KoleksiContext";

export default function Detail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { koleksi, loading, hapusItem } = useKoleksi();

    if (loading) {
        return <p>Sedang memuat detail Proyek...</p>
    }

    const item = koleksi.find((data) => String(data.id) === String(id));

    if (!item) {
        return (
            <section className="halaman-detail">
                <h1>Data Tidak Ditemukan</h1>
                <p>Maaf, Proyek dengan ID tersebut tidak ditemukan dalam koleksi.</p>
                <Link to="/koleksi" className="btn-sekunder">
                    Kembali ke daftar Koleksi
                </Link>
            </section>
        );
    }

    const handleHapus = () => {
        const setuju = window.confirm(
            'Apakah anda Yakin ingin menghapus "${item.judul}"?'
        );
        if (setuju) {
            hapusItem(item.id);
            navigate('/koleksi');
        }
    };

    return (
        <section className="halamaan-detail">
            <h1>{item.judul}</h1>



            <div className="detail-kartu">
                <dl className="detail-list">
                    <div className="detail-baris">
                        <dt>ID Proyek</dt>
                        <dd>{item.id}</dd>
                    </div>

                    <div className="detail-baris">
                        <dt>Kategori</dt>
                        <dd>{item.kategori}</dd>
                    </div>
                    <div className="detail-baris">
                        <dt>Teknologi</dt>
                        <dd>{item.teknologi}</dd>
                    </div>
                    <div className="detail-baris">
                        <dt>Tahun</dt>
                        <dd>{item.tahun}</dd>
                    </div>
                    <div className="detail-baris">
                        <dt>Tautan</dt>
                        <a href={item.tautan} target="_blank" rel="noreferrer">
                            {item.tautan}
                        </a>
                    </div>
                </dl>

                <div className="detail-aksi">
                    <button type="button" onClick={handleHapus} className="btn-hapus">
                        Hapus Proyek
                    </button>
                    <Link to="/koleksi" className="btn-sekunder">
                        Kembali ke Koleksi
                    </Link>
                </div>
            </div>
        </section>
    );
}