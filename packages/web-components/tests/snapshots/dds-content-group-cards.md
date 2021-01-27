# `dds-content-group-cards`

## `Misc attributes`

####   `should render with minimum attributes`

```
<div class="bx--content-layout">
  <slot name="heading">
  </slot>
  <div
    class="bx--content-layout__body"
    hidden=""
  >
    <slot name="copy">
    </slot>
    <div
      class="bx--content-group-cards__row"
      hidden=""
    >
      <slot>
      </slot>
    </div>
    <div hidden="">
      <slot name="media">
      </slot>
    </div>
    <div hidden="">
      <slot name="footer">
      </slot>
    </div>
  </div>
  <slot name="complementary">
  </slot>
</div>

```

####   `should render with various attributes`

```
<div class="bx--content-layout">
  <slot name="heading">
  </slot>
  <div
    class="bx--content-layout__body"
    hidden=""
  >
    <slot name="copy">
    </slot>
    <div
      class="bx--content-group-cards__row"
      hidden=""
    >
      <slot>
      </slot>
    </div>
    <div hidden="">
      <slot name="media">
      </slot>
    </div>
    <div hidden="">
      <slot name="footer">
      </slot>
    </div>
  </div>
  <slot name="complementary">
  </slot>
</div>

```

