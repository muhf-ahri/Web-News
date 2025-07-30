import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#fff0f5] dark:bg-[#2e1e2b] text-[#7d4f57] dark:text-[#f3d4de] py-6 px-6 mt-16 border-t border-[#f7c2d5] dark:border-[#5a384a] transition-colors duration-500">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
        {/* Copyright */}
        <p className="text-sm select-none">&copy; {new Date().getFullYear()} SkinNews. All rights reserved.</p>

        {/* Navigation Links */}
        <nav className="flex space-x-8 text-sm font-medium">
          {[
            { href: "/", label: "Home" },
            { href: "/about", label: "About" },
            { href: "/contact", label: "Contact" },
          ].map(({ href, label }) => (
            <a key={href} href={href} className="relative group hover:text-[#d6336c] transition">
              {label}
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#d6336c] group-hover:w-full transition-all duration-300"></span>
            </a>
          ))}
        </nav>

        {/* Social Icons */}
        <div className="flex space-x-6">
          {[
            {
              href: "https://www.facebook.com/",
              label: "Facebook",
              iconPath:
                "M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.438 9.879v-6.987h-2.54v-2.89h2.54v-2.203c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.464h-1.26c-1.243 0-1.63.772-1.63 1.562v1.872h2.773l-.443 2.89h-2.33v6.987C18.343 21.128 22 16.991 22 12z",
            },
            {
              href: "https://x.com/jokowi",
              label: "Twitter",
              iconPath:
                "M23 3a10.9 10.9 0 01-3.14.86 4.48 4.48 0 001.96-2.48 9.01 9.01 0 01-2.88 1.1 4.52 4.52 0 00-7.7 4.13A12.84 12.84 0 013 4.15a4.51 4.51 0 001.4 6.04 4.45 4.45 0 01-2.05-.56v.06a4.52 4.52 0 003.63 4.44 4.54 4.54 0 01-2.04.08 4.53 4.53 0 004.22 3.14A9.07 9.07 0 012 19.54a12.79 12.79 0 006.92 2.02c8.3 0 12.84-6.87 12.84-12.82 0-.2 0-.41-.01-.61A9.22 9.22 0 0023 3z",
            },
            {
              href: "https://www.instagram.com/2244zem/",
              label: "Instagram",
              isInsta: true,
            },
          ].map(({ href, label, iconPath, isInsta }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="hover:text-[#d6336c] transition transform hover:scale-110">
              {isInsta ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37a4 4 0 11-7.999-.001 4 4 0 017.999.001z" />
                  <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" stroke="none">
                  <path d={iconPath} />
                </svg>
              )}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
