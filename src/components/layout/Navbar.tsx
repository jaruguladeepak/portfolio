"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Experience", href: "/#experience" },
  { label: "Certificates", href: "/certificates" },
  { label: "Contact", href: "/#contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Track active section on home page scroll
  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection("");
      return;
    }

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      const sections = [
        { id: "home", label: "home" },
        { id: "skills", label: "home" },
        { id: "experience", label: "experience" },
        { id: "contact", label: "contact" }
      ];

      // Get offsetTop for each section dynamically
      const offsets = sections
        .map((s) => {
          const el = document.getElementById(s.id);
          return {
            label: s.label,
            top: el ? el.offsetTop : 0,
          };
        })
        .filter((o) => o.top > 0 || o.label === "home")
        .sort((a, b) => a.top - b.top);

      let currentSection = "home";
      for (let i = 0; i < offsets.length; i++) {
        if (scrollPosition >= offsets[i].top) {
          currentSection = offsets[i].label;
        }
      }

      // Override with contact if scrolled close to the bottom of the page
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60) {
        currentSection = "contact";
      }

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run initially to capture active state on load
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  // Determine which item is active
  const getActiveItem = () => {
    if (pathname === "/about") return "About";
    if (pathname === "/projects") return "Projects";
    if (pathname === "/certificates") return "Certificates";
    if (pathname === "/") {
      if (activeSection === "experience") return "Experience";
      if (activeSection === "contact") return "Contact";
      return "Home";
    }
    return "";
  };

  const activeItem = getActiveItem();

  return (
    <header className="navbar-container">
      <motion.nav 
        className={`navbar-pill ${isOpen ? "is-open" : ""}`}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="navbar-pill-header">
          {/* Logo */}
          <Link href="/" className="logo-pill">
            DJ
          </Link>

          {/* Desktop Nav Links */}
          <div className="nav-links-pill">
            {navItems.map((item, idx) => {
              const isActive = activeItem === item.label;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`nav-item-pill ${isActive ? "active" : ""}`}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <span className="nav-item-text">{item.label}</span>
                  
                  {/* Sliding hover pill indicator */}
                  {hoveredIndex === idx && (
                    <motion.div
                      layoutId="hover-indicator"
                      className="hover-indicator"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}

                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="active-indicator"
                      className="active-indicator"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop Socials */}
          <div className="nav-socials-pill">
            <a href="https://github.com/jaruguladeepak" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="social-icon-pill">
              <FaGithub />
            </a>
            <a href="#" aria-label="LinkedIn" className="social-icon-pill">
              <FaLinkedin />
            </a>
            <a href="#" aria-label="Twitter" className="social-icon-pill">
              <FaTwitter />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="mobile-toggle-pill" 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Navigation Links */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              className="mobile-menu-pill"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="mobile-links-container">
                {navItems.map((item) => {
                  const isActive = activeItem === item.label;
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={`mobile-nav-item-pill ${isActive ? "active" : ""}`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
                <hr className="mobile-divider" />
                <div className="mobile-socials-container">
                  <a href="https://github.com/jaruguladeepak" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="social-icon-pill">
                    <FaGithub />
                  </a>
                  <a href="#" aria-label="LinkedIn" className="social-icon-pill">
                    <FaLinkedin />
                  </a>
                  <a href="#" aria-label="Twitter" className="social-icon-pill">
                    <FaTwitter />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  );
}
