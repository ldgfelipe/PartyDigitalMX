const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { getFirestore } = require("firebase-admin/firestore");
admin.initializeApp();


    exports.webhook = functions.https.onRequest(async (req, res) => {
          const stripe = require('stripe')(process.env.STRIPE_TEST_SECRET_KEY);
      const sig = req.headers['stripe-signature'];
      const endpointSecret = process.env.ENDPOINT_TEST; // Replace with your actual webhook secret
      let event;

      try {
        event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);
      } catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
      }
var MensajeWebHook="Mensaje recivido a webhook";
      switch (event.type) {
        case 'payment_intent.succeeded':
          const paymentIntent = event.data.object;
          // Handle successful payment
          break;
          case 'checkout.session.completed':
          const paymentComplete= event.data.object;
              //// registra id de pago en cada invitación

             var planselect=paymentComplete.amount_subtotal===29900 ? 'basico' : 'premium'


              /// toma id de plantilla 
              const idInv=paymentComplete.client_reference_id;
            const adddata={
              idpago:paymentComplete.id,
              statuspay:true,
              mount:paymentComplete.amount_subtotal,
              payment_status:paymentComplete.payment_status,
              currency:paymentComplete.currency,
              plan:planselect
            }



              getFirestore().collection('invitaciones').doc(idInv).update(adddata)
            MensajeWebHook="id de pago registrado a invitación: "+idInv

          // handler paymant success
          break;
        // Add more cases for other event types
        default:
          console.log(`Unhandled event type ${event.type}`);
      }

      res.status(200).send(MensajeWebHook);
    });



     exports.webhookProd = functions.https.onRequest(async (req, res) => {
          const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
      const sig = req.headers['stripe-signature'];
      const endpointSecret = process.env.ENDPOINT; // Replace with your actual webhook secret
      let event;

      try {
        event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);
      } catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
      }
var MensajeWebHook="Mensaje recivido a webhook";
      switch (event.type) {
        case 'payment_intent.succeeded':
          const paymentIntent = event.data.object;
          // Handle successful payment
          break;
          case 'checkout.session.completed':
          const paymentComplete= event.data.object;
              //// registra id de pago en cada invitación

             var planselect=paymentComplete.amount_subtotal===29900 ? 'basico' : 'premium'

              /// toma id de plantilla 
              const idInv=paymentComplete.client_reference_id;
            const adddata={
              idpago:paymentComplete.id,
              statuspay:true,
              mount:paymentComplete.amount_subtotal,
              payment_status:paymentComplete.payment_status,
              currency:paymentComplete.currency,
               plan:planselect
            }



              getFirestore().collection('invitaciones').doc(idInv).update(adddata)
            MensajeWebHook="id de pago registrado a invitación: "+idInv

          // handler paymant success
          break;
        // Add more cases for other event types
        default:
          console.log(`Unhandled event type ${event.type}`);
      }

      res.status(200).send(MensajeWebHook);
    });