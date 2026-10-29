export default function FilterBar({
    kataKunci,
    onUbahKataKunci,
    kategoriTerpilih,
    onUbahKategori,
    daftarKategori = [],
}) {
    return (
        <section className="filter-bar" aria-label="Filter dan Pencarian Koleksi">
            <div className="filter-grup">
                <label htmlFor="cari-judul">Cari Judul Proyek</label>
                <input
                    id="cari-judul"
                    type="search"
                    placeholder="Ketik Judul Proyek..."
                    value={kataKunci}
                    onChange={(e) => onUbahKataKunci(e.target.value)}
                    className="input-field"
                />
            </div>

            <div className="filter-group">
                <label htmlFor="filter-kategori">Filter Kategori</label>
                <select
                    id="filter-kategori"
                    value={kategoriTerpilih}
                    onChange={(e) => onUbahKategori(e.target.value)}
                    className="input-field"
                >
                    {daftarKategori.map((kat) => (
                        <option key={kat} value={kat}>
                            {kat}
                        </option>
                    ))}
                </select>
            </div>
        </section>
    );
}