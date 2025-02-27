// Dynamic countdown timer
function updateTimers() {
    const timers = document.querySelectorAll('.auction-timer');
    timers.forEach(timer => {
        const endTime = new Date().getTime() + Math.random() * 5000000;
        setInterval(() => {
            const now = new Date().getTime();
            const distance = endTime - now;

            const hours = Math.floor(distance / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            const hoursEl = timer.querySelector('.hours');
            const minutesEl = timer.querySelector('.minutes');
            const secondsEl = timer.querySelector('.seconds');

            if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
            if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
            if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, '0');
        }, 1000);
    });
}

document.addEventListener('DOMContentLoaded', updateTimers);

// Auction Data
window.auctionItems = [
    {
        image: 'assets/images/art/abstract1.jpg',
        title: 'Squares and Cubes',
        artist: 'Marcus Rivera',
        currentBid: '₹15,000',
        startingBid: '₹8,500',
        activeBids: 8,
        endTime: new Date().getTime() + 86400000 // 24 hours from now
    },
    {
        image: 'assets/images/art/digiart1.jpg',
        title: 'Horizon',
        artist: 'Elena Wong',
        currentBid: '₹12,500',
        startingBid: '₹5,000',
        activeBids: 15,
        endTime: new Date().getTime() + 172800000 // 48 hours from now
    },
    {
        image: 'assets/images/art/digiart2.jpg',
        title: 'Van Gosh',
        artist: 'Elena Wong',
        currentBid: '₹12,500',
        startingBid: '₹5,000',
        activeBids: 15,
        endTime: new Date().getTime() + 892800000 // 48 hours from now
    },
    {
        image: 'assets/images/art/abstract2.jpg',
        title: 'Circle and Square',
        artist: 'Elena Wong',
        currentBid: '₹12,500',
        startingBid: '₹5,000',
        activeBids: 15,
        endTime: new Date().getTime() + 892800000 // 48 hours from now
    }
];

class AuctionManager {
    constructor() {
        this.init();
    }

    init() {
        this.auctionGrid = document.querySelector('.auction-grid');
        if (this.auctionGrid) {
            this.renderAuctions();
            this.initializeTimers();
        }
    }

    createAuctionCard(item) {
        return `
      <div class="art-card fade-in bg-white rounded-xl overflow-hidden shadow-lg">
        <div class="relative">
          <img src="${item.image}" alt="${item.title}" loading="lazy"
            class="w-full h-64 object-cover loading-skeleton transition-opacity duration-300"
            onload="this.classList.remove('loading-skeleton')">
          <div class="absolute top-4 right-4 bg-white px-4 py-2 rounded-full text-blue-600 font-bold">
            Current: ${item.currentBid}
          </div>
          <div class="auction-timer absolute bottom-4 left-4 right-4 text-white py-2 px-4 rounded-lg text-center">
            <div class="flex justify-center items-center space-x-4">
              <div class="text-center">
                <span class="block text-xl font-bold hours">00</span>
                <span class="text-sm">Hours</span>
              </div>
              <div class="text-center">
                <span class="block text-xl font-bold minutes">00</span>
                <span class="text-sm">Minutes</span>
              </div>
              <div class="text-center">
                <span class="block text-xl font-bold seconds">00</span>
                <span class="text-sm">Seconds</span>
              </div>
            </div>
          </div>
        </div>
        <div class="p-6">
          <h3 class="font-bold text-xl mb-2">${item.title}</h3>
          <p class="text-gray-600 mb-4">by ${item.artist}</p>
          <div class="flex justify-between items-center mb-4">
            <span class="text-sm text-gray-500">🔥 ${item.activeBids} active bids</span>
            <span class="text-sm text-gray-500">Started at: ${item.startingBid}</span>
          </div>
          <button
            class="w-full bg-blue-600 text-white py-3 rounded-full hover:bg-blue-700 transition-colors transform hover:scale-105 bid-button">
            Place Bid Now
          </button>
        </div>
      </div>
    `;
    }

    renderAuctions() {
        if (!this.auctionGrid) return;
        this.auctionGrid.innerHTML = auctionItems.map(item => this.createAuctionCard(item)).join('');
    }

    initializeTimers() {
        const timers = document.querySelectorAll('.auction-timer');
        timers.forEach((timer, index) => {
            const endTime = auctionItems[index].endTime;
            this.startTimer(timer, endTime);
        });
    }

    startTimer(timer, endTime) {
        const updateTimer = () => {
            const now = new Date().getTime();
            const distance = endTime - now;

            const hours = Math.floor(distance / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            const hoursEl = timer.querySelector('.hours');
            const minutesEl = timer.querySelector('.minutes');
            const secondsEl = timer.querySelector('.seconds');

            if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
            if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
            if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, '0');
        };

        updateTimer();
        setInterval(updateTimer, 1000);
    }
}

// Initialize managers
document.addEventListener('DOMContentLoaded', () => {
    // Initialize only if elements exist
    const galleryGrid = document.querySelector('.gallery-grid');
    const auctionGrid = document.querySelector('.auction-grid');
    const searchInput = document.getElementById('searchInput');

    if (galleryGrid) {
        new GalleryManager();
    }
    if (auctionGrid && !window.auctionManagerInstance) {
        window.auctionManagerInstance = new AuctionManager();
    }

    // Initialize search only if input exists
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const cards = document.querySelectorAll('.art-card');
            cards.forEach(card => {
                const title = card.querySelector('h3')?.textContent?.toLowerCase() || '';
                const artist = card.querySelector('p')?.textContent?.toLowerCase() || '';
                const category = card.getAttribute('data-category')?.toLowerCase() || '';
                if (title.includes(query) || artist.includes(query) || category.includes(query)) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
});

const galleryItems = [
    {
        image: 'assets/images/art/painting1.jpg',
        title: 'Dreamy Sunset',
        artist: 'Sarah Chen',
        price: '₹12,000',
        category: 'Paintings'
    },
    {
        image: 'assets/images/art/painting2.jpg',
        title: 'Old Flower',
        artist: 'Michael Brown',
        price: '₹15,500',
        category: 'Paintings'
    },
    {
        image: 'assets/images/art/painting3.jpg',
        title: 'Bright Orange',
        artist: 'Emma Wilson',
        price: '₹9,800',
        category: 'Digital Art'
    },
    {
        image: 'assets/images/art/painting4.jpg',
        title: 'The Eye',
        artist: 'John Smith',
        price: '₹18,200',
        category: 'Digital Art'
    },
    {
        image: 'assets/images/art/painting5.jpg',
        title: 'Predator',
        artist: 'Lisa Anderson',
        price: '₹21,000',
        category: 'Photography'
    },

];

// Gallery Management
class GalleryManager {
    constructor() {
        this.currentPage = 1;
        this.itemsPerPage = 3;
        this.currentFilter = 'all';
        this.searchQuery = '';
        this.init();
    }

    init() {
        this.galleryGrid = document.querySelector('.gallery-grid');
        this.loadMoreBtn = document.getElementById('load-more');
        this.searchInput = document.getElementById('searchInput');
        this.filterButtons = document.querySelectorAll('.filter-button');

        if (this.galleryGrid && this.loadMoreBtn && this.searchInput) {
            this.setupEventListeners();
            this.renderGallery();
        }
    }

    setupEventListeners() {
        this.searchInput.addEventListener('input', (e) => {
            this.searchQuery = e.target.value.toLowerCase();
            this.currentPage = 1;
            this.renderGalleryWithAnimation();
        });

        this.filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.filterButtons.forEach(btn => btn.classList.remove('active', 'bg-blue-600', 'text-white'));
                button.classList.add('active', 'bg-blue-600', 'text-white');
                this.currentFilter = button.dataset.category;
                this.currentPage = 1;
                this.renderGalleryWithAnimation();
            });
        });

        this.loadMoreBtn.addEventListener('click', () => this.loadMore());
    }

    getFilteredItems() {
        if (!Array.isArray(galleryItems)) return [];

        return galleryItems.filter(item => {
            const matchesSearch =
                item.title.toLowerCase().includes(this.searchQuery) ||
                item.artist.toLowerCase().includes(this.searchQuery);
            const matchesCategory =
                this.currentFilter === 'all' ||
                item.category === this.currentFilter;
            return matchesSearch && matchesCategory;
        });
    }

    renderGalleryWithAnimation() {
        // Fade out current items
        const currentItems = this.galleryGrid.children;
        Array.from(currentItems).forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
        });

        // Render new items after fade out
        setTimeout(() => this.renderGallery(), 300);
    }

    renderGallery() {
        if (!this.galleryGrid) return;

        const filteredItems = this.getFilteredItems();
        const itemsToShow = filteredItems.slice(0, this.currentPage * this.itemsPerPage);

        this.galleryGrid.innerHTML = itemsToShow.map(item => this.createGalleryItem(item)).join('');

        // Initialize scroll animation observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('loaded');
                    }, 100);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });

        // Observe cards and add quick buy functionality
        const cards = this.galleryGrid.querySelectorAll('.art-card');
        cards.forEach((card) => {
            observer.observe(card);

            const quickBuyBtn = card.querySelector('.buy-button');
            if (quickBuyBtn) {
                quickBuyBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const notification = document.createElement('div');
                    notification.className = 'fixed top-24 right-4 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate__animated animate__fadeIn';
                    notification.innerHTML = '<i class="fas fa-lock mr-2"></i>Sign in required to place your bid';
                    document.body.appendChild(notification);

                    setTimeout(() => {
                        notification.classList.add('animate__fadeOut');
                        setTimeout(() => notification.remove(), 1000);
                    }, 3000);
                });
            }
        });

        if (this.loadMoreBtn) {
            this.loadMoreBtn.style.display =
                itemsToShow.length >= filteredItems.length ? 'none' : 'inline-flex';
        }
    }

    createGalleryItem(item) {
        return `
      <div class="art-card" data-category="${item.category}">
        <div class="art-card rounded-xl overflow-hidden shadow-lg bg-white">
          <div class="relative group">
            <img src="${item.image}" alt="${item.title}" loading="lazy"
              class="w-full h-64 object-cover transition-opacity duration-300"
              onerror="this.src='../assets/images/logo/altlogo.jpg'; this.alt='Image failed to load'; this.classList.remove('loading-skeleton');">
            <div class="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div class="text-white text-center transform translate-y-4 group-hover:translate-y-0 transition-transform">
                <button class="bg-white text-blue-600 px-6 py-2 rounded-full hover:bg-blue-50 transition-colors mb-2 view-details">
                  View Details
                </button>
                <a href="pages/auth.html?form=sign-in" class="block bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors buy-button">
                  Quick Buy
                </a>
              </div>
            </div>
          </div>
          <div class="p-6">
            <h3 class="font-bold text-xl mb-2">${item.title}</h3>
            <p class="text-gray-600 mb-4">by ${item.artist}</p>
            <div class="flex justify-between items-center">
              <span class="text-blue-600 font-bold">${item.price}</span>
              <span class="text-sm text-gray-500">${item.category}</span>
            </div>
          </div>
        </div>
      </div>
    `;
    }

    loadMore() {
        this.currentPage++;
        this.renderGallery();
    }
}

// Initialize gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const galleryManager = new GalleryManager();
});

// Utility functions
window.utils = {
    throttle: (func, limit) => {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    formatTimeRemaining: (endTime) => {
        const total = new Date(endTime) - new Date();
        const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const seconds = Math.floor((total / 1000) % 60);
        return { total, hours, minutes, seconds };
    }
};

// Wait for DOM to be loaded
document.addEventListener('DOMContentLoaded', () => {
    const loadingSpinner = document.querySelector('.loading-spinner');
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMenu = document.getElementById('closeMenu');
    const backToTopButton = document.getElementById('backToTop');

    // Ensure spinner hides even if load takes too long
    setTimeout(() => {
        const spinner = document.querySelector('.loading-spinner');
        if (spinner) spinner.style.display = 'none';
    }, 3000);

    if (loadingSpinner) {
        window.addEventListener('load', function() {
            document.querySelector('.loading-spinner').style.display = 'none';
        });
    }

    // Mobile Menu Handler
    document.addEventListener('DOMContentLoaded', () => {
        const menuToggle = document.getElementById('menuToggle');
        const mobileMenu = document.getElementById('mobileMenu');
        const closeMenuBtn = document.getElementById('closeMenu');
        const menuLinks = mobileMenu?.querySelectorAll('a');

        const handleClose = () => {
            mobileMenu?.classList.remove('active');
            document.body.classList.remove('menu-open');
            menuLinks?.forEach((link, index) => {
                link.style.transitionDelay = '0s';
            });
        };

        const handleOpen = () => {
            mobileMenu?.classList.add('active');
            document.body.classList.add('menu-open');
            menuLinks?.forEach((link, index) => {
                link.style.transitionDelay = `${0.2 + index * 0.1}s`;
            });
        };

        menuToggle?.addEventListener('click', () => {
            if (mobileMenu?.classList.contains('active')) {
                handleClose();
            } else {
                handleOpen();
            }
        });

        closeMenuBtn?.addEventListener('click', handleClose);

        // Close mobile menu on link click
        menuLinks?.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const menuLinks = mobileMenu.querySelectorAll('a');
                menuLinks.forEach((link, i) => {
                    setTimeout(() => {
                        link.style.opacity = '0';
                        link.style.transform = 'translateX(30px)';
                    }, i * 100);
                });

                setTimeout(() => {
                    mobileMenu.classList.remove('active');
                    document.body.style.overflow = '';
                    setTimeout(() => {
                        window.location.href = link.href;
                    }, 300);
                }, menuLinks.length * 100 + 100);
            });
        });


        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenu?.classList.contains('active')) {
                handleClose();
            }
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth >= 1024 && mobileMenu?.classList.contains('active')) {
                handleClose();
            }
        });
    });

    // Back to top button
    if (backToTopButton) {
        const handleScroll = () => {
            if (window.pageYOffset > 500) {
                backToTopButton.classList.remove('hidden');
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
                backToTopButton.classList.add('hidden');
            }
        };

        window.addEventListener('scroll', handleScroll);

        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Image loading
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        if (!img.src && img.dataset.src) {
            img.src = img.dataset.src;
        }

        img.onerror = () => {
            // Only replace with altlogo if the original source wasn't already altlogo
            if (!img.src.includes('altlogo.jpg')) {
                img.src = '../assets/images/logo/altlogo.jpg';
                img.alt = 'Image failed to load';
            }
        };

        img.onload = () => {
            img.classList.remove('loading-skeleton');
        };
    });


    // Gallery and Artwork Management
    class GalleryManager {
        constructor() {
            this.filterButtons = document.querySelectorAll('.filter-button');
            this.galleryGrid = document.querySelector('.gallery-grid');
            this.loadMoreBtn = document.getElementById('load-more');
            this.page = 1;
            this.loading = false;
            this.currentFilter = 'all';
            this.init();
        }

        init() {
            // Initialize filters
            this.filterButtons?.forEach(button => {
                button.addEventListener('click', (e) => this.handleFilter(e));
            });

            // Initialize load more
            this.loadMoreBtn?.addEventListener('click', () => this.loadMore());

            // Initialize artwork interactions
            this.initArtworkInteractions();
        }

        handleFilter(e) {
            const button = e.target;
            const filter = button.dataset.filter || 'all';

            // Update active state
            this.filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Update current filter
            this.currentFilter = filter;

            // Reset page
            this.page = 1;

            // Filter artworks
            this.filterArtworks(filter);
        }

        filterArtworks(filter) {
            const artworks = this.galleryGrid.querySelectorAll('.art-card');

            artworks.forEach(artwork => {
                const category = artwork.dataset.category;
                if (filter === 'all' || category === filter) {
                    artwork.style.display = '';
                    artwork.classList.add('animate__animated', 'animate__fadeIn');
                } else {
                    artwork.style.display = 'none';
                }
            });
        }

        async loadMore() {
            if (this.loading) return;
            this.loading = true;
            this.loadMoreBtn.innerHTML = '<div class="loading-spinner mx-auto"></div>';
            try {
                await new Promise(resolve => setTimeout(resolve, 1000));
                const newItems = this.generateMockArtworks(6);
                this.galleryGrid.insertAdjacentHTML('beforeend', newItems);
                this.page++;

                if (this.page >= 3) {
                    this.loadMoreBtn.style.display = 'none';
                    const viewAllBtn = document.createElement('a');
                    viewAllBtn.href = 'pages/gallery.html';
                    viewAllBtn.className = 'inline-block bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-all text-center';
                    viewAllBtn.innerHTML = 'View All Art <i class="fas fa-arrow-right ml-2"></i>';
                    this.loadMoreBtn.parentNode.appendChild(viewAllBtn);
                }

                this.initArtworkInteractions();
                if (this.currentFilter !== 'all') {
                    this.filterArtworks(this.currentFilter);
                }
            } catch (error) {
                console.error('Error loading more artworks:', error);
                this.loading = false;
                this.loadMoreBtn.innerHTML = 'Load More <i class="fas fa-arrow-down ml-2"></i>';
            } finally {
                this.loading = false;
                if (this.page < 3) {
                    this.loadMoreBtn.innerHTML = 'Load More <i class="fas fa-arrow-down ml-2"></i>';
                }
            }
        }

        initArtworkInteractions() {
            const artworks = document.querySelectorAll('.art-card');

            artworks.forEach(artwork => {
                // Quick buy button
                const quickBuyBtn = artwork.querySelector('.quick-buy');
                quickBuyBtn?.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.handleQuickBuy(artwork);
                });

                // View details button
                const viewDetailsBtn = artwork.querySelector('.view-details');
                viewDetailsBtn?.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.handleViewDetails(artwork);
                });
            });
        }

        handleQuickBuy(artwork) {
            // Implement quick buy logic
            console.log('Quick buy:', artwork.dataset.id);
        }

        handleViewDetails(artwork) {
            // Implement view details logic
            console.log('View details:', artwork.dataset.id);
        }

        generateMockArtworks(count) {
            // Generate mock artwork HTML
            return Array(count).fill('').map((_, i) => `
                <div class="art-card" data-id="${this.page * 6 + i}">
                    <!-- Artwork card HTML structure -->
                </div>
            `).join('');
        }
    }

    // Work in Progress Popup
    function showWorkInProgressPopup() {
        const popup = document.createElement('div');
        popup.className = 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-gray-800 px-8 py-4 rounded-lg shadow-xl z-50 animate__animated animate__fadeIn';
        popup.innerHTML = `
            <div class="text-xl font-bold mb-2">Work in Progress</div>
            <div class="text-gray-600">This feature is currently under development.</div>
        `;
        document.body.appendChild(popup);

        setTimeout(() => {
            popup.classList.add('animate__fadeOut');
            setTimeout(() => popup.remove(), 500);
        }, 2000);
    }

    // Add click handlers for interactive elements
    document.addEventListener('click', (e) => {
        const target = e.target;

        // Show sign in message for quick buy and place bid buttons
        if (target.classList.contains('buy-button') || target.classList.contains('bid-button')) {
            e.preventDefault();
            const notification = document.createElement('div');
            notification.className = 'fixed top-24 right-4 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate__animated animate__fadeIn';
            notification.innerHTML = '<i class="fas fa-lock mr-2"></i>Sign in required to place your bid';
            document.body.appendChild(notification);

            setTimeout(() => {
                notification.classList.add('animate__fadeOut');
                setTimeout(() => notification.remove(), 500);
            }, 2000);
            return;
        }

        // Work in progress for other art card interactions
        if (target.closest('.art-card') || target.closest('.auction-item') || target.closest('.artist-card')) {
            e.preventDefault();
            showWorkInProgressPopup();
        }
    });

    // Search Functionality
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        document.querySelectorAll('.art-card').forEach(card => {
            const title = card.querySelector('h3').innerText.toLowerCase();
            const artist = card.querySelector('p').innerText.toLowerCase();
            const category = card.getAttribute('data-category').toLowerCase();
            if (title.includes(query) || artist.includes(query) || category.includes(query)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    });

    // Filter Functionality
    const filterButtons = document.querySelectorAll('.filter-button');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.getAttribute('data-category');
            filterButtons.forEach(b => b.classList.remove('bg-blue-600', 'text-white'));
            btn.classList.add('bg-blue-600', 'text-white');

            document.querySelectorAll('.art-card').forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                card.style.display = (category === 'all' || cardCategory === category) ? '' : 'none';
            });
        });
    });

    // Auction System
    class AuctionManager {
        constructor() {
            this.auctions = document.querySelectorAll('.auction-item');
            this.init();
        }

        init() {
            this.auctions.forEach(auction => {
                const endTime = auction.dataset.endTime;
                this.startTimer(auction, endTime);
                this.initBidding(auction);
            });
        }

        startTimer(auction, endTime) {
            const timerDisplay = auction.querySelector('.auction-timer');

            const updateTimer = () => {
                const time = utils.formatTimeRemaining(endTime);

                if (time.total <= 0) {
                    clearInterval(interval);
                    this.handleAuctionEnd(auction);
                    return;
                }

                timerDisplay.innerHTML = `
                    <div class="flex justify-center items-center space-x-4">
                        <div class="text-center">
                            <span class="block text-xl font-bold">${String(time.hours).padStart(2, '0')}</span>
                            <span class="text-sm">Hours</span>
                        </div>
                        <div class="text-center">
                            <span class="block text-xl font-bold">${String(time.minutes).padStart(2, '0')}</span>
                            <span class="text-sm">Minutes</span>
                        </div>
                        <div class="text-center">
                            <span class="block text-xl font-bold">${String(time.seconds).padStart(2, '0')}</span>
                            <span class="text-sm">Seconds</span>
                        </div>
                    </div>
                `;
            };

            const interval = setInterval(updateTimer, 1000);
            updateTimer();
        }

        initBidding(auction) {
            const bidButton = auction.querySelector('.place-bid');
            const currentPrice = auction.querySelector('.current-price');

            bidButton?.addEventListener('click', () => {
                this.handleBid(auction, currentPrice);
            });
        }

        handleBid(auction, priceElement) {
            // Implement bidding logic
            const currentPrice = parseFloat(priceElement.dataset.price);
            const minIncrement = parseFloat(auction.dataset.minIncrement) || 100;
            const newPrice = currentPrice + minIncrement;

            // Update UI
            priceElement.textContent = utils.formatCurrency(newPrice);
            priceElement.dataset.price = newPrice;

            // Animate price change
            priceElement.classList.add('animate__animated', 'animate__heartBeat');
            setTimeout(() => {
                priceElement.classList.remove('animate__animated', 'animate__heartBeat');
            }, 1000);
        }

        handleAuctionEnd(auction) {
            auction.classList.add('auction-ended');
            const bidButton = auction.querySelector('.place-bid');
            bidButton.disabled = true;
            bidButton.textContent = 'Auction Ended';
        }
    }

    // Back to Top Button
    class BackToTop {
        constructor() {
            this.button = document.getElementById('backToTop');
            this.init();
        }

        init() {
            window.addEventListener('scroll', utils.throttle(() => this.toggleButton(), 100));
            this.button?.addEventListener('click', (e) => this.scrollToTop(e));
        }

        toggleButton() {
            if (window.scrollY > 500) {
                this.button.classList.add('visible');
            } else {
                this.button.classList.remove('visible');
            }
        }

        scrollToTop(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }

    // Newsletter Subscription
    class Newsletter {
        constructor() {
            this.form = document.querySelector('.newsletter-form');
            this.init();
        }

        init() {
            this.form?.addEventListener('submit', (e) => this.handleSubmit(e));
        }

        async handleSubmit(e) {
            e.preventDefault();
            const email = this.form.querySelector('input[type="email"]').value;
            const submitButton = this.form.querySelector('button[type="submit"]');

            // Validate email
            if (!this.validateEmail(email)) {
                this.showMessage('Please enter a valid email address', 'error');
                return;
            }

            // Show loading state
            submitButton.disabled = true;
            submitButton.innerHTML = '<div class="loading-spinner mx-auto"></div>';

            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Success
                this.showMessage('Thank you for subscribing!', 'success');
                this.form.reset();
            } catch (error) {
                this.showMessage('An error occurred. Please try again.', 'error');
            } finally {
                submitButton.disabled = false;
                submitButton.textContent = 'Subscribe';
            }
        }

        validateEmail(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        }

        showMessage(message, type) {
            const messageElement = document.createElement('div');
            messageElement.className = `message ${type} animate__animated animate__fadeIn`;
            messageElement.textContent = message;

            this.form.appendChild(messageElement);

            setTimeout(() => {
                messageElement.remove();
            }, 3000);
        }
    }


    // Initialize smooth scroll animations
    const initSmoothScrolling = () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px'
        });

        document.querySelectorAll('.art-card, .artist-card, .auction-item').forEach(el => {
            el.classList.add('fade-up');
            observer.observe(el);
        });
    };

    // Initialize everything when DOM is loaded
    new GalleryManager();
    new BackToTop();
    new Newsletter();

    initSmoothScrolling();


    // Initialize smooth fade-in animations
    const initFadeInAnimations = () => {
        const elements = document.querySelectorAll('.fade-in');
        elements.forEach(el => {
            el.classList.add('fade');
            el.style.opacity = '0';
            el.style.transition = 'opacity 0.8s ease-in-out';

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        el.style.opacity = '1';
                        observer.unobserve(entry.target);                    }
                });
            });

            observer.observe(el);
        });
    };

    // Initialize everything when DOM is loaded
    initFadeInAnimations();

    // Function to dynamically arrange gallery items
    function arrangeGalleryItems() {
        const galleryGrid = document.querySelector('.gallery-grid');
        const galleryItems = galleryGrid.querySelectorAll('.art-card');

        // Determine the number of columns based on screen size
        let columns = 1;
        if (window.innerWidth >= 768) {
            columns = 2;
        }
        if (window.innerWidth >= 1024) {
            columns = 3;
        }

        // Set grid template columns
        galleryGrid.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;

        // Add fade-in animation to gallery items
        galleryItems.forEach((item) => {
            item.classList.add('fade-in');
        });
    }

    // Function to dynamically arrange auction items
    function arrangeAuctionItems() {
        const auctionGrid = document.querySelector('.grid.grid-cols-1');
        const auctionItems = auctionGrid.querySelectorAll('.art-card');

        // Determine the number of columns based on screen size
        let columns = 1;
        if (window.innerWidth >= 768) {
            columns = 2;
        }
        if (window.innerWidth >= 1024) {
            columns = 3;
        }

        // Set grid template columns
        auctionGrid.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;

        // Add fade-in animation to auction items
        auctionItems.forEach((item) => {
            item.classList.add('fade-in');
        });
    }

    // Function to dynamically arrange artist cards
    function arrangeArtistCards() {
        const artistGrid = document.querySelector('.grid.grid-cols-1');
        const artistCards = artistGrid.querySelectorAll('.artist-card');

        // Determine the number of columns based on screen size
        let columns = 1;
        if (window.innerWidth >= 768) {
            columns = 3;
        }

        // Set grid template columns
        artistGrid.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;

        // Add fade-in animation to artist cards
        artistCards.forEach((item) => {
            item.classList.add('fade-in');
        });
    }

    // Call the arrangement functions on page load and window resize
    arrangeGalleryItems();
    arrangeAuctionItems();
    arrangeArtistCards();

    window.addEventListener('resize', () => {
        arrangeGalleryItems();
        arrangeAuctionItems();
        arrangeArtistCards();
    });

    // Add fade-in class to elements on scroll
    const observer1 = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.5 });

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((element) => {
        observer1.observe(element);
    });


    // Navigation and Mobile Menu
    class Navigation {
        constructor() {
            this.mobileMenuButton = document.querySelector('[aria-label="Menu"]');
            this.mobileMenu = document.querySelector('.mobile-menu');
            this.header = document.querySelector('nav');
            this.lastScroll = 0;
            this.init();
        }

        init() {
            // Mobile menu toggle
            this.mobileMenuButton?.addEventListener('click', () => this.toggleMobileMenu());

            // Close menu button
            const closeMenuBtn = document.getElementById('closeMenu');
            closeMenuBtn?.addEventListener('click', () => this.closeMobileMenu());

            // Hide header on scroll down, show on scroll up
            window.addEventListener('scroll', utils.throttle(() => this.handleScroll(), 100));

            // Close mobile menu on window resize
            window.addEventListener('resize', () => {
                if (window.innerWidth > 1024) {
                    this.closeMobileMenu();
                }
            });

            // Handle mobile menu links
            const mobileMenuLinks = this.mobileMenu?.querySelectorAll('a');
            mobileMenuLinks?.forEach(link => {
                link.addEventListener('click', () => this.closeMobileMenu());
            });
        }

        toggleMobileMenu() {
            const isOpening = !this.mobileMenu.classList.contains('active');
            this.mobileMenu.classList.toggle('active');
            document.body.style.overflow = isOpening ? 'hidden' : '';

            // Animate menu items
            const menuItems = this.mobileMenu.querySelectorAll('a');
            menuItems.forEach((item, index) => {
                item.style.transitionDelay = isOpening ? `${0.1 * index}s` : '0s';
            });
        }

        closeMobileMenu() {
            this.mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }

        handleScroll() {
            const currentScroll = window.pageYOffset;

            if (currentScroll <= 0) {
                this.header.classList.remove('scroll-up');
                return;
            }

            if (currentScroll > this.lastScroll && !this.header.classList.contains('scroll-down')) {
                this.header.classList.remove('scroll-up');
                this.header.classList.add('scroll-down');
            } else if (currentScroll < this.lastScroll && this.header.classList.contains('scroll-down')) {
                this.header.classList.remove('scroll-down');
                this.header.classList.add('scroll-up');
            }

            this.lastScroll = currentScroll;
        }

    }
    new Navigation();

    // Initialize animation observer for all cards
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
                animationObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });

    // Observe all cards for animation
    document.querySelectorAll('.art-card, .auction-item, .artist-card').forEach(card => {
        animationObserver.observe(card);
    });
});
// Modal functionality
class Modal {
  constructor() {
    this.modal = document.getElementById('itemModal');
    this.modalImage = document.getElementById('modalImage');
    this.modalTitle = document.getElementById('modalTitle');
    this.modalArtist = document.getElementById('modalArtist');
    this.modalDescription = document.getElementById('modalDescription');
    this.modalPrice = document.getElementById('modalPrice');
    this.modalBidInfo = document.getElementById('modalBidInfo');
    this.modalAction = document.getElementById('modalAction');
    this.currentItems = [];
    this.currentIndex = 0;

    this.init();
  }

  init() {
    document.querySelector('.modal-close').onclick = () => this.close();
    document.querySelector('.prev-btn').onclick = () => this.navigate(-1);
    document.querySelector('.next-btn').onclick = () => this.navigate(1);
  }

  open(items, index = 0) {
    this.currentItems = items;
    this.currentIndex = index;
    this.updateContent();
    this.modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }

  navigate(direction) {
    this.currentIndex = (this.currentIndex + direction + this.currentItems.length) % this.currentItems.length;
    this.updateContent();
  }

  updateContent() {
    const item = this.currentItems[this.currentIndex];
    this.modalImage.src = item.image;
    this.modalTitle.textContent = item.title;
    this.modalArtist.textContent = `by ${item.artist}`;
    this.modalDescription.textContent = item.description || '';

    if (item.type === 'auction') {
      this.modalPrice.innerHTML = `Current Bid: <strong>${item.currentBid}</strong>`;
      this.modalBidInfo.style.display = 'block';
      this.modalBidInfo.innerHTML = `<div>Starting Bid: ${item.startingBid}</div>
                                    <div>Active Bids: ${item.activeBids}</div>`;
      this.modalAction.textContent = 'Place Bid';
    } else {
      this.modalPrice.innerHTML = item.price ? `Price: <strong>${item.price}</strong>` : '';
      this.modalBidInfo.style.display = 'none';
      this.modalAction.textContent = item.type === 'gallery' ? 'Purchase' : 'View Profile';
    }
  }
}

const modal = new Modal();

// Initialize modal triggers
document.addEventListener('DOMContentLoaded', () => {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const auctionItems = document.querySelectorAll('.art-card');
  const artistCards = document.querySelectorAll('.artist-card');

  galleryItems.forEach((item, index) => {
    item.onclick = () => modal.open(galleryData, index);
  });

  auctionItems.forEach((item, index) => {
    item.onclick = () => modal.open(auctionItems, index);
  });

  artistCards.forEach((item, index) => {
    item.onclick = () => modal.open(artistData, index);
  });
});

// Modal Management
class ModalManager {
  constructor(modalId) {
    this.modal = document.getElementById(modalId);
    this.closeBtn = this.modal?.querySelector('.modal-close');
    this.prevBtn = this.modal?.querySelector('.prev-btn');
    this.nextBtn = this.modal?.querySelector('.next-btn');
    this.init();
  }

  init() {
    if (!this.modal) return;

    this.closeBtn.onclick = () => this.close();

    window.onclick = (e) => {
      if (e.target === this.modal) {
        this.close();
      }
    };

    if (this.prevBtn) {
      this.prevBtn.onclick = () => this.navigateGallery('prev');
    }

    if (this.nextBtn) {
      this.nextBtn.onclick = () => this.navigateGallery('next');
    }
  }

  open() {
    if (this.modal) {
      this.modal.style.display = 'block';
      document.body.style.overflow = 'hidden';
    }
  }

  close() {
    if (this.modal) {
      this.modal.style.display = 'none';
      document.body.style.overflow = '';
    }
  }

  navigateGallery(direction) {
    // Navigation logic to be implemented
    console.log('Navigate:', direction);
  }
}

// Make sure to handle clicks properly
document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('click', (e) => {
    const target = e.target;
    const artCard = target.closest('.art-card');
    const viewDetailsBtn = target.closest('button[class*="view-details"]');
    const buyButton = target.closest('.buy-button');
    const bidButton = target.closest('.bid-button');


    if (viewDetailsBtn || (artCard && target.tagName !== 'BUTTON')) {
      const modalType = getModalType(artCard);
      const modalManager = new ModalManager(modalType);
      modalManager.open();
      return;
    }


    if (buyButton) {
      handleBuyButton(buyButton);
      return;
    }


    if (bidButton) {
      handleBidButton(bidButton);
      return;
    }
  });
});

// Initialize modal managers
const galleryModal = new ModalManager('galleryModal');
const auctionModal = new ModalManager('auctionModal');
const artistModal = new ModalManager('artistModal');

// Work in Progress Handler
function showWorkInProgressPopup() {
  const popup = document.createElement('div');
  popup.className = 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-gray-800 px-8 py-4 rounded-lg shadow-xl z-50 animate__animated animate__fadeIn';
  popup.innerHTML = `
    <div class="text-xl font-bold mb-2">Work in Progress</div>
    <div class="text-gray-600">This feature is currently under development.</div>
  `;
  document.body.appendChild(popup);

  setTimeout(() => {
    popup.classList.add('animate__fadeOut');
    setTimeout(() => popup.remove(), 500);
  }, 2000);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  // Add click handlers for art cards and view-details buttons
  document.addEventListener('click', (e) => {
    const target = e.target;
    const artCard = target.closest('.art-card');
    const viewDetailsBtn = target.closest('button[class*="view-details"]');
    const buyButton = target.closest('.buy-button');
    const bidButton = target.closest('.bid-button');


    // Handle defined functionality first
    if (buyButton) {
      handleBuyButton(buyButton);
      return;
    }


    if (bidButton) {
      handleBidButton(bidButton);
      return;
    }


    if (viewDetailsBtn) {
      const modalManager = new ModalManager(getModalType(artCard));
      modalManager.open();
      return;
    }


    // Show work in progress for undefined functionality
    if (artCard && !buyButton && !bidButton && !viewDetailsBtn) {
      showWorkInProgressPopup();
    }
  });

  function handleBuyButton(button) {
    const notification = document.createElement('div');
    notification.className = 'fixed top-24 right-4 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate__animated animate__fadeIn';
    notification.innerHTML = '<i class="fas fa-lock mr-2"></i>Sign in required to make a purchase';
    document.body.appendChild(notification);
    setTimeout(() => {
      notification.classList.add('animate__fadeOut');
      setTimeout(() => notification.remove(), 500);
    }, 2000);
  }

  function handleBidButton(button) {
    const notification = document.createElement('div');
    notification.className = 'fixed top-24 right-4 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate__animated animate__fadeIn';
    notification.innerHTML = '<i class="fas fa-lock mr-2"></i>Sign in required to place your bid';
    document.body.appendChild(notification);
    setTimeout(() => {
      notification.classList.add('animate__fadeOut');
      setTimeout(() => notification.remove(), 500);
    }, 2000);
  }

  function getModalType(artCard) {
    if (artCard.classList.contains('auction-item')) return 'auctionModal';
    if (artCard.classList.contains('artist-card')) return 'artistModal';
    return 'galleryModal';
  }

  // Back to top button functionality
  const backToTopButton = document.getElementById('backToTop');
  if (backToTopButton) {
    window.onscroll = () => {
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        backToTopButton.style.display = 'block';
      } else {
        backToTopButton.style.display = 'none';
      }
    };

    backToTopButton.onclick = () => {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    };
  }
});
// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  // Initialize components
  initializeComponents();

  // Setup global event listeners
  setupGlobalEvents();
});

function initializeComponents() {
  // Mount hero section
  const heroContainer = document.getElementById('heroSection');
  if (heroContainer) {
    const heroComponent = new ComponentRegistry.get('hero')(
      heroContainer,
      SiteConfig.hero
    );
    heroComponent.mount();
  }

  // Mount gallery section
  const galleryContainer = document.getElementById('gallerySection');
  if (galleryContainer) {
    const galleryComponent = new ComponentRegistry.get('gallery')(
      galleryContainer,
      SiteConfig.gallery
    );
    galleryComponent.mount();
  }
}

function setupGlobalEvents() {
  // Back to top functionality
  const backToTopButton = document.getElementById('backToTop');
  if (backToTopButton) {
    window.onscroll = () => {
      if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
        backToTopButton.classList.remove('hidden');
      } else {
        backToTopButton.classList.add('hidden');
      }
    };

    backToTopButton.onclick = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
  }
}

// Component Registry
class ComponentRegistry {
  static components = new Map();

  static register(name, component) {
    this.components.set(name, component);
  }

  static get(name) {
    return this.components.get(name);
  }
}

// Base Component Class
class Component {
  constructor(container, config) {
    this.container = container;
    this.config = config;
  }

  mount() {
    this.container.innerHTML = this.render();
    this.afterMount();
  }

  afterMount() {}
}

class HeroComponent extends Component {
  render() {
    return `<h1>Welcome to my website!</h1>`;
  }
}

ComponentRegistry.register('hero', HeroComponent);