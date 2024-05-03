import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherForecastOptionComponent } from './weather-forecast-option.component';

describe('WeatherForecastOptionComponent', () => {
  let component: WeatherForecastOptionComponent;
  let fixture: ComponentFixture<WeatherForecastOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherForecastOptionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WeatherForecastOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
