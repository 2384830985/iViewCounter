<template>
  <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
    <Row>
      <Col span="8">
        <FormItem label="教官姓名" prop="name" style="width: 100%;">
          <Input v-model="formValidate.name" placeholder="教官姓名"></Input>
        </FormItem>
      </Col>
      <Col span="24">
        <FormItem label="上传图片" prop="headPicUrl" style="width: 100%;">
          <jsUpload v-model="formValidate.headPicUrl"></jsUpload>
        </FormItem>
      </Col>
      <Col span="16">
        <FormItem label="教官一句话" prop="shortWord" style="width: 100%;">
          <Input v-model="formValidate.shortWord" type="textarea" placeholder="教官一句话"></Input>
        </FormItem>
      </Col>
      <Col span="24">
        <FormItem label="教官性别" prop="sex" style="width: 100%;">
          <RadioGroup v-model="formValidate.sex">
            <Radio v-for="item in teacherSex" :label="item.val" v-if="item.val<3">{{item.title}}</Radio>
          </RadioGroup>
        </FormItem>
      </Col>
      <Col span="24">
        <FormItem label="教官种类" prop="labelList" style="width: 100%;">
          <CheckboxGroup v-model="formValidate.labelList" label>
            <Checkbox v-for="item in teacherLabel" :label="item.val">{{item.title}}</Checkbox>
          </CheckboxGroup>
        </FormItem>
      </Col>
      <Col span="24">
        <FormItem label="添加活动">
          <Input v-model="searchActivity" type="text" placeholder="请输入活动信息" style="width: 40%;"></Input>
          <Button
            type="primary"
            @click="searchActivityClick(searchActivity)"
            style="margin-left: 30px;"
          >添加活动</Button>
        </FormItem>
      </Col>
      <Col span="24" v-if="formValidate.activityList.length">
        <FormItem label="活动经历" style="width: 100%;">
          <Button
            type="default"
            v-for="(item,index) in formValidate.activityList"
            style="margin-left:8rpx;"
          >
            {{item.activityTitle}}
            <Icon type="md-close" style @click="activityListDel(index)" />
          </Button>
        </FormItem>
      </Col>
    </Row>
    <Row style=" padding: 50px 0;" v-for="(item,index) in formValidate.remarkList" :key="index">
      <Col span="24">
        <FormItem :label="'第'+(index+1)+'条履历'" style="width: 100%;">
          <!-- <Input v-model="item.createAt" type="text" placeholder="履历时间"></Input> -->
        </FormItem>
      </Col>
      <Col span="24">
        <FormItem label="履历时间" style="width: 100%;">
          <Input v-model="item.createAt" type="text" placeholder="履历时间"></Input>
        </FormItem>
      </Col>
      <Col span="24">
        <FormItem label="履历说明" style="width: 100%;">
          <Input v-model="item.remark" type="textarea" placeholder="履历说明"></Input>
        </FormItem>
      </Col>
      <Col span="24">
        <FormItem label="履历详情" style="width: 100%;">
          <Input v-model="item.detail" type="textarea" placeholder="履历详情"></Input>
        </FormItem>
      </Col>
      <Col span="24">
        <Button @click="delRemarkList(index)" style="margin-left:40px;">删除此项履历</Button>
        <Button type="primary" @click="addRemarkList(index)" style="margin-left:40px;">添加一条履历</Button>
      </Col>
    </Row>
    <FormItem>
      <Button
        type="primary"
        @click="handleSubmit('formValidate')"
      >{{formValidate.teacherId?"修改教官信息":"新建教官"}}</Button>
      <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
    </FormItem>
  </Form>
</template>
<script>
//<!---->
import {
  teacherAddOrUpdateOne,
  teacherSelectActivitiesByTitle,
  teacherSelectOneById
} from "@/axios/coach.js";
import method from "../../method/method.js";
import jsUpload from "@/components/comLayout/jsUpload";
export default {
  components: {
    jsUpload: jsUpload
  },
  data() {
    return {
      formValidate: {
        name: "",
        headPicUrl: "",
        sex: "",
        shortWord: "",
        activityList: [],
        labelList: [],
        remarkList: [{ createAt: "", remark: "" }]
      },
      searchActivity: "",
      teacherLabel: method.teacherLabel,
      teacherSex: method.teacherSex,
      teacherActivities: [],
      ruleValidate: {
        name: [{ required: true, message: "请输入教官姓名", trigger: "blur" }],
        headPicUrl: [
          { required: true, message: "填入教官头像", trigger: "blur" }
        ],
        shortWord: [
          { message: "教官一句话最多只能有25个字", max: 25, trigger: "blur" }
        ],
        remark: [
          { message: "教官评语最多只能有250个字", max: 250, trigger: "blur" }
        ]
      },
      outList: []
    };
  },
  created() {
    const data = this.Jump.deep(this.$route.query);
    if (data.teacherId) {
      teacherSelectOneById(data.teacherId).then(res => {
        if (!res.data.remarkList) {
          res.data.remarkList = [{ createAt: "", remark: "", detail: "" }];
        }
        this.formValidate = res.data;
      });
    }
    teacherSelectActivitiesByTitle().then(res => {
      this.teacherActivities = res.data;
    });
  },
  methods: {
    searchActivityClick(searchActivity) {
      if (searchActivity) {
        teacherSelectActivitiesByTitle(searchActivity).then(res => {
          if (res.code == 0) {
            if (res.data.length) {
              if (this.formValidate.activityList.length) {
                // = res.data;
                let activityList = this.formValidate.activityList;
                let resData = res.data;
                resData.forEach(itemA => {
                  activityList.some(itemB => {
                    console.log(itemB.teacherId, itemA.teacherId);
                    return itemB.activityId == itemA.activityId;
                  })
                    ? ""
                    : activityList.push(itemA);
                });
                this.activityList = activityList;
                this.$Message.info(`成功添加活动并且去除重复活动`);
              } else {
                this.$Message.info(`添加跟「${searchActivity}」有关的活动`);
                this.formValidate.activityList = res.data;
              }
            } else {
              this.$Message.warning(`暂未找跟${searchActivity}有关的活动`);
            }
          } else {
            res.text
              ? this.$Message.warning(res.text)
              : this.$Message.warning("错误");
          }
        });
      } else {
        this.$Message.warning("请输入活动名称");
      }
    },

    // 删除教官
    activityListDel(index) {
      let activityList = this.formValidate.activityList;
      activityList.splice(activityList.indexOf(index), 1);
      this.activityList = activityList;
    },
    // 删除履历
    delRemarkList(index) {
      let list = this.formValidate.remarkList;
      if (list.length > 1) {
        list.splice(index, 1);
        this.formValidate.remarkList = list;
      } else {
        this.$Message.warning("履历必须超过一条");
      }
    },
    // 增加履历
    addRemarkList(index) {
      let list = this.formValidate.remarkList;
      list.splice(index + 1, 0, {
        remark: "",
        createAt: "",
        detail: ""
      });
      this.formValidate.remarkList = list;
    },
    handleSubmit(name) {
      if (!this.formValidate.name) {
        this.$Message.warning("请输入教官名称");
        return;
      }
      if (!this.formValidate.headPicUrl) {
        this.$Message.warning("请上传教官头像");
        return;
      }
      if (this.formValidate.shortWord.length > 25) {
        this.$Message.warning("教官一句话最多只能有25个字");
        return;
      } else {
        this.formValidate.shortWord = this.Jump.deleteStr(
          this.formValidate.shortWord
        );
      }
      // if (this.formValidate.remark.length > 250) {
      //   this.$Message.warning("教官一句话最多只能有250个字");
      //   return;
      // }
      for (let i = 0; i < this.formValidate.remarkList.length; i++) {
        console.log(
          this.formValidate.remarkList[i].createAt,
          this.formValidate.remarkList[i].remark
        );
        if (!this.formValidate.remarkList[i].createAt) {
          this.$Message.warning(`第${i + 1}条履历缺少时间`);
          return;
        } else if (this.formValidate.remarkList[i].createAt.length > 15) {
          this.$Message.warning(`第${i + 1}条履历时间超过15个字符`);
          return;
        }
        if (!this.formValidate.remarkList[i].remark) {
          this.$Message.warning(`第${i + 1}条履历缺少说明`);
          return;
        } else if (this.formValidate.remarkList[i].remark.length > 50) {
          this.$Message.warning(`第${i + 1}条履历说明超过50个字符`);
          return;
        } else {
          this.formValidate.remarkList[i].remark = this.Jump.deleteStr(
            this.formValidate.remarkList[i].remark
          );
        }
        if (!this.formValidate.remarkList[i].detail) {
          this.$Message.warning(`第${i + 1}条履历缺少详情`);
          return;
        } else if (this.formValidate.remarkList[i].detail.length > 50) {
          this.$Message.warning(`第${i + 1}条履历详情超过50个字符`);
          return;
        } else {
          this.formValidate.remarkList[i].detail = this.Jump.deleteStr(
            this.formValidate.remarkList[i].detail
          );
        }
      }
      this.$Modal.confirm({
        title: "确认",
        content: `<p>确认${
          this.formValidate.teacherId ? "修改此" : "新建"
        }教官信息</p>`,
        okText: "确认",
        cancelText: "取消",
        onOk: () => {
          teacherAddOrUpdateOne(this.formValidate).then(res => {
            if (res.code == 0) {
              this.$Message.info(
                `${this.formValidate.teacherId ? "修改" : "新建"}成功`
              );
              this.$router.push("/home/coachList");
            } else {
              //todo
            }
          });
        },
        onCancel: () => {
          this.$Message.info(
            `请确认${this.formValidate.teacherId ? "修改" : "新建 "}后再提交`
          );
          return;
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    }
  }
};
</script>

<style scoped>
</style>