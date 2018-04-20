import {
  AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild
} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {Data} from '../../models';
import {SortFilterColumn} from '../../support';

interface Name { Name: string; Value: string; }
interface Processor { WLM: string; zAAP: string; zIIP: string; Serial: string; number: string; }
interface Config { sysplex: string; lpar: string; partition: string; processor: string; }
interface Peripheral { class: string; type: string; number: string; }

@Component({
  selector: 'app-hardware-view',
  templateUrl: './hardwareview.component.html',
  styleUrls: ['./hardwareview.component.scss']
})
export class HardwareViewComponent implements OnInit {

  loading: Boolean = false;
  summary: MatTableDataSource<Name> = new MatTableDataSource<Name>([]);
  io: MatTableDataSource<Name> = new MatTableDataSource<Name>([]);
  configuration: MatTableDataSource<Name> = new MatTableDataSource<Name>([]);
  peripherals: MatTableDataSource<Name> = new MatTableDataSource<Name>([]);
  processors: MatTableDataSource<Processor> = new MatTableDataSource<Processor>([]);
  configtable: MatTableDataSource<Config> = new MatTableDataSource<Config>([]);
  peripheraltable: MatTableDataSource<Peripheral> = new MatTableDataSource<Peripheral>([]);

  columnsToDisplay = ['Name', 'Value'];
  otherCpcColumnsToDisplay = ['Description', 'Value'];
  configToDisplay = ['Device', 'Configuration'];
  perfsToDisplay = ['Peripheral', 'Number'];
  procsToDisplay = ['number', 'Serial', 'zIIP', 'zAAP', 'WLM'];
  configtableToDisplay = ['sysplex', 'lpar', 'partition', 'processor'];
  peripheralToDisplay = ['class', 'type', 'number'];

  processorsColumnDefs: SortFilterColumn[] = [
    {
      id: 'number',
      display: 'CPU',
      property: 'number'
    },
    {
      id: 'Serial',
      display: 'Serial',
      property: 'Serial'
    },
    {
      id: 'zIIP',
      display: 'zIIP',
      property: 'zIIP'
    },
    {
      id: 'zAAP',
      display: 'zAAP',
      property: 'zAAP'
    },
    {
      id: 'WLM',
      display: 'WLM',
      property: 'WLM'
    }
  ];

  configurationColumnDefs: SortFilterColumn[] = [
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
      id: 'partition',
      display: 'Partition Number',
      property: 'partition'
    },
    {
      id: 'processor',
      display: 'Physical Processors',
      property: 'processor'
    }
  ];

  peripheraltableColumnDefs: SortFilterColumn[] = [
    {
      id: 'class',
      display: 'Class',
      property: 'class'
    },
    {
      id: 'type',
      display: 'Type',
      property: 'type'
    },
    {
      id: 'number',
      display: 'Number',
      property: 'number'
    }
  ];

  ioColumnDefs: SortFilterColumn[] = [
    {
      id: 'Description',
      display: 'Attribute',
      property: 'Description'
    },
    {
      id: 'Value',
      display: 'Value',
      property: 'Value'
    }
  ];

  @Input() data: any;

  constructor() {}

  ngOnInit() {
    this.summary = new MatTableDataSource<Name>(this.data.Data.reports.summary);
    this.io = new MatTableDataSource<Name>(this.data.Data.reports.io);
    this.configuration = new MatTableDataSource<Name>(this.data.Data.reports.configuration);
    this.peripherals = new MatTableDataSource<Name>(this.data.Data.reports.peripherals);
    this.processors = new MatTableDataSource<Processor>(this.data.Data.reports.processors);
    this.configtable = new MatTableDataSource<Config>(this.data.Data.reports.configtable);
    this.peripheraltable = new MatTableDataSource<Peripheral>(this.data.Data.reports.peripheraltable);
  }

}
