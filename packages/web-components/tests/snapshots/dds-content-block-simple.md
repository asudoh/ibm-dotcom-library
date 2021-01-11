# `dds-content-block-simple`

## `Misc attributes`

####   `should render with minimum attributes`

```
<div class="dds-ce--content-block__container">
  <div class="dds-ce--content-block__heading">
    <slot name="heading">
    </slot>
  </div>
  <div
    class="bx--content-block__copy dds-ce--content-block__copy"
    hidden=""
  >
    <slot>
    </slot>
  </div>
  <div
    class="dds-ce--content-block__media"
    hidden=""
  >
    <slot name="media">
    </slot>
  </div>
  <div class="dds-ce--content-block__footer">
    <slot name="footer">
    </slot>
  </div>
  <div class="dds-ce--content-block__complementary">
    <slot name="complementary">
    </slot>
  </div>
</div>

```

####   `should render with various attributes`

```
<div class="bx--layout--border dds-ce--content-block__container dds-ce--content-block__container--with-complementary">
  <div class="dds-ce--content-block__heading">
    <slot name="heading">
    </slot>
  </div>
  <div
    class="bx--content-block__copy dds-ce--content-block__copy"
    hidden=""
  >
    <slot>
    </slot>
  </div>
  <div
    class="dds-ce--content-block__media"
    hidden=""
  >
    <slot name="media">
    </slot>
  </div>
  <div class="dds-ce--content-block__footer">
    <slot name="footer">
    </slot>
  </div>
  <div class="dds-ce--content-block__complementary">
    <slot name="complementary">
    </slot>
  </div>
</div>

```

