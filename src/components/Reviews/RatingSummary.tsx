import { motion, type Easing } from "framer-motion";
import { getSummary, ratingLabel, type Review } from "../../data/reviewsData";
import Stars from "./ReviewStars";


const smooth: Easing = [0.16, 1, 0.3, 1];

const RatingSummary = ({ list, compact = false }: { list: Review[]; compact?: boolean }) => {
    const { total, average, distribution } = getSummary(list);

    return (
        <div className="w-full">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <span className="font-clash text-[22px] font-semibold text-[#141414] xl:text-[24px] 2xl:text-[28px]">{ratingLabel(average)}</span>
                <Stars value={average} size={compact ? "md" : "lg"} animated />
            </div>
            <p className="font-inter mt-2 text-[13px] text-[#4a4f57] xl:text-[14px] 2xl:text-[15.5px]">
                Rated <span className="font-semibold text-[#141414]">{average.toFixed(1)}</span> / 5 based on{" "}
                <a href="#reviews" className="font-semibold text-[#141414] underline underline-offset-2 transition-colors hover:text-[#1f9c80]">
                    {total} reviews
                </a>
            </p>

            {!compact && (
                <ul className="mt-5 flex flex-col gap-2.5">
                    {distribution.map((d, i) => (
                        <li key={d.star} className="font-inter flex items-center gap-3 text-[12.5px] text-[#4a4f57] xl:text-[13.5px]">
                            <span className="w-[44px] shrink-0">{d.star}-star</span>
                            <span className="relative h-[8px] flex-1 overflow-hidden rounded-full bg-[#eceef1]">
                                <motion.span
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${d.percent}%` }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1.4, delay: 0.3 + i * 0.1, ease: smooth }}
                                    className="absolute inset-y-0 left-0 rounded-full"
                                    style={{ background: d.star >= 4 ? "#00b67a" : d.star === 3 ? "#73cf11" : d.star === 2 ? "#ffce00" : "#ff8622" }}
                                />
                            </span>
                            <span className="w-[38px] shrink-0 text-right">{d.percent}%</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default RatingSummary;