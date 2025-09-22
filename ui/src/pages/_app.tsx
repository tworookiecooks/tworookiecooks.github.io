import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { RecipesProvider } from "@/context/RecipesContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecipesProvider initialRecipes={pageProps.recipes}>
      <Component {...pageProps} />
    </RecipesProvider>
  );
}
