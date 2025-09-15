export class Utils {
  static CHARSET_ALPHANUMERIC: string =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  static arrayBufferToBase64(buffer: ArrayBuffer): string {
    const binary = String.fromCharCode(...new Uint8Array(buffer));
    return btoa(binary);
  }

  static base64ToArrayBuffer(base64: string): ArrayBuffer {
    const binary = atob(base64);
    const buf = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      buf[i] = binary.charCodeAt(i);
    }
    return buf.buffer;
  }

  // Menggunakan crypto.getRandomValues untuk keamanan kriptografi
  static generateRandomString(
    length: number,
    charset: string = Utils.CHARSET_ALPHANUMERIC
  ): string {
    let result = "";
    const charsetLength = charset.length;
    const randomValues = new Uint8Array(length);
    crypto.getRandomValues(randomValues);
    for (let i = 0; i < length; i++) {
      result += charset.charAt(randomValues[i] % charsetLength);
    }
    return result;
  }

  static strToArrayBuffer(str: string): ArrayBuffer {
    const uint8 = new TextEncoder().encode(str);
    return uint8.buffer.slice(
      uint8.byteOffset,
      uint8.byteOffset + uint8.byteLength
    );
  }

  static base64urlEncode(buffer: ArrayBuffer): string {
    return btoa(String.fromCharCode(...new Uint8Array(buffer)))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  }

  static base64urlDecode(base64url: string): Uint8Array {
    const pad = "=".repeat((4 - (base64url.length % 4)) % 4);
    const base64 = base64url.replace(/-/g, "+").replace(/_/g, "/") + pad;
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; ++i) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
  }

  static toUint8Array(str: string): Uint8Array {
    return new TextEncoder().encode(str);
  }

  static toString(bytes: Uint8Array | ArrayBuffer): string {
    return new TextDecoder().decode(
      bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes)
    );
  }

  static encodeUTF8(str: string): Uint8Array {
    return new TextEncoder().encode(str);
  }

  static decodeUTF8(buf: ArrayBuffer | Uint8Array): string {
    return new TextDecoder().decode(
      buf instanceof Uint8Array ? buf : new Uint8Array(buf)
    );
  }

  static camelToKebab(str: string): string {
    return str
      .replace(/([a-z])([A-Z])/g, "$1-$2") // sisipkan "-" sebelum huruf kapital
      .toLowerCase(); // ubah semua jadi lowercase
  }
}
