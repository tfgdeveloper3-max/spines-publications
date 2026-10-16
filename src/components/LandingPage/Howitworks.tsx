import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion, type Easing } from "framer-motion";
import { ArrowCircle } from "../Navbar";

const bgImg = "/images/HowItWorks-Bg.png";
const step1Img = "/images/Howitworks.png";
const step2Img = "/images/Step-02.jpg";
const step3Img = "/images/Step-03.jpg";
const step4Img = "/images/Step-04.jpg";
const pagesImg = "/images/pages.png";

const smooth: Easing = [0.16, 1, 0.3, 1];

const Icon = ({ children }: { children: ReactNode }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="#2a9a5f" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
        {children}
    </svg>
);

const CloudUpload = () => (
    <Icon>
        <path d="M7 18a4.5 4.5 0 0 1-.6-8.96A6 6 0 0 1 18 8.5a4 4 0 0 1 .5 7.97" />
        <path d="M12 12v8M9 15l3-3 3 3" />
    </Icon>
);

const Award = () => (
    <Icon>
        <circle cx="12" cy="9" r="5" />
        <path d="M9.5 13.3L8 21l4-2 4 2-1.5-7.7" />
    </Icon>
);

const Pen = () => (
    <Icon>
        <path d="M4 20h4L19 9l-4-4L4 16z" />
        <path d="M13.5 6.5l4 4" />
    </Icon>
);

const Check = () => (
    <Icon>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M8.5 12.2l2.4 2.4 4.6-4.8" />
    </Icon>
);

const Palette = () => (
    <Icon>
        <path d="M12 3.5a8.5 8.5 0 1 0 0 17c1.2 0 1.8-.9 1.5-1.9-.4-1.3.4-2.6 1.8-2.6H17a3.5 3.5 0 0 0 3.5-3.5C20.5 7.3 16.7 3.5 12 3.5z" />
        <circle cx="8" cy="11" r="1" />
        <circle cx="11" cy="7.5" r="1" />
        <circle cx="15.5" cy="8.5" r="1" />
    </Icon>
);

const Layout = () => (
    <Icon>
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M4 9h16M10 9v11" />
    </Icon>
);

const Globe = () => (
    <Icon>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M3.5 12h17M12 3.5c2.5 2.6 3.5 5.4 3.5 8.5s-1 5.9-3.5 8.5c-2.5-2.6-3.5-5.4-3.5-8.5s1-5.9 3.5-8.5z" />
    </Icon>
);

const Chart = () => (
    <Icon>
        <path d="M4 18l5-5 4 3 7-8" />
        <path d="M15 8h5v5" />
    </Icon>
);

type Step = {
    label: string;
    title: string;
    heading: { before: string; accent: string; after: string };
    points: { icon: ReactNode; text: string }[];
    image: string;
    showPages: boolean;
    cta: string;
};

const steps: Step[] = [
    {
        label: "Step 1",
        title: "Submit Your Manuscript",
        heading: { before: "Submit Your", accent: "Manuscript", after: "in Seconds" },
        points: [
            {
                icon: <CloudUpload />,
                text: "Effortlessly import your draft directly into our streamlined dashboard. Simply add essential book details like title, author name, and primary genre.",
            },
            {
                icon: <Award />,
                text: "Secure peace of mind right away with automated copyright protection issued directly for your project.",
            },
        ],
        image: step1Img,
        showPages: true,
        cta: "Get Started",
    },
    {
        label: "Step 2",
        title: "Refine & Edit Your Work",
        heading: { before: "Polished to", accent: "Professional", after: "Standards" },
        points: [
            {
                icon: <Pen />,
                text: "Collaborate with professional editors to fine-tune your grammar, style, and narrative flow without losing your unique voice.",
            },
            {
                icon: <Check />,
                text: "Review changes, accept suggestions, and track your manuscript's progress directly within your workspace dashboard.",
            },
        ],
        image: step2Img,
        showPages: false,
        cta: "Continue Editing",
    },
    {
        label: "Step 3",
        title: "Craft Cover & Interior Layout",
        heading: { before: "Eye-Catching", accent: "Design", after: "That Sells" },
        points: [
            {
                icon: <Palette />,
                text: "Work with elite designers to create a striking, genre-appropriate cover that stops readers in their tracks.",
            },
            {
                icon: <Layout />,
                text: "Automatically format your book's interior pages for both print and digital readers, ensuring clean typography and perfect margins.",
            },
        ],
        image: step3Img,
        showPages: false,
        cta: "Preview Designs",
    },
    {
        label: "Step 4",
        title: "Launch & Distribute Globally",
        heading: { before: "Reach Readers on", accent: "Every Major", after: "Platform" },
        points: [
            {
                icon: <Globe />,
                text: "Publish your book as a paperback, hardcover, eBook, or audiobook all from a single launch.",
            },
            {
                icon: <Chart />,
                text: "Get listed on top retail platforms like Amazon, Barnes & Noble, and international bookstores while retaining full royalty control.",
            },
        ],
        image: step4Img,
        showPages: false,
        cta: "Publish My Book",
    },
];

const HowItWorks = () => {
    const [active, setActive] = useState(0);
    const step = steps[active];

    useEffect(() => {
        [...steps.map((s) => s.image), pagesImg].forEach((src) => {
            const img = new Image();
            img.src = src;
        });
    }, []);

    return (
        <section id="how-it-works" className="relative isolate w-full overflow-hidden py-20 sm:py-24 lg:py-28 xl:py-32 2xl:py-40">
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10 bg-white bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${bgImg})`, backgroundSize: "100% 100%" }}
            />

            <div className="mx-auto flex w-full max-w-[1240px] flex-col items-center px-4 text-center sm:px-8">
                <motion.span
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.1, ease: smooth }}
                    className="bg-brand-gradient font-inter inline-flex h-[24px] items-center rounded-full px-[20px] text-[11.5px] font-medium text-[#0f3d34] xl:h-[26px] xl:text-[12.5px] 2xl:h-[28px] 2xl:text-[13.5px]"
                >
                    How It Works
                </motion.span>
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, delay: 0.15, ease: smooth }}
                    className="font-clash mt-3 leading-[1.12] tracking-[-0.01em]"
                >
                    <span className="text-brand-gradient block text-[28px] font-medium sm:text-[34px] lg:text-[34px] xl:text-[38px] 2xl:text-[46px]">
                        From Draft to Published Book
                    </span>
                    <span className="block text-[25px] font-normal text-[#1c1c1c] sm:text-[31px] lg:text-[31px] xl:text-[35px] 2xl:text-[42px]">
                        in 4 Easy Steps
                    </span>
                </motion.h2>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 1.5, delay: 0.3, ease: smooth }}
                className="relative mx-auto mt-10 w-[calc(100%-32px)] max-w-[910px] sm:mt-12 sm:w-[calc(100%-64px)] md:w-[86%] lg:mt-14 lg:w-[76%] xl:w-[70%] xl:max-w-[1080px] 2xl:mt-16 2xl:w-[66%] 2xl:max-w-[1240px]"
            >
                <div
                    aria-hidden
                    className="pointer-events-none absolute -inset-x-[12%] -inset-y-[18%] -z-10 rounded-[50%] bg-[radial-gradient(closest-side,#ffffff_55%,rgba(255,255,255,0.85)_75%,rgba(255,255,255,0)_100%)] blur-2xl"
                />
                <div className="relative overflow-hidden rounded-[14px] border border-white bg-white/90 shadow-[0_20px_60px_rgba(64,193,172,0.14)] backdrop-blur-md">
                    <div className="relative px-4 pt-5 sm:px-6 sm:pt-6 xl:px-8 xl:pt-7">
                        <div
                            role="tablist"
                            className="-mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 [scrollbar-width:none] sm:-mx-6 sm:px-6 md:mx-0 md:grid md:grid-cols-[repeat(4,minmax(0,1fr))] md:gap-x-8 md:overflow-visible md:px-0 lg:gap-x-10 xl:gap-x-12 [&::-webkit-scrollbar]:hidden"
                        >
                            {steps.map((s, i) => {
                                const isActive = i === active;
                                return (
                                    <button
                                        key={s.label}
                                        role="tab"
                                        aria-selected={isActive}
                                        onClick={() => setActive(i)}
                                        className="group relative shrink-0 snap-start pb-3 text-left outline-none focus-visible:ring-2 focus-visible:ring-[#40C1AC]/50 md:min-w-0 md:justify-self-start"
                                    >
                                        <span className="font-clash block text-[13px] font-medium text-[#2fc39f] xl:text-[14.5px] 2xl:text-[16px]">
                                            {s.label}
                                        </span>
                                        <span
                                            className={`font-clash mt-1 block whitespace-nowrap text-[13.5px] font-medium leading-[1.35] transition-colors duration-500 md:whitespace-normal xl:text-[15px] 2xl:text-[17px] ${isActive ? "text-[#16302b]" : "text-[#6b7480] group-hover:text-[#16302b]"}`}
                                        >
                                            {s.title}
                                        </span>
                                        {isActive && (
                                            <motion.span
                                                layoutId="how-underline"
                                                transition={{ duration: 0.7, ease: smooth }}
                                                className="absolute inset-x-0 bottom-0 h-[2px] rounded-full bg-[#2a9a76]"
                                            />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 items-center gap-10 px-4 pb-8 pt-6 sm:px-6 sm:pb-10 sm:pt-8 lg:grid-cols-[0.78fr_1.22fr] lg:gap-6 lg:pb-6 lg:pt-6 xl:px-8 xl:gap-8 xl:pb-8">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`text-${active}`}
                                initial={{ opacity: 0, y: 24 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -16 }}
                                transition={{ duration: 0.7, ease: smooth }}
                                className="text-left"
                            >
                                <h3 className="font-clash text-[26px] leading-[1.2] tracking-[-0.01em] text-[#1c1c1c] sm:text-[30px] lg:text-[26px] xl:text-[30px] 2xl:text-[36px]">
                                    <span className="font-normal">{step.heading.before} </span>
                                    <span className="text-brand-gradient font-semibold">{step.heading.accent}</span>
                                    <span className="block font-normal">{step.heading.after}</span>
                                </h3>

                                <ul className="mt-5 flex flex-col gap-4 xl:mt-6 xl:gap-5">
                                    {step.points.map((p, i) => (
                                        <motion.li
                                            key={i}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.8, delay: 0.15 + i * 0.12, ease: smooth }}
                                            className="flex items-start gap-3"
                                        >
                                            <span className="mt-[2px] h-[18px] w-[18px] shrink-0 xl:h-[20px] xl:w-[20px]">{p.icon}</span>
                                            <p className="font-inter max-w-[440px] text-[13px] leading-[1.6] text-[#4b5563] xl:text-[14px] 2xl:text-[15.5px]">
                                                {p.text}
                                            </p>
                                        </motion.li>
                                    ))}
                                </ul>

                                <motion.a
                                    href="#get-started"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.8, delay: 0.4, ease: smooth }}
                                    className="font-inter bg-brand-gradient group mt-6 inline-flex h-[42px] items-center gap-2 rounded-full pl-[5px] pr-5 text-[14px] font-medium text-[#0f3d34] shadow-[0_8px_22px_rgba(4,221,166,0.35)] transition-transform duration-500 hover:scale-[1.04] xl:mt-7 xl:h-[46px] xl:text-[15px] 2xl:h-[52px] 2xl:text-[16.5px]"
                                >
                                    <span className="transition-transform duration-500 group-hover:rotate-45">
                                        <ArrowCircle className="h-[32px] w-[32px] xl:h-[36px] xl:w-[36px] 2xl:h-[42px] 2xl:w-[42px]" />
                                    </span>
                                    {step.cta}
                                </motion.a>
                            </motion.div>
                        </AnimatePresence>

                        <div className="relative mx-auto w-full max-w-[600px] pl-[8%] lg:max-w-none lg:pl-[8%]">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={`img-${active}`}
                                    initial={{ opacity: 0, x: 40, scale: 0.97 }}
                                    animate={{ opacity: 1, x: 0, scale: 1 }}
                                    exit={{ opacity: 0, x: -30, scale: 0.97 }}
                                    transition={{ duration: 0.8, ease: smooth }}
                                    className="relative"
                                >
                                    <div className="relative aspect-[680/376] w-full overflow-hidden rounded-[8px] bg-[#efe6fa] shadow-[0_18px_40px_rgba(60,30,110,0.14)] ring-1 ring-[#d9c9f0]/60">
                                        <img
                                            src={step.image}
                                            alt={step.title}
                                            draggable={false}
                                            className="absolute inset-0 h-full w-full select-none object-cover"
                                        />
                                    </div>

                                    {step.showPages && (
                                        <motion.div
                                            initial={{ opacity: 0, x: -50, y: 30, rotate: -8 }}
                                            animate={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
                                            transition={{ duration: 1.2, delay: 0.35, ease: smooth }}
                                            className="absolute"
                                            style={{ left: "-9%", top: "39%", width: "35.6%" }}
                                        >
                                            <motion.img
                                                src={pagesImg}
                                                alt="Manuscript pages"
                                                draggable={false}
                                                animate={{ y: [0, -8, 0] }}
                                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                                                className="block h-auto w-full select-none"
                                            />
                                        </motion.div>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default HowItWorks;