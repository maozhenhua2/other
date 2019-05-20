<style lang="scss">
  .main-nav {
    i {
      display: block;
      width: 4.5rem;
      height: 4.5rem;
      border-radius: 999px;
      background-color: #f2f2f2;
      margin: 5px auto 15px;
      line-height: 4.5rem;
      color: #fff;
      font-style: normal;
      font-size: 2.5rem;
      text-align: center;
      box-shadow: 1px 1px 5px 1px rgba(206, 206, 206, 0.5);
    }
  }

  .bg-red {
    background: linear-gradient(50deg, rgba(248, 94, 9, 0.5) 0%, rgba(248, 94, 9, 1) 100%);
  }

  .bg-yellow {
    background: linear-gradient(50deg, rgba(251, 229, 0, 0.5) 0%, rgba(251, 229, 0, 1) 100%);
  }

  .bg-green {
    background: linear-gradient(50deg, rgba(0, 255, 107, 0.5) 0%, rgba(0, 255, 107, 1) 100%);
  }

  .bg-blue {
    background: linear-gradient(50deg, rgba(0, 57, 255, 0.5) 0%, rgba(0, 57, 255, 1) 100%);
  }

  .bg-orange {
    background: linear-gradient(50deg, rgba(255, 150, 0, 0.5) 0%, rgba(255, 150, 0, 1) 100%);
  }

  .bg-lightred {
    background: linear-gradient(50deg, rgba(255, 113, 143, 0.5) 0%, rgba(255, 113, 143, 1) 100%);
  }

  .day-list {
    a {
      span {
        display: block;
        text-align: center;
        margin: 5px 0;
        font-size: 1.2rem;

        &:nth-child(1) {
          font-weight: bold;
        }

        &:nth-child(2) {
          color: #717274;
        }
      }
    }
  }

  .week-chart-list {
    & > div {
      height: 100px;
      margin: 10px;
      border: 1px solid #f2f2f2;
    }
  }

</style>
<template>
  <div class="page">
    <h1 class="main-title">汽车经销商集团业绩管理（总览）</h1>
    <div class="main-nav float-grid clearfix">
      <a href="#/p1/p9"><i class="bg-red">盈</i><span>盈利分析</span></a>
      <a href="#/p2/p7"><i class="bg-yellow">销</i><span>销售业务分析</span></a>
      <a href="#/"><i class="bg-green">售</i><span>售后业务分析</span></a>
      <a href="#/"><i class="bg-blue">预</i><span>预实分析</span></a>
      <a href="#/"><i class="bg-orange">对</i><span>对标分析</span></a>
      <a href="#/"><i class="bg-lightred">费</i><span>费用管控</span></a>
    </div>
    <div class="page-title clearfix">
      <h3>日业报</h3>
      <div>2019年4月29日</div>
    </div>
    <div class="float-grid day-list">
      <a v-for="(item, index) in dayList" :key="item.name">
        <span>{{setValue(item.day)}}</span>
        <span>{{item.name}}</span>
      </a>
    </div>
    <div class="page-title clearfix">
      <h3>周业报</h3>
      <div>
        <span>2019年</span>
        <span>W13</span>
        <span>4月15日~4月21日</span>
      </div>
    </div>
    <div class="week-chart-list">
      <div v-for="(item, index) in dayList" :key="item.name" ref="div"></div>
    </div>

    <!--<ul>
      <li><router-link :to="{path: '/day1', index: 'day1'}">day1</router-link></li>
      <li><router-link :to="{path: '/week1', index: 'week1'}">week1</router-link></li>
    </ul>-->
  </div>
</template>
<script lang="ts">
  import {numberToMoney} from '../ts/comm';

  export default {
    name: 'Index',
    data() {
      return {
        xAxisLabel: ['1', '2', '3', '4', '5', '6', '7'],
        dayList: [
          {'name': '总收入', 'code': '', 'day': '1234567', 'week': [1, 2, 3, 4, 5, 6, 7]},
          {'name': '销售业务收入', 'code': '', 'day': '1234567', 'week': [1, 2, 3, 4, 5, 6, 7]},
          {'name': '售后业务收入', 'code': '', 'day': '1234567', 'week': [1, 2, 3, 4, 5, 6, 7]},
          {'name': '总毛利', 'code': '', 'day': '1234567', 'week': [1, 2, 3, 4, 5, 6, 7]},
          {'name': '销售业务毛利', 'code': '', 'day': '1234567', 'week': [1, 2, 3, 4, 5, 6, 7]},
          {'name': '售后业务毛利', 'code': '', 'day': '1234567', 'week': [1, 2, 3, 4, 5, 6, 7]},
          {'name': '总交车量', 'code': '', 'day': '1234567', 'week': [1, 2, 3, 4, 5, 6, 7]},
          {'name': '总库存量', 'code': '', 'day': '1234567', 'week': [1, 2, 3, 4, 5, 6, 7]},
          {'name': '总销售潜客量', 'code': '', 'day': '1234567', 'week': [1, 2, 3, 4, 5, 6, 7]},
        ]
      }
    },
    mounted(): void {
      const _this = this;
      _this.$nextTick(function () {
        const charts: object[] = _this.$refs.div;
        charts.map(function (dom, i) {
          _this.setChart(dom, i);
        });
      });
    },
    methods: {
      option(data): object {
        const _this = this;
        return {
          legend: {
            data: [data.name],
            bottom: 0,
          },
          color: ['#4472C4'],
          grid: {
            top: 10,
            bottom: 50,
          },
          xAxis: {
            type: 'category',
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            data: _this.xAxisLabel,
          },
          yAxis: {
            type: 'value',
            show: false,
          },
          series: [{
            name: data.name,
            data: data.week,
            type: 'bar',
          }]
        };
      },
      setValue(value: number | string): string {
        return numberToMoney(value);
      },
      setChart(dom: object, i: number): void {
        const _this = this;
        const data = _this.dayList[i];
        const chart = echarts.init(dom);
        chart.setOption(_this.option(data));
      },
      toP2(name) {
        this.$router.push({
          name: `p2`,
          params: {
            name: name
          }
        })
      }
    }
  }
</script>
