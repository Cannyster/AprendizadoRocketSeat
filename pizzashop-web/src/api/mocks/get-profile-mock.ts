import { http, HttpResponse } from "msw";
import { GetProfileResponse } from '../get-profile'

export const getProfileMock = http.get<
    never,
    never, 
    GetProfileResponse> (
        '/me', 
        () => {
            return HttpResponse.json({
                name: 'John Doe',
                id: 'custom-user-id',
                email: 'johndoe@example.com',
                phone: '8565898549',
                role: 'manager',
                createdAt: new Date(),
                updatedAt: null,
            })
        }
)