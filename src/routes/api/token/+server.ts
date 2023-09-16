import { TOKENS_COOKIE, TOKENS_DIVIDER } from "@constants";
import { error, json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = ({ cookies }) => {
    const tokens = cookies.get(TOKENS_COOKIE);

    if (!tokens) {
        throw error(401, "Unauthorized");
    }

    const [accessToken] = tokens.split(TOKENS_DIVIDER);

    if (!accessToken) {
        throw error(500, "Internal Server Error");
    }

    return json({ accessToken });
};
