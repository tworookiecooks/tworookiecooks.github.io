import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { RecipesProvider } from "@/context/RecipesContext";
import Script from "next/script";
import { useEffect } from "react";
import { useRouter } from "next/router";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    __pendingGtagPage?: string | null;
    __pendingGtagTimeout?: number | null;
    __sendPendingGtag?: () => void;
  }
}

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    // helper to send and clear any pending pageview
    const sendPending = () => {
      try {
        const pending = window.__pendingGtagPage;
        if (window.gtag && pending) {
          window.gtag("event", "page_view", { page_path: pending });
        }
      } finally {
        if (window.__pendingGtagTimeout) {
          clearTimeout(window.__pendingGtagTimeout);
          window.__pendingGtagTimeout = null;
        }
        window.__pendingGtagPage = null;
      }
    };

    // expose for other modules to call when they're ready
    window.__sendPendingGtag = sendPending;

    const handleRouteChange = (url: string) => {
      // Do not immediately report a page_view — defer until page content is ready.
      window.__pendingGtagPage = url;
      // Clear any existing timeout
      if (window.__pendingGtagTimeout) {
        clearTimeout(window.__pendingGtagTimeout);
        window.__pendingGtagTimeout = null;
      }
      // Fallback: if page content doesn't become ready within 5s, still report the view to avoid lost analytics
      window.__pendingGtagTimeout = window.setTimeout(() => {
        sendPending();
      }, 5000);
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
      // cleanup
      window.__sendPendingGtag = undefined;
      if (window.__pendingGtagTimeout) {
        clearTimeout(window.__pendingGtagTimeout);
        window.__pendingGtagTimeout = null;
      }
      window.__pendingGtagPage = null;
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
