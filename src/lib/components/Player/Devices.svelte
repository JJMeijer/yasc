<script lang="ts">
    import { Icon } from "$lib/components";
    import { playbackDevice, playerReady } from "$lib/stores";

    let open = false;
    let element: HTMLDivElement;

    /**
     * This whole logic is pretty 'loose'. our 'activeDeviceId' in the store
     * is not that tightly coupled with the actual active device in Spotify.
     *
     * this will probably turn out to be a problem in the future.
     */
    const updateDevices = async () => {
        const res = await fetch("/api/devices", {
            method: "GET",
        });

        const data = await res.json();

        const activeDevice = data.devices.find((device: SpotifyApi.UserDevice) => device.is_active);

        if (activeDevice) {
            playbackDevice.update((state) => {
                return {
                    ...state,
                    devices: data.devices,
                    activeDeviceId: activeDevice.id,
                }
            });

            return;
        }

        if ($playerReady.device_id === $playbackDevice.activeDeviceId) {
            return;
        }

        await fetch("/api/devices", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                device_ids: [$playerReady.device_id],
                play: false,
            }),
        });

        playbackDevice.update((state) => {
            return {
                ...state,
                devices: data.devices,
                activeDeviceId: $playerReady.device_id,
            }
        });
    };

    playerReady.subscribe((state) => {
        if (state.device_id) {
            updateDevices();
        }
    });

    const handleClickOutside = (event: MouseEvent) => {
        if (!element.contains(event.target as Node)) {
            open = false;
            document.removeEventListener("click", handleClickOutside);
        }
    };

    const onDevicesIconClick = () => {
        if (!open) {
            updateDevices();
            document.addEventListener("click", handleClickOutside);
        } else {
            document.removeEventListener("click", handleClickOutside);
        }
        open = !open;
    };

    const onDeviceClick = (deviceId: string) => {
        if (!deviceId) {
            return;
        }

        fetch("/api/devices", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                device_ids: [deviceId],
                play: true,
            }),
        });

        playbackDevice.update((state) => {
            return {
                ...state,
                activeDeviceId: deviceId,
            }
        });

        open = false;
    };
</script>

<div class="relative" bind:this={element}>
    <Icon onClick={onDevicesIconClick} name="devices" class="w-6 h-6 text-gray-400 cursor-pointer hover:text-primary" />
    {#if open}
        <div class="absolute border border-gray-800/50 bg-gray-900 bottom-[130%] -translate-x-28 w-56 flex flex-col rounded-md shadow-md pb-2">
            <p class="text-center text-gray-400 border-b border-gray-700 flex items-center py-2 justify-center">Devices</p>
            <div class="flex flex-col">
                {#each $playbackDevice.devices as device}
                    <button on:click={() => onDeviceClick(device.id || "")} class="py-2 px-4 text-left hover:bg-gray-800 {device.id === $playbackDevice.activeDeviceId ? "text-primary/90" : "text-gray-400"}">{device.name}</button>
                {/each}
            </div>
        </div>
    {/if}
</div>
