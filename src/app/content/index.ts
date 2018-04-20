export class Hardware {

  public static get RUN_JCL(): string {
    return `
    <p>Log onto TSO on the LPAR that has access to the upload xmit files.
      Further instructions on running the JCL jobs:</p>
    <ol>
      <li>Create a dataset that contains SMF 30.4 records for a period of time sufficient
        to represent the software running at your site. For example, a month's worth of
        30.4 records might be sufficient, but it is important that you select a period
        of time that best represents the software usage at your site. The dataset containing
        the SMF records is used as input to the MRIENVSC job.</li>
      <li>Run the MRIENVSC JCL on an LPAR in each SYSPLEX within your datacenter.</li>
      <li>After each MRIENVSC job completes, download the dataset identified associated
        by the SYSUT3 DD statement. The dataset name will have a low-level qualifier of .MRIUT3</li>
    </ol>`;
  }

}

export class Software {

  public static get RUN_JCL(): string {
    return Hardware.RUN_JCL;
  }

}

export class Healthchecks {

  public static get RUN_JCL(): string {
    return `
    <p>Log onto TSO on the LPAR that has access to the upload xmit files.
      Further instructions on running the JCL jobs:</p>
    <ol>
      <li>Run the MRIIHCSC JCL on each LPAR in each SYSPLEX you want to include within the assessment of your datacenter.</li>
      <li>After each MRIIHCSC job completes, download the JES SPOOL dataset associated with the SYSOUT DD of the HZSPRINT job step.</li>
    </ol>`;
  }

}
