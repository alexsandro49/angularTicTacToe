import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css',
})
export class BoardComponent {
  squares: string[] = ['', '', '', '', '', '', '', '', ''];
  isPlayer: boolean = true;
  playerValue!: string;
  computerValue!: string;

  constructor() {
    if (Math.random() < 0.5) {
      this.playerValue = 'X';
      this.computerValue = 'O';
    } else {
      this.playerValue = 'O';
      this.computerValue = 'X';
    }
  }

  squareSelected(event: any): void {
    if (this.squares[event.target.id] != '') {
      return;
    }

    if (this.isPlayer) {
      this.squares[event.target.id] = this.playerValue;
    } else {
      this.squares[event.target.id] = this.computerValue;
    }

    this.isPlayer = !this.isPlayer;
  }
}
