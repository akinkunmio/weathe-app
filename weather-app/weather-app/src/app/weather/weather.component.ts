import { Properties } from './../models/forecast';
import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { WeatherService } from '../weatherservice/weather.service';
import { ActivatedRoute, Router } from '@angular/router';
import Chart from 'chart.js/auto';
import { Period } from '../models/forecast';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css',
})
export class WeatherComponent implements OnInit {
  public forecastData: Array<any> = [];
  private defaultIdentifier: string = 'TOP';
  private identifier: string = '';
  //private activatedRoute = inject(ActivatedRoute);

  constructor(
    private activatedRoute: ActivatedRoute,
    private weatherService: WeatherService,
     private router: Router
  ) {}
  @ViewChild('LineCanvas') LineCanvas: ElementRef | undefined;
  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      const identifier = params.get("identifier");
      this.identifier =
        identifier == null ? this.defaultIdentifier : identifier;

      this.getForecasts(this.identifier);
    });
  }

  getForecasts(identifier: string) {
    this.weatherService.getForecast(identifier).subscribe((data: any) => {
      this.forecastData = data;
      this.LoadChart(data)
    });
  }
  Goback(){
    this.router.navigate([``]);
  }
  chart:any
  LoadChart(data:any) {
    this.chart =Chart.getChart("MyChart")
    if (this.chart != undefined)  {
      this.chart.destroy();

    }

    let Label :any =[]
    let Temprature :any =[]
    let relativeHumidity:any =[]
    let Dew:any =[]
    data.properties.periods.map((data:any)=>{
      Label.push(data.name)
      Temprature.push(data.temperature)
      relativeHumidity.push(data.relativeHumidity.value)
      Dew.push(data.dewpoint.value)
    })
    console.log("Weather Data",data)
    this.chart = new Chart(this.LineCanvas?.nativeElement.getContext('2d'), {
      type: 'line', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: Label,
         datasets: [
          {
            label: "Temprature",
            data: Temprature,
            backgroundColor: 'blue'
          },
          {
            label: "Humidity",
            data: relativeHumidity,
            backgroundColor: 'limegreen'
          },{
            label:"Dew Point",
            data: relativeHumidity,
            backgroundColor: 'brown'

          }
        ]
      },
      options: {
        aspectRatio:2.5
      }

    });

  }
}
