'use client'

import React from 'react'
import Link from 'next/link'
import { Calendar, Settings, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import CreateMeetingModal from '@/components/create-meeting-modal'
import { InstantMeetingButton } from '@/components/dashboard/instant-meeting-button'
import { ShareMeetingDialog } from '@/components/share-meeting-dialog'
import { DemoBanner } from '@/components/demo-banner'
import { useLanguage } from '@/components/providers/language-provider'

interface DashboardClientProps {
    user: any
    profile: any
    meetings: any[] | null
    isDemo: boolean
}

export default function DashboardClient({ user, profile, meetings, isDemo }: DashboardClientProps) {
    const { t } = useLanguage()
    const personalRoomId = profile?.personal_meeting_id || user.id

    return (
        <div className="min-h-screen bg-[#f3f4f6] dark:bg-background text-foreground selection:bg-[#06b6d4]/30">
            {isDemo && <DemoBanner />}
            {/* Header */}
            <div className="bg-white dark:bg-card border-b border-border py-4 px-8 flex justify-between items-center shadow-sm">
                <h1 className="text-xl font-bold text-slate-800 dark:text-white tracking-tight">
                    TalkTube <span className="text-muted-foreground font-normal text-sm ml-2">{t('common.video_conf_software')}</span>
                </h1>
                <div className="flex items-center gap-2">
                    {/* Avatars or controls could go here like the reference */}
                </div>
            </div>

            <main className="container mx-auto px-6 py-8 max-w-[1600px] animate-in fade-in duration-700">

                {/* Main Action Area */}
                <div className="flex flex-col xl:flex-row gap-6 mb-10 h-auto xl:h-[400px]">
                    {/* Personal Room Card - Major Focus */}
                    <div className="flex-1 bg-white dark:bg-card rounded-[2rem] p-8 shadow-sm border border-slate-100 dark:border-border relative overflow-hidden flex flex-col justify-center group">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#06b6d4]/10 to-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 group-hover:scale-110 transition-transform duration-1000" />

                        <div className="relative z-10 max-w-2xl">
                            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">{t('dashboard.personal_room_title')}</h2>
                            <p className="text-slate-500 mb-8 text-lg">
                                {t('dashboard.personal_room_desc')}
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 items-center bg-slate-50 dark:bg-accent/20 p-2 pl-6 rounded-2xl border border-slate-200 dark:border-border/50 max-w-xl">
                                <span className="text-slate-500 font-mono text-sm truncate flex-1">
                                    talktube.io/room/{personalRoomId}
                                </span>
                                <div className="flex gap-2 w-full sm:w-auto">
                                    <ShareMeetingDialog
                                        roomId={personalRoomId}
                                        trigger={
                                            <Button variant="ghost" className="text-[#06b6d4] hover:bg-[#06b6d4]/10 font-bold">
                                                {t('common.copy')}
                                            </Button>
                                        }
                                    />
                                    <Link href={`/room/${personalRoomId}`}>
                                        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 rounded-xl shadow-lg shadow-emerald-600/20 animate-pulse hover:animate-none transition-all">
                                            {t('common.enter')}
                                        </Button>
                                    </Link>
                                </div>
                            </div>

                            <Link href="/dashboard/settings" className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[#06b6d4] cursor-pointer hover:underline">
                                <Settings className="h-4 w-4" />
                                {t('dashboard.edit_room_settings')}
                            </Link>
                        </div>
                    </div>

                    {/* Quick Private Meeting Card */}
                    <div className="w-full xl:w-[450px] bg-white dark:bg-card rounded-[2rem] p-8 shadow-sm border border-slate-100 dark:border-border flex flex-col items-center justify-center text-center">
                        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6">
                            {t('dashboard.quick_meeting_title')}
                        </h3>
                        <div className="w-full">
                            <InstantMeetingButton />
                        </div>
                        <p className="text-xs text-muted-foreground mt-4 max-w-[200px]">
                            {t('dashboard.quick_meeting_desc')}
                        </p>
                    </div>
                </div>

                {/* Sub Sections */}
                <div className="bg-white dark:bg-card rounded-[2.5rem] p-8 shadow-sm border border-slate-100 dark:border-border min-h-[500px]">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4">
                            <h2 className="text-lg font-black text-slate-800 dark:text-white uppercase tracking-widest">
                                {t('common.schedule')}
                            </h2>
                        </div>
                        <CreateMeetingModal userId={user.id} />
                    </div>

                    {/* Table Header */}
                    <div className="grid grid-cols-12 text-[10px] font-black uppercase text-slate-400 tracking-wider mb-4 px-4">
                        <div className="col-span-6 md:col-span-4">{t('common.event')}</div>
                        <div className="hidden md:block col-span-3">{t('common.organizer')}</div>
                        <div className="hidden md:block col-span-3">{t('common.time')}</div>
                        <div className="col-span-6 md:col-span-2 text-right">{t('common.action')}</div>
                    </div>

                    <div className="space-y-2">
                        {!meetings || meetings.length === 0 ? (
                            <div className="text-center py-20">
                                <div className="inline-flex p-4 rounded-full bg-slate-50 dark:bg-accent mb-4">
                                    <Calendar className="h-8 w-8 text-slate-300" />
                                </div>
                                <p className="text-slate-500 font-medium">{t('dashboard.no_meetings')}</p>
                            </div>
                        ) : (
                            meetings.map((meeting) => (
                                <div key={meeting.id} className="grid grid-cols-12 items-center p-4 hover:bg-slate-50 dark:hover:bg-accent/30 rounded-2xl transition-colors group cursor-pointer border border-transparent hover:border-slate-100">
                                    <div className="col-span-6 md:col-span-4 font-bold text-slate-800 dark:text-foreground truncate flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center font-bold text-xs shadow-md">
                                            {meeting.title.substring(0, 2).toUpperCase()}
                                        </div>
                                        {meeting.title}
                                    </div>
                                    <div className="hidden md:block col-span-3 text-sm text-slate-500">
                                        {profile?.full_name || t('common.you')}
                                    </div>
                                    <div className="hidden md:block col-span-3 text-sm font-mono text-slate-500">
                                        {new Date(meeting.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                    <div className="col-span-6 md:col-span-2 text-right flex items-center justify-end gap-2">
                                        <ShareMeetingDialog
                                            roomId={meeting.id}
                                            trigger={
                                                <Button size="icon" variant="ghost" className="h-8 w-8 text-indigo-400 hover:text-indigo-300 hover:bg-white/10">
                                                    <Share2 className="h-4 w-4" />
                                                </Button>
                                            }
                                        />
                                        <Link href={`/room/${meeting.id}`}>
                                            <Button size="sm" className="bg-[#06b6d4] text-black hover:bg-[#0891b2] rounded-lg font-bold">
                                                {t('common.enter')}
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </main>
        </div>
    )
}
