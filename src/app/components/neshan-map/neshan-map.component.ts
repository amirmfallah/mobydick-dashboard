import { Configuration } from './../../../core/configuration';
import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
declare var L: any;
import * as _ from 'lodash';

@Component({
  selector: 'mbd-neshan-map',
  templateUrl: './neshan-map.component.html',
  styleUrls: ['./neshan-map.component.scss'],
})
export class NeshanMapComponent implements OnInit {
  @Input() lat: number;
  @Input() lng: number;
  @Input() locked: boolean;

  @Input() $geoLocation: BehaviorSubject<any>;

  constructor() {
    if (!this.locked) {
      this.$geoLocation = new BehaviorSubject<any>({});
    }
  }

  ngOnInit(): void {
    var newMap = new L.Map('newMap', {
      key: Configuration.NeshanWebMapApiToken,
      maptype: 'neshan',
      poi: true,
      traffic: false,
      center: [this.lng || 35.699739, this.lat || 51.338097],
      zoom: 14,
      dragging: !this.locked,
      scrollWheelZoom: !this.locked,
      doubleClickZoom: false,
    });
    var marker = L.marker([this.lng || 35.699739, this.lat || 51.338097]).addTo(
      newMap
    );

    newMap.on('move', function () {
      if (!this.locked) {
        marker.setLatLng(newMap.getCenter());
      }
    });

    this.$geoLocation.subscribe(() => {
      navigator.geolocation.getCurrentPosition((x) => {
        newMap.panTo(
          new L.LatLng(
            _.get(x, 'coords.latitude'),
            _.get(x, 'coords.longitude')
          )
        );
      });
    });
  }
}
