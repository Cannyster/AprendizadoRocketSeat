import { http, HttpResponse } from "msw";
import { GetMonthRevenueResponse } from '../get-month-revenue'

export const getMonthRavenueMock = http.get<
    never,
    never, 
    GetMonthRevenueResponse> (
        '/metrics/month-receipt', 
        () => {
            return HttpResponse.json({
                receipt:  30000,
                diffFromLastMonth: 10
            })
        }
)