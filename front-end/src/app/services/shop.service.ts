import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/user';
import {Shop} from '../models/shop';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private http: HttpClient) {
  }

  getNearbyShops(longitude: number, latitude: number) {
    return this.http.get(`${environment.apiUrl}nearby_shops?longitude=${longitude}&latitude=${latitude}`);
  }

  getPreferredShops() {
    return this.http.get(`${environment.apiUrl}Preferred_shops`);
  }

  removeFromPreferred(googleId: string) {
    return this.http.delete(`${environment.apiUrl}remove_from_preferred/${googleId}`);
  }

  addToPreferred(params: Shop) {
    return this.http.post(`${environment.apiUrl}add_to_preferred`, JSON.stringify(params), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  dislikeShop(params: Shop) {
    return this.http.post(`${environment.apiUrl}dislike_shop`, JSON.stringify(params), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
