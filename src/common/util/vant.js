import { Button } from 'vant';


const components = [Button];

/**
 * 初始化vantui
 * @param {import('@vue/runtime-core').App} app 
 */
export function initVantUi(app) {
  components.forEach(com => {
    app.use(com);
  });
};
