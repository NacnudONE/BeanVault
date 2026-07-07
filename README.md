# BeanVault ☕

Інтернет-магазин кави побудований на React + TypeScript + Vite. Повноцінний e-commerce з каталогом товарів, кошиком, оформленням замовлення, блогом і сторінкою «Про нас».

**Live:** https://nacnudone.github.io/BeanVault/

---

## Стек технологій

| Категорія    | Технологія                         |
|--------------|------------------------------------|
| UI           | React 19, TypeScript               |
| Роутинг      | React Router v7                    |
| Збірка       | Vite 8                             |
| Тестування   | Vitest, Testing Library            |
| Лінтер       | Oxlint                             |
| Deploy       | GitHub Pages (gh-pages)            |

---

## Функціонал

- Каталог товарів з фільтрацією та детальними сторінками
- Кошик з управлінням кількістю та збереженням стану (Context API)
- Оформлення замовлення (Checkout)
- Блог з окремими статтями
- Сторінка «Про нас» з командою, таймлайном та цінностями
- Контактна форма
- Toast-сповіщення
- Кнопка «Back to Top»

---

## Запуск

```bash
npm install
npm run dev
```

| Команда         | Дія                              |
|-----------------|----------------------------------|
| `npm run dev`   | Dev-сервер (HMR)                 |
| `npm run build` | Продакшн-збірка                  |
| `npm run test`  | Тести у watch-режимі             |
| `npm run test:run` | Тести одноразово              |
| `npm run lint`  | Oxlint перевірка                 |
| `npm run deploy`| Збірка + публікація на gh-pages  |

---

## Структура

```
src/
├── components/   # Header, Footer, ProductCard, Toast …
├── pages/        # Home, Shop, Cart, Checkout, About, Blog, Contact …
├── context/      # CartContext, ToastContext
├── data/         # Статичні дані (products, blog, team …)
├── hooks/        # useScrollState
└── __tests__/    # Unit-тести
```

---

## Contributors

| Аватар | Ім'я | Роль |
|--------|------|------|
| [![Denis Kobilasnij](https://github.com/NacnudONE.png?size=60)](https://github.com/NacnudONE) | **Denis Kobilasnij** | Author & Developer |

---

## Ліцензія

MIT
