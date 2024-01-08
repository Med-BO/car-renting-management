import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Voiture } from '../models/voiture.model';

@Injectable({
  providedIn: 'root'
})
export class VoitureService {
  BACKEND_API_LINK = 'http://localhost:5000/api/voiture';
  constructor(private http: HttpClient) { }

  getAllVoitures() {
    return this.http.get(`${this.BACKEND_API_LINK}s`);
  }

  addVoiture(payload: any) {
    return this.http.post(`${this.BACKEND_API_LINK}`, payload);
  }

  updateVoiture(voitureId: number, payload: any) {
    return this.http.put(`${this.BACKEND_API_LINK}/${voitureId}`, payload);
  }

  deleteVoiture(voitureId: number) {
    return this.http.delete(`${this.BACKEND_API_LINK}/${voitureId}`);
  }

  getStatistics() {
    return this.http.get(`${this.BACKEND_API_LINK}-stats`);
  }

  getAllRentals() {
    return this.http.get('http://127.0.0.1:5000/api/all-rentals');
  }

  rentCar(payload: any) {
    return this.http.post('http://127.0.0.1:5000/api/rent-car', payload);
  }
}
