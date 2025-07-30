import React, { useState, useEffect, useCallback } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Contact = () => {
  const [theme, setTheme] = useState("light");

  // toggleTheme pakai useCallback biar konsisten seperti Home
  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    if (theme === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [theme]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 flex flex-col ${theme === "dark" ? "bg-[#2a1a28] text-[#f3d4de]" : "bg-[#fff0f5] text-[#7d4f57]"}`}>
      <Navbar onToggleTheme={toggleTheme} theme={theme} />

      <main className="max-w-4xl mx-auto px-6 py-12 flex-grow">
        {/* Tombol toggle theme */}
        <div className="flex justify-end mb-8">
          <button
            onClick={toggleTheme}
            className={`px-5 py-2 rounded-md font-semibold shadow-md focus:outline-none focus:ring-2 transition-colors duration-300 ${
              theme === "dark" ? "bg-[#d6336c] hover:bg-[#a82a54] text-white focus:ring-[#d6336c]" : "bg-[#f76c6c] hover:bg-[#d34b59] text-white focus:ring-[#f76c6c]"
            }`}
            aria-label="Toggle theme"
          >
            {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
          </button>
        </div>

        {/* Contact Section */}
        <section className="relative rounded-2xl p-10 shadow-lg bg-white dark:bg-[#3b1f3a] transition-colors duration-500">
          <h2 className="text-4xl font-extrabold mb-6 text-center drop-shadow-md">Contact Us</h2>
          <p className="mb-10 text-center text-lg font-medium opacity-80">We’d love to hear from you! Let us know your thoughts or questions, and we’ll respond as soon as we can.</p>

          {submitted && <div className="mb-6 p-4 bg-[#d6336c] bg-opacity-90 rounded-md shadow-md text-center font-semibold text-white animate-fadeIn">Thank you for your message! We will respond shortly.</div>}

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Your Name"
              className={`rounded-md px-4 py-3 border border-transparent focus:outline-none focus:ring-2 focus:ring-pink-600 transition
                ${theme === "dark" ? "bg-[#4e2e51] text-[#f3d4de] placeholder-[#c291ac]" : "bg-[#fde9f0] text-[#7d4f57] placeholder-[#b17c90]"}`}
            />

            {/* Email */}
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Your Email"
              className={`rounded-md px-4 py-3 border border-transparent focus:outline-none focus:ring-2 focus:ring-pink-600 transition
                ${theme === "dark" ? "bg-[#4e2e51] text-[#f3d4de] placeholder-[#c291ac]" : "bg-[#fde9f0] text-[#7d4f57] placeholder-[#b17c90]"}`}
            />

            {/* Message */}
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Your Message"
              rows={5}
              className={`md:col-span-2 rounded-md px-4 py-3 border border-transparent focus:outline-none focus:ring-2 focus:ring-pink-600 transition resize-none
                ${theme === "dark" ? "bg-[#4e2e51] text-[#f3d4de] placeholder-[#c291ac]" : "bg-[#fde9f0] text-[#7d4f57] placeholder-[#b17c90]"}`}
            />

            {/* Submit Button */}
            <button
              type="submit"
              className={`md:col-span-2 py-3 rounded-md font-semibold shadow-md transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 ${
                theme === "dark" ? "bg-[#d6336c] hover:bg-[#a82a54] text-white focus:ring-[#d6336c]" : "bg-[#f76c6c] hover:bg-[#d34b59] text-white focus:ring-[#f76c6c]"
              }`}
            >
              🚀 Send Message
            </button>
          </form>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
