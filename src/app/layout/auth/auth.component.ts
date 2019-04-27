import { Component, OnInit } from '@angular/core';

declare var particlesJS;

@Component({
  selector: 'layout-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.less'],
})
export class LayoutAuthComponent implements OnInit {
  links = [
    {
      title: '管理员操作指南',
      href: '',
    },
  ];

  bg_img = '/assets/images/bgs/' + Math.round(Math.random() * 4) + '.jpg';

  ngOnInit() {
    particlesJS.load('particles-js', '/assets/tmp/particles.json', function() {
      console.log('callback - particles.js config loaded');
    });
  }
}
