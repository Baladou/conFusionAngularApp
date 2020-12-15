import { Component, OnInit,Inject } from '@angular/core';
import { LeaderService } from '../services/leader.service';
import { Leader } from '../shared/leader'
import { flyInOut,expand } from '../animations/app.animation';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
   // tslint:disable-next-line:use-host-property-decorator
   host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
  animations: [
    flyInOut(),expand()
  ]
})
export class AboutComponent implements OnInit {
  leaders : Leader[];
  errMessLeader: string;
  constructor( @Inject('BaseURL') private BaseURL,private leaderService: LeaderService) { }

  ngOnInit() {
    this.leaderService.getLeaders()
    .subscribe(leaders => this.leaders = leaders,
      errmess => this.errMessLeader = <any>errmess);

  }

}
