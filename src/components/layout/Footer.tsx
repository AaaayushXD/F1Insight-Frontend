import { Github, Twitter, Instagram } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="relative border-t border-f1-graphite pt-16 pb-8">
      {/* Red Accent Top Line */}
      <div className="absolute top-0 left-0 h-[2px] w-full bg-f1-red" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Brand Column */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center mb-6 gap-2">
              <img
                src="/landing/logos/logo.png"
                alt="F1Insight Logo"
                className="h-14 w-auto object-contain"
              />
              <span className="font-orbitron text-xl font-bold tracking-wider text-f1-white">
                F1<span className="text-f1-red">INSIGHT</span>
              </span>
            </Link>
            <p className="max-w-xs text-sm text-f1-steel leading-relaxed">
              The absolute pinnacle of F1 analytics. Engineering precision,
              data-driven decisions, and predictive intelligence.
            </p>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="font-orbitron text-xs font-bold tracking-[0.2em] text-white mb-6 uppercase">
              Platform
            </h4>
            <ul className="space-y-4">
              {["Schedule", "Drivers", "Constructors", "Circuits"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      to={`/${item.toLowerCase()}`}
                      className="group relative text-xs font-medium text-f1-steel transition-colors hover:text-white"
                    >
                      {item}
                      <span className="absolute -bottom-1 left-0 w-0 bg-f1-red transition-all duration-300 group-hover:w-full" />
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Social / Connect */}
          <div>
            <h4 className="font-orbitron text-xs font-bold tracking-[0.2em] text-white mb-6 uppercase">
              Connect
            </h4>
            <div className="flex gap-4">
              {[
                { icon: Twitter, href: "#" },
                { icon: Instagram, href: "#" },
                { icon: Github, href: "#" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="flex h-10 w-10 items-center justify-center rounded-sm bg-f1-graphite text-f1-steel transition-all hover:bg-f1-red hover:text-white hover:-translate-y-1"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-f1-graphite flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-xs text-f1-steel">
            &copy; 2026 F1INSIGHT. ENGINEERED BY AAYUSH LAMICHHANE.
          </p>
          <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest text-f1-steel">
            <Link to="/terms" className="hover:text-f1-red transition-colors">
              Terms of Service
            </Link>
            <Link to="/privacy" className="hover:text-f1-red transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
