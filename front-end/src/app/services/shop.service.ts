import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private http: HttpClient) {
  }

  getNearbyShops(longitude: number, latitude: number) {
    return this.http.get(`http://127.0.0.1:8000/api/nearby_shops?longitude=${longitude}&latitude=${latitude}`);
  }

  getPreferredShops() {
    return this.http.get(`http://127.0.0.1:8000/api/Preferred_shops`);
  }

  removeFromPreferred(googleId: string) {
    return this.http.put(`http://127.0.0.1:8000/api/remove_from_preferred/${googleId}`, {});
  }
}
