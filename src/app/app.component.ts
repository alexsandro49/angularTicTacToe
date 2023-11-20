import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { BoardComponent } from './components/board/board.component';
import { ScoreBoardComponent } from './components/score-board/score-board.component';


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [CommonModule, RouterOutlet, BoardComponent, ScoreBoardComponent],
})
export class AppComponent {
  title: string = 'angularTicTacToe';
}
