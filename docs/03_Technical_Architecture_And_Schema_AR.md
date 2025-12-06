# الخطوة 3 — البنية التقنية ومخطط قاعدة البيانات (Technical Architecture & Schema)

## 🏗️ المكدس التقني (Tech Stack)

لبناء منصة "تعليم" (Taleem) بحجم 1500+ صفحة ديناميكية وبأداء عالي يشبه Studee.com، سنعتمد المكدس التالي:

- **إطار العمل (Frontend Framework):** Next.js 14 (App Router) - لأداء عالي ودعم SEO ممتاز للصفحات الديناميكية.
- **لغة البرمجة:** TypeScript - لضمان جودة الكود وتقليل الأخطاء.
- **واجهة المستخدم (UI Library):** shadcn/ui + Tailwind CSS - لتصميم احترافي وسريع ومتجاوب.
- **قاعدة البيانات (Database):** Supabase (PostgreSQL) - لإدارة البيانات الضخمة (الجامعات، البرامج).
- **المصادقة (Authentication):** Supabase Auth - لإدارة حسابات الطلاب والمعلمين.
- **الاستضافة (Deployment):** Vercel (موصى به) أو Cloudflare Pages.
- **إدارة الحالة (State Management):** React Query (TanStack Query) - لجلب البيانات وتخزينها مؤقتاً.
- **التحميل (Loading):** Custom Bounce Loader + NProgress (Horizontal Infra) - لتحسين تجربة المستخدم أثناء التنقل.

---

## 🗄️ مخطط قاعدة البيانات (Database Schema)

لتحقيق هدف "1500 صفحة"، لن نقوم بإنشاء صفحات يدوياً، بل سنعتمد على قاعدة بيانات علائقية قوية.

### 1. جدول الدول (Countries)
يحتوي على الدول المستهدفة (رومانيا، ألمانيا، تركيا، إيطاليا، روسيا، الهند، بيلاروسيا).

```sql
CREATE TABLE countries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name_ar TEXT NOT NULL, -- الاسم بالعربية (مثلاً: ألمانيا)
  slug TEXT UNIQUE NOT NULL, -- للروابط (مثلاً: germany)
  code TEXT NOT NULL, -- رمز الدولة (DE, TR, etc.)
  description TEXT, -- وصف عن الدراسة في هذه الدولة
  image_url TEXT, -- صورة الغلاف للدولة
  is_active BOOLEAN DEFAULT true
);
```

### 2. جدول الجامعات (Universities)
الجدول الأساسي الذي سيولد مئات الصفحات.

```sql
CREATE TABLE universities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name_ar TEXT NOT NULL, -- اسم الجامعة
  slug TEXT UNIQUE NOT NULL, -- (مثلاً: technical-university-munich)
  country_id UUID REFERENCES countries(id),
  city_ar TEXT NOT NULL, -- المدينة
  logo_url TEXT,
  cover_image_url TEXT,
  description TEXT, -- نبذة عن الجامعة
  ranking INTEGER, -- التصنيف العالمي
  acceptance_rate TEXT, -- معدل القبول
  tuition_range TEXT, -- نطاق الرسوم
  features JSONB, -- ميزات الجامعة (سكن، مكتبة، ملاعب...)
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 3. جدول البرامج الدراسية (Programs)
كل جامعة لديها عشرات البرامج، مما يضاعف عدد الصفحات.

```sql
CREATE TABLE programs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  university_id UUID REFERENCES universities(id),
  name_ar TEXT NOT NULL, -- اسم التخصص (مثلاً: هندسة برمجيات)
  slug TEXT UNIQUE NOT NULL,
  degree_level TEXT NOT NULL, -- (بكالوريوس، ماجستير، دكتوراه)
  duration TEXT NOT NULL, -- (مثلاً: 4 سنوات)
  language TEXT DEFAULT 'English', -- لغة الدراسة
  tuition_fee DECIMAL, -- الرسوم السنوية
  start_date DATE, -- موعد البدء
  deadline DATE, -- آخر موعد للتقديم
  description TEXT
);
```

### 4. جدول المستخدمين (Profiles)
امتداد لجدول Supabase Auth.

```sql
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  nationality TEXT,
  target_degree TEXT, -- الدرجة التي يبحث عنها
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id)
);
```

### 5. جدول الطلبات (Applications)
لإدارة طلبات التقديم للجامعات.

```sql
CREATE TABLE applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id),
  program_id UUID REFERENCES programs(id),
  status TEXT DEFAULT 'pending', -- (pending, reviewing, accepted, rejected)
  documents JSONB, -- روابط المستندات المرفقة
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

## 🌐 هيكلية التوجيه (Routing Structure)

سيتم استخدام **Dynamic Routes** في Next.js لإنشاء الصفحات تلقائياً بناءً على البيانات:

1.  **الصفحة الرئيسية:** `/` (نسخة طبق الأصل من Studee.com بالعربية)
2.  **صفحة الدولة:** `/study-in/[country-slug]`
    *   مثال: `/study-in/germany` (تعرض جميع الجامعات في ألمانيا)
3.  **صفحة الجامعة:** `/university/[university-slug]`
    *   مثال: `/university/munich-technical` (تعرض تفاصيل الجامعة وبرامجها)
4.  **صفحة البرنامج:** `/program/[program-slug]`
    *   مثال: `/program/software-engineering-munich`
5.  **البحث:** `/search?q=...&country=...`

---

## 🎨 تفاصيل واجهة المستخدم (UI Details)

### 1. محمل الارتداد (Bounce Loader & Horizontal Infra)
كما طلبت، سنقوم بتنفيذ نظام تحميل متطور:
- **Top Loading Bar (Horizontal Infra):** شريط تقدم أفقي في أعلى الصفحة يظهر عند الانتقال بين الصفحات (مثل YouTube/GitHub).
- **Bounce Loader:** شعار "تعليم" ينبض أو يرتد في منتصف الشاشة أثناء التحميل الأولي للتطبيق أو البيانات الثقيلة.

### 2. المكونات المستنسخة من Studee (مع shadcn/ui)
- **Hero Section:** شريط بحث عائم كبير مع خلفية فيديو أو صورة جذابة.
- **University Card:** بطاقة تعرض (الشعار، الاسم، التصنيف، الموقع، زر "التفاصيل").
- **Mega Menu:** قائمة علوية ضخمة تعرض الدول والتخصصات بشكل منظم.
- **Accordion FAQ:** قسم الأسئلة الشائعة بتصميم قابل للطي.

---

## 🚀 خطة التنفيذ (Implementation Plan)

1.  **إعداد المشروع:** تهيئة Next.js + Tailwind + Shadcn.
2.  **إعداد Supabase:** إنشاء الجداول وربطها بالمشروع.
3.  **تطوير الواجهة (Frontend):**
    *   بناء المكونات الأساسية (Header, Footer, Cards).
    *   تنفيذ الـ Bounce Loader.
4.  **تطوير الصفحات الديناميكية:** ربط الصفحات بقاعدة البيانات.
5.  **إدخال البيانات (Seeding):** إدخال بيانات تجريبية للجامعات في الدول الـ 7 المحددة.
6.  **النشر:** رفع المشروع على Vercel.

---

**هل تريد البدء في الخطوة 4 (إعداد المشروع وكتابة الكود) الآن؟**
سأقوم بإنشاء ملفات المشروع الأساسية وتثبيت المكتبات اللازمة.
