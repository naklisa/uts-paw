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
                setKoleksi((prev) => {
                    const idSudahAda = new Set(prev.map((item) => String(item.id)));
                    const gabungan = [
                        ...data.filter((item) => !idSudahAda.has(String(item.id))),
                        ...prev,
                    ];
                    window.localStorage.setItem('koleksi_portofolio', JSON.stringify(gabungan));
                    return gabungan;
                });
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

        setKoleksi((prev) => {
            const daftarBaru = [...prev, itemLengkap];
            setKoleksiLokal(daftarBaru);
            window.localStorage.setItem('koleksi_portofolio', JSON.stringify(daftarBaru));
            return daftarBaru;
        });

        return itemLengkap;
    };

    const hapusItem = (id) => {
        setKoleksi((prev) => {
            const daftarBaru = prev.filter((item) => String(item.id) !== String(id));
            setKoleksiLokal(daftarBaru);
            window.localStorage.setItem('koleksi_portofolio', JSON.stringify(daftarBaru));
            return daftarBaru
        });
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