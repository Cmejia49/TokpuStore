import {configureStore, getDefaultMiddleware} from'@reduxjs/toolkit';

import authSlice from './auth-slice';
import categorySlice from './category-slice';
import productSlice from './product-slice';
import storeSlice from './store-slice';
import formSlice from './form-slice';
import dashboardSlice from './dashboard-slice';

const store = configureStore({
    reducer:{
        auth:authSlice.reducer,
        product:productSlice.reducer,
        category:categorySlice.reducer,
        store:storeSlice.reducer,
        form:formSlice.reducer,
        dashboard:dashboardSlice.reducer
    },
    middleware: getDefaultMiddleware({
        serializableCheck: false,
      }),
})

export default store;