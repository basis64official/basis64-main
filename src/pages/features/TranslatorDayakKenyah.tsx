import React, { useState, useEffect } from "react";
import { CookieManager } from "../../utils/CookieManager";

interface TranslationHistoryItem {
    id: number;
    input: string;
    output: string;
}

export default function TranslatorDayakKenyah() {
    const URL = "https://dayak-kenyah-translator.basis64computer.workers.dev"; // Ganti dengan URL server Anda
    const LOCAL_URL = "http://localhost:36535"; // Ganti dengan URL server Anda
    const [switchLanguage, setSwitchLanguage] = useState(false);
    const [translateInput, setTranslateInput] = useState("");
    const [translateOutput, setTranslateOutput] = useState("");
    const [num, setNum] = useState(1);
    const [debounceTimer, setDebounceTimer] = useState<number | null>(null);

    const inputTitle = switchLanguage ? "Dayak Kenyah" : "Indonesia";
    const outputTitle = switchLanguage ? "Indonesia" : "Dayak Kenyah";

    const handleCopy = async (text: string) => {
        await navigator.clipboard.writeText(text);
    };

    const handlePaste = async () => {
        const text = await navigator.clipboard.readText();
        setTranslateInput(text);
    };

    const handleRead = (text: string) => {
        if (!text.trim()) return;
        const audio = new Audio();
        audio.src =
            "https://translate.google.com/translate_tts?ie=UTF-8&tl=id-ID&client=tw-ob&q=" +
            encodeURI(text);
        audio.play();
    };

    const translateText = async () => {
        try {
            const response = await fetch(
                `${URL}/api/translate`,
                {
                    method: "POST",
                    body: JSON.stringify({
                        action: "translate",
                        "X-Session-ID": CookieManager.getCookie("session_id") || "",
                        "X-Authorization": CookieManager.getCookie("access_token") || "",
                        data: { translate: translateInput },
                        invert: switchLanguage,
                    }),
                }
            );
            const result = await response.json();
            if (result.result.trim() !== "") {
                setNum((n) => n + 1);
            }
            setTranslateOutput(result.result);
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
        <div className="p-4">
            <div className="block p-4 bg-white border border-gray-300 shadow-xs dark:bg-neutral-800 dark:border-neutral-700">
                <button
                    className="text-gray-900 w-full align-middle justify-between mb-4 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 text-xl text-sm px-5 py-2.5 me-2 mb-2 dark:bg-neutral-800 dark:text-white dark:border-neutral-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    onClick={() => setSwitchLanguage(!switchLanguage)}
                >
                    Beralih bahasa <i className="bi bi-arrow-left-right"></i>
                </button>

                <div className="grid sm:grid-cols-2 gap-4">
                    {/* Input */}
                    <div className="border border-gray-300 dark:border-neutral-600 p-4">
                        <div className="flex justify-between items-center">
                            <span className="text-lg font-medium text-gray-900 dark:text-white">
                                {inputTitle}
                            </span>
                            <div>
                                <button
                                    className="text-gray-900 hover:text-blue-600 dark:text-gray-100 dark:hover:text-blue-500 p-2 text-xl"
                                    onClick={handlePaste}
                                >
                                    <i className="bi bi-clipboard2"></i>
                                </button>
                                <button
                                    className="text-gray-900 hover:text-blue-600 dark:text-gray-100 dark:hover:text-blue-500 p-2 text-xl"
                                    onClick={() => handleCopy(translateInput)}
                                >
                                    <i className="bi bi-copy"></i>
                                </button>
                                <button
                                    className="text-gray-900 hover:text-blue-600 dark:text-gray-100 dark:hover:text-blue-500 p-2 text-xl"
                                    onClick={() => handleRead(translateInput)}
                                >
                                    <i className="bi bi-volume-up-fill"></i>
                                </button>
                            </div>
                        </div>
                        <textarea
                            rows={10}
                            className="resize-none p-2.5 mt-4 w-full text-sm text-gray-900 bg-white border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Ketik kalimat yang ingin diterjemahkan di sini..."
                            value={translateInput}
                            onChange={(e) => setTranslateInput(e.target.value)}
                        />
                    </div>

                    {/* Output */}
                    <div className="border border-gray-300 dark:border-neutral-600 p-4">
                        <div className="flex justify-between items-center">
                            <span className="text-lg font-medium text-gray-900 dark:text-white">
                                {outputTitle}
                            </span>
                            <div>
                                <button
                                    className="text-gray-900 hover:text-blue-600 dark:text-gray-100 dark:hover:text-blue-500 p-2 text-xl"
                                    onClick={() => handleCopy(translateOutput)}
                                >
                                    <i className="bi bi-copy"></i>
                                </button>
                                <button
                                    className="text-gray-900 hover:text-blue-600 dark:text-gray-100 dark:hover:text-blue-500 p-2 text-xl"
                                    onClick={() => handleRead(translateOutput)}
                                >
                                    <i className="bi bi-volume-up-fill"></i>
                                </button>
                            </div>
                        </div>
                        <textarea
                            rows={10}
                            readOnly
                            className="resize-none p-2.5 mt-4 w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 dark:border-neutral-600 focus:outline-none dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Hasil terjemahan di sini..."
                            value={translateOutput}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
