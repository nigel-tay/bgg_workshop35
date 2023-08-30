import { ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { Game } from 'src/app/models/game';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-game',
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, OnChanges, OnDestroy{
  @Input() pagePerRec = 0;
  games!: Game[];
  currentIndex: number = 0;
  pageNo: number = 1;
  sub$!: Subscription;
  
  constructor(private gameSvc: GameService) {}

  ngOnInit(): void {
    console.log("pagePerRec " + this.pagePerRec);
    if (this.pagePerRec == null) {
      this.pagePerRec = 5;
    }
    this.sub$ = this.gameSvc.getGames(this.pagePerRec, this.currentIndex)
                            .subscribe((result: any) => {
                              this.games = result.games;
                              console.log("Game length >>>>>>>>> " + this.games.length);
                            })
  }

  ngOnDestroy() {
    this.sub$.unsubscribe;
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['pagePerRec'].currentValue == null) {
      this.pagePerRec = 5;
    }
    else {
      this.pagePerRec = changes['pagePerRec'].currentValue;
    }
    // Only need to assign to subscription once, by calling get again, the subscription is updated
    this.fetchData(this.pagePerRec, this.currentIndex);
  }

  previousPage() {
    this.pageNo--;
    this.currentIndex -= this.pagePerRec;
    this.fetchData(this.pagePerRec, this.currentIndex);
  }
  nextPage() {
    this.pageNo++;
    console.log(this.pageNo);
    
    this.currentIndex += this.pagePerRec;
    this.fetchData(this.pagePerRec, this.currentIndex);
  }

  private fetchData(pagePerRec: number, currentIndex: number) {
    this.gameSvc.getGames(pagePerRec, currentIndex)
                .subscribe((result: any) => {
                  this.games = result.games;
                  console.log("Game length >>>>>>>>> " + this.games.length);
                })
  }
}
