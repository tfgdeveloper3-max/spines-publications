export const SITE_URL = "https://spinepublications.com";
export const SITE_NAME = "Spine Publications";
export const DEFAULT_OG_IMAGE = "/images/og-image.png";

export type SeoData = {
    title: string;
    description: string;
    path: string;
    image?: string;
    noindex?: boolean;
};

export const seo = {
    home: {
        title: "Spine Publications | From Manuscript to Published Book",
        description:
            "Publish your book with Spine Publications. Expert editing, custom cover design, and global distribution to Amazon, Barnes & Noble, Apple Books, and more.",
        path: "/",
    },
    about: {
        title: "About Us | Spine Publications, Built by Authors",
        description:
            "Founded by authors, Spine Publications makes professional publishing simple. Meet the team helping writers turn manuscripts into books readers love.",
        path: "/about",
    },
    services: {
        title: "Book Publishing Services | Spine Publications",
        description:
            "Ghostwriting, editing, proofreading, cover design, formatting, publishing, and marketing. Everything your book needs, from first draft to global launch.",
        path: "/services",
    },
    pricing: {
        title: "Book Publishing Packages & Pricing | Spine Publications",
        description:
            "Compare the Essentials, Balance, and Momentum publishing packages. Transparent pricing for paperback, hardcover, eBook, and audiobook publishing.",
        path: "/pricing",
    },
    reviews: {
        title: "Author Reviews & Testimonials | Spine Publications",
        description:
            "Read reviews from authors who published with Spine Publications. Real stories about our editing, cover design, publishing, and marketing services.",
        path: "/reviews",
    },
    contact: {
        title: "Contact Us | Free Publishing Quote | Spine Publications",
        description:
            "Talk to a Spine Publications expert about your book. Call (728) 221-6606, email support@spinepublications.com, or request a free publishing quote online.",
        path: "/contact",
    },
    privacy: {
        title: "Privacy Policy | Spine Publications",
        description:
            "Learn what information Spine Publications collects, how we use it, and how we keep your personal and payment details safe and secure.",
        path: "/privacy",
    },
    terms: {
        title: "Terms & Conditions | Spine Publications",
        description:
            "Read the Spine Publications terms and conditions, including content ownership, original work guarantees, image policy, and limitation of liability.",
        path: "/terms",
    },
} satisfies Record<string, SeoData>;