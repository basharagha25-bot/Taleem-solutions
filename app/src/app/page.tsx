import { Button } from "@/components/ui/button"
import { Search, CheckCircle2, ArrowLeft, GraduationCap, Globe2, Users } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-blue-50 to-white py-20 md:py-32 overflow-hidden">
        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
            <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-semibold text-primary bg-blue-50">
              <span className="flex h-2 w-2 rounded-full bg-primary ml-2"></span>
              مستشارك التعليمي الأول للدراسة في الخارج
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 leading-tight">
              ابحث عن جامعتك وحقق حلمك <br />
              <span className="text-primary">في الدراسة بالخارج</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              اكتشف وقارن بين آلاف البرامج الدراسية في رومانيا، ألمانيا، تركيا، والمزيد. 
              نحن نساعدك في كل خطوة من التقديم حتى القبول.
            </p>

            {/* Search Box */}
            <div className="w-full max-w-3xl bg-white p-2 rounded-2xl shadow-xl border border-gray-100 flex flex-col md:flex-row gap-2 mt-8">
              <div className="flex-1 flex items-center px-4 h-14 border-b md:border-b-0 md:border-l border-gray-100">
                <Search className="h-5 w-5 text-gray-400 ml-3" />
                <input 
                  type="text" 
                  placeholder="ماذا تريد أن تدرس؟ (مثلاً: طب، هندسة...)" 
                  className="w-full bg-transparent outline-none text-gray-700 placeholder:text-gray-400"
                />
              </div>
              <div className="flex-1 flex items-center px-4 h-14 border-b md:border-b-0 md:border-l border-gray-100">
                <Globe2 className="h-5 w-5 text-gray-400 ml-3" />
                <select className="w-full bg-transparent outline-none text-gray-700 cursor-pointer">
                  <option value="">أي دولة</option>
                  <option value="germany">ألمانيا</option>
                  <option value="romania">رومانيا</option>
                  <option value="turkey">تركيا</option>
                  <option value="italy">إيطاليا</option>
                  <option value="russia">روسيا</option>
                </select>
              </div>
              <Button size="lg" className="h-14 px-8 rounded-xl text-lg font-semibold bg-secondary hover:bg-secondary/90 text-white shadow-lg shadow-orange-200">
                ابحث الآن
              </Button>
            </div>

            <div className="flex items-center gap-8 text-sm text-muted-foreground pt-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>استشارات مجانية</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>جامعات معتمدة</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>دعم التأشيرة</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-1/2 -right-20 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-30 -z-10"></div>
        <div className="absolute bottom-0 -left-20 w-96 h-96 bg-orange-100 rounded-full blur-3xl opacity-30 -z-10"></div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-b">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <h3 className="text-4xl font-bold text-primary">37,000+</h3>
              <p className="text-muted-foreground">طالب وثقوا بنا</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-4xl font-bold text-primary">400+</h3>
              <p className="text-muted-foreground">جامعة شريكة</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-4xl font-bold text-primary">98%</h3>
              <p className="text-muted-foreground">نسبة القبول</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-4xl font-bold text-primary">24/7</h3>
              <p className="text-muted-foreground">دعم مستمر</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">رحلتك للدراسة في الخارج تبدأ هنا</h2>
            <p className="text-muted-foreground text-lg">نقدم لك تجربة سلسة ومتكاملة من البحث عن الجامعة المناسبة وحتى وصولك إلى الحرم الجامعي.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <Search className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">1. اكتشف البرامج</h3>
              <p className="text-muted-foreground">ابحث في قاعدة بياناتنا الضخمة عن التخصصات والجامعات التي تناسب طموحك وميزانيتك.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                <GraduationCap className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-3">2. قدم طلبك بسهولة</h3>
              <p className="text-muted-foreground">املأ نموذجاً واحداً وسنقوم نحن بإدارة عملية التقديم للجامعات المتعددة نيابة عنك.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-pink-100 rounded-xl flex items-center justify-center mb-6">
                <Users className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-3">3. احصل على الدعم</h3>
              <p className="text-muted-foreground">فريقنا من الخبراء سيساعدك في إجراءات التأشيرة، السكن، وحتى الاستقبال في المطار.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Countries Section */}
      <section className="py-20 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2">وجهات دراسية مميزة</h2>
              <p className="text-muted-foreground">اختر وجهتك القادمة من بين أفضل الدول للدراسة</p>
            </div>
            <Link href="/countries" className="hidden md:flex items-center text-primary font-semibold hover:underline">
              عرض كل الدول <ArrowLeft className="mr-2 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {['ألمانيا', 'رومانيا', 'تركيا', 'إيطاليا'].map((country, i) => (
              <Link href={`/study-in/${country}`} key={i} className="group relative overflow-hidden rounded-2xl aspect-[4/5]">
                <div className="absolute inset-0 bg-gray-200 group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-1">{country}</h3>
                  <p className="text-sm text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                    اكتشف 50+ جامعة
                  </p>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Link href="/countries" className="inline-flex items-center text-primary font-semibold">
              عرض كل الدول <ArrowLeft className="mr-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
