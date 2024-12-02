## 설명

- MQTT 설치 및 테스트
- 설정

**PC_install**

https://mosquitto.org/

https://randomnerdtutorials.com/how-to-install-mosquitto-broker-on-raspberry-pi/

**RPI_install**

```powershell
sudo apt install -y mosquitto mosquitto-clients
```

- **test pc broker 설정**
    



**broker서버**

```powershell
mosquitto -c mosquitto.conf -v 
#C:\Program Files\mosquitto에서 실행
```

**RPI_Subscribe**

```powershell
mosquitto_sub -d -t hello/world
#loopback 본인 ip로 수신함
mosquitto_sub -h 0.0.0.0 -t hello/world
```

**RPI_Publish** 

```powershell
mosquitto_pub -d -t hello/world -m "Hi!"
#본인 IP로 전송함
mosquitto_pub -h 0.0.0.0 -t hello/world -m "Hi!"
```

---

## Code test

iot.py

```powershell
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

```

light.py

```powershell
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

```

switch.py

```powershell
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

```

iot.py는 light.py에 입력된  값에 따라 ON, OFF메시지를 출력한다.

switch.py는 light에 입력된 값에 따라 iot에서 ON이 전송되었다면 Trun on light, OFF가 전송되었다 Trun off light이 출력된다.그리고  iot.py에게 ON/OFF라고 다시 전달한다.