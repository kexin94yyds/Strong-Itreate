do $$
begin
  update public.iterate_beta_applications
    set referral_code = null
    where referral_code is not null
      and referral_code !~ '^[a-z0-9]{7}$'
      and inviter_application_id is null;

  if not exists (
    select 1
    from pg_constraint
    where conname = 'iterate_beta_applications_invite_code_format_chk'
  ) then
    alter table public.iterate_beta_applications
      add constraint iterate_beta_applications_invite_code_format_chk
      check (invite_code ~ '^[a-z0-9]{7}$');
  end if;
end
$$;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'iterate_beta_applications_referral_code_format_chk'
  ) then
    alter table public.iterate_beta_applications
      add constraint iterate_beta_applications_referral_code_format_chk
      check (referral_code is null or referral_code ~ '^[a-z0-9]{7}$');
  end if;
end
$$;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'iterate_beta_applications_usage_note_length_chk'
  ) then
    alter table public.iterate_beta_applications
      add constraint iterate_beta_applications_usage_note_length_chk
      check (char_length(btrim(usage_note)) >= 8);
  end if;
end
$$;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'iterate_beta_applications_no_self_link_chk'
  ) then
    alter table public.iterate_beta_applications
      add constraint iterate_beta_applications_no_self_link_chk
      check (inviter_application_id is null or inviter_application_id <> id);
  end if;
end
$$;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'iterate_beta_applications_qualified_consistency_chk'
  ) then
    alter table public.iterate_beta_applications
      add constraint iterate_beta_applications_qualified_consistency_chk
      check (
        (referral_status = 'qualified' and inviter_application_id is not null and qualified_at is not null)
        or (referral_status <> 'qualified' and inviter_application_id is null)
      );
  end if;
end
$$;

create index if not exists iterate_beta_applications_created_at_idx
  on public.iterate_beta_applications(created_at desc);

create index if not exists iterate_beta_applications_status_idx
  on public.iterate_beta_applications(application_status, referral_status, created_at desc);

create index if not exists iterate_beta_invite_clicks_created_at_idx
  on public.iterate_beta_invite_clicks(created_at desc);

alter table public.iterate_beta_applications enable row level security;
alter table public.iterate_beta_invite_clicks enable row level security;

revoke all on public.iterate_beta_applications from anon, authenticated;
revoke all on public.iterate_beta_invite_clicks from anon, authenticated;

alter function public.iterate_touch_updated_at() set search_path = public;
