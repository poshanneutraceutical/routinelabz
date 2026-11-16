const API_URL = import.meta.env.VITE_API_URL || "/api";
export interface CheckoutRequest { customerId:string; customerName:string; email:string; phone:string; address:string; city:string; state:string; pincode:string; }
export interface OrderItem { productId:number; productName:string; imageUrl:string; price:number; quantity:number; subtotal:number; }
export interface Order { id:number; customerName:string; email:string; phone:string; address:string; city:string; state:string; pincode:string; totalAmount:number; paymentStatus:string; orderStatus:string; orderDate:string; items:OrderItem[]; }
async function request<T>(path:string,options:RequestInit={}):Promise<T>{const res=await fetch(`${API_URL}${path}`,{headers:{"Content-Type":"application/json",...(options.headers||{})},...options});if(!res.ok)throw new Error(await res.text().catch(()=>`Request failed ${res.status}`));return res.json()}
const orderService={checkout:(requestData:CheckoutRequest)=>request<Order>("/orders/checkout",{method:"POST",body:JSON.stringify(requestData)}),getOrder:(id:number)=>request<Order>(`/orders/${id}`),getCustomerOrders:(id:string)=>request<Order[]>(`/orders/customer/${encodeURIComponent(id)}`)};
export { orderService }; export default orderService;
