<p align="center">
  <img src="assets/logo.png" width="128" height="128" alt="opencode-claude Logo" style="border-radius: 24px;" />
</p>

<h1 align="center">@opencodesilver/opencode-claude</h1>

<p align="center">
  <strong>إضافة التكامل الرسمية لتشغيل Claude Code CLI داخل بيئة OpencodeSilver بدون مفاتيح API.</strong><br />
  <strong>Official OpencodeSilver integration plugin for Claude Code CLI using Claude Pro/Max plans without API keys.</strong><br />
  <em>Created, programmed, and maintained by <strong>Ahmed (GEMTM)</strong>.</em>
</p>

<p align="center">
  <a href="https://github.com/OpencodeSilver/opencode-claude"><img src="https://img.shields.io/badge/version-3.0.0-blue.svg" alt="Version 3.0.0" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-green.svg" alt="License MIT" /></a>
  <a href="https://github.com/OpencodeSilver/OpencodeSilver"><img src="https://img.shields.io/badge/ecosystem-OpencodeSilver-purple.svg" alt="OpencodeSilver Ecosystem" /></a>
</p>

---

## 🌟 نظرة عامة | Overview

### 🇸🇦 بالعربية
إضافة **`@opencodesilver/opencode-claude`** هي جسر التكامل الرسمي بين بيئة **OpencodeSilver** وأداة **Claude Code CLI** من شركة Anthropic. تتيح لك هذه الإضافة الاستفادة الكاملة من اشتراكك في **Claude Pro** أو **Claude Max** مباشرة في برمجة وتطوير مشاريعك دون الحاجة إلى شراء رصيد API أو إنشاء مفاتيح مدفوعة منفصلة.

### 🇬🇧 English
**`@opencodesilver/opencode-claude`** is the official integration bridge between **OpencodeSilver** and Anthropic's **Claude Code CLI**. It empowers you to utilize your active **Claude Pro** or **Claude Max** subscription directly inside OpencodeSilver without purchasing separate API credits or configuring API keys.

---

## ✨ المميزات الرئيسية | Key Features

- **لا حاجة لمفاتيح API | Zero API Keys:** يعمل مباشرة عبر جلسة اشتراكك في Claude Pro أو Claude Max.
- **دعم أحدث النماذج | Model Support:**
  - `claude-3-7-sonnet` (مع دعم التفكير الهجين والتفكير الممتد Extended Thinking).
  - `claude-3-5-sonnet` (السرعة والدقة العالية في كتابة الأكواد).
  - `claude-3-5-haiku` (الاستجابات الفائقة السرعة).
  - `claude-3-opus` (المهام التحليلية والمعقدة).
- **اكتشاف تلقائي للأداة | Auto Discovery:** فحص تلقائي لوجود أداة `claude` والتحقق من حالة المصادقة وحساب المستخدم.
- **تكامل سلس مع واجهة OpencodeSilver | Native UI Integration:** تظهر الإضافة مباشرة في صفحة الإعدادات (`Settings -> Integrations -> Third-party integrations`) مع تحديث فوري للحالة.
- **دفق البيانات في الوقت الحقيقي | Streaming Output:** عرض إجابات وخطوات كود كلود بشكل حي وتفاعلي.

---

## 📋 المتطلبات المسبقة | Prerequisites

1. تثبيت أداة **Claude Code CLI** رسمياً على جهازك:
   ```bash
   npm install -g @anthropic-ai/claude-code
   ```
2. تسجيل الدخول إلى حسابك في كلود عبر المتصفح:
   ```bash
   claude
   ```
   *(اتبع الخطوات على الشاشة لتسجيل الدخول بحساب Claude Pro/Max الخاص بك).*

---

## 🚀 التثبيت | Installation

### من خلال واجهة OpencodeSilver (موصى به):
1. افتح **OpencodeSilver**.
2. انتقل إلى **الإعدادات (Settings)** -> **التكاملات (Integrations)**.
3. ابحث عن بطاقة **Claude Code** واضغط على **تثبيت (Install)**.

### عبر سطر الأوامر | Via CLI:
```bash
# تثبيت عبر مدير حزم opencode
opencode plugins add @opencodesilver/opencode-claude

# أو عبر bun / npm
bun add @opencodesilver/opencode-claude
```

---

## ⚙️ الإعداد والاستخدام | Configuration & Usage

في ملف إعدادات `opencode.json` الخاص بك أو على مستوى المستخدم:

```json
{
  "plugins": [
    "@opencodesilver/opencode-claude"
  ],
  "provider": "claude-code"
}
```

خيارات مخصصة (اختياري):

```json
{
  "plugins": [
    [
      "@opencodesilver/opencode-claude",
      {
        "extendedThinking": true,
        "timeout": 60000
      }
    ]
  ]
}
```

---

## 👨‍💻 المؤلف والمطور | Author & Maintainer

- **المطور الرئيسي | Lead Architect:** [Ahmed (GEMTM)](https://github.com/OpencodeSilver)
- **المستودع الرئيسي | Main Repository:** [OpencodeSilver/OpencodeSilver](https://github.com/OpencodeSilver/OpencodeSilver)
- **مستودع الإضافة | Plugin Repository:** [OpencodeSilver/opencode-claude](https://github.com/OpencodeSilver/opencode-claude)

---

## 📄 الترخيص | License

هذا المشروع مرخص بموجب رخصة **[MIT License](LICENSE)**.  
Copyright (c) 2026 **Ahmed (GEMTM)** / **OpencodeSilver**.
