import { create } from "zustand";

interface INavigationBarStore {
    hidden: boolean;
    show: () => void;
    hide: () => void;
}

const useNavigationBar = create<INavigationBarStore>((set) => ({
    hidden: false,
    show: () => set({ hidden: false}),
    hide: () => set({ hidden: true}),
}));

export default useNavigationBar;
