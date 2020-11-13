import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';

import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
import { d } from '@angular/core/src/render3';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dish: Dish;
  promotion: Promotion;
  leader: Leader;
  errMessDish: string;
  

  constructor(private dishservice: DishService,
    @Inject('BaseURL') private BaseURL,
    private promotionservice: PromotionService, 
    private leaderService : LeaderService,
   ) { }

  ngOnInit() {
    this.dishservice.getFeaturedDish().subscribe(dish => this.dish = dish,
      errmess => this.errMessDish = <any>errmess); 
    this.promotionservice.getFeaturedPromotion().subscribe(promo => this.promotion=promo);
    this.leaderService.getFeaturedLeader().subscribe(leader => this.leader=leader);
  }

}
