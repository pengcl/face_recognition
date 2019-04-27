import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Observable, Observer, interval as observableInterval, timer as observableTimer, fromEvent } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd';
import { UploadFile } from 'ng-zorro-antd';

import { GalleryService } from '@brand/components/gallery/gallery.service';

@Component({
  selector: 'app-comparison',
  templateUrl: './comparison.component.html',
  styleUrls: ['./comparison.component.less'],
})
export class ComparisonComponent implements OnInit, OnDestroy {
  loading = false;
  avatarUrl: string;

  target_imgs = [];
  target_img;
  interval;
  target;
  state: 'start' | 'hit' | 'stop' = 'stop';
  @ViewChild('imgContainer') imgContainer: ElementRef;

  constructor(private msg: NzMessageService, private gallerySvc: GalleryService) {
  }

  ngOnInit() {
    this.target = {
      name: '克里斯汀·斯图尔特',
      no: '100025202365',
      sex: '女',
      native: '广西',
      nation: '汉',
      database: '涉黄库',
      passport_type: '身份证',
      passport_no: '360428199010250010',
      pic: '/assets/tmp/img/9.jpg',
    };
  }

  start() {
    this.state = 'start';
    this.interval = observableInterval(300).subscribe(() => {
      const idx = Math.round(Math.random() * 8) + 1;
      this.target_img = `/assets/tmp/img/${idx}.jpg`;
      if (idx === 9) {
        this.target_imgs = [`/assets/tmp/img/1.jpg`, '/assets/tmp/img/2.jpg', '/assets/tmp/img/3.jpg'];
        this.interval.unsubscribe();
        this.state = 'hit';
      }
    });
  }

  beforeUpload = (file: File) => {
    return new Observable((observer: Observer<boolean>) => {
      const isJPG = file.type === 'image/jpeg';
      if (!isJPG) {
        this.msg.error('You can only upload JPG file!');
        observer.complete();
        return;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.msg.error('Image must smaller than 2MB!');
        observer.complete();
        return;
      }
      // check height
      this.checkImageDimension(file).then(dimensionRes => {
        if (!dimensionRes) {
          this.msg.error('Image only 300x300 above');
          observer.complete();
          return;
        }

        observer.next(isJPG && isLt2M && dimensionRes);
        observer.complete();
      });
    });
  };

  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }

  private checkImageDimension(file: File): Promise<boolean> {
    return new Promise(resolve => {
      const img = new Image(); // create image
      img.src = window.URL.createObjectURL(file);
      img.onload = () => {
        const width = img.naturalWidth;
        const height = img.naturalHeight;
        window.URL.revokeObjectURL(img.src!);
        // resolve(width === height && width >= 300);
        resolve(true);
      };
    });
  }

  handleChange(info: { file: UploadFile }): void {
    switch (info.file.status) {
      case 'uploading':
        this.loading = true;
        break;
      case 'done':
        // Get this url from response in real world.
        this.getBase64(info.file!.originFileObj!, (img: string) => {
          this.loading = false;
          this.avatarUrl = img;
        });
        break;
      case 'error':
        this.msg.error('Network error');
        this.loading = false;
        break;
    }
  }

  showGallery() {
    this.gallerySvc.show();
  }

  ngOnDestroy() {
    if (this.interval) {
      this.interval.unsubscribe();
    }
  }
}
