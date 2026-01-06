import { useEffect } from 'react';

interface SEOProps {
    name: string;
    description: string;
    keys?: string;
    thumbnail?: string;
}

const SEO: React.FC<SEOProps> = ({
    name,
    description,
    keys,
    thumbnail = "https://basis64.com/thumbnail.webp"
}) => {
    useEffect(() => {
        // 1. Update Title
        document.title = name;

        // 2. Update Description
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute("content", description);
        }

        // 3. Update Keywords (Jika ada)
        if (keys) {
            const metaKeywords = document.querySelector('meta[name="keywords"]');
            if (metaKeywords) {
                metaKeywords.setAttribute("content", keys);
            }
        }

        // 4. Update Open Graph (Agar thumbnail/title di sosmed sinkron)
        const updateMeta = (property: string, content: string) => {
            const el = document.querySelector(`meta[property="${property}"]`);
            if (el) el.setAttribute("content", content);
        };

        updateMeta("og:title", name);
        updateMeta("og:description", description);
        updateMeta("og:image", thumbnail);
        updateMeta("og:url", window.location.href);

    }, [name, description, keys, thumbnail]); // Re-run jika props berubah

    return null; // Komponen ini tidak merender apapun ke layar
};

export default SEO;