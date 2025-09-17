
export default function Pricing() {
	return (
		<>
			<div className="container p-4 mx-auto grid" id="mainLayout">
				<div className="block p-6 mb-4 bg-white border border-gray-200 shadow-xs dark:bg-neutral-800 dark:border-neutral-700 text-center">
					<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white" data-i18n="pages.price.contentTitle">Mulai Berlangganan!</h5>
					<p className="font-normal text-gray-700 dark:text-gray-400" data-i18n="pages.price.contentDescription">Kamu dapat mengaktivasi akun kamu dengan cara berlangganan sesuai dengan paket yang kamu pilih.</p>
				</div>
				<section className="">
					<div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-4 lg:space-y-0">
						<div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-xs border border-gray-200 shadow-xs dark:border-neutral-600 xl:p-8 dark:bg-neutral-800 dark:text-white">
							<h3 className="mb-4 text-2xl font-semibold" data-i18n="pages.price.hematTitle">Paket Hemat</h3>
							<p className="font-light text-gray-500 sm:text-lg dark:text-gray-400" data-i18n="pages.price.hematDescription">Aktivasi dengan harga paling terjangkau. Cocok untuk kebutuhan singkat dan uji coba fitur premium BASIS-64.</p>
							<div className="flex justify-center items-baseline my-8">
								<span className="mr-2 text-4xl font-extrabold" data-i18n="pages.price.hematPrice">Rp5.000</span>
								<span className="text-gray-500 dark:text-gray-400">/ <span data-i18n="pages.price.hematDuration">minggu</span>
								</span>
							</div>
							<ul role="list" className="mb-8 space-y-4 text-left">
								<li className="flex items-center space-x-3">
									<svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
										<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
									</svg>
									<span data-i18n="pages.price.hematFeature1">Akses tak terbatas ke penerjemah Dayak Kenyah berbasis AI NLP selama satu minggu</span>
								</li>
							</ul>
						</div>
						<div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-xs border border-gray-200 shadow-xs dark:border-neutral-600 xl:p-8 dark:bg-neutral-800 dark:text-white">
							<h3 className="mb-4 text-2xl font-semibold" data-i18n="pages.price.remixTitle">Paket Remix</h3>
							<p className="font-light text-gray-500 sm:text-lg dark:text-gray-400" data-i18n="pages.price.remixDescription">Pilihan menengah untuk kamu yang butuh akses lebih lama tanpa perlu sering perpanjangan. Seimbang antara durasi dan harga.</p>
							<div className="flex justify-center items-baseline my-8">
								<span className="mr-2 text-4xl font-extrabold" data-i18n="pages.price.remixPrice">Rp15.000</span>
								<span className="text-gray-500 dark:text-gray-400">/ <span data-i18n="pages.price.remixDuration">bulan</span>
								</span>
							</div>
							<ul role="list" className="mb-8 space-y-4 text-left">
								<li className="flex items-center space-x-3">
									<svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
										<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
									</svg>
									<span data-i18n="pages.price.remixFeature1">Akses tak terbatas ke penerjemah Dayak Kenyah berbasis AI NLP selama satu bulan</span>
								</li>
							</ul>
						</div>
						<div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-xs border border-gray-200 shadow-xs dark:border-neutral-600 xl:p-8 dark:bg-neutral-800 dark:text-white">
							<h3 className="mb-4 text-2xl font-semibold" data-i18n="pages.price.phoenixTitle">Paket Phoenix</h3>
							<p className="font-light text-gray-500 sm:text-lg dark:text-gray-400" data-i18n="pages.price.phoenixDescription">Paket dengan durasi terpanjang. Ideal untuk pengguna setia yang ingin aktivasi jangka panjang dalam waktu satu tahun.</p>
							<div className="flex justify-center items-baseline my-8">
								<span className="mr-2 text-4xl font-extrabold" data-i18n="pages.price.phoenixPrice">Rp120.000</span>
								<span className="text-gray-500 dark:text-gray-400">/ <span data-i18n="pages.price.phoenixDuration">tahun</span>
								</span>
							</div>
							<ul role="list" className="mb-8 space-y-4 text-left">
								<li className="flex items-center space-x-3">
									<svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
										<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
									</svg>
									<span data-i18n="pages.price.phoenixFeature1">Akses tak terbatas ke penerjemah Dayak Kenyah berbasis AI NLP selama satu tahun</span>
								</li>
							</ul>
						</div>
					</div>
				</section>
			</div>
		</>
	);
}
