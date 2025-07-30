import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { posts } from "../data/posts";

const NewsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = posts.find((post) => post.id === Number(id));

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

  if (!post) {
    return (
      <>
        <style jsx>{`
          .luxury-bg {
            background: ${theme === "dark" 
              ? "radial-gradient(circle at 20% 20%, #4a1a3d 0%, #2a1a28 50%, #1a0f18 100%)" 
              : "radial-gradient(circle at 20% 20%, #fff0f5 0%, #fce4ec 50%, #f8bbd9 100%)"
            };
            position: relative;
            overflow: hidden;
          }
        `}</style>
        <div className="min-h-screen flex items-center justify-center luxury-bg transition-colors duration-500">
          <div className="backdrop-blur-lg bg-white/10 rounded-xl p-8 border border-white/20 shadow-xl">
            <p className="text-xl text-white/90">Post not found.</p>
            <button 
              onClick={() => navigate(-1)}
              className="mt-4 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg hover:scale-105 transition-transform"
            >
              Go Back
            </button>
          </div>
        </div>
      </>
    );
  }

  const relatedPosts = posts.filter((item) => item.category === post.category && item.id !== post.id);

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

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
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
            ${theme === "dark" ? "rgba(214, 51, 108, 0.08)" : "rgba(247, 108, 108, 0.08)"} 60deg,
            transparent 120deg,
            ${theme === "dark" ? "rgba(214, 51, 108, 0.08)" : "rgba(247, 108, 108, 0.08)"} 180deg,
            transparent 240deg,
            ${theme === "dark" ? "rgba(214, 51, 108, 0.08)" : "rgba(247, 108, 108, 0.08)"} 300deg,
            transparent 360deg
          );
          animation: rotateGradient 30s linear infinite;
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
          opacity: 0.06;
          animation: float 8s ease-in-out infinite;
        }

        .glass-card {
          backdrop-filter: blur(20px);
          background: ${theme === "dark" 
            ? "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)"
            : "linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.1) 100%)"
          };
          border: 1px solid ${theme === "dark" ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.3)"};
          box-shadow: 0 8px 32px ${theme === "dark" ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.1)"};
        }

        .main-content {
          animation: slideInLeft 0.8s ease-out forwards;
        }

        .sidebar {
          animation: slideInRight 0.8s ease-out forwards;
          animation-delay: 0.2s;
          opacity: 0;
        }

        .image-container {
          position: relative;
          overflow: hidden;
        }

        .image-container::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transition: left 0.8s;
        }

        .image-container:hover::after {
          left: 100%;
        }
      `}</style>

      <div className="min-h-screen luxury-bg transition-colors duration-500">
        {/* Floating background elements */}
        <div className="floating-elements">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="floating-element"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${6 + Math.random() * 4}s`
              }}
            >
              <div className={`w-3 h-3 rounded-full ${theme === "dark" ? "bg-[#d6336c]" : "bg-[#f76c6c]"}`}></div>
            </div>
          ))}
          {[...Array(10)].map((_, i) => (
            <div
              key={`star-${i}`}
              className="floating-element"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${8 + Math.random() * 3}s`
              }}
            >
              <div className={`w-2 h-2 rotate-45 ${theme === "dark" ? "bg-gradient-to-br from-[#d6336c] to-[#a82a54]" : "bg-gradient-to-br from-[#f76c6c] to-[#d34b59]"}`}></div>
            </div>
          ))}
        </div>

        {/* Header dengan tombol toggle theme dan back */}
        <div className="relative z-10 pt-8">
          <div className="flex justify-between items-center max-w-6xl mx-auto mb-8 px-4">
            <button
              onClick={toggleTheme}
              className={`group px-6 py-3 rounded-xl font-semibold shadow-xl focus:outline-none focus:ring-2 transition-all duration-300 backdrop-blur-lg border border-white/20 hover:scale-105 relative overflow-hidden ${
                theme === "dark" 
                  ? "bg-gradient-to-r from-[#d6336c] to-[#a82a54] hover:from-[#a82a54] hover:to-[#d6336c] text-white focus:ring-[#d6336c] shadow-[#d6336c]/30" 
                  : "bg-gradient-to-r from-[#f76c6c] to-[#d34b59] hover:from-[#d34b59] hover:to-[#f76c6c] text-white focus:ring-[#f76c6c] shadow-[#f76c6c]/30"
              }`}
              aria-label="Toggle theme"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <span className="relative z-10">
                {theme === "light" ? "🌙 Dark Luxury" : "☀️ Light Elegance"}
              </span>
            </button>

            <button
              onClick={() => navigate(-1)}
              className={`group px-6 py-3 rounded-xl font-semibold shadow-xl focus:outline-none focus:ring-2 transition-all duration-300 backdrop-blur-lg border border-white/20 hover:scale-105 relative overflow-hidden ${
                theme === "dark" 
                  ? "bg-gradient-to-r from-[#d6336c] to-[#a82a54] hover:from-[#a82a54] hover:to-[#d6336c] text-white focus:ring-[#d6336c] shadow-[#d6336c]/30" 
                  : "bg-gradient-to-r from-[#f76c6c] to-[#d34b59] hover:from-[#d34b59] hover:to-[#f76c6c] text-white focus:ring-[#f76c6c] shadow-[#f76c6c]/30"
              }`}
              aria-label="Back button"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <span className="relative z-10">← Kembali</span>
            </button>
          </div>

          {/* Konten utama dan sidebar */}
          <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8 relative z-10">
            {/* Main Content */}
            <article className="md:col-span-2 glass-card rounded-2xl overflow-hidden main-content group">
              <div className="image-container">
                <img 
                  src={post.imageUrl || "/api/placeholder/800/400"} 
                  alt={post.title} 
                  className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-105" 
                  loading="lazy" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              
              <div className="p-8 space-y-6">
                <div className="space-y-4">
                  <h1 className={`text-4xl md:text-5xl font-bold leading-tight ${theme === "dark" ? "text-white/95" : "text-gray-800"}`}>
                    {post.title}
                  </h1>
                  
                  <div className="flex items-center space-x-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      theme === "dark" 
                        ? "bg-[#d6336c]/20 text-[#d6336c] border border-[#d6336c]/30" 
                        : "bg-[#f76c6c]/20 text-[#f76c6c] border border-[#f76c6c]/30"
                    }`}>
                      {post.category}
                    </span>
                    
                    <p className={`text-sm font-medium ${theme === "dark" ? "text-white/70" : "text-gray-600"}`}>
                      {new Date(post.date).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                <div className={`prose prose-lg max-w-none ${
                  theme === "dark" 
                    ? "text-white/90 prose-headings:text-white/95 prose-strong:text-white/95" 
                    : "text-gray-700 prose-headings:text-gray-800 prose-strong:text-gray-800"
                }`}>
                  <div className="whitespace-pre-line text-lg leading-relaxed">
                    {post.content}
                  </div>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="space-y-6 sidebar">
              {/* Category Info */}
              <div className="glass-card rounded-2xl overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
                <div className="p-6 space-y-4">
                  <h2 className={`text-2xl font-bold ${theme === "dark" ? "text-white/95" : "text-gray-800"}`}>
                    Tentang {post.category}
                  </h2>
                  
                  <div className={`space-y-3 ${theme === "dark" ? "text-white/80" : "text-gray-700"}`}>
                    {post.category === "Makeup" && (
                      <>
                        <p className="leading-relaxed">
                          Kategori <span className={`font-semibold ${theme === "dark" ? "text-[#d6336c]" : "text-[#f76c6c]"}`}>Makeup</span> meliputi produk-produk kecantikan yang digunakan untuk mempercantik dan mempertegas tampilan wajah.
                        </p>
                        <p className="leading-relaxed">
                          Mulai dari lipstick yang memberikan warna pada bibir, foundation untuk meratakan warna kulit, hingga eyeliner yang memperjelas garis mata.
                        </p>
                      </>
                    )}
                    {post.category === "Skincare" && (
                      <>
                        <p className="leading-relaxed">
                          Kategori <span className={`font-semibold ${theme === "dark" ? "text-[#d6336c]" : "text-[#f76c6c]"}`}>Skincare</span> berfokus pada produk perawatan kulit yang menjaga kesehatan dan kecantikan kulit dari dalam.
                        </p>
                        <p className="leading-relaxed">
                          Rutinitas skincare yang tepat dapat membantu mencegah masalah kulit dan memastikan kulit tetap segar, lembap, dan bercahaya setiap hari.
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Related Articles */}
              <div className="glass-card rounded-2xl overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
                <div className="p-6 space-y-4">
                  <h3 className={`text-xl font-bold ${theme === "dark" ? "text-white/95" : "text-gray-800"}`}>
                    Artikel Terkait
                  </h3>
                  
                  <div className="space-y-3">
                    {relatedPosts.length > 0 ? (
                      relatedPosts.slice(0, 3).map((rel, index) => (
                        <div 
                          key={rel.id}
                          className={`p-3 rounded-lg transition-all duration-300 hover:scale-105 cursor-pointer ${
                            theme === "dark" 
                              ? "bg-white/5 hover:bg-white/10 border border-white/10" 
                              : "bg-white/30 hover:bg-white/40 border border-white/20"
                          }`}
                          style={{
                            animationDelay: `${index * 0.1}s`,
                            animation: 'fadeInUp 0.6s ease-out forwards'
                          }}
                          onClick={() => navigate(`/newsdetail/${rel.id}`)}
                        >
                          <h4 className={`font-semibold text-sm leading-snug ${
                            theme === "dark" ? "text-white/90 hover:text-[#d6336c]" : "text-gray-800 hover:text-[#f76c6c]"
                          } transition-colors duration-300`}>
                            {rel.title}
                          </h4>
                          <p className={`text-xs mt-1 ${theme === "dark" ? "text-white/60" : "text-gray-600"}`}>
                            {new Date(rel.date).toLocaleDateString("id-ID")}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className={`text-sm italic ${theme === "dark" ? "text-white/60" : "text-gray-600"}`}>
                        Tidak ada artikel terkait.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>

        <div className="relative z-10 mt-16">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default NewsDetail;