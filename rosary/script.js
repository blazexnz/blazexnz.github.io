const prayers = {
  en: {
    intro: "In the name of the Father, and of the Son, and of the Holy Spirit. Amen.",
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
    intro: "Nhân danh Cha và Con và Thánh Thần. Amen.",
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
    intro: "Sa ngalan ng Ama, at ng Anak, at ng Espiritu Santo. Amen.",
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
    intro: "Intro",
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
    intro: "Mở đầu",
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
    intro: "Panimula",
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
        scripture: "“In the sixth month, the angel Gabriel was sent from God to a town of Galilee called Nazareth, to a virgin betrothed to a man named Joseph, of the house of David, and the virgin’s name was Mary.” — Luke 1:26-27",
        reflection: "Mary humbly accepts God's plan, showing faith and obedience. We pray for humility and readiness to serve God.",
        fruit: "Fruit of the Mystery: Humility"
      },
      {
        title: "The Visitation",
        scripture: "“During those days Mary set out and traveled to the hill country in haste to a town of Judah, where she entered the house of Zechariah and greeted Elizabeth.” — Luke 1:39-40",
        reflection: "Mary visits Elizabeth to share joy and help. This mystery teaches us to love our neighbor and be helpful.",
        fruit: "Fruit of the Mystery: Love of Neighbor"
      },
      {
        title: "The Nativity",
        scripture: "“She gave birth to her firstborn son and wrapped him in swaddling clothes, and laid him in a manger because there was no room for them in the inn.” — Luke 2:7",
        reflection: "Jesus was born in poverty, showing God’s love and humility. We are called to live poverty of spirit and welcome Jesus with faith.",
        fruit: "Fruit of the Mystery: Poverty of Spirit"
      },
      {
        title: "The Presentation",
        scripture: "“When the days for their purification according to the law of Moses were completed, they brought him up to Jerusalem to present him to the Lord.” — Luke 2:22",
        reflection: "Mary and Joseph present Jesus in the temple, showing obedience and dedication. This mystery reminds us to obey and be faithful in our duties.",
        fruit: "Fruit of the Mystery: Obedience"
      },
      {
        title: "The Finding of Jesus in the Temple",
        scripture: "“After three days they found him in the temple, sitting among the teachers, listening to them and asking them questions.” — Luke 2:46",
        reflection: "Jesus, even as a child, was eager to learn and fulfill his mission. We are reminded to seek Jesus with joy and persistence, especially when we feel lost or confused in our faith journey.",
        fruit: "Fruit of the Mystery: Joy in Finding Jesus"
      }
    ],
    // Add Sorrowful, Glorious, Luminous similarly if needed
  },
  vi: {
    Joyful: [
      {
        title: "Truyền Tin",
        scripture: "“Trong tháng thứ sáu, thiên thần Gabriel được Thiên Chúa sai đến một thành ở Galilê tên là Nazareth, đến với một trinh nữ tên Maria, đính hôn với ông Giuse, thuộc dòng dõi vua Đavít.” — Luca 1:26-27",
        reflection: "Maria khiêm nhường nhận lời theo kế hoạch của Thiên Chúa. Mẹ có đức tin và vâng lời tuyệt đối. Chúng ta cầu xin ơn khiêm nhường và sẵn sàng phục vụ Thiên Chúa như Mẹ.",
        fruit: "Hoa trái của Mầu Nhiệm: Khiêm Nhường"
      },
      {
        title: "Viếng Thăm Bà Elisabeth",
        scripture: "“Trong những ngày ấy, Maria vội lên miền núi, vào một thành ở Giuđa, vào nhà ông Giakêu và chào bà Êlisabeth.” — Luca 1:39-40",
        reflection: "Maria đến thăm bà Elisabeth để chia sẻ niềm vui và giúp đỡ. Mầu nhiệm này dạy ta biết yêu thương người lân cận và giúp đỡ tha nhân.",
        fruit: "Hoa trái của Mầu Nhiệm: Yêu Thương Người Lân Cận"
      },
      {
        title: "Chúa Giêsu Giáng Sinh",
        scripture: "“Bà sinh con trai đầu lòng, bọc trong khăn và đặt nằm trong máng cỏ, vì không có chỗ cho họ trong nhà trọ.” — Luca 2:7",
        reflection: "Chúa Giêsu sinh ra trong cảnh nghèo hèn, thể hiện tình yêu và sự khiêm tốn của Thiên Chúa. Chúng ta được gọi mời sống nghèo tinh thần và đón nhận Chúa bằng đức tin.",
        fruit: "Hoa trái của Mầu Nhiệm: Nghèo Trong Tâm Hồn"
      },
      {
        title: "Dâng Chúa Giêsu Trong Đền Thờ",
        scripture: "“Khi đến ngày thanh tẩy, theo luật Môsê, họ đem Chúa Giêsu lên Giêrusalem để dâng cho Chúa.” — Luca 2:22",
        reflection: "Maria và Giuse dâng Chúa Giêsu trong đền thờ, thể hiện sự vâng phục và tận hiến với Thiên Chúa. Mầu nhiệm này nhắc ta phải vâng lời và trung thành trong bổn phận.",
        fruit: "Hoa trái của Mầu Nhiệm: Vâng Phục"
      },
      {
        title: "Tìm Thấy Chúa Giêsu Trong Đền Thờ",
        scripture: "“Sau ba ngày, họ tìm thấy Người trong đền thờ, ngồi giữa các thầy dạy, lắng nghe và hỏi họ.” — Luca 2:46",
        reflection: "Chúa Giêsu dù còn nhỏ vẫn ham hiểu biết và thực hiện sứ mệnh. Chúng ta được nhắc phải tìm kiếm Chúa bằng niềm vui và kiên trì, đặc biệt khi ta cảm thấy lạc lối.",
        fruit: "Hoa trái của Mầu Nhiệm: Niềm Vui Tìm Thấy Chúa"
      }
    ]
  },
  tl: {
    Joyful: [
      {
        title: "Ang Pagpapahayag kay Maria",
        scripture: "“Sa ikaanim na buwan, ang anghel na si Gabriel ay ipinadala ng Diyos sa isang bayan sa Galilea na tinatawag na Nazaret, sa isang dalagang ikinasal kay Jose, na mula sa angkan ni David; at ang dalaga ay tinatawag na Maria.” — Lucas 1:26-27",
        reflection: "Ang mapagpakumbabang pagtanggap ni Maria sa plano ng Diyos ay nagpapakita ng kanyang pananampalataya at pagsunod. Pinagdadasal natin na maging mapagpakumbaba at handang maglingkod sa Diyos tulad niya.",
        fruit: "Bunga ng Misteryo: Kababaang-loob"
      },
      {
        title: "Ang Pagdalaw kay Elizabeth",
        scripture: "“Sa mga araw na iyon, agad na bumangon si Maria at naglakbay papunta sa bundok ng Juda, sa isang bayan, at bumati kay Elizabeth.” — Lucas 1:39-40",
        reflection: "Dinalaw ni Maria ang kanyang pinsan na si Elizabeth upang magbigay ng suporta at kagalakan. Pinapaalalahanan tayo ng misteryong ito na mahalin ang ating kapwa nang walang pag-iimbot.",
        fruit: "Bunga ng Misteryo: Pag-ibig sa Kapwa"
      },
      {
        title: "Ang Kapanganakan ni Jesus",
        scripture: "“Pinanganak niya ang kanyang panganay na anak, binalot ng lampin, at inilagay sa isang sabsaban, sapagkat wala silang lugar sa bahay-pahingahan.” — Lucas 2:7",
        reflection: "Ang kapanganakan ni Jesus sa kahirapan ay nagpapakita ng dakilang pagmamahal at kababaang-loob ng Diyos na nagkatawang-tao. Tinatawagan tayo na tanggapin si Kristo nang may pananampalataya at kasimplehan.",
        fruit: "Bunga ng Misteryo: Kahirapan ng Espiritu"
      },
      {
        title: "Ang Pagsangguni sa Templo",
        scripture: "“Nang dumating ang panahon ng kanilang paglilinis ayon sa kautusan ni Moises, dinala nila si Jesus sa Jerusalem upang ialay sa Panginoon.” — Lucas 2:22",
        reflection: "Inialay nina Maria at Jose si Jesus sa templo, na nagpapakita ng kanilang pagsunod sa batas at debosyon sa kalooban ng Diyos. Tinatawagan tayo na maging matapat at masunurin sa ating mga tungkulin.",
        fruit: "Bunga ng Misteryo: Pagsunod"
      },
      {
        title: "Ang Paghahanap kay Jesus sa Templo",
        scripture: "“Pagkaraan ng tatlong araw, natagpuan nila siya sa templo, nakaupo sa gitna ng mga guro, nakikinig at nagtatanong sa kanila.” — Lucas 2:46",
        reflection: "Kahit bata pa si Jesus, ipinapakita niya ang pagnanais na makilala ang Diyos at tuparin ang kanyang misyon. Pinapaalalahanan tayo na hanapin si Jesus nang may kagalakan at pagtitiyaga sa ating buhay pananampalataya.",
        fruit: "Bunga ng Misteryo: Kagalakan sa Paghahanap kay Jesus"
      }
    ]
  }
};

const prayersDiv = document.getElementById("prayers");
const languageSelect = document.getElementById("languageSelect");
const daySelect = document.getElementById("daySelect");

let currentDecade = 0;

const mysteryDays = Object.keys(mysteriesByDay);

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
  html += `<div class='prayer opening'><strong>${t.intro}:</strong><br>${prayers[lang].intro}</div>`;
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

// Initial render
renderPrayers();
