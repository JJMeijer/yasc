import { putSpotifyRequest } from "$lib/server/spotify";
import { error, type RequestHandler } from "@sveltejs/kit";

import type { ShuffleRequestData } from "@types";

const validateRequestBody = (body: unknown): body is ShuffleRequestData => {
    if (typeof body !== "object" || body === null) {
        return false;
    }

    const { deviceId, state } = body as ShuffleRequestData;

    if (typeof deviceId !== "string") {
        return false;
    }

    if (typeof state !== "boolean") {
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

    await putSpotifyRequest(
        fetch,
        locals.accessToken,
        `me/player/shuffle?device_id=${body.deviceId}&state=${body.state}`,
        {},
    );

    return new Response(null, {
        status: 202,
    });
};
