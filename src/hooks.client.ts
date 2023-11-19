import * as Sentry from "@sentry/svelte";
import type { HandleClientError } from "@sveltejs/kit";

Sentry.init({
    dsn: "https://03f0b42f18dcf9d803649103c25453ff@o4506252803768320.ingest.sentry.io/4506252862226432",
});

export const handleError: HandleClientError = async ({ error, event }) => {
    const errorId = crypto.randomUUID();
    Sentry.captureException(error, { extra: { event, errorId } });
};
