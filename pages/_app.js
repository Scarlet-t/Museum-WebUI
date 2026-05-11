import "@/styles/bootstrap.min.css";
import Layout from "@/components/Layout";
import RouteGuard from "@/components/RouteGuard";
import { useState, useEffect } from "react";

import { SWRConfig } from "swr";

export default function App({ Component, pageProps }) {

  // fic hydration error :///////// ( sgafjsbkdhls i will die tonigthamarek my worsd1!!!)
  const [drankWaterMmmmYummy, drinkWater] = useState(false);
  useEffect(() => {
    drinkWater(true);
  }, []);

  if (!drankWaterMmmmYummy) return null;

  // SWRConfig "meerges the configuration from the parent context" ( i still dont fully know what that means?? )
  return (
    <>
      <RouteGuard>
        <SWRConfig
          value={{
            fetcher: async (url) => {
              const res = await fetch(url);

              if (!res.ok) {
                const error = new Error(
                  "An error occurred while fetching the data."
                );
                error.info = await res.json();
                error.status = res.status;
                throw error;
              }

              return res.json();
            },
          }}
        >
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SWRConfig>
      </RouteGuard>
    </>
  );
}
