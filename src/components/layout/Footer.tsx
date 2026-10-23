import Link from "next/link";
import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h3>Deepak Jarugula</h3>
          <p>Building practical, scalable, and impactful AI & software solutions to solve real-world challenges.</p>
        </div>
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/projects">Projects</Link></li>
            <li><Link href="/#experience">Experience</Link></li>
          </ul>
        </div>
        <div className="footer-socials">
          <h4>Connect</h4>
          <div className="social-icons">
            <a href="https://github.com/jaruguladeepak" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
            <a href="#"><FaLinkedin /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><Mail /></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Deepak Jarugula. All rights reserved.</p>
      </div>
    </footer>
  );
}
