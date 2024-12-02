import paho.mqtt.client as mqtt

# MQTT 브로커에 연결될 때 호출되는 콜백 함수
def on_connect(client, userdata, flags, rc):
    if rc == 0:
        print("Connected to broker")
        # 연결되면 밝기 값을 입력받고 메시지를 발행
        brightness = input("밝기 값을 입력하세요: ")
        client.publish("room/get/light", brightness)
        client.disconnect()
    else:
        print(f"Connection failed with code {rc}")

# MQTT 클라이언트 설정
client = mqtt.Client()
client.on_connect = on_connect

# 브로커 연결 시도
client.connect("localhost", 1883, 60)

# 네트워크 루프 시작
client.loop_forever()
