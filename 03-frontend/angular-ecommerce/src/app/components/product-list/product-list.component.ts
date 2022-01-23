import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { GetResponseProducts } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products?: Product[] = [];
  currentCategoryId?: number = 1;
  previousCategoryId: number = 1;
  searchMode?: boolean = false;

  // new peroperties for Pagination
  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;

  previousKeyWord?: string = "";



  constructor(private productService: ProductService, private route: ActivatedRoute, private cartService: CartService
  ) { }

  ngOnInit() {

    this.route.paramMap.subscribe(
      () => { this.listProducts(); }
    );


  }
  listProducts() {

    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProducts();
      console.log(`listProduct(): keyword, ${this.route.snapshot.paramMap.get('keyword')}`);
    } else {
      this.handleListProducts();
      console.log(`handleListProducts`);
    }
  }
  handleSearchProducts() {
    let theKeyword = this.route.snapshot.paramMap.get('keyword');

    // if we have an different keyword than previous
    // then set thePageNumaber to 1

    if (this.previousKeyWord != theKeyword){
      this.thePageNumber = 1;
    }
    
    if (theKeyword){
    this.previousKeyWord = theKeyword;}
    // else{
    //   theKeyword = "";
    // }

    console.log(`keyword:${theKeyword}, thePageNumber=${this.thePageNumber}`);

    this.productService.searchProductsPaginate(this.thePageNumber-1, this.thePageSize, theKeyword).subscribe(
      this.processResult()
    );
  }

  handleListProducts() {
    // check if "id" parameter is avaliable
    const hasCatgoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCatgoryId) {
      // get the "id", and covert it to number

      // this.currentCategoryId = +this.route.snapshot.paramMap.get('id');

      this.currentCategoryId = Number(this.route.snapshot.paramMap.get('id'));
      console.log("Has ID");
      console.log("Id:" + this.currentCategoryId);

    } else {
      this.currentCategoryId = 1;
    }


    // Check if we have a different category than perivous
    // Note: Anuglar will resuse a component if it is currently being viewed

    // if we have a different category id than previous
    // then set thePageNumber back to 1
    if (this.previousCategoryId != this.currentCategoryId) {
      this.thePageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;

    console.log(`currentCategoryId=${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`);


    // now get products for the given category id
    this.productService
      .getProductListPaginate(
        this.thePageNumber - 1,
        this.thePageSize,
        this.currentCategoryId)
      .subscribe(this.processResult());

  }

  processResult() {
    return (data: GetResponseProducts) => {
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    };


  }

  updatePageSize(pageSize?: number){
    if (pageSize){
      this.thePageSize = pageSize;
    }
    this.thePageNumber = 1;
    this.listProducts();
  }

  addToCart(theProduct: Product){
    // console.log(`${theProduct.name}, ${theProduct.unitPrice}`);

    const theCartItem = new CartItem(theProduct);
    this.cartService.addToCart(theCartItem);

  }

} 
