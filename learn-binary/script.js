<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Learn Binary</title>
    <link rel="stylesheet" href="styles.css"> <!-- Optional for custom styling -->
    <style>
        /* Ensure the page is fully responsive */
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            font-family: Arial, sans-serif;
            line-height: 1.5;
            padding: 10px;
        }

        .container {
            max-width: 100%;
            margin: auto;
            padding: 10px;
            width: 100%;
        }

        h2 {
            text-align: center;
            font-size: 1.5em;
            margin-bottom: 20px;
        }

        /* Responsive grid for number container */
        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
            gap: 10px;
            margin-bottom: 20px;
        }

        .number {
            padding: 15px;
            border: 1px solid #ccc;
            text-align: center;
            background-color: #f9f9f9;
            border-radius: 5px;
        }

        /* Feedback styles */
        .feedback {
            font-weight: bold;
            margin-top: 10px;
            text-align: center;
        }

        .correct {
            color: green;
        }

        .wrong {
            color: red;
        }

        /* Input fields */
        input[type="number"], input[type="text"], select {
            width: 100%;
            padding: 10px;
            margin: 5px 0;
            font-size: 1rem;
            border-radius: 5px;
            border: 1px solid #ccc;
        }

        button {
            padding: 10px 20px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 1rem;
        }

        button:hover {
            background-color: #0056b3;
        }

        /* Ensure smaller screen users can interact easily */
        @media (max-width: 768px) {
            h2 {
                font-size: 1.2em;
            }

            .container {
                padding: 5px;
            }

            .grid {
                grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
            }

            .number {
                font-size: 1.2em;
                padding: 10px;
            }

            button {
                width: 100%;
                font-size: 1.2em;
            }

            input[type="number"], input[type="text"], select {
                font...
