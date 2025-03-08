import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housinglocation';
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, HousingLocationComponent],
  template: `
    <section>
      <form>
        <input type="text" placeholder="Filter by city" #filter />
        <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
      </form>
    </section>
    <section class="results">
      <app-housing-location
        *ngFor="let housingLocation of filteredLocations"
        [housingLocation]="housingLocation"
      ></app-housing-location>
    </section>
  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  readonly baseUrl = 'https://angular.dev/assets/images/tutorials/common';

  readonly housingLocations: HousingLocation[] = [];

  filteredLocations: HousingLocation[] = [];

  constructor(private housingService: HousingService) {
    this.housingLocations = this.housingService.getAllHousingLocations();
    this.filteredLocations = this.housingLocations;
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredLocations = this.housingLocations;
      return;
    }
    this.filteredLocations = this.housingLocations.filter((housingLocation) =>
      housingLocation?.city.toLowerCase().includes(text.toLowerCase()),
    );
  }
}
