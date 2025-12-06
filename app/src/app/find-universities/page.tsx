'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Search, Filter, X, ChevronDown, MapPin, Trophy, Users, Building2 } from "lucide-react"
import Link from "next/link"

// Mock Data for Filters
const countries = ["ألمانيا", "رومانيا", "تركيا", "إيطاليا", "روسيا", "ماليزيا", "قبرص"]
const types = ["جامعة حكومية", "جامعة خاصة", "معهد تقني"]
const rankings = ["أفضل 100", "أفضل 500", "أفضل 1000"]

export default function FindUniversitiesPage() {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)

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
                placeholder="ابحث عن جامعة بالاسم أو الدولة..." 
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
            <span>تصفية النتائج (2 محدد)</span>
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
                    <label key={country} className="flex items-center gap-2 text-sm cursor-pointer hover:text-primary">
                      <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
                      {country}
                    </label>
                  ))}
                </div>
              </div>

              <div className="h-px bg-gray-100" />

              {/* Type Filter */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-primary" /> نوع الجامعة
                </h4>
                <div className="space-y-2">
                  {types.map((type) => (
                    <label key={type} className="flex items-center gap-2 text-sm cursor-pointer hover:text-primary">
                      <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
                      {type}
                    </label>
                  ))}
                </div>
              </div>

              <div className="h-px bg-gray-100" />

              {/* Ranking Filter */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-primary" /> التصنيف العالمي
                </h4>
                <div className="space-y-2">
                  {rankings.map((rank) => (
                    <label key={rank} className="flex items-center gap-2 text-sm cursor-pointer hover:text-primary">
                      <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
                      {rank}
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
              <h2 className="text-xl font-bold text-gray-900">تم العثور على 85 جامعة</h2>
              <select className="bg-white border rounded-md text-sm p-2 outline-none focus:ring-2 focus:ring-primary/20">
                <option>الأعلى تصنيفاً</option>
                <option>الأكثر شعبية</option>
                <option>الأبجدية (أ-ي)</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* University Card Component */}
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="bg-white rounded-xl border shadow-sm hover:shadow-md transition-all group overflow-hidden flex flex-col">
                  <div className="h-40 bg-gray-200 relative">
                    {/* Cover Image Placeholder */}
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                      صورة الجامعة
                    </div>
                    <div className="absolute bottom-4 right-4 w-16 h-16 bg-white rounded-lg shadow-md flex items-center justify-center p-2">
                      <span className="font-bold text-xs text-center">LOGO</span>
                    </div>
                  </div>
                  
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="mb-4">
                      <h3 className="text-lg font-bold text-primary group-hover:underline mb-1">
                        <Link href="/university/technical-university-munich">جامعة ميونخ التقنية</Link>
                      </h3>
                      <p className="text-gray-600 text-sm flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> ميونخ، ألمانيا
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-gray-50 p-2 rounded text-center">
                        <span className="block text-xs text-gray-500">التصنيف العالمي</span>
                        <span className="font-bold text-primary">#50</span>
                      </div>
                      <div className="bg-gray-50 p-2 rounded text-center">
                        <span className="block text-xs text-gray-500">الطلاب الدوليين</span>
                        <span className="font-bold text-primary">14,000+</span>
                      </div>
                    </div>

                    <div className="mt-auto flex gap-3">
                      <Button variant="outline" className="flex-1">التفاصيل</Button>
                      <Button className="flex-1 bg-secondary hover:bg-secondary/90">البرامج (120)</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-10 gap-2">
              <Button variant="outline" disabled>السابق</Button>
              <Button variant="default" className="bg-primary">1</Button>
              <Button variant="outline">2</Button>
              <Button variant="outline">3</Button>
              <Button variant="outline">التالي</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
