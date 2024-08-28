import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { Repository } from 'typeorm';
import { OrdersProductsEntity } from './entities/orders-products.entity';
import { ShippingEntity } from './entities/shipping.entity';
import { ProductEntity } from 'src/products/entities/product.entity';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class OrdersService {
  constructor(@InjectRepository(OrderEntity) private readonly orderRepository:Repository<OrderEntity>,
  @InjectRepository(OrdersProductsEntity) private readonly opRepository:Repository<OrdersProductsEntity>,
  private readonly productService:ProductsService
){}
  async create(createOrderDto: CreateOrderDto, currentUser:UserEntity) {
    const shippingEntity = new ShippingEntity()
    Object.assign(shippingEntity, createOrderDto.ShippingAdress)

    const orderEntity = new OrderEntity()
    orderEntity.shippingAddress = shippingEntity
    orderEntity.user = currentUser

    const orderTable = await this.orderRepository.save(orderEntity)

    let opEntity:{
      order:OrderEntity,
      product:ProductEntity,
      product_quantity:number,
      product_unit_price:number
    }[]=[]

    for(let i=0; i< createOrderDto.orderedProducts.length; i++){
      const order = orderTable;
      const product= await this.productService.findOne(createOrderDto.orderedProducts[i].id)
      const product_quantity = createOrderDto.orderedProducts[i].product_quantity
      const product_unit_price = createOrderDto.orderedProducts[i].product_unit_price
      opEntity.push({order, product, product_quantity, product_unit_price})
    }

    const op = await this.opRepository.createQueryBuilder()
    .insert()
    .into(OrdersProductsEntity)
    .values(opEntity)
    .execute()
    return await this.findOne(orderTable.id);
  }

  findAll() {
    return `This action returns all orders`;
  }

  async findOne(id: number) {
    return await this.orderRepository.findOne({
      where:{id},
      relations:{
        shippingAddress:true,
        user:true,
        products:{product:true}
      }
    })
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
