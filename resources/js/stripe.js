import { loadStripe } from '@stripe/stripe-js'
import { placeOrder } from './apiService'
import { CardWidget } from './CardWidget'

export async function initStripe() {
   const stripe = await loadStripe('pk_test_51KQTDXSHM44HrWdvJGw5Mewkm12fIvqOh6BlvnnYipdTpPDwJwVBpSSXP4KwjYZGkK4DN1vfTroPz9YZeLrZSsGk00gMs9p7iS');
   let card = null;
 

   const paymentType = document.querySelector('#paymentType');
   if(!paymentType) {
       return;
   }
   paymentType.addEventListener('change' , (e)=> {

       if(e.target.value === 'card') {
           // Display Widget
          card = new CardWidget(stripe)
          card.mount()
       } else {
           card.destroy()
       }

   })


   // Ajax call
const paymentForm = document.querySelector('#payment-form');
if(paymentForm) {
   paymentForm.addEventListener('submit', async (e) => {
       e.preventDefault();
       let formData = new FormData(paymentForm);
       let formObject = {}
       for(let [key, value] of formData.entries()) {
           formObject[key] = value
       }

       if (!card) {
           // Ajax
           placeOrder(formObject);
           return;
       }

       const token = await card.createToken()
       formObject.stripeToken = token.id;
       placeOrder(formObject);


       // Verify card
       stripe.createToken(card).then((result) => {
           console.log(result);
           formObject.stripeToken = result.token.id;
           placeOrder(formObject);
       }).catch((err) => {
           console.log(err)
       })

   })
}
}