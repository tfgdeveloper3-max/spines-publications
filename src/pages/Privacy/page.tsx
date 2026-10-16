import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import LegalPage from "../../components/Legal/Legalpage";
import { privacy } from "../../components/Legal/Legalcontent";

const PrivacyPage = () => (
    <main>
        <Navbar />
        <LegalPage doc={privacy} />
        <Footer />
    </main>
);

export default PrivacyPage;