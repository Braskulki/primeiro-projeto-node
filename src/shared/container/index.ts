import { container } from 'tsyringe';

import '@modules/users/providers'
import './providers'

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

import IUserRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

//com Singleton ele instancia a classe uma unica vez,
//sem ele instanciaria uma nova toda vez que fosse necessario
container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository', AppointmentsRepository);

container.registerSingleton<IUserRepository>(
  'UsersRepository', UsersRepository);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);
