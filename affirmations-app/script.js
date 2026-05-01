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
            ref: "Philippians 4:13",
            text: "I can do all things through Christ who strengthens me."
        },
        {
            ref: "Jeremiah 29:11",
            text: "For I know the plans I have for you, declares the Lord..."
        },
        {
            ref: "Proverbs 3:5-6",
            text: "Trust in the Lord with all your heart..."
        },
        {
            ref: "Romans 8:28",
            text: "And we know that in all things God works for the good..."
        },
        {
            ref: "Psalm 23:1",
            text: "The Lord is my shepherd; I shall not want."
        }
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