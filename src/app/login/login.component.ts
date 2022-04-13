import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JsondataService } from '../jsondata.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public dataIndex = -1;
  public error = 'Fetching Data..';
  public data: any;

  constructor(private _jsonData: JsondataService, private _alertBar: MatSnackBar, private _router: Router) { }

  ngOnInit(): void {
    this._jsonData.getData().subscribe({
      next: (data) => { this.data = data; this.error = 'Data Loaded' },
      error: (error) => { this.error = error; }
    });

  }

  authenticateUser() {
    let email = <HTMLInputElement>document.getElementById('email');
    let passw = <HTMLInputElement>document.getElementById('passw');

    if (this.userExists(email.value)) {
      if (this.data[this.dataIndex].username == passw.value) {
        this._router.navigate(['/user', JSON.stringify(this.data[this.dataIndex])]);
      }
      else {
        this._alertBar.open("Invalid Password!", 'Close');
      }
    }
    else {
      this._alertBar.open("E-Mail doesn't exists!", 'Close');
    }
  }
  userExists(email: string): boolean {
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].email == email) {
        this.dataIndex = i;
        return true;
      }
    }
    return false;

  }
}
