import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeatherService } from '../weatherservice/weather.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-weather-chart',
  standalone: true,
  imports: [],
  templateUrl: './weather-chart.component.html',
  styleUrl: './weather-chart.component.css',
})
export class WeatherChartComponent {
  @ViewChild('weatherChartCanvas')
  weatherChartCanvas!: ElementRef;
  private defaultIdentifier: string = 'TOP';
  private identifier!: string;
  constructor(
    private route: ActivatedRoute,
    private weatherService: WeatherService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const identifier = params.get('identifier');
      this.identifier =
        identifier == null ? this.defaultIdentifier : identifier;
      this.getForecasts(this.identifier);
    });
  }

  getForecasts(identifier: string) {
    this.weatherService.getForecast(identifier).subscribe((data: any) => {
      this.renderChart = data;
      console.log(data);
    });
  }

  renderChart(data: any) {
    const temperatures = data.properties.periods.map(
      (period: { temperature: any }) => period.temperature
    );

    const labels = data.properties.periods.map(
      (period: { name: any }) => period.name
    );

    const ctx = this.weatherChartCanvas.nativeElement.getContext('2d');

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Temperature (°F)',
            data: temperatures,
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        // scales: {
        //   yAxes: [{
        //     ticks: {
        //       beginAtZero: false
        //     }
        //   }]
        //}
      },
    });
  }
}
