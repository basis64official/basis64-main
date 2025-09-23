// import { Link } from 'react-router-dom';
// import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import bgImage from '../assets/img/header.webp';
import userImage from '../assets/img/user.webp';
// import UserProfile from '../components/layout/UserProfile';
// import useAuth from '../state/useAuth';
import { FeatureList } from '../components/layout/FeatureList';
import { AnimatedCounter } from '../components/ui/AnimatedCounter';
import useInfo from '../state/useInfo';
import useNavigationBar from '../state/useNavigationBar';
import { useEffect, useState } from 'react';
// import { apiFetch } from '../api/apiFetch';
// import Login from './Login';

export default function Home() {
	const info = useInfo();
	const navigationBar = useNavigationBar();

	useEffect(() => {
		navigationBar.show();
	}, []);

	const [changelog, setChangelog] = useState("Loading...");

	useEffect(() => {
		(async () => {
			try {
				const response = await fetch('https://cdn.jsdelivr.net/gh/basis64computer/public/changelog.txt');
				const data = await response.text();
				setChangelog(data);
				// Update state with data
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		})();
	}, []);

	return (
		<>
			<header className="relative min-h-[220px] sm:min-h-[320px] py-4 sm:py-8 overflow-hidden flex items-center justify-center text-white">
				{/* Background */}
				<div
					className="absolute inset-0 h-full w-full bg-cover bg-center"
					style={{ backgroundImage: `url(${bgImage})` }}
				/>

				{/* Overlay */}
				<div className="absolute inset-0 bg-black opacity-70" />

				{/* Konten */}
				<div className="relative z-10 text-center px-4 sm:px-16">
					<div className="text-white mb-8">
						<h1 className="mt-4 sm:mt-0 text-base sm:text-lg font-bold">
							Terjemahkan Bahasa Dayak Kenyah dengan mudah dan cepat!
						</h1>
						<p className="text-sm sm:text-lg mt-2 mb-4 max-w-6xl mx-auto">
							Kamu dapat menerjemahkan bahasa Dayak Kenyah secara instan tanpa perlu menerjemahannya secara manual dalam waktu yang lama. BASIS-64 adalah SaaS inovatif yang berfokus pada AI dan kamu juga dapat mendukung kami dengan cara menggunakan penerjemah Dayak Kenyah atau memberikan kami umpan balik.
						</p>
					</div>

					<div className="sm:flex justify-between gap-4" >
						<div className="flex-1 bg-white/15 border border-white/50 shadow-md shadow-white/10 text-[color:var(--color-text-primary)] text-sm sm:text-base hover:scale-105 hover:shadow-lg transition-transform duration-300 mb-2 p-2">
							<p className="font-semibold text-sm sm:text-lg">Jumlah pengunjung</p>
							<p className="font-normal text-base sm:text-xl"><AnimatedCounter target={info.visitors} duration={2000} /> orang</p>
						</div>
						<div className="flex-1 bg-white/15 border border-white/50 shadow-md shadow-white/10 text-[color:var(--color-text-primary)] text-sm sm:text-base hover:scale-105 hover:shadow-lg transition-transform duration-300 mb-2 p-2" hidden>
							<p className="font-semibold text-sm sm:text-lg">Akurasi penerjemah</p>
							<p className="font-normal text-base sm:text-xl"><AnimatedCounter target={info.accuracy} duration={2000} />%</p>
						</div>
						<div className="flex-1 bg-white/15 border border-white/50 shadow-md shadow-white/10 text-[color:var(--color-text-primary)] text-sm sm:text-base hover:scale-105 hover:shadow-lg transition-transform duration-300 mb-2 p-2 hidden sm:block">
							<p className="font-semibold text-sm sm:text-lg">Jumlah kosakata</p>
							<p className="font-normal text-base sm:text-xl"><AnimatedCounter target={info.dictionary} duration={2000} /> kata</p>
						</div>
					</div>


					<div className="sm:flex justify-between pt-4 gap-4 w-full" hidden>
						<button className="w-full flex-1 cursor-pointer bg-white/15 border border-white/50 hover:bg-blue-500/15 hover:border-blue-500/50 hover:text-blue-200 shadow-md shadow-white/10 text-[color:var(--color-text-primary)] text-sm sm:text-base hover:scale-105 hover:shadow-lg transition-transform duration-300 mb-4 p-2">
							<p className="font-semibold text-base sm:text-lg">Berikan kami umpan balik</p>
						</button>
						<button className="hidden w-full flex-1 cursor-pointer bg-white/15 border border-white/50 hover:bg-blue-500/15 hover:border-blue-500/50 hover:text-blue-200 shadow-md shadow-white/10 text-[color:var(--color-text-primary)] text-sm sm:text-base hover:scale-105 hover:shadow-lg transition-transform duration-300 mb-4 p-2">
							<p className="font-semibold text-base sm:text-lg">Tambahkan kosakata</p>
						</button>
					</div>
				</div>


			</header>

			<div className='hidden container mt-4 mx-4 p-4 bg-white shadow-sm rounded-sm border border-gray-300 dark:border-neutral-700 dark:bg-neutral-900 text-center'>
    <h1 className='text-black dark:text-white text-lg'>Coba fitur kami sekarang!</h1>
    <p className='text-gray-600 dark:text-gray-400'>Klik salah satu fitur di bawah ini untuk memulai.</p>
</div>

			<FeatureList />
		</>
	);
}
