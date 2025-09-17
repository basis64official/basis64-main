import Logo from '../assets/img/logo.png';
import bgImage from '../assets/img/header.webp';

export default function About() {
	return (
		<>
				<header className="relative min-h-[384px] py-4 sm:py-16 overflow-hidden flex items-center justify-center text-white">
					{/* Background */}
					<div
						className="absolute inset-0 h-full w-full bg-cover bg-center"
						style={{ backgroundImage: `url(${bgImage})` }}
					/>

					{/* Overlay */}
					<div className="absolute inset-0 bg-black opacity-70" />

					{/* Konten */}
					<div className="relative z-10 text-center px-4 sm:px-16">
						<div className="flex justify-center mb-4">
							<div className="flex items-center text-start space-x-4">
								<div className="flex items-center justify-center text-white text-xl font-bold rounded">
								<img src={Logo} width="92px" alt="logo" />
								</div>
								<div>
								<h1 className="text-3xl font-semibold dark:text-gray-200 mb-2">BASIS-64</h1>
								<p className="text-2xl text-gray-200 dark:text-gray-200">The hub of future tools.</p>
								</div>
							</div>
						</div>

						

						<div className="sm:flex justify-between border-t pt-4 gap-4">
							<div className="flex-1 bg-white/10 border text-start border-white/30 shadow-md shadow-white/10 text-white text-sm sm:text-base hover:scale-105 hover:shadow-lg transition-transform duration-300 mb-4 p-4">
								Kami adalah pengembang perangkat lunak dan penyedia layanan penerjemah bahasa Dayak Kenyah pertama di dunia yang menggunakan NLP (Natural Language Proccessing) yang memungkinkan penerjemahan yang akurat karena penerjemah kami dapat menerjemahkan kalimat dan bahkan mengubah susunan kata, seperti 'saya seorang guru' menjadi 'ca guru keq' atau 'sudahkah kamu makan' menjadi 'lepe ne ikoq uman'. Penerjemah kami berbeda dengan penerjemah generasi sebelumnya yang hanya mengganti kata perkata yang relatif sederhana.
							</div>
						</div>
					</div>

					
				</header>
				<div className="container p-4 mx-auto grid" id="mainLayout">
						<div className="block p-6 bg-white border border-gray-200 rounded-xs dark:bg-neutral-800 dark:border-neutral-700 dark:hover:bg-gray-700">
							<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-800 dark:text-white" data-i18n="pages.about.contactTitle">Hubungi kami</h5>
							<hr className="my-2 border-gray-300 dark:border-gray-300" />
							<div className="grid sm:grid-cols-4 gap-4">
								<a href="https://wa.me/+6282211509216" target="_blank" className="w-full h-full text-green-600 border border-green-600 bg-green-100 hover:bg-green-200 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800 dark:bg-green-900">
									<div className="w-full text-center items-center justify-center">
										<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" fill="currentColor" className="bi bi-whatsapp w-full p-4" viewBox="0 0 16 16">
											<path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
										</svg>
									</div>
									<span className="text-2xl">WhatsApp</span>
								</a>
								<a href="https://www.instagram.com/basis64computer" target="_blank" className="w-full h-full text-rose-600 border border-rose-600 bg-rose-100 hover:bg-rose-200 focus:ring-4 focus:outline-none focus:ring-rose-300 font-medium text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-rose-500 dark:text-rose-500 dark:hover:text-white dark:hover:bg-rose-600 dark:focus:ring-rose-800 dark:bg-rose-900">
									<div className="w-full text-center items-center justify-center">
										<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" fill="currentColor" className="bi bi-instagram w-full p-4" viewBox="0 0 16 16">
											<path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
										</svg>
									</div>
									<span className="text-2xl">Instagram</span>
								</a>
								<a href="https://discord.gg/gywRbyK8VN/" target="_blank" className="w-full h-full text-purple-600 border border-purple-600 bg-purple-100 hover:bg-purple-200 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-purple-500 dark:text-purple-500 dark:hover:text-white dark:hover:bg-purple-600 dark:focus:ring-purple-800 dark:bg-purple-900">
									<div className="w-full text-center items-center justify-center">
										<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" fill="currentColor" className="bi bi-discord w-full p-4" viewBox="0 0 16 16">
											<path d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085 8 8 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612" />
										</svg>
									</div>
									<span className="text-2xl">Discord</span>
								</a>
								<a href="https://t.me/basis64computer" target="_blank" className="w-full h-full text-blue-600 border border-blue-600 bg-blue-100 hover:bg-blue-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800 dark:bg-blue-900">
									<div className="w-full text-center items-center justify-center">
										<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" fill="currentColor" className="bi bi-telegram w-full p-4" viewBox="0 0 16 16">
											<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.287 5.906q-1.168.486-4.666 2.01-.567.225-.595.442c-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294q.39.01.868-.32 3.269-2.206 3.374-2.23c.05-.012.12-.026.166.016s.042.12.037.141c-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8 8 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629q.14.092.27.187c.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.4 1.4 0 0 0-.013-.315.34.34 0 0 0-.114-.217.53.53 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09" />
										</svg>
									</div>
									<span className="text-2xl">Telegram</span>
								</a>
							</div>
						</div>
					</div>
			</>
	);
}
