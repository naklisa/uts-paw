import { useState } from "react";

export default function FormItem({ onSimpan }) {
    const [judul, setJudul] = useState("");
    const [kategori, setKategori] = useState("Aplikasi Web");
    const [teknologi, setTeknologi] = useState("React");
    const [tahun, setTahun] = useState("2026");
    const [tautan, setTautan] = useState("https://github.com");
    const [errorJudul, setErrorJudul] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!judul.trim()) {
            setErrorJudul("Judul Proyek Wajib diisi dan tidak boleh kosong.");
            return;
        }

        setErrorJudul("");
        onSimpan({
            judul: judul.trim(),
            kategori: kategori.trim() || "Aplikasi Web",
            teknologi: teknologi.trim() || "React",
            tahun: Number(tahun) || 2026,
            tautan: tautan.trim() || "https://github.com"
        });
    };

    return (
        <form onSubmit={handleSubmit} className="form-koleksi" noValidate>
            {errorJudul && (
                <div role="alert" className="pesan-error">
                    {errorJudul}
                </div>
            )}

            <div className="form-grup">
                <label htmlFor="input-judul">Judul</label>
                <input
                    id="input-judul"
                    type="text"
                    value={judul}
                    onChange={(e) => {
                        setJudul(e.currentTarget.value);
                        if (errorJudul) setErrorJudul("");
                    }}
                    placeholder="Masukkan Judul Proyek"
                    className="input-field"
                />
            </div>

            <div className="form-grup">
                <label htmlFor="input-kategori">Kategori</label>
                <input
                    id="input-kategori"
                    type="text"
                    value={kategori}
                    onChange={(e) => setKategori(e.target.value)}
                    placeholder="Contoh: Aplikasi Web"
                    className="input-field"
                />
            </div>

            <div className="form-grup">
                <label htmlFor="input-teknologi">Teknologi</label>
                <input
                    id="input-teknologi"
                    type="text"
                    value={teknologi}
                    onChange={(e) => setTeknologi(e.target.value)}
                    placeholder="Contoh: React, Node.js"
                    className="input-field"
                />
            </div>

            <div className="form-grup">
                <label htmlFor="input-tahun">Tahun</label>
                <input
                    id="input-tahun"
                    type="number"
                    value={tahun}
                    onChange={(e) => setTahun(e.target.value)}
                    placeholder="2025"
                    className="input-field"
                />
            </div>

            <div className="form-grup">
                <label htmlFor="input-tautan">Tautan</label>
                <input
                    id="input-tautan"
                    type="url"
                    value={tautan}
                    onChange={(e) => setTautan(e.target.value)}
                    placeholder="https://github.com/..."
                    className="input-field"
                />
            </div>

            <button type="submit" className="btn-utama">
                Simpan
            </button>
        </form>
    );
}