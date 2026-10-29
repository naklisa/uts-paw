import { useNavigate } from "react-router-dom";
import { useKoleksi } from "../context/KoleksiContext";
import FormItem from "../components/FormItem";

export default function Tambah() {
    const { tambahItem } = useKoleksi();
    const navigate = useNavigate();

    const handleSimpan = (dataBaru) => {
        tambahItem(dataBaru);
        navigate('/koleksi');
    };

    return (
        <section className="halaman-tambah">
            <h1>Tambah Portofolio Proyek</h1>
            <p>Isi Data dibawah ini untuk menambahkan proyek baru ke koleksi.</p>
            <FormItem onSimpan={handleSimpan} />
        </section>
    );
}