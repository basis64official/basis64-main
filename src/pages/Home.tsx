import { useEffect, useState } from "react";
import bgImage from "../assets/img/header.webp";
import useInfo from "../state/useInfo";
import useNavigationBar from "../state/useNavigationBar";
import { CookieManager } from "../utils/CookieManager";
import { Button } from "../components/ui/";

export default function Home() {
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
		await navigator.clipboard.writeText(text);
	};

	const handlePaste = async () => {
		const text = await navigator.clipboard.readText();
		setTranslateInput(text);
	};

	const handleRead = (text: string) => {
		if (!text.trim()) return;
		const audio = new Audio(
			"https://translate.google.com/translate_tts?ie=UTF-8&tl=id-ID&client=tw-ob&q=" +
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
		<>
			{/* Description Section */}
			<section className="px-4 mx-auto mt-6 mb-6">
				<div className="bg-white text-black dark:text-white dark:bg-neutral-900 border border-gray-300 dark:border-neutral-700 rounded-sm shadow-xs p-5 space-y-2 text-center">
					<h2 className="text-lg font-semibold">Terjemahkan Bahasa Dayak Kenyah dengan mudah dan cepat!</h2>
					<p className="text-base">
						Kamu dapat menerjemahkan bahasa Dayak Kenyah secara instan tanpa perlu menerjemahannya secara manual dalam waktu yang lama.
					</p>
				</div>
			</section>



			{/* Translator Section */}
			<section className="px-4 mt-6 mx-auto">
				<div className="space-y-4">
					{/* Switch Button */}
					<Button
						variant="blue"
						className="w-full"
						size="lg"
						onClick={() => setSwitchLanguage(!switchLanguage)}
					>
						<i className="bi bi-arrow-left-right mr-2" />
						Beralih Bahasa
					</Button>

					<div className="grid sm:grid-cols-2 gap-4">
						{/* Input */}
						<div className="flex flex-col p-4 rounded-sm shadow-xs border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900">
							<div className="flex justify-between items-center mb-2">
								<span className="text-base font-medium text-gray-800 dark:text-gray-200">
									{inputTitle}
								</span>
								<div className="flex gap-2">
									<button
										className="p-2 rounded-sm hover:bg-gray-100 dark:hover:bg-neutral-800"
										onClick={handlePaste}
									>
										<i className="bi bi-clipboard2 text-gray-600 dark:text-gray-300" />
									</button>
									<button
										className="p-2 rounded-sm hover:bg-gray-100 dark:hover:bg-neutral-800"
										onClick={() => handleCopy(translateInput)}
									>
										<i className="bi bi-copy text-gray-600 dark:text-gray-300" />
									</button>
									<button
										className="p-2 rounded-sm hover:bg-gray-100 dark:hover:bg-neutral-800"
										onClick={() => handleRead(translateInput)}
									>
										<i className="bi bi-volume-up-fill text-gray-600 dark:text-gray-300" />
									</button>
								</div>
							</div>
							<textarea
								rows={8}
								className="resize-none p-3 w-full rounded-sm shadow-xs text-base text-gray-900 bg-gray-50 border border-gray-200 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
								placeholder="Tulis teks di sini..."
								value={translateInput}
								onChange={(e) => setTranslateInput(e.target.value)}
							/>
						</div>

						{/* Output */}
						<div className="flex flex-col p-4 rounded-sm border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900">
							<div className="flex justify-between items-center mb-2">
								<span className="text-base font-medium text-gray-800 dark:text-gray-200">
									{outputTitle}
								</span>
								<div className="flex gap-2">
									<button
										className="p-2 rounded-sm hover:bg-gray-100 dark:hover:bg-neutral-800"
										onClick={() => handleCopy(translateOutput)}
									>
										<i className="bi bi-copy text-gray-600 dark:text-gray-300" />
									</button>
									<button
										className="p-2 rounded-sm hover:bg-gray-100 dark:hover:bg-neutral-800"
										onClick={() => handleRead(translateOutput)}
									>
										<i className="bi bi-volume-up-fill text-gray-600 dark:text-gray-300" />
									</button>
								</div>
							</div>
							<textarea
								rows={8}
								readOnly
								className="resize-none p-3 w-full rounded-sm text-base text-gray-900 bg-gray-50 border border-gray-200 focus:outline-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
								placeholder="Hasil terjemahan muncul di sini..."
								value={translateOutput}
							/>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
