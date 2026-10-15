import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
    { label: "Home", href: "#" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Blog", href: "#blog" },
];

export const ArrowCircle = ({ className = "h-[26px] w-[26px]" }: { className?: string }) => (
    <span className={`flex shrink-0 items-center justify-center rounded-full bg-white/35 ring-1 ring-white/60 ${className}`}>
        <svg className="h-1/2 w-1/2" viewBox="0 0 24 24" fill="none">
            <path d="M7 17L17 7M17 7H8M17 7V16" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    </span>
);

const Navbar = () => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const onResize = () => {
            if (window.innerWidth >= 1024) setOpen(false);
        };
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    return (
        <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-5 lg:pt-6 animate__animated animate__fadeInDown animate__slow">
            <nav className="relative mx-auto flex h-[52px] w-full max-w-[1240px] items-center justify-between rounded-full border border-white/80 bg-white/55 pr-[6px] pl-4 shadow-[0_4px_30px_rgba(64,193,172,0.12)] backdrop-blur-md sm:h-[56px] sm:pl-6 lg:h-[58px] lg:w-[88%] lg:pl-7 xl:h-[62px] xl:w-[86%] 2xl:h-[68px]">
                {/* Logo — left side */}
                <a
                    href="#"
                    className="flex items-center"
                >
                    <img
                        src="/images/Logo.png"
                        alt="Spine Publications"
                        className="h-[36px] w-auto sm:h-[40px] lg:h-[44px] xl:h-[48px] 2xl:h-[54px]"
                    />
                </a>

                {/* Nav links — center (desktop only) */}
                <ul className="font-inter hidden lg:flex items-center gap-6 text-[13px] font-medium text-[#141414] xl:gap-9 xl:text-[14px] 2xl:gap-10 2xl:text-[15px]">
                    {links.map((l) => (
                        <li key={l.label}>
                            <a href={l.href} className="transition-colors duration-300 hover:text-[#40C1AC]">
                                {l.label}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Mobile menu toggle */}
                <button
                    aria-label="Toggle menu"
                    aria-expanded={open}
                    onClick={() => setOpen((v) => !v)}
                    className="flex items-center lg:hidden"
                >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/70 ring-1 ring-white">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path
                                d={open ? "M6 6l12 12M18 6L6 18" : "M4 7h16M4 12h16M4 17h16"}
                                stroke="#141414"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                        </svg>
                    </span>
                </button>

                {/* Get Started — right side */}
                <a
                    href="#get-started"
                    className="font-inter bg-brand-gradient group flex h-[38px] items-center gap-2 rounded-full p-[5px] text-[13px] font-medium text-[#0f3d34] shadow-[0_6px_18px_rgba(4,221,166,0.35)] transition-transform duration-500 hover:scale-[1.04] sm:h-[40px] sm:pr-4 sm:text-[14px] xl:h-[44px] xl:pr-5 xl:text-[15px] 2xl:h-[48px] 2xl:text-[16px]"
                >
                    <span className="transition-transform duration-500 group-hover:rotate-45">
                        <ArrowCircle className="h-[28px] w-[28px] xl:h-[34px] xl:w-[34px] 2xl:h-[38px] 2xl:w-[38px]" />
                    </span>
                    <span className="hidden sm:inline">Get Started</span>
                </a>
            </nav>

            {/* Mobile dropdown menu */}
            <AnimatePresence>
                {open && (
                    <motion.ul
                        initial={{ opacity: 0, y: -12, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -12, scale: 0.98 }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className="font-inter mx-auto mt-3 flex w-full max-w-[1240px] flex-col gap-1 rounded-3xl border border-white/80 bg-white/90 p-3 text-[15px] font-medium text-[#141414] shadow-[0_10px_40px_rgba(64,193,172,0.18)] backdrop-blur-md lg:hidden"
                    >
                        {links.map((l) => (
                            <li key={l.label}>
                                <a
                                    href={l.href}
                                    onClick={() => setOpen(false)}
                                    className="block rounded-2xl px-4 py-3 transition-colors hover:bg-[#40C1AC]/10 hover:text-[#40C1AC]"
                                >
                                    {l.label}
                                </a>
                            </li>
                        ))}
                        <li className="pt-1 sm:hidden">
                            <a
                                href="#get-started"
                                onClick={() => setOpen(false)}
                                className="bg-brand-gradient flex h-[46px] items-center justify-center gap-2 rounded-full text-[15px] font-medium text-[#0f3d34]"
                            >
                                <ArrowCircle className="h-[30px] w-[30px]" />
                                Get Started
                            </a>
                        </li>
                    </motion.ul>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;