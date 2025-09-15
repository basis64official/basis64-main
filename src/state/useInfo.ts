import { create } from "zustand";

interface IInfoStore {
    visitors: number | 0;
    accuracy: number | 0;
    dictionary: number | 0;
    setValue: (visitors: number, accuracy: number, dictionary: number) => void;
}

const useInfo = create<IInfoStore>((set) => ({
    visitors: 0,
    accuracy: 0,
    dictionary: 0,
    setValue: (visitors: number, accuracy: number, dictionary: number) => set({ visitors, accuracy, dictionary }),
}));

export default useInfo;
