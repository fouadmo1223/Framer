import "./App.css";
import { motion } from "motion/react";
import FadeIn from "./motion/FadeIn";
import Slide from "./motion/Slide";
import Button from "./motion/Button";
import Variants from "./motion/Variants";
import Drag from "./motion/Drag";
import Modal from "./motion/Modal";

function App() {
  return (
    <div className="min-h-screen flex justify-center items-center">
      {/* <FadeIn /> */}
      {/* <Slide /> */}
      {/* <Button /> */}
      {/* <Variants /> */}

      {/* <Drag /> */}
      <Modal />
    </div>
  );
}

export default App;
