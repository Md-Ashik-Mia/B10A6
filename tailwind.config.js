// tailwind.config.js
module.exports = {
    content: ["./*.html"], // Ensure this matches your HTML files
    theme: {
      extend: {
        colors: {
          'tiya-green': '#B4F461', 
          'custom-green': 'rgba(171, 239, 95, 0.5)', 
        },
      },
    },
    plugins: [require("daisyui")], // Enable DaisyUI
  };
  