import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import type { ProductImage } from "./product-image.entity.js";
import { User } from "../../auth/entities/user.entity.js";

@Entity({name: 'products'})
export class Product {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true,
    })
    title: string;

    @Column('float', {
        default: 0
    })
    price: number;

    @Column({
        type: 'text',
        nullable: true
    })
    description: string;

    @Column('text', {
        unique: true
    })
    slug: string;

    @Column('int', { default: 0 })
    stock: number;

    @Column('text', { array: true })
    sizes: string[];

    @Column('text')
    gender: string;

    @Column('text', {
        array: true,
        default: []
    })
    tags: string[];

    //imagenes
    @OneToMany(
        "ProductImage",
        (productImage: any) => productImage.product,
        { cascade: true, eager: true }
    )
    images?: ProductImage[];

    //relacion con usuario muchos a uno
    @ManyToOne(
        ()=>User,
        (user)=>user.product,
        {eager: true}
    )
    user:User

    @BeforeInsert()
    checkSlugInsert() {
        if (!this.slug) {
            this.slug = this.title;
        }
        this.cleanSlug();
    }

    // Quita y caracteres especiales y valida
    @BeforeUpdate()
    checkSlugUpdate() {
        this.cleanSlug();
    }

    private cleanSlug() {
        this.slug = this.slug
            .toLowerCase()
            .replaceAll(' ', '_')
            .replaceAll("'", '');
    }

}
