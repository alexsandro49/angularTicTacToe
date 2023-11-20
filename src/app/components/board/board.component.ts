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
  squares: string[] = ['', '', '', '', '', '', '', '', ''];
  squaresColor: string[] = [
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
  isPlayer: boolean = true;
  playerValue!: string;
  computerValue!: string;
  color1!: string;
  color2!: string;

  constructor(private scoreBoardService: ScoreboardService) {
    if (Math.random() < 0.5) {
      this.playerValue = 'X';
      this.computerValue = 'O';
    } else {
      this.playerValue = 'O';
      this.computerValue = 'X';
    }

    this.color1 = Math.random() < 0.5 ? '#27C42A' : '#C42771';
    this.color2 = this.color1 == '#27C42A' ? '#C42771' : '#27C42A';
  }

  ngOnInit(): void {
    this.scoreBoardService.currentPlayer.next(
      this.isPlayer ? 'player' : 'computer'
    );

    this.scoreBoardService.restart
      .asObservable()
      .subscribe(() => this.restart());
    this.scoreBoardService.restart.next(false);
  }

  squareSelected(event: any): void {
    if (this.squares[event.target.id] != '') {
      return;
    }

    if (this.isPlayer) {
      this.squares[event.target.id] = this.playerValue;
      this.squaresColor[event.target.id] = this.color1;
    } else {
      this.squares[event.target.id] = this.computerValue;
      this.squaresColor[event.target.id] = this.color2;
    }

    if (
      this.squares[0] != '' &&
      this.squares[1] != '' &&
      this.squares[2] != ''
    ) {
      this.scoreBoardService.champion.next('player');
    }

    this.isPlayer = !this.isPlayer;
    this.scoreBoardService.currentPlayer.next(
      this.isPlayer ? 'player' : 'computer'
    );
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
  }
}
