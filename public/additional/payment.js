

const stripe = Stripe(key)
const button = document.getElementById('paymentBtn')

button.addEventListener('click', function(e){
    e.preventDefault();
    fetch('/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body : JSON.stringify({
            name: courseName
        })
    })
    .then(response => response.json())
    .then((session) => {

        stripe.redirectToCheckout({sessionId : session.id})
    })
    .catch((error) => {
        console.log(error)
    })
})  