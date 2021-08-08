<template>
  <div class="markdown-editor">
    <mavon-editor
      v-model="content"
      ref="editor"
      @imgAdd="$imgAdd"
      @change="change"
    />
  </div>
</template>

<script>
/* markdown编辑器 */
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
export default {
  name: "markdownEditor",
  components: {
    mavonEditor,
  },
  data: function () {
    return {
      content: "",
      content2html: "", // 及时转的html
    };
  },
  created() {},
  mounted() {},
  methods: {
    // render 为 markdown 解析后的结果[html]
    change(value, render) {
      this.content2html = render;
    },
    // 将图片上传到服务器，返回地址替换到md中
    $imgAdd(pos, $file) {
      let formdata = new FormData();
      return;
      this.$upload
        .post("/上传接口地址", formdata)
        .then((res) => {
          console.log(res.data);
          this.$refs.editor.$img2Url(pos, res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.markdown-editor{
  width: 100%;
  height: 100%;
  >div{
      width: 100%;
  height: 100%;
  }
}
</style>
