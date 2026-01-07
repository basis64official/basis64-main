import { useState, useEffect } from "react";
import { CookieManager } from "../../utils/CookieManager";
import useInfo from "../../state/useInfo";
import useNavigationBar from "../../state/useNavigationBar";
import { Button } from "../../components/ui";
import SEO from "../../components/SEO";

export default function TranslatorDayakKenyah() {
    const info = useInfo();
    const navigationBar = useNavigationBar();

    useEffect(() => {
        navigationBar.show();
    }, []);

    const URL =
        "https://dayak-kenyah-translator.basis64.com";
    const [switchLanguage, setSwitchLanguage] = useState(false);
    const [translateInput, setTranslateInput] = useState("");
    const [translateOutput, setTranslateOutput] = useState("");
    const [debounceTimer, setDebounceTimer] = useState<number | null>(null);
    const [isInputCopied, setIsInputCopied] = useState(false);
    const [isOutputCopied, setIsOutputCopied] = useState(false);

    // State untuk mengelola pemutaran audio secara independen
    const [isReadingInput, setIsReadingInput] = useState(false);
    const [isReadingOutput, setIsReadingOutput] = useState(false);
    const [audioQueue, setAudioQueue] = useState<string[]>([]);
    const [currentAudioIndex, setCurrentAudioIndex] = useState(0);
    const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);

    const inputTitle = switchLanguage ? "Dayak Kenyah" : "Indonesia";
    const outputTitle = switchLanguage ? "Indonesia" : "Dayak Kenyah";

    // --- Efek untuk reset status copy Input/Output ---
    useEffect(() => {
        if (isInputCopied) {
            const timerId = setTimeout(() => {
                setIsInputCopied(false);
            }, 1500);
            return () => clearTimeout(timerId);
        }
    }, [isInputCopied]);

    useEffect(() => {
        if (isOutputCopied) {
            const timerId = setTimeout(() => {
                setIsOutputCopied(false);
            }, 1500);
            return () => clearTimeout(timerId);
        }
    }, [isOutputCopied]);

    const handleCopy = async (text: string, type: 'input' | 'output') => {
        if (!text) return;
        try {
            await navigator.clipboard.writeText(text);
            if (type === 'input') {
                setIsInputCopied(true);
            } else {
                setIsOutputCopied(true);
            }
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

    // Tanda baca yang digunakan sebagai pemisah yang kuat
    const STRONG_DELIMITERS = /[.?!,;]/;
    const MAX_WORDS = 20;

    // Fungsi untuk memecah string menjadi array string
    const chunkText = (text: string): string[] => {
        // 1. Pecah berdasarkan Newline (\n) terlebih dahulu
        const paragraphChunks = text.split('\n').filter(p => p.trim().length > 0);
        const finalChunks: string[] = [];

        // 2. Terapkan logika pemecahan kata ke setiap paragraf
        for (const paragraph of paragraphChunks) {
            const words = paragraph.split(/\s+/).filter(w => w.length > 0);
            let currentChunk: string[] = [];
            let startNewChunk = false;

            for (let i = 0; i < words.length; i++) {
                const word = words[i];
                currentChunk.push(word);

                const hasStrongDelimiter = STRONG_DELIMITERS.test(word);
                const isMaxReached = currentChunk.length >= MAX_WORDS;

                // Logika Pemisahan
                if (isMaxReached) {
                    startNewChunk = true;
                } else if (hasStrongDelimiter) {
                    if (currentChunk.length >= 3) { // Jangan pecah jika terlalu pendek
                        startNewChunk = true;
                    }
                }

                if (startNewChunk) {
                    finalChunks.push(currentChunk.join(' '));
                    currentChunk = [];
                    startNewChunk = false;
                }
            }

            // Tambahkan sisa kata
            if (currentChunk.length > 0) {
                finalChunks.push(currentChunk.join(' '));
            }
        }
        return finalChunks;
    };

    const handleStopRead = (type: 'input' | 'output') => {
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
            setCurrentAudio(null);
        }

        // Reset state yang relevan
        if (type === 'input') setIsReadingInput(false);
        if (type === 'output') setIsReadingOutput(false);

        // Reset antrian utama
        setAudioQueue([]);
        setCurrentAudioIndex(0);
    };


    const handleRead = (text: string, type: 'input' | 'output') => {
        if (!text.trim()) return;

        // Selalu hentikan pemutaran yang sedang berjalan (dari sisi manapun)
        if (isReadingInput || isReadingOutput) {
            // Panggil handleStopRead untuk mereset semua state pemutaran
            handleStopRead(isReadingInput ? 'input' : 'output');
        }

        // Tentukan state mana yang akan diaktifkan
        const setIsReadingState = type === 'input' ? setIsReadingInput : setIsReadingOutput;

        const chunks = chunkText(text);

        // Atur state untuk memulai pemutaran
        setAudioQueue(chunks);
        setCurrentAudioIndex(0);
        setIsReadingState(true); // Aktifkan pembacaan di sisi yang benar
    };

    // --- useEffect untuk Pemutaran Audio Berantai ---

    // 1. Cleanup
    useEffect(() => {
        return () => {
            if (currentAudio) {
                currentAudio.pause();
                currentAudio.currentTime = 0;
            }
        };
    }, [currentAudio]); // Cleanup saat currentAudio berubah

    // 2. Logika Pemutaran
    useEffect(() => {
        const isCurrentlyReading = isReadingInput || isReadingOutput;

        if (!isCurrentlyReading || audioQueue.length === 0) {
            // Pastikan cleanup dilakukan jika state dibatalkan
            if (currentAudio) {
                currentAudio.pause();
                setCurrentAudio(null);
            }
            // Penting: Reset state bacaan jika antrian selesai/kosong
            if (audioQueue.length === 0 && (isReadingInput || isReadingOutput)) {
                setIsReadingInput(false);
                setIsReadingOutput(false);
            }
            return;
        }

        // Cek apakah semua antrian sudah selesai
        if (currentAudioIndex >= audioQueue.length) {
            // Pemutaran selesai
            if (isReadingInput) setIsReadingInput(false);
            if (isReadingOutput) setIsReadingOutput(false);

            setAudioQueue([]);
            setCurrentAudioIndex(0);
            return;
        }

        // Ambil potongan teks saat ini
        const textToRead = audioQueue[currentAudioIndex];
        const audioUrl =
            `https://gtts.basis64.com/translate_tts?ie=UTF-8&tl=id-ID&client=tw-ob&q=` +
            encodeURI(textToRead);

        const audio = new Audio(audioUrl);

        setCurrentAudio(audio);

        // Pasang event listener: ketika audio selesai, putar yang selanjutnya
        audio.onended = () => {
            setCurrentAudioIndex(prevIndex => prevIndex + 1);
        };

        // Mulai putar
        audio.play().catch(error => {
            console.error("Gagal memutar audio:", error);
            // Lanjutkan ke potongan teks berikutnya meskipun gagal
            setCurrentAudioIndex(prevIndex => prevIndex + 1);
        });

    }, [isReadingInput, isReadingOutput, audioQueue, currentAudioIndex]);


    // --- Logika Terjemahan ---

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

    const [activeTab, setActiveTab] = useState<"Penerjemah" | "Artikel">("Penerjemah");
    const tabIcons = {
        'Penerjemah': 'translate',
        'Artikel': 'blockquote-left'
    }

    return (
        <>
            <SEO
                name="BASIS-64 - Penerjemah Dayak Kenyah & Indonesia"
                description="Terjemahkan bahasa Dayak Kenyah ke Indonesia atau sebaliknya secara instan. Alat translate cepat, akurat, dan gratis dengan fitur Text-to-Speech (Suara)."
                keys="penerjemah dayak kenyah, translate dayak kenyah, bahasa dayak kalimantan, kamus dayak kenyah online, translate indonesia ke kenyah, basis-64"
                thumbnail="https://basis64.com/thumbnails/translator-dayak-kenyah.webp"
            />
            <div className="bg-gray-50 dark:bg-neutral-950 py-5 px-4">
                <div className="container mx-auto">
                    <div className="flex gap-6 border-b border-gray-200 dark:border-neutral-700 mb-4">
                        {(["Penerjemah", "Artikel"] as Array<"Penerjemah" | "Artikel">).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`pb-2 text-base font-medium transition-colors cursor-pointer ${activeTab === tab
                                    ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                                    : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                    }`}
                            >
                                <i className={`bi bi-${tabIcons[tab]} me-2`}></i> {tab}
                            </button>
                        ))}
                    </div>
                    {
                        (activeTab == 'Penerjemah') ? (
                            <>
                                {/* Header Section */}
                                <div className="mb-4 bg-white text-black dark:text-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 rounded-md shadow-sm p-5 space-y-2 text-center">
                                    <h2 className="text-base font-semibold">Terjemahkan Bahasa Dayak Kenyah dengan mudah dan cepat!</h2>
                                    <p className="text-sm">Kamu dapat menerjemahkan bahasa Dayak Kenyah secara instan tanpa perlu menerjemahkannya secara manual dalam waktu yang lama.</p>
                                </div>

                                {/* Main Translator Card */}
                                <div className="relative bg-white dark:bg-neutral-800 rounded-md shadow-sm border border-gray-300 dark:border-neutral-700 p-6 space-y-4">
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
                                                <button className="p-1 rounded-full text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400" onClick={() => handleCopy(translateInput, "input")}>
                                                    <i className={`bi ${isInputCopied ? 'bi-check2-all' : 'bi-copy'} text-xl`}></i>
                                                </button>

                                                {/* TOMBOL INPUT READ/STOP (KOREKSI: type harus 'input') */}
                                                <button
                                                    className={`p-1 rounded-full text-xl ${isReadingInput ? 'text-red-500' : 'text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400'}`}
                                                    onClick={() => isReadingInput ? handleStopRead('input') : handleRead(translateInput, 'input')}
                                                    disabled={isReadingOutput} // Nonaktifkan jika Output sedang diputar
                                                >
                                                    <i className={`bi bi-${isReadingInput ? 'stop-fill' : 'volume-up-fill'}`}></i>
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
                                                <button className="p-1 rounded-full text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400" onClick={() => handleCopy(translateOutput, "output")}>
                                                    <i className={`bi ${isOutputCopied ? 'bi-check2-all' : 'bi-copy'} text-xl`}></i>
                                                </button>

                                                {/* TOMBOL OUTPUT READ/STOP */}
                                                <button
                                                    className={`p-1 rounded-full text-xl ${isReadingOutput ? 'text-red-500' : 'text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400'}`}
                                                    onClick={() => isReadingOutput ? handleStopRead('output') : handleRead(translateOutput, 'output')}
                                                    disabled={isReadingInput} // Nonaktifkan jika Input sedang diputar
                                                >
                                                    <i className={`bi bi-${isReadingOutput ? 'stop-fill' : 'volume-up-fill'}`}></i>
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

                                {/* Tips Section */}
                                <div className="mt-4 p-6 bg-white dark:bg-neutral-800 rounded-md shadow-sm border border-gray-300 dark:border-neutral-700">
                                    <h3 className="text-xl text-gray-800 dark:text-gray-100 mb-4"><i className="bi bi-info-square me-2"></i> Tips Penerjemah</h3>
                                    <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 text-md">
                                        <li>Gunakan kalimat yang jelas dan sederhana untuk hasil terjemahan yang lebih akurat.</li>
                                        <li>Jika terjemahan tidak tepat, periksa kembali ejaan kata-kata atau gunakan kalimat lain.</li>
                                        <li>Kamu dapat membantu kami dengan menggunakan layanan penerjemah kami.</li>
                                        <li>Kami mengumpulkan hasil penerjemahan dari teks yang kamu masukkan untuk meningkatkan akurasi layanan kami.</li>
                                    </ul>
                                </div>
                            </>
                        ) : (
                            <div className="space-y-6">
                                {/* Artikel Single Page */}
                                <article className="prose prose-lg dark:prose-invert max-w-none bg-white dark:bg-neutral-800 rounded-md border border-gray-300 dark:border-neutral-700 shadow-sm p-6">
                                    <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
                                        Mengenal Bahasa Dayak Kenyah: Identitas, Sejarah, dan Pelestarian
                                    </h1>
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                        Bahasa Dayak Kenyah adalah salah satu bahasa daerah yang berasal dari Kalimantan Timur dan Kalimantan Utara. Bahasa ini dituturkan oleh masyarakat Dayak Kenyah, sebuah kelompok etnis Dayak yang kaya akan tradisi, budaya, dan sejarah panjang. Keunikan bahasa ini terlihat dari beragam dialek yang berbeda-beda antar kampung dan sub-suku, namun tetap memiliki benang merah yang membuatnya saling dimengerti.
                                    </p>
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                        Secara tradisional, bahasa Dayak Kenyah diwariskan secara lisan. Generasi tua mengajarkannya kepada generasi muda melalui percakapan sehari-hari, nyanyian, cerita rakyat, dan upacara adat. Namun, seiring masuknya pengaruh modernisasi, penggunaan bahasa ini semakin berkurang, terutama di kalangan anak muda yang lebih sering menggunakan bahasa Indonesia.
                                    </p>
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                        Pelestarian bahasa Dayak Kenyah menjadi isu penting saat ini. Banyak komunitas lokal, peneliti, hingga pengembang teknologi berusaha membuat dokumentasi dan sarana pembelajaran, termasuk melalui platform digital seperti penerjemah otomatis. Upaya ini bertujuan agar bahasa Dayak Kenyah tidak hanya bertahan, tetapi juga dikenal lebih luas oleh masyarakat Indonesia maupun dunia.
                                    </p>
                                    <h2 className="text-2xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-100">
                                        Nilai Budaya dalam Bahasa
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                        Setiap kata dalam bahasa Dayak Kenyah tidak hanya memiliki arti linguistik, tetapi juga membawa nilai budaya dan filosofi kehidupan. Misalnya, kosakata yang berkaitan dengan alam sangat banyak dan detail, menunjukkan betapa eratnya hubungan masyarakat Dayak Kenyah dengan hutan dan lingkungannya. Hal ini membuktikan bahwa bahasa bukan sekadar alat komunikasi, melainkan juga cerminan cara pandang hidup.
                                    </p>
                                    <h2 className="text-2xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-100">
                                        Tantangan dan Harapan
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                        Tantangan terbesar dalam menjaga keberlangsungan bahasa Dayak Kenyah adalah minat generasi muda. Banyak anak-anak lebih memilih menggunakan bahasa Indonesia atau bahkan bahasa asing. Namun, dengan adanya gerakan komunitas, kurikulum lokal, dan dukungan teknologi, ada harapan bahwa bahasa ini tetap hidup dan terus digunakan.
                                    </p>
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                        Dengan semakin banyak orang yang mengenal dan menggunakan bahasa Dayak Kenyah, baik penutur asli maupun bukan, kita bersama-sama ikut menjaga warisan budaya yang sangat berharga ini. Bahasa adalah identitas, dan melestarikannya berarti melestarikan jati diri sebuah bangsa.
                                    </p>
                                    <p className="mt-6 text-gray-500 dark:text-gray-400 italic">
                                        Ditulis oleh: Tim BASIS-64 · Dipublikasikan pada 29 September 2025
                                    </p>
                                </article>
                            </div>
                        )
                    }
                </div>
            </div>
        </>

    );
};