import { apiFetch } from "../api/apiFetch";
import useAuth from "../state/useAuth";
import useInfo from "../state/useInfo";
import { decodeJWT } from "../utils/jwtDecode";

export class CookieManager {
  static async getVisitorsToday() {
    const { setValue } = useInfo.getState();
    const status = await apiFetch("/session/get-visitors-today");
    if (!status) {
      return;
    }
    const json = await status.json();
    console.log(json);
    setValue(json.visitors, 70, 800);
  }
  static async check(): Promise<boolean> {
    let sessionId = this.getCookie("session_id");
    let publicKeyPEM = this.getCookie("public_key_pem");
    const cookieExpire = this.getCookieExpire("session_id");
    const now = Date.now();
    const { login } = useAuth.getState();
    await this.getVisitorsToday();

    // Kalau cookie valid, tetap verify ke server
    try {
      if (sessionId && publicKeyPEM && cookieExpire && cookieExpire > now) {
        const accessToken = this.getCookie("access_token");
        const verifyResponse = await apiFetch("/session/verify", {
          headers: {
            "X-Session-ID": sessionId,
            ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
          },
        });
        const verifyResult = await verifyResponse.json();
        if (verifyResult.ok) {
          if (verifyResult.accessToken) {
            const decodedJwt = decodeJWT(verifyResult.accessToken);
            this.setCookie(
              "access_token",
              verifyResult.accessToken,
              decodedJwt?.exp * 1000
            );
            if (!decodedJwt) {
              console.error("Failed to decode access token.");
              return false;
            }
            login(decodedJwt.name, decodedJwt.email, decodedJwt.picture);
          }
          return true;
        }
      }
      // Kalau verify gagal → ambil session baru
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("An unknown error occurred:", error);
      }
    }

    console.log("creating new cookie...");
    // Cookie invalid / verify gagal → ambil session baru
    const response = await apiFetch("/session/get");
    if (!response.ok) return false; // gagal ambil session baru

    const jsonResult = await response.json();
    sessionId = jsonResult.sessionId;
    publicKeyPEM = jsonResult.publicKey;

    await this.getVisitorsToday();

    // Simpan cookie baru
    this.setCookie("session_id", sessionId!, jsonResult.expiredAt);
    this.setCookie("public_key_pem", publicKeyPEM!, jsonResult.expiredAt);

    return true;
  }

  static getCookie(name: string): string | null {
    const match = document.cookie.match(
      new RegExp("(^| )" + name + "=([^;]+)")
    );
    return match ? decodeURIComponent(match[2]) : null;
  }

  static getCookieExpire(name: string): number | null {
    const match = document.cookie.match(
      new RegExp("(^| )" + name + "_exp=([^;]+)")
    );
    return match ? parseInt(match[2], 10) : null;
  }

  static setCookie(name: string, value: string, expiresTimestamp: number) {
    console.log("create cookie: " + name);
    const expiresDate = new Date(expiresTimestamp);

    // set cookie utama
    document.cookie = `${name}=${encodeURIComponent(
      value
    )}; path=/; expires=${expiresDate.toUTCString()}`;

    // set cookie expire timestamp
    document.cookie = `${name}_exp=${expiresDate.getTime()}; path=/; expires=${expiresDate.toUTCString()}`;
    console.log("create cookie: " + document.cookie);
  }

  static removeCookie(name: string) {
    // Hapus cookie utama
    document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;

    // Hapus cookie expire timestamp
    document.cookie = `${name}_exp=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  }
}
