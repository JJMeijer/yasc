import { log } from "$lib/server/utility";
import { error, type RequestHandler } from "@sveltejs/kit";

interface PlayRequestData {
    deviceId: string;
    contextUri?: string;
    offset?: string;
    uris?: string[];
}

interface spotifyPlayRequestPayload {
    context_uri?: string;
    offset?: {
        uri: string;
    };
    uris?: string[];
    position_ms?: number;
}

const validateRequestBody = (body: unknown): body is PlayRequestData => {
    console.log(body);
    if (typeof body !== "object" || body === null) {
        return false;
    }

    const { deviceId, contextUri, offset, uris } = body as PlayRequestData;

    if (typeof deviceId !== "string") {
        return false;
    }

    if (contextUri && typeof contextUri !== "string") {
        return false;
    }

    if (offset && typeof offset !== "string") {
        return false;
    }

    if (uris && (!Array.isArray(uris) || uris.some((uri) => typeof uri !== "string"))) {
        return false;
    }

    // if URIs are specified, contextUri & offset should not be
    if ((contextUri || offset) && uris) {
        return false;
    }

    // if contextUri contains artist, the offset should not be specified
    if (contextUri && contextUri.includes("artist") && offset) {
        return false;
    }

    return true;
};

export const PUT: RequestHandler = async ({ fetch, request, locals }) => {
    if (!locals.accessToken) {
        throw error(401, "Unauthorized");
    }

    const body = await request.json();

    if (!validateRequestBody(body)) {
        throw error(400, "Bad Request");
    }

    const payload: spotifyPlayRequestPayload = {
        position_ms: 0,
    };

    if (body.contextUri) {
        payload.context_uri = body.contextUri;

        if (body.offset) {
            payload.offset = {
                uri: body.offset,
            };
        }
    }

    if (body.uris) {
        payload.uris = body.uris;
    }

    const res = await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${body.deviceId}`, {
        method: "PUT",
        body: JSON.stringify(payload),
        headers: {
            Authorization: `Bearer ${locals.accessToken}`,
            "Content-Type": "application/json",
        },
    });

    if (!res.ok) {
        log("error", "Failed to play track", res.status, res.statusText);
        throw error(500, "Internal Server Error");
    }

    return new Response(null, {
        status: 204,
    });
};
