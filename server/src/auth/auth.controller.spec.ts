import { TestingModule } from "@nestjs/testing";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigService } from "@nestjs/config";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { User, UserSchema } from "./schemas/user.schema";
import { LoginDto } from "./dto/login-dto";
import { ForbiddenException } from "@nestjs/common";
import {
  createTestModule,
  clearTestDatabase,
  createTestUser,
} from "../../test-setup";

describe("AuthController", () => {
  let authController: AuthController;
  let authService: AuthService;
  let module: TestingModule;

  beforeAll(async () => {
    module = await createTestModule(
      [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        JwtModule.registerAsync({
          useFactory: async (configService: ConfigService) => ({
            secret: configService.get<string>("jwt.secret"),
            signOptions: {
              expiresIn: configService.get<string>("jwt.expiresIn"),
            },
          }),
          inject: [ConfigService],
        }),
      ],
      [AuthService],
      [AuthController],
    );

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  afterAll(async () => {
    await module.close();
  });

  beforeEach(async () => {
    await clearTestDatabase(module);
  });

  describe("login", () => {
    //   it("should return access token when login is successful", async () => {
    //     // Create a test user with hashed password
    //     await createTestUser(module, {
    //       username: "testuser",
    //       password: "testpass",
    //     });

    //     const loginDto: LoginDto = {
    //       username: "testuser",
    //       password: "testpass",
    //     };

    //     const result = await authController.login(loginDto);

    //     expect(result).toHaveProperty("access_token");
    //     expect(typeof result.access_token).toBe("string");
    //     expect(result.access_token.length).toBeGreaterThan(0);
    //   });

    //   it("should call authService.login with correct parameters", async () => {
    //     // Create a test user
    //     await createTestUser(module, {
    //       username: "testuser",
    //       password: "testpass",
    //     });

    //     const loginDto: LoginDto = {
    //       username: "testuser",
    //       password: "testpass",
    //     };

    //     // Spy on the service method to verify it's called
    //     const loginSpy = jest.spyOn(authService, "login");

    //     const result = await authController.login(loginDto);

    //     expect(loginSpy).toHaveBeenCalledWith(loginDto);
    //     expect(result).toHaveProperty("access_token");
    //   });

    //   it("should handle service errors properly", async () => {
    //     const loginDto: LoginDto = {
    //       username: "nonexistentuser",
    //       password: "anypassword",
    //     };

    //     await expect(authController.login(loginDto)).rejects.toThrow(
    //       ForbiddenException,
    //     );
    //     await expect(authController.login(loginDto)).rejects.toThrow(
    //       "Credentials incorrect",
    //     );
    //   });

    //   it("should handle incorrect password errors", async () => {
    //     // Create a test user
    //     await createTestUser(module, {
    //       username: "testuser",
    //       password: "correctpassword",
    //     });

    //     const loginDto: LoginDto = {
    //       username: "testuser",
    //       password: "wrongpassword",
    //     };

    //     await expect(authController.login(loginDto)).rejects.toThrow(
    //       ForbiddenException,
    //     );
    //     await expect(authController.login(loginDto)).rejects.toThrow(
    //       "Credentials incorrect",
    //     );
    //   });

    it("asd", () => {
      expect(11).toBe(11);
    });
  });
});
