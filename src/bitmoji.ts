import * as fetch from "isomorphic-fetch";
import { Imoji, Templates } from "./bitmoji.types";
import { format } from "util";

const API_HOST = "https://api.bitmoji.com";
const API_PATHS = {
  templates: "/content/templates?app_name=bitmoji"
};

export type CharacterID = string;

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
  return (await response.json()) as Templates;
}

type TreeBranch<T> = { flags: string[]; data: T };

class Index<T> {
  private most_words_in_tag = 0;
  private tree: { [s: string]: TreeBranch<T>[] } = {};

  add(data: T, tags: string[], flags: string[]) {
    tags.forEach(tag => {
      this.most_words_in_tag = Math.max(
        this.most_words_in_tag,
        tag.split(" ").length
      );

      if (!this.tree[tag]) this.tree[tag] = [];

      this.tree[tag].push({
        flags,
        data
      });
    });
  }

  find(text: string, flag?: string, limit?: number) {
    if (!limit) limit = 10;

    const results: T[] = [];
    let number_of_words_considered = Math.min(
      this.most_words_in_tag,
      text.split(" ").length
    );

    while (results.length < limit && number_of_words_considered > 0) {
      const relevant_text = text
        .split(" ")
        .slice(-number_of_words_considered)
        .join(" ");
      const matches = this.tree[relevant_text];

      if (matches) {
        matches.forEach(match => {
          let flagMatch = true;
          if (flag) flagMatch = match.flags.indexOf(flag) >= 0;
          if (!flagMatch) return;

          results.push(match.data);
        });
        number_of_words_considered--;
      }
    }

    return results.slice(0, limit);
  }
}

export class ImojiSearch {
  private templates: Templates;
  private index: Index<Imoji>;

  async Init() {
    this.templates = await GetTemplates();
    this.index = new Index();
    this.templates.imoji.forEach(imoji => {
      this.index.add(imoji, imoji.tags, ["single"]);
    });

    this.templates.friends.forEach(imoji => {
      this.index.add(imoji, imoji.tags, ["double"]);
    });
  }

  FindTemplates(text: string, flag?: string) {
    return this.index.find(text, flag);
  }

  FindURLs(text: string, character_ids: CharacterID[]) {
    return this.index.find(text, "single").map(match => {
      const args = [match.src];
      args.concat(character_ids);
      return GetImojiURLFromTemplate.apply(undefined, args);
    });
  }
}
