// src/services/csv.service.ts
const csv = require("csv-parser");
const fs = require("fs");

export function processCSVFile(filePath: string): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row: any) => {
        results.push(row);
      })
      .on("end", () => {
        resolve(results);
      })
      .on("error", (error: Error) => {
        reject(error);
      });
  });
}
