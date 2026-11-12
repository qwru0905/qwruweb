import { bindings, defineConfig, defineWorker } from "cf/config";
import { createWorkersResponseStoreServiceBindingConfig } from "@vinext/cloudflare/cache/config";

const responseStore = await createWorkersResponseStoreServiceBindingConfig({
  worker: {
    name: "qwruweb-response-store",
    compatibilityDate: "2026-11-09",
    compatibilityFlags: ["nodejs_compat"],
  },
  bucket: "qwruweb-response-store-cache-bodies",
});

export const responseStoreServiceBinding = responseStore.serviceBindingWorker;

export default defineConfig({
  worker: defineWorker({
    ...responseStore.applicationWorker,
    name: "qwruweb",
    entrypoint: "vinext/server/fetch-handler",
    compatibilityDate: "2026-11-09",
    compatibilityFlags: ["nodejs_compat"],
    assets: {
      htmlHandling: "none",
      notFoundHandling: "none",
      runWorkerFirst: ["/*", "!/_next/static/*", "!/*/_next/static/*"],
    },
    env: {
      ...responseStore.applicationWorker.env,
      ASSETS: bindings.assets(),
      IMAGES: bindings.images(),
      DB: bindings.d1({
        name: "qwruwebdb",
        id: "04f588cd-a184-4e0e-861c-add0a241de47",
        dev: { remote: false },
      }),
      SEEN: bindings.kv({
        id: "7c9fcfbd45784dd0ad88959bd73fda0c",
        dev: { remote: false },
      }),
      WEBHOOK_SECRET: bindings.secret(),
    },
  }),
});
