import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiMethodsService } from 'src/app/shared/services/apiMethods.service';

@Component({
  selector: 'app-add-details',
  templateUrl: './add-details.component.html',
  styleUrls: ['./add-details.component.scss'],
})
export class AddDetailsComponent implements OnInit {
  salesDetailsInitialForm!: any;

  constructor(private api: ApiMethodsService, private router: Router) {}

  ngOnInit(): void {
    this.salesDetailsInitialForm = {
      sales_id: null,
      date_of_purchase: null,
      customer_id: null,
      fuel: null,
      premium: null,
      vehicle_segment: null,
      selling_price: null,
      power_steering: null,
      airbags: null,
      sunroof: null,
      matt_finish: null,
      music_system: null,
      customer_gender: null,
      customer_income_group: null,
      customer_region: null,
      customer_marital_status: null,
    };
  }

  getAndSubmitFormData(event: any): void {
    console.log(event);
    this.api
      .addSalesDetails({
        ...event,
      })
      .subscribe(
        (res) => {
          console.log('Success!!!');
          this.router.navigate(['/']);
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
