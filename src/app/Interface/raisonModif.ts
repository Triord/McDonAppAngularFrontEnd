import { Employe } from './employe';
import { Horaire } from './horaire';

export class RaisonModif{
  idRM: number;
  raison: string;
  dateModif: Date = new Date();
  horaire: Horaire;
  employe: Employe;
}
