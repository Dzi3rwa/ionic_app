import { Component } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {
  currentPositionTab: any[] = [];
  currentPositionTab2: any[] = [];
  bool = false;
  length = 0;
  storageLength = 0;
  interval;
  constructor(private storage: Storage) {
    this.ngOnInit();
  };

  buttonNewRouteClick() {
    this.interval = setInterval(() => {
      this.printCurrentPosition();
    }, 1000);
  };

  ngOnInit = async () => {
    await this.storage.create();
    this.length = this.currentPositionTab.length;
    this.storageLength = (await this.storage.length()).valueOf();
  };

  printCurrentPosition = async () => {
    const coordinates = await Geolocation.getCurrentPosition();
    const x = JSON.stringify(coordinates.coords.latitude);
    const y = JSON.stringify(coordinates.coords.longitude);
    const obj = { x, y };
    this.currentPositionTab.push(obj);
    this.length = this.currentPositionTab.length;
  };

  buttonSaveRouteClick = async () => {
    clearInterval(this.interval);
    await this.storage.set(JSON.stringify(this.currentPositionTab), 'a');
    this.currentPositionTab.length = 0;
    this.length = 0;
    this.storageLength = (await this.storage.length()).valueOf();
  };

  buttonShowClick() {
    this.currentPositionTab2.length = 0;
    this.storage.forEach((v, k, i) => {
      this.currentPositionTab2.push(k);
    });
  };

  buttonDeleteClick = async () => {
    await this.storage.clear();
    this.storageLength = (await this.storage.length()).valueOf();
  };
}
