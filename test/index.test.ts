import "@types/chai";
import {expect} from "chai";
import * as pkg from "../src/";

describe("package", () => {
  it("should return 'A promise!'", () => {
    return pkg.Perform("simple").then((r) => {
        expect(r).to.equal("A simple promise!");
    });
  });
});
