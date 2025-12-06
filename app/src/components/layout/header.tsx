import Link from 'next/link'
import { Search, Menu, User, Globe } from 'lucide-react'
import { Logo } from '@/components/ui/loader'
import { Button } from '@/components/ui/button'
import { MainNav } from './main-nav'
import { UserNav } from './user-nav'

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="h-8 w-8" />
            <span className="hidden text-xl font-bold text-primary md:inline-block">
              تعليم <span className="text-secondary">سولوشنز</span>
            </span>
          </Link>
          
          <div className="hidden md:flex">
            <MainNav />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 rounded-full border bg-muted/50 px-3 py-1.5">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="ابحث عن جامعة أو تخصص..." 
              className="bg-transparent text-sm outline-none placeholder:text-muted-foreground w-48"
            />
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Search className="h-5 w-5" />
            </Button>
            
            <Button variant="ghost" size="sm" className="hidden md:flex gap-2">
              <Globe className="h-4 w-4" />
              <span>العربية</span>
            </Button>

            <UserNav />

            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
