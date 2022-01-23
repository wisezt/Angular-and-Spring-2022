import { unescapeIdentifier } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new Subject<number>();

  totalQuantity: Subject<number> = new Subject<number>();

  // testValue: number = 100;

  constructor() { }

  addToCart(theCartItem: CartItem) {

    // Check if the item is in the Cart
    let alreadyExistsinCart: boolean = false;
    let existingCartItem !: CartItem;

    console.log("addToCart");

    if (this.cartItems.length > 0) {
      // find the item in the cart base on item id

      // for (let tempCartItem of this.cartItems){
      //   if (tempCartItem.id === theCartItem.id)
      //   existingCartItem = tempCartItem;
      //   break;
      // }

      existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id === theCartItem.id)!;



      // check if we found it.
      alreadyExistsinCart = (existingCartItem != undefined);
    }
    if (alreadyExistsinCart) {
      existingCartItem.quantity!++;
    } else {
      this.cartItems.push(theCartItem);
    }

    // comput cart total price and total quanitty
    this.computeCartTotal();



  }

  decrementFromCart(cartItem: CartItem) {

    cartItem.quantity--;

    if (cartItem.quantity < 1) {
      this.removeItem(cartItem);
    }



    // for (let tempCartItem of this.cartItems) {
    //   if (tempCartItem.id === cartItem.id){

    //     tempCartItem.quantity--;

    //     if (tempCartItem.quantity <= 0 ){
    //       let index = this.cartItems.indexOf(tempCartItem);
    //       this.cartItems.splice(index, 1);
    //     }

    //     break;
    //   }

    // }

    this.computeCartTotal();

  }

  removeItem(cartItem: CartItem) {

    let index = this.cartItems.findIndex(item => item.id === cartItem.id);

    if (index > -1) {
      this.cartItems.splice(index, 1);
    }
  }




  computeCartTotal() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;
    for (let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.quantity! * currentCartItem.unitPrice!;
      totalQuantityValue += currentCartItem.quantity!;

    }

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    // this.logCartData(totalPriceValue, totalQuantityValue);


  }
  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    // console.log('Contents of the cart');
    // console.log(`Items quantity: ${this.cartItems.length}`);
    for (let tempCartItem of this.cartItems) {
      const subTotalPrice = tempCartItem.quantity * tempCartItem.unitPrice;
      // console.log(`name: ${tempCartItem.name}, quantity=${tempCartItem.unitPrice}, subTotalPrice=${subTotalPrice}`);
    }

    // console.log(`TotalPrice: ${totalPriceValue}, TotalQuantity: ${totalQuantityValue}` );

    // console.log('---');

  }
}

