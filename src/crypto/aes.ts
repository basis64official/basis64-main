import { Utils } from '../utils/utils';

export class AES {
	// ===== Generate random key =====
	// return key:string(base64, 32 bytes)
	static generateKey(): string {
		const array = new Uint8Array(32); // 256 bit
		crypto.getRandomValues(array);
		return Utils.arrayBufferToBase64(array.buffer);
	}

	// ===== Generate random IV =====
	// return iv:string(base64, 16 bytes)
	static generateIv(): string {
		const array = new Uint8Array(16); // 128 bit
		crypto.getRandomValues(array);
		return Utils.arrayBufferToBase64(array.buffer);
	}

	// ===== Encrypt =====
	// plaintext:string, key:string(base64), iv:string(base64)
	// return ciphertext:string(base64)
	static async encrypt(
		plaintext: string,
		keyBase64: string,
		ivBase64: string
	): Promise<string> {
		const keyBytes = new Uint8Array(Utils.base64ToArrayBuffer(keyBase64));
		const ivBytes = new Uint8Array(Utils.base64ToArrayBuffer(ivBase64));

		const cryptoKey = await crypto.subtle.importKey(
			'raw',
			keyBytes,
			{ name: 'AES-CBC' }, // bisa diganti AES-GCM
			false,
			['encrypt']
		);

		const encrypted = await crypto.subtle.encrypt(
			{ name: 'AES-CBC', iv: ivBytes },
			cryptoKey,
			Utils.encodeUTF8(plaintext) as BufferSource
		);

		return Utils.arrayBufferToBase64(encrypted);
	}

	// ===== Decrypt =====
	// ciphertext:string(base64), key:string(base64), iv:string(base64)
	// return plaintext:string
	static async decrypt(
		ciphertextBase64: string,
		keyBase64: string,
		ivBase64: string
	): Promise<string> {
		const keyBytes = new Uint8Array(Utils.base64ToArrayBuffer(keyBase64));
		const ivBytes = new Uint8Array(Utils.base64ToArrayBuffer(ivBase64));

		const cryptoKey = await crypto.subtle.importKey(
			'raw',
			keyBytes,
			{ name: 'AES-CBC' },
			false,
			['decrypt']
		);

		const decrypted = await crypto.subtle.decrypt(
			{ name: 'AES-CBC', iv: ivBytes },
			cryptoKey,
			Utils.base64ToArrayBuffer(ciphertextBase64)
		);

		return Utils.decodeUTF8(decrypted);
	}
}
