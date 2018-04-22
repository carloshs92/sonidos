import { Component } from '@angular/core';
import {NavController, Refresher, reorderArray} from 'ionic-angular';
import { ANIMALES } from '../../data/data.animales';
import { IAnimal } from '../../interfaces/animal.interface';
import {ReorderIndexes} from "ionic-angular/components/item/item-reorder";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  animales: IAnimal[] = [];
  audio = new Audio();
  time: number;
  isOrderActive = false;

  constructor() {
    this.animales = ANIMALES.slice(0);
  }

  reproducir (animal: IAnimal) {
    this.pause(animal);
    if (animal.reproduciendo) {
      animal.reproduciendo = false;
    } else {
      this.audio.src = animal.audio;
      animal.reproduciendo = true;
      this.audio.load();
      this.audio.play();
      this.time = setTimeout(() => animal.reproduciendo = false, animal.duracion * 1000);
    }
  }

  doRefresh (refresher: Refresher) {
    setTimeout(() => {
      this.animales = ANIMALES.slice(0);
      refresher.complete()
    }, 2000);
  }

  deleteAnimal (index: number) {
    this.animales.splice(index, 1)
  }

  reorderAnimal (indexes: ReorderIndexes) {
    reorderArray(this.animales, indexes);
  }

  private pause (animalSel: IAnimal) {
    clearTimeout(this.time);
    this.audio.pause();
    this.audio.currentTime = 0;
    this.animales.forEach(animal => {
      if (animal.nombre !== animalSel.nombre) {
        animal.reproduciendo = false;
      }
    } );
  }
}
