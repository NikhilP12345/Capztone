var stripeHandler =  StripeCheckout.configure({
    key: stripePublicKey,
    local: 'en',
    token: function(token) {

    }
})

function purchaseClicked(){
     stripeHandler.open({
         amount: Payment  
     })
}