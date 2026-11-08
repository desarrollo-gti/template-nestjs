import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, OptimisticLockVersionMismatchError, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import type { ProductImage } from "./product-image.entity.js";
import { User } from "../../auth/entities/user.entity.js";

@Entity({name: 'products'})
export class Product {
    
    @ApiProperty({
        example: '7e7bcc0d-4661-43a6-adc8-1dedb3cb9826',
        description: 'Product ID',
        uniqueItems: true,
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        example:'T-Shirt Teslo',
        description: 'Product Title',
        uniqueItems: true,
    })
    @Column('text', {
        unique: true,
    })
    title: string;

    @ApiProperty({
        example:0,
        description: 'Product price',
    })
    @Column('float', {
        default: 0
    })
    price: number;

    @ApiProperty({
        example:'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto',
        description: 'Product description',
        default: null,        
    }        
    )
    @Column({
        type: 'text',
        nullable: true
    })
    description: string;

    @ApiProperty({
        example:'t_shirt_teslo',
        description: 'Product SLUG - for SEO',
        uniqueItems: true,            
    })
    @Column('text', {
        unique: true
    })
    slug: string;

    @ApiProperty({
        example:10,
        description: 'Product stock',
        default: 0,        
    })
    @Column('int', { default: 0 })
    stock: number;

    @ApiProperty({
        example:['M', 'L','XL'],
        description: 'Product sizes',
    })
    @Column('text', { array: true })
    sizes: string[];

    @ApiProperty({
        example:'women',
        description: 'Product gender',
    })
    @Column('text')
    gender: string;

    @ApiProperty()
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
