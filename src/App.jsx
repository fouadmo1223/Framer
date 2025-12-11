import "./App.css";
import { motion } from "motion/react";
import FadeIn from "./motion/FadeIn";
import Slide from "./motion/Slide";
import Button from "./motion/Button";
import Variants from "./motion/Variants";
import Drag from "./motion/Drag";
import Modal from "./motion/Modal";
import Layout from "./motion/Layout";
import { LiveBadge } from "./motion/LiveBadge";

function App() {
  return (
    <div className="min-h-screen flex justify-center items-center">
      {/* <FadeIn /> */}
      {/* <Slide /> */}
      {/* <Button /> */}
      {/* <Variants /> */}

      {/* <Drag /> */}
      {/* <Modal /> */}
      {/* <Layout /> */}
      <LiveBadge />
    </div>
  );
}

export default App;
