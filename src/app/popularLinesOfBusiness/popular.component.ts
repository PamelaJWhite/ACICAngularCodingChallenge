import { Component, OnInit } from '@angular/core';

// import { LineOfBusiness } from '../LineOfBusiness';
// import { LineOfBusinessService } from '../lineOfBusiness.service';


// //? Guesses: for this component, 
// // how are we going to grab it (selector) - this becomes the rendered element's name. e.g.,  <app-dashboard _nghost-three letters-c51 ></app-dashboard>, 
// // what HTML is it connected to, 
// // what CSS is it connected to?
// @Component({
//   selector: 'app-dashboard',
//   templateUrl: './dashboard.component.html',
//   styleUrls: [ './dashboard.component.css' ]
// })

// //? like a JS function that is exported?
// export class DashboardComponent implements OnInit {
//   linesOfBusiness: LineOfBusiness[] = [];

//   constructor(private lineOfBusinessService: LineOfBusinessService) { }

//   //? happens on load? 
//   // ? gets all lines of business?
//   ngOnInit() {
//     this.getLinesOfBusiness();
//   }

//   //another function; something happens if there are no lines of business, void?
//   // or does something to linesOfBusiness once they're grabbed?
//   getLinesOfBusiness(): void {
//     this.lineOfBusinessService.getLinesOfBusiness()
//       .subscribe(linesOfBusiness => this.linesOfBusiness = linesOfBusiness.slice(1, 4));
//   }
// }
