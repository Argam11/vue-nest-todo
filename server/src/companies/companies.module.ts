import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MulterModule } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { AuthModule } from "@/auth/auth.module";
import { CompaniesController } from "./companies.controller";
import { CompaniesService } from "./companies.service";
import { Company, CompanySchema } from "./schema/company.schema";
import { UPLOAD_DIR } from "./companies.constants";
import { generateUniqueFilename } from "./companies.utils";

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: Company.name, schema: CompanySchema }]),
    MulterModule.register({
      storage: diskStorage({
        destination: `./${UPLOAD_DIR}`,
        filename: (_req, file, callback) => {
          const uniqueFilename = generateUniqueFilename(file.originalname);
          callback(null, uniqueFilename);
        },
      }),
    }),
  ],
  controllers: [CompaniesController],
  providers: [CompaniesService],
})
export class CompaniesModule {}
