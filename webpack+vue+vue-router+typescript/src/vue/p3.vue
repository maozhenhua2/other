<!--
p2,p5,p8
-->
<style lang="scss">
  .area-list {
    & > div {
      &:nth-child(3),
      &:nth-child(4) {
        margin-bottom: 10px;
        border-bottom: 1px solid #f2f2f2;
      }
    }
  }
</style>

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
        <div><span>实际-预算</span><span>{{setValue(item.actual)}}</span></div>
        <div><span>实际vs预算%</span><span>
          <i v-if="item.budget > 0" class="arrow-up"></i>
          <i v-else class="arrow-down"></i>
          {{setValue(item.budget)}}%</span></div>
      </div>
    </div>
    <div class="page-title clearfix">
      <h3>{{pageTitles[1] && pageTitles[1][0]}}</h3>
      <div>{{pageTitles[1] && pageTitles[1][1]}}</div>
    </div>
    <div class="brand-list area-list">
      <div class="brand-part" v-for="(item, index) in area" :key="item.name">
        <div><span>{{item.name}}</span></div>
        <div><span>实际-预算</span><span>{{setValue(item.actual)}}</span></div>
        <div><span>实际vs预算%</span><span>
          <i v-if="item.budget > 0" class="arrow-up"></i>
          <i v-else class="arrow-down"></i>
          {{setValue(item.budget)}}%</span></div>
      </div>
      <div class="brand-part" style="justify-content: center;align-items: center;">更多......</div>
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
    name: 'P3',
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
