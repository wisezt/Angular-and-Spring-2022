import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map, tap } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {



  private baseUrl = 'http://localhost:8080/api/products';

  constructor(private httpClient: HttpClient) { }


  getProductList(theCategoryId: number): Observable<Product[]> {

    // @TODO, need to build URL based on category id
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}&size=100`;
    // console.log("searchUrl：" +  searchUrl);

    // this.httpClient.get(searchUrl).subscribe(
    //   res => console.log(res)
    // );

    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      // tap(response => console.log("Before map(): ")),
      // tap(response => console.log(response)),
      map(response => response._embedded.products)
      // tap(response => console.log("After map(): ")),
      // tap(response => {console.log(response); console.log("A");})
    );


  }

  getProductCategories(): Observable<ProductCategory[]> {

    // @TODO, need to build URL based on category id
    // const categoryUrl = `http://localhost:8080/api/productCategories`;
    const categoryUrl = `http://localhost:8080/api/product-category`;
    console.log("searchUrl：" + categoryUrl);


    return this.httpClient.get<GetResponseProductCategories>(categoryUrl).pipe(

      tap(response => console.log(response)),
      map(response => response._embedded.productCategory),
      tap(response => console.log(response))

    );

  }

  searchProducts(theKeyWord: string | null) {
    const searchUrl = `http://localhost:8080/api/products/search/findByNameContaining?name=${theKeyWord}`;
    console.log("searchUrl：" + searchUrl);


    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(

      // tap(response => console.log(response)),
      map(response => response._embedded.products),
      tap(response => console.log(response))

    );
  }


  searchProductsPaginate(thePage: number,
    thePageSize: number,
    theKeyWord: string | null
  ): Observable<GetResponseProducts> {

    const searchUrl = `http://localhost:8080/api/products/search/findByNameContaining?name=${theKeyWord}&page=${thePage}&size=${thePageSize}`;
    console.log(searchUrl);

    return this.httpClient.get<GetResponseProducts>(searchUrl);


  }

  getProduct(theProductId: number): Observable<Product> {
    const productDetailsUrl = `http://localhost:8080/api/products/${theProductId}`;
    // console.log("searchUrl：" +  searchUrl);


    return this.httpClient.get<Product>(productDetailsUrl).pipe(

      // tap(response => console.log(response)),
      // map(response => response._embedded.products),
      tap(response => console.log(response))

    );
  }

  getProductListPaginate(thePage: number,
    thePageSize: number,
    theCategoryId: number
  ): Observable<GetResponseProducts> {

    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}&page=${thePage}&size=${thePageSize}`;
    console.log(searchUrl);

    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      tap(data => console.log(data))
    );


  }



}



export interface GetResponseProducts {
  _embedded: {
    products: Product[];
  }
  page: {
    size: number,
    totalElements: number,
    totalPage: number,
    number: number
  }

  // can we use a page class?
  // page: Page


}

interface GetResponseProductCategories {
  _embedded: {
    productCategory: ProductCategory[];
  }


}