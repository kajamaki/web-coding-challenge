import {Component, OnInit} from '@angular/core';
import {ShopService} from '../services/shop.service';
import {Shop} from '../models/shop';

@Component({
  selector: 'app-preferred-shops',
  templateUrl: './preferred-shops.component.html',
  styleUrls: ['./preferred-shops.component.scss']
})
export class PreferredShopsComponent implements OnInit {
  shops: Shop[];

  constructor(
    private shopService: ShopService
  ) {
  }

  ngOnInit() {
    this.getPreferredShops();
  }

  removeFromPreferred(googleId: string) {
    this.shopService.removeFromPreferred(googleId).subscribe(
      (data) => {
        this.shops = this.shops.filter(item => item.googleId !== googleId);
      }, (error) => {
        console.log(error);
      }
    );
  }

  getPreferredShops() {
    this.shopService.getPreferredShops().subscribe(
      (data: Shop[]) => {
        if (data.length) {
          this.shops = data;
        } else {
          this.shops = null;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
