import { useEffect, useRef, useState, type MouseEvent } from "react";
import { motion, useScroll, useSpring, type Easing, type Variants } from "framer-motion";
import { CONTACT_ADDRESS, CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_HREF, type LegalBlock, type LegalDoc } from "./Legalcontent";

const smooth: Easing = [0.16, 1, 0.3, 1];

const words: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } },
};

const word: Variants = {
    hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
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

const scrollToId = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
};

const Block = ({ block }: { block: LegalBlock }) => {
    if (typeof block === "string") {
        return <p className="font-inter text-[14px] leading-[1.85] text-[#4a4f57] xl:text-[15px] 2xl:text-[16.5px]">{block}</p>;
    }
    return (
        <ul className="flex flex-col gap-3">
            {block.list.map((item, i) => (
                <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -14 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.7, delay: i * 0.06, ease: smooth }}
                    className="flex items-start gap-3 rounded-[12px] border border-[#eef0f2] bg-[#fbfcfc] p-4 transition-colors duration-300 hover:border-[#40C1AC]/40 hover:bg-[#f3fcf9]"
                >
                    <span className="bg-brand-gradient mt-[3px] flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-full text-[#0f3d34]">
                        <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12.5l4.5 4.5L19 7.5" />
                        </svg>
                    </span>
                    <p className="font-inter text-[14px] leading-[1.75] text-[#4a4f57] xl:text-[15px] 2xl:text-[16.5px]">
                        {item.label && <span className="font-semibold text-[#141414]">{item.label}: </span>}
                        {item.text}
                    </p>
                </motion.li>
            ))}
        </ul>
    );
};

const LegalPage = ({ doc }: { doc: LegalDoc }) => {
    const [active, setActive] = useState(doc.sections[0]?.id ?? "");
    const articleRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: articleRef, offset: ["start 120px", "end end"] });
    const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });

    useEffect(() => {
        const els = doc.sections.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
        const io = new IntersectionObserver(
            (entries) => {
                const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
                if (visible[0]) setActive(visible[0].target.id);
            },
            { rootMargin: "-25% 0px -65% 0px" }
        );
        els.forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, [doc]);

    return (
        <>
            <section className="relative isolate w-full overflow-hidden bg-white">
                <div className="hero-bg">
                    <div className="hero-bg__base" />
                    <div className="hero-bg__stripes" />
                    <div className="hero-bg__fade" />
                </div>

                <div className="mx-auto flex w-full max-w-[1100px] flex-col items-center px-5 pb-14 pt-[120px] text-center sm:px-8 sm:pb-16 sm:pt-[150px] lg:pb-20 lg:pt-[170px] 2xl:max-w-[1280px] 2xl:pb-24 2xl:pt-[200px]">
                    <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.15, ease: smooth }}
                        className="bg-brand-gradient font-inter inline-flex h-[26px] items-center rounded-full px-[18px] text-[12px] font-medium text-[#0f3d34] xl:h-[28px] xl:text-[13px]"
                    >
                        {doc.badge}
                    </motion.span>

                    <motion.h1 variants={words} initial="hidden" animate="show" className="font-clash mt-4 leading-[1.05] tracking-[-0.015em]">
                        <span className="block text-[38px] sm:text-[52px] lg:text-[60px] xl:text-[68px] 2xl:text-[80px]">
                            <SplitWords text={doc.titleBefore} className="font-normal text-[#1c1c1c]" />{" "}
                            <SplitWords text={doc.titleAccent} className="text-brand-gradient font-semibold" />
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, delay: 0.8, ease: smooth }}
                        className="font-inter mt-5 max-w-[620px] text-[14px] leading-[1.7] text-[#4a4f57] sm:text-[15px] lg:text-[16.5px] xl:max-w-[680px] xl:text-[17.5px] 2xl:max-w-[780px] 2xl:text-[19px]"
                    >
                        {doc.intro}
                    </motion.p>
                </div>
            </section>

            <section className="relative w-full bg-white pb-20 sm:pb-24 lg:pb-28 2xl:pb-36">
                <div className="mx-auto grid w-full max-w-[1100px] grid-cols-1 gap-10 px-5 sm:px-8 lg:grid-cols-[250px_1fr] lg:gap-14 xl:grid-cols-[270px_1fr] xl:gap-16 2xl:max-w-[1280px] 2xl:grid-cols-[300px_1fr]">
                    <aside className="lg:sticky lg:top-28 lg:self-start">
                        <details className="group rounded-[16px] border border-[#eceef1] bg-white p-4 shadow-[0_6px_24px_rgba(20,20,40,0.04)] lg:hidden" >
                            <summary className="font-clash flex cursor-pointer list-none items-center justify-between text-[16px] font-semibold text-[#141414] [&::-webkit-details-marker]:hidden">
                                On this page
                                <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform duration-300 group-open:rotate-180" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M6 9l6 6 6-6" />
                                </svg>
                            </summary>
                            <ol className="mt-3 flex flex-col gap-1">
                                {doc.sections.map((s, i) => (
                                    <li key={s.id}>
                                        <a
                                            href={`#${s.id}`}
                                            onClick={(e) => scrollToId(e, s.id)}
                                            className="font-inter flex gap-2 rounded-[8px] px-2 py-1.5 text-[13.5px] text-[#4a4f57] hover:bg-[#f3fcf9] hover:text-[#13866a]"
                                        >
                                            <span className="text-[#1fc79d]">{String(i + 1).padStart(2, "0")}</span>
                                            {s.title}
                                        </a>
                                    </li>
                                ))}
                            </ol>
                        </details>

                        <motion.nav
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1.2, delay: 0.6, ease: smooth }}
                            aria-label="Table of contents"
                            className="hidden rounded-[18px] border border-[#eceef1] bg-white p-5 shadow-[0_10px_30px_rgba(20,20,40,0.05)] lg:block xl:p-6"
                        >
                            <p className="font-clash text-[16px] font-semibold text-[#141414] xl:text-[17px]">On this page</p>
                            <div className="relative mt-3 h-[3px] overflow-hidden rounded-full bg-[#eef0f2]">
                                <motion.span style={{ scaleX: progress }} className="bg-brand-gradient absolute inset-0 origin-left rounded-full" />
                            </div>
                            <ol className="mt-4 flex flex-col gap-0.5">
                                {doc.sections.map((s, i) => {
                                    const isActive = active === s.id;
                                    return (
                                        <li key={s.id} className="relative">
                                            {isActive && (
                                                <motion.span
                                                    layoutId={`legal-toc-${doc.titleAccent}`}
                                                    transition={{ duration: 0.5, ease: smooth }}
                                                    className="absolute inset-0 rounded-[10px] bg-[#effcf8] ring-1 ring-[#40C1AC]/30"
                                                />
                                            )}
                                            <a
                                                href={`#${s.id}`}
                                                onClick={(e) => scrollToId(e, s.id)}
                                                aria-current={isActive ? "location" : undefined}
                                                className={`font-inter relative flex gap-2.5 rounded-[10px] px-3 py-2 text-[13px] leading-[1.45] transition-colors duration-300 xl:text-[13.5px] 2xl:text-[14.5px] ${isActive ? "font-semibold text-[#0f3d34]" : "text-[#5a5f66] hover:text-[#141414]"
                                                    }`}
                                            >
                                                <span className={isActive ? "text-[#13866a]" : "text-[#9aa0a8]"}>{String(i + 1).padStart(2, "0")}</span>
                                                {s.title}
                                            </a>
                                        </li>
                                    );
                                })}
                            </ol>
                        </motion.nav>
                    </aside>

                    <div ref={articleRef} className="flex flex-col gap-12 sm:gap-14 2xl:gap-16">
                        {doc.sections.map((s, i) => (
                            <motion.article
                                key={s.id}
                                id={s.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{ duration: 1.1, ease: smooth }}
                                className="scroll-mt-28"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="font-clash text-brand-gradient text-[15px] font-semibold xl:text-[16px]">{String(i + 1).padStart(2, "0")}</span>
                                    <span className="h-px flex-1 bg-[linear-gradient(90deg,rgba(64,193,172,0.4),transparent)]" />
                                </div>
                                <h2 className="font-clash mt-3 text-[23px] font-medium leading-[1.25] text-[#141414] sm:text-[26px] xl:text-[29px] 2xl:text-[34px]">{s.title}</h2>
                                <div className="mt-4 flex flex-col gap-4 xl:mt-5">
                                    {s.body.map((b, bi) => (
                                        <Block key={bi} block={b} />
                                    ))}
                                </div>
                            </motion.article>
                        ))}

                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 1.2, ease: smooth }}
                            className="bg-brand-gradient relative isolate overflow-hidden rounded-[20px] p-7 shadow-[0_24px_60px_rgba(4,221,166,0.25)] sm:p-9 xl:p-10"
                        >
                            <motion.span
                                aria-hidden
                                animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0.6, 0.35] }}
                                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                                className="pointer-events-none absolute -right-16 -top-16 -z-10 h-56 w-56 rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.5),transparent)]"
                            />
                            <h3 className="font-clash text-[22px] font-semibold text-[#0f1f1b] sm:text-[26px] xl:text-[28px]">Questions about this policy?</h3>
                            <p className="font-inter mt-2 max-w-[520px] text-[14px] leading-[1.65] text-[#0f3d34] xl:text-[15px]">
                                Our team is happy to help. Reach out and we'll get back to you within one business day.
                            </p>
                            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                                <a
                                    href={`mailto:${CONTACT_EMAIL}`}
                                    className="font-inter inline-flex items-center gap-2 rounded-full bg-[#0f3d34] px-5 py-3 text-[14px] font-medium text-white transition-transform duration-500 hover:scale-[1.03]"
                                >
                                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                                        <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4.2l-8 5-8-5V6l8 5 8-5v2.2z" />
                                    </svg>
                                    {CONTACT_EMAIL}
                                </a>
                                <a
                                    href={CONTACT_PHONE_HREF}
                                    className="font-inter inline-flex items-center gap-2 rounded-full bg-white/50 px-5 py-3 text-[14px] font-medium text-[#0f3d34] ring-1 ring-white/70 transition-all duration-500 hover:scale-[1.03] hover:bg-white/70"
                                >
                                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                                        <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2z" />
                                    </svg>
                                    {CONTACT_PHONE}
                                </a>
                            </div>
                            <p className="font-inter mt-5 text-[12.5px] text-[#0f3d34]/80 xl:text-[13.5px]">{CONTACT_ADDRESS}</p>
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default LegalPage;