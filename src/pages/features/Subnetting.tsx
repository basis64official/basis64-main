import React, { useState } from "react";
import { Button } from "../../components/ui";

// --- util functions (tetep sama) ---
// ... (biarin util tetap sama kayak punya lu)

// --- Util functions ---
function ipToBinary(ip: string): string {
  return ip
    .split(".")
    .map((octet) => ("00000000" + parseInt(octet, 10).toString(2)).slice(-8))
    .join("");
}

function ipToInteger(ip: string): number {
  return ip.split(".").reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0);
}

function integerToIp(int: number): string {
  return [
    (int >>> 24) & 255,
    (int >>> 16) & 255,
    (int >>> 8) & 255,
    int & 255,
  ].join(".");
}

function classifyIP(ip: string): string {
  const ipParts = ip.split(".").map(Number);
  if (ipParts.length !== 4 || ipParts.some((part) => part < 0 || part > 255)) {
    return "Invalid IP address";
  }
  const firstOctet = ipParts[0];
  if (firstOctet >= 0 && firstOctet <= 127) return "A";
  if (firstOctet >= 128 && firstOctet <= 191) return "B";
  if (firstOctet >= 192 && firstOctet <= 223) return "C";
  if (firstOctet >= 224 && firstOctet <= 239) return "D (Multicast)";
  if (firstOctet >= 240 && firstOctet <= 255) return "E (Reserved)";
  return "Invalid IP address";
}

function ipCheck(ip: string): boolean {
  const ipParts = ip.split(".").map(Number);
  if (ipParts.length !== 4 || ipParts.some((part) => part < 0 || part > 255)) {
    return false;
  }
  return true;
}

function getSubnet(ip: string, prefix: number): string {
  const ipParts = ip.split(".").map(Number);
  if (ipParts.length !== 4 || ipParts.some((part) => part < 0 || part > 255)) {
    return "Invalid IP address";
  }
  const [first, second, third, last] = ipParts;
  const subnetSize = Math.pow(2, 32 - prefix);
  if (prefix >= 24) return "Ke-" + (Math.floor(last / subnetSize) + 1);
  if (prefix >= 16) return "Ke-" + (Math.floor(third / subnetSize) + 1);
  if (prefix >= 8) return "Ke-" + (Math.floor(second / subnetSize) + 1);
  return "Ke-" + (Math.floor(first / subnetSize) + 1);
}

function getSubnetInfo(ip: string, cidr: number) {
  const subnetMask = (0xffffffff << (32 - cidr)) >>> 0;
  const ipInt = ipToInteger(ip);
  const networkInt = ipInt & subnetMask;
  const broadcastInt = networkInt | (~subnetMask >>> 0);
  const usableStart = networkInt + 1;
  const usableEnd = broadcastInt - 1;
  const totalHosts = 2 ** (32 - cidr);
  const usableHosts = totalHosts - 2;

  return {
    "Alamat IP": ip,
    "IP Network": integerToIp(networkInt),
    "IP Broadcast": integerToIp(broadcastInt),
    "Kelas IP": classifyIP(ip),
    "Jangkauan IP": `${integerToIp(usableStart)} - ${integerToIp(usableEnd)}`,
    "Urutan Subnet": `${getSubnet(ip, cidr)}`,
    "Jumlah Host": totalHosts,
    "Jumlah Host yang dapat Digunakan": usableHosts,
    "Subnet Mask": integerToIp(subnetMask),
    "Wildcard Mask": integerToIp(~subnetMask >>> 0),
    "Subnet Mask (Biner)": ipToBinary(integerToIp(subnetMask)),
    "Notasi CIDR": `/${cidr}`,
    "Jenis IP": "Public",
    "Notasi IP": `${ip} /${cidr}`,
    "Alamat IP (Biner)": ipToBinary(ip),
    "Alamat IP (Desimal)": ipInt,
    "Alamat IP (Hexadesimal)": `0x${ipInt.toString(16)}`,
    "in-addr.arpa": ip.split(".").reverse().join(".") + ".in-addr.arpa",
    "IPv4 Mapped Address": `::ffff:${ipInt.toString(16)}`,
    "6to4 Prefix": `2002:${ipInt.toString(16)}::/48`,
  };
}

const SubnetCalculatorPage: React.FC = () => {
  const [ip, setIp] = useState("192.168.1.1");
  const [prefix, setPrefix] = useState(24);
  const [result, setResult] = useState<Record<string, string | number>>({});
  const [activeTab, setActiveTab] = useState<"IPv4" | "Artikel">("IPv4");

  const handleCalculate = () => {
    if (!ipCheck(ip)) return;
    setResult(getSubnetInfo(ip, prefix));
  };

  const tabIcons = {
    'IPv4': 'ethernet',
    'Artikel': 'blockquote-left'
  }

  return (
    <div className="p-6 mx-auto">
      {/* Tabs */}
      <div className="flex gap-6 border-b border-gray-200 dark:border-neutral-700 mb-8">
        {(["IPv4", "Artikel"] as Array<"IPv4" | "Artikel">).map((tab) => (
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

      {activeTab === "IPv4" && (
        <div className="space-y-8">
          {/* Input */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">
              Input
            </h3>
            <div className="flex flex-col lg:flex-row gap-3">
              <input
                type="text"
                value={ip}
                onChange={(e) => setIp(e.target.value)}
                className="flex-1 rounded-lg border border-gray-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 px-4 py-2 text-base text-gray-900 dark:text-white focus:ring-1 focus:ring-blue-500 focus:outline-none"
                placeholder="Alamat IP"
              />
              <select
                value={prefix}
                onChange={(e) => setPrefix(Number(e.target.value))}
                className="rounded-lg border border-gray-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 px-4 py-2 text-base text-gray-900 dark:text-white focus:ring-1 focus:ring-blue-500 focus:outline-none"
              >
                {Array.from({ length: 32 }, (_, i) => 32 - i).map((n) => (
                  <option key={n} value={n}>
                    /{n}
                  </option>
                ))}
              </select>
              <Button
                variant="blue"
                className="lg:w-auto rounded-lg"
                onClick={handleCalculate}
              >
                Hitung
              </Button>
            </div>
          </div>

          {/* Result */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">
              Hasil
            </h3>
            {Object.keys(result).length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-base">
                Masukkan IP dan prefix untuk melihat hasilnya.
              </p>
            ) : (
              <div className="grid sm:grid-cols-2 gap-4">
                {Object.entries(result).map(([key, value]) => (
                  <div
                    key={key}
                    className="rounded-lg border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 p-4"
                  >
                    <p className="font-medium text-gray-900 dark:text-white text-base">
                      {key}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 text-base break-all">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === "Artikel" && (
        <article className="prose prose-lg dark:prose-invert max-w-none bg-white dark:bg-neutral-800 rounded-md border border-gray-300 dark:border-neutral-700 shadow-sm p-6">
          <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">
            Mengenal Subnetting dalam Jaringan Komputer
          </h1>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            Subnetting adalah teknik dalam jaringan komputer untuk membagi satu jaringan IP besar menjadi beberapa jaringan kecil (subnet). Dengan cara ini, penggunaan alamat IP bisa menjadi lebih efisien dan administrasi jaringan menjadi lebih mudah.
          </p>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            Contoh sederhananya, jika sebuah perusahaan mendapat alokasi jaringan <code>192.168.1.0/24</code>, subnetting memungkinkan jaringan tersebut dibagi menjadi beberapa subnet yang lebih kecil, misalnya <code>/26</code> atau <code>/28</code>, sesuai kebutuhan jumlah host.
          </p>
          <h2 className="text-2xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-100">
            Mengapa Subnetting Penting?
          </h2>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 leading-relaxed space-y-2">
            <li>Menghemat alamat IP yang terbatas.</li>
            <li>Meningkatkan keamanan dengan memisahkan segmen jaringan.</li>
            <li>Mengurangi lalu lintas broadcast di dalam jaringan.</li>
            <li>Memudahkan manajemen jaringan berskala besar.</li>
          </ul>
          <h2 className="text-2xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-100">
            Kesimpulan
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            Memahami konsep subnetting sangat penting bagi siapa saja yang berkecimpung di dunia jaringan komputer. Dengan menguasainya, kita dapat merancang jaringan yang lebih efisien, aman, dan mudah diatur. Alat kalkulator subnet seperti yang ada di halaman ini bisa membantu mempercepat proses perhitungan.
          </p>
          <p className="mt-6 text-gray-500 dark:text-gray-400 italic">
            Ditulis oleh: Tim Basis64 · Dipublikasikan pada 29 September 2025
          </p>
        </article>
      )

      }
    </div>
  );
};

export default SubnetCalculatorPage;
