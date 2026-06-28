# Turko — Project Log

## О проекте
Сайт учебного центра безопасности **Turko Õppekeskus OÜ** (Таллин, Эстония).

- **Домен:** https://turvakoolitus.eu
- **Стек:** Next.js 14, TypeScript, Tailwind CSS, next-intl (ET/RU), nodemailer (Gmail SMTP)
- **GitHub репо:** https://github.com/Turko-coder/turko-site (перенесён 13.06.2026)
- **Vercel URL:** https://turko-site.vercel.app (деплой пока на аккаунте Филиппа, переносится)

---

## Хостинг и домен

| Роль | Сервис | Детали |
|---|---|---|
| Регистратор домена | Zone.ee | Платит клиент, ~раз в год |
| DNS | **Cloudflare (аккаунт клиента)** | ✅ Перенесён на клиента 13.06.2026. NS: новые от аккаунта клиента |
| Хостинг нового сайта | Vercel | ⚠️ Пока на аккаунте Филиппа, переносится на аккаунт клиента |
| Старый хостинг (отменить!) | Compic OÜ | compic.ee — **ОТМЕНИТЬ ДО 01.07.2026** |

### Важно
- **⚠️ Expiry Date Compic: 01.07.2026** — **ОТМЕНИТЬ ДО ЭТОЙ ДАТЫ**
- **Автопродление у Compic включено** — если не отменить до 01.07, спишут деньги
- Почта настроена через Cloudflare Email Routing (аккаунт клиента) ✅

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

### 6. Sitemap ✅ Исправлено (12.06.2026)

**Проблема:** `/sitemap.xml` возвращал 500 на Vercel.

**Причина:** `next-intl ^4.9.0` на Vercel Edge Runtime неправильно обрабатывал сложный matcher с явным списком расширений (`.*\\.(?:svg|png|...|xml|...)`). Middleware перехватывал `/sitemap.xml`, не находил валидный locale-префикс и падал с 500.

**Что сделано (08–12.06.2026):**
1. `middleware.ts` — matcher заменён на официальный паттерн next-intl 4.x:
   `'/((?!api|_next|_vercel|.*\\..*).*)'`
2. `app/sitemap.ts` — создан Next.js route handler (надёжнее чем `public/sitemap.xml`).
3. `app/robots.ts` — создан, разрешает всем краулерам и указывает на sitemap.
4. Sitemap подтверждён в браузере: `https://turvakoolitus.eu/sitemap.xml` отдаёт валидный XML.
5. Sitemap отправлен в Google Search Console повторно (09.06.2026).

**Аудит и исправление URL в sitemap (12.06.2026):**
- **Исправлены неверные slugs:** `valvetootaja-tase-3` → `valvetootaja`, `turvatootaja-tase-4` → `turvatootaja`, `turvajuht-tase-5` → `turvajuht`
- **Удалены несуществующие страницы:** `/meiest`, `/meiest/noustamine`, `/meiest/partnerid`, `/treeningud`
- **Удалены redirect-заглушки** (имеют page.tsx но делают `redirect()`): `/kursused`, `/koolitus`, `/kursused/koolituskalender`, `/meiest/keskusest`, `/meiest/kontaktid`
- **Добавлены реальные страницы:** `/kursused/koolitus`, `/kursused/oppekavad-oppetoo`, `/keskusest`
- **Итог:** 13 реальных страниц × 2 locale = **26 URL** в sitemap
- **Все 13 ET-страниц проверены вручную — возвращают 200** (live site + local dev)
- **Исправлены redirects в `next.config.js`:** старые `-tase-` URL теперь ведут правильно (`/et/kursused/valvetootaja` и т.д.) вместо 404

**Redirect-заглушки в коде** (намеренно, не трогать):
- `kursused/page.tsx` → `/kursused/koolitus`
- `koolitus/page.tsx` → `/kursused/koolitus`
- `kursused/koolituskalender/page.tsx` → `/koolituskalender`
- `meiest/keskusest/page.tsx` → `/keskusest`
- `meiest/kontaktid/page.tsx` → `/kontaktid`

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

1. **Sitemap GSC** — ⏳ URL исправлены и проверены (12.06.2026), 26 URL, все страницы 200. После деплоя — повторно отправить sitemap в GSC и ждать переиндексации
2. **Перенос почты turko@hot.ee** — ✅ / ⏳ частично (14.06.2026)
   - ✅ Архив перенесён через imapsync: Входящие (~395), Отправленные (~655), Архив (63) — все в Gmail клиента
   - ❌ Пересылка turko@hot.ee → info@ — Online.ee (Fjordmail) официально не поддерживает ("We do not offer email forwarding")
   - ⏳ Автоответ на turko@hot.ee — отложено, включить после подтверждения переноса писем
   - ⏳ Список сервисов и обновление адреса — составить вместе с клиентом. Поиск в turko@hot.ee по: `emta.ee`, `töötukassa`, `rik.ee`, `swedbank`, `seb.ee`, `lhv.ee`, `zone.ee`, `compic`, `arve`, `tellimus`, `leping`, `invoice`, `subscription`
   - ⚠️ Пока пересылки нет — клиент должен проверять turko@hot.ee раз в неделю до обновления адреса в сервисах
3. **Google Business Profile (Äriprofiil)** — ✅ Настроен (18.06.2026)
   - Профиль создан на аккаунте клиента (`eduard.rodchenkov@gmail.com`)
   - Описание на эстонском с ключевыми словами (turvakoolitus, valvetöötaja, turvatöötaja, turvajuht)
   - ⏳ **Фотографии** — добавить позже: фото входа/офиса, учебного класса, логотип, фото с занятий
4. ~~**Перенос DNS на Cloudflare**~~ — ✅ Сделано 09.06.2026
5. ~~**Почта**~~ — ✅ Сделано 09.06.2026
   - ✅ Cloudflare Email Routing включён, правило `info@turvakoolitus.eu` → `eduard.rodchenkov@gmail.com` активно
   - ✅ Старые MX/SPF записи Compic удалены, Cloudflare MX записи добавлены
   - ✅ Brevo: домен `turvakoolitus.eu` верифицирован, DKIM + DMARC настроены
   - ✅ Gmail клиента: "Отправлять как" `info@turvakoolitus.eu` через `smtp-relay.brevo.com:587 TLS`
   - ✅ Gmail фильтр: письма на `info@turvakoolitus.eu` → ярлык `info@turvakoolitu...`, минуя Входящие
   - ✅ Входящие и исходящие протестированы и работают
4. **Отмена Compic** — ⚠️ до 01.07.2026. Почта перенесена, можно отменять через 3-5 дней если всё стабильно
5. ~~**Письма с сайта в спам**~~ — ✅ Исправлено 12.06.2026
   - Транспорт заменён с Gmail SMTP на Brevo SMTP (`smtp-relay.brevo.com:587`)
   - `from` изменён на `info@turvakoolitus.eu` (DKIM-подписанный домен)
   - Уведомления владельцу теперь идут на `info@turvakoolitus.eu` вместо `turko@hot.ee`
   - Env-переменные: `BREVO_USER` + `BREVO_SMTP_KEY` добавлены в Vercel
   - Протестировано: mail-tester.com — **7.6/10**, DKIM/SPF/DMARC ✅, не в чёрных списках ✅
   - Ручные письма с `info@turvakoolitus.eu` доходят во Входящие (протестировано на университетской почте) ✅
   - Google Workspace не нужен — текущая схема бесплатна и полностью функциональна

---

## Почта — текущая ситуация ✅ (09.06.2026)

| Адрес | Статус |
|---|---|
| `turko@hot.ee` | Платный, неудобный сервис online.ee — планируется плавная миграция на `info@turvakoolitus.eu` |
| `info@turvakoolitus.eu` | ✅ Работает через Cloudflare Email Routing + Brevo SMTP |

**Итоговая схема (бесплатно):**
- **Входящие:** письмо на `info@turvakoolitus.eu` → Cloudflare Email Routing → пересылка на `eduard.rodchenkov@gmail.com`
- **Исходящие:** Gmail клиента → "Отправлять как" `info@turvakoolitus.eu` → Brevo SMTP (`smtp-relay.brevo.com:587 TLS`)
- **Сортировка:** Gmail фильтр автоматически кладёт рабочие письма в ярлык `info@turvakoolitu...`
- **DNS:** DKIM + DMARC настроены через Brevo, Cloudflare MX записи активны

---

## Миграция почты: turko@hot.ee → info@turvakoolitus.eu

**Обсуждено 09.06.2026.** Клиент давно пользуется платным и неудобным сервисом online.ee (`turko@hot.ee`). После запуска `info@turvakoolitus.eu` — выполнить плавный переезд.

### Выбранная стратегия: плавная миграция с подстраховкой

**Шаг 1 — Переадресация (forwarding)**
Настроить автоматическую пересылку всех входящих с `turko@hot.ee` на `info@turvakoolitus.eu`.
Результат: работаем только в новом ящике, но ни одно письмо не теряется. Срочности нет.

**Шаг 2 — Автоответ на старом ящике**
Поставить автоответ на `turko@hot.ee`:
> "Наш новый адрес: info@turvakoolitus.eu. Пожалуйста, обновите свои контакты."

Результат: контакты и сервисы узнают новый адрес органически, без ручного обхода.

**Шаг 3 — Перенос архива писем**
Экспортировать всю переписку и важные данные из `turko@hot.ee` в новый ящик (IMAP-синхронизация или экспорт `.mbox`). Делается один раз.

**Шаг 4 — Рассылка уведомления контактам**
Одно письмо всем контактам из адресной книги: "Мы переехали на новый адрес."

**Шаг 5 — Пассивное обновление сервисов**
Критически важные (банк, налоговая, ключевые поставщики) — обновить сразу. Остальные — при очередном входе. Переадресация страхует от потерь.

### Как найти, к каким сервисам привязан turko@hot.ee

При наличии доступа к ящику:
- Поиск по словам: `welcome`, `registered`, `confirm`, `invoice`, `password`, `unsubscribe`, `arve`, `tellimus`
- Сортировка всех писем по отправителю — видны все уникальные домены
- Папка "Отправленные" — с кем велась переписка
- Поиск по `reset password` / `forgot password` — находит все сервисы с аккаунтами

Группировка результатов:
| Приоритет | Что | Срок |
|---|---|---|
| Критично | Банк, налоговая, гос. сервисы | В течение недели |
| Важно | Поставщики, клиенты, платные сервисы | В течение месяца |
| Остальное | Рассылки, второстепенное | Обновится само через forwarding |

**Итог:** старый ящик можно держать активным 1-2 года, пока весь поток не переместится на новый. После — просто не продлевать подписку на online.ee.

---

## Безопасность клиента

- Проверены адреса на [haveibeenpwned.com](https://haveibeenpwned.com)
- **Wattpad (июнь 2020)** — утекли пароли (bcrypt). Рекомендовано сменить пароли на важных сервисах
- **Bureau van Dijk (август 2021)** — утекли публичные бизнес-данные (email, телефон, адрес). Паролей нет, угрозы прямой нет
- Рекомендовано: включить **2FA на Gmail** → [myaccount.google.com/security](https://myaccount.google.com/security)
- Рекомендовано: использовать **Bitwarden** (bitwarden.com) для хранения всех паролей

---

## Favicon / иконка сайта

- **12.06.2026** — добавлена иконка сайта (favicon) через [favicon.io](https://favicon.io)
- Файлы размещены в папке `app/`:
  - `favicon.ico` — иконка во вкладке браузера
  - `icon.png` — Android / Chrome / поисковики
  - `apple-icon.png` — Safari на iPhone/iPad
- Next.js App Router подхватывает их автоматически, без изменений в коде

### ⏳ Проверить через несколько дней
- [ ] Убедиться, что новая иконка отображается в результатах поиска Google (обновляется автоматически, занимает несколько дней)
- [ ] Проверить отображение иконки в браузерной вкладке на мобильных устройствах (iOS Safari, Android Chrome)
- [ ] Проверить иконку при добавлении сайта на главный экран телефона

---

## Передача доступов клиенту (13.06.2026)

### Аккаунты клиента
- GitHub username: **Turko-coder**
- Vercel: зарегистрирован на `info@turvakoolitus.eu`
- Cloudflare: зарегистрирован на `info@turvakoolitus.eu`
- Brevo: создаётся новый аккаунт на `info@turvakoolitus.eu` (бесплатный план не позволяет добавлять пользователей)
- Bitwarden: ещё не создан

### Статус передачи сервисов

| Сервис | Статус | Детали |
|---|---|---|
| Zone.ee | ✅ У клиента | Всегда был у клиента |
| Cloudflare | ✅ Перенесён | Домен теперь в аккаунте клиента. DNS A: `76.76.21.21`. Email Routing настроен |
| GitHub | ✅ Перенесён | Репо передано: `Turko-coder/turko-site`. Филипп — collaborator |
| Vercel | ✅ Перенесён | Новый проект на аккаунте клиента, домен подключён, старый проект удалён |
| Brevo | ✅ Перенесён | Новый аккаунт клиента, домен верифицирован, DKIM обновлён в Cloudflare |
| Google Search Console | ✅ Перенесён | `eduard.rodchenkov@gmail.com` добавлен как Full user, sitemap отправлен |
| Bitwarden | ✅ Готово | Организация создана, клиент добавлен, все доступы в коллекции |
| Gmail клиента | ✅ Работает | `eduard.rodchenkov@gmail.com` — почта info@ пересылается сюда |
| Compic OÜ | ⚠️ СРОЧНО | Отменить до 01.07.2026! Автопродление включено |
| online.ee | ⚠️ Не сделано | Настроить пересылку turko@hot.ee → info@turvakoolitus.eu |

### После передачи — сделать с клиентом отдельно

- **Bitwarden мастер-пароль** — текущий пароль временный (создан Филиппом). Нужно будет встретиться с клиентом и сменить на пароль, который знает только он. После смены Филипп не должен знать новый мастер-пароль.

### Незаконченные шаги (продолжить в следующем чате)

1. **Brevo (новый аккаунт клиента):**
   - Клиент регистрируется на app.brevo.com через `info@turvakoolitus.eu` (бесплатный план)
   - Senders & IP → Domains → Add a domain → `turvakoolitus.eu`
   - Brevo выдаст новые DKIM-записи → заменить старые DKIM-записи Филиппа в Cloudflare DNS
   - Подтвердить верификацию домена
   - SMTP & API → SMTP → скопировать Login и SMTP key
   - Удалить домен `turvakoolitus.eu` из аккаунта Филиппа в Brevo
2. **Vercel** — вставить новые `BREVO_USER` и `BREVO_SMTP_KEY` → Deploy → добавить домен `turvakoolitus.eu` → удалить старый проект с аккаунта Филиппа
3. **Google Search Console** — добавить `eduard.rodchenkov@gmail.com` как Full user
4. **Bitwarden** — создать аккаунт клиента → папку «Turko Website» → записать все доступы
5. **Compic** — отменить подписку до 01.07.2026
6. **Инструкция для клиента** — подготовить документ по доступам

### Важно по Brevo
- **Причина создания нового аккаунта:** бесплатный план Brevo не позволяет добавлять пользователей (нужен Standard — платный)
- **DKIM:** при создании нового аккаунта Brevo выдаёт новые DKIM-ключи. Старые записи в Cloudflare DNS (от аккаунта Филиппа) нужно заменить на новые
- После обновления DKIM — протестировать отправку писем с сайта
- Аккаунт Филиппа в Brevo можно оставить или удалить после переноса

### Важно по Vercel
- Старый Vercel проект (на аккаунте Филиппа) — автодеплой сломан после переноса репо на GitHub
- Новый проект создаётся на аккаунте клиента (`info-34289349's project`, Hobby)
- Importing from: `Turko-coder/turko-site`, branch `main`
- Нужно добавить env vars: `BREVO_USER` и `BREVO_SMTP_KEY` (из нового аккаунта клиента Brevo)
- После деплоя: добавить домен `turvakoolitus.eu`, убедиться что сайт работает, удалить старый проект

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
