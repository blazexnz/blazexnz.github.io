const paoData = {
    "00": { person: "Ozzy Osbourne", action: "Biting head off dove", object: "Dove", card: "" },
    "01": { person: "Tiger Woods", action: "Swinging a golf club", object: "Golf club", card: "" },
    "02": { person: "OB-Wan Kenobi", action: "Fighting with light saber", object: "Lightsaber", card: "" },
    "03": { person: "Ryan (The OC)", action: "Driving into mansion", object: "Mansion", card: "" },
    "04": { person: "Oliver Driver", action: "Wheeling hospital bed", object: "Hospital bed", card: "" },
    "05": { person: "Omar Epps", action: "Arguing with house in a white coat", object: "White coat", card: "" },
    "06": { person: "Steve Jobs (iOS)", action: "Presenting iPhone", object: "iPhone", card: "" },
    "07": { person: "James Bond (007)", action: "Cock a pistol", object: "Pistol", card: "" },
    "08": { person: "Oliver Hardy", action: "Posing for a jail photo", object: "Jail number", card: "" },
    "09": { person: "Olivia Newton-John", action: "Electrifying grease", object: "Grease", card: "" },
    "10": { person: "Ashley Olsen", action: "Pulling faces with fingers", object: "Fingers", card: "10 ♠" },
    "11": { person: "Andre Agassi", action: "Acing a tennis serve", object: "Tennis racquet", card: "Ace ♠" },
    "12": { person: "Aaron Blaise", action: "Flicking animation paper", object: "Animation paper", card: "2 ♠" },
    "13": { person: "Al Capone", action: "Buttoning up gangster suit", object: "Gangster suit", card: "3 ♠" },
    "14": { person: "Albus Dumbledore", action: "Pointing to his head with a wand", object: "Wand", card: "4 ♠" },
    "15": { person: "Albert Einstein", action: "Chalking blackboard", object: "Blackboard", card: "5 ♠" },
    "16": { person: "Arnold Schwarzenegger", action: "Lifting dumb bell", object: "Dumb bell", card: "6 ♠" },
    "17": { person: "Ariana Grande", action: "Ordering Grande Starbucks", object: "Starbucks cup", card: "7 ♠" },
    "18": { person: "Adolf Hitler", action: "Saluting Nazis", object: "Nazis", card: "8 ♠" },
    "19": { person: "Alfred Nobel", action: "Accepting Nobel Prize", object: "Nobel Prize", card: "9 ♠" },
    "20": { person: "Barrack Obama", action: "Signing declaration with fountain pen", object: "Fountain pen", card: "10 ♥" },
    "21": { person: "Ben Affleck", action: "Throwing batarangs", object: "Batarangs", card: "Ace ♥" },
    "22": { person: "B.B. King", action: "Playing the blues with hollow guitar", object: "Hollow body guitar", card: "2 ♥" },
    "23": { person: "Benedict Cumberbatch", action: "Opening a portal with slingers ring", object: "Slingers ring", card: "3 ♥" },
    "24": { person: "Bob Dylan", action: "Blowing in harmonica", object: "Harmonica", card: "4 ♥" },
    "25": { person: "Barbara Eden", action: "Laying on magic carpet", object: "Magic carpet", card: "5 ♥" },
    "26": { person: "Bart Simpson", action: "Eating shorts", object: "Shorts", card: "6 ♥" },
    "27": { person: "Bill Gates", action: "Reading a book", object: "Book", card: "7 ♥" },
    "28": { person: "Ben Hurr", action: "Galloping a horse chariot", object: "Horse chariot", card: "8 ♥" },
    "29": { person: "Bill Nye", action: "Experimenting science in test tube", object: "Test tube", card: "9 ♥" },
    "30": { person: "Conan O’Brien", action: "Laughing into mug", object: "Mug", card: "10 ♣" },
    "31": { person: "Captain America", action: "Rebounding his shield", object: "Shield", card: "Ace ♣" },
    "32": { person: "Carl Barron", action: "Walking without knees", object: "Knees", card: "2 ♣" },
    "33": { person: "Charlie Chaplain", action: "Falling over hat", object: "Hat", card: "3 ♣" },
    "34": { person: "Celine Dion", action: "Sailing the Titanic", object: "Titanic", card: "4 ♣" },
    "35": { person: "Clint Eastwood", action: "Filming with camera", object: "Film camera", card: "5 ♣" },
    "36": { person: "Charlie Sheen", action: "Snorting cocaine", object: "Cocaine", card: "6 ♣" },
    "37": { person: "Che Guevara", action: "Pasting up revolution poster", object: "Revolution poster", card: "7 ♣" },
    "38": { person: "Chris Hemsworth", action: "Picking up Thor's hammer", object: "Thor's hammer", card: "8 ♣" },
    "39": { person: "Chuck Norris", action: "Shooting bullets in the jungle", object: "Bullets", card: "9 ♣" },
    "40": { person: "David Olgilvy", action: "Copywriting a newspaper ad", object: "Newspaper", card: "10 ♦" },
    "41": { person: "Dan Aykroyd", action: "Hunting ghosts with a proton pack", object: "Proton Pack", card: "Ace ♦" },
    "42": { person: "Derren Brown", action: "Mind reading with playing cards", object: "Playing cards", card: "2 ♦" },
    "43": { person: "Dan Carter", action: "Kicking rugby ball", object: "Rugby ball", card: "3 ♦" },
    "44": { person: "Danny Devito", action: "Yelling in a megaphone on Dumbo", object: "Megaphone", card: "4 ♦" },
    "45": { person: "Dwight Eisenhower", action: "Riding in an army jeep", object: "Jeep", card: "5 ♦" },
    "46": { person: "Dr. Seuss", action: "Balancing a fishbowl", object: "Fishbowl", card: "6 ♦" },
    "47": { person: "David Guetta", action: "Scratching a vinyl record", object: "Vinyl record", card: "7 ♦" },
    "48": { person: "Dan Harris", action: "Panicking on ABC News", object: "ABC news", card: "8 ♦" },
    "49": { person: "Daniel Negreanu", action: "Tilting all in poker chips", object: "Poker chips", card: "9 ♦" },
    "50": { person: "Fiddy Cent (50)", action: "Clasping a gold chain", object: "Gold chain", card: "" },
    "51": { person: "Ed Asner", action: "Floating up with balloons", object: "Balloons", card: "Jack ♠" },
    "52": { person: "Emily Blunt", action: "Jumping into chalk drawing", object: "Chalk drawing", card: "Jack ♥" },
    "53": { person: "Eric Clapton", action: "Crying tears (in heaven)", object: "Tears", card: "Jack ♣" },
    "54": { person: "Ellen DeGeneres", action: "Pranking the audience", object: "Audience", card: "Jack ♦" },
    "55": { person: "Eminem", action: "Vomiting mom's spaghetti", object: "Mom's spaghetti", card: "" },
    "56": { person: "Ed Sheeran", action: "Listening to his favourite song", object: "Favourite song", card: "" },
    "57": { person: "Eric Goldberg", action: "Sketching with felt pen", object: "Felt pen", card: "" },
    "58": { person: "Edmund Hillary", action: "Climbing Mt. Everest", object: "$5 note", card: "" },
    "59": { person: "Edward Norton", action: "Talking to the mirror", object: "Mirror", card: "" },
    "60": { person: "Shaquille O'Neal", action: "Lacing up big Reeboks", object: "Big Reeboks", card: "" },
    "61": { person: "Steve Austin", action: "Clothes lining with folding chair", object: "Folding chair", card: "Queen ♠" },
    "62": { person: "Phil Tayag (JBWKZ)", action: "Dancing with JBWKZ mask", object: "JBWKZ mask", card: "Queen ♥" },
    "63": { person: "Simon Cowell", action: "Pressing the red buzzer", object: "Red buzzer", card: "Queen ♣" },
    "64": { person: "Snoop Dogg", action: "Smoking a blunt", object: "Blunt", card: "Queen ♦" },
    "65": { person: "Sam Elliot", action: "Shadowing with Bradley Cooper with his moustache", object: "Moustache", card: "" },
    "66": { person: "Steven Spielberg", action: "Directing the jaws movie", object: "Jaws", card: "" },
    "67": { person: "Selena Gomez", action: "Breaking up with Justin Bieber", object: "Justin Bieber", card: "" },
    "68": { person: "Stephen Hawking", action: "Sitting in a wheelchair", object: "Wheelchair", card: "" },
    "69": { person: "Sam Neill", action: "Calming down a t rex", object: "T rex", card: "" },
    "70": { person: "Inspector Gadget", action: "Holding a magnifying glass", object: "Magnifying glass", card: "" },
    "71": { person: "Georgio Armani", action: "Spraying on GIO perfume", object: "GIO perfume", card: "King ♠" },
    "72": { person: "Gerard Butler", action: "Sinking a submarine", object: "Submarine", card: "King ♥" },
    "73": { person: "George Clooney", action: "Drinking Nespresso", object: "Nescafe", card: "King ♣" },
    "74": { person: "Mahatma Gandhi", action: "Meditating on yoga mat", object: "Yoga rug", card: "King ♦" },
    "75": { person: "Thomas Edison", action: "Powering a light bulb", object: "Light bulb", card: "" },
    "76": { person: "Gene Simmons", action: "Poking tongue out", object: "Tongue", card: "" },
    "77": { person: "Lady Gaga", action: "Wearing a meat dress", object: "Meat dress", card: "" },
    "78": { person: "Geri Halliwell", action: "Hopping on a double decker bus", object: "Double decker bus", card: "" },
    "79": { person: "Graham Norton", action: "Pulling lever on red chair", object: "Red chair", card: "" },
    "80": { person: "Santa Claus", action: "Delivering gifts", object: "Gifts", card: "" },
    "81": { person: "The Joker", action: "Spinning umbrella", object: "Umbrella", card: "" },
    "82": { person: "Halle Berry", action: "Whipping catwoman whip", object: "Catwoman whip", card: "" },
    "83": { person: "Hillary Clinton", action: "Debating with Trump at the lectern", object: "Lectern", card: "" },
    "84": { person: "Humpty Dumpty", action: "Cracking egg", object: "Egg", card: "" },
    "85": { person: "Man", action: "Stabbing with sword", object: "Sword", card: "" },
    "86": { person: "Harvey Specter", action: "Smashing whiskey glass", object: "Whiskey glass", card: "" },
    "87": { person: "Hugh Grant", action: "Hiding Paddington book", object: "Paddington book", card: "" },
    "88": { person: "Hulk Hogan", action: "Ripping singlet", object: "Singlet", card: "" },
    "89": { person: "Harvey Norman", action: "Selling computers", object: "Computers", card: "" },
    "90": { person: "Norman Osborn", action: "Strangling Spider-Man", object: "Spider-Man", card: "" },
    "91": { person: "Neil Armstrong", action: "Floating on Apollo 11", object: "Apollo 11", card: "" },
    "92": { person: "Natasha Bedingfield", action: "Staring at the blank page", object: "Blank page", card: "" },
    "93": { person: "Nicolas Cage", action: "Lighting torch", object: "Torch", card: "" },
    "94": { person: "Neil Diamond", action: "Chanting sweet caroline at the football", object: "Football", card: "" },
    "95": { person: "Nicole Eggert", action: "Running on beach with rescue board", object: "Rescue board", card: "" },
    "96": { person: "Nicole Scherzinger", action: "Slapping booty for Pussycat Dolls", object: "Booty", card: "" },
    "97": { person: "Noel Gallagher", action: "Songwriting meme t-shirt", object: "Meme t-shirt", card: "" },
    "98": { person: "Neil Patrick Harris", action: "Sculling beer", object: "Beer", card: "" },
    "99": { person: "Jay Z (99 Problems)", action: "Rapping 99 problems with NYC cap", object: "NYC cap", card: "" }
};

document.getElementById("numberInput").addEventListener("input", function () {
    const num = this.value.padStart(2, "0"); // Ensure two-digit format
    const resultDiv = document.getElementById("result");

    if (paoData[num]) {
        const { person, action, object, card } = paoData[num];
        let formattedCard = card;

        // Check if card is a heart or diamond and wrap the symbol in a span
        formattedCard = formattedCard.replace(/(♥|♦)/g, '<span style="color: red;">$1</span>');

        // Create the result text with the formatted card
        const resultText = `
            <p><strong>Person:</strong> ${person}</p>
            <p><strong>Action:</strong> ${action}</p>
            <p><strong>Object:</strong> ${object}</p>
            <p><strong>Card:</strong> ${formattedCard}</p>
        `;
        
        resultDiv.innerHTML = resultText; // Set the result text in the div
    }
});
