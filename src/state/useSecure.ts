import { create } from "zustand";

interface ISecureStore {
    key: string | null;
    iv: string | null;
    setKey: (key: string, iv: string) => void;
}

const useSecure = create<ISecureStore>((set) => ({
    key: null,
    iv: null,
    setKey: (key: string, iv: string) => set({ key, iv }),
}));

export default useSecure;
