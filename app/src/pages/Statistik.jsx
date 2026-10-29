import { useKoleksi } from "../context/KoleksiContext";

export default function Statistik() {
    const { koleksi, loading } = useKoleksi();

    if (loading) {
        return <p>Sedang memuat Statistik...</p>
    }

    const hitunganKategori = koleksi.reduce((acc, item) => {
        const kat = item.kategori || 'lainnya';
        acc[kat] = (acc[kat] || 0) + 1;
        return acc;
    }, {});

    const daftarBaris = Object.entries(hitunganKategori);

    return (
        <section className="halaman-statistik">
            <h1>Statistik Koleksi Proyek</h1>
            <p>Rekapitulasi Jumlah Portofolio proyek berdasarkan Kategori:</p>

            <table className="tabel-statistik">
                <thead>
                    <tr>
                        <th>Kategori</th>
                        <th>Jumlah Item</th>
                    </tr>
                </thead>
                <tbody>
                    {daftarBaris.map(([kategori, jumlah]) => (
                        <tr key={kategori}>
                            <td>{kategori}</td>
                            <td>{jumlah}</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <th>Total</th>
                        <th>{koleksi.length}</th>
                    </tr>
                </tfoot>
            </table>
        </section>
    );
}