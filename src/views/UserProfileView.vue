<template>
  <ContentBase> 
    <div class="row">
        <div class="col-3">
            <UserProfileInfo @follow='follow' @unfollow='unfollow' :user="user" />
            <UserProfileWrite v-if="is_me" @post_a_post='post_a_post'/>
        </div>
        <div class="col-9">
          <UserProfilePosts @delete_a_post="delete_a_post" :user="user" :posts="posts" />
        </div>
    </div>
  </ContentBase>
</template>

<script>
import { reactive } from 'vue';
import ContentBase from "../components/ContentBase"
import UserProfileInfo from "../components/UserProfileInfo"
import UserProfilePosts from "../components/UserProfilePosts"
import UserProfileWrite from "../components/UserProfileWrite"
import { useRoute } from 'vue-router';
import $ from 'jquery'
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
  name: "UserProfileView",
  components: {
    ContentBase,
    UserProfileInfo,
    UserProfilePosts,
    UserProfileWrite,
  },

  setup() {
    const store = useStore();
    const route = useRoute();
    const userID = parseInt(route.params.userid);
    const user = reactive({});
    const posts = reactive({})

    $.ajax({
      url: 'https://app165.acapp.acwing.com.cn/myspace/getinfo/',
      type: "get",
      data: {
        user_id: userID,
      },
      headers: {
        'Authorization': 'Bearer ' + store.state.user.access,
      },
      success(resp) {
        user.id = resp.id;
        user.username = resp.username;
        user.photo = resp.photo;
        user.followerCount = resp.followerCount;
        user.is_followered = resp.is_followed;
      },
    }),

    $.ajax({
      url: 'https://app165.acapp.acwing.com.cn/myspace/post/',
      type: "get",
      data: {
        user_id: userID,
      },
      headers: {
        'Authorization': 'Bearer ' + store.state.user.access,
      },
      success(resp) {
        posts.count = resp.length,
        posts.posts = resp
      },
    })

    const is_me = computed( () => userID === store.state.user.id );

    const follow = () => {
      if (user.is_followered)
      {
        return;
      }
      else
      {
        user.is_followered = true;
        user.followerCount ++ ;
      }
    }

    const unfollow = () => {
      if (!user.is_followered) return;
      else
      {
        user.is_followered = false;
        user.followerCount -- ;
      }
    }

    const post_a_post = (content) => {
      posts.count ++ ;
      posts.posts.unshift(
        {
          id: posts.count,
          userid: 1,
          content: content,
        },
      )
    }

    const delete_a_post = post_id => {
      posts.posts = posts.posts.filter(post => post.id != post_id);
      posts.count = posts.posts.length;
    }

    return {
        user,
        follow,
        unfollow,
        posts,
        post_a_post,
        is_me,
        delete_a_post,
    }
  },
};
</script>

<style scoped>
</style>
