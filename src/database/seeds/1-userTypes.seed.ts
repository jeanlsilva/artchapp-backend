import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import UserType from '../../domain/user/userType.entity';

export class UserTypes implements Seeder {
  seedUsersType = [
    { uuid: '5e398f6a-1059-43f5-80c7-dd54acf01129', slug: 'user', label: 'User' },
    { uuid: 'f59b2c71-57a4-4350-aafd-835d860fff7a', slug: 'admin', label: 'Admin' },
  ];

  public async run(factory: Factory, connection: Connection): Promise<void> {
    await connection.createQueryBuilder().insert().into(UserType).values(this.seedUsersType).execute();
  }
}
