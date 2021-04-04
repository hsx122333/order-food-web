// translate router.meta.title, be used in breadcrumb sidebar tagsbar
export function generateTitle(title) {
  const hasKey = this.$te('route.' + title);

  if (hasKey) {
    // $t :this method from vue-i18n, inject in @/lang/index.js
    const translatedTitle = this.$t('route.' + title);

    return translatedTitle
  }
  return title
}
