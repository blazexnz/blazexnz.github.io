// The list of items is now stored in an array
const listData = [
    "3.14159 CADAEN - front gate - captain america hunting ghosts with a mirror",
    "265358 BSECEH - mum's carpark - bart simpson plays tears in heaven with a $5 note",
    "979323 NGNCBC - visitors carpark - noel gallagher lights a torch with a slingers ring",
    "846264 HDSBSD - back entrance rubbish area - humpty dumpty dancing with a blunt",
    "338327 CCHCBG - letterboxes - charlie chaplain debates trump with a book",
    "950288 NEOBHH - door 1 - nicole eggert fighting with light saber wearing hulk hogans singlet",
    "419716 DANGAS - door 2 - dan aykroyd writing a song in a meme t shirt lifting arnold's dumbell",
    "939937 NCNNCG - mirror - nicolas cage rapping 99 problems about a revolution poster",
    "510582 EAOEHB - notice board - ed asner arguing with house about a catwoman whip",
    "097494 ONGDND - mum's door - olivia newton-john meditating on a sweet caroline football",
    "59230 DENBCO - fridge - dwight eisenhower staring at a blank page mug",
    "781640 GHASDO - dryer - geri halliwell lifting dumbells made out of news paper",
    "628620 SBHSBO - microwave - sb phil tayag smashing a whiskey glass into the presidents fountain pen",
    "899862 HNNHSB - sink - harvey norman sculling beer with a jbwkz mask",
    "803482 HOCDHB - camphor chest - santa clause sailing on a catwoman whip",
    "534211 ECDBAA - wardrobe - eric clapton mind reading a tennis racquet",
    "706798 GOSGNH - bunk beds - inspector gadget breaking up with selena gomez holding a beer",
    "214808 BADHOH - window - ben affleck panicking on the news holding a jail number (dan harris-oliver hardy)",
    "651328 SEACBH - corner on the floor - sam elliot buttoning up a gangster suit on a horse chariot",
    "230664 BCOSSD - door - benedict cumberbatch presenting iphone with a blunt",
    "709384 GONCHD - TV - go inspector gadget lighting a torch with a humpty egg",
    "460955 DSONEE - ranch slider - dr seuss electrifying grease with mom's spaghetti (eminem)",
    "058223 OEHBBC - toys - omar epps whipping catwoman whip with a slingers ring",
    "172535 AGBECE - mum's chair - ariana grande laying on a magic carpet holding a film camera",
    "940812 NDOHAB - laptop on the floor - neil diamond posing for a jail photo with animation paper",
    "848111 HDHAAA - TV - humpty dumpty spinning the jokers tennis racquet",
    "745028 - window - gandhi clasping fiddy cent's gold chain on a horse chariot",
    "410270 - bed - dan aykroyd fighting with light saber holding magnifying glass",
    "193852 - wardrobe - alfred nobel picking up thors hammer into a chalk drawing",
    "110555 - bedroom door - andre agassi arguing with house about moms spaghetti",
    "964462 NSDDSB - shower - nicole scherzinger yelling in a megaphone with a jbwkz mask",
    "294895 BNDHNE - mirror - bill nye panicking on the news about baywatch rescue board",
    "493038 DNCOCH - basin - daniel negreanu laughing into a mug about thors hammer",
    "196442 ANSDDB - toilet - alfred nobel smoking a blunt with playing cards",
    "881097 HHAONG - hand rail - hulk hogan pulling faces with a meme shirt"
];


let listItems = [];  // To store the li elements dynamically
let currentIndex = 0;

function showList() {
    const listElement = document.getElementById("list");

    // Clear the list before adding new items
    listElement.innerHTML = '';
    listItems = [];  // Reset the listItems array
    currentIndex = 0;  // Reset the index

    // Create li elements dynamically based on the array
    listData.forEach((item, index) => {
        const li = document.createElement("li");
        li.textContent = item;
        li.style.display = "none";  // Initially hide all items
        listElement.appendChild(li);
        listItems.push(li);  // Store each li element
    });

    // Show the list container if it's not visible
    document.getElementById("list").style.display = "block";

    // Reveal items one by one
    document.body.addEventListener('click', revealNextItem);
}

function revealNextItem() {
    if (currentIndex < listItems.length) {
        listItems[currentIndex].style.display = "block"; // Reveal the next item
        currentIndex++;

        // Scroll to the newly revealed item
        const revealedItem = listItems[currentIndex - 1];
        revealedItem.scrollIntoView({ behavior: "smooth", block: "end" });
    }
}

// Reset the list and hide all items again
function resetList() {
    // Hide the list again and clear the displayed items
    const listElement = document.getElementById("list");
    listElement.style.display = "none";
    listItems.forEach(item => item.style.display = "none");  // Hide all list items
    currentIndex = 0;  // Reset the index
}
