import { useMemo, useState } from "react";
import { AnimatePresence, motion, type Easing, type Variants } from "framer-motion";
import { getSummary, ratingLabel, reviews } from "../../data/reviewsData";
import Stars from "./ReviewStars";
import ReviewCard from "./ReviewsCard";


const smooth: Easing = [0.16, 1, 0.3, 1];
const PAGE_SIZE = 6;

type Sort = "recent" | "highest" | "lowest";

const words: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

const word: Variants = {
    hidden: { opacity: 0, y: 26, filter: "blur(8px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1.1, ease: smooth } },
};

const ReviewsList = ({ onWrite }: { onWrite: () => void }) => {
    const [sort, setSort] = useState<Sort>("recent");
    const [visible, setVisible] = useState(PAGE_SIZE);

    const sortedReviews = useMemo(() => {
        const sorted = [...reviews];
        if (sort === "recent") sorted.sort((a, b) => b.date.localeCompare(a.date));
        if (sort === "highest") sorted.sort((a, b) => b.rating - a.rating || b.date.localeCompare(a.date));
        if (sort === "lowest") sorted.sort((a, b) => a.rating - b.rating || b.date.localeCompare(a.date));
        return sorted;
    }, [sort]);

    const { total, average } = getSummary(sortedReviews);
    const shown = sortedReviews.slice(0, visible);

    return (
        <section id="reviews" className="relative w-full scroll-mt-24 overflow-hidden bg-[#fbfbfc] py-16 sm:py-20 lg:py-24 2xl:py-32">
            <div className="mx-auto w-full max-w-[1180px] px-5 sm:px-8 2xl:max-w-[1380px]">
                <div className="flex flex-col items-center text-center">
                    <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: smooth }}
                        className="bg-brand-gradient font-inter inline-flex h-[24px] items-center rounded-full px-[18px] text-[11.5px] font-medium text-[#0f3d34] xl:h-[26px] xl:text-[12.5px] 2xl:h-[28px] 2xl:text-[13.5px]"
                    >
                        What Authors Say
                    </motion.span>
                    <motion.h2
                        variants={words}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-60px" }}
                        className="font-clash mt-3 text-[28px] leading-[1.15] tracking-[-0.01em] text-[#1d2a30] sm:text-[34px] lg:text-[38px] xl:text-[42px] 2xl:text-[50px]"
                    >
                        {"Real stories from".split(" ").map((w, i) => (
                            <motion.span key={`a${i}`} variants={word} className="mr-[0.25em] inline-block font-normal">
                                {w}
                            </motion.span>
                        ))}
                        {"real authors".split(" ").map((w, i) => (
                            <motion.span key={`b${i}`} variants={word} className="text-brand-gradient mr-[0.25em] inline-block font-semibold last:mr-0">
                                {w}
                            </motion.span>
                        ))}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.1, delay: 0.3, ease: smooth }}
                        className="font-inter mt-3 max-w-[560px] text-[13.5px] leading-[1.7] text-[#5a5f66] xl:max-w-[620px] xl:text-[15px] 2xl:max-w-[720px] 2xl:text-[17px]"
                    >
                        From first-time writers to seasoned professionals, authors trust Spines to write, edit, design, publish,
                        and market their books.
                    </motion.p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.1, delay: 0.45, ease: smooth }}
                    className="mt-8 flex flex-col items-center justify-between gap-4 rounded-[14px] border border-[#eceef1] bg-white px-5 py-4 sm:mt-10 sm:flex-row xl:px-6"
                >
                    <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 sm:justify-start">
                        <span className="font-clash text-[18px] font-semibold text-[#141414] xl:text-[20px]">{total ? ratingLabel(average) : "No reviews"}</span>
                        <Stars value={average} size="md" />
                        <span className="font-inter text-[13px] text-[#4a4f57] xl:text-[14px]">
                            Rated <b className="text-[#141414]">{average.toFixed(1)}</b> / 5 · {total} {total === 1 ? "review" : "reviews"}
                        </span>
                    </div>
                    <label className="font-inter flex items-center gap-2 text-[13px] text-[#4a4f57] xl:text-[14px]">
                        Sort by
                        <select
                            value={sort}
                            onChange={(e) => setSort(e.target.value as Sort)}
                            className="cursor-pointer rounded-full border border-[#e3e6ea] bg-white px-3 py-1.5 text-[13px] font-medium text-[#141414] outline-none transition-colors focus:border-[#40C1AC] xl:text-[14px]"
                        >
                            <option value="recent">Most recent</option>
                            <option value="highest">Highest rated</option>
                            <option value="lowest">Lowest rated</option>
                        </select>
                    </label>
                </motion.div>

                <motion.div layout className="mt-6 grid grid-cols-1 items-start gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:gap-6">
                    <AnimatePresence mode="popLayout">
                        {shown.map((r) => (
                            <ReviewCard key={r.id} review={r} />
                        ))}
                    </AnimatePresence>
                </motion.div>

                {visible < sortedReviews.length && (
                    <div className="mt-10 flex justify-center">
                        <motion.button
                            type="button"
                            onClick={() => setVisible((v) => v + PAGE_SIZE)}
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.97 }}
                            className="font-inter rounded-full bg-white px-7 py-3 text-[14px] font-medium text-[#0f3d34] ring-1 ring-[#40C1AC]/50 transition-shadow hover:shadow-[0_8px_22px_rgba(64,193,172,0.2)] xl:text-[15px]"
                        >
                            Show more reviews ({sortedReviews.length - visible})
                        </motion.button>
                    </div>
                )}

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 1.3, ease: smooth }}
                    className="bg-brand-gradient relative mt-14 overflow-hidden rounded-[18px] px-6 py-10 text-center shadow-[0_24px_60px_rgba(4,221,166,0.25)] sm:px-10 lg:mt-16 lg:flex lg:items-center lg:justify-between lg:text-left xl:px-14 xl:py-12"
                >
                    <motion.span
                        aria-hidden
                        animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0.6, 0.35] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                        className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.5),transparent)]"
                    />
                    <div className="relative">
                        <h3 className="font-clash text-[24px] font-semibold text-[#0f1f1b] sm:text-[28px] xl:text-[32px] 2xl:text-[38px]">Worked with us?</h3>
                        <p className="font-inter mt-2 text-[14px] text-[#0f3d34] xl:text-[15.5px] 2xl:text-[17px]">
                            Share your experience and help other authors choose with confidence.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={onWrite}
                        className="font-inter relative mt-6 inline-flex h-[46px] items-center gap-2 rounded-full bg-[#0f3d34] px-7 text-[14.5px] font-medium text-white transition-transform duration-500 hover:scale-[1.04] lg:mt-0 xl:h-[52px] xl:text-[16px]"
                    >
                        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 20h4L19 9l-4-4L4 16z" />
                            <path d="M13.5 6.5l4 4" />
                        </svg>
                        Write a Review
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default ReviewsList;