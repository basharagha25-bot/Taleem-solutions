import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { MapPin, Globe, Users, Calendar, CheckCircle, ArrowLeft, BookOpen } from "lucide-react"
import Link from "next/link"

export default async function UniversityPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  
  // Mock Data
  const university = {
    name: "جامعة ميونخ التقنية",
    original_name: "Technical University of Munich",
    description: "تعد جامعة ميونخ التقنية واحدة من أفضل الجامعات في أوروبا والعالم. تشتهر بتميزها في البحث والتدريس والابتكار، وتجذب الطلاب والباحثين من جميع أنحاء العالم.",
    location: "ميونخ، ألمانيا",
    founded: 1868,
    students: "48,000+",
    ranking: "#1 في ألمانيا",
    acceptance_rate: "8%",
    programs: [
      { id: 1, name: "هندسة البرمجيات", degree: "ماجستير", duration: "2 سنة", lang: "الإنجليزية", slug: "software-engineering-tum" },
      { id: 2, name: "علوم البيانات", degree: "ماجستير", duration: "2 سنة", lang: "الإنجليزية", slug: "data-science-tum" },
      { id: 3, name: "الهندسة الميكانيكية", degree: "بكالوريوس", duration: "3 سنوات", lang: "الألمانية", slug: "mechanical-engineering-tum" },
    ]
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header Image */}
      <div className="h-64 md:h-80 bg-gray-900 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="container px-4 md:px-6 h-full flex items-end pb-8 relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
            <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-xl shadow-lg p-4 flex items-center justify-center">
              {/* Logo Placeholder */}
              <span className="text-2xl font-bold text-primary">TUM</span>
            </div>
            <div className="text-white mb-2">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{university.name}</h1>
              <div className="flex flex-wrap gap-4 text-sm md:text-base text-gray-200">
                <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {university.location}</span>
                <span className="flex items-center gap-1"><Globe className="h-4 w-4" /> {university.original_name}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container px-4 md:px-6 py-12">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-12">
            <section>
              <h2 className="text-2xl font-bold mb-4">عن الجامعة</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                {university.description}
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-primary mb-1">{university.founded}</div>
                  <div className="text-xs text-muted-foreground">سنة التأسيس</div>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-secondary mb-1">{university.students}</div>
                  <div className="text-xs text-muted-foreground">طالب</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">{university.ranking}</div>
                  <div className="text-xs text-muted-foreground">التصنيف</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-1">{university.acceptance_rate}</div>
                  <div className="text-xs text-muted-foreground">معدل القبول</div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6">البرامج الدراسية المتاحة</h2>
              <div className="space-y-4">
                {university.programs.map((program) => (
                  <Link href={`/program/${program.slug}`} key={program.id} className="block bg-white border rounded-xl p-6 hover:border-primary hover:shadow-md transition-all">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{program.name}</h3>
                        <div className="flex gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1"><BookOpen className="h-4 w-4" /> {program.degree}</span>
                          <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {program.duration}</span>
                          <span className="flex items-center gap-1"><Globe className="h-4 w-4" /> {program.lang}</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">التفاصيل</Button>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-xl border">
              <h3 className="font-bold text-lg mb-4">لماذا تختار هذه الجامعة؟</h3>
              <ul className="space-y-3">
                <li className="flex gap-3 text-sm text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                  <span>سمعة أكاديمية عالمية مرموقة</span>
                </li>
                <li className="flex gap-3 text-sm text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                  <span>فرص بحثية وتدريبية ممتازة</span>
                </li>
                <li className="flex gap-3 text-sm text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                  <span>موقع استراتيجي في قلب أوروبا</span>
                </li>
                <li className="flex gap-3 text-sm text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                  <span>شراكات قوية مع الصناعة والشركات</span>
                </li>
              </ul>
              <Button className="w-full mt-6 bg-primary hover:bg-primary/90">
                تواصل مع مستشار القبول
              </Button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
