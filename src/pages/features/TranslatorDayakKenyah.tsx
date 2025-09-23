import { useState, useEffect } from "react";
import { CookieManager } from "../../utils/CookieManager";
import useInfo from "../../state/useInfo";
import useNavigationBar from "../../state/useNavigationBar";
import { Button } from "../../components/ui";

export default function TranslatorDayakKenyah() {
    const info = useInfo();
	const navigationBar = useNavigationBar();

	useEffect(() => {
		navigationBar.show();
	}, []);

	const URL =
		"https://dayak-kenyah-translator.basis64computer.workers.dev";
	const [switchLanguage, setSwitchLanguage] = useState(false);
	const [translateInput, setTranslateInput] = useState("");
	const [translateOutput, setTranslateOutput] = useState("");
	const [debounceTimer, setDebounceTimer] = useState<number | null>(null);

	const inputTitle = switchLanguage ? "Dayak Kenyah" : "Indonesia";
	const outputTitle = switchLanguage ? "Indonesia" : "Dayak Kenyah";

	const handleCopy = async (text: string) => {
		if (!text) return;
		try {
			await navigator.clipboard.writeText(text);
		} catch (err) {
			console.error("Failed to copy text: ", err);
		}
	};

	const handlePaste = async () => {
		try {
			const text = await navigator.clipboard.readText();
			setTranslateInput(text);
		} catch (err) {
			console.error("Failed to paste text: ", err);
		}
	};

	const handleRead = (text: string) => {
		if (!text.trim()) return;
		const audio = new Audio(
			"https://cors-anywhere.herokuapp.com/https://translate.google.com/translate_tts?ie=UTF-8&tl=id-ID&client=tw-ob&q=" +
			encodeURI(text)
		);
		audio.play();
	};

	const translateText = async () => {
		try {
			const response = await fetch(`${URL}/api/translate`, {
				method: "POST",
				body: JSON.stringify({
					action: "translate",
					"X-Session-ID": CookieManager.getCookie("session_id") || "",
					"X-Authorization":
						CookieManager.getCookie("access_token") || "",
					data: { translate: translateInput },
					invert: switchLanguage,
				}),
			});
			const result = await response.json();
			setTranslateOutput(result.result || "");
		} catch (err) {
			setTranslateOutput("Terjadi kesalahan saat menerjemahkan.");
		}
	};

	useEffect(() => {
		if (!translateInput.trim()) {
			setTranslateOutput("");
			return;
		}
		if (debounceTimer) clearTimeout(debounceTimer);
		setTranslateOutput("Menerjemahkan...");
		const timer = setTimeout(() => {
			translateText();
		}, 1000);
		setDebounceTimer(timer);
		return () => clearTimeout(timer);
	}, [translateInput, switchLanguage]);

	return (
		<div className="bg-gray-50 dark:bg-neutral-950 py-5 px-4">
			<div className="container mx-auto">
				{/* Header Section */}
				<div className="mb-4 bg-white text-black dark:text-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 rounded-md shadow-sm p-5 space-y-2 text-center">
					<h2 className="text-base font-semibold">Terjemahkan Bahasa Dayak Kenyah dengan mudah dan cepat!</h2>
					<p className="text-sm">Kamu dapat menerjemahkan bahasa Dayak Kenyah secara instan tanpa perlu menerjemahannya secara manual dalam waktu yang lama.</p>
				</div>

				{/* Main Translator Card */}
				<div className="relative bg-white dark:bg-neutral-800 rounded-md shadow-lg border border-gray-300 dark:border-neutral-700 p-6 space-y-4">
					{/* Language Titles and Controls */}
					<div className="flex justify-between items-center mb-2">
						<div className="flex items-center space-x-2 text-sm">
							<span className="font-semibold text-gray-800 dark:text-gray-100">{inputTitle}</span>
							<i className="bi bi-arrow-right text-gray-400"></i>
							<span className="font-semibold text-gray-800 dark:text-gray-100">{outputTitle}</span>
						</div>
						<div className="flex items-center space-x-2 text-sm">
							<span className="text-sm font-medium text-gray-500 dark:text-gray-400">Mode</span>
							<select className="appearance-none bg-neutral-100 dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 rounded-full py-1 px-3 text-sm font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-100">
								<option value="standar">Standar</option>
							</select>
							<div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
								<i className="bi bi-caret-down-fill text-xs text-neutral-700 dark:text-neutral-300"></i>
							</div>
						</div>
					</div>

					{/* Input & Output Textareas */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
						{/* Input */}
						<div className="relative">
							<textarea
								rows={8}
								className="w-full p-4 text-sm text-gray-900 bg-gray-50 border border-gray-200 rounded-lg resize-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
								placeholder={`Tulis teks ${inputTitle.toLowerCase()} di sini...`}
								value={translateInput}
								onChange={(e) => setTranslateInput(e.target.value)}
							/>
							<div className="absolute bottom-2 right-2 flex space-x-2 opacity-70 hover:opacity-100 transition-opacity">
								<button className="p-1 rounded-full text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400" onClick={handlePaste}>
									<i className="bi bi-clipboard2-plus text-xl"></i>
								</button>
								<button className="p-1 rounded-full text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400" onClick={() => handleCopy(translateInput)}>
									<i className="bi bi-copy text-xl"></i>
								</button>
								<button className="p-1 rounded-full text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400" onClick={() => handleRead(translateInput)}>
									<i className="bi bi-volume-up-fill text-xl"></i>
								</button>
							</div>
						</div>

						{/* Output */}
						<div className="relative">
							<textarea
								rows={8}
								readOnly
								className="w-full p-4 text-sm text-gray-900 bg-gray-50 border border-gray-200 rounded-lg resize-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
								placeholder="Hasil terjemahan muncul di sini..."
								value={translateOutput}
							/>
							<div className="absolute bottom-2 right-2 flex space-x-2 opacity-70 hover:opacity-100 transition-opacity">
								<button className="p-1 rounded-full text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400" onClick={() => handleCopy(translateOutput)}>
									<i className="bi bi-copy text-xl"></i>
								</button>
								<button className="p-1 rounded-full text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400" onClick={() => handleRead(translateOutput)}>
									<i className="bi bi-volume-up-fill text-xl"></i>
								</button>
							</div>
						</div>
					</div>

					{/* Switch Language Button */}
					<div className="flex justify-center mt-4">
						<Button
							onClick={() => setSwitchLanguage(!switchLanguage)}
							variant="blue"
							className="w-full"
						>
							<i className="bi bi-arrow-left-right text-lg mr-2"></i>
							Beralih Bahasa
						</Button>
					</div>

				</div>

				{/* Additional Components */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8" hidden >
					{/* Tips Section */}
					<div className="p-6 bg-white dark:bg-neutral-800 rounded-md shadow-lg border border-gray-200 dark:border-neutral-700">
						<h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Tips Penerjemah</h3>
						<ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 text-md">
							<li>Gunakan kalimat yang jelas dan sederhana untuk hasil terjemahan yang lebih akurat.</li>
							<li>Untuk terjemahan yang lebih kompleks, coba gunakan **mode AI**.</li>
							<li>Jika terjemahan tidak tepat, periksa kembali ejaan kata-kata atau gunakan kalimat lain.</li>
							<li>Dukung kami dengan mengirimkan kata-kata baru atau koreksi melalui fitur "Kirim Kata".</li>
						</ul>
					</div>

					{/* Kirim Kata & Statistik Section */}
					<div className="space-y-6">
						{/* Kirim Kata Card */}
						<div className="p-6 bg-white dark:bg-neutral-800 rounded-md shadow-lg border border-gray-200 dark:border-neutral-700">
							<h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Kirim Kata</h3>
							<p className="text-gray-600 dark:text-gray-400 mb-4">
								Bantu kami memperkaya kamus dengan mengirimkan kata atau frasa baru.
							</p>
							<button className="w-full py-2 px-4 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors">
								Kirim Kata
							</button>
						</div>

						{/* Statistik Card */}
						<div className="p-6 bg-white dark:bg-neutral-800 rounded-md shadow-lg border border-gray-200 dark:border-neutral-700">
							<h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Statistik</h3>
							<ul className="space-y-2 text-gray-600 dark:text-gray-400 text-md">
								<li>Jumlah Kata dalam Kamus: **1,234**</li>
								<li>Jumlah Terjemahan Hari Ini: **567**</li>
								<li>Kontributor Aktif: **12**</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
