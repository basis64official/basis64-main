import React, { useState } from "react";
import { Button } from "../../components/ui";

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

// --- Page Component ---
const SubnetCalculatorPage: React.FC = () => {
  const [ip, setIp] = useState("192.168.1.1");
  const [prefix, setPrefix] = useState(24);
  const [result, setResult] = useState<Record<string, string | number>>({});
  const [activeTab, setActiveTab] = useState<"ipv4" | "ipv6">("ipv4");

  const handleCalculate = () => {
    if (!ipCheck(ip)) return;
    setResult(getSubnetInfo(ip, prefix));
  };

  return (
    <div className="p-6">
      {/* Tabs */}
      <div className="mb-4 border-b border-gray-200 dark:border-neutral-700">
        <ul className="flex flex-wrap-mb-px text-sm font-medium text-center">
          <li className="me-2">
            <button
              className={`inline-block p-4 border-b-2 rounded-t-lg ${
                activeTab === "ipv4"
                  ? "text-primary-600 border-primary-600 dark:text-neutral-300 dark:border-primary-500"
                  : "text-gray-500 border-transparent hover:text-gray-600 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
              onClick={() => setActiveTab("ipv4")}
            >
              IPv4
            </button>
          </li>
          <li className="me-2">
            <button
              className={`inline-block p-4 border-b-2 rounded-t-lg ${
                activeTab === "ipv6"
                  ? "text-primary-600 border-primary-600 dark:text-neutral-300 dark:border-primary-500"
                  : "text-gray-500 border-transparent hover:text-gray-600 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
              onClick={() => setActiveTab("ipv6")}
            >
              IPv6
            </button>
          </li>
        </ul>
      </div>

      {/* IPv4 Content */}
      {activeTab === "ipv4" && (
        <div className="rounded-sm bg-gray-50 dark:bg-neutral-950 lg:block">
          <div className="block p-4 mb-4 bg-white border border-gray-200 shadow-xs dark:bg-neutral-800 dark:border-neutral-700">
            <div className="font-semibold mb-2 dark:text-white">
              <i className="bi bi-braces mr-2"></i> Input
            </div>
            <div className="flex flex-wrap gap-2">
              <input
                type="text"
                value={ip}
                onChange={(e) => setIp(e.target.value)}
                className="w-full flex-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full lg:w-2/3 p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="Alamat IP"
              />
              <select
                value={prefix}
                onChange={(e) => setPrefix(Number(e.target.value))}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full lg:w-1/3 p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-gray-400 dark:text-white"
              >
                {Array.from({ length: 32 }, (_, i) => 32 - i).map((n) => (
                  <option key={n} value={n}>
                    /{n}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid">
              <Button
              variant="blue"
                className="mt-4"
                onClick={handleCalculate}
              >
                Enter
              </Button>
            </div>
          </div>

          <div className="block p-6 bg-white border border-gray-200 shadow-xs dark:bg-neutral-800 dark:border-neutral-700">
            <div className="font-semibold mb-2 dark:text-white">
              <i className="bi bi-ethernet mr-2"></i> Hasil
            </div>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <tbody>
                {Object.entries(result).map(([key, value]) => (
                  <tr key={key}>
                    <td className="px-2 py-1 font-medium">{key}</td>
                    <td className="px-2 py-1">: {value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* IPv6 Content */}
      {activeTab === "ipv6" && (
        <div className="hidden p-4 rounded-sm bg-gray-50 dark:bg-neutral-800 lg:block">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Fitur untuk <strong className="font-medium text-gray-800 dark:text-white">IPv6</strong> akan hadir nanti. (Coming soon)
          </p>
        </div>
      )}
    </div>
  );
};

export default SubnetCalculatorPage;
