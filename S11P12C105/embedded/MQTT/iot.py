import paho.mqtt.client as mqtt

# MQTT 클라이언트가 브로커에 연결될 때 호출되는 콜백 함수
def on_connect(client, userdata, flags, rc):
    if rc == 0:
        print("Connected to broker")
        print("IOT")
        # 연결 성공 후 구독할 토픽 설정
        client.subscribe("room/get/light")
        client.subscribe("room/get/switch")
    else:
        print("Connection failed")

# 토픽에 메시지가 도착했을 때 호출되는 콜백 함수
def on_message(client, userdata, msg):
    # 수신된 메시지 출력
    if(msg.topic == "room/get/light"):
        print(f"LIGHT: room/get/light b'{msg.payload.decode()}'")
        if(int(msg.payload.decode()) >= 20):
            client.publish("room/put/switch", "ON")
        else:
            client.publish("room/put/switch", "OFF")

    if (msg.topic == "room/get/switch"):
        print(f"SWITCH: room/put/light b'{msg.payload.decode()}'")


# MQTT 클라이언트 인스턴스 생성
client = mqtt.Client()

# 콜백 함수 설정
client.on_connect = on_connect
client.on_message = on_message

# MQTT 브로커에 연결 시도
client.connect("localhost", 1883)

# 네트워크 이벤트 처리와 재연결 등을 위해 블로킹 루프 시작
client.loop_forever()
