interface YtLink {
  '@_rel'?: string;
  '@_href'?: string;
}

interface YtEntry {
  id: string;                  // "yt:video:VIDEO_ID"
  'yt:videoId': string;
  'yt:channelId': string;
  title: string;
  link: YtLink;
  author?: { name: string; uri: string };
  published: string;           // ISO 8601
  updated: string;             // ISO 8601
}

interface YtDeletedEntry {
  '@_ref': string;             // "yt:video:VIDEO_ID"
  '@_when': string;
  link?: YtLink;
  'at:by'?: { name: string; uri: string };
}

interface YtFeed {
  title?: string;
  updated?: string;
  link?: YtLink;
  entry?: YtEntry;
  'at:deleted-entry'?: YtDeletedEntry;
}
