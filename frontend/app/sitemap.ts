export default async function sitemap() {
  const res = await fetch("https://namtranngoc.pythonanywhere.com/api/posts/");
  const posts = await res.json();

  const postUrls = posts.map((post: any) => ({
    url: `https://ten-mien-cua-ong.com/post/${post.slug}`,
    lastModified: new Date(post.created_at),
  }));

  return [
    { url: 'https://ten-mien-cua-ong.com/', lastModified: new Date() },
    { url: 'https://ten-mien-cua-ong.com/posts', lastModified: new Date() },
    ...postUrls,
  ];
}