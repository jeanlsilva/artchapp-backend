import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';
import serviceAccount from '../../config/googleCredentials.json';
import { UserUpdateDTO } from '../user/userBaseDTO';

@Injectable()
export class FirebaseService {
  private app: admin.app.App;

  constructor(private configService: ConfigService) {
    this.app = admin.initializeApp({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      credential: admin.credential.cert(serviceAccount),
      databaseURL: '',
    });
  }

  async validFirebaseToken(token: string) {
    return this.app
      .auth()
      .verifyIdToken(token, true)
      .then((user) => user)
      .catch((reason) => {
        throw { error: reason };
      });
  }

  async createUser(user: UserUpdateDTO) {
    try {
      return await this.app.auth().createUser({
        email: user.email,
        emailVerified: false,
        phoneNumber: user.phone ? `${user.locale.includes('BR') ? '+55' : '+1'}${user.phone}` : undefined,
        password: user.password,
        displayName: user.name,
        disabled: false,
      });
    } catch (e) {
      console.log(e)
      return e.errorInfo.code;
    }
  }

  async deleteUser(userId: string) {
    try {
      return await this.app.auth().deleteUser(userId);
    } catch (e) {
      console.log(e)
    }
  }
}
