<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Login</title>
    <link href="https://fonts.googleapis.com/css?family=Inter&display=swap" rel="stylesheet">

    <style>
        :root {
            --font-family-inter: 'Inter', sans-serif;
        }

        /* CSS Reset */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        .text-4 {
            font-size: 16px;
            font-family: var(--font-family-inter);
            font-weight: normal;
            text-align: left;
            color: rgba(30, 30, 30, 1);
        }

        .text-6 {
            font-size: 16px;
            font-family: var(--font-family-inter);
            font-weight: normal;
            text-align: left;
            color: rgba(179, 179, 179, 1);
        }

        .input-5 {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;
            padding: 12px 16px;
            flex-grow: 0;
            flex-shrink: 1;
            flex-basis: 272px;
            width: 272px;
            min-width: 240px;
            background-color: rgba(255, 255, 255, 1);
            border: 1px solid rgba(217, 217, 217, 1);
            border-radius: 8px;
        }

        .input-field-3 {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;
            gap: 8px;
            flex-grow: 0;
            flex-shrink: 1;
            flex-basis: auto;
            height: 70px;
        }

        .text-8 {
            font-size: 16px;
            font-family: var(--font-family-inter);
            font-weight: normal;
            text-align: left;
            color: rgba(30, 30, 30, 1);
        }

        .text-10 {
            font-size: 16px;
            font-family: var(--font-family-inter);
            font-weight: normal;
            text-align: left;
            color: rgba(179, 179, 179, 1);
        }

        .input-9 {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;
            padding: 12px 16px;
            flex-grow: 0;
            flex-shrink: 1;
            flex-basis: 272px;
            width: 272px;
            min-width: 240px;
            background-color: rgba(255, 255, 255, 1);
            border: 1px solid rgba(217, 217, 217, 1);
            border-radius: 8px;
        }

        .input-field-7 {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;
            gap: 8px;
            flex-grow: 0;
            flex-shrink: 1;
            flex-basis: auto;
            height: 70px;
        }

        .text-13 {
            font-size: 16px;
            font-family: var(--font-family-inter);
            font-weight: normal;
            text-align: left;
            color: rgba(245, 245, 245, 1);
        }

        .button-12 {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            gap: 8px;
            padding: 12px 12px;
            flex-grow: 1;
            flex-shrink: 1;
            flex-basis: 272px;
            width: 272px;
            background-color: rgba(44, 44, 44, 1);
            border: 1px solid rgba(44, 44, 44, 1);
            border-radius: 8px;
        }

        .button-group-11 {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;
            gap: 16px;
            flex-grow: 0;
            flex-shrink: 1;
            flex-basis: 272px;
            width: 272px;
        }

        .text-15 {
            font-size: 16px;
            font-family: var(--font-family-inter);
            font-weight: normal;
            text-align: left;
            color: rgba(30, 30, 30, 1);
        }

        .text-link-14 {
            display: flex;
            flex-direction: row;
            align-items: flex-start;
            justify-content: flex-start;
            flex-grow: 0;
            flex-shrink: 1;
            flex-basis: 272px;
            width: 272px;
        }

        .form-log-in-2 {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;
            gap: 24px;
            padding: 24px;
            flex-grow: 0;
            flex-shrink: 1;
            flex-basis: auto;
            min-width: 320px;
            background-color: rgba(255, 255, 255, 1);
            border: 1px solid rgba(217, 217, 217, 1);
            border-radius: 8px;
        }

        .-1 {
            position: absolute;
            left: -160px;
            top: -186px;
            width: 320px;
            height: 322px;
            position: relative;
            width: 100%;
            height: auto;
        }
    </style>
</head>
<body>
<div class="-1">
    <div class="form-log-in-2">
        <div class="input-field-3">
            <p class="text-4">Email</p>
            <div class="input-5">
                <p class="text-6">Value</p>
            </div>
        </div>
        <div class="input-field-7">
            <p class="text-8">Password</p>
            <div class="input-9">
                <p class="text-10">Value</p>
            </div>
        </div>
        <div class="button-group-11">
            <div class="button-12">
                <p class="text-13">Sign In</p>
            </div>
        </div>
        <div class="text-link-14">
            <p class="text-15">Forgot password?</p>
        </div>
    </div>
</div>

</body>
</html>
