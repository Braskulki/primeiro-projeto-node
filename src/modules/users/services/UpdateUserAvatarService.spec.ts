import AppError from '@shared/errors/AppErrors';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUsersRepository from '../repositories/fakes/FakesUsersRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';


describe('UpdateUserAvatar', () => {
  it('should be able to update the user avatar', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUserAvatar = new UpdateUserAvatarService(fakeUserRepository, fakeStorageProvider);

    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@hotmail.com',
      password: 'johndoe',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg',
    });

    expect(user.avatar).toBe('avatar.jpg');
  });
});

describe('UpdateUserAvatar', () => {
  it('should not be able to update avatar from non existing user', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUserAvatar = new UpdateUserAvatarService(fakeUserRepository, fakeStorageProvider);


    expect(updateUserAvatar.execute({
      user_id: 'non-existing-user',
      avatarFilename: 'avatar.jpg',
    })).rejects.toBeInstanceOf(AppError);
  });
});

describe('UpdateUserAvatar', () => {
  it('should delete old avatar when updating new one', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const updateUserAvatar = new UpdateUserAvatarService(fakeUserRepository, fakeStorageProvider);

    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@hotmail.com',
      password: 'johndoe',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar2.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
    expect(user.avatar).toBe('avatar2.jpg');
  });
});
