// app/auth/instagram/callback/page.tsx
export default function CallbackPage() {
  if (typeof window !== 'undefined') {
    window.location.href = '/'; // Yönlendirme
  }

  return <p>Yönlendiriliyorsunuz...</p>;
}
