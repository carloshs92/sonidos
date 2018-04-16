import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ANIMALES } from '../../data/data.animales';
import { IAnimal } from '../../interfaces/animal.interface';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  animales: IAnimal[] = [];

  constructor() {
    this.animales = ANIMALES.splice(0);
  }

}
