'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Search, Filter, X, ChevronDown, MapPin, GraduationCap, Globe, DollarSign } from "lucide-react"
import Link from "next/link"
import { supabase } from '@/lib/supabase'

// Types
type Program = {
  id: string
  name_ar: string
  slug: string
  degree_level: string
  duration: string
  language: string
  tuition_fee: number
  description: string
  university: {
    name_ar: string
    city_ar: string
    country: {
      name_ar: string
    }
  }
}

type Country = {
  id: string
  name_ar: string
}

export default function FindProgramsPage() {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const [programs, setPrograms] = useState<Program[]>([])
  const [countries, setCountries] = useState<Country[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCountries, setSelectedCountries] = useState<string[]>([])

  // Fetch Data
  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      
      // Fetch Countries
      const { data: countriesData } = await supabase
        .from('countries')
        .select('id, name_ar')
        .eq('is_active', true)
      
      if (countriesData) setCountries(countriesData)

      // Fetch Programs
      let query = supabase
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

      if (searchQuery) {
        query = query.ilike('name_ar', `%${searchQuery}%`)
      }

      const { data: programsData, error } = await query
      
      if (programsData) {
        setPrograms(programsData as any)
      }
      
      setLoading(false)
    }

    fetchData()
  }, [searchQuery])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <div className="bg-white border-b sticky top-16 z-30 shadow-sm">
        <div className="container px-4 md:px-6 py-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input 
                type="text" 
                placeholder="ابحث عن تخصص، جامعة، أو كلمة مفتاحية..." 
                className="w-full h-12 pr-10 pl-4 rounded-lg border bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button 
              variant="outline" 
              className="h-12 px-6 gap-2 hidden md:flex"
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            >
              <Filter className="h-4 w-4" />
              تصفية النتائج
            </Button>
            <Button className="h-12 px-8 bg-primary hover:bg-primary/90">
              بحث
            </Button>
          </div>
          
          {/* Mobile Filter Button */}
          <Button 
            variant="ghost" 
            className="w-full mt-2 md:hidden flex justify-between items-center text-muted-foreground"
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          >
            <span>تصفية النتائج</span>
            <ChevronDown className={`h-4 w-4 transition-transform ${isFiltersOpen ? 'rotate-180' : ''}`} />
          </Button>
        </div>
      </div>

      <div className="container px-4 md:px-6 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Filters Sidebar */}
          <aside className={`
            md:w-72 space-y-6 
            ${isFiltersOpen ? 'block' : 'hidden md:block'}
          `}>
            <div className="bg-white p-6 rounded-xl border shadow-sm space-y-8">
              <div className="flex justify-between items-center md:hidden">
                <h3 className="font-bold text-lg">الفلاتر</h3>
                <Button variant="ghost" size="icon" onClick={() => setIsFiltersOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Country Filter */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" /> الدولة
                </h4>
                <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
                  {countries.map((country) => (
                    <label key={country.id} className="flex items-center gap-2 text-sm cursor-pointer hover:text-primary">
                      <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
                      {country.name_ar}
                    </label>
                  ))}
                </div>
              </div>

              <div className="h-px bg-gray-100" />

              {/* Degree Filter */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-primary" /> الدرجة العلمية
                </h4>
                <div className="space-y-2">
                  {["بكالوريوس", "ماجستير", "دكتوراه"].map((degree) => (
                    <label key={degree} className="flex items-center gap-2 text-sm cursor-pointer hover:text-primary">
                      <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
                      {degree}
                    </label>
                  ))}
                </div>
              </div>

              <Button className="w-full" variant="outline">إعادة تعيين الفلاتر</Button>
            </div>
          </aside>

          {/* Results Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                {loading ? 'جاري البحث...' : `تم العثور على ${programs.length} برنامج`}
              </h2>
            </div>

            <div className="space-y-4">
              {loading ? (
                <div className="text-center py-12 text-gray-500">جاري تحميل البرامج...</div>
              ) : programs.length === 0 ? (
                <div className="text-center py-12 text-gray-500">لا توجد نتائج مطابقة لبحثك</div>
              ) : (
                programs.map((program) => (
                  <div key={program.id} className="bg-white p-6 rounded-xl border shadow-sm hover:shadow-md transition-all group">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="w-full md:w-48 h-32 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                        <span className="font-bold text-gray-400">LOGO</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-bold text-primary group-hover:underline mb-1">
                              <Link href={`/program/${program.slug}`}>{program.name_ar}</Link>
                            </h3>
                            <p className="text-gray-600 text-sm mb-3">
                              {program.university?.name_ar} • {program.university?.country?.name_ar}
                            </p>
                          </div>
                          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-yellow-500">
                            <span className="sr-only">حفظ</span>
                            ★
                          </Button>
                        </div>
                        
                        <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                          <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-medium">{program.degree_level}</span>
                          <span className="bg-green-50 text-green-700 px-2 py-1 rounded text-xs font-medium">{program.duration}</span>
                          <span className="bg-purple-50 text-purple-700 px-2 py-1 rounded text-xs font-medium">{program.language}</span>
                          <span className="bg-orange-50 text-orange-700 px-2 py-1 rounded text-xs font-medium">
                            {program.tuition_fee === 0 ? 'مجاني' : `${program.tuition_fee} $`}
                          </span>
                        </div>

                        <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                          {program.description}
                        </p>

                        <div className="flex justify-end gap-3">
                          <Button variant="outline" size="sm">التفاصيل</Button>
                          <Button size="sm" className="bg-secondary hover:bg-secondary/90">قدم الآن</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
