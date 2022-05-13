<script setup>
import { onBeforeMount, ref } from 'vue'
//import axios from 'axios'
import VCard from '../v2/src/components/VCard.vue'

//const dataLoaded = ref(false)
const people = ref([])
const totalCount = ref(null)

const {
  data: apiData,
  pending,
  error,
  refresh,
} = await useFetch(
  `https://api.wnyc.org/api/v3/channel/shows/radiolab/the-team/1?limit=50`
)
people.value = apiData.value.included
//console.log('apiData.value = ', apiData.value.included)
totalCount.value = apiData.value.data.attributes['total-count']

// onBeforeMount(async () => {
//   await axios
//     .get(
//       `${config.API_URL}/api/v3/channel/shows/radiolab/the-team/1?limit=50`
//       // `https://private-anon-26d14f4b2b-nyprpublisher.apiary-proxy.com/api/v3/channel/shows/radiolab/the-team/1?limit=50`
//     )
//     .then((response) => {
//       people.value = response.data.included
//       totalCount.value = response.data.data.attributes['total-count']
//       dataLoaded.value = true
//     })
// })
</script>

<template>
  <div>
    <Html>
      <Head>
        <Title>The Team | Radiolab | WNYC Studios</Title>
        <Meta name="og:title" content="The Team | Radiolab | WNYC Studios" />
        <Meta
          name="twitter:title"
          content="The Team | Radiolab | WNYC Studios"
        />
      </Head>
    </Html>
    <section>
      <div class="content lg:px-8 pb-0">
        <div class="grid">
          <div class="col-12">
            <h1 class="h2">The Team</h1>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="content lg:px-8 cards">
        <div v-if="!pending" class="grid">
          <div
            v-for="(person, index) in people"
            :key="`${person.attributes.person.name}-${index}`"
            class="col-12 md:col-6 xl:col-4 mb-6"
          >
            <!-- <client-only> -->
            <v-card
              :image="
                person.attributes.person.image.template.replace(
                  '%s/%s/%s/%s',
                  '%width%/%height%/c/%quality%'
                )
              "
              :alt="person.attributes.person.name"
              :title="person.attributes.person.name"
              :titleLink="`/team/${person.attributes.person.slug}`"
              :eyebrow="person.attributes['appearance-type']"
              :blurb="
                person.attributes.person.lede || person.attributes.person.bio
              "
              :width="391"
              :height="293"
              :max-width="person.attributes.person.image.w"
              :max-height="person.attributes.person.image.h"
              responsive
              :ratio="[4, 3]"
              bp="max"
              class="radiolab-card team"
            />
            <!-- </client-only> -->
          </div>
        </div>
        <div v-else>loading...</div>
      </div>
    </section>
  </div>
</template>

<style lang="scss">
.team .cards > .grid {
  margin: 0 -24px;
}

.team .cards .grid > .col,
.team .cards .grid > [class*='col'] {
  padding: 0 24px;
}

.team .cards .card-eyebrow {
  text-transform: capitalize;
}

$maxWidth: 1440px;
$contentWidth: 1366px;
$thinContentWidth: 768px;
$headerHeight: 70px;
$playerHeight: 100px;
$toolsBreakPoint: 472px;

:root {
  --header-height: #{$headerHeight};
  --player-height: #{$playerHeight};
  --header-z-index: 900;
  --line-clamp: 3;
}

body {
  background: #ffffff;
}

.thin-content-width {
  max-width: $thinContentWidth !important;
  margin: 0 auto;
}

//toast notifications
.mosha__toast {
  * {
    font-family: var(--font-family) !important;
  }
  .mosha__toast__content__text {
    font-weight: var(--font-weight-500) !important;
  }
  &.default {
    background-color: var(--primary-color) !important;
    * {
      color: var(--black100) !important;
    }
    .mosha__icon svg {
      fill: var(--blue-500) !important;
    }
    .mosha__toast__close-icon:before {
      color: var(--black100);
    }
    .mosha__toast__close-icon:hover:before {
      color: var(--black100);
      opacity: 0.7;
    }
  }
}

.p-paginator {
  border-color: transparent;
  color: var(--black100);
  .p-paginator-element,
  .p-paginator-first,
  .p-paginator-last,
  .p-paginator-next,
  .p-paginator-prev {
    border-radius: 50% !important;
    &:hover {
      background: rgba(var(--primary-color-rgb), 0.4) !important;
    }
    &.p-highlight {
      background: var(--primary-color) !important;
      border-color: transparent !important;
      color: var(--black100) !important;
    }
  }
}

section {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0;
  .content {
    width: 100%;
    max-width: $contentWidth;
    padding: spacingXY(10, 6);
    @include media('<lg') {
      padding: spacingXY(10, 4);
      width: 100%;
    }
    &.max-width {
      max-width: $maxWidth;
    }
  }

  $head-color-height: 280px;
  $head-color-height-lg: 130px;
  $head-color-height-md: 162px;
  $head-color-height-sm: 210px;

  @mixin head-color-before {
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      transition: height calc(var(--transition-duration) * 2);
      -webkit-transition: height calc(var(--transition-duration) * 2);
      height: $head-color-height;
      background: var(--gold-500);
      @include media('<lg') {
        height: $head-color-height-lg;
      }
      @include media('<md') {
        height: $head-color-height-md;
      }
      @include media('<#{$toolsBreakPoint}') {
        height: $head-color-height-sm;
      }
    }
  }

  &.head-color {
    // background: var(--primary-color);
    padding-top: calc(var(--header-height) * 2);
    margin-top: calc(var(--header-height) * -1);
    position: relative;
    @include media('<lg') {
      padding-top: 0;
      margin-top: 0;
    }

    &.yellow {
      @include head-color-before();
      &:before {
        background: var(--gold-500);
      }
      &:after {
        background: -moz-linear-gradient(
          top,
          rgba(245, 184, 12, 1) 40%,
          rgba(242, 218, 218, 1) 100%
        );
        background: -webkit-linear-gradient(
          top,
          rgba(245, 184, 12, 1) 40%,
          rgba(242, 218, 218, 1) 100%
        );
        background: linear-gradient(
          to bottom,
          rgba(245, 184, 12, 1) 40%,
          rgba(242, 218, 218, 1) 100%
        );
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f5b80c', endColorstr='#f2dada',GradientType=0 );
      }
    }
    &.lightblue {
      @include head-color-before();
      &:before {
        background: var(--lightblue-500);
      }
    }
    &:after {
      content: '';
      transition: height calc(var(--transition-duration) * 2),
        top calc(var(--transition-duration) * 2);
      -webkit-transition: height calc(var(--transition-duration) * 2),
        top calc(var(--transition-duration) * 2);

      //default alpha gradient
      background: -moz-linear-gradient(
        top,
        rgba(255, 255, 255, 0) 68%,
        rgba(255, 255, 255, 0.46) 100%
      );
      background: -webkit-linear-gradient(
        top,
        rgba(255, 255, 255, 0) 68%,
        rgba(255, 255, 255, 0.46) 100%
      );
      background: linear-gradient(
        to bottom,
        rgba(255, 255, 255, 0) 68%,
        rgba(255, 255, 255, 0.46) 100%
      );
      filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00ffffff', endColorstr='#75ffffff',GradientType=0 );

      border-radius: 0 0 100% 100%;
      //height: calc(242% - 5vw);
      width: 112%;
      left: -6%;
      right: 0;
      //top: calc(-115% - 5vw);
      height: calc($head-color-height * 2.5);
      top: calc($head-color-height * -1.6);

      margin: auto;
      position: absolute;

      @include media('<lg') {
        height: calc($head-color-height-lg * 2);
        top: calc($head-color-height-lg * -1);
      }

      @include media('<md') {
        height: calc($head-color-height-md * 2);
        top: calc($head-color-height-md * -1);
      }
      @include media('<#{$toolsBreakPoint}') {
        height: calc($head-color-height-sm * 2);
        top: calc($head-color-height-sm * -1);
      }
    }
    .content {
      width: 90%;
      z-index: 1;
      background: var(--white);
      border-radius: 1rem 1rem 0 0;
    }
  }
  &.graphic-head {
    background-color: var(--redorange-500);
    background-image: url('/rl-icon-on-redorange.svg');
    background-repeat: no-repeat;
    background-position: 50% 35%;
    background-size: 540px;
    height: 370px;
    margin-top: calc(var(--header-height) * -1);

    @include media('<lg') {
      height: 270px;
    }
    &.lightorange {
      background-color: var(--lightorange-500);
    }
  }
}

.html-formatting {
  a {
    &:hover,
    &:active {
      color: var(--blue-300);
    }
    &:visited {
      color: var(--blue-500);
    }
  }
  p,
  dl {
    margin-block-start: 1em;
    margin-block-end: 1em;
  }
  strong {
    font-weight: var(--font-weight-500);
  }
  img {
    max-width: 100%;
    position: relative;
  }
  .button {
    border-radius: 2rem;
    align-items: center;
    cursor: pointer;
    display: inline-flex;
    margin: 0;
    overflow: hidden;
    position: relative;
    text-align: center;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    vertical-align: bottom;
    background: var(--white100);
    border: 2px solid transparent;
    color: var(--black500);
    font-size: 1rem;
    padding: 0.5rem 1rem;
  }
  .user-embedded-video {
    div {
      position: relative;
      padding-bottom: 56.25%;
      height: 0;
      overflow: hidden;
      iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }
  }
}

.p-inputtext {
  padding-left: spacing(6);
  &.p-inputtext-lg {
    padding: 0.75rem spacing(6);
  }
}

/*component overrides that will eventually go in the extensions.scss file in the theme*/
@mixin black-button() {
  background-color: var(--black500);
  color: var(--primary-color);
  &:hover {
    background-color: var(--blue-500);
  }
}
@mixin blue-button() {
  background: var(--blue-500);
  color: var(--primary-color);
}

.p-button {
  font-weight: var(--font-weight-500);
  .p-button-label {
    transition: all calc(var(--transition-duration) / 3);
    -webkit-transition: all calc(var(--transition-duration) / 3);
  }
  &.p-button-sm {
    padding: 2px 12px;
  }
  &.black {
    @include black-button();
  }
  &.blue {
    @include blue-button();
  }
}

// style-mode over rides

[data-style-mode='blue'] {
  --link-button-color: var(--primary-light-color);
  --link-button-hover-color: var(--primary-light-color);
  --text-color: var(--white100);
  --text-color-secondary: var(--white300);

  .p-button:not(.p-button-text):not(.blue) {
    color: var(--blue-500);
    &:hover {
      color: var(--primary-color);
    }
  }
  .p-inputtext {
    background-color: rgba(10, 11, 12, 0.1);
    border-color: transparent;
    color: var(--primary-color);
    &::placeholder {
      color: var(--white100);
      opacity: 0.4;
    }
  }
  .p-inputtext.p-invalid.p-component {
    border-color: var(--redorange-200);
  }
  .p-error {
    color: var(--redorange-200);
  }
}

// typography additions
.caps-header {
  text-transform: uppercase;
}

/*component overrides that will eventually go in the extensions.scss file in the theme*/

.p-skeleton {
  width: 100%;
  height: 1rem;
  &.transparent {
    background-color: rgba(255, 255, 255, 0.25);
  }
}

.white100bg {
  background-color: var(--white100);
}
</style>
