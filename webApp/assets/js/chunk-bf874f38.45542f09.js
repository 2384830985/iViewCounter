(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-bf874f38"],{"256c":function(e,t,a){},"283f":function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[e._m(0),a("Form",{ref:"formValidate",attrs:{model:e.formValidate,"label-width":80}},[a("Row",{staticStyle:{margin:"28px 0 14px"}},[a("Col",{attrs:{span:"6"}},[a("FormItem",{attrs:{label:"标题",prop:"title"}},[a("Input",{attrs:{size:e.defaultSize,placeholder:""},model:{value:e.formValidate.title,callback:function(t){e.$set(e.formValidate,"title",t)},expression:"formValidate.title"}})],1)],1),a("Col",{attrs:{span:"6"}},[a("FormItem",{attrs:{label:"排序依据",prop:"sortName"}},[a("Select",{attrs:{size:e.defaultSize},model:{value:e.formValidate.sortName,callback:function(t){e.$set(e.formValidate,"sortName",t)},expression:"formValidate.sortName"}},e._l(e.sortNameList,function(t){return a("Option",{attrs:{value:t.val}},[e._v(e._s(t.title))])}),1)],1)],1),a("Col",{attrs:{span:"6"}},[a("FormItem",{attrs:{label:"排序正反",prop:"sortOrder"}},[a("Select",{attrs:{size:e.defaultSize},model:{value:e.formValidate.sortOrder,callback:function(t){e.$set(e.formValidate,"sortOrder",t)},expression:"formValidate.sortOrder"}},[a("Option",{attrs:{value:"desc"}},[e._v("倒序")]),a("Option",{attrs:{value:"asc"}},[e._v("正序")])],1)],1)],1)],1),a("Row",{staticStyle:{margin:"14px 0"}},[a("Col",{attrs:{span:"5"}},[a("FormItem",{attrs:{label:"活动日期",prop:"minCreateTime"}},[a("DatePicker",{staticStyle:{width:"100%"},attrs:{size:e.defaultSize,type:"date",placeholder:"开始"},model:{value:e.formValidate.minCreateTime,callback:function(t){e.$set(e.formValidate,"minCreateTime",t)},expression:"formValidate.minCreateTime"}})],1)],1),a("Col",{staticStyle:{"text-align":"center"},attrs:{span:"1"}},[e._v("--")]),a("Col",{staticStyle:{"margin-left":"-50px"},attrs:{span:"5"}},[a("FormItem",{attrs:{prop:"maxCreateTime"}},[a("DatePicker",{staticStyle:{width:"100%"},attrs:{size:e.defaultSize,type:"date",placeholder:"结束"},model:{value:e.formValidate.maxCreateTime,callback:function(t){e.$set(e.formValidate,"maxCreateTime",t)},expression:"formValidate.maxCreateTime"}})],1)],1)],1),a("FormItem",[a("Button",{attrs:{type:"primary"},on:{click:function(t){return e.handleSubmit("formValidate")}}},[e._v("搜索")]),a("Button",{staticStyle:{"margin-left":"8px"},on:{click:function(t){return e.handleReset("formValidate")}}},[e._v("重置")])],1)],1),a("h2",{staticStyle:{"padding-bottom":"10px",color:"#515a6e","border-bottom":"2px solid #515a6e"}},[e._v("文章列表")]),a("Table",{staticStyle:{margin:"20px 0"},attrs:{columns:e.jhColumns,data:e.jhData},scopedSlots:e._u([{key:"handle",fn:function(t){var i=t.row,r=t.index;return[i.isTop?a("a",{staticClass:"handle-item",on:{click:function(t){return e.cancleTopClick(i,r)}}},[e._v("取消置顶")]):a("a",{staticClass:"handle-item",on:{click:function(t){return e.setTopClick(i,r)}}},[e._v("置顶")]),a("a",{staticClass:"handle-item",on:{click:function(t){return e.moveBackwardClick(i,r)}}},[e._v("下移")]),a("a",{staticClass:"handle-item",on:{click:function(t){return e.moveForwardClick(i,r)}}},[e._v("上移")]),a("a",{staticClass:"handle-item",on:{click:function(t){return e.compileClick(i,r)}}},[e._v("编辑")])]}}])}),a("div",{staticStyle:{float:"right"}},[a("Page",{attrs:{total:e.jhTotal,current:e.formValidate.currentPage,"page-size":e.formValidate.size,"page-size-opts":[10,20,30,40],"show-elevator":"","show-sizer":""},on:{"on-change":e.changePage,"on-page-size-change":e.changeSize}})],1)],1)},r=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("h2",{staticStyle:{"padding-bottom":"10px",color:"#515a6e","border-bottom":"2px solid #515a6e"}},[e._v("文章管理")])])}],n=a("f499"),o=a.n(n),s=(a("7f7f"),a("c5f6"),a("dfa7")),l={name:"articleList",components:{},data:function(){return{defaultSize:"large",formValidate:{title:"",sortName:"createTime",sortOrder:"desc",maxCreateTime:"",minCreateTime:"",currentPage:1,size:20},sortNameList:[{val:"createTime",title:"开始时间"}],jhColumns:[{title:"活动名称",key:"title",align:"center"},{title:"浏览量",key:"viewNum",align:"center"},{title:"创建时间",key:"createTime",align:"center"},{title:"收藏数量",key:"storeNum",align:"center"},{title:"操作",slot:"handle",key:"handle",align:"center"}],jhData:[],pageNumber:1,pageSize:20,jhTotal:0,aDisabled:!1,bDisabled:!1,atIndex:100}},created:function(){var e=this.Jump.deep(this.$route.query);this.formValidate.currentPage=e.pageNumber?Number(e.pageNumber):1,this.formValidate.size=e.pageSize?Number(e.pageSize):20,this.start(this.formValidate)},mounted:function(){},methods:{start:function(e){var t=this,a=this;Object(s["e"])(e).then(function(e){0==e.code?(a.jhData=e.data.rows,a.jhTotal=e.data.total):e.text?t.$Message.warning(e.text):t.$Message.warning("错误")})},setTopClick:function(e,t){var a=this;Object(s["g"])(e.articleId).then(function(e){0==e.code&&(a.$Message.success("置顶成功"),a.start())})},cancleTopClick:function(e){var t=this;Object(s["b"])(e.articleId).then(function(e){0==e.code&&(t.$Message.success("取消置顶成功"),t.start())})},moveBackwardClick:function(e){var t=this;Object(s["c"])(e.articleId).then(function(e){0==e.code&&(t.$Message.success("下移成功"),t.start())})},moveForwardClick:function(e){var t=this;Object(s["d"])(e.articleId).then(function(e){0==e.code&&(t.$Message.success("上移成功"),t.start())})},compileClick:function(e){this.$router.push("/home/articleAdd?articleId=".concat(e.articleId))},handleSubmit:function(e){console.log(this.formValidate),this.formValidate.currentPage=1,this.formValidate.size=20;var t=this.formValidate;t.minCreateTime&&(t.minCreateTime=this.Jump.dateTransform(t.minCreateTime)),t.maxCreateTime&&(t.maxCreateTime=this.Jump.dateTransform(t.maxCreateTime)),this.start(t)},handleReset:function(e){this.$refs[e].resetFields(),this.formValidate.sortName="createTime",this.formValidate.sortOrder="desc"},handleItem:function(e,t){console.log(e,t)},inputcoach:function(e,t,a){console.log(e,t,a),this.aDisabled||this.bDisabled?this.$Message.info("请完成未完成的编辑"):"a"==a?(this.aDisabled=!0,this.atIndex=t):(this.bDisabled=!0,this.atIndex=t)},achangeInput:function(e,t,a){this.aDisabled=!1,console.log(e,t,a)},bchangeInput:function(e,t,a){console.log(e,t,a),this.bDisabled=!1},changePage:function(e){var t=this.$route.name,a=this.Jump.deep(this.$route.query),i=[o()(e),o()(this.formValidate.size)];a.pageNumber=i[0],a.pageSize=i[1],this.$router.push({name:t,query:a})},changeSize:function(e){var t=this.$route.name,a=this.Jump.deep(this.$route.query),i=["1",o()(e)];a.pageNumber=i[0],a.pageSize=i[1],this.$router.push({name:t,query:a})}}},c=l,u=(a("cf77"),a("2877")),m=Object(u["a"])(c,i,r,!1,null,null,null);t["default"]=m.exports},cf77:function(e,t,a){"use strict";var i=a("256c"),r=a.n(i);r.a},dfa7:function(e,t,a){"use strict";a.d(t,"e",function(){return r}),a.d(t,"g",function(){return n}),a.d(t,"b",function(){return o}),a.d(t,"c",function(){return s}),a.d(t,"d",function(){return l}),a.d(t,"f",function(){return c}),a.d(t,"a",function(){return u});var i=a("eca5");function r(e){return Object(i["a"])({url:"/article/selectByPage",method:"POST",params:e})}function n(e){return Object(i["a"])({url:"/article/setTop?articleId="+e,method:"POST"})}function o(e){return Object(i["a"])({url:"/article/cancleTop?articleId="+e,method:"POST"})}function s(e){return Object(i["a"])({url:"/article/moveBackward?articleId="+e,method:"POST"})}function l(e){return Object(i["a"])({url:"/article/moveForward?articleId="+e,method:"POST"})}function c(e){return Object(i["a"])({url:"/article/selectOne?articleId="+e,method:"POST"})}function u(e){return Object(i["a"])({url:"/article/addOrUpdateOne",method:"POST",params:e})}}}]);