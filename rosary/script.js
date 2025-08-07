const prayers = {
  en: {
    signOfTheCross: "In the name of the Father, and of the Son, and of the Holy Spirit. Amen.",
    apostlesCreed: "I believe in God, the Father Almighty... (full text can be expanded)",
    ourFather: "Our Father, who art in heaven... (full text can be expanded)",
    hailMary: "Hail Mary, full of grace... (full text can be expanded)",
    gloryBe: "Glory be to the Father... (full text can be expanded)",
    fatima: "O my Jesus, forgive us our sins... (full text can be expanded)",
    hailHolyQueen: "Hail, holy Queen, Mother of mercy, our life, our sweetness, and our hope. To thee do we cry, poor banished children of Eve; to thee do we send up our sighs, mourning and weeping in this valley of tears. Turn then, most gracious Advocate, thine eyes of mercy toward us; and after this our exile, show unto us the blessed fruit of thy womb, Jesus. O clement, O loving, O sweet Virgin Mary.",
    closingDialogue: "V. Pray for us, O holy Mother of God. <br>R. That we may be made worthy of the promises of Christ.",
    closingPrayer: "Let us pray: O God, whose only begotten Son, by His life, death, and resurrection, has purchased for us the rewards of eternal life; grant, we beseech You, that by meditating upon these mysteries of the Most Holy Rosary of the Blessed Virgin Mary, we may imitate what they contain and obtain what they promise, through the same Christ our Lord. Amen.",
    signOfTheCross: "In the name of the Father, and of the Son, and of the Holy Spirit. Amen."
  },
  vi: {
    signOfTheCross: "Nhân danh Cha và Con và Thánh Thần. Amen.",
    apostlesCreed: "Tôi tin kính Đức Chúa Trời là Cha... (full text can be expanded)",
    ourFather: "Lạy Cha chúng con ở trên trời... (full text can be expanded)",
    hailMary: "Kính mừng Maria đầy ơn phúc... (full text can be expanded)",
    gloryBe: "Sáng danh Đức Chúa Cha... (full text can be expanded)",
    fatima: "Lạy Chúa Giêsu, xin tha tội cho chúng con... (full text can be expanded)",
    hailHolyQueen: "Kính mừng Nữ Vương Thiên Đàng, Mẹ Nhân Lành, đời chúng con, niềm vui, sự cậy trông. Chúng con kêu cầu Mẹ, những kẻ con cái lưu đầy tội lỗi. Chúng con thở than, khóc lóc trong thung lũng đắng cay. Xin Mẹ nhìn đến chúng con với ánh mắt từ bi. Sau cuộc đời lưu đày này, xin dẫn chúng con đến gặp Con Mẹ là Chúa Giêsu, Đấng đầy nhân từ, đầy yêu thương.",
    closingDialogue: "V. Cầu cho chúng con, Mẹ Thiên Chúa. <br>Đ. Để chúng con được xứng đáng với những lời hứa của Đức Kitô.",
    closingPrayer: "Lạy Thiên Chúa, Đấng đã ban Con Một duy nhất của Ngài qua cuộc sống, cái chết và sự phục sinh để chuộc tội cho chúng con; xin cho chúng con nhờ suy niệm các mầu nhiệm Mân Côi của Mẹ Maria, bắt chước những gì chúng chứa đựng và được hưởng những lời hứa, nhờ chính Đức Kitô, Chúa chúng con. Amen.",
    signOfTheCross: "Nhân danh Cha, và Con, và Thánh Thần. Amen."
  },
  tl: {
    signOfTheCross: "Sa ngalan ng Ama, at ng Anak, at ng Espiritu Santo. Amen.",
    apostlesCreed: "Sumasampalataya ako sa Diyos Amang makapangyarihan sa lahat... (full text can be expanded)",
    ourFather: "Ama namin, sumasalangit Ka... (full text can be expanded)",
    hailMary: "Aba Ginoong Maria, napupuno ka ng grasya... (full text can be expanded)",
    gloryBe: "Luwalhati sa Ama, at sa Anak... (full text can be expanded)",
    fatima: "O Hesus ko, patawarin Mo kami sa aming mga sala... (full text can be expanded)",
    hailHolyQueen: "Aba, Reyna ng langit, Ina ng awa, buhay namin, tamis namin at pag-asa. Sa'yo kami ay lumalapit, mga dukhang anak ni Eva. Sa'yo kami ay humihiling ng awa, sa gitna ng mga luha at paghihirap ng buhay. Tingnan mo kami, O mahabagin na Tagapamagitan. Pagkatapos ng aming pagdurusa, ipakita mo sa amin ang biyaya ng iyong Anak, si Hesus na aming Panginoon.",
    closingDialogue: "V. Ipagdasal mo kami, O banal na Ina ng Diyos. <br>R. Upang kami'y maging karapat-dapat sa mga pangako ni Kristo.",
    closingPrayer: "Manalangin tayo: O Diyos, na sa buhay, kamatayan, at pagkabuhay na mag-uli ng Iyong Bugtong na Anak ay nagbayad para sa amin ng gantimpala ng buhay na walang hanggan; ipagkaloob mo po sa amin na sa pagninilay sa mga misteryo ng Banal na Rosaryo ni Birheng Maria ay maipagpamalas namin ang mga nilalaman nito at matamo ang mga ipinangako, sa pamamagitan ni Kristo na aming Panginoon. Amen.",
    signOfTheCross: "Sa ngalan ng Ama, at ng Anak, at ng Espiritu Santo. Amen."
  }
};

const titles = {
  en: {
    signOfTheCross: "Sign of the Cross",
    apostlesCreed: "Apostles' Creed",
    ourFather: "Our Father",
    threeHailMarys: "3 Hail Marys",
    gloryBe: "Glory Be",
    mystery: "Mystery",
    tenHailMarys: "10 Hail Marys",
    fatimaPrayer: "Fatima Prayer",
    hailHolyQueen: "Hail Holy Queen",
    closingDialogue: "Closing Dialogue",
    closingPrayer: "Closing Prayer",
    signOfTheCross: "Sign of the Cross"
  },
  vi: {
    signOfTheCross: "Dấu Thánh Giá",
    apostlesCreed: "Kinh Tin Kính",
    ourFather: "Kinh Lạy Cha",
    threeHailMarys: "3 Kinh Kính Mừng",
    gloryBe: "Kinh Sáng Danh",
    mystery: "Mầu Nhiệm",
    tenHailMarys: "10 Kinh Kính Mừng",
    fatimaPrayer: "Kinh Fatima",
    hailHolyQueen: "Kinh Kính Mừng Nữ Vương",
    closingDialogue: "Đoạn Kết",
    closingPrayer: "Kinh Cầu Kết",
    signOfTheCross: "Dấu Thánh Giá"
  },
  tl: {
    signOfTheCross: "Hudyat ng Krus",
    apostlesCreed: "Paniniwala ng mga Apostol",
    ourFather: "Ama Namin",
    threeHailMarys: "3 Aba Ginoong Maria",
    gloryBe: "Luwalhati",
    mystery: "Misteryo",
    tenHailMarys: "10 Aba Ginoong Maria",
    fatimaPrayer: "Panalangin ng Fatima",
    hailHolyQueen: "Aba, Reyna ng Langit",
    closingDialogue: "Pangwakas na Diyalogo",
    closingPrayer: "Panalangin ng Pagsasara",
    signOfTheCross: "Hudyat ng Krus"
  }
};

const mysteriesByDay = {
  Monday: "Joyful",
  Tuesday: "Sorrowful",
  Wednesday: "Glorious",
  Thursday: "Luminous",
  Friday: "Sorrowful",
  Saturday: "Joyful",
  Sunday: "Glorious"
};

const mysteryCategories = {
  en: {
    Joyful: "Joyful",
    Sorrowful: "Sorrowful",
    Glorious: "Glorious",
    Luminous: "Luminous"
  },
  vi: {
    Joyful: "Mầu Nhiệm Vui",
    Sorrowful: "Mầu Nhiệm Thương",
    Glorious: "Mầu Nhiệm Mừng",
    Luminous: "Mầu Nhiệm Sáng"
  },
  tl: {
    Joyful: "Masayang Misteryo",
    Sorrowful: "Mapait na Misteryo",
    Glorious: "Mahalagang Misteryo",
    Luminous: "Misteryong Liwanag"
  }
};

const mysteryMeditations = {
  en: {
    Joyful: [
      {
        title: "The Annunciation",
        scripture: "“In the sixth month, the angel Gabriel was sent from God to Nazareth...” — Luke 1:26-27",
        reflection: "Mary humbly accepts God's plan, showing faith and obedience.",
        fruit: "Fruit of the Mystery: Humility"
      }
    ],
    Sorrowful: [
      {
        title: "The Agony in the Garden",
        scripture: "“He began to be sorrowful and troubled.” — Matthew 26:37-38",
        reflection: "Jesus accepts God's will in his suffering. We pray for courage.",
        fruit: "Fruit of the Mystery: Contrition"
      }
    ],
    Glorious: [
      {
        title: "The Resurrection",
        scripture: "“He is not here; he has risen!” — Luke 24:6",
        reflection: "Jesus conquers death and opens heaven. We pray for faith and hope.",
        fruit: "Fruit of the Mystery: Faith"
      }
    ],
    Luminous: [
      {
        title: "The Baptism of Jesus in the Jordan",
        scripture: "“As soon as Jesus was baptized, he went up out of the water.” — Matthew 3:16-17",
        reflection: "Jesus begins his public ministry. We pray for the grace of baptism.",
        fruit: "Fruit of the Mystery: Openness to the Holy Spirit"
      }
    ]
  }
};


const prayersDiv = document.getElementById("prayers");
const languageSelect = document.getElementById("languageSelect");
const daySelect = document.getElementById("daySelect");

let currentDecade = 0;

languageSelect.addEventListener("change", () => {
  currentDecade = 0;
  renderPrayers();
});

daySelect.addEventListener("change", () => {
  currentDecade = 0;
  renderPrayers();
});

function renderPrayers() {
  const lang = languageSelect.value;
  const day = daySelect.value;
  const mysteryKey = mysteriesByDay[day];
  const t = titles[lang];
  const mysteryCategoryName = mysteryCategories[lang][mysteryKey];

  let html = "";

  // Opening prayers
  html += `<div class='prayer opening'><strong>${t.signOfTheCross}:</strong><br>${prayers[lang].signOfTheCross}</div>`;
  html += `<div class='prayer opening'><strong>${t.apostlesCreed}:</strong><br>${prayers[lang].apostlesCreed}</div>`;
  html += `<div class='prayer opening'><strong>${t.ourFather}:</strong><br>${prayers[lang].ourFather}</div>`;
  html += `<div class='prayer opening'><strong>${t.threeHailMarys}:</strong><br>${prayers[lang].hailMary}</div>`;
  html += `<div class='prayer opening'><strong>${t.gloryBe}:</strong><br>${prayers[lang].gloryBe}</div>`;

  // Navigation buttons for decades
  html += `
  <div class="navigation">
    <button onclick="prevDecade()" ${currentDecade === 0 ? "disabled" : ""}>Previous Decade</button>
    <button onclick="nextDecade()" ${currentDecade === 4 ? "disabled" : ""}>Next Decade</button>
  </div>`;

  // Combined meditation in one box
  const meditation = mysteryMeditations[lang][mysteryKey][currentDecade];
  html += `<div class='prayer mysteries'>
    <strong>${mysteryCategoryName} ${t.mystery} ${currentDecade + 1}: ${meditation.title}</strong><br><br>
    <em>${meditation.scripture}</em><br><br>
    ${meditation.reflection}<br><br>
    <strong>${meditation.fruit}</strong>
  </div>`;

  // The decade prayers
  html += `<div class='prayer mysteries'><strong>${t.ourFather}:</strong><br>${prayers[lang].ourFather}</div>`;
  html += `<div class='prayer mysteries'><strong>${t.tenHailMarys}:</strong><br>${prayers[lang].hailMary}</div>`;
  html += `<div class='prayer mysteries'><strong>${t.gloryBe}:</strong><br>${prayers[lang].gloryBe}</div>`;
  html += `<div class='prayer mysteries'><strong>${t.fatimaPrayer}:</strong><br>${prayers[lang].fatima}</div>`;

  // Closing prayers
  html += `<div class='prayer closing'><strong>${t.hailHolyQueen}:</strong><br>${prayers[lang].hailHolyQueen}</div>`;
  html += `<div class='prayer closing'><strong>${t.closingDialogue}:</strong><br>${prayers[lang].closingDialogue}</div>`;
  html += `<div class='prayer closing'><strong>${t.closingPrayer}:</strong><br>${prayers[lang].closingPrayer}</div>`;
  html += `<div class='prayer closing'><strong>${t.signOfTheCross}:</strong><br>${prayers[lang].signOfTheCross}</div>`;

  prayersDiv.innerHTML = html;
}

function prevDecade() {
  if (currentDecade > 0) {
    currentDecade--;
    renderPrayers();
  }
}

function nextDecade() {
  if (currentDecade < 4) {
    currentDecade++;
    renderPrayers();
  }
}

function setCurrentDay() {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const today = new Date();
  daySelect.value = days[today.getDay()];
}

// Set the day select to the current day on page load
setCurrentDay();

// Initial render
renderPrayers();
