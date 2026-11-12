export interface YoutubeProfile {
  code: string;
  ext_id: string;
  name: string;
}

export interface YoutubeVideo {
  id: number;
  ext_id: string;
  author: string;
  title: string;
  description: string | null;
  is_public: number; // bool
}
