export class Locataire {
    id_loc!: number;
    nom!: string;
    prenom!: string;
    adresse!: string;
  
    constructor(data?: Partial<Locataire>) {
      if (data) {
        Object.assign(this, data);
      }
    }
  }