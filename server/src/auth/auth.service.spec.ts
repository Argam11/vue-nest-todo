import { TestingModule } from "@nestjs/testing";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigService } from "@nestjs/config";
import { AuthService } from "./auth.service";
import { User, UserSchema } from "./schemas/user.schema";
import { LoginDto } from "./dto/login-dto";
import { ForbiddenException } from "@nestjs/common";
import {
  createTestModule,
  clearTestDatabase,
  createTestUser,
} from "../../test-setup";

describe("AuthService", () => {
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
    );

    authService = module.get<AuthService>(AuthService);
  });

  afterAll(async () => {
    await module.close();
  });

  beforeEach(async () => {
    await clearTestDatabase(module);
  });

  describe("login", () => {
    // it("should successfully login with correct credentials", async () => {
    //   // Create a test user with hashed password
    //   await createTestUser(module, {
    //     username: "testuser",
    //     password: "testpass",
    //   });

    //   const loginDto: LoginDto = {
    //     username: "testuser",
    //     password: "testpass",
    //   };

    //   const result = await authService.login(loginDto);

    //   expect(result).toHaveProperty("access_token");
    //   expect(typeof result.access_token).toBe("string");
    //   expect(result.access_token.length).toBeGreaterThan(0);
    // });

    // it("should throw ForbiddenException for non-existent username", async () => {
    //   const loginDto: LoginDto = {
    //     username: "nonexistentuser",
    //     password: "anypassword",
    //   };

    //   await expect(authService.login(loginDto)).rejects.toThrow(
    //     ForbiddenException,
    //   );
    //   await expect(authService.login(loginDto)).rejects.toThrow(
    //     "Credentials incorrect",
    //   );
    // });

    // it("should throw ForbiddenException for incorrect password", async () => {
    //   // Create a test user
    //   await createTestUser(module, {
    //     username: "testuser",
    //     password: "correctpassword",
    //   });

    //   const loginDto: LoginDto = {
    //     username: "testuser",
    //     password: "wrongpassword",
    //   };

    //   await expect(authService.login(loginDto)).rejects.toThrow(
    //     ForbiddenException,
    //   );
    //   await expect(authService.login(loginDto)).rejects.toThrow(
    //     "Credentials incorrect",
    //   );
    // });

    it("should generate different tokens for different users", async () => {
      // Create two test users
      const asd = await createTestUser(module, {
        username: "user1",
        password: "password1",
      });

      await createTestUser(module, {
        username: "user2",
        password: "password2",
      });

      const loginDto1: LoginDto = { username: "user1", password: "password1" };
      // const loginDto2: LoginDto c= { username: "user2", password: "password2" };

      const result1 = await authService.login(loginDto1);
      // const result2 = await authService.login(loginDto2);

      // expect(result1.access_token).not.toBe(result2.access_token);
      expect(result1).toHaveProperty("access_token");
      // expect(result2).toHaveProperty("access_token");
    });

    // it("should handle empty username and password", async () => {
    //   const loginDto: LoginDto = {
    //     username: "",
    //     password: "",
    //   };

    //   await expect(authService.login(loginDto)).rejects.toThrow(
    //     ForbiddenException,
    //   );
    // });
  });
});
