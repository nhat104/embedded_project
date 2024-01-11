import RPi.GPIO as GPIO
import paho.mqtt.client as mqtt
import json
import time

broker = "broker.hivemq.com"
port = 1883
topic = "nhatmm/control"
client_id = "nhatmm"
username = "nhatmm"
password = "123456"

GPIO.setmode(GPIO.BCM)


def connect_mqtt() -> mqtt:
    def on_connect(client, userdata, flags, rc):
        print("Connected to mqtt with result code " + str(rc))

        # Subscribing in on_connect() means that if we lose the connection and
        # reconnect then subscriptions will be renewed.
        client.subscribe(topic)

    client = mqtt.Client()
    client.username_pw_set(username, password)
    client.on_connect = on_connect
    client.connect(broker, 1883)
    return client


def subscribe(client: mqtt):
    # The callback for when a PUBLISH message is received from the server.
    def on_message(client, userdata, msg):
        print(f"Received `{msg.payload.decode()}` from `{msg.topic}` topic")
        payload = json.loads(msg.payload.decode())

        if payload["status"] == None or payload["pin"] == None:
            print("Invalid payload from MQTT")
            return

        GPIO.setup(payload["pin"], GPIO.OUT)
        # turn on led
        if payload["status"] == "ON":
            GPIO.output(payload["pin"], GPIO.HIGH)
        # turn off led
        elif payload["status"] == "OFF":
            GPIO.output(payload["pin"], GPIO.LOW)
        else:
            print("Invalid command")

    client.subscribe(topic)
    client.on_message = on_message


try:
    client = connect_mqtt()
    subscribe(client)
    # Blocking call that processes network traffic, dispatches callbacks and
    # handles reconnecting.
    # Other loop*() functions are available that give a threaded interface and a
    # manual interface.
    client.loop_forever()

except KeyboardInterrupt:
    print("Disconnecting from MQTT host")
