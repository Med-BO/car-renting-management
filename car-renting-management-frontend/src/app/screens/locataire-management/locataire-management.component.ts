import { Component, OnInit } from '@angular/core';
import { Locataire } from 'src/app/data/models/locataire.model';
import { LocataireService } from 'src/app/data/services/locataire.service';

@Component({
  selector: 'app-locataire-management',
  templateUrl: './locataire-management.component.html',
  styleUrls: ['./locataire-management.component.scss']
})
export class LocataireManagementComponent implements OnInit {
  loader: boolean = true;
  customers: Locataire[] = [];
  selectedOption: string = 'listAll';
  customerToAdd: any = {
    nom: '',
    prenom: '',
    adresse: ''
  };
  customerToModifyId: number = 0;
  customerToModify: any = {
    nom: '',
    prenom: '',
    adresse: ''
  };
  searchValue: string = ""

  constructor(
    private locatairesService: LocataireService
  ) { }

  ngOnInit(): void {
    this.getAllCustomers();
  }

  selectOption(option: string) {
    this.loader = true;
    this.selectedOption = option;
    switch (option) {
      case 'listAll':
        this.getAllCustomers();
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
      default:
        console.log('default');
        break;
    }
  }

  getAllCustomers() {
    this.locatairesService.getAllCustomers().subscribe((data: any) => {
      this.customers = [];
      data['locataires'].forEach((customer: Locataire) => {
        this.customers.push(customer);
      });
      this.loader = false;
    });
  }

  searchForCustomer() {
    this.loader = true;
    this.locatairesService.searchForCustomer(this.searchValue).subscribe((data: any) => {
      this.customers = [];
      data['locataires'].forEach((customer: Locataire) => {
        this.customers.push(customer);
      });
      this.loader = false;
    });
  }

  onSearchFieldChange() {
    if (this.searchValue === '') {
      this.loader = true;
      this.getAllCustomers();
    }
  }

  addCustomer() {
    this.loader = true;
    this.locatairesService.addLocataire(this.customerToAdd).subscribe((data) => {
      this.customerToAdd = {
        nom: '',
        prenom: '',
        adresse: ''
      }
      this.getAllCustomers();
    });
  }

  setCustomerToModify() {
    const foundCustomerToModify = this.customers.find((customer: Locataire) => customer.id_loc === this.customerToModifyId);
    this.customerToModify.nom = foundCustomerToModify?.nom;
    this.customerToModify.prenom = foundCustomerToModify?.prenom;
    this.customerToModify.adresse = foundCustomerToModify?.adresse;
  }

  modifyCustomer() {
    this.loader = true;
    this.locatairesService.updateLocataire(this.customerToModifyId, this.customerToModify).subscribe((data: any) => {
      this.loader = false;
      this.selectOption('listAll');
    });
  }

  deleteCustomer(idToDelete: number) {
    this.loader = true;
    this.locatairesService.deleteLocataire(idToDelete).subscribe((data: any) => {
      this.loader = false;
      // filter the deleted car from the list
      this.customers = this.customers.filter((customer: Locataire) => customer.id_loc !== idToDelete);
    });
  }
}
