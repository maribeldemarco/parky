import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab7',
  templateUrl: './tab7.page.html',
  styleUrls: ['./tab7.page.scss'],
})
export class Tab7Page implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  terminarRegistro() {
    this.router.navigate(['tabs/tab10']);
  }
}
