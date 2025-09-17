import { create } from "zustand";

interface CmsFeature {
  id: string;
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  destination: string;
  premiumLevel: number;
  isLogin: boolean;
  creator: string;
  creatorPhoto: string;
  date: string;
}

interface FeatureState {
  features: CmsFeature[];
  setFeatures: (items: CmsFeature[]) => void;
  addFeature: (item: CmsFeature) => void;
  removeFeature: (id: string) => void;
  getFeatureById: (id: string) => CmsFeature | undefined;
}

export const useFeatureStore = create<FeatureState>((set, get) => ({
  features: [],
  setFeatures: (items) => set({ features: items }),
  addFeature: (item) =>
    set((state) => ({ features: [...state.features, item] })),
  removeFeature: (id) =>
    set((state) => ({
      features: state.features.filter((f) => f.id !== id),
    })),
  getFeatureById: (id) => get().features.find((f) => f.id === id),
}));
