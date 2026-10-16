import { motion, type Easing } from "framer-motion";
import { ArrowCircle } from "../Navbar";

import cover1 from "/images/hero-cover-1.png";
import laptop from "/images/hero-cover-2.png";
import cover3 from "/images/hero-cover-3.png";
import cover4 from "/images/hero-cover-4.png";
import cover5 from "/images/hero-cover-5.png";
import cover6 from "/images/hero-cover-6.png";
import cover7 from "/images/hero-cover-7.png";
import cover8 from "/images/hero-cover-8.png";
import cover9 from "/images/hero-cover-9.png";

const CENTER = 1125 / 2;
const X0 = 56;
const Y0 = 18;
const STAGE_W = 1069 - X0;
const STAGE_H = 236 - Y0;

type Item = {
    src: string;
    alt: string;
    left: number;
    top: number;
    width: number;
    z: number;
    order: number;
};

const books: Item[] = [
    { src: cover9, alt: "He Loved Me to Death", left: 58, top: 60, width: 100, z: 10, order: 3 },
    { src: cover8, alt: "Positive or Negative", left: 132, top: 45, width: 115, z: 20, order: 2 },
    { src: cover7, alt: "Riding the Equation", left: 218, top: 33, width: 130, z: 30, order: 1 },
    { src: cover6, alt: "Become a Poker Day Player", left: 296, top: 20, width: 149, z: 40, order: 0 },
    { src: cover1, alt: "The A Plan", left: 680, top: 20, width: 149, z: 40, order: 0 },
    { src: cover3, alt: "A Mound Over Hell", left: 777, top: 33, width: 130, z: 30, order: 1 },
    { src: cover4, alt: "The Last Prophecy", left: 878, top: 45, width: 115, z: 20, order: 2 },
    { src: cover5, alt: "The McClintock Saga", left: 967, top: 60, width: 100, z: 10, order: 3 },
];

const LAPTOP = { left: 372, top: 22, width: 381 };

const pct = (v: number, base: number) => `${(v / base) * 100}%`;

const smooth: Easing = [0.16, 1, 0.3, 1];

const LAPTOP_DELAY = 1.1;
const BOOKS_DELAY = 1.9;

const Hero = () => {
    return (
        <section className="relative isolate w-full overflow-hidden bg-white">
            <div className="hero-bg">
                <div className="hero-bg__base" />
                <div className="hero-bg__stripes" />
                <div className="hero-bg__fade" />
            </div>

            <div className="mx-auto flex w-full max-w-[1240px] flex-col items-center px-5 pt-[104px] text-center sm:px-8 sm:pt-[130px] lg:pt-[140px] xl:pt-[150px] 2xl:pt-[170px]">
                <h1 className="font-clash leading-[1.08]">
                    <span
                        className="animate__animated animate__fadeInUp animate__slow block text-[22px] font-normal tracking-[-0.01em] text-[#1c1c1c] sm:text-[30px] md:text-[34px] lg:text-[38px] xl:text-[42px] 2xl:text-[50px]"
                        style={{ animationDelay: "0.2s" }}
                    >
                        Your Story Deserves
                    </span>
                    <span
                        className="text-brand-gradient animate__animated animate__fadeInUp animate__slow mt-1 block text-[32px] font-semibold tracking-[-0.01em] sm:text-[44px] md:text-[52px] lg:text-[58px] xl:text-[64px] 2xl:text-[76px]"
                        style={{ animationDelay: "0.4s" }}
                    >
                        Premium Publishing Made Simple.
                    </span>
                </h1>

                <p
                    className="font-inter animate__animated animate__fadeInUp animate__slow mt-3 max-w-[340px] text-[13px] leading-[1.6] text-[#4a4a4a] sm:max-w-[560px] sm:text-[14px] lg:max-w-[640px] lg:text-[15px] xl:max-w-[700px] xl:text-[16px] 2xl:max-w-[780px] 2xl:text-[17px]"
                    style={{ animationDelay: "0.6s" }}
                >
                    From your initial manuscript to a fully polished book on the shelves, we guide authors through every step of the publishing journey. Get expert editing, custom cover designs, and seamless distribution—all tailored to bring your story to life.
                </p>

                <div className="animate__animated animate__zoomIn animate__slow mt-5 lg:mt-6" style={{ animationDelay: "0.8s" }}>
                    <a
                        href="#get-started"
                        className="font-inter bg-brand-gradient group flex h-[42px] items-center gap-2 rounded-full pl-[5px] pr-5 text-[14px] font-medium text-[#0f3d34] shadow-[0_8px_22px_rgba(4,221,166,0.35)] transition-transform duration-500 hover:scale-[1.04] lg:h-[46px] lg:text-[15px] xl:h-[50px] xl:pr-6 xl:text-[16px] 2xl:h-[54px] 2xl:text-[17px]"
                    >
                        <span className="transition-transform duration-500 group-hover:rotate-45">
                            <ArrowCircle className="h-[32px] w-[32px] lg:h-[36px] lg:w-[36px] xl:h-[40px] xl:w-[40px] 2xl:h-[44px] 2xl:w-[44px]" />
                        </span>
                        Get Started
                    </a>
                </div>
            </div>

            <div className="mt-8 w-full pb-10 sm:mt-10 sm:pb-12 lg:mt-10 lg:px-8 lg:pb-14 xl:px-10 2xl:px-14">
                <div className="relative left-1/2 w-[185%] -translate-x-1/2 sm:w-[140%] md:w-[118%] lg:w-full">
                    <div className="relative w-full" style={{ aspectRatio: `${STAGE_W} / ${STAGE_H}` }}>
                        <motion.img
                            src={laptop}
                            alt="Author dashboard"
                            draggable={false}
                            initial={{ opacity: 0, y: 60, scale: 0.92 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 1.8, delay: LAPTOP_DELAY, ease: smooth }}
                            className="absolute select-none drop-shadow-[0_18px_30px_rgba(0,0,0,0.18)]"
                            style={{
                                left: pct(LAPTOP.left - X0, STAGE_W),
                                top: pct(LAPTOP.top - Y0, STAGE_H),
                                width: pct(LAPTOP.width, STAGE_W),
                                zIndex: 50,
                            }}
                        />

                        {books.map((b) => {
                            const bookCenter = b.left + b.width / 2;
                            const fromX = `${((CENTER - bookCenter) / b.width) * 100}%`;
                            const isLeft = bookCenter < CENTER;

                            return (
                                <motion.div
                                    key={b.alt}
                                    className="absolute"
                                    style={{
                                        left: pct(b.left - X0, STAGE_W),
                                        top: pct(b.top - Y0, STAGE_H),
                                        width: pct(b.width, STAGE_W),
                                        zIndex: b.z,
                                    }}
                                    initial={{ x: fromX, opacity: 0, scale: 0.85, rotate: isLeft ? 4 : -4 }}
                                    animate={{ x: "0%", opacity: 1, scale: 1, rotate: 0 }}
                                    transition={{
                                        duration: 2.2,
                                        delay: BOOKS_DELAY + b.order * 0.18,
                                        ease: smooth,
                                        opacity: { duration: 1, delay: BOOKS_DELAY + b.order * 0.18 },
                                    }}
                                >
                                    <motion.img
                                        src={b.src}
                                        alt={b.alt}
                                        draggable={false}
                                        whileHover={{ y: -8 }}
                                        transition={{ duration: 0.6, ease: smooth }}
                                        className="block h-auto w-full select-none drop-shadow-[0_10px_18px_rgba(0,0,0,0.22)]"
                                    />
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;