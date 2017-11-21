import { Component, OnInit,Input } from '@angular/core';
import { WebService } from '../web.service';
import { ActivatedRoute, ParamMap, Router, Params, NavigationEnd  } from '@angular/router';
import { User } from "app/model.client/User";
import { UserLoginDetails } from "app/model.client/UserLoginDetails";
import { PopularBar } from "app/model.client/PopularBar";

@Component({
  selector: 'outOfCity',
  templateUrl: './outOfCity.component.html'
})
export class OutOfCity implements OnInit {
  // instantiate posts to an empty array


  constructor(         
    private webService: WebService,
    private router: Router,
    private route: ActivatedRoute
    ) { }
    userDetail:string[] = [];
    user: UserLoginDetails = {        
    name: "",
    phone: ""
    };
    userFullDetail:User;
    Bars:PopularBar[] = [];
    load:string = "";


    ngOnInit() {
     this.getNameandUser();
  }



    getNameandUser(): void {
        this.route.params.subscribe((params: Params) => {
            let user = params['userdetailoutof'];
            this.userDetail = user.split(",");
            //console.log(this.userDetail);
            this.user.name = this.userDetail[0];
            this.user.phone = this.userDetail[1];
            //console.log(this.user);

            this.webService.getUser(this.user).subscribe(res => {
            this.userFullDetail = res[0];
            this.load = "One Second Please.";
            this.webService.getOutOfCity(this.userFullDetail).subscribe(res => {
            this.Bars = res;
            console.log(this.Bars);
            this.load = "";
            });
        });                    
        });

    }
}