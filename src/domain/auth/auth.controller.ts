import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { FirebaseService } from '../firebase/firebase.service';
import { UserBaseDTO } from '../user/userBaseDTO';

interface FirebaseAuthInterface {
  firebase_token: string;
}

export interface JwtTokenSchema {
  iss: string;
  aud: string;
  exp: number;
  iat: number;
  sub: string;
  nonce: string;
  c_hash: string;
  email: string;
  email_verified: string;
  is_private_email: string;
  auth_time: number;
}

interface FacebookLoginRequest {
  email: string;
}

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private firebaseService: FirebaseService,
  ) {}

  @Post('facebook-login')
  public async loginWithFacebook(@Body() { email }: FacebookLoginRequest) {
    const existingUser = await this.userService.getByEmail(email);

    const token = existingUser ? await this.authService.generateJwt(existingUser) : undefined;

    return { userExists: existingUser, token };
  }

  @Post('apple-login')
  public async loginWithApple(@Body() { identityToken }) {
    const token: string = <string>identityToken;
    const jwt: JwtTokenSchema = await this.authService.decodeAndValidadeToken(token);

    try {
      const user = await this.userService.getByEmail(jwt.email);

      return { token, user };
    } catch (error) {
      throw new HttpException(`Validation failed for login. ${error.message ?? ''}`, HttpStatus.UNAUTHORIZED);
    }
  }

  @Post('login')
  public async login(@Body() firebaseAuth: FirebaseAuthInterface) {
    let fbToken;
    try {
      fbToken = await this.firebaseService.validFirebaseToken(firebaseAuth.firebase_token);
    } catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: e?.error?.errorInfo?.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.userService.getByFirebaseUid(fbToken.uid);

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Invalid user, please contact your system administrator',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return { token: await this.authService.generateJwt(user), user };
  }
}
