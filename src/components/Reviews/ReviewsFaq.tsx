import { useId, useState } from "react";
import { AnimatePresence, motion, type Easing, type Variants } from "framer-motion";
import { ArrowCircle } from "../Navbar";

const smooth: Easing = [0.16, 1, 0.3, 1];

const faqs = [
    {
        q: "Do I keep full copyright and ownership of my book?",
        a: "Yes, absolutely. You retain 100% of your rights, copyrights, and royalties. Our platform provides the publishing tools and distribution services while you maintain complete creative and financial ownership of your work.",
    },
    {
        q: "How long does the publishing process take from start to finish?",
        a: "Most books are fully edited, designed, and published within 4 to 8 weeks, depending on the length of your manuscript and the level of editing required. You can track every step in real-time on your dashboard.",
    },
    {
        q: "Where will my book be available for purchase?",
        a: "Your book will be distributed globally across major online retailers like Amazon, Barnes & Noble, Apple Books, and independent bookstores worldwide in eBook, paperback, hardcover, and audiobook formats.",
    },
    {
        q: "What support do I receive during the publishing process?",
        a: "You will be paired with a dedicated project manager who guides you through every stage—from professional editing and cover design to formatting and final distribution launch.",
    },
    {
        q: "Can I publish my book in multiple formats?",
        a: "Yes! We support multi-format publishing. You can launch your manuscript simultaneously as an eBook, paperback, hardcover, or audiobook with just a few clicks.",
    },
];

const words: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

const word: Variants = {
    hidden: { opacity: 0, y: 26, filter: "blur(8px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1.1, ease: smooth } },
};

const list: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const row: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 1, ease: smooth } },
};

const PlusMinus = ({ open }: { open: boolean }) => (
    <motion.span
        animate={{ rotate: open ? 180 : 0, scale: open ? 1 : 0.94 }}
        transition={{ duration: 0.6, ease: smooth }}
        className={`relative flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full transition-colors duration-500 xl:h-[38px] xl:w-[38px] 2xl:h-[42px] 2xl:w-[42px] ${open ? "bg-brand-gradient shadow-[0_6px_18px_rgba(4,221,166,0.35)]" : "bg-[#eefaf6] ring-1 ring-[#40C1AC]/25"
            }`}
    >
        <span className={`absolute h-[2px] w-[14px] rounded-full transition-colors duration-500 ${open ? "bg-white" : "bg-[#2fb594]"}`} />
        <motion.span
            animate={{ scaleY: open ? 0 : 1 }}
            transition={{ duration: 0.5, ease: smooth }}
            className={`absolute h-[14px] w-[2px] rounded-full transition-colors duration-500 ${open ? "bg-white" : "bg-[#2fb594]"}`}
        />
    </motion.span>
);

const FAQItem = ({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) => {
    const id = useId();
    return (
        <motion.li
            variants={row}
            layout
            transition={{ layout: { duration: 0.6, ease: smooth } }}
            className={`relative overflow-hidden rounded-[16px] border transition-[background-color,border-color,box-shadow] duration-500 ${open
                ? "border-[#40C1AC]/40 bg-[linear-gradient(135deg,#f2fdf9_0%,#ffffff_60%)] shadow-[0_14px_40px_rgba(64,193,172,0.12)]"
                : "border-[#ececef] bg-white hover:border-[#40C1AC]/30 hover:shadow-[0_8px_24px_rgba(20,20,40,0.05)]"
                }`}
        >
            {open && (
                <motion.span
                    layoutId="faq-active-bar"
                    transition={{ duration: 0.6, ease: smooth }}
                    className="bg-brand-gradient absolute inset-y-0 left-0 w-[3px]"
                />
            )}

            <button
                type="button"
                onClick={onToggle}
                aria-expanded={open}
                aria-controls={id}
                className="flex w-full items-center justify-between gap-5 px-5 py-4 text-left outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#40C1AC]/50 sm:px-6 sm:py-5 xl:px-7 2xl:py-6"
            >
                <span
                    className={`font-clash text-[15px] font-medium leading-[1.4] transition-colors duration-500 sm:text-[16px] xl:text-[17px] 2xl:text-[19px] ${open ? "text-[#0f3d34]" : "text-[#26323a]"
                        }`}
                >
                    {q}
                </span>
                <PlusMinus open={open} />
            </button>

            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        id={id}
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1, transition: { height: { duration: 0.6, ease: smooth }, opacity: { duration: 0.5, delay: 0.15 } } }}
                        exit={{ height: 0, opacity: 0, transition: { height: { duration: 0.5, ease: smooth }, opacity: { duration: 0.2 } } }}
                        className="overflow-hidden"
                    >
                        <motion.p
                            initial={{ y: -8, filter: "blur(4px)" }}
                            animate={{ y: 0, filter: "blur(0px)" }}
                            exit={{ y: -8, filter: "blur(4px)" }}
                            transition={{ duration: 0.6, ease: smooth }}
                            className="font-inter max-w-[620px] px-5 pb-5 pr-14 text-[13.5px] leading-[1.75] text-[#5a6470] sm:px-6 sm:pb-6 sm:pr-20 xl:px-7 xl:text-[14.5px] 2xl:max-w-[720px] 2xl:text-[16px]"
                        >
                            {a}
                        </motion.p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.li>
    );
};

const ReviewsFAQ = () => {
    const [open, setOpen] = useState<number | null>(0);

    return (
        <section id="faq" className="relative w-full overflow-hidden bg-white py-16 sm:py-20 lg:py-24 2xl:py-28">
            <div
                aria-hidden
                className="pointer-events-none absolute -left-40 top-10 h-[420px] w-[420px] rounded-full bg-[radial-gradient(closest-side,rgba(4,221,166,0.12),transparent)] blur-2xl"
            />

            <div className="relative mx-auto grid w-full max-w-[1000px] grid-cols-1 gap-10 px-4 sm:px-8 lg:grid-cols-[0.85fr_1.4fr] lg:gap-12 lg:px-6 xl:max-w-[1080px] xl:gap-16 2xl:max-w-[1280px]">
                <div className="lg:sticky lg:top-24 lg:self-start">
                    <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: smooth }}
                        className="bg-brand-gradient font-inter inline-flex h-[24px] items-center rounded-full px-[16px] text-[11.5px] font-medium text-[#0f3d34] xl:h-[26px] xl:text-[12.5px] 2xl:h-[28px] 2xl:text-[13.5px]"
                    >
                        FAQ
                    </motion.span>

                    <motion.h2
                        variants={words}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-60px" }}
                        className="font-clash mt-3 text-[30px] leading-[1.12] tracking-[-0.01em] text-[#1d3a40] sm:text-[36px] lg:text-[36px] xl:text-[40px] 2xl:text-[48px]"
                    >
                        <span className="block">
                            {"Frequently Asked".split(" ").map((w, i) => (
                                <motion.span key={i} variants={word} className="mr-[0.25em] inline-block font-normal">
                                    {w}
                                </motion.span>
                            ))}
                        </span>
                        <motion.span variants={word} className="text-brand-gradient inline-block font-medium">
                            Questions
                        </motion.span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.1, delay: 0.4, ease: smooth }}
                        className="font-inter mt-4 max-w-[380px] text-[14px] leading-[1.7] text-[#5a6470] xl:text-[15px] 2xl:max-w-[440px] 2xl:text-[16.5px]"
                    >
                        Everything you need to know about publishing with us, from your first upload to your first royalty payment.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: 0.55, ease: smooth }}
                        className="relative mt-8 overflow-hidden rounded-[18px] bg-[#0f3d34] p-6 xl:p-7"
                    >
                        <motion.div
                            aria-hidden
                            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                            className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[radial-gradient(closest-side,rgba(4,221,166,0.55),transparent)]"
                        />
                        <h3 className="font-clash relative text-[19px] font-medium text-white xl:text-[21px] 2xl:text-[24px]">
                            Still have questions?
                        </h3>
                        <p className="font-inter relative mt-2 max-w-[300px] text-[13px] leading-[1.65] text-white/70 xl:text-[14px] 2xl:text-[15px]">
                            Our publishing team is happy to walk you through every step. Get an answer within one business day.
                        </p>
                        <a
                            href="#contact"
                            className="font-inter bg-brand-gradient group relative mt-5 inline-flex h-[42px] items-center gap-2 rounded-full pl-[5px] pr-5 text-[14px] font-medium text-[#0f3d34] shadow-[0_8px_22px_rgba(4,221,166,0.3)] transition-transform duration-500 hover:scale-[1.04] xl:h-[46px] xl:text-[15px]"
                        >
                            <span className="transition-transform duration-500 group-hover:rotate-45">
                                <ArrowCircle className="h-[32px] w-[32px] xl:h-[36px] xl:w-[36px]" />
                            </span>
                            Contact Us
                        </a>
                    </motion.div>
                </div>

                <motion.ul
                    variants={list}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-60px" }}
                    className="flex flex-col gap-3 sm:gap-4"
                >
                    {faqs.map((f, i) => (
                        <FAQItem key={f.q} q={f.q} a={f.a} open={open === i} onToggle={() => setOpen(open === i ? null : i)} />
                    ))}
                </motion.ul>
            </div>
        </section>
    );
};

export default ReviewsFAQ;