<template>
  <div class="card">
    <div class="card-body">
      <div class="row">
        <div class="col-3">
          <img :src="user.photo" alt="" class="img-fluid" />
        </div>
        <div class="col-9">
          <div class="username">{{ user.username }}</div>
          <div class="fans">关注数：{{ user.followerCount }}</div>
          <button
            @click="follow"
            v-if="!user.is_followered"
            type="button"
            class="btn btn-secondary btn-sm"
          >
            +关注
          </button>
          <button
            @click="unfollow"
            v-if="user.is_followered"
            type="button"
            class="btn btn-secondary btn-sm"
          >
            取消关注
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import { useStore } from "vuex";

export default {
  name: "UserProfileInfo",
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  setup(props, context) {
    const store = useStore();
    //定义函数，暴露出去
    const follow = () => {
      $.ajax({
        url: "https://app165.acapp.acwing.com.cn/myspace/follow/",
        type: "post",
        headers: {
          Authorization: "Bearer " + store.state.user.access,
        },
        data: {
          target_id: props.user.id,
        },
        success(resp) {
          if (resp.result === "success") {
            context.emit("follow");
          }
        },
      });
    };

    const unfollow = () => {
      $.ajax({
        url: "https://app165.acapp.acwing.com.cn/myspace/follow/",
        type: "post",
        headers: {
          Authorization: "Bearer " + store.state.user.access,
        },
        data: {
          target_id: props.user.id,
        },
        success(resp) {
          if (resp.result === "success") {
            context.emit("unfollow");
          }
        },
      });
    };

    return {
      follow,
      unfollow,
    };
  },
};
</script>

<style scoped>
img {
  border-radius: 50%;
}
.username {
  font-weight: bold;
}

.fans {
  color: grey;
  font-size: 13px;
}

button {
  padding: 2px 4px;
  size: 12px;
}
</style>
