import { Button } from "../../components/ui";

export default function Sessions() {
    return (
        <div className="container p-4 mx-auto">
            <div className="bg-white border border-gray-300 p-4">
                <div className="overflow-x-auto">
                    <div className="flex w-full items-center mx-auto mb-4 p-2">
                        <div className="relative w-full">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 21">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.15 5.6h.01m3.337 1.913h.01m-6.979 0h.01M5.541 11h.01M15 15h2.706a1.957 1.957 0 0 0 1.883-1.325A9 9 0 1 0 2.043 11.89 9.1 9.1 0 0 0 7.2 19.1a8.62 8.62 0 0 0 3.769.9A2.013 2.013 0 0 0 13 18v-.857A2.034 2.034 0 0 1 15 15Z"></path>
                                </svg>
                            </div>
                            <input type="text" id="inputPencarianBerita" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-sm focus:border-blue-500 focus:ring-0 focus:ring-offset-0 block w-full ps-10 p-2.5" placeholder="Search data..." required />
                        </div>
                        <button type="submit" className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-blue-600 rounded-sm border border-blue-700 hover:bg-blue-700 focus:ring-4 focus:outline-none transition duration-300 cursor-pointer">
                            <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"></path>
                            </svg>Cari </button>
                    </div>
                    <table className="table-auto border-collapse border border-gray-300 w-full text-left">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border border-gray-300 px-4 py-2">No</th>
                                <th className="border border-gray-300 px-4 py-2">Account</th>
                                <th className="border border-gray-300 px-4 py-2">Session</th>
                                <th className="border border-gray-300 px-4 py-2">Device</th>
                                <th className="border border-gray-300 px-4 py-2">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2">1</td>
                                <td className="border border-gray-300 px-4 py-2">Budi</td>
                                <td className="border border-gray-300 px-4 py-2">25</td>
                                <td className="border border-gray-300 px-4 py-2">Jakarta</td>
                                <td className="border border-gray-300 px-4 py-2"><Button variant="transparent-red" size="sm">Hapus</Button></td>
                            </tr>
                            <tr className="bg-gray-50">
                                <td className="border border-gray-300 px-4 py-2">2</td>
                                <td className="border border-gray-300 px-4 py-2">Siti</td>
                                <td className="border border-gray-300 px-4 py-2">22</td>
                                <td className="border border-gray-300 px-4 py-2">Bandung</td>
                                <td className="border border-gray-300 px-4 py-2"><Button variant="transparent-red" size="sm">Hapus</Button></td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="py-4 sm:flex items-center justify-between">
                        <span>Showing 1 to 10 of 187 entries</span>
                        <div>
                            <button className="px-3 py-1.5 border border-gray-300 border-e-0 cursor-pointer bg-gray-50 text-gray-500 text-lg hover:bg-gray-100">&lt;&lt;</button>
                            <button className="px-3 py-1.5 border border-gray-300 border-e-0 cursor-pointer bg-gray-50 text-gray-500 text-lg hover:bg-gray-100">&lt;</button>
                            <button className="px-3 py-1.5 border border-gray-300 border-e-0 cursor-pointer bg-gray-50 text-gray-500 text-lg hover:bg-gray-100">1</button>
                            <button className="px-3 py-1.5 border border-gray-300 border-e-0 cursor-pointer bg-gray-50 text-gray-500 text-lg hover:bg-gray-100">&gt;</button>
                            <button className="px-3 py-1.5 border border-gray-300 cursor-pointer bg-gray-50 text-gray-500 text-lg hover:bg-gray-100">&gt;&gt;</button>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
