import localFont from "next/font/local"

// Load Geist Sans (Variable font)
export const geistSans = localFont({
  src: [
    {
      path: "../public/fonts/Geist-Variable.woff2",
      style: "normal",
    },
  ],
  variable: "--font-sans",
})

// Load Geist Mono (Variable font)
export const geistMono = localFont({
  src: [
    {
      path: "../public/fonts/GeistMono-Variable.woff2",
      style: "normal",
    },
  ],
  variable: "--font-mono",
})

// Default serif font
export const serif = localFont({
  src: [
    {
      path: "../public/fonts/Georgia.woff2",
      style: "normal",
      weight: "400",
    },
    {
      path: "../public/fonts/Georgia-Bold.woff2",
      style: "normal",
      weight: "700",
    },
  ],
  variable: "--font-serif",
})
