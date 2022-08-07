---
layout: post
title: "How to Fix Plex Transcoding"
---

Plex has a feature that allows it to transcode (basically, convert) videos to make them smaller, or to change the file
type. Sometimes, this is necessary. Chromecast in particular is limited in what it can stream, so Plex has to convert
everything else on the fly for it to work.

However, by default most Plex clients will transcode for _all_ playback over the internet. This results in
pixelated videos, and increased load on the server. In many cases, this just isn't necessary but unfortunately the only
way to fix this is for each client to fix their settings.

<!--more-->

Below are screenshots and step by step instructions on how to do so.

Device Types:

- [Plex Web / Plex Desktop](#plexweb)
- [Plex Android / iOS](#plexmobile)
- [Plex for Smart TV](#plextv) (Samsung, Android, Fire TV, Roku TV)
- [Plex for Apple TV](#plexappletv)
- [Plex Media Player](#plexmediaplayer) (PMP)

### <a class="anchor" id="plexweb" /> Plex Web / Plex Desktop

1. Open up Plex, and start playing a video
2. Pause the video, and click on the settings button (highlighed in red below)
   [![Screenshot showing the settings button](/assets/img/post/plex-transcode/plex-web-1.png){.img-fluid}](/assets/img/post/plex-transcode/plex-web-1.png){target="\_blank"}
3. Next to `Quality`, click the quality name and make sure `Play Original Quality` is ticked
   [![Screenshot showing the quality setting](/assets/img/post/plex-transcode/plex-web-2.png){.img-fluid}](/assets/img/post/plex-transcode/plex-web-2.png){target="\_blank"}
4. If you don't see `Play Original Quality`, your device can't support original playback on this video, check with
   another video

### <a class="anchor" id="plexmobile" /> Plex Android / iOS

1. Open up Plex, and start playing a video
2. Pause the video, and click on the `...` button (highlighed in red below)
   [![Screenshot showing the ... button](/assets/img/post/plex-transcode/plex-android-1.png){.img-fluid}](/assets/img/post/plex-transcode/plex-android-1.png){target="\_blank"}
3. Pick `Playback Settings`
4. Next to `Quality`, click the quality name and make sure `Play Original Quality` is ticked
   [![Screenshot showing the quality setting](/assets/img/post/plex-transcode/plex-android-2.png){.img-fluid}](/assets/img/post/plex-transcode/plex-android-2.png){target="\_blank"}
5. If you don't see `Play Original Quality`, your device can't support original playback on this video, check with
   another video

### <a class="anchor" id="plextv" /> Plex for Smart TV

1. Open up Plex, and start playing a video
2. Pause the video, and click on the `...` button
3. Pick `Video Quality`
4. Ensure that `Original` is ticked
5. If you don't see `Play Original Quality`, your device can't support original playback on this video, check with
   another video

### <a class="anchor" id="plexappletv" /> Plex for Apple TV

TBC

### <a class="anchor" id="plexmediaplayer" /> Plex Media Player

1. Open up Plex, and start playing a video
2. Pause the video, and click on the settings (<span class="fa fa-sliders" aria-hidden="true"></span>) button
   [![Screenshot showing the settings button](/assets/img/post/plex-transcode/pmp-1.png){.img-fluid}](/assets/img/post/plex-transcode/pmp-1.png){target="\_blank"}
3. Pick `Quality`
4. Ensure that `Play Original Quality` is selected
   [![Screenshot showing the quality setting](/assets/img/post/plex-transcode/pmp-2.png){.img-fluid}](/assets/img/post/plex-transcode/pmp-2.png){target="\_blank"}
5. If you don't see `Play Original Quality`, your device can't support original playback on this video, check with
   another video
