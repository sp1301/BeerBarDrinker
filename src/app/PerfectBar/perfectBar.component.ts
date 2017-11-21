import { Component, OnInit,Input } from '@angular/core';
import { WebService } from '../web.service';
import { ActivatedRoute, ParamMap, Router, Params, NavigationEnd  } from '@angular/router';
import { User } from "app/model.client/User";
import { UserLoginDetails } from "app/model.client/UserLoginDetails";
import { PerfectBars } from "app/model.client/PerfectBars";
import { ResResult } from "app/model.client/ResResult";
import { BarRating } from "app/model.client/BarRating";

@Component({
  selector: 'perfectBar',
  templateUrl: './perfectBar.component.html'
})
export class PerfectBar implements OnInit {
  // instantiate posts to an empty array


  constructor(         
  	private webService: WebService,
    private router: Router,
    private route: ActivatedRoute
    ) { }
    resResult: ResResult[] = [];
    barRating: BarRating = {
    Name: "",
    PhoneNum: "",
    bar: "",
    rating: ""
    };
    rateBar:string = "";
  	userDetail:string[] = [];
    user: UserLoginDetails = {        
    name: "",
    phone: ""
    };
    userFullDetail:User;
    Bars: PerfectBars[] = [];
    Message: string = "";

    ResultMessage: string = "";

    ngOnInit() {
     this.getNameandUser();
  }



    getNameandUser(): void {
        this.Message = "";
        this.route.params.subscribe((params: Params) => {
            let user = params['userdetailperfect'];
            this.userDetail = user.split(",");
            //console.log(this.userDetail);
            this.user.name = this.userDetail[0];
            this.user.phone = this.userDetail[1];
            //console.log(this.user);

            this.webService.getUser(this.user).subscribe(res => {
      			this.userFullDetail = res[0];
            this.Message = "One Second Please."
      			this.webService.getPerfectBar(this.userFullDetail).subscribe(res => {
            this.Bars = res;
      			console.log(this.Bars);

            if(this.Bars.length < 1){
              this.Message = "There Is No Perfect Bar Near You, Unlucky.";
            }
      			});
    		});										
        });

    }
    SubmitRate(barName:string):void{
      console.log(barName +"     "+ this.rateBar);

      if(parseInt(this.rateBar) >= 1 && parseInt(this.rateBar) <= 10){
      this.webService.checkRateTable(this.user, barName).subscribe(res => {
        this.resResult = res;

        if(this.resResult[0].results == '0'){
          console.log(this.resResult[0].results);
          this.barRating.Name = this.user.name;
          this.barRating.PhoneNum = this.user.phone;
          this.barRating.bar = barName;
          this.barRating.rating = this.rateBar;
          this.webService.putRating(JSON.stringify(this.barRating));
          this.ResultMessage = "Rating Inputted";
        }
        else{
          console.log(this.resResult[0].results);
          this.ResultMessage = "Already Rated This Bar";
        }
      });
      }
      else{
        this.ResultMessage = "Please Enter 1-10";
      }
    }
}