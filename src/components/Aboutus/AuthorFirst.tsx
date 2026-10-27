import { useRef } from "react";
import { motion, useScroll, useTransform, type Easing, type Variants } from "framer-motion";

const smooth: Easing = [0.16, 1, 0.3, 1];

const horizontalImg = "/images/AboutHorizontal.png";
const verticalImg = "/images/AboutVertical.png";

const heading: { text: string; accent?: boolean; br?: boolean }[] = [
    { text: "Every" },
    { text: "Author", accent: true },
    { text: "Deserves", br: true },
    { text: "a Seamless Path" },
    { text: "to Publication", accent: true },
];

const words: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

const word: Variants = {
    hidden: { opacity: 0, y: 26, filter: "blur(8px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1.1, ease: smooth } },
};

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 1.2, delay, ease: smooth },
});

const RevealImage = ({
    src,
    alt,
    className,
    imgClassName,
    from,
    delay,
    parallax,
}: {
    src: string;
    alt: string;
    className: string;
    imgClassName?: string;
    from: "left" | "bottom";
    delay: number;
    parallax: [number, number];
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], [`${parallax[0]}%`, `${parallax[1]}%`]);

    const hidden = from === "left" ? "inset(0 100% 0 0 round 12px)" : "inset(100% 0 0 0 round 12px)";

    return (
        <motion.div
            ref={ref}
            initial={{ clipPath: hidden }}
            whileInView={{ clipPath: "inset(0 0% 0 0 round 12px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.6, delay, ease: smooth }}
            className={`group relative overflow-hidden rounded-[12px] bg-[#eef3f1] shadow-[0_20px_50px_rgba(20,30,40,0.10)] ${className}`}
        >
            <motion.div
                initial={{ scale: 1.25 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 2, delay, ease: smooth }}
                className="absolute inset-0"
            >
                <motion.img
                    src={src}
                    alt={alt}
                    draggable={false}
                    style={{ y }}
                    className={`absolute inset-x-0 -top-[8%] h-[116%] w-full select-none object-contain transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06] ${imgClassName ?? ""}`}
                />
            </motion.div>
            <span className="pointer-events-none absolute inset-0 rounded-[12px] ring-1 ring-inset ring-black/5" />
        </motion.div>
    );
};

const AuthorFirst = () => {
    return (
        <section className="relative w-full overflow-hidden bg-white py-16 sm:py-20 lg:py-24 2xl:py-32">
            <div className="mx-auto w-full max-w-[1000px] px-5 sm:px-8 lg:px-6 xl:max-w-[1120px] 2xl:max-w-[1320px]">
                <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-[1.3fr_1fr] md:gap-8 lg:gap-12">
                    <motion.h2
                        variants={words}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-60px" }}
                        className="font-clash text-[26px] leading-[1.25] tracking-[-0.01em] text-[#1d2a30] sm:text-[30px] lg:text-[34px] xl:text-[38px] 2xl:text-[46px]"
                    >
                        {heading.map((seg, si) => (
                            <span key={si}>
                                {seg.text.split(" ").map((w, wi) => (
                                    <motion.span
                                        key={`${si}-${wi}`}
                                        variants={word}
                                        className={`mr-[0.25em] inline-block ${seg.accent ? "text-brand-gradient font-semibold" : "font-normal"}`}
                                    >
                                        {w}
                                    </motion.span>
                                ))}
                                {seg.br && <br className="hidden sm:block" />}
                            </span>
                        ))}
                    </motion.h2>

                    <motion.p
                        {...fadeUp(0.35)}
                        className="font-inter max-w-[440px] text-[13.5px] leading-[1.75] text-[#4b5058] md:pt-1 lg:text-[14px] xl:max-w-[470px] xl:text-[15px] 2xl:max-w-[540px] 2xl:text-[17px]"
                    >
                        Publishing a book shouldn’t mean surrendering creative freedom or wading through confusing industry red tape.
                        At Spine Publications, we built our platform to give authors complete ownership—combining professional publishing
                        expertise with intuitive, tech-driven support.
                    </motion.p>
                </div>

                <div className="mt-10 grid grid-cols-1 gap-6 sm:mt-12 sm:grid-cols-[1.69fr_1fr] sm:gap-5 lg:mt-14 lg:gap-6 xl:gap-7">
                    <div className="sm:pt-5 lg:pt-6 xl:pt-7">
                        <RevealImage
                            src={horizontalImg}
                            alt="Readers browsing books in a bookstore"
                            from="left"
                            delay={0.1}
                            parallax={[-4, 4]}
                            className="aspect-[420/285] w-full"
                        />

                        <motion.p
                            {...fadeUp(0.3)}
                            className="font-inter mt-5 max-w-[640px] text-[13.5px] leading-[1.75] text-[#4b5058] lg:mt-6 lg:text-[14px] xl:text-[15px] 2xl:max-w-[760px] 2xl:text-[17px]"
                        >
                            Whether your goal is to see your physical book featured in local bookstores or topping global eBook
                            bestseller lists, Spine Publications provides the direct path from your draft to a worldwide audience. We streamline
                            editing, design, and global distribution so you can focus entirely on telling your story.
                        </motion.p>
                    </div>

                    <RevealImage
                        src={verticalImg}
                        alt="A stack of books next to a tablet showing eBooks"
                        from="bottom"
                        delay={0.35}
                        parallax={[-6, 6]}
                        className="aspect-[4/5] w-full sm:aspect-auto sm:h-full sm:min-h-[100%]"
                        imgClassName="object-[68%_center]"
                    />
                </div>
            </div>
        </section>
    );
};

export default AuthorFirst;
