import mahasiswa from '../../mahasiswa.json';

export default function Tentang() {
    return (
        <section className="halaman-tentang">
            <h1>Tentang Pembuat</h1>
            <div className='detail-kartu'>
                <dl className='detail-list'>
                    <div className='detail-baris'>
                        <dt>Nama</dt>
                        <dd>{mahasiswa.nama}</dd>
                    </div>
                    <div className='detail-baris'>
                        <dt>NIM</dt>
                        <dd>{mahasiswa.nim}</dd>
                    </div>
                    <div className='detail-baris'>
                        <dt>Kelas</dt>
                        <dd>{mahasiswa.kelas}</dd>
                    </div>
                    <div className='detail-baris'>
                        <dt>Tema</dt>
                        <dd>{mahasiswa.tema}</dd>
                    </div>
                    <div className='detail-baris'>
                        <dt>Repositori Github</dt>
                        <dd>
                            <a
                                href='https://github.com/naklisa/uts-paw.git'
                                target='_blank'
                                rel='noreferrer'
                            >
                                https://github.com/naklisa/uts-paw.git
                            </a>
                        </dd>
                    </div>
                </dl>
            </div>
        </section>
    );
}