---
layout: default
title: Home
nav_order: 1
description: ""
permalink: /
---

<link rel="alternate" hreflang="en" href="https://brokkjs.com">
<link rel="alternate" hreflang="fr" href="https://fr.brokkjs.com">
<script type="text/javascript" src="https://cdn-staging.weglot.com/weglot.min.js"></script>
<script>
    Weglot.initialize({
        api_key: 'wg_1283797eafe362bb148839b93aee185f0'
    });
</script>

# Lightweight plugin to make ajax call and block rendering
{: .fs-9 }

BrokkJS gives your code an easy and lightweight way to render block, submit form and make button action with ajax calls.

{: .fs-6 .fw-300 }

[Get started now](#getting-started){: .btn .btn-primary .fs-5 .mb-4 .mb-md-0 .mr-2 } [View it on GitHub](https://github.com/weglot/brokkJS){: .btn .fs-5 .mb-4 .mb-md-0 }

---


# Getting started
## Installation

Download:
- [jquery.brokk.min.js](https://unpkg.com/brokkjs/dist/jquery.brokk.min.js) 
- [jquery.brokk.js](https://unpkg.com/brokkjs/src/jquery.brokk.js ) - for development (not minified)

```html
<script src="/change/path/to/jquery.brokk.min.js"></script>
```

Or use CDN:
```html
<script src="https://unpkg.com/brokkjs/dist/jquery.brokk.min.js"></script>
```

Or install with npm:
```
npm install brokkjs
```


## How to Use

### Via jquery plugin

```javascript
$(document).ready(function(){
    $(selector).brokk({
        requestUrl: '/url-that-return-json',
        toUpdateElements: selector,
        onSuccess: function (args) {
            this.onSuccess(args); // Call default plugin onSuccess callback
            alert('Success!');
        },
    });
});
```

### Via data attribute

```html
<div data-brokk-request-url="/url-that-return-json" data-brokk-to-update-elements="this"></div>
```

```javascript
$(document).ready(function(){
    $(selector).brokk();
});
```

### Access instanciated object Api
```javascript
 $(selector).brokkApi().fire();
```

## Default options and functions

Any option can be passed through the use of a data attribute or plugin object.

```javascript
$.fn.brokk.defaults = {
    requestUrl: null,
    requestMethod: 'GET',
    requestParams: null,
    fireEvent: $.fn.brokk.fireEvents.ON_READY,
    toUpdateElements: [],
    triggerElements: [],
    toFireSuccessElements: [],
    showOverlay: true,
    before: function (args) {
        this.before(args);
    },
    onSuccess: function (args) {
        this.onSuccess(args);
    },
    onError: function (args) {
        this.onError(args);
    },
    onComplete: function (args) {
        this.onComplete(args);
    },
    onClick: function (args) {
        this.onClick(args);
    }
};
```

## Options

This is a list of all the BrokkJs configuration options.

| Option | Type:Default | Description |
|:--|:--|:----|
| requestUrl<br/>`REQUIRED`<br/>`data-brokk-request-url`{: .fs-1 } | `string`:`null` | This is the url where Brokk will make the request. |
| requestMethod<br/>`data-brokk-request-method`{: .fs-1 } | `string`:`GET` | Used to define the HTTP request method. |
| requestParams<br/>`data-brokk-request-params`{: .fs-1 } | `object`:`null` | Allow you to pass params with the request. |
| fireEvent<br/>`data-brokk-fire-event`{: .fs-1 } | `$.fn.brokk.fireEvents`<br/>:`$.fn.brokk.fireEvents.ON_READY` | Event that will trigger the request, by default is when dom is ready. You can also trigger it onClick, onSubmit or manually. |
| triggerElements<br/>`data-brokk-trigger-elements`{: .fs-1 } | `array`:`[]` | Array of dom elements that will be disabled during du request. Ex: `['#my-button']` |
| toUpdateElements<br/>`data-brokk-to-update-elements`{: .fs-1 } |  `array`:`[]` | Array of dom elements that will be fulfilled with request result. |
| toFireSuccessElements<br/>`data-brokk-to-fire-success-elements`{: .fs-1 } |  `array`:`[]` | Array of dom elements initialized with Brokk to fire on request success. |
| showOverlay<br/>`data-brokk-show-overlay`{: .fs-1 } | `bool`:`true` | Enable or disable loading overlay display on `toUpdateElements`. |

## Functions
### before
### onSuccess
### onError
### onComplete
### onClick