import { mock, MockProxy } from 'jest-mock-extended';

import { Reflector } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';

import { USER_ROLE } from '@presentation/guard/userRole';
import { RolesGuard } from '@presentation/guard/roles.guard';

describe('RolesGuard', () => {
  let rolesGuard: RolesGuard;
  let reflector: Reflector;
  const mockExecutionContext: MockProxy<ExecutionContext> =
    mock<ExecutionContext>();

  const tContext = {
    getContext: () => {
      return {
        req: {
          user: {
            id: '11111',
            code: 'admin',
            role: USER_ROLE.ADMIN,
          },
        },
        res: {
          header: '',
        },
      };
    },
  };

  const tContext2 = {
    getContext: () => {
      return {
        req: {
          user: {
            id: '11111',
            code: 'admin',
          },
        },
        res: {
          header: '',
        },
      };
    },
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolesGuard,
        {
          provide: Reflector,
          useValue: {
            constructor: jest.fn(),
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    rolesGuard = module.get<RolesGuard>(RolesGuard);
    GqlExecutionContext.create = jest.fn().mockImplementation(() => tContext);
    reflector = module.get<Reflector>(Reflector);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(rolesGuard).toBeDefined();
  });

  describe('#canActivate', () => {
    it('Should be defined', async () => {
      // arrange
      // act
      // assert
      expect(rolesGuard.canActivate).toBeDefined();
    });

    it('Should return true if no roles passed in decorator', async () => {
      // arrange
      jest.spyOn(reflector, 'get').mockImplementation(() => null);
      // act
      const result = await rolesGuard.canActivate(mockExecutionContext);
      // assert
      expect(result).toStrictEqual(true);
    });

    it('Should return true if user has the right role', async () => {
      // arrange
      jest.spyOn(reflector, 'get').mockImplementation(() => [USER_ROLE.ADMIN]);
      // act
      const result = await rolesGuard.canActivate(mockExecutionContext);
      // assert
      expect(result).toStrictEqual(true);
    });

    it('Should return an error if user don t have the right role', async () => {
      // arrange
      jest.spyOn(reflector, 'get').mockImplementation(() => [USER_ROLE.USER]);
      // act
      let result;
      try {
        result = await rolesGuard.canActivate(mockExecutionContext);
      } catch (error) {
        result = error;
      }
      // assert
      expect(result).toStrictEqual(
        new UnauthorizedException('User role not allowed for this action'),
      );
    });

    it('Should return an error if user don t have a role', async () => {
      // arrange
      jest.spyOn(reflector, 'get').mockImplementation(() => [USER_ROLE.ADMIN]);
      GqlExecutionContext.create = jest
        .fn()
        .mockImplementation(() => tContext2);
      // act
      let result;
      try {
        result = await rolesGuard.canActivate(mockExecutionContext);
      } catch (error) {
        result = error;
      }
      // assert
      expect(result).toStrictEqual(
        new UnauthorizedException('User role not allowed for this action'),
      );
    });
  });
});
