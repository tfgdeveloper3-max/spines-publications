import { useState, type ReactNode } from "react";
import { motion, type Easing, type Variants } from "framer-motion";

const smooth: Easing = [0.16, 1, 0.3, 1];

const RobotIcon = () => (
    <svg viewBox="0 0 48 48" fill="none" className="h-full w-full" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 5v4" stroke="currentColor" />
        <circle cx="24" cy="4" r="1.6" stroke="currentColor" />
        <rect x="12" y="9" width="24" height="18" rx="4" stroke="currentColor" />
        <circle cx="19" cy="17" r="3.2" stroke="currentColor" />
        <circle cx="29" cy="17" r="3.2" stroke="currentColor" />
        <path d="M20 23h8" stroke="var(--icon-accent)" />
        <path d="M22 21.5v3M24 21.5v3M26 21.5v3" stroke="var(--icon-accent)" />
        <path d="M12 17h-2.5M36 17h2.5" stroke="currentColor" />
        <path d="M17 27v2M31 27v2" stroke="currentColor" />
        <path d="M10 44v-9a6 6 0 0 1 6-6h16a6 6 0 0 1 6 6v9" stroke="currentColor" />
        <path d="M10 44h28" stroke="currentColor" />
    </svg>
);

const ChipIcon = () => (
    <svg viewBox="0 0 48 48" fill="none" className="h-full w-full" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="6" width="40" height="34" rx="2.5" stroke="currentColor" />
        <path d="M4 12h40" stroke="currentColor" />
        <path d="M33 9h1.5M37 9h1.5M41 9h.5" stroke="currentColor" />
        <rect x="18" y="18" width="12" height="12" rx="1.5" stroke="currentColor" />
        <rect x="21.5" y="21.5" width="5" height="5" rx="0.8" stroke="currentColor" />
        <path d="M18 21h-5l-2-2M18 24h-8M18 27h-5l-2 2" stroke="var(--icon-accent)" />
        <path d="M30 21h5l2-2M30 24h8M30 27h5l2 2" stroke="var(--icon-accent)" />
        <circle cx="10" cy="19" r="0.9" fill="var(--icon-accent)" stroke="none" />
        <circle cx="38" cy="19" r="0.9" fill="var(--icon-accent)" stroke="none" />
        <circle cx="10" cy="29" r="0.9" fill="var(--icon-accent)" stroke="none" />
        <circle cx="38" cy="29" r="0.9" fill="var(--icon-accent)" stroke="none" />
    </svg>
);

const BrainGearIcon = () => (
    <svg viewBox="0 0 48 48" fill="none" className="h-full w-full" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path
            d="M22 7c-3 0-5.5 2-6 4.8-3 .3-5.5 2.8-5.5 6 0 1 .2 1.8.6 2.6C8.8 21.6 7.5 24 7.5 26.5c0 3 2 5.6 4.8 6.3.2 3.4 3 6.2 6.5 6.2 1.4 0 2.6-.4 3.2-1V7.7C22 7.3 22 7 22 7z"
            stroke="currentColor"
        />
        <path d="M14 15.5c1.5 0 3 1 3.5 2.5M11.5 26c2 0 3.5-1 4-2.5M15 33c1.5-.5 3-2 3.5-3.5" stroke="var(--icon-accent)" />
        <path d="M17 22h5M17.5 29h4.5" stroke="var(--icon-accent)" />
        <path
            d="M33 15.5l1.3-2.8 2.6 1.1-.4 3a8.5 8.5 0 0 1 2.2 2.2l3-.4 1.1 2.6-2.8 1.3a8.5 8.5 0 0 1 0 3.1l2.8 1.3-1.1 2.6-3-.4a8.5 8.5 0 0 1-2.2 2.2l.4 3-2.6 1.1-1.3-2.8a8.5 8.5 0 0 1-3.1 0l-1.3 2.8-2.6-1.1.4-3a8.5 8.5 0 0 1-2.2-2.2L22 28.4"
            stroke="currentColor"
        />
        <path d="M22 19.4l1.6.2a8.5 8.5 0 0 1 2.2-2.2l-.4-3 2.6-1.1 1.3 2.8a8.5 8.5 0 0 1 3.7-.2" stroke="currentColor" />
        <circle cx="31.5" cy="24" r="3.6" stroke="currentColor" />
    </svg>
);

type Service = { icon: ReactNode; title: string; text: string; href: string };

const services: Service[] = [
    {
        icon: <RobotIcon />,
        title: "Ghostwriting & Manuscript",
        text: "Turn your ideas into a complete manuscript with expert writers who capture your voice and story.",
        href: "#ghostwriting",
    },
    {
        icon: <ChipIcon />,
        title: "Editing & Proofreading",
        text: "Polish every page with professional editors who refine grammar, flow, and consistency.",
        href: "#editing",
    },
    {
        icon: <BrainGearIcon />,
        title: "Cover Design & Illustration",
        text: "Eye-catching, genre-perfect covers and custom illustrations that make readers stop and look.",
        href: "#cover-design",
    },
    {
        icon: <RobotIcon />,
        title: "Formatting & Typesetting",
        text: "Clean, professional interior layouts ready for print, eBook, and every major retailer.",
        href: "#formatting",
    },
    {
        icon: <BrainGearIcon />,
        title: "Publishing & Distribution",
        text: "Launch your book worldwide on Amazon, Barnes & Noble, Apple Books, and many more stores.",
        href: "#distribution",
    },
    {
        icon: <BrainGearIcon />,
        title: "Marketing & PR Campaigns",
        text: "Reach the right readers with targeted ads, PR outreach, and campaigns that drive real sales.",
        href: "#marketing",
    },
];

const headingWords: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const headingWord: Variants = {
    hidden: { opacity: 0, y: 26, filter: "blur(8px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1.1, ease: smooth } },
};

const grid: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.25 } },
};

const card: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.96 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 1.1, ease: smooth } },
};

const ServiceCard = ({
    service,
    active,
    onActivate,
}: {
    service: Service;
    active: boolean;
    onActivate: () => void;
}) => (
    <motion.a
        href={service.href}
        variants={card}
        onMouseEnter={onActivate}
        onFocus={onActivate}
        onTouchStart={onActivate}
        whileHover={{ y: -6 }}
        transition={{ duration: 0.5, ease: smooth }}
        className={`group relative isolate flex flex-col overflow-hidden rounded-[12px] p-6 outline-none transition-shadow duration-500 focus-visible:ring-2 focus-visible:ring-[#40C1AC] focus-visible:ring-offset-2 sm:p-7 xl:p-8 2xl:p-10 ${active
                ? "shadow-[0_18px_40px_rgba(4,221,166,0.28)]"
                : "bg-white shadow-[0_2px_0_rgba(0,0,0,0.04),0_6px_18px_rgba(20,20,40,0.07)] ring-1 ring-[#eceef1]"
            }`}
    >
        {active && (
            <motion.span
                layoutId="service-active-bg"
                transition={{ duration: 0.6, ease: smooth }}
                className="bg-brand-gradient absolute inset-0 -z-10 rounded-[12px]"
            />
        )}

        <motion.span
            animate={active ? { scale: 1.06, rotate: [0, -6, 4, 0] } : { scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: smooth }}
            className={`block h-[42px] w-[42px] transition-colors duration-500 xl:h-[46px] xl:w-[46px] 2xl:h-[54px] 2xl:w-[54px] ${active ? "text-[#2f62d8]" : "text-[#2b2f36]"
                }`}
            style={{ ["--icon-accent" as string]: active ? "#0aa57f" : "#2fbf98" }}
        >
            {service.icon}
        </motion.span>

        <h3
            className={`font-clash mt-6 text-[15.5px] font-semibold leading-[1.3] transition-colors duration-500 xl:mt-7 xl:text-[17px] 2xl:text-[19px] ${active ? "text-[#11201c]" : "text-[#20c39c]"
                }`}
        >
            {service.title}
        </h3>

        <p
            className={`font-inter mt-3 text-[12.5px] leading-[1.75] transition-colors duration-500 xl:text-[13.5px] 2xl:text-[15px] ${active ? "text-[#103a31]" : "text-[#4b5058]"
                }`}
        >
            {service.text}
        </p>

        <span
            className={`font-inter mt-5 inline-flex items-center gap-1.5 text-[12.5px] font-medium transition-colors duration-500 xl:mt-6 xl:text-[13.5px] 2xl:text-[15px] ${active ? "text-[#11201c]" : "text-[#20c39c]"
                }`}
        >
            Read More
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-[12px] w-[12px] transition-transform duration-500 group-hover:translate-x-1.5"
            >
                <path d="M9 6l6 6-6 6" />
            </svg>
        </span>
    </motion.a>
);

const ServicesGrid = () => {
    const [active, setActive] = useState(1);

    return (
        <section id="services" className="relative w-full overflow-hidden bg-white py-16 sm:py-20 lg:py-24 2xl:py-28">
            <div className="mx-auto w-full max-w-[1000px] px-5 sm:px-8 lg:px-6 xl:max-w-[1080px] 2xl:max-w-[1280px]">
                <motion.h2
                    variants={headingWords}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-60px" }}
                    className="font-clash text-center text-[28px] leading-[1.15] tracking-[-0.01em] text-[#2b3d44] sm:text-[34px] lg:text-[38px] xl:text-[42px] 2xl:text-[50px]"
                >
                    <motion.span variants={headingWord} className="mr-[0.25em] inline-block font-normal">
                        Bring
                    </motion.span>
                    <motion.span variants={headingWord} className="text-brand-gradient mr-[0.25em] inline-block font-semibold">
                        Your
                    </motion.span>
                    <motion.span variants={headingWord} className="text-brand-gradient mr-[0.25em] inline-block font-semibold">
                        Book
                    </motion.span>
                    <motion.span variants={headingWord} className="mr-[0.25em] inline-block font-normal">
                        to
                    </motion.span>
                    <motion.span variants={headingWord} className="inline-block font-normal">
                        Life
                    </motion.span>
                </motion.h2>

                <motion.div
                    variants={grid}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-60px" }}
                    className="mt-8 grid grid-cols-1 gap-5 sm:mt-10 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-6 xl:gap-7 2xl:gap-8"
                >
                    {services.map((s, i) => (
                        <ServiceCard key={s.title} service={s} active={active === i} onActivate={() => setActive(i)} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default ServicesGrid;