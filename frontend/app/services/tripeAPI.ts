import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:3333", //'https://fut.urlcurt.site', //"http://localhost:3333", //'https://fut.urlcurt.site',
  headers: {
    'Content-Type': 'application/json',
  },
});


/*export async function createCheckout(email: string) {
  const response = await axios.post(`http://localhost:3333/create-checkout-session`, {
    email,
  });
  console.log('E-mail enviado para pagamento:', email);
  return response.data; // { checkoutUrl }
}*/

export async function createCheckout(email: string) {
  const response = await axios.post(`https://fut.urlcurt.site/create-checkout-session`, {
    email,
  });
  console.log('E-mail enviado para pagamento:', email);
  return response.data; // { checkoutUrl }
}

export { api }