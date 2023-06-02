import { User } from "./User";
import { BillingTypes } from "./enum/BillTypes";
import { SpendingTypes } from "./enum/SpendingTypes";

export interface Spending {
    id: number;
    date: string | null;
    price: number;
    type: SpendingTypes;
    billingType: BillingTypes;
    showDetails?: boolean,
    user: User;
    details: SpendingDetail[];

  }
  
  export interface SpendingDetail {
    id?: number | undefined;
    productName: string;
    detailPrice: number;
    description: string;
  }
