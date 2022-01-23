import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalquantity: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.listCartDetails();
  }
  listCartDetails() {
    this.cartItems = this.cartService.cartItems;
    console.log("The CartItems: " + this.cartItems);

    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );

    this.cartService.totalQuantity.subscribe(
      data => this.totalquantity = data
    );
    
    this.cartService.computeCartTotal();
      
  
  }

  incrementQuantity(cartItem: CartItem){

    
    // for (let tempItem of this.cartService.cartItems){
    //   tempItem.name === cartItem.name ? tempItem.quantity++:null;
    // }

    // this.cartService.computeCartTotal();

    this.cartService.addToCart(cartItem);

  }

  decrementQuantity(cartItem: CartItem){
    this.cartService.decrementFromCart(cartItem);
  }

  remove(cartItem: CartItem){
    this.cartService.removeItem(cartItem);

    this.cartService.computeCartTotal();

  }
  

}
