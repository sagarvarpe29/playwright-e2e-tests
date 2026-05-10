import {test} from "@playwright/test";
import chalk from "chalk";

type logLevel = "log" | "info" | "warn" | "error";

export async function log(level: logLevel, message: string) {
    const plainline = `[${level.toUpperCase()}]: ${message}`; // for allure report
    let coloredLine = plainline; // default to plain line

    //pick color based on log level
    switch (level) {
        case "log":
            coloredLine = chalk.white(plainline);
            break;
        case "info":
            coloredLine = chalk.blue(plainline);
            break;
        case "warn":
            coloredLine = chalk.yellow(plainline);
            break;
        case "error":
            coloredLine = chalk.red(plainline);
            break;  
        default:            coloredLine = plainline;    
    }

    //print colored text in console
    (console[level] || console.log)(coloredLine);

    //send plain text to allure report
    await test.step(plainline, async () => {});
}