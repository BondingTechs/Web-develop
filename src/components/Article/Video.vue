<script lang="ts" setup>
import YouTube from 'vue3-youtube'

const youtube: any = ref(null)
const onReady = () => {
  if (youtube.value)
    youtube.value.playVideo()
}
</script>

<template>
  <YouTube
    ref="youtube"
    src="https://youtu.be/jNQXAC9IVRw"
    @ready="onReady"
  />
</template>
