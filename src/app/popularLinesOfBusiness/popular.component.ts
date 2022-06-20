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

  // create popular data object or array that combines
  //data from each table - quote and business
  //would rather have the GET request do this 
  createPopData(quoteData: any, busData: any){
    // console.log("did I getcha all? quoteData and busData in createPopData: ", quoteData, busData)
    //combine both sets of data to get only what we need: name, 
    //to create an array of only the data neeeded
    let popDataArr: any[] = [];
    //nested loop/ forEach
    //loop over ALL quote data,bc each needs a name
    //forEach quote data line, 
    quoteData.forEach((element) =>{
      // console.log("element in forEach: ", element)

      //loop over bus data
      //inner loop is busData, bc we only need to look at this until we find the name that matches the quoteData id
      for (let i = 0; i < busData.length; i++){
        //find the bus data id that matches the quoteData 
        if(busData[i].id == element.lineOfBusiness){
          //push the name  to a popDataArr
          popDataArr.push(busData[i].name)
          // console.log("popDataArr after push: ", popDataArr)
        } 
      }
    })
    return popDataArr
  }

  //createCountTable makes an empty array
  createCountTable( busData: any) {
    console.log("in createCountTable()")
    //instad of hard-coding this countTable (formerly dataObj),
    //create it from busData

    //declare countTable as an empty object
    let countTable : any[] = [];
    //loop over busData
    for (let i= 0; i < busData.length; i++){
      let name: string = busData[i].name
      // //create key value pair for countTable
      // countTable[name] = 0; 
      countTable.push([name, 0])
    }
    // console.log("countTable: ", countTable)
    return countTable
  }

  // ---- count frequency of each line of business
  countFreq(data: any, table: any) {
    console.log("table: ", table)
    // ---working build of dataObj -----

    //instad of hard-coding this dataObj,
    //I want to create it from busData

    //declare dataObj as an empty object
    // let dataObj : [] = [];
    // //loop over busData
    // for (let i= 0; i < busData.length; i++){
    //   let name: string = busData[i].name
    //   //create key value pair for dataObj
    //   dataObj[name] = 0; 
    // }
    // console.log("dataObj: ", dataObj)
// ------ end working dataObj ----

    // // ----hard-coded table; not from business data -----
    // let dataObj = {
    // generalLiability : 0,
    // commercialProperty : 0,
    // inlandMarine: 0,
    // oceanMarine: 0,
    // garage : 0,
    // }
    // ----END hard-coded table; not from business data -----

     // ------hard coded sorting/ assignment of table 
      // if(data[i].lineOfBusiness == 11 ){
        // table.generalLiability = table.generalLiability +1;
        
      // }if(data[i].lineOfBusiness == 12 ) {
      //   // table.commercialProperty = table.commercialProperty +1
      // }if(data[i].lineOfBusiness == 13 ) {
      //   // table.inlandMarine = table.inlandMarine +1
      // }if(data[i].lineOfBusiness == 14 ) {
      //   // table.oceanMarine = table.oceanMarine +1
      // }if(data[i].lineOfBusiness == 15 ) {
      //   // table.garage = table.garage +1
      // }
    // }
    // return dataObj
      // ------ END hard coded sorting/ assignment of table 


    // loop over data
    //for each line, increase count in value of corresponding business type
    for(let i = 0;i< data.length ;i++) {
      //loop over the table to find the right spot
      for (let j = 0; j < table.length; j++) {
        if(data[i] == table[j][0]){
          // console.log("data[i] = table[i][0]: ", data[i], table[j][0])
          table[j][1] = table[j][1] + 1
          console.log("table", table)
          //how to make this stop once it's found the correct spot in the table?
        }
      }
    }
    return table
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
      this.countFreq(this.createPopData(quoteData, businessData), this.createCountTable(businessData))

      //!!!make this work with table returned from countFreq
      // this.findTwoHighest(this.countFreq(quoteData))
    })
    
  }
}


