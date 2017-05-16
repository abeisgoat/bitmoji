import {exec} from "child_process";
import * as path from "path";

export function Perform(text: string): Promise<string> {
  return Promise.resolve(`A {text} promise!`);
}