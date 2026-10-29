import { useState, useMemo } from "react";

export function useFilterKoleksi(koleksi = []) {
    const [kataKunci, setKataKunci] = useState('');
    const[kategoriTerpilih, setKategoriTerpilih] = useState('Semua');

    const daftarKategori = useMemo(() => {
        const unik = new Set (
            koleksi.map((item) => item.kategori).filter(Boolean)
        );
        return ['Semua', ...Array.from(unik)];
    }, [koleksi]);

    const koleksiTersaring = useMemo(() => {
        return koleksi.filter((item) => {
            const cocokJudul = item.judul
                .toLowerCase()
                .includes(kataKunci.trim().toLowerCase());
            const cocokKategori =
                kategoriTerpilih === 'Semua' || item.kategori === kategoriTerpilih;
            return cocokJudul && cocokKategori;
        });
    }, [koleksi, kataKunci, kategoriTerpilih]);

    return {
        kataKunci,
        setKataKunci,
        kategoriTerpilih,
        setKategoriTerpilih,
        daftarKategori,
        koleksiTersaring,
    };
}

export default useFilterKoleksi;