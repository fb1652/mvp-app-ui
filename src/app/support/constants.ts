export class Constants {

  public static get PORT(): number { return 80; }
  public static get TITLE(): string { return 'MRI'; }
  public static get NAME(): string { return 'Mainframe Resource Intelligence'; }
  public static get COPYRIGHT(): string { return 'Copyright 2018 CA Technologies. All Rights Reserved.'; } // ©
  public static get SOCKET_PATH(): string { return '/socket.io'; }
  public static get AUTH_PATH(): string { return '/api/v1/auth'; }
  public static get CONFIG_PATH(): string { return '/api/v1/config'; }
  public static get DATACENTERS_PATH(): string { return '/api/v1/datacenters'; }
  public static get HELP_PATH(): string { return '/api/v1/help'; }
  public static get OFFERINGS_PATH(): string { return '/api/v1/offerings'; }
  public static get REPORTS_PATH(): string { return '/api/v1/reports'; }
  public static get USER_PATH(): string { return '/api/v1/user'; }
  public static get USERS_PATH(): string { return '/api/v1/users'; }

  public static get OVERVIEW_HARDWARE(): string {
    return 'A Hardware MRI gives you a view of your hardware configurations and major peripherals within a CPC. ' +
    'See the total number of processors and how they are allocated across your SYSPLEX/LPARS, ' +
    'along with their serial numbers and type. By providing a detailed view of the hardware in your complex, ' +
    'MRI gives you intelligence you can use to optimize your environment and potentially reduce your cost.';
  }
  public static get OVERVIEW_HC(): string {
    return 'The MRI Health Check enables you to keep your health check data together with your hardware and software data, so it is readily available for analysis.';
  }
  public static get OVERVIEW_SOFTWARE(): string {
    return 'The MRI Software scan provides data about operating systems, subsystems, registered products, and vendor products used in your environment.';
  }
  public static get OVERVIEW_CAPACITY(): string {
    return 'As an Economics MRI offering, a Capacity Optimization Scan can help you optimize and predict capacity ' +
    'usage to help you save against your licensing costs. Through a detailed analysis of usage in your environment, ' +
      'a Capacity Optimization Scan gives CA experts the insight needed to provide tailored recommendations for gaining ' +
      'efficiencies and avoiding wasted CPU utilization, unplanned spikes, and unexpected expenses. A Capacity ' +
      'Optimization Scan can help you plan for unexpected expenses and get maximum benefit from your platform.';
  }
  public static get OVERVIEW_HARDWARE_PROVIDES(): string {
    return '<ul><li>Physical Mainframe – Manufacturer, user-assigned hardware name, family (type of processor), model, ' +
    'physical memory (central storage), MIPs, and MSUs</li>' +
    '<li>Processors – Serial number, type (such as zIIP and zAAP), ' +
    'and WLM</li><li>Configuration – LPARs defined within a SYSPLEX and processor allocation per LPAR</li>' +
    '<li>	Peripherals – Type of peripheral, such as tape, DASD, or CPC, and the number of each</li>' +
    '<li>Other Attributes – Attributes such as HyperPav enablement and GDPS</li ><ul>';
  }
  public static get OVERVIEW_SOFTWARE_FEATURES(): string {
    return '<ul><li>Operating Systems – SYSPLEX, LPARs, operating system version, and JES (job entry subsystem)</li>' +
      '<li>Subsystems – SYSPLEX, LPAR, vendor, subsystem, release, and instance</li>' +
      '<li>Registered Products – LPAR, vendor, product, feature, version, and software ID</li>' +
      '<li>Vendor Software – Vendor and number of licenses</li><ul>';
  }
  public static get OVERVIEW_HC_FEATURES(): string {
    return 'Exception information for each LPAR you assess, categorized by owner, type of check, and severity level (high, medium, and low).';
  }
  public static get OVERVIEW_CAPACITY_FEATURES(): string {
    return '<ul><li>Provides A capping analysis to help you select the right workload candidates for tuning, shifting, and load balancing to save MLC</li>' +
      '<li>A view of all LPAR usage, so you can compare usage costs for each</li>' +
      '<li>A detailed view of peak usage, including real-time rolling four-hour (R4HA), Caps, and MLC</li>' +
      '<li>Scenarios of Advanced Workload License Chart usage compared to Country Multiplex Pricing</li>' +
      '<li>Risk analysis</li></ul>';
  }
  public static get OVERVIEW_HARDWARE_PREREQ(): string {
    return '<p>To use the Hardware MRI, you must perform an MRI Environmental Scan (MRIENVSC) by using the MRIENVSC JOB included with the MRI Toolkit. ' +
      'The MRIENVSC Environmental Scan output is created as a clear text report containing details of your hardware and software. ' +
      'Once created, you will upload the Environmental Scan output into MRI for analysis and subsequent processing. ' +
      ' </p><p>Note, to get details about the software running on the LPARs within a complex, ' +
      'MRIENVSC must have one or more SMF dump datasets containing SMF 30 subtype 4 available for each LPAR within the complex. ' +
      'The more complete the set of scan data you provide, the more complete your hardware view will be.</p>' +
      '<p>Specifically you need to:</p>' +
      '<ol>' +
      '<li>Ensure that the MRI Toolkit is installed on the LPARs where you want to run scans to collect data.\n' +
      'Note: Because the MRIENVSC job within the Toolkit must be run from an APF authorized library, the CA.MRI.LOAD library must be APF authorized.</li>' +
      '<li>Create a dump of the SMF 30 subtype 4 records from each LPAR within each SYSPLEX that runs on the complex for which you are collecting data. ' +
      'Collect 30 days’ worth of SMF data (or the number of days that represents typical software usage in your environment), and repeat the process for each complex.</li>' +
      '<li>Create one or more MRI Environmental scans using the 30 subtype 4 data gathered in step 2 as input to MRIENVSC.</li>' +
      '</ol>';
  }
  public static get OVERVIEW_HC_PREREQ(): string {
    return '<p>If you have not already installed the MRI Toolkit, install it now. See <a href="/Toolkit" routerLink="/Toolkit">Install the CA MRI Toolkit</a>. The toolkit contains the MRIIHCSC JCL, ' +
      'which performs the MRI Health Check scan.</p>' +
      '<p>Run the MRIIHCSC JCL on each LPAR in each SYSPLEX you want to include within the assessment of your datacenter. After each MRIIHCSC job completes, ' +
      'download the JES SPOOL dataset associated with the SYSOUT DD of the HZSPRINT job step.</p>' +
      '<p>Note: The MRIIHCSC health check job must be run by someone authorized to run the HZSPRNT job.' +
      ' MRIIHCSC is a job CA MRI delivers as part of the MRI Toolkit. (It is a member of CA.MRI.CNTL.)</p>';
  }
  public static get OVERVIEW_SOFTWARE_PREREQ(): string {
    return '<p>To use the Software MRI, you must perform an MRI Environmental Scan (MRIENVSC) by using the MRIENVSC JOB included with the MRI Toolkit. ' +
    'The MRIENVSC Environmental Scan output is created as a clear text report containing details of your hardware and software. ' +
    'Once created, you will upload the Environmental Scan output into MRI for analysis and subsequent processing. ' +
    ' </p><p>Note, to get details about the software running on the LPARs within a complex, ' +
    'MRIENVSC must have one or more SMF dump datasets containing SMF 30 subtype 4 available for each LPAR within the complex. ' +
    'The more complete the set of scan data you provide, the more complete your hardware view will be.</p>' +
    '<p>Before you run the MRI Environmental scan (MRIENVSC), take the following steps: </p>' +
    '<ol>' +
    '<li>Ensure that the MRI Toolkit is installed on the LPARs where you want to run scans to collect data.\n' +
    'Note: Because the MRIENVSC job within the Toolkit must be run from an APF authorized library, the CA.MRI.LOAD library must be APF authorized.</li>' +
    '<li>Create a dump of the SMF 30 subtype 4 records from each LPAR within each SYSPLEX that runs on the complex for which you are collecting data. ' +
    'Collect 30 days’ worth of SMF data (or the number of days that represents typical software usage in your environment), and repeat the process for each complex.</li>' +
    '<li>Create one or more MRI Environmental scans using the 30 subtype 4 data gathered in step 2 as input to MRIENVSC.</li>' +
    '</ol>';
  }
  public static get OVERVIEW_CAPACITY_PREREQ(): string {
    return '<p>To use the Capacity Optimization MRI, you must perform an MRI Capacity Scan (MRICAPSC) by using the MRICAPSC JOB ' +
      'included with the MRI Toolkit. The MRI Capacity Scan output is created as a clear text csv file that contains details ' +
      'of your CPU Activity (SMF 70), Workload Activity (SMF 72), and Usage Data (SMF 89). You will upload the output of the ' +
      'Capacity Scan into MRI for analysis and subsequent processing.</p>' +
      '<p>Note: to get details about the CPU, workload, and usage of the software running on the LPARs within a complex, MRICAPSC ' +
      'must have one or more SMF dump datasets containing SMF 70, 72, and 89 records available for each LPAR within the complex. The ' +
      'more complete the set of scan data you provide, the more complete your Capacity view will be.</p>' +
      'Specifically, you need to:' +
      '<ol><li>Ensure that the MRI Toolkit is installed on the LPARs where you want to run scans to collect data.</li>' +
      '<li>Create a dump of the SMF 70, 72 and 89 records from each LPAR within each SYSPLEX that runs on the complex for ' +
      'which you are collecting data. Collect 90 days worth of SMF data, ideally from the same time period as your latest ' +
      'IBM SCRT report, and repeat the process for each complex you want to include in your datacenter.</li>' +
      '<li>Create one or more MRI Capacity Scans using the 70, 72, and 89 SMF records gathered in step 2 as input to MRICAPSC.</li></ol>';
  }
}
