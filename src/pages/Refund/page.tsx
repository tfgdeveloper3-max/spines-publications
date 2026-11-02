import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { refund } from "../../components/Legal/refundContent";
import LegalPage from "../../components/Legal/Legalpage";

const RefundPage = () => {
    return (
        <>
            <Navbar />
            <main>
                <LegalPage doc={refund} />
            </main>
            <Footer />
        </>
    );
};

export default RefundPage;