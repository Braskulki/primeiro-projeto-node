import AppError from '@shared/errors/AppErrors';

import FakeUsersRepository from '../repositories/fakes/FakesUsersRepository';
import CreateUserServices from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';


describe('CreateUser', () => {
  it('should be able to create a new User', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserServices(fakeUserRepository, fakeHashProvider);

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@hotmail.com',
      password: 'johndoe',
    });

    expect(user).toHaveProperty('id');
  });
});

it('should not be able to create a new User with same email from another', async () => {
  const fakeUserRepository = new FakeUsersRepository();
  const fakeHashProvider = new FakeHashProvider();

  const createUser = new CreateUserServices(fakeUserRepository, fakeHashProvider);

  const user = await createUser.execute({
    name: 'John Doe',
    email: 'johndoe@hotmail.com',
    password: 'johndoe',
  });

  expect(createUser.execute({
    name: 'John Doe',
    email: 'johndoe@hotmail.com',
    password: 'johndoe',
  }),
  ).rejects.toBeInstanceOf(AppError);
});

