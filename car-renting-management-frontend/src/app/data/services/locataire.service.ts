import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocataireService {
  BACKEND_API_LINK = 'http://localhost:5000/api/locataire';
  constructor(private http: HttpClient) { }

  getAllCustomers() {
    return this.http.get(`${this.BACKEND_API_LINK}s`);
  }
}
