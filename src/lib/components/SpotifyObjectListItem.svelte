<script lang="ts">
    import { getImageBySize, resolveSpotifyUri } from "$lib/utility";
    import ObjectListItem from "./ObjectListItem.svelte";

    export let uri: string;
    export let images: SpotifyApi.ImageObject[];
    export let label: string;
    export let subLabel: string = "";
</script>

<ObjectListItem uri={resolveSpotifyUri(uri)} imageSrc={getImageBySize(images, 300)} label={label} subLabel={subLabel} />
