import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import LegalPage from "../../components/Legal/Legalpage";
import { terms } from "../../components/Legal/Legalcontent";

const TermsPage = () => (
    <main>
        <Navbar />
        <LegalPage doc={terms} />
        <Footer />
    </main>
);

export default TermsPage;