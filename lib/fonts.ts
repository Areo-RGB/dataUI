import { Poppins, Lexend } from "next/font/google"

// Display font - Poppins
export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['600'],
  variable: '--display-family',
});

// Text font - Lexend
export const lexend = Lexend({
  subsets: ['latin'],
  weight: ['300'],
  variable: '--text-family',
});
