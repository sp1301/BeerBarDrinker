import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';  
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';
import { NewUserFormComponent } from 'app/NewUserForm/newUserForm.component';
import { HomeComponent } from 'app/Home/home.component';
import { ExistUserFormComponent } from 'app/ExistUserForm/existUserForm.component';
import { BarFinder } from 'app/BarFinder/barFinder.component';
import { IdealBarFinder } from 'app/IdealBarFinder/idealBarFinder.component';
import { CheapestBeerBar } from 'app/CheapestBeerBar/cheapestBeerBar.component';
import { PerfectBar } from 'app/PerfectBar/perfectBar.component';
import { BartenderMusicBar } from 'app/BartenderMusicBar/bartenderMusicBar.component';
import { PopBar } from 'app/PopBar/popBar.component';
import { OutOfCity } from 'app/OutOfCity/outOfCity.component';
import { BeerPattern } from 'app/BeerPattern/beerPattern.component';
import { ShowMyRating } from 'app/ShowMyRating/showMyRating.component';
import { BarsAtDiffrentCities } from 'app/BarsAtDiffrentCities/barsAtDiffrentCities.component';
import { DiffCityIdealBarFinder } from 'app/DiffCityIdealBarFinder/diffCityIdealBarFinder.component';
import { Patterns } from 'app/Patterns/patterns.component';

import { WebService} from './web.service';
import { PostsService } from './posts.service';

import { AppRoutingModule } from './modules/app-routing.module';

import { KeysPipe } from './pipes/keys.pipe';

import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';



@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    NewUserFormComponent,
    HomeComponent,
    ExistUserFormComponent,
    BarFinder,
    IdealBarFinder,
    CheapestBeerBar,
    PerfectBar,
    BartenderMusicBar,
    PopBar,
    OutOfCity,
    BeerPattern,
    ShowMyRating,
    BarsAtDiffrentCities,
    DiffCityIdealBarFinder,
    Patterns,
    KeysPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    CommonModule,
    AngularMultiSelectModule
  ],
  providers: [PostsService,WebService],
  bootstrap: [AppComponent]
})
export class AppModule { }
