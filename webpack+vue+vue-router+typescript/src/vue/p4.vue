<!--
p3,4,6,7,10,11,13,14,15,17,18
-->
<style lang="scss">
  .sub-title {
    span {
      padding: 5px;
      display: inline-block;
      margin-right: 5px;
      margin-bottom: 5px;
    }
  }

  .tables .table-title {
    display: flex;
    flex-wrap: wrap;
    width: 100%;

    span {
      padding: 5px;
      display: inline-block !important;
      margin-right: 5px !important;
      margin-bottom: 5px !important;
    }
  }
</style>

<template>
  <div class="page">
    <h1 class="main-title" v-html="mainTitle"></h1>
    <div class="page-title clearfix">
      <h3>{{pageTitle[0] && pageTitle[0][0]}}</h3>
      <div>{{pageTitle[0] && pageTitle[0][2]}}</div>
      <div>至</div>
      <div>{{pageTitle[0] && pageTitle[0][1]}}</div>
    </div>

    <div class="sub-title">
      <div><span v-for="(subitem, subindex) in subTitle" :key="index">{{subitem}}</span></div>
      <div>
        <span style="color:#ff9600;">PK对比+</span>
        <span v-for="(subitem, subindex) in shop" :key="index">{{subitem}}</span>
      </div>
    </div>

    <div class="chart-list" v-for="(item, index) in chart" :key="index" ref="div">
      <div v-show="item.title"><span v-for="(subitem, subindex) in item.title" :key="index">{{subitem}}</span></div>
      <div></div>
    </div>

    <div class="page-title clearfix">
      <h3>{{pageTitle[1] && pageTitle[1][0]}}</h3>
      <div>{{pageTitle[1] && pageTitle[1][1]}}</div>
    </div>

    <div class="table tables" ref="table" v-for="(table, tableIndex) in table" :key="tableIndex">
      <p class="table-title"><span v-for="(subitem, subindex) in table.title" :key="index">{{subitem}}</span></p>
      <table>
        <thead>
        <tr>
          <th>排名</th>
          <th>公司名称</th>
          <th>选择月</th>
          <th>前一月</th>
          <th>环比差</th>
          <th>趋势</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in table.value" :key="index">
          <td>{{index + 1}}</td>
          <td v-for="(td, tdIndex) in item" :key="tdIndex" v-html="setTd(td, tdIndex)"></td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script lang="ts">
  interface SeriesObj {
    name: string,
    type: string,
    data: number[] | string[],
    stack?: string,
    yAxisIndex?: number,
    label: object
  }

  import {numberToMoney} from '../ts/comm';

  export default {
    name: 'P4',
    data() {
      return {
        mainTitle: '',
        subTitle: ['单车综合毛利（元）', '品牌-广汽丰田', '沈阳XXX店'],
        shop: ['广州XXXX店', '北京XXX店', '昆明XXX店'],
        xAxisLabel: ['1月', '2月', '3月'],
        chart: [],
        thead: ['指标', '品牌<br>标杆', '品牌<br>中位', 'A店', 'B店', 'C店', 'D店'],
        pageTitle: [],
        table: [],
      }
    },
    created() {
      const _this = this;
      const url = _this.$route.params.name;
      if (!url) {
        this.$router.push({
          name: `index`,
        })
      }
      $.ajax({
        type: 'get',
        url: `/data/${url}.json`
      }).done(function (data) {
        Vue.set(_this, 'mainTitle', data.mainTitle);
        Vue.set(_this, 'pageTitle', data.pageTitle);
        Vue.set(_this, 'chart', data.chart);
        Vue.set(_this, 'table', data.table);

        _this.$nextTick(function () {
          const charts: object = _this.$refs.div;
          [].slice.call(charts).map(function (dom, i) {
            if (dom.classList.contains('chart-list')) {
              _this.setChart(dom.querySelector('div:nth-last-child(1)'), i);
            }
          });

          // const table = _this.$refs.table;
          // [].slice.call(table).map(function (dom, i) {
          //   if (dom.classList.contains('table')) {
          //     _this.setChart(dom.querySelector('table:nth-last-child(1)'), i);
          //   }
          // });
        });
      });
    },
    methods: {
      option(data): object {
        const _this = this;
        const option = {
          title: {
            text: data.chartTitle,
            left: 'center'
          },
          legend: {
            data: [],
            bottom: 10
          },
          grid: {
            top: 40,
            bottom: 90
          },
          xAxis: {
            type: 'category',
            data: _this.xAxisLabel,
            axisTick: {
              show: false,
            },
          },
          yAxis: [{
            type: 'value',
            show: false,
          }],
          series: []
        };

        let hasLine = false;

        [].slice.call(data.value).map(function (value, index) {
          const seriesObj: SeriesObj = {
            name: value.name,
            type: value.type,
            data: value.value,
            label: {
              show: true,
              formatter(param) {
                return numberToMoney(param.value);
              }
            }
          };

          if (value.type === 'line') {
            hasLine = true;
            seriesObj.yAxisIndex = 1;
          }

          if (value.stack) {
            seriesObj.stack = value.stack;
          }
          option.series.push(seriesObj);
          option.legend.data.push(value.name);
        });

        if (hasLine) {
          option.yAxis.push({
            type: 'value',
            show: false
          });
        }


        return option;
      },
      setValue(value: number | string): string {
        return numberToMoney(value);
      },
      setChart(dom: object, i: number): void {
        const _this = this;
        const data = _this.chart[i];
        const chart = echarts.init(dom);
        chart.setOption(_this.option(data));
      },
      setTd(td, index):string {
        let txt = td;
        if ([1, 2, 3].indexOf(index) !== -1) {
          txt = numberToMoney(td) + '元';
        }

        if (index === 4) {
          txt = td > 0 ? '<i class="arrow-up"></i>' : '<i class="arrow-down"></i>';
        }
        return txt;
      }
    }
  }
</script>
