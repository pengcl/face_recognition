import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

import { GalleryComponent } from '@brand/components/gallery/gallery.component';

@Injectable({ providedIn: 'root' })
export class GalleryService {
  private overlayRef = this.overlay.create({
    width: '100%',
    height: '100%',
    positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
    hasBackdrop: true,
  });

  constructor(private http: HttpClient, private overlay: Overlay) {
  }

  show() {
    const GalleryProfilePortal = new ComponentPortal(GalleryComponent);
    this.overlayRef.attach(GalleryProfilePortal);
  }

  hide() {
    this.overlayRef.detach();
  }
}
