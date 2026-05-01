const tabs = document.querySelectorAll(".tab");
const listEl = document.getElementById("list");
const resetBtn = document.getElementById("resetBtn");

const defaultData = {
    affirmations: [
        "Everything is working in my favor",
        "I attract peace, abundance, and clarity",
        "I am aligned with my highest self",
        "What I desire is already mine",
        "I trust the process of my life"
    ],
    verses: [
        {
            ref: "John 3:16",
            text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life."
        },
        {
            ref: "Philippians 4:6–7",
            text: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. 7 And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus."
        },
        {
            ref: "Mark 11:24",
            text: "Whatever you ask for in prayer, believe that you have received it, and it will be yours."
        },
        {
            ref: "Proverbs 23:7",
            text: "As he thinks in his heart, so is he."
        },
        {
            ref: "Matthew 7:7",
            text: "Ask and it will be given to you; seek and you will find."
        },
        {
            ref: "Job 22:28",
            text: "You will decree a thing, and it will be established for you."
        },
    ]
};

let data = JSON.parse(localStorage.getItem("appData")) || JSON.parse(JSON.stringify(defaultData));
let currentTab = "affirmations";

function save() {
    localStorage.setItem("appData", JSON.stringify(data));
}

function createItem(item, index) {
    const li = document.createElement("li");

    if (currentTab === "verses") {
        li.innerHTML = `<strong>${item.ref}</strong><br>${item.text}`;
    } else {
        li.textContent = item;
    }

    li.addEventListener("click", () => {
        li.style.height = li.offsetHeight + "px";

        requestAnimationFrame(() => {
            li.style.transition = "all 0.25s ease";
            li.style.opacity = "0";
            li.style.height = "0px";
            li.style.margin = "0";
            li.style.padding = "0";
        });

        setTimeout(() => {
            data[currentTab].splice(index, 1);
            save();
            render();
        }, 250);
    });

    return li;
}

function render() {
    listEl.innerHTML = "";

    data[currentTab].forEach((item, index) => {
        const li = createItem(item, index);
        listEl.appendChild(li);
    });
}

tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        currentTab = tab.dataset.tab;
        render();
    });
});

resetBtn.addEventListener("click", () => {
    data = JSON.parse(JSON.stringify(defaultData));
    save();
    render();
});

render();
