import {
  Component,
  OnInit,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { PassengerService } from '../passenger.service';

@Component({
  selector: 'app-passenger-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class PassengerEditComponent implements OnInit {
  id = parseInt(this.route.snapshot.params['id']);
  form: FormGroup;
  data = [];
  scan_pic;
  avatar;
  pic;
  identification_pic;

  tmpPic = 'assets/images/tmp/1.jpg';

  _data = [{
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
      'url': 'uploads/28159ed4119448548fc2fbaf8c13d236.jpg',
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
      'url': 'uploads/6d5c4b758b37407aa45c2d727d386928.jpg',
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
      'url': 'uploads/ef44a5cefc3b405488f7acc2b2505293.jpg',
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
      'url': 'uploads/aeb3ab786d9949b8b4cfae7d427f60b6.jpg',
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

  constructor(private route: ActivatedRoute, private passengerSvc: PassengerService) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      type: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      identification_type: new FormControl('身份证', [Validators.required]),
      identification_no: new FormControl(null, [Validators.required]),
      native: new FormControl(null, [Validators.required]),
      nation: new FormControl(null, [Validators.required]),
      register_at: new FormControl(null, [Validators.required]),
      checkin_at: new FormControl(null, [Validators.required]),
      checkout_at: new FormControl(null, [Validators.required]),
      room: new FormControl(null, [Validators.required]),
      remark: new FormControl(null, []),
      send_at: new FormControl(null, [Validators.required]),
      place: new FormControl('广州花园酒店', [Validators.required]),
      police_station: new FormControl('白云派出所', [Validators.required]),

    });

    this.form.get('identification_type').valueChanges.subscribe(value => {
      if (value === '身份证') {
        this.tmpPic = 'assets/images/tmp/1.jpg';
      } else if (value === '护照') {
        this.tmpPic = 'assets/images/tmp/2.jpg';
      } else if (value === '国外护照') {
        this.tmpPic = 'assets/images/tmp/3.jpg';
      } else if (value === '广东省居住证') {
        this.tmpPic = 'assets/images/tmp/4.jpg';
      } else if (value === '港澳通行证(卡式)') {
        this.tmpPic = 'assets/images/tmp/5.jpg';
      } else if (value === '港澳通行证(本式)') {
        this.tmpPic = 'assets/images/tmp/6.jpg';
      } else if (value === '港澳居民来往大陆通行证') {
        this.tmpPic = 'assets/images/tmp/7.jpg';
      } else if (value === '台湾居民来往大陆通行证') {
        this.tmpPic = 'assets/images/tmp/8.jpg';
      } else {
        this.tmpPic = '';
      }
    });

    if (this.id) {
      const res = this._data[0];
      this.scan_pic = res.scan_pic.url;
      this.pic = res.pic.url;
      this.identification_pic = res.identification_pic.url;
      this.avatar = res.avatar.url;
      if (res) {
        for (const key in this.form.value) {
          if (this.form.get(key)) {
            this.form.get(key).setValue(res[key]);
          }
        }
      }
    }
  }

  getData() {
    const res = this._data[0];
    this.scan_pic = res.scan_pic.url;
    this.pic = res.pic.url;
    this.identification_pic = res.identification_pic.url;
    this.avatar = res.avatar.url;
    if (res) {
      for (const key in this.form.value) {
        if (this.form.get(key)) {
          this.form.get(key).setValue(res[key]);
        }
      }
    }
    this.data = this._data;
  }

  save() {
    this.passengerSvc.save(this.form.value, this.id).subscribe(res => {
      console.log(res);
    });
  }

  cancel() {
  }
}
