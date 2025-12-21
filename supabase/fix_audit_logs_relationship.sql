
-- Drop the old constraint referencing auth.users
alter table public.audit_logs
  drop constraint if exists audit_logs_admin_id_fkey;

-- Add new constraint referencing public.profiles
-- This allows PostgREST to "see" the relationship and join with profiles to get full_name
alter table public.audit_logs
  add constraint audit_logs_admin_id_fkey
  foreign key (admin_id)
  references public.profiles(id);
