
export const CUSTOM_MARKER_ANIMATION = {
  none: '',
  ripple: 'animation-ripple'
};

/**
 * 创建地图自定义标签的内容
 * @param {Object} payload
 * @param {String} payload.uid 全局id，方便全局query
 * @param {String} payload.className 类名，用来绑定css动画
 * @param {String} payload.animation 动画类名，参见CUSTOM_MAKER_ANIMATION
 * @returns {String} 一个html片段
 */
export function createCustomMarkerContent(payload) {
  const {
    uid = '',
    className = '',
    // 外层marker
    size = [30, 30],
    icon = '',
    label = '',
    animation = CUSTOM_MAKER_ANIMATION.none,
    iconStyle = {
      width: '30px',
      height: '30px'
    }
  } = payload;
  const iconStyleStr = Object.entries(iconStyle).reduce((concatStr, curEntry) => {
    concatStr += `${curEntry[0]}: ${curEntry[1]};`;
    return concatStr;
  }, '');
  return `
    <div
      id="${uid}"
      class="custom-marker ${className} ${animation}"
    >
      <div
        class="custom-maker-icon"
        style="width: ${size[0]}px; height: ${size[1]}px"
      >
        ${
          icon
            ? `<img src="${icon}" style="${iconStyleStr}">`
            : ''
        }
      </div>
      ${
        label
          ? `<div class="amap-marker-label custom-marker-label">${label}</div>`
          : ''
      }
    </div>
  `;
};
