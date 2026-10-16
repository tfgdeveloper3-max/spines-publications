import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Partners from "../../components/Partners";
import ServicesFAQ from "../../components/Services/ServicesFaqs";
import ServicesGrid from "../../components/Services/ServicesGrid";
import ServicesGrid2 from "../../components/Services/ServicesGrid2";
import ServicesHero from "../../components/Services/ServicesHero";
import ServicesStats from "../../components/Services/ServicesStats";
import ServicesTestimonials from "../../components/Services/ServicesTestimonials";


const ServicesPage = () => {
    return (
        <main>
            <Navbar />
            <ServicesHero />
            <ServicesStats />
            <ServicesGrid />
            <Partners />
            <ServicesGrid2 />
            <ServicesTestimonials />
            <ServicesFAQ />
            <Footer />
        </main>
    );
};

export default ServicesPage;