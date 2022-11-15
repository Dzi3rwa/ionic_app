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
  constructor(private storage: Storage) {
    setInterval(() => {
      this.printCurrentPosition();
    }, 5000);
    this.ngOnInit();
  };

  ngOnInit = async () => {
    await this.storage.create();
    this.length = await this.storage.length();
  };

  printCurrentPosition = async () => {
    const coordinates = await Geolocation.getCurrentPosition();
    const x = JSON.stringify(coordinates.coords.latitude);
    const y = JSON.stringify(coordinates.coords.longitude);
    const obj = { x, y };
    this.currentPositionTab.push(obj);
    await this.storage.set(JSON.stringify(obj), 'a');
    this.length = await this.storage.length();
  };

  buttonClick() {
    this.currentPositionTab2.length = 0;
    this.currentPositionTab.forEach(e => {
      this.currentPositionTab2.push(e);
    });
    this.currentPositionTab.length = 0;
    this.bool = true;
  };

  buttonDeleteClick = async () => {
    await this.storage.clear();
    this.length = await this.storage.length();
  };
}
