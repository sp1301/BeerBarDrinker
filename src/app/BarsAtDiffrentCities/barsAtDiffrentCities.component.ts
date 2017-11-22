import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { WebService } from '../web.service';

import { UserDiffCity } from "app/model.client/UserDiffCity";
import { User } from "app/model.client/User";
import { City } from "app/model.client/City";
import { UserLoginDetails } from "app/model.client/UserLoginDetails";


@Component({
  selector: 'barsAtDiffrentCities',
  templateUrl: './barsAtDiffrentCities.component.html'
})
export class BarsAtDiffrentCities implements OnInit {
  // instantiate posts to an empty array


  constructor( private webService: WebService, private router: Router, private route: ActivatedRoute) { }
  inputName:string = "";
  inputPhone:string = "";
  Message:string = "";
  returnString:string = "";
  returnUser:User[] = [];
  Cities:City[] = [];
  pickedCity:string = "Select City";

    userCity: UserDiffCity = {        
    Name: "",
    PhoneNum: "",
    City: ""
    };

    user: UserLoginDetails = {        
    name: "",
    phone: ""
    };

    ngOnInit() {
      this.getCities();
  }

  getCities() :void{
    this.webService.getAllCities().subscribe(res => {
      this.Cities = res;
    });
  }

  clicked(city:string){
    this.pickedCity = city;
    console.log(this.pickedCity);
  }



  lookUp():void{
    this.Message = "";
    if(this.inputName == "" || this.inputPhone == "" || this.pickedCity == "Select City")
    {
      this.Message = "Please Fill The Whole Form";
      return;
    }
    else{
      this.userCity.Name  = this.inputName;
      this.userCity.PhoneNum  = this.inputPhone;
      this.userCity.City  = this.pickedCity;
      this.user.name  = this.inputName;
      this.user.phone  = this.inputPhone;

      //console.log(this.userInfo);
      this.webService.getUser(this.user).subscribe(res => {
      this.returnString = JSON.stringify(res);
      this.returnUser = JSON.parse(this.returnString);
      //console.log(this.returnUser);
      if(this.returnUser.length > 0){
      this.router.navigate([`/barsAtDiffrentCities`, { outlets: { 'userCityPop': [this.userCity.Name  +','+ this.userCity.PhoneNum +','+ this.userCity.City]} }], { relativeTo: this.route });
      }
      else{
        this.Message =  this.inputName + " is Not In The Database.";
      }

    });    
    }
  }
}