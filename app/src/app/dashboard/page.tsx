'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, FileText, User, LogOut, Settings, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { Badge } from "@/components/ui/badge"

type Profile = {
  first_name: string
  last_name: string
  email: string
}

type Application = {
  id: string
  status: string
  submitted_at: string
  program: {
    name_ar: string
    slug: string
    university: {
      name_ar: string
    }
  }
}

export default function DashboardPage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function getData() {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push('/login')
        return
      }

      // Fetch Profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (profileData) {
        setProfile({
          ...profileData,
          email: user.email!
        })
      }

      // Fetch Applications
      const { data: appsData } = await supabase
        .from('applications')
        .select(`
          id,
          status,
          submitted_at,
          program:programs (
            name_ar,
            slug,
            university:universities (
              name_ar
            )
          )
        `)
        .eq('user_id', user.id)
        .order('submitted_at', { ascending: false })

      if (appsData) {
        // @ts-ignore
        setApplications(appsData)
      }

      setLoading(false)
    }

    getData()
  }, [router])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">قيد المراجعة</Badge>
      case 'accepted':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">مقبول</Badge>
      case 'rejected':
        return <Badge variant="destructive">مرفوض</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="container py-10">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full md:w-64 space-y-4">
          <div className="bg-white p-6 rounded-xl border shadow-sm text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
              <User className="h-10 w-10" />
            </div>
            <h2 className="font-bold text-lg">{profile?.first_name} {profile?.last_name}</h2>
            <p className="text-sm text-gray-500 mb-4">{profile?.email}</p>
            <Button variant="outline" size="sm" className="w-full gap-2" onClick={handleSignOut}>
              <LogOut className="h-4 w-4" />
              تسجيل الخروج
            </Button>
          </div>

          <nav className="space-y-2">
            <Button variant="secondary" className="w-full justify-start gap-2">
              <FileText className="h-4 w-4" />
              طلباتي
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Settings className="h-4 w-4" />
              الإعدادات
            </Button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 space-y-6">
          <h1 className="text-2xl font-bold">لوحة التحكم</h1>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">الطلبات النشطة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{applications.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">البرامج المحفوظة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">الإشعارات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Applications */}
          <Card>
            <CardHeader>
              <CardTitle>آخر الطلبات</CardTitle>
            </CardHeader>
            <CardContent>
              {applications.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  لا توجد طلبات تقديم حتى الآن.
                  <div className="mt-4">
                    <Button onClick={() => router.push('/find-programs')}>تصفح البرامج الدراسية</Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {applications.map((app) => (
                    <div key={app.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div>
                        <h3 className="font-bold text-primary">
                          <Link href={`/program/${app.program?.slug}`} className="hover:underline">
                            {app.program?.name_ar}
                          </Link>
                        </h3>
                        <p className="text-sm text-gray-600">{app.program?.university?.name_ar}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          تاريخ التقديم: {new Date(app.submitted_at).toLocaleDateString('ar-EG')}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        {getStatusBadge(app.status)}
                        <Button variant="ghost" size="icon">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
