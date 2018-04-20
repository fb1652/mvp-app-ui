import {Component, EventEmitter, Input, OnInit, ViewChild} from '@angular/core';
import {MatSort,MatTableDataSource} from '@angular/material';
import {SortFilterColumn} from '../../support';
import {SortTableService} from '../../services';

interface Name { Name: string; Value: string; }
interface OsTable { sysplex: string; lpar: string; os: string; jes: string; }
interface Registered { lpar: string; vendor: string; product: string; feature: string; version: string; softwareid: string; }
interface Product { product: string; detected: string; }
interface Software { vendor: string; products: Product[]; count: string; }
interface Subsystems { sysplex: string; lpar: string; vendor: string; subsystem: string; release: string; instance: string; }

@Component({
  selector: 'app-software-view',
  templateUrl: './softwareview.component.html',
  styleUrls: ['./softwareview.component.scss']
})
export class SoftwareViewComponent implements OnInit {

  component = 'app-software-view';
  filterValue: string;
  loading: Boolean = false;
  currentProduct = 0;
  currentVendor = '';
  currentRow = [];
  feature=[];
  tabIndex = 0;
  dataSource=new MatTableDataSource<Name>([]);
  displayedColumns = ['feature'];
  @ViewChild(MatSort) sort: MatSort;
  tableSubscription: EventEmitter<any>;

  osTableColumnsDef: SortFilterColumn[] = [
    {
      id: 'sysplex',
      display: 'Sysplex',
      property: 'sysplex'
    },
    {
      id: 'lpar',
      display: 'LPAR',
      property: 'lpar'
    },
    {
      id: 'os',
      display: 'O/S',
      property: 'os'
    },
    {
      id: 'jes',
      display: 'JES',
      property: 'jes'
    }
  ];

  subsystemstableColumnsDef: SortFilterColumn[] = [
    {
      id: 'sysplex',
      display: 'SYSPLEX',
      property: 'sysplex'
    },
    {
      id: 'lpar',
      display: 'LPAR',
      property: 'lpar'
    },
    {
      id: 'vendor',
      display: 'Vendor',
      property: 'vendor'
    },
    {
      id: 'subsystem',
      display: 'Subsystem',
      property: 'subsystem'
    },
    {
      id: 'release',
      display: 'Release',
      property: 'release'
    },
    {
      id: 'instance',
      display: 'Instance',
      property: 'instance'
    }
  ];

  registeredproductColumnDefs: SortFilterColumn[] = [
    {
      id: 'lpar',
      display: 'LPAR',
      property: 'lpar'
    },
    {
      id: 'vendor',
      display: 'Vendor',
      property: 'vendor'
    },
    {
      id: 'product',
      display: 'Product',
      property: 'product'
    },
    {
      id: 'feature',
      display: 'Feature',
      property: 'feature'
    },
    {
      id: 'version',
      display: 'Version',
      property: 'version'
    },
    {
      id: 'softwareid',
      display: 'Software Id',
      property: 'softwareid'
    }
  ];

  vendorsColumnDefs: SortFilterColumn[] = [
    {
      id: 'vendor',
      display: 'Vendor',
      property: 'vendor'
    },
    {
      id: 'count',
      display: 'Software',
      property: 'count'
    }
  ];

  productsColumnDefs: SortFilterColumn[] = [
    {
      id: 'product',
      display: 'Products',
      property: 'product'
    },
    {
      id: 'detected',
      display: 'Detected',
      property: 'detected'
    }
  ];
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }


  filter(): void {
    let filterValue = this.filterValue.trim(); // remove whitespace
    filterValue = filterValue.toLowerCase(); // normalize to lowercase
    this.dataSource.filter = filterValue;
  }

  clear() {
    this.filterValue = '';
    this.filter();
  }

  columnsToDisplay = ['Name', 'Value'];
  osToDisplay = ['sysplex', 'lpar', 'os', 'jes'];
  subsystemsToDisplay = ['sysplex', 'lpar', 'vendor', 'subsystem', 'release', 'instance'];
  productsToDisplay = ['product', 'detected'];
  registeredToDisplay = ['lpar', 'vendor', 'product', 'feature', 'version', 'softwareid'];
  vendorsToDisplay = ['vendor', 'count'];

  os: MatTableDataSource<Name> = new MatTableDataSource<Name>([]);
  ostable: MatTableDataSource<OsTable> = new MatTableDataSource<OsTable>([]);
  registeredproduct: MatTableDataSource<Registered> = new MatTableDataSource<Registered>([]);
  subsystems: MatTableDataSource<Name> = new MatTableDataSource<Name>([]);
  subsystemstable: MatTableDataSource<Subsystems> = new MatTableDataSource<Subsystems>([]);
  vendors: MatTableDataSource<Software> = new MatTableDataSource<Software>([]);
  products: MatTableDataSource<Product>[] = [];

  @Input() data: any;

  constructor(private sortTableService: SortTableService) {}

  ngOnInit() {
    this.tableSubscription = this.sortTableService.getService()
      .subscribe((data) => {
        if (data.event === 'RESET') {
          return this.tabIndex = 0;
        }
        this.tabIndex = 1;
        this.currentVendor = data.row.vendor;
        this.currentProduct = data.index;
        this.productsColumnDefs = [
          {
            id: 'product',
            display: this.currentVendor + ' Products',
            property: 'product'
          },
          {
            id: 'detected',
            display: 'Detected',
            property: 'detected'
          }
        ];
      });
    this.os = new MatTableDataSource<Name>(this.data.Data.reports.os);
    this.ostable = new MatTableDataSource<OsTable>(this.data.Data.reports.ostable);
    this.registeredproduct = new MatTableDataSource<Registered>(this.data.Data.reports.registeredproduct);
    this.subsystems = new MatTableDataSource<Name>(this.data.Data.reports.subsystems);
    this.subsystemstable = new MatTableDataSource<Subsystems>(this.data.Data.reports.subsystemstable);
    this.vendors.data = this.vendors.data.concat(this.data.Data.reports.software);
    this.products = [];
    this.data.Data.reports.software.forEach((vendor, index) => {
      vendor.count = vendor.products.length;
      this.products.push(new MatTableDataSource<Product>(vendor.products));
    });
  }

  selectedRegisteredProduct(data) {
    this.tabIndex = 2;
    this.currentRow = data.row;
    data.row.feature.forEach((index) => {
      this.feature.push(index);
    });
    this.dataSource = new MatTableDataSource(this.feature);
  }
}
