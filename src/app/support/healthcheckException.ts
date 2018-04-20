
export interface HealthcheckException {
  owner: string;
  check: string;
  sysplex: string;
  lpar: string;
  startTime: string;
  endTime: string;
  startDate: string;
  endDate: string;
  severity: string;
  messages: {
    prefix: string[];
    exception: string[];
    explanation: string[];
    systemAction: string[];
    operatorResponse: string[];
    systemProgrammerResponse: string[];
    problemDetermination: string[];
    source: string[];
    referenceDocumentation: string[];
    automation: string[];
    checkReason: string[];
  }[];
}
