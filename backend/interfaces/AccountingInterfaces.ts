import { Types } from 'mongoose';

export interface I_Unit {
  _id?: string;
  unitName: string;
}

export interface I_firmType {
  _id?: string;
  nameTypeLong: string;
  nameTypeShort: string | null;
}

export interface I_TaxationType {
  _id?: string;
  taxationTypeName: string;
}

export interface I_GroupWork {
  _id?: string;
  groupWorkName: string;
}

export interface I_GroupProduct {
  _id?: string;
  groupProductName: string;
}

export interface I_WorkerRole {
  _id?: string;
  workerRoleName: string;
}

export interface I_ContractType {
  _id?: string;
  contractTypeName: string;
  // ['Общий',
  // 'Сумма',
  // 'Сумма Кошторис',
  // 'Предоплата',
  // 'Частичная предоплата''Частичная предоплата материал',Бюджет, РемсервисКап, РемсервисПоточн,Покупка]
}
export interface I_PaymentSource {
  _id?: string;
  paymentSourceName: string;
  // ['Собственные',
  // 'Бюджет',
  // 'Софинанс',
  // 'Форма2',]
}

export interface I_GroupExpense {
  _id?: string;
  groupExpenseName: string;
}

export interface I_ClientType {
  _id?: string;
  clientTypeName: string;
  //[поставщик, покупатель, наша фирма, налоговая..., услуги]
}

export interface I_ProductType {
  _id?: string;
  productTypeName: string;
}

export interface I_Client {
  _id?: string;
  nameClientLong?: string;
  nameClientShort?: string;
  firmType?: Types.ObjectId;

  postIndex?: string;
  address?: string;
  edrpou?: string;
  inn?: string;
  iban?: string;
  iban_budget?: string;

  passport?: string;
  firstName_imen?: string;
  patronymic_imen?: string;
  lastName_imen?: string;
  firstName_rodit?: string;
  patronymic_rodit?: string;
  lastName_rodit?: string;

  certificateNumber?: string;
  representedBy?: string;
  whichActsOnTheBasis?: string;

  jobTitle?: string;
  jobTitle_rodit?: string;
  tax?: number;
  taxationType?: Types.ObjectId;

  certificate_PDV: string;
  telNumber?: string;
  email?: string;
  clientType?: Types.ObjectId[];
}

export interface I_Contract {
  _id?: string;
  contractNumber: string;
  ourFirm: Types.ObjectId;
  client: Types.ObjectId;
  contractDate: Date;
  contractDescription: string;
  workAddress: string;
  contractType: Types.ObjectId;
  paymentSource: Types.ObjectId;
}

export interface I_Worker {
  _id?: string;
  firstName: string;
  patronymic?: string;
  lastName: string;

  workerRole: Types.ObjectId;
  passportSeries?: string;
  passportNumber?: string;
  representedBy?: string;
  whenIssued?: Date;

  inn?: string;
  birthDay?: Date;

  telNumber?: string;
  email?: string;

  equipmentAndTools?: [
    {
      product: Types.ObjectId;
      amount: number;
      priceBuy_inStore: number;
      rowSum: number;
    }
  ];
}

export interface I_Product {
  _id?: string;
  productName: string;

  unit: Types.ObjectId;
  groupProduct: Types.ObjectId[];
  productType: Types.ObjectId;
  priceBuyRecommend: number;
  normPerOne: number;
  amountInPackage: number;
  weight: number;
  height: number;
  width: number;
  length: number;
  paintingArea: number;
}

export interface I_ServiceWork {
  _id?: string;
  serviceWorkName: string;
  unit: Types.ObjectId;
  groupWork: Types.ObjectId[];
  priceWorkerRecommend: number;
  priceClientRecommend?: number;

  products?: Types.ObjectId[];
  equipmentAndTools?: Types.ObjectId[];
}

export interface I_StoreHouse {
  _id?: string;
  storeHouseName: string;
  address: string;
  products: [
    {
      product: Types.ObjectId;
      amount: number;
      priceBuy_inStore: number;
      rowSum: number;
    }
  ];
}
export interface I_GroupThirdPartyService {
  _id?: string;
  groupThirdPartyServiceName: string;
}

export interface I_ThirdPartyService {
  _id?: string;
  thirdPartyServiceName: string;

  unit: Types.ObjectId;
  groupThirdPartyService: Types.ObjectId[];
  priceBuyRecommend: number;
}
//////////////////////////////////////////////////////////////

export interface I_Expense {
  _id?: string;
  expenseDescription?: string;
  groupExpense?: Types.ObjectId;
  expenseSum?: number;
  expenseDate?: Date;
  responsiblePerson?: Types.ObjectId;
  contract?: Types.ObjectId;
}

export interface I_BankIncome {
  _id?: string;
  contract?: Types.ObjectId;
  paymentSum?: number;
  paymentDate?: Date;
}

export interface I_SalaryPayment {
  _id?: string;
  worker?: Types.ObjectId;
  paymentSum?: number;
  paymentDate?: Date;
  contract?: Types.ObjectId;
}

export interface I_PaymentToSupplier {
  _id?: string;
  contract?: Types.ObjectId;
  paymentSum?: number;
  paymentDate?: Date;
}
////////////////////////////
////////////////////////////
export interface I_DocumentNakladnaya {
  _id?: string;
  nakladnayaNumber: string;
  nakladnayaDate: Date;
  contract: Types.ObjectId;
  products: [
    {
      product: Types.ObjectId;
      amount: number;
      priceSell: number;
      rowSumSell: number;
    }
  ];
  storeHouse: Types.ObjectId;
  active: Boolean;
  creator: Types.ObjectId;
  typeNakl: string;

  deleted: Boolean;
  whoDeleted: Types.ObjectId;
}
export interface I_DocumentAktOfWork {
  _id?: string;
  aktOfWorkNumber: string;
  aktOfWorkDate: Date;
  contract: Types.ObjectId;
  thirdPartyServices: [
    {
      thirdPartyService: Types.ObjectId;
      amount: number;
      priceServiceEntered: number;
      priceServiceSell: number;
      rowSumServiceEntered: number;
      rowSumServiceSell: number;
      enteredContract: Types.ObjectId;
    }
  ];
  serviceWorks: [
    {
      serviceWork: Types.ObjectId;
      amount: number;
      priceWorkWoker: number;
      priceWorkSell: number;
      rowSumWorkWoker: number;
      rowSumWorkSell: number;
      worker: Types.ObjectId;
    }
  ];

  active: Boolean;
  creator: Types.ObjectId;
  typeNakl: string;

  deleted: Boolean;
  whoDeleted: Types.ObjectId;
}
////////////////////////////
////////////////////////////

// export interface I_Report_Deal {
//   _id?: string;
//   contractNumber: Types.ObjectId;
//   totalSum: number;
//   tax: number;
//   additionalExpense: number;
//   productSum: number;
//   workSum: number;
//   responsiblePersonName?: string;
//   responsiblePerson: Types.ObjectId;
//   workerLastName?: string;
//   worker: Types.ObjectId;
//   income?: number;
// }
