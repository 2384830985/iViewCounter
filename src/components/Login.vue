<template>
  <div>

    <!-- <js-upload v-model="outUrl"></js-upload>
    <quill-editor v-model="content" :options="editorOption" ref="QuillEditor"></quill-editor>
  -->
    <Button @click="xxx1">{{dateDome}}</Button>
    <DatePicker v-model='dateDome' type='datetime' format="yyyy-MM-dd HH:mm:ss" placeholder="测试dome" style="width: 200px"></DatePicker>
  </div>
  <!--<div class='login_back'>-->
  <!--<Form ref="formInline" :model="formInline" :rules="ruleInline" inline>-->
  <!--<FormItem prop="user">-->
  <!--<Input type="text" v-model="formInline.user" placeholder="Username">-->
  <!--<Icon type="ios-person-outline" slot="prepend"></Icon>-->
  <!--</Input>-->
  <!--</FormItem>-->
  <!--<FormItem prop="password" error="错误">-->
  <!--<Input type="password" v-model="formInline.password" placeholder="Password">-->
  <!--<Icon type="ios-lock-outline" slot="prepend"></Icon>-->
  <!--</Input>-->
  <!--</FormItem>-->
  <!--<FormItem>-->
  <!--<Button type="primary" @click="handleSubmit('formInline')">Signin</Button>-->
  <!--</FormItem>-->
  <!--</Form>-->
  <!--</div>-->

</template>
<script>


import jsUpload from "@/components/comLayout/jsUpload";
export default {
  name: "Login",
  components: {
    jsUpload
  },
  data() {
    return {
      xxxxxx: "",
      formInline: {
        user: "",
        password: ""
      },
      ruleInline: {
        user: [
          {
            required: true,
            message: "Please fill in the user name",
            trigger: "change"
          }
        ],
        password: [
          {
            required: true,
            message: "Please fill in the password.",
            trigger: "change"
          },
          {
            type: "string",
            min: 6,
            message: "The password length cannot be less than 6 bits",
            trigger: "change"
          }
        ]
      },
      outUrl: "",
      content: "",
      dateDome:"2019-06-11 00:00:00"
    };
  },
  mounted() {
    this.outUrl =
      "https://file.iviewui.com/dist/e1cf12c07bf6458992569e67927d767e.png";
  },
  methods: {
    handleSubmit(formInline) {
      this.$refs[formInline].validate(valid => {
        if (valid) {
          this.$Message.success("Success!");
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    // handleSubmit(a, b, c) {
    //     console.log(a)
    // }

    a() {},
    xxx1() {
      console.log(this.Jump.dateTransform(this.dateDome));
      // this.xxxxxx = this.$refs.Vueditor.getContent();
      // this.xxxxxx = this.$refs.Vueditor.getContent();
      // this.outUrl =
      //   "https://file.iviewui.com/dist/e1cf12c07bf6458992569e67927d767e.png";
      // inst.setContent('your content here');
      // inst.getContent();
    }
    
  }
};
</script>
<style scoped lang='less'>
</style>
