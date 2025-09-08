-- Add username and phone fields to profiles table
ALTER TABLE public.profiles 
ADD COLUMN username TEXT UNIQUE,
ADD COLUMN phone TEXT;

-- Create index for username for better performance
CREATE INDEX idx_profiles_username ON public.profiles(username) WHERE username IS NOT NULL;