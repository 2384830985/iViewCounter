<template>
  <div>
    <div>
      <h2 style="padding-bottom: 10px; color: #515a6e;  border-bottom: 2px solid #515a6e;">教官管理</h2>
    </div>
    <Form :model="formValidate" ref="formValidate" :label-width="80">
      <Row style="margin: 28px 0 14px">
        <Col span="6">
          <FormItem label="教官名称" prop="name">
            <Input :size="defaultSize" v-model="formValidate.name" placeholder></Input>
          </FormItem>
        </Col>
        <!--<Col span="6">-->
        <!--<FormItem label="次数排序" style="font-size:24px;" prop="coachName">-->
        <!--<Select :size="defaultSize" v-model="formValidate.coachName">-->
        <!--<Option value="1">由高到低</Option>-->
        <!--<Option value="2">由低到高</Option>-->
        <!--</Select>-->
        <!--</FormItem>-->
        <!--</Col>-->
        <Col span="6">
          <FormItem label="教官标签" prop="label">
            <Select :size="defaultSize" v-model="formValidate.label">
              <Option v-for="item in teacherLabel" :value="item.val">{{item.title}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="教官性别" prop="sex">
            <Select :size="defaultSize" v-model="formValidate.sex">
              <Option v-for="item in teacherSex" :value="item.val">{{item.title}}</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Row>
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
      <FormItem>
        <Button type="primary" @click="handleSubmit('formValidate')">搜索</Button>
        <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
      </FormItem>
    </Form>
    <h2 style="padding-bottom: 10px; color: #515a6e;  border-bottom: 2px solid #515a6e;">教官列表</h2>
    <Table :columns="jhColumns" :data="jhData" style="margin: 20px 0;">
      <template slot-scope="{ row }" slot="handle">
        <div class="handle-item" @click="teacherDeleteOneClick(row)">删除</div>
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
//<!--teacherAddOrUpdateOne,,teacherSelectActivitiesByTitle,-->
import { teacherSelectByPage, teacherDeleteOne } from "@/axios/coach.js";
import filters from "../../filters/filters.js";
import method from "../../method/method.js";
import { POINT_CONVERSION_COMPRESSED } from "constants";
export default {
  name: "coachList",
  components: {},
  data() {
    return {
      defaultSize: "large",
      formValidate: {
        currentPage: 1,
        size: 20,
        name: "",
        label: "",
        sex: "",
        sortName: "updateTime",
        sortOrder: "desc"
      },
      sortNameList: [
        {
          val: "updateTime",
          title: "编辑时间"
        },
        // {
        //   val: "activityNum",
        //   title: "活动次数"
        // }
      ],
      jhColumns: [
        {
          title: "教官姓名",
          key: "name",
          align: "center"
        },
        // {
        //   title: "教官性别",
        //   key: "sex",
        //   align: "center"
        // },
        {
          title: "教官性别",
          key: "sex",
          align: "center",
          render: (h, params) => {
            console.log(params);
            return h("div", [filters.teacherSex(params.row.sex)]);
          }
        },
        {
          title: "教官标签",
          key: "labelList",
          align: "center",
          render: (h, params) => {
            let abc = "";
            params.row.labelList.forEach(function(item, index) {
              abc = abc + filters.teacherLabel(item) + ",";
            });
            return h("div", [abc]);
          }
        },
        {
          title: "参加活动次数",
          key: "activityNum",
          align: "center",
          render: (h, params) => {
            console.log(params);
            return h("div", [
              params.row.activityNum ? params.row.activityNum : 0
            ]);
          }
        },
        {
          title: "编辑时间",
          key: "updateTime",
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
      jhTotal: 100,
      teacherLabel: method.teacherLabel,
      teacherSex: method.teacherSex
    };
  },
  created() {
    const data = this.Jump.deep(this.$route.query);
    this.formValidate.currentPage = data.pageNumber ? Number(data.pageNumber) : 1;
    this.formValidate.size = data.pageSize ? Number(data.pageSize) : 20;
    this.start(this.formValidate);
  },
  mounted() {},
  methods: {
    start(formValidate) {
      // this.getActivity();
      teacherSelectByPage(formValidate).then(res => {
        //todo
        if (res.code == 0) {
          this.jhData = res.data.rows;
          this.jhTotal = res.data.total;
        } else {
          res.text? this.$Message.warning(res.text): this.$Message.warning("错误");
        }
      });
    },
    // 删除教官
    teacherDeleteOneClick(row) {
      //todo
      this.$Modal.confirm({
        title: "确认",
        content: `确认删除「${row.name}」教官`,
        onText: "删除",
        onOk: () => {
          teacherDeleteOne(row.teacherId).then(res => {
            if (res.code == 0) {
              this.$Message.warning(`成功删除「${row.name}」教官`);
              this.start();
            } else {
              res.text? this.$Message.warning(res.text): this.$Message.warning("错误");
            }
          });
        }
      });
    },
    compileClick(row) {
      //todo
      this.$router.push(`/home/coachAdd?teacherId=${row.teacherId}`);
    },
    getActivity() {},
    handleSubmit(name) {
      this.formValidate.currentPage = 1;
      this.formValidate.size = 20;
      let formValidate = this.formValidate;
      this.start(formValidate)
    },
    handleReset(name) {
      this.$refs["formValidate"].resetFields();
      this.formValidate.sortName = "updateTime";
      this.formValidate.sortOrder = "desc";
    },
    handleItem(a, b) {
      console.log(a, b);
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