import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product = new Product();

  constructor(private route: ActivatedRoute, private productService: ProductService, private cartService: CartService) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(
      () => this.getProductDetails()
    );



  }
  getProductDetails() {
    const theProductId: number = Number(this.route.snapshot.paramMap.get('id'));

    this.productService.getProduct(theProductId).subscribe(
      data => {
        this.product = data;
        console.log('Got you');
        console.log(data);

      }

    );


  }

  
  addToCart(theProduct: Product){
    // console.log(`${theProduct.name}, ${theProduct.unitPrice}`);

    const theCartItem = new CartItem(theProduct);
    this.cartService.addToCart(theCartItem);

  }





}
