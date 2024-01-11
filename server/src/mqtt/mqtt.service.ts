import { Injectable, OnModuleInit } from '@nestjs/common';
import { connect } from 'mqtt';

@Injectable()
export class MqttService implements OnModuleInit {
  private mqttClient;
  private devicesStatus = {};
  onModuleInit() {
    const url = process.env.MQTT_URL;
    const options = {
      // clientId: process.env.MQTT_CLIENTID,
      username: process.env.MQTT_USERNAME,
      password: process.env.MQTT_PASSWORD,
    };

    this.mqttClient = connect(url, options);

    this.mqttClient.on('connect', () => {
      console.log('Connected to MQTT');
      this.mqttClient.subscribe('nhatmm/get-device-status', { qos: 2 });
    });
    this.mqttClient.on('error', () => {
      console.log('Error in connecting to MQTT');
    });
    this.mqttClient.on('message', (topic, payload) => {
      console.log(topic, payload.toString());

      this.devicesStatus[topic] = payload;
    });
  }

  publish(topic: string, payload) {
    this.mqttClient.publish(topic, payload, { retain: false, qos: 2 });
  }

  subscribe(topic: string) {
    this.mqttClient.subscribe(topic, { qos: 2 });
  }

  message() {
    this.mqttClient.on('message', (topic, payload) => {
      console.log(topic, payload.toString());

      this.devicesStatus[topic] = payload;
    });
    return this.devicesStatus.toString();
  }
}
