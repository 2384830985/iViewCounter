<style scoped>
    .layout {
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }

    .layout-logo {
        width: 100px;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        float: left;
        position: relative;
        top: 15px;
        left: 20px;
    }
</style>
<template>
    <div class="layout">
        <Layout>
            <Header :style="{ minHeight: '10vh'}">
                <div class="layout-logo"></div>
            </Header>
            <Layout>
                <Sider hide-trigger :style="{background: '#fff'}">
                    <Menu theme="light" width="auto">
                        <Submenu v-for="(item,index) in siderData" :key="index" :name="item.name">
                            <template slot="title">
                                <Icon :type="item.iconType" size="20"/>
                                {{item.title}}
                            </template>
                            <MenuItem v-for="(sonItem,index) in item.son" :key="index" :name="sonItem.name" :to="sonItem.routerTo">{{sonItem.title}}</MenuItem>
                        </Submenu>
                    </Menu>
                </Sider>
                <Layout :style="{padding: '24px', minHeight: '90vh'}">
                    <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                        <router-view :key="key"></router-view>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    </div>
</template>
<script>
    export default {
        name: "home",
        data() {
            return {
                siderData: [
                    {
                        title: "活动管理",
                        name:'1',
                        iconType:"logo-freebsd-devil",
                        son:[
                            {
                                title: "活动列表",
                                name: '1-1',
                                routerTo: {name:'activityList',query:{pageNumber:1,pageSize:20}},
                            },
                            {
                                title: "添加活动",
                                name: '1-2',
                                routerTo: "/home/activityAdd",
                            },
                        ]
                    },
                    {
                        title: "教官管理",
                        iconType:"md-contacts",
                        name: '2',
                        son:[
                            {
                                title: "教官列表",
                                name: '2-1',
                                routerTo: "/home/coachList?pageNumber=1&pageSize=20",

                            },
                            {
                                title: "添加教官",
                                name: '2-2',
                                routerTo: "/home/coachAdd",
                            },
                        ]
                    },
                    {
                        title: "文章管理",
                        name: '3',
                        iconType:"md-list-box",
                        son:[
                            {
                                title: "文章列表",
                                name: '3-1',
                                routerTo: "/home/articleList?pageNumber=1&pageSize=20",
                            },
                            {
                                title: "添加文章",
                                name: '3-2',
                                routerTo: "/home/articleAdd",
                            },
                        ]
                    }
                ]
            }
        },
        computed:{
            key(){
                return this.$route.name !== undefined? this.$route.name + +new Date(): this.$route + +new Date()
            }
        },
        methods: {}
    }
</script>