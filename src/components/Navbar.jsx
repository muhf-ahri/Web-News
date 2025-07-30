import { useState, useEffect } from "react";
import { posts } from "../data/posts";

const Navbar = ({ onFilter }) => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [isOpen, setIsOpen] = useState(false);

  const categories = ["all", ...new Set(posts.map((post) => post.category))];

  useEffect(() => {
    if (typeof onFilter === "function") {
      const filtered = posts.filter((post) => {
        const matchTitle = post.title.toLowerCase().includes(search.toLowerCase());
        const matchCategory = category === "all" || post.category === category;
        return matchTitle && matchCategory;
      });

      onFilter(filtered);
    }
  }, [search, category, onFilter]);

  return (
    <nav className="sticky top-0 z-50 bg-[#fce8f3] dark:bg-[#3e2c3d] bg-opacity-95 backdrop-blur-md shadow-lg transition-colors duration-500">
      <div className="max-w-7xl mx-auto flex items-center justify-around px-7 py-5">
        {/* Left Navigation */}
        <div className="hidden md:flex space-x-8 flex-1">
          {[
            { href: "/home", label: "Home" },
            { href: "/about", label: "About" },
            { href: "/contact", label: "Contact" },
          ].map(({ href, label }) => (
            <a key={href} href={href} className="relative group text-[#7d4f57] dark:text-[#f3d4de] font-semibold transition-colors duration-300 transform hover:scale-105 hover:text-[#d6336c]">
              {label}
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#d6336c] group-hover:w-full transition-all duration-300"></span>
            </a>
          ))}
        </div>

        {/* Center Brand */}
        <div className="flex-shrink-0 flex-1 text-center">
          <h1 className="text-[#d6336c] dark:text-[#f76c6c] text-3xl font-extrabold tracking-wide select-none">SkinNews</h1>
        </div>

        {/* Right Filters */}
        {typeof onFilter === "function" && (
          <div className="hidden md:flex items-center space-x-3 flex-1 justify-end">
            <input
              type="text"
              placeholder="Search title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-44 px-3 py-2 rounded-md bg-[#f9d4e3] dark:bg-[#5a4355] text-[#7d4f57] dark:text-[#f3d4de] placeholder-[#c292a1] border border-[#d699b0] dark:border-[#6f4f67] focus:outline-none focus:ring-2 focus:ring-[#d6336c] transition"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-3 py-2 rounded-md bg-[#f9d4e3] dark:bg-[#5a4355] text-[#7d4f57] dark:text-[#f3d4de] border border-[#d699b0] dark:border-[#6f4f67] focus:outline-none focus:ring-2 focus:ring-[#d6336c] transition"
            >
              {categories.map((cat, idx) => (
                <option key={idx} value={cat} className="bg-[#fce8f3] dark:bg-[#3e2c3d] text-[#7d4f57] dark:text-[#f3d4de]">
                  {cat}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Mobile toggle button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`md:hidden text-[#7d4f57] dark:text-[#f3d4de] hover:text-[#d6336c] focus:outline-none focus:ring-2 focus:ring-[#d6336c] rounded-md transition-transform duration-300 ${
            isOpen ? "rotate-45 scale-110" : "rotate-0 scale-100"
          }`}
          aria-label="Toggle menu"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" style={{ transformOrigin: "center" }}>
            {isOpen ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#fce8f3] dark:bg-[#3e2c3d] bg-opacity-95 backdrop-blur-md px-5 pb-5 space-y-4 border-t border-[#d699b0] dark:border-[#6f4f67] transition-colors duration-300">
          <div className="flex flex-col space-y-3 text-center">
            {[
              { href: "/home", label: "Home" },
              { href: "/about", label: "About" },
              { href: "/contact", label: "Contact" },
            ].map(({ href, label }) => (
              <a key={href} href={href} className="relative group text-[#7d4f57] dark:text-[#f3d4de] font-semibold transition-colors duration-300 transform hover:scale-105 hover:text-[#d6336c]" onClick={() => setIsOpen(false)}>
                {label}
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#d6336c] group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </div>

          {typeof onFilter === "function" && (
            <div className="mt-4 space-y-3">
              <input
                type="text"
                placeholder="Search title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-3 py-2 rounded-md bg-[#f9d4e3] dark:bg-[#5a4355] text-[#7d4f57] dark:text-[#f3d4de] placeholder-[#c292a1] border border-[#d699b0] dark:border-[#6f4f67] focus:outline-none focus:ring-2 focus:ring-[#d6336c] transition"
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-md bg-[#f9d4e3] dark:bg-[#5a4355] text-[#7d4f57] dark:text-[#f3d4de] border border-[#d699b0] dark:border-[#6f4f67] focus:outline-none focus:ring-2 focus:ring-[#d6336c] transition"
              >
                {categories.map((cat, idx) => (
                  <option key={idx} value={cat} className="bg-[#fce8f3] dark:bg-[#3e2c3d] text-[#7d4f57] dark:text-[#f3d4de]">
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
