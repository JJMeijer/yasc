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
