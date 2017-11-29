
import { Component,Input } from '@angular/core';
import { WebService } from '../web.service';
import { CheckResult } from "app/model.client/CheckResult";

@Component({
  selector: 'patterns',
  templateUrl: './patterns.component.html'
})
export class Patterns{
  // instantiate posts to an empty array


  constructor(         
    private webService: WebService
    ) { }

  	BeerMessage:string = "";
  	CityMessage:string = "";

  	BeerChecked:CheckResult[] = [];
	CityChecked:CheckResult[] = [];

    BeerCheck(): void {
    	this.webService.beerCheck().subscribe(res => {
            this.BeerChecked = res;
            console.log(this.BeerChecked);

            if(this.BeerChecked[0].result == '0'){
            	this.BeerMessage = 'No'
            }
            else{
            	this.BeerMessage = 'Yes'
            }
            });
    }
    CityCheck(): void {
    	this.webService.cityCheck().subscribe(res => {
            this.CityChecked = res;
            console.log(this.CityChecked);

            if(this.CityChecked[0].result == '0'){
            	this.CityMessage = 'No'
            }
            else{
            	this.CityMessage = 'Yes'
            }
            });
    }
}