import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Voiture } from '../models/voiture.model';

@Injectable({
  providedIn: 'root'
})
export class VoitureService {
  BACKEND_API_LINK = 'http://localhost:8080/api/voiture';
  constructor(private http: HttpClient) { }

  getAllVoitures() {
    return this.http.get(`${this.BACKEND_API_LINK}s`);
  }

  addVoiture(voiture: Voiture) {
    return this.http.post(`${this.BACKEND_API_LINK}`, voiture);
  }

  updateVoiture(voitureId: number, payload: any) {
    return this.http.put(`${this.BACKEND_API_LINK}/${voitureId}`, payload);
  }

  deleteVoiture(voitureId: number) {
    return this.http.delete(`${this.BACKEND_API_LINK}/${voitureId}`);
  }
}
