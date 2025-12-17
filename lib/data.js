export const agents = [
  {
    slug: "jonas-woo",
    name: "Jonas Woo",
    title: {
      en: "Star Residences KLCC specialist",
      "zh-cn": "Star Residences KLCC 专属顾问"
    },
    whatsapp: "60123456789"
  },
  {
    slug: "joan-lew",
    name: "Joan Lew",
    title: {
      en: "KLCC & TRX project focus",
      "zh-cn": "KLCC 与 TRX 项目顾问"
    },
    whatsapp: "60129876543"
  }
];

export const properties = [
  {
    id: 1,
    slug: "star-residences-klcc-high-floor-3r2b",
    category: "condo",
    title: {
      en: "Star Residences KLCC high floor 3R2B",
      "zh-cn": "Star Residences KLCC 高楼层 3房2浴"
    },
    projectSlug: "star-residences-klcc",
    projectName: "Star Residences KLCC",
    location: {
      en: "KLCC, Kuala Lumpur",
      "zh-cn": "吉隆坡 KLCC"
    },
    priceMyr: 1850000,
    bedrooms: 3,
    bathrooms: 2,
    builtUp: 1250,
    tenure: "Freehold",
    furnishing: "Fully furnished show-unit style",
    facing: "KLCC view",
    description: {
      en: "High floor 3-bedroom unit in Star Residences KLCC, suitable for own stay or investment with strong rental demand from professionals.",
      "zh-cn": "Star Residences KLCC 高楼层 3房单位，适合自住或投资，长期有专业人士租赁需求。"
    },
    agentSlugs: ["jonas-woo", "joan-lew"]
  },
  {
    id: 2,
    slug: "star-suites-klcc-service-apartment",
    category: "condo",
    title: {
      en: "Star Suites KLCC service apartment",
      "zh-cn": "Star Suites KLCC 服务式公寓"
    },
    projectSlug: "star-suites-klcc",
    projectName: "Star Suites KLCC",
    location: {
      en: "Opposite KLCC, Kuala Lumpur",
      "zh-cn": "吉隆坡 KLCC 对面"
    },
    priceMyr: 1650000,
    bedrooms: 2,
    bathrooms: 2,
    builtUp: 900,
    tenure: "Freehold",
    furnishing: "Fully furnished, move-in ready",
    facing: "City view",
    description: {
      en: "Service apartment operated as hospitality unit, walking distance to KLCC, with ready setup for short-stay operation.",
      "zh-cn": "可作为酒店式运营的服务公寓，步行可达 KLCC，短租运营配置齐全。"
    },
    agentSlugs: ["jonas-woo"]
  },
  {
    id: 3,
    slug: "trx-residence-2r2b-city-view",
    category: "condo",
    title: {
      en: "TRX Residence 2R2B city view",
      "zh-cn": "TRX Residence 城市景观 2房2浴"
    },
    projectSlug: "trx-residence",
    projectName: "TRX Residence",
    location: {
      en: "TRX, Kuala Lumpur",
      "zh-cn": "吉隆坡 TRX 金融区"
    },
    priceMyr: 1900000,
    bedrooms: 2,
    bathrooms: 2,
    builtUp: 950,
    tenure: "Freehold",
    furnishing: "Partially furnished by developer",
    facing: "City / TRX mall",
    description: {
      en: "2-bedroom unit in TRX Residence with direct connection to TRX mall and MRT, suitable for young professionals.",
      "zh-cn": "位于 TRX Residence 的 2房单位，直通 TRX 购物中心与 MRT，适合年轻专业人士。"
    },
    agentSlugs: ["joan-lew"]
  },
  {
    id: 4,
    slug: "pavilion-square-bukit-bintang-2r2b",
    category: "condo",
    title: {
      en: "Pavilion Square Bukit Bintang 2R2B",
      "zh-cn": "Pavilion Square 武吉免登 2房2浴"
    },
    projectSlug: "pavilion-square",
    projectName: "Pavilion Square",
    location: {
      en: "Bukit Bintang, Kuala Lumpur",
      "zh-cn": "吉隆坡 武吉免登"
    },
    priceMyr: 2200000,
    bedrooms: 2,
    bathrooms: 2,
    builtUp: 980,
    tenure: "Freehold",
    furnishing: "Fully furnished with Pavilion style interior",
    facing: "City / Bukit Bintang skyline",
    description: {
      en: "Pavilion-branded residence in the heart of Bukit Bintang with direct access to shopping and F&B.",
      "zh-cn": "位于武吉免登核心地段的 Pavilion 系列公寓，楼下即是购物与餐饮配套。"
    },
    agentSlugs: ["jonas-woo", "joan-lew"]
  },
  {
    id: 5,
    slug: "orion-residences-klcc-3r2b",
    category: "condo",
    title: {
      en: "Orion Residences KLCC 3R2B",
      "zh-cn": "Orion Residences KLCC 3房2浴"
    },
    projectSlug: "orion-residences",
    projectName: "Orion Residences",
    location: {
      en: "Jalan Yap Kwan Seng, KLCC",
      "zh-cn": "KLCC 叶观盛路 一带"
    },
    priceMyr: 2100000,
    bedrooms: 3,
    bathrooms: 2,
    builtUp: 1350,
    tenure: "Freehold",
    furnishing: "Partially furnished with kitchen & wardrobe",
    facing: "KLCC / city skyline",
    description: {
      en: "KLCC fringe residence with efficient 3-bedroom layout, suitable for families who want to stay close to the city centre.",
      "zh-cn": "位于 KLCC 边缘地段的 3房单位，格局方正，适合希望贴近市中心生活的家庭。"
    },
    agentSlugs: ["joan-lew"]
  },
  {
    id: 6,
    slug: "ritz-carlton-residences-kl-2r2b",
    category: "condo",
    title: {
      en: "The Ritz-Carlton Residences Kuala Lumpur 2R2B",
      "zh-cn": "吉隆坡丽思卡尔顿公寓 2房2浴"
    },
    projectSlug: "ritz-carlton-residences-kl",
    projectName: "The Ritz-Carlton Residences Kuala Lumpur",
    location: {
      en: "Jalan Sultan Ismail, Kuala Lumpur",
      "zh-cn": "吉隆坡 苏丹依斯迈路"
    },
    priceMyr: 3200000,
    bedrooms: 2,
    bathrooms: 2,
    builtUp: 1150,
    tenure: "Freehold",
    furnishing: "Fully furnished luxury residence",
    facing: "City / skyline",
    description: {
      en: "Branded residence managed by The Ritz-Carlton with full hotel-style facilities and services.",
      "zh-cn": "由丽思卡尔顿管理的品牌公寓，享有酒店式设施与服务，定位高端自住与长线资产配置。"
    },
    agentSlugs: ["jonas-woo"]
  },
  {
    id: 7,
    slug: "pavilion-damansara-heights-2r2b-7",
    category: "condo",
    title: {
      en: "Pavilion Damansara Heights 2R2B",
      "zh-cn": "Pavilion 白沙罗高地 2房2浴"
    },
    projectSlug: "pavilion-damansara-heights",
    projectName: "Pavilion Damansara Heights",
    location: {
      en: "Damansara Heights, Kuala Lumpur",
      "zh-cn": "吉隆坡 白沙罗高地"
    },
    priceMyr: 1900000,
    bedrooms: 2,
    bathrooms: 2,
    builtUp: 950,
    tenure: "Freehold",
    furnishing: "Partially furnished by developer",
    facing: "Damansara Heights / city view",
    description: {
      en: "Integrated development above lifestyle mall in Damansara Heights with good connectivity to the city centre.",
      "zh-cn": "位于白沙罗高地的综合发展项目，楼下为生活购物商场，交通方便直达市中心。"
    },
    agentSlugs: ["joan-lew", "jonas-woo"]
  },
  {
    id: 8,
    slug: "pavilion-damansara-heights-2r2b-8",
    category: "condo",
    title: {
      en: "Pavilion Damansara Heights 2R2B",
      "zh-cn": "Pavilion 白沙罗高地 2房2浴"
    },
    projectSlug: "pavilion-damansara-heights",
    projectName: "Pavilion Damansara Heights",
    location: {
      en: "Damansara Heights, Kuala Lumpur",
      "zh-cn": "吉隆坡 白沙罗高地"
    },
    priceMyr: 1900000,
    bedrooms: 2,
    bathrooms: 2,
    builtUp: 950,
    tenure: "Freehold",
    furnishing: "Partially furnished by developer",
    facing: "Damansara Heights / city view",
    description: {
      en: "Integrated development above lifestyle mall in Damansara Heights with good connectivity to the city centre.",
      "zh-cn": "位于白沙罗高地的综合发展项目，楼下为生活购物商场，交通方便直达市中心。"
    },
    agentSlugs: ["joan-lew", "jonas-woo"]
  },
  {
    id: 9,
    slug: "pavilion-damansara-heights-2r2b-9",
    category: "condo",
    title: {
      en: "Pavilion Damansara Heights 2R2B",
      "zh-cn": "Pavilion 白沙罗高地 2房2浴"
    },
    projectSlug: "pavilion-damansara-heights",
    projectName: "Pavilion Damansara Heights",
    location: {
      en: "Damansara Heights, Kuala Lumpur",
      "zh-cn": "吉隆坡 白沙罗高地"
    },
    priceMyr: 1900000,
    bedrooms: 2,
    bathrooms: 2,
    builtUp: 950,
    tenure: "Freehold",
    furnishing: "Partially furnished by developer",
    facing: "Damansara Heights / city view",
    description: {
      en: "Integrated development above lifestyle mall in Damansara Heights with good connectivity to the city centre.",
      "zh-cn": "位于白沙罗高地的综合发展项目，楼下为生活购物商场，交通方便直达市中心。"
    },
    agentSlugs: ["joan-lew", "jonas-woo"]
  },
  {
    id: 10,
    slug: "pavilion-damansara-heights-2r2b-10",
    category: "condo",
    title: {
      en: "Pavilion Damansara Heights 2R2B",
      "zh-cn": "Pavilion 白沙罗高地 2房2浴"
    },
    projectSlug: "pavilion-damansara-heights",
    projectName: "Pavilion Damansara Heights",
    location: {
      en: "Damansara Heights, Kuala Lumpur",
      "zh-cn": "吉隆坡 白沙罗高地"
    },
    priceMyr: 1900000,
    bedrooms: 2,
    bathrooms: 2,
    builtUp: 950,
    tenure: "Freehold",
    furnishing: "Partially furnished by developer",
    facing: "Damansara Heights / city view",
    description: {
      en: "Integrated development above lifestyle mall in Damansara Heights with good connectivity to the city centre.",
      "zh-cn": "位于白沙罗高地的综合发展项目，楼下为生活购物商场，交通方便直达市中心。"
    },
    agentSlugs: ["joan-lew", "jonas-woo"]
  },
  {
    id: 11,
    slug: "pavilion-damansara-heights-2r2b-11",
    category: "condo",
    title: {
      en: "Pavilion Damansara Heights 2R2B",
      "zh-cn": "Pavilion 白沙罗高地 2房2浴"
    },
    projectSlug: "pavilion-damansara-heights",
    projectName: "Pavilion Damansara Heights",
    location: {
      en: "Damansara Heights, Kuala Lumpur",
      "zh-cn": "吉隆坡 白沙罗高地"
    },
    priceMyr: 1900000,
    bedrooms: 2,
    bathrooms: 2,
    builtUp: 950,
    tenure: "Freehold",
    furnishing: "Partially furnished by developer",
    facing: "Damansara Heights / city view",
    description: {
      en: "Integrated development above lifestyle mall in Damansara Heights with good connectivity to the city centre.",
      "zh-cn": "位于白沙罗高地的综合发展项目，楼下为生活购物商场，交通方便直达市中心。"
    },
    agentSlugs: ["joan-lew", "jonas-woo"]
  },
  {
    id: 12,
    slug: "pavilion-damansara-heights-2r2b-12",
    category: "condo",
    title: {
      en: "Pavilion Damansara Heights 2R2B",
      "zh-cn": "Pavilion 白沙罗高地 2房2浴"
    },
    projectSlug: "pavilion-damansara-heights",
    projectName: "Pavilion Damansara Heights",
    location: {
      en: "Damansara Heights, Kuala Lumpur",
      "zh-cn": "吉隆坡 白沙罗高地"
    },
    priceMyr: 1900000,
    bedrooms: 2,
    bathrooms: 2,
    builtUp: 950,
    tenure: "Freehold",
    furnishing: "Partially furnished by developer",
    facing: "Damansara Heights / city view",
    description: {
      en: "Integrated development above lifestyle mall in Damansara Heights with good connectivity to the city centre.",
      "zh-cn": "位于白沙罗高地的综合发展项目，楼下为生活购物商场，交通方便直达市中心。"
    },
    agentSlugs: ["joan-lew", "jonas-woo"]
  },
  {
    id: 13,
    slug: "pavilion-damansara-heights-2r2b-13",
    category: "condo",
    title: {
      en: "Pavilion Damansara Heights 2R2B",
      "zh-cn": "Pavilion 白沙罗高地 2房2浴"
    },
    projectSlug: "pavilion-damansara-heights",
    projectName: "Pavilion Damansara Heights",
    location: {
      en: "Damansara Heights, Kuala Lumpur",
      "zh-cn": "吉隆坡 白沙罗高地"
    },
    priceMyr: 1900000,
    bedrooms: 2,
    bathrooms: 2,
    builtUp: 950,
    tenure: "Freehold",
    furnishing: "Partially furnished by developer",
    facing: "Damansara Heights / city view",
    description: {
      en: "Integrated development above lifestyle mall in Damansara Heights with good connectivity to the city centre.",
      "zh-cn": "位于白沙罗高地的综合发展项目，楼下为生活购物商场，交通方便直达市中心。"
    },
    agentSlugs: ["joan-lew", "jonas-woo"]
  }
];


export const projects = [
  {
    slug: "star-residences-klcc",
    category: "condo",
    name: {
      en: "Star Residences KLCC",
      "zh-cn": "Star Residences KLCC 公寓"
    },
    summary: {
      en: "Iconic luxury condominium directly opposite KLCC Twin Towers with three residential towers and commercial podium.",
      "zh-cn": "位于双子塔对面的高端公寓项目，包含多座住宅大楼与商业裙楼。"
    },
    location: {
      en: "KLCC, Kuala Lumpur",
      "zh-cn": "吉隆坡 KLCC"
    },
    launchStatus: "Completed & actively transacting",
    phase: "Phase 1–3 handed over",
    expectedCompletion: "Completed",
    personInChargeSlug: "jonas-woo",
    memberSlugs: ["joan-lew"],
    propertySlugs: ["star-residences-klcc-high-floor-3r2b"]
  },
  {
    slug: "star-suites-klcc",
    category: "condo",
    name: {
      en: "Star Suites KLCC",
      "zh-cn": "Star Suites KLCC 服务式公寓"
    },
    summary: {
      en: "Service residence tower positioned for hospitality operation and long-stay tenants opposite KLCC.",
      "zh-cn": "主打酒店式与长租运营的服务式公寓，位于 KLCC 对面。"
    },
    location: {
      en: "Opposite KLCC, Kuala Lumpur",
      "zh-cn": "吉隆坡 KLCC 对面"
    },
    launchStatus: "Completed & operating",
    phase: "Single tower",
    expectedCompletion: "Completed",
    personInChargeSlug: "joan-lew",
    memberSlugs: ["jonas-woo"],
    propertySlugs: ["star-suites-klcc-service-apartment"]
  },
  {
    slug: "trx-residence",
    category: "condo",
    name: {
      en: "TRX Residence",
      "zh-cn": "TRX Residence 公寓"
    },
    summary: {
      en: "Residential component of Tun Razak Exchange (TRX) with direct connection to TRX Mall and MRT interchange.",
      "zh-cn": "TRX 国际金融区的住宅项目，直通 TRX 购物中心与 MRT 站。"
    },
    location: {
      en: "TRX, Kuala Lumpur",
      "zh-cn": "吉隆坡 TRX 金融区"
    },
    launchStatus: "Under construction / handover in progress",
    phase: "Phase 1",
    expectedCompletion: "Target around 2026 (for demo text)",
    personInChargeSlug: "jonas-woo",
    memberSlugs: ["joan-lew"],
    propertySlugs: ["trx-residence-2r2b-city-view"]
  }
];

export function getPropertyBySlug(slug) {
  return properties.find((p) => p.slug === slug);
}

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug);
}

export function getAgentBySlug(slug) {
  return agents.find((a) => a.slug === slug);
}
