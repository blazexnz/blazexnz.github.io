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
Sorrowful: [
      {
        title: "The Agony in the Garden",
        scripture: "“He began to be sorrowful and troubled.” — Matthew 26:37-38",
        reflection: "Jesus accepts God's will in his suffering. We pray for courage in our own trials.",
        fruit: "Fruit of the Mystery: Contrition"
      },
      {
        title: "The Scourging at the Pillar",
        scripture: "“Pilate had Jesus flogged.” — John 19:1",
        reflection: "Jesus endures pain for our sins. We pray for purity and self-control.",
        fruit: "Fruit of the Mystery: Purity"
      },
      {
        title: "The Crowning with Thorns",
        scripture: "“They placed a crown of thorns on his head.” — Matthew 27:29",
        reflection: "Jesus accepts humiliation. We pray for humility and patience.",
        fruit: "Fruit of the Mystery: Moral Courage"
      },
      {
        title: "The Carrying of the Cross",
        scripture: "“He carried his cross to the place of crucifixion.” — John 19:17",
        reflection: "Jesus carries our burdens. We pray for strength to carry our crosses.",
        fruit: "Fruit of the Mystery: Perseverance"
      },
      {
        title: "The Crucifixion",
        scripture: "“Jesus died on the cross for us.” — John 19:30",
        reflection: "Jesus gives his life for salvation. We pray for salvation and love.",
        fruit: "Fruit of the Mystery: Salvation"
      }
    ],
    Glorious: [
      {
        title: "The Resurrection",
        scripture: "“He is not here; he has risen!” — Luke 24:6",
        reflection: "Jesus conquers death and opens heaven. We pray for faith and hope.",
        fruit: "Fruit of the Mystery: Faith"
      },
      {
        title: "The Ascension",
        scripture: "“Jesus was taken up into heaven.” — Luke 24:51",
        reflection: "Jesus returns to the Father and prepares for the Spirit. We pray for longing for heaven.",
        fruit: "Fruit of the Mystery: Hope"
      },
      {
        title: "The Descent of the Holy Spirit",
        scripture: "“They were all filled with the Holy Spirit.” — Acts 2:4",
        reflection: "The Spirit empowers the Church. We pray for the gifts of the Holy Spirit.",
        fruit: "Fruit of the Mystery: Charity"
      },
      {
        title: "The Assumption",
        scripture: "Mary was taken body and soul into heavenly glory. — Tradition",
        reflection: "Mary is honored as Queen of Heaven. We pray for grace to follow her example.",
        fruit: "Fruit of the Mystery: Grace of a Happy Death"
      },
      {
        title: "The Coronation of Mary",
        scripture: "Mary is crowned Queen of Heaven and Earth. — Tradition",
        reflection: "Mary is crowned Queen of Heaven and Earth. We pray for devotion to Mary.",
        fruit: "Fruit of the Mystery: Trust in Mary’s Intercession"
      }
    ],
    Luminous: [
      {
        title: "The Baptism of Jesus in the Jordan",
        scripture: "“As soon as Jesus was baptized, he went up out of the water.” — Matthew 3:16-17",
        reflection: "Jesus begins his public ministry. We pray for the grace of baptism.",
        fruit: "Fruit of the Mystery: Openness to the Holy Spirit"
      },
      {
        title: "The Wedding at Cana",
        scripture: "“Jesus performed his first miracle, turning water into wine.” — John 2:1-11",
        reflection: "Jesus reveals his glory and compassion. We pray for faith in Jesus’ power.",
        fruit: "Fruit of the Mystery: To Jesus through Mary"
      },
      {
        title: "Jesus Proclaims the Kingdom of God",
        scripture: "“Repent, for the kingdom of heaven is at hand.” — Matthew 4:17",
        reflection: "Jesus calls us to conversion and faith. We pray for conversion of heart.",
        fruit: "Fruit of the Mystery: Repentance and Trust in God"
      },
      {
        title: "The Transfiguration",
        scripture: "“His face shone like the sun.” — Matthew 17:2",
        reflection: "Jesus reveals his divine glory. We pray for courage to witness our faith.",
        fruit: "Fruit of the Mystery: Desire for Holiness"
      },
      {
        title: "The Institution of the Holy Eucharist",
        scripture: "“This is my body given for you.” — Luke 22:19-20",
        reflection: "Jesus gives himself to us in the Eucharist. We pray for love and reverence for the Eucharist.",
        fruit: "Fruit of the Mystery: Adoration"
      }
    ]
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
    ],
Sorrowful: [
      {
        title: "Đau Khổ Trong Vườn Cây Dầu",
        scripture: "“Ngài bắt đầu sầu muộn và buồn bã.” — Matthew 26:37-38",
        reflection: "Chúa Giêsu chấp nhận ý muốn Chúa Cha trong đau khổ. Chúng ta cầu xin lòng can đảm trong thử thách.",
        fruit: "Hoa trái của Mầu Nhiệm: Ăn Năn Sám Hối"
      },
      {
        title: "Chúa Giêsu Bị Đánh Đòn",
        scripture: "“Philatô ra lệnh đánh đòn Chúa Giêsu.” — John 19:1",
        reflection: "Chúa Giêsu chịu đau đớn vì tội lỗi chúng ta. Chúng ta cầu xin sự trong sạch và kiềm chế.",
        fruit: "Hoa trái của Mầu Nhiệm: Sự Trong Sạch"
      },
      {
        title: "Chúa Giêsu Đội Vương Miện Tội Nhân",
        scripture: "“Họ đặt lên đầu Ngài một vương miện bằng gai.” — Matthew 27:29",
        reflection: "Chúa Giêsu chịu sỉ nhục. Chúng ta cầu xin đức khiêm nhường và kiên nhẫn.",
        fruit: "Hoa trái của Mầu Nhiệm: Lòng Can Đảm Đạo Đức"
      },
      {
        title: "Chúa Giêsu Mang Thập Giá",
        scripture: "“Ngài mang thập giá đến nơi chịu đóng đinh.” — John 19:17",
        reflection: "Chúa Giêsu mang gánh nặng cho chúng ta. Chúng ta cầu xin sức mạnh mang thập giá đời mình.",
        fruit: "Hoa trái của Mầu Nhiệm: Kiên Trì"
      },
      {
        title: "Chúa Giêsu Chịu Đóng Đinh",
        scripture: "“Chúa Giêsu chết trên thập giá vì chúng ta.” — John 19:30",
        reflection: "Chúa Giêsu hy sinh mạng sống để cứu độ. Chúng ta cầu xin ơn cứu rỗi và yêu thương.",
        fruit: "Hoa trái của Mầu Nhiệm: Sự Cứu Rỗi"
      }
    ],
    Glorious: [
      {
        title: "Phục Sinh",
        scripture: "“Ngài không còn ở đây, vì Ngài đã sống lại!” — Luke 24:6",
        reflection: "Chúa Giêsu chiến thắng tử thần và mở đường lên trời. Chúng ta cầu xin đức tin và hy vọng.",
        fruit: "Hoa trái của Mầu Nhiệm: Đức Tin"
      },
      {
        title: "Chúa Giêsu Lên Trời",
        scripture: "“Chúa Giêsu được đưa lên trời.” — Luke 24:51",
        reflection: "Chúa trở về cùng Cha và chuẩn bị Thánh Thần. Chúng ta cầu xin khao khát thiên đàng.",
        fruit: "Hoa trái của Mầu Nhiệm: Hy Vọng"
      },
      {
        title: "Chúa Thánh Thần Xuống",
        scripture: "“Mọi người đều đầy Thánh Thần.” — Acts 2:4",
        reflection: "Thánh Thần ban sức mạnh cho Hội Thánh. Chúng ta cầu xin ơn Thánh Thần.",
        fruit: "Hoa trái của Mầu Nhiệm: Đức Ái"
      },
      {
        title: "Mẹ Maria Lên Trời",
        scripture: "Maria được đưa lên trời cả hồn lẫn xác. — Truyền thống",
        reflection: "Mẹ Maria được tôn vinh là Nữ Vương trời đất. Chúng ta cầu xin ơn sống thánh thiện theo gương Mẹ.",
        fruit: "Hoa trái của Mầu Nhiệm: Ơn Chết Lành"
      },
      {
        title: "Mẹ Maria Được Vương Miện",
        scripture: "Maria được trao vương miện Nữ Vương trời đất. — Truyền thống",
        reflection: "Mẹ Maria được tôn vinh và là Đấng Bầu Cử cho chúng ta. Chúng ta cầu xin lòng tín thác nơi Mẹ.",
        fruit: "Hoa trái của Mầu Nhiệm: Tín Thác Vào Mẹ Maria"
      }
    ],
    Luminous: [
      {
        title: "Rửa Tội của Chúa Giêsu tại sông Jordan",
        scripture: "“Ngay khi Chúa Giêsu được rửa tội, Ngài lên khỏi nước.” — Matthew 3:16-17",
        reflection: "Chúa Giêsu bắt đầu sứ vụ công khai. Chúng ta cầu xin ơn rửa tội và đón nhận Thánh Thần.",
        fruit: "Hoa trái của Mầu Nhiệm: Sẵn Sàng Đón Nhận Thánh Thần"
      },
      {
        title: "Tiệc Cưới Cana",
        scripture: "“Chúa Giêsu làm phép lạ đầu tiên, biến nước thành rượu.” — John 2:1-11",
        reflection: "Chúa Giêsu tỏ mình ra và thương xót. Chúng ta cầu xin đức tin và lòng cậy trông nơi Ngài.",
        fruit: "Hoa trái của Mầu Nhiệm: Qua Maria đến với Chúa Giêsu"
      },
      {
        title: "Chúa Giêsu Rao Giảng Nước Thiên Chúa",
        scripture: "“Hãy ăn năn, vì Nước Thiên Chúa đã đến gần.” — Matthew 4:17",
        reflection: "Chúa kêu gọi sám hối và tin tưởng. Chúng ta cầu xin sự đổi mới trong tâm hồn.",
        fruit: "Hoa trái của Mầu Nhiệm: Ăn Năn và Tin Tưởng"
      },
      {
        title: "Biến Hình trên núi",
        scripture: "“Mặt Ngài chói lọi như mặt trời.” — Matthew 17:2",
        reflection: "Chúa tỏ vẻ huy hoàng. Chúng ta cầu xin dũng khí làm chứng đức tin.",
        fruit: "Hoa trái của Mầu Nhiệm: Khao Khát Thánh Thiện"
      },
      {
        title: "Thánh Thể được thiết lập",
        scripture: "“Đây là thân thể Thầy, hiến cho các con.” — Luke 22:19-20",
        reflection: "Chúa ban chính mình trong Thánh Thể. Chúng ta cầu xin lòng yêu mến và tôn kính Thánh Thể.",
        fruit: "Hoa trái của Mầu Nhiệm: Lòng Sùng Kính"
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
    ],
Sorrowful: [
      {
        title: "Ang Pagdurusa sa Hardin ng Getsemani",
        scripture: "“Siya ay nalungkot at nag-alala.” — Mateo 26:37-38",
        reflection: "Tinanggap ni Jesus ang kalooban ng Diyos sa kanyang paghihirap. Nagdarasal tayo para sa lakas sa ating mga pagsubok.",
        fruit: "Bunga ng Misteryo: Pagsisisi"
      },
      {
        title: "Ang Pagpalo kay Jesus",
        scripture: "“Pinapalo ni Pilato si Jesus.” — Juan 19:1",
        reflection: "Tinanggap ni Jesus ang sakit para sa ating mga kasalanan. Nagdarasal tayo para sa kadalisayan at pagpipigil sa sarili.",
        fruit: "Bunga ng Misteryo: Kadalisayan"
      },
      {
        title: "Ang Pagtatali ng Korona ng Tinik kay Jesus",
        scripture: "“Ipinuwesto nila ang korona ng mga tinik sa kanyang ulo.” — Mateo 27:29",
        reflection: "Tinanggap ni Jesus ang kahihiyan. Nagdarasal tayo para sa kababaang-loob at pagtitiis.",
        fruit: "Bunga ng Misteryo: Tapang ng Moralidad"
      },
      {
        title: "Ang Pagdadala ng Krus ni Jesus",
        scripture: "“Dinala niya ang kanyang krus patungo sa lugar ng pagpapako.” — Juan 19:17",
        reflection: "Dinala ni Jesus ang ating mga pasanin. Nagdarasal tayo para sa tibay sa pagdadala ng ating mga krus.",
        fruit: "Bunga ng Misteryo: Pagpupursige"
      },
      {
        title: "Ang Pagpapako kay Jesus sa Krus",
        scripture: "“Namatay si Jesus sa krus para sa atin.” — Juan 19:30",
        reflection: "Ibinigay ni Jesus ang kanyang buhay para sa kaligtasan. Nagdarasal tayo para sa kaligtasan at pag-ibig.",
        fruit: "Bunga ng Misteryo: Kaligtasan"
      }
    ],
    Glorious: [
      {
        title: "Ang Muling Pagkabuhay",
        scripture: "“Hindi Siya narito; Siya ay nabuhay na.” — Lucas 24:6",
        reflection: "Nawala ang kamatayan ni Jesus at binuksan ang langit. Nagdarasal tayo para sa pananampalataya at pag-asa.",
        fruit: "Bunga ng Misteryo: Pananampalataya"
      },
      {
        title: "Ang Pag-akyat sa Langit",
        scripture: "“Inakyat si Jesus sa langit.” — Lucas 24:51",
        reflection: "Bumalik si Jesus sa Ama at naghanda ng Espiritu Santo. Nagdarasal tayo para sa pagnanais sa langit.",
        fruit: "Bunga ng Misteryo: Pag-asa"
      },
      {
        title: "Ang Pagbaba ng Espiritu Santo",
        scripture: "“Puno sila ng Espiritu Santo.” — Mga Gawa 2:4",
        reflection: "Pinatibay ng Espiritu ang Simbahan. Nagdarasal tayo para sa mga kaloob ng Espiritu Santo.",
        fruit: "Bunga ng Misteryo: Pagmamahal"
      },
      {
        title: "Ang Pag-akyat ni Maria sa Langit",
        scripture: "Dinala si Maria ng katawan at kaluluwa sa kaluwalhatian ng langit. — Tradisyon",
        reflection: "Pinarangalan si Maria bilang Reyna ng Langit. Nagdarasal tayo para sa biyaya na sundin ang halimbawa Niya.",
        fruit: "Bunga ng Misteryo: Biyaya ng Mapayapang Kamatayan"
      },
      {
        title: "Ang Koronasyon ni Maria",
        scripture: "Si Maria ay koronahan bilang Reyna ng Langit at Lupa. — Tradisyon",
        reflection: "Si Maria ay koronahan bilang Reyna ng Langit at Lupa. Nagdarasal tayo para sa debosyon kay Maria.",
        fruit: "Bunga ng Misteryo: Tiwala sa Pananalangin ni Maria"
      }
    ],
    Luminous: [
      {
        title: "Ang Bautismo ni Jesus sa Jordan",
        scripture: "“Nang mabautismuhan si Jesus, siya ay umakyat mula sa tubig.” — Mateo 3:16-17",
        reflection: "Sinimulan ni Jesus ang kanyang ministeryo. Nagdarasal tayo para sa biyaya ng bautismo.",
        fruit: "Bunga ng Misteryo: Bukas sa Espiritu Santo"
      },
      {
        title: "Ang Kasalan sa Cana",
        scripture: "“Ginawa ni Jesus ang kanyang unang himala, pinalitan ang tubig ng alak.” — Juan 2:1-11",
        reflection: "Ipinakita ni Jesus ang kanyang kaluwalhatian at awa. Nagdarasal tayo para sa pananampalataya sa kapangyarihan Niya.",
        fruit: "Bunga ng Misteryo: Sa Jesus sa pamamagitan ni Maria"
      },
      {
        title: "Ipinahayag ni Jesus ang Kaharian ng Diyos",
        scripture: "“Magsisi kayo, sapagkat malapit na ang kaharian ng langit.” — Mateo 4:17",
        reflection: "Tinatawag tayo ni Jesus sa pagsisisi at pananampalataya. Nagdarasal tayo para sa pagbabago ng puso.",
        fruit: "Bunga ng Misteryo: Pagsisisi at Tiwala sa Diyos"
      },
      {
        title: "Ang Pagbabagong-anyo",
        scripture: "“Ang kanyang mukha ay nagniningning na parang araw.” — Mateo 17:2",
        reflection: "Ipinakita ni Jesus ang kanyang banal na kaluwalhatian. Nagdarasal tayo para sa tapang na ipahayag ang ating pananampalataya.",
        fruit: "Bunga ng Misteryo: Hangarin sa kabanalan"
      },
      {
        title: "Ang Institusyon ng Eukaristiya",
        scripture: "“Ito ang aking katawan na ibinibigay para sa inyo.” — Lucas 22:19-20",
        reflection: "Ibinigay ni Jesus ang kanyang sarili sa Eukaristiya. Nagdarasal tayo para sa pag-ibig at paggalang sa Eukaristiya.",
        fruit: "Bunga ng Misteryo: Pagsamba"
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
