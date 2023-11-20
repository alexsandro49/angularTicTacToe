import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root',
})
export class ScoreboardService {
  currentPlayer: BehaviorSubject<string> = new BehaviorSubject<string>('');
  champion: BehaviorSubject<string> = new BehaviorSubject<string>('');
  restart: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {}

  onRestart(): void {
    this.restart.next(true);
    this.champion.next('');
  }
}
