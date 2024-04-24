import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import axios from 'axios';
import { verify } from 'jsonwebtoken';
import jwtDecode, { JwtHeader } from 'jwt-decode';
import { JwksClient, CertSigningKey, RsaSigningKey } from 'jwks-rsa';
import { UserBaseDTO } from '../user/userBaseDTO';
import { JwtTokenSchema } from './auth.controller';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async decodeAndValidadeToken(token: string) {
    const audience = process.env.NODE_ENV === 'production' ? 'com.artchapp.ios' : 'host.exp.Exponent';
    const tokenDecodedHeader: JwtHeader & { kid: string } = jwtDecode<JwtHeader & { kid: string }>(token, {
      header: true,
    });

    const response = await axios.get('https://appleid.apple.com/auth/keys');

    const applePublicKey: { keys: Array<{ [key: string]: string }> } = response.data;

    const { kid } = tokenDecodedHeader;
    // eslint-disable-next-line dot-notation
    const sharedKid: string = applePublicKey.keys.filter((x) => x.kid === kid)[0]?.['kid'];

    const client = new JwksClient({
      jwksUri: 'https://appleid.apple.com/auth/keys',
    });

    const key: CertSigningKey | RsaSigningKey = await client.getSigningKey(sharedKid);
    const signingKey: string = key.getPublicKey();

    try {
      const res: JwtTokenSchema = <JwtTokenSchema>verify(token, signingKey);

      console.log({ resAuh: res.aud, audience })

      if (res.iss !== 'https://appleid.apple.com') {
        throw { message: 'Issuers do not match!' };
      }
      if (res.aud !== audience) {
        throw { message: 'Audiences do not match!' };
      }
      return res;
    } catch (error) {
      console.log(error);
    }
  }

  async generateJwt(user: UserBaseDTO) {
    return this.jwtService.signAsync({
      uuid: user.uuid,
      role: user.role.slug,
      name: user.name,
    });
  }
}
