import { env } from "cloudflare:workers";
import { YoutubeProfile, YoutubeVideo } from "./types";

export async function getVideoByExtID(ext_id: string) {
  return env.DB.prepare("SELECT * FROM youtube_videos WHERE ext_id = ?")
    .bind(ext_id)
    .first<YoutubeVideo>();
}

export async function setPublicVideo(id: number, is_public: boolean) {
  return env.DB.prepare(
    "UPDATE youtube_videos SET is_public = ? WHERE id = ? RETURNING *"
  )
    .bind(is_public ? 1 : 0, id)
    .first<YoutubeVideo>();
}

export async function createVideo(ext_id: string, author: string, title: string,
  opts: { description?: string; is_public?: boolean } = {}) {
  return env.DB.prepare("INSERT INTO youtube_videos (ext_id, author, title, description, is_public) VALUES (?, ?, ?, ?, ?) RETURNING *")
    .bind(ext_id, author, title, opts.description ?? null, opts.is_public ? 1 : 0)
    .first<YoutubeVideo>();
}

export async function getProfileByExtID(ext_id: string) {
  return env.DB.prepare("SELECT * FROM youtube_profiles WHERE ext_id = ?")
    .bind(ext_id)
    .first<YoutubeProfile>();
}
