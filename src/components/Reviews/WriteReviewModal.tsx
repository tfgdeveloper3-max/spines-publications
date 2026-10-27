import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion, type Easing } from "framer-motion";
import { starColor } from "./ReviewStars";
import { services } from "../../data/reviewsData";

const smooth: Easing = [0.16, 1, 0.3, 1];
const labels = ["Bad", "Poor", "Average", "Great", "Excellent"];

type Form = { rating: number; title: string; text: string; name: string; email: string; service: string };
type Errors = Partial<Record<keyof Form, string>>;

const empty: Form = { rating: 0, title: "", text: "", name: "", email: "", service: "" };

const input =
    "font-inter w-full rounded-[10px] border border-[#e3e6ea] bg-white px-4 text-[14px] text-[#141414] placeholder:text-[#9aa0a8] outline-none transition-all duration-300 focus:border-[#40C1AC] focus:shadow-[0_0_0_4px_rgba(64,193,172,0.15)]";

const StarPicker = ({ value, onChange }: { value: number; onChange: (v: number) => void }) => {
    const [hover, setHover] = useState(0);
    const shown = hover || value;

    return (
        <div>
            <div className="flex items-center gap-1.5" onMouseLeave={() => setHover(0)} role="radiogroup" aria-label="Your rating">
                {[1, 2, 3, 4, 5].map((n) => {
                    const on = n <= shown;
                    return (
                        <motion.button
                            key={n}
                            type="button"
                            role="radio"
                            aria-checked={value === n}
                            aria-label={`${n} star${n > 1 ? "s" : ""}, ${labels[n - 1]}`}
                            onMouseEnter={() => setHover(n)}
                            onFocus={() => setHover(n)}
                            onBlur={() => setHover(0)}
                            onClick={() => onChange(n)}
                            whileHover={{ scale: 1.12 }}
                            whileTap={{ scale: 0.9 }}
                            className="flex h-[38px] w-[38px] items-center justify-center rounded-[5px] outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-[#40C1AC] sm:h-[42px] sm:w-[42px]"
                            style={{ background: on ? starColor(shown) : "#dcdce6" }}
                        >
                            <svg viewBox="0 0 24 24" className="h-[70%] w-[70%]" fill="#ffffff">
                                <path d="M12 2.8l2.7 6.1 6.6.6-5 4.4 1.5 6.5L12 17l-5.8 3.4 1.5-6.5-5-4.4 6.6-.6z" />
                            </svg>
                        </motion.button>
                    );
                })}
                <AnimatePresence mode="wait">
                    {shown > 0 && (
                        <motion.span
                            key={shown}
                            initial={{ opacity: 0, x: -6 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 6 }}
                            transition={{ duration: 0.2 }}
                            className="font-inter ml-2 text-[14px] font-semibold text-[#141414]"
                        >
                            {labels[shown - 1]}
                        </motion.span>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

const ErrorText = ({ msg }: { msg?: string }) => (
    <AnimatePresence>
        {msg && (
            <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="font-inter mt-1 text-[12px] font-medium text-[#c0392b]"
            >
                {msg}
            </motion.p>
        )}
    </AnimatePresence>
);

const WriteReviewModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
    const [form, setForm] = useState<Form>(empty);
    const [errors, setErrors] = useState<Errors>({});
    const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
    const dialogRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", onKey);
        setTimeout(() => dialogRef.current?.querySelector<HTMLElement>("button[role='radio']")?.focus(), 350);
        return () => {
            document.body.style.overflow = prev;
            window.removeEventListener("keydown", onKey);
        };
    }, [open, onClose]);

    useEffect(() => {
        if (!open) {
            const t = setTimeout(() => {
                setForm(empty);
                setErrors({});
                setStatus("idle");
            }, 400);
            return () => clearTimeout(t);
        }
    }, [open]);

    const set = <K extends keyof Form>(k: K, v: Form[K]) => {
        setForm((f) => ({ ...f, [k]: v }));
        if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
    };

    const submit = async (e: FormEvent) => {
        e.preventDefault();
        const er: Errors = {};
        if (!form.rating) er.rating = "Please select a star rating";
        if (!form.title.trim()) er.title = "Please add a title";
        if (form.text.trim().length < 20) er.text = "Please write at least 20 characters";
        if (!form.name.trim()) er.name = "Please enter your name";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) er.email = "Please enter a valid email";
        if (!form.service) er.service = "Please choose a service";
        setErrors(er);
        if (Object.keys(er).length) return;
        setStatus("sending");
        await new Promise((r) => setTimeout(r, 1400));
        setStatus("sent");
    };

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="absolute inset-0 bg-[#0b1f1b]/50 backdrop-blur-sm" onClick={onClose} />

                    <motion.div
                        ref={dialogRef}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="write-review-title"
                        initial={{ opacity: 0, y: 60, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 40, scale: 0.98 }}
                        transition={{ duration: 0.6, ease: smooth }}
                        className="relative max-h-[92vh] w-full overflow-y-auto rounded-t-[22px] bg-white p-6 shadow-[0_30px_80px_rgba(0,0,0,0.25)] sm:max-w-[560px] sm:rounded-[22px] sm:p-8"
                    >
                        <button
                            type="button"
                            onClick={onClose}
                            aria-label="Close"
                            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#f3f4f6] text-[#4a4f57] transition-colors hover:bg-[#e8f8f2] hover:text-[#13866a]"
                        >
                            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                                <path d="M6 6l12 12M18 6L6 18" />
                            </svg>
                        </button>

                        <AnimatePresence mode="wait">
                            {status === "sent" ? (
                                <motion.div
                                    key="sent"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.6, ease: smooth }}
                                    className="flex flex-col items-center py-8 text-center"
                                >
                                    <motion.span
                                        initial={{ scale: 0, rotate: -90 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        transition={{ duration: 0.8, delay: 0.1, ease: smooth }}
                                        className="bg-brand-gradient flex h-16 w-16 items-center justify-center rounded-full shadow-[0_10px_30px_rgba(4,221,166,0.4)]"
                                    >
                                        <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="#0f3d34" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                                            <motion.path d="M5 12.5l4.5 4.5L19 7.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.5 }} />
                                        </svg>
                                    </motion.span>
                                    <h3 className="font-clash mt-5 text-[24px] font-semibold text-[#141414]">Thank you for your review!</h3>
                                    <p className="font-inter mt-2 max-w-[360px] text-[14px] leading-[1.6] text-[#4a4f57]">
                                        Your review has been submitted and will appear on this page once our team verifies it.
                                    </p>
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="font-inter bg-brand-gradient mt-6 rounded-full px-7 py-3 text-[14.5px] font-medium text-[#0f3d34]"
                                    >
                                        Done
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.form key="form" noValidate onSubmit={submit} exit={{ opacity: 0 }}>
                                    <h3 id="write-review-title" className="font-clash pr-10 text-[24px] font-semibold text-[#141414] sm:text-[26px]">
                                        Write a <span className="text-brand-gradient">review</span>
                                    </h3>
                                    <p className="font-inter mt-1 text-[13.5px] text-[#4a4f57]">Tell other authors about your experience with Spine Publications.</p>

                                    <div className="mt-6">
                                        <p className="font-inter mb-2 text-[13px] font-semibold text-[#141414]">Rate your experience</p>
                                        <StarPicker value={form.rating} onChange={(v) => set("rating", v)} />
                                        <ErrorText msg={errors.rating} />
                                    </div>

                                    <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <div>
                                            <label htmlFor="rv-name" className="font-inter mb-1.5 block text-[13px] font-semibold text-[#141414]">Your name</label>
                                            <input id="rv-name" value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Jane Doe" autoComplete="name" className={`${input} h-[46px]`} />
                                            <ErrorText msg={errors.name} />
                                        </div>
                                        <div>
                                            <label htmlFor="rv-email" className="font-inter mb-1.5 block text-[13px] font-semibold text-[#141414]">Email</label>
                                            <input id="rv-email" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="jane@email.com" autoComplete="email" className={`${input} h-[46px]`} />
                                            <ErrorText msg={errors.email} />
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <label htmlFor="rv-service" className="font-inter mb-1.5 block text-[13px] font-semibold text-[#141414]">Service you used</label>
                                        <select id="rv-service" value={form.service} onChange={(e) => set("service", e.target.value)} className={`${input} h-[46px] cursor-pointer`}>
                                            <option value="">Select a service</option>
                                            {services.map((s) => (
                                                <option key={s} value={s}>{s}</option>
                                            ))}
                                        </select>
                                        <ErrorText msg={errors.service} />
                                    </div>

                                    <div className="mt-4">
                                        <label htmlFor="rv-title" className="font-inter mb-1.5 block text-[13px] font-semibold text-[#141414]">Review title</label>
                                        <input id="rv-title" value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="Sum up your experience" className={`${input} h-[46px]`} />
                                        <ErrorText msg={errors.title} />
                                    </div>

                                    <div className="mt-4">
                                        <label htmlFor="rv-text" className="font-inter mb-1.5 block text-[13px] font-semibold text-[#141414]">Your review</label>
                                        <textarea
                                            id="rv-text"
                                            rows={4}
                                            value={form.text}
                                            onChange={(e) => set("text", e.target.value)}
                                            placeholder="What did you like? How was working with the team?"
                                            className={`${input} resize-none py-3`}
                                        />
                                        <div className="flex justify-between">
                                            <ErrorText msg={errors.text} />
                                            <span className="font-inter ml-auto mt-1 text-[11.5px] text-[#9aa0a8]">{form.text.length} characters</span>
                                        </div>
                                    </div>

                                    <motion.button
                                        type="submit"
                                        disabled={status === "sending"}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="font-inter bg-brand-gradient mt-6 flex h-[50px] w-full items-center justify-center gap-2 rounded-full text-[15px] font-semibold text-[#0f3d34] shadow-[0_10px_26px_rgba(4,221,166,0.35)] disabled:cursor-wait"
                                    >
                                        {status === "sending" ? (
                                            <>
                                                <motion.span
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
                                                    className="h-4 w-4 rounded-full border-2 border-[#0f3d34]/30 border-t-[#0f3d34]"
                                                />
                                                Submitting...
                                            </>
                                        ) : (
                                            "Submit review"
                                        )}
                                    </motion.button>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default WriteReviewModal;