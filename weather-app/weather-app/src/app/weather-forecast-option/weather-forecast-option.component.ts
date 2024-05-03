import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-weather-forecast-option',
  standalone: true,
  imports: [],
  templateUrl: './weather-forecast-option.component.html',
  styleUrl: './weather-forecast-option.component.css'
})
export class WeatherForecastOptionComponent {
  @Input() location: string='';
  @Input() identifier: string='';

  constructor(private router: Router) { }

  redirectToWeather(){
  this.router.navigate(['/weather',this.identifier]);
  }
}
