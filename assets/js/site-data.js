/*
 * Website content is centralized here for easy expansion.
 * Add another award, patent or gallery item by appending one object to the matching array.
 */
window.PORTFOLIO_DATA = {
  profile: {
    name: "Yi-Tse Wu",
    nickname: "Ether",
    role: "Software Engineer · Photographer · Inventor",
    heroIntro: "以嵌入式系統與軟體工程為核心，持續探索資料應用、發明與攝影創作。",
    aboutPrimary: "我是一名軟體工程師，專注於嵌入式系統、韌體開發與系統整合。工作上重視可靠性、可維護性與實際落地；創作上則透過攝影觀察城市、人文與地景。",
    aboutSecondary: "這個網站用來整理競賽、專利與作品紀錄。內容採資料驅動方式建立，未來新增成果時，不需要重寫版面。",
    skills: ["Embedded Systems", "Firmware", "System Integration", "Photography", "Data Application"]
  },

  metrics: [
    { value: "2", label: "Competition Awards" },
    { value: "1", label: "Granted Patent" },
    { value: "∞", label: "Ongoing Projects" }
  ],

  awards: [
    {
      id: "photo-2026",
      category: "攝影競賽",
      year: "2026",
      title: "Asia International Geographic Photo Contest",
      result: "First Runner-Up",
      resultZh: "第一副優勝／亞軍",
      description: "以地理景觀與街道文化為觀察核心，作品在 2026 Asia International Geographic Photo Contest 獲得 First Runner-Up。",
      certificate: "assets/images/award-photo-2026.webp",
      certificateAlt: "2026 Asia International Geographic Photo Contest First Runner-Up 獎狀",
      featuredImage: "assets/images/photo-contest-work.webp",
      featuredAlt: "攝影競賽參賽作品：雨中的日本街景與牆面貼紙",
      tags: ["Photography", "Geography", "Street"]
    },
    {
      id: "data-2023",
      category: "創新資料應用競賽",
      year: "2023",
      title: "資料創新應用競賽",
      result: "銅獎",
      resultZh: "生活氣象多元應用組",
      description: "團隊「TTA 愛」參加 2023 資料創新應用競賽，在生活氣象多元應用組獲得銅獎。",
      certificate: "assets/images/award-data-2023.webp",
      certificateAlt: "2023 資料創新應用競賽銅獎獎狀",
      tags: ["Open Data", "Weather", "Teamwork"]
    }
  ],

  patents: [
    {
      number: "TWI714998B",
      title: "船舶警示監控系統",
      status: "Granted",
      inventors: ["王榮昌", "吳乙澤"],
      assignee: "國立臺灣海洋大學",
      filed: "2019-03-28",
      granted: "2021-01-01",
      summary: "整合超音波測距、溫度、水位與電壓感測，透過控制與無線傳輸機制，提供船舶近距離障礙與設備狀態的即時監控與預警。",
      url: "https://patents.google.com/patent/TWI714998B/zh"
    }
  ],

  gallery: [
    {
      title: "Urban Layers",
      subtitle: "2026 Photography Award Selection",
      image: "assets/images/photo-contest-work.webp",
      alt: "雨中的日本街道，左側牆面布滿貼紙，右側為市場入口",
      year: "2026"
    }
  ]
};
