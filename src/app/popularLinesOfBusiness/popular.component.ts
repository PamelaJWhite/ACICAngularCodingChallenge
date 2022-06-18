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
    this.secondFreq = 9;
  }

  // ---- function for counting frequency of each line of business
  

  // ----GET recent quotes data ----

  quotes: RecentQuote[] = [];

  //   constructor(private policyService: PolicyService) { }
  constructor(private recentQuotesService: RecentQuotesService) { } 
  countFreq(data) {
    // create variables to hold frequency of each line of business
    let generalLiability : number = 0;
    let commercialProperty : number = 0;
    let inlandMarine: number = 0;
    let oceanMarine: number = 0;
    let garage : number = 0;

    for(let i = 0;i< data.length ;i++) {
      if(data[i].lineOfBusiness == 11 ){
        generalLiability = generalLiability +1;
        console.log("generalLiability inside: ", generalLiability)
      }if(data[i].lineOfBusiness == 12 ) {
        commercialProperty = commercialProperty +1
        console.log("commercialProperty inside: ", commercialProperty)
      }if(data[i].lineOfBusiness == 13 ) {
        inlandMarine = inlandMarine +1
        console.log("inlandMarine inside: ", inlandMarine)
      }if(data[i].lineOfBusiness == 14 ) {
        oceanMarine = oceanMarine +1
        console.log("oceanMarine inside: ", oceanMarine)
      }if(data[i].lineOfBusiness == 15 ) {
        garage = garage +1
        console.log("garage inside: ", garage)
      }
      
    }
    
    return console.log(" in countFreq() return")
  }
  ngOnInit() {
    this.recentQuotesService.getRecentQuotes().subscribe((data: RecentQuote[])=> {
      console.log("data, oh please be quote data:", data)
      //count up each of the lines of business
      this.countFreq(data)
  
    })
  }


  




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
