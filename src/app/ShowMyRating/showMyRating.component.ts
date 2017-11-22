import { Component, OnInit,Input } from '@angular/core';
import { WebService } from '../web.service';
import { ActivatedRoute, ParamMap, Router, Params, NavigationEnd  } from '@angular/router';
import { User } from "app/model.client/User";
import { UserLoginDetails } from "app/model.client/UserLoginDetails";
import { BarRatingUsers } from "app/model.client/BarRatingUsers";
import { BarRating } from "app/model.client/BarRating";
import { BarUpdate } from "app/model.client/BarUpdate";
@Component({
  selector: 'showMyRating',
  templateUrl: './showMyRating.component.html'
})
export class ShowMyRating implements OnInit {
  // instantiate posts to an empty array


  constructor(         
    private webService: WebService,
    private router: Router,
    private route: ActivatedRoute
    ) { }
    userDetail:string[] = [];
    rateBar:string = "";
    newRating: BarUpdate = {
    Name: "",
    PhoneNum: "",
    Bar: "",
    rating: ""
    };
    ResultMessage:string = "";
    user: UserLoginDetails = {        
    name: "",
    phone: ""
    };
    userFullDetail:User;
    Bars:BarRatingUsers[] = [];
    barRating: BarRating = {
    Name: "",
    PhoneNum: "",
    bar: "",
    rating: ""
    };
    load:string = "";


    ngOnInit() {
     this.getNameandUser();
  }



    getNameandUser(): void {
        this.route.params.subscribe((params: Params) => {
            let user = params['userdetailmyrating'];
            this.userDetail = user.split(",");
            //console.log(this.userDetail);
            this.user.name = this.userDetail[0];
            this.user.phone = this.userDetail[1];
            //console.log(this.user);

            this.webService.getUser(this.user).subscribe(res => {
            this.userFullDetail = res[0];
            this.load = "One Second Please.";
            this.webService.getMyRatings(this.userFullDetail).subscribe(res => {
            this.Bars = res;
            console.log(this.Bars);
            this.load = "";
            });
        });                    
        });
    }

    UpdateRating(barName:string, Rating:string):void{
      console.log(barName +"     "+ Rating + "  " + this.rateBar);
      if(parseInt(Rating) != parseInt(this.rateBar)){

          if(parseInt(this.rateBar) >= 1 && parseInt(this.rateBar) <= 10){
              this.newRating.Name = this.user.name;
              this.newRating.PhoneNum = this.user.phone;
              this.newRating.Bar = barName;
              this.newRating.rating = this.rateBar;

              this.webService.getUpdateRating(this.newRating).subscribe(res => {
                  console.log(res);
                  Rating = this.newRating.rating;

                  this.ResultMessage = "Updated: go back home then come back to see changed";
              });
          }
          else{
            this.ResultMessage = "Please Enter 1-10";
          }
      }
      else{
          this.ResultMessage = "Please Do Not Enter The Same Rating";
      }


    }

}