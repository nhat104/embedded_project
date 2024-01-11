import random
import time
import RPi.GPIO as GPIO

from paho.mqtt import client as mqtt_client


broker = "broker.hivemq.com"
port = 1883
topic = "nhatmm/get-device-status"
# Generate a Client ID with the publish prefix.
client_id = f"publish-{random.randint(0, 1000)}"
username = "nhatmm"
password = "123456"

GPIO.setmode(GPIO.BCM)


def connect_mqtt():
    def on_connect(client, userdata, flags, rc):
        if rc == 0:
            print("Connected to MQTT Broker!")
        else:
            print("Failed to connect, return code %d\n", rc)

    client = mqtt_client.Client(client_id)
    client.username_pw_set(username, password)
    client.on_connect = on_connect
    client.connect(broker, port)
    return client


def publish(client):
    msg_count = 1
    while True:
        time.sleep(1)
        pins = [23, 24]
        for pin in pins:
            GPIO.setup(pin, GPIO.OUT)
            status = GPIO.input(pin)
            if status == 0:
                msg = f"pin {pin} is OFF"
            else:
                msg = f"pin {pin} is ON"
            result = client.publish(topic, msg)
            # result: [0, 1]
            status = result[0]
            if status == 0:
                print(f"Send `{msg}` to topic `{topic}`")
            else:
                print(f"Failed to send message to topic {topic}")
            msg_count += 1
        if msg_count > 10:
            break


def run():
    client = connect_mqtt()
    client.loop_start()
    publish(client)
    client.loop_stop()


if __name__ == "__main__":
    run()
