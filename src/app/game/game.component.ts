import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  spanishVocab = [
    {word: 'Grapa', def: 'Staple'},
    {word: 'Grasa', def: 'Grease'},
    {word: 'Pluma', def: 'pen'},
    {word: 'lluvia', def:'rain'}
  ];

  frenchVocab = [
    {word: 'agrafe', def: 'Staple'},
    {word: 'graisse', def: 'Grease'},
    {word: 'stylo', def: 'pen'},
    {word: 'pluie', def:'rain'}
  ];

  vocab: string[];

  showRules = false;
  endText: string;

  answer: string;
  ansLen: number;

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
    this.answer = this.randomVocab('spanish').toLowerCase();
    this.ansLen = this.answer.length;
    this.guesses = [
      {guess: this.guess1, correct: false, letterCheck: []},
      {guess: this.guess2, correct: false, letterCheck: []},
      {guess: this.guess3, correct: false, letterCheck: []},
      {guess: this.guess4, correct: false, letterCheck: []},
      {guess: this.guess5, correct: false, letterCheck: []}
    ]
  }

  randomVocab(type): string {
    switch (type) {
      case 'spanish':
        this.vocab = this.spanishVocab.map(v => v.word) 
      case 'french':
        this.vocab = this.frenchVocab.map(v => v.word) 
      default:
        this.vocab = this.spanishVocab.map(v => v.word)
    }

    return this.vocab[Math.floor(Math.random()*this.vocab.length)];
  }

  onSubmit(): void {
    if (!this.inputText) {
      alert("please enter guess");
      return;
    }

    if (this.inputText.length != this.answer.length) {
      alert(`Guess must be ${this.answer.length} letters`);
      return;
    }

    if (this.guessCount >= 5) {
      alert('You are out of guesses!')
    }

    console.log(this.guessCount)
    this.guesses[this.guessCount].guess = this.inputText.toLowerCase();

    if (this.guesses[this.guessCount].guess === this.answer) {
      this.guesses[this.guessCount].correct = true;
      this.guesses[this.guessCount].letterCheck = this.checkGuess(this.guesses[this.guessCount].guess);
      this.endText = 'You got it!!!';
    } else {
      this.guesses[this.guessCount].letterCheck = this.checkGuess(this.guesses[this.guessCount].guess);
    }

    this.guessCount++;
  }

  checkGuess(guess) {
    const letterCheck = []
    for (const [i, g] of guess.split('').entries()) {
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

  getStyles(guessChar: any): string {
    if (guessChar.inWord && guessChar.inSpot) {
      return 'green';
    } else if (guessChar.inWord) {
      return 'orange';
    } else {
      return 'grey';
    }
  }

  toggleRules() {
    this.showRules = !this.showRules;
  }
}
