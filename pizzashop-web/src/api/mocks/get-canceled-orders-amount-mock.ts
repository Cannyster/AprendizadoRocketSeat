import { http, HttpResponse } from "msw";
import { GetMonthCanceledOrdersAmountResponse } from '../get-month-canceld-orders-amount'

export const getMonthCanceledOrdersAmountMock = http.get<
    never,
    never, 
    GetMonthCanceledOrdersAmountResponse> (
        '/metrics/month-canceled-orders-amount', 
        () => {
            return HttpResponse.json({
                amount: 200,
                diffFromLastMonth: 8
            })
        }
)