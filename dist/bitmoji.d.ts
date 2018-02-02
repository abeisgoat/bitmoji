/// <reference types="node" />
import { Imoji, Templates } from "./bitmoji.types";
import { format } from "util";
export declare type CharacterID = string;
export declare function isBitmojiIDWeaklyValid(id: CharacterID): Promise<boolean>;
export declare function isBitmojiIDStronglyValid(id: CharacterID): Promise<boolean>;
export declare const GetImojiURLFromTemplate: typeof format;
export declare function GetTemplates(): Promise<Templates>;
export declare class ImojiSearch {
    private templates;
    private index;
    Init(): Promise<void>;
    FindTemplates(text: string, flag?: string): Imoji[];
    FindURLs(text: string, character_ids: CharacterID[]): any[];
}
