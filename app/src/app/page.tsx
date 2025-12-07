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
            <h2 className="text-3xl font-bold tracking-tight mb-4">لماذا تختار Taleem Solutions؟</h2>
            <p className="text-muted-foreground text-lg">نحن نقدم لك تجربة شاملة تبدأ من اختيار الجامعة وتنتهي بوصولك إلى الحرم الجامعي.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6 text-blue-600">
                <GraduationCap className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">قبول جامعي مضمون</h3>
              <p className="text-muted-foreground leading-relaxed">
                نضمن لك الحصول على قبول جامعي في إحدى الجامعات الشريكة لنا بفضل علاقاتنا المباشرة مع مكاتب القبول.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mb-6 text-orange-600">
                <Users className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">دعم شخصي متكامل</h3>
              <p className="text-muted-foreground leading-relaxed">
                مستشار تعليمي خاص بك يرافقك في كل خطوة، من تعبئة الاستمارات وحتى حجز السكن وتذاكر الطيران.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-6 text-green-600">
                <Globe2 className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">شبكة عالمية</h3>
              <p className="text-muted-foreground leading-relaxed">
                إمكانية الوصول إلى أكثر من 400 جامعة في 29 دولة حول العالم، مما يمنحك خيارات لا حصر لها.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-20 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2">وجهات دراسية مميزة</h2>
              <p className="text-muted-foreground">اكتشف الدول الأكثر طلباً للدراسة من قبل طلابنا</p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/find-universities">عرض كل الوجهات</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'ألمانيا', image: 'https://images.unsplash.com/photo-1467269204594-9661b133dd2b?auto=format&fit=crop&q=80&w=800', count: '50+ جامعة' },
              { name: 'رومانيا', image: 'https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?auto=format&fit=crop&q=80&w=800', count: '30+ جامعة' },
              { name: 'تركيا', image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&q=80&w=800', count: '45+ جامعة' },
              { name: 'إيطاليا', image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&q=80&w=800', count: '25+ جامعة' },
            ].map((country) => (
              <Link href={`/study-in/${country.name === 'ألمانيا' ? 'germany' : 'romania'}`} key={country.name} className="group relative overflow-hidden rounded-2xl aspect-[3/4]">
                <img 
                  src={country.image} 
                  alt={country.name} 
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-end text-white">
                  <h3 className="text-2xl font-bold mb-1">{country.name}</h3>
                  <p className="text-sm text-gray-300">{country.count}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#1a1b4b] text-white overflow-hidden relative">
        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="space-y-6 max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                هل أنت جاهز لبدء رحلتك الدراسية؟
              </h2>
              <p className="text-xl text-gray-300">
                سجل الآن واحصل على استشارة مجانية مع أحد خبرائنا التعليميين لمساعدتك في اختيار المسار الأنسب لك.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" className="bg-[#f97316] hover:bg-[#ea580c] text-white text-lg px-8 py-6 h-auto" asChild>
                  <Link href="/register">
                    سجل مجاناً
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 text-lg px-8 py-6 h-auto" asChild>
                  <Link href="/find-universities">
                    تصفح الجامعات
                  </Link>
                </Button>
              </div>
            </div>
            <div className="hidden md:block relative">
              <div className="w-64 h-64 bg-blue-500/20 rounded-full blur-3xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
              <GraduationCap className="w-64 h-64 text-white/10 relative z-10" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
