import AppError from '@shared/errors/AppErrors';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakesUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

describe('AuthenticateUser', () => {
  it('should be able do authenticate', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(fakeUserRepository, fakeHashProvider);
    const authenticateUser = new AuthenticateUserService(fakeUserRepository, fakeHashProvider);

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@hotmail.com',
      password: 'johndoe',
    });

    const response = await authenticateUser.execute({
      email: 'johndoe@hotmail.com',
      password: 'johndoe',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });
});


describe('AuthenticateUser', () => {
  it('should not be able to authenticate with non existing user', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUser = new AuthenticateUserService(fakeUserRepository, fakeHashProvider);




    expect(authenticateUser.execute({
      email: 'johndoe@hotmail.com',
      password: 'johndoe',
    })).rejects.toBeInstanceOf(AppError);
  });
});

describe('AuthenticateUser', () => {
  it('should not be able to authenticate with wrong password', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(fakeUserRepository, fakeHashProvider);
    const authenticateUser = new AuthenticateUserService(fakeUserRepository, fakeHashProvider);

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@hotmail.com',
      password: 'johndoe',
    });

    expect(authenticateUser.execute({
      email: 'johndoe@hotmail.com',
      password: '123456',
    })).rejects.toBeInstanceOf(AppError);
  });
});
