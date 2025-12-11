import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const ulVariant = {
    hidden: { x: "10vw", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        staggerChildren: 0.15,
      },
    },
    exit: {
      x: "10vw",
      opacity: 0,
      transition: { duration: 0.3 },
    },
  };

  const liVariant = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          MyLogo
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 text-gray-700 font-medium">
          <li>
            <Link to="/" className="hover:text-blue-600">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-blue-600">
              About
            </Link>
          </li>
          <li>
            <Link to="/services" className="hover:text-blue-600">
              Services
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-blue-600">
              Contact
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="block md:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.ul
            key="mobile-menu"
            variants={ulVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:hidden bg-white shadow-inner py-4 px-6 space-y-4 text-gray-700 font-medium"
          >
            <motion.li variants={liVariant}>
              <Link
                to="/"
                onClick={() => setOpen(false)}
                className="hover:text-blue-600"
              >
                Home
              </Link>
            </motion.li>

            <motion.li variants={liVariant}>
              <Link
                to="/about"
                onClick={() => setOpen(false)}
                className="hover:text-blue-600"
              >
                About
              </Link>
            </motion.li>

            <motion.li variants={liVariant}>
              <Link
                to="/services"
                onClick={() => setOpen(false)}
                className="hover:text-blue-600"
              >
                Services
              </Link>
            </motion.li>

            <motion.li variants={liVariant}>
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="hover:text-blue-600"
              >
                Contact
              </Link>
            </motion.li>
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
