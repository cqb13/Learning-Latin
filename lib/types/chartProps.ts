type rowContent = (string | string[])[];

interface row {
  rowTitle: string;
  rowContent: rowContent;
}

interface chart {
  name: string;
  labels: string[];
  link?: string;
  returnLink?: string;
  note?: string;
  rows: row[];
}

export default interface chartProps {
  chartCount: number;
  name: string;
  chart: chart[];
}
