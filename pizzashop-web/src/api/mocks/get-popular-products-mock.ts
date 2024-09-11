import { http, HttpResponse } from "msw";
import { GetPopularProductsResponse } from '../get-popular-products'

export const getPopularProductsMock = http.get<
    never,
    never, 
    GetPopularProductsResponse> (
        '/metrics/popular-products', 
        () => {
            return HttpResponse.json([
                {amount: 100, product: 'Box'},
                {amount: 200, product: 'Case'},
                {amount: 300, product: 'PC'},
                {amount: 400, product: 'Console'},
                {amount: 500, product: 'Battery'},
            ])
        }
)