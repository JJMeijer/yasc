import { deleteSpotifyRequest, getSpotifyRequest, putSpotifyRequest } from "$lib/server/spotify";
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

    const res = await getSpotifyRequest<boolean[]>(fetch, locals.accessToken, `me/${type}/contains?ids=${ids}`);

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

    await putSpotifyRequest(fetch, locals.accessToken, `me/${type}?ids=${ids}`);

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

    await deleteSpotifyRequest(fetch, locals.accessToken, `me/${type}?ids=${ids}`);

    return new Response(null);
};
