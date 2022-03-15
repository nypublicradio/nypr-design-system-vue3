<template>
  <svg
    id="play-shapes"
    width="100px"
    role="img"
    :aria-label="title"
    class="o-icon play-icon"
    height="100px"
    viewBox="0 0 100 100"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
  >
    <title>{{ title }}</title>
    <g
      class="play-icon-shapes"
      stroke="none"
      stroke-width="1"
      fill="none"
      fill-rule="evenodd"
    >
      <g
        class="fx"
        stroke="none"
        stroke-width="1"
        fill="none"
        fill-rule="evenodd"
      >
        <circle
          class="outer-circle-fx"
          cx="50"
          cy="50"
          r="50"
          fill="none"
        />
        <circle
          class="inner-circle-fx"
          cx="50"
          cy="50"
          r="50"
          fill="none"
        />
      </g>
      <path
        class="outer-circle circle"
        d="M50,97 C75.957383,97 97,75.957383 97,50 C97,24.0426168 75.957383,3 50,3 C24.0426168,3 3,24.0426168 3,50 C3,75.957383 24.0426168,97 50,97 L50,97 L50,97 Z"
      />

      <path
        d="M50,93 C73.748244,93 93,73.748244 93,50 C93,26.2517558 73.748244,7 50,7 C26.2517558,7 7,26.2517558 7,50 C7,73.748244 26.2517558,93 50,93 L50,93 L50,93 Z"
        class="inner-circle circle"
      />

      <polyline
        class="play"
        points="40 68 40 34 68 51 40 68"
      />
      <g
        class="closer"
        fill="none"
        fill-rule="evenodd"
      >
        <line
          x1="33.7"
          y1="33.7"
          x2="66.3"
          y2="66.3"
        />
        <line
          x1="66.3"
          y1="33.7"
          x2="33.7"
          y2="66.3"
        />
      </g>
    </g>
  </svg>
</template>

<script>
export default {
  name: 'PlayIconSimple',
  props: {
    title: {
      type: String,
      default: 'Play'
    }
  }
}
</script>

<style lang="scss">
@mixin isPlaying() {
  .play-icon-shapes > .play {
    opacity: 0;
  }
  .play-icon-shapes > .closer {
    opacity: 1;
  }
}
.play-icon {
  .play-icon-shapes {
    .circle {
      fill: #fff;

      &.inner-circle {
        stroke: RGB(var(--color-dark-gray));
      }
    }
    .play {
      stroke: RGB(var(--color-dark-gray));
      fill: #fff;
    }
    .closer {
      opacity: 0;
      line {
        stroke: RGB(var(--color-dark-gray));
        stroke-width: 2;
      }
    }

    path,
    polyline,
    line {
      transition: var(--animation-easing-standard)
        var(--animation-duration-standard);
    }

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        path {
          fill: RGB(var(--color-primary-2));
        }
        .play,
        .closer line,
        .inner-circle {
          stroke: #fff;
        }
        .closer line {
          stroke-width: 4;
        }
      }
    }
  }
  &.is-playing {
    @include isPlaying();
  }
}
</style>
