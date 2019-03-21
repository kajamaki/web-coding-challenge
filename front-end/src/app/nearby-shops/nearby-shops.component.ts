import {Component, OnInit} from '@angular/core';
import {ShopService} from '../services/shop.service';
import {Shop} from '../models/shop';
import {ActivatedRoute} from '@angular/router';
import {NotifierService} from 'angular-notifier';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-nearby-shops',
  templateUrl: './nearby-shops.component.html',
  styleUrls: ['./nearby-shops.component.scss']
})
export class NearbyShopsComponent implements OnInit {
  shops: Shop[];

  constructor(
    private shopService: ShopService,
    private route: ActivatedRoute,
    private notifier: NotifierService,
    private spinner: NgxSpinnerService,
  ) {
  }

  ngOnInit() {
    this.notifier.hideAll();
    this.route.params.subscribe(() => {
      if (navigator.geolocation) {
        this.notifier.notify('info', 'Finding your position ... please wait!', 'LOCATION');
        navigator.geolocation.getCurrentPosition(
          position => {
            this.notifier.notify('info', 'Fetching data ...', 'FETCHING_DATA');
            this.notifier.hide('LOCATION');
            this.getNearbyShops(position.coords.longitude, position.coords.latitude);
          },
          error => {
            if (error.code === error.PERMISSION_DENIED) {
              this.notifier.notify('error', 'Geolocation permission is required, Please allow location');
            }
          }
        );
      } else {
        this.notifier.notify('error', 'Your browser doesn\'t support geolocation');
      }
    });
  }

  getNearbyShops(longitude: number, latitude: number) {
    this.shopService.getNearbyShops(longitude, latitude).subscribe(
      (data: Shop[]) => {
        this.notifier.hide('FETCHING_DATA');
        if (data.length) {
          this.shops = data;
        } else {
          this.notifier.notify('info', 'Ops! No shop was found');
        }
      },
      (error) => {
        this.notifier.notify('error', 'Ops! We could not reach the server, Try again.');
      }
    );
  }

  addToPreferred(index: number) {
    this.spinner.show();
    this.shopService.addToPreferred(this.shops[index]).subscribe(
      (data) => {
        this.spinner.hide();
        this.shops.splice(index, 1);
        this.notifier.notify('success', 'Shop was added to preferred');
      },
      (error) => {
        this.spinner.hide();
        this.notifier.notify('error', 'Ops! We could not reach the server, Try again.');
      }
    );
  }

  dislikeShop(index: number) {
    this.spinner.show();
    this.shopService.dislikeShop(this.shops[index]).subscribe(
      (data) => {
        this.spinner.hide();
        this.shops.splice(index, 1);
        this.notifier.notify('success', 'You\'ll not see this shop for the next 2 hours');
      },
      (error) => {
        this.spinner.hide();
        this.notifier.notify('error', 'Ops! We could not reach the server, Try again.');
      }
    );
  }


}
