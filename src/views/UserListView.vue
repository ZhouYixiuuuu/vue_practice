<template>
  <ContentBase>
    <div v-for="user in users" :key="user.id">
      <div class="card single-user">
        <div class="card-body">
          <div class="row">
            <div class="col-1">
              <img class="img-fluid" :src="user.photo" alt="" />
            </div>
            <div class="col-11">
              <div class="username">{{ user.username }}</div>
              <div class="followerCount">关注数：{{ user.followerCount }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ContentBase>
</template>

<script>
import ContentBase from "../components/ContentBase";
import $ from "jquery";
import { ref } from "vue";
import { useRoute } from 'vue-router';

export default {
  name: "UserListView",
  components: {
    ContentBase,
  },

  setup() {
    const route = useRoute();

    console.log(route.params.userID)
    let users = ref([]);
    $.ajax({
      url: "https://app165.acapp.acwing.com.cn/myspace/userlist/",
      type: "get",
      success(resp) {
        users.value = resp;
      },
    });

    return {
      users,
    };
  },
};
</script>

<style scoped>
.single-user {
  margin-bottom: 10px;
  cursor: pointer;
}

.single-user:hover {
  box-shadow: 2px 2px 10px lightgray;
  transition: 500ms;
}

.username {
  font-weight: bold;
  height: 50%;
}

.followerCount {
  font-size: 12px;
  color: lightgray;
  height: 50%;
}
</style>
