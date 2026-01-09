import React from "react";
import { Link } from "react-router";
import { Github, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-base-200 text-base-content pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <h2 className="text-xl font-bold">
            Digital Life Lessons
          </h2>
          <p className="mt-3 opacity-70">
            Learn, grow, and improve your digital journey with modern tools and guidance.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">
            Quick Links
          </h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-primary transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/public-lessons" className="hover:text-primary transition">
                Public Lessons
              </Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold mb-3">
            Support
          </h3>
          <ul className="space-y-2">
            <li>
              <Link to="/faq" className="hover:text-primary transition">
                FAQ
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-primary transition">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-primary transition">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold mb-3">
            Follow Us
          </h3>
          <div className="flex items-center space-x-5">
            <a
              href="https://github.com/aminur-tech"
              className="hover:text-primary transition"
              aria-label="GitHub"
            >
              <Github />
            </a>
            <a
              href="https://www.linkedin.com/in/aminur-rahman4078"
              className="hover:text-primary transition"
              aria-label="LinkedIn"
            >
              <Linkedin />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center mt-10 border-t border-base-300 pt-4 text-sm opacity-70">
        © {new Date().getFullYear()} Digital Life Lessons — All Rights Reserved.
      </div>
    </footer>
  );
}
