<template>
  <div>
    <my-bread class="bread" level1="数据统计" level2="数据报表"></my-bread>
    <div id="main" style="margin-top:30px; width: 500px; height: 300px"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
  data() {
    return {
      option: {},
    };
  },
  mounted() {
    var myChart = echarts.init(document.getElementById("main"));
    this.$http.get(`reports/type/1`).then((res) => {
      console.log(res);
      const {
        data,
        meta: { msg, status },
      } = res.data;
      if (status !== 200) {
        this.$message(msg);
      }
      let option1 = {
        title: {
          text: "数据报表",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
      };
      let option2 = data;
      let option = {...option1, ...option2};
      myChart.setOption(option);
    });
  },
};
</script>

<style>
</style>