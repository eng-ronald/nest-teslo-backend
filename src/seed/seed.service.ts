import { Injectable } from '@nestjs/common';
import  * as bcrypt from 'bcrypt'
import { initialData } from './data/seed-data';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/entities/user.entity';
import { Repository } from 'typeorm';


@Injectable()
export class SeedService {

  constructor(

    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}


  async runSeed() {

    await this.deleteTables();
    
    const adminUser = await this.insertUsers();

    return 'SEED EXECUTED';
  }

  private async insertUsers(){

    const seedUsers = initialData.users;

    const users: User[] = [];

    seedUsers.forEach( user => {
      const { password, ...userData } = user;

      users.push( this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10)
      }))
    });

    const dbUsers = await this.userRepository.save(users)

    return dbUsers[0];

  }

  private async deleteTables() {
    const queryBuilder = this.userRepository.createQueryBuilder();
    await queryBuilder
      .delete()
      .where({})
      .execute()
    

  }


}
