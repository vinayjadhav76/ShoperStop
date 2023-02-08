import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { prod } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  searchResult:undefined | prod[];

constructor( private activeRoute:ActivatedRoute , private prodservice:ProductService ){}

ngOnInit(){
  let query = this.activeRoute.snapshot.paramMap.get('query')
  // console.warn(query);
  query && this.prodservice.searchProduct(query).subscribe((result)=>{
this.searchResult=result
  })
}
}
