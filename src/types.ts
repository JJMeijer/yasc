export interface SpotifyAuthCodeResponse {
    access_token: string;
    token_type: string;
    scope: string;
    expires_in: number;
    refresh_token: string;
}

export interface SpotifyAuthRefreshResponse {
    access_token: string;
    token_type: string;
    scope: string;
    expires_in: number;
}

export interface ImageObject {
    height: number;
    url: string;
    width: number;
}

export interface SpotifyUser {
    id: string;
    display_name: string;
    images: ImageObject[];
}

export interface CustomCategoryObject extends SpotifyApi.CategoryObject {
    uri: string;
    images: SpotifyApi.ImageObject[];
}

export interface RepeatRequestData {
    deviceId: string;
    state: SpotifyApi.PlaybackObject["repeat_state"];
}

export interface ShuffleRequestData {
    deviceId: string;
    state: boolean;
}

export interface SpotifyRequestOptions {
    method: "GET" | "PUT" | "POST" | "DELETE";
    accessToken: string;
    body?: Record<string, unknown>;
    fetchAll?: boolean;
}

export interface CreatePlaylistData {
    name: string;
    description: string;
    uris: string[];
}

export interface AppendPlaylistData {
    playlistId: string;
    uris: string[];
}
