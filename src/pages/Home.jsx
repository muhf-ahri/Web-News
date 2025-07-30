import React, { useState, useEffect, useCallback, useRef } from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Footer from "../components/Footer";
import { posts } from "../data/posts";

const Home = () => {
  const [theme, setTheme] = useState("light");
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const containerRef = useRef(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  // Auto-scroll functionality
  useEffect(() => {
    if (!isAutoScrolling) return;

    const container = containerRef.current;
    if (!container) return;

    const scrollInterval = setInterval(() => {
      const scrollAmount = 2;
      container.scrollLeft += scrollAmount;
      
      // Reset scroll when reaching the end
      if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
        container.scrollLeft = 0;
      }
    }, 50);

    return () => clearInterval(scrollInterval);
  }, [isAutoScrolling, filteredPosts]);

  // Pause auto-scroll on hover
  const handleMouseEnter = () => setIsAutoScrolling(false);
  const handleMouseLeave = () => setIsAutoScrolling(true);

  return (
    <>
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(120deg); }
          66% { transform: translateY(10px) rotate(240deg); }
        }
        
        @keyframes rotateGradient {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .luxury-bg {
          background: ${theme === "dark" 
            ? "radial-gradient(circle at 20% 20%, #4a1a3d 0%, #2a1a28 50%, #1a0f18 100%)" 
            : "radial-gradient(circle at 20% 20%, #fff0f5 0%, #fce4ec 50%, #f8bbd9 100%)"
          };
          position: relative;
          overflow: hidden;
        }
        
        .luxury-bg::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: conic-gradient(
            from 0deg at 50% 50%,
            transparent 0deg,
            ${theme === "dark" ? "rgba(214, 51, 108, 0.1)" : "rgba(247, 108, 108, 0.1)"} 60deg,
            transparent 120deg,
            ${theme === "dark" ? "rgba(214, 51, 108, 0.1)" : "rgba(247, 108, 108, 0.1)"} 180deg,
            transparent 240deg,
            ${theme === "dark" ? "rgba(214, 51, 108, 0.1)" : "rgba(247, 108, 108, 0.1)"} 300deg,
            transparent 360deg
          );
          animation: rotateGradient 20s linear infinite;
          pointer-events: none;
        }
        
        .floating-elements {
          position: absolute;
          width: 100%;
          height: 100%;
          pointer-events: none;
          overflow: hidden;
        }
        
        .floating-element {
          position: absolute;
          opacity: 0.1;
          animation: float 6s ease-in-out infinite;
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <div className={`min-h-screen transition-colors duration-500 flex flex-col luxury-bg ${theme === "dark" ? "text-[#f3d4de]" : "text-[#7d4f57]"}`}>
        {/* Floating background elements */}
        <div className="floating-elements">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="floating-element"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 6}s`,
                animationDuration: `${4 + Math.random() * 4}s`
              }}
            >
              <div className={`w-4 h-4 rounded-full ${theme === "dark" ? "bg-[#d6336c]" : "bg-[#f76c6c]"}`}></div>
            </div>
          ))}
          {[...Array(8)].map((_, i) => (
            <div
              key={`diamond-${i}`}
              className="floating-element"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 6}s`,
                animationDuration: `${6 + Math.random() * 3}s`
              }}
            >
              <div className={`w-3 h-3 rotate-45 ${theme === "dark" ? "bg-gradient-to-br from-[#d6336c] to-[#a82a54]" : "bg-gradient-to-br from-[#f76c6c] to-[#d34b59]"}`}></div>
            </div>
          ))}
        </div>

        <Navbar onFilter={setFilteredPosts} onToggleTheme={toggleTheme} theme={theme} />

        <main className="max-w-7xl mx-auto px-6 py-12 flex-grow relative z-10">
          <div className="flex justify-end mb-8">
            <button
              onClick={toggleTheme}
              className={`px-6 py-3 rounded-xl font-semibold shadow-xl focus:outline-none focus:ring-2 transition-all duration-300 backdrop-blur-lg border border-white/20 hover:scale-105 ${
                theme === "dark" 
                  ? "bg-gradient-to-r from-[#d6336c] to-[#a82a54] hover:from-[#a82a54] hover:to-[#d6336c] text-white focus:ring-[#d6336c] shadow-[#d6336c]/30" 
                  : "bg-gradient-to-r from-[#f76c6c] to-[#d34b59] hover:from-[#d34b59] hover:to-[#f76c6c] text-white focus:ring-[#f76c6c] shadow-[#f76c6c]/30"
              }`}
              aria-label="Toggle theme"
            >
              {theme === "light" ? "🌙 Dark Luxury" : "☀️ Light Elegance"}
            </button>
          </div>

          {/* Auto-scrolling horizontal section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-center">
              <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                Featured Articles
              </span>
            </h2>
            <div 
              ref={containerRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              style={{ scrollBehavior: 'smooth' }}
            >
              {[...filteredPosts, ...filteredPosts].map((post, index) => (
                <div 
                  key={`scroll-${post.id}-${index}`} 
                  className="flex-shrink-0 w-80 group relative bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-xl border border-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:bg-white/20 cursor-pointer overflow-hidden"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    animation: 'fadeInUp 0.6s ease-out forwards'
                  }}
                >
                  {/* Shimmer effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  
                  <div className="relative z-10">
                    <div className="w-full h-48 bg-gradient-to-br from-pink-200 to-purple-300 rounded-lg mb-4 overflow-hidden">
                      <div className="w-full h-full bg-white/20 flex items-center justify-center text-gray-600">
                        {post.title}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-white/90">{post.title}</h3>
                    <p className="text-white/70 mb-3">{post.excerpt}</p>
                    <div className="flex justify-between items-center text-sm text-white/60">
                      <span>{post.category}</span>
                      <span>{post.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main grid section */}
          <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.length > 0 ? 
              filteredPosts.map((post, index) => (
                <div 
                  key={post.id}
                  className="group relative bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-xl border border-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:bg-white/20 cursor-pointer overflow-hidden"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    animation: 'fadeInUp 0.6s ease-out forwards'
                  }}
                >
                  {/* Shimmer effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  
                  <div className="relative z-10">
                    <Card post={post} />
                  </div>
                </div>
              )) : 
              <div className="col-span-full text-center">
                <p className="text-xl text-white/60 italic select-none backdrop-blur-lg bg-white/10 rounded-xl p-8 border border-white/20">
                  Berita tidak ditemukan.
                </p>
              </div>
            }
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Home;