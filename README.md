# react-overflows-ellipsis
```
 some environment, css text-overflow: ellipsis dot not work, or not satisfied
 maybe you can try this lirbray
 do text-overflow: ellipsis in js
 this lirbray is base in jquery

```
# usage
```

import ReactEllipsis from 'react-overflows-ellipsis';

<ReactEllipsis className="demo">you word</ReactEllipsis>

.demo{
  font-size: 16px;
	color: #CF5000;
	width: 180px;
}
```

## Props

#### `className`: string
- default: `undefined`

#### `str`: The string to append to the content before it is clipped. Defaults to the ellipsis character "`…`". May also contain HTML, but the string itself is not subject to being clipped
- default: `...`
