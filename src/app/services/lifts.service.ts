import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Lift } from '../model/Lift';

@Injectable({
  providedIn: 'root'
})
export class LiftsService {

  lifts: Lift[];

  constructor(private http: HttpClient) {
    this.storeAllLifts();
  }

  getLifts(): Lift[] {
    return this.lifts;
  }

  storeAllLifts(): void {
    // this.$http.get('/api/lifts')
    //     .then((response, status, headers) => {
    //         this.lifts = response.data.lifts;
    //     })
    //     .catch((data, status, headers) => {
    //         // TODO:  Failure scenario
    //         console.log("Lifts were not received :(");
    //     });

    this.lifts = [
      new Lift('Bench press', 135),
      new Lift('Squat', 135),
      new Lift('Deadlift', 135),
      new Lift('Barbell Row', 135),
      new Lift('Curl', 135)
    ];
  }
}
