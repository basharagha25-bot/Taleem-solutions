import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileQuestion } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <div className="bg-gray-100 p-6 rounded-full mb-6">
        <FileQuestion className="h-16 w-16 text-gray-400" />
      </div>
      <h1 className="text-4xl font-bold text-gray-900 mb-4">الصفحة غير موجودة</h1>
      <p className="text-lg text-gray-600 max-w-md mb-8">
        عذراً، لم نتمكن من العثور على الصفحة التي تبحث عنها. قد تكون انتقلت أو تم حذفها.
      </p>
      <div className="flex gap-4">
        <Link href="/">
          <Button size="lg">العودة للرئيسية</Button>
        </Link>
        <Link href="/find-programs">
          <Button variant="outline" size="lg">البحث عن برنامج</Button>
        </Link>
      </div>
    </div>
  )
}
