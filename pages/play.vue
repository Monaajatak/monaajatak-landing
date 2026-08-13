<script setup>
/**
 * مسار قديم — الروابط العميقة كلها تحت `/app/**` وحدها (وهي وحدها المسجَّلة
 * في `.well-known`)، فنحوّل إليها مع الحفاظ على المعاملات.
 */
const route = useRoute()
await navigateTo({ path: '/app/play', query: route.query }, { redirectCode: 301 })
</script>

<template>
  <AppLinkLanding />
</template>
