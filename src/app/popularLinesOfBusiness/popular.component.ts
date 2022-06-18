import { Component, OnInit, OnDestroy } from '@angular/core';

// import { LineOfBusiness } from '../LineOfBusiness';
// import { LineOfBusinessService } from '../lineOfBusiness.service';


// a component decorator
// @Component({
//   selector: 'app-popular',
//   // templateUrl is used for separate file
//   templateUrl: './popular.component.html',
//   styleUrls: [ './popular.component.css' ]
// })

//practice component decorator
@Component({
    selector: 'app-popular',
      // template is used for HTML within the component
      // include the title property (created below) in the html
    template: '<h1> {{title}} </h1>',
    styles: [``]

})

//? like a JS function that is exported?
//implements ngOnInit is a lifecycle hook
export class PopularLinesOfBusinessComponent implements OnInit, OnDestroy {
  title = 'yup yup yup this is my space, only cooler';

  // // ----------------life cycle function from tutorial:-----------
  //function for logging some values to the console
  // ? is this like declaring a function?
  // the error is "Member 'intervalSub' implicitly has an 'any' type."
  // ? 1) add a type; e.g., is this a function 2) noimplicitAny: false property in the tsconfig
  // I did the latter
  intervalSub;

  //add ng onto the interface name to get the method needed for implementation
  ngOnInit() {
    // create a property that will save teh funciton so that we can clean it up at the end.
    //setInterval method to make console log on every second

    this.intervalSub = setInterval(() => {
      // console.log("yo yo yo from ngOnInit")
    });
  }

  ngOnDestroy() {
    if (this.intervalSub){
      // clearInterval method with our property passed as an argument
      clearInterval(this.intervalSub)
    }
  }
  // -----------END lifecycle functions from tutorial
}

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
