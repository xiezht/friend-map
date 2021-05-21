<template>
  <div class="operation-wrap">
    <van-button
      size="small"
      @click="getCenter"
    >
      获取中心
    </van-button>
    <van-button
      size="small"
      @click="drawLine"
    >
      分步划线
    </van-button>
    <van-button
      size="small"
      @click="clearLine"
    >
      清除划线
    </van-button>
    <van-button
      size="small"
      @click="init"
    >
      重置头像
    </van-button>
  </div>
</template>

<script>
import { createCustomMarkerContent, CUSTOM_MARKER_ANIMATION } from '../../../common/util/map';
import { friends, travelDest, lines } from '../constrant';

export default {
  name: 'Operation',
  props: {
    // 地图渲染实例
    map: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      // 人物地点
      mapMarkerList: [],
      // 旅游地点
      cityMarkerList: [],
      // 渲染的路线
      renderLineList: [],
      lineBeijingToChengdu: null
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    getCenter() {
      console.log('中心位置', this.map.getCenter());
      console.log('放缩比例', this.map.getZoom());
    },
    init() {
      this.initAvator();
      this.initTravelDest();
      // this.initFlyLines();
    },
    initAvator() {
      if (this.mapMarkerList.length) {
        this.map.remove(this.mapMarkerList);
      }
      // 标记烧擦的头像到地图上
      this.mapMarkerList = Object.values(friends).map((item) => {
        return new AMap.Marker({
          position: new AMap.LngLat(...item.pos),
          icon: new AMap.Icon({
            image: item.icon.image,
            // size: new AMap.Size(...item.icon.size),
            imageSize: new AMap.Size(...item.icon.imageSize),
          }),
          title: item.name,
          anchor: 'bottom-center',
          offset: item.offset ? new AMap.Pixel(...item.offset) : new AMap.Pixel(0, 0),
          label: item.showLabel ? {
            content: `${item.posLabel}`,
            direction: 'bottom'
          } : ''
        });
      });
      this.map.add(this.mapMarkerList);
    },
    initTravelDest() {
      if (this.cityMarkerList.length) {
        this.map.remove(this.cityMarkerList);
      }

      // 标记旅游地点到地图上
      this.cityMarkerList = Object.values(travelDest).map((item) => {
        return new AMap.Marker({
          position: new AMap.LngLat(...item.pos),
          content: createCustomMarkerContent({
            icon: item.icon.image,
            iconStyle: {
              width: '45px',
              height: '45px',
            },
            animation: CUSTOM_MARKER_ANIMATION.ripple,
            size: [40, 40],
            label: item.posLabel
          }),
          anchor: 'center'
        })
      });
      this.map.add(this.cityMarkerList);
    },
    clearLine() {
      this.renderLineList.forEach(line => {
        this.map.remove(line);
      });
    },
    /**
     * lines的键值
     */
    drawLine() {
      this.renderLineList.forEach(line => {
        this.map.remove(line);
      });
      Object.values(lines).forEach(line => {
        this.drawLineStepByStep(line[0], line[1]);
      });
    },
    drawLineStepByStep(start, end) {
      let timer = null;
      let tempLines = [];
      let currentLine = null;

      const stepNum = 50;
      // 计算方向向量
      const dx = (end[0] - start[0]) / stepNum;
      const dy = (end[1] - start[1]) / stepNum;
      for (let i = 0; i <= stepNum; i++) {
        const tempEndX = start[0] + dx * i;
        const tempEndY = start[1] + dy * i;
        tempLines.push(
          [start, [tempEndX, tempEndY]]
        );
      }
      // console.log('debug paths', tempLines);
      tempLines.reverse();
      const renderLines = tempLines.map(line => {
        const nodeList = line.map((node) => {
          return new AMap.LngLat(...node);
        });
        return new AMap.Polyline({
          path: nodeList,
          strokeWeight: 5,
          strokeStyle: 'dashed',
          strokeColor: '#f5222d',
          // geodesic: true,
          showDir: true,
          cursor: 'pointer'
        })
      });
      timer = setInterval(() => {
        // console.log('执行划线', renderLines.length);
        if (renderLines.length === 0) {
          // 缓存最后渲染的一根线，用于清除
          this.renderLineList.push(currentLine);
          clearInterval(timer);
          timer = null;
          return;
        }
        if (currentLine) {
          this.map.remove(currentLine);
        }
        currentLine = renderLines.pop();
        this.map.add(currentLine);
      }, 100);
    }
  }
}
</script>

<style lang="scss" scoped>
.operation-wrap {
  padding: 10px 15px;
  .van-button {
    & + .van-button {
      margin-left: 10px;
    }
  }
}
</style>

