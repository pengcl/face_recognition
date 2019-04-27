import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlarmService } from '@brand/components/alarm/alarm.service';
import { MapService } from '@brand/components/map/map.service';
import { getMapOptions, getEqOptions } from '@shared/utils/utils';

import { SettingsService } from '@delon/theme';
import { BrandService } from '@brand';
import { PlaceService } from '../place/place.service';
import { CameraService } from '../camera/camera.service';

import * as echarts from 'echarts';

const colors = {
  blue: '#4690ff',
  green: '#8eff38',
  yellow: '#fef239',
  orange: '#ffa231',
  red: '#ff4239',
  lite: '#13ffd5',
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  options = getMapOptions();
  eqOptions = getEqOptions();
  initOpts = {
    renderer: 'svg',
  };
  placeOption = {
    color: [colors.blue, colors.lite, colors.blue, colors.lite, colors.blue, colors.lite, colors.blue, colors.lite, colors.blue, colors.lite, colors.blue, colors.lite, colors.green],
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)',
    },
    legend: {
      orient: 'vertical',
      x: 'left',
      data: ['活跃', '不活跃'],
      textStyle: {
        color: '#b3d1fc',
        fontSize: 12,
      },
    },

    series: [
      {
        name: '地区',
        type: 'pie',
        radius: [0, '60%'],
        label: {
          normal: {
            position: 'inner',
          },
        },
        labelLine: {
          normal: {
            show: false,
          },
        },
        itemStyle: {
          borderColor: '#051025',
          borderWidth: 1,
          borderType: 'solid',
        },
        data: [
          { value: 205, name: '荔湾' },
          { value: 185, name: '越秀' },
          { value: 166, name: '海珠' },
          { value: 235, name: '天河' },
          { value: 155, name: '番禺' },
          { value: 176, name: '黄埔' },
          { value: 165, name: '白云' },
          { value: 195, name: '南沙' },
          { value: 144, name: '花都' },
          { value: 204, name: '从化' },
          { value: 108, name: '增城' },
        ],
      },
      {
        name: '活跃度统计',
        type: 'pie',
        radius: ['60%', '85%'],
        label: {
          normal: {
            position: 'inner',
            show: false,
          },
        },
        labelLine: {
          normal: {
            show: false,
          },
        },
        itemStyle: {
          borderColor: '#051025',
          borderWidth: 1,
          borderType: 'solid',
        },
        data: [
          { value: 100, name: '活跃' },
          { value: 105, name: '不活跃' },
          { value: 85, name: '活跃' },
          { value: 100, name: '不活跃' },
          { value: 66, name: '活跃' },
          { value: 100, name: '不活跃' },
          { value: 100, name: '活跃' },
          { value: 135, name: '不活跃' },
          { value: 55, name: '活跃' },
          { value: 100, name: '不活跃' },
          { value: 76, name: '活跃' },
          { value: 100, name: '不活跃' },
          { value: 65, name: '活跃' },
          { value: 100, name: '不活跃' },
          { value: 95, name: '活跃' },
          { value: 100, name: '不活跃' },
          { value: 44, name: '活跃' },
          { value: 100, name: '不活跃' },
          { value: 100, name: '活跃' },
          { value: 104, name: '不活跃' },
          { value: 50, name: '活跃' },
          { value: 58, name: '不活跃' },
        ],
      },
    ],
  };
  passengerOption = {
    color: [colors.red, colors.green, colors.lite],
    textStyle: { color: '#b3d1fc' },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    legend: {
      data: ['从业人员', '已登记人员', '未登记人员'],
      itemWidth: 14,
      itemHeight: 14,
      borderRadius: 10,
      top: 20,
      textStyle: {
        color: '#b3d1fc',
        fontSize: 12,
      },
    },
    calculable: true,
    xAxis: [
      {
        type: 'category',
        axisLine: {
          lineStyle: { width: 3, color: '#3a5685' },
        },
        axisTick: { show: false },
        data: ['荔湾', '越秀', '海珠', '天河', '番禺', '黄埔', '白云', '南沙', '花都', '从化', '增城'],
      },
    ],
    yAxis: [
      {
        type: 'value',
        nameTextStyle: {
          color: '#5178c1',
        },
        axisLine: {
          lineStyle: { width: 3, color: '#3a5685' },
        },
        splitLine: {
          lineStyle: {
            width: 1, color: '#112344',
          },
        },
      },
    ],
    series: [
      {
        name: '未登记人员',
        type: 'bar',
        barGap: 0,
        data: [320, 332, 301, 334, 390, 385, 346, 335, 375, 368, 377],
      },
      {
        name: '已登记人员',
        type: 'bar',
        data: [220, 182, 191, 234, 290, 268, 277, 245, 208, 190, 255],
      },
      {
        name: '从业人员',
        type: 'bar',
        data: [150, 232, 201, 154, 190, 178, 169, 155, 167, 195, 158],
      },
    ],
  };

  updateAlarmOption: any;

  alarmOption = {
    color: [colors.yellow, colors.lite, colors.red, colors.blue],
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)',
    },
    legend: {
      data: ['涉黄:10', '涉赌:10', '布控:10', '重点:10'],
      itemWidth: 10,
      itemHeight: 10,
      borderRadius: 5,
      right: 55,
      top: '30%',
      orient: 'vertical',
      textStyle: {
        color: '#b3d1fc',
        fontSize: 12,
      },
    },
    series: [
      {
        center: ['30%', '50%'],
        name: '预警次数',
        type: 'pie',
        radius: ['25%', '45%'],
        avoidLabelOverlap: true,
        itemStyle: {
          borderColor: '#051025',
          borderWidth: 1,
          borderType: 'solid',
        },
        label: {
          normal: {
            show: false,
          },
          emphasis: {
            show: true,
          },
        },
        labelLine: {
          length: 2,
          length2: 2,
          show: false,
          normal: {
            show: false,
            length: 2,
            length2: 2,
          },
        },
        data: [
          {
            value: 25, name: '涉黄:10',
          },
          {
            value: 25, name: '涉赌:10',
          },
          {
            value: 25, name: '重点:10',
          },
          {
            value: 7, name: '布控:10',
          },
        ],
      },
    ],
  };

  // map
  mapLoaded = false;
  mapOptions = {};
  updateMapOptions: any;
  timer;
  countObj = {
    times: {
      value: 68,
      animated: false,
    },
    place: {
      value: 25,
      animated: false,
    },
  };

  q = {
    page: 1,
    limit: 10000,
    orgId: '',
    placeId: '',
    dbCode: '',
    searchTxt: '',
  };
  data = [];
  loading: false;

  constructor(private settingsSvc: SettingsService,
              private proSvc: BrandService,
              private alarmSvc: AlarmService,
              private mapSvc: MapService,
              private placeSvc: PlaceService,
              private cameraSvc: CameraService) {
    proSvc.setCollapsed(true);
  }

  ngOnInit() {
    setInterval(() => {
      if (Math.random() >= 0.5) {
        this.countObj.place.value = this.countObj.place.value + 1;
        this.countObj.place.animated = true;
        setTimeout(() => {
          this.countObj.place.animated = false;
        }, 1000);
      }
      this.countObj.times.value = this.countObj.times.value + 1;
      this.countObj.times.animated = true;
      setTimeout(() => {
        this.countObj.times.animated = false;
      }, 1000);
    }, 3000);
    this.timer = setInterval(() => {
      const legend = [Math.floor(Math.random() * 20), Math.floor(Math.random() * 20), Math.floor(Math.random() * 20), Math.floor(Math.random() * 20)];
      this.updateAlarmOption = {
        legend: {
          data: ['涉黄:' + legend[0], '涉赌:' + legend[1], '布控:' + legend[2], '重点:' + legend[3]],
        },
        series: [{
          data: [
            {
              value: legend[0], name: '涉黄:' + legend[0],
            },
            {
              value: legend[1], name: '涉赌:' + legend[1],
            },
            {
              value: legend[3], name: '布控:' + legend[2],
            },
            {
              value: legend[2], name: '重点:' + legend[3],
            },
          ],
        }],
      };
    }, 1000);

    setTimeout(() => {
      this.showAlarm();
    }, 3000);

    this.mapSvc.get('gz').subscribe(res => {
      const data = [
        { name: '皇都大酒店', value: 250, color: colors.red },
        { name: '金汇洗浴中心', value: 279, color: colors.orange },
        { name: '同福客栈', value: 102 },
        { name: '如家', value: 77 },
        { name: '七天', value: 108 },
        { name: '速八', value: 155 },
        { name: '格林豪泰', value: 98 },
        { name: '洲豪酒店', value: 94 },
        { name: '万光小城', value: 85 },
        { name: '北香阁', value: 68 },
        { name: '时庭酒店', value: 69 },
        { name: '希尔顿', value: 75 },

      ];
      const geoCoordMap = {
        '皇都大酒店': [113.184836, 23.059649],
        '金汇洗浴中心': [113.161782, 23.358153],
        '同福客栈': [113.153069, 23.333001],
        '如家': [113.237078, 23.331682],
        '七天': [113.53738, 22.794531],
        '速八': [113.587386, 23.545283],
        '格林豪泰': [113.829579, 23.290497],
        '洲豪酒店': [113.570336, 23.084206],
        '万光小城': [113.456973, 23.45413],
        '北香阁': [113.364619, 22.938582],
        '时庭酒店': [113.300423, 22.877057],
        '希尔顿': [113.427355, 23.173206],
      };

      const convertData = function(data) {
        const res = [];
        for (let i = 0; i < data.length; i++) {
          const geoCoord = geoCoordMap[data[i].name];
          if (geoCoord) {
            res.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value),
            });
          }
        }
        return res;
      };
      this.mapLoaded = true;
      // hide loading:
      this.mapLoaded = true;
      // register map:
      echarts.registerMap('GZ', res);
      // update options:
      this.mapOptions = {
        roam: false,//是否开启鼠标缩放和平移漫游
        legend: {
          orient: 'vertical',
          left: '30',
          top: '30',
          textStyle: {
            color: '#b3d1fc',
            fontSize: 12,
          },
          formatter: function(name) {
            return name + '：2';
          },
          data: ['告警场所', '涉黄', '涉赌', '布控', '重点', '活跃', '不活跃', '有枪', '没枪'],
        },
        geo: {
          map: 'GZ',
          zoom: 1.2,
          label: {
            emphasis: {
              show: true,
            },
          },
          roam: false,
          itemStyle: {
            normal: {
              borderWidth: .5,//区域边框宽度
              borderColor: '#0550c3',//区域边框颜色
              areaColor: '#3763e7',//区域颜色

            },

            emphasis: {
              borderWidth: .5,
              borderColor: '#4b0082',
              areaColor: '#ece39e',
            },
          },
        },
        series: [
          {
            name: '告警场所',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: convertData(data).slice(8, 10),
            encode: {
              value: 2,
            },
            symbolSize: function(val) {
              return 20;
            },
            showEffectOn: 'render',
            rippleEffect: {
              brushType: 'stroke',
            },
            hoverAnimation: true,
            label: {
              normal: {
                formatter: '{b}',
                position: 'right',
              },
              emphasis: {
                show: true,
              },
            },
            itemStyle: {
              normal: {
                color: colors.red,
                shadowBlur: 10,
                shadowColor: '#333',
              },
            },
            zlevel: 1,
          },
          {
            name: '活跃',
            symbol: 'image://http://127.0.0.1/assets/icons/b_yes.png',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: convertData(data).slice(0, 2),
            encode: {
              value: 2,
            },
            symbolSize: function(val) {
              return 20;
            },
            showEffectOn: 'render',
            rippleEffect: {
              brushType: 'stroke',
            },
            hoverAnimation: true,
            label: {
              normal: {
                formatter: '{b}',
                position: 'right',
                show: false,
              },
              emphasis: {
                show: true,
              },
            },
            itemStyle: {
              normal: {
                color: colors.yellow,
                shadowBlur: 10,
                shadowColor: '#333',
                borderWidth: 1,
                borderColor: '#ffffff',
                borderType: 'solid',
              },
            },
            zlevel: 1,
          },
          {
            name: '不活跃',
            symbol: 'image://http://127.0.0.1/assets/icons/b_no.png',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: convertData(data).slice(2, 4),
            encode: {
              value: 2,
            },
            symbolSize: function(val) {
              return 20;
            },
            showEffectOn: 'render',
            rippleEffect: {
              brushType: 'stroke',
            },
            hoverAnimation: true,
            label: {
              normal: {
                formatter: '{b}',
                position: 'right',
                show: false,
              },
              emphasis: {
                show: true,
              },
            },
            itemStyle: {
              normal: {
                color: '#999999',
                shadowBlur: 10,
                shadowColor: '#333',
                borderWidth: 1,
              },
            },
            zlevel: 1,
          },
          {
            name: '有枪',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: convertData(data).slice(4, 6),
            encode: {
              value: 2,
            },
            symbolSize: function(val) {
              return 20;
            },
            showEffectOn: 'render',
            rippleEffect: {
              brushType: 'stroke',
            },
            hoverAnimation: true,
            label: {
              normal: {
                formatter: '{b}',
                position: 'right',
                show: false,
              },
              emphasis: {
                show: true,
              },
            },
            symbol: 'image://http://127.0.0.1/assets/icons/yes.png',
            itemStyle: {
              normal: {
                color: '#999999',
                shadowBlur: 10,
                shadowColor: '#333',
                borderWidth: 1,
              },
            },
            zlevel: 1,
          },
          {
            name: '没枪',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: convertData(data).slice(6, 8),
            encode: {
              value: 2,
            },
            symbolSize: function(val) {
              return 20;
            },
            showEffectOn: 'render',
            rippleEffect: {
              brushType: 'stroke',
            },
            hoverAnimation: true,
            label: {
              normal: {
                formatter: '{b}',
                position: 'right',
                show: false,
              },
              emphasis: {
                show: true,
              },
            },
            symbol: 'image://http://127.0.0.1/assets/icons/no.png',
            itemStyle: {
              normal: {
                color: '#999999',
                shadowBlur: 10,
                shadowColor: '#333',
                borderWidth: 1,

              },
            },
            zlevel: 1,
          },
        ],
      };
      // const _data = convertData(data);
      // setInterval(() => {
      //   this.updateMapOptions = {
      //     series: [{
      //       data: (() => {
      //         return _data;
      //       })(),
      //     }],
      //   };
      // }, 5000);
    });

    this.getData();
  }

  getData() {
  }

  alarmShow = false;

  showAlarm() {
    // if (!this.alarmShow) {
    //   this.alarmSvc.show();
    // }
  }

  updateMap() {
    setInterval(() => {
      Math.round(Math.random() * 11);
    }, 3000);
  }

  ngOnDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
}
