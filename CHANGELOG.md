# سجل التغييرات | Changelog

جميع التغييرات الملحوظة في مشروع **@opencodesilver/opencode-claude** سيتم توثيقها في هذا الملف.

All notable changes to this project will be documented in this file.

---

## [3.0.0] - 2026-10-18

### أُضيف | Added
- **إطلاق الإضافة الرسمية لـ Claude Code CLI**: دعم تشغيل Claude Code داخل OpencodeSilver مباشرة.
- **التكامل مع خطط Claude Pro و Claude Max**: استخدام الحساب مباشرة دون الحاجة إلى شراء أرصدة أو مفاتيح API منفصلة.
- **دعم النماذج الذكية**:
  - `claude-3-7-sonnet` (مع دعم التفكير الممتد Extended Thinking).
  - `claude-3-5-sonnet`.
  - `claude-3-5-haiku`.
  - `claude-3-opus`.
- **اكتشاف تلقائي للأداة**: التحقق من تثبيت `@anthropic-ai/claude-code` وتوافر جلسة تسجيل الدخول المحلية.
- **توافق كامل مع واجهة OpencodeSilver**: بطاقة تكامل رسمية في الإعدادات وقائمة المزودين مع فحص الحالة تلقائياً.
