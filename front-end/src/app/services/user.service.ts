import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {
  }

  register(user: User) {
    return this.http.post(`http://127.0.0.1:8000/api/register`, user);
  }
}
