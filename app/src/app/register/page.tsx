'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

export default function RegisterPage() {
  const [accountType, setAccountType] = useState<'student' | 'agent' | 'university'>('student')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (formData.password !== formData.confirmPassword) {
      setError('كلمات المرور غير متطابقة')
      setLoading(false)
      return
    }

    try {
      // 1. Sign up user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
            role: accountType // Store the role
          }
        }
      })

      if (authError) throw authError

      if (authData.user) {
        // 2. Create profile entry
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: authData.user.id,
              first_name: formData.firstName,
              last_name: formData.lastName,
              phone: formData.phone,
              role: accountType // Ensure your profile table has a role column or handle this
            }
          ])

        if (profileError) {
          console.error('Profile creation error:', profileError)
          // Continue anyway as auth succeeded
        }

        router.push('/dashboard')
        router.refresh()
      }
    } catch (err: any) {
      setError(err.message || 'حدث خطأ أثناء إنشاء الحساب')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-4rem)] py-10">
      <Card className="w-full max-w-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">إنشاء حساب جديد</CardTitle>
          <CardDescription className="text-center">
            ابدأ رحلتك الدراسية معنا اليوم
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex w-full mb-6 bg-muted p-1 rounded-lg">
            <button
              onClick={() => setAccountType('student')}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                accountType === 'student' ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground hover:bg-background/50'
              }`}
            >
              طالب
            </button>
            <button
              onClick={() => setAccountType('agent')}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                accountType === 'agent' ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground hover:bg-background/50'
              }`}
            >
              شريك (وكيل)
            </button>
            <button
              onClick={() => setAccountType('university')}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                accountType === 'university' ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground hover:bg-background/50'
              }`}
            >
              شريك (جامعة)
            </button>
          </div>

          {accountType === 'student' ? (
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">الاسم الأول</Label>
                  <Input id="firstName" required value={formData.firstName} onChange={handleChange} />
                </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">اسم العائلة</Label>
                <Input id="lastName" required value={formData.lastName} onChange={handleChange} />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <Input id="email" type="email" placeholder="name@example.com" required value={formData.email} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">رقم الهاتف</Label>
              <Input id="phone" type="tel" placeholder="+966..." value={formData.phone} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">كلمة المرور</Label>
              <Input id="password" type="password" required value={formData.password} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">تأكيد كلمة المرور</Label>
              <Input id="confirmPassword" type="password" required value={formData.confirmPassword} onChange={handleChange} />
            </div>
            
            {error && (
              <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              إنشاء الحساب
            </Button>
          </form>
          ) : (
            <div className="text-center space-y-6 py-4">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">
                  {accountType === 'agent' ? 'كن شريكاً معنا' : 'انضم كشريك جامعي'}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {accountType === 'agent' 
                    ? 'ساعد طلابك في الوصول إلى أفضل الجامعات العالمية. احجز موعداً مع فريقنا للبدء.'
                    : 'قم بالترويج لجامعتك لآلاف الطلاب الدوليين. احجز موعداً مع فريقنا لنشر جامعتك على موقعنا.'}
                </p>
              </div>
              
              <Button className="w-full" size="lg" asChild>
                <Link href="https://calendly.com/basharagha25" target="_blank">
                  احجز استشارة مجانية
                </Link>
              </Button>

              <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded">
                مضمون وآمن
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <div className="text-center text-sm">
            لديك حساب بالفعل؟{" "}
            <Link href="/login" className="text-primary hover:underline font-medium">
              تسجيل الدخول
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
