import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, animate, motion, useInView, type Easing, type Variants } from "framer-motion";
import QuoteModal, { type QuotePlan } from "../QuoteModal";

const smooth: Easing = [0.16, 1, 0.3, 1];

type Feature = { text: string; tip: string; plus?: boolean };

type Plan = {
    name: string;
    price: number;
    formats: string;
    features: Feature[];
    image: string;
    imageAlt: string;
    popular?: boolean;
};

const plans: Plan[] = [
    {
        name: "Essentials",
        price: 1499,
        formats: "Paperback & eBook Publishing",
        features: [
            { text: "Complete Paperback & Digital eBook Publishing", tip: "Your book published in paperback and digital eBook formats." },
            { text: "Custom Cover Design & Interior Page Formatting", tip: "Custom cover artwork and professionally formatted interior pages." },
            { text: "Professional Light Copyediting Support", tip: "Light copyediting support for grammar, spelling, and clarity." },
            { text: "Strategic Book Discovery & Launch Strategy Roadmap", tip: "A roadmap to help readers discover your book and support its launch." },
            { text: "Exclusive Access to the Spine Publications Author Learning Center", tip: "Access learning resources designed to support your author journey." },
        ],
        image: "/images/pricing-essentials.png",
        imageAlt: "Laptop showing a publishing dashboard next to a stack of books",
    },
    {
        name: "Balance",
        price: 3294,
        formats: "Hardcover, Paperback & eBook Publishing",
        features: [
            { text: "Everything included in Essentials, plus:", plus: true, tip: "Includes all Essentials features, along with the additional features below." },
            { text: "Premium Hardcover Edition Publishing", tip: "Add a premium hardcover edition to your publishing package." },
            { text: "Professional Front & Back Cover Copy Refinement", tip: "Refine your front and back cover copy with professional support." },
            { text: "Library of Congress Control Number (LCCN) Registration", tip: "Support with Library of Congress Control Number registration." },
            { text: "Booksellers Return Program for Bookstore Pitching", tip: "Support for pitching your book to booksellers through a return program." },
            { text: "Fully Customized Author Website", tip: "A customized website to present you and your books online." },
        ],
        image: "/images/pricing-balance.png",
        imageAlt: "A collection of book covers representing a published author catalogue",
        popular: true,
    },
    {
        name: "Momentum",
        price: 7589,
        formats: "Hardcover, Paperback, Audiobook & eBook Publishing",
        features: [
            { text: "Everything included in Balance, plus:", plus: true, tip: "Includes all Balance features, along with the additional features below." },
            { text: "Complete Audiobook Production & Distribution Support", tip: "Support for audiobook production and distribution." },
            { text: "Comprehensive Line Proofreading & Polish", tip: "A detailed proofreading pass to polish the manuscript." },
            { text: "Official US Copyright Registration Service", tip: "Support with official U.S. copyright registration." },
            { text: "Custom Press Release Creation & Media Distribution", tip: "A custom press release prepared for media distribution." },
            { text: "Guaranteed Featured Podcast Interview", tip: "A featured podcast interview to introduce you and your book to listeners." },
            { text: "Complete Audience Builder Marketing Starter Kit", tip: "Starter resources to help build and engage your readership." },
        ],
        image: "/images/pricing-momentum.png",
        imageAlt: "A book publishing workspace with a book, laptop, and desk lamp",
    },
];

const words: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
};

const word: Variants = {
    hidden: { opacity: 0, y: 26, filter: "blur(8px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1.1, ease: smooth } },
};

const cards: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.18, delayChildren: 0.2 } },
};

const cardV: Variants = {
    hidden: { opacity: 0, y: 70, scale: 0.96 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 1.3, ease: smooth } },
};

const list: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.07, delayChildren: 0.6 } },
};

const listItem: Variants = {
    hidden: { opacity: 0, x: -14 },
    show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: smooth } },
};

const Price = ({ value }: { value: number }) => {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: "-40px" });
    const [v, setV] = useState(0);

    useEffect(() => {
        if (!inView) return;
        const c = animate(0, value, { duration: 2, delay: 0.4, ease: smooth, onUpdate: (n) => setV(Math.round(n)) });
        return () => c.stop();
    }, [inView, value]);

    return <span ref={ref}>${v.toLocaleString("en-US")}</span>;
};

const Tip = ({ text }: { text: string }) => {
    const [open, setOpen] = useState(false);
    const id = useId();

    return (
        <span className="relative ml-1 inline-flex align-middle">
            <button
                type="button"
                aria-label="More info"
                aria-describedby={open ? id : undefined}
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
                onFocus={() => setOpen(true)}
                onBlur={() => setOpen(false)}
                onClick={() => setOpen((o) => !o)}
                className="flex h-[13px] w-[13px] items-center justify-center rounded-full bg-[#1c2530] text-[8.5px] font-bold leading-none text-white outline-none transition-colors hover:bg-[#1f9c80] focus-visible:ring-2 focus-visible:ring-[#40C1AC]/60 xl:h-[14px] xl:w-[14px] xl:text-[9px]"
            >
                ?
            </button>
            <AnimatePresence>
                {open && (
                    <motion.span
                        id={id}
                        role="tooltip"
                        initial={{ opacity: 0, y: 6, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.97 }}
                        transition={{ duration: 0.25, ease: smooth }}
                        className="font-inter pointer-events-none absolute bottom-[calc(100%+8px)] left-1/2 z-30 w-[210px] -translate-x-1/2 rounded-[8px] bg-[#16302b] px-3 py-2 text-[11.5px] font-normal leading-[1.5] text-white shadow-[0_10px_30px_rgba(0,0,0,0.2)]"
                    >
                        {text}
                        <span className="absolute left-1/2 top-full -translate-x-1/2 border-[5px] border-transparent border-t-[#16302b]" />
                    </motion.span>
                )}
            </AnimatePresence>
        </span>
    );
};

const PlanCard = ({ plan, onSelect }: { plan: Plan; onSelect: (plan: Plan) => void }) => (
    <motion.article
        variants={cardV}
        whileHover={{ y: -8 }}
        transition={{ duration: 0.5, ease: smooth }}
        className="group relative flex h-fit flex-col rounded-[8px] border border-[#e3e6ea] bg-white p-3 shadow-[0_2px_10px_rgba(20,20,40,0.04)] transition-[border-color,box-shadow] duration-500 hover:border-[#40C1AC]/50 hover:shadow-[0_24px_50px_rgba(64,193,172,0.16)] sm:p-4 xl:p-5"
    >
        {plan.popular && (
            <span className="bg-brand-gradient font-inter absolute -top-3 right-4 rounded-full px-3 py-1 text-[10.5px] font-semibold text-[#0f3d34] shadow-[0_6px_16px_rgba(4,221,166,0.35)] xl:text-[11.5px]">
                Most Popular
            </span>
        )}

        <div className="px-1 pt-2">
            <h3 className="font-clash text-brand-gradient w-fit text-[22px] font-medium leading-none xl:text-[25px] 2xl:text-[30px]">
                {plan.name}
            </h3>
            <p className="font-clash mt-3 text-[22px] font-semibold leading-none text-[#1c2530] xl:text-[25px] 2xl:text-[30px]">
                <Price value={plan.price} />
            </p>
            <p className="font-inter mt-2.5 text-[10.5px] text-[#3d4652] xl:text-[11.5px] 2xl:text-[13px]">{plan.formats}</p>
        </div>

        <div className="mx-1 my-4 h-px bg-[#e3e6ea] xl:my-5" />

        <motion.ul
            variants={list}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            className="flex flex-col gap-3 px-1 xl:gap-3.5"
        >
            {plan.features.map((f) => (
                <motion.li
                    key={f.text}
                    variants={listItem}
                    className={`font-inter text-[12.5px] leading-[1.5] text-[#2d343c] xl:text-[13.5px] 2xl:text-[15px] ${f.plus ? "font-semibold italic" : ""}`}
                >
                    {f.text}
                    <Tip text={f.tip} />
                </motion.li>
            ))}
        </motion.ul>

        <div className="mx-1 my-4 h-px bg-[#e3e6ea] xl:my-5" />

        <div className="px-1">
            <button
                type="button"
                onClick={() => onSelect(plan)}
                aria-label={`Select the ${plan.name} plan`}
                className="font-inter bg-brand-gradient group/btn inline-flex h-[26px] w-[110px] items-center justify-between rounded-full pl-3 pr-2.5 text-[11px] font-semibold text-[#0f3d34] shadow-[0_6px_16px_rgba(4,221,166,0.28)] outline-none transition-[width,box-shadow] duration-500 hover:w-[128px] hover:shadow-[0_8px_22px_rgba(4,221,166,0.4)] focus-visible:ring-2 focus-visible:ring-[#40C1AC] focus-visible:ring-offset-2 xl:h-[30px] xl:w-[124px] xl:text-[12px] xl:hover:w-[142px] 2xl:h-[36px] 2xl:w-[150px] 2xl:text-[14px] 2xl:hover:w-[170px]"
            >
                Select Plan
                <svg viewBox="0 0 24 24" className="h-[12px] w-[12px] transition-transform duration-500 group-hover/btn:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 6l6 6-6 6" />
                </svg>
            </button>
        </div>

        <div className="relative mt-4 aspect-[186/93] overflow-hidden rounded-[4px] bg-[#eef3f1] xl:mt-5">
            <div className="absolute inset-4 xl:inset-5">
                <img
                    src={plan.image}
                    alt={plan.imageAlt}
                    loading="lazy"
                    draggable={false}
                    className="block h-full w-full select-none object-contain transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]"
                />
            </div>
        </div>
    </motion.article>
);

const PricingPlans = () => {
    const [quoteOpen, setQuoteOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<QuotePlan | null>(null);

    const handleSelect = (plan: Plan) => {
        setSelectedPlan({ name: plan.name, price: plan.price, formats: plan.formats });
        setQuoteOpen(true);
    };

    return (
        <>
            <section id="pricing" className="relative w-full overflow-hidden bg-white py-16 sm:py-20 lg:py-24 2xl:py-32">
                <div className="mx-auto w-full max-w-[920px] px-5 sm:px-8 lg:px-6 xl:max-w-[1040px] 2xl:max-w-[1240px]">
                    <div className="flex flex-col items-center text-center">
                        <motion.span
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: smooth }}
                            className="bg-brand-gradient font-inter mt-14 inline-flex h-[24px] items-center rounded-full px-[18px] text-[11.5px] font-medium text-[#0f3d34] xl:h-[26px] xl:text-[12.5px]"
                        >
                            Did You Know
                        </motion.span>

                        <motion.h2
                            variants={words}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, margin: "-60px" }}
                            className="font-clash mt-3 max-w-4xl text-[27px] leading-[1.15] tracking-[-0.01em] text-[#1d2a30] sm:text-[32px] lg:text-[34px] xl:text-[38px]"
                        >
                            {"Select the Ideal Spine Publications Package".split(" ").map((w, i) => (
                                <motion.span key={`package-a${i}`} variants={word} className="text-brand-gradient mr-[0.25em] inline-block font-semibold">
                                    {w}
                                </motion.span>
                            ))}
                            {"for Your Vision".split(" ").map((w, i, arr) => (
                                <motion.span key={`package-b${i}`} variants={word} className={`inline-block font-normal ${i < arr.length - 1 ? "mr-[0.25em]" : ""}`}>
                                    {w}
                                </motion.span>
                            ))}
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.1, delay: 0.3, ease: smooth }}
                            className="font-inter mt-3 max-w-[680px] text-[12.5px] leading-[1.7] text-[#5a5f66] xl:text-[14px] 2xl:text-[15px]"
                        >
                            We handle the heavy lifting and technical complexities of book creation so you can focus on writing, knowing your project is guided by industry professionals.
                        </motion.p>
                    </div>
                    <motion.div
                        id="pricing-plans"
                        variants={cards}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-60px" }}
                        className="mx-auto mt-8 grid max-w-[420px] grid-cols-1 items-start gap-6 sm:mt-10 md:max-w-none md:grid-cols-2 lg:grid-cols-3 lg:gap-4 xl:gap-5 2xl:gap-6"
                    >
                        {plans.map((p, i) => (
                            <div
                                key={p.name}
                                className={i === plans.length - 1 ? "md:col-span-2 md:mx-auto md:w-[calc(50%-12px)] lg:col-span-1 lg:w-auto" : ""}
                            >
                                <PlanCard plan={p} onSelect={handleSelect} />
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} plan={selectedPlan} />
        </>
    );
};

export default PricingPlans;