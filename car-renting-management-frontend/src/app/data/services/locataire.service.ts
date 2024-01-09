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

  searchForCustomer(searchText: string) {
    const queryParams = { q: searchText };
    const queryString = new URLSearchParams(queryParams).toString();
  
    return this.http.get(`${this.BACKEND_API_LINK}-search?${queryString}`);
  }

  addLocataire(payload: any) {
    return this.http.post(this.BACKEND_API_LINK, payload);
  }

  updateLocataire(customerId: number, payload: any) {
    return this.http.put(this.BACKEND_API_LINK + "/" + customerId, payload);
  }

  deleteLocataire(customerId: number) {
    return this.http.delete(this.BACKEND_API_LINK + "/" + customerId);
  }
}
