<script lang="ts">
    import Icon from "./Icon.svelte";

    export let itemId: string;
    export let liked: boolean = false;
    export let type: "tracks" | "episodes" | "shows" | "albums" | "playlists";
    export let hideByDefault: boolean = false;

    $: isPlaylist = type === "playlists";
    $: verb = liked ? (isPlaylist ? "Unfollow" : "Unlike") : isPlaylist ? "Follow" : "Like";

    let iconOnClickClass = "";

    const likeClickAnimation = () => {
        iconOnClickClass = "scale-125";
        setTimeout(() => {
            iconOnClickClass = "";
        }, 200);
    };

    const onLikeClick = async () => {
        likeClickAnimation();
        let res: Response;
        if (type !== "playlists") {
            res = await fetch(`/api/likes?ids=${itemId}&type=${type}`, { method: liked ? "DELETE" : "PUT" });
        } else {
            res = await fetch(`/api/playlist/followers?playlistId=${itemId}`, { method: liked ? "DELETE" : "PUT" });
        }

        if (res.ok) {
            liked = !liked;
        }
    };
</script>

<Icon
    title={verb}
    onClick={onLikeClick}
    name="like"
    class="h-6 w-6 {iconOnClickClass} transition-transform duration-200 ease-in-out {liked
        ? 'fill-primary/80 text-primary/80 hover:fill-transparent'
        : hideByDefault
          ? 'text-gray-700 opacity-0 group-hover:opacity-100 hover:text-primary/90'
          : 'text-gray-700 hover:text-primary/90'}"
/>
