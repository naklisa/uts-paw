import { Link } from "react-router-dom";

export default function KartuItem({ item }) {
    return (
        <article className="kartu-item">
            <div className="kartu-header">
                <span className="badge-kategori">{item.kategori}</span>
                <span className="tahun-item">{item.tahun}</span>
            </div>
            <h2 className="kartu-judul">{item.judul}</h2>
            <p className="kartu-info">
                <strong>Teknologi:</strong> {item.teknologi}
            </p>
            <div className="kartu-aksi">
                <Link to={`/koleksi/${item.id}`} className="btn-detail">
                    Lihat Detail
                </Link>
            </div>
        </article>
    );
}