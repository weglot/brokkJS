---
layout: default
title: Home
nav_order: 1
description: ""
permalink: /
---

<link rel="alternate" hreflang="en" href="https://brokkjs.com">
<link rel="alternate" hreflang="fr" href="https://fr.brokkjs.com">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
<script type="text/javascript" src="https://cdn-staging.weglot.com/weglot.min.js"></script>
<script>
    Weglot.initialize({
        api_key: 'wg_1283797eafe362bb148839b93aee185f0'
    });
    $.post( "https://cdn-api.weglot.dev/pageviews?api_key=wg_1283797eafe362bb148839b93aee185f0",
        JSON.stringify({
            url: location.protocol + '//' + location.host + location.pathname,
            language: $("html").attr("lang"),
            browser_language: (navigator.language || navigator.userLanguage)
        })
    );
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
    toUpdateElementsOverlay: 'Loading',
    triggerElements: [],
    triggerElementsOverlay: null,
    toFireSuccessElements: [],
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

| Option | Type:Default | Description                                                                                                                                                   |
|:--|:--|:--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| requestUrl<br/>`REQUIRED`<br/>`data-brokk-request-url`{: .fs-1 } | `string`:`null` | This is the url where Brokk will make the request.                                                                                                            |
| requestMethod<br/>`data-brokk-request-method`{: .fs-1 } | `string`:`GET` | Used to define the HTTP request method.                                                                                                                       |
| requestParams<br/>`data-brokk-request-params`{: .fs-1 } | `object`:`null` | Allow you to pass params with the request.                                                                                                                    |
| fireEvent<br/>`data-brokk-fire-event`{: .fs-1 } | `$.fn.brokk.fireEvents`<br/>:`$.fn.brokk.fireEvents.ON_READY` | Event that will trigger the request, by default is when dom is ready. You can also trigger it onClick, onSubmit, onKeypress, manually or disable any request. |
| triggerElements<br/>`data-brokk-trigger-elements`{: .fs-1 } | `array`:`[]` | Array of dom elements that will be disabled during du request. Ex: `['#my-button']`                                                                           |
| triggerElementsOverlay<br/>`data-brokk-trigger-elements-overlay`{: .fs-1 } | `object`:`null` | String or html that will replace html of triggerElements during loading. By default triggerElements's html will no be changed.                                |
| toUpdateElements<br/>`data-brokk-to-update-elements`{: .fs-1 } |  `array`:`[]` | Array of dom elements that will be fulfilled with request result.                                                                                             |
| toUpdateElementsOverlay<br/>`data-brokk-to-update-elements-overlay`{: .fs-1 } | `string`:`Loading...` | String or html that will be appended on toUpdateElements during loading.                                                                                      |
| toFireSuccessElements<br/>`data-brokk-to-fire-success-elements`{: .fs-1 } |  `array`:`[]` | Array of dom elements initialized with Brokk to fire on request success.                                                                                      |

## Functions
### before
{: .no-translate }
This function is called before making the Ajax call.
By default, this function add a class and attribute `disabled` on all `triggerElements`. If `showOverlay` is `true` a loading overlay is displayed on all `toUpdateElements`.


### onSuccess
{: .no-translate }
This function is called when ajax call return a success HTTP code.
By default, replace HTML with data returned by the URL called,`fire()` function use `args.data` to transmit data to this function.

### onError
{: .no-translate }
This function is called when ajax call return an error HTTP code.
By default, do nothing.

### onComplete
{: .no-translate }
This function is always called after Ajax call.
By default, this function remove class and attribute `disabled` on all `triggerElements`. Remove loading overlay on all `toUpdateElements`.

### onClick
{: .no-translate }
Callback for click event on initialized Brokk element.

### onKeypress
{: .no-translate }
Callback for keypress event on initialized Brokk element. Works only when key is Enter. 


### onSubmit
{: .no-translate }
Callback for submit event on initialized Brokk element.
