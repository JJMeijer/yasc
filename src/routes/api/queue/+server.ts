import { spotifyApiRequest } from "$lib/server/spotify";
import { error, type RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ fetch, url, locals }) => {
    if (!locals.accessToken) {
        throw error(401, "Unauthorized");
    }

    const uri = url.searchParams.get("uri");

    // TODO: when devices are implemented again, the queue should be added to the correct device instead of the current

    await spotifyApiRequest(fetch, `me/player/queue?uri=${uri}`, {
        method: "POST",
        accessToken: locals.accessToken,
    });

    return new Response(null);
};
