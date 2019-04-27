export function getIndex(arr, key, value) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][key] === value) {
      return i;
    }
  }
}

export function formData(body: object): FormData {
  const _formData: FormData = new FormData();
  for (const kn in body) {
    if (body) {
      _formData.append(kn, body[kn] === undefined ? '' : body[kn]);
    }
  }
  return _formData;
}

export function formDataToUrl(body: object, ifFist?: boolean): string {
  let str = '';
  for (const keyName in body) {
    if (!str && ifFist) {
      str = '?' + keyName + '=' + (body[keyName] === undefined ? '' : encodeURI(encodeURI(body[keyName])));
    } else {
      str = str + '&' + keyName + '=' + (body[keyName] === undefined ? '' : encodeURI(encodeURI(body[keyName])));
    }
  }
  return str;
}

const colors = {
  blue: '#4690ff',
  green: '#8eff38',
  yellow: '#fef239',
  orange: '#ffa231',
  red: '#ff4239',
  lite: '#13ffd5',
};
const data = [
  { name: '荔湾', value: 200 },
  { name: '越秀', value: 200 },
  { name: '海珠', value: 300 },
  { name: '天河', value: 400 },
  { name: '番禺', value: 200 },
  { name: '黄埔', value: 300 },
  { name: '白云', value: 200 },
  { name: '南沙', value: 200 },
  { name: '花都', value: 200 },
  { name: '从化', value: 300 },
  { name: '增城', value: 200 },

];
const geoCoordMap = {
  '荔湾': [113.23, 23.13],
  '越秀': [113.27, 23.13],
  '海珠': [113.25, 23.10],
  '天河': [113.35, 23.12],
  '番禺': [113.35, 22.95],
  '黄埔': [113.45, 23.10],
  '白云': [113.27, 23.17],
  '南沙': [113.25, 23.12],
  '花都': [113.22, 23.40],
  '从化': [113.58, 23.55],
  '增城': [113.83, 23.30],
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

export function getMapOptions() {
  return {
    tooltip: {
      trigger: 'item',
    },
    bmap: {
      center: [113.23, 23.16],
      zoom: 11,
      roam: true,
      mapStyle: {
        styleJson: [{
          featureType: 'water',
          elementType: 'all',
          stylers: {
            color: '#000000',
          },
        }, {
          featureType: 'land',
          elementType: 'all',
          stylers: {
            color: '#051025',
          },
        }, {
          featureType: 'railway',
          elementType: 'all',
          stylers: {
            visibility: 'off',
          },
        }, {
          'featureType': 'highway',
          'elementType': 'all',
          'stylers': {
            visibility: 'off',
          },
        }, {
          'featureType': 'arterial',
          'elementType': 'geometry',
          'stylers': {
            color: '#05192c',
          },
        }, {
          'featureType': 'poi',
          'elementType': 'all',
          'stylers': {
            color: '#05192c',
          },
        }, {
          'featureType': 'green',
          'elementType': 'all',
          'stylers': {
            'visibility': 'off',
          },
        }, {
          'featureType': 'subway',
          'elementType': 'all',
          'stylers': {
            'visibility': 'off',
          },
        }, {
          'featureType': 'local',
          'elementType': 'all',
          'stylers': {
            'color': '#fff',
          },
        }, {
          'featureType': 'arterial',
          'elementType': 'labels',
          'stylers': {
            'visibility': 'off',
          },
        }, {
          'featureType': 'boundary',
          'elementType': 'all',
          'stylers': {
            'color': '#ff0000',
          },
        }, {
          'featureType': 'building',
          'elementType': 'all',
          'stylers': {
            'color': '#000',
          },
        }, {
          'featureType': 'label',
          'elementType': 'all',
          'stylers': {
            'color': '#fff',
            'visibility': 'off',
          },
        },
          {
            'featureType': 'poilabel',
            'elementType': 'all',
            'stylers': {
              'visibility': 'off',
            },
          },
          {
            'featureType': 'manmade',
            'elementType': 'all',
            'stylers': {
              'color': '#000000',
            },
          },
          {
            'featureType': 'road',
            'elementType': 'all',
            'stylers': {
              'color': '#000000',
            },
          },
          {
            'featureType': 'all',
            'elementType': 'labels.text',
            'stylers': {
              'visibility': 'off',
            },
          }],
      },
    },
    series: [
      {
        name: 'pm2.5',
        type: 'scatter',
        coordinateSystem: 'bmap',
        data: convertData(data),
        symbolSize: function(val) {
          return val[2] / 10;
        },
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
            color: 'purple',
          },
        },
      },
      {
        name: 'Top 5',
        type: 'effectScatter',
        coordinateSystem: 'bmap',
        data: convertData(data.sort(function(a, b) {
          return b.value - a.value;
        }).slice(0, 6)),
        symbolSize: function(val) {
          return val[2] / 10;
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
            show: true,
          },
        },
        itemStyle: {
          normal: {
            color: 'purple',
            shadowBlur: 10,
            shadowColor: '#333',
          },
        },
        zlevel: 1,
      },
    ],
  };
}

export function getEqOptions() {

  const seriesLabel = {
    normal: {
      show: true,
    },
  };

  return {
    color: [colors.red, colors.blue],
    textStyle: { color: '#b3d1fc' },
    grid: { left: 50 },
    legend: {
      data: ['活跃', '总量'],
      itemWidth: 14,
      itemHeight: 14,
      borderRadius: 10,
      top: 20,
      textStyle: {
        color: '#b3d1fc',
        fontSize: 12,
      },
    },
    xAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value}',
      },
    },
    yAxis: {
      type: 'category',
      inverse: true,
      data: ['场所', '摄像枪'],
      axisLabel: {
        formatter: function(value) {
          return value;
        },
        rich: {
          value: {
            lineHeight: 30,
            align: 'center',
          },
          aa: {
            height: 40,
            align: 'center',
            backgroundColor: {
              image: '/assets/icons/building.png',
            },
          },
          bb: {
            height: 40,
            align: 'center',
            backgroundColor: {
              image: '/assets/icons/camera.png',
            },
          },
        },
      },
    },
    series: [
      {
        name: '活跃',
        type: 'bar',
        data: [105, 95],
        label: seriesLabel,

      },
      {
        name: '总量',
        type: 'bar',
        label: seriesLabel,
        data: [202, 105],
      },
    ],
  };
}
