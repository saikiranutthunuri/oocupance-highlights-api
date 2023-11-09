import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class HVAC {
  @Prop()
  general: {
    avgoccupancy: number;
    energy_used: number;
    run_time: number;
  };

  @Prop()
  airquality: {
    pm2: number;
    pm10: number;
    co2: number;
  };

  @Prop()
  weather: {
    temperature: number;
    humidity: number;
  };
}

export const HvacSchema = SchemaFactory.createForClass(HVAC);
