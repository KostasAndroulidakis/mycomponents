import type { Config } from "tailwindcss";
import { colors } from "./app/constants/colors";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Map our color constants to Tailwind classes
        mouser: {
          primary: colors.primary.blue,
          'primary-dark': colors.primary.darkBlue,
          'primary-light': colors.primary.lightBlue,
          orange: colors.primary.orange,
          
          // Backgrounds
          'bg-white': colors.background.white,
          'bg-light': colors.background.lightGray,
          'bg-medium': colors.background.mediumGray,
          'bg-dark': colors.background.darkGray,
          
          // Text
          'text-primary': colors.text.primary,
          'text-secondary': colors.text.secondary,
          'text-tertiary': colors.text.tertiary,
          'text-disabled': colors.text.disabled,
          'text-white-hover': colors.text.whiteHover,
          
          // Borders
          'border-light': colors.border.light,
          'border-medium': colors.border.medium,
          'border-dark': colors.border.dark,
          
          // Interactive
          'hover-blue': colors.interactive.hoverBlue,
          'active-blue': colors.interactive.activeBlue,
          'hover-gray': colors.interactive.hoverGray,
          
          // Status
          success: colors.status.success,
          error: colors.status.error,
          warning: colors.status.warning,
          info: colors.status.info,
          
          // Component colors
          'quantity-bg': colors.components.quantityBg,
          'filter-badge-bg': colors.components.filterBadgeBg,
          'filter-badge-hover-bg': colors.components.filterBadgeHoverBg,
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
    },
  },
  plugins: [],
} satisfies Config;
