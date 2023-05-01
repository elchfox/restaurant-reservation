import { TimeFormat } from "../components/Times";

export interface IReservation {
  id?:string,
  reservedBy:string,
  time:TimeFormat,
  date: Date,
  diners: number
  }
  export interface ITable {
    id: string;
    tableSize: number;
    
  }
  

  export interface ITime {
    startTime: string;
    endTime: string;
    available?:boolean
  }

  export interface ITimeSlot extends ITime {
    id: string;

    tableSize: number;
    reservedBy?:string | null
  }
  
  export interface IApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
  }

  export interface IBase {
    _id: string;
    createdAt: Date;
    updatedAt: Date;
  }
  export interface IInfo extends IBase {
    details: {
      dinners: number[];
      openingHours: IOpeningHours;
    };
    reservations: IReservationsInfo;
    tables: any[];
  }
  export interface IOpeningHours {
    [key: string]: {
      close: string;
      open: string;
    };
  }
  export interface IReservationsInfo {
    [key: string]: {
      date: Date;
      tableSize: number;
    }[];
  }
  export interface IReservation {
    reservedBy: string;
    time: TimeFormat;
    date: Date;
    diners: number;
  }
  