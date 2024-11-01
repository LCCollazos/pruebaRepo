import { Route, Router } from '@angular/router';
import { Component, ViewChild } from '@angular/core';
import { IonAccordion, IonAccordionGroup } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(private router: Router) {}


  NavegarUrlPersonal(){
    this.router.navigate(['personal']);
  }

  NavegarUrlEventos(){
    this.router.navigate(['home']);
  }

  NavegarUrlServicios(){
    this.router.navigate(['servicios']);
  }


}
