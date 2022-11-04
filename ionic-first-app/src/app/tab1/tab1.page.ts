import { Component } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {
  currentPositionTab: any[] = [];
  currentPositionTab2: any[] = [];
  bool = false;
  constructor() {
    setInterval(() => {
      this.printCurrentPosition();
    }, 5000);
  }

  printCurrentPosition = async () => {
    const coordinates = await Geolocation.getCurrentPosition();
    this.currentPositionTab.push(coordinates);
  };

  buttonClick() {
    this.currentPositionTab2.length = 0;
    this.currentPositionTab.forEach(e => {
      this.currentPositionTab2.push(e);
    });
    this.currentPositionTab.length = 0;
    this.bool = true;
  }
}
