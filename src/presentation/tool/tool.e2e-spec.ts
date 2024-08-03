import * as jwt from 'jsonwebtoken';
import * as request from 'supertest';
import { ApolloDriver } from '@nestjs/apollo';
import { NestApplication } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { Test, TestingModule } from '@nestjs/testing';

import { config } from '@src/config';
import { USER_ROLE } from '@presentation/guard/userRole';
import { userRopo } from '@service/db/fake/mock/user.ropo';
import { ToolModule } from '@presentation/tool/tool.module';
import { JwtStrategy } from '@presentation/auth/jwt.strategy';

describe('ToolModule (e2e)', () => {
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
        ToolModule,
        GraphQLModule.forRoot({
          driver: ApolloDriver,
          autoSchemaFile: config.graphQL.schemaFileName,
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

  it('#generatePassword', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: `query {
          generatePassword (
            dto: {
              length: 8
              specials: true
            }
          ) {
            password
          }
        }`,
      })
      .set('Authorization', authorization)
      .expect(({ body }) => {
        const data = body.data.generatePassword;
        expect(data.password).toBeDefined();
      })
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
