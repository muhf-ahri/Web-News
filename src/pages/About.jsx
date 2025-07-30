import React, { useState, useEffect, useCallback } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import img from "../assets/sunscreen.jpg";
import img2 from "../assets/foundation.jpeg";

const About = () => {
  const [theme, setTheme] = useState("light");

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

  return (
    <div className={`min-h-screen transition-colors duration-500 flex flex-col ${theme === "dark" ? "bg-[#2a1a28] text-[#f3d4de]" : "bg-[#fff0f5] text-[#7d4f57]"}`}>
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 pt-6 space-y-12 flex-grow">
        {/* Toggle Theme Button */}
        <div className="flex justify-end">
          <button
            onClick={toggleTheme}
            className={`px-4 py-1.5 rounded-md font-semibold shadow-md focus:outline-none focus:ring-2 transition-colors duration-300 ${
              theme === "dark" ? "bg-[#d6336c] hover:bg-[#a82a54] text-white focus:ring-[#d6336c]" : "bg-[#f76c6c] hover:bg-[#d34b59] text-white focus:ring-[#f76c6c]"
            }`}
            aria-label="Toggle theme"
          >
            {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
          </button>
        </div>

        {/* Hero Section */}
        <section className="text-center max-w-2xl mx-auto">
          <h1 className="text-3xl font-extrabold mb-3 text-[#d6336c] tracking-wide font-[cursive]">Tentang Kami</h1>
          <p className="text-base leading-relaxed">Kami menghadirkan berita terkini dan terpercaya seputar dunia skincare dan makeup untuk membantu Anda tampil lebih percaya diri dan sehat.</p>
        </section>

        {/* Section Skincare */}
        <section className="grid md:grid-cols-2 gap-8 items-center">
          <img src={img} alt="Skincare" className="rounded-2xl shadow-lg w-full object-cover max-h-72 ring-2 ring-[#f7a4c4] hover:scale-105 transition duration-300" />
          <div>
            <h2 className="text-xl font-semibold mb-3 text-[#d6336c]">Perawatan Kulit yang Tepat</h2>
            <p className="leading-relaxed text-sm md:text-base">
              Skincare bukan sekadar tren, melainkan kebutuhan untuk menjaga kesehatan kulit. Kami menyajikan artikel tentang jenis kulit, cara memilih produk, dan tips menjaga kulit tetap cerah dan lembap.
            </p>
          </div>
        </section>

        {/* Section Makeup */}
        <section className="grid md:grid-cols-2 gap-8 items-center">
          <img src={img2} alt="Makeup" className="rounded-2xl shadow-lg w-full object-cover max-h-72 ring-2 ring-[#f7a4c4] hover:scale-105 transition duration-300" />
          <div>
            <h2 className="text-xl font-semibold mb-3 text-[#d6336c]">Makeup untuk Ekspresi Diri</h2>
            <p className="leading-relaxed text-sm md:text-base">Makeup adalah seni yang bisa meningkatkan rasa percaya diri. Kami membahas tutorial, rekomendasi produk, dan tren makeup terkini dari para beauty expert dan influencer.</p>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center bg-[#fce8f3] dark:bg-[#3e2c3d] rounded-2xl p-6 shadow-xl max-w-2xl mx-auto">
          <h3 className="text-xl font-bold mb-3 text-[#d6336c] dark:text-white">Gabung Bersama Komunitas Kami 💖</h3>
          <p className="mb-4 leading-relaxed text-sm md:text-base">Dapatkan info terbaru, tips kecantikan, dan rekomendasi produk langsung ke inbox Anda.</p>
          <button className="px-6 py-2 bg-[#d6336c] text-white rounded-full hover:bg-[#b02a5e] transition shadow-md focus:outline-none focus:ring-2 focus:ring-[#f7a4c4]">💌 Berlangganan Newsletter</button>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
