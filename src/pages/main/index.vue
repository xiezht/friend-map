<template>
  <div class="container" ref="container">
    <operation
      v-if="map"
      :map="map"
      class="operation-area"
    />
  </div>
</template>

<script>
import _debounce from 'lodash/debounce';
// import _throttle from 'lodash/throttle';
import AMapLoader from '@amap/amap-jsapi-loader';
import Operation from './components/opeartion.vue';

// 高德地图sdk接入配置
const ENUM_AMAP_CONFIG = {
  key: 'e5590f11eaa96c1a51c58e6da55fcca5',
  version: "2.0"
};

// 地图默认配置
const ENUM_MAP_OPTION = {
  mapStyle: 'amap://styles/macaron',
  // touchZoom: false,
  // scrollWheel: false,
  // 默认中心点
  center: [110.301782, 30.894493],
  // 默认缩放比例
  zoom: 5.26,
  zooms: [4.5, 20],
  rotation: 15,
  pitch: 55,
  viewMode: '3D',
  showLabel: false
};


export default {
  name: 'Main',
  components: {
    Operation
  },
  data() {
    return {
      resizeFunc: null,
      map: null,
    }
  },
  mounted() {
    this.init();
    this.resizeFunc = _debounce(() => {
      this.map && this.map.resize();
    }, 1000);
    window.addEventListener('resize', this.resizeFunc);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.resizeFunc);
  },
  methods: {
    init() {
      const container = this.$refs.container;
      return AMapLoader.load(ENUM_AMAP_CONFIG)
        .then(() => {
          this.map = new AMap.Map(container, ENUM_MAP_OPTION);
        }).catch(err => {
          console.error(err);
        });
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  width: 100vw;
  height: 100vh;
  .operation-area {
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: 10;
    background: white;
    border: 1px solid rgba($color: #cccccc, $alpha: 0.5);
  }
  // 全局样式，调整高德地图标记的样式
  ::v-deep .amap-icon {
    border-radius: 50%;
    // border: 1px solid #cccccc;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    img {
      position: absolute;
      top: 0;
      left: 0;
    }
  }
  ::v-deep .amap-marker-label {
    font-weight: 900;
    border: none;
    color: rgba(0, 0, 0, 0.75);
    background: rgba(255, 255, 255, 0.1);   
  }
}
</style>
