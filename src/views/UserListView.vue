<template>
  <ContentBase>
    <div v-for="user in users" :key="user.id" @click="open_user_profile(user.id)">
      <div class="card single-user" >
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
import { useStore } from "vuex"
import router from '@/router/index'

export default {
  name: "UserListView",
  components: {
    ContentBase,
  },

  setup() {
    const store = useStore()
    let users = ref([]);
    $.ajax({
      url: "https://app165.acapp.acwing.com.cn/myspace/userlist/",
      type: "get",
      success(resp) {
        users.value = resp;
      },
    });

    const open_user_profile = (userID) => {
      if (store.state.user.is_login)
      {
        router.push({
          name: 'userprofile',
          params: {
            userid: userID
          }
        })
      }
      else
      {
        router.push({
          name: 'login',
        })
      }
    }

    return {
      users,
      open_user_profile,
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
