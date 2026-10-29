import { createContext, useContext, useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const KoleksiContext = createContext();

export function KoleksiProvider({ children }) {
    const [koleksiLokal, setKoleksiLokal] = useLocalStorage('koleksi_portofolio', null);
    const [koleksi, setKoleksi] = useState(koleksiLokal || []);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function ambilDataAwal() {
            try {
                const tersimpan = window.localStorage.getItem('koleksi_portofolio');
                if (tersimpan) {
                    const parsed = JSON.parse(tersimpan);
                    if (Array.isArray(parsed) && parsed.length > 0) {
                        setKoleksi(parsed);
                        setLoading(false);
                        return;
                    }
                }
            } catch {
            }

            setLoading(true);
            setError(null);
            try {
                const res = await fetch(`${import.meta.env.BASE_URL}data/koleksi.json`);
                if (!res.ok) {
                    throw new Error('Gagal memuat data koleksi dari server');
                }
                const data = await res.json();
                setKoleksi(data);
                window.localStorage.setItem('koleksi_portofolio', JSON.stringify(data));
            } catch (err) {
                setError(err.message || 'Terjadi kesalahan saat memuat data');
            } finally {
                setLoading(false);
            }
        }

        ambilDataAwal();
    }, []);

    const tambahItem = (itemBaru) => {
        const idBaru = String(Date.now());
        const itemLengkap = {
            id: idBaru,
            judul: itemBaru.judul.trim(),
            kategori: itemBaru.kategori?.trim() || 'Aplikasi Web',
            teknologi: itemBaru.teknologi?.trim() || 'React',
            tahun: Number(itemBaru.tahun) || 2026,
            tautan: itemBaru.tautan?.trim() || 'https://github.com',
        };

        const daftarBaru = [...koleksi, itemLengkap];
        setKoleksi(daftarBaru);
        setKoleksiLokal(daftarBaru);
        return itemLengkap;
    };

    const hapusItem = (id) => {
        const daftarBaru = koleksi.filter((item) => String(item.id) !== String(id));
        setKoleksi(daftarBaru);
        setKoleksiLokal(daftarBaru);
    };

    return (
        <KoleksiContext.Provider
            value={{
                koleksi,
                loading,
                error,
                tambahItem,
                hapusItem,
            }}
        >
            {children}
        </KoleksiContext.Provider>
    );
}

export function useKoleksi() {
    return useContext(KoleksiContext);
}