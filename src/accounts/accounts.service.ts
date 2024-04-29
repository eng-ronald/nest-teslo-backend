import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Account } from './entities/account.entity';
import { User } from 'src/auth/entities/user.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { isUUID } from 'class-validator';

@Injectable()
export class AccountsService {

  private readonly logger = new Logger('AccountsService');

  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    private readonly dataSource: DataSource,

  ){}

  async create(createAccountDto: CreateAccountDto, user: User) {
    
    try {

      const account = this.accountRepository.create({
        ...createAccountDto,
        user
      })
  
      await this.accountRepository.save(account);
  
      return { account };

    } catch (error) {

      this.handleDBExceptions(error);
      
    }

    

  }

  async findAll(paginationDto: PaginationDto) {

    const { limit = 10, offset = 0 } = paginationDto;

    const accounts = await this.accountRepository.find({
      take: limit,
      skip: offset,
      relations: {
        user: true
      }
    })
    return accounts;
  }

  async findOne(id: string) {

    let account: Account;
    
    if(isUUID(id)){
      account = await this.accountRepository.findOneBy({ id });
    }

    if ( !account ) 
      throw new NotFoundException(`Account with ${ id } not found`);

    return account;
    
  }

  async update(id: string, updateAccountDto: UpdateAccountDto) {
    
      
    const account = await this.accountRepository.preload({ id, ...updateAccountDto });

    if (!account) {
      throw new NotFoundException(`Account with id ${id} not found`);
    }
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.save( account );
      await queryRunner.commitTransaction();
      await queryRunner.release();
      return account;

    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      this.handleDBExceptions(error);
    }

  }

  async remove(id: string) {
    const account = await this.findOne( id );
    await this.accountRepository.remove( account );
  }


  private handleDBExceptions( error: any ) {

    if ( error.code === '23505' )
      throw new BadRequestException(error.detail);
    
    this.logger.error(error)
    // console.log(error)
    throw new InternalServerErrorException('Unexpected error, check server logs');

  }

}
