import { motion, type Easing, type Variants } from "framer-motion";
import authorImg from "/images/author.png";
import toniImg from "/images/toni-morrison.png";

const smooth: Easing = [0.16, 1, 0.3, 1];

type Avatar = { x: number; y: number; size: number; float: number };

const avatars: Avatar[] = [
    { x: 116, y: 101, size: 78, float: 5.2 },
    { x: 183, y: 219, size: 70, float: 6.1 },
    { x: 101, y: 333, size: 70, float: 5.6 },
    { x: 159, y: 446, size: 70, float: 6.6 },
    { x: 993, y: 93, size: 62, float: 5.9 },
    { x: 912, y: 214, size: 70, float: 5.3 },
    { x: 974, y: 338, size: 70, float: 6.4 },
    { x: 931, y: 454, size: 54, float: 5.7 },
];

const W = 1100;
const H = 540;

const headingLines: { text: string; accent?: boolean }[][] = [
    [{ text: "Most Completed" }, { text: "Manuscripts", accent: true }],
    [{ text: "Never See the" }, { text: "Light of Day", accent: true }],
];

const words: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.35 } },
};

const word: Variants = {
    hidden: { opacity: 0, y: 26, filter: "blur(8px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1.1, ease: smooth } },
};

const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 1.2, delay, ease: smooth },
});

const AvatarBubble = ({ a, i }: { a: Avatar; i: number }) => {
    const left = a.x < W / 2;
    return (
        <motion.div
            className="absolute"
            style={{
                left: `${((a.x - a.size / 2) / W) * 100}%`,
                top: `${((a.y - a.size / 2) / H) * 100}%`,
                width: `${(a.size / W) * 100}%`,
            }}
            initial={{ opacity: 0, scale: 0.4, x: left ? 60 : -60 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1.6, delay: 0.4 + (i % 4) * 0.15, ease: smooth }}
        >
            <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: a.float, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                whileHover={{ scale: 1.08 }}
                className="aspect-square w-full overflow-hidden rounded-full bg-[#e9ecef] shadow-[0_10px_25px_rgba(30,40,60,0.12)] ring-[3px] ring-white"
            >
                <img src={authorImg} alt="Spines author" draggable={false} className="h-full w-full select-none object-cover" />
            </motion.div>
        </motion.div>
    );
};

const DidYouKnow = () => {
    return (
        <section className="relative w-full overflow-hidden bg-white py-14 sm:py-16 lg:py-10 xl:py-14">
            <div className="mx-auto mb-8 flex justify-center lg:hidden">
                <div className="flex -space-x-3">
                    {avatars.slice(0, 5).map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.4, y: 20 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.1, delay: i * 0.12, ease: smooth }}
                            className="h-12 w-12 overflow-hidden rounded-full bg-[#e9ecef] shadow-md ring-[3px] ring-white sm:h-14 sm:w-14"
                        >
                            <img src={authorImg} alt="Spines author" className="h-full w-full object-cover" />
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="relative mx-auto w-full max-w-[1100px] px-4 sm:px-8 lg:px-0 2xl:max-w-[1280px]">
                <div className="relative lg:aspect-[1100/540]">
                    <div className="hidden lg:block">
                        {avatars.map((a, i) => (
                            <AvatarBubble key={i} a={a} i={i} />
                        ))}
                    </div>

                    <motion.div
                        aria-hidden
                        className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(4,221,166,0.18),rgba(64,193,172,0)_100%)] blur-2xl"
                        animate={{ scale: [1, 1.12, 1], opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    />

                    <motion.div
                        initial={{ opacity: 0, y: 60, scale: 0.96 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 1.5, ease: smooth }}
                        className="relative mx-auto flex w-full max-w-[600px] flex-col items-center rounded-[22px] border border-[#e4e6ef] bg-white/95 px-5 py-9 text-center shadow-[0_20px_60px_rgba(30,40,80,0.08)] backdrop-blur-sm sm:px-10 sm:py-11 lg:absolute lg:left-[24.5%] lg:top-[11.5%] lg:h-[77.5%] lg:w-[50.4%] lg:max-w-none lg:justify-center lg:px-[5%] lg:py-0"
                    >
                        <motion.span
                            {...fadeUp(0.2)}
                            className="bg-brand-gradient font-inter inline-flex h-[24px] items-center rounded-full px-[18px] text-[11.5px] font-medium text-[#0f3d34] xl:h-[26px] xl:text-[12.5px] 2xl:h-[28px] 2xl:text-[13.5px]"
                        >
                            Did You Know
                        </motion.span>

                        <motion.h2
                            variants={words}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, margin: "-60px" }}
                            className="font-clash mt-3 text-[24px] leading-[1.18] tracking-[-0.01em] text-[#3a4152] sm:text-[30px] lg:text-[26px] xl:text-[30px] 2xl:text-[36px]"
                        >
                            {headingLines.map((line, li) => (
                                <span key={li} className="block">
                                    {line.map((seg, si) =>
                                        seg.text.split(" ").map((w, wi) => (
                                            <motion.span
                                                key={`${li}-${si}-${wi}`}
                                                variants={word}
                                                className={`mr-[0.25em] inline-block ${seg.accent ? "text-brand-gradient font-medium" : "font-normal"}`}
                                            >
                                                {w}
                                            </motion.span>
                                        ))
                                    )}
                                </span>
                            ))}
                        </motion.h2>

                        <motion.p
                            {...fadeUp(0.7)}
                            className="font-inter mt-4 max-w-[420px] text-[13px] leading-[1.7] text-[#4c5466] xl:max-w-[460px] xl:text-[13.5px] 2xl:max-w-[520px] 2xl:text-[15px]"
                        >
                            Traditional publishing can feel like a maze of gatekeepers, confusing contracts, and overwhelming delays. Too many brilliant stories remain hidden simply because navigating the process is frustrating and exhausting.
                        </motion.p>

                        <motion.p
                            {...fadeUp(0.85)}
                            className="font-inter mt-3 max-w-[420px] text-[13px] leading-[1.7] text-[#4c5466] xl:max-w-[460px] xl:text-[13.5px] 2xl:max-w-[520px] 2xl:text-[15px]"
                        >
                            Built by authors who know these challenges firsthand, Spines was created to{" "}
                            <strong className="font-semibold text-[#2c3445]">level the playing field</strong>. We remove the roadblocks so you can focus on what matters most—sharing your message with the world.
                        </motion.p>

                        <motion.blockquote
                            initial={{ opacity: 0, scale: 0.94 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 1.4, delay: 1.05, ease: smooth }}
                            className="font-clash mt-5 max-w-[400px] text-[16px] leading-[1.45] text-[#2a9a5f] sm:text-[18px] lg:text-[16px] xl:max-w-[440px] xl:text-[18px] 2xl:max-w-[500px] 2xl:text-[21px]"
                        >
                            "If there's a book that you want to read, but it hasn't been written yet, then you must write it."
                        </motion.blockquote>

                        <motion.div {...fadeUp(1.25)} className="mt-4 flex items-center gap-3">
                            <img
                                src={toniImg}
                                alt="Toni Morrison"
                                className="h-[34px] w-[34px] rounded-full object-cover grayscale xl:h-[38px] xl:w-[38px]"
                            />
                            <span className="font-inter text-[13px] font-medium text-[#1d2330] xl:text-[14px] 2xl:text-[15px]">
                                Toni Morrison
                            </span>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default DidYouKnow;