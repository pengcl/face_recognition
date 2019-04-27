import {
  Component,
  OnDestroy,
  OnInit,
  HostBinding,
  Inject,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { fromEvent, Subject, combineLatest, interval } from 'rxjs';
import { throttleTime, distinctUntilChanged, takeUntil, tap } from 'rxjs/operators';
import { BrandService } from '../../pro.service';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'layout-pro-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  host: {
    '[class.ant-layout-header]': 'true',
    '[class.alain-pro__header-fixed]': 'pro.fixedHeader',
    '[class.alain-pro__header-hide]': 'hideHeader',
    '[style.padding.px]': '0',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutProHeaderComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  hideHeader = false;

  @HostBinding('style.width')
  get getHeadWidth() {
    const { isMobile, fixedHeader, menu, collapsed, width, widthInCollapsed } = this.pro;
    if (isMobile || !fixedHeader || menu === 'top') {
      return '100%';
    }
    return collapsed ? `calc(100% - ${widthInCollapsed}px)` : `calc(100% - ${width}px)`;
  }

  notification = {
    type: 'loading',
    content: '正在检测是否有告警数据',
  };
  items = [
    {
      type: 'success',
      title: '发现一例涉黄告警',
      content: '皇都大酒店发现一例疑似涉黄人员未登记入住',
    },
  ];

  constructor(
    public pro: BrandService,
    @Inject(DOCUMENT) private doc: any,
    private cdr: ChangeDetectorRef,
    private notificationSvc: NzNotificationService) {
  }

  private handScroll = () => {
    if (!this.pro.autoHideHeader) {
      this.hideHeader = false;
      return;
    }
    setTimeout(() => {
      this.hideHeader = this.doc.body.scrollTop + this.doc.documentElement.scrollTop > this.pro.autoHideHeaderTop;
    });
  };

  ngOnInit() {
    combineLatest(
      this.pro.notify.pipe(tap(() => this.cdr.markForCheck())),
      fromEvent(window, 'scroll', { passive: false }).pipe(
        throttleTime(50),
        distinctUntilChanged(),
      ),
    ).pipe(takeUntil(this.unsubscribe$)).subscribe(this.handScroll);

    interval(10000).subscribe(() => {
      this.createNotification();
    });
  }

  createNotification(): void {
    const data = this.items[0];
    this.notificationSvc.create(data.type, data.title, data.content);
    this.cdr.markForCheck();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
