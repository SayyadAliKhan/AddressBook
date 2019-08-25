import { Component, OnInit, Input, Output } from '@angular/core';
import { ApiService } from 'src/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-address',
  templateUrl: './manage-address.component.html',
  styleUrls: ['./manage-address.component.css']
})
export class ManageAddressComponent implements OnInit {
  addresses = [];
  errorList = [];
  address;
  isEdit = false;
  constructor(
    private _api: ApiService,
    private route: Router) { }

  ngOnInit() {
    this.initializeAddress();
    this._api.getAllAddress((err, res) => {
      if (err) {
        setTimeout(() => {
          this.route.navigate(['dashboard']);
        }, 3000);
        this.errorList.push(err.msg || err.error.msg);
        return;
      }
      this.addresses = res.length === 0 ? [] : res;
    });
  }

  editAddress(event) {
    this.address = JSON.parse(JSON.stringify(event));
    this.isEdit = true;
  }

  clearAddress() {
    this.initializeAddress();
  }

  deleteAdress(event) {
    this.errorList = [];
    this._api.deleteAddress(event, (err, res) => {
      if (err) {
        setTimeout(() => {
          this.route.navigate(['dashboard']);
        }, 3000);
        this.errorList.push(err.msg || err.error.msg);
        return;
      }

      this.addresses = this.addresses.filter((address) => {
        return event._id !== address._id;
      });
    });
    console.log('this.addresses', this.addresses);

  }

  saveAddress() {
    this.errorList = [];
    if (this.validateForm()) {
      if (!this.isEdit) {
        this.address['user_id'] = localStorage.getItem('user_id');
        this._api.saveAddress(this.address, (err, res) => {
          if (err) {
            setTimeout(() => {
              this.route.navigate(['dashboard']);
            }, 3000);
            this.errorList.push(err.msg || err.error.msg);
            return;
          }
          this.addresses.push(res);
          this.initializeAddress();
        });
      } else {

        this._api.editAddress(this.address, (err, res) => {
          if (err) {
            setTimeout(() => {
              this.route.navigate(['dashboard']);
            }, 3000);
            this.errorList.push(err.msg || err.error.msg);
            return;
          }
          this.addresses = this.addresses.filter((address) => {
            return this.address._id !== address._id;
          });

          this.addresses.push(this.address);
          this.initializeAddress();
        });
      }
    }
  }

  initializeAddress() {
    this.isEdit = false;
    this.address = {
      'address_book_title': '',
      'contact_name': '',
      'contact_no': '',
      'address_line_1': '',
      'address_line_2': '',
      'address_line_3': '',
      'pincode': '',
      'city': '',
      'state': '',
      'country': '',
      'user_id': ''
    };
  }


  validateForm() {
    if (this.address.address_book_title === '') {
      this.errorList.push('Title cannot be empty');
    }

    if (['work', 'home', ''].indexOf(this.address.address_book_title.toLowerCase()) === -1) {
      this.errorList.push('Title can be either home or work');
    }

    if (this.address.contact_name === '') {
      this.errorList.push('Name cannot be empty');
    }

    if (this.address.contact_no === '') {
      this.errorList.push('Phone number cannot be empty');
    }

    if (this.address.contact_no !== '' && isNaN(this.address.contact_no)) {
      this.errorList.push('Phone number should only have numerics');
    }

    if (this.address.address_line_1 === '') {
      this.errorList.push('Address line 1 cannot be empty');
    }

    if (this.address.pincode === '') {
      this.errorList.push('Pincode cannot be empty');
    }
    if (this.address.city === '') {
      this.errorList.push('City cannot be empty');
    }
    if (this.address.state === '') {
      this.errorList.push('State cannot be empty');
    }
    if (this.address.country === '') {
      this.errorList.push('Country cannot be empty');
    }

    if (this.errorList.length > 0) {
      return false;
    }

    return true;
  }

}
