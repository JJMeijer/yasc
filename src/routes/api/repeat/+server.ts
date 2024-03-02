import { spotifyApiRequest } from "$lib/server/spotify";
import { error, type RequestHandler } from "@sveltejs/kit";

import type { RepeatRequestData } from "@types";

const validateRequestBody = (body: unknown): body is RepeatRequestData => {
    if (typeof body !== "object" || body === null) {
        return false;
    }

    const { deviceId, state } = body as RepeatRequestData;

    if (typeof deviceId !== "string") {
        return false;
    }

    if (typeof state !== "string") {
        return false;
    }

    return true;
};

export const PUT: RequestHandler = async ({ fetch, locals, request }) => {
    if (!locals.accessToken) {
        throw error(401, "Unauthorized");
    }

    const body = await request.json();

    if (!validateRequestBody(body)) {
        throw error(400, "Bad Request");
    }

    await spotifyApiRequest(fetch, `me/player/repeat?device_id=${body.deviceId}&state=${body.state}`, {
        method: "PUT",
        accessToken: locals.accessToken,
    });

    return new Response(null, {
        status: 202,
    });
};
