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
import Timeline from "./gsap/Timeline";
import ScrollTriggerDemo from "./gsap/ScrollTriggerDemo";
import Button from "./motion/Button";
import ScrollTriger from "./gsap/plugins/ScrollTrigger";
import SecondScrollTrigger from "./gsap/plugins/SecondScrollTrigger";
import ThirdScroll from "./gsap/plugins/ThirdScroll";
import Xspacer from "./gsap/plugins/Xspacer";
import ScrollSmotherDemo from "./gsap/plugins/ScrollSmotherDemo";
import ScrollButtonsDemo from "./gsap/plugins/ScrollButtonsDemo";
import SimpleParallax from "./gsap/plugins/SimpleParallax";
import Product from "./Product";
import QuickSitter from "./gsap/QuickSitter";
import SplitTextDemo from "./gsap/plugins/SplitTextDemo";
import AnimatedChars from "./gsap/plugins/AnimatedChars";
import KeyFrames from "./gsap/KeyFrames";
import SVGDrawing from "./gsap/plugins/SVGDrawing";
import ObserverDemo from "./gsap/plugins/ObserverDemo";
import ObserverPractice from "./gsap/plugins/ObserverPractice";
import DragDemo from "./gsap/plugins/DragDemo";
import ScrumbleDemo from "./gsap/plugins/ScrumbleDemo";
import ScrollMotionDemo from "./gsap/plugins/ScrollMotionDemo";
import MountainScroll from "./gsap/plugins/MountainScroll";
import AirplaneScroll from "./gsap/plugins/AirplaneScroll";
import StaggerText from "./gsap/examples/StaggerText";
import Opening from "./gsap/examples/Opening";
import ParrelxEfect from "./gsap/examples/ParrelxEfect";
import Frames from "./gsap/examples/Frames";
import ToggleButton from "./gsap/examples/ToggleButton";
import GsapToggle from "./gsap/examples/GsapToggle";
import VideoScrub from "./gsap/examples/VideoScrub";
import NumberAlongPath from "./gsap/examples/NumberAlongPath";
import ScrollPathDemo from "./gsap/examples/ScrollPathDemo";

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

      {/* <div className="min-h-screen h-[11180px] w-full flex-col flex justify-center items-center gap-10"> */}
      <div className="min-h-screen h-screen w-full bg-black">
        {/* <Starter />
        <HelloSVG />
        <ClickEvent />
        <CharAnimation /> */}
        {/* <Timeline /> */}
        {/* <ScrollTriggerDemo /> */}
        {/* <Button /> */}
        {/* <ScrollTriger /> */}
        {/* <SecondScrollTrigger /> */}
        {/* <ThirdScroll /> */}
        {/* <SimpleParallax /> */}
        {/* <Product /> */}
        {/* <QuickSitter /> */}
        {/* <SplitTextDemo /> */}
        {/* <AnimatedChars /> */}
        {/* <KeyFrames /> */}
        {/* <ObserverDemo /> */}
        {/* <ObserverPractice /> */}
        {/* <DragDemo /> */}
        {/* <ScrumbleDemo /> */}
        {/* <ScrollMotionDemo /> */}
        {/* <MountainScroll /> */}
        {/* <AirplaneScroll /> */}
        {/* <StaggerText /> */}
        {/* <Opening /> */}
        {/* <ParrelxEfect /> */}
        {/* <Frames /> */}
        {/* <ToggleButton /> */}
        {/* <GsapToggle /> */}
        {/* <VideoScrub /> */}
        {/* <NumberAlongPath /> */}
        <ScrollPathDemo />
      </div>
    </>
  );
}

export default App;
