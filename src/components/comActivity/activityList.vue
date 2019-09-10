<template>
  <div>
    <div>
      <h2 style="padding-bottom: 10px; color: #515a6e;  border-bottom: 2px solid #515a6e;">活动管理</h2>
    </div>
    <Form :model="formValidate" ref="formValidate" :label-width="80">
      <Row style="margin: 28px 0 14px">
        <Col span="6">
          <FormItem label="活动名称" prop="activityName">
            <Input :size="defaultSize" v-model="formValidate.activityName" placeholder="请输入活动名称"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="活动类型" prop="activityType">
            <Select :size="defaultSize" v-model="formValidate.activityType">
              <Option v-for="item in activityType" :value="item.val">{{item.title}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="排序依据" prop="sortName">
            <Select :size="defaultSize" v-model="formValidate.sortName">
              <Option v-for="item in sortNameList" :value="item.val">{{item.title}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="排序正反" prop="sortOrder">
            <Select :size="defaultSize" v-model="formValidate.sortOrder">
              <Option value="desc">倒序</Option>
              <Option value="asc">正序</Option>
            </Select>
          </FormItem>
        </Col>
        <!-- <Col span="6">
                    <FormItem label="教官名称" style="font-size:24px;" prop="coachName">
                      <Select :size="defaultSize" v-model="formValidate.coachName">
                          <Option value="1">王冲</Option>
                          <Option value="2">黄冲</Option>
                          <Option value="3">王帅</Option>
                            <Option value="4">王大帅</Option>
                      </Select>
                    </FormItem>
        </Col>-->
      </Row>
      <Row style="margin: 14px 0">
        <Col span="5">
          <FormItem label="活动日期" prop="minStartTime">
            <DatePicker
              :size="defaultSize"
              type="date"
              placeholder="开始"
              v-model="formValidate.minStartTime"
              style="width:100%"
            ></DatePicker>
          </FormItem>
        </Col>
        <Col span="1" style="text-align: center">--</Col>
        <Col span="5" style="margin-left: -50px">
          <FormItem prop="maxEndTime">
            <DatePicker
              :size="defaultSize"
              type="date"
              placeholder="结束"
              v-model="formValidate.maxEndTime"
              style="width:100%"
            ></DatePicker>
          </FormItem>
        </Col>
      </Row>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formValidate')">搜索</Button>
        <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
      </FormItem>
    </Form>
    <h2 style="padding-bottom: 10px; color: #515a6e;  border-bottom: 2px solid #515a6e;">活动列表</h2>
    <Table :columns="jhColumns" :data="jhData" style="margin: 20px 0;">
      <template slot-scope="{row}" slot="coach">
        <Tooltip placement="top" :content="JSON.stringify(row.coach)">
          <div
            v-for="(item,index) in  row.coach"
            :key="index"
            class="coachname-item"
            :style="item==formValidate.coachName?'color:#2d8cf0;':''"
          >{{item}}</div>
        </Tooltip>
      </template>
      <template slot-scope="{ row }" slot="handle">
        <div class="handle-item" @click="activityDeleteOneClick(row)">删除</div>
        <div class="handle-item" @click="activityEndOneClick(row)" v-if="row.ended==0">提前结束</div>
        <div class="handle-item" @click="compileClick(row)">编辑</div>
      </template>
    </Table>
    <div style="float: right;">
      <Page
        :total="jhTotal"
        :current="formValidate.currentPage"
        :page-size="formValidate.size"
        :page-size-opts="[10, 20, 30, 40]"
        @on-change="changePage"
        @on-page-size-change="changeSize"
        show-elevator
        show-sizer
      ></Page>
    </div>
  </div>
</template>

<script>
//,activityFindTeachersByName,activityAddOrUpdateOne,activitySelectOneById
import {
  activitySelectByPage,
  activityDeleteOne,
  activityEndOne
} from "@/axios/activity.js";
import filters from "../../filters/filters.js";
import method from "../../method/method.js";
export default {
  name: "activityList",
  components: {},
  data() {
    return {
      defaultSize: "large",
      formValidate: {
        currentPage: 1,
        size: 20,
        activityName: "",
        activityType: "",
        maxEndTime: "",
        minStartTime: "",
        sortName: "startTime",
        sortOrder: "desc",
        teacherId: ""
      },
      sortNameList: [
        {
          val: "startTime",
          title: "开始时间"
        },
        {
          val: "endTime",
          title: "结束时间"
        }
      ],
      activityType: method.activityType,
      jhColumns: [
        {
          title: "活动名称",
          key: "title",
          align: "center"
        },
        {
          title: "活动类型",
          key: "types",
          align: "center",
          render: (h, params) => {
            let abc = "";
            let abcList = params.row.types.split(",");
            abcList.forEach(function(item, index) {
              abc = abc + filters.activityType(item) + ",";
            });
            return h("div", [abc]);
          }
        },
        {
          title: "浏览量",
          key: "viewNum",
          align: "center"
        },
        {
          title: "活动开始时间",
          key: "startTime",
          align: "center",
          render: (h, params) => {
            return h("div", [
              this.Jump.formatDate(params.row.startTime, "Y-M-D h-m-s")
            ]);
          }
        },
        {
          title: "活动结束时间",
          key: "endTime",
          align: "center",
          render: (h, params) => {
            return h("div", [
              this.Jump.formatDate(params.row.endTime, "Y-M-D h-m-s")
            ]);
          }
        },
        // {
        //     title: '参与教官',
        //     slot: 'coach',
        //     key: 'coach',
        //     align: 'center',
        // },
        {
          title: "操作",
          slot: "handle",
          key: "handle",
          align: "center"
        }
      ],
      jhData: [],
      jhTotal: 100
    };
  },
  created() {
    const data = this.Jump.deep(this.$route.query);
    this.formValidate.currentPage = data.pageNumber ? Number(data.pageNumber) : 1;
    this.formValidate.size = data.pageSize? Number(data.pageSize) : 20;;
    this.start(this.formValidate);
  },
  mounted() {},
  methods: {
    start(formValidate) {
      activitySelectByPage(formValidate).then(res => {
        //todo
        if (res.code == 0) {
          this.jhTotal = res.data.total;
          this.jhData = res.data.rows;
        } else {
          res.text
            ? this.$Message.warning(res.text)
            : this.$Message.warning("错误");
        }
      });
    },
    // 删除
    activityDeleteOneClick(row) {
      //todo
      this.$Modal.confirm({
        title: "确认",
        content: `确认删除「${row.title}」活动`,
        onText: "删除",
        onOk: () => {
          activityDeleteOne(row.activityId).then(res => {
            if (res.code == 0) {
              this.$Message.warning(`成功删除「${row.title}」活动`);
              this.start();
            } else {
            }
          });
        }
      });
    },
    // 提前结束
    activityEndOneClick(row) {
      // todo
      this.$Modal.confirm({
        title: "确认",
        content: `确认提前结束「${row.title}」活动`,
        onText: "提前结束",
        onOk: () => {
          activityDeleteOne(row.activityId).then(res => {
            if (res.code == 0) {
              this.$Message.warning(`「${row.title}」活动已提前结束`);
              this.start();
            } else {
            }
          });
        }
      });
    },
    //编辑
    compileClick(row) {
      //todo
      this.$router.push(`/home/activityAdd?activityId=${row.activityId}`);
    },
    handleSubmit(name) {
      this.formValidate.currentPage=1
      this.formValidate.size=20
      let formValidate =this.formValidate;
      if(formValidate.minStartTime){
       formValidate.minStartTime =this.Jump.dateTransform(formValidate.minStartTime);
        
      }
      if(formValidate.maxEndTime){
        formValidate.maxEndTime=this.Jump.dateTransform(formValidate.maxEndTime);
      }
      this.start(formValidate)
    },
    handleReset(name) {
      this.$refs[name].resetFields();
      this.formValidate.sortName='startTime'
      this.formValidate.sortOrder='desc'
    },
    handleItem(a, b) {
    },
    changePage(val) {
      let name = this.$route.name;
      let query = this.Jump.deep(this.$route.query);
      [query.pageNumber, query.pageSize] = [
        JSON.stringify(val),
        JSON.stringify(this.formValidate.size)
      ];
      this.$router.push({ name, query });
    },
    // 一页条数该便
    changeSize(val) {
      let name = this.$route.name;
      let query = this.Jump.deep(this.$route.query);
      [query.pageNumber, query.pageSize] = ["1", JSON.stringify(val)];
      this.$router.push({ name, query });
    }
  }
};
</script>
<style >
.coachname-item {
  padding-left: 4px;
  display: inline-block;
}
.handle-item {
  padding: 4px;
  display: inline-block;
  color: #2b85e4;
}
</style>