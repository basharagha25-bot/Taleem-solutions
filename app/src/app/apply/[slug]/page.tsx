'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Loader2, Upload, CheckCircle, AlertCircle } from 'lucide-react'

export default function ApplicationPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const router = useRouter()
  
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [program, setProgram] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  // Form State
  const [formData, setFormData] = useState({
    phone: '',
    nationality: '',
    notes: ''
  })
  const [files, setFiles] = useState<{ [key: string]: File | null }>({
    passport: null,
    transcript: null,
    cv: null
  })

  useEffect(() => {
    async function init() {
      // 1. Check Auth
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push(`/login?redirect=/apply/${slug}`)
        return
      }
      setUser(user)

      // 2. Fetch Program Details
      const { data: programData, error } = await supabase
        .from('programs')
        .select('*, university:universities(name_ar)')
        .eq('slug', slug)
        .single()

      if (error || !programData) {
        setError('البرنامج غير موجود')
      } else {
        setProgram(programData)
      }

      setLoading(false)
    }
    init()
  }, [slug, router])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    if (e.target.files && e.target.files[0]) {
      setFiles(prev => ({ ...prev, [type]: e.target.files![0] }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    try {
      // 1. Upload Files
      const uploadedDocs: any = {}
      
      for (const [key, file] of Object.entries(files)) {
        if (file) {
          const fileExt = file.name.split('.').pop()
          const fileName = `${user.id}/${program.id}/${key}.${fileExt}`
          
          const { error: uploadError } = await supabase.storage
            .from('documents')
            .upload(fileName, file, { upsert: true })

          if (uploadError) throw uploadError
          uploadedDocs[key] = fileName
        }
      }

      // 2. Create Application Record
      const { error: appError } = await supabase
        .from('applications')
        .insert([
          {
            user_id: user.id,
            program_id: program.id,
            status: 'pending',
            documents: uploadedDocs,
            // We could also save extra fields if we added them to the schema
          }
        ])

      if (appError) throw appError

      setSuccess(true)
      setTimeout(() => router.push('/dashboard'), 2000)

    } catch (err: any) {
      console.error(err)
      setError(err.message || 'حدث خطأ أثناء إرسال الطلب. تأكد من رفع جميع المستندات المطلوبة.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>
  }

  if (success) {
    return (
      <div className="container py-20 flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle className="h-10 w-10 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold mb-2">تم إرسال طلبك بنجاح!</h1>
        <p className="text-gray-600 mb-8">سيقوم فريقنا بمراجعة طلبك والتواصل معك قريباً.</p>
        <Button onClick={() => router.push('/dashboard')}>الذهاب إلى لوحة التحكم</Button>
      </div>
    )
  }

  return (
    <div className="container py-10 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">تقديم طلب التحاق</h1>
        <p className="text-gray-600">
          أنت تتقدم لبرنامج <span className="font-bold text-primary">{program?.name_ar}</span> في {program?.university?.name_ar}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Info */}
        <Card>
          <CardHeader>
            <CardTitle>المعلومات الشخصية</CardTitle>
            <CardDescription>تأكد من صحة بيانات الاتصال الخاصة بك</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>البريد الإلكتروني</Label>
                <Input value={user?.email} disabled className="bg-gray-50" />
              </div>
              <div className="space-y-2">
                <Label>رقم الهاتف</Label>
                <Input 
                  required 
                  placeholder="+966..." 
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>الجنسية</Label>
              <Input 
                required 
                placeholder="مثال: سعودي" 
                value={formData.nationality}
                onChange={e => setFormData({...formData, nationality: e.target.value})}
              />
            </div>
          </CardContent>
        </Card>

        {/* Documents */}
        <Card>
          <CardHeader>
            <CardTitle>المستندات المطلوبة</CardTitle>
            <CardDescription>يرجى رفع ملفات بصيغة PDF أو JPG (الحد الأقصى 5 ميجابايت)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>صورة جواز السفر</Label>
              <div className="border-2 border-dashed rounded-lg p-6 hover:bg-gray-50 transition-colors text-center cursor-pointer relative">
                <input 
                  type="file" 
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={(e) => handleFileChange(e, 'passport')}
                  required
                />
                <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-600">
                  {files.passport ? files.passport.name : 'اضغط لرفع الملف أو اسحبه هنا'}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label>كشف الدرجات / الشهادة الثانوية</Label>
              <div className="border-2 border-dashed rounded-lg p-6 hover:bg-gray-50 transition-colors text-center cursor-pointer relative">
                <input 
                  type="file" 
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={(e) => handleFileChange(e, 'transcript')}
                  required
                />
                <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-600">
                  {files.transcript ? files.transcript.name : 'اضغط لرفع الملف أو اسحبه هنا'}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label>السيرة الذاتية (اختياري)</Label>
              <div className="border-2 border-dashed rounded-lg p-6 hover:bg-gray-50 transition-colors text-center cursor-pointer relative">
                <input 
                  type="file" 
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={(e) => handleFileChange(e, 'cv')}
                />
                <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-600">
                  {files.cv ? files.cv.name : 'اضغط لرفع الملف أو اسحبه هنا'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notes */}
        <Card>
          <CardHeader>
            <CardTitle>ملاحظات إضافية</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea 
              placeholder="هل لديك أي استفسارات أو ملاحظات تود إضافتها؟" 
              className="h-32"
              value={formData.notes}
              onChange={e => setFormData({...formData, notes: e.target.value})}
            />
          </CardContent>
        </Card>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            {error}
          </div>
        )}

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>إلغاء</Button>
          <Button type="submit" size="lg" disabled={submitting} className="min-w-[150px]">
            {submitting ? <Loader2 className="animate-spin mr-2" /> : null}
            إرسال الطلب
          </Button>
        </div>
      </form>
    </div>
  )
}
