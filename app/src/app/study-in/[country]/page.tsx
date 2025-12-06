import { notFound } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { MapPin, GraduationCap, ArrowLeft, Star, Building2 } from "lucide-react"
import Link from "next/link"

// This is a server component
export default async function CountryPage({ params }: { params: { country: string } }) {
  const { country: slug } = params
  
  // Fetch Country Data
  const { data: country, error } = await supabase
    .from('countries')
    .select('*')
    .eq('slug', decodeURIComponent(slug))
    .single()

  if (error || !country) {
    // Try to find by name if slug fails (fallback)
    const { data: countryByName } = await supabase
      .from('countries')
      .select('*')
      .ilike('slug', `%${decodeURIComponent(slug)}%`)
      .single()
      
    if (!countryByName) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">الدولة غير موجودة</h1>
            <p className="text-gray-500 mb-4">عذراً، لم نتمكن من العثور على الدولة المطلوبة.</p>
            <Link href="/countries">
              <Button>تصفح كل الدول</Button>
            </Link>
          </div>
        </div>
      )
    }
  }

  // Fetch Universities for this country
  const { data: universities } = await supabase
    .from('universities')
    .select('*, programs(count)')
    .eq('country_id', country?.id)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Country Hero */}
      <div className="relative h-[40vh] bg-gray-900 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
        {/* Background Image */}
        {country?.image_url && (
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-60"
            style={{ backgroundImage: `url(${country.image_url})` }}
          />
        )}
        
        <div className="relative z-20 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">الدراسة في {country?.name_ar}</h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            {country?.description || `اكتشف أفضل الجامعات والبرامج الدراسية في ${country?.name_ar} وابدأ رحلتك الأكاديمية اليوم.`}
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
                  <select className="w-full p-2 border rounded-md text-sm bg-white">
                    <option>كل المدن</option>
                    {/* We could fetch cities dynamically here */}
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
              <h2 className="text-2xl font-bold">الجامعات المتاحة ({universities?.length || 0})</h2>
              <div className="flex gap-2">
                <select className="p-2 border rounded-md text-sm bg-white">
                  <option>الأعلى تصنيفاً</option>
                  <option>الأقل تكلفة</option>
                </select>
              </div>
            </div>

            <div className="grid gap-6">
              {universities?.map((uni) => (
                <div key={uni.id} className="bg-white border rounded-xl p-6 hover:shadow-md transition-all flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-48 h-32 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                    <Building2 className="h-10 w-10 text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold text-primary mb-2">
                          <Link href={`/university/${uni.slug}`} className="hover:underline">
                            {uni.name_ar}
                          </Link>
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                          <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {uni.city_ar}</span>
                          <span className="flex items-center gap-1"><Star className="h-4 w-4 text-yellow-500" /> التصنيف: {uni.ranking}</span>
                        </div>
                        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                          {uni.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t">
                      <span className="text-sm text-muted-foreground">
                        {uni.programs?.[0]?.count || 0} برنامج دراسي متاح
                      </span>
                      <Link href={`/university/${uni.slug}`}>
                        <Button variant="outline" size="sm">عرض التفاصيل</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}

              {(!universities || universities.length === 0) && (
                <div className="text-center py-12 bg-white rounded-xl border">
                  <p className="text-gray-500">لا توجد جامعات متاحة حالياً في هذه الدولة.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
