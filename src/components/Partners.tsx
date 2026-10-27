import { motion, type Easing } from "framer-motion";

const smooth: Easing = [0.16, 1, 0.3, 1];

const logos = [
    { src: "/images/Barnes-Noble.png", alt: "Barnes & Noble", h: "h-[22px] xl:h-[26px] 2xl:h-[30px]" },
    { src: "/images/Amazon-Kindle.png", alt: "Amazon Kindle", h: "h-[20px] xl:h-[24px] 2xl:h-[28px]" },
    { src: "/images/iBook.png", alt: "Apple iBooks", h: "h-[24px] xl:h-[28px] 2xl:h-[32px]" },
    { src: "/images/WaterStones.png", alt: "Waterstones", h: "h-[18px] xl:h-[21px] 2xl:h-[24px]" },
    { src: "/images/Scribd.png", alt: "Scribd", h: "h-[24px] xl:h-[28px] 2xl:h-[32px]" },
    { src: "/images/IngramSparks.png", alt: "IngramSpark", h: "h-[20px] xl:h-[23px] 2xl:h-[27px]" },
];

const track = [...logos, ...logos, ...logos, ...logos];

const Partners = () => {
    return (
        <section className="relative w-full overflow-hidden bg-white pb-26 pt-4 sm:pb-20 lg:pb-24">
            <style>{`
                @keyframes partners-marquee {
                    from { transform: translate3d(0, 0, 0); }
                    to { transform: translate3d(-50%, 0, 0); }
                }
                .partners-track {
                    animation: partners-marquee 80s linear infinite;
                }
                .partners-wrap:hover .partners-track {
                    animation-play-state: paused;
                }
                @media (max-width: 1023px) {
                    .partners-track { animation-duration: 56s; }
                }
                @media (prefers-reduced-motion: reduce) {
                    .partners-track { animation: none; }
                }
            `}</style>

            <motion.div
                initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 1.3, ease: smooth }}
                className="partners-wrap relative mx-auto w-full max-w-[1280px] 2xl:max-w-[1440px]"
                style={{
                    WebkitMaskImage: "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
                    maskImage: "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
                }}
            >
                <div className="partners-track flex w-max items-center will-change-transform">
                    {track.map((l, i) => (
                        <div
                            key={i}
                            aria-hidden={i >= logos.length}
                            className="flex shrink-0 items-center px-7 sm:px-14 lg:px-12 xl:px-14 2xl:px-16"
                        >
                            <img
                                src={l.src}
                                alt={i < logos.length ? l.alt : ""}
                                draggable={false}
                                className={`${l.h} w-auto select-none object-contain transition-transform duration-500 hover:-translate-y-1 hover:scale-75`}
                            />
                        </div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default Partners;