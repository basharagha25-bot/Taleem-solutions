import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle2, Users, Globe2, GraduationCap } from "lucide-react"

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-[#1a1b4b] text-white py-20 overflow-hidden">
        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center text-center space-y-8 max-w-3xl mx-auto">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
                نساعدك في تسجيل المزيد من <span className="text-purple-400">الطلاب الدوليين</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-[800px]">
                احصل على إمكانية الوصول إلى أكثر من 400 جامعة في 29 دولة و 29,000 برنامج دراسي، بما في ذلك مؤسسات مرموقة في الولايات المتحدة والمملكة المتحدة وكندا وأستراليا وأوروبا.
              </p>
            </div>
            <Button size="lg" className="bg-[#f97316] hover:bg-[#ea580c] text-white text-lg px-8 py-6 h-auto" asChild>
              <Link href="/register">
                كن شريكاً معنا
              </Link>
            </Button>
          </div>
        </div>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center space-y-4 p-6 bg-background rounded-xl shadow-sm">
              <div className="p-4 bg-purple-100 rounded-full text-purple-600">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold">شبكة واسعة</h3>
              <p className="text-muted-foreground">انضم إلى شبكة واسعة من الوكلاء والجامعات حول العالم</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4 p-6 bg-background rounded-xl shadow-sm">
              <div className="p-4 bg-blue-100 rounded-full text-blue-600">
                <Globe2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold">وصول عالمي</h3>
              <p className="text-muted-foreground">توسع في أسواق جديدة واجذب طلاباً من مختلف الدول</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4 p-6 bg-background rounded-xl shadow-sm">
              <div className="p-4 bg-orange-100 rounded-full text-orange-600">
                <GraduationCap className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold">دعم مستمر</h3>
              <p className="text-muted-foreground">فريق دعم مخصص لمساعدتك في كل خطوة من عملية التسجيل</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <div className="bg-[#1a1b4b] rounded-3xl p-8 md:p-16 text-center text-white overflow-hidden relative">
            <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold">جاهز للبدء؟</h2>
              <p className="text-lg text-gray-300">
                انضم إلينا اليوم وابدأ في توسيع نطاق وصولك إلى الطلاب الدوليين. التسجيل مجاني وسهل.
              </p>
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6 h-auto" asChild>
                <Link href="/register">
                  سجل الآن كشريك
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
