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
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`;
		 }
 
	  }
	}
	return letterPoints;
}
// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   let alphabet = /^[a-zA-Z]+$/;
   console.log("Let's play some scrabble!");
   let word = input.question("Enter a word to score: ");
   while(!alphabet.test(word)){
      word = input.question("Enter a word to score: ");
   }
   
   return word;
};

let newPointStructure = transform(oldPointStructure);

let simpleScorer = (word) => {
   return word.length;
}

let vowelBonusScorer = (word) => {
   word = word.toUpperCase();
   let vowels = ["A","E","I","O","U","Y"];
   let consonants = ["B","C","D","F","G","H","J","K","L","M","N","P","Q","R","S","T","V","W","X","Z"];
   let score = 0;
   for (let i = 0; i < word.length; i++) {
      if(vowels.includes(word[i])){
         score+=3;
      }
      else if(consonants.includes(word[i])){
         score++;
      }
   }
   return score;
}

let scrabbleScorer = (word) => {
   word = word.toLowerCase();
   let letterPoints = 0;
   for (let i = 0; i < word.length; i++) {
      letterPoints+=newPointStructure[word[i]];
   }
   return letterPoints;
}

const scoringAlgorithms = [
   {
      name:"Simple Score",
      description:"Each letter is worth 1 point.",
      scorerFunction:simpleScorer
   },
   {
      name:"Bonus Vowels",
      description:"Vowels are 3 pts, consonants are 1 pt.",
      scorerFunction:vowelBonusScorer
   },
   {
      name:"Scrabble",
      description:"The traditional scoring algoirthm.",
      scorerFunction:scrabbleScorer
   }
];

function scorerPrompt() {
   let menuChoice = -1;
   let validChoice = false;
   console.log(`
Which scoring algorithm would you like to use?

0 - ${scoringAlgorithms[0].name}: ${scoringAlgorithms[0].description}
1 - ${scoringAlgorithms[1].name}: ${scoringAlgorithms[1].description}
2 - ${scoringAlgorithms[2].name}: ${scoringAlgorithms[2].description}
`);
   while(!validChoice){
      menuChoice = Number(input.question("Enter 0, 1, or 2: "));
      if(menuChoice > 0 && menuChoice < 2){
         validChoice = true;
      }
   }
   return scoringAlgorithms[menuChoice];
}

function transform(oldPointStructure) {
   let newPointStructure = {' ':0};
   for (const key in oldPointStructure) {
      oldPointStructure[key].forEach(letter => {
         newPointStructure[letter.toLowerCase()] = Number(key);
      });
   }
   return newPointStructure;
};

function runProgram() {
   let word = initialPrompt();
   let scorer = scorerPrompt();
   console.log(`Score for '${word}':${scorer.scorerFunction(word)}`);
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
