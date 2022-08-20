<template>
  <ContentBase> 
    <div class="row">
        <div class="col-3">
            <UserProfileInfo @follow='follow' @unfollow='unfollow' :user="user" />
            <UserProfileWrite @post_a_post='post_a_post'/>
        </div>
        <div class="col-9">
          <UserProfilePosts :posts="posts" />
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

export default {
  name: "UserProfileView",
  components: {
    ContentBase,
    UserProfileInfo,
    UserProfilePosts,
    UserProfileWrite,
  },

  setup() {
    const user = reactive({
        id: 1,
        username: "Yixiu Zhou", 
        firstname: "Yixiu",
        lastname: "Zhou",
        followerCount: 0,
        is_followered: false,
    });

    const posts = reactive({
      count: 3,
      posts:[
        {
          id: 1,
          userid: 1,
          content: "今天下雨了很开心",
        },
        {
          id: 2,
          userid: 1,
          content: "今天吃饭了",
        },
        {
          id: 3,
          userid: 1,
          content: "今天看书了",
        }
      ]
    })

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

    return {
        user,
        follow,
        unfollow,
        posts,
        post_a_post,
    }
  },
};
</script>

<style scoped>
</style>
