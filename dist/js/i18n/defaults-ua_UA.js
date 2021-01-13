/*!
 * Bootstrap-select v1.12.401 (https://github.com/leornado/bootstrap-select.git)
 *
 * Copyright 2013-2021 bootstrap-select
 * Licensed under MIT (https://github.com/leornado/bootstrap-select/tree/master/LICENSE)
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module unless amdModuleId is set
    define(["jquery"], function (a0) {
      return (factory(a0));
    });
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(require("jquery"));
  } else {
    factory(root["jQuery"]);
  }
}(this, function (jQuery) {

(function ($) {
  $.fn.selectpicker.defaults = {
    noneSelectedText: 'Нічого не вибрано',
    noneResultsText: 'Збігів не знайдено {0}',
    countSelectedText: 'Вибрано {0} із {1}',
    maxOptionsText: ['Досягнута межа ({n} {var} максимум)', 'Досягнута межа в групі ({n} {var} максимум)', ['items', 'item']],
    multipleSeparator: ', ',
    selectAllText: 'Вибрати все',
    deselectAllText: 'Скасувати вибір усі'
  };
})(jQuery);


}));
