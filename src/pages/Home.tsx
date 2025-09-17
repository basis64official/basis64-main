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
			<header className="relative min-h-[384px] py-4 sm:py-8 overflow-hidden flex items-center justify-center text-white">
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
						<h1 className="mt-8 sm:mt-0 text-xl sm:text-xl font-bold">
							Terjemahkan Bahasa Dayak Kenyah dengan mudah dan cepat!
						</h1>
						<p className="text-sm sm:text-lg mt-2 mb-4 max-w-6xl mx-auto">
							Kamu dapat menerjemahkan bahasa Dayak Kenyah secara instan tanpa perlu menerjemahannya secara manual dalam waktu yang lama. Kamu juga dapat menggunakan fitur generative AI di BASIS-64. Kamu juga dapat mendukung kami dengan cara menambahkan kosakata Dayak Kenyah atau memberikan kami umpan balik.
						</p>
					</div>

					<div className="sm:flex justify-between gap-4">
						<div className="flex-1 bg-white/15 border border-white/50 shadow-md shadow-white/10 text-[color:var(--color-text-primary)] text-sm sm:text-base hover:scale-105 hover:shadow-lg transition-transform duration-300 mb-4 p-2 sm:p-4">
							<p className="font-semibold text-base sm:text-lg">Jumlah pengunjung</p>
							<p className="font-normal text-lg sm:text-xl"><AnimatedCounter target={info.visitors} duration={2000} /> orang</p>
						</div>
						<div className="flex-1 bg-white/15 border border-white/50 shadow-md shadow-white/10 text-[color:var(--color-text-primary)] text-sm sm:text-base hover:scale-105 hover:shadow-lg transition-transform duration-300 mb-4 p-2 sm:p-4">
							<p className="font-semibold text-base sm:text-lg">Akurasi penerjemah</p>
							<p className="font-normal text-lg sm:text-xl"><AnimatedCounter target={info.accuracy} duration={2000} />%</p>
						</div>
						<div className="flex-1 bg-white/15 border border-white/50 shadow-md shadow-white/10 text-[color:var(--color-text-primary)] text-sm sm:text-base hover:scale-105 hover:shadow-lg transition-transform duration-300 mb-4 p-2 sm:p-4">
							<p className="font-semibold text-base sm:text-lg">Jumlah kosakata</p>
							<p className="font-normal text-lg sm:text-xl"><AnimatedCounter target={info.dictionary} duration={2000} /> kata</p>
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

			<FeatureList />

			<div className="px-4">
				<div className="flex-1 items-center p-4 mb-4 bg-white shadow-xs dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 text-center">
					<svg className="w-10 h-10 mx-auto mb-3 text-gray-400 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
						<path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z"></path>
					</svg>
					<blockquote>
						<p className="text-2xl italic font-medium text-gray-900 dark:text-white">"Kami mengerjakan apa yang dibicarakan, bukan hanya berbicara tentang apa yang dibicarakan."</p>
					</blockquote>
					<figcaption className="flex items-center justify-center mt-6 space-x-3 rtl:space-x-reverse">
						<img className="w-6 h-6 rounded-full border border-neutral-300" src={userImage} alt="Administrator" />
						<div className="flex items-center divide-x-2 rtl:divide-x-reverse divide-gray-500 dark:divide-gray-700">
							<cite className="pe-3 font-medium text-gray-900 dark:text-white"><Link to="/admin/login">Administrator</Link></cite>
							<cite className="ps-3 text-sm text-gray-500 dark:text-gray-400">2025</cite>
						</div>
					</figcaption>
				</div>
				<div className="flex items-center p-4 bg-white shadow-xs dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600">
					<div className="p-3 mr-4 text-gray-500 bg-gray-100 rounded-full px-4 dark:text-gray-100 dark:bg-neutral-500">
						<i className="bi bi-terminal-fill"></i>
					</div>
					<div>
						<p className="text-lg font-semibold text-gray-700 dark:text-gray-200">Change Log</p>
						<p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400" id="systemLogStatus">Website change log and updates.</p>
					</div>
				</div>

				<textarea rows={20} value={changelog} className="block p-2.5 w-full outline-none text-sm text-white font-mono bg-black border border-t-0 border-gray-400 dark:border-neutral-600 dark:bg-neutral-700 dark:placeholder-gray-400 dark:text-white" placeholder="The change log should be written here..." readOnly></textarea>
			</div>
		</>
	);
}
