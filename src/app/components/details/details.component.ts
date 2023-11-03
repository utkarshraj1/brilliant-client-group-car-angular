import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiMethodsService } from 'src/app/shared/services/apiMethods.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  salesId!: number;
  customerId!: number;
  salesDetails: any;
  isEditMode: boolean;
  loading: boolean;

  constructor(
    private api: ApiMethodsService,
    private activatedRoute: ActivatedRoute
  ) {
    this.isEditMode = false;
    this.loading = true;
  }

  ngOnInit(): void {
    this.salesId = parseInt(
      this.activatedRoute.snapshot.paramMap.get('sales_id') || ''
    );
    this.customerId = parseInt(
      this.activatedRoute.snapshot.paramMap.get('customer_id') || ''
    );
    this.getSalesDetails();
  }

  getSalesDetails(): void {
    this.api.getSalesDetails(this.salesId, this.customerId).subscribe(
      (res) => {
        this.salesDetails = res.data[0];
        this.loading = false;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getUpdatedSalesDetails(event: any): void {
    this.api.updateSalesDetails(event, this.salesId).subscribe(
      (res) => {
        console.log('Done!');
        this.loading = true;
        this.getSalesDetails();
        this.isEditMode = false;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
