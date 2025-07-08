module.exports = {
  content: ["./src/**/*.{js,jsx}", "./public/index.html"],
  theme: {
    extend: {
      animation: {
        'slide-down-modal': 'slideDownModal 0.35s cubic-bezier(0.4,0,0.2,1)'
      },
      keyframes: {
        slideDownModal: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
