export const ROUTES_TYPES = {
    private:{
        profile:{
            name: '/account/profile',
        },
        products:{
            store: '/products/store',
            update: '/products/update/[id]'
        }
    },
    public:{
        login: '/account/login',
        register: '/account/register',
        home: '/',
    }
}