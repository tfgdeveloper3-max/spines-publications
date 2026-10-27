export const services = ["Ghostwriting", "Editing", "Cover Design", "Publishing", "Audiobook", "Marketing"] as const;

export type Service = (typeof services)[number];

export type Review = {
    id: number;
    name: string;
    role: string;
    avatar?: string;
    title: string;
    text: string;
    rating: number;
    date: string;
    service: Service;
    verified: boolean;
};

export const reviews: Review[] = [
    {
        id: 1,
        name: "Brooklyn Simmons",
        avatar: "/images/Brooklyn-Simmons.png",
        role: "Non-Fiction Author",
        title: "Guided through every step of my first book",
        text: "The team at Spine Publications guided me through every step of publishing my first book with incredible patience and professionalism. They transformed a stressful process into an exciting, seamless milestone.",
        rating: 5,
        date: "2026-10-09",
        service: "Publishing",
        verified: true,
    },
    {
        id: 2,
        name: "Marcus Vance",
        avatar: "/images/Marcus-Vance.png",
        role: "Memoirist & Keynote Speaker",
        title: "A true publishing partner",
        text: "Spine Publications feels less like a vendor and more like a true publishing partner. Their editorial team offered invaluable feedback while respecting my authentic narrative voice.",
        rating: 5,
        date: "2026-09-28",
        service: "Editing",
        verified: true,
    },
    {
        id: 3,
        name: "Elena Rostova",
        avatar: "/images/Elena-Rostova.png",
        role: "Historical Fiction Author",
        title: "Fast, human support whenever I needed it",
        text: "Whenever I had a question about layout formatting or my release timeline, the Spine Publications project managers responded almost instantly. The human support paired with their technology is unmatched.",
        rating: 5,
        date: "2026-09-15",
        service: "Publishing",
        verified: true,
    },
    {
        id: 4,
        name: "David Miller",
        avatar: "/images/David-Miller.png",
        role: "Business & Leadership Author",
        title: "A cover that turns heads",
        text: "Working with the design team at Spine Publications was a dream. They captured my book’s core message perfectly in a stunning cover design that turns heads on store shelves.",
        rating: 5,
        date: "2026-09-02",
        service: "Cover Design",
        verified: true,
    },
    {
        id: 5,
        name: "Sarah Jenkins",
        avatar: "/images/Sarah-Jenkins.png",
        role: "Self-Published Novelist",
        title: "Polished without losing my style",
        text: "The manuscript refinement and copy editing team at Spine Publications polished my draft to absolute perfection without stripping away my style. I couldn't be prouder of the final book.",
        rating: 5,
        date: "2026-08-20",
        service: "Editing",
        verified: true,
    },
    {
        id: 6,
        name: "Jason Reynolds",
        avatar: "/images/Jason-Reynolds.png",
        role: "Sci-Fi & Fantasy Author",
        title: "Global distribution, full ownership",
        text: "Spine Publications' global distribution network placed my book directly onto Amazon, Barnes & Noble, and international eBook platforms overnight while letting me keep 100% ownership.",
        rating: 5,
        date: "2026-08-06",
        service: "Publishing",
        verified: true,
    },
    {
        id: 7,
        name: "Chloe Bennett",
        avatar: "/images/Chloe-Bennett.png",
        role: "Children's Book Author",
        title: "Effortless multi-format production",
        text: "Managing my formats across hardcover, paperback, and eBook used to be overwhelming. Spine Publications handled multi-format production effortlessly and delivered incredible physical print quality.",
        rating: 5,
        date: "2026-07-24",
        service: "Publishing",
        verified: true,
    },
    {
        id: 8,
        name: "Tariq Sterling",
        avatar: "/images/Tariq-Sterling.png",
        role: "Thriller & Mystery Author",
        title: "A launch with real momentum",
        text: "The author marketing campaign and targeted PR push provided by Spine Publications gave my book launch the momentum it needed to reach real readers and secure early reviews.",
        rating: 5,
        date: "2026-07-10",
        service: "Marketing",
        verified: true,
    },
    {
        id: 9,
        name: "Derek Vance",
        avatar: "/images/Derek-Vance.png",
        role: "Indie Author",
        title: "Everything in one clean platform",
        text: "Spine Publications is truly changing the game for independent authors. Having my editing, cover art, distribution, and royalties managed in one clean platform saved me months of work.",
        rating: 5,
        date: "2026-06-26",
        service: "Publishing",
        verified: true,
    },
    {
        id: 10,
        name: "Samantha Wright",
        avatar: "/images/Samantha-Wright.png",
        role: "Self-Help Author",
        title: "Top-tier quality on a modern timeline",
        text: "Publishing with traditional houses takes years, but self-publishing alone felt too complex. Spine Publications bridges that gap perfectly, providing top-tier industry quality on a modern timeline.",
        rating: 5,
        date: "2026-06-11",
        service: "Publishing",
        verified: true,
    },
    {
        id: 11,
        name: "Carlos Mendez",
        avatar: "/images/Carlos-Mendez.png",
        role: "Poetry & Essay Collection Author",
        title: "Royalty tracking made simple",
        text: "Tracking monthly sales and royalties across multiple retailers used to be a nightmare. The Spine Publications author dashboard makes royalty tracking transparent, simple, and reliable.",
        rating: 5,
        date: "2026-05-28",
        service: "Marketing",
        verified: true,
    },
    {
        id: 12,
        name: "Rachel Adams",
        role: "First-Time Fiction Author",
        title: "My dream of being published came true",
        text: "Holding the finished copy of my book in my hands for the first time was an unforgettable moment. Spine Publications made my dream of becoming a published author a reality.",
        rating: 5,
        date: "2026-05-14",
        service: "Publishing",
        verified: true,
    },
];

export const getSummary = (list: Review[]) => {
    const total = list.length;
    const average = total ? list.reduce((s, r) => s + r.rating, 0) / total : 0;
    const distribution = [5, 4, 3, 2, 1].map((star) => {
        const count = list.filter((r) => r.rating === star).length;
        return { star, count, percent: total ? Math.round((count / total) * 100) : 0 };
    });
    const verified = total ? Math.round((list.filter((r) => r.verified).length / total) * 100) : 0;
    const servicesReviewed = new Set(list.map((r) => r.service)).size;
    return { total, average, distribution, verified, servicesReviewed };
};

export const ratingLabel = (avg: number) => {
    if (avg >= 4.5) return "Excellent";
    if (avg >= 4) return "Great";
    if (avg >= 3) return "Average";
    if (avg >= 2) return "Poor";
    return "Bad";
};

export const formatDate = (iso: string) =>
    new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }); 