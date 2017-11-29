import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { PostsComponent } from 'app/posts/posts.component';
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

const ROUTES = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
  path: 'existUserForm', component: ExistUserFormComponent, 
    children: [
      { path: ':userdetail', component: BarFinder, outlet: 'user' },
      { path: ':userdetailideal', component: IdealBarFinder, outlet: 'userideal' },
      { path: ':userdetailcheapbeer', component: CheapestBeerBar, outlet: 'usercheapbeer' },
      { path: ':userdetailperfect', component: PerfectBar, outlet: 'userperfect' },
      { path: ':userdetailbarmus', component: BartenderMusicBar, outlet: 'userbarmus' },
      { path: ':userdetailpopbar', component: PopBar, outlet: 'userpopbar' },
      { path: ':userdetailoutof', component: OutOfCity, outlet: 'useroutof' },
      { path: ':userdetailminmax', component: BeerPattern, outlet: 'userminmax' },
      { path: ':userdetailmyrating', component: ShowMyRating, outlet: 'usermyrating' }
    ]
  },
  {
  path: 'barsAtDiffrentCities', component: BarsAtDiffrentCities, 
    children: [
      { path: ':userCitydetailPop', component: DiffCityIdealBarFinder, outlet: 'userCityPop'}
    ]
  },
  {
    path: 'newUserForm',
    component: NewUserFormComponent
  },
  {
    path: 'patterns',
    component: Patterns
  }

];

@NgModule({
    imports: [RouterModule.forRoot(ROUTES)],
    exports: [RouterModule]
})
export class AppRoutingModule { }