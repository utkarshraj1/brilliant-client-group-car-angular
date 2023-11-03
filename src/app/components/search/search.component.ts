import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, fromEvent, map, Subscription } from 'rxjs';
import { ApiMethodsService } from 'src/app/shared/services/apiMethods.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, AfterViewInit, OnDestroy {
  searchResults: string[];
  searchDetailedResults!: any[];
  searchItem: string;
  loading: boolean;
  totalDataLength: number;
  messageToShow: string;

  @ViewChild('searchInput') searchInput!: ElementRef;

  searchSubs!: Subscription;

  constructor(private api: ApiMethodsService, private router: Router) {
    this.searchResults = [];
    this.searchDetailedResults = [];
    this.searchItem = '';
    this.loading = false;
    this.totalDataLength = 0;
    this.messageToShow = '';
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.startSearch();
  }

  startSearch(): void {
    this.searchSubs = fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        map((val: any) => val.target.value),
        debounceTime(500)
      )
      .subscribe(
        (input: any) => {
          this.messageToShow = '';
          this.loading = true;
          if (isNaN(input)) {
            this.loading = false;
            this.messageToShow = 'Sales/Customer Ids must be numbers';
            return;
          } else if (input.trim() !== '') {
            const apiResSubscriber = this.api
              .queryListOfSalesDetails(input, 0)
              .subscribe(
                (res) => {
                  this.searchDetailedResults = [];
                  this.searchResults = [];
                  this.totalDataLength = res.data.totalCount;
                  this.searchDetailedResults = [...res.data.list];
                  this.searchResults = this.searchDetailedResults.map(
                    (item) => {
                      return `${item.sales_id}/${item.customer_id}`;
                    }
                  );
                  this.loading = false;
                },
                (err) => {
                  console.log(err);
                  this.loading = false;
                  this.searchDetailedResults = [];
                  this.searchResults = [];
                }
              );
          }
        },
        (err) => {
          console.log(err);
          this.loading = false;
          this.searchDetailedResults = [];
          this.searchResults = [];
        }
      );
  }

  loadMore(): void {
    this.loading = true;
    const apiResSubscriber = this.api
      .queryListOfSalesDetails(
        parseInt(this.searchItem),
        this.searchResults.length
      )
      .subscribe(
        (res) => {
          this.searchDetailedResults.push(...res.data.list);
          this.searchResults = this.searchResults =
            this.searchDetailedResults.map((item) => {
              return `${item.sales_id}/${item.customer_id}`;
            });
          this.loading = false;
        },
        (err) => {
          console.log(err);
          this.loading = false;
        }
      );
  }

  goToSalesDetails(result: string): void {
    const [sales_id, customer_id] = result.split('/');
    this.router.navigate(['details', sales_id, customer_id]);
  }

  ngOnDestroy(): void {
    if (this.searchSubs !== undefined) {
      this.searchSubs.unsubscribe();
    }
  }
}
