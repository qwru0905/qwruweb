import { bindings, defineConfig } from "cf/config";

/**
 * Secret-like files were detected but not read or migrated: .dev.vars. Only `secrets.required` entries are migrated.
 * @see https://developers.cloudflare.com/workers/configuration/secrets/
 */

export default defineConfig({
	worker: {
		name: "qwruweb",
		compatibilityDate: "2026-11-09",
		compatibilityFlags: [
			"global_fetch_strictly_public",
		],
		entrypoint: "./worker/index.ts",
		observability: {
			enabled: true,
		},
		assets: {
			notFoundHandling: "none",
		},
		env: {
			DB: bindings.d1({
				name: "qwruwebdb",
				id: "04f588cd-a184-4e0e-861c-add0a241de47",
				dev: {
					remote: false,
				},
			}),
			SEEN: bindings.kv({
				id: "7c9fcfbd45784dd0ad88959bd73fda0c",
				dev: {
					remote: false,
				},
			}),
			NEXT_INC_CACHE_R2_BUCKET: bindings.r2({
				name: "qwruweb-opennext-cache",
			}),
			WORKER_SELF_REFERENCE: bindings.worker({
				worker: "qwruweb",
			}),
			IMAGES: bindings.images({}),
			ASSETS: bindings.assets(),
		},
	},
});
