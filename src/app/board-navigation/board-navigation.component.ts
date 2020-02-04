import { Component, OnInit } from '@angular/core';
import { BoardNavigationService } from './board-navigation.service';
import { MainService } from '../main.service';

@Component({
  selector: 'app-board-navigation',
  templateUrl: './board-navigation.component.html',
  styleUrls: ['./board-navigation.component.scss'],
})
export class BoardNavigationComponent implements OnInit {
  constructor(
    private boardNavigationService: BoardNavigationService,
    private mainService: MainService,
  ) {}

  ngOnInit(): void {}

  isReady(): boolean {
    return this.boardNavigationService.resolved;
  }

  isNextDisabled(): boolean {
    return !this.boardNavigationService.hasNext();
  }

  isPrevDisabled(): boolean {
    return !this.boardNavigationService.hasPrev();
  }

  isActiveBoard(): boolean {
    return (
      this.boardNavigationService.getActiveBoard() === this.boardNavigationService.getCurrentBoard()
    );
  }

  nextBoard(): void {
    this.boardNavigationService.next();
    this.mainService.resolve().subscribe();
  }

  todayBoard(): void {
    this.boardNavigationService.toActive();
    this.mainService.resolve().subscribe();
  }

  prevBoard(): void {
    this.boardNavigationService.prev();
    this.mainService.resolve().subscribe();
  }

  completeBoard(): void {
    this.mainService.completeBoard().subscribe();
    this.mainService.resolve().subscribe();
  }
}
