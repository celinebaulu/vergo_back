import * as jwt from 'jsonwebtoken';
import * as request from 'supertest';
import { ApolloDriver } from '@nestjs/apollo';
import { NestApplication } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { Test, TestingModule } from '@nestjs/testing';

import { config } from '@src/config';
import { USER_ROLE } from '@presentation/guard/userRole';
import { userRopo } from '@service/db/fake/mock/user.ropo';
import { AuthModule } from '@presentation/auth/auth.module';
import { JwtStrategy } from '@presentation/auth/jwt.strategy';

describe('AuthResolver (e2e)', () => {
  let app: NestApplication;
  const token: string = jwt.sign(
    {
      id: userRopo.id,
      code: userRopo.code,
      role: USER_ROLE.USER,
    },
    config.jwt.secret,
    {
      expiresIn: '24h', // expires in 24 hours
    },
  );
  const authorization: string = 'Bearer ' + token;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [JwtStrategy],
      imports: [
        AuthModule,
        GraphQLModule.forRoot({
          autoSchemaFile: true,
          driver: ApolloDriver,
          context: ({ req, res }) => {
            return { req, res };
          },
        }),
      ],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('#auth', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: `query {
          auth(
              dto: {
                login: "ropo"
                password: "password"
              }
          ){
            access_token
            id
            code
            name_first
            name_last
            description
            mail
          }
        }`,
      })
      .expect(({ body }) => {
        const data = body.data.auth;
        expect(data.id).toEqual('65d4d015261e894a1da31a64');
      })
      .expect(200);
  });

  it('#auth_passkey', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: `query {
          auth_passkey(
              dto: {
                credentialId: "ApYnkOh-EYEXH-cTv52xmwoHTac-CTHgzbVTzG_iR8o"
                authenticatorData: "EUHtSNIv5fiPje5H19kb-xNKP2GTKL1nyD2CU1ivtc8FAAAABQ=="
                clientData: "eyJ0eXBlIjoid2ViYXV0aG4uZ2V0IiwiY2hhbGxlbmdlIjoiZDBlZWE0ZjAtOTY0Ni00MjJhLTk5ZjgtM2RjNTMwNzMxNzFiIiwib3JpZ2luIjoiaHR0cHM6Ly9zaWd1cmkuaGFwcHlraWxsZXIubmV0IiwiY3Jvc3NPcmlnaW4iOmZhbHNlfQ=="
                signature: "MEYCIQD2L8vjHB7UVELPgoiTKwDGa3umlcNe1qBe9_sYdZecHQIhAKjRkJ2fD00VGnpxsfWBjTNfSKZJCNWMq0NBPIAP0hE3"
                userHandle: "flTiJs31BnSLFmAq9_bRkwv-CO0hi8MVj8KhYcOmOVI="
                user_code: "ropo"
              }
          ){
            access_token
            id
            code
            name_first
            name_last
            description
            mail
          }
        }`,
      })
      .expect(({ body }) => {
        const data = body.data.auth_passkey;
        expect(data.id).toEqual('65d4d015261e894a1da31a64');
      })
      .expect(200);
  });

  it('#getSessionInfo', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: `query {
          getSessionInfo {
            access_token
            id
            code
            name_first
            name_last
            description
            mail
          }
        }`,
      })
      .set('Authorization', authorization)
      .expect(({ body }) => {
        const data = body.data.getSessionInfo;
        expect(data.id).toEqual('65d4d015261e894a1da31a64');
      })
      .expect(200);
  });

  it('#update_password', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: `mutation {
          update_password(
              dto: {
                old_value: "password"
                new_value: "new_password"
                conf_value: "new_password"
              }
          ){
            access_token
            id
            code
            name_first
            name_last
            description
            mail
          }
        }`,
      })
      .set('Authorization', authorization)
      .expect(({ body }) => {
        const data = body.data.update_password;
        expect(data.id).toEqual('65d4d015261e894a1da31a64');
      })
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
