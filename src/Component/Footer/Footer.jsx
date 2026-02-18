import React from "react";
import { Link } from "react-router";
import { Github, Linkedin, Mail, ShieldCheck } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-base-200/50 backdrop-blur-md text-base-content border-t border-base-content/5">
      <div className="md:w-11/12 mx-auto pt-16 pb-8 px-4">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 text-center md:text-left">
          
          {/* Brand & Mission */}
          <div className="space-y-4 flex flex-col items-center md:items-start">
            
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-content font-bold">
                D
              </div>
              <h2 className="text-2xl font-black tracking-tight italic">
                Digital
                <span className="text-primary underline decoration-2 underline-offset-4">
                  Life
                </span>
              </h2>
            </div>

            <p className="text-sm leading-relaxed opacity-70 max-w-xs mx-auto md:mx-0">
              Empowering your digital journey through curated wisdom and secure
              marketplace tools. Your legacy, archived safely.
            </p>

            <div className="flex items-center gap-2 text-xs font-medium text-success bg-success/10 w-fit px-3 py-1 rounded-full mx-auto md:mx-0">
              <ShieldCheck size={14} />
              Escrow Protected Platform
            </div>
          </div>

          {/* Navigation Groups */}
          {[
            {
              title: "Marketplace",
              links: [
                { name: "Browse Lessons", path: "/public-lessons" },
                { name: "About Us", path: "/about" },
                { name: "Contact Us", path: "/contact" },
              ],
            },
            {
              title: "Support & Legal",
              links: [
                { name: "Help Center", path: "/faq" },
                { name: "Privacy Policy", path: "/privacy" },
                { name: "Terms of Service", path: "/Terms-Conditions" },
              ],
            },
          ].map((group) => (
            <div
              key={group.title}
              className="flex flex-col items-center md:items-start"
            >
              <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-6">
                {group.title}
              </h3>

              <ul className="space-y-3 flex flex-col items-center md:items-start">
                {group.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-base-content/70 hover:text-primary hover:translate-x-1 transition-all duration-300 flex items-center group w-fit mx-auto md:mx-0"
                    >
                      <span className="h-[1px] w-0 group-hover:w-3 bg-primary mr-0 group-hover:mr-2 transition-all" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Social Section */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-6">
              Connect With Us
            </h3>

            <div className="flex gap-4 mb-6 justify-center md:justify-start">
              {[
                {
                  icon: <Github size={20} />,
                  href: "https://github.com/aminur-tech",
                  label: "Github",
                },
                {
                  icon: <Linkedin size={20} />,
                  href: "https://www.linkedin.com/in/aminur-rahman4078",
                  label: "LinkedIn",
                },
                {
                  icon: <Mail size={20} />,
                  href: "mailto:aminur.programme@gmail.com",
                  label: "Email",
                },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-base-300 hover:bg-primary hover:text-primary-content transition-all duration-300 shadow-sm hover:shadow-primary/20"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className="pt-8 border-t border-base-content/5 flex flex-col md:flex-row justify-center md:justify-between items-center gap-4 text-xs font-medium opacity-60 text-center md:text-left">
          <p>© {currentYear} Digital Life Lessons. All rights reserved.</p>
          <div>
            <span className="flex items-center gap-1 justify-center md:justify-start">
              Built with <span className="text-error">❤️</span> for the web
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
