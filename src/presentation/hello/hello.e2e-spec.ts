import * as jwt from 'jsonwebtoken';
import * as request from 'supertest';
import { ApolloDriver } from '@nestjs/apollo';
import { NestApplication } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { Test, TestingModule } from '@nestjs/testing';

import { config } from '@src/config';
import { JwtStrategy } from '@presentation/auth/jwt.strategy';
import { HelloModule } from '@presentation/hello/hello.module';

describe('HelloModule (e2e)', () => {
  let app: NestApplication;
  const token: string = jwt.sign(
    {
      id: '65d4d015261e894a1da31a64',
      code: 'ropo',
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
        HelloModule,
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

  it('#hello', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: `query {
          hello {
            message
          }
        }`,
      })
      .set('Authorization', authorization)
      .expect(({ body }) => {
        const data = body.data.hello;
        expect(data).toEqual({
          message: 'Hello World',
        });
      })
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
