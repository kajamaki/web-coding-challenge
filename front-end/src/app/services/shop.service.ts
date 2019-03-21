import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/user';
import {Shop} from '../models/shop';

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

  addToPreferred(params: Shop) {
    return this.http.post(`http://127.0.0.1:8000/api/add_to_preferred`, JSON.stringify(params), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
