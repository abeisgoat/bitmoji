import { expect } from "chai";
import * as pkg from "../src/bitmoji";
import {ImojiSearch} from "../src/bitmoji";

describe("package", () => {
    describe("new ImojiSearch()", () => {
        describe("FindTemplates()", () => {
            it("should return ten matches for a common phrase", async () => {
                const im = new pkg.ImojiSearch();
                await im.Init();
                const matches = im.FindTemplates("happy birthday");
                expect(matches.length).equal(10);
            });

            it("should filter to 'single' flags", async () => {
                const im = new pkg.ImojiSearch();
                await im.Init();
                const matches = im.FindTemplates("happy birthday", "single");
                expect(matches[0].src.split("%s").length).equal(2);
            });

            it("should filter to 'double' flags", async () => {
                const im = new pkg.ImojiSearch();
                await im.Init();
                const matches = im.FindTemplates("sweet", "double");
                console.log(matches[0]);
                expect(matches[0].src.split("%s").length).equal(3);
            });
        });
    });

    describe("isBitmojiIDWeaklyValid()", () => {
        it("should return false for obviously invalid ID", async () => {
            const valid = await pkg.isBitmojiIDWeaklyValid("100");
            expect(valid).equal(false);
        });

        it("should return true for convincing invalid ID", async () => {
            const valid = await pkg.isBitmojiIDWeaklyValid("100_33-s2");
            expect(valid).equal(true);
        });

        it("should return true for valid ID", async () => {
            const valid = await pkg.isBitmojiIDWeaklyValid("390145812_5-s1");
            expect(valid).equal(true);
        });
    });

    describe("isBitmojiIDStronglyValid()", () => {
        it("should return false for obviously invalid ID", async () => {
            const valid = await pkg.isBitmojiIDStronglyValid("100");
            expect(valid).equal(false);
        });

        it("should return false for convincing invalid ID", async () => {
            const valid = await pkg.isBitmojiIDStronglyValid("100_33-s2");
            expect(valid).equal(false);
        });

        it("should return true for valid ID", async () => {
            const valid = await pkg.isBitmojiIDStronglyValid("390145812_5-s1");
            expect(valid).equal(true);
        });
    });
});
