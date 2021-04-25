import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'products',
  orderBy: {
    uid: 'ASC'
  }
})
export class Product {
  @PrimaryColumn()
  uid: string;

  @Column()
  id: number;

  @Column()
  date: Date;

  @Column({
    name: 'product_title'
  })
  productTitle: string;

  @Column()
  currency: string;

  @Column()
  price: number;

  @Column({
    name: 'total_booking_count'
  })
  totalBookingCount: number;

  @Column()
  destination: string;

  @Column({
    type: 'point'
  })
  location: string;

  @Column({
    type: 'text',
    array: true
  })
  segments: string[];

  @Column()
  ota: string;
}
