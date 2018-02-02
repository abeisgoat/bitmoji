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

interface Searchterm {
  term: string;
}

interface Tagtile {
  name: string;
  color: string;
}

interface Experiments {
  default_tab: string;
  settings_button_container: number;
}

interface Announcers {
  fashion_announcer: Fashionannouncer;
}

interface Fashionannouncer {
  id: number;
  enabled: boolean;
  link: string;
}

interface Outfits {
  version: number;
  male: Male;
  female: Male;
}

interface Male {
  brands: Brand[];
  showcase: Showcase[];
  fitting_room_template_id: string;
}

interface Showcase {
  image: string;
}

interface Brand {
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

interface Outfit {
  id: number;
  outfit: string;
  has_custom_head: boolean;
  sublogo: string;
  description: string;
  image: string;
}

interface Friend {
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
