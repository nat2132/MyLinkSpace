<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification Code</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 5px;
        }
        h1 {
            color: #2c3e50;
        }
        .code {
            font-size: 24px;
            font-weight: bold;
            color: #3498db;
            padding: 10px;
            background-color: #ecf0f1;
            border-radius: 5px;
            display: inline-block;
        }
        .expiry {
            font-style: italic;
            color: #7f8c8d;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Email Verification Code</h1>
        <p>Hello,</p>
        <p>Your email verification code is:</p>
        <p class="code">{{ $code }}</p>
        <p>Please enter this code to verify your email address.</p>
        <p class="expiry">This code will expire in 15 minutes.</p>
        <p>If you didn't request this code, please ignore this email.</p>
        <p>Thank you,<br>{{ config('app.name') }} Team</p>
    </div>
</body>
</html>
