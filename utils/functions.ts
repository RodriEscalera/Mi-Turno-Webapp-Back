import fs from "fs";
interface func {
  (err?: any, html?: any): void;
}

export function readHTMLFile(path: string, callback: func) {
  fs.readFile(path, { encoding: "utf-8" }, function (err, html) {
    if (err) {
      callback(err);
    } else {
      callback(null, html);
    }
  });
}

export function countWordOccurrences(
  arr: string[] | any
): { [key: string]: number }[] {
  const count: { [key: string]: number } = {};
  arr.forEach((word: string) => {
    if (count[word]) {
      count[word]++;
    } else {
      count[word] = 1;
    }
  });
  const result: { [key: string]: number }[] = [];
  for (const word in count) {
    result.push({ [word]: count[word] });
  }
  return result;
}
