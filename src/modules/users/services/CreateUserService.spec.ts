import AppError from '@shared/errors/AppErrors';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';


let fakeUserRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let fakeCacheProvider: FakeCacheProvider;


describe('CreateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();

    createUser = new CreateUserService(fakeUserRepository, fakeHashProvider, fakeCacheProvider);
  })
  it('should be able to create a new User', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@hotmail.com',
      password: 'johndoe',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new User with same email from another', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@hotmail.com',
      password: 'johndoe',
    });

    await expect(createUser.execute({
      name: 'John Doe',
      email: 'johndoe@hotmail.com',
      password: 'johndoe',
    }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

