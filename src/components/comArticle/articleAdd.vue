<template>
  <div>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
      <Row>
        <Col span="12">
          <FormItem label="文章标题" prop="title">
            <Input v-model="formValidate.title" placeholder="文章标题"></Input>
          </FormItem>
        </Col>
        <Col span="24">
          <FormItem label="封面图片" prop="coverUrl">
            <jsUpload v-model="formValidate.coverUrl"></jsUpload>
          </FormItem>
        </Col>
        <Col span="24">
          <Upload
            class="upload-ed"
            :show-upload-list="false"
            :format="['jpg','jpeg','png']"
            :max-size="2048"
            :on-success="handleSuccess"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            :before-upload="handleBeforeUpload"
            multiple
            type="drag"
            :action="pushUrl"
            hidden
          ></Upload>
          <FormItem label="文章内容" prop="content" style="min-height: 320px;">
            <quill-editor
              class="diy-vueditor"
              v-model="formValidate.content"
              :options="editorOption"
              ref="QuillEditor"
            ></quill-editor>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="24">
          <FormItem>
            <Button type="primary" @click="handleSubmit(formValidate)">{{articleId?'修改':'新增'}}</Button>
            <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
          </FormItem>
        </Col>
      </Row>
    </Form>
  </div>
</template>
<script>
import { articleAddOrUpdateOne, articleSelectOne } from "@/axios/article.js";
import jsUpload from "@/components/comLayout/jsUpload";
import { exists } from "fs";
import confing from "@/axios/confing.js";
// 傻逼玩意富文本编辑器的配置项
const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],
  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction

  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],
  ["link", "image", "video"],
  ["clean"] // remove formatting button
];
export default {
  name: "articleAdd",
  components: {
    jsUpload
  },
  data() {
    return {
      formValidate: {
        title: "",
        coverUrl: "",
        content: ""
      },
      ruleValidate: {
        title: [{ required: true, message: "请输入文章标题", trigger: "blur" }],
        coverUrl: [
          { required: true, message: "请输入文章内容", trigger: "blur" }
        ],
        content: [
          { required: true, message: "请输入文章内容", trigger: "blur" }
        ]
      },
      articleId: "",
      editorOption: {
        modules: {
          toolbar: {
            container: toolbarOptions, // 工具栏
            handlers: {
              image: function(value) {
                if (value) {
                  document.querySelector(".upload-ed input").click();
                } else {
                  this.quill.format("image", false);
                }
              }
            }
          }
        }
      },
      pushUrl: `${confing.url}/public/uploadFile`
    };
  },

  created(value) {
    const data = this.Jump.deep(this.$route.query);
    if (data.articleId) {
      this.start(data.articleId);
    }
  },
  methods: {
    start(articleId) {
      let that = this;
      articleSelectOne(articleId).then(res => {
        if (res.code == 0) {
          this.formValidate.coverUrl = res.data.coverUrl;
          this.formValidate.title = res.data.title;
          this.formValidate.content = res.data.content;
          this.articleId = res.data.articleId;
        } else {
          res.text
            ? this.$Message.warning(res.text)
            : this.$Message.warning("错误");
        }
      });
    },
    // 上传成功
    handleSuccess(res) {
      // 获取富文本组件实例
      let quill = this.$refs.QuillEditor.quill;
      this.$Spin.hide();
      // 如果上传成功
      if (res) {
        console.log(res);
        // 获取光标所在位置
        let length = quill.getSelection().index;
        // 插入图片，res为服务器返回的图片链接地址
        quill.insertEmbed(length, "image", res.data);
        // 调整光标到最后
        quill.setSelection(length + 1);
        this.$Message.info("图片设置成功");
      } else {
        // 提示信息，需引入Message
        this.$Message.error("图片插入失败");
      }
    },
    // 文件格式不正确
    handleFormatError(file) {
      this.$Notice.warning({
        title: "文件格式不正确",
        desc: `${file.name} 的文件格式不正确，请选择JPG或PNG`
      });
    },
    // 图片尺寸不对
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "图片大小超过限制",
        desc: `${file.name} 文件太大，不能超过2M`
      });
    },
    handleBeforeUpload(a) {
      this.$Spin.show();
    },
    handleSubmit(e) {
      //   this. = this.$refs.Vueditor.getContent()
      //todo
      if (!this.formValidate.title) {
        this.$Message.warning("请添加文章标题");
        return;
      }
      if (!this.formValidate.coverUrl) {
        this.$Message.warning("请上传文章封面图片");
        return;
      }

      if (!this.formValidate.content) {
        this.$Message.warning("请填写文章主内容");
        return;
      }
      if (this.articleId) {
        this.formValidate.articleId = this.articleId;
      }
      this.$Modal.confirm({
        title: "确认",
        content: `<p>确认${this.articleId ? "修改这" : "新建一"}篇文章</p>`,
        okText: "确认",
        cancelText: "取消",
        onOk: () => {
          articleAddOrUpdateOne(this.formValidate).then(res => {
            if (res.code == 0) {
              this.$Message.info(`${this.articleId ? "修改" : "新建"}成功`);
              this.$router.push("/home/articleList");
            } else {
              res.text
                ? this.$Message.warning(res.text)
                : this.$Message.warning("错误");
            }
          });
        },
        onCancel: () => {
          this.$Message.info(
            `请确认${this.articleId ? "修改" : "新建"}后再提交`
          );
          return;
        }
      });
    }
  }
};
</script>

<style scoped>
.diy-vueditor {
  line-height: normal;
  height: 240px;
}
</style>