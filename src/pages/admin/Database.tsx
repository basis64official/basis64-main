import { useEffect, useState } from "react";
import { Button } from "../../components/ui";
import { CookieManager } from "../../utils/CookieManager";
import { useNavigate } from "react-router-dom";
import useSecure from "../../state/useSecure";
import { AES } from "../../crypto/aes";
import { apiFetch } from "../../api/apiFetch";
import { Utils } from "../../utils/utils";

import UserPicture from "../../assets/img/user.webp";
import useInput from "../../hooks/useInput";

export default function Database() {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalData, setTotalData] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [accounts, setAccounts] = useState<any[]>([]);
    const [search, setSearch] = useInput("");

    const key = useSecure((state) => state.key);
    const iv = useSecure((state) => state.iv);

    const fetchData = async () => {
        try {
            const response = await apiFetch(`/admin/list-accounts?page=${page}&limit=${limit}&search=${search}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Session-ID': CookieManager.getCookie('session_id') || '',
                },
            });
            if (!response.ok) {
                return
                //navigate('/');
            }
            const { ciphertext } = await response.json();
            const decrypted = JSON.parse(await AES.decrypt(ciphertext, key!, iv!));
            setPage(decrypted.page);
            setLimit(decrypted.limit);
            setTotalData(decrypted.total);
            setTotalPage(decrypted.totalPages);
            setAccounts(decrypted.accounts);
            //setSessions(JSON.parse());
            console.log(decrypted.accounts[1]);
            //console.log({ key, iv });
            console.log(await AES.decrypt(ciphertext, key!, iv!));
        } catch (e) {
            if (e instanceof Error) {
                console.log(e);
            } else {
                console.log(e);
            }
            // navigate('/');
        }
    }

    const prev = () => {
        if (page > 1) setPage(page - 1);
    }

    const next = () => {
        if (page < totalPage) setPage(page + 1);
    }

    const first = () => setPage(1);
    const last = () => setPage(totalPage);

    useEffect(() => {
        if (!key || !iv) return; // tunggu key & iv tersedia
        // console.log("Key and IV are set:", { key, iv });
        fetchData();

    }, [key, iv, page, limit]);
    return (
        <div className="container p-4 mx-auto">
            <div className="bg-white border border-gray-300 dark:bg-neutral-900 dark:border-neutral-600 p-4">
                <div className="overflow-x-auto">
                    <div className="flex w-full items-center mx-auto mb-4 p-2">
                        <div className="relative w-full">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg
                                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 21 21"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M11.15 5.6h.01m3.337 1.913h.01m-6.979 0h.01M5.541 11h.01M15 15h2.706a1.957 1.957 0 0 0 1.883-1.325A9 9 0 1 0 2.043 11.89 9.1 9.1 0 0 0 7.2 19.1a8.62 8.62 0 0 0 3.769.9A2.013 2.013 0 0 0 13 18v-.857A2.034 2.034 0 0 1 15 15Z"
                                    ></path>
                                </svg>
                            </div>
                            <input
                                type="text"
                                id="inputPencarianBerita"
                                className="bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-600 text-gray-900 dark:text-gray-100 text-sm rounded-sm focus:border-blue-500 focus:ring-0 focus:ring-offset-0 block w-full ps-10 p-2.5 placeholder-gray-400 dark:placeholder-gray-500"
                                placeholder="Search data..."
                                value={search}
                                onChange={setSearch}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        setPage(1); fetchData();
                                    }
                                }}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            onClick={() => { setPage(1); fetchData(); }}
                            className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-blue-600 dark:bg-blue-500 rounded-sm border border-blue-700 dark:border-blue-600 hover:bg-blue-700 dark:hover:bg-blue-600 focus:ring-4 focus:outline-none transition duration-300 cursor-pointer"
                        >
                            <svg
                                className="w-4 h-4 me-2"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                ></path>
                            </svg>
                            Cari
                        </button>
                    </div>

                    <table className="table-auto border-collapse border border-gray-300 dark:border-neutral-600 w-full text-left">
                        <thead className="bg-gray-100 dark:bg-neutral-700">
                            <tr>
                                <th className="border border-gray-300 dark:border-neutral-600 px-4 py-2 text-gray-900 dark:text-gray-100">No</th>
                                <th className="border border-gray-300 dark:border-neutral-600 px-4 py-2 text-gray-900 dark:text-gray-100">Picture</th>
                                <th className="border border-gray-300 dark:border-neutral-600 px-4 py-2 text-gray-900 dark:text-gray-100">Detail</th>
                                <th className="border border-gray-300 dark:border-neutral-600 px-4 py-2 text-gray-900 dark:text-gray-100">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {accounts.map((account, index) => (
                                <tr className="bg-white dark:bg-neutral-800">
                                    <td className="border border-gray-300 dark:border-neutral-600 px-4 py-2 text-gray-800 dark:text-gray-100">
                                        {((page - 1) * limit) + (index + 1)}
                                    </td>
                                    <td className="border border-gray-300 dark:border-neutral-600 px-4 py-2">
                                        <img
                                            src={account.picture ? account.picture : UserPicture}
                                            alt="Avatar"
                                            className="w-32 h-32 rounded-sm border border-gray-300 dark:border-neutral-600"
                                        />
                                    </td>
                                    <td className="border border-gray-300 dark:border-neutral-600 px-4 py-2">
                                        <div className="font-medium text-gray-800 dark:text-gray-100">
                                            {account.name || 'Pengguna BASIS-64'}
                                        </div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400 pb-2 mb-2 border-b border-gray-300 dark:border-neutral-600">
                                            Email: {account.email || 'Pengguna tidak login'}
                                        </div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">Internal ID: {account.id}</div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">Google ID: {account.googleId}</div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">Public ID: {account.publicId}</div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">Dibuat pada: {Utils.formatTimestamp(account.createdAt)}</div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">Diubah pada: {Utils.formatTimestamp(account.updatedAt)}</div>
                                    </td>

                                    <td className="border border-gray-300 dark:border-neutral-600 px-4 py-2">
                                        <Button variant="transparent-red" className="w-full" size="sm">Hapus</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="py-4 sm:flex items-center justify-between text-gray-800 dark:text-gray-200">
                        <span>
                            Showing {(page * limit) - (limit - 1)} to {(page * limit) > totalData ? totalData : (page * limit)} of {totalData} entries
                        </span>
                        <div>
                            <button
                                onClick={first}
                                className="px-3 py-1.5 border border-gray-300 dark:border-neutral-600 border-e-0 cursor-pointer bg-gray-50 dark:bg-neutral-700 text-gray-500 dark:text-gray-300 text-lg hover:bg-gray-100 dark:hover:bg-gray-600"
                            >&lt;&lt;</button>
                            <button
                                onClick={prev}
                                className="px-3 py-1.5 border border-gray-300 dark:border-neutral-600 border-e-0 cursor-pointer bg-gray-50 dark:bg-neutral-700 text-gray-500 dark:text-gray-300 text-lg hover:bg-gray-100 dark:hover:bg-gray-600"
                            >&lt;</button>
                            <button
                                className="px-3 py-1.5 border border-gray-300 dark:border-neutral-600 border-e-0 cursor-pointer bg-gray-50 dark:bg-neutral-700 text-gray-500 dark:text-gray-300 text-lg hover:bg-gray-100 dark:hover:bg-gray-600"
                            >{page}</button>
                            <button
                                onClick={next}
                                className="px-3 py-1.5 border border-gray-300 dark:border-neutral-600 border-e-0 cursor-pointer bg-gray-50 dark:bg-neutral-700 text-gray-500 dark:text-gray-300 text-lg hover:bg-gray-100 dark:hover:bg-gray-600"
                            >&gt;</button>
                            <button
                                onClick={last}
                                className="px-3 py-1.5 border border-gray-300 dark:border-neutral-600 cursor-pointer bg-gray-50 dark:bg-neutral-700 text-gray-500 dark:text-gray-300 text-lg hover:bg-gray-100 dark:hover:bg-gray-600"
                            >&gt;&gt;</button>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
}
