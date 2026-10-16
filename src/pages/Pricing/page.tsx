import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Membership from "../../components/Pricing/Membership";
import PricingHero from "../../components/Pricing/PricingHero";
import PricingPlans from "../../components/Pricing/PricingPlans";
import PricingStats from "../../components/Pricing/PricingStats";
import PricingTestimonials from "../../components/Pricing/PricingTestimonials";



const PricingPage = () => {
    return (
        <main>
            <Navbar />
            <PricingHero />
            <PricingStats />
            <PricingPlans />
            <PricingTestimonials />
            <Membership />
            <Footer />
        </main>
    );
};

export default PricingPage;