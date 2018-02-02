import * as fetch from "isomorphic-fetch";
import {Imoji, Templates} from "./types";
import { format } from "util";

const API_HOST = "https://api.bitmoji.com";
const API_PATHS = {
  templates: "/content/templates?app_name=bitmoji"
};

type CharacterID = string;

export async function isBitmojiIDWeaklyValid(id: CharacterID) {
    return id.split("_").length >= 2 && id.split("-").length == 2;
}

export async function isBitmojiIDStronglyValid(id: CharacterID) {
  const template = "https://render.bitstrips.com/v2/cpanel/9988738-%s-v1.png";
  const url = GetImojiURLFromTemplate(template, id);
  const response = await fetch(url);

  return response.status == 200;
}

export const GetImojiURLFromTemplate = format;

export async function GetTemplates() {
  const url = `${API_HOST}${API_PATHS.templates}`;
  const response = await fetch(url);
  return await response.json() as Templates;
}

class Index<T> {
  private most_words_in_tag = 0;
  private tree: {[s: string]: T[]} = {};

  add(data: T, tags: string[]) {
    tags.forEach((tag) => {
        this.most_words_in_tag = Math.max(this.most_words_in_tag, tag.split(" ").length);

        if (!this.tree[tag]) this.tree[tag] = [];

        this.tree[tag].push(data);
    });
  }

  find(text: string, limit?: number) {
    if (!limit) limit = 10;

    const results: T[] = [];
    let number_of_words_considered = Math.min(this.most_words_in_tag, text.split(" ").length);

    while (results.length < limit && number_of_words_considered > 0) {
        const relevant_text = text.split(" ").slice(-number_of_words_considered).join(" ");
        const matches = this.tree[relevant_text] || [];
        matches.forEach((match) => {
          results.push(match);
        });
        number_of_words_considered--;
    }

    return results.slice(0, limit);
  }
}

export class ImojiSearch {
  templates: Templates;
  index: Index<Imoji>;

  async Init() {
    this.templates = await GetTemplates();
    this.index = new Index();
;
    this.templates.imoji.forEach((imoji) => {
      this.index.add(imoji, imoji.tags);
    });
  }

  FindTemplates(text: string) {
    // TODO: Add ability to filter single / multi person Imoji
    return this.index.find(text);
  }
}