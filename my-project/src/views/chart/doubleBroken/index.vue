<!--双折线图-->
<template>
    <t-content class="t-content-charts">
        <div ref="content" style="min-height: 100%">
            <t-title title="曲线折线图" />
            <t-content-con content="曲线折线图，用平滑的曲线代替折线。折线图用于显示数据在一个连续的时间间隔或者时间跨度上的变化，它的特点是反映事物随时间或有序类别而变化的趋势。" />
            <div ref="chars"></div>
        </div>
    </t-content>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import G2 from '@antv/g2';
    import {chartsBoubleBroken} from '@/api/charts/index.ts';
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
            chartsBoubleBroken()
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
            var ds:any = new DataSet();
            var dv:any = ds.createView().source(_this.data);
// fold 方式完成了行列转换，如果不想使用 DataSet 直接手工转换数据即可
            dv.transform({
                type: 'fold',
                fields: ['Tokyo', 'London'], // 展开字段集
                key: 'city', // key字段
                value: 'temperature' // value字段
            });
            // 创建实例
            _this.chart = new G2.Chart({
                container: this.$refs.chars,
                forceFit: true,
                width: this.$refs.content.clientWidth,
                height: window.innerHeight-220
            });
            _this.chart.source(dv, {
                month: {
                    range: [0, 1]
                }
            });
            _this.chart.tooltip({
                crosshairs: {
                    type: 'line'
                }
            });
            _this.chart.axis('temperature', {
                label: {
                    formatter: function formatter(val:string) {
                        return val + '°C';
                    }
                }
            });
            _this.chart.line().position('month*temperature').color('city').shape('smooth');
            _this.chart.point().position('month*temperature').color('city').size(4).shape('circle').style({
                stroke: '#fff',
                lineWidth: 1
            });
            _this.chart.render();
        }
    }
</script>
<style lang="less">
    @import "../basics/style.less";
</style>