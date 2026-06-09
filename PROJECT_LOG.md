# Turko — Project Log

## О проекте
Сайт учебного центра безопасности **Turko Õppekeskus OÜ** (Таллин, Эстония).

- **Домен:** https://turvakoolitus.eu
- **Стек:** Next.js 14, TypeScript, Tailwind CSS, next-intl (ET/RU), nodemailer (Gmail SMTP)
- **GitHub репо:** https://github.com/filipprochenkov-netizen/turko-site
- **Временный Vercel URL:** https://turko-site.vercel.app

---

## Хостинг и домен

| Роль | Сервис | Детали |
|---|---|---|
| Регистратор домена | Zone.ee | Платит клиент, ~раз в год |
| DNS | ~~Compic / fiber.ee~~ → **Cloudflare** | ✅ Переключено 09.06.2026. NS: `athena.ns.cloudflare.com`, `nick.ns.cloudflare.com` |
| Хостинг нового сайта | Vercel (бесплатный план) | https://vercel.com — деплой автоматический из GitHub |
| Старый хостинг (отменить!) | Compic OÜ | compic.ee, IP: 188.92.160.14, сервер h6.compic.ee |

### Важно
- **⚠️ Expiry Date Compic: 01.07.2026** — **ОТМЕНИТЬ ДО ЭТОЙ ДАТЫ**
- **Автопродление у Compic включено** — если не отменить до 01.07, спишут деньги
- Почта `info@turvakoolitus.eu` пока ещё на Compic — **сначала настроить Google Workspace, потом отменять Compic**

---

## Что было сделано

### 1. Переключение домена на Vercel
Изменены DNS-записи в DirectAdmin (Compic):
- `A @ 188.92.160.14` → `A @ 216.198.79.1` (Vercel IP)
- `www A 188.92.160.14` → `www A 216.198.79.1`
- Удалена `AAAA @ 2a02:e80:0:200::14` (мешала Vercel)
- MX-запись (почта) — **не трогали**

### 2. Оптимизация изображений
Файл `public/Illustarations/Turko_map.jpg` весил 4.18 МБ и грузился 22 сек.
Исправлено: заменён `<img>` на Next.js `<Image>` компонент в `app/[locale]/kursused/koolitus/page.tsx`

### 3. Redirects для старых URL
Добавлены в `next.config.js` — старые URL (без /et/ или /ru/) перенаправляют на новые.
Например: `/kursused` → `/et/kursused`

### 4. Google Search Console
- Добавлен ресурс `https://www.turvakoolitus.eu`
- Подтверждение через DNS TXT запись
- Sitemap отправлен как `/sitemap.xml`

### 5. Перенос DNS на Cloudflare ✅
- Зарегистрирован аккаунт Cloudflare на `Filipprochenkov@gmail.com`
- Домен `turvakoolitus.eu` добавлен через "Connect a domain"
- Cloudflare автоматически импортировал все DNS-записи с Compic
- В Zone.ee сменены NS-серверы: `ns.fiber.ee` / `ns2.fiber.ee` → `athena.ns.cloudflare.com` / `nick.ns.cloudflare.com`
- Переключение подтверждено 09.06.2026

### 6. Sitemap ⏳ В ПРОЦЕССЕ (технически исправлено, ждём GSC)

**Проблема:** `/sitemap.xml` возвращал 500 на Vercel.

**Причина:** `next-intl ^4.9.0` на Vercel Edge Runtime неправильно обрабатывал сложный matcher с явным списком расширений (`.*\\.(?:svg|png|...|xml|...)`). Middleware перехватывал `/sitemap.xml`, не находил валидный locale-префикс и падал с 500.

**Что сделано:**
1. `middleware.ts` — matcher заменён на официальный паттерн next-intl 4.x:
   `'/((?!api|_next|_vercel|.*\\..*).*)'`
   Ключевое изменение: `.*\\..*` исключает **любой путь с точкой** (т.е. любой файл с расширением) — проще и надёжнее явного списка.
2. `app/sitemap.ts` — создан статический route handler (надёжнее чем `public/sitemap.xml`, т.к. это явный Next.js маршрут без конфликтов с Edge).
3. `app/robots.ts` — создан, разрешает всем краулерам и указывает на sitemap.
4. Sitemap подтверждён в браузере: `https://turvakoolitus.eu/sitemap.xml` отдаёт валидный XML с 34 URL.
5. Sitemap отправлен в Google Search Console повторно (09.06.2026) — ожидаем обработки.

---

## Структура проекта

```
app/
  [locale]/
    page.tsx               — главная страница
    kursused/              — страницы курсов
      valvetootaja-tase-3/
      turvatootaja-tase-4/
      turvajuht-tase-5/
      taiendope/
      koolituskalender/
      koolitus/
    meiest/                — о центре
      tegevuse-alus/
      noustamine/
      partnerid/
      oppetoo/
    kontaktid/
    paring/
    treeningud/
    koolituskalender/
    koolitus/
    registreerimine/
  api/
    send-email/route.ts    — форма отправки письма через Gmail SMTP
app/
  sitemap.ts               — генерирует /sitemap.xml (34 URL, ET+RU)
  robots.ts                — генерирует /robots.txt, ссылается на sitemap
public/
  sitemap.xml              — статический резерв (основной — app/sitemap.ts)
  Illustarations/          — изображения
middleware.ts              — next-intl локализация (ET/RU)
next.config.js             — redirects со старых URL
i18n/routing.ts            — locales: ['et', 'ru'], defaultLocale: 'et'
```

---

## Переменные окружения (Vercel)

| Переменная | Назначение |
|---|---|
| `GMAIL_USER` | Отправка писем с форм |
| `GMAIL_APP_PASSWORD` | Пароль приложения Gmail |

---

## Нерешённые задачи

1. **Sitemap GSC** — ⏳ Технически исправлено (08.06.2026), файл отдаёт валидный XML. Ожидаем пока Google Search Console подтвердит статус «Успешно» (краулер ещё не обработал, повторно отправлен 09.06.2026)
2. ~~**Перенос DNS на Cloudflare**~~ — ✅ Сделано 09.06.2026
3. **Почта** — настроить Google Workspace для `info@turvakoolitus.eu`:
   - Зарегистрироваться на workspace.google.com (тариф Business Starter, ~6€/мес)
   - Подтвердить домен через TXT-запись в Cloudflare
   - Добавить MX-записи Google в Cloudflare
   - Добавить SPF / DKIM записи
   - Проверить что почта работает
4. **Отмена Compic** — ⚠️ до 01.07.2026. Отменять ТОЛЬКО после того как Google Workspace заработает

---

## Почта — текущая ситуация

| Адрес | Статус |
|---|---|
| `turko@hot.ee` | Платный, неудобный сервис online.ee — клиент хочет отказаться |
| `info@turvakoolitus.eu` | Хостится на Compic (IP 188.92.160.14). Настроена как "Отправить как" в Gmail, но SMTP не работает (ошибка при отправке). MX → `mail.turvakoolitus.eu` |

**Решение:** Google Workspace — `info@turvakoolitus.eu` станет полноценным Gmail-ящиком.

---

## Безопасность клиента

- Проверены адреса на [haveibeenpwned.com](https://haveibeenpwned.com)
- **Wattpad (июнь 2020)** — утекли пароли (bcrypt). Рекомендовано сменить пароли на важных сервисах
- **Bureau van Dijk (август 2021)** — утекли публичные бизнес-данные (email, телефон, адрес). Паролей нет, угрозы прямой нет
- Рекомендовано: включить **2FA на Gmail** → [myaccount.google.com/security](https://myaccount.google.com/security)
- Рекомендовано: использовать **Bitwarden** (bitwarden.com) для хранения всех паролей

---

## Текущее состояние middleware.ts

```typescript
import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

export default createMiddleware(routing)

export const config = {
  matcher: [
    // Официальный паттерн next-intl 4.x:
    // исключает api, _next, _vercel и любые пути с точкой (файлы с расширением)
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
}
```
