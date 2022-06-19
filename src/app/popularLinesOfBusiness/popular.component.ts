import { keyframes } from '@angular/animations';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { LineOfBusiness } from '../LineOfBusiness';
import { LineOfBusinessService } from '../lineOfBusiness.service';

import { RecentQuote } from '../RecentQuote';
import { RecentQuotesService } from '../recentQuotes.service';

//tried to use this when finding the highest using an array of objects
//but couldn't pass freqCountArr from ngOnInit where data are gathered
//to findTwoHighest
// type ArrOfObjs = [{ 
//   business: number;
// }]

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: [ './popular.component.css' ]
})

//implements ngOnInit is a lifecycle hook
export class PopularLinesOfBusinessComponent implements OnInit {
  //created properties to show
  firstPopular = "First Most Popular"
  secondPopular = "Second Most Popular"
  firstFreq;
  secondFreq;

  // ---- count frequency of each line of business
  countFreq(data: any, busData: any) {
    console.log("who's driving the busData? ", busData)

    //instad of hard-coding this dataObj,
    //I want to create it from busData

    //declare dataObj as an empty object
    let dataObj : [] = [];
    //loop over busData
    for (let i= 0; i < busData.length; i++){
      let name: string = busData[i].name
      //create key value pair for dataObj
      dataObj[name] = 0; 
    }
    console.log("dataObj2: ", dataObj)

    // // hard-coded
    // let dataObj = {
    // generalLiability : 0,
    // commercialProperty : 0,
    // inlandMarine: 0,
    // oceanMarine: 0,
    // garage : 0,
    // }

    // loop over quote data
    //for each line, increase count in value of corresponding business property
    //maybe change this to a switch statement for brevity
    for(let i = 0;i< data.length ;i++) {

      //this may need a loop inside a loop
      //if the data[i].lineOfBusiness == busData[j].id 
      //then add 1 to
      //dataObj[busData[j].name]
      //may have hard time finding how to get the variable busData[j].name
      if(data[i].lineOfBusiness == 11 ){
        // dataObj.generalLiability = dataObj.generalLiability +1;
        
      }if(data[i].lineOfBusiness == 12 ) {
        // dataObj.commercialProperty = dataObj.commercialProperty +1
      }if(data[i].lineOfBusiness == 13 ) {
        // dataObj.inlandMarine = dataObj.inlandMarine +1
      }if(data[i].lineOfBusiness == 14 ) {
        // dataObj.oceanMarine = dataObj.oceanMarine +1
      }if(data[i].lineOfBusiness == 15 ) {
        // dataObj.garage = dataObj.garage +1
      }
    }
    return dataObj
  } 

  // ------- find the two most popular

  findTwoHighest(freqCountArr) {
    // convert the data object to an array of arrays
    freqCountArr = Object.entries
    
    // define sorted variable
    let sorted =freqCountArr.sort((a, b) => b[1] - a[1])

    // assign values to properties based on sorted array or arrays
    this.firstPopular = sorted[0][0]
    this.secondPopular = sorted[1][0]
    this.firstFreq = sorted[0][1]
    this.secondFreq = sorted[1][1]

    return 
}

  // ----GET recent quotes data ----
  quotes: RecentQuote[] = [];

  // to structure? access?
  linesOfBusiness: LineOfBusiness[] = [];


  constructor(
    private recentQuotesService: RecentQuotesService,
    private lineOfBusinessService: LineOfBusinessService
  ) { } 
  


  ngOnInit() {
    let quoteData: any;
    let businessData: any;
    this.recentQuotesService.getRecentQuotes().subscribe((data: RecentQuote[])=> {
      quoteData = data;
      // console.log("quoteData outside: ", quoteData)
      // this.findTwoHighest(this.countFreq(quoteData))
      
      // this line works, without quoteData
      // this.findTwoHighest(this.countFreq(data))
    })
    this.lineOfBusinessService.getLinesOfBusiness().subscribe((data: LineOfBusiness[])=> {
      // console.log("what data do we have here?", data)
      businessData = data;
      this.countFreq(quoteData, businessData)

      //with one parameter in countFreq this works here
      // this.findTwoHighest(this.countFreq(quoteData))
    })
    
  }
}


