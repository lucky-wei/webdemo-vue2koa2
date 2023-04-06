<template>
  <el-row class="content">
    <el-col :xs="24" :sm="{ span: 6, offset: 9 }">
      <span class="title"> 欢迎登录 </span>
      <el-row>
        <el-input v-model="account" placeholder="账号" type="text"> </el-input>
        <el-input v-model="password" placeholder="密码" type="password">
        </el-input>
        <el-button type="primary" @click="loginToDo">登录</el-button>
      </el-row>
    </el-col>
  </el-row>
</template>
<script>
import minxin from "@/lib/minxin.js"
export default {
  mixins:[minxin],
  data() {
    return {
      account: "",
      password: "",
    };
  },
  created(){
    this.testMinxin()
    console.log('this.minxinData',this.minxinData)
  },
  methods: {
    loginToDo() {
      let obj = {
        user_name: this.account,
        password: this.password,
      };
      this.$http.post("http://localhost:8899/auth/user", obj).then(
        (res) => {
          console.log(res);
          if (res.data.code === 200) {
            sessionStorage.setItem("demo-token", res.data.data.token);
            this.$message({
              type: "success",
              message: "登陆成功",
            });
            this.$router.push("/todolist");
          } else {
            this.$message.error(res.data.msg);
            sessionStorage.setItem("demo-token", null);
          }
        },
        (err) => {
          this.$message.error("请求错误！", err);
          sessionStorage.setItem("demo-token", null);
        }
      );
    },
  },
};
</script>
<style>
.el-row.content {
  padding: 16px;
}
.title {
  font-size: 28px;
}
.el-input {
  margin: 12px 0;
}
.el-button {
  width: 100%;
  margin-top: 12px;
}
</style>