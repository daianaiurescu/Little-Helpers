import {Product} from './Product.interface';

export interface Order {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  total: number;
  products: Product[];
}
