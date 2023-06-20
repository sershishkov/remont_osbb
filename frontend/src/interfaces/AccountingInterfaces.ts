// import dayjs from 'dayjs';
import { I_ClientRequest } from './CommonInterfaces';
// import { I_AuthRequest } from './UserInterfaces';

export interface I_Unit extends I_ClientRequest {
  _id?: string;
  unitName?: string;
}

export interface I_ProductGroup extends I_ClientRequest {
  _id?: string;
  productGroupName?: string;
  //Трубы, канализация, сыпучие,металлопрокат,краска...
}

export interface I_ProductType extends I_ClientRequest {
  _id?: string;
  productTypeName?: string;
  //стройматериалы,инвентарь,инструмент, оборудование, средства защиты
}

export interface I_Product extends I_ClientRequest {
  _id?: string;
  productName?: string;

  unit?: string | I_Unit;
  productGroup?: string[] | I_ProductGroup[];
  productType?: string | I_ProductType;
  priceBuyRecommend?: number;
  normPerOne?: number;
  amountInPackage?: number;
  weight?: number;
  height?: number;
  width?: number;
  length?: number;
  paintingArea?: number;
}
