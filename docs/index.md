---
layout: default
title: Home
nav_order: 1
description: ""
permalink: /
---

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
nmp install brokkjs
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
### requestUrl
required
{: .label }
```html
data-brokk-request-url
```
### requestMethod
```html
data-brokk-request-method
```
### requestParams
```html
data-brokk-request-params
```
### fireEvent
```html
data-brokk-fire-event
```
### triggerElements
```html
data-brokk-trigger-elements
```
### toUpdateElements
```html
data-brokk-to-update-elements
```
### toFireSuccessElements
```html
data-brokk-to-fire-success-elements
```
### showOverlay
```html
data-brokk-show-overlay
```

## Functions
### before
### onSuccess
### onError
### onComplete
### onClick
