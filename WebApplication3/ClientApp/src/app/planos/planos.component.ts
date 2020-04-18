import { Component } from '@angular/core';

@Component({
  selector: 'app-planos-component',
  templateUrl: './planos.component.html',
  styleUrls: ['./planos.component.css']
})
export class PlanosComponent {
  public currentCount = 0;

  public incrementCounter() {
    this.currentCount++;
  }
}
