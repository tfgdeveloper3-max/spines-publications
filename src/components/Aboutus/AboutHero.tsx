import { motion, type Easing, type Variants } from "framer-motion";
import { ArrowCircle } from "../Navbar";

const smooth: Easing = [0.16, 1, 0.3, 1];

const words: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.35 } },
};

const word: Variants = {
    hidden: { opacity: 0, y: 34, filter: "blur(10px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1.2, ease: smooth } },
};

const SplitWords = ({ text, className }: { text: string; className?: string }) => (
    <>
        {text.split(" ").map((w, i) => (
            <motion.span key={`${w}-${i}`} variants={word} className={`mr-[0.22em] inline-block last:mr-0 ${className ?? ""}`}>
                {w}
            </motion.span>
        ))}
    </>
);

const AboutHero = () => {
    return (
        <section className="relative isolate w-full overflow-hidden bg-white">
            <div className="hero-bg">
                <div className="hero-bg__base" />
                <div className="hero-bg__stripes" />
                <div className="hero-bg__fade" />
            </div>

            <div className="mx-auto flex w-full max-w-[1240px] flex-col items-center px-5 pb-20 pt-[120px] text-center sm:px-8 sm:pb-24 sm:pt-[150px] lg:pb-28 lg:pt-[170px] xl:pb-32 xl:pt-[190px] 2xl:max-w-[1440px] 2xl:pb-40 2xl:pt-[220px]">
                <motion.h1
                    variants={words}
                    initial="hidden"
                    animate="show"
                    className="font-clash leading-[1.08] tracking-[-0.015em]"
                >
                    <span className="block text-[34px] font-semibold sm:text-[48px] md:text-[56px] lg:text-[62px] xl:text-[70px] 2xl:text-[84px]">
                        <SplitWords text="What Book Publishing:" className="text-brand-gradient" />
                    </span>
                    <span className="mt-1 block text-[22px] font-normal text-[#1c1c1c] sm:mt-2 sm:text-[30px] md:text-[34px] lg:text-[38px] xl:text-[42px] 2xl:text-[50px]">
                        <SplitWords text="Should be" />
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.3, delay: 1.1, ease: smooth }}
                    className="font-inter mt-4 max-w-[340px] text-[13.5px] leading-[1.65] text-[#4a4a4a] sm:mt-5 sm:max-w-[620px] sm:text-[15px] lg:max-w-[760px] lg:text-[16.5px] xl:max-w-[860px] xl:text-[18px] 2xl:max-w-[980px] 2xl:text-[20px]"
                >
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                    industry's standard dummy text ever since the make a type specimen book.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.85, y: 16 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 1.35, ease: smooth }}
                    className="mt-6 sm:mt-7 xl:mt-8"
                >
                    <a
                        href="#get-started"
                        className="font-inter bg-brand-gradient group flex h-[44px] items-center gap-2 rounded-full pl-[5px] pr-5 text-[15px] font-medium text-[#0f3d34] shadow-[0_8px_22px_rgba(4,221,166,0.35)] transition-transform duration-500 hover:scale-[1.04] sm:h-[48px] sm:text-[16px] lg:h-[52px] lg:pr-6 lg:text-[18px] xl:h-[56px] xl:text-[20px] 2xl:h-[62px] 2xl:pr-7 2xl:text-[22px]"
                    >
                        <span className="transition-transform duration-500 group-hover:rotate-45">
                            <ArrowCircle className="h-[34px] w-[34px] sm:h-[38px] sm:w-[38px] lg:h-[42px] lg:w-[42px] xl:h-[46px] xl:w-[46px] 2xl:h-[52px] 2xl:w-[52px]" />
                        </span>
                        Get Started
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default AboutHero;