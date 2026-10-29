export default function KartuRingkasan({ label, nilai, keterangan }) {
    return (
        <div className="kartu-ringkasan">
            <span className="ringkasan-label">{label}</span>
            <strong className="ringkasan-nilai">{nilai}</strong>
            {keterangan && <p className="ringkasan-keterangan">{keterangan}</p>}
        </div>
    );
}