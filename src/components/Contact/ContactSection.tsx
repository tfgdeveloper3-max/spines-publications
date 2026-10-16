import { useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { AnimatePresence, motion, type Easing, type Variants } from "framer-motion";
import { ArrowCircle } from "../Navbar";
import QuoteModal from "../QuoteModal";
import { submitLead } from "../../lib/submitLead";

const smooth: Easing = [0.16, 1, 0.3, 1];

const PhoneIcon = () => (
    <svg viewBox="0 0 24 24" className="h-full w-full" fill="currentColor">
        <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2z" />
    </svg>
);

const PinIcon = () => (
    <svg viewBox="0 0 24 24" className="h-full w-full" fill="currentColor">
        <path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
    </svg>
);

const MailIcon = () => (
    <svg viewBox="0 0 24 24" className="h-full w-full" fill="currentColor">
        <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4.2l-8 5-8-5V6l8 5 8-5v2.2z" />
    </svg>
);

const contacts: { icon: ReactNode; label: string; href?: string }[] = [
    { icon: <PhoneIcon />, label: "(728) 221-6606", href: "tel:+17282216606" },
    { icon: <PinIcon />, label: "4781 N Congress Ave, Boynton Beach, FL 33426" },
    { icon: <MailIcon />, label: "support@spinepublications.com", href: "mailto:support@spinepublications.com" },
];

const words: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

const word: Variants = {
    hidden: { opacity: 0, y: 26, filter: "blur(8px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1.1, ease: smooth } },
};

const contactList: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
};

const contactItem: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 1, ease: smooth } },
};

const formFields: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.4 } },
};

const formField: Variants = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: smooth } },
};

const SplitWords = ({ text, className }: { text: string; className?: string }) => (
    <>
        {text.split(" ").map((w, i) => (
            <motion.span key={`${w}-${i}`} variants={word} className={`mr-[0.25em] inline-block last:mr-0 ${className ?? ""}`}>
                {w}
            </motion.span>
        ))}
    </>
);

type FormState = { name: string; email: string; phone: string; message: string; consent: boolean };
type Errors = Partial<Record<keyof FormState, string>>;
type Status = "idle" | "sending" | "sent" | "error";

const initialForm: FormState = { name: "", email: "", phone: "", message: "", consent: false };

const validate = (f: FormState): Errors => {
    const e: Errors = {};
    if (!f.name.trim()) e.name = "Please enter your full name";
    if (!f.email.trim()) e.email = "Please enter your email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) e.email = "Please enter a valid email";
    if (!f.phone.trim()) e.phone = "Please enter your contact number";
    else if (f.phone.replace(/\D/g, "").length < 7) e.phone = "Please enter a valid number";
    if (!f.consent) e.consent = "Please accept to continue";
    return e;
};

const inputBase =
    "font-inter w-full rounded-[6px] border bg-white/15 px-4 text-[13px] text-[#0f2d27] placeholder:text-[#0f3d34]/55 outline-none transition-all duration-300 focus:bg-white/25 focus:border-[#0f3d34] focus:shadow-[0_0_0_3px_rgba(15,61,52,0.12)] xl:text-[14px] 2xl:text-[15.5px]";

const Field = ({ error, children }: { error?: string; children: ReactNode }) => (
    <motion.div variants={formField} className="relative">
        {children}
        <AnimatePresence>
            {error && (
                <motion.p
                    initial={{ opacity: 0, y: -4, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: -4, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="font-inter mt-1 text-[11.5px] font-medium text-[#7a1020]"
                >
                    {error}
                </motion.p>
            )}
        </AnimatePresence>
    </motion.div>
);

const QuoteForm = () => {
    const [form, setForm] = useState<FormState>(initialForm);
    const [errors, setErrors] = useState<Errors>({});
    const [status, setStatus] = useState<Status>("idle");
    const [serverError, setServerError] = useState("");

    const onChange = (key: keyof FormState) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = key === "consent" ? (e.target as HTMLInputElement).checked : e.target.value;
        setForm((f) => ({ ...f, [key]: value }));
        if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
        if (status === "error") {
            setStatus("idle");
            setServerError("");
        }
    };

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (status === "sending") return;

        const found = validate(form);
        setErrors(found);
        if (Object.keys(found).length) return;

        setStatus("sending");
        setServerError("");

        try {
            await submitLead(form);
            setStatus("sent");
            setForm(initialForm);
        } catch (err) {
            setStatus("error");
            setServerError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
        }
    };

    const border = (key: keyof FormState) => (errors[key] ? "border-[#7a1020]/70" : "border-transparent");

    return (
        <motion.div
            initial={{ opacity: 0, x: -60, scale: 0.97 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1.4, ease: smooth }}
            className="bg-brand-gradient relative isolate overflow-hidden rounded-[14px] p-5 shadow-[0_24px_60px_rgba(4,221,166,0.25)] sm:p-7 xl:p-8 2xl:p-10"
        >
            <motion.span
                aria-hidden
                animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0.6, 0.35] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="pointer-events-none absolute -right-20 -top-20 -z-10 h-64 w-64 rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.45),transparent)]"
            />

            <AnimatePresence mode="wait">
                {status === "sent" ? (
                    <motion.div
                        key="sent"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.7, ease: smooth }}
                        className="flex min-h-[420px] flex-col items-center justify-center text-center"
                    >
                        <motion.span
                            initial={{ scale: 0, rotate: -90 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ duration: 0.8, delay: 0.15, ease: smooth }}
                            className="flex h-16 w-16 items-center justify-center rounded-full bg-white/35 ring-1 ring-white/70"
                        >
                            <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="#0f3d34" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                                <motion.path
                                    d="M5 12.5l4.5 4.5L19 7.5"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 0.6, delay: 0.5, ease: smooth }}
                                />
                            </svg>
                        </motion.span>
                        <h3 className="font-clash mt-5 text-[22px] font-semibold text-[#0f2d27] xl:text-[24px]">Thank you!</h3>
                        <p className="font-inter mt-2 max-w-[280px] text-[13.5px] leading-[1.6] text-[#0f3d34]/80">
                            We've received your request. Our publishing experts will reach out within one business day.
                        </p>
                        <button
                            type="button"
                            onClick={() => setStatus("idle")}
                            className="font-inter mt-6 rounded-full bg-white/40 px-6 py-2.5 text-[13.5px] font-medium text-[#0f3d34] ring-1 ring-white/70 transition-colors hover:bg-white/60"
                        >
                            Send another request
                        </button>
                    </motion.div>
                ) : (
                    <motion.form
                        key="form"
                        noValidate
                        onSubmit={onSubmit}
                        variants={formFields}
                        initial="hidden"
                        whileInView="show"
                        exit={{ opacity: 0, y: -10 }}
                        viewport={{ once: true }}
                    >
                        <motion.h3 variants={formField} className="font-clash text-[21px] font-semibold text-[#0f1f1b] sm:text-[23px] xl:text-[25px] 2xl:text-[29px]">
                            Get Your Free Publishing Quote
                        </motion.h3>
                        <motion.p variants={formField} className="font-inter mt-1 text-[12px] text-[#0f2d27] xl:text-[13px] 2xl:text-[14.5px]">
                            Share your manuscript details with Spines specialists!
                        </motion.p>

                        <div className="mt-5 flex flex-col gap-3 xl:mt-6">
                            <Field error={errors.name}>
                                <label htmlFor="q-name" className="sr-only">Your Full Name</label>
                                <input
                                    id="q-name"
                                    type="text"
                                    autoComplete="name"
                                    placeholder="Your Full Name"
                                    value={form.name}
                                    onChange={onChange("name")}
                                    className={`${inputBase} ${border("name")} h-[42px] xl:h-[46px] 2xl:h-[52px]`}
                                />
                            </Field>
                            <Field error={errors.email}>
                                <label htmlFor="q-email" className="sr-only">Your Email Address</label>
                                <input
                                    id="q-email"
                                    type="email"
                                    autoComplete="email"
                                    placeholder="Your Email Address"
                                    value={form.email}
                                    onChange={onChange("email")}
                                    className={`${inputBase} ${border("email")} h-[42px] xl:h-[46px] 2xl:h-[52px]`}
                                />
                            </Field>
                            <Field error={errors.phone}>
                                <label htmlFor="q-phone" className="sr-only">Your Contact Number</label>
                                <input
                                    id="q-phone"
                                    type="tel"
                                    autoComplete="tel"
                                    placeholder="Your Contact Number"
                                    value={form.phone}
                                    onChange={onChange("phone")}
                                    className={`${inputBase} ${border("phone")} h-[42px] xl:h-[46px] 2xl:h-[52px]`}
                                />
                            </Field>
                            <Field>
                                <label htmlFor="q-message" className="sr-only">Tell us about your book concept</label>
                                <textarea
                                    id="q-message"
                                    rows={4}
                                    placeholder="Tell us about your book concept (Genre, Word Count, Goals)"
                                    value={form.message}
                                    onChange={onChange("message")}
                                    className={`${inputBase} border-transparent resize-none py-3 h-[100px] xl:h-[112px] 2xl:h-[130px]`}
                                />
                            </Field>
                        </div>

                        <Field error={errors.consent}>
                            <label className="mt-5 flex cursor-pointer items-start gap-2.5">
                                <span className="relative mt-[2px] flex h-[15px] w-[15px] shrink-0 items-center justify-center">
                                    <input
                                        type="checkbox"
                                        checked={form.consent}
                                        onChange={onChange("consent")}
                                        className="peer absolute inset-0 h-full w-full cursor-pointer appearance-none rounded-[3px] border-[1.5px] border-[#0f3d34]/70 bg-white/20 transition-colors checked:border-[#0f3d34] checked:bg-[#0f3d34] focus-visible:ring-2 focus-visible:ring-[#0f3d34]/30"
                                    />
                                    <svg viewBox="0 0 24 24" className="pointer-events-none relative h-[11px] w-[11px] opacity-0 transition-opacity peer-checked:opacity-100" fill="none" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M5 12.5l4.5 4.5L19 7.5" />
                                    </svg>
                                </span>
                                <span className="font-inter text-[11px] leading-[1.5] text-[#0f2d27] xl:text-[11.5px] 2xl:text-[13px]">
                                    By submitting this form and providing your phone number, you agree to receive automated project updates from Spines and accept our{" "}
                                    <a href="/terms" className="underline-offset-2 hover:underline">Terms</a> and{" "}
                                    <a href="/privacy" className="underline-offset-2 hover:underline">Privacy Policy</a>.
                                </span>
                            </label>
                        </Field>

                        <AnimatePresence>
                            {status === "error" && serverError && (
                                <motion.div
                                    role="alert"
                                    initial={{ opacity: 0, y: -6, height: 0 }}
                                    animate={{ opacity: 1, y: 0, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.35, ease: smooth }}
                                    className="font-inter mt-4 rounded-[8px] bg-white/60 px-4 py-3 text-[12.5px] font-medium text-[#7a1020] ring-1 ring-[#7a1020]/20 xl:text-[13.5px]"
                                >
                                    {serverError}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <motion.button
                            variants={formField}
                            type="submit"
                            disabled={status === "sending"}
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.97 }}
                            className="font-inter mt-5 inline-flex h-[42px] min-w-[150px] items-center justify-center gap-2 rounded-full bg-white/45 px-7 text-[14px] font-medium text-[#0f3d34] ring-1 ring-white/70 backdrop-blur-sm transition-colors hover:bg-white/65 disabled:cursor-wait xl:h-[46px] xl:text-[15px] 2xl:h-[52px] 2xl:min-w-[180px] 2xl:text-[16.5px]"
                        >
                            {status === "sending" ? (
                                <>
                                    <motion.span
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
                                        className="h-4 w-4 rounded-full border-2 border-[#0f3d34]/30 border-t-[#0f3d34]"
                                    />
                                    Sending...
                                </>
                            ) : (
                                "Submit Inquiry"
                            )}
                        </motion.button>
                    </motion.form>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const ContactSection = () => {
    const [quoteOpen, setQuoteOpen] = useState(false);

    return (
        <>
            <section id="contact" className="relative w-full overflow-hidden bg-white py-16 sm:py-20 lg:py-24 2xl:py-32">
                <div className="mx-auto w-full max-w-[1000px] px-5 sm:px-8 lg:px-6 xl:max-w-[1120px] 2xl:max-w-[1320px]">
                    <div className="flex flex-col items-center text-center">
                        <motion.h2
                            variants={words}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, margin: "-60px" }}
                            className="font-clash leading-[1.15] tracking-[-0.01em]"
                        >
                            <span className="block text-[30px] font-semibold sm:text-[38px] lg:text-[42px] xl:text-[48px] 2xl:text-[58px]">
                                <SplitWords text="Connect with Spines:" className="text-brand-gradient" />
                            </span>
                            <span className="mt-1 block text-[24px] font-normal text-[#1c1c1c] sm:text-[32px] lg:text-[36px] xl:text-[42px] 2xl:text-[50px]">
                                <SplitWords text="Expert Author Support is Just a Message Away" />
                            </span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.1, delay: 0.4, ease: smooth }}
                            className="font-inter mt-4 max-w-[560px] text-[13px] leading-[1.7] text-[#5a5f66] lg:max-w-[600px] xl:max-w-[660px] xl:text-[14px] 2xl:max-w-[760px] 2xl:text-[16px]"
                        >
                            We are eager to hear about your book! Whether you have questions about our editing packages, distribution channels, or want to discuss a custom publishing plan, the Spines team is here to guide you every step of the way.
                        </motion.p>
                    </div>

                    <motion.ul
                        variants={contactList}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-40px" }}
                        className="mt-9 grid grid-cols-1 gap-7 sm:grid-cols-3 sm:gap-4 lg:mt-10 xl:mt-12"
                    >
                        {contacts.map((c) => {
                            const content = (
                                <>
                                    <motion.span
                                        whileHover={{ y: -4, scale: 1.1 }}
                                        transition={{ duration: 0.4, ease: smooth }}
                                        className="block h-[26px] w-[26px] text-[#1fc79d] xl:h-[30px] xl:w-[30px] 2xl:h-[34px] 2xl:w-[34px]"
                                    >
                                        {c.icon}
                                    </motion.span>
                                    <span className="font-inter mt-3 max-w-[300px] text-[14px] leading-[1.45] text-[#1d2328] transition-colors duration-300 group-hover:text-[#1f9c80] xl:text-[15px] 2xl:text-[17px]">
                                        {c.label}
                                    </span>
                                </>
                            );
                            return (
                                <motion.li key={c.label} variants={contactItem} className="flex justify-center">
                                    {c.href ? (
                                        <a href={c.href} className="group flex flex-col items-center text-center">
                                            {content}
                                        </a>
                                    ) : (
                                        <div className="group flex flex-col items-center text-center">{content}</div>
                                    )}
                                </motion.li>
                            );
                        })}
                    </motion.ul>

                    <div className="mt-12 grid grid-cols-1 items-center gap-12 sm:mt-14 lg:mt-16 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12 xl:gap-16">
                        <div className="mx-auto w-full max-w-[480px] lg:mx-0 lg:max-w-none">
                            <QuoteForm />
                        </div>

                        <motion.div
                            initial={{ opacity: 0, x: 60 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 1.4, delay: 0.2, ease: smooth }}
                            className="text-center lg:text-left"
                        >
                            <h2 className="font-clash leading-[1.08] tracking-[-0.015em]">
                                <span className="block text-[30px] font-normal text-[#1c1c1c] sm:text-[38px] lg:text-[40px] xl:text-[46px] 2xl:text-[56px]">
                                    All-In-One Book
                                </span>
                                <span className="text-brand-gradient mt-1 block text-[32px] font-semibold sm:text-[42px] lg:text-[44px] xl:text-[50px] 2xl:text-[62px]">
                                    Publishing Solutions
                                </span>
                            </h2>
                            <p className="font-inter mx-auto mt-4 max-w-[420px] text-[13px] leading-[1.7] text-[#4b5058] lg:mx-0 xl:max-w-[460px] xl:text-[14px] 2xl:max-w-[540px] 2xl:text-[16px]">
                                Experience a streamlined publishing process with Spines. From manuscript refinement and cover design to global distribution and marketing, we handle the complex technical details so you can share your voice with the world.
                            </p>
                            <button
                                type="button"
                                onClick={() => setQuoteOpen(true)}
                                className="font-inter bg-brand-gradient group mt-5 inline-flex h-[40px] items-center gap-2 rounded-full pl-[5px] pr-5 text-[13.5px] font-medium text-[#0f3d34] shadow-[0_8px_22px_rgba(4,221,166,0.3)] transition-transform duration-500 hover:scale-[1.04] xl:mt-6 xl:h-[46px] xl:text-[15px] 2xl:h-[52px] 2xl:text-[16.5px]"
                            >
                                <span className="transition-transform duration-500 group-hover:rotate-45">
                                    <ArrowCircle className="h-[30px] w-[30px] xl:h-[36px] xl:w-[36px] 2xl:h-[42px] 2xl:w-[42px]" />
                                </span>
                                Get Started
                            </button>
                        </motion.div>
                    </div>
                </div>
            </section>

            <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
        </>
    );
};

export default ContactSection;