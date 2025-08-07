const prayers = {
en: {
  signOfTheCross: "In the name of the Father, and of the Son, and of the Holy Spirit. Amen.",
  apostlesCreed: `I believe in God, the Father Almighty, Creator of heaven and earth;  
I believe in Jesus Christ, His only Son, our Lord;  
who was conceived by the Holy Spirit, born of the Virgin Mary,  
suffered under Pontius Pilate, was crucified, died, and was buried;  
He descended into hell; on the third day He rose again from the dead;  
He ascended into heaven, and is seated at the right hand of God the Father Almighty;  
from there He will come to judge the living and the dead.  
I believe in the Holy Spirit, the holy Catholic Church,  
the communion of saints, the forgiveness of sins,  
the resurrection of the body, and life everlasting. Amen.`,
  ourFather: `Our Father, who art in heaven,  
hallowed be Thy name;  
Thy kingdom come;  
Thy will be done on earth as it is in heaven.  
Give us this day our daily bread;  
and forgive us our trespasses,  
as we forgive those who trespass against us;  
and lead us not into temptation,  
but deliver us from evil. Amen.`,
  hailMary: `Hail Mary, full of grace,  
the Lord is with thee;  
blessed art thou among women,  
and blessed is the fruit of thy womb, Jesus.  
Holy Mary, Mother of God,  
pray for us sinners,  
now and at the hour of our death. Amen.`,
  gloryBe: `Glory be to the Father,  
and to the Son,  
and to the Holy Spirit,  
as it was in the beginning, is now, and ever shall be,  
world without end. Amen.`,
  fatima: `O my Jesus, forgive us our sins,  
save us from the fires of hell,  
lead all souls to Heaven,  
especially those most in need of Thy mercy. Amen.`,
  hailHolyQueen: `Hail, holy Queen, Mother of mercy,  
our life, our sweetness, and our hope.  
To thee do we cry, poor banished children of Eve;  
to thee do we send up our sighs, mourning and weeping in this valley of tears.  
Turn then, most gracious Advocate, thine eyes of mercy toward us;  
and after this our exile, show unto us the blessed fruit of thy womb, Jesus.  
O clement, O loving, O sweet Virgin Mary.`,
  closingDialogue: `V. Pray for us, O holy Mother of God.  
R. That we may be made worthy of the promises of Christ.`,
  closingPrayer: `Let us pray:  
O God, whose only begotten Son, by His life, death, and resurrection,  
has purchased for us the rewards of eternal life;  
grant, we beseech You,  
that by meditating upon these mysteries of the Most Holy Rosary of the Blessed Virgin Mary,  
we may imitate what they contain and obtain what they promise,  
through the same Christ our Lord. Amen.`,
  signOfTheCross: "In the name of the Father, and of the Son, and of the Holy Spirit. Amen."
},

vi: {
  signOfTheCross: "Nhân danh Cha, và Con, và Thánh Thần. Amen.",
  apostlesCreed: `Tôi tin kính Đức Chúa Trời là Cha toàn năng, Đấng dựng nên trời đất;  
Tôi tin kính Đức Giêsu Kitô, Con Một Đức Chúa Cha, Chúa chúng tôi;  
Người được sinh bởi quyền phép Đức Chúa Thánh Thần, bởi trinh nữ Maria;  
Người chịu khổ dưới quyền quan Phongxiô Philatô, bị đóng đinh trên thập giá, chịu chết và mai táng;  
Người xuống ngục tổ tông;  
Ngày thứ ba, Người sống lại từ cõi chết;  
Người lên trời, ngự bên hữu Đức Chúa Cha toàn năng;  
Từ đó Người sẽ đến phán xét kẻ sống và kẻ chết.  
Tôi tin Đức Chúa Thánh Thần,  
Tôi tin Hội Thánh Công Giáo thánh thiện, thông công các thánh,  
Tôi tin sự tha tội, sự sống lại của xác phàm,  
và sự sống đời đời. Amen.`,
  ourFather: `Lạy Cha chúng con ở trên trời,  
Danh Cha cả sáng,  
Nước Cha trị đến,  
Ý Cha thể hiện dưới đất cũng như trên trời.  
Xin Cha ban cho chúng con hôm nay lương thực hằng ngày,  
Và tha nợ chúng con như chúng con cũng tha kẻ có nợ chúng con.  
Xin đừng để chúng con sa chước cám dỗ,  
Nhưng cứu chúng con khỏi sự dữ. Amen.`,
  hailMary: `Kính mừng Maria đầy ơn phúc,  
Đức Chúa Trời ở cùng Bà,  
Bà có phúc lạ hơn mọi người nữ,  
và Giêsu Con lòng Bà gồm phúc lạ.  
Thánh Maria, Đức Mẹ Chúa Trời,  
Cầu cho chúng con là kẻ có tội,  
khi nay và trong giờ lâm tử. Amen.`,
  gloryBe: `Sáng danh Đức Chúa Cha, và Đức Chúa Con, và Đức Chúa Thánh Thần,  
Như đã có từ thuở ban đầu,  
Nay và muôn đời muôn kiếp. Amen.`,
  fatima: `Lạy Chúa Giêsu, xin tha tội cho chúng con,  
Xin cứu chúng con khỏi hỏa ngục,  
Xin đưa các linh hồn lên thiên đàng,  
Nhất là những linh hồn cần đến lòng thương xót Chúa. Amen.`,
  hailHolyQueen: `Kính mừng Nữ Vương Thiên Đàng, Mẹ Nhân Lành,  
Đời chúng con, niềm vui, sự cậy trông.  
Chúng con kêu cầu Mẹ, những kẻ con cái lưu đầy tội lỗi.  
Chúng con thở than, khóc lóc trong thung lũng đắng cay.  
Xin Mẹ nhìn đến chúng con với ánh mắt từ bi.  
Sau cuộc đời lưu đày này, xin dẫn chúng con đến gặp Con Mẹ là Chúa Giêsu,  
Đấng đầy nhân từ, đầy yêu thương.`,
  closingDialogue: `V. Cầu cho chúng con, Mẹ Thiên Chúa.  
Đ. Để chúng con được xứng đáng với những lời hứa của Đức Kitô.`,
  closingPrayer: `Lạy Thiên Chúa, Đấng đã ban Con Một duy nhất của Ngài  
Qua cuộc sống, cái chết và sự phục sinh để chuộc tội cho chúng con;  
Xin cho chúng con nhờ suy niệm các mầu nhiệm Mân Côi của Mẹ Maria,  
Bắt chước những gì chúng chứa đựng và được hưởng những lời hứa,  
Nhờ chính Đức Kitô, Chúa chúng con. Amen.`,
},
tl: {
  signOfTheCross: "Sa ngalan ng Ama, at ng Anak, at ng Espiritu Santo. Amen.",

  apostlesCreed: `Sumasampalataya ako sa Diyos Amang makapangyarihan sa lahat, na may gawa ng langit at lupa.  
At kay Hesukristo, iisang Anak ng Diyos, Panginoon natin.  
Nagkatawang-tao Siya lalang ng Espiritu Santo, ipinanganak ni Santa Mariang Birhen.  
Nagpakasakit Siya sa ilalim ni Poncio Pilato, ipinako sa krus, namatay at inilibing.  
Nan descendió siya sa mga yumao, nang ikatlong araw ay muling nabuhay.  
Umakyat siya sa langit, naluluklok sa kanan ng Diyos Amang makapangyarihan sa lahat.  
Mula roo’y paririto Siya’t huhukom sa mga buhay at mga patay.  
Sumasampalataya ako sa Espiritu Santo, sa banal na Simbahang Katolika,  
sa kasamahan ng mga banal, sa kapatawaran ng mga kasalanan,  
sa pagkabuhay na muli ng mga namatay, at sa buhay na walang hanggan. Amen.`,

  ourFather: `Ama namin, sumasalangit Ka,  
Sambahin ang ngalan Mo.  
Mapasaamin ang kaharian Mo.  
Sundin ang loob Mo, dito sa lupa para nang sa langit.  
Bigyan Mo kami ngayon ng aming kakanin sa araw-araw.  
At patawarin Mo kami sa aming mga sala,  
para nang pagpapatawad namin sa mga nagkakasala sa amin.  
At huwag Mo kaming ipahintulot sa tukso,  
kundi iligtas Mo kami sa lahat ng masama. Amen.`,

  hailMary: `Aba Ginoong Maria, napupuno ka ng grasya,  
ang Panginoon ay sumasaiyo;  
pinagpala ka sa babaeng lahat,  
at pinagpala naman ang iyong anak na si Hesus.  
Santa Maria, Ina ng Diyos,  
ipanalangin mo kaming makasalanan,  
ngayon at kung kami’y mamamatay. Amen.`,

  gloryBe: `Luwalhati sa Ama, at sa Anak, at sa Espiritu Santo,  
gaya noong una, ngayon at magpakailanman. Amen.`,

  fatima: `O Hesus ko, patawarin Mo kami sa aming mga sala,  
iligtas Mo kami sa apoy ng impiyerno,  
dalhin Mo sa langit ang lahat ng kaluluwa,  
lalo na ang mga higit na nangangailangan ng Iyong awa. Amen.`,

  hailHolyQueen: `Aba Po, Santa Mariang Hari, Ina ng Awa,  
buhay, tamis, at pag-asa namin, aba Ginoo.  
Sa Iyo kami sumisigaw, mga anak ni Eva,  
Sa Iyo kami dumaraing, humihibik sa gitna ng lupang ito ng pagluha.  
Ibaling Mo sa amin ang Iyong mga matang maawain,  
at pagkatapos ng pagkakait sa amin,  
ipakita Mo sa amin si Hesus, ang mapagpalang bunga ng Iyong sinapupunan.  
O maawain, o mahinahon, o matamis na Birheng Maria.`,

  closingDialogue: `V. Ipanalangin mo kami, O Banal na Ina ng Diyos.  
R. Nang kami’y maging karapat-dapat sa mga pangako ni Kristo.`,

  closingPrayer: `Manalangin tayo:  
O Diyos, na sa pamamagitan ng buhay, pagkamatay, at muling pagkabuhay ng Iyong Bugtong na Anak,  
ay ipinagkaloob Mo sa amin ang gantimpala ng buhay na walang hanggan;  
ipagkaloob Mo, isinasamo namin,  
na sa pagninilay namin sa mga Misteryo ng Banal na Rosaryo  
ng Mahal na Birheng Maria,  
ay maisabuhay namin ang mga nilalaman nito  
at matamo ang mga ipinangako nito.  
Sa pamamagitan ni Hesukristo, aming Panginoon. Amen.`,
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
  signOfTheCross: "Tanda ng Krus",
  apostlesCreed: "Sumasampalataya Ako",
  ourFather: "Ama Namin",
  threeHailMarys: "Tatlong Aba Ginoong Maria",
  gloryBe: "Luwalhati sa Ama",
  mystery: "Misteryo",
  tenHailMarys: "Sampung Aba Ginoong Maria",
  fatimaPrayer: "Dasal ng Fatima",
  hailHolyQueen: "Aba Po, Santa Mariang Hari",
  closingDialogue: "Panalangin sa Wakas",
  closingPrayer: "Pangwakas na Panalangin",
  signOfTheCross: "Tanda ng Krus"
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
  Sorrowful: "Misteryong Malungkot",
  Glorious: "Misteryong Maluwalhati",
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
