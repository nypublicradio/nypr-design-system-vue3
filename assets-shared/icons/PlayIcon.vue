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
        <circle class="outer-circle-fx" cx="50" cy="50" r="50" fill="none" />
        <circle class="inner-circle-fx" cx="50" cy="50" r="50" fill="none" />
      </g>
      <path
        class="outer-circle"
        d="M50,97 C75.957383,97 97,75.957383 97,50 C97,24.0426168 75.957383,3 50,3 C24.0426168,3 3,24.0426168 3,50 C3,75.957383 24.0426168,97 50,97 L50,97 L50,97 Z"
        fill="none"
        stroke="#FFF"
        fill-rule="nonzero"
      />

      <path
        d="M50,93 C73.748244,93 93,73.748244 93,50 C93,26.2517558 73.748244,7 50,7 C26.2517558,7 7,26.2517558 7,50 C7,73.748244 26.2517558,93 50,93 L50,93 L50,93 Z"
        class="inner-circle"
        stroke="#000"
        fill="none"
        fill-rule="nonzero"
      />

      <path
        class="pause"
        d="M54,35 L61,35 L61,67 L54,67 L54,35 Z M38,35 L45,35 L45,67 L38,67 L38,35 Z"
        fill="#FFF"
        fill-rule="nonzero"
      />
      <polyline
        class="play"
        stroke="#000"
        fill-rule="nonzero"
        points="40 68 40 34 68 51 40 68"
      />
    </g>
  </svg>
</template>

<script>
export default {
  name: 'PlayIcon',
  props: {
    title: {
      type: String,
      default: 'Play',
    },
  },
}
</script>

<style lang="scss">
@mixin pauseShowing() {
  .play-icon-shapes > .play {
    opacity: 0;
  }
  .play-icon-shapes > .pause {
    opacity: 1;
  }
}

@mixin playShowing() {
  .play-icon-shapes > .play {
    opacity: 1;
  }
  .play-icon-shapes > .pause {
    opacity: 0;
  }
}

@mixin showRadiatingWaves() {
  .play-icon-shapes .outer-circle-fx {
    display: block;
    animation: pulse-rings-outer 5s 1s infinite;
    fill: RGB(var(--color-background-darker));
  }

  .play-icon-shapes .inner-circle-fx {
    display: block;
    animation: pulse-rings-inner 5s 1s infinite;
    fill: RGB(var(--color-background-darker));
  }
}

@mixin hideRadiatingWaves() {
  .play-icon-shapes .fx > * {
    animation: none;
  }
}

@keyframes pulse-rings-outer {
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  8% {
    transform: scale(2);
    opacity: 0.3;
  }
  16% {
    transform: scale(2);
    opacity: 0.3;
  }
  40%,
  100% {
    // delay before starting the next round
    transform: scale(2.5);
    opacity: 0;
  }
}

@keyframes pulse-rings-inner {
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  8% {
    transform: scale(1.7);
    opacity: 0.2;
  }
  16% {
    transform: scale(1.7);
    opacity: 0.2;
  }
  40%,
  100% {
    // delay before starting the next round
    transform: scale(2.125);
    opacity: 0;
  }
}

@keyframes bigSpin {
  0% {
  }
  100% {
    transform: rotate(360deg);
  }
}

@mixin spinner(
  $primary: rgba(239, 239, 239, 1),
  $accent: rgba(176, 176, 175, 1),
  $innerWidth: 14px,
  $innerHeight: 14px,
  $outerWidth: 30px,
  $outerHeight: 30px,
  $borderWidth: 6px,
  $top: 0px,
  $left: 20px,
  $right: 140px,
  $bottom: 0px
) {
  &:before {
    //inner spinner
    content: '';
    display: block;
    position: absolute;
    top: #{$top};
    left: #{$left};
    right: #{$right};
    bottom: #{$bottom};
    margin: auto;
    width: #{$innerWidth};
    height: #{$innerWidth};
    border: #{$borderWidth} solid $primary;
    border-radius: 50%;
    border-left-color: $accent;
    border-top-color: $accent;

    animation: bigSpin 0.8s linear infinite;
    transform-origin: 50% 50%;
  }
  &:after {
    //outer spinner
    content: '';
    display: block;
    position: absolute;
    top: #{$top};
    left: #{calc($left - ($innerWidth / 2))};
    right: #{$right};
    bottom: #{$bottom};
    margin: auto;
    width: #{$outerWidth};
    height: #{$outerHeight};
    border: #{$borderWidth} solid $primary;
    border-radius: 50%;
    border-left-color: $accent;
    border-top-color: $accent;

    text-align: center;
    animation: bigSpin 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
    transform-origin: 50% 50%;
  }
}

.play-button {
  cursor: pointer;
  position: relative;
  appearance: none;
  border: 0;
  display: flex;
  justify-content: center;
  transition: all 0.1s ease-in-out;
  overflow: visible !important;

  svg {
    // Essential for radiating waves animation
    overflow: visible;
    max-width: 100%;
  }

  &:hover {
    background-color: transparent;
    transition: all 0.1s ease-in-out;
    transform: scale(1.1);
  }

  &.is-paused {
    @include playShowing();
    @include showRadiatingWaves();
  }

  &.is-paused:hover {
    @include hideRadiatingWaves();
  }

  &.is-paused.is-loading {
    @include hideRadiatingWaves();
  }

  &.is-playing {
    @include pauseShowing();
    opacity: 0.9;
  }

  &.is-loading {
    .play-icon-shapes {
      .play,
      .pause {
        opacity: 0;
      }
    }

    @include spinner($primary: rgba(white, 0), $accent: white);
  }

  .play-icon-shapes {
    > * {
      transition: opacity 0.1s ease-in-out;
    }

    .play {
      fill: #fff;
      stroke: none;
    }

    .outer-circle {
      stroke: #fff;
      stroke-width: 3px;
    }

    .inner-circle {
      display: none; // we'll always hide this one
    }

    .outer-circle-fx,
    .inner-circle-fx {
      pointer-events: none;
      transform-origin: center;
      fill: transparent;
      stroke: transparent;
      transition: all 0.5 ease-in-out;
      transform: scale(0);
      opacity: 0;
    }
  }
}
</style>
