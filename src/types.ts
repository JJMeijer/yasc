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

interface BaseSpotifyRequestOptions {
    accessToken: string;
}

interface SpotifyRequestOptionsGET extends BaseSpotifyRequestOptions {
    method: "GET";
    fetchAll?: boolean;
    cache?: boolean;
    cacheTime?: number;
}

interface SpotifyRequestOptionsPUT extends BaseSpotifyRequestOptions {
    method: "PUT";
    body?: Record<string, unknown>;
}

interface SpotifyRequestOptionsPOST extends BaseSpotifyRequestOptions {
    method: "POST";
    body?: Record<string, unknown>;
}

interface SpotifyRequestOptionsDELETE extends BaseSpotifyRequestOptions {
    method: "DELETE";
    body?: Record<string, unknown>;
}

export type SpotifyRequestOptions =
    | SpotifyRequestOptionsGET
    | SpotifyRequestOptionsPUT
    | SpotifyRequestOptionsPOST
    | SpotifyRequestOptionsDELETE;

export interface CreatePlaylistData {
    name: string;
    description: string;
    uris: string[];
}

export interface AppendPlaylistData {
    playlistId: string;
    uris: string[];
}

export interface DeletePlaylistData {
    playlistId: string;
    snapshotId: string;
    uris: string[];
}
