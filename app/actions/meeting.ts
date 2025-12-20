'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function checkAndEndMeeting(meetingId: string) {
    const supabase = await createClient()

    const { data: meeting } = await supabase
        .from('meetings')
        .select('start_time, status, host_id')
        .eq('id', meetingId)
        .single()

    if (!meeting) return { error: 'Meeting not found' }
    if (meeting.status === 'ended') return { expired: true }

    if (meeting.start_time) {
        const startTime = new Date(meeting.start_time).getTime()
        const now = Date.now()
        const diffMinutes = (now - startTime) / (1000 * 60)

        // 120 minutes limit
        if (diffMinutes > 120) {
            // End the meeting
            await supabase
                .from('meetings')
                .update({ status: 'ended', end_time: new Date().toISOString() })
                .eq('id', meetingId)

            return { expired: true }
        }
    }

    return { expired: false }
}
