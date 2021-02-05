(function(){


	var default_config = {
			"url":"ws://127.0.0.1:8080/demo.ws",
			"onmessage":function(){
				console.log("receive message success!");
			},
			"onopen":function(){
				console.log("websocket open success!");
			},
			"onerror":function(){
				console.log("websocket connection failed!");
			},
			"onclose":function(event){
				console.log("websocket close success!");
			},
			"heartTimeout":45000
	}
	var maxWebSocket = function(){
		this.webSocket = null;
		this.config = null;
		
		this.needReconnect = false;
		this.isWindowClose = false;
		this.heartTimeout = default_config["heartTimeout"]; 
		this.heartTimeoutObj = null;
		this.serverTimeoutObj = null;
	}
	maxWebSocket = {
			init:function(config){
				if(this.webSocket!=null) this.webSocket.close();
				this.url = config["url"]?config["url"]:default_config["url"];
				if("WebSocket" in window){
					this.webSocket = new WebSocket(this.url);
				}else if("MozWebSocket" in window){
					this.webSocket = new MozWebSocket(this.url);
				}
				
				this.webSocket.onopen = config["onopen"]?config["onopen"]:default_config["onopen"];
				this.webSocket.onmessage = config["onmessage"]?config["onmessage"]:default_config["onmessage"];
				this.webSocket.onerror = config["onerror"]?config["onerror"]:default_config["onerror"];
				this.webSocket.onclose = config["onclose"]?config["onclose"]:default_config["onclose"];
				
				if(!this.config) this.config = config;
				if(config["heartTimeout"]) this.heartTimeout = config["heartTimeout"];
				
				this.bindEvent();
			},
			bindEvent:function(){
				var _this = this;
				window.addEventListener("beforeunload", function(){
					_this.isWindowClose = true;
					_this.close();
				});
			},
			close:function(){
				if(this.webSocket !=null){
					//clear heart packet
					if(this.heartTimeoutObj) clearTimeout(this.heartTimeoutObj);
					if(this.serverTimeoutObj) clearTimeout(this.serverTimeoutObj);
					
					this.webSocket.close();
				}
			},
			heartCheck:function(){
				var _this = this;
				clearTimeout(_this.heartTimeoutObj);
				clearTimeout(_this.serverTimeoutObj);
				
				_this.heartTimeoutObj = setTimeout(function(){
					if(_this.webSocket.readyState != "2" && _this.webSocket.readyState != "3"){
						_this.webSocket.send("PING");
					}
					_this.serverTimeoutObj = setTimeout(function(){
						_this.reconnect();
					},_this.heartTimeout);
				},_this.heartTimeout)
				
			},
			reconnect:function(){
				var _this = this;
				if(_this.isWindowClose) return;
				if(_this.needReconnect) return;
				_this.needReconnect = true;
				setTimeout(function(){
					console.log("reconnect_url: " + _this.config["url"]);
					_this.init(_this.config);
					_this.needReconnect = false;
				},3000);
			},
	}
	
	window["maxWebSocket"] = maxWebSocket;
})()