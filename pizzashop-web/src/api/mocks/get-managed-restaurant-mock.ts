import { http, HttpResponse } from "msw";
import { GetManagedRestaurantResponse } from '../get-managed-resturant'

export const getManagedRestaurantMock = http.get<
    never,
    never, 
    GetManagedRestaurantResponse> (
        '/managed-restaurant', 
        () => {
            return HttpResponse.json({
                name: "Pizza Shop",
                id: "custom-restaurant-id",
                createdAt: new Date(),
                updatedAt: null,
                description: "Acbdemmnanskeje",
                managerId: "custom-user-id",
            })
        }
)