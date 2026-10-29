import { useKoleksi } from "../context/KoleksiContext";
import { useFilterKoleksi } from "../hooks/useFilterKoleksi";
import FilterBar from "../components/FilterBar";
import KartuItem from "../components/KartuItem";

export default function Koleksi() {
    const { koleksi, loading, error } = useKoleksi();
    const {
        kataKunci,
        setKataKunci,
        kategoriTerpilih,
        setKategoriTerpilih,
        daftarKategori,
        koleksiTersaring,
    } = useFilterKoleksi(koleksi);

    if (loading) {
        return (
            <section className="status-box">
                <h1>Daftar Koleksi Proyek</h1>
                <p>Sedang memeuat data Koleksi...</p>
            </section>
        );
    }

    if (error) {
        return (
            <section className="status-box">
                <h1>Daftar Koleksi Proyek</h1>
                <p role="alert" className="pesan-error">
                    Gagal Memuat data: {error}
                </p>
            </section>
        );
    }

    return (
        <section className="halamaan-koleksi">
            <h1>Daftar Koleksi Portofolio Proyek</h1>


            <FilterBar
                kataKunci={kataKunci}
                onUbahKataKunci={setKataKunci}
                kategoriTerpilih={kategoriTerpilih}
                onUbahKategori={setKategoriTerpilih}
                daftarKategori={daftarKategori}
            />

            {koleksiTersaring.length === 0 ? (
                <p className="Kosong-text">
                    Tidak ada Proyek yang cocok dengan pencarian atau filter.
                </p>
            ) : (
                <div className="grid-koleksi">
                    {koleksiTersaring.map((item) => (
                        <KartuItem key={item.id} item={item} />
                    ))}
                </div>
            )}
        </section>
    );
}