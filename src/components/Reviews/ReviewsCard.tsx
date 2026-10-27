import { forwardRef, useState } from "react";
import { AnimatePresence, motion, type Easing } from "framer-motion";
import { formatDate, type Review } from "../../data/reviewsData";
import Stars from "./ReviewStars";


const smooth: Easing = [0.16, 1, 0.3, 1];

const avatarColors = ["#e8f8f2", "#efe8fb", "#fff3e0", "#e6f1fd", "#fde8ef", "#eef6e4"];
const avatarText = ["#13866a", "#6a3fb5", "#b06a00", "#2a62b8", "#b8345f", "#4d7a1f"];

const initials = (name: string) =>
    name
        .split(" ")
        .map((p) => p[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();

const VerifiedBadge = () => (
    <span className="font-inter inline-flex shrink-0 items-center gap-1 text-[11.5px] font-medium text-[#13866a] xl:text-[12.5px]">
        <svg viewBox="0 0 24 24" className="h-[13px] w-[13px]" fill="#00b67a">
            <path d="M12 2l2.4 1.8 3-.2 1 2.8 2.6 1.6-.7 2.9.7 2.9-2.6 1.6-1 2.8-3-.2L12 22l-2.4-1.8-3 .2-1-2.8L3 16l.7-2.9L3 10.2l2.6-1.6 1-2.8 3 .2z" />
            <path d="M8.5 12.2l2.4 2.4 4.6-4.8" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Verified
    </span>
);

const ReviewCard = forwardRef<HTMLElement, { review: Review }>(({ review }, ref) => {
    const [expanded, setExpanded] = useState(false);
    const [imgFailed, setImgFailed] = useState(false);
    const long = review.text.length > 170;
    const color = review.id % avatarColors.length;

    return (
        <motion.article
            ref={ref}
            layout
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.3 } }}
            transition={{ duration: 0.8, ease: smooth, layout: { duration: 0.6, ease: smooth } }}
            className="group flex h-fit flex-col rounded-[14px] border border-[#eceef1] bg-white p-5 shadow-[0_4px_18px_rgba(20,20,40,0.04)] transition-[border-color,box-shadow,transform] duration-500 hover:-translate-y-1 hover:border-[#40C1AC]/40 hover:shadow-[0_18px_40px_rgba(64,193,172,0.14)] xl:p-6 2xl:p-7"
        >
            <div className="flex items-center gap-3">
                {review.avatar && !imgFailed ? (
                    <img
                        src={review.avatar}
                        alt={review.name}
                        loading="lazy"
                        draggable={false}
                        onError={() => setImgFailed(true)}
                        className="h-[40px] w-[40px] shrink-0 select-none rounded-full object-cover ring-2 ring-white shadow-[0_4px_12px_rgba(20,20,40,0.12)] transition-transform duration-500 group-hover:scale-105 xl:h-[44px] xl:w-[44px]"
                    />
                ) : (
                    <span
                        className="font-clash flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full text-[14px] font-semibold xl:h-[44px] xl:w-[44px] xl:text-[15px]"
                        style={{ background: avatarColors[color], color: avatarText[color] }}
                    >
                        {initials(review.name)}
                    </span>
                )}
                <div className="min-w-0">
                    <p className="font-inter truncate text-[14px] font-semibold text-[#141414] xl:text-[15px] 2xl:text-[16.5px]">{review.name}</p>
                    <div className="mt-0.5 flex min-w-0 items-center gap-2">
                        <span className="font-inter truncate text-[11.5px] text-[#6b7280] xl:text-[12.5px]">{review.role}</span>
                        {review.verified && (
                            <>
                                <span className="h-[3px] w-[3px] shrink-0 rounded-full bg-[#c7cbd1]" />
                                <VerifiedBadge />
                            </>
                        )}
                    </div>
                </div>
            </div>

            <div className="my-4 h-px bg-[#f0f1f3]" />

            <div className="flex items-center justify-between gap-3">
                <Stars value={review.rating} size="sm" />
                <time dateTime={review.date} className="font-inter text-[11.5px] text-[#6b7280] xl:text-[12.5px]">
                    {formatDate(review.date)}
                </time>
            </div>

            <h3 className="font-clash mt-3 text-[16px] font-semibold leading-[1.35] text-[#141414] xl:text-[17px] 2xl:text-[19px]">{review.title}</h3>

            <motion.div layout="position" className="relative mt-2">
                <AnimatePresence initial={false} mode="wait">
                    <motion.p
                        key={expanded ? "full" : "short"}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`font-inter text-[13px] leading-[1.7] text-[#3d434b] xl:text-[14px] 2xl:text-[15.5px] ${!expanded && long ? "line-clamp-4" : ""}`}
                    >
                        {review.text}
                    </motion.p>
                </AnimatePresence>
            </motion.div>

            {long && (
                <button
                    type="button"
                    onClick={() => setExpanded((e) => !e)}
                    className="font-inter mt-2 w-fit text-[12.5px] font-semibold text-[#13866a] underline-offset-2 transition-colors hover:underline xl:text-[13.5px]"
                >
                    {expanded ? "Show less" : "Read more"}
                </button>
            )}

            <div className="mt-4 flex items-center justify-between">
                <span className="font-inter rounded-full bg-[#e8f8f2] px-3 py-1 text-[11px] font-medium text-[#13866a] xl:text-[12px]">
                    {review.service}
                </span>
                <span className="font-inter text-[11px] text-[#9aa0a8] xl:text-[12px]">Spine Publicationss</span>
            </div>
        </motion.article>
    );
});

ReviewCard.displayName = "ReviewCard";

export default ReviewCard;