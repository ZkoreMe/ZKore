module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "media", // o puedes cambiar a 'class' si prefieres controlar el modo oscuro manualmente
  theme: {
    extend: {
      // Aquí puedes extender Tailwind con tus propios colores, fuentes, etc.
      colors: {
        // Define tus colores personalizados
      },
      fontFamily: {
        // Define tus fuentes personalizadas
      },
      boxShadow: {
        'custom': '2px 2px 0px 0px #000',
      },
      // Puedes añadir más personalizaciones aquí
    },
  },
  plugins: [
    require('daisyui'), // Mantenemos DaisyUI para UI components si lo necesitas
    require("@tailwindcss/typography"), // Plugin de tipografía para prosa, blogs, etc.
  ],
  daisyui: {
    styled: true,
    themes: [
      {
        'myTheme': { // Reemplaza 'myTheme' con el nombre de tu tema
          // Aquí defines los colores de tu tema personalizado
          // Similar a 'solana', pero empezando desde cero con tus propias definiciones
        },
      },
      // Puedes añadir más temas personalizados aquí
    ],
    base: true, // Habilita estilos base de daisyUI (recomendado)
    utils: true, // Habilita utilidades de daisyUI
    logs: true, // Habilita logs de daisyUI para debugging
    rtl: false, // Habilita soporte para RTL si lo necesitas
  },
}
