// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   console.log("Let's play some scrabble! \n");
   return input.question("Please enter a word:");
}

let newPointStructure;

//let simpleScorer;
function simpleScorer(word) {
   let score = 0;          //Create variable to store score
   word = word.toUpperCase();    //make word case insensitve
   for (let i = 0; i < word.length; i++) {  //for loop to iterate through each letter of word provided
      score += 1;      //each iteration adds 1 to the score
   }              
   return score;
} 

//let vowelBonusScorer;
function vowelBonusScorer(word) {
   let score = 0;
   const vowels = "AEIOU" //define string of vowels to be used for scoring
   word = word.toUpperCase();    //make word case insensitive
   for (let i = 0; i < word.length; i++) {      //loop to iterate through each letter of word
      if (vowels.includes(word[i])) {     //conditional to see if word[i] exists within the string of vowels
         score += 3;        //if condition evaluates true, it adds 3 to the score
      } else {
         score +=1;         //if condtion evaluates false, it adds 1 to the score
      }
      
   }return score;       //returns total score
}

//let scrabbleScorer;
function scrabbleScorer(word) {
   let letterPoints = 0;
   word = word.toUpperCase();
   for (let i = 0; i < word.length; i++) {
      letterPoints += newPointStructure[word[i].toLowerCase()];
      } 
      return letterPoints;
};

const scoringAlgorithms = [
   {
      name: 'Simple Score',
      description: 'Each character is worth 1 point',
      scorerFunction: simpleScorer
   },
   {
      name: 'Bonus Vowels',
      description: 'Each vowel is worth 3 points',
      scorerFunction: vowelBonusScorer
   },
   {
      name:'Scrabble Scoring',
      description: 'Traditional Scrabble score method',
      scorerFunction: scrabbleScorer
   },
];

console.log(scoringAlgorithms);

function scorerPrompt() {
   console.log("Which scoring system would you like to use? \n");
   for (let i = 0; i < scoringAlgorithms.length; i++) {        
      console.log(`${[i]} - ${scoringAlgorithms[i].name}: ${scoringAlgorithms[i].description}`);
   }
   let userChoice = input.question("\nPlease enter 0, 1, or 2: \n");
   let userChoiceNum = Number(userChoice);
   if(isNaN(userChoiceNum) || userChoiceNum < 0 || userChoiceNum > 2) {    //if the input isn't valid, prompt user to enter again until input is valid
         console.log("Please enter 0, 1 or 2\n");
         return scorerPrompt();
      }
   return scoringAlgorithms[userChoiceNum];
}


function transform(oldPointStructure) {
   let newPointStructure = {}       //empty object to store key/value pairs
   for (const pointValue in oldPointStructure) {
      //console.log(`${pointValue}: ${oldPointStructure[pointValue]}`);
      // what is the key and value of oldpoint structure? key is number, value array of letters
      // how do you get a value from an object? bracket or dot notation
      // how do you iterate over an array? for..of
      for (const letterPoints of oldPointStructure[pointValue]) {
         //console.log(`${pointValue}: ${letter}`);
         newPointStructure[letterPoints.toLowerCase()] = Number(pointValue);  //need to make sure key is lower case and values are numbers, not strings
      }
   }
   return newPointStructure;
}
newPointStructure = transform(oldPointStructure);

function runProgram() {
   const word = initialPrompt();
   const selection = scorerPrompt();
   const score = selection.scoreFunction(word);
   console.log(`Score for '${word}': ${score}`);   //added these const because I couldn't figure out any other way to print the score to the console
   //transform(oldPointStructure);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
