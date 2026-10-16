import AboutFAQ from "../../components/Aboutus/AboutFaqs";
import AboutHero from "../../components/Aboutus/AboutHero";
import AboutStats from "../../components/Aboutus/AboutStats";
import AboutTestimonials from "../../components/Aboutus/AboutTestimonials";
import AuthorFirst from "../../components/Aboutus/AuthorFirst";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";


const AboutPage = () => {
    return (
        <main>
            <Navbar />
            <AboutHero />
            <AboutStats />
            <AuthorFirst />
            <AboutTestimonials />
            <AboutFAQ />
            <Footer />
        </main>
    );
};

export default AboutPage;