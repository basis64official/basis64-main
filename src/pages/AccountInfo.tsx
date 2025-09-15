import bgImage from '../assets/img/header.webp';
import { AnimatedCounter } from '../components/ui/AnimatedCounter';
import useAuth from '../state/useAuth';

export default function AccountInfo() {
    const auth = useAuth();
    return (
        <>
            <header className="relative min-h-[384px] py-4 sm:py-8 overflow-hidden flex items-center justify-center text-white">
                {/* Background */}
                <div
                    className="absolute inset-0 h-full w-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${bgImage})` }}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black opacity-70" />

                {/* Konten */}
                <div className="relative z-10 px-4 sm:px-16">
                    <div className='flex'>
                        <div className="text-white mb-8">
                            <h1 className="mt-8 sm:mt-0 text-xl sm:text-xl font-bold">
                                {auth.name}
                            </h1>
                            <p className="text-sm sm:text-lg mt-2 mb-4 max-w-6xl mx-auto">
                                {auth.email}
                            </p>
                        </div>
                    </div>

                    <div className="sm:flex justify-between pt-4 gap-4 border-t w-full" hidden>
                        <button className="w-full flex-1 cursor-pointer bg-white/15 border border-white/50 hover:bg-blue-500/15 hover:border-blue-500/50 hover:text-blue-200 shadow-md shadow-white/10 text-[color:var(--color-text-primary)] text-sm sm:text-base hover:scale-105 hover:shadow-lg transition-transform duration-300 mb-4 p-2">
                            <p className="font-semibold text-base sm:text-lg">Berikan kami umpan balik</p>
                        </button>
                        <button className="w-full flex-1 cursor-pointer bg-white/15 border border-white/50 hover:bg-blue-500/15 hover:border-blue-500/50 hover:text-blue-200 shadow-md shadow-white/10 text-[color:var(--color-text-primary)] text-sm sm:text-base hover:scale-105 hover:shadow-lg transition-transform duration-300 mb-4 p-2">
                            <p className="font-semibold text-base sm:text-lg">Tambahkan kosakata</p>
                        </button>
                    </div>
                </div>


            </header>
        </>
    );
}
