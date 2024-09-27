export interface ProductInterface {
  ID?: number;
  ProductName?: string;
  Stock?: number;
  Price?: number;
  Picture?: string;
  ConcertID?: number;
  Concert?: ConcertInterface;
}

export interface ShoppingCartInterface {
  ID?: number;
  Amount?: number;
  TotalPrice?: number;
  Detail?: string;
  ProductID?: number;
  MemberID?: number;
}

export interface ProductPaymentInterface {
  ID?: number;
  PaymentMethod?: string;
  TotalAmount?: number;
  ShoppingCartID?: number;
}

export interface ConcertInterface {
  ID?: number;
  Name?: string;
 
}