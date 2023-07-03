<template>
  <div class="p-3 container">
    <header class="text-center mb-6">
      <nuxt-link to="/nuxt" class="plain">
        <img
          width="186"
          height="75"
          src="https://nypublicradio.org/wp-content/uploads/2019/10/nypr.svg"
          alt="New York Public Radio"
          decoding="async"
        />
      </nuxt-link>
    </header>
    <main>
      <slot />
    </main>
  </div>
</template>
