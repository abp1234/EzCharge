from gpiozero import PWMLED
from time import sleep
import threading

# GPIO 핀 번호 설정
status_led = [PWMLED(17), PWMLED(27), PWMLED(22)]  # 동작 상태 LED
signal_led_right = [PWMLED(10), PWMLED(9), PWMLED(11)]  # 우측 방향 지시등
signal_led_left = [PWMLED(5), PWMLED(6), PWMLED(13)]  # 좌측 방향 지시등

# 방향을 저장할 변수 초기화
direction = None
stop_threads = False  # 스레드 종료 플래그

def state_led(status):
    """상태등 함수"""
    # 초기화
    for led in status_led:
        led.value = 0

    if status == "work":
        while not stop_threads:
            for brightness in range(0, 101, 1):
                status_led[1].value = brightness / 100
                sleep(0.01)
                if stop_threads:
                    break
            for brightness in range(100, -1, -1):
                status_led[1].value = brightness / 100
                sleep(0.01)
                if stop_threads:
                    break
    elif status == "emergency":
        while not stop_threads:
            status_led[0].value = 1
            sleep(0.5)
            status_led[0].value = 0
            sleep(0.5)


def signal_led(direction_pointer):
    """지시등 함수"""
    while not stop_threads:
        direction = direction_pointer[0]
        for led in signal_led_right + signal_led_left:
            led.value = 0

        sleep(0.5)

        if direction == "right":
            signal_led_right[0].value = 1
            signal_led_right[1].value = 0.1
        elif direction == "left":
            signal_led_left[0].value = 1
            signal_led_left[1].value = 0.1
        else:
            None

        sleep(0.5)


# 동작 상태 LED 스레드 시작
state_thread = threading.Thread(target=state_led, args=("work",))
state_thread.start()

# 방향을 저장할 리스트 (포인터 역할)
direction_pointer = [None]

# 지시등 스레드 시작
direction_thread = threading.Thread(target=signal_led, args=(direction_pointer,))
direction_thread.start()

try:
    while True:
        user_input = input("Enter direction (left/right): ").strip().lower()
        if user_input in ["left", "right"]:
            direction_pointer[0] = user_input
        elif user_input == "mid":
            direction_pointer[0] = user_input
        else:
            print("wrong command")

except KeyboardInterrupt:
    pass

finally:
    stop_threads = True  # 스레드 종료 플래그 설정
    state_thread.join()
    direction_thread.join()
    for led in status_led + signal_led_right + signal_led_left:
        led.value = 0
