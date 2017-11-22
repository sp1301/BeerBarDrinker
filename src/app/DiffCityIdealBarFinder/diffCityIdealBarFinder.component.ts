import { Component, OnInit,Input } from '@angular/core';
import { WebService } from '../web.service';
import { ActivatedRoute, ParamMap, Router, Params, NavigationEnd  } from '@angular/router';

import { IdealBarMatch } from "app/model.client/IdealBarMatch";
import { UserDiffCity } from "app/model.client/UserDiffCity";

@Component({
  selector: 'diffCityIdealBarFinder',
  templateUrl: './diffCityIdealBarFinder.component.html'
})
export class DiffCityIdealBarFinder implements OnInit {
  // instantiate posts to an empty array


  constructor(         
    private webService: WebService,
    private router: Router,
    private route: ActivatedRoute
    ) { }
    rateBar:string = "";
    userDetail:string[] = [];

    user: UserDiffCity = {        
    Name: "",
    PhoneNum: "",
    City: ""
    };

    Bars:IdealBarMatch[] = [];

    ResultMessage: string = "";


    ngOnInit() {
     this.getNameandUser();
  }



    getNameandUser(): void {
        this.route.params.subscribe((params: Params) => {
            let user = params['userCitydetailPop'];
            this.userDetail = user.split(",");
            //console.log(this.userDetail);
            this.user.Name = this.userDetail[0];
            this.user.PhoneNum = this.userDetail[1];
            this.user.City = this.userDetail[2];
            //console.log(this.user);

            this.webService.getIdealMatchCity(this.user).subscribe(res => {
            this.Bars = res;
            console.log(this.Bars);
            });
        });                    
    }
}