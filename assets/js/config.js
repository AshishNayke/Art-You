
// Site Configuration
const SiteConfig = {
  hero: {
    title: "Discover Extraordinary Art",
    description: "Join our curated community of artists and collectors to explore unique pieces and own exclusive artwork from around the world.",
    buttons: [
      {
        text: "Explore Gallery",
        link: "pages/gallery.html",
        class: "group px-8 py-4 bg-white text-blue-600 rounded-full hover:bg-opacity-90 transition-all transform hover:scale-105 hover:shadow-lg font-semibold",
        icon: "fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"
      },
      {
        text: "Join Community",
        link: "pages/auth.html?form=join",
        class: "group px-8 py-4 bg-transparent border-2 border-white text-white rounded-full hover:bg-white hover:text-blue-600 transition-all transform hover:scale-105 hover:shadow-lg font-semibold",
        icon: "fas fa-users ml-2"
      }
    ],
    floatingElements: [
      {
        position: "top-20 left-10",
        size: "16",
        gradient: "bg-gradient-to-r from-red-400 to-purple-400"
      },
      {
        position: "bottom-10 right-10",
        size: "10",
        gradient: "bg-gradient-to-r from-green-400 to-blue-400"
      },
      {
        position: "bottom-1/4 right-1/4",
        size: "20",
        gradient: "bg-gradient-to-r from-yellow-400 to-pink-400"
      }
    ]
  },
  gallery: {
    title: "Featured Artworks",
    description: "Discover unique pieces from our talented artists, carefully curated for art enthusiasts.",
    filters: [
      { category: "all", label: "All Works", active: true },
      { category: "Paintings", label: "Paintings" },
      { category: "Digital Art", label: "Digital Art" },
      { category: "Sculptures", label: "Sculptures" },
      { category: "Photography", label: "Photography" }
    ]
  }
};

// Export for use
window.SiteConfig = SiteConfig;
