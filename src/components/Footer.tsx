import { motion, useReducedMotion, type Easing, type Variants } from "framer-motion";
import { ArrowCircle } from "./Navbar";
import QuoteModal from "./QuoteModal";
import { useState, type FormEvent } from "react";

const smooth: Easing = [0.16, 1, 0.3, 1];

const STRIPE_ANGLE = 122;
const STRIPE_PERIOD = 62;
const LOOP_X = STRIPE_PERIOD / Math.sin((STRIPE_ANGLE * Math.PI) / 180);

const quicklinks = [
    { label: "Home", href: "#" },
    { label: "About Us", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Blog", href: "#blog" },
];

const disclaimer =
    "All content and services provided by Spine Publications are for informational and publishing support purposes only. While we strive for accuracy and quality, we do not guarantee financial success or sales outcomes for any published book. Authors retain full responsibility for the content, rights, and legal compliance of their manuscripts. Our services are intended to assist in professional publishing and distribution.";

const cols: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const col: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 1.1, ease: smooth } },
};

const FooterLink = ({ href, children }: { href: string; children: string }) => (
    <a href={href} className="group relative inline-block w-fit text-[#3f4650] transition-colors duration-300 hover:text-[#1f9c80]">
        {children}
        <span className="bg-brand-gradient absolute -bottom-[2px] left-0 h-[1.5px] w-full origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
    </a>
);

const Rays = () => {
    const reduce = useReducedMotion();

    const mask =
        "radial-gradient(ellipse 62% 95% at 50% 10%, transparent 0%, transparent 55%, #000 100%), linear-gradient(180deg, transparent 0%, transparent 35%, #000 100%)";

    return (
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            <div
                className="absolute inset-0"
                style={{
                    background:
                        "radial-gradient(ellipse 45% 70% at 0% 100%, rgba(64,193,172,0.75), transparent 70%), radial-gradient(ellipse 45% 70% at 100% 100%, rgba(4,221,166,0.75), transparent 70%), linear-gradient(180deg, #ffffff 0%, #ffffff 40%, #e4faf3 72%, #b5f1e1 100%)",
                }}
            />

            <div
                className="absolute inset-0"
                style={{ WebkitMaskImage: mask, maskImage: mask, WebkitMaskComposite: "source-in", maskComposite: "intersect" }}
            >
                <motion.div
                    className="absolute -inset-y-10 -left-[200px] -right-[200px]"
                    style={{
                        background: `repeating-linear-gradient(${STRIPE_ANGLE}deg, rgba(255,255,255,0) 0px, rgba(255,255,255,0) 34px, rgba(255,255,255,0.42) 34px, rgba(255,255,255,0.42) ${STRIPE_PERIOD}px)`,
                    }}
                    animate={reduce ? undefined : { x: [0, LOOP_X] }}
                    transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
                />

                <motion.div
                    className="absolute -inset-y-10 -left-[200px] -right-[200px] mix-blend-overlay"
                    style={{
                        background: `repeating-linear-gradient(${STRIPE_ANGLE}deg, rgba(255,255,255,0) 0px, rgba(255,255,255,0) 90px, rgba(255,255,255,0.9) 96px, rgba(255,255,255,0) 104px, rgba(255,255,255,0) ${STRIPE_PERIOD * 4}px)`,
                    }}
                    animate={reduce ? undefined : { x: [0, -LOOP_X * 4], opacity: [0.4, 1, 0.5, 0.9, 0.4] }}
                    transition={{
                        x: { duration: 7, repeat: Infinity, ease: "linear" },
                        opacity: { duration: 2.6, repeat: Infinity, ease: "easeInOut" },
                    }}
                />

                <motion.div
                    className="absolute inset-y-0 w-[35%]"
                    style={{
                        background:
                            "linear-gradient(105deg, transparent 0%, rgba(255,255,255,0) 30%, rgba(255,255,255,0.85) 50%, rgba(255,255,255,0) 70%, transparent 100%)",
                        filter: "blur(10px)",
                    }}
                    initial={{ left: "-40%" }}
                    animate={reduce ? undefined : { left: ["-40%", "110%"] }}
                    transition={{ duration: 3.4, repeat: Infinity, repeatDelay: 2.2, ease: [0.45, 0, 0.2, 1] }}
                />
            </div>

            <motion.div
                className="absolute -bottom-24 left-[-10%] h-[260px] w-[45%] rounded-full bg-[radial-gradient(closest-side,rgba(4,221,166,0.45),transparent)] blur-2xl"
                animate={reduce ? undefined : { opacity: [0.5, 1, 0.5], scale: [1, 1.12, 1] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute -bottom-24 right-[-10%] h-[260px] w-[45%] rounded-full bg-[radial-gradient(closest-side,rgba(64,193,172,0.45),transparent)] blur-2xl"
                animate={reduce ? undefined : { opacity: [1, 0.5, 1], scale: [1.12, 1, 1.12] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
        </div>
    );
};

const PhoneIcon = () => (
    <svg viewBox="0 0 24 24" className="h-[15px] w-[15px] shrink-0" fill="#1fc79d">
        <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2z" />
    </svg>
);

const MailIcon = () => (
    <svg viewBox="0 0 24 24" className="h-[15px] w-[15px] shrink-0" fill="#1fc79d">
        <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4.2l-8 5-8-5V6l8 5 8-5v2.2z" />
    </svg>
);

const InfoIcon = () => (
    <svg viewBox="0 0 24 24" className="h-[15px] w-[15px] shrink-0" fill="none" stroke="#13866a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 11v5M12 8h.01" />
    </svg>
);

const Footer = () => {
    const year = new Date().getFullYear();
    const [quoteOpen, setQuoteOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!email.trim()) return;
        // TODO: connect your newsletter API here
        setSubscribed(true);
        setEmail("");
    };

    return (
        <>
            <footer className="relative isolate w-full overflow-hidden pt-14 sm:pt-16 lg:pt-16 2xl:pt-20">
                <Rays />

                <motion.div
                    variants={cols}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-40px" }}
                    className="mx-auto w-full max-w-[1000px] px-5 sm:px-8 lg:px-6 xl:max-w-[1080px] 2xl:max-w-[1280px]"
                >
                    <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-[1.35fr_0.55fr_0.95fr_1.15fr] lg:gap-x-8">
                        <motion.div variants={col} className="col-span-2 md:col-span-3 lg:col-span-1">
                            <h2 className="font-clash text-[30px] leading-[1.15] tracking-[-0.01em] text-[#141414] sm:text-[34px] lg:text-[32px] xl:text-[36px] 2xl:text-[44px]">
                                <span className="block font-normal">Your Story</span>
                                <span className="text-brand-gradient font-medium">Deserves</span>
                                <span className="font-normal"> to Soar</span>
                            </h2>
                            <button
                                type="button"
                                onClick={() => setQuoteOpen(true)}
                                className="font-inter bg-brand-gradient group mt-6 inline-flex h-[42px] items-center gap-2 rounded-full pl-[5px] pr-5 text-[14px] font-medium text-[#0f3d34] shadow-[0_8px_22px_rgba(4,221,166,0.3)] transition-transform duration-500 hover:scale-[1.04] xl:mt-7 xl:h-[46px] xl:text-[15px] 2xl:h-[52px] 2xl:text-[16.5px]"
                            >
                                <span className="transition-transform duration-500 group-hover:rotate-45">
                                    <ArrowCircle className="h-[32px] w-[32px] xl:h-[36px] xl:w-[36px] 2xl:h-[42px] 2xl:w-[42px]" />
                                </span>
                                Get Started
                            </button>
                        </motion.div>

                        <motion.div variants={col}>
                            <h3 className="font-clash text-[14px] font-medium text-[#141414] xl:text-[15px] 2xl:text-[17px]">Quick Links</h3>
                            <ul className="font-inter mt-3 flex flex-col gap-2 text-[13px] xl:text-[13.5px] 2xl:text-[15px]">
                                {quicklinks.map((l) => (
                                    <li key={l.label}>
                                        <FooterLink href={l.href}>{l.label}</FooterLink>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        <motion.div variants={col}>
                            <h3 className="font-clash text-[14px] font-medium text-[#141414] xl:text-[15px] 2xl:text-[17px]">Contact</h3>
                            <ul className="font-inter mt-3 flex flex-col gap-2.5 text-[13px] xl:text-[13.5px] 2xl:text-[15px]">
                                <li>
                                    <a href="tel:+17282216606" className="group flex items-center gap-2 text-[#3f4650] transition-colors hover:text-[#1f9c80]">
                                        <PhoneIcon />
                                        (728) 221-6606
                                    </a>
                                </li>
                                <li>
                                    <a href="mailto:support@spinepublications.com" className="group flex items-center gap-2 break-all text-[#3f4650] transition-colors hover:text-[#1f9c80]">
                                        <MailIcon />
                                        support@spinepublications.com
                                    </a>
                                </li>
                            </ul>
                        </motion.div>

                        <motion.div variants={col} className="col-span-2 md:col-span-1">
                            <h3 className="font-clash text-[14px] font-medium text-[#141414] xl:text-[15px] 2xl:text-[17px]">Newsletter</h3>
                            <p className="font-inter mt-3 text-[13px] leading-[1.6] text-[#3f4650] xl:text-[13.5px] 2xl:text-[15px]">
                                Get publishing tips, author stories and exclusive offers straight to your inbox.
                            </p>

                            {subscribed ? (
                                <p role="status" className="font-inter mt-4 text-[13px] font-medium text-[#13866a] xl:text-[13.5px] 2xl:text-[15px]">
                                    Subscribed! Check your inbox for a welcome email.
                                </p>
                            ) : (
                                <form
                                    onSubmit={handleSubscribe}
                                    className="mt-4 flex items-center gap-1 rounded-full border border-white/70 bg-white/70 p-[4px] pl-4 shadow-[0_6px_20px_rgba(15,61,52,0.06)] backdrop-blur-md transition-colors focus-within:border-[#1fc79d]"
                                >
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Your email"
                                        aria-label="Email address"
                                        className="font-inter min-w-0 flex-1 bg-transparent text-[13px] text-[#141414] outline-none placeholder:text-[#8a9098] xl:text-[13.5px] 2xl:text-[15px]"
                                    />
                                    <button
                                        type="submit"
                                        className="font-inter bg-brand-gradient h-[34px] shrink-0 rounded-full px-4 text-[13px] font-medium text-[#0f3d34] transition-transform duration-300 hover:scale-[1.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#13866a] xl:h-[36px] 2xl:h-[42px] 2xl:text-[14.5px]"
                                    >
                                        Subscribe
                                    </button>
                                </form>
                            )}
                        </motion.div>
                    </div>

                    <motion.p
                        variants={col}
                        className="font-inter mt-12 max-w-[820px] text-[12.5px] leading-[1.65] text-[#4a5058] lg:mt-12 xl:text-[13px] 2xl:text-[14.5px]"
                    >
                        We are dedicated to empowering authors worldwide by transforming manuscripts into published works. From professional editing and custom cover design to global distribution and marketing strategies, our team provides all the tools and guidance you need to bring your vision to readers everywhere.
                    </motion.p>

                    <motion.div
                        variants={col}
                        role="note"
                        aria-label="Disclaimer"
                        className="mt-6 rounded-[14px] border border-white/70 bg-white/55 p-4 shadow-[0_6px_24px_rgba(15,61,52,0.06)] backdrop-blur-md sm:p-5 xl:mt-7 2xl:p-6"
                    >
                        <p className="font-clash flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.08em] text-[#13866a] xl:text-[13.5px] 2xl:text-[15px]">
                            <InfoIcon />
                            Disclaimer
                        </p>
                        <p className="font-inter mt-2 text-[12px] leading-[1.7] text-[#4a5058] xl:text-[12.5px] 2xl:text-[14px]">{disclaimer}</p>
                    </motion.div>

                    <motion.div
                        variants={col}
                        className="font-inter mt-8 flex flex-col items-center justify-between gap-3 border-t border-[#0f3d34]/10 py-6 text-[12.5px] font-medium text-[#141414] sm:flex-row sm:border-t-0 sm:pt-4 xl:text-[13.5px] 2xl:py-8 2xl:text-[15px]"
                    >
                        <p>© {year} Spine Publications. All Rights Reserved.</p>
                        <p className="flex items-center gap-1.5">
                            <a href="/terms" className="transition-colors hover:text-[#1f9c80]">
                                Terms &amp; Conditions
                            </a>
                            <span>|</span>
                            <a href="/privacy" className="transition-colors hover:text-[#1f9c80]">
                                Privacy Policy
                            </a>
                        </p>
                    </motion.div>
                </motion.div>
            </footer>

            <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
        </>
    );
};

export default Footer;