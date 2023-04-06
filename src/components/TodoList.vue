<template>
  <el-row class="content">
    <el-col :xs="{ span: 20, offset: 2 }" :sm="{ span: 8, offset: 8 }">
      <span> 欢迎：{{ name }}！你的待办事项是： </span>
      <el-input
        placeholder="请输入待办事项"
        v-model="todos"
        @keyup.enter.native="addTodos"
      ></el-input>
      <el-tabs v-model="activeName">
        <el-tab-pane label="待办事项" name="first">
          <el-col :xs="24">
            <template v-if="!Done">
              <!--v-if和v-for不能同时在一个元素内使用，因为Vue总会先执行v-for-->
              <template v-for="(item, index) in list">
                <div class="todo-list" :key="index" v-if="item.status == false">
                  <span class="item">
                    {{ index + 1 }}. {{ item.content }}
                  </span>
                  <span class="pull-right">
                    <el-button
                      size="small"
                      type="primary"
                      @click="finished(item)"
                      >完成</el-button
                    >
                    <el-button
                      size="small"
                      :plain="true"
                      type="danger"
                      @click="remove(item)"
                      >删除</el-button
                    >
                  </span>
                </div>
              </template>
            </template>
            <div v-else-if="Done">暂无待办事项</div>
          </el-col>
        </el-tab-pane>
        <el-tab-pane label="已完成事项" name="second">
          <template v-if="count > 0">
            <template v-for="(item, index) in list">
              <div class="todo-list" :key="index" v-if="item.status == true">
                <span class="item finished">
                  {{ index + 1 }}. {{ item.content }}
                </span>
                <span class="pull-right">
                  <el-button size="small" type="primary" @click="restore(item)"
                    >还原</el-button
                  >
                </span>
              </div>
            </template>
          </template>
          <div v-else>暂无已完成事项</div>
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
</template>
<script>
import jwt from "jsonwebtoken";
export default {
  data() {
    return {
      name: "Molunerfinn",
      todos: "",
      activeName: "first",
      list: [],
      count: 0,
      id: "",
      name: "",
    };
  },
  computed: {
    // 计算属性用于计算是否已经完成了所有任务
    Done() {
      let count = 0;
      let length = this.list.length;
      for (let i in this.list) {
        this.list[i].status == true ? (count += 1) : "";
      }
      this.count = count;
      if (count == length || length == 0) {
        return true;
      } else {
        return false;
      }
    },
  },
  created() {
    const userInfo = this.getUserInfo();
    if (userInfo != null) {
      this.id = userInfo.id;
      this.name = userInfo.name;
    } else {
      this.id = "";
      this.name = "";
    }
    this.getTodoList();
  },
  methods: {
    getUserInfo() {
      const token = sessionStorage.getItem("demo-token");
      if (token != null && token != "null") {
        let decode = jwt.decode(token);
        return decode;
      } else {
        return null;
      }
    },
    addTodos() {
      if (this.todos == "") return;
      let obj = {
        status: false,
        content: this.todos,
        id: this.id,
      };
      this.$http
        .post("http://localhost:8899/api/todolist", obj) //新增创建请求
        .then(
          (res) => {
            if (res.data.code === 200) {
              this.$message({
                type: "success",
                message: res.data.msg,
              });
              this.getTodoList(); //获取最新的列表
            } else {
              this.$message.error("创建失败");
            }
          },
          (err) => {
            this.$message.error("创建失败");
            console.log(err);
          }
        );
      // this.list.push(obj);
      this.todos = "";
    },
    //获取列表
    getTodoList() {
      this.$http.get("http://localhost:8899/api/todolist/" + this.id).then(
        (res) => {
          if (res.data.code === 200) {
            this.list = res.data.result;
          } else {
            this.$message.error("获取失败");
          }
        },
        (err) => {
          this.$message.error("获取失败");
          console.log(err);
        }
      );
    },
    finished(item) {
      // this.$set(this.list[index], "status", true); // 通过set的方法让数组的变动能够让Vue检测到
      // this.$message({
      //   type: "success",
      //   message: "任务完成",
      // });
      let params = {
        id: item.id,
        user_id: this.id,
        status: item.status,
      };
      this.$http
        .post("http://localhost:8899/api/todolist/update-data", params)
        .then((res) => {
          if (res.data.code === 200) {
            this.$message({
              type: "success",
              message: res.data.msg,
            });
            this.getTodoList()
          } else {
            this.$message.error("还原失败");
          }
        });
    },
    remove(index) {
      // this.list.splice(index, 1);
      // this.$message({
      //   type: "info",
      //   message: "任务删除",
      // });
    },
    restore(index) {
      this.$set(this.list[index], "status", false);
      this.$message({
        type: "info",
        message: "任务还原",
      });
    },
  },
};
</script>
<style>
</style>