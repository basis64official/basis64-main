import { useState } from "react";
import { Input, Button } from "../components/ui/";
import useInput from "../hooks/useInput";
import useModal from "../state/useModal";
import { apiFetch } from "../api/apiFetch";
import { CookieManager } from "../utils/CookieManager";

export default function Feedback() {
  const [name, onNameChange] = useInput("");
  const [message, onMessageChange] = useInput("");
  const modal = useModal();

  const submitHandler = async () => {
    if (name.trim().length === 0 || message.trim().length === 0) {
      modal.show("failed", "Error", "Nama & pesan tidak boleh kosong.");
      return;
    }

    modal.show("loading", "Mengirim", "Mengirim feedback...");

    try {
      const response = await apiFetch("/send-feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Session-ID": CookieManager.getCookie("session_id") || "",
        },
        body: JSON.stringify({
          name: (name || "User").trim(),
          message: message.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      modal.show("failed", "Error", "Tidak dapat mengirim feedback.");
      return;
    }

    modal.show("success", "Informasi", "Berhasil mengirim feedback.");
  };

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Header Card */}
      <div className="text-center mb-8">
        <h2
          className="text-3xl font-bold text-gray-900 dark:text-white"
          data-i18n="pages.feedback.contentTitle"
        >
          Berikan Kami Feedback
        </h2>
        <p
          className="mt-2 text-gray-600 dark:text-gray-400"
          data-i18n="pages.feedback.contentDescription"
        >
          Kami sangat menghargai masukan, saran, atau bug report dari kamu 🚀
        </p>
        <blockquote className="mt-4 text-gray-500 dark:text-gray-400 italic">
          <p>"Your opinion won’t go to <code>/dev/null</code>"</p>
        </blockquote>
      </div>

      {/* Form Card */}
      <div className="rounded-sm border border-gray-300 dark:border-neutral-700 bg-white/80 dark:bg-neutral-900 backdrop-blur-sm shadow-xs p-6 sm:p-10">
        <div className="mb-6">
          <Input
            id="inputName"
            label="Nama"
            value={name}
            placeholder="Nama kamu"
            required
            onChange={onNameChange}
            dataI18n="pages.feedback.name"
            dataI18nPlaceholder="pages.feedback.name"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="feedback-message"
            className="block mb-2 text-base font-medium dark:text-white"
            data-i18n="pages.feedback.message"
          >
            Pesan
          </label>
          <textarea
            id="feedback-message"
            value={message}
            onChange={onMessageChange}
            rows={5}
            className="w-full rounded-sm border border-gray-300 dark:border-neutral-600 bg-gray-50 dark:bg-neutral-800 p-2.5 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Ketik pesan kamu di sini..."
            data-i18n-placeholder="pages.feedback.messagePlaceholder"
            required
          />
        </div>

        <div className="flex justify-end">
          <Button
            onClick={submitHandler}
            variant="blue"
            type="submit"
            className="w-full sm:w-auto"
          >
            Kirim
          </Button>
        </div>
      </div>
    </div>
  );
}
