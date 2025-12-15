import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import Navbar from "./motion/pagesAnimation/Navbar";
import TextAnimation from "./motion/TextAnimation";
import Bee from "./motion/Bee";
import Starter from "./gsap/Starter";
import HelloSVG from "./gsap/Hellosvg";
import ClickEvent from "./gsap/ClickEvent";
import CharAnimation from "./gsap/CharAnimation";

// Reusable Page Wrapper (for animations)
const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.4 }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
};

// Simple pages
const Home = () => (
  <PageTransition>
    <div className="min-h-screen flex justify-center items-center bg-blue-100">
      <h1 className="text-4xl font-bold text-blue-700">Home Page</h1>
    </div>
  </PageTransition>
);

const About = () => (
  <PageTransition>
    <div className="min-h-screen flex justify-center items-center bg-green-100">
      <h1 className="text-4xl font-bold text-green-700">About Page</h1>
    </div>
  </PageTransition>
);

const Services = () => (
  <PageTransition>
    <div className="min-h-screen flex justify-center items-center bg-purple-100">
      <h1 className="text-4xl font-bold text-purple-700">Services Page</h1>
    </div>
  </PageTransition>
);

const Contact = () => (
  <PageTransition>
    <div className="min-h-screen flex justify-center items-center bg-orange-100">
      <h1 className="text-4xl font-bold text-orange-700">Contact Page</h1>
    </div>
  </PageTransition>
);

function App() {
  const location = useLocation();

  return (
    <>
      {/* <Navbar />

      <div className="pt-20 overflow-hidden">
        <div className="mb-5">
          <TextAnimation />
        </div>

        <Bee />
        padding so navbar doesn't cover content
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </AnimatePresence>
      </div> */}

      {/* GSAAAAP  */}

      <div className="min-h-screen w-full flex-col flex justify-center items-center gap-10">
        <Starter />
        <HelloSVG />
        <ClickEvent />
        <CharAnimation />
      </div>
    </>
  );
}

export default App;
