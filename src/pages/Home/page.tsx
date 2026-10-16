import About from "../../components/LandingPage/About";
import DidYouKnow from "../../components/LandingPage/Didyouknow";
import FAQ from "../../components/LandingPage/Faqs";
import Footer from "../../components/Footer";
import GlobalAudience from "../../components/LandingPage/GlobalAudience";
import Hero from "../../components/LandingPage/Hero";
import HowItWorks from "../../components/LandingPage/Howitworks";
import Navbar from "../../components/Navbar";
import Partners from "../../components/Partners";
import Stats from "../../components/LandingPage/Stats";
import Testimonials from "../../components/LandingPage/Testimonials";


const HomePage = () => {
    return (
        <main>
            <Navbar />
            <Hero />
            <Stats />
            <About />
            <DidYouKnow />
            <Partners />
            <HowItWorks />
            <GlobalAudience />
            <Testimonials />
            <FAQ />
            <Footer />
        </main>
    );
};

export default HomePage;