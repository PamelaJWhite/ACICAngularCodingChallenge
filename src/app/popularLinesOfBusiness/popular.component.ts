import { Component, OnInit, OnDestroy } from '@angular/core';

import { LineOfBusiness } from '../LineOfBusiness';
import { LineOfBusinessService } from '../lineOfBusiness.service';

import { RecentQuote } from '../RecentQuote';
import { RecentQuotesService } from '../recentQuotes.service';


// a component decorator
@Component({
  selector: 'app-popular',
  // templateUrl is used for separate file
  templateUrl: './popular.component.html',
  styleUrls: [ './popular.component.css' ]
})

//practice component decorator
// @Component({
//     selector: 'app-popular',
//       // template is used for HTML within the component
//       // include the title property (created below) in the html
//     template: '<h1> {{title}} </h1>',
//     styles: [``]

// })

//? like a JS function that is exported?
//implements ngOnInit is a lifecycle hook
export class PopularLinesOfBusinessComponent implements OnInit {
  //this is just here as practice; i'm a bit attached to it, so I haecn't deleted it yet
  // title = 'yup yup yup this is my space, only cooler';

  //these are the properties I want to use/ show in HTML
  firstPopular = "First Most Popular"
  secondPopular = "Second Most Popular"
  firstFreq;
  secondFreq;

   //this is likely NOT where I should call displaySums(), but it works
  itWorks = this.displayFreq();

  //a function to show two frequencies
  displayFreq(){
    // let array = [1, 3, 6,]
    
    // return array[0]
    this.firstFreq = 8;
    this.secondFreq = 2;
  }

  // ----GET recent quotes data ----

  quotes: RecentQuote[] = [];

  //   constructor(private policyService: PolicyService) { }
  constructor(private recentQuotesService: RecentQuotesService) { } 

 
  ngOnInit() {
    this.recentQuotesService.getRecentQuotes().subscribe((data: RecentQuote[])=> {
      console.log("data, oh please be data:", data)
    })
  }

  // getRecentQuote(): void {
  //   this.recentQuotesService.getRecentQuotes()
  //   .subscribe(recentQuote => this.recentQuote = recentQuote);
  // }

  //-----------playing with data - https://www.techiediaries.com/angular-inmemory-web-api/ tutorial----
  // // ----GET lines of business data ----
  // // import { Component, OnInit } from '@angular/core';
  // // import { PolicyService } from './policy.service';

  // // @Component({
  // //   selector: 'app-contact-list',
  // //   templateUrl: './contact-list.component.html',
  // //   styleUrls: ['./contact-list.component.css']
  // // })
  // // export class PolicyListComponent implements OnInit {
  //    //  all the guts are below
  // // }

  // //   policies: any[] = [];
  // // ? difference between any and LineOfBusiness is that LineOfBusiness is deconstructed? organized? already does something to the data?
  // linesOfBusiness: LineOfBusiness[] = [];

  // //   constructor(private policyService: PolicyService) { }
  // constructor(private lineOfBusinessService: LineOfBusinessService) { } 

  // //   ngOnInit() {
  // //     this.policyService.getPolicies().subscribe((data : any[])=>{
  // //         console.log(data);
  // //         this.policies = data;
  // //     })
  // //   }
  // ngOnInit() {
  //   this.lineOfBusinessService.getLinesOfBusiness().subscribe((data: LineOfBusiness[])=> {
  //     console.log("data, oh please be data:", data)
  //   })
  // }

  // // ? like a for loop? for all linesOfBussness gotten...?
  // // ? or more like a get to the backend ?
  // getLinesOfBusiness(): void {
  //   this.lineOfBusinessService.getLinesOfBusiness()
  //   .subscribe(linesOfBusiness => this.linesOfBusiness = linesOfBusiness);
  // }





  //------------playing with methods - tutorial
  getMin(firstNum, secondNum){
    if(firstNum < secondNum){
      // console.log("in getMin: ", firstNum, "is less than", secondNum)
      return firstNum
    }
    return secondNum
  }

  // // ----------------life cycle function from tutorial:-----------
  // //function for logging some values to the console
  // // ? is this like declaring a function?
  // // the error is "Member 'intervalSub' implicitly has an 'any' type."
  // // ? 1) add a type; e.g., is this a function 2) noimplicitAny: false property in the tsconfig
  // // I did the latter
  // intervalSub;
  

  // //add ng onto the interface name to get the method needed for implementation
  // ngOnInit() {
  //   // create a property that will save teh funciton so that we can clean it up at the end.
  //   //setInterval method to make console log on every second
   
  //   this.intervalSub = setInterval(() => {
  //     // console.log("yo yo yo from ngOnInit")
  //     // console.log("linesOfBusiness in ngOnInit(): ", this.linesOfBusiness)
      

  //   });
  // }

  // ngOnDestroy() {
  //   if (this.intervalSub){
  //     // clearInterval method with our property passed as an argument
  //     clearInterval(this.intervalSub)
  //   }
  // }
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
