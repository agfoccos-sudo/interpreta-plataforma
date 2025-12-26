import { createInstantMeeting, ensureWelcomeMessage } from './actions' // Import

export default async function DashboardPage() {
    // ...
} else {
    const supabase = await createClient()
    const { data: userData } = await supabase.auth.getUser()
    user = userData.user

    if (!user) {
        redirect('/login')
    }

    // Ensure Welcome Message (Async, don't await blocking)
    ensureWelcomeMessage().catch(console.error)

    const { data: profileData } = await supabase
    // ...

    const { data: profileData } = await supabase
        .from('profiles')
        .select('role, full_name, limits, personal_meeting_id')
        .eq('id', user.id)
        .single()
    profile = profileData

    const { data: meetingsData } = await supabase
        .from('meetings')
        .select('*')
        .or(`host_id.eq.${user.id}`)
        .neq('title', 'Reunião Instantânea')
        .neq('status', 'ended')
        .order('start_time', { ascending: true })
    meetings = meetingsData
}

return <DashboardClient user={user} profile={profile} meetings={meetings} isDemo={isDemo} />
}
