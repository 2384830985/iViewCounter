<template>
    <ColorPicker v-model="color" @on-change="changeColor" :colors="colors"/>
</template>

<script lang="ts">
    // 获取当ui版本号去加载css
    const version:string = require('iview/package.json').version;
    import { Component, Vue } from 'vue-property-decorator';
    import { State, Action, Getter ,Mutation } from "vuex-class";
    @Component
    export default class headerColorPicker extends Vue{
        private color:string;
        private cssList:string;
        public colors:Array<string> = ['#2d8cf0','#311B92', '#512DA8', '#673AB7', '#9575CD', '#D1C4E9']
        @State ColorPicker:any;
        @State DefaultColor:any;
        @Mutation SET_COLORPICKER:any;
        constructor(){
            super();
            this.color = '';
            this.cssList = ''
        }
        mounted(){
            let _this = this;
            this.color = this.ColorPicker;
            _this.start()
        }
        start(){
            let _this = this;
            // 获取当前的ui.css
            let url:string = `https://unpkg.com/iview@${version}/dist/styles/iview.css`;
            const xhr:any = new XMLHttpRequest();
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    // 去除字体css
                    _this.cssList = xhr.responseText.replace(/@font-face{[^}]+}/, '')
                    if (this.ObtainNewColor()!==_this.DefaultColor) {
                        this.changeColorPicker(_this.DefaultColor,this.ObtainNewColor(),'start')
                    }
                }
            }
            xhr.open('GET', url);
            xhr.send();
        }
        /**
         * 改变颜色
         */
        changeColor(color:string){
            this.changeColorPicker(this.ObtainNewColor(),color)
        }
        /**
         * 获取最新的color
         */
        ObtainNewColor(){
            let lodColor:string = localStorage.getItem('ColorPicker')||this.DefaultColor;
            return lodColor
        }
        /**
         * 当前选择的颜色
         * @param {string} color
         */
        changeColorPicker(lodColor:string,newColor:string,type?:string){
            let _this = this;
            // 获取所有老的颜色值（透明度）
            const themeCluster = this.getThemeCluster(lodColor.replace('#', ''));
            // 获取所有新的颜色值（透明度）
            const originalCluster = this.getThemeCluster(newColor.replace('#', ''));
            /**
             * 对老和新对值（color）进行替换
             */
            themeCluster.forEach((res:string,index:number)=>{
                _this.cssList = _this.cssList.replace(new RegExp(res, 'ig'),originalCluster[index])
            });
            /**
             * 获取当前style的节点
             */
            let styleTag = document.getElementById('chalk-style')
            // 判断无节点创建
            if (!styleTag) {
                styleTag = document.createElement('style')
                styleTag.setAttribute('id', 'chalk-style')
                document.head.appendChild(styleTag)
            }
            // 插入
            styleTag.innerText = _this.cssList;
            // 第一次进来不需要提示
            if (!type) {
                // 更新vuex localStorage 的值
                this.SET_COLORPICKER(newColor)
                this.$Message.success('换肤成功')
            }
        }


        /**
         * 所有颜色获取（需要替换的颜色以及替换颜色）
         * @param {string} theme
         * @returns {string[]}
         */
        getThemeCluster(theme:string) {
            // 0.1-0.9 透明度获取
            const tintColor = (color:string, tint:number) => {
                let red:string|number = parseInt(color.slice(0, 2), 16)
                let green:string|number = parseInt(color.slice(2, 4), 16)
                let blue:string|number = parseInt(color.slice(4, 6), 16)

                if (tint === 0) { // when primary color is in its rgb space
                    return [red, green, blue].join(',')
                } else {
                    red += Math.round(tint * (255 - red))
                    green += Math.round(tint * (255 - green))
                    blue += Math.round(tint * (255 - blue))

                    red = red.toString(16)
                    green = green.toString(16)
                    blue = blue.toString(16)

                    return `#${red}${green}${blue}`
                }
            }
            // 1的透明度
            const shadeColor = (color:string, shade:number) => {
                let red:string|number = parseInt(color.slice(0, 2), 16)
                let green:string|number = parseInt(color.slice(2, 4), 16)
                let blue:string|number = parseInt(color.slice(4, 6), 16)

                red = Math.round((1 - shade) * red)
                green = Math.round((1 - shade) * green)
                blue = Math.round((1 - shade) * blue)

                red = red.toString(16)
                green = green.toString(16)
                blue = blue.toString(16)

                return `#${red}${green}${blue}`
            }

            const clusters = [theme];
            for (let i = 0; i <= 9; i++) {
                clusters.push(tintColor(theme, Number((i / 10).toFixed(2))))
            }
            clusters.push(shadeColor(theme, 0.1))
            return clusters
        }
    }
</script>


<style scoped>
    .font-16{
        font-size: 16px;
    }
</style>