import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { WebService } from '../web.service';

import { UserLoginDetails } from "app/model.client/UserLoginDetails";
import { User } from "app/model.client/User";

@Component({
  selector: 'app-existUserForm',
  templateUrl: './existUserForm.component.html'
})
export class ExistUserFormComponent implements OnInit {
  // instantiate posts to an empty array


  constructor( private webService: WebService, private router: Router, private route: ActivatedRoute) { }
  inputName:string = "";
  inputPhone:string = "";
  Message:string = "";
  returnString:string = "";
  returnUser:User[] = [];
  LikedBool: boolean = false;
  IdealBool: boolean = false;
  CheapBeerBool:boolean = false;
  PerfectBool:boolean = false;
  BarMusBool:boolean = false;
  PopBarBool:boolean = false;
  OutoFBool:boolean = false;
  MinMaxBool:boolean = false;

    user: UserLoginDetails = {        
    name: "",
    phone: ""
    };

    ngOnInit() {
    //console.log(this.userInfo)
  }

  Liked(){
      if(this.inputName == "" || this.inputPhone == "")
    {
      this.Message = "Please Fill The Whole Form";
      return;
    }
    else{
      this.user.name  = this.inputName;
      this.user.phone  = this.inputPhone;
      //console.log(this.userInfo);
      this.webService.getUser(this.user).subscribe(res => {
      this.returnString = JSON.stringify(res);
      this.returnUser = JSON.parse(this.returnString);
      //console.log(this.returnUser);
      if(this.returnUser.length > 0){
      //console.log(this.users);
      this.LikedBool = true;
      this.IdealBool = false;
      this.CheapBeerBool = false;
      this.PerfectBool = false;
      this.BarMusBool = false;
      this.PopBarBool = false;
      this.OutoFBool = false;
      this.MinMaxBool = false;
      this.router.navigate([`/existUserForm`, { outlets: { 'user': [this.user.name  +','+ this.user.phone], 'userideal': [], 'usercheapbeer':[], 'userperfect':[], 'userbarmus':[], 'userpopbar':[], 'useroutof':[], 'userminmax':[]} }], { relativeTo: this.route });
      }

    });
    }
  }



    Ideal(){
      if(this.inputName == "" || this.inputPhone == "")
    {
      this.Message = "Please Fill The Whole Form";
      return;
    }
    else{
      this.user.name  = this.inputName;
      this.user.phone  = this.inputPhone;
      //console.log(this.userInfo);
      this.webService.getUser(this.user).subscribe(res => {
      this.returnString = JSON.stringify(res);
      this.returnUser = JSON.parse(this.returnString);
      //console.log(this.returnUser);
      if(this.returnUser.length > 0){
      //console.log(this.users);
      this.LikedBool = false;
      this.IdealBool = true;
      this.CheapBeerBool = false;
      this.PerfectBool = false;
      this.BarMusBool = false;
      this.PopBarBool = false;
      this.OutoFBool = false;
      this.MinMaxBool = false;
      this.router.navigate([`/existUserForm`, { outlets: { 'userideal': [this.user.name  +','+ this.user.phone], 'user': [], 'usercheapbeer':[], 'userperfect':[], 'userbarmus':[], 'userpopbar':[], 'useroutof':[], 'userminmax':[]} }], { relativeTo: this.route });
      }

    });
    }
  }

      CheapBeer(){
      if(this.inputName == "" || this.inputPhone == "")
    {
      this.Message = "Please Fill The Whole Form";
      return;
    }
    else{
      this.user.name  = this.inputName;
      this.user.phone  = this.inputPhone;
      //console.log(this.userInfo);
      this.webService.getUser(this.user).subscribe(res => {
      this.returnString = JSON.stringify(res);
      this.returnUser = JSON.parse(this.returnString);
      //console.log(this.returnUser);
      if(this.returnUser.length > 0){
      //console.log(this.users);
      this.LikedBool = false;
      this.IdealBool = false;
      this.CheapBeerBool = true;
      this.PerfectBool = false;
      this.BarMusBool = false;
      this.PopBarBool = false;
      this.OutoFBool = false;
      this.MinMaxBool = false;
      this.router.navigate([`/existUserForm`, { outlets: {  'usercheapbeer':[this.user.name  +','+ this.user.phone], 'userideal': [], 'user': [], 'userperfect':[], 'userbarmus':[], 'userpopbar':[], 'useroutof':[], 'userminmax':[]} }], { relativeTo: this.route });
      }

    });
    }
  }
      PerfectBarFind(){
      if(this.inputName == "" || this.inputPhone == "")
    {
      this.Message = "Please Fill The Whole Form";
      return;
    }
    else{
      this.user.name  = this.inputName;
      this.user.phone  = this.inputPhone;
      //console.log(this.userInfo);
      this.webService.getUser(this.user).subscribe(res => {
      this.returnString = JSON.stringify(res);
      this.returnUser = JSON.parse(this.returnString);
      //console.log(this.returnUser);
      if(this.returnUser.length > 0){
      //console.log(this.users);
      this.LikedBool = false;
      this.IdealBool = false;
      this.CheapBeerBool = false;
      this.PerfectBool = true;
      this.BarMusBool = false;
      this.PopBarBool = false;
      this.OutoFBool = false;
      this.MinMaxBool = false;
      this.router.navigate([`/existUserForm`, { outlets: {  'userperfect':[this.user.name  +','+ this.user.phone], 'usercheapbeer':[], 'userideal': [], 'user': [], 'userbarmus':[], 'userpopbar':[], 'useroutof':[], 'userminmax':[]} }], { relativeTo: this.route });
      }

    });
    }
  }

      BarMusFind(){
      if(this.inputName == "" || this.inputPhone == "")
    {
      this.Message = "Please Fill The Whole Form";
      return;
    }
    else{
      this.user.name  = this.inputName;
      this.user.phone  = this.inputPhone;
      //console.log(this.userInfo);
      this.webService.getUser(this.user).subscribe(res => {
      this.returnString = JSON.stringify(res);
      this.returnUser = JSON.parse(this.returnString);
      //console.log(this.returnUser);
      if(this.returnUser.length > 0){
      //console.log(this.users);
      this.LikedBool = false;
      this.IdealBool = false;
      this.CheapBeerBool = false;
      this.PerfectBool = false;
      this.BarMusBool = true;
      this.PopBarBool = false;
      this.OutoFBool = false;
      this.MinMaxBool = false;
      this.router.navigate([`/existUserForm`, { outlets: { 'userbarmus':[this.user.name  +','+ this.user.phone], 'userperfect':[], 'usercheapbeer':[], 'userideal': [], 'user': [], 'userpopbar':[], 'useroutof':[], 'userminmax':[]} }], { relativeTo: this.route });
      }

    });
    }
  }
  PopBarfind(){
      if(this.inputName == "" || this.inputPhone == "")
    {
      this.Message = "Please Fill The Whole Form";
      return;
    }
    else{
      this.user.name  = this.inputName;
      this.user.phone  = this.inputPhone;
      //console.log(this.userInfo);
      this.webService.getUser(this.user).subscribe(res => {
      this.returnString = JSON.stringify(res);
      this.returnUser = JSON.parse(this.returnString);
      //console.log(this.returnUser);
      if(this.returnUser.length > 0){
      //console.log(this.users);
      this.LikedBool = false;
      this.IdealBool = false;
      this.CheapBeerBool = false;
      this.PerfectBool = false;
      this.BarMusBool = false;
      this.PopBarBool = true;
      this.OutoFBool = false;
      this.MinMaxBool = false;
      this.router.navigate([`/existUserForm`, { outlets: { 'userpopbar':[this.user.name  +','+ this.user.phone], 'userbarmus':[], 'userperfect':[], 'usercheapbeer':[], 'userideal': [], 'user': [], 'useroutof':[], 'userminmax':[]} }], { relativeTo: this.route });
      }

    });
    }
  }
  OutOf(){
      if(this.inputName == "" || this.inputPhone == "")
    {
      this.Message = "Please Fill The Whole Form";
      return;
    }
    else{
      this.user.name  = this.inputName;
      this.user.phone  = this.inputPhone;
      //console.log(this.userInfo);
      this.webService.getUser(this.user).subscribe(res => {
      this.returnString = JSON.stringify(res);
      this.returnUser = JSON.parse(this.returnString);
      //console.log(this.returnUser);
      if(this.returnUser.length > 0){
      //console.log(this.users);
      this.LikedBool = false;
      this.IdealBool = false;
      this.CheapBeerBool = false;
      this.PerfectBool = false;
      this.BarMusBool = false;
      this.PopBarBool = false;
      this.OutoFBool = true;
      this.MinMaxBool = false;
      this.router.navigate([`/existUserForm`, { outlets: { 'useroutof':[this.user.name  +','+ this.user.phone], 'userpopbar':[], 'userbarmus':[], 'userperfect':[], 'usercheapbeer':[], 'userideal': [], 'user': [], 'userminmax':[]} }], { relativeTo: this.route });
      }

    });
    }
  }
  minMax(){
      if(this.inputName == "" || this.inputPhone == "")
    {
      this.Message = "Please Fill The Whole Form";
      return;
    }
    else{
      this.user.name  = this.inputName;
      this.user.phone  = this.inputPhone;
      //console.log(this.userInfo);
      this.webService.getUser(this.user).subscribe(res => {
      this.returnString = JSON.stringify(res);
      this.returnUser = JSON.parse(this.returnString);
      //console.log(this.returnUser);
      if(this.returnUser.length > 0){
      //console.log(this.users);
      this.LikedBool = false;
      this.IdealBool = false;
      this.CheapBeerBool = false;
      this.PerfectBool = false;
      this.BarMusBool = false;
      this.PopBarBool = false;
      this.OutoFBool = false;
      this.MinMaxBool = true;
      this.router.navigate([`/existUserForm`, { outlets: { 'userminmax':[this.user.name  +','+ this.user.phone], 'useroutof':[], 'userpopbar':[], 'userbarmus':[], 'userperfect':[], 'usercheapbeer':[], 'userideal': [], 'user': []} }], { relativeTo: this.route });
      }

    });
    }
  }

}