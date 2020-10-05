import { DismissReasons } from 'ngx-bootstrap/modal/models';
import { Disponibilite } from './disponinilite';
import { Horaire } from './horaire';
import { Semaine } from './semaine';

export class Employe{
  idEmploye: number;
  nom: string;
  prenom: string;
  email: string;
  ddn: Date;
  mdp: string;
  nbrHeure: number;
  statut: boolean;
  semaine: Semaine;
  dispo: Disponibilite;
  horaire: Horaire[]=[];
}
