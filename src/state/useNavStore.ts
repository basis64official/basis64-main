// store.ts
import { create } from "zustand";

interface NavStore {
  fromHome: boolean;
  setFromHome: (v: boolean) => void;
  clearFromHome: () => void;
}

const EXPIRY_KEY = "fromHome_expiry";
const FLAG_KEY = "fromHome";

function isValid() {
  const expiry = localStorage.getItem(EXPIRY_KEY);
  const flag = localStorage.getItem(FLAG_KEY);

  if (!expiry || !flag) return false;
  const now = Date.now();
  return now < parseInt(expiry, 10);
}

export const useNavStore = create<NavStore>((set) => ({
  fromHome: isValid(),
  setFromHome: (v) => {
    if (v) {
      const expiry = Date.now() + 24 * 60 * 60 * 1000; // 1 hari
      localStorage.setItem(FLAG_KEY, "true");
      localStorage.setItem(EXPIRY_KEY, String(expiry));
    } else {
      localStorage.removeItem(FLAG_KEY);
      localStorage.removeItem(EXPIRY_KEY);
    }
    set({ fromHome: v });
  },
  clearFromHome: () => {
    localStorage.removeItem(FLAG_KEY);
    localStorage.removeItem(EXPIRY_KEY);
    set({ fromHome: false });
  },
}));
