import {Cart} from './cart';

export interface Invoice {
  cartsOfUser?: Cart[];

  totalQuantity?: number;

  totalPayment?: string;
}
