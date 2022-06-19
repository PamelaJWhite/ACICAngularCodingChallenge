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
  countFreq(data) {
  
    let dataObj = {
    generalLiability : 0,
    commercialProperty : 0,
    inlandMarine: 0,
    oceanMarine: 0,
    garage : 0,
    }

    // loop over quote data
    //for each line, increase count in value of corresponding business property
    //maybe change this to a switch statement for brevity
    for(let i = 0;i< data.length ;i++) {
      if(data[i].lineOfBusiness == 11 ){
        dataObj.generalLiability = dataObj.generalLiability +1;
      }if(data[i].lineOfBusiness == 12 ) {
        dataObj.commercialProperty = dataObj.commercialProperty +1
      }if(data[i].lineOfBusiness == 13 ) {
        dataObj.inlandMarine = dataObj.inlandMarine +1
      }if(data[i].lineOfBusiness == 14 ) {
        dataObj.oceanMarine = dataObj.oceanMarine +1
      }if(data[i].lineOfBusiness == 15 ) {
        dataObj.garage = dataObj.garage +1
      }
    }
    return dataObj
  } 

  // ------- find the two most popular

  findTwoHighest(freqCountArr){
    // convert the data object to an array of arrays
    freqCountArr = Object.entries(freqCountArr)
    
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

  constructor(private recentQuotesService: RecentQuotesService) { } 

  ngOnInit() {
    this.recentQuotesService.getRecentQuotes().subscribe((data: RecentQuote[])=> {
    
      this.findTwoHighest(this.countFreq(data))
    })
  }
}


