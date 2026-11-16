const API_URL = import.meta.env.VITE_API_URL || "/api";
export type Product={id:number;name:string;price:number;description:string|null;category:string|null;images:string[];badge:string|null;featured:boolean;inStock:boolean};
export type DistributorInquiry={fullName:string;email:string;phone?:string;businessName?:string;city?:string;state?:string;message?:string};
export type ContactMessage={name:string;email:string;subject?:string;message:string};
async function request<T>(path:string,options:RequestInit={}):Promise<T>{const res=await fetch(`${API_URL}${path}`,{headers:{"Content-Type":"application/json",...(options.headers||{})},...options});if(!res.ok)throw new Error(await res.text().catch(()=>`Request failed (${res.status})`));if(res.status===204)return undefined as T;return res.json()}
export const api={getProducts:()=>request<Product[]>("/products"),getProduct:(id:number)=>request<Product>(`/products/${id}`),submitDistributor:(data:DistributorInquiry)=>request<DistributorInquiry>("/distributor",{method:"POST",body:JSON.stringify(data)}),submitContact:(data:ContactMessage)=>request<ContactMessage>("/contact",{method:"POST",body:JSON.stringify(data)})};
