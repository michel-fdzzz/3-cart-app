import { createReducer, on } from "@ngrx/store"
import { load } from "./products.actions"

//Creamos este array para ponerlo en el initialState para que no casque ay que sino da error
const products: any = [];
const initialState = {
    products
}

export const ProductsReducer = createReducer(
    initialState,
    //Del payload pasamos los productos por eso ponemos { products }
    on(load, (state, { products }) => ({ products: { ...products } })),

)