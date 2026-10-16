import { motion, type Easing } from "framer-motion";

const smooth: Easing = [0.16, 1, 0.3, 1];

export const starColor = (rating: number) => {
    if (rating >= 4) return "#00b67a";
    if (rating >= 3) return "#73cf11";
    if (rating >= 2) return "#ffce00";
    return "#ff8622";
};

const sizes = {
    sm: "h-[18px] w-[18px] rounded-[2px]",
    md: "h-[22px] w-[22px] rounded-[3px]",
    lg: "h-[30px] w-[30px] rounded-[4px] xl:h-[34px] xl:w-[34px]",
};

const StarShape = () => (
    <svg viewBox="0 0 24 24" className="relative h-[72%] w-[72%]" fill="#ffffff">
        <path d="M12 2.8l2.7 6.1 6.6.6-5 4.4 1.5 6.5L12 17l-5.8 3.4 1.5-6.5-5-4.4 6.6-.6z" />
    </svg>
);

const Stars = ({
    value,
    size = "md",
    animated = false,
    className = "",
}: {
    value: number;
    size?: keyof typeof sizes;
    animated?: boolean;
    className?: string;
}) => {
    const color = starColor(Math.round(value));

    return (
        <div className={`flex items-center gap-[3px] ${className}`} role="img" aria-label={`Rated ${value.toFixed(1)} out of 5`}>
            {Array.from({ length: 5 }).map((_, i) => {
                const fill = Math.max(0, Math.min(1, value - i));
                return (
                    <motion.span
                        key={i}
                        initial={animated ? { scale: 0, rotate: -30, opacity: 0 } : false}
                        whileInView={animated ? { scale: 1, rotate: 0, opacity: 1 } : undefined}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 + i * 0.08, ease: smooth }}
                        className={`relative flex items-center justify-center overflow-hidden bg-[#dcdce6] ${sizes[size]}`}
                    >
                        <span className="absolute inset-y-0 left-0" style={{ width: `${fill * 100}%`, background: color }} />
                        <StarShape />
                    </motion.span>
                );
            })}
        </div>
    );
};

export default Stars;