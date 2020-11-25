export const remapItemCb = item => ({
  id: item.id,
  title: item.title,
  section: item.section,
  publishedDate: item.published_date,
  imageUrl: item.media.length ? item.media[0]['media-metadata'][2].url : 'images/placeholder.png'
})
