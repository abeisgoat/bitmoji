/// <reference types="node" />
import { Imoji, Templates } from "./bitmoji.types";
import { format } from "util";
export declare type CharacterID = string;
export declare function isBitmojiIDWeaklyValid(id: CharacterID): Promise<boolean>;
export declare function isBitmojiIDStronglyValid(id: CharacterID): Promise<boolean>;
export declare const GetImojiURLFromTemplate: typeof format;
export declare class ImojiSearch {
    api: {
        host: string;
        paths: {
            templates: string;
        };
    };
    private templates;
    private index;
    Init(host?: string): Promise<void>;
    GetTemplates(): Promise<Templates>;
    FindTemplates(text: string, flag?: string): Imoji[];
    FindURLs(text: string, character_ids: CharacterID[]): string[];
}
