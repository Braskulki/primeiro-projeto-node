import AppError from '@shared/errors/AppErrors';

import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;
let fakeNotificationsRepository: FakeNotificationsRepository;
let fakeCacheProvider: FakeCacheProvider;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();
    fakeCacheProvider = new FakeCacheProvider();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to create a new Appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    const appointment = await createAppointment.execute({
      user_id: "user_id",
      date: new Date(2020, 4, 10, 13),
      provider_id: 'provider_id',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('provider_id');
  });

  it('should not be able to create a two appointments on same time', async () => {
    const appointmentDate = new Date(2021, 4, 20, 13);

    await createAppointment.execute({
      user_id: "user-id",
      date: appointmentDate,
      provider_id: 'provider-id',
    });

    await expect(createAppointment.execute({
      user_id: "user-id",
      date: appointmentDate,
      provider_id: 'provider-id',
    })).rejects.toBeInstanceOf(AppError);

  });

  it('should not be able to create an appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 4, 10, 12).getTime();
    });

    await expect(createAppointment.execute({
      user_id: "user_id",
      date: new Date(2021, 4, 10, 11),
      provider_id: 'provider_id',
    })).rejects.toBeInstanceOf(AppError);

  });

  it('should not be able to create an appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 4, 10, 12).getTime();
    });

    await expect(createAppointment.execute({
      user_id: "user-id",
      date: new Date(2021, 4, 10, 15),
      provider_id: 'user-id',
    })).rejects.toBeInstanceOf(AppError);

  });

  it('should not be able to create an appointment before 8am and after 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 4, 10, 12).getTime();
    });

    await expect(createAppointment.execute({
      date: new Date(2021, 4, 11, 7),
      user_id: "user-id",
      provider_id: 'provider-id',
    })).rejects.toBeInstanceOf(AppError);

    await expect(createAppointment.execute({
      date: new Date(2021, 4, 11, 18),
      user_id: "user-id",
      provider_id: 'provider-id',
    })).rejects.toBeInstanceOf(AppError);

  });
});
