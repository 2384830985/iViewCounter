(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-a3df47d6"],{"0831":function(t,e,a){},"0951":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("t-content",{staticClass:"t-content-charts"},[a("div",{ref:"content",staticStyle:{"min-height":"100%"}},[a("t-title",{attrs:{title:"基础折线图"}}),a("t-content-con",{attrs:{content:"Basic Line Chart，基础折线图。折线图用于显示数据在一个连续的时间间隔或者时间跨度上的变化，它的特点是反映事物随时间或有序类别而变化的趋势。"}}),a("div",{ref:"chars"})],1)])},c=[],i=a("d225"),r=a("b0b4"),s=a("308d"),o=a("6bb5"),h=a("4e2b"),l=(a("cadf"),a("551c"),a("097d"),a("9ab4")),u=a("60a3"),f=a("7f1a"),d=a.n(f),b=a("00e1"),p=a("c41e"),v=a("b7f1"),w=a("b611"),y=a("e9a7"),j=function(t){function e(){var t;return Object(i["a"])(this,e),t=Object(s["a"])(this,Object(o["a"])(e).apply(this,arguments)),t.data=[],t}return Object(h["a"])(e,t),Object(r["a"])(e,[{key:"created",value:function(){var t=this;p["a"].$on("collapsed",function(e){setTimeout(function(){t.chart.forceFit()},500)})}},{key:"mounted",value:function(){var t=this;Object(b["a"])().then(function(e){t.data=e.data.list,t.start()})}},{key:"start",value:function(){var t=this;t.chart=new d.a.Chart({container:this.$refs.chars,forceFit:!0,width:this.$refs.content.clientWidth,height:window.innerHeight-220}),t.chart.source(t.data),t.chart.scale("value",{min:0}),t.chart.scale("year",{range:[0,1]}),t.chart.tooltip({crosshairs:{type:"line"}}),t.chart.line().position("year*value"),t.chart.point().position("year*value").size(4).shape("circle").style({stroke:"#fff",lineWidth:1}),t.chart.render()}}]),e}(u["c"]);j=l["a"]([Object(u["a"])({components:{TContentCon:y["a"],TTitle:w["a"],TContent:v["a"]}})],j);var O=j,k=O,m=(a("afd4"),a("2877")),C=Object(m["a"])(k,n,c,!1,null,null,null);e["default"]=C.exports},afd4:function(t,e,a){"use strict";var n=a("0831"),c=a.n(n);c.a}}]);