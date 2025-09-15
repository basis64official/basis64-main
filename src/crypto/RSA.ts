import { Utils } from "../utils/utils";

export class RSA {
  // =======================================
  // Encrypt & Decrypt
  // =======================================

  static async encrypt(
    publicKeyPem: string,
    plaintext: string
  ): Promise<string> {
    const publicKey = await RSA.importPublicKey(publicKeyPem);
    const encoded = new TextEncoder().encode(plaintext);
    const encrypted = await crypto.subtle.encrypt(
      { name: "RSA-OAEP" },
      publicKey,
      encoded.buffer
    );
    const encryptedBase64 = Utils.arrayBufferToBase64(encrypted);
    return RSA.formatPem(encryptedBase64);
  }

  static async decrypt(
    privateKeyPem: string,
    ciphertextBase64: string
  ): Promise<string> {
    const privateKey = await RSA.importPrivateKey(privateKeyPem);
    const ciphertext = Utils.base64ToArrayBuffer(
      ciphertextBase64.replace(/\n/g, "")
    );
    const decrypted = await crypto.subtle.decrypt(
      { name: "RSA-OAEP" },
      privateKey,
      ciphertext
    );
    return new TextDecoder().decode(decrypted);
  }

  // =======================================
  // Key Import (PEM)
  // =======================================

  static async importPublicKey(pem: string): Promise<CryptoKey> {
    const der = RSA.pemToDer(pem);
    const buffer = der.buffer.slice(
      der.byteOffset,
      der.byteOffset + der.byteLength
    ) as ArrayBuffer;

    return crypto.subtle.importKey(
      "spki",
      buffer,
      { name: "RSA-OAEP", hash: "SHA-256" },
      true,
      ["encrypt"]
    );
  }

  static async importPrivateKey(pem: string): Promise<CryptoKey> {
    const der = RSA.pemToDer(pem);
    const buffer = der.buffer.slice(
      der.byteOffset,
      der.byteOffset + der.byteLength
    ) as ArrayBuffer;

    return crypto.subtle.importKey(
      "pkcs8",
      buffer,
      {
        name: "RSA-OAEP",
        hash: "SHA-256",
      },
      true,
      ["decrypt"]
    );
  }

  // =======================================
  // Key Generation & Export
  // =======================================

  static async generateRSAKeyPair(): Promise<CryptoKeyPair> {
    return await crypto.subtle.generateKey(
      {
        name: "RSA-OAEP",
        modulusLength: 2048,
        publicExponent: new Uint8Array([1, 0, 1]),
        hash: "SHA-256",
      },
      true,
      ["encrypt", "decrypt"]
    );
  }

  static async exportKeyToPEM(key: CryptoKey): Promise<string> {
    const exportFormat: "spki" | "pkcs8" =
      key.type === "public" ? "spki" : "pkcs8";
    const exported = await crypto.subtle.exportKey(exportFormat, key);
    const exportedBase64 = Utils.arrayBufferToBase64(exported);
    const pemHeader = key.type === "public" ? "PUBLIC KEY" : "PRIVATE KEY";
    return `-----BEGIN ${pemHeader}-----\n${exportedBase64
      .match(/.{1,64}/g)
      ?.join("\n")}\n-----END ${pemHeader}-----`;
  }

  // =======================================
  // Internal Helpers
  // =======================================

  static pemToDer(pem: string): Uint8Array {
    const base64 = pem
      .replace(/-----BEGIN PUBLIC KEY-----/, "")
      .replace(/-----END PUBLIC KEY-----/, "")
      .replace(/\s+/g, ""); // hapus newline/spaces
    const binary = atob(base64);
    const uint8 = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      uint8[i] = binary.charCodeAt(i);
    }
    return uint8;
  }

  static formatPem(base64: string): string {
    return base64.replace(/(.{64})/g, "$1\n");
  }
}
