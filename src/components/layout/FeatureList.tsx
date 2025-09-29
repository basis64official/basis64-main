import { useEffect } from "react";
import { FeatureCard } from "../ui/FeatureCard";
import useAuth from "../../state/useAuth";
import useLoginModal from "../../state/useLoginModal";
import { useFeatureStore } from "../../state/useFeatureStore";

export const FeatureList = () => {
  const { features, setFeatures } = useFeatureStore();
  const auth = useAuth();
  const loginModal = useLoginModal();

  return (
    <div className="grid gap-4 p-4 md:grid-cols-1 xl:grid-cols-3">
      {features.map((feature) => (
        <FeatureCard
          key={feature.id}
          to={feature.destination === "<internal>" ? `/features/${feature.id}` : undefined}
          href={feature.destination.startsWith("http") ? feature.destination : undefined}
          // imageSrc={`https://cdn.jsdelivr.net/gh/basis64computer/public/thumbnails/${feature.id}.webp`}
          imageSrc={`/thumbnails/${feature.id}.webp`}
          title={feature.title}
          description={feature.description}
          category={feature.category}
          isPremium={feature.premiumLevel > 0}
          isLogin={feature.isLogin}
          isUserLogin={auth.user}
          onRequireLogin={() => loginModal.show()}
        />
      ))}
    </div>
  );
};
