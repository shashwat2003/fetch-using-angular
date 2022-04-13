import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public titles: string[] = [];
  public values: string[] = [];
  public data = {};

  constructor(private _current_route: ActivatedRoute, private _route: Router) {
    this.data = JSON.parse(<string>this._current_route.snapshot.paramMap.get('data'));
  }

  ngOnInit(): void {
    this.titles = Object.keys(this.data);
    this.values = Object.values(this.data);
  }

  isObject(value: any) {
    if (typeof value === 'object') {
      return true;
    }
    return false;
  }

  toString(value: any) {
    let toString = ``;
    for (let i in value) {

      if (this.isObject(value[i])) {
        toString += this.toString(value[i]);
      }
      else {
        toString += i.toUpperCase() + ': ' + value[i] + ' ';
      }
    }
    return toString;
  }

  logout() {
    this._route.navigate(['/']);
  }
}
