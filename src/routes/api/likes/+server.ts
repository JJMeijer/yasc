import { spotifyApiRequest } from "$lib/server/spotify";
import { error, json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ fetch, locals, url }) => {
    if (!locals.accessToken) {
        throw error(401, "Unauthorized");
    }

    const ids = url.searchParams.get("ids");
    const type = url.searchParams.get("type");

    if (!ids || typeof ids !== "string" || !type || typeof type !== "string") {
        throw error(400, "Bad Request");
    }

    const res = await spotifyApiRequest<boolean[]>(fetch, `me/${type}/contains?ids=${ids}`, {
        method: "GET",
        accessToken: locals.accessToken,
    });

    return json(res);
};

export const PUT: RequestHandler = async ({ fetch, locals, url }) => {
    if (!locals.accessToken) {
        throw error(401, "Unauthorized");
    }

    const ids = url.searchParams.get("ids");
    const type = url.searchParams.get("type");

    if (!ids || typeof ids !== "string" || !type || typeof type !== "string") {
        throw error(400, "Bad Request");
    }

    await spotifyApiRequest(fetch, `me/${type}?ids=${ids}`, {
        method: "PUT",
        accessToken: locals.accessToken,
    });

    return new Response(null);
};

export const DELETE: RequestHandler = async ({ fetch, locals, url }) => {
    if (!locals.accessToken) {
        throw error(401, "Unauthorized");
    }

    const ids = url.searchParams.get("ids");
    const type = url.searchParams.get("type");

    if (!ids || typeof ids !== "string" || !type || typeof type !== "string") {
        throw error(400, "Bad Request");
    }

    await spotifyApiRequest(fetch, `me/${type}?ids=${ids}`, {
        method: "DELETE",
        accessToken: locals.accessToken,
    });

    return new Response(null);
};
