import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}

  deleteUser(id) {
    return this.http.delete(`${environment.URL}/admin/delete`, id);
  }
  changeRole(data) {
    return this.http.patch(`${environment.URL}/admin/changerole`, data);
  }
}
