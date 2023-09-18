import { getSpotifyRequest, putSpotifyRequest } from "$lib/server/spotify";
import { error, json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ fetch, locals }) => {
    if (!locals.accessToken) {
        throw error(401, "Unauthorized");
    }

    const devicesResponse = await getSpotifyRequest<SpotifyApi.UserDevicesResponse>(
        fetch,
        locals.accessToken,
        "me/player/devices",
    );

    return json({
        devices: devicesResponse.devices,
    });
};

export const PUT: RequestHandler = async ({ fetch, locals, request }) => {
    if (!locals.accessToken) {
        throw error(401, "Unauthorized");
    }

    const {
        device_ids: [deviceId],
        play,
    } = (await request.json()) as { device_ids: [string]; play: boolean };

    await putSpotifyRequest(fetch, locals.accessToken, "me/player", {
        device_ids: [deviceId],
        play,
    });

    return new Response("OK");
};
