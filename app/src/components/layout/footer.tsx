import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer className="bg-[#1a1b4b] text-white pt-16 pb-8">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Column 1: About */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold mb-4">Taleem Solutions</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              منصتك الأولى للدراسة في الخارج. نساعدك في العثور على الجامعة المناسبة والبرنامج الدراسي المثالي لتحقيق طموحاتك الأكاديمية والمهنية.
            </p>
            <div className="flex gap-4 pt-4">
              <Link href="#" className="hover:text-primary transition-colors"><Facebook className="w-5 h-5" /></Link>
              <Link href="#" className="hover:text-primary transition-colors"><Twitter className="w-5 h-5" /></Link>
              <Link href="#" className="hover:text-primary transition-colors"><Instagram className="w-5 h-5" /></Link>
              <Link href="#" className="hover:text-primary transition-colors"><Linkedin className="w-5 h-5" /></Link>
            </div>
          </div>

          {/* Column 2: For Students */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">للطلاب</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/find-universities" className="hover:text-white transition-colors">البحث عن الجامعات</Link></li>
              <li><Link href="/find-programs" className="hover:text-white transition-colors">البحث عن البرامج</Link></li>
              <li><Link href="/guides" className="hover:text-white transition-colors">دليل الدراسة</Link></li>
              <li><Link href="/scholarships" className="hover:text-white transition-colors">المنح الدراسية</Link></li>
              <li><Link href="/visa-help" className="hover:text-white transition-colors">المساعدة في التأشيرة</Link></li>
            </ul>
          </div>

          {/* Column 3: For Partners */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">للشركاء</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/partners" className="hover:text-white transition-colors">كن شريكاً (وكيل)</Link></li>
              <li><Link href="/partners" className="hover:text-white transition-colors">كن شريكاً (جامعة)</Link></li>
              <li><Link href="/login" className="hover:text-white transition-colors">بوابة الشركاء</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">اتصل بنا</Link></li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">انضم لنشرتنا البريدية</h4>
            <p className="text-sm text-gray-300">احصل على آخر الأخبار والمنح الدراسية مباشرة في بريدك الوارد.</p>
            <div className="flex gap-2">
              <Input 
                type="email" 
                placeholder="بريدك الإلكتروني" 
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
              <Button variant="secondary">اشتراك</Button>
            </div>
            <div className="pt-4 space-y-2 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>info@taleem-solutions.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+966 50 000 0000</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>© 2025 Taleem Solutions. جميع الحقوق محفوظة.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">سياسة الخصوصية</Link>
            <Link href="/terms" className="hover:text-white transition-colors">الشروط والأحكام</Link>
            <Link href="/cookies" className="hover:text-white transition-colors">ملفات تعريف الارتباط</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
