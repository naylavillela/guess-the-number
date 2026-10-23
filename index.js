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

for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++){
    try{
        const response = await prompts({
            type: "text",
            name: "guess",
            message: `Attempt ${attempt}/${MAX_ATTEMPTS}: Enter your guess...`
        });
        
        const input = response.guess;

        if (input.trim() === ""){
            throw new Error("You have to enter a number.");
        }

        const guess = Number(input);

        if (!Number.isInteger(guess)){
            throw new Error("Your number has to be a whole number.");
        }

        if(guess <= 0){
            throw new Error("Number needs to be greater than zero.");
        }

        if (guess > MAX_NUMBER){
            throw new Error(`Number needs to be between 1 and ${MAX_NUMBER}.`);
        }

        if (guess == secretNumber){
            logMessage(
                chalk.green(
                    `YOU WON!!! You guessed ${secretNumber}!`
                )
            );

            fs.writeFileSync("game-log.txt", gameLog.join("\n"));
            process.exit();
        }

        if (guess < secretNumber){
            logMessage(chalk.yellow("Too low!!!"));
        }
        else{
            logMessage(chalk.yellow("Too high!!!"));
        }
    }
    catch(error){
        logMessage(chalk.red(`Error: ${error.message}`));
        attempt--;
    }
}

logMessage(
    chalk.red(
        `GAME OVER!!! 
        The secret number was ${secretNumber}.`
    )
);

fs.writeFileSync("game-log.txt", gameLog.join("\n"));

logMessage(chalk.blue("Game log saveed."));


