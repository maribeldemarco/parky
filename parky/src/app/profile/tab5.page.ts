import { Component } from '@angular/core';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page {
  currentUser: any = {
    'Nombre': '',
    'Apellido': '',
    'mail': '',
    'birthdate': ''
  };
  constructor(private database: DatabaseService) {
    this.database.getData().then( res => {
      this.currentUser = res
    })
   }

  showData() {
    console.log(this.currentUser)
  }
}
