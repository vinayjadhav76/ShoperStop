import { Component, OnInit } from '@angular/core';
import { prod } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  popularProducts: undefined | prod[];
  trendyProducts: any  ;
  constructor(private prodsevice: ProductService) { }

  ngOnInit(): void {
    this.prodsevice.popularProduct().subscribe((data: any) => {
      // console.warn(data);
      this.popularProducts = data;
    })
    this.prodsevice.trendyPrducts().subscribe((data) => {
      this.trendyProducts = data;
      // console.warn(data);
      
    })
  }

}
