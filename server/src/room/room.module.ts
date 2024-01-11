import { forwardRef, Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomTypeSchema } from './schema/room-type.schema';
import { RoomSchema } from './schema/room.schema';
import { HomeModule } from 'src/home/home.module';
import { DeviceModule } from 'src/device/device.module';
import { MqttModule } from 'src/mqtt/mqtt.module';

@Module({
  imports: [
    MqttModule,
    forwardRef(() => HomeModule),
    forwardRef(() => DeviceModule),
    MongooseModule.forFeature([
      { name: 'RoomType', schema: RoomTypeSchema },
      { name: 'Room', schema: RoomSchema },
    ]),
  ],
  providers: [RoomService],
  controllers: [RoomController],
  exports: [RoomService],
})
export class RoomModule {}
