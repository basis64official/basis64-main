// import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { Button } from '../components/ui/Button';
import useNavigationBar from '../state/useNavigationBar';

export default function Forbidden() {
    const navigationBar = useNavigationBar();
    useEffect(() => {
        navigationBar.hide();
    }, []);
    return (
        <main className="bg-gray-50 grid h-screen w-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
            <div className="text-center">
                <p className="text-6xl font-semibold text-yellow-600 text-stroke text-stroke-2 text-stroke-white">403</p>
                <h1 className="mt-4 text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
                    Forbidden
                </h1>
                <p className="mt-6 text-lg font-medium text-gray-500 sm:text-xl/8">
                    Akses ditolak, silakan login dan akses fitur ini melalui halaman utama.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-4">
                    <Button as="a" variant="yellow" className="text-sm py-2.5" href="/">Kembali ke Beranda</Button>
                    <Button as="a" variant="transparent-yellow" className="text-sm py-2.5" href="/contact">Hubungi Kami</Button>
                </div>
            </div>
        </main>
    );
}
