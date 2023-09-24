import adapter from "@sveltejs/adapter-cloudflare";
import { vitePreprocess } from "@sveltejs/kit/vite";

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://kit.svelte.dev/docs/integrations#preprocessors
    // for more information about preprocessors
    preprocess: vitePreprocess(),

    kit: {
        alias: {
            "@types": "./src/types",
            "@type-guards": "./src/type-guards",
            "@constants": "./src/constants",
        },
        adapter: adapter({
            routes: {
                include: ["/*"],
                exclude: ["<all>"],
            },
        }),
    },
};

export default config;
