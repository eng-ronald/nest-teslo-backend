import { Account } from 'src/accounts/entities/account.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';


@Entity('users')
export class User {
  
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true
  })
  email: string;

  @Column('text', {
    nullable: true
  })
  phone: string;

  @Column('text', {
    nullable: true
  })
  picture: string;

  @Column('text', {
    default: 'main'
  })
  branch: string;

  @Column('text', {
    select: false
  })
  password: string;

  @Column('text')
  fullName: string;

  @Column('bool', {
    default: true
  })
  isActive: boolean;

  @Column('text', {
    array: true,
    default: ['Seller']
  })
  roles: string[];

  @Column('text', {
    array: true,
    nullable: true
  })
  permissionMenu: string[];

  @OneToMany( 
    () => Account, 
    account => account.user
  )
  accounts: Account[];



  @BeforeInsert()
  checkFieldsBeforeInsert(){
    this.email = this.email.toLowerCase().trim();
  }

  @BeforeUpdate()
  checkFieldsBeforeUpdate(){
    this.checkFieldsBeforeInsert();
  }

}
