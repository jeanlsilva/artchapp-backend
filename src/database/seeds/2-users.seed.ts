import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import User from '../../domain/user/user.entity';

export class Users implements Seeder {
  seedUser = [
    {
      email: 'jean.silva@penseapp.com.br',
      firebase_uid: 'P3bdF9Ii1uSKZQGNMruDv49V9mZ2',
      name: 'Administrador',
      vat_number: '11111111111',
      phone: '5511123456789',
      role: {
        uuid: 'f59b2c71-57a4-4350-aafd-835d860fff7a',
      },
    },
  ];

  public async run(factory: Factory, connection: Connection): Promise<void> {
    await connection.createQueryBuilder().insert().into(User).values(this.seedUser).execute();
  }
}
