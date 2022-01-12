import { BehaviorSubject } from 'rxjs';
import { Configuration } from './../configuration';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class imageUploadService {
  constructor(private http: HttpClient) {}
  uploadImage(image: File) {
    return this.http.post(
      `${Configuration.ImageProcessorUrl}/api/v1/images/product`,
      image,
      {
        headers: {
          ['Content-Type']: 'image/jpeg',
        },
      }
    );
  }
}
