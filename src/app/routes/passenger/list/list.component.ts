import { Component, Injector, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';

@Component({
  selector: 'app-passenger-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class PassengerListComponent extends AppComponentBase implements OnInit {
  data = [];
  loading: false;

  mapOfCheckedId = {};
  numberOfChecked = 0;

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.data = [{
      'id': 1,
      'name': '梅西',
      'identification_type': '身份证',
      'identification_no': '3604281987090500X0',
      'native': '江西',
      'nation': '汉',
      'register_at': '2019-04-15 00:00:00',
      'checkin_at': '2019-04-16 00:00:00',
      'checkout_at': null,
      'send_at': '2019-04-15 00:00:00',
      'type': '国外',
      'place': '广州花园酒店',
      'police_station': '白云派出所',
      'room': '8888',
      'remark': null,
      'sex': '男',
      'created_at': 1555310491752,
      'updated_at': 1555385423721,
      'scan_pic': {
        'id': 1,
        'name': 'timg.jpg',
        'hash': '28159ed4119448548fc2fbaf8c13d236',
        'sha256': 'zCTLTudfTtn-RtoptSIPZdA5X2PaPbpC4lixEQi6hY8',
        'ext': '.jpg',
        'mime': 'image/jpeg',
        'size': '9.10',
        'url': '/uploads/28159ed4119448548fc2fbaf8c13d236.jpg',
        'provider': 'local',
        'public_id': null,
        'created_at': 1555382919948,
        'updated_at': 1555382920368,
      },
      'identification_pic': {
        'id': 3,
        'name': 'timg.jpg',
        'hash': '6d5c4b758b37407aa45c2d727d386928',
        'sha256': 'zCTLTudfTtn-RtoptSIPZdA5X2PaPbpC4lixEQi6hY8',
        'ext': '.jpg',
        'mime': 'image/jpeg',
        'size': '9.10',
        'url': '/uploads/6d5c4b758b37407aa45c2d727d386928.jpg',
        'provider': 'local',
        'public_id': null,
        'created_at': 1555382919949,
        'updated_at': 1555382920374,
      },
      'avatar': {
        'id': 2,
        'name': 'avatar.jpg',
        'hash': 'ef44a5cefc3b405488f7acc2b2505293',
        'sha256': 'ian9RqUDCUZOnfIr1HMDHZGq-26d2cFp8lgiidOIQTY',
        'ext': '.jpg',
        'mime': 'image/jpeg',
        'size': '27.72',
        'url': '/uploads/ef44a5cefc3b405488f7acc2b2505293.jpg',
        'provider': 'local',
        'public_id': null,
        'created_at': 1555382919949,
        'updated_at': 1555382920372,
      },
      'pic': {
        'id': 4,
        'name': 'timg1.jpg',
        'hash': 'aeb3ab786d9949b8b4cfae7d427f60b6',
        'sha256': 'zjpT8Nl806semxv1kdA12_hE+o43OVG7t+pmXJsyRQU',
        'ext': '.jpg',
        'mime': 'image/jpeg',
        'size': '145.56',
        'url': '/uploads/aeb3ab786d9949b8b4cfae7d427f60b6.jpg',
        'provider': 'local',
        'public_id': null,
        'created_at': 1555382919951,
        'updated_at': 1555382920378,
      },
    }, {
      'id': 2,
      'name': '郑秀文',
      'identification_type': '身份证',
      'identification_no': '3604281987090500X0',
      'native': '香港',
      'nation': '汉',
      'register_at': '2019-04-13 00:00:00',
      'checkin_at': '2019-04-13 00:00:00',
      'checkout_at': '2019-04-15 00:00:00',
      'send_at': '2019-04-13 00:00:00',
      'type': '港澳台',
      'place': '广州花园酒店',
      'police_station': '白云派出所',
      'room': null,
      'remark': null,
      'sex': '女',
      'created_at': 1555311960817,
      'updated_at': 1555385437084,
    }, {
      'id': 3,
      'name': '梅西',
      'identification_type': '身份证',
      'identification_no': '3604281987090500X0',
      'native': '江西',
      'nation': '汉',
      'register_at': '2019-04-15 00:00:00',
      'checkin_at': '2019-04-16 00:00:00',
      'checkout_at': '2019-04-17T03:37:47.784Z',
      'send_at': '2019-04-15 00:00:00',
      'type': '港澳台',
      'place': '广州花园酒店',
      'police_station': '白云派出所',
      'room': '8888',
      'remark': '请早上6点叫旅客起床',
      'sex': null,
      'created_at': 1555385886680,
      'updated_at': 1555385886680,
    }, {
      'id': 4,
      'name': '梅西',
      'identification_type': '身份证',
      'identification_no': '3604281987090500X0',
      'native': '江西',
      'nation': '汉',
      'register_at': '2019-04-15 00:00:00',
      'checkin_at': '2019-04-16 00:00:00',
      'checkout_at': '2019-04-17T03:37:47.784Z',
      'send_at': '2019-04-15 00:00:00',
      'type': '港澳台',
      'place': '广州花园酒店',
      'police_station': '白云派出所',
      'room': '8888',
      'remark': '请早上6点叫旅客起床',
      'sex': null,
      'created_at': 1555385907614,
      'updated_at': 1555385907614,
    }];
  }

  checkAll(value: boolean): void {
    this.data.forEach(item => this.mapOfCheckedId[item.id] = value);
    console.log(this.mapOfCheckedId);
    this.refreshStatus();
  }

  refreshStatus(): void {
    this.numberOfChecked = this.data.filter(item => this.mapOfCheckedId[item.id]).length;
  }
}
