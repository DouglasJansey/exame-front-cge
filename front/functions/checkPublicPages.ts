import { ROUTES_TYPES } from '../src/Routes/Routes';

export const CheckPublicRouter = (path: string) =>{
    const publicRoute = Object.values(ROUTES_TYPES.public)
    return publicRoute.includes(path);
}