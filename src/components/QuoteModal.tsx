import { useEffect, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { AnimatePresence, motion, type Easing, type Variants } from "framer-motion";
import { submitLead } from "../lib/submitLead";

const smooth: Easing = [0.16, 1, 0.3, 1];

type Form = { name: string; email: string; phone: string; message: string; consent: boolean };
type Errors = Partial<Record<keyof Form, string>>;
type Status = "idle" | "sending" | "sent" | "error";

const empty: Form = { name: "", email: "", phone: "", message: "", consent: false };

const validate = (f: Form): Errors => {
    const e: Errors = {};
    if (!f.name.trim()) e.name = "Please enter your full name";
    if (!f.email.trim()) e.email = "Please enter your email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) e.email = "Please enter a valid email";
    if (!f.phone.trim()) e.phone = "Please enter your phone number";
    else if (f.phone.replace(/\D/g, "").length < 7) e.phone = "Please enter a valid phone number";
    if (!f.consent) e.consent = "Please accept to continue";
    return e;
};

const perks = [
    "Free consultation with a publishing expert",
    "Personal project manager for your book",
    "You keep 100% of your rights and royalties",
];

const fields: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.06, delayChildren: 0.25 } },
};

const field: Variants = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: smooth } },
};

const inputBase =
    "font-inter w-full rounded-[12px] border bg-[#f7f9f9] px-4 text-[14px] text-[#141414] placeholder:text-[#9aa0a8] outline-none transition-all duration-300 focus:bg-white focus:border-[#40C1AC] focus:shadow-[0_0_0_4px_rgba(64,193,172,0.15)] xl:text-[15px]";

const ErrorText = ({ msg }: { msg?: string }) => (
    <AnimatePresence>
        {msg && (
            <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="font-inter mt-1 text-[12px] font-medium text-[#c0392b]"
            >
                {msg}
            </motion.p>
        )}
    </AnimatePresence>
);

const FieldWrap = ({ children }: { children: ReactNode }) => <motion.div variants={field}>{children}</motion.div>;

const CheckIcon = ({ className = "h-3 w-3" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
);

export type QuotePlan = { name: string; price: number; formats?: string };

const planMessage = (plan: QuotePlan) =>
    `Hi, I'm interested in the ${plan.name} plan ($${plan.price.toLocaleString("en-US")})${plan.formats ? ` - ${plan.formats}` : ""}. Please share the next steps.`;

const QuoteModal = ({ open, onClose, plan }: { open: boolean; onClose: () => void; plan?: QuotePlan | null }) => {
    const [form, setForm] = useState<Form>(empty);
    const [errors, setErrors] = useState<Errors>({});
    const [status, setStatus] = useState<Status>("idle");
    const [serverError, setServerError] = useState("");
    const firstInput = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!open) return;
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", onKey);
        const t = setTimeout(() => firstInput.current?.focus(), 400);
        return () => {
            document.body.style.overflow = prevOverflow;
            window.removeEventListener("keydown", onKey);
            clearTimeout(t);
        };
    }, [open, onClose]);

    useEffect(() => {
        if (!open || !plan) return;
        setForm((f) => ({ ...f, message: planMessage(plan) }));
    }, [open, plan]);

    useEffect(() => {
        if (open) return;
        const t = setTimeout(() => {
            setForm(empty);
            setErrors({});
            setStatus("idle");
            setServerError("");
        }, 450);
        return () => clearTimeout(t);
    }, [open]);

    const onChange = (key: keyof Form) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = key === "consent" ? (e.target as HTMLInputElement).checked : e.target.value;
        setForm((f) => ({ ...f, [key]: value }));
        if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
    };

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const found = validate(form);
        setErrors(found);
        if (Object.keys(found).length) return;

        setStatus("sending");
        setServerError("");

        try {
            await submitLead(form);
            setStatus("sent");
            setForm(empty);
        } catch (err) {
            setStatus("error");
            setServerError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
        }
    };

    const border = (key: keyof Form) => (errors[key] ? "border-[#e57373]" : "border-[#e3e6ea]");

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-[120] flex items-end justify-center sm:items-center sm:p-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                >
                    <div className="absolute inset-0 bg-[#0b1f1b]/55 backdrop-blur-[6px]" onClick={onClose} />

                    <motion.div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="quote-modal-title"
                        initial={{ opacity: 0, y: 70, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.97 }}
                        transition={{ duration: 0.7, ease: smooth }}
                        className="relative grid max-h-[94vh] w-full overflow-hidden rounded-t-[24px] bg-white shadow-[0_40px_100px_rgba(0,0,0,0.3)] sm:max-w-[560px] sm:rounded-[24px] md:max-w-[880px] md:grid-cols-[0.85fr_1.15fr] 2xl:max-w-[980px]"
                    >
                        <aside className="bg-brand-gradient relative isolate hidden overflow-hidden p-8 md:flex md:flex-col md:justify-between xl:p-10">
                            <motion.span
                                aria-hidden
                                animate={{ scale: [1, 1.2, 1], opacity: [0.35, 0.65, 0.35] }}
                                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                                className="pointer-events-none absolute -right-24 -top-24 -z-10 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.55),transparent)]"
                            />
                            <span
                                aria-hidden
                                className="pointer-events-none absolute inset-0 -z-10 opacity-40"
                                style={{
                                    background:
                                        "repeating-linear-gradient(122deg, rgba(255,255,255,0) 0px, rgba(255,255,255,0) 26px, rgba(255,255,255,0.22) 26px, rgba(255,255,255,0.22) 46px)",
                                    WebkitMaskImage: "linear-gradient(180deg, transparent 40%, #000 100%)",
                                    maskImage: "linear-gradient(180deg, transparent 40%, #000 100%)",
                                }}
                            />

                            <div>
                                <motion.img
                                    src="/images/Logo.png"
                                    alt="Spine Publications"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.2, ease: smooth }}
                                    className="h-[40px] w-auto rounded-full bg-white/70 px-3 py-1.5 backdrop-blur-sm xl:h-[46px]"
                                />
                                <motion.h3
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.9, delay: 0.3, ease: smooth }}
                                    className="font-clash mt-8 text-[28px] font-semibold leading-[1.15] text-[#0f1f1b] xl:text-[32px]"
                                >
                                    Let's bring your book to life
                                </motion.h3>
                                <motion.p
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.9, delay: 0.4, ease: smooth }}
                                    className="font-inter mt-3 text-[14px] leading-[1.65] text-[#0f3d34]/85"
                                >
                                    Tell us a little about your project and our publishing team will reach out with a free, tailored plan.
                                </motion.p>
                            </div>

                            <ul className="mt-8 flex flex-col gap-3">
                                {perks.map((p, i) => (
                                    <motion.li
                                        key={p}
                                        initial={{ opacity: 0, x: -16 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.8, delay: 0.5 + i * 0.1, ease: smooth }}
                                        className="font-inter flex items-start gap-3 text-[13.5px] font-medium text-[#0f2d27]"
                                    >
                                        <span className="mt-[1px] flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-full bg-white/60 text-[#0f3d34] ring-1 ring-white/80">
                                            <CheckIcon />
                                        </span>
                                        {p}
                                    </motion.li>
                                ))}
                            </ul>

                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.9, delay: 0.85, ease: smooth }}
                                className="mt-8 flex items-center gap-3 rounded-[14px] bg-white/45 p-3 ring-1 ring-white/70 backdrop-blur-sm"
                            >
                                <span className="font-clash text-[26px] font-semibold leading-none text-[#0f1f1b]">8,000+</span>
                                <span className="font-inter text-[12.5px] leading-[1.4] text-[#0f2d27]">authors have published their books with Spines</span>
                            </motion.div>
                        </aside>

                        <div className="relative overflow-y-auto p-6 sm:p-8 xl:p-10">
                            <button
                                type="button"
                                onClick={onClose}
                                aria-label="Close"
                                className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-[#f3f4f6] text-[#4a4f57] transition-all duration-300 hover:rotate-90 hover:bg-[#e8f8f2] hover:text-[#13866a]"
                            >
                                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                                    <path d="M6 6l12 12M18 6L6 18" />
                                </svg>
                            </button>

                            <AnimatePresence mode="wait">
                                {status === "sent" ? (
                                    <motion.div
                                        key="sent"
                                        initial={{ opacity: 0, scale: 0.92 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.6, ease: smooth }}
                                        className="flex min-h-[440px] flex-col items-center justify-center text-center"
                                    >
                                        <motion.span
                                            initial={{ scale: 0, rotate: -90 }}
                                            animate={{ scale: 1, rotate: 0 }}
                                            transition={{ duration: 0.8, delay: 0.1, ease: smooth }}
                                            className="bg-brand-gradient flex h-[72px] w-[72px] items-center justify-center rounded-full shadow-[0_12px_32px_rgba(4,221,166,0.4)]"
                                        >
                                            <svg viewBox="0 0 24 24" className="h-9 w-9" fill="none" stroke="#0f3d34" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                                                <motion.path d="M5 12.5l4.5 4.5L19 7.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.5 }} />
                                            </svg>
                                        </motion.span>
                                        <h3 className="font-clash mt-6 text-[26px] font-semibold text-[#141414]">
                                            You're all <span className="text-brand-gradient">set!</span>
                                        </h3>
                                        <p className="font-inter mt-2 max-w-[340px] text-[14px] leading-[1.65] text-[#4a4f57]">
                                            Thank you for reaching out. A publishing expert will contact you within one business day.
                                        </p>
                                        <button
                                            type="button"
                                            onClick={onClose}
                                            className="font-inter bg-brand-gradient mt-7 rounded-full px-8 py-3 text-[14.5px] font-medium text-[#0f3d34] shadow-[0_8px_22px_rgba(4,221,166,0.35)] transition-transform hover:scale-[1.04]"
                                        >
                                            Done
                                        </button>
                                    </motion.div>
                                ) : (
                                    <motion.form key="form" noValidate onSubmit={onSubmit} variants={fields} initial="hidden" animate="show" exit={{ opacity: 0 }}>
                                        <motion.div variants={field} className="pr-10">
                                            <span className="bg-brand-gradient font-inter inline-flex h-[24px] items-center rounded-full px-3 text-[11.5px] font-medium text-[#0f3d34] md:hidden">
                                                Free Consultation
                                            </span>
                                            <h2 id="quote-modal-title" className="font-clash mt-2 text-[24px] font-semibold leading-[1.2] text-[#141414] sm:text-[27px] md:mt-0 xl:text-[30px]">
                                                Get Your <span className="text-brand-gradient">Free Quote</span>
                                            </h2>
                                            <p className="font-inter mt-1.5 text-[13.5px] text-[#5a5f66] xl:text-[14.5px]">Share your vision with our experts. It only takes a minute.</p>
                                            {plan && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    transition={{ duration: 0.6, delay: 0.3, ease: smooth }}
                                                    className="mt-4 flex items-center justify-between gap-3 rounded-[12px] border border-[#40C1AC]/40 bg-[linear-gradient(135deg,#effcf8_0%,#ffffff_70%)] px-4 py-3"
                                                >
                                                    <div className="min-w-0">
                                                        <p className="font-inter text-[11.5px] font-medium uppercase tracking-[0.08em] text-[#13866a]">Selected plan</p>
                                                        <p className="font-clash mt-0.5 truncate text-[17px] font-semibold text-[#141414] xl:text-[18px]">{plan.name}</p>
                                                        {plan.formats && <p className="font-inter truncate text-[12px] text-[#5a5f66]">{plan.formats}</p>}
                                                    </div>
                                                    <span className="font-clash shrink-0 text-[20px] font-semibold text-[#141414] xl:text-[22px]">
                                                        ${plan.price.toLocaleString("en-US")}
                                                    </span>
                                                </motion.div>
                                            )}
                                        </motion.div>

                                        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                            <FieldWrap>
                                                <label htmlFor="qm-name" className="font-inter mb-1.5 block text-[13px] font-semibold text-[#141414]">Full name</label>
                                                <input
                                                    ref={firstInput}
                                                    id="qm-name"
                                                    type="text"
                                                    autoComplete="name"
                                                    placeholder="Jane Doe"
                                                    value={form.name}
                                                    onChange={onChange("name")}
                                                    className={`${inputBase} ${border("name")} h-[48px]`}
                                                />
                                                <ErrorText msg={errors.name} />
                                            </FieldWrap>
                                            <FieldWrap>
                                                <label htmlFor="qm-phone" className="font-inter mb-1.5 block text-[13px] font-semibold text-[#141414]">Phone number</label>
                                                <input
                                                    id="qm-phone"
                                                    type="tel"
                                                    autoComplete="tel"
                                                    placeholder="(555) 123-4567"
                                                    value={form.phone}
                                                    onChange={onChange("phone")}
                                                    className={`${inputBase} ${border("phone")} h-[48px]`}
                                                />
                                                <ErrorText msg={errors.phone} />
                                            </FieldWrap>
                                        </div>

                                        <FieldWrap>
                                            <label htmlFor="qm-email" className="font-inter mb-1.5 mt-4 block text-[13px] font-semibold text-[#141414]">Email address</label>
                                            <input
                                                id="qm-email"
                                                type="email"
                                                autoComplete="email"
                                                placeholder="jane@email.com"
                                                value={form.email}
                                                onChange={onChange("email")}
                                                className={`${inputBase} ${border("email")} h-[48px]`}
                                            />
                                            <ErrorText msg={errors.email} />
                                        </FieldWrap>

                                        <FieldWrap>
                                            <label htmlFor="qm-message" className="font-inter mb-1.5 mt-4 block text-[13px] font-semibold text-[#141414]">
                                                Tell us about your book <span className="font-normal text-[#9aa0a8]">(optional)</span>
                                            </label>
                                            <textarea
                                                id="qm-message"
                                                rows={4}
                                                placeholder="Genre, where you are in the process, what help you need..."
                                                value={form.message}
                                                onChange={onChange("message")}
                                                className={`${inputBase} border-[#e3e6ea] resize-none py-3`}
                                            />
                                        </FieldWrap>

                                        <FieldWrap>
                                            <label className="mt-4 flex cursor-pointer items-start gap-2.5">
                                                <span className="relative mt-[2px] flex h-[17px] w-[17px] shrink-0 items-center justify-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={form.consent}
                                                        onChange={onChange("consent")}
                                                        className="peer absolute inset-0 h-full w-full cursor-pointer appearance-none rounded-[4px] border-[1.5px] border-[#c7cbd1] bg-white transition-colors checked:border-[#1fc79d] checked:bg-[#1fc79d] focus-visible:ring-2 focus-visible:ring-[#40C1AC]/40"
                                                    />
                                                    <span className="pointer-events-none relative text-white opacity-0 transition-opacity peer-checked:opacity-100">
                                                        <CheckIcon className="h-[11px] w-[11px]" />
                                                    </span>
                                                </span>
                                                <span className="font-inter text-[11.5px] leading-[1.55] text-[#5a5f66] xl:text-[12px]">
                                                    By submitting this form and providing your phone number, you agree to receive automated messages from us
                                                    and accept our{" "}
                                                    <a href="/terms" className="font-medium text-[#13866a] underline-offset-2 hover:underline">Terms</a> and{" "}
                                                    <a href="/privacy" className="font-medium text-[#13866a] underline-offset-2 hover:underline">Privacy Policy</a>.
                                                </span>
                                            </label>
                                            <ErrorText msg={errors.consent} />
                                        </FieldWrap>

                                        <AnimatePresence>
                                            {status === "error" && serverError && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: -6, height: 0 }}
                                                    animate={{ opacity: 1, y: 0, height: "auto" }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    className="font-inter mt-4 rounded-[10px] bg-[#fdecea] px-4 py-3 text-[13px] font-medium text-[#a93226]"
                                                    role="alert"
                                                >
                                                    {serverError}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        <motion.button
                                            variants={field}
                                            type="submit"
                                            disabled={status === "sending"}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="font-inter bg-brand-gradient group mt-6 flex h-[52px] w-full items-center justify-center gap-2.5 rounded-full text-[15.5px] font-semibold text-[#0f3d34] shadow-[0_10px_28px_rgba(4,221,166,0.38)] disabled:cursor-wait disabled:opacity-90"
                                        >
                                            {status === "sending" ? (
                                                <>
                                                    <motion.span
                                                        animate={{ rotate: 360 }}
                                                        transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
                                                        className="h-[18px] w-[18px] rounded-full border-2 border-[#0f3d34]/30 border-t-[#0f3d34]"
                                                    />
                                                    Sending...
                                                </>
                                            ) : (
                                                <>
                                                    Get Started
                                                    <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M5 12h14M13 6l6 6-6 6" />
                                                    </svg>
                                                </>
                                            )}
                                        </motion.button>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default QuoteModal;