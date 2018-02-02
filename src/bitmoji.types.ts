export interface Templates {
  imoji: Imoji[];
  friends: Friend[];
  packs: any[];
  outfits: Outfits;
  announcers: Announcers;
  experiments: Experiments;
  tag_tiles: Tagtile[];
  search_terms: Searchterm[];
  etag: string;
}

export interface Searchterm {
  term: string;
}

export interface Tagtile {
  name: string;
  color: string;
}

export interface Experiments {
  default_tab: string;
  settings_button_container: number;
}

export interface Announcers {
  fashion_announcer: Fashionannouncer;
}

export interface Fashionannouncer {
  id: number;
  enabled: boolean;
  link: string;
}

export interface Outfits {
  version: number;
  male: Male;
  female: Male;
}

export interface Male {
  brands: Brand[];
  showcase: Showcase[];
  fitting_room_template_id: string;
}

export interface Showcase {
  image: string;
}

export interface Brand {
  id: number;
  name: string;
  logo: string;
  header_background: string;
  store_background: string;
  bg_color: string;
  fg_color: string;
  theme: string;
  visible_in_snapchat: boolean;
  outfits: Outfit[];
}

export interface Outfit {
  id: number;
  outfit: string;
  has_custom_head: boolean;
  sublogo: string;
  description: string;
  image: string;
}

export interface Friend {
  template_id: string;
  comic_id: string;
  src: string;
  supertags: string[];
  tags: string[];
  categories: string[];
  schedulable_id: string;
}

export interface Imoji {
  template_id: string;
  comic_id: string;
  src: string;
  supertags: string[];
  tags: string[];
  categories: string[];
  schedulable_id: string;
}
