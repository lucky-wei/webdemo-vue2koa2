<template>
  <div class="setKline">
    <div id="container" style="width: 1600px; height: 700px"></div>
  </div>
</template>
<script>
// https://klinecharts.com/guide/getting-started.html
import { init } from "klinecharts";
import { type } from "os";
export default {
  name: "Home",
  data() {
    return {
      Chart: null,
      startData: {
        close: 4976.16, //收盘价
        high: 4977.99, //最高价
        low: 4970.12, //最低价
        open: 4972.89, //开盘价
        volume: 204, //成交量
      },
    };
  },
  components: {},
  mounted() {
    const domId = "container"; // 直接传递容器的 ID
    const chart = init(domId, {
      locale: "zh-CN",
      timezone: "Asia/Shanghai",
    });
    this.Chart = chart;
    if (chart) {
      chart.applyNewData([
        {
          close: this.startData.close, //收盘价
          high: this.startData.high, //最高价
          low: this.startData.low, //最低价
          open: this.startData.open, //开盘价
          timestamp: Date.now(), //时间戳
          volume: this.startData.volume, //成交量
        },
      ]);
      this.startRender();
    }
  },
  methods: {
    // 随机线涨跌
    // 掷骰子运动，投出涨幅/跌幅、上涨时间/下跌时间和上涨基数[0-100]
    randonModel() {
      //余数0,1,2
      const rendTrue = () => {
        const data = ((Math.random() * 10) % 2).toFixed();
        return data === "0" ? "down" : data === "1" ? "up" : rendTrue();
      };
      const trueOrFalse = rendTrue();
      let count = (Math.random() * 10).toFixed();
      return {
        model: trueOrFalse,
        time: count,
      };
    },
    // 开始计算
    startRender() {
      const { model, time } = this.randonModel();
      console.log('model', model)
      console.log('time', time)
      const timer = setInterval(() => {
        const upOrDownNum = (Math.random() * 10).toFixed(2);
        const upOrDownBuy = (Math.random() * 10).toFixed();
        this.startData.high =
          model == "up"
            ? this.startData.high + parseFloat(upOrDownNum)
            : this.startData.high - parseFloat(upOrDownNum); //最高价
        this.startData.low =
          model == "up"
            ? this.startData.low + parseFloat(upOrDownNum)
            : this.startData.low - parseFloat(upOrDownNum); //最低价
        this.startData.volume =
          model == "up"
            ? this.startData.volume + parseInt(upOrDownBuy)
            : this.startData.volume - parseInt(upOrDownBuy); //成交量
        this.Chart.updateData({
          close: 4976.16, //收盘价
          high: this.startData.high, //最高价
          low: this.startData.low, //最低价
          open: 4972.89, //开盘价
          timestamp: Date.now(), //时间戳
          volume: this.startData.volume, //成交量
        });
      }, 3000);
      setTimeout(() => {
        clearInterval(timer);
        this.startRender();
      }, time * 3000);
    },
  },
};
</script>
<style scoped>
.setKline {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
