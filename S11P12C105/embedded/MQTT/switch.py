import paho.mqtt.client as mqtt


# MQTT 클라이언트가 브로커에 연결될 때 호출되는 콜백 함수
def on_connect(client, userdata, flags, rc):
    if rc == 0:
        print("Connected to broker")
        print("switch")
        client.subscribe("room/put/switch")
    else:
        print("Connection failed")


# 토픽에 메시지가 도착했을 때 호출되는 콜백 함수
def on_message(client, userdata, msg):
    print(f"room/put/light b'{msg.payload.decode()}'")
    if(msg.payload.decode() == "ON"):
        print("Trun on light")
        client.publish("room/get/switch", "ON")
    if(msg.payload.decode() == "OFF"):
        print("Trun off light")
        client.publish("room/get/switch", "OFF")

# MQTT 클라이언트 인스턴스 생성
client = mqtt.Client()

# 콜백 함수 설정
client.on_connect = on_connect
client.on_message = on_message

# MQTT 브로커에 연결 시도
client.connect("localhost", 1883)

# 네트워크 이벤트 처리와 재연결 등을 위해 블로킹 루프 시작
client.loop_forever()
