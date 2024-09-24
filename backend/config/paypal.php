<?php

return [
    'client_id' => env('PAYPAL_CLIENT_ID'), // Your PayPal Client ID
    'secret' => env('PAYPAL_SECRET'),       // Your PayPal Secret
    'mode' => env('PAYPAL_MODE', 'sandbox'), // Can be 'sandbox' or 'live'
];