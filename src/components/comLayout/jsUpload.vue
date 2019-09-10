<template>
  <div>
    <div :class="'img-item  img-item_'+showSize" v-if="url">
      <template v-if="showData.status === 'finished'">
        <img :src="url">.
        <div class="img-item-cover">
          <Icon type="ios-eye-outline" :size="iconSize" @click.native="handleView(url)"></Icon>
          <Icon type="ios-trash-outline" :size="iconSize" @click.native="handleRemove()"></Icon>
        </div>
      </template>
      <!-- 进度条 -->
      <template v-else>
        <Progress v-if="showData.showProgress" :percent="showData.percentage" hide-info></Progress>
      </template>
    </div>
    <Upload
      ref="upload"
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
      style="display: inline-block;"
      v-else
    >
      <div :class="'img-item_'+showSize">
        <Icon type="md-add" :size="iconSize"></Icon>
      </div>
    </Upload>
    <Modal title="当前图片" v-model="visible">
      <img :src="imgName" v-if="visible" style="width: 100%">
    </Modal>
  </div>
</template>
<script>
import { fail } from 'assert';
import confing from '@/axios/confing.js';
export default {
  model: {
    prop: "outUrl",
    event: "changeOutUrl"
  },
  props: {
    outUrl: {
      type: String||Boolean,
      default: ""
    },
    showSize: {
      type: String,
      default: "default",
      validator: function(value) {
        // 这个值必须匹配下列字符串中的一个
        return ["small", "default", "large"].indexOf(value) !== -1;
      }
    }
  },

  data() {
    return {
      imgName: "",
      visible: false,
      uploadList: [],
      showData: {
        url: "",
        status: "finished"
      },
      url:'',
      pushUrl:`${confing.url}/public/uploadFile`
    };

  },
  computed: {
    //  图片icon尺寸
    iconSize: function() {
      return ["small", "default", "large"].indexOf(this.showSize) * 20 + 20;
    }
  },
  watch: {
    outUrl(val) {
      if (val) {
        this.url = val;
      } else {
        this.url = "";
      }
    }
  },

  methods: {
    // 点击查看大图
    handleView(url) {
      this.imgName = url;
      this.visible = true;
    },
    // 删除已经上传图片
    handleRemove() {
      console.log(123)
      this.url = "";
      this.$emit("changeOutUrl","");
    },
    // 上传成功
    handleSuccess(res, file) {
      console.log(res,file)
      if (res.code == 0) {
        file.url = res.data;
        this.showData=file;
        this.url = res.data;
        this.$emit("changeOutUrl", res.data);
      } else {

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
      // const fileList = this.$refs.upload.fileList;
      // console.log(a, fileList);
      // this.showData = fileList[0];
    }
  }
  // 初始化函数
  // mounted() {
  //   this.showData = this.$refs.upload.fileList[0];
  // }
};
</script>
<style>
.img-item {
  display: inline-block;
  text-align: center;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.img-item_small {
  width: 58px;
  height: 58px;
  line-height: 58px;
}

.img-item_default {
  width: 100px;
  height: 100px;
  line-height: 100px;
}

.img-item_large {
  width: 200px;
  height: 200px;
  line-height: 200px;
}

.img-item img {
  width: 100%;
  height: 100%;
}
.img-item-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.img-item:hover .img-item-cover {
  display: block;
}
.img-item-cover i {
  color: #fff;
  cursor: pointer;
  margin: 0 2px;
}
</style>