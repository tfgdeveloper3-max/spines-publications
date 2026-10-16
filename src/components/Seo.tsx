import { useEffect } from "react";
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL, type SeoData } from "../lib/Seo";

const setMeta = (attr: "name" | "property", key: string, content: string) => {
    let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
    if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
    }
    el.setAttribute("content", content);
};

const setCanonical = (href: string) => {
    let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!el) {
        el = document.createElement("link");
        el.setAttribute("rel", "canonical");
        document.head.appendChild(el);
    }
    el.setAttribute("href", href);
};

const Seo = ({ title, description, path, image, noindex }: SeoData) => {
    useEffect(() => {
        const url = `${SITE_URL}${path}`;
        const img = (image ?? DEFAULT_OG_IMAGE).startsWith("http") ? (image ?? DEFAULT_OG_IMAGE) : `${SITE_URL}${image ?? DEFAULT_OG_IMAGE}`;

        document.title = title;
        setMeta("name", "description", description);
        setMeta("name", "robots", noindex ? "noindex, nofollow" : "index, follow");
        setCanonical(url);

        setMeta("property", "og:type", "website");
        setMeta("property", "og:site_name", SITE_NAME);
        setMeta("property", "og:title", title);
        setMeta("property", "og:description", description);
        setMeta("property", "og:url", url);
        setMeta("property", "og:image", img);

        setMeta("name", "twitter:card", "summary_large_image");
        setMeta("name", "twitter:title", title);
        setMeta("name", "twitter:description", description);
        setMeta("name", "twitter:image", img);
    }, [title, description, path, image, noindex]);

    return null;
};

export default Seo;