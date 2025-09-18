import Logo from '../assets/img/logo.png';
import bgImage from '../assets/img/header.webp';

export default function About() {
	return (
		<>
			{/* Hero Section */}
			<header className="relative min-h-[320px] sm:min-h-[300px] flex items-center mt-6 justify-center text-white overflow-hidden bg-gray-50 dark:bg-neutral-950">
				{/* Content */}
				<div className="relative z-10 text-center px-6 sm:px-12">
					<div className="flex flex-col sm:flex-row items-center justify-center sm:space-x-6 mb-4">
						<img
							src={Logo}
							alt="logo"
							className="w-20 h-20 sm:w-24 sm:h-24"
						/>
						<div className="mt-4 sm:mt-0 text-center sm:text-left text-black dark:text-white">
							<h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
								BASIS-64
							</h1>
							<p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mt-1">
								The hub of future tools.
							</p>
						</div>
					</div>


					{/* Intro Box */}
					<div className="bg-white border border-gray-300 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white rounded-sm p-4 mx-auto text-gray-700 shadow-xs transition duration-300">
						Kami adalah pengembang perangkat lunak dan penyedia layanan penerjemah bahasa Dayak Kenyah pertama di dunia
						yang menggunakan NLP (Natural Language Processing). Penerjemah kami mampu memahami konteks kalimat dan
						menyusun ulang kata, misalnya dari "saya seorang guru" menjadi "ca guru keq", atau "sudahkah kamu makan"
						menjadi "lepe ne ikoq uman". Berbeda dengan penerjemah lama yang hanya mengganti kata per kata.
					</div>
				</div>
			</header>

			{/* Contact Section */}
			<div className="container mx-auto p-6 grid" id="mainLayout">
				<div className="p-6 bg-white dark:bg-neutral-900 border border-gray-300 dark:border-neutral-800 rounded-sm shadow-xs">
					<h5 className="mb-4 text-2xl font-bold tracking-tight text-gray-800 dark:text-white">
						Hubungi Kami
					</h5>
					<hr className="mb-6 border-gray-300 dark:border-gray-700" />

					<div className="grid sm:grid-cols-4 gap-6">
						{[
							{
								href: 'https://wa.me/+6282211509216',
								label: 'WhatsApp',
								color: 'green',
								icon: 'bi bi-whatsapp',
							},
							{
								href: 'https://www.instagram.com/basis64computer',
								label: 'Instagram',
								color: 'rose',
								icon: 'bi bi-instagram',
							},
							{
								href: 'https://discord.gg/gywRbyK8VN/',
								label: 'Discord',
								color: 'purple',
								icon: 'bi bi-discord',
							},
							{
								href: 'https://t.me/basis64computer',
								label: 'Telegram',
								color: 'blue',
								icon: 'bi bi-telegram',
							},
						].map(({ href, label, color, icon }) => (
							<a
								key={label}
								href={href}
								target="_blank"
								rel="noopener noreferrer"
								className={`group flex flex-col items-center justify-center gap-2 border-2 border-${color}-500 text-${color}-600 bg-${color}-50 dark:bg-${color}-900/30 rounded-sm p-6 hover:bg-${color}-100 dark:hover:bg-${color}-800 transition-all duration-300 shadow-md hover:shadow-lg`}
							>
								<i className={`${icon} text-5xl`} />
								<span className="text-lg font-semibold group-hover:scale-105 transition-transform">
									{label}
								</span>
							</a>
						))}
					</div>
				</div>
			</div>
		</>
	);
}
