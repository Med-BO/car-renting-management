import { Locataire } from "./locataire.model";

export class Voiture {
    id!: number;
    num_imma!: number;
    marque!: string;
    modele!: string;
    kilometrage!: number;
    etat!: number;
    prix_location!: number;
    id_locataire?: number;
    locataire?: Locataire;
  
    constructor(data?: Partial<Voiture>) {
      if (data) {
        Object.assign(this, data);
      }
    }
}