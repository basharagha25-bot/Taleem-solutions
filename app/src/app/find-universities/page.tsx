'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from "@/components/ui/button"
import { Search, Filter, X, ChevronDown, MapPin, Trophy, Users, Building2, Loader2 } from "lucide-react"
import Link from "next/link"

export default function FindUniversitiesPage() {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const [universities, setUniversities] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)

  // Fetch Data
  useEffect(() => {
    async function fetchUniversities() {
      setLoading(true)
      let query = supabase
        .from('universities')
        .select(`
          *,
          country:countries(name_ar),
          programs(count)
        `)

      if (searchQuery) {
        query = query.ilike('name_ar', `%${searchQuery}%`)
      }

      const { data, error } = await query

      if (data) {
        setUniversities(data)
      }
      setLoading(false)
    }

    // Debounce search
    const timer = setTimeout(() => {
      fetchUniversities()
    }, 500)

    return () => clearTimeout(timer)
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
                placeholder="ابحث عن جامعة بالاسم..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pr-10 pl-4 rounded-lg border bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none transition-all"
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

              {/* Country Filter (Static for now) */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" /> الدولة
                </h4>
                <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
                  {["ألمانيا", "رومانيا", "تركيا", "إيطاليا"].map((country) => (
                    <label key={country} className="flex items-center gap-2 text-sm cursor-pointer hover:text-primary">
                      <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
                      {country}
                    </label>
                  ))}
                </div>
              </div>

              <div className="h-px bg-gray-100" />

              <Button className="w-full" variant="outline">إعادة تعيين الفلاتر</Button>
            </div>
          </aside>

          {/* Results Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                {loading ? 'جاري البحث...' : `تم العثور على ${universities.length} جامعة`}
              </h2>
            </div>

            {loading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {universities.map((uni) => (
                  <div key={uni.id} className="bg-white rounded-xl border shadow-sm hover:shadow-md transition-all group overflow-hidden flex flex-col">
                    <div className="h-40 bg-gray-200 relative">
                      {/* Cover Image Placeholder */}
                      <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                        <Building2 className="h-12 w-12 opacity-50" />
                      </div>
                      <div className="absolute bottom-4 right-4 w-16 h-16 bg-white rounded-lg shadow-md flex items-center justify-center p-2">
                        <span className="font-bold text-xs text-center">LOGO</span>
                      </div>
                    </div>
                    
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="mb-4">
                        <h3 className="text-lg font-bold text-primary group-hover:underline mb-1">
                          <Link href={`/university/${uni.slug}`}>{uni.name_ar}</Link>
                        </h3>
                        <p className="text-gray-600 text-sm flex items-center gap-1">
                          <MapPin className="h-3 w-3" /> {uni.city_ar}، {uni.country?.name_ar}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-gray-50 p-2 rounded text-center">
                          <span className="block text-xs text-gray-500">التصنيف العالمي</span>
                          <span className="font-bold text-primary">#{uni.ranking || 'N/A'}</span>
                        </div>
                        <div className="bg-gray-50 p-2 rounded text-center">
                          <span className="block text-xs text-gray-500">البرامج المتاحة</span>
                          <span className="font-bold text-primary">{uni.programs?.[0]?.count || 0}</span>
                        </div>
                      </div>

                      <div className="mt-auto flex gap-3">
                        <Link href={`/university/${uni.slug}`} className="flex-1">
                          <Button variant="outline" className="w-full">التفاصيل</Button>
                        </Link>
                        <Link href={`/university/${uni.slug}`} className="flex-1">
                          <Button className="w-full bg-secondary hover:bg-secondary/90">البرامج</Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
                
                {universities.length === 0 && (
                  <div className="col-span-full text-center py-12 text-gray-500">
                    لا توجد نتائج مطابقة لبحثك.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
