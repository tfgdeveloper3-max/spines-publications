import { useCallback, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ReviewsHero from "../../components/Reviews/ReviewsHero";
import ReviewsList from "../../components/Reviews/ReviewsList";
import WriteReviewModal from "../../components/Reviews/WriteReviewModal";
import ReviewsFAQ from "../../components/Reviews/ReviewsFaq";

const ReviewsPage = () => {
    const [writing, setWriting] = useState(false);
    const openWrite = useCallback(() => setWriting(true), []);
    const closeWrite = useCallback(() => setWriting(false), []);

    return (
        <main>
            <Navbar />
            <ReviewsHero onWrite={openWrite} />
            <ReviewsList onWrite={openWrite} />
            <ReviewsFAQ />
            <Footer />
            <WriteReviewModal open={writing} onClose={closeWrite} />
        </main>
    );
};

export default ReviewsPage;