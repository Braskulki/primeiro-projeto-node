import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import AppError from '@shared/errors/AppErrors';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let fakeAppointmentRepository: FakeAppointmentsRepository;
let fakeCacheProvider: FakeCacheProvider;
let listProviderAvailability: ListProviderAppointmentsService;

describe('ListProvidersAppointments', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentsRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listProviderAvailability = new ListProviderAppointmentsService(
      fakeAppointmentRepository,
      fakeCacheProvider,
    );
  })

  it('should be able to list the appointments on a specific day', async () => {
    const appointment1 = await fakeAppointmentRepository.create({
      user_id: "user",
      provider_id: 'provider',
      date: new Date(2021, 4, 20, 8, 0, 0),
    });

    const appointment2 = await fakeAppointmentRepository.create({
      user_id: "user",
      provider_id: 'provider',
      date: new Date(2021, 4, 20, 9, 0, 0),
    });


    const appointments = await listProviderAvailability.execute({
      provider_id: 'provider',
      year: 2021,
      month: 5,
      day: 20
    });

    expect(appointments).toEqual(expect.arrayContaining([appointment1, appointment2]))
  });

});
