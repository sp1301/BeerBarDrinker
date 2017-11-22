import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Headers} from '@angular/http';
import { UserLoginDetails } from "app/model.client/UserLoginDetails";
import { User } from "app/model.client/User";
import { PutBeersLike } from "app/model.client/PutBeersLike";
import { BarUpdate } from "app/model.client/BarUpdate";
import { UserDiffCity } from "app/model.client/UserDiffCity";

@Injectable()
export class WebService {

    constructor(private http: Http) { }
    
    putUser(user:String){
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this.http.put('/api/putUser', user,{ headers }).subscribe(
        data => {
            console.log(data.json());           
        });
    }

    putRating(bar:String){
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this.http.put('/api/putRating', bar,{ headers }).subscribe(
        data => {
            console.log(data.json());           
        });
    }

    getUser(user:UserLoginDetails){

        return this.http.get('/api/getUser?name='+ user.name + '&phone=' + user.phone)
        .map(res => res.json());
    }

    checkRateTable(user:UserLoginDetails, barName:string){
        return this.http.get('/api/checkRateTable?name='+ user.name + '&phone=' + user.phone + '&bar='+ barName)
                .map(res => res.json());
    }

    getSells(user:User){
        return this.http.get('/api/getSells?Name='+ user.Name + 
            '&City=' + user.City + 
            '&PhoneNum=' + user.PhoneNum + 
            '&Age=' + user.Age + 
            '&PrefTime=' + user.PrefTime + 
            '&Music=' + user.Music + 
            '&Personality=' + user.Personality)
        .map(res => res.json());
    }

    getIdealMatch(user:User){
        return this.http.get('/api/getIdealMatch?Name='+ user.Name + 
            '&City=' + user.City + 
            '&PhoneNum=' + user.PhoneNum + 
            '&Age=' + user.Age + 
            '&PrefTime=' + user.PrefTime + 
            '&Music=' + user.Music + 
            '&Personality=' + user.Personality)
        .map(res => res.json());
    }
    getIdealMatchCity(user:UserDiffCity){
        return this.http.get('/api/getIdealMatchCity?Name='+ user.Name + 
            '&City=' + user.City + 
            '&PhoneNum=' + user.PhoneNum)
        .map(res => res.json());
    }
    getCheapBeerBar(user:User){
        return this.http.get('/api/getCheapBeerBar?Name='+ user.Name + 
            '&City=' + user.City + 
            '&PhoneNum=' + user.PhoneNum + 
            '&Age=' + user.Age + 
            '&PrefTime=' + user.PrefTime + 
            '&Music=' + user.Music + 
            '&Personality=' + user.Personality)
        .map(res => res.json());
    }
    getPerfectBar(user:User){
        return this.http.get('/api/getPerfectBar?Name='+ user.Name + 
            '&City=' + user.City + 
            '&PhoneNum=' + user.PhoneNum + 
            '&Age=' + user.Age + 
            '&PrefTime=' + user.PrefTime + 
            '&Music=' + user.Music + 
            '&Personality=' + user.Personality)
        .map(res => res.json());
    }
    getBartenderMusicBar(user:User){
        return this.http.get('/api/getBartenderMusicBar?Name='+ user.Name + 
            '&City=' + user.City + 
            '&PhoneNum=' + user.PhoneNum + 
            '&Age=' + user.Age + 
            '&PrefTime=' + user.PrefTime + 
            '&Music=' + user.Music + 
            '&Personality=' + user.Personality)
        .map(res => res.json());
    }
    getPopularBar(user:User){
        return this.http.get('/api/getPopularBar?Name='+ user.Name + 
            '&City=' + user.City + 
            '&PhoneNum=' + user.PhoneNum + 
            '&Age=' + user.Age + 
            '&PrefTime=' + user.PrefTime + 
            '&Music=' + user.Music + 
            '&Personality=' + user.Personality)
        .map(res => res.json());
    }
    getOutOfCity(user:User){
        return this.http.get('/api/getOutOfCity?Name='+ user.Name + 
            '&City=' + user.City + 
            '&PhoneNum=' + user.PhoneNum + 
            '&Age=' + user.Age + 
            '&PrefTime=' + user.PrefTime + 
            '&Music=' + user.Music + 
            '&Personality=' + user.Personality)
        .map(res => res.json());
    }

    getBeers(){
        return this.http.get('/api/getBeers')
        .map(res => res.json());

    }

    putLikeBeers(selected:PutBeersLike[]){

        selected.forEach(entry => {
            var headers = new Headers();
            headers.append('Content-Type', 'application/json');
            this.http.put('/api/putLikeBeers', entry,{ headers }).subscribe(
            data => {
                console.log(data.json());           
            });            
        });
    }

    getMinMax(user:User){
        return this.http.get('/api/getMinMax?Name='+ user.Name + 
            '&City=' + user.City + 
            '&PhoneNum=' + user.PhoneNum + 
            '&Age=' + user.Age + 
            '&PrefTime=' + user.PrefTime + 
            '&Music=' + user.Music + 
            '&Personality=' + user.Personality)
        .map(res => res.json());
    }

    getMyRatings(user:User){
        return this.http.get('/api/getMyRatings?Name='+ user.Name + 
            '&City=' + user.City + 
            '&PhoneNum=' + user.PhoneNum + 
            '&Age=' + user.Age + 
            '&PrefTime=' + user.PrefTime + 
            '&Music=' + user.Music + 
            '&Personality=' + user.Personality)
        .map(res => res.json());
    }
    getUpdateRating(newRating:BarUpdate){
        return this.http.get('/api/getUpdateRating?Name='+ newRating.Name + 
            '&PhoneNum=' + newRating.PhoneNum + 
            '&Bar=' + newRating.Bar + 
            '&rating=' + newRating.rating);
    }



    getAllCities(){
        return this.http.get('/api/getAllCities')        
        .map(res => res.json());;
    }
}
