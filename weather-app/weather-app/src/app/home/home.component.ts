import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { WeatherForecastOptionComponent } from "../weather-forecast-option/weather-forecast-option.component";


import { WeatherService } from '../weatherservice/weather.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [WeatherForecastOptionComponent]
})
export class HomeComponent implements OnInit{
chart: any;

LoadColumbiaForecastChart:boolean =false
 constructor(public apiService:WeatherService,  private router: Router) {
 }
 ngOnInit(): void {

}

 GetForecast(identifier:any){
  this.router.navigate([`/weather/${identifier}`]);

 }
}
