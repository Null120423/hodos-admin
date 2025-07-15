import CTA from "./components/CTA";
import Demo from "./components/Demo";
import Features from "./components/Features";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import HowToInstall from "./components/HowToInstall";
import Impact from "./components/Impact";
import ProblemSolution from "./components/ProblemSolution";

function LandingPageScreen() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <ProblemSolution />
      <Features />
      <Impact />
      <HowToInstall />
      <Demo />
      <CTA />
      <Footer />
    </div>
  );
}

export default LandingPageScreen;
