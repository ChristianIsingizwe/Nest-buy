import { Expose, Type } from "class-transformer";

export class ProductsDto{
    @Expose()
    totalProducts:number;
    @Expose()
    limit:number

    @Expose()
    @Type(()=>ProductList)
    products:ProductList[]
}

export class ProductList{
    @Expose({name:'product_id'})
    id:number
}