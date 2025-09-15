import { apiFetch } from "../api/apiFetch";
import useAuth from "../state/useAuth";
import useLoginModal from "../state/useLoginModal";
import useModal from "../state/useModal";
import { CookieManager } from "./CookieManager";
import { decodeJWT } from "./jwtDecode";

export class AuthManager {
  static async login(googleJwt: string): Promise<boolean> {
    const sessionId = CookieManager.getCookie("session_id");
    const headers: HeadersInit = sessionId ? { "X-Session-ID": sessionId } : {};
    try {
      const response = await apiFetch("/auth/login", {
        method: "POST",
        headers,
        body: JSON.stringify({ idToken: googleJwt }),
      });
      const jsonResult = await response.json();
      console.log(jsonResult)
      const decodedJWT = decodeJWT(jsonResult.accessToken);
      if (!decodedJWT) {
        console.error("Failed to decode JWT from accessToken.");
        return false;
      }
      CookieManager.setCookie(
        "access_token",
        jsonResult.accessToken,
        decodedJWT.exp * 1000
      );
      useAuth.setState({
        user: true,
        name: decodedJWT.name,
        email: decodedJWT.email,
        picture: decodedJWT.picture,
      });
      useLoginModal.setState({ modal: false });
      return true;
    } catch (e) {
      return false;
    }
  }

  static async logOut(): Promise<boolean> {
    useModal.setState({
      hidden: false,
      type: "loading",
      title: "Loading",
      description: "Log out...",
    });
    const sessionId = CookieManager.getCookie("session_id");
    const accessToken = CookieManager.getCookie("access_token");
    const headers: HeadersInit = {};
    if (sessionId) {
      headers["X-Session-ID"] = sessionId;
    }
    if (accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`;
    }
    try {
      const response = await apiFetch("/auth/logout", {
        method: "POST",
        headers,
      });
      if (!response.ok) {
        useModal.setState({
          hidden: false,
          type: "failed",
          title: "Failed",
          description: "Tidak dapat logout.",
        });
        return false;
      }
      CookieManager.removeCookie("access_token");
      useAuth.setState({
        user: false,
        name: null,
        email: null,
        picture: null,
      });
      useModal.setState({ type: "none" });
      return true;
    } catch (e) {
      useModal.setState({
        hidden: false,
        type: "failed",
        title: "Failed",
        description: "Server tidak merespons. Pastikan koneksi internet stabil, lalu coba kembali.",
      });
      return false;
    }
  }
}
