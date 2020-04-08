$(document).ready(function() {

	// Restricts input for the given textbox to the given inputFilter function.
	(function($) {
		$.fn.inputFilter = function(inputFilter) {
			return this.on("input keydown keyup mousedown mouseup select contextmenu drop", function() {
				if (inputFilter(this.value)) {
					this.oldValue = this.value;
					this.oldSelectionStart = this.selectionStart;
					this.oldSelectionEnd = this.selectionEnd;
				} else if (this.hasOwnProperty("oldValue")) {
					this.value = this.oldValue;
					this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
				} else {
					this.value = "";
				}
			});
		};
	}(jQuery));

	$('body .number__input').val($('body .timeline-content').find('.timeline__item').length);

	$('body .number__input').inputFilter(function(value) {
		return /^\d*$/.test(value); });

	$('body .number').on('click', '.number__minus', function () {
		let currentVal = $(this).parent().find('.number__input').val();
		let $input = $(this).parent().find('.number__input');
		let count = parseInt($input.val()) - 1;
		count = count < 1 ? 1 : count;
		$input.val(count);
		$input.change();
		stepNumber(currentVal, count);
		return false;
	});

	$('body .number').on('click', '.number__plus', function () {
		let currentVal = $(this).parent().find('.number__input').val();
		let $input = $(this).parent().find('.number__input');
		let count = parseInt($input.val()) + 1;
		$input.val(parseInt($input.val()) + 1);
		$input.change();
		stepNumber(currentVal, count);
		return false;
	});

	$('body').on('click', '.timeline-control__checkbox-input', function(){
		let styleClass = $(this).val();
		$('body .timeline-content').find('.timeline').toggleClass(styleClass);
	});


	function stepNumber(currentNumber, newNumber) {
		let stepNumber = 0;

		if (currentNumber > newNumber) {
			stepNumber = currentNumber - newNumber;

			for (var i = 1; i <= stepNumber; i++) {
				$('body .timeline-content').find('.timeline__item').last().remove();
			}
		} else if (currentNumber < newNumber) {
			stepNumber = newNumber - currentNumber;

			for (var i = 1; i <= stepNumber; i++) {
				$('<div class="timeline__item"><div class="timeline__item--wrapper"><div class="timeline__item-title">New Step</div></div></div>')
					.insertAfter($('body .timeline-content').find('.timeline__item').last());
			}
		} else {
			return false;
		}
	}
});