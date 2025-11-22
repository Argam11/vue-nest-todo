import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import configuration from "@/config/configuration";
import { DB_URL } from "@/constants";
import { AuthModule } from "@/auth/auth.module";
import { CompaniesModule } from "@/companies/companies.module";

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          uri: configService.get<string>(DB_URL),
        };
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    AuthModule,
    CompaniesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
