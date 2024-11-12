# Binary to Decimal Memory Training - web version
A simple app to generate a random set of binary numbers. It displays the numbers in binary on screen, which can then be hidden, and then recalled using decimal format. There are interactive features such as dynamic binary number generation, life feedback, and counters to track performance.

## Features
- **Binary number generation:** Generates random 3-bit binary numbers, and displays them for you to convert into decimal - 3-bit binary numbers ensures you only ever get an decimal equivalent of 1-7
- **Number of groups:** Enter the number of groups you want to generate, where one group is a 3-bit binary number
- **Input field:** Enter the decimal equivalent of each binary number in the checker field, which will automatically checks your input, and then progresses with a correct answer
- **Real time feedback:** Provides immediate feedback on your answers, which are colour-coded results (green for correct, red for incorrect)
- **Progress tracker:** Keep track of where you are with a blue cursor, which moves as you progress
- **Counters:** Keeps track of the number of correct, and incorrect answers
- **Binary visibility toggle:** You can hide, or show the generated binary numbers during your practice session

## How to use
1. Open the app in your web browser
2. Click **Generate** to begin your practice session
3. For each binary number displayed, typ the corresponding decimal value in the input field
4. The app will automatically check your input, and provide feedback:
   - **Green** text indicates a correct answer
   - **Red** text indicates an incorrect answer
5. The app keeps track of how many correct, and incorrect answers you'e subimtted
6. Once all numbers are completed, the app will display a "Finished! Click "Generate" to start again." message

## Files overview
- **index.html:** The main HTML file containing the strcuture, and layout of the app
- **script.js:** The JavaScript logic for generating binary numbers, checking the answers, and upating the UI

## Development notes
- The app is built using plain HTML, CSS, and JavaScript, ensuring compatibility across modern browsers
- The binary numbers are randomly generatied using JavaScript's Math.random() function
- The generated number grid is responsive in layout
- The app is dsigned to be simple, and easy to use with a focus on functionality

## Desktop version additional notes
- The number of group feild defaults to 104 which lends itself to placing a PO (person-object) image in a memory palace with 26 locations 

## Progeressive Web App (PWA) additional notes
The PWA has been left separate so that we can experiement different development styling for mobile.

### Files overview
- **service-worker.js:** The JavaScript file that runs in the background to manage caching
- **manifest.json:** The JSON file that provides metadata about the app, and allows it to be installed on a user's home screen, like a native mobile app

### Development notes
- The number keyboard is automatically forced for iPhone users
- The input field is checked automatically for iPhone users
- Taking advantage of responsive design, the input field for number of binary numbers to generate defaults to 10
