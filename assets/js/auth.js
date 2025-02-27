// Auth state management
let isAuthenticated = false;
let currentUser = null;

const authUtils = {
  // Check if user is authenticated
  checkAuth() {
    return isAuthenticated;
  },

  // Handle authentication
  async handleAuth() {
    try {
      const response = await fetch('/auth/user');
      const data = await response.json();
      if (data.authenticated) {
        isAuthenticated = true;
        currentUser = data;
        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  },

  // Show auth modal
  showAuthModal() {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
      <div class="bg-white p-8 rounded-xl max-w-md w-full mx-4">
        <h2 class="text-2xl font-bold mb-4">Sign In Required</h2>
        <p class="text-gray-600 mb-6">Please sign in to access this feature.</p>
        <div class="flex gap-4">
          <button onclick="window.location.href='/auth/login'" class="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
            Sign In
          </button>
          <button onclick="this.parentElement.parentElement.parentElement.remove()" class="px-6 py-2 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors">
            Cancel
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  },

  // Protect action
  protectAction(callback) {
    if (this.checkAuth()) {
      callback();
    } else {
      this.showAuthModal();
    }
  }
};

// Add auth checks to interactive elements
document.addEventListener('DOMContentLoaded', () => {
  // Bid buttons
  document.querySelectorAll('.bid-button').forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      authUtils.protectAction(() => {
        // Handle bid action
        console.log('Placing bid...');
      });
    });
  });

  // Buy buttons
  document.querySelectorAll('.buy-button').forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      authUtils.protectAction(() => {
        // Handle purchase action
        console.log('Processing purchase...');
      });
    });
  });

  // Forum post buttons
  document.querySelectorAll('.post-button').forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      authUtils.protectAction(() => {
        // Handle forum post
        console.log('Creating post...');
      });
    });
  });
});

