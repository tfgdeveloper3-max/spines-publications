import { useEffect, useRef, useState, type ReactNode } from "react";
import { animate, motion, useInView, type Easing } from "framer-motion";

const smooth: Easing = [0.16, 1, 0.3, 1];

const BooksIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
        <path d="M4 4.5h3v15H4zM8.5 4.5h3v15h-3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M13.2 5.6l2.9-.8 3.9 14.5-2.9.8z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M4 8h3M8.5 8h3M4 16h3M8.5 16h3" stroke="currentColor" strokeWidth="1.6" />
    </svg>
);

const RefreshIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
        <path d="M20 11a8 8 0 0 0-14.3-4.9L4 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M4 4v4h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 13a8 8 0 0 0 14.3 4.9L20 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M20 20v-4h-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const TrendIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
        <path d="M3 17l6-6 4 4 8-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15 7h6v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

type Stat = {
    icon: ReactNode;
    value: number;
    suffix: string;
    label: string;
};

const stats: Stat[] = [
    { icon: <BooksIcon />, value: 10000, suffix: "+", label: "Books published" },
    { icon: <RefreshIcon />, value: 1200, suffix: "+", label: "Best Sellers" },
    { icon: <TrendIcon />, value: 28, suffix: "%", label: "Annual growth in royalty payout" },
];

const Counter = ({ to, start }: { to: number; start: boolean }) => {
    const [val, setVal] = useState(0);

    useEffect(() => {
        if (!start) return;
        const controls = animate(0, to, {
            duration: 2.8,
            ease: smooth,
            onUpdate: (v) => setVal(Math.round(v)),
        });
        return () => controls.stop();
    }, [start, to]);

    return <>{val.toLocaleString("en-US")}</>;
};

const PricingStats = () => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-60px" });

    return (
        <section className="bg-brand-gradient relative w-full overflow-hidden">
            <div
                ref={ref}
                className="mx-auto grid w-full max-w-[1180px] grid-cols-1 px-6 py-6 sm:grid-cols-3 sm:px-6 sm:py-7 lg:py-8 xl:py-9"
            >
                {stats.map((s, i) => (
                    <motion.div
                        key={s.label}
                        initial={{ opacity: 0, y: 30 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 1.4, delay: i * 0.2, ease: smooth }}
                        className={`flex justify-center py-5 sm:py-1 ${i > 0 ? "border-t border-[#0f3d34]/15 sm:border-l sm:border-t-0" : ""
                            }`}
                    >
                        <div className="grid grid-cols-[auto_1fr] items-center gap-x-2 lg:gap-x-3">
                            <span className="h-[26px] w-[26px] text-[#123c35] sm:h-[24px] sm:w-[24px] md:h-[28px] md:w-[28px] lg:h-[30px] lg:w-[30px] xl:h-[34px] xl:w-[34px]">
                                {s.icon}
                            </span>
                            <h3 className="font-clash text-[32px] font-medium leading-none tracking-[-0.02em] text-[#123c35] sm:text-[26px] md:text-[30px] lg:text-[34px] xl:text-[38px] 2xl:text-[42px]">
                                <Counter to={s.value} start={inView} />
                                <span className="ml-1">{s.suffix}</span>
                            </h3>
                            <p className="font-inter col-start-2 mt-1.5 max-w-[150px] text-[14px] leading-[1.3] text-[#123c35]/85 sm:text-[12px] md:text-[13px] lg:max-w-[170px] lg:text-[14px] xl:text-[15px]">
                                {s.label}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default PricingStats;