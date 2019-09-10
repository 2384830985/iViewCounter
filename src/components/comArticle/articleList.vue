<template>
  <div>
    <div>
      <h2 style="padding-bottom: 10px; color: #515a6e;  border-bottom: 2px solid #515a6e;">文章管理</h2>
    </div>
    <Form :model="formValidate" ref="formValidate" :label-width="80">
      <Row style="margin: 28px 0 14px">
        <Col span="6">
          <FormItem label="标题" prop="title">
            <Input :size="defaultSize" v-model="formValidate.title" placeholder></Input>
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
      </Row>
      <Row style="margin: 14px 0">
        <Col span="5">
          <FormItem label="活动日期" prop="minCreateTime">
            <DatePicker
              :size="defaultSize"
              type="date"
              placeholder="开始"
              v-model="formValidate.minCreateTime"
              style="width:100%"
            ></DatePicker>
          </FormItem>
        </Col>
        <Col span="1" style="text-align: center">--</Col>
        <Col span="5" style="margin-left: -50px">
          <FormItem prop="maxCreateTime">
            <DatePicker
              :size="defaultSize"
              type="date"
              placeholder="结束"
              v-model="formValidate.maxCreateTime"
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
    <h2 style="padding-bottom: 10px; color: #515a6e;  border-bottom: 2px solid #515a6e;">文章列表</h2>
    <Table :columns="jhColumns" :data="jhData" style="margin: 20px 0;">
      <!--<template cl slot-scope="{ row,index}" slot="status">-->
      <!--<Input-->
      <!--v-model="row.status"-->
      <!--style="width: 100%"-->
      <!--v-if="aDisabled&&(index===atIndex)"-->
      <!--icon="md-create"-->
      <!--@on-enter="achangeInput(row.status,row,'a')"-->
      <!--@on-click="achangeInput(row.status,row,'a')"-->
      <!--&gt;</Input>-->
      <!--<div-->
      <!--style="border: 1px solid #303030"-->
      <!--@click="inputcoach(row,index,'a')"-->
      <!--v-else-->
      <!--&gt;{{row.status}}</div>-->
      <!--</template>-->
      <!--<template cl slot-scope="{ row,index}" slot="coach">-->
      <!--<Input-->
      <!--v-model="row.coach"-->
      <!--style="width: 100%"-->
      <!--v-if="bDisabled&&(index===atIndex)"-->
      <!--icon="md-create"-->
      <!--@on-enter="bchangeInput(row.coach,row,'b')"-->
      <!--@on-click="bchangeInput(value,row,'b')"-->
      <!--&gt;</Input>-->
      <!--<div-->
      <!--style="border: 1px solid #303030"-->
      <!--@click="inputcoach(row,index,'b')"-->
      <!--v-else-->
      <!--&gt;{{row.coach}}</div>-->
      <!--</template>-->
      <template slot-scope="{ row,index}" slot="handle">
        <a class="handle-item" @click="setTopClick(row,index)" v-if="!row.isTop">置顶</a>
        <a class="handle-item" @click="cancleTopClick(row,index)" v-else>取消置顶</a>
        <a class="handle-item" @click="moveBackwardClick(row,index)">下移</a>
        <a class="handle-item" @click="moveForwardClick(row,index)">上移</a>
        <a class="handle-item" @click="compileClick(row,index)">编辑</a>
        <a class="handle-item" @click="deleteClick(row,index)">删除</a>
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
import {
  articleSelectByPage,
  articleSetTop,
  articleCancleTop,
  articleMoveBackward,
  articleMoveForward,
  articleDeleteOne
} from "@/axios/article.js";
// import axios from "axios";
export default {
  name: "articleList",
  components: {},
  data() {
    return {
      defaultSize: "large",
      formValidate: {
        title: "",
        sortName: "createTime",
        sortOrder: "desc",
        maxCreateTime: "",
        minCreateTime: "",
        currentPage: 1,
        size: 20
      },
      sortNameList: [
        {
          val: "createTime",
          title: "开始时间"
        }
      ],
      jhColumns: [
        {
          title: "活动名称",
          key: "title",
          align: "center"
        },
        {
          title: "浏览量",
          key: "viewNum",
          align: "center"
        },
        {
          title: "创建时间",
          key: "createTime",
          align: "center"
        },
        {
          title: "收藏数量",
          key: "storeNum",
          align: "center"
        },
        {
          title: "操作",
          slot: "handle",
          key: "handle",
          align: "center"
        }
      ],
      jhData: [],
      pageNumber: 1,
      pageSize: 20,
      jhTotal: 0,
      aDisabled: false,
      bDisabled: false,
      atIndex: 100
    };
  },
  created() {
    const data = this.Jump.deep(this.$route.query);
    this.formValidate.currentPage = data.pageNumber
      ? Number(data.pageNumber)
      : 1;
    this.formValidate.size = data.pageSize ? Number(data.pageSize) : 20;
    this.start(this.formValidate);
  },
  mounted() {},
  methods: {
    start(formValidate) {
      let that = this;
      articleSelectByPage(formValidate).then(res => {
        //todo
        if (res.code == 0) {
          that.jhData = res.data.rows;
          that.jhTotal = res.data.total;
        } else {
          res.text
            ? this.$Message.warning(res.text)
            : this.$Message.warning("错误");
        }
      });
    },
    setTopClick(row, index) {
      //todo
      articleSetTop(row.articleId).then(res => {
        if (res.code == 0) {
          this.$Message.success("置顶成功");
          this.start(this.formValidate);
        } else {
        }
      });
    },
    cancleTopClick(row) {
      //todo
      articleCancleTop(row.articleId).then(res => {
        if (res.code == 0) {
          this.$Message.success("取消置顶成功");
          this.start(this.formValidate);
        } else {
        }
      });
    },
    //下移
    moveBackwardClick(row) {
      //todo
      articleMoveBackward(row.articleId).then(res => {
        if (res.code == 0) {
          this.$Message.success("下移成功");
          this.start(this.formValidate);
        } else {
        }
      });
    },
    // 上移
    moveForwardClick(row) {
      //todo
      articleMoveForward(row.articleId).then(res => {
        if (res.code == 0) {
          this.$Message.success("上移成功");
          this.start(this.formValidate);
        } else {
        }
      });
    },
    //编辑
    compileClick(row) {
      this.$router.push(`/home/articleAdd?articleId=${row.articleId}`);
    },
    deleteClick(row) {
      articleDeleteOne(row.articleId).then(res => {
        if (res.code == 0) {
          this.$Message.success("删除成功");
          this.start(this.formValidate);
        } else {
        }
      });
    },
    handleSubmit(name) {
      console.log(this.formValidate);
      this.formValidate.currentPage = 1;
      this.formValidate.size = 20;
      let formValidate = this.formValidate;
      if (formValidate.minCreateTime) {
        formValidate.minCreateTime = this.Jump.dateTransform(
          formValidate.minCreateTime
        );
      }
      if (formValidate.maxCreateTime) {
        formValidate.maxCreateTime = this.Jump.dateTransform(
          formValidate.maxCreateTime
        );
      }
      // "maxCreateTime": "2010-01-01 00:00:00",
      // "minCreateTime": "2000-01-01 00:00:00",
      this.start(formValidate);
    },
    handleReset(name) {
      this.$refs[name].resetFields();
      this.formValidate.sortName = "createTime";
      this.formValidate.sortOrder = "desc";
    },
    handleItem(a, b) {
      console.log(a, b);
    },
    inputcoach(a, b, c) {
      console.log(a, b, c);
      if (!this.aDisabled && !this.bDisabled) {
        if (c == "a") {
          this.aDisabled = true;
          this.atIndex = b;
        } else {
          this.bDisabled = true;
          this.atIndex = b;
        }
      } else {
        this.$Message.info("请完成未完成的编辑");
      }
    },
    achangeInput(a, b, c) {
      this.aDisabled = false;

      console.log(a, b, c);
    },
    bchangeInput(a, b, c) {
      console.log(a, b, c);
      this.bDisabled = false;
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