import { Component, OnInit, AfterContentInit } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, AfterContentInit {

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit(): void {
    setTimeout(() => {
      const hIV = document.getElementById('insert-div').clientHeight;
      document.getElementById('product-list').style.maxHeight = hIV + 'px';
    }, 100);
  }

  growDiv(_id: string) {
    const growDiv = document.getElementById(_id);
    if (growDiv.clientHeight !== 40) {
      growDiv.style.height = '40px';
      growDiv.style.marginTop = '20px';
      growDiv.style.borderRadius = '25px';
      growDiv.classList.add('rotate-icon');
      // growDiv.style.overflowY = 'hidden';
      growDiv.querySelector('i[name="go-click"]').classList.remove('rotate-icon');
      // growDiv.querySelector('i[name="go-click"]').setAttribute('style', 'color: white; margin-right: 5px; cursor: pointer;');
    } else {
      const growDiv2 = document.getElementById(_id + '_content');
      growDiv.style.height = (growDiv2.clientHeight + (growDiv.clientHeight + 32)) + 'px';
      growDiv.style.borderRadius = '15px';
      growDiv.style.marginTop = '30px';
      growDiv.querySelector('i[name="go-click"]').classList.add('rotate-icon');
    }
  }

}
