<template>
  <div>
    hello world index
    <icon-svg name="index"></icon-svg>

    <el-button type="primary" @click="sendMsg()">sendMsg</el-button>
  </div>
</template>

<script>


export default {
  name: "HomeIndex",
  data() {
    return {
      websocket: "",
      url: 'ws://192.168.1.126:8080/demo.ws',
      config:{}
    };
  },
  created() {
    this.config = {
      url: this.url,
      onmessage: this.wsonmessage,
      onopen: this.wsonopen,
      onerror: this.wsonerror,
      onclose: this.wsonclose,
    };
    this.$ws.init(this.config);
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
      this.$ws.reconnect(this.config);
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
