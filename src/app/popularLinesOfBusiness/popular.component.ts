import { Component, OnInit } from '@angular/core';

import { LineOfBusiness } from '../LineOfBusiness';
import { LineOfBusinessService } from '../lineOfBusiness.service';

import { RecentQuote } from '../RecentQuote';
import { RecentQuotesService } from '../recentQuotes.service';


@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: [ './popular.component.css' ]
})

export class PopularLinesOfBusinessComponent implements OnInit {
  //properties to show
  firstPopular = "First Most Popular"
  secondPopular = "Second Most Popular"
  firstFreq;
  secondFreq;

  // use data from both tables
  //to create a list of business types
  //one for each time they are quoted
  createPopData(quoteData: any, busData: any){
    //combine both sets of data to get only what we need: name (as many times as it is quoted) 
    let popDataArr: any[] = [];
    //loop over ALL quote data, bc need a name
    //forEach quote data line, 
    quoteData.forEach((element) =>{
      //loop over busData
      for (let i = 0; i < busData.length; i++){
        //find the busData id that matches the quoteData 
        if(busData[i].id == element.lineOfBusiness){
          //push the name  to a popDataArr
          popDataArr.push(busData[i].name)
        } 
      }
    })
    return popDataArr
  }

  //createCountTable makes an array of arrays
  //each inner array has a business type name and 0 as its initial value
  createCountTable( busData: any) {
    //declare countTable as an empty array that can hold arrays
    let countTable : any[] = [];
    //loop over busData
    for (let i= 0; i < busData.length; i++){
      let name: string = busData[i].name
      //push array of business type name and 0 to countTable
      countTable.push([name, 0])
    }
    return countTable
  }

  //count frequency of each line of business
  countFreq(data: any, table: any) {
    //for each line, increase count in value of corresponding business type
    for(let i = 0;i< data.length ;i++) {
      //loop over the table to find the right spot
      for (let j = 0; j < table.length; j++) {
        if(data[i] == table[j][0]){
          //add one count to corresponding business typ name in table
          table[j][1] = table[j][1] + 1
          console.log("table", table)
        }
      }
    }
    return table
  } 

  // find the two most popular type of quotes
  findTwoHighest(freqCountArr: any) {
    // sort array by the number of each type
    let sorted =freqCountArr.sort((a: any, b: any) => b[1] - a[1])
    // assign values to properties based on sorted array or arrays
    this.firstPopular = sorted[0][0]
    this.secondPopular = sorted[1][0]
    this.firstFreq = sorted[0][1]
    this.secondFreq = sorted[1][1]
    return 
}

  // ----GET recent quotes data ----
  quotes: RecentQuote[] = [];
  linesOfBusiness: LineOfBusiness[] = [];

  constructor(
    private recentQuotesService: RecentQuotesService,
    private lineOfBusinessService: LineOfBusinessService
  ) { } 

  ngOnInit() {
    let quoteData: any;
    let businessData: any;
    //get the quote data
    this.recentQuotesService.getRecentQuotes().subscribe((data: RecentQuote[])=> {
      quoteData = data;
    })
    //get the line of business data
    this.lineOfBusinessService.getLinesOfBusiness().subscribe((data: LineOfBusiness[])=> {
      businessData = data;
      this.findTwoHighest(this.countFreq(this.createPopData(quoteData, businessData), this.createCountTable(businessData)))
    })
  }
}


