import { Component, OnInit } from '@angular/core';
import { GalleryService } from '@brand/components/gallery/gallery.service';

@Component({
  selector: 'gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.less'],
})

export class GalleryComponent implements OnInit {
  constructor(private gallerySvc: GalleryService) {
  }

  ngOnInit() {
  }

  close() {
    this.gallerySvc.hide();
  }
}
