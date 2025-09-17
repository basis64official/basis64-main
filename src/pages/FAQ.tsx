import { useState } from "react";

const faqData = [
  {
    question: "Apakah akun saya aman di BASIS-64?",
    answer:
      "Ya, kami menjamin keamanan akun Anda selama pertukaran data. Semua informasi yang dikirimkan ke server kami dienkripsi end-to-end menggunakan AES untuk enkripsi data dan RSA untuk proses pertukaran kunci.",
  },
  {
    question: "Apakah admin atau pemilik website ini tahu kata sandi akun saya?",
    answer:
      "Tidak, kami sebagai pemilik website tidak dapat membaca kata sandi akun Anda. Semua kata sandi disimpan dalam bentuk terenkripsi menggunakan algoritma yang aman dan tidak dapat dilihat oleh siapa pun, termasuk admin.",
  },
  {
    question: "Bagaimana jika saya lupa kata sandi akun saya?",
    answer:
      "Jika Anda lupa kata sandi akun Anda, Anda dapat mengubah password Anda dengan cara mengklik 'Lupa Password' pada halaman login.",
  },
  {
    question: "Seberapa akurat translator ini?",
    answer:
      "Saat ini, kami menggunakan teknologi NLP (Natural Language Processing) untuk menerjemahkan bahasa Dayak Kenyah dengan lebih akurat, dengan akurasi hingga 90%. Teknologi ini membantu sistem memahami struktur dan makna kalimat, sehingga terjemahan tidak hanya berdasarkan kata per kata, tetapi juga sesuai dengan konteks. Dengan begitu, pengguna bisa mendapatkan hasil terjemahan yang lebih alami, mudah dipahami, dan mendekati makna aslinya.",
  },
  {
    question: "Bagaimana cara melakukan pembayaran?",
    answer:
      'Anda dapat melakukan pembayaran melalui <a href="payment.html">QRIS</a> atau melalui cash dengan cara menemui admin secara langsung, Anda bisa mendapatkan aktivasi secara otomatis setelah mengirimkan bukti pengiriman jika Anda membayar melalui QRIS. Anda bisa menghubungi <a href="https://wa.me/+622211509216" target="_blank">admin melalui whatsapp</a> jika terdapat masalah dalam aktivasi.',
  },
  {
    question: "Apakah penerjemah Dayak Kenyah BASIS-64 gratis?",
    answer:
      'Tidak, penerjemah Dayak Kenyah BASIS-64 <strong>tidak gratis.</strong> Pengguna perlu berlangganan untuk mengakses fitur ini. Lihat pilihan paket yang tersedia <a href="price.html" class="text-blue-600 underline">di sini.</a> Meski demikian, BASIS-64 sesekali membuka akses gratis dalam periode promosi tertentu — namun hal ini sangat jarang terjadi.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="container p-4 mx-auto">
      <div className="rounded-xs border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900">
        {faqData.map((item, idx) => (
          <div key={idx} className="border-b border-gray-200 dark:border-neutral-700">
            <button
              type="button"
              className={`flex items-center justify-between w-full p-4 font-medium text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-neutral-800 transition-colors gap-3 focus:outline-gray-300 ${openIndex === idx ? "bg-blue-100 border-blue-600 dark:bg-neutral-800" : ""}`}
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              aria-expanded={openIndex === idx}
              aria-controls={`faq-panel-${idx}`}
              id={`faq-header-${idx}`}
            >
              <span>{item.question}</span>

      {openIndex === idx ? (
        <i className="bi bi-caret-up-fill"></i>
      ) : (
        <i className="bi bi-caret-down-fill"></i>
      )}

            </button>
            {openIndex === idx && (
				<div
					id={`faq-panel-${idx}`}
					role="region"
					aria-labelledby={`faq-header-${idx}`}
					className={`overflow-hidden transition-all duration-300 p-4 border-t border-gray-200 dark:border-neutral-700 text-gray-600 dark:text-gray-300`}
					>
					<div className="p-5 text-gray-600 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: item.answer }} />
					</div>
    )}
          </div>
        ))}
      </div>
    </div>
  );
}