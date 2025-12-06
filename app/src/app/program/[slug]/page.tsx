import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Calendar, Clock, DollarSign, Globe, GraduationCap, FileText } from "lucide-react"
import Link from "next/link"

export default async function ProgramPage({ params }: { params: { slug: string } }) {
  const { slug } = params

  // Mock Data
  const program = {
    name: "ماجستير هندسة البرمجيات",
    university: "جامعة ميونخ التقنية",
    degree: "ماجستير (M.Sc.)",
    duration: "4 فصول دراسية (سنتين)",
    language: "الإنجليزية",
    tuition: "مجاني (رسوم إدارية فقط)",
    deadline: "31 مايو 2025",
    start_date: "أكتوبر 2025",
    description: "يركز هذا البرنامج على تطوير أنظمة برمجية معقدة وموثوقة. يغطي المنهج هندسة المتطلبات، وتصميم البرمجيات، وضمان الجودة، وإدارة المشاريع. يكتسب الطلاب خبرة عملية من خلال مشاريع واقعية.",
    requirements: [
      "درجة البكالوريوس في علوم الحاسوب أو مجال ذي صلة",
      "إتقان اللغة الإنجليزية (IELTS 6.5 أو TOEFL 88)",
      "سجل أكاديمي متميز",
      "خطاب دافع وسيرة ذاتية"
    ]
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container px-4 md:px-6 py-10">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6">
            <div>
              <div className="text-sm text-primary font-semibold mb-2">{program.university}</div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{program.name}</h1>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full"><GraduationCap className="h-4 w-4" /> {program.degree}</span>
                <span className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full"><Clock className="h-4 w-4" /> {program.duration}</span>
                <span className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full"><Globe className="h-4 w-4" /> {program.language}</span>
              </div>
            </div>
            <div className="flex flex-col gap-3 w-full md:w-auto">
              <Button size="lg" className="w-full md:w-auto bg-secondary hover:bg-secondary/90 text-white px-8">
                قدم الآن مجاناً
              </Button>
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
              <h2 className="text-xl font-bold mb-6">شروط القبول</h2>
              <ul className="space-y-4">
                {program.requirements.map((req, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-gray-700">{req}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="bg-white p-8 rounded-xl shadow-sm border">
              <h2 className="text-xl font-bold mb-6">المناهج الدراسية</h2>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">الفصل الأول</h3>
                  <p className="text-sm text-gray-500">أساسيات هندسة البرمجيات المتقدمة، إدارة قواعد البيانات، الخوارزميات.</p>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">الفصل الثاني</h3>
                  <p className="text-sm text-gray-500">أمن المعلومات، الحوسبة السحابية، مشروع عملي 1.</p>
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
                  <div className="font-semibold">{program.tuition}</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-orange-50 p-2 rounded-lg"><Calendar className="h-5 w-5 text-secondary" /></div>
                <div>
                  <div className="text-sm text-muted-foreground">بداية الدراسة</div>
                  <div className="font-semibold">{program.start_date}</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-red-50 p-2 rounded-lg"><Clock className="h-5 w-5 text-red-500" /></div>
                <div>
                  <div className="text-sm text-muted-foreground">آخر موعد للتقديم</div>
                  <div className="font-semibold text-red-600">{program.deadline}</div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
              <h3 className="font-bold text-lg mb-2 text-primary">هل تحتاج مساعدة؟</h3>
              <p className="text-sm text-gray-600 mb-4">
                مستشارونا جاهزون للإجابة على جميع استفساراتك ومساعدتك في تجهيز ملف التقديم.
              </p>
              <Button variant="outline" className="w-full bg-white hover:bg-gray-50 text-primary border-primary">
                تحدث مع مستشار
              </Button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
