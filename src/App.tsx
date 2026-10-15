import Hero from "./components/LandingPage/Hero";
import Stats from "./components/LandingPage/Stats";
import About from "./components/LandingPage/About";
import DidYouKnow from "./components/LandingPage/Didyouknow";
import Partners from "./components/Partners";
import Navbar from "./components/Navbar";
import HowItWorks from "./components/LandingPage/Howitworks";
import GlobalAudience from "./components/LandingPage/GlobalAudience";
import Testimonials from "./components/LandingPage/Testimonials";
import FAQ from "./components/LandingPage/Faqs";
import Footer from "./components/Footer";

function App() {
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
}

export default App;