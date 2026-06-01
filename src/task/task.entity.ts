import { ApiProperty } from '@nestjs/swagger';
import { number } from 'joi';
import { CoreEntity } from 'src/aplication/entities/core.entity';
import { User } from 'src/user/user.entity';
import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';

@Entity({ name: 'tasks' })
export class Task extends CoreEntity {
  @ApiProperty()
  @Column({
    type: 'varchar',
    nullable: false,
    name: 'name',
  })
  public name: string;

  @ApiProperty()
  @Column({
    type: 'varchar',
    nullable: true,
    name: 'description',
  })
  public description: string;

  @ApiProperty()
  @Column({
    type: 'boolean',
    nullable: false,
    name: 'is_complite',
    default: false,
  })
  public isComplite: boolean;

  @ManyToOne(() => User, (owner) => owner.tasks, {
    nullable: false,
    eager: false,
  })
  owner: User;

  @Column({
    nullable: false,
    type: 'integer',
    name: 'ownerId',
  })
  ownerId: number;
}
