import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Calendar, Clock, DollarSign, Globe, GraduationCap, FileText } from "lucide-react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"

export default async function ProgramPage({ params }: { params: { slug: string } }) {
  const { slug } = params

  // Fetch Program Data
  const { data: program, error } = await supabase
    .from('programs')
    .select(`
      *,
      university:universities (
        name_ar,
        city_ar,
        country:countries (
          name_ar
        )
      )
    `)
    .eq('slug', slug)
    .single()

  if (error || !program) {
    notFound()
  }

  // Default requirements (since we didn't add this column to DB yet, we use static for now or add it later)
  const requirements = [
    "شهادة الثانوية العامة أو البكالوريوس (حسب الدرجة)",
    "إثبات إتقان اللغة (الإنجليزية أو لغة البلد)",
    "صورة جواز السفر",
    "كشف الدرجات المصدق"
  ]

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container px-4 md:px-6 py-10">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6">
            <div>
              <div className="text-sm text-primary font-semibold mb-2">
                {program.university?.name_ar} • {program.university?.country?.name_ar}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{program.name_ar}</h1>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
                  <GraduationCap className="h-4 w-4" /> {program.degree_level}
                </span>
                <span className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
                  <Clock className="h-4 w-4" /> {program.duration}
                </span>
                <span className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
                  <Globe className="h-4 w-4" /> {program.language}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-3 w-full md:w-auto">
              <Link href={`/apply/${program.slug}`}>
                <Button size="lg" className="w-full md:w-auto bg-secondary hover:bg-secondary/90 text-white px-8">
                  قدم الآن مجاناً
                </Button>
              </Link>
              <p className="text-xs text-center text-muted-foreground">لا توجد رسوم للتقديم عبر منصتنا</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container px-4 md:px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="md:col-span-2 space-y-8">
            <section className="bg-white p-8 rounded-xl shadow-sm border">
              <h2 className="text-xl font-bold mb-4">نظرة عامة على البرنامج</h2>
              <p className="text-gray-600 leading-relaxed">
                {program.description}
              </p>
            </section>

            <section className="bg-white p-8 rounded-xl shadow-sm border">
              <h2 className="text-xl font-bold mb-6">شروط القبول العامة</h2>
              <ul className="space-y-4">
                {requirements.map((req, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-gray-700">{req}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="bg-white p-8 rounded-xl shadow-sm border">
              <h2 className="text-xl font-bold mb-6">تفاصيل إضافية</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" /> بداية الدراسة
                  </h3>
                  <p className="text-sm text-gray-500">{program.start_date || 'سبتمبر / أكتوبر'}</p>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" /> الموعد النهائي
                  </h3>
                  <p className="text-sm text-gray-500">{program.deadline || 'يختلف حسب الجامعة'}</p>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar Info */}
          <aside className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border space-y-6">
              <h3 className="font-bold text-lg border-b pb-4">تفاصيل مهمة</h3>
              
              <div className="flex items-start gap-4">
                <div className="bg-blue-50 p-2 rounded-lg"><DollarSign className="h-5 w-5 text-primary" /></div>
                <div>
                  <div className="text-sm text-muted-foreground">الرسوم الدراسية</div>
                  <div className="font-semibold">
                    {program.tuition_fee === 0 ? 'مجاني' : `${program.tuition_fee} $ / سنوياً`}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-green-50 p-2 rounded-lg"><Globe className="h-5 w-5 text-green-600" /></div>
                <div>
                  <div className="text-sm text-muted-foreground">لغة الدراسة</div>
                  <div className="font-semibold">{program.language}</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-purple-50 p-2 rounded-lg"><GraduationCap className="h-5 w-5 text-purple-600" /></div>
                <div>
                  <div className="text-sm text-muted-foreground">الدرجة العلمية</div>
                  <div className="font-semibold">{program.degree_level}</div>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 text-white p-6 rounded-xl shadow-sm">
              <h3 className="font-bold text-lg mb-2">تحتاج مساعدة؟</h3>
              <p className="text-gray-300 text-sm mb-4">
                فريقنا من المستشارين جاهز لمساعدتك في اختيار البرنامج المناسب وتجهيز أوراقك.
              </p>
              <Button variant="outline" className="w-full text-black hover:bg-gray-100">
                تحدث مع مستشار
              </Button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
