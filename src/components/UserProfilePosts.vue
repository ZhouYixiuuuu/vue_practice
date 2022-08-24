<template>
  <div class="card">
    <div class="card-body">
      <div v-for="post in posts.posts" :key="post.id">
        <div class="card single-post">
          <div class="card-body">
            {{ post.content }}
            <button
              v-if="is_me"
              type="button"
              class="btn btn-danger btn-sm"
              @click="delete_a_post(post.id)"
            >
              删除
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
import $ from "jquery";

export default {
  name: "UserProfilePosts",
  props: {
    posts: {
      type: Object,
      required: true,
    },
    user: {
      type: Object,
      required: true,
    },
  },

  setup(props, context) {
    const store = useStore();
    let is_me = computed(() => store.state.user.id === props.user.id);

    const delete_a_post = (postid) => {
      $.ajax({
        url: "https://app165.acapp.acwing.com.cn/myspace/post/",
        type: "delete",
        headers: {
          Authorization: "Bearer " + store.state.user.access,
        },
        data: {
          post_id: postid,
        },
        success(resp) {
          if (resp.result === "success") {
            context.emit("delete_a_post", postid);
          }
        },
      });
    };

    return {
      is_me,
      delete_a_post,
    };
  },
};
</script>

<style scoped>
.single-post {
  margin-bottom: 10px;
}

button {
  float: right;
}
</style>