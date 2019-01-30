<!--基础折线图-->
<template>
    <t-content class="t-content-charts">
        <div ref="content" style="min-height: 100%">
            <t-title title="基础折线图" />
            <t-content-con content="Basic Line Chart，基础折线图。折线图用于显示数据在一个连续的时间间隔或者时间跨度上的变化，它的特点是反映事物随时间或有序类别而变化的趋势。" />
            <div ref="chars"></div>
        </div>
    </t-content>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import G2 from '@antv/g2';
    import {chartsBasics} from '@/api/charts/index.ts';
    import bus from '@/libs/eventBus';
    import TContent from "@/t-components/t-content/index.vue";
    import TTitle from "@/t-components/t-content-title/index.vue";
    import TContentCon from "@/t-components/t-content-con/index.vue";
    @Component({
        components: {TContentCon, TTitle, TContent}
    })
    export default class basics extends Vue {
        private data:Array<object> = [];
        private chart:any;
        // 非空断言
        $refs!:{
            chars: HTMLDivElement;
            content: HTMLDivElement;
        };
        created(){
            let _this=this;
            bus.$on("collapsed",(res:any)=>{
                setTimeout(function () {
                    _this.chart.forceFit();
                },500)
            })
        }

        mounted(){
            let _this=this;
            // 获取基础折线图数据
            chartsBasics()
                .then((res:any)=>{
                    _this.data = res.data.list
                    _this.start()
                })
        }
        /**
         * 开始执行
         */
        start() {
            let _this=this;
            // 创建实例
            _this.chart = new G2.Chart({
                container: this.$refs.chars,
                forceFit: true,
                width: this.$refs.content.clientWidth,
                height: window.innerHeight-220
            });
            // 填充数据
            _this.chart.source(_this.data);
            // 最小值
            _this.chart.scale('value', {
                min: 0
            });
            _this.chart.scale('year', {
                range: [0, 1]
            });
            // model 提示
            _this.chart.tooltip({
                crosshairs: {
                    type: 'line'
                }
            });
            // 画线
            _this.chart.line().position('year*value');
            // 画点
            _this.chart.point().position('year*value').size(4).shape('circle').style({
                stroke: '#fff',
                lineWidth: 1
            });
            // 创建
            _this.chart.render();
        }
    }
</script>
<style lang="less">
    @import "style.less";
</style>