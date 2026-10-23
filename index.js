import chalk from "chalk"; //makes colors available
import { randomInt } from "crypto";
import prompts from "prompts";
import fs from "fs";

const MAX_NUMBER = 10;
const secretNumber = randomInt(1,11);  //generates a random number and no need to import it
const MAX_ATTEMPTS = 3; //so it doesnt repeat

const gameLog = [];

function logMessage(message){
    console.log(message);

    const cleanMessage = message.replace(/\u001b\[[0-9;]*m/g, "");
    gameLog.push(cleanMessage);
}

console.log(    //prints anyting :console.log
    //// makes message any color u want: chalk//          
    chalk.magenta( `          
        ------------------------------
               !Guess the Number!
        ------------------------------
        Guess a number between 1-10.
        You have 3 attempts! 
        ------------------------------
    `)
);

const response = await prompts({
    type: "number",
    name: "guess",
    message: "Guess a number between 1 and 10: "
});

const guess = response.guess;

if (guess === secretNumber){
    console.log(
        chalk.green("You guessed the right number!!!")
    );
}
else if (guess < secretNumber){
    console.log(
        chalk.yellow("Too low!")
    );
}
else {
    console.log(
        chalk.red("Too high!")
    );
}
