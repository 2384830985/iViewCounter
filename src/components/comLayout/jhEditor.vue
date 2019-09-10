<template>
  <div>
      
  </div>
</template>
<script>
export default {
  model: {
    prop: "outUrl",
    event: "changeOutUrl"
  },
  props: {
  },

  data() {
    return {
    };
  },
  computed: {
  },
  watch: {
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
};
</script>
<style>





</style>