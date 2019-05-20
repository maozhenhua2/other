<!--
p2,p5,p8
-->


<template>
  <div class="page">
    <h1 class="main-title" v-html="mainTitle"></h1>
    <div class="page-title clearfix">
      <h3>{{pageTitles[0] && pageTitles[0][0]}}</h3>
      <div>{{pageTitles[0] && pageTitles[0][1]}}</div>
    </div>
    <div class="brand-list">
      <div class="brand-part" v-for="(item, index) in brand" :key="item.name">
        <div><img :src="'../imgs/' + item.url" alt=""><span>{{item.txt}}</span></div>
        <div><span>品牌各店月总</span><span>{{setValue(item.month)}}</span></div>
        <div><span>品牌单店平均</span><span>{{setValue(item.average)}}</span></div>
      </div>
    </div>
    <div class="page-title clearfix">
      <h3>{{pageTitles[1] && pageTitles[1][0]}}</h3>
      <div>{{pageTitles[1] && pageTitles[1][1]}}</div>
    </div>
    <div class="table">
      <div v-for="(item, index) in area" :key="item.name">
        <span>{{item.name}}</span>
        <span>{{setValue(item.value)}}</span>
      </div>
      <div>更多......</div>
    </div>
    <div class="page-title clearfix">
      <h3>
        <span>{{pageTitles[2] && pageTitles[2][0]}}</span>
        <span>{{pageTitles[2] && pageTitles[2][1]}}</span>
      </h3>
    </div>
    <div class="map">
      <img src="../imgs/map.png" alt="">
    </div>
    <!--<h1>page day1</h1>
    <ul>
      <li><router-link :to="{path: '/', index: ''}">back</router-link></li>
      <li></li>
    </ul>-->
  </div>
</template>
<script lang="ts">
  import {numberToMoney} from '../ts/comm';

  export default {
    name: 'P1',
    data(): object {
      return {
        mainTitle: '',
        pageTitles: [],
        brand: [],
        area: [],
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
        Vue.set(_this, 'pageTitles', data.pageTitles);
        Vue.set(_this, 'brand', data.brand);
        Vue.set(_this, 'area', data.area);
      });
    },
    methods: {
      setValue(value: number | string): string {
        return numberToMoney(value);
      },
    }
  }
</script>
