import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";
import { log } from "./logger";
/**
 * Read the CSV file and return the data as an array of objects
 * @param filePath 
 * @returns Array of objects
 */

//make the above code as resuable function
function readCSV(filePath: string): any[] {
  //read the file
  const csvDataString = fs.readFileSync(filePath, { encoding: "utf-8" });

  //parse the csv data into array of data(install csv-parse)
  const csvDataArray = parse(csvDataString, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  });

  return csvDataArray;
}

/**
 * Reads file and returns its content as a string, for JSON, parse it before using
 */
function readFile(filePath: string): any {
  if(!fs.existsSync(filePath)){
    throw new Error(`File not found at path: ${filePath}`);
  }
  log("info", `Reading file from path: ${filePath}`);
  const data = fs.readFileSync(filePath, { encoding: "utf-8" });
  return data;
}

/**
 * Writes to target file. If the target is JSON, stringify data before writing
 * @param filePath fullpath incl extn of file
 * @param data
 */
function writeFile(filePath: string, data: any): void {
  try{
      log("info", `Writing file to path: ${filePath}`);
      fs.writeFileSync(filePath, data);
  }catch(err){
    new Error(`Error writing file to path: ${filePath}. Error: ${err}`);
  }
}

export default {readCSV, readFile, writeFile};