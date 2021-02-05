<template>
  <div>
    hello world index
    <icon-svg name="index"></icon-svg>

    <el-button type="primary" @click="sendMsg()">sendMsg</el-button>
  </div>
</template>

<script>
import ws from "@/api/common/websocket";

export default {
  name: "HomeIndex",
  data() {
    return {
      websocket: "",
    };
  },
  created() {
    let config = {
      url: "ws://127.0.0.1:8080/demo.ws",
      onmessage: this.wsonmessage,
      onopen: this.wsonopen,
      onerror: this.wsonerror,
      onclose: this.wsonclose,
    };
    this.$ws.init(config);
    this.websocket = this.$ws.webSocket;
  },
  mounted() {},
  destroyed() {
    //离开路由之后断开websocket连接
    this.websocket.close();
  },
  methods: {
    //建立连接
    wsonopen(e) {
      this.wssend('hello I am client')
    },
    //接收数据
    wsonmessage(e) {
      console.log('e :>> ', e.data);
    },
    //关闭连接
    wsonclose(e) {
      this.websocket.close();
    },
    //错误
    wsonerror(e) {
      this.$ws.reconnect();
    },
    //发送数据
    wssend(msg) {
      this.websocket.send(msg);
    },
    sendMsg(){
      
    }
  },
};
</script>

<style scoped>
</style>
