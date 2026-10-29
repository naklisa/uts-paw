import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

const dataMock = [
  {
    id: '1',
    judul: 'WakeMeUp',
    kategori: 'Aplikasi Web',
    teknologi: 'TypeScript',
    tahun: 2026,
    tautan: 'https://github.com/naklisa/WakeMeUp.git'
  },

  {
    id: '2',
    judul: 'Vts-Panjang-Profile',
    kategori: 'Aplikasi Web',
    teknologi: 'TypeScript, JavaScript',
    tahun: 2026,
    tautan: 'https://github.com/naklisa/Vts-Panjang-Profile.git',
  },
];

describe('Pengujian Aplikasi WakeMeUp', () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => dataMock,
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('1. Menampilkan judul utama dan tema Portofolio Proyek di halaman Beranda', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    expect(
      screen.getByRole('heading', { level: 1, name: /koleksi Portofolio Proyek/i })
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Total Item Proyek')).toBeInTheDocument();
    });
  });

  it('2. Menampilkan daftar Koleksi dan Menyaring berdasarkan pencarian judul', async () => {
    render(
      <MemoryRouter initialEntries={['/koleksi']}>
        <App />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('WakeMeUp')).toBeInTheDocument();
      expect(screen.getByText('Vts-Panjang-Profile')).toBeInTheDocument();
    });

    const inputCari = screen.getByRole('searchbox');
    fireEvent.change(inputCari, { target: { value: 'Panjang' } });

    expect(screen.queryByText('WakeMeUp')).not.toBeInTheDocument();
    expect(screen.getByText('Vts-Panjang-Profile')).toBeInTheDocument();
  });

  it('3. Menampilkan pesan error dengan role="Allert" jika form tambah diisi tanpa judul', async () => {
    render(
      <MemoryRouter initialEntries={['/tambah']}>
        <App />
      </MemoryRouter>
    );

    const tombolSimpan = screen.getByRole('button', { name: /Simpan/i });
    fireEvent.click(tombolSimpan);

    const pesanError = await screen.findByRole('alert');
    expect(pesanError).toBeInTheDocument();
  });

  it('4. Berhasil menambahkan proyek baru dan mengarahkan ke halaman koleksi', async () => {
    render(
      <MemoryRouter initialEntries={['/tambah']}>
        <App />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByLabelText(/judul/i)).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText(/judul/i), {
      target: { value: 'Movie-Database-Explorer' },
    });
    fireEvent.change(screen.getByLabelText(/Teknologi/i), {
      target: { value: 'TypeScript' },
    });
    fireEvent.change(screen.getByLabelText(/Tahun/i), {
      target: { value: '2026' },
    });
    fireEvent.change(screen.getByLabelText(/Tautan/i), {
      target: { value: 'https://github.com/naklisa/Movie-Database-Explorer.git' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Simpan/i }));

    await waitFor(() => {
      expect(
        screen.getByText('Movie-Database-Explorer')
      ).toBeInTheDocument();
    });
  });

  it('5. Menampilkan text "Tidak ditemukkan" tanpa text "404" untuk ID detail yang tidak ada', async () => {
    render(
      <MemoryRouter initialEntries={['/koleksi/99999']}>
        <App />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Data Tidak Ditemukan')).toBeInTheDocument();
    });

    expect(screen.queryByText(/404/)).not.toBeInTheDocument();
  });

  it('6. Menampilkan tabel di halamaan statistik dan text 404 di rute tidak dikenal', async () => {
    const { unmount } = render(
      <MemoryRouter initialEntries={['/statistik']}>
        <App />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByRole('table')).toBeInTheDocument();
    });

    unmount();

    render(
      <MemoryRouter initialEntries={['/halaman-Asal-tidak-ada']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/404/)).toBeInTheDocument();
  });
});