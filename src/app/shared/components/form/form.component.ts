import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  fuelList: Array<string>;
  vehicleSegment: Array<string>;
  genders: Array<string>;
  incomeGroupList: string[];
  customerRegions: string[];
  salesDetailsForm!: FormGroup;

  @Input() formInitialData: any;
  @Input() formType!: string;

  @Output() formFinalData: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
    this.fuelList = ['CNG', 'Petrol', 'Diesel'];
    this.vehicleSegment = ['A', 'B', 'C'];
    this.genders = ['Male', 'Female'];
    this.incomeGroupList = ['0-$25K', '$25-$70K', '>$70K'];
    this.customerRegions = ['North', 'South', 'East', 'West'];
  }

  ngOnInit(): void {
    const formInitData = this.formInitialData;
    this.salesDetailsForm = new FormGroup({
      sales_id: new FormControl(formInitData.sales_id, [
        Validators.required,
        Validators.pattern('[0-9]+'),
      ]),
      date_of_purchase: new FormControl(null, [Validators.required]),
      customer_id: new FormControl(formInitData.customer_id, [
        Validators.required,
        Validators.pattern('[0-9]+'),
      ]),
      fuel: new FormControl(formInitData.fuel, [Validators.required]),
      premium: new FormControl(formInitData.premium, [
        Validators.required,
        Validators.pattern('[0-9]+'),
        Validators.max(1000000),
      ]),
      vehicle_segment: new FormControl(formInitData.vehicle_segment, [
        Validators.required,
      ]),
      selling_price: new FormControl(formInitData.selling_price, [
        Validators.required,
        Validators.pattern('[0-9]+'),
        Validators.max(1000000),
      ]),
      power_steering: new FormControl(formInitData.power_steering, [
        Validators.required,
      ]),
      airbags: new FormControl(formInitData.airbags, [Validators.required]),
      sunroof: new FormControl(formInitData.sunroof, [Validators.required]),
      matt_finish: new FormControl(formInitData.matt_finish, [
        Validators.required,
      ]),
      music_system: new FormControl(formInitData.music_system, [
        Validators.required,
      ]),
      customer_gender: new FormControl(formInitData.customer_gender, [
        Validators.required,
      ]),
      customer_income_group: new FormControl(
        formInitData.customer_income_group,
        [Validators.required]
      ),
      customer_region: new FormControl(formInitData.customer_region, [
        Validators.required,
      ]),
      customer_marital_status: new FormControl(
        formInitData.customer_marital_status,
        [Validators.required]
      ),
    });
    if (this.formType === 'edit') {
      this.salesDetailsForm.get('date_of_purchase')?.disable();
    }
  }

  submitFormHandler(event: any): any {
    this.formFinalData.emit({
      ...this.salesDetailsForm.value,
    });
  }
}
