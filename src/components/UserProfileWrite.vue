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
      <button type="button" class="btn btn-primary btn-sm" @click="post_a_post">发帖</button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "UserProfileWrite",
  setup(props, context) {
    let content = ref("");

    const post_a_post = () => {
        context.emit('post_a_post',content.value);
        content.value = "";
    }

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