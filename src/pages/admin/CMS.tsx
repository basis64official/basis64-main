import { useEffect, useRef, useState } from "react";
import { Button } from "../../components/ui";
import useInput from "../../hooks/useInput";
import { apiFetch } from "../../api/apiFetch";
import { AES } from "../../crypto/aes";
import useSecure from "../../state/useSecure";
import { CookieManager } from "../../utils/CookieManager";
import useModal from "../../state/useModal";

export default function Dashboard() {
    const [line, setLine] = useState(1);
    const [column, setColumn] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");
    const [config, onChangeConfig, setConfig] = useInput("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const key = useSecure((state) => state.key);
    const iv = useSecure((state) => state.iv);
    const modal = useModal();
    const fetchConfig = async () => {
        const response = await fetch('https://cdn.jsdelivr.net/gh/basis64computer/public/features.json');
        const data = await response.json();
        setConfig(JSON.stringify(data, null, 2));
        setErrorMessage("");
    }
    const writeConfig = async () => {
        modal.show("loading", "Loading", "Menyimpan konfigurasi CMS..." );
        const response = await apiFetch('/admin/write-cms', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Session-ID': CookieManager.getCookie('session_id') || ''
            },
            body: JSON.stringify({ ciphertext: await AES.encrypt(config, key!, iv!)})
        });
        if (response.ok) {
            modal.show("success", "Berhasil", "Konfigurasi CMS berhasil disimpan.");
        } else {
            modal.show("failed", "Error", "Konfigurasi CMS tidak dapat disimpan.");
        }
        // const data = await response.json();
        // setConfig(JSON.stringify(data, null, 2));
    }

    const getCursorLineAndColumn = () => {
        const selectionStart = textareaRef.current ? textareaRef.current.selectionStart : 0;
        const textBeforeCursor = config.substring(0, selectionStart);
        const lines = textBeforeCursor.split('\n');
        const lineNumber = lines.length; // Baris dimulai dari 1
        const columnNumber = lines[lines.length - 1].length; // Kolom dimulai dari 0
        setLine(lineNumber);
        setColumn(columnNumber);
    }
    const saveConfig = async () => {
        try {
            JSON.parse(config);
            await writeConfig();
            setErrorMessage("Konfigurasi disimpan.");
        } catch (e) {
            setErrorMessage(e instanceof Error ? e.message : String(e));
        }
    }
    useEffect(() => {
        fetchConfig();
    }, []);
    return (
        <>
            <div className="container p-4 mx-auto">
                <div className="" id="menu-content" role="tabpanel" aria-labelledby="menu-tab">
                    <div className="flex items-center p-4 mb-4 bg-white shadow-xs dark:bg-neutral-800 border border-gray-300 dark:border-neutral-600">
                        <div className="p-3 mr-4 text-indigo-400 bg-indigo-100 rounded-full px-4 dark:text-indigo-100 dark:bg-indigo-400">
                            <i className="bi bi-filetype-json"></i>
                        </div>
                        <div>
                            <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">Menu Configuration</p>
                            <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">Konfigurasi menu di sini.</p>
                        </div>
                    </div>

                    <textarea ref={textareaRef} value={config} onChange={onChangeConfig} onClick={getCursorLineAndColumn} onKeyDown={getCursorLineAndColumn} rows={20} className="block p-2.5 w-full outline-none text-sm text-white font-mono bg-black border border-gray-300 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-gray-400 dark:text-white" placeholder="The JSON configuration should be written here..."></textarea>
                    <div className="md:inline-flex w-full p-2 mb-4 bg-white shadow-xs dark:bg-neutral-800 border border-t-0 border-gray-300 dark:border-neutral-600 text-black dark:text-white">Baris {line}, Kolom {column}</div>
                    <div className="md:inline-flex w-full p-4 mb-4 bg-white shadow-xs dark:bg-neutral-800 border border-gray-300 dark:border-neutral-600">
                        <p id="jsonResult" className="flex-1 text-black dark:text-white">{errorMessage}</p>
                        <Button type="button" variant="gray" onClick={fetchConfig} className="me-2">Refresh</Button>
                        <Button type="button" variant="blue" onClick={saveConfig}>Simpan</Button>
                    </div>
                </div>
            </div>
        </>
    );
}
