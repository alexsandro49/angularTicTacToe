import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScoreboardService } from '../../services/scoreboard.service';

@Component({
  selector: 'app-score-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './score-board.component.html',
  styleUrl: './score-board.component.css',
})
export class ScoreBoardComponent implements OnInit {
  currentPlayer!: string;
  champion!: string;

  constructor(public scoreboardService: ScoreboardService) {}

  ngOnInit(): void {
    this.scoreboardService.currentPlayer
      .asObservable()
      .subscribe((serviceData) => (this.currentPlayer = serviceData));

    this.scoreboardService.champion
      .asObservable()
      .subscribe((serviceData) => (this.champion = serviceData));
  }
}
