import { Component, OnInit } from '@angular/core';
import { Voiture } from 'src/app/data/models/voiture.model';
import { VoitureService } from 'src/app/data/services/voiture.service';

@Component({
  selector: 'app-voiture-management',
  templateUrl: './voiture-management.component.html',
  styleUrls: ['./voiture-management.component.scss']
})
export class VoitureManagementComponent implements OnInit {
  loader: boolean = true;
  voitures: Voiture[] = [];
  selectedOption: string = 'listAll';
  carToModifyId: number = 0;
  carToAdd: any = {
    num_imma: '',
    marque: '',
    modele: '',
    kilometrage: 0,
    etat: 1,
    prix_location: 0
  }
  carToModify: any = {
    num_imma: '',
    marque: '',
    modele: '',
    kilometrage: 0,
    prix_location: 0
  }
  totalCars: number = 0;
  totalKilometers: number = 0;
  constructor(private voitureService: VoitureService) { }

  ngOnInit(): void {
    this.getAllCars();
  }

  selectOption(option: string) {
    this.loader = true;
    this.selectedOption = option;
    switch (option) {
      case 'listAll':
        this.getAllCars();
        break;
      case 'add':
        this.loader = false;
        break;
      case 'modify':
        this.loader = false;
        break;
      case 'delete':
        this.loader = false;
        break;
      case 'stats':
        this.getStats();
        break;
      default:
        console.log('default');
        break;
    }
  }

  getAllCars() {
    this.voitureService.getAllVoitures().subscribe((data: any) => {
      this.voitures = [];
      data['voitures'].forEach((voiture: Voiture) => {
        this.voitures.push(voiture);
      });
      this.loader = false;
    });
  }

  addCar() {
    this.loader = true;
    this.voitureService.addVoiture(this.carToAdd).subscribe((data: any) => {
      this.loader = false;
      this.selectOption('listAll');
    });
  }

  setCarToModify() {
    this.carToModify = this.voitures.find((voiture: Voiture) => voiture.id === this.carToModifyId);
  }

  modifyCar() {
    this.loader = true;
    this.voitureService.updateVoiture(this.carToModifyId, this.carToModify).subscribe((data: any) => {
      this.loader = false;
      this.selectOption('listAll');
    });
  }

  deleteCar(id: number) {
    this.loader = true;
    this.voitureService.deleteVoiture(id).subscribe((data: any) => {
      this.loader = false;
      // filter the deleted car from the list
      this.voitures = this.voitures.filter((voiture: Voiture) => voiture.id !== id);
    });
  }

  getStats() {
    this.voitureService.getStatistics().subscribe((data: any) => {
      this.loader = false;
      this.totalCars = data['voiture_count'];
      this.totalKilometers = data['total_kilometrage'];
    });
  }
}
