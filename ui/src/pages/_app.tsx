import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { RecipesProvider } from "@/context/RecipesContext";
import Script from "next/script";
import { useEffect } from "react";
import { useRouter } from "next/router";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (window.gtag) {
        window.gtag("event", "page_view", { page_path: url });
      }
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-D9SBV9GRSC"
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-D9SBV9GRSC', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
      <RecipesProvider initialRecipes={pageProps.recipes}>
        <Component {...pageProps} />
      </RecipesProvider>
    </>
  );
}
