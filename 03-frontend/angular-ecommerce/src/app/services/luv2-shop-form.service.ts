import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Country } from '../common/country';
import { State } from '../common/state';

@Injectable({
  providedIn: 'root'
})
export class Luv2ShopFormService {


  private countriesURl = 'http://localhost:8080/api/countries';
                        
  private stateUrl = 'http://localhost:8080/api/states';

  constructor(private httpClient: HttpClient) { }

  getCreditCardMonths(startMonth: number): Observable<number[]>{

    let data: number[] = [];

    // startMonth = 5;

    for (let theMonth = startMonth; theMonth <= 12; theMonth++){
      data.push(theMonth);
    }

    return of(data);

  }

  getCreditCardYears(startYear: number): Observable<number[]>{

    let data: number[] = [];
    const endYear: number = startYear + 10;

    for (let theYear = startYear; theYear <= endYear; theYear++){
      data.push(theYear);
    }

    return of(data);

  }

  getCountries(): Observable<Country[]>{


    return this.httpClient.get<GetResponseCountries>(this.countriesURl).pipe(
      map(response => response._embedded.countries)
      ,tap(response => console.log(response))
    );


  }

  getStates(): Observable<State[]>{



    return this.httpClient.get<GetResponseStates>(this.stateUrl).pipe(
      map(response => response._embedded.states),
      
    );


  }

  getStatesByCode(code: string): Observable<State[]>{

    this.stateUrl = "http://localhost:8080/api/states/search/findByCountryCode?code=" + code;
    console.log(this.stateUrl);

    return this.httpClient.get<GetResponseStates>(this.stateUrl).pipe(
      map(response => response._embedded.states)
      ,tap(response => console.log(response))

    );


  }


}


interface GetResponseCountries{
  _embedded:{
    countries: Country[];
  }
}

interface GetResponseStates{
  _embedded:{
    states: State[];
  }
}