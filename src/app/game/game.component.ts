import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  vocab = [
    "random",
    "words",
    "guess"
  ];

  answer: string;
  inputText: string;

  guess1: string;
  guess2: string;
  guess3: string;
  guess4: string;
  guess5: string;

  guesses = [];

  guessCount = 0;

  constructor() { }

  ngOnInit(): void {
    this.answer = this.randomVocab();
    this.guesses = [
      {guess: this.guess1, correct: false, letterCheck: []},
      {guess: this.guess2, correct: false, letterCheck: []},
      {guess: this.guess3, correct: false, letterCheck: []},
      {guess: this.guess4, correct: false, letterCheck: []},
      {guess: this.guess5, correct: false, letterCheck: []}
    ]
  }

  randomVocab(): string {
    return this.vocab[0]
  }

  onSubmit(): void {
    if (!this.inputText) {
      alert("please enter guess");
      return
    }

    this.guesses[this.guessCount].guess = this.inputText;

    if (this.guesses[this.guessCount].guess === this.answer) {
      alert('You got it!');
      this.guesses[this.guessCount].correct = true;
    } else {
      this.guesses[this.guessCount].letterCheck = this.checkGuess(this.guesses[this.guessCount].guess);
    }
  }

  checkGuess(guess) {
    const letterCheck = []
    console.log(typeof guess, guess)
    for (const [i, g] of guess.split('').entries()) {
      console.log(i, g)
      if (!this.answer.includes(g)) {
        letterCheck.push({char: g, inWord: false, inSpot: false});
      }
      else if (this.answer[i] === g) {
        letterCheck.push({char: g, inWord: true, inSpot: true});
      }
      else {
        letterCheck.push({char: g, inWord: true, inSpot: false});
      }
    }

    return letterCheck;
  }

}