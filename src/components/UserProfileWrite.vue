<template>
  <div class="card edit-post">
    <div class="card-body">
      <label for="exampleFormControlTextarea1" class="form-label"
        >编辑帖子</label
      >
      <textarea
        v-model="content"
        class="form-control"
        id="exampleFormControlTextarea1"
        rows="3"
      ></textarea>
      <button type="button" class="btn btn-primary btn-sm" @click="post_a_post">
        发帖
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import $ from "jquery";
import { useStore } from "vuex";

export default {
  name: "UserProfileWrite",
  setup(props, context) {
    const store = useStore();
    let content = ref("");

    const post_a_post = () => {
      $.ajax({
        url: "https://app165.acapp.acwing.com.cn/myspace/post/",
        type: "post",
        headers: {
          Authorization: "Bearer " + store.state.user.access,
        },
        data: {
          content: content.value,
        },
        success(resp) {
          if (resp.result === "success") {
            context.emit("post_a_post", content.value);
            content.value = "";
          }
        },
      });
    };

    return {
      content,
      post_a_post,
    };
  },
};
</script>

<style scoped>
button {
  margin-top: 10px;
}

.edit-post {
  margin-top: 10px;
}
</style>