import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, FileText, GraduationCap, Plane } from "lucide-react"
import Link from "next/link"

export default function GuidesPage() {
  return (
    <div className="container py-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-primary">أدلة الدراسة في الخارج</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          كل ما تحتاج معرفته عن الدراسة، المعيشة، والتأشيرات في وجهاتك المفضلة.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Guide Categories */}
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <Plane className="h-10 w-10 text-secondary mb-2" />
            <CardTitle>تأشيرات الدراسة</CardTitle>
            <CardDescription>دليلك الشامل للحصول على فيزا الطالب</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="hover:text-primary">• متطلبات الفيزا الألمانية</li>
              <li className="hover:text-primary">• إجراءات الإقامة في تركيا</li>
              <li className="hover:text-primary">• الحساب البنكي المغلق</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <GraduationCap className="h-10 w-10 text-primary mb-2" />
            <CardTitle>أنظمة التعليم</CardTitle>
            <CardDescription>فهم الفروقات بين الجامعات والأنظمة</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="hover:text-primary">• الفرق بين الجامعة والجامعة التطبيقية</li>
              <li className="hover:text-primary">• السنة التحضيرية (Studienkolleg)</li>
              <li className="hover:text-primary">• نظام الساعات المعتمدة ECTS</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <FileText className="h-10 w-10 text-green-600 mb-2" />
            <CardTitle>التقديم والقبول</CardTitle>
            <CardDescription>كيفية تجهيز ملفك وضمان القبول</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="hover:text-primary">• كتابة رسالة الدافع</li>
              <li className="hover:text-primary">• تصديق الشهادات</li>
              <li className="hover:text-primary">• مواعيد التقديم لعام 2025</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">أحدث المقالات</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="border rounded-xl p-6 flex gap-4 hover:bg-gray-50 transition-colors">
            <div className="h-24 w-24 bg-gray-200 rounded-lg shrink-0"></div>
            <div>
              <h3 className="font-bold text-lg mb-2">أفضل 5 مدن طلابية في ألمانيا لعام 2025</h3>
              <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                تعرف على المدن التي توفر أفضل جودة حياة وتكاليف معيشة مناسبة للطلاب العرب...
              </p>
              <Link href="#" className="text-primary text-sm font-medium hover:underline">اقرأ المزيد</Link>
            </div>
          </div>
          <div className="border rounded-xl p-6 flex gap-4 hover:bg-gray-50 transition-colors">
            <div className="h-24 w-24 bg-gray-200 rounded-lg shrink-0"></div>
            <div>
              <h3 className="font-bold text-lg mb-2">دليل السكن الطلابي في رومانيا</h3>
              <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                مقارنة شاملة بين السكن الجامعي والشقق الخاصة، مع نصائح لتوفير المال...
              </p>
              <Link href="#" className="text-primary text-sm font-medium hover:underline">اقرأ المزيد</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
