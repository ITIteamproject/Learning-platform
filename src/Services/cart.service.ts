import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cartItemList: any = [];
  public productList = new BehaviorSubject<any>([]);
  constructor(private http: HttpClient) {}

  getProducts() {
    return this.productList.asObservable();
  }
  setProduct(product: any) {
    this.cartItemList.push(...product);
    this.productList.next(product);
  }
  addtoCart(product: any) {
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
    
  }

  getTotalPrice(): number {
    let x = 0;
    this.cartItemList.map((a: any) => {
      x += a.total;
    });
    return x;
  }

  removeCart(product: any) {
    this.cartItemList.map((a: any, index: any) => {
      if (product._id === a._id) {
        this.cartItemList.splice(index, 1);
      }
    });
    this.productList.next(this.cartItemList);
  }
  removeAll() {
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
    // this.productList.next(this.cartItemList);
  }
  saveOrders(x: any , token:any) {
    const headers = new HttpHeaders({
      Authorization: token,
    });
    return this.http.post<any>('http://localhost:3000/purchase', x,{headers});
  }
}
