<!--
p3,4,6,7,10,11,13,14,15,17,18
-->
<template>
  <div class="page">
    <h1 class="main-title" v-html="mainTitle"></h1>
    <div class="page-title clearfix">
      <h3>{{pageTitle[0] && pageTitle[0][0]}}</h3>
      <div>{{pageTitle[0] && pageTitle[0][1]}}</div>
      <div>{{pageTitle[0] && pageTitle[0][2]}}</div>
    </div>
    <div>

      <div :class="{'chart-list': item.type !== 'table', 'table': item.type === 'table'}" v-for="(item, index) in chart" :key="index" ref="div">

        <div><span v-for="(subitem, subindex) in item.title" :key="index">{{subitem}}</span></div>
        <div v-if="item.type !== 'table'"></div>

        <table v-if="item.type === 'table'">
          <thead>
          <tr>
            <th v-bind:style="{'width': index === 0 ? '20%' : '10%' }" v-for="(th, index) in thead" :key="index" v-html="th"></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(tr, trindex) in item.value" :key="trindex">
            <td v-for="(td, tdindex) in tr" :key="tdindex">{{td}}</td>
          </tr>
          </tbody>
        </table>
      </div>

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
    name: 'P2',
    data() {
      return {
        mainTitle: '',
        pageTitle: [],
        xAxisLabel: ['品牌标杆', '品牌中位', 'A店', 'B店', 'C店', 'D店'],
        chart: [],
        thead: ['指标', '品牌<br>标杆', '品牌<br>中位', 'A店', 'B店', 'C店', 'D店'],
        // table: [],
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
        if (!!data.thead) {
          Vue.set(_this, 'thead', data.thead);
        }
        if (!!data.xAxisLabel) {
          Vue.set(_this, 'xAxisLabel', data.xAxisLabel);
        }
        Vue.set(_this, 'mainTitle', data.mainTitle);
        Vue.set(_this, 'pageTitle', data.pageTitle);
        Vue.set(_this, 'chart', data.chart);

        _this.$nextTick(function () {
          const charts: object = _this.$refs.div;
          [].slice.call(charts).map(function (dom, i) {
            if (dom.classList.contains('chart-list')) {
              _this.setChart(dom.querySelector('div:nth-child(2)'), i);
            }
            // _this.setChart(dom, i);
          });
        });
      });
    },
    methods: {
      option(data): object {
        const _this = this;
        const option = {
          legend: {
            data: [],
          },
          grid: {
            top: 100
          },
          xAxis: {
            type: 'category',
            data: _this.xAxisLabel,
            axisTick: {
              show: false,
            },
            axisLabel: {
              rotate: 45
            },
          },
          yAxis: [{
            type: 'value',
            show: false,
          }],
          series: []
        };

        let hasLine = false;

        [].slice.call(data).map(function (value, index) {
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
        chart.setOption(_this.option(data.value));
      }
    }
  }
</script>
