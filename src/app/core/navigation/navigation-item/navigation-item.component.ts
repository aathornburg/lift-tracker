import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'lt-navigation-item',
  templateUrl: './navigation-item.component.html',
  styleUrls: ['./navigation-item.component.scss']
})
export class NavigationItemComponent implements OnInit {

  @Input() routerLinkLocation: string;

  constructor() { }

  ngOnInit() {
  }

}
