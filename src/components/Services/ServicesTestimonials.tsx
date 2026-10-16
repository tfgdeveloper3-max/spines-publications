import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, animate, motion, useInView, type Easing, type Variants } from "framer-motion";
import client1 from "/images/client-1.png";
import client2 from "/images/client-2.png";
import client3 from "/images/client-3.png";
import client4 from "/images/client-4.png";
import client5 from "/images/client-5.png";

const smooth: Easing = [0.16, 1, 0.3, 1];

const testimonials = [
    {
        text: "Publishing my debut novel felt completely overwhelming until I found this platform. The team guided me through editing and cover design seamlessly, making the entire journey smooth and rewarding!",
        name: "Brooklyn Simmons",
        role: "Fiction Author & Content Creator",
        avatar: client1,
    },
    {
        text: "The dashboard made tracking my book's progress effortless. I kept 100% of my rights and saw my book available globally in print and eBook formats within weeks.",
        name: "Marcus Chen",
        role: "Business Author & Speaker",
        avatar: client2,
    },
    {
        text: "Working with a dedicated project manager gave me total confidence. The final print quality exceeded my expectations, and my readers love the design!",
        name: "Sarah Jenkins",
        role: "Children's Book Author",
        avatar: client3,
    },
];

const stack = [client1, client2, client3, client4, client5];

const words: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
};

const word: Variants = {
    hidden: { opacity: 0, y: 26, filter: "blur(8px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1.1, ease: smooth } },
};

const slide: Variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir * 50, filter: "blur(6px)" }),
    center: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: smooth } },
    exit: (dir: number) => ({ opacity: 0, x: dir * -50, filter: "blur(6px)", transition: { duration: 0.5, ease: smooth } }),
};

const CircleBadge = () => (
    <div className="relative aspect-square w-full">
        <motion.svg
            viewBox="0 0 200 200"
            className="absolute inset-0 h-full w-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        >
            <defs>
                <path id="badge-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
            </defs>
            <text className="font-inter" fill="#1f1f1f" fontSize="13" letterSpacing="7.2">
                <textPath href="#badge-circle">TRUSTED BY CLIENTS • TESTIMONIAL •</textPath>
            </text>
        </motion.svg>
        <div className="absolute inset-0 flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="h-[16%] w-[16%]" fill="#7b2fd6">
                <path d="M3 5h7v7.5c0 3.3-1.6 5.6-4.8 6.5l-.9-2c1.6-.6 2.5-1.8 2.6-3.5H3V5zm11 0h7v7.5c0 3.3-1.6 5.6-4.8 6.5l-.9-2c1.6-.6 2.5-1.8 2.6-3.5H14V5z" />
            </svg>
        </div>
    </div>
);

const ArrowBtn = ({ dir, onClick }: { dir: "prev" | "next"; onClick: () => void }) => (
    <motion.button
        onClick={onClick}
        aria-label={dir === "prev" ? "Previous testimonial" : "Next testimonial"}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        transition={{ duration: 0.3 }}
        className={`flex h-[36px] w-[36px] items-center justify-center rounded-full text-white shadow-md outline-none focus-visible:ring-2 focus-visible:ring-offset-2 xl:h-[40px] xl:w-[40px] 2xl:h-[46px] 2xl:w-[46px] ${dir === "prev" ? "bg-[#7b2fd6] focus-visible:ring-[#7b2fd6]" : "bg-[#2e8a6e] focus-visible:ring-[#2e8a6e]"
            }`}
    >
        <svg viewBox="0 0 24 24" fill="none" className="h-[45%] w-[45%]" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {dir === "prev" ? (
                <>
                    <path d="M9 14L4 9l5-5" />
                    <path d="M4 9h10a6 6 0 0 1 6 6v5" />
                </>
            ) : (
                <>
                    <path d="M15 14l5-5-5-5" />
                    <path d="M20 9H10a6 6 0 0 0-6 6v5" />
                </>
            )}
        </svg>
    </motion.button>
);

const Counter = ({ to, start }: { to: number; start: boolean }) => {
    const [v, setV] = useState(0);
    useEffect(() => {
        if (!start) return;
        const c = animate(0, to, { duration: 2.4, ease: smooth, onUpdate: (n) => setV(Math.round(n)) });
        return () => c.stop();
    }, [start, to]);
    return <>{v}</>;
};

const ServicesTestimonials = () => {
    const [[index, dir], setState] = useState<[number, number]>([0, 1]);
    const [paused, setPaused] = useState(false);
    const rightRef = useRef<HTMLDivElement>(null);
    const rightInView = useInView(rightRef, { once: true, margin: "-60px" });

    const go = useCallback((d: number) => {
        setState(([i]) => [(i + d + testimonials.length) % testimonials.length, d]);
    }, []);

    useEffect(() => {
        if (paused) return;
        const t = setTimeout(() => go(1), 6500);
        return () => clearTimeout(t);
    }, [index, paused, go]);

    const t = testimonials[index];

    return (
        <section className="relative w-full overflow-hidden bg-[#f7f7f8] py-14 sm:py-16 lg:py-14 xl:py-16 2xl:py-24">
            <div className="mx-auto w-full max-w-[1000px] px-4 sm:px-8 lg:px-6 xl:max-w-[1080px] 2xl:max-w-[1280px]">
                <motion.h2
                    variants={words}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-60px" }}
                    className="font-clash mx-auto max-w-[560px] text-center text-[26px] leading-[1.18] tracking-[-0.01em] text-[#1d3a40] sm:text-[32px] lg:max-w-[640px] lg:text-[32px] xl:max-w-[760px] xl:text-[36px] 2xl:max-w-[920px] 2xl:text-[44px]"
                >
                    {"Over 8,000+ Writers".split(" ").map((w, i) => (
                        <motion.span key={`a${i}`} variants={word} className="text-brand-gradient mr-[0.25em] inline-block font-semibold">
                            {w}
                        </motion.span>
                    ))}
                    {"Have Successfully Published Their Books with Complete Creative Freedom".split(" ").map((w, i) => (
                        <motion.span key={`b${i}`} variants={word} className="mr-[0.25em] inline-block font-normal">
                            {w}
                        </motion.span>
                    ))}
                </motion.h2>

                <div className="mt-6 grid grid-cols-1 gap-4 lg:mt-5 lg:grid-cols-[3.1fr_1fr] xl:gap-4">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 1.4, ease: smooth }}
                        onMouseEnter={() => setPaused(true)}
                        onMouseLeave={() => setPaused(false)}
                        className="relative grid grid-cols-1 items-center overflow-hidden rounded-[18px] border border-[#e4e4e7] bg-white shadow-[0_10px_40px_rgba(20,20,40,0.04)] md:grid-cols-[180px_1fr] lg:grid-cols-[200px_1fr] xl:grid-cols-[230px_1fr] 2xl:grid-cols-[280px_1fr]"
                    >
                        <div className="mx-auto w-[140px] pt-8 md:w-[150px] md:pt-0 xl:w-[165px] 2xl:w-[200px] md:ml-auto md:mr-0">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.6, rotate: -90 }}
                                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.6, delay: 0.3, ease: smooth }}
                            >
                                <CircleBadge />
                            </motion.div>
                        </div>

                        <div className="flex min-h-[300px] flex-col pt-6 md:min-h-[286px] md:pl-10 md:pt-[78px] xl:min-h-[310px] xl:pl-12 xl:pt-[88px] 2xl:min-h-[370px] 2xl:pl-16 2xl:pt-[110px]">
                            <div className="relative flex-1 px-5 md:pl-0 md:pr-10 xl:pr-14">
                                <AnimatePresence mode="wait" custom={dir}>
                                    <motion.p
                                        key={index}
                                        custom={dir}
                                        variants={slide}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        className="font-inter max-w-[400px] text-[13.5px] leading-[1.75] text-[#4a4a4a] xl:max-w-[430px] xl:text-[14.5px] 2xl:max-w-[520px] 2xl:text-[16.5px]"
                                    >
                                        {t.text}
                                    </motion.p>
                                </AnimatePresence>
                            </div>

                            <div className="mt-5 border-t border-[#ececef] px-5 pb-6 pt-4 md:pl-0 md:pr-10 xl:pr-10 xl:pt-5">
                                <div className="flex items-center justify-between gap-4">
                                    <AnimatePresence mode="wait" custom={dir}>
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, y: 12 }}
                                            animate={{ opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.15, ease: smooth } }}
                                            exit={{ opacity: 0, y: -8, transition: { duration: 0.4 } }}
                                            className="flex items-center gap-3"
                                        >
                                            <img
                                                src={t.avatar}
                                                alt={t.name}
                                                className="h-[36px] w-[36px] rounded-full bg-[#eee] object-cover xl:h-[40px] xl:w-[40px] 2xl:h-[48px] 2xl:w-[48px]"
                                            />
                                            <div>
                                                <p className="font-inter text-[13px] font-medium text-[#1a1a1a] xl:text-[14px] 2xl:text-[16px]">{t.name}</p>
                                                <p className="font-inter mt-0.5 text-[11px] text-[#6b6b6b] xl:text-[12px] 2xl:text-[13.5px]">{t.role}</p>
                                            </div>
                                        </motion.div>
                                    </AnimatePresence>

                                    <div className="flex shrink-0 items-center gap-3">
                                        <ArrowBtn dir="prev" onClick={() => go(-1)} />
                                        <ArrowBtn dir="next" onClick={() => go(1)} />
                                    </div>
                                </div>

                                <div className="mt-4 flex gap-1.5">
                                    {testimonials.map((_, i) => (
                                        <button
                                            key={i}
                                            aria-label={`Show testimonial ${i + 1}`}
                                            onClick={() => setState(([cur]) => [i, i > cur ? 1 : -1])}
                                            className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-[#ececef]"
                                        >
                                            {i === index && paused && <span className="absolute inset-0 rounded-full bg-[linear-gradient(90deg,#40C1AC,#04DDA6)]" />}
                                            {i === index && !paused && (
                                                <motion.span
                                                    key={index}
                                                    className="absolute inset-y-0 left-0 rounded-full bg-[linear-gradient(90deg,#40C1AC,#04DDA6)]"
                                                    initial={{ width: "0%" }}
                                                    animate={{ width: "100%" }}
                                                    transition={{ duration: 6.5, ease: "linear" }}
                                                />
                                            )}
                                            {i < index && <span className="absolute inset-0 rounded-full bg-[#40C1AC]/40" />}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        ref={rightRef}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 1.4, delay: 0.2, ease: smooth }}
                        className="bg-brand-gradient flex flex-col items-center justify-center rounded-[14px] px-6 py-10 text-center lg:py-8"
                    >
                        <h3 className="font-clash text-[#123c35]">
                            <span className="block text-[22px] font-semibold underline decoration-[1.5px] underline-offset-4 xl:text-[24px] 2xl:text-[30px]">
                                <Counter to={50} start={rightInView} />+
                            </span>
                            <span className="mt-1 block text-[20px] font-normal underline decoration-[1px] underline-offset-4 xl:text-[22px] 2xl:text-[27px]">
                                Repeat Authors
                            </span>
                        </h3>

                        <div className="mt-8 flex -space-x-3 xl:mt-10">
                            {stack.map((src, i) => (
                                <motion.img
                                    key={i}
                                    src={src}
                                    alt="Repeat author"
                                    initial={{ opacity: 0, scale: 0.3, y: 20 }}
                                    animate={rightInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                                    transition={{ duration: 0.9, delay: 0.6 + i * 0.12, ease: smooth }}
                                    whileHover={{ y: -6, zIndex: 10, scale: 1.1 }}
                                    className="relative h-[38px] w-[38px] rounded-full bg-[#ddd] object-cover ring-2 ring-white/80 xl:h-[40px] xl:w-[40px] 2xl:h-[50px] 2xl:w-[50px]"
                                />
                            ))}
                        </div>

                        <p className="font-inter mt-6 max-w-[220px] text-[11.5px] leading-[1.6] text-[#123c35] xl:text-[12px] 2xl:max-w-[260px] 2xl:text-[14px]">
                            Delivering publishing solutions that exceed expectations—building trust, creative freedom, and long-term partnerships to help authors grow their impact.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ServicesTestimonials;