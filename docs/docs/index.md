# Getting Started

---

## Dependencies

Requires jQuery v1.8.0+, Bootstrap’s dropdown.js component, and Bootstrap's CSS. If you're not already using Bootstrap in your project, a precompiled version of the minimum requirements can be downloaded [here](http://getbootstrap.com/customize/?id=7830063837006f6fc84f).

## CDNJS

The folks at CDNJS host a copy of the library. Just use these links:

```html
<!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.9.3/css/bootstrap-select.min.css">

<!-- Latest compiled and minified JavaScript -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.9.3/js/bootstrap-select.min.js"></script>

<!-- (Optional) Latest compiled and minified JavaScript translation files -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.9.3/js/i18n/defaults-*.min.js"></script>
```

## Install with Bower

You can also install bootstrap-select using [Bower](http://bower.io):

```elixir
$ bower install bootstrap-select
```

## Install with npm

You can also install bootstrap-select using [npm](https://www.npmjs.com/package/bootstrap-select):

```elixir
$ npm install bootstrap-select
```

## Install with NuGet

You can also install bootstrap-select using [NuGet](https://www.nuget.org/packages/bootstrap-select):

```elixir
$ Install-Package bootstrap-select
```

# Usage

---

Create your `<select>` with the `.selectpicker` class. The data-api will automatically theme these elements.

```html
<select class="selectpicker">
  <option>Mustard</option>
  <option>Ketchup</option>
  <option>Relish</option>
</select>
```

Options can be passed via data attributes or JavaScript.

```js
$('.selectpicker').selectpicker({
  style: 'btn-info',
  size: 4
});
```

# Used by

---

<div class="row logo-block">
	<div class="col-md-3 col-sm-4 col-xs-8">
		<a href="https://snapappointments.com" target="_blank"><img src="img/logos/snapappointments.png"></a>
	</div>
</div>

<div class="text-muted">Does your organization use bootstrap-select? Open an issue, and include a link and logo, and you'll be added to the list.</div>

