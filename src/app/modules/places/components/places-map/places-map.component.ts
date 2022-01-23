import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, of} from "rxjs";

@Component({
  selector: 'app-places-map',
  templateUrl: './places-map.component.html',
  styleUrls: ['./places-map.component.css']
})
export class PlacesMapComponent implements OnInit {
  apiLoaded$: Observable<any>;

  constructor(httpClient: HttpClient) {
    this.apiLoaded$ = httpClient.jsonp("https://maps.googleapis.com/maps/api/js?key=AIzaSyBm3JBOsD5b6m4LbE1Yn0FP8aIIo6jT2Og", "callback")
      .pipe(
        map(() => true),
        catchError(() => of(false))
      );
  }

  ngOnInit(): void {

  }

}
