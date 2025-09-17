
export default function Dashboard() {
	return (
		<>
        <div className="container p-4 mx-auto">
      <a
        href="#"
        className="block p-6 bg-white border border-gray-200 rounded-xs hover:bg-gray-100 dark:bg-neutral-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Halaman Administrator
        </h5>
        <p
          className="w-full font-normal text-gray-700 dark:text-gray-400"
          data-i18n="pages.developer.description"
        >
          Akses ke fitur administrator. 
        </p>
      </a>
    </div>
		</>
	);
}
