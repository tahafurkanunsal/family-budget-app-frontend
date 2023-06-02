import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { SpendingTypes } from 'src/model/enum/SpendingTypes';
import { SpendingService } from 'src/services/spending.service';
import { DatePipe } from '@angular/common';
import { SpendingDetail } from 'src/model/Spending';
import { BillingTypes } from 'src/model/enum/BillTypes';

@Component({
  selector: 'app-add-spendings',
  templateUrl: './add-spendings.component.html',
  styleUrls: ['./add-spendings.component.css'],
})
export class AddSpendingsComponent implements OnInit {
  spendingTypes: string[] = Object.values(SpendingTypes);
  billingTypes: string[] = Object.values(BillingTypes);

  details: SpendingDetail[] = [];

  spendingForm: FormGroup;

  constructor(private spendingService: SpendingService, private router: Router) {
    this.spendingForm = new FormGroup({
      date: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      billingType: new FormControl(''),
      userId: new FormControl('', [Validators.required]),
      productName: new FormControl('', [Validators.required]),
      detailPrice: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.spendingForm.get('type')?.valueChanges.subscribe((value) => {
      const billingTypeControl = this.spendingForm.get('billingType');
      if (value === 'BILLS') {
        billingTypeControl?.setValidators([Validators.required]);
      } else {
        billingTypeControl?.clearValidators();
      }
      billingTypeControl?.updateValueAndValidity();
    });
  }

  addDetail() {
    const detail: SpendingDetail = {
      productName: '',
      detailPrice: 0,
      description: ''
    };
    this.details.push(detail);
  }

  submit() {
    if (this.spendingForm.valid) {
      const data = this.spendingForm.value;
  
      data.details = this.details;

      // Create the SpendingDetail object
      const detail: SpendingDetail = {
        productName: data.productName,
        detailPrice: data.detailPrice,
        description: data.description
      };
  
      // Add the detail to the spending's details array
      data.details = [detail];
  
      const datePipe = new DatePipe('tr-TR');
      data.date = datePipe.transform(data.date, 'yyyy-MMM-dd');
      console.log(data);
  
      this.spendingService.createSpending(data).subscribe((response) => {
        console.log(response);
        this.router.navigate(['/spendings']);
      });
    }
  }
}
