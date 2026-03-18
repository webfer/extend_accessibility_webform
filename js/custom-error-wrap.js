(function ($) {
  if (typeof $.validator !== 'undefined') {
    $.validator.setDefaults({
      showErrors: function (errorMap, errorList) {
        this.defaultShowErrors();

        this.errorsFor = function (element) {
          const name = this.escapeCssMeta(this.idOrName(element));
          return $(this.currentForm).find(
            'label#error-' +
              name +
              ', label#' +
              name +
              '-error, span#error-' +
              name +
              ', span#' +
              name +
              '-error',
          );
        };

        const self = this;

        $.each(errorList, function (index, error) {
          const $labelOrSpan = self.errorsFor(error.element);
          $labelOrSpan.each(function () {
            const $this = $(this);

            if (
              this.tagName.toLowerCase() === 'label' &&
              $this.hasClass('error') &&
              this.id &&
              (this.id.endsWith('-error') || this.id.startsWith('error-'))
            ) {
              if ($this.data('error-replaced')) {
                return;
              }
              if ($this.siblings('span#error-' + this.id).length > 0) {
                return;
              }

              const $span = $('<span>', {
                id: this.id,
                class: $this.attr('class'),
                role: 'alert',
                'aria-live': 'assertive',
                'data-error-replaced': 'true',
              });

              $span.text($this.text());

              $this.replaceWith($span);

              const forId = $this.attr('for');
              if (forId) {
                const $input = $('#' + forId);
                if ($input.length) {
                  const describedby = $input.attr('aria-describedby') || '';
                  const ids = describedby.split(/\s+/).filter(Boolean);
                  if (!ids.includes($span.attr('id'))) {
                    ids.push($span.attr('id'));
                    $input.attr('aria-describedby', ids.join(' '));
                  }
                }
              }
            }
          });
        });
      },
    });
  }
})(jQuery);
