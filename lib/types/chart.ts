type RowContent = (string | string[])[];

interface Row {
  rowTitle: string;
  rowContent: RowContent;
}

interface Chart {
  name: string;
  labels: string[];
  note?: string;
  rows: Row[];
}

export default interface ChartData {
  chartCount: number;
  chart: Chart[];
}
