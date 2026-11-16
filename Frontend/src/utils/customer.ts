const CUSTOMER_ID_KEY = "customerId";
function makeId(){return `guest-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,10)}`;}
export function getCustomerId():string{try{let id=localStorage.getItem(CUSTOMER_ID_KEY);if(!id){id=makeId();localStorage.setItem(CUSTOMER_ID_KEY,id)}return id}catch{return makeId()}}
export function clearCustomerId(){try{localStorage.removeItem(CUSTOMER_ID_KEY)}catch{} }
export function setCustomerId(id:string){try{localStorage.setItem(CUSTOMER_ID_KEY,id)}catch{} }
export function isGuestCustomer(){return getCustomerId().startsWith("guest-")}
