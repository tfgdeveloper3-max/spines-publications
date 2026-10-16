import ContactHero from "../../components/Contact/ContactHero";
import ContactSection from "../../components/Contact/ContactSection";
import ContactStats from "../../components/Contact/ContactStats";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";



const ContactPage = () => {
    return (
        <main>
            <Navbar />
            <ContactHero />
            <ContactStats />
            <ContactSection />
            <Footer />
        </main>
    );
};

export default ContactPage;