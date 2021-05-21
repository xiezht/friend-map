/**
 * @file Main组件常量
 */

import IconYimin from '../../assets/avators/yimin.jpeg';
import IconKunda from '../../assets/avators/kunda.jpeg';
import IconGuoman from '../../assets/avators/guoman.jpeg';
import IconKaichang from '../../assets/avators/kaichang.jpeg';
import IconYisheng from '../../assets/avators/yisheng.jpeg';
import IconZhentian from '../..//assets/avators/zhentian.jpeg';

import IconChengdu from '../../assets/citiy-icons/city.png';

const createIcon = (image, imageSize = [40, 40], size = [40, 40]) => {
  return {
    image,
    size,
    imageSize,
  };
};

/**
 * 城市经纬度
 */
export const cities = {
  beijing: {
    pos: [116.405285,39.904989],
    posLabel: '北京'
  },
  guangzhou: {
    pos: [113.280637,23.125178],
    posLabel: '广州'
  },
  nanjing: {
    pos: [118.767413,32.041544],
    posLabel: '南京'
  },
  kunming: {
    pos: [102.712251,25.040609],
    posLabel: '昆明'
  },
  suzhou: {
    pos: [120.619585,31.299379],
    posLabel: '苏州'
  },
  chengdu: {
    pos: [104.065735,30.659462],
    posLabel: '成都'
  }
};

/**
 * 烧擦
 */
export const friends = {
  kaichang: {
    name: '开长',
    icon: createIcon(IconKaichang),
    offset: [-40, 30],
    // 与医生头像差不多，隐藏label
    showLabel: false,
    ...cities.guangzhou
  },
  yimin: {
    name: '艺敏',
    icon: createIcon(IconYimin),
    showLabel: true,
    ...cities.suzhou
  },
  kunda: {
    name: '达爷',
    icon: createIcon(IconKunda),
    showLabel: true,
    ...cities.nanjing
    
  },
  guoman: {
    name: '郭曼',
    icon: createIcon(IconGuoman),
    showLabel: true,
    ...cities.kunming
  },
  yisheng: {
    name: '医生',
    icon: createIcon(IconYisheng),
    showLabel: true,
    ...cities.guangzhou
  },
  zhentian: {
    name: '网友',
    icon: createIcon(IconZhentian),
    showLabel: true,
    ...cities.beijing
  }
};

export const travelDest = {
  chengdu: {
    icon: createIcon(IconChengdu, [50, 50]),
    showLabel: true,
    ...cities.chengdu
  }
};


/***
 * 折线信息
 */
export const lines = {
  BeijingToChengdu: [
    cities.beijing.pos,
    cities.chengdu.pos
    // [cities.chengdu.pos[0] + 0.3, cities.chengdu.pos[1] + 0.3]
  ],
  NanjingToChengdu: [
    cities.nanjing.pos,
    cities.chengdu.pos
  ],
  SuzhouToChengdu: [
    cities.suzhou.pos,
    cities.chengdu.pos
  ],
  GuangzhouToChengdu: [
    cities.guangzhou.pos,
    cities.chengdu.pos
  ],
  KunmingToChengdu: [
    cities.kunming.pos,
    cities.chengdu.pos
  ]
};
