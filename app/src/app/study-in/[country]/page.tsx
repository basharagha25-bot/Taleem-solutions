import { notFound } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { MapPin, GraduationCap, ArrowLeft, Star } from "lucide-react"
import Link from "next/link"

// This is a server component
export default async function CountryPage({ params }: { params: { country: string } }) {
  const { country } = params
  
  // In a real app, we would fetch this from Supabase
  // const { data: countryData } = await supabase
  //   .from('countries')
  //   .select('*')
  //   .eq('slug', country)
  //   .single()

  // Mock data for demonstration
  const countryName = decodeURIComponent(country).charAt(0).toUpperCase() + decodeURIComponent(country).slice(1)
  
  // Mock universities data
  const universities = [
    {
      id: 1,
      name: "جامعة ميونخ التقنية",
      slug: "technical-university-munich",
      city: "ميونخ",
      ranking: 1,
      image: "/placeholder-uni.jpg",
      programs_count: 150
    },
    {
      id: 2,
      name: "جامعة برلين الحرة",
      slug: "free-university-berlin",
      city: "برلين",
      ranking: 4,
      image: "/placeholder-uni-2.jpg",
      programs_count: 120
    },
    // Add more mock data as needed
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Country Hero */}
      <div className="relative h-[40vh] bg-gray-900 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
        {/* Background Image Placeholder */}
        <div className="absolute inset-0 bg-blue-900/50" /> 
        
        <div className="relative z-20 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">الدراسة في {countryName}</h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            اكتشف أفضل الجامعات والبرامج الدراسية في {countryName} وابدأ رحلتك الأكاديمية اليوم.
          </p>
        </div>
      </div>

      <div className="container px-4 md:px-6 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full md:w-64 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <h3 className="font-bold text-lg mb-4">تصفية النتائج</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">المدينة</label>
                  <select className="w-full p-2 border rounded-md text-sm">
                    <option>كل المدن</option>
                    <option>ميونخ</option>
                    <option>برلين</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">الدرجة العلمية</label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" className="rounded border-gray-300" />
                      بكالوريوس
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" className="rounded border-gray-300" />
                      ماجستير
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">الجامعات المتاحة ({universities.length})</h2>
              <div className="flex gap-2">
                <select className="p-2 border rounded-md text-sm">
                  <option>الأعلى تصنيفاً</option>
                  <option>الأقل تكلفة</option>
                </select>
              </div>
            </div>

            <div className="grid gap-6">
              {universities.map((uni) => (
                <Link href={`/university/${uni.slug}`} key={uni.id} className="group bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition-all flex flex-col md:flex-row">
                  <div className="w-full md:w-64 h-48 md:h-auto bg-gray-200 relative">
                    {/* Image placeholder */}
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                      <GraduationCap className="h-12 w-12" />
                    </div>
                  </div>
                  <div className="flex-1 p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{uni.name}</h3>
                        <div className="flex items-center gap-1 bg-yellow-50 text-yellow-700 px-2 py-1 rounded text-xs font-bold">
                          <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                          <span>تصنيف: {uni.ranking}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
                        <MapPin className="h-4 w-4" />
                        <span>{uni.city}، {countryName}</span>
                      </div>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        جامعة رائدة تقدم برامج متميزة في الهندسة والعلوم والتكنولوجيا. بيئة تعليمية حديثة ومجتمع طلابي متنوع.
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between mt-6 pt-4 border-t">
                      <span className="text-sm text-muted-foreground">{uni.programs_count} برنامج دراسي</span>
                      <Button variant="ghost" size="sm" className="text-primary hover:text-primary/90 hover:bg-blue-50">
                        عرض التفاصيل <ArrowLeft className="mr-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
