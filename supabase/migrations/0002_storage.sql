-- Storage buckets for avatars and portfolio images.
-- Run this AFTER 0001_init.sql. Paste into Supabase Studio -> SQL Editor.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('avatars', 'avatars', true, 5242880, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update set
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('portfolio', 'portfolio', true, 5242880, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update set
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- Both buckets are public-read (portfolios are meant to be seen — that's
-- the point of the app). Writes are restricted to the owner's own folder,
-- using the path convention `${user_id}/${filename}`.

create policy "avatars_public_read" on storage.objects
  for select using (bucket_id = 'avatars');

create policy "avatars_owner_write" on storage.objects
  for insert with check (
    bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "avatars_owner_update" on storage.objects
  for update using (
    bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "avatars_owner_delete" on storage.objects
  for delete using (
    bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "portfolio_public_read" on storage.objects
  for select using (bucket_id = 'portfolio');

create policy "portfolio_owner_write" on storage.objects
  for insert with check (
    bucket_id = 'portfolio' and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "portfolio_owner_update" on storage.objects
  for update using (
    bucket_id = 'portfolio' and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "portfolio_owner_delete" on storage.objects
  for delete using (
    bucket_id = 'portfolio' and (storage.foldername(name))[1] = auth.uid()::text
  );
