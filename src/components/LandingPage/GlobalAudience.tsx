import { useCallback, useEffect, useMemo, useRef, useState, type MouseEvent } from "react";
import {
    motion,
    useMotionValue,
    useReducedMotion,
    useSpring,
    useTransform,
    type Easing,
    type PanInfo,
    type Variants,
} from "framer-motion";

const smooth: Easing = [0.16, 1, 0.3, 1];

type Book = { src: string; alt: string };

const books: Book[] = [
    { src: "/images/Global1.png", alt: "Can God Trust You With His Reputation? by Dr. Eileen Anderson" },
    { src: "/images/Global2.png", alt: "The Man from St. Claus by Michael R. Ashmore" },
    { src: "/images/Global3.png", alt: "Conversations With My Dead Husband by Catherine Napoli Bruce" },
];

const AUTOPLAY_MS = 4200;
const BOOK_RATIO = 1887 / 1184;

const heading: { text: string; accent?: boolean; br?: boolean }[] = [
    { text: "Your Story", br: true },
    { text: "Deserves to Be Read", br: true },
    { text: "Around the World", accent: true },
];

const subheadline =
    "Join thousands of successful writers who have turned their drafts into internationally distributed bestsellers across every genre.";

const words: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09, delayChildren: 0.25 } },
};

const word: Variants = {
    hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1.1, ease: smooth } },
};

const subVariants: Variants = {
    hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1.1, ease: smooth } },
};

type Layout = { bookW: number; gap: number; range: number };

const getLayout = (w: number): Layout => {
    if (w < 640) return { bookW: 52, gap: 60, range: 1 };
    if (w < 1024) return { bookW: 28, gap: 32, range: 1 };
    if (w < 1536) return { bookW: 19, gap: 21.5, range: 2 };
    return { bookW: 17, gap: 19.5, range: 2 };
};

const useLayout = () => {
    const [layout, setLayout] = useState<Layout>(() =>
        typeof window === "undefined" ? getLayout(1280) : getLayout(window.innerWidth)
    );
    useEffect(() => {
        const onResize = () => setLayout(getLayout(window.innerWidth));
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);
    return layout;
};

const BookCover = ({ src, alt, active, index }: { src: string; alt: string; active: boolean; index: number }) => {
    const ref = useRef<HTMLDivElement>(null);
    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), { stiffness: 120, damping: 18 });
    const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 120, damping: 18 });

    useEffect(() => {
        if (!active) {
            mx.set(0);
            my.set(0);
        }
    }, [active, mx, my]);

    const onMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!active) return;
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
    };

    const onLeave = () => {
        mx.set(0);
        my.set(0);
    };

    return (
        <div className="[perspective:1200px]">
            <motion.div
                animate={active ? { y: [0, -12, 0] } : { y: 0 }}
                transition={active ? { duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 } : { duration: 0.6 }}
            >
                <motion.div
                    ref={ref}
                    onMouseMove={onMove}
                    onMouseLeave={onLeave}
                    style={{ rotateX, rotateY, transformStyle: "preserve-3d", aspectRatio: "1184 / 1887" }}
                    className="relative w-full"
                >
                    <img
                        src={src}
                        alt={alt}
                        draggable={false}
                        className="pointer-events-none absolute max-w-none select-none"
                        style={{ left: "-120.9%", top: "-25.3%", width: "345.9%" }}
                    />
                </motion.div>
            </motion.div>
        </div>
    );
};

const Slide = ({
    book,
    i,
    active,
    total,
    layout,
    onSelect,
}: {
    book: Book;
    i: number;
    active: number;
    total: number;
    layout: Layout;
    onSelect: (i: number) => void;
}) => {
    let offset = (((i - active) % total) + total) % total;
    if (offset > total / 2) offset -= total;

    const prev = useRef(offset);
    const jumped = Math.abs(offset - prev.current) > 1;

    useEffect(() => {
        prev.current = offset;
    }, [offset]);

    const abs = Math.abs(offset);
    const visible = abs <= layout.range;
    const scale = abs === 0 ? 1 : abs === 1 ? 0.84 : 0.7;
    const opacity = !visible ? 0 : abs === 0 ? 1 : abs === 1 ? 0.92 : 0.55;
    const x = `${(offset * layout.gap * 100) / layout.bookW}%`;

    return (
        <motion.div
            className="absolute top-1/2"
            style={{
                left: `${50 - layout.bookW / 2}%`,
                width: `${layout.bookW}%`,
                zIndex: 20 - abs,
                pointerEvents: visible ? "auto" : "none",
            }}
            initial={false}
            animate={{ x, y: "-50%", scale, opacity, filter: abs >= 2 ? "blur(1.5px)" : "blur(0px)" }}
            transition={jumped ? { duration: 0 } : { duration: 0.9, ease: smooth }}
            onClick={() => abs !== 0 && onSelect(i)}
        >
            <div className={abs === 0 ? "cursor-grab active:cursor-grabbing" : "cursor-pointer"}>
                <BookCover src={book.src} alt={book.alt} active={abs === 0} index={i} />
            </div>
        </motion.div>
    );
};

const NavButton = ({ dir, onClick }: { dir: "prev" | "next"; onClick: () => void }) => (
    <motion.button
        type="button"
        onClick={onClick}
        aria-label={dir === "prev" ? "Previous book" : "Next book"}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className={`flex h-[42px] w-[42px] items-center justify-center rounded-full outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-[#40C1AC] focus-visible:ring-offset-2 xl:h-[46px] xl:w-[46px] 2xl:h-[52px] 2xl:w-[52px] ${dir === "next"
            ? "bg-brand-gradient text-[#0f3d34] shadow-[0_8px_22px_rgba(4,221,166,0.35)]"
            : "bg-white text-[#2a9a76] ring-1 ring-[#40C1AC]/40 hover:shadow-[0_8px_22px_rgba(64,193,172,0.2)]"
            }`}
    >
        <svg viewBox="0 0 24 24" fill="none" className="h-[45%] w-[45%]" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {dir === "prev" ? <path d="M15 5l-7 7 7 7" /> : <path d="M9 5l7 7-7 7" />}
        </svg>
    </motion.button>
);

const GlobalAudience = () => {
    const layout = useLayout();
    const reduce = useReducedMotion();
    const n = books.length;

    const slides = useMemo(() => {
        const minSlides = 7;
        const times = Math.max(1, Math.ceil(minSlides / n));
        return Array.from({ length: times }).flatMap(() => books);
    }, [n]);

    const total = slides.length;
    const [active, setActive] = useState(0);
    const [paused, setPaused] = useState(false);
    const [inView, setInView] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;
        const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.25 });
        io.observe(el);
        return () => io.disconnect();
    }, []);

    useEffect(() => {
        slides.forEach((b) => {
            const img = new Image();
            img.src = b.src;
        });
    }, [slides]);

    const go = useCallback((d: number) => setActive((a) => (a + d + total) % total), [total]);

    useEffect(() => {
        if (paused || reduce || !inView) return;
        const t = setTimeout(() => go(1), AUTOPLAY_MS);
        return () => clearTimeout(t);
    }, [active, paused, reduce, inView, go]);

    const realActive = active % n;

    const goToReal = (target: number) => {
        let d = target - realActive;
        if (d > n / 2) d -= n;
        if (d < -n / 2) d += n;
        go(d);
    };

    const onDragEnd = (_: unknown, info: PanInfo) => {
        const swipe = info.offset.x + info.velocity.x * 0.2;
        if (swipe < -50) go(1);
        else if (swipe > 50) go(-1);
    };

    const stageAspect = 1 / ((layout.bookW / 100) * BOOK_RATIO * 1.12);

    return (
        <section
            ref={sectionRef}
            className="relative w-full overflow-hidden bg-white pb-16 pt-14 sm:pb-20 sm:pt-16 lg:pb-24 lg:pt-20 2xl:pb-28 2xl:pt-24"
        >
            <div className="mx-auto flex w-full max-w-[1240px] flex-col items-center px-5 text-center">
                <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: smooth }}
                    className="bg-brand-gradient font-inter inline-flex h-[24px] items-center rounded-full px-[20px] text-[11.5px] font-medium text-[#0f3d34] xl:h-[26px] xl:text-[12.5px] 2xl:h-[28px] 2xl:text-[13.5px]"
                >
                    The Publishing Journey
                </motion.span>

                <motion.h2
                    variants={words}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-60px" }}
                    className="font-clash mt-3 text-[27px] leading-[1.18] tracking-[-0.01em] text-[#2b3d44] sm:text-[32px] lg:text-[32px] xl:text-[36px] 2xl:text-[44px]"
                >
                    {heading.map((seg, si) => (
                        <span key={si} className={seg.br ? "block" : ""}>
                            {seg.text.split(" ").map((w, wi) => (
                                <motion.span
                                    key={`${si}-${wi}`}
                                    variants={word}
                                    className={`mr-[0.25em] inline-block ${seg.accent ? "text-brand-gradient font-medium" : "font-normal"}`}
                                >
                                    {w}
                                </motion.span>
                            ))}
                        </span>
                    ))}
                </motion.h2>

                <motion.p
                    variants={subVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 1.1, delay: 0.6, ease: smooth }}
                    className="font-inter mx-auto mt-5 max-w-[640px] text-[15px] leading-[1.65] text-[#5a6b73] sm:mt-6 sm:text-[16px] lg:mt-7 lg:max-w-[680px] lg:text-[17px] xl:text-[18px] 2xl:mt-8"
                >
                    {subheadline}
                </motion.p>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 70 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 1.6, delay: 0.3, ease: smooth }}
                className="mx-auto mt-6 w-full max-w-[1240px] sm:mt-8 2xl:max-w-[1440px]"
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
            >
                <motion.div
                    role="region"
                    aria-roledescription="carousel"
                    aria-label="Published books"
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.15}
                    onDragStart={() => setPaused(true)}
                    onDragEnd={(e, info) => {
                        onDragEnd(e, info);
                        setPaused(false);
                    }}
                    className="relative w-full touch-pan-y select-none"
                    style={{ aspectRatio: `${stageAspect}` }}
                >
                    {slides.map((b, i) => (
                        <Slide key={i} book={b} i={i} active={active} total={total} layout={layout} onSelect={setActive} />
                    ))}
                </motion.div>

                <div className="mt-4 flex items-center justify-center gap-5 sm:mt-6 xl:mt-8">
                    <NavButton dir="prev" onClick={() => go(-1)} />

                    <div className="flex items-center gap-2">
                        {books.map((b, i) => (
                            <button
                                key={b.alt}
                                type="button"
                                aria-label={`Show ${b.alt}`}
                                aria-current={i === realActive}
                                onClick={() => goToReal(i)}
                                className="relative h-[8px] overflow-hidden rounded-full bg-[#dff5ee] outline-none focus-visible:ring-2 focus-visible:ring-[#40C1AC]"
                                style={{ width: i === realActive ? 34 : 8, transition: "width 0.6s cubic-bezier(0.16,1,0.3,1)" }}
                            >
                                {i === realActive && (
                                    <motion.span
                                        key={`${active}-${paused}`}
                                        className="bg-brand-gradient absolute inset-y-0 left-0 rounded-full"
                                        initial={{ width: paused || reduce ? "100%" : "0%" }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: paused || reduce ? 0 : AUTOPLAY_MS / 1000, ease: "linear" }}
                                    />
                                )}
                            </button>
                        ))}
                    </div>

                    <NavButton dir="next" onClick={() => go(1)} />
                </div>
            </motion.div>
        </section>
    );
};

export default GlobalAudience;
