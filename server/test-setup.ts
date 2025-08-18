import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { MongooseModule } from "@nestjs/mongoose";

// Test configuration
export const testConfig = {
  mongodb: {
    uri: process.env.TEST_MONGODB_URI || "mongodb://localhost:27017/test-auth",
  },
  jwt: {
    secret: process.env.JWT_SECRET || "test-secret-key-for-testing-only",
    expiresIn: "1h",
  },
};

// Common test module configuration
export const createTestModule = async (
  imports: any[],
  providers: any[],
  controllers: any[] = [],
): Promise<TestingModule> => {
  return Test.createTestingModule({
    imports: [
      ConfigModule.forRoot({
        isGlobal: true,
        load: [() => testConfig],
      }),
      MongooseModule.forRoot(testConfig.mongodb.uri),
      ...imports,
    ],
    controllers,
    providers,
  }).compile();
};

// Database cleanup helper
export const clearTestDatabase = async (module: TestingModule) => {
  const userModel = module.get("UserModel");
  if (userModel) {
    await userModel.deleteMany({});
  }
};

// Test user creation helper
export const createTestUser = async (
  module: TestingModule,
  userData: {
    username: string;
    password: string;
  },
) => {
  const { hash } = await import("bcrypt");
  const userModel = module.get("UserModel");

  const hashedPassword = await hash(userData.password, 10);
  const testUser = new userModel({
    ...userData,
    password: hashedPassword,
  });

  return await testUser.save();
};
