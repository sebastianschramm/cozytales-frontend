export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      keyframes: {
        breathe: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.2)', opacity: '0.7' }, // Expands slightly, becomes a bit transparent
        }
      },
      animation: {
        breathe: 'breathe 2s ease-in-out infinite', // Apply the keyframes over 2 seconds, infinite loop
      }
    },
  },
  plugins: [],
};