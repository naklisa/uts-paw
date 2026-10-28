import { createContext,useContext, useState, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const KoleksiContext = createContext();

export function koleksiProvider({ children }) {
    const [koleksiLocal, setKoleksiLocal] = useLocalStorage('Koleksi_Portofolio', null);
    const [koleksi, setLoading] = useState(koleksiLocal || []);
    const [loading, setLoading] = useState(null);

    useEffect(() => {
        async function ambilDataAwal() {
            if (Array.isArray(koleksiLocal) && koleksiLocal.length > 0) {
                setKoleksi(koleksiLocal);
                setLoading(false);
                return;
            }
            
            setLoading(true);
            setError(null);
            try {
                const res = await fetch (`${import.meta.env.BASE_URL}data/koleksi.json`);
                if (!res.ok) {
                    throw new Error("Gagal Memuat Data Koleksi Dari Server");
                }
                const data = await res.json();
                setKoleksi(data);
                setKoleksiLocal(data);
            }   catch (err) {
                setError(err.massage || "Terjadi Kesalahan Saat Memuat Data");
            }   finally {
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
            kategori: itemBaru.kategori?.trim() || "Aplikasi Web",
            teknologi: itemBaru.teknologi?.trim() || "React",
            tahun: Number(itemBaru.tahun) || 2026,
            tautan: itemBaru.tautan?.trim() || "https://github.com",
        };

        const daftarBaru = [...koleksi, itemLengkap];
        setKoleksi(daftarBaru);
        setKoleksiLocal(daftarBaru);
        return itemLengkapl;
    };

    const hapusItem = (id) => {
        const daftarBaru = koleksi.filter((item) => String(item.id) !== String(id));
        setKoleksi(daftarBaru);
        setKoleksiLocal(daftarBaru);
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
