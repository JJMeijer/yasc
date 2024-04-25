import { spotifyApiRequest } from "$lib/server/spotify";
import { error, json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ fetch, locals, url }) => {
    if (!locals.accessToken) {
        throw error(401, "Unauthorized");
    }

    const artistId = url.searchParams.get("artistId");

    if (!artistId || typeof artistId !== "string") {
        throw error(400, "Bad Request");
    }

    const res = await spotifyApiRequest<boolean[]>(fetch, `me/following/contains?type=artist&ids=${artistId}`, {
        method: "GET",
        accessToken: locals.accessToken,
    });

    return json(res);
};

export const PUT: RequestHandler = async ({ fetch, locals, url }) => {
    if (!locals.accessToken) {
        throw error(401, "Unauthorized");
    }

    const artistId = url.searchParams.get("artistId");

    if (!artistId || typeof artistId !== "string") {
        throw error(400, "Bad Request");
    }

    await spotifyApiRequest(fetch, `me/following?type=artist&ids=${artistId}`, {
        method: "PUT",
        accessToken: locals.accessToken,
    });

    return new Response(null);
};

export const DELETE: RequestHandler = async ({ fetch, locals, url }) => {
    if (!locals.accessToken) {
        throw error(401, "Unauthorized");
    }

    const artistId = url.searchParams.get("artistId");

    if (!artistId || typeof artistId !== "string") {
        throw error(400, "Bad Request");
    }

    await spotifyApiRequest(fetch, `me/following?type=artist&ids=${artistId}`, {
        method: "DELETE",
        accessToken: locals.accessToken,
    });

    return new Response(null);
};
