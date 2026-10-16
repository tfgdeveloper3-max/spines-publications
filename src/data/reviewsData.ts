export const services = ["Ghostwriting", "Editing", "Cover Design", "Publishing", "Audiobook", "Marketing"] as const;

export type Service = (typeof services)[number];

export type Review = {
    id: number;
    name: string;
    location: string;
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
        name: "Michael Harper",
        location: "Austin, US",
        title: "My memoir finally became a real book",
        text: "I had notes scattered across ten years of journals and no idea how to shape them. Spines paired me with a writer who interviewed me patiently, organized everything into a story, and kept my voice in every chapter. Holding the printed copy for the first time was emotional. I could not have done it without this team.",
        rating: 5,
        date: "2026-10-02",
        service: "Ghostwriting",
        verified: true,
    },
    {
        id: 2,
        name: "Elena Vasquez",
        location: "Miami, US",
        title: "Editing that respected my style",
        text: "My editor tightened the pacing, flagged continuity issues, and explained every suggestion clearly. The manuscript reads so much smoother now, and it still sounds like me.",
        rating: 5,
        date: "2026-09-21",
        service: "Editing",
        verified: true,
    },
    {
        id: 3,
        name: "James Whitfield",
        location: "Leeds, UK",
        title: "A cover readers actually notice",
        text: "The design team sent several directions, listened to my feedback, and refined the final cover until it was exactly right. Since launch, readers keep mentioning the cover as the reason they clicked. Worth every penny.",
        rating: 5,
        date: "2026-09-08",
        service: "Cover Design",
        verified: true,
    },
    {
        id: 4,
        name: "Grace Okafor",
        location: "Houston, US",
        title: "Publishing made simple for a first-time author",
        text: "As a first-time author I was overwhelmed by ISBNs, formatting, and retailer accounts. My project manager walked me through every step, handled the technical setup, and my book went live on all the major stores right on schedule.",
        rating: 5,
        date: "2026-08-27",
        service: "Publishing",
        verified: true,
    },
    {
        id: 5,
        name: "Daniel Brooks",
        location: "Denver, US",
        title: "Great audiobook, slightly longer timeline",
        text: "The narrator they matched me with was a perfect fit for my thriller, and the final audio quality is excellent. Production took about two weeks longer than estimated, but the team kept me updated the whole time and the result was worth the wait.",
        rating: 4,
        date: "2026-08-14",
        service: "Audiobook",
        verified: true,
    },
    {
        id: 6,
        name: "Sophie Laurent",
        location: "Toronto, CA",
        title: "Launch campaign that brought real readers",
        text: "The marketing plan was clear and realistic. Targeted ads, a press release, and a podcast interview gave my launch week more reviews and sales than I ever expected for a debut novel.",
        rating: 5,
        date: "2026-07-30",
        service: "Marketing",
        verified: true,
    },
    {
        id: 7,
        name: "Robert Chen",
        location: "Seattle, US",
        title: "Professional from start to finish",
        text: "From the manuscript review to the final upload, everything was handled professionally. The dashboard made it easy to track progress and approve each stage. My business book now looks as polished as anything from a big publisher.",
        rating: 5,
        date: "2026-07-12",
        service: "Publishing",
        verified: true,
    },
    {
        id: 8,
        name: "Amara Johnson",
        location: "Atlanta, US",
        title: "They captured my grandmother's stories",
        text: "I wanted to preserve my family's history before it was lost. The ghostwriter was respectful, curious, and incredibly skilled. The finished book is a gift our whole family will treasure for generations.",
        rating: 5,
        date: "2026-06-25",
        service: "Ghostwriting",
        verified: true,
    },
    {
        id: 9,
        name: "Thomas Reid",
        location: "Glasgow, UK",
        title: "Careful proofreading, good communication",
        text: "The proofreading caught small errors I had read past dozens of times. Communication was mostly quick, with one slow week in the middle, but the final files were clean and ready for print.",
        rating: 4,
        date: "2026-06-09",
        service: "Editing",
        verified: true,
    },
    {
        id: 10,
        name: "Natalie Park",
        location: "San Diego, US",
        title: "Beautiful children's book illustrations",
        text: "The illustrator brought my characters to life exactly how I imagined them, with bright colors and so much personality. My kids and their classmates love it, and the print quality is fantastic.",
        rating: 5,
        date: "2026-05-22",
        service: "Cover Design",
        verified: true,
    },
    {
        id: 11,
        name: "Victor Alvarez",
        location: "Phoenix, US",
        title: "Steady sales months after launch",
        text: "What impressed me most was the long-term strategy. Instead of one big push, the team set up ongoing campaigns and an author page that keep bringing in readers. Royalty reports are clear and arrive on time every month.",
        rating: 5,
        date: "2026-05-04",
        service: "Marketing",
        verified: true,
    },
    {
        id: 12,
        name: "Hannah Weiss",
        location: "Chicago, US",
        title: "My poetry collection is finally out",
        text: "Formatting poetry is tricky, and they handled every line break and stanza with care. The paperback and eBook both look elegant. I am proud to share this collection with readers.",
        rating: 5,
        date: "2026-04-18",
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