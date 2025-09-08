import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { Utils } from './utils';

export interface MevReportZ extends MevReport {
  report: string;
  year: {
    total: string;
    tax: string;
  };
}
export interface MevReport {
  id: number;
  type: number; // 2-XReport, 1- ZReport
  datetime: string;
  card: {
    type: number;
    factory: string;
    number: string;
    model: string;
    idnx: string;
    name: string;
    address: string;
    subdivision: string;
    point: string;
    key: string;
  };
  daily: {
    tax: string;
    total: string;
    untaxed: string;
    taxes: {
      field: Array<{
        code: string;
        percent: string;
        rate: string;
        cost: string;
      }>;
    };
    receipts: {
      field: Array<{
        type: string;
        count: number;
      }>;
    };
    payments: {
      field: Array<{
        type: string;
        total: string;
      }>;
    };
    totals: {
      in: string;
      out: string;
      balance: string;
    };
  };
}
export interface Shift {
  id: number;
  cardId: number;
  openedOn: string;
  closedOn: string | null;
  counters: {
    daily: {
      tax: number;
      total: number;
      untaxed: number;
      taxes: {
        [key: string]: {
          percent: number;
          rate: number;
          cost: number;
          code: string;
        };
      };
      receipts: {
        [key: string]: number;
      };
      payments: {
        [key: string]: number;
      };
      totals: {
        in: number;
        out: number;
        balance: number;
      };
    };
    years: {
      [key: string]: {
        total: number;
        tax: number;
      };
    };
  };
  card: {
    id: number;
    tenant: string;
    type: number;
    factory: string;
    number: string;
    model: string;
    idnx: string;
    name: string;
    address: string;
    subdivision: string;
    point: string;
    key: string;
  };
}

export interface MevReceipt {
  id: number;
  receipt: string;
  report: string;
  datetime: string;
  card: {
    type: number;
    factory: string;
    number: string;
    model: string;
    idnx: string;
    name: string;
    address: string;
    subdivision: string;
    point: string;
    key: string;
  };
  data: {
    total: string;
    idns: string;
    payments: {
      field: Array<{
        type: string;
        deposit: string;
      }>;
    };
  };
  activities: {
    field: Array<{
      name: string;
      amount: string;
      price: string;
      cost: string;
      tax: {
        code: string;
        percent: string;
        rate: string;
      };
    }>;
    taxes: {
      field: Array<{
        code: string;
        percent: string;
        rate: string;
      }>;
    };
  };
  Verifier: string;
}

export enum ErrorCode {
  UNHANDLED = 'UNHANDLED',
  INVALID_INPUT = 'INVALID_INPUT',
  SECURITY_ISSUE = 'SECURITY_ISSUE',
  CARD_ACTION = 'CARD_ACTION',
  DOCUMENT_ACTION = 'DOCUMENT_ACTION',
  SUBSCRIPTION_INVALID = 'SUBSCRIPTION_INVALID',
  EXCEED_SHIFT_LIMIT = 'EXCEED_SHIFT_LIMIT',
  EXCEED_DELAY_LIMIT = 'EXCEED_DELAY_LIMIT',
  ACPS_DENIAL = 'ACPS_DENIAL',
}

export enum PaymentType {
  Cash = '1',
  Card = '2',
  Vaucher = '3.1',
  Check = '3.2',
  Ticket = '3.3',
  TME = '5',
  Subscription = '6',
  OtherType = '7',
  Credit = '8.1',
  Leasing = '8.2',
  Advance = '8.3',
  Earnest = '8.4',
  Pledge = '8.5',
  Compensation = '8.8',
  OtherMode = '8.9',
}

const allVatLetters = ['A', 'B', 'C', 'D', 'E'];

@Injectable({
  providedIn: 'root',
})
export class MevService {
  private HOST = 'https://mev.melitax.md:6656/api/';
  card: any;
  // private HOST = 'https://provectadevices.com:3100/api/';

  get headers(): HttpHeaders {
    const headers = new HttpHeaders({
      tenant: 'af65f820-dd00-f011-9156-309c239cee31',
      ACPS_TEXT_MAX_WIDTH: '34',
      ACPS_TEXT_PADDING: '.',
    });

    return headers;
  }

  constructor(
    private readonly http: HttpClient // private insight: InsightsService, // private modalCtrl: ModalController, // private vatService: VatService
  ) {}

  // public addFiscalReceipt(
  //   unit: any,
  //   document: Document,
  //   vats: Vat[],
  //   paymentTypes: TenderActionType[]
  // ): Observable<any> {
  //   const apiPath = 'acps/addFiscalReceipt';

  //   try {
  //     CommonHelper.checkReceiptPayoffs(document);
  //   } catch (error) {
  //     this.insight.logError(error);
  //   }

  //   const activities = [];

  //   let taxPercent = undefined;

  //   document.Lots.forEach((item) => {
  //     var taxGroup = 0;

  //     if (!item.DebitVatRate && item.DebitVatRate != 0) {
  //       item.DebitVatRate = item.Article.Vat.Value;
  //       item.CreditVatRate = item.Article.Vat.Value;
  //     }

  //     if (
  //       !item.DebitVatRate &&
  //       item.DebitVatRate != 0 &&
  //       item.Article.ArticleGroups?.length
  //     ) {
  //       const vat = item.Article.ArticleGroups.find(
  //         (x) => x.ArticleSplit?.SplitActionType == SplitActionType.Vat
  //       );

  //       if (vat) {
  //         item.DebitVatRate = +vat.Value;
  //         item.CreditVatRate = +vat.Value;
  //       }
  //     }

  //     if ((item.DebitVatRate || item.DebitVatRate === 0) && vats?.length) {
  //       let discoveredVat: Vat;

  //       if (item.DebitVatRate == 0) {
  //         const zeroVats = vats.filter(
  //           (x) => x.Value === 0 && x.Value == item.DebitVatRate
  //         );
  //         const articleVat = item.Article.Vat
  //           ? zeroVats.find((x) => x.Id === item.Article.Vat.Id) ||
  //             item.Article.Vat
  //           : undefined;

  //         if (zeroVats?.length && articleVat?.Value == 0) {
  //           const noVat = CommonHelper.getSettingValueByKey(
  //             articleVat,
  //             'NoVat'
  //           );

  //           if (noVat == 'true') {
  //             discoveredVat = zeroVats.find((x) => x.Id === articleVat.Id);
  //           }
  //         }
  //       }

  //       if (!discoveredVat) {
  //         discoveredVat = vats.find(
  //           (x) => x.Value >= 0 && x.Value == item.DebitVatRate
  //         );
  //       }

  //       if (discoveredVat) {
  //         taxGroup = vats.findIndex((x) => x.Id === discoveredVat.Id);
  //         taxPercent = discoveredVat.Value;
  //       }
  //     } else {
  //       var founded = vats.find((x) => x.Value >= 0 && x.IsDefault);
  //       if (founded != null) {
  //         taxGroup = vats.findIndex((x) => x.Id === founded.Id);
  //         taxPercent = founded.Value;
  //       }
  //     }

  //     activities.push({
  //       name: item.Article.Name,
  //       amount: +item.Quantity,
  //       price: +item.DebitPrice,
  //       tax: {
  //         code: allVatLetters[taxGroup] ?? 'E',
  //         percent: taxPercent,
  //       },
  //     });
  //   });

  //   const payments = [];
  //   let totalAmount = 0;

  //   if (paymentTypes?.length > 0 && document.Payoffs?.length > 0) {
  //     document.Payoffs.filter((x) => x.Value).forEach((payoff) => {
  //       const founded = paymentTypes.find(
  //         (x) => x === payoff.Tender.TenderActionType
  //       );
  //       let index: number;

  //       if (founded !== TenderActionType.Undefined) {
  //         index = paymentTypes.indexOf(founded);
  //       }

  //       const type = Object.values(PaymentType)[index];

  //       const foundedPayment = payments.find((x) => x.type === type);

  //       if (foundedPayment) {
  //         foundedPayment.deposit += payoff.Value - payoff.Change;
  //       } else {
  //         payments.push({
  //           type,
  //           deposit: payoff.Value,
  //         });
  //       }

  //       totalAmount += payoff.Value;
  //     });
  //   }

  //   const requestBody = {
  //     card: this.getMevCard(unit),
  //     code: document.Number,
  //     data: {
  //       payments,
  //     },
  //     activities: activities,
  //     device: {
  //       instanceId: CommonHelper.getInstanceId(),
  //     },
  //   };

  //   return this.http
  //     .post(`${this.HOST}${apiPath}`, requestBody, true, this.headers)
  //     .pipe(
  //       tap((x: any) => {
  //         this.modalCtrl
  //           .create({
  //             component: MevReceiptInfoComponent,
  //             componentProps: {
  //               mevReceipt: {
  //                 ...x.request.json,
  //                 Verifier: x.response.verifier,
  //               } as MevReceipt,
  //               receipt: x.response.text,
  //             },
  //             backdropDismiss: false,
  //             cssClass: 'mev-receipt',
  //           })
  //           .then((modal) => {
  //             modal.present();
  //           });
  //       })
  //       // catchError(err => {
  //       //   throw new Error(err.error.message || err.message);
  //       // })
  //     );
  // }

  // public addServiceReceipt(unit: any, amount: number): Observable<any> {
  //   const apiPath = 'acps/addServiceReceipt';

  //   const requestBody = {
  //     card: this.getMevCard(unit),
  //     code: CommonHelper.generateGuid(),
  //     data: {
  //       type: amount > 0 ? 1 : 2,
  //       name: 'MDL',
  //       total: Math.abs(amount),
  //     },
  //     device: {
  //       instanceId: CommonHelper.getInstanceId(),
  //     },
  //   };

  //   return this.http.post(
  //     `${this.HOST}${apiPath}`,
  //     requestBody,
  //     true,
  //     this.headers
  //   );
  // }

  public addReport(withClosure = false): Observable<any> {
    const apiPath = 'acps/addReport';

    const requestBody = {
      card: this.card,
      code: Utils.generateGuid(),
      type: withClosure ? 1 : 2,
      device: {
        instanceId: Utils.getInstanceId(),
      },
    };

    return this.http.post(`${this.HOST}${apiPath}`, requestBody, {
      headers: this.headers,
    });
    // const deviceVats = CommonHelper.getSettingValueByKey(unit, 'Vats', true);

    // return this.vatService.search(undefined, false).pipe(
    //   map((vats) => {
    //     if (vats && vats.length) {
    //       const latestVats = [...vats];

    //       for (const vat of latestVats) {
    //         const index = vats.findIndex((x) => x.Id === vat.Id);
    //         if (index >= 0) {
    //           deviceVats[index] = vat;
    //         } else {
    //           deviceVats.push(vat);
    //         }
    //       }
    //     }

    //     CommonHelper.setSettingsValue(unit, {
    //       Key: 'Vats',
    //       Value: JSON.stringify(deviceVats),
    //     });

    //     const taxes = deviceVats.map((x, index) => {
    //       const noVat = CommonHelper.getSettingValueByKey(x, 'NoVat');

    //       return {
    //         code: allVatLetters[index] ?? 'E',
    //         percent: noVat == 'true' ? undefined : x.Value,
    //       };
    //     });

    //     const requestBody = {
    //       card: this.getMevCard(unit),
    //       code: CommonHelper.generateGuid(),
    //       type: withClosure ? 1 : 2,
    //       device: {
    //         instanceId: CommonHelper.getInstanceId(),
    //       },
    //       taxes,
    //     };

    //     return requestBody;
    //   }),
    //   switchMap((requestBody) => {
    //     return this.http.post(
    //       `${this.HOST}${apiPath}`,
    //       requestBody,
    //       true,
    //       this.headers
    //     );
    //   })
    // );
  }

  // public getReceiptsByPeriod(
  //   unit: any,
  //   from: string,
  //   to: string
  // ): Observable<any> {
  //   const apiPath = 'shared/text';
  //   const mevCard = this.getMevCard(unit);

  //   const queryParams = new URLSearchParams();
  //   queryParams.append('issuedOnFrom', from);
  //   queryParams.append('issuedOnTo', to);
  //   queryParams.append('cardId', mevCard.id);

  //   return this.http.get(
  //     `${this.HOST}${apiPath}?${queryParams.toString()}`,
  //     true,
  //     this.headers,
  //     'blob' as 'blob'
  //   );
  // }

  // public createCard(entity: any & { endpoint: string }): Observable<any> {
  //   const apiPath = 'cards';

  //   return this.http.post(`${this.HOST}${apiPath}`, entity, true, this.headers);
  // }

  public findCards(): Observable<any> {
    const apiPath = 'cards';

    return this.http
      .get(`${this.HOST}${apiPath}`, {
        headers: this.headers,
      })
      .pipe(
        tap((x) => {
          if (x && Array.isArray(x) && x.length) {
            this.card = x[0];
          }
        })
      );
  }

  // public updateCard(entity: any & { endpoint: string }): Observable<any> {
  //   const apiPath = 'cards';

  //   return this.http.put(`${this.HOST}${apiPath}`, entity, true, this.headers);
  // }

  private getMevCard(unit: any): any {
    const result = {} as any; //CommonHelper.getSettingValueByKey(unit, 'MevCard', true);

    if (result?.endpoint?.length) {
      this.HOST = `${result.endpoint}/api/`; // Update the HOST with the endpoint from the unit settings

      delete result.endpoint; // Remove endpoint if exists, as it is not needed in the request
    }
    return result;
  }
}
