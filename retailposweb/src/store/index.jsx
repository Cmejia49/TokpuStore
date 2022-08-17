import {configureStore} from'@reduxjs/toolkit';
import cartSlice from './cart-slice';
import productSlice from './product-slice';
import categorySlice from './category-slice';
import detailSlice from './detail-slice';
const store = configureStore({
    reducer:{
        cart:cartSlice.reducer,
        product:productSlice.reducer,
        category:categorySlice.reducer,
        detail:detailSlice.reducer
    },
});

export default store;