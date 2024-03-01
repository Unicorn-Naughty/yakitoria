export function getProduct(productId) {
  let matchProd;
  products.forEach((product) => {
    if (product.id === productId) {
      matchProd = product;
    }
  });
  return matchProd;
}

export const products = [
  {
    image: "pics/items/1.webp",
    name: "Гора Такао",
    weight: 1270,
    cost: 2700,
    id: "1e1b1ew",
  },
  {
    image: "pics/items/2.webp",
    name: "Музей Нэдзу",
    weight: 1010,
    cost: 2040,
    id: "2e2b2ew",
  },
  {
    image: "pics/items/3.webp",
    name: "Парк Сумида",
    weight: 810,
    cost: 1480,
    id: "3e3b13ew",
  },
  {
    image: "pics/items/4.webp",
    name: "Гора Такао",
    weight: 1270,
    cost: 2700,
    id: "4e4b4ew",
  },
  {
    image: "pics/items/5.webp",
    name: "Храм Мейдзи ",
    weight: 660,
    cost: 1160,
    id: "5e5b5ew",
  },
  {
    image: "pics/items/6.webp",
    name: "Сет Бенефит",
    weight: 1873,
    cost: 4700,
    id: "6e6b6ew",
  },
  {
    image: "pics/items/7.webp",
    name: "Сакура Сет",
    weight: 1220,
    cost: 3600,
    id: "7e7b7ew",
  },
  {
    image: "pics/items/2.webp",
    name: "Булиала Алибуала",
    weight: 910,
    cost: 1840,
    id: "8e8b8ew",
  },
  {
    image: "pics/items/3.webp",
    name: "Гейша",
    weight: 1100,
    cost: 1580,
    id: "9e9b19ew",
  },
  {
    image: "pics/items/4.webp",
    name: "Фила Мяу",
    weight: 1370,
    cost: 2750,
    id: "10e10b10ew",
  },
];
