import { User } from 'src/auth/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';


@Entity({ name: 'accounts'})
export class Account {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  contactName: string;

  @Column('text')
  companyName: string;

  @Column('text')
  address: string;

  @Column('text')
  city: string;

  @Column('text')
  state: string;

  @Column('text')
  country: string;

  @Column('text')
  phone: string;

  @Column('text', {
    unique: true
  })
  email: string;

  @Column('text')
  accountType: string;
  
  @ManyToOne( 
    ()=> User, 
    user => user.accounts
  )
  user: User;

}
