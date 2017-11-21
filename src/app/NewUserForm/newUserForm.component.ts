import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { WebService } from '../web.service';

import { User } from "app/model.client/User";
import { Beers } from "app/model.client/Beers";
import { BeersDropDown } from "app/model.client/BeersDropDown";
import { PutBeersLike } from "app/model.client/PutBeersLike";
import { UserLoginDetails } from "app/model.client/UserLoginDetails";

@Component({
  selector: 'app-newUserForm',
  templateUrl: './newUserForm.component.html'
})
export class NewUserFormComponent implements OnInit {
  // instantiate posts to an empty array


  constructor( private webService: WebService, private router: Router) { }

  musicdropdown: string = "Preferred Music Genre";
  personalitydropdown: string = "Persionality";
  Message:string = "";
  userInfo: User = {        
    Name: "",
    City: "",
    PhoneNum: "",
    Age: "",
    PrefTime: "",
    Music: "Preferred Music Genre",
    Personality: "Persionality"
      };
  inputName:string = "";
  inputCity:string = "";
  inputPhone:string = "";
  inputAge:string = "";
  inputHappy:string = "";
  beers:Beers[] = [];
  beersDropDown:BeersDropDown[] = [];
  PutBeersLike:PutBeersLike[] = [];
  returnUser:User[] = [];
  i:number = 0;


  userCheck: UserLoginDetails = {        
    name: "",
    phone: ""
  };

  music: string[] = [
  	"Classical",
	"Hip-Hop",
	"Jazz",
	"Country",
	"R&B",
	"Electronic",
	"International",
	"Pop",
	"Rock",
	"Blues",
	"Reggae"
  ];

  personality: string[] = [
    "Loud",
    "Quite",
    "Moderate"
  ];

   dropdownList = [];
    selectedItems = [];
    dropdownSettings = {};




  ngOnInit() {
    this.webService.getBeers().subscribe(res => {
      this.beers = res;
      //console.log(JSON.stringify(this.beers));
      this.beers.forEach(entry =>{
        this.i++;
        var temp = { 
          id:this.i, 
          itemName: entry.Beer 
        };
        this.beersDropDown.push(temp);
      });
      this.dropdownList = this.beersDropDown;
      //console.log(this.dropdownList);
    });
        this.dropdownSettings = { 
                                  singleSelection: false, 
                                  text:"Select Beers",
                                  selectAllText:'Select All',
                                  unSelectAllText:'UnSelect All',
                                  enableSearchFilter: true,
                                  classes:"myclass custom-class"
                                };   
  }


  updatePersonalityDropDown(picked:string):void{
    this.personalitydropdown = picked;
    //console.log(picked);
  }

    updateMusicDropDown(picked:string):void{
    this.musicdropdown = picked;
    //console.log(picked);
  }



  Submit():void{

    
    this.userInfo.Name = this.inputName;
    this.userInfo.City = this.inputCity;
    this.userInfo.PhoneNum = this.inputPhone;
    this.userInfo.Age = this.inputAge;
    this.userInfo.PrefTime = this.inputHappy;
    this.userInfo.Music = this.musicdropdown;
    this.userInfo.Personality = this.personalitydropdown;
    this.userCheck.name = this.inputName;
    this.userCheck.phone = this.inputPhone;
    //console.log(this.userInfo);
    if(
      this.userInfo.Name == "" || 
      this.userInfo.City == "" || 
      this.userInfo.PhoneNum == "" || 
      this.userInfo.Age == "" || 
      this.userInfo.PrefTime == "" || 
      this.userInfo.Music  == "Preferred Music Genre"|| 
      this.userInfo.Personality == "Persionality")
    {
      this.Message = "Please Fill The Whole Form";
      return;
    }
    else{
      this.webService.getUser(this.userCheck).subscribe(res => {
        this.returnUser = res;
        console.log(this.returnUser.length);
        console.log(this.returnUser);
              if(this.returnUser.length == 0){
                      this.Message = "" + this.userInfo.Name + ": Saved"
                      this.webService.putUser(JSON.stringify(this.userInfo));
                      this.webService.putLikeBeers(this.PutBeersLike);
                      this.router.navigate([`/existUserForm`]);
              }
              else{
                this.Message = "" + this.userInfo.Name + " is already in the Database";
              }

      });
    }




  }




    onItemSelect(item:any){
      console.log(item);
      console.log(this.selectedItems);
      this.PutBeersLike = [];
      this.selectedItems.forEach(select =>{
          var temp = { 
            Beer:select.itemName, 
            Name: this.inputName
          };      

        this.PutBeersLike.push(temp);
      });
    }
    OnItemDeSelect(item:any){
        console.log(item);
        console.log(this.selectedItems);
        this.PutBeersLike = [];
        this.selectedItems.forEach(select =>{
            var temp = { 
              Beer:select.itemName, 
              Name: this.inputName
            };      

          this.PutBeersLike.push(temp);
        });      
    }
    onSelectAll(items: any){
        console.log(items);
        this.PutBeersLike = [];
        this.selectedItems.forEach(select =>{
            var temp = { 
              Beer:select.itemName, 
              Name: this.inputName
            };      

          this.PutBeersLike.push(temp);
        });
    }
    onDeSelectAll(items: any){
        console.log(items);
        this.PutBeersLike = [];
    }
}