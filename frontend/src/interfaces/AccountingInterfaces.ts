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
  description?: string;
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

//////////////////////////////////////////
export interface I_ServiceWorkGroup extends I_ClientRequest {
  _id?: string;
  serviceWorkGroupName?: string; //Асфальт,Цоколь,ОкнаПласт, ДвериПласт, ГибкаОц,Швы межпанельные ...
}

export interface I_ThirdPartyServiceGroup extends I_ClientRequest {
  _id?: string;
  thirdPartyServiceGroupName?: string; //смета, доставка,обслуживание оборудования, грузоподъемные, информационные,ремонт,вывоз мусора
}

export interface I_ServiceWork extends I_ClientRequest {
  _id?: string;
  serviceWorkName?: string;
  description?: string;
  unit?: string | I_Unit;
  serviceWorkGroup?: string[] | I_ServiceWorkGroup[];
  priceWorkerRecommend?: number;
  priceClientRecommend?: number;

  products?: string[] | I_Product[]; //цемент, краска, пенопласт...

  inventars?: string[] | I_Product[]; //шпатель, ведро, венчик, кисточка...
  tools?: string[] | I_Product[]; //дрель, переноска, перфоратор...
  equipment?: string[] | I_Product[]; //лестница, бетономешалка, компрессор...
  workerProtection?: string[] | I_Product[]; //перчатки, очки, маска, рабочая одежда...
}

export interface I_ThirdPartyService extends I_ClientRequest {
  _id?: string;
  thirdPartyServiceName?: string;
  description?: string;
  unit?: string | I_Unit;
  thirdPartyServiceGroup?: string[] | I_ThirdPartyServiceGroup[];
  priceBuyRecommend?: number;
}

//////////////////////////////////////////
