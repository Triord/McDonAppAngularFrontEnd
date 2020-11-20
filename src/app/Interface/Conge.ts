import { Employe } from './employe';

export class Conge{
  idConge: number;
  dateConge: Date;
  raison: string;
  statusConge: boolean;
  employeeFromConge: Employe;
}
