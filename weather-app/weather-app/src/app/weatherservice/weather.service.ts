import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getForecast(identifier: string){

    let apiUrl = `https://api.weather.gov/gridpoints/${identifier}/32,80/forecast`;

    return this.http.get<any>(apiUrl)
    .pipe(
     map((res:any)=>{  return res; }),
     catchError(this.handleError));
  }

  public handleError(error: any) {
    let errorContent = 'Application not Connected to the Service. Please check your configuration or Check your internet connection and try again.';
    if(error.status == 0 ){
       // alert(errorContent);
      //  this.toastr.error(errorContent);
      //  Swal.fire(errorContent)

      return throwError(() => errorContent);
    }
    
    else if (error.status == 400) {
      alert(error.error.title);
       // this.toastr.error( errorContent);
      //  Swal.fire(errorContent)

      return throwError(() =>  error.error.title);
    }
    else if (error.status == 501) {
        alert("Request failed.Try again");
    }
    else {
        // alert("Proccess error. Try again");
    }
    return throwError(() => error.error.title || error.error.title);
  }



}
