"use client"

import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Camera } from "lucide-react";
import { useRef, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  const { user, profile, loading, error, retry } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [photoUrl, setPhotoUrl] = useState(profile?.image || "");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const supabase = createClientComponentClient();
  const [jobTitle, setJobTitle] = useState(profile?.job_title || "");
  const [gradYear, setGradYear] = useState(profile?.graduation_year || "");
  const [contactInfo, setContactInfo] = useState(profile?.contact_info || "");
  const [saving, setSaving] = useState(false);

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    setUploading(true);
    const fileExt = file.name.split('.').pop();
    const filePath = `avatars/${user.id}.${fileExt}`;
    const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file, { upsert: true });
    if (uploadError) {
      alert('Failed to upload image');
      setUploading(false);
      return;
    }
    const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
    const publicUrl = data.publicUrl;
    setPhotoUrl(publicUrl);
    // Update user profile in DB
    await supabase.from('users').update({ image: publicUrl }).eq('id', user.id);
    // Update global context/profile after upload
    window.location.reload();
    setUploading(false);
  };

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    await supabase.from('users').update({
      job_title: jobTitle,
      graduation_year: gradYear,
      contact_info: contactInfo,
      image: photoUrl,
    }).eq('id', user.id);
    // Fetch the latest profile data after update
    const { data: updatedProfile } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();
    if (updatedProfile) {
      setPhotoUrl(updatedProfile.image || "");
      setJobTitle(updatedProfile.job_title || "");
      setGradYear(updatedProfile.graduation_year || "");
      setContactInfo(updatedProfile.contact_info || "");
    }
    setSaving(false);
    alert('Profile updated!');
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center flex-col">
        <p className="text-red-600 text-lg mb-4">{error}</p>
        <Button onClick={retry} className="bg-blue-600 text-white">Retry</Button>
      </div>
    );
  }

  if (!user) {
    // Show a minimal fallback while redirecting
    if (typeof window !== 'undefined') {
      window.location.href = `/auth/login?callbackUrl=${encodeURIComponent(window.location.pathname)}`;
    }
    return <div className="flex min-h-screen items-center justify-center">Redirecting...</div>;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">My Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-4">
            <div className="relative group">
              <img
                src={photoUrl || `https://api.dicebear.com/7.x/bottts/svg?seed=${user?.email || user?.id}`}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-2 border-blue-500"
              />
              <button
                type="button"
                onClick={handlePhotoClick}
                className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-2 shadow-lg hover:bg-blue-700 transition group-hover:opacity-100 opacity-80"
                disabled={uploading}
                title="Change photo"
              >
                <Camera className="w-5 h-5" />
              </button>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                disabled={uploading}
              />
              {uploading && <Loader2 className="absolute top-0 left-0 w-24 h-24 animate-spin text-blue-500 bg-white/60 rounded-full" />}
            </div>
            <div>
              <span className="font-semibold">First Name:</span> {profile?.first_name || "-"}
            </div>
            <div>
              <span className="font-semibold">Last Name:</span> {profile?.last_name || "-"}
            </div>
            <div>
              <span className="font-semibold">Email:</span> {user.email}
            </div>
            <div className="w-full">
              <label className="block font-semibold mb-1">Job Title</label>
              <Input value={jobTitle} onChange={e => setJobTitle(e.target.value)} placeholder="e.g. Software Engineer" />
            </div>
            <div className="w-full">
              <label className="block font-semibold mb-1">Graduation Year</label>
              <Input value={gradYear} onChange={e => setGradYear(e.target.value)} placeholder="e.g. 2022" type="number" min="1900" max="2100" />
            </div>
            <div className="w-full">
              <label className="block font-semibold mb-1">Contact Info</label>
              <Input value={contactInfo} onChange={e => setContactInfo(e.target.value)} placeholder="LinkedIn, phone, etc." />
            </div>
            <Button className="mt-4 w-full" onClick={handleSave} disabled={saving || !user}>{saving ? "Saving..." : "Save Changes"}</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 