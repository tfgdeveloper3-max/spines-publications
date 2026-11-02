import { useEffect, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, useReducedMotion, type Easing } from "framer-motion";
import { readThankYouState, safeFromPath, type ThankYouState } from "../lib/thankYou";


const smooth: Easing = [0.16, 1, 0.3, 1];

export default function ThankYou() {
    const location = useLocation();
    const navigate = useNavigate();
    const reduceMotion = useReducedMotion();

    const data = useMemo<ThankYouState>(
        () => (location.state as ThankYouState | null) ?? readThankYouState() ?? {},
        [location.state]
    );
    const from = safeFromPath(data.from);
    const firstName = data.name?.trim().split(/\s+/)[0];

    useEffect(() => {
        window.scrollTo(0, 0);
        const prevTitle = document.title;
        document.title = "Thank You | Spine Publications";
        const robots = document.createElement("meta");
        robots.name = "robots";
        robots.content = "noindex, nofollow";
        document.head.appendChild(robots);
        return () => {
            document.title = prevTitle;
            robots.remove();
        };
    }, []);

    const goBack = () => {
        if (from) navigate(from);
        else if (window.history.length > 1) navigate(-1);
        else navigate("/");
    };

    const rise = (delay: number) =>
        reduceMotion
            ? {}
            : {
                initial: { opacity: 0, y: 16 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.8, delay, ease: smooth },
            };

    return (
        <main className="relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-16 sm:px-6">
            <div className="hero-bg" aria-hidden="true">
                <div className="hero-bg__base" />
                <div className="hero-bg__stripes" />
            </div>

            <motion.div {...rise(0.1)}>
                <Link to="/" aria-label="Spine Publications home">
                    <img
                        src="/images/Logo.png"
                        alt="Spine Publications"
                        className="h-[42px] w-auto rounded-full bg-white/70 px-3 py-1.5 backdrop-blur-sm xl:h-[48px]"
                    />
                </Link>
            </motion.div>

            <motion.section
                aria-labelledby="thank-you-title"
                className="relative mt-8 w-full max-w-[600px] rounded-[24px] bg-white px-6 py-10 text-center shadow-[0_40px_100px_rgba(15,61,52,0.18)] sm:px-10 sm:py-12 2xl:max-w-[680px]"
                initial={reduceMotion ? false : { opacity: 0, y: 50, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: smooth }}
            >
                <motion.span
                    className="bg-brand-gradient mx-auto flex h-[84px] w-[84px] items-center justify-center rounded-full shadow-[0_14px_36px_rgba(4,221,166,0.42)]"
                    initial={reduceMotion ? false : { scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8, delay: 0.25, ease: smooth }}
                >
                    <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none" stroke="#0f3d34" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <motion.path
                            d="M5 12.5l4.5 4.5L19 7.5"
                            initial={reduceMotion ? false : { pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.6, delay: 0.7 }}
                        />
                    </svg>
                </motion.span>

                <motion.h1
                    id="thank-you-title"
                    className="font-clash mt-7 text-[30px] font-semibold leading-[1.15] text-[#141414] sm:text-[36px] xl:text-[40px]"
                    {...rise(0.45)}
                >
                    {firstName ? `Thank you, ${firstName}!` : "Thank you!"}
                </motion.h1>

                <motion.p
                    className="font-inter mx-auto mt-3 max-w-[440px] text-[15px] leading-[1.7] text-[#4a4f57] xl:text-[16px]"
                    {...rise(0.55)}
                >
                    Your request has reached our publishing team. A publishing expert will contact you within one business day
                    {data.email ? (
                        <>
                            {" "}at <strong className="font-semibold text-[#141414]">{data.email}</strong>.
                        </>
                    ) : (
                        "."
                    )}
                </motion.p>

                {data.plan && (
                    <motion.div
                        className="mx-auto mt-6 flex max-w-[420px] items-center justify-between gap-3 rounded-[12px] border border-[#40C1AC]/40 bg-[linear-gradient(135deg,#effcf8_0%,#ffffff_70%)] px-4 py-3 text-left"
                        {...rise(0.65)}
                    >
                        <div className="min-w-0">
                            <p className="font-inter text-[12px] font-medium text-[#13866a]">Selected plan</p>
                            <p className="font-clash mt-0.5 truncate text-[17px] font-semibold text-[#141414] xl:text-[18px]">{data.plan.name}</p>
                            {data.plan.formats && <p className="font-inter truncate text-[12px] text-[#5a5f66]">{data.plan.formats}</p>}
                        </div>
                        <span className="font-clash shrink-0 text-[20px] font-semibold text-[#141414] xl:text-[22px]">
                            ${data.plan.price.toLocaleString("en-US")}
                        </span>
                    </motion.div>
                )}

                <motion.div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center" {...rise(0.75)}>
                    <motion.button
                        type="button"
                        onClick={goBack}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        className="font-inter bg-brand-gradient group flex h-[52px] items-center justify-center gap-2.5 rounded-full px-7 text-[15px] font-semibold text-[#0f3d34] shadow-[0_10px_28px_rgba(4,221,166,0.38)] outline-none focus-visible:ring-4 focus-visible:ring-[#40C1AC]/30"
                    >
                        <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform duration-500 group-hover:-translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M19 12H5M11 18l-6-6 6-6" />
                        </svg>
                        Back to Previous Page
                    </motion.button>

                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                        <Link
                            to="/"
                            className="font-inter flex h-[52px] items-center justify-center gap-2.5 rounded-full border border-[#e3e6ea] bg-white px-7 text-[15px] font-semibold text-[#141414] transition-colors duration-300 hover:border-[#40C1AC] hover:bg-[#effcf8] hover:text-[#13866a] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#40C1AC]/30"
                        >
                            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M3 11l9-7 9 7" />
                                <path d="M5 10v10h14V10" />
                            </svg>
                            Back to Home
                        </Link>
                    </motion.div>
                </motion.div>
            </motion.section>
        </main>
    );
}