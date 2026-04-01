
export function resolveImageUrl(path) {
  if (!path) return "";
  if (path.startsWith('http://') || path.startsWith('https://')) return path;

  const backendUrl = process.env.NEXT_PUBLIC_IMAGE_API_URL || process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:8000';
  
  // Clean leading slash and handle storage/ prefix if it exists
  let cleanPath = path.startsWith('/') ? path.substring(1) : path;
  if (cleanPath.startsWith('storage/')) {
    cleanPath = cleanPath.substring(8);
  }
  
  const baseUrl = backendUrl.endsWith('/') ? backendUrl.slice(0, -1) : backendUrl;
  return `${baseUrl}/storage/${cleanPath}`;
}
