import { timingSafeEqual } from "node:crypto";
import { createVideo, getProfileByExtID, getVideoByExtID, setPublicVideo } from "./db/youtubehook";

export async function verifyHmac(body: string, header: string, secret: string) {
  if (!header.startsWith('sha1=')) return false;
  const key = await crypto.subtle.importKey(
    'raw', new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-1' }, false, ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(body));
  const expected = 'sha1=' + [...new Uint8Array(sig)]
    .map(b => b.toString(16).padStart(2, '0')).join('');

  if (expected.length !== header.length) return false;
  return timingSafeEqual(new TextEncoder().encode(expected), new TextEncoder().encode(header));
}

export async function processYoutubeHook(feed: YtFeed) {
  const entry = feed.entry;
  if (!entry) return;
  const videoId = entry["yt:videoId"];
  const video = await getVideoByExtID(videoId);
  if (video) {
    if (!video.is_public) {
      setPublicVideo(video.id, true);
    }
    return;
  }
  const channelId = entry["yt:channelId"];
  const channel = await getProfileByExtID(channelId);
  if (!channel) {
    console.error("wtf: channel isnt exist (processYoutubeHook)");
    return;
  }
  await createVideo(entry.link["@_href"]!, channel.code, entry.title, { is_public: true })
}
