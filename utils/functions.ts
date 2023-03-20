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
