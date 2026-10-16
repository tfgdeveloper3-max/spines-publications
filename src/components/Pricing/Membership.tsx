import type { ReactNode } from "react";
import { motion, type Easing, type Variants } from "framer-motion";

const smooth: Easing = [0.16, 1, 0.3, 1];

const RoyaltiesIcon = () => (
    <svg viewBox="0 0 64 64" className="h-full w-full" fill="none">
        <rect x="6" y="12" width="44" height="32" rx="3" fill="#ffffff" stroke="#3b3f8f" strokeWidth="2" />
        <rect x="6" y="12" width="44" height="6" rx="3" fill="#6c63ff" />
        <circle cx="10" cy="15" r="1" fill="#ffffff" />
        <circle cx="13.5" cy="15" r="1" fill="#ffffff" />
        <rect x="12" y="34" width="5" height="6" rx="1" fill="#ff6b9a" />
        <rect x="20" y="29" width="5" height="11" rx="1" fill="#6c63ff" />
        <rect x="28" y="24" width="5" height="16" rx="1" fill="#3b3f8f" />
        <path d="M12 28l8-5 7 3 9-7" stroke="#ff6b9a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="46" cy="42" r="11" fill="#ffd166" stroke="#3b3f8f" strokeWidth="2" />
        <path d="M46 36v12M49 38.5c-.6-1-1.8-1.5-3-1.5-1.8 0-3 .9-3 2.2 0 3 6 1.6 6 4.6 0 1.3-1.3 2.2-3 2.2-1.4 0-2.6-.6-3.2-1.6" stroke="#3b3f8f" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M40 22h6M40 26h4" stroke="#c9c6ff" strokeWidth="2" strokeLinecap="round" />
    </svg>
);

const MarketingIcon = () => (
    <svg viewBox="0 0 64 64" className="h-full w-full" fill="none">
        <rect x="10" y="14" width="44" height="28" rx="3" fill="#ffffff" stroke="#3b3f8f" strokeWidth="2" />
        <rect x="14" y="18" width="36" height="20" rx="1.5" fill="#e9e7ff" />
        <path d="M4 46h56l-3 4H7z" fill="#3b3f8f" />
        <rect x="27" y="46" width="10" height="1.6" rx=".8" fill="#c9c6ff" />
        <rect x="18" y="22" width="12" height="3" rx="1.5" fill="#6c63ff" />
        <rect x="18" y="27" width="20" height="2" rx="1" fill="#b4b0ff" />
        <rect x="18" y="31" width="16" height="2" rx="1" fill="#b4b0ff" />
        <path d="M38 28l7-4v12l-7-4z" fill="#ff6b9a" />
        <rect x="35" y="28" width="3" height="4" rx=".8" fill="#ff6b9a" />
        <path d="M47.5 27.5c1 .8 1 4.2 0 5M49.5 25.5c2 1.6 2 7.4 0 9" stroke="#ff6b9a" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);

const DistributionIcon = () => (
    <svg viewBox="0 0 64 64" className="h-full w-full" fill="none">
        <path d="M32 30L14 16M32 30l18-14M32 30L14 46M32 30l18 16" stroke="#b4b0ff" strokeWidth="2" strokeDasharray="3 3" />
        <circle cx="32" cy="30" r="9" fill="#6c63ff" stroke="#3b3f8f" strokeWidth="2" />
        <path d="M27 30h10M32 25c2 1.5 2.6 3.2 2.6 5s-.6 3.5-2.6 5c-2-1.5-2.6-3.2-2.6-5s.6-3.5 2.6-5z" stroke="#ffffff" strokeWidth="1.4" />
        <rect x="7" y="9" width="13" height="14" rx="2" fill="#ffffff" stroke="#3b3f8f" strokeWidth="2" />
        <rect x="10" y="12" width="7" height="2" rx="1" fill="#ff6b9a" />
        <rect x="44" y="9" width="13" height="14" rx="2" fill="#ffd166" stroke="#3b3f8f" strokeWidth="2" />
        <path d="M47 16h7M47 19h5" stroke="#3b3f8f" strokeWidth="1.6" strokeLinecap="round" />
        <rect x="7" y="40" width="13" height="14" rx="2" fill="#ff6b9a" stroke="#3b3f8f" strokeWidth="2" />
        <path d="M10 47h7" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" />
        <rect x="44" y="40" width="13" height="14" rx="2" fill="#ffffff" stroke="#3b3f8f" strokeWidth="2" />
        <path d="M47 44h7M47 47h7M47 50h4" stroke="#6c63ff" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
);

type Item = { no: string; icon: ReactNode; label: string; title: string; points: string[] };

const items: Item[] = [
    {
        no: "01",
        icon: <RoyaltiesIcon />,
        label: "Discuss with Users",
        title: "Royalties",
        points: [
            "Track royalties from every distribution channel in one simple dashboard",
            "Receive monthly royalty payments directly to you",
            "Earn 70% net royalties",
        ],
    },
    {
        no: "02",
        icon: <MarketingIcon />,
        label: "Discuss with Users",
        title: "Marketing",
        points: [
            "Create professional paid campaigns to promote your book",
            "Collaborate with marketing experts on tailored launch strategies",
            "Gain exclusive access to Spines Academy for ongoing guidance",
        ],
    },
    {
        no: "03",
        icon: <DistributionIcon />,
        label: "Discuss with Users",
        title: "Distribution",
        points: [
            "Get your book into dozens of channels, including Amazon, Apple, and more",
            "Showcase your work with a personal Author Page featuring your author bio and book details",
        ],
    },
];

const words: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

const word: Variants = {
    hidden: { opacity: 0, y: 26, filter: "blur(8px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1.1, ease: smooth } },
};

const grid: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.18, delayChildren: 0.25 } },
};

const cardV: Variants = {
    hidden: { opacity: 0, y: 60, scale: 0.96 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 1.2, ease: smooth } },
};

const numberV: Variants = {
    hidden: { opacity: 0, scale: 1.3, filter: "blur(10px)" },
    show: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 1.3, delay: 0.2, ease: smooth } },
};

const iconV: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.5 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 1, delay: 0.55, ease: smooth } },
};

const points: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.7 } },
};

const pointV: Variants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: smooth } },
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

const MembershipCard = ({ item, index }: { item: Item; index: number }) => (
    <motion.article
        variants={cardV}
        whileHover={{ y: -8 }}
        transition={{ duration: 0.5, ease: smooth }}
        className="group relative flex flex-col items-center overflow-hidden rounded-[14px] bg-white px-6 pb-8 pt-7 text-center shadow-[0_8px_30px_rgba(20,20,40,0.07)] ring-1 ring-[#f0f1f3] transition-shadow duration-500 hover:shadow-[0_24px_50px_rgba(64,193,172,0.18)] sm:px-7 xl:px-8 xl:pb-10 xl:pt-8 2xl:px-10 2xl:pb-12"
    >
        <span className="bg-brand-gradient pointer-events-none absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />

        <div className="relative flex h-[78px] items-center justify-center xl:h-[88px] 2xl:h-[104px]">
            <motion.span
                variants={numberV}
                className="font-clash relative select-none text-[86px] font-bold leading-none tracking-[-0.04em] text-[#eceef1] xl:text-[98px] 2xl:text-[118px]"
            >
                {item.no}
                <span
                    aria-hidden
                    className="text-brand-gradient absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-25"
                >
                    {item.no}
                </span>
            </motion.span>

            <motion.span variants={iconV} className="absolute inset-0 flex items-center justify-center">
                <motion.span
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 4.5 + index * 0.6, repeat: Infinity, ease: "easeInOut", delay: 1.6 + index * 0.3 }}
                    className="block h-[38px] w-[38px] transition-transform duration-500 group-hover:scale-110 xl:h-[44px] xl:w-[44px] 2xl:h-[52px] 2xl:w-[52px]"
                >
                    {item.icon}
                </motion.span>
            </motion.span>
        </div>

        <p className="font-clash mt-1 text-[11.5px] font-semibold text-[#1fc79d] xl:text-[12.5px] 2xl:text-[14px]">{item.label}</p>
        <h3 className="font-clash mt-1 text-[19px] font-medium text-[#141414] xl:text-[21px] 2xl:text-[25px]">{item.title}</h3>

        <motion.ul variants={points} className="mt-4 flex flex-col gap-2 xl:mt-5 xl:gap-2.5">
            {item.points.map((p) => (
                <motion.li
                    key={p}
                    variants={pointV}
                    className="font-inter mx-auto max-w-[260px] text-[12.5px] leading-[1.7] text-[#4a4f57] xl:max-w-[280px] xl:text-[13.5px] 2xl:max-w-[320px] 2xl:text-[15px]"
                >
                    <span className="mr-2 inline-block h-[4px] w-[4px] -translate-y-[2px] rounded-full bg-[#4a4f57] align-middle transition-colors duration-500 group-hover:bg-[#1fc79d]" />
                    {p}
                </motion.li>
            ))}
        </motion.ul>
    </motion.article>
);

const Membership = () => {
    return (
        <section className="relative w-full overflow-hidden bg-[#fbfbfc] py-16 sm:py-20 lg:py-24 2xl:py-32">
            <div className="mx-auto w-full max-w-[920px] px-5 sm:px-8 lg:px-6 xl:max-w-[1040px] 2xl:max-w-[1240px]">
                <motion.h2
                    variants={words}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-60px" }}
                    className="font-clash mx-auto max-w-[520px] text-center text-[27px] leading-[1.2] tracking-[-0.01em] text-[#1d3a40] sm:text-[32px] lg:max-w-[560px] lg:text-[34px] xl:max-w-[620px] xl:text-[38px] 2xl:max-w-[740px] 2xl:text-[46px]"
                >
                    <SplitWords text="Membership" className="text-brand-gradient font-semibold" />{" "}
                    <SplitWords text="that's included with" className="font-normal" />
                    <span className="block">
                        <SplitWords text="every plan" className="text-brand-gradient font-semibold" />
                    </span>
                </motion.h2>

                <motion.div
                    variants={grid}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-60px" }}
                    className="mx-auto mt-8 grid max-w-[420px] grid-cols-1 gap-5 sm:mt-10 md:max-w-none md:grid-cols-3 md:gap-4 lg:gap-5 2xl:gap-7"
                >
                    {items.map((item, i) => (
                        <MembershipCard key={item.no} item={item} index={i} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Membership;