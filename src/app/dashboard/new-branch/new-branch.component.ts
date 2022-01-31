import { Observable, Subject, BehaviorSubject, of } from 'rxjs';
import { Configuration } from './../../../core/configuration';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ImageUploadService } from 'src/core/services/imageUpload.service';
import { branch } from 'src/app/products/interfaces/branches.interface';
import { switchMap } from 'rxjs/operators';
import { BranchesService } from 'src/core/services/branches.service';
declare var L: any;
import * as _ from 'lodash';
import { NotificationService } from 'src/core/services/notification.service';

@Component({
  selector: 'mbd-new-branch',
  templateUrl: './new-branch.component.html',
  styleUrls: ['./new-branch.component.scss'],
})
export class NewBranchComponent implements OnInit {
  files: File[] = [];
  preview = undefined;
  $address: Observable<any>;
  subject = new Subject();
  $getLocation = new BehaviorSubject<any>(undefined);
  form = this.fb.group({
    address: ['', Validators.required],
    phone: [],
    lng: [],
    lat: [],
    description: [''],
    name: [''],
    thumbnail: [''],
    required: ['', Validators.required],
  });
  branch: branch;
  hasBranch: boolean;
  $load: BehaviorSubject<any>;
  $error = new BehaviorSubject<string>(undefined);
  constructor(
    private fb: FormBuilder,
    private imageService: ImageUploadService,
    private sanitizer: DomSanitizer,
    private _snackBar: MatSnackBar,
    private router: Router,
    private branchesService: BranchesService,
    private notificationService: NotificationService
  ) {}
  ngOnInit(): void {
    var newMap = new L.Map('newMap', {
      key: Configuration.NeshanWebMapApiToken,
      maptype: 'neshan',
      poi: true,
      traffic: false,
      center: [35.699739, 51.338097],
      zoom: 14,
      zoomControl: false,
    });
    var marker = L.marker([35.699739, 51.338097]).addTo(newMap);
    const updatePoint = (point) => {
      this.form.get('lng').setValue(point.lng);
      this.form.get('lat').setValue(point.lat);
    };

    newMap.on('move', function () {
      marker.setLatLng(newMap.getCenter());
      updatePoint(newMap.getCenter());
    });

    this.$getLocation.subscribe(() => {
      navigator.geolocation.getCurrentPosition((x) => {
        newMap.panTo(new L.LatLng(x.coords.latitude, x.coords.longitude));
      });
    });
    this.$load = new BehaviorSubject<any>('');
    this.$load.subscribe(() => {
      this.branchesService.getMyBranch().subscribe((res: branch) => {
        if (res === null) {
          this.$getLocation.next('');
          return of(undefined);
        }
        this.form.controls['address'].setValue(_.get(res, 'address.address'));
        this.form.controls['phone'].setValue(_.get(res, 'address.phone'));
        this.form.controls['name'].setValue(_.get(res, 'name'));
        this.form.controls['description'].setValue(_.get(res, 'description'));
        this.preview = _.get(res, 'thumbnail');
        this.branch = res;
        this.hasBranch = true;
        newMap.panTo(
          new L.LatLng(
            _.get(res, 'address.lat') || 0,
            _.get(res, 'address.lng') || 0
          )
        );
      });
    });
  }

  fileDropped(files: FileList): void {
    const filesArray = Array.from(files);
    filesArray.forEach((file) => {
      this.files = [];
      if (file.type === 'image/png' || file.type === 'image/jpeg') {
        this.files.push(file);
        this.preview = this.sanitizer.bypassSecurityTrustUrl(
          URL.createObjectURL(file)
        );
      }
    });
  }

  removeFile(index: number, e): void {
    this.files.splice(index, 1);
    this.preview = undefined;
    e.preventDefault();
  }

  submit() {
    if (this.files.length <= 0) {
      this.notificationService.show('لطفا عکس شعبه را بارگذاری کنید');
      return;
    } else if (!this.form.value.required) {
      this.notificationService.show(
        'برای ثبت شعبه باید با شرایط و قوانین موافق باشید.'
      );
      return;
    }

    if (!this.form.valid) {
      return;
    }
    this.form.disable();
    const values = this.form.value;
    const payload = <branch>{
      address: {
        address: values.address,
        lat: values.lat,
        lng: values.lng,
        description: values.description,
        open: true,
        phone: values.phone,
      },
      description: values.description,
      name: values.name,
      thumbnail: '',
    };

    this.imageService
      .uploadImage(this.files[0])
      .pipe(
        switchMap((res: { Location: string; Key: string }) => {
          payload.thumbnail = res.Location;
          return this.branchesService.createBranch(payload);
        })
      )
      .subscribe(
        (res) => {
          this._snackBar.open('شعبه با موفقیت ساخته شد.', 'باشه', {
            duration: 2000,
            panelClass: ['snakbar'],
          });
          this.$load.next('');
          this.form.enable();
        },
        (err) => {
          this.form.enable();
          this._snackBar.open('در هنگام ساخت شعبه مشکلی پیش آمد.', 'باشه', {
            duration: 2000,
            panelClass: ['snakbar'],
          });
        }
      );
  }

  patch() {
    if (!this.form.valid) {
      return;
    }
    this.form.disable();
    const values = this.form.value;
    const payload = <branch>{
      address: {
        address: values.address,
        lat: values.lat,
        lng: values.lng,
        description: values.description,
        open: true,
        phone: values.phone,
      },
      description: values.description,
      name: values.name,
      thumbnail: '',
    };

    of('')
      .pipe(
        switchMap(() => {
          if (this.files.length > 0) {
            return this.imageService.uploadImage(this.files[0]);
          }
          return of({ Location: this.branch.thumbnail, Key: '' });
        }),
        switchMap((res: { Location: string; Key: string }) => {
          payload.thumbnail = res.Location;
          payload._id = this.branch._id;
          return this.branchesService.patchBranch(payload);
        })
      )
      .subscribe(
        (res) => {
          this._snackBar.open('شعبه با موفقیت ساخته شد.', 'باشه', {
            duration: 2000,
            panelClass: ['snakbar'],
          });
          this.form.enable();
          this.$load.next('');
        },
        (err) => {
          this.form.enable();
          this._snackBar.open('در هنگام ساخت شعبه مشکلی پیش آمد.', 'باشه', {
            duration: 2000,
            panelClass: ['snakbar'],
          });
        }
      );
  }
}
