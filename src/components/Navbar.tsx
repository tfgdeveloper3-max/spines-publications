import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import QuoteModal from "./QuoteModal";

const links = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Pricing", href: "/pricing" },
    { label: "Reviews", href: "/reviews" },
    { label: "Contact", href: "/contact" },
];

const logoDefault = "/images/Logo.png";
const logoScrolled = "/images/ScrolledLogo.png";

export const ArrowCircle = ({ className = "h-[26px] w-[26px]" }: { className?: string }) => (
    <span className={`flex shrink-0 items-center justify-center rounded-full bg-white/35 ring-1 ring-white/60 ${className}`}>
        <svg className="h-1/2 w-1/2" viewBox="0 0 24 24" fill="none">
            <path d="M7 17L17 7M17 7H8M17 7V16" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    </span>
);

const idleLayer = {
    background: "rgba(255, 255, 255, 0.45)",
    backdropFilter: "blur(20px) saturate(160%)",
    WebkitBackdropFilter: "blur(20px) saturate(160%)",
};

const scrolledLayer = {
    background: "linear-gradient(135deg, rgba(38, 42, 46, 0.72) 0%, rgba(22, 25, 28, 0.66) 100%)",
    backdropFilter: "blur(40px) saturate(120%)",
    WebkitBackdropFilter: "blur(40px) saturate(120%)",
};

const ringMask = {
    WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
    WebkitMaskComposite: "xor",
    mask: "linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0)",
} as const;

const noise =
    "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [quoteOpen, setQuoteOpen] = useState(false);

    useEffect(() => {
        const onResize = () => {
            if (window.innerWidth >= 1024) setOpen(false);
        };
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        [logoDefault, logoScrolled].forEach((src) => {
            const img = new Image();
            img.src = src;
        });
    }, []);

    const logoHeight = scrolled
        ? "h-[32px] sm:h-[36px] lg:h-[40px] xl:h-[42px] 2xl:h-[48px]"
        : "h-[36px] sm:h-[40px] lg:h-[44px] xl:h-[48px] 2xl:h-[54px]";

    return (
        <>
            <header
                className={`fixed inset-x-0 top-0 z-50 px-3 transition-[padding] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] sm:px-5 animate__animated animate__fadeInDown animate__slow ${scrolled ? "pt-2 sm:pt-3 lg:pt-3" : "pt-3 sm:pt-5 lg:pt-6"
                    }`}
            >
                <nav
                    style={{
                        boxShadow: scrolled
                            ? "0 14px 40px rgba(0, 0, 0, 0.22), 0 2px 8px rgba(0, 0, 0, 0.12)"
                            : "0 4px 30px rgba(64, 193, 172, 0.12)",
                        transform: "translateZ(0)",
                    }}
                    className={`relative isolate mx-auto flex w-full max-w-[1240px] items-center justify-between rounded-[9999px] pl-4 pr-[6px] transition-[width,height,box-shadow] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] sm:pl-6 lg:pl-7 ${scrolled
                            ? "h-[50px] sm:h-[54px] lg:h-[56px] lg:w-[84%] xl:h-[58px] xl:w-[82%] 2xl:h-[64px]"
                            : "h-[52px] sm:h-[56px] lg:h-[58px] lg:w-[88%] xl:h-[62px] xl:w-[86%] 2xl:h-[68px]"
                        }`}
                >
                    <span
                        aria-hidden
                        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[inherit] [clip-path:inset(0_round_9999px)]"
                    >
                        <span
                            className={`absolute inset-0 rounded-[inherit] transition-opacity duration-700 ${scrolled ? "opacity-0" : "opacity-100"}`}
                            style={idleLayer}
                        />
                        <span
                            className={`absolute inset-0 rounded-[inherit] transition-opacity duration-700 ${scrolled ? "opacity-100" : "opacity-0"}`}
                            style={scrolledLayer}
                        />
                        <span
                            className={`absolute inset-0 mix-blend-overlay transition-opacity duration-700 ${scrolled ? "opacity-[0.18]" : "opacity-0"}`}
                            style={{ backgroundImage: noise }}
                        />
                        <span
                            className={`absolute inset-x-0 top-0 h-1/2 bg-[linear-gradient(180deg,rgba(255,255,255,0.07)_0%,rgba(255,255,255,0)_100%)] transition-opacity duration-700 ${scrolled ? "opacity-100" : "opacity-0"
                                }`}
                        />
                    </span>

                    <span
                        aria-hidden
                        className="pointer-events-none absolute inset-0 rounded-[inherit] p-px transition-opacity duration-700"
                        style={{
                            ...ringMask,
                            background: scrolled
                                ? "linear-gradient(180deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.06) 100%)"
                                : "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.6) 100%)",
                        }}
                    />

                    <a href="#" aria-label="Spine Publications home" className="relative grid items-center">
                        <img
                            src={logoDefault}
                            alt="Spine Publications"
                            draggable={false}
                            className={`[grid-area:1/1] w-auto select-none transition-[opacity,height,transform,filter] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${logoHeight} ${scrolled ? "pointer-events-none scale-95 opacity-0 blur-[2px]" : "scale-100 opacity-100 blur-0"
                                }`}
                        />
                        <img
                            src={logoScrolled}
                            alt=""
                            aria-hidden={!scrolled}
                            draggable={false}
                            className={`[grid-area:1/1] w-auto select-none transition-[opacity,height,transform,filter] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${logoHeight} ${scrolled ? "scale-100 opacity-100 blur-0" : "pointer-events-none scale-95 opacity-0 blur-[2px]"
                                }`}
                        />
                    </a>

                    <ul
                        className={`font-inter relative hidden items-center gap-6 text-[13px] font-medium transition-colors duration-700 lg:flex xl:gap-9 xl:text-[14px] 2xl:gap-10 2xl:text-[15px] ${scrolled ? "text-white/85" : "text-[#141414]"
                            }`}
                    >
                        {links.map((l) => (
                            <li key={l.label}>
                                <a href={l.href} className={`transition-colors duration-300 ${scrolled ? "hover:text-[#04DDA6]" : "hover:text-[#40C1AC]"}`}>
                                    {l.label}
                                </a>
                            </li>
                        ))}
                    </ul>

                    <button
                        aria-label="Toggle menu"
                        aria-expanded={open}
                        onClick={() => setOpen((v) => !v)}
                        className="relative flex items-center lg:hidden"
                    >
                        <span
                            className={`flex h-9 w-9 items-center justify-center rounded-full ring-1 transition-colors duration-700 ${scrolled ? "bg-white/10 ring-white/15" : "bg-white/60 ring-white/90"
                                }`}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path
                                    d={open ? "M6 6l12 12M18 6L6 18" : "M4 7h16M4 12h16M4 17h16"}
                                    stroke={scrolled ? "#ffffff" : "#141414"}
                                    strokeWidth="2"
                                    className="transition-[stroke] duration-700"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </span>
                    </button>

                    <button
                        type="button"
                        onClick={() => setQuoteOpen(true)}
                        className="font-inter bg-brand-gradient group relative flex h-[38px] items-center gap-2 rounded-full p-[5px] text-[13px] font-medium text-[#0f3d34] shadow-[0_6px_18px_rgba(4,221,166,0.35)] transition-transform duration-500 hover:scale-[1.04] sm:h-[40px] sm:pr-4 sm:text-[14px] xl:h-[44px] xl:pr-5 xl:text-[15px] 2xl:h-[48px] 2xl:text-[16px]"
                    >
                        <span className="transition-transform duration-500 group-hover:rotate-45">
                            <ArrowCircle className="h-[28px] w-[28px] xl:h-[34px] xl:w-[34px] 2xl:h-[38px] 2xl:w-[38px]" />
                        </span>
                        <span className="hidden sm:inline">Get Started</span>
                    </button>
                </nav>

                <AnimatePresence>
                    {open && (
                        <motion.ul
                            initial={{ opacity: 0, y: -12, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -12, scale: 0.98 }}
                            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                            style={
                                scrolled
                                    ? {
                                        background: "linear-gradient(135deg, rgba(38,42,46,0.82) 0%, rgba(22,25,28,0.78) 100%)",
                                        backdropFilter: "blur(40px) saturate(120%)",
                                        WebkitBackdropFilter: "blur(40px) saturate(120%)",
                                        borderColor: "rgba(255,255,255,0.10)",
                                        boxShadow: "0 16px 50px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)",
                                    }
                                    : {
                                        background: "linear-gradient(135deg, rgba(255,255,255,0.72) 0%, rgba(255,255,255,0.5) 100%)",
                                        backdropFilter: "blur(40px) saturate(180%)",
                                        WebkitBackdropFilter: "blur(40px) saturate(180%)",
                                        borderColor: "rgba(255,255,255,0.7)",
                                        boxShadow: "0 16px 50px rgba(15,61,52,0.14), inset 0 1px 0 rgba(255,255,255,0.9)",
                                    }
                            }
                            className={`font-inter mx-auto mt-3 flex w-full max-w-[1240px] flex-col gap-1 rounded-3xl border p-3 text-[15px] font-medium lg:hidden ${scrolled ? "text-white/90" : "text-[#141414]"
                                }`}
                        >
                            {links.map((l) => (
                                <li key={l.label}>
                                    <a
                                        href={l.href}
                                        onClick={() => setOpen(false)}
                                        className={`block rounded-2xl px-4 py-3 transition-colors ${scrolled ? "hover:bg-white/10 hover:text-[#04DDA6]" : "hover:bg-white/60 hover:text-[#40C1AC]"
                                            }`}
                                    >
                                        {l.label}
                                    </a>
                                </li>
                            ))}
                            <li className="pt-1 sm:hidden">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setOpen(false);
                                        setQuoteOpen(true);
                                    }}
                                    className="bg-brand-gradient flex h-[46px] w-full items-center justify-center gap-2 rounded-full text-[15px] font-medium text-[#0f3d34]"
                                >
                                    <ArrowCircle className="h-[30px] w-[30px]" />
                                    Get Started
                                </button>
                            </li>
                        </motion.ul>
                    )}
                </AnimatePresence>
            </header>

            <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
        </>
    );
};

export default Navbar;