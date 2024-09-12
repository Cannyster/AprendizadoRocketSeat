import { http, HttpResponse } from "msw";
import { GetOrderDetailsParams, GetOrderDetailsResponse } from '../get-order-details'

export const getOrderDetailsMock = http.get<
    GetOrderDetailsParams,
    never, 
    GetOrderDetailsResponse> (
        '/orders/:orderId', 
        ({params}) => {
            return HttpResponse.json({
                id: params.orderId,
                createdAt: new Date().toISOString(), 
                customer: {
                    name: "John Doe",
                    email: "johndoe@example.com",
                    phone: "62986535978"    
                },
                orderItems:[
                    {
                        id:'order--item-1',
                        product: {name: 'Pizza Peperoni'},
                        quantity: 1,
                        priceInCents: 1000
                    },
                    {
                        id:'order--item-2',
                        product: {name: 'Pizza Marqguerita'},
                        quantity: 2,
                        priceInCents: 2000
                    }
                ],
                status:  "pending",
                totalInCents: 5000
                
            })
        }
)