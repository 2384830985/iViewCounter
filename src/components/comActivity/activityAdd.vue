<template>
  <div>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
      <Row>
        <Col span="8">
          <FormItem label="活动名字" prop="title" style="width: 100%;">
            <Input v-model="formValidate.title" placeholder="活动名字"></Input>
          </FormItem>
        </Col>
        <Col span="24">
          <FormItem label="封面图片" prop="coverUrl" style="width: 100%;">
            <jsUpload v-model="formValidate.coverUrl"></jsUpload>
          </FormItem>
        </Col>
        <Col span="24">
          <FormItem label="活动简介" prop="introduction" style="width: 100%;">
            <Input v-model="formValidate.introduction" type="textarea" placeholder="活动简介"></Input>
          </FormItem>
        </Col>
        <Col span="16">
          <FormItem label="活动类别" prop="typeList" style="width: 100%;">
            <CheckboxGroup v-model="formValidate.typeList">
              <Checkbox v-for="item in activityType" :label="item.val">{{item.title}}</Checkbox>
            </CheckboxGroup>
          </FormItem>
        </Col>
        <Col span="24">
          <FormItem label="添加教官">
            <Input v-model="searchTeacher" type="text" placeholder="请输入该教官信息" style="width: 40%;"></Input>
            <Button
              type="primary"
              @click="searchTeacherClick(searchTeacher)"
              style="margin-left: 30px;"
            >添加教官</Button>
          </FormItem>
        </Col>
        <Col span="24" v-if="formValidate.teacherList.length">
          <FormItem label="参与教官" style="width: 100%;">
            <Button
              type="default"
              v-for="(item,index) in formValidate.teacherList"
              style="margin-left:8rpx;"
            >
              {{item.teacherName}}
              <Icon type="md-close" style @click="teacherListDel(index)" />
            </Button>
          </FormItem>
        </Col>
        <Col span="5">
          <FormItem label="活动日期" prop="startTime">
            <DatePicker
              :size="defaultSize"
              type="datetime"
              placeholder="开始"
              format="yyyy-MM-dd HH:mm:ss"
              v-model="formValidate.startTime"
              style="width:100%"
            ></DatePicker>
          </FormItem>
        </Col>
        <Col span="1" style="text-align: center">--</Col>
        <Col span="5" style="margin-left: -50px">
          <FormItem prop="endTime">
            <DatePicker
              :size="defaultSize"
              type="datetime"
              placeholder="结束"
              format="yyyy-MM-dd HH:mm:ss"
              v-model="formValidate.endTime"
              style="width:100%"
            ></DatePicker>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="24">
          <FormItem label="活动">
            <RadioGroup v-model="contentListIndex" type="button">
              <Radio
                v-for="(item, index) in formValidate.contentList"
                :key="item.teacherId"
                :label="index"
              >第{{index+1}}天</Radio>
            </RadioGroup>
            <Button
              type="primary"
              @click="addContentList(contentListIndex)"
              style="margin-left:8px;"
            >增加一天</Button>
            <Button
              type="default"
              @click="deleteContentList(contentListIndex)"
              style="margin-left:8px;"
            >删除当前</Button>
          </FormItem>
        </Col>
      </Row>
      <Row
        style="border: 1px solid #f9f9f9;margin:10px; padding: 50px;"
        v-for="(item,index) in formValidate.contentList[contentListIndex]"
        :key="index"
      >
        <Col span="12">
          <FormItem label="图片名称" style="width: 100%;">
            <Input v-model="item.picName" type="text" placeholder="图片名称"></Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="项目名称" style="width: 100%;">
            <jsUpload v-model="item.picUrl"></jsUpload>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="项目简介" style="width: 100%;">
            <Input v-model="item.plan" type="textarea" placeholder="项目简介"></Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="活动时间" style="width: 100%;">
            <Input v-model="item.slot" type="text" placeholder="活动时间"></Input>
          </FormItem>
        </Col>
        <Col span="24" style="margin-top:20px;">
          <FormItem label="项目操作" style="width: 100%;">
            <Button type="primary" @click="addContentUp(index)">新建项目</Button>
            <Button type="primary" @click="deleteContentThis(index)" style="margin-left:8px;">删除此项目</Button>
          </FormItem>
        </Col>
      </Row>
      <FormItem>
        <Button type="primary" @click="handleSubmit(formValidate)">{{activityId?"修改":"新建活动"}}</Button>
        <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
//activityAddOrUpdateOne,activitySelectOneById
import {
  activityAddOrUpdateOne,
  activitySelectOneById,
  activityFindTeachersByName
} from "@/axios/activity.js";
import {} from "@/axios/coach.js";
import method from "../../method/method.js";
import jsUpload from "@/components/comLayout/jsUpload";
import { exists } from "fs";
import { createHash } from 'crypto';

export default {
  components: {
    jsUpload: jsUpload
  },
  data() {
    return {
      formValidate: {
        title: "", //活动标题
        coverUrl: "", //活动封面
        typeList: [], //活动
        teacherList: [], //参与教官
        startTime: "", //开始时间
        endTime: "", //结束时间
        introduction: "", //活动简介
        contentList: [
          [
            {
              picName: "",
              picUrl: "",
              plan: "",
              slot: ""
            }
          ]
        ]
      },
      activityId: "",
      activityType: method.activityType,
      ruleValidate: {
        title: [
          { required: true, message: "请输入活动名", trigger: "blur" },
          { max: 20, message: "活动名不能超过20个字", trigger: "blur" }
        ],
        introduction: [
          { required: true, message: "请输入活动副标题", trigger: "blur" },
          { max: 40, message: "活动副标题不能超过40个字", trigger: "blur" }
        ]
      },
      contentListIndex: 0,
      defaultSize: "large",
      searchTeacher: "",
      searchTeacherList: []
    };
  },

  created() {
    const data = this.Jump.deep(this.$route.query);
    if (data.activityId) {
      this.activityId = data.activityId;
      this.start();
    }
  },
  methods: {
    // 初始化
    start() {
      activitySelectOneById(this.activityId).then(res => {
        if (res.code == 0) {
          this.formValidate = res.data;
        } else {
          res.text
            ? this.$Message.warning(res.text)
            : this.$Message.warning("错误");
        }
      });
    },
    // 搜索添加教官
    searchTeacherClick(searchTeacher) {
      console.log(searchTeacher);
      if (searchTeacher) {
        activityFindTeachersByName(searchTeacher).then(res => {
          if (res.code == 0) {
            if (res.data.length) {
              if (this.formValidate.teacherList.length) {
                // = res.data;
                let teacherList = this.formValidate.teacherList;
                let resData = res.data;
                resData.forEach(itemA => {
                  teacherList.some(itemB => {
                    console.log(itemB.teacherId, itemA.teacherId);
                    return itemB.teacherId == itemA.teacherId;
                  })
                    ? ""
                    : teacherList.push(itemA);
                });
                this.teacherList = teacherList;
                this.$Message.info(`成功添加教官并且去除重复教官`);
              } else {
                this.$Message.info(`添加跟「${searchTeacher}」有关的教官`);
                this.formValidate.teacherList = res.data;
              }
            } else {
              this.$Message.warning(`暂未找到名为${searchTeacher}的教官`);
            }
          } else {
            res.text
              ? this.$Message.warning(res.text)
              : this.$Message.warning("错误");
          }
        });
      } else {
        this.$Message.warning("请输入教官名称");
      }
    },
    // 删除教官
    teacherListDel(index) {
      let teacherList = this.formValidate.teacherList;
      teacherList.splice(teacherList.indexOf(index), 1);
      this.teacherList = teacherList;
    },
    // 添加天数
    addContentList(index) {
      let list = this.formValidate.contentList;
      if (this.formValidate.contentList.length < 7) {
        list.splice(index + 1, 0, [
          {
            picName: "",
            picUrl: "",
            plan: "",
            slot: ""
          }
        ]);
        this.formValidate.contentList = list;
        this.contentListIndex = index + 1;
      } else {
        this.$Message.warning("活动天数最多不能不过7天");
      }
    },
    // 删除天数
    deleteContentList(index) {
      let list = this.formValidate.contentList;
      if (list.length > 1) {
        list.splice(index, 1);
        this.formValidate.contentList = list;
        this.contentListIndex = 1;
      } else {
        this.$Message.warning("活动天数必须大于等于1");
      }
    },
    // 一天中添加项目
    addContentUp(index) {
      let list = this.formValidate.contentList[this.contentListIndex];
      list.splice(index + 1, 0, {
        picName: "",
        picUrl: "",
        plan: "",
        slot: ""
      });
      this.formValidate.contentList[this.contentListIndex] = list;
    },
    // 一天中删除项目
    deleteContentThis(index) {
      let list = this.formValidate.contentList[this.contentListIndex];
      console.log(list);
      list.splice(index, 1);
      this.formValidate.contentList[this.contentListIndex] = list;
    },
    handleSubmit() {
      let params = this.formValidate;
      if (params.startTime) {
        params.startTime = this.Jump.dateTransform(params.startTime);
      }
      if (params.endTime) {
        params.endTime = this.Jump.dateTransform(params.endTime);
      }

      if (!params.title) {
        this.$Message.warning("活动名为必填");
        return;
      }
      if (params.title.length > 20) {
        this.$Message.warning("活动名不能超过20个字");
        return;
      }
      if (!params.coverUrl) {
        this.$Message.warning("必须上传封面图片");
        return;
      }
      if (!params.introduction) {
        this.$Message.warning("副标题必填");
        return;
      }else if (params.introduction.length > 40) {
        this.$Message.warning("副标题不能超过40个字");
        return;
      }else{
          console.log(params.introduction)
          params.introduction=this.Jump.deleteStr(params.introduction);
      }
      if (!params.startTime) {
        this.$Message.warning("必须设置开始时间");
        return;
      }
      if (!params.endTime) {
        this.$Message.warning("必须设置结束时间");
        return;
      }
      console.log(params.contentList);
      for (let i = 0; i <params.contentList.length; i++) {
        //  picUrl plan text
        let day = params.contentList[i];
        for (let u = 0; u < day.length; u++) {
          // if (!day[u].picName) {
          //   this.$Message.warning(`第${i + 1}第${u+1}个项目缺少图片名`);
          //   return;
          // }
          if (day[u].picName.length>50) {
            this.$Message.warning(`第${i + 1}第${u+1}个项目图片名大于50字`);
            return;
          }
          if (day[u].plan.length>300) {
            this.$Message.warning(`第${i + 1}第${u+1}个项目简介大于300字`);
            return;
          }else if(day[u].plan){
            console.log(day[u].plan)
            day[u].plan= this.Jump.deleteStr(day[u].plan);
          }
          // if (!day[u].slot) {
          //   this.$Message.warning(`第${i + 1}第${u+1}个项目缺少时间`);
          //   return;
          // }
        }
      }
      this.$Modal.confirm({
        title: "确认",
        content: `确认${this.activityId ? "修改" : "新建"}活动`,
        onText: "确认",
        onOk: () => {
          activityAddOrUpdateOne(params).then(res => {
            if (res.code == 0) {
              console.log(res);
              this.$Message.info(`${this.activityId ? "修改" : "新建"}成功`);
              this.$router.push("/home/activityList");
            } else {
              res.text
                ? this.$Message.warning(res.text)
                : this.$Message.warning("错误");
            }
          });
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
.teacher-item {
  position: relative;
  display: inline-block;

  min-width: 100px;

  padding: 6px;
  font-size: 28px;
  border: 2px solid #2d8cf0;
  border-radius: 6px;
  color: #2d8cf0;
}
</style>