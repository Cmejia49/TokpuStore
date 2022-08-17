import { configureStore , getDefaultMiddleware} from '@reduxjs/toolkit';    

import authSlice from './auth-slice';
import productSlice from './product-slice';
import categorySlice from './category-slice';
import detailSlice from './detail-slice';
import cartSlice from './cart-slice';
import saleSlice from './sale-slice';
import damageSlice from './damage-slice';
import expensesSlice from './expenses-slice';

const store = configureStore({
    reducer:{
        auth:authSlice,
        product:productSlice,
        category:categorySlice,
        detail:detailSlice,
        cart:cartSlice,
        sale:saleSlice,
        damage:damageSlice,
        expenses:expensesSlice

    },    
    middleware: getDefaultMiddleware({
        serializableCheck: false,
      }),
})


export default store;