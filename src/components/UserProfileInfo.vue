<template>
  <div class="card">
    <div class="card-body">
      <div class="row">
        <div class="col-3">
          <img
            src="https://cdn.acwing.com/media/user/profile/photo/156510_lg_176eb8429b.jpg"
            alt=""
            class="img-fluid"
          />
        </div>
        <div class="col-9">
          <div class="username">{{ fullname }}</div>
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
import { computed } from "vue";

export default {
  name: "UserProfileInfo",
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  setup(props, context) {
    let fullname = computed(
      () => props.user.lastname + " " + props.user.firstname
    );

    //定义函数，暴露出去
    const follow = () => {
      context.emit("follow");
    };

    const unfollow = () => {
      context.emit("unfollow");
    };

    return {
      fullname,
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
