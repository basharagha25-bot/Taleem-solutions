'use client'

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { MapPin, GraduationCap, BookOpen } from "lucide-react"

const countries = [
  { title: "ألمانيا", href: "/study-in/germany", description: "وجهة التعليم المجاني الأولى في أوروبا" },
  { title: "رومانيا", href: "/study-in/romania", description: "تعليم طبي متميز بتكاليف معقولة" },
  { title: "تركيا", href: "/study-in/turkey", description: "جسر بين الشرق والغرب مع جامعات عالمية" },
  { title: "روسيا", href: "/study-in/russia", description: "تخصصات هندسية وطبية عريقة" },
  { title: "ماليزيا", href: "/study-in/malaysia", description: "وجهة مفضلة للطلاب العرب في آسيا" },
  { title: "قبرص", href: "/study-in/cyprus", description: "تعليم بريطاني في بيئة متوسطية" },
]

const disciplines = [
  { title: "الطب البشري", href: "/find-programs?subject=medicine" },
  { title: "هندسة البرمجيات", href: "/find-programs?subject=software-engineering" },
  { title: "إدارة الأعمال", href: "/find-programs?subject=business" },
  { title: "طب الأسنان", href: "/find-programs?subject=dentistry" },
  { title: "الهندسة المدنية", href: "/find-programs?subject=civil-engineering" },
  { title: "الذكاء الاصطناعي", href: "/find-programs?subject=ai" },
]

export function MainNav() {
  return (
    <NavigationMenu dir="rtl">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>تصفح حسب الدولة</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-white">
              {countries.map((country) => (
                <ListItem
                  key={country.title}
                  title={country.title}
                  href={country.href}
                  icon={<MapPin className="h-4 w-4 text-primary" />}
                >
                  {country.description}
                </ListItem>
              ))}
              <li className="col-span-2 mt-2 pt-2 border-t">
                <Link href="/countries" className="flex items-center justify-center text-sm text-primary hover:underline w-full py-2">
                  عرض جميع الدول
                </Link>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <NavigationMenuTrigger>التخصصات الدراسية</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-white">
              {disciplines.map((item) => (
                <ListItem
                  key={item.title}
                  title={item.title}
                  href={item.href}
                  icon={<GraduationCap className="h-4 w-4 text-secondary" />}
                >
                  ابحث عن برامج {item.title} في أفضل الجامعات
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/find-universities" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              الجامعات
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { icon?: React.ReactNode }
>(({ className, title, children, icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="flex items-center gap-2 text-sm font-medium leading-none">
            {icon}
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1 pr-6">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
