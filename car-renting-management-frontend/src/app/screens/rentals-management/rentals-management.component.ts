import { Component, OnInit } from '@angular/core';
import { Locataire } from 'src/app/data/models/locataire.model';
import { Voiture } from 'src/app/data/models/voiture.model';
import { LocataireService } from 'src/app/data/services/locataire.service';
import { VoitureService } from 'src/app/data/services/voiture.service';

@Component({
  selector: 'app-rentals-management',
  templateUrl: './rentals-management.component.html',
  styleUrls: ['./rentals-management.component.scss']
})
export class RentalsManagementComponent implements OnInit {
  loader: boolean = true;
  rentals: any[] = [];
  selectedOption: string = 'listAll';
  availableCars: Voiture[] = [];
  customers: Locataire[] = [];
  selectedCustomerToRent: number = 0;
  selectedCarToRent: number = 0;
  constructor(
    private voituresService: VoitureService,
    private locatairesService: LocataireService
  ) { }

  ngOnInit(): void {
    this.getAllRentals();
    this.getAvailableCars();
    this.getAllCustumers();
  }

  selectOption(option: string) {
    this.loader = true;
    this.selectedOption = option;
    switch (option) {
      case 'listAll':
        this.getAllRentals();
        break;
      case 'rent':
        this.loader = false;
        break;
      case 'return':
        this.loader = false;
        break;
      default:
        console.log('default');
        break;
    }
  }

  getAllRentals() {
    this.voituresService.getAllRentals().subscribe((res: any) => {
      this.rentals = res['rentals'];
      this.loader = false;
    });
  }

  getAvailableCars() {
    this.voituresService.getAllVoitures().subscribe((res: any) => {
      this.availableCars = res['voitures'];
      this.availableCars = this.availableCars.filter(car => car.etat === 1);
    });
  }

  getAllCustumers() {
    this.locatairesService.getAllCustomers().subscribe((res: any) => {
      this.customers = res['locataires'];
    });
  }

  rentCar() {
    const payload = {
      'locataire_id': this.selectedCustomerToRent,
      'voiture_id': this.selectedCarToRent
    }
    this.loader = true;
    this.voituresService.rentCar(payload).subscribe((res: any) => {
      this.getAllRentals();
      this.getAvailableCars();
    });
  }
}
