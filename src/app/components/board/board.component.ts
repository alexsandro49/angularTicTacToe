import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScoreboardService } from '../../services/scoreboard.service';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css',
})
export class BoardComponent implements OnInit {
  squares!: string[];
  squaresColor!: string[];
  isPlayer!: boolean;
  playerValue!: string;
  computerValue!: string;
  color1!: string;
  color2!: string;

  constructor(private scoreBoardService: ScoreboardService) {
  }

  ngOnInit(): void {
    this.restart();
    this.scoreBoardService.restart
      .asObservable()
      .subscribe(() => this.restart());
    if (this.scoreBoardService.restart) {
      this.scoreBoardService.restart.next(false);
    }
  }

  squareSelected(event: any): void {
    if (this.squares[event.target.id] != '' || !this.isPlayer) {
      return;
    }
    
    this.squares[event.target.id] = this.playerValue;
    this.squaresColor[event.target.id] = this.color1;

    if (this.championVerify()) {
      this.scoreBoardService.champion.next(
        this.isPlayer ? 'PLAYER' : 'COMPUTER'
      );
      return;
    } else if (this.squares.every((x) => x != '')) {
      this.scoreBoardService.champion.next('DRAW');
      return;
    }

    this.isPlayer = !this.isPlayer;
    this.scoreBoardService.currentPlayer.next(
      this.isPlayer ? 'PLAYER' : 'COMPUTER'
    );

    setTimeout(() => {
      if (!this.isPlayer) {
          this.computerPlay();
        }
    }, 1000);
  }

  restart(): void {
    this.squares = ['', '', '', '', '', '', '', '', ''];
    this.squaresColor = [
      '#285cc4',
      '#285cc4',
      '#285cc4',
      '#285cc4',
      '#285cc4',
      '#285cc4',
      '#285cc4',
      '#285cc4',
      '#285cc4',
    ];

    if (Math.random() < 0.5) {
      this.playerValue = 'X';
      this.computerValue = 'O';
    } else {
      this.playerValue = 'O';
      this.computerValue = 'X';
    }

    this.color1 = Math.random() < 0.5 ? '#27C42A' : '#C42771';
    this.color2 = this.color1 == '#27C42A' ? '#C42771' : '#27C42A';

    this.isPlayer = Math.random() < 0.5 ? true : false;
    this.scoreBoardService.currentPlayer.next(
      this.isPlayer ? 'PLAYER' : 'COMPUTER'
    );

    setTimeout(() => {
      if (!this.isPlayer) {
          this.computerPlay();
        }
    }, 1000);
  }

  championVerify(): boolean {
    for (let i = 0; i < 3; i++) {
      if (
        i < 2 &&
        ((this.squares[2 * i] == this.playerValue &&
          this.squares[4] == this.playerValue &&
          this.squares[8 - 2 * i] == this.playerValue) ||
          (this.squares[2 * i] == this.computerValue &&
            this.squares[4] == this.computerValue &&
            this.squares[8 - 2 * i] == this.computerValue))
      ) {
        return true;
      }

      if (
        (this.squares[3 * i] == this.playerValue &&
          this.squares[3 * i + 1] == this.playerValue &&
          this.squares[3 * i + 2] == this.playerValue) ||
        (this.squares[3 * i] == this.computerValue &&
          this.squares[3 * i + 1] == this.computerValue &&
          this.squares[3 * i + 2] == this.computerValue)
      ) {
        return true;
      } else if (
        (this.squares[i] == this.playerValue &&
          this.squares[i + 3] == this.playerValue &&
          this.squares[i + 6] == this.playerValue) ||
        (this.squares[i] == this.computerValue &&
          this.squares[i + 3] == this.computerValue &&
          this.squares[i + 6] == this.computerValue)
      ) {
        return true;
      }
    }

    return false;
  }

  computerAttack(): boolean {
    for (let i = 0; i < 3; i++) {
      if (this.squares[i * 3] == '' && this.squares[1 + 3 * i] == this.computerValue && this.squares[2 + 3 * i] == this.computerValue) {
        this.squares[i * 3] = this.computerValue; this.squaresColor[i * 3] = this.color2; return true;
      } else if (this.squares[i * 3] == this.computerValue && this.squares[1 + 3 * i] == '' && this.squares[2 + 3 * i] == this.computerValue) {
        this.squares[1 + i * 3] = this.computerValue; this.squaresColor[1 + i * 3] = this.color2; return true;
      } else if (this.squares[i * 3] == this.computerValue && this.squares[1 + 3 * i] == this.computerValue && this.squares[2 + 3 * i] == '') {
        this.squares[2 + 3 * i] = this.computerValue; this.squaresColor[2 + 3 * i] = this.color2; return true;
      }
    }

    for (let i = 0; i < 3; i++) {
      if (this.squares[i] == '' && this.squares[3 + i] == this.computerValue && this.squares[6 + i] == this.computerValue) {
        this.squares[i] = this.computerValue; this.squaresColor[i] = this.color2; return true;
      } else if (this.squares[i] == this.computerValue && this.squares[3 + i] == '' && this.squares[6 + i] == this.computerValue) {
        this.squares[3 + i] = this.computerValue; this.squaresColor[3 + i] = this.color2; return true;
      } else if (this.squares[i] == this.computerValue && this.squares[3 + i] == this.computerValue && this.squares[6 + i] == '') {
        this.squares[6 + i] = this.computerValue; this.squaresColor[6 + i] = this.color2; return true;
      }
    }

    for (let i = 0; i < 2; i++) {
      if (this.squares[i + 2 * i] == '' && this.squares[4] == this.computerValue && this.squares[8 - 2 * i] == this.computerValue) {
        this.squares[i + 2 * i] = this.computerValue; this.squaresColor[i + 2 * i] = this.color2; return true;
      } else if (this.squares[i + 2 * i] == this.computerValue && this.squares[4] == '' && this.squares[8 - 2 * i] == this.computerValue) {
        this.squares[4] = this.computerValue; this.squaresColor[4] = this.color2; return true;
      } else if (this.squares[i + 2 * i] == this.computerValue && this.squares[4] == this.computerValue && this.squares[8 - 2 * i] == '') {
        this.squares[8 - 2 * i] = this.computerValue; this.squaresColor[8 - 2 * i] = this.color2; return true;
      }
    }

    return false;
  }

  computerDefense(): boolean {
    for (let i = 0; i < 3; i++) {
      if (this.squares[i * 3] == '' && this.squares[1 + 3 * i] == this.playerValue && this.squares[2 + 3 * i] == this.playerValue) {
        this.squares[i * 3] = this.computerValue; this.squaresColor[i * 3] = this.color2; return true;
      } else if (this.squares[i * 3] == this.playerValue && this.squares[1 + 3 * i] == '' && this.squares[2 + 3 * i] == this.playerValue) {
        this.squares[1 + i * 3] = this.computerValue; this.squaresColor[1 + i * 3] = this.color2; return true;
      } else if (this.squares[i * 3] == this.playerValue && this.squares[1 + 3 * i] == this.playerValue && this.squares[2 + 3 * i] == '') {
        this.squares[2 + 3 * i] = this.computerValue; this.squaresColor[2 + 3 * i] = this.color2; return true;
      }
    }

    for (let i = 0; i < 3; i++) {
      if (this.squares[i] == '' && this.squares[3 + i] == this.playerValue && this.squares[6 + i] == this.playerValue) {
        this.squares[i] = this.computerValue; this.squaresColor[i] = this.color2; return true;
      } else if (this.squares[i] == this.playerValue && this.squares[3 + i] == '' && this.squares[6 + i] == this.playerValue) {
        this.squares[3 + i] = this.computerValue; this.squaresColor[3 + i] = this.color2; return true;
      } else if (this.squares[i] == this.playerValue && this.squares[3 + i] == this.playerValue && this.squares[6 + i] == '') {
        this.squares[6 + i] = this.computerValue; this.squaresColor[6 + i] = this.color2; return true;
      }
    }

    for (let i = 0; i < 2; i++) {
      if (this.squares[i + 2 * i] == '' && this.squares[4] == this.playerValue && this.squares[8 - 2 * i] == this.playerValue) {
        this.squares[i + 2 * i] = this.computerValue; this.squaresColor[i + 2 * i] = this.color2; return true;
      } else if (this.squares[i + 2 * i] == this.playerValue && this.squares[4] == '' && this.squares[8 - 2 * i] == this.playerValue) {
        this.squares[4] = this.computerValue; this.squaresColor[4] = this.color2; return true;
      } else if (this.squares[i + 2 * i] == this.playerValue && this.squares[4] == this.playerValue && this.squares[8 - 2 * i] == '') {
        this.squares[8 - 2 * i] = this.computerValue; this.squaresColor[8 - 2 * i] = this.color2; return true;
      }
    }

    return false;
  }

  computerPlay(): void {
    if (!this.computerAttack()) {
      if(!this.computerDefense()) {
        let squarePosition: number = Math.floor(Math.random() * 9);
          while (this.squares[squarePosition] != '') {
            squarePosition = Math.floor(Math.random() * 9);
          }

          this.squares[squarePosition] = this.computerValue;
          this.squaresColor[squarePosition] = this.color2;
      }
    }

    if (this.championVerify()) {
      this.scoreBoardService.champion.next(
        this.isPlayer ? 'PLAYER' : 'COMPUTER'
      );
      return;
    } else if (this.squares.every((x) => x != '')) {
      this.scoreBoardService.champion.next('DRAW');
      return;
    }

    this.isPlayer = !this.isPlayer;
    this.scoreBoardService.currentPlayer.next(
      this.isPlayer ? 'PLAYER' : 'COMPUTER'
    );
  }
}

