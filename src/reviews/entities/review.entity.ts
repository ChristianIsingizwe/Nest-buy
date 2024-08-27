import { ProductEntity } from "src/products/entities/product.entity";
import { UserEntity } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";

@Entity({name:'reviews'})
export class ReviewEntity {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    ratings:number

    @Column()
    comment:string

    @CreateDateColumn()
    createdAt: Timestamp

    @UpdateDateColumn()
    updatedAt: Timestamp

    @ManyToMany(type=>UserEntity, (user)=>user.reviews)
    user:UserEntity

    @ManyToOne(type=>ProductEntity, (prod)=>prod.reviews)
    product:ProductEntity
}
