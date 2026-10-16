import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, type Easing, type Variants } from "framer-motion";
import { ArrowCircle } from "../Navbar";
import RatingSummary from "./RatingSummary";
import { formatDate, getSummary, reviews } from "../../data/reviewsData";
import Stars from "./ReviewStars";


const smooth: Easing = [0.16, 1, 0.3, 1];

const words: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.07, delayChildren: 0.35 } },
};

const word: Variants = {
    hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1.2, ease: smooth } },
};

const SplitWords = ({ text, className }: { text: string; className?: string }) => (
    <>
        {text.split(" ").map((w, i) => (
            <motion.span key={`${w}-${i}`} variants={word} className={`mr-[0.25em] inline-block last:mr-0 ${className ?? ""}`}>
                {w}
            </motion.span>
        ))}
    </>
);

const CountUp = ({ to, suffix = "" }: { to: number; suffix?: string }) => {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true });
    const [v, setV] = useState(0);
    useEffect(() => {
        if (!inView) return;
        const c = animate(0, to, { duration: 2.2, delay: 1.2, ease: smooth, onUpdate: (n) => setV(Math.round(n)) });
        return () => c.stop();
    }, [inView, to]);
    return (
        <span ref={ref}>
            {v}
            {suffix}
        </span>
    );
};

const ReviewsHero = ({ onWrite }: { onWrite: () => void }) => {
    const { total, average, verified, servicesReviewed } = getSummary(reviews);
    const featured = [...reviews].filter((r) => r.rating === 5).sort((a, b) => b.text.length - a.text.length)[0];

    const stats = [
        { label: "Reviews", value: total, suffix: "" },
        { label: "Verified authors", value: verified, suffix: "%" },
        { label: "Services reviewed", value: servicesReviewed, suffix: "" },
    ];

    return (
        <section className="relative isolate w-full overflow-hidden bg-white">
            <div className="hero-bg">
                <div className="hero-bg__base" />
                <div className="hero-bg__stripes" />
                <div className="hero-bg__fade" />
            </div>

            <div className="mx-auto grid w-full max-w-[1180px] grid-cols-1 items-center gap-12 px-5 pb-16 pt-[120px] sm:px-8 sm:pb-20 sm:pt-[150px] lg:grid-cols-[1.1fr_0.9fr] lg:gap-10 lg:pb-24 lg:pt-[170px] xl:gap-16 xl:pt-[180px] 2xl:max-w-[1380px] 2xl:pb-32 2xl:pt-[210px]">
                <div className="text-center lg:text-left">
                    <motion.a
                        href="#reviews"
                        initial={{ opacity: 0, y: -10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 1, delay: 0.2, ease: smooth }}
                        className="font-inter inline-flex items-center gap-2 rounded-full bg-white/70 py-1.5 pl-1.5 pr-4 text-[12px] font-medium text-[#0f3d34] shadow-[0_6px_20px_rgba(64,193,172,0.15)] ring-1 ring-white backdrop-blur-md transition-colors hover:bg-white xl:text-[13px]"
                    >
                        <span className="bg-brand-gradient flex h-[22px] items-center rounded-full px-2 text-[11px] font-semibold xl:h-[24px]">
                            ★ {average.toFixed(1)}
                        </span>
                        Rated {average.toFixed(1)} out of 5 by our authors
                    </motion.a>

                    <motion.h1
                        variants={words}
                        initial="hidden"
                        animate="show"
                        className="font-clash mt-5 leading-[1.08] tracking-[-0.015em]"
                    >
                        <span className="block text-[32px] font-normal text-[#1c1c1c] sm:text-[44px] lg:text-[48px] xl:text-[56px] 2xl:text-[68px]">
                            <SplitWords text="Reviews from authors" />
                        </span>
                        <span className="block text-[32px] font-semibold sm:text-[44px] lg:text-[48px] xl:text-[56px] 2xl:text-[68px]">
                            <SplitWords text="who published with Spines" className="text-brand-gradient" />
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, delay: 0.9, ease: smooth }}
                        className="font-inter mx-auto mt-5 max-w-[520px] text-[14px] leading-[1.7] text-[#4a4f57] lg:mx-0 xl:max-w-[560px] xl:text-[16px] 2xl:max-w-[640px] 2xl:text-[18px]"
                    >
                        Every review here comes from a writer we worked with, across ghostwriting, editing, cover design,
                        publishing, audiobooks, and marketing. Read their stories, then share your own.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.1, delay: 1.1, ease: smooth }}
                        className="mt-7 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
                    >
                        <a
                            href="#reviews"
                            className="font-inter bg-brand-gradient group inline-flex h-[44px] items-center gap-2 rounded-full pl-[5px] pr-5 text-[14.5px] font-medium text-[#0f3d34] shadow-[0_8px_22px_rgba(4,221,166,0.35)] transition-transform duration-500 hover:scale-[1.04] xl:h-[50px] xl:text-[16px] 2xl:h-[56px] 2xl:text-[17.5px]"
                        >
                            <span className="transition-transform duration-500 group-hover:rotate-45">
                                <ArrowCircle className="h-[34px] w-[34px] xl:h-[40px] xl:w-[40px] 2xl:h-[46px] 2xl:w-[46px]" />
                            </span>
                            Read the reviews
                        </a>
                        <button
                            type="button"
                            onClick={onWrite}
                            className="font-inter inline-flex h-[44px] items-center gap-2 rounded-full bg-white/70 px-6 text-[14.5px] font-medium text-[#0f3d34] ring-1 ring-[#40C1AC]/40 backdrop-blur-md transition-all duration-500 hover:bg-white hover:shadow-[0_8px_22px_rgba(64,193,172,0.2)] xl:h-[50px] xl:text-[16px] 2xl:h-[56px] 2xl:text-[17.5px]"
                        >
                            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4 20h4L19 9l-4-4L4 16z" />
                                <path d="M13.5 6.5l4 4" />
                            </svg>
                            Write a review
                        </button>
                    </motion.div>

                    <motion.dl
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.1, delay: 1.25, ease: smooth }}
                        className="mx-auto mt-9 grid max-w-[480px] grid-cols-3 divide-x divide-[#0f3d34]/10 lg:mx-0 xl:max-w-[520px]"
                    >
                        {stats.map((s) => (
                            <div key={s.label} className="flex flex-col-reverse items-center px-2 lg:items-start lg:px-5 lg:first:pl-0">
                                <dt className="font-inter mt-1 text-[11.5px] text-[#4a4f57] xl:text-[13px] 2xl:text-[14.5px]">{s.label}</dt>
                                <dd className="font-clash text-[26px] font-semibold leading-none text-[#141414] xl:text-[32px] 2xl:text-[38px]">
                                    <CountUp to={s.value} suffix={s.suffix} />
                                </dd>
                            </div>
                        ))}
                    </motion.dl>
                </div>

                <div className="relative mx-auto w-full max-w-[460px] lg:max-w-none">
                    <motion.div
                        initial={{ opacity: 0, y: 50, rotate: 2 }}
                        animate={{ opacity: 1, y: 0, rotate: 0 }}
                        transition={{ duration: 1.5, delay: 0.6, ease: smooth }}
                        className="relative z-10 rounded-[18px] border border-white bg-white/85 p-6 shadow-[0_30px_70px_rgba(15,61,52,0.14)] backdrop-blur-xl xl:p-7 2xl:p-9"
                    >
                        <p className="font-inter text-[12px] font-semibold uppercase tracking-[0.12em] text-[#13866a] xl:text-[12.5px]">Spines Publications</p>
                        <div className="mt-3">
                            <RatingSummary list={reviews} />
                        </div>
                    </motion.div>

                    {featured && (
                        <motion.div
                            initial={{ opacity: 0, x: 40, y: 30 }}
                            animate={{ opacity: 1, x: 0, y: 0 }}
                            transition={{ duration: 1.5, delay: 1, ease: smooth }}
                            className="relative z-20 -mt-6 ml-6 rounded-[16px] border border-[#eceef1] bg-white p-5 shadow-[0_24px_60px_rgba(20,20,40,0.12)] sm:ml-14 lg:-ml-10 lg:mr-6 xl:p-6"
                        >
                            <motion.div
                                animate={{ y: [0, -6, 0] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2.6 }}
                            >
                                <div className="flex items-center justify-between gap-3">
                                    <Stars value={featured.rating} size="sm" />
                                    <span className="font-inter text-[11.5px] text-[#6b7280]">{formatDate(featured.date)}</span>
                                </div>
                                <p className="font-clash mt-3 text-[15.5px] font-semibold text-[#141414] xl:text-[17px]">{featured.title}</p>
                                <p className="font-inter mt-1.5 line-clamp-3 text-[12.5px] leading-[1.65] text-[#3d434b] xl:text-[13.5px]">{featured.text}</p>
                                <div className="mt-3 flex items-center gap-2.5">
                                    {featured.avatar && (
                                        <img
                                            src={featured.avatar}
                                            alt={featured.name}
                                            draggable={false}
                                            className="h-[30px] w-[30px] shrink-0 select-none rounded-full object-cover ring-2 ring-white shadow-[0_3px_10px_rgba(20,20,40,0.12)]"
                                        />
                                    )}
                                    <p className="font-inter text-[12.5px] font-semibold text-[#141414]">
                                        {featured.name} <span className="font-normal text-[#13866a]">· Verified</span>
                                    </p>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ReviewsHero;