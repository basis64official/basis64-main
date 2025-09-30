
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import bgImage from '../assets/img/header.webp';
import userImage from '../assets/img/user.webp';
import { FeatureList } from '../components/layout/FeatureList';
import { AnimatedCounter } from '../components/ui/AnimatedCounter';
import useInfo from '../state/useInfo';
import useNavigationBar from '../state/useNavigationBar';

export default function Home() {
	const info = useInfo();
	const navigationBar = useNavigationBar();

	useEffect(() => {
		navigationBar.show();
	}, []);

	return (
		<>
			<header className="relative min-h-[320px] sm:min-h-[340px] flex items-center justify-center overflow-hidden text-white bg-black">
				{/* Background pakai img (lebih LCP friendly) */}
				<img
					src={bgImage}
					alt="Header Background"
					className="absolute inset-0 w-full h-full object-cover opacity-60"
					loading="lazy"
					// @ts-ignore
					fetchpriority="high"
				/>

				{/* Overlay */}
				<div className="absolute inset-0 bg-black/70" />

				{/* Konten */}
				<div className="relative z-10 text-center px-6 sm:px-12 max-w-5xl flex flex-col items-center">
					<h1 className="text-lg sm:text-xl font-bold">
						Terjemahkan Bahasa Dayak Kenyah dengan Mudah & Cepat
					</h1>
					<p className="mt-3 text-base sm:text-lg text-gray-300 leading-relaxed">
						<span className='hidden sm:flex text-center justify-center'>
							BASIS-64 adalah SaaS berbasis AI untuk menerjemahkan bahasa Dayak Kenyah secara instan.
						</span>
						Bantu kami dengan menggunakan penerjemah Dayak Kenyah BASIS-64 agar layanan penerjemahan kami semakin akurat, kami selalu update sesuai perkembangan teknologi.
					</p>

					{/* Stats */}
					<div className="mt-4 sm:mt-8 flex flex-col sm:flex-row justify-center items-center gap-4 w-full max-w-5xl">
						<div className="flex-1 min-w-[160px] p-4 border border-white/20 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-center">
							<p className="text-sm sm:text-base font-medium">Jumlah Pengunjung</p>
							<p className="text-lg sm:text-xl font-bold">
								<AnimatedCounter target={info.visitors} duration={2000} /> orang
							</p>
						</div>

						<div className="flex-1 min-w-[160px] p-4 border border-white/20 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-center hidden">
							<p className="text-sm sm:text-base font-medium">Akurasi Penerjemah</p>
							<p className="text-lg sm:text-xl font-bold">
								<AnimatedCounter target={info.accuracy} duration={2000} />%
							</p>
						</div>

						<div className="flex-1 min-w-[160px] p-4 border border-white/20 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-center hidden sm:block">
							<p className="text-sm sm:text-base font-medium">Jumlah Kosakata</p>
							<p className="text-lg sm:text-xl font-bold">
								<AnimatedCounter target={info.dictionary} duration={2000} /> kata
							</p>
						</div>
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
