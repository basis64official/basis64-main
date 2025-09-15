import { create } from "zustand";

interface IModalStore {
    hidden: boolean;
    type: string | null;
    title: string | null;
    description: string | null;
    show: (type: string, title: string, description: string) => void;
    hide: () => void;
}

const useModal = create<IModalStore>((set) => ({
    hidden: true,
    type: null,
    title: null,
    description: null,
    show: (type: string, title: string, description: string) => set({ hidden: false, type, title, description }),
    hide: () => set({ hidden: true, type: null, title: null, description: null }),
}));

export default useModal;

