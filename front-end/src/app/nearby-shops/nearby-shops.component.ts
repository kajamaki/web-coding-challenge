import {Component, OnInit} from '@angular/core';
import {ShopService} from '../services/shop.service';
import {Shop} from '../models/shop';

@Component({
  selector: 'app-nearby-shops',
  templateUrl: './nearby-shops.component.html',
  styleUrls: ['./nearby-shops.component.scss']
})
export class NearbyShopsComponent implements OnInit {
  shops: Shop[];

  constructor(
    private shopService: ShopService
  ) {
  }

  ngOnInit() {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(position => {
          console.log('i\'m tracking you!');
          this.shopService.getNearbyShops(position.coords.longitude, position.coords.latitude).subscribe(
            (data: Shop[]) => {
              if (data.length) {
                this.shops = data;
              }
            },
            (error) => {
              console.log(error);
            }
          );
        },
        error => {
          if (error.code === error.PERMISSION_DENIED) {
            console.log('you denied me :-(');
          }
        });
    } else {
      console.log('No support for geolocation');
    }
  }

}
