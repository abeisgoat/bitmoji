"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fetch = require("isomorphic-fetch");
const util_1 = require("util");
function isBitmojiIDWeaklyValid(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return id.split("_").length >= 2 && id.split("-").length == 2;
    });
}
exports.isBitmojiIDWeaklyValid = isBitmojiIDWeaklyValid;
function isBitmojiIDStronglyValid(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const template = "https://render.bitstrips.com/v2/cpanel/9988738-%s-v1.png";
        const url = exports.GetImojiURLFromTemplate(template, id);
        const response = yield fetch(url);
        return response.status == 200;
    });
}
exports.isBitmojiIDStronglyValid = isBitmojiIDStronglyValid;
exports.GetImojiURLFromTemplate = util_1.format;
class Index {
    constructor() {
        this.most_words_in_tag = 0;
        // private shortest_word = Infinity;
        this.tree = {};
    }
    add(data, tags, flags) {
        tags.forEach(tag => {
            const words = tag.split(" ");
            this.most_words_in_tag = Math.max(this.most_words_in_tag, words.length);
            // words.forEach((word) => {
            //     this.shortest_word = Math.min(
            //         this.shortest_word, word.length);
            // });
            if (!this.tree[tag])
                this.tree[tag] = [];
            this.tree[tag].push({
                flags,
                data
            });
        });
    }
    find(text, flag, limit) {
        if (!limit)
            limit = 10;
        const results = [];
        let number_of_words_considered = Math.min(this.most_words_in_tag, text.split(" ").length);
        while (results.length < limit && number_of_words_considered > 0) {
            const relevant_text = text
                .split(" ")
                .slice(-number_of_words_considered)
                .join(" ");
            const matches = this.tree[relevant_text];
            if (matches) {
                matches.forEach(match => {
                    let flagMatch = true;
                    if (flag)
                        flagMatch = match.flags.indexOf(flag) >= 0;
                    if (!flagMatch)
                        return;
                    results.push(match.data);
                });
            }
            number_of_words_considered--;
        }
        return results.slice(0, limit);
    }
}
class ImojiSearch {
    constructor() {
        this.api = {
            host: "https://api.bitmoji.com",
            paths: {
                templates: "/content/templates?app_name=bitmoji"
            }
        };
    }
    Init(host) {
        return __awaiter(this, void 0, void 0, function* () {
            this.api.host = host || this.api.host;
            this.templates = yield this.GetTemplates();
            this.index = new Index();
            this.templates.imoji.forEach(imoji => {
                this.index.add(imoji, imoji.tags, ["single"]);
            });
            this.templates.friends.forEach(imoji => {
                this.index.add(imoji, imoji.tags, ["double"]);
            });
        });
    }
    GetTemplates() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${this.api.host}${this.api.paths.templates}`;
            const response = yield fetch(url);
            return (yield response.json());
        });
    }
    FindTemplates(text, flag) {
        return this.index.find(text, flag);
    }
    FindURLs(text, character_ids) {
        let flag;
        if (character_ids.length == 1) {
            flag = "single";
        }
        else {
            flag = "double";
        }
        return this.index.find(text, flag).map(match => {
            let args = [match.src];
            args = args.concat(character_ids);
            return exports.GetImojiURLFromTemplate.apply(undefined, args);
        });
    }
}
exports.ImojiSearch = ImojiSearch;
//# sourceMappingURL=bitmoji.js.map