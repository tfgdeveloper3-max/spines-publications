import { motion, type Easing, type Variants } from "framer-motion";
import booksImg from "/images/About.png";

const smooth: Easing = [0.16, 1, 0.3, 1];

const features = [
    {
        no: "01",
        title: "World-Class Book Design & Publishing",
        desc: "Give your story the presentation it deserves. From custom interior formatting to striking cover designs, we ensure your book meets top industry standards.",
    },
    {
        no: "02",
        title: "One-on-One Dedicated Support",
        desc: "Never feel lost in the process. Work alongside a dedicated publishing expert who guides you step-by-step from raw manuscript to finished print.",
    },
    {
        no: "03",
        title: "Complete Ownership & Dashboard Control",
        desc: "Retain 100% of your rights and creative freedom. Track your project's progress, review edits, and control every detail through one simple platform.",
    },
    {
        no: "04",
        title: "Worldwide Reach Across All Formats",
        desc: "Sell your book globally as a hardcopy, paperback, eBook, or audiobook. We handle global distribution so readers anywhere can buy your work.",
    },
];

const list: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.18, delayChildren: 0.5 } },
};

const item: Variants = {
    hidden: { opacity: 0, x: -40 },
    show: { opacity: 1, x: 0, transition: { duration: 1.3, ease: smooth } },
};

const Asterisk = () => (
    <svg viewBox="0 0 120 120" className="h-full w-full">
        <defs>
            <linearGradient id="ast-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#c7a8de" />
                <stop offset="100%" stopColor="#9a5fc1" />
            </linearGradient>
        </defs>
        {[0, 60, 120].map((deg) => (
            <rect
                key={deg}
                x="48"
                y="4"
                width="24"
                height="112"
                rx="10"
                fill="url(#ast-grad)"
                transform={`rotate(${deg} 60 60)`}
            />
        ))}
    </svg>
);

const About = () => {
    return (
        <section id="about" className="relative w-full overflow-hidden bg-white">
            <div className="mx-auto grid w-full max-w-[1180px] grid-cols-1 items-center gap-14 px-5 py-16 sm:px-8 sm:py-20 md:py-24 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:py-28 xl:gap-16 xl:py-32">
                <div className="mx-auto w-full max-w-[560px] lg:mx-0">
                    <span
                        className="bg-brand-gradient font-inter animate__animated animate__fadeIn animate__slow inline-flex h-[24px] items-center rounded-full px-[14px] text-[11px] font-medium text-[#0f3d34] sm:h-[26px] sm:text-[12px] xl:h-[28px] xl:text-[13px]"
                    >
                        Why Spines
                    </span>

                    <motion.h2
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 1.5, ease: smooth }}
                        className="font-clash mt-4 leading-[1.12] tracking-[-0.01em]"
                    >
                        <span className="text-brand-gradient block text-[28px] font-medium sm:text-[36px] md:text-[40px] lg:text-[38px] xl:text-[44px] 2xl:text-[48px]">
                            Bring Your Book to Life
                        </span>
                        <span className="block text-[28px] font-normal text-[#141414] sm:text-[36px] md:text-[40px] lg:text-[38px] xl:text-[44px] 2xl:text-[48px]">
                            Without the Hassle
                        </span>
                    </motion.h2>

                    <motion.ul
                        variants={list}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-80px" }}
                        className="mt-8 flex flex-col gap-7 sm:mt-10 sm:gap-8 xl:gap-9"
                    >
                        {features.map((f) => (
                            <motion.li key={f.no} variants={item} className="flex items-start gap-4 sm:gap-5">
                                <span className="font-clash flex h-[38px] w-[30px] shrink-0 items-center justify-center rounded-full bg-[#ebe7f1] text-[13px] font-semibold text-[#1a1a1a] sm:h-[40px] sm:w-[32px] xl:h-[44px] xl:w-[34px] xl:text-[14px]">
                                    {f.no}
                                </span>
                                <div className="pt-[2px]">
                                    <h3 className="font-clash text-[16px] font-medium text-[#141414] sm:text-[17px] xl:text-[18px] 2xl:text-[19px]">
                                        {f.title}
                                    </h3>
                                    <p className="font-inter mt-2 max-w-[400px] text-[13px] leading-[1.6] text-[#5a5a5a] sm:text-[13.5px] xl:max-w-[430px] xl:text-[14px]">
                                        {f.desc}
                                    </p>
                                </div>
                            </motion.li>
                        ))}
                    </motion.ul>
                </div>

                <div className="mx-auto w-full max-w-[380px] sm:max-w-[440px] md:max-w-[480px] lg:max-w-[460px] xl:max-w-[520px] 2xl:max-w-[560px]">
                    <div className="relative aspect-square w-full">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.88 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 1.6, ease: smooth }}
                            className="absolute rounded-[20px] sm:rounded-[24px]"
                            style={{
                                left: "0.7%",
                                top: "12.8%",
                                width: "97.7%",
                                height: "85.4%",
                                background: "linear-gradient(155deg, #efeef3 0%, #e7e1ef 45%, #c7a8de 75%, #9a5fc1 100%)",
                            }}
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.3, rotate: -120 }}
                            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 1.8, delay: 0.3, ease: smooth }}
                            className="absolute z-10"
                            style={{ left: "5.8%", top: "0.7%", width: "26%" }}
                        >
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                                className="aspect-square w-full"
                            >
                                <Asterisk />
                            </motion.div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 70 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 1.9, delay: 0.5, ease: smooth }}
                            className="pointer-events-none absolute inset-0 z-20"
                        >
                            <motion.img
                                src={booksImg}
                                alt="Books published with Spines"
                                draggable={false}
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2.4 }}
                                className="absolute max-w-none select-none"
                                style={{ left: "-50.6%", top: "-16%", width: "206.5%" }}
                            />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;