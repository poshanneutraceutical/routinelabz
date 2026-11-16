import React, { createContext, useContext, useEffect, useState } from "react";
import { getCustomerId } from "../utils/customer";
import cartService from "../services/cartService";
import type { Cart } from "../services/cartService";

interface CartContextType { cart: Cart | null; loading:boolean; addToCart:(productId:number,quantity?:number)=>Promise<void>; removeItem:(productId:number)=>Promise<void>; updateQuantity:(productId:number,quantity:number)=>Promise<void>; refreshCart:()=>Promise<void>; cartCount:number; clearCart:()=>Promise<void>; }
const CartContext=createContext<CartContextType|undefined>(undefined);
export function CartProvider({children}:{children:React.ReactNode}) {
  const [cart,setCart]=useState<Cart|null>(null); const [loading,setLoading]=useState(false); const customerId=getCustomerId();
  const refreshCart=async()=>{try{setLoading(true);setCart(await cartService.getCart(customerId));}catch{setCart(null)}finally{setLoading(false)}};
  useEffect(()=>{refreshCart()},[]);
  const addToCart=async(productId:number,quantity=1)=>{setLoading(true);try{setCart(await cartService.addToCart({customerId,productId,quantity}))}finally{setLoading(false)}};
  const removeItem=async(productId:number)=>{setLoading(true);try{setCart(await cartService.removeItem(customerId,productId))}finally{setLoading(false)}};
  const updateQuantity=async(productId:number,quantity:number)=>{if(quantity<=0)return removeItem(productId);setLoading(true);try{setCart(await cartService.updateQuantity(customerId,productId,quantity))}finally{setLoading(false)}};
  const clearCart=async()=>{setLoading(true);try{await cartService.clearCart(customerId);setCart(null)}finally{setLoading(false)}};
  const cartCount=cart?.items?.reduce((sum,item)=>sum+item.quantity,0)||0;
  return <CartContext.Provider value={{cart,loading,addToCart,removeItem,updateQuantity,refreshCart,cartCount,clearCart}}>{children}</CartContext.Provider>;
}
export function useCart(){const ctx=useContext(CartContext);if(!ctx)throw new Error("useCart must be used inside CartProvider");return ctx;}
