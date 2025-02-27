
// Component Registry
const ComponentRegistry = {
  components: {},
  register(name, component) {
    this.components[name] = component;
  },
  get(name) {
    return this.components[name];
  }
};

// Base Component Class
class Component {
  constructor(container, config = {}) {
    this.container = container;
    this.config = config;
  }
  
  render() {
    throw new Error('Render method must be implemented');
  }
  
  mount() {
    this.container.innerHTML = this.render();
    this.afterMount();
  }
  
  afterMount() {}
}

// Components
class HeroComponent extends Component {
  render() {
    return `
      <div class="hero hero-gradient flex items-center justify-center px-4 relative overflow-hidden min-h-[600px]">
        <div class="hero-content text-center text-white max-w-4xl relative z-10">
          <h1 class="text-5xl md:text-7xl font-bold mb-8 heading-font animate__animated animate__fadeInUp">
            ${this.config.title}
          </h1>
          <p class="text-xl mb-10 animate__animated animate__fadeInUp animate__delay-1s">
            ${this.config.description}
          </p>
          <div class="flex flex-col sm:flex-row gap-6 justify-center">
            ${this.config.buttons.map(btn => `
              <a href="${btn.link}" class="${btn.class}">
                ${btn.text}
                ${btn.icon ? `<i class="${btn.icon}"></i>` : ''}
              </a>
            `).join('')}
          </div>
        </div>
        ${this.renderFloatingElements()}
      </div>
    `;
  }

  renderFloatingElements() {
    return `
      <div class="absolute inset-0 pointer-events-none">
        ${this.config.floatingElements.map(el => `
          <div class="float-element absolute ${el.position}" style="will-change: transform;">
            <div class="w-${el.size} h-${el.size} rounded-full ${el.gradient} opacity-70"></div>
          </div>
        `).join('')}
      </div>
    `;
  }
}

class GalleryComponent extends Component {
  render() {
    return `
      <div class="container mx-auto px-4">
        <div class="text-center mb-6">
          <h2 class="text-4xl font-bold heading-font mb-4">${this.config.title}</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">${this.config.description}</p>
        </div>
        <div class="gallery-filters mb-6">
          ${this.renderFilters()}
        </div>
        <div class="gallery-grid" id="galleryGrid">
          ${this.renderLoadingState()}
        </div>
      </div>
    `;
  }

  renderFilters() {
    return `
      <div class="flex flex-wrap justify-center items-center gap-4">
        <div class="flex-grow min-w-[200px] md:w-auto">
          <input type="text" id="searchInput" placeholder="Search artworks..."
            class="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500">
        </div>
        ${this.config.filters.map(filter => `
          <button class="filter-button ${filter.active ? 'active' : ''} px-6 py-2 rounded-full"
            data-category="${filter.category}">${filter.label}</button>
        `).join('')}
      </div>
    `;
  }

  renderLoadingState() {
    return `
      <div class="text-center py-12" id="gallery-fallback">
        <div class="animate-pulse space-y-4">
          <div class="h-48 bg-gray-200 rounded-lg"></div>
          <div class="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
          <div class="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
        </div>
        <p class="mt-4 text-gray-500">Loading amazing artworks...</p>
      </div>
    `;
  }

  afterMount() {
    // Initialize gallery functionality
    this.initializeFilters();
    this.loadGalleryItems();
  }

  initializeFilters() {
    const searchInput = document.getElementById('searchInput');
    const filterButtons = this.container.querySelectorAll('.filter-button');
    
    searchInput?.addEventListener('input', (e) => {
      // Implement search functionality
    });

    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Implement filter functionality
      });
    });
  }

  loadGalleryItems() {
    // Load gallery items from data source
  }
}

// Register components
ComponentRegistry.register('hero', HeroComponent);
ComponentRegistry.register('gallery', GalleryComponent);

// Export for use
window.ComponentRegistry = ComponentRegistry;
