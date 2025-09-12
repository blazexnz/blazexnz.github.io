document.addEventListener("DOMContentLoaded", function () {
    const generateBtn = document.getElementById("generateBtn");
    const toggleBtn = document.getElementById("toggleBtn");
    const copyBtn = document.getElementById("copyBtn");
    const modeSelect = document.getElementById("mode");
    const countInput = document.getElementById("count");
    const resultList = document.getElementById("resultList");
    const minusBtn = document.getElementById("minusBtn");
    const plusBtn = document.getElementById("plusBtn");
    const counterValue = document.getElementById("counterValue");
    const resetBtn = document.getElementById("resetBtn");
    const backToTopBtn = document.getElementById("backToTopBtn");
    let isHidden = false;
    let counter = 0;

    // Array of 1,000 basic everyday nouns - but it isn't actually 1,000
    const words = [
        "train","billiard","umbrella","astronaut","dish","ear","dagger","lamp","computer","caterpillar",
        "towel","drawer","chimney","incense","clock","vase","wallet","jigsaw","claw","tissue",
        "easel","excavator","wrench","chip","clamp","television","fork","alarm","whistle","toothpaste",
        "apron","drum","fan","jellybean","clothesline","dinosaur","cocktail","doormat","hula","barn",
        "atlas","cork","fishbowl","chest","zebra","aunt","glasses","beauty","tablecloth","beak",
        "jacket","airplane","shirt","architect","balloon","earphone","pencil","toaster","couch","shoe",
        "cup","cherry","beehive","comb","trashcan","alligator","watch","athlete","washer","pocket",
        "furniture","dart","bear","barrier","scissors","skateboard","beanie","beating","anchor","stapler",
        "ink","camera","birdcage","ashtray","popsicle","banana","tape","light","doll","window",
        "guitar","ambulance","eraser","animal","plane","angel","hammer","auction","bowl","toothbrush",
        "printer","bed","bridge","bicycle","chemistry","brain","pumpkin","key","elephant","folder",
        "map","ice","bottle","fence","clip","body","doorbell","backbone","soap","rubber",
        "eggplant","ticket","spoon","base","clutch","headphone","bus","bat","straw","needle",
        "backyard","snowman","casket","ladder","microwave","plank","bulb","checklist","ring","album",
        "basketball","coaster","egg","shelf","frame","remote","glove","appliance","cactus","broomstick",
        "quilt","plate","cafe","beard","bathtub","candle","celebration","cupboard","beach","flower",
        "carpet","hook","book","letter","nurse","refrigerator","mug","alcohol","table","border",
        "leaf","charcoal","cone","chicken","gadget","rooster","postcard","giraffe","kite","measuring cup",
        "octopus","chocolate","zoo","chopstick","frying pan","backpack","mirror","mom","bucket","orange",
        "knight","battery","bread","dragon","stool","atom","envelope","keypad","desk","rug",
        "chalk","lens","ocean","picture","apple","piano","nail","helmet","hat","bingo",
        "keychain","cellphone","brush","stove","cap","marker","bowtie","racket","blender","cheese",
        "game","barrack","button","plaque","paintbrush","radio","brake","rocket","apprentice","pillow",
        "birthday","mobile","poster","trolley","mattress","dresser","doorway","jug","sock","knife",
        "coin","clothes","snack","suitcase","beef","shelving","laptop","shovel","hen","bread",
        "belt","brother","brow","billboard","barcode","accordion","watermelon","carton","cart","apricot",
        "newspaper","ankle","screwdriver","socks","notebook","spade","barbell","aeroplane","belly","dog",
        "pen","anatomy","beam","yarn","child","catapult","spatula","bell","syrup","cigarette",
        "zipper","box","audience","flag","zombie","snowflake","lotion","football","diamond","bracelet",
        "grapes","canister","mat","pliers","coffee","hexagon","coal","beaker","diary","beacon",
        "arrow","dustpan","airship","violin","bee","circle","dollhouse","flowerpot","gadget","garbage",
        "cake","tree","ash","camp","fish","admiral","boat","cannon","trophy","eyebrow",
        "monkey","board","kangaroo","jar","lollipop","brass","jelly","keyboard","blouse","avocado",
        "house","cauldron","arm","anchor","beacon","beehive","bush","cave","cobweb","crayon",
        "crane","drain","dune","eagle","earth","feather","ferry","flute","glacier","goblet",
        "harbor","hedge","iceberg","inlet","jungle","kayak","lagoon","lantern","lily","marble",
        "meadow","nectar","oasis","obelisk","orchard","paddle","parrot","pebble","pier","pyramid",
        "quarry","raven","reef","reservoir","ribbon","saddle","sandcastle","seashell","shovel","silo",
        "snowflake","sprout","stump","swan","tavern","temple","throne","tundra","valley","vine",
        "volcano","watering can","wharf","willow","windsock","yardstick","yacht","zinnia","zephyr","zucchini",
        "acorn","almond","apartment","artichoke","avalanche","backpack","ball","ballerina","beetle","bench",
        "binoculars","blizzard","bottlebrush","bouquet","boulder","cabbage","cabin","cactus","camel","campfire",
        "canoe","carrot","carousel","cartridge","castle","cave","ceiling fan","chalkboard","chapel","cheetah",
        "cherry blossom","chestnut","chimney sweep","clamp","clover","cobblestone","coconut","comet","compass","concrete",
        "conductor","cookie","coral","corn","cottage","crab","cricket","croissant","crown","cucumber",
        "cupcake","cushion","daisy","dandelion","deck","desert","dice","dolphin","donkey","doorway",
        "dragonfly","drumstick","duck","dune buggy","earring","echo","egret","elk","elm","engine",
        "eraser","falcon","fencepost","ferris wheel","firefly","fishing rod","flagpole","flamingo","flashlight","fountain",
        "fresco","frog","galaxy","galleon","garden","gargoyle","gazebo","gecko","geography","geyser",
        "glacier","glider","gnome","gondola","gorilla","gourd","grasshopper","grotto","guitarist","gumdrop",
        "hammock","harp","haystack","hedgehog","helipad","hummingbird","hurdle","ice cream","igloo","impala",
        "incense burner","instrument","jackal","jaguar","javelin","jellyfish","jet","jigsaw puzzle","jukebox","kangaroo rat",
        "kayak paddle","kitchen","kitchenware","koala","labyrinth","ladle","lamb","lattice","lava","lever",
        "lighthouse keeper","lilac","limestone","lion","lizard","loaf","locust","lodestone","lotus","luggage",
        "lullaby","lynx","macaroni","magpie","mahogany","mandolin","mango","manor","mariner","marzipan",
        "mask","mast","meerkat","mermaid","mill","minaret","mint","mirage","moat","moccasin",
        "mole","monastery","monocle","mongoose","moth","mountain","mugwort","mustang","nectarine","net",
        "newt","nightingale","noodle","notary","obelisk tower","ocelot","octagon","octopus","olive","omelet",
        "orchid","ostrich","otter","owl","oyster","paddleboat","pagoda","palace","palm","panther",
        "papaya","parakeet","parasol","partridge","peacock","peanut","pelican","penguin","pencil case","pepper",
        "petal","pheasant","picnic basket","piercing","pigeon","pineapple","pinwheel","pirate","pitcher","pita",
        "plankton","plaza","pony","poppy","porcupine","porch","possum","potato","prairie","pretzel",
        "primrose","puma","pumpkin seed","puppet","quail","quartz","quiche","quiver","rabbit","raccoon",
        "radish","rainbow","ranch","raven","recliner","reef fish","reindeer","rhinoceros","river","rocker",
        "robin","rocketship","rose","rosette","rudder","sailboat","salamander","saxophone","scarecrow","scarf",
        "seahorse","seagull","seashell","serviette","shack","shamrock","shark","sheep","shelf","sherbet",
        "ship","shoelace","shop","shrimp","silo","skate","skirt","sloth","snail","snowball",
        "snowman","soap","sock","sofa","sparrow","spear","spoon","squid","squirrel","stadium",
        "stapler","stethoscope","strawberry","stump","suit","swan","sweater","sword","syrup","tablecloth",
        "taco","telescope","tennis racket","thermometer","thimble","ticket","tiger","toad","tomato","tooth",
        "toothbrush","toothpaste","trolley","trombone","trousers","trumpet","tulip","turtle","typewriter","umbrella stand",
        "urn","vacuum cleaner","vase","viaduct","violin","volcano","vulture","wagon","walrus","wardrobe",
        "wastebasket","watchtower","waterfall","watering can","weasel","wheelbarrow","whistle","windowpane","windsock","wolf",
        "woodpecker","wool","worm","xylophone","yacht","yak","yardstick","yarn","yew","zebra crossing",
        "zeppelin","zigzag","zinnia","zipper","zodiac","zucchini"
    ];

    const suits = ["♠", "♥", "♣", "♦"];
    const ranks = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];
    const deck = [];
    suits.forEach(suit => {
        ranks.forEach(rank => {
            deck.push({suit: suit, rank: rank});
        });
    });

    const defaultCounts = {
        word: 20,
        number: 30,
        card: 52
    };

    modeSelect.addEventListener("change", () => {
        countInput.value = defaultCounts[modeSelect.value] || 20;
    });      
    
    generateBtn.addEventListener("click", function () {
        const mode = modeSelect.value;
        let count = Math.max(1, parseInt(countInput.value) || defaultCounts[mode] || 20);
        resultList.innerHTML = "";

        if (mode === "word") {
            const shuffledWords = [...words].sort(() => Math.random() - 0.5).slice(0, count);
            shuffledWords.forEach(word => {
                const listItem = document.createElement("li");
                listItem.textContent = word;
                resultList.appendChild(listItem);
            });
        } else if (mode === "number") {
            for (let i = 0; i < count; i++) {
                const listItem = document.createElement("li");
                listItem.textContent = Math.floor(Math.random() * 100);
                resultList.appendChild(listItem);
            }
        } else if (mode === "card") {
            count = Math.min(count, 52);
            const shuffledDeck = [...deck].sort(() => Math.random() - 0.5).slice(0, count);
            shuffledDeck.forEach(card => {
                const listItem = document.createElement("li");
                const cardDiv = document.createElement("div");
                cardDiv.classList.add("card");
                if (card.suit === "♥" || card.suit === "♦") cardDiv.classList.add("red");

                // Rank then suit for "6♥" format
                cardDiv.textContent = card.rank + card.suit;

                listItem.appendChild(cardDiv);
                resultList.appendChild(listItem);
            });
        }
    });

    toggleBtn.addEventListener("click", function () {
        isHidden = !isHidden;
        resultList.style.display = isHidden ? "none" : "block";
        toggleBtn.textContent = isHidden ? "Show List" : "Hide List";
    });

    copyBtn.addEventListener("click", function () {
        const items = resultList.querySelectorAll("li");
        if (items.length === 0) return;

        const text = Array.from(items).map(item => item.textContent).join("\n");
        navigator.clipboard.writeText(text).catch(err => console.error("Failed to copy:", err));
    });

    minusBtn.addEventListener("click", function () {
        if (counter > 0) {
            counter--;
            counterValue.textContent = counter;
        }
    });

    plusBtn.addEventListener("click", function () {
        counter++;
        counterValue.textContent = counter;
    });

    resetBtn.addEventListener("click", function () {
        counter = 0;
        counterValue.textContent = counter;
    });

    backToTopBtn.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});

