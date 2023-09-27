<script lang="ts">
    import Icon from "./Icon.svelte";

    export let trackId: string;
    export let liked: boolean = false;

    let iconOnClickClass = "";

    const likeClickAnimation = () => {
        iconOnClickClass = "scale-125";
        setTimeout(() => {
            iconOnClickClass = "";
        }, 200);
    };

    const onLikeClick = async () => {
        likeClickAnimation();
        const res = await fetch(`/api/likes?ids=${trackId}`, {
            method: liked ? "DELETE" : "PUT",
        });

        if (res.ok) {
            liked = !liked;
        }
    };
</script>

<Icon
    title={liked ? "Unlike" : "Like"}
    onClick={onLikeClick}
    name="like"
    class="w-6 h-6 {iconOnClickClass} transition-transform ease-in-out duration-200 {liked
        ? 'fill-primary/80 text-primary/80 hover:fill-transparent'
        : 'text-gray-800 hover:text-primary/90'}"
/>
