import {Component, OnInit} from '@angular/core';
import {ShopService} from '../services/shop.service';
import {Shop} from '../models/shop';
import {NotifierService} from 'angular-notifier';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-preferred-shops',
  templateUrl: './preferred-shops.component.html',
  styleUrls: ['./preferred-shops.component.scss']
})
export class PreferredShopsComponent implements OnInit {
  shops: Shop[];

  constructor(
    private shopService: ShopService,
    private notifier: NotifierService,
    private spinner: NgxSpinnerService,
  ) {
  }

  ngOnInit() {
    this.notifier.hideAll();
    this.getPreferredShops();
  }

  removeFromPreferred(index: number) {
    this.spinner.show();
    this.shopService.removeFromPreferred(this.shops[index].googleId).subscribe(
      (data) => {
        this.spinner.hide();
        this.shops.splice(index, 1);
        this.notifier.notify('success', 'Shop was removed from your preferred list');
      }, (error) => {
        this.spinner.hide();
        this.notifier.notify('error', 'Ops! We could not reach the server, Try again.');
      }
    );
  }

  getPreferredShops() {
    this.notifier.hideAll();
    this.spinner.show();
    this.shopService.getPreferredShops().subscribe(
      (data: Shop[]) => {
        this.spinner.hide();
        if (data.length) {
          this.shops = data;
        } else {
          this.notifier.notify('info', 'No shop was saved');
          this.shops = null;
        }
      },
      (error) => {
        this.spinner.hide();
        this.notifier.notify('error', 'Ops! We could not reach the server, Try again.');
        console.log(error);
      }
    );
  }
}
