export interface CRMSummary {
  title: string;
  value: number;
  textValue: number;
  color: string;
  percentValue: number;
  isIncrease: boolean;
  isCurrency: boolean;
  icon: string;
  status?: object;
}

export interface CRMDataReview {
  title: string;
  value: number;
  color: string;
  icon: string;
}
