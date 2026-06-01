import { CoreEntity } from 'src/aplication/entities/core.entity';
import { User } from 'src/user/user.entity';
import { Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity({ name: 'cooperation' })
export class Cooperation extends CoreEntity {
  @ManyToOne(() => User, (user1) => user1.id, {
    nullable: false,
    eager: false,
  })
  @JoinColumn({ name: 'first_user' })
  firstUser: User;

  @ManyToOne(() => User, (user2) => user2.id, {
    nullable: false,
    eager: false,
  })
  @JoinColumn({ name: 'second_user' })
  secondUser: User;

  @ManyToOne(() => User, (user3) => user3.id, {
    nullable: true,
    eager: false,
  })
  @JoinColumn({ name: 'third_user' })
  thirdUser: User;

  @ManyToOne(() => User, (user4) => user4.id, {
    nullable: true,
    eager: false,
  })
  @JoinColumn({ name: 'fourth_user' })
  fourthUser: User;

  @ManyToOne(() => User, (user5) => user5.id, {
    nullable: true,
    eager: false,
  })
  @JoinColumn({ name: 'fifth_user' })
  fifthUser: User;
}
