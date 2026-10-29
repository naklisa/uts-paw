import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { KoleksiContext } from '../context/KoleksiContext';
import KartuRingkasan from '../components/KartuRingkasan';

export default function Beranda() {
    const { koleksi, loading } = useContext(KoleksiContext);

    const JumlahItem = koleksi.length;
    const jumlahKategori = new Set(koleksi.map((item) => item.kategori)).size;

    return (
        <section className="Halaman-beranda">
            <div className='hero-section'>
                <h1>Koleksi Portofolio Proyek</h1>
                <p className='tema-text'>
                    Tema: <strong>Portofolio Proyek</strong>
                </p>
                <p>
                    Kelola dan dokumentasikan berbagai karya Pengembangan Perangkat Lunak
                </p>
                <div className='hero-action'>
                    <Link to="/koleksi" className='btn-utama'>
                        Lihat Semua Koleksi
                    </Link>
                    <Link to="/tambah" className='btn-sekunder'>
                        Tambah Proyek Baru
                    </Link>
                </div>
            </div>

            {loading ? (
                <p>Memuat ringkasan Data...</p>
            ) : (
                <div className='grid-ringkasan'>
                    <KartuRingkasan
                        label="Total Item Proyek"
                        nilai={JumlahItem}
                        keterangan="Jumlah Seluruh proyek yang tersimpan dalam koleksi"
                    />
                    <KartuRingkasan
                        label="Jumlah Kategori"
                        nilai={jumlahKategori}
                        keterangan="Kategori Proyek yang tersedia saat ini"
                    />
                </div>
            )}
        </section>
    );
}