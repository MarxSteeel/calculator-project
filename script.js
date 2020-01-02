// DEFINING FUNCTIONS

function subtract(args) {
	const subTotal = args.reduce((total, item) => {
		return total - item;
	}, (args[0]) * 2);
  return subTotal;
}

function divide(args) {
	const divTotal = args.reduce((total, item) => {
		return total / item;
	}, (args[0]) * (args[0]));
  if (divTotal == Infinity) {
		return alert("Can't divide by ZERO");
	} else {
		return divTotal;
	}
}

function write(button) {
	const display = document.querySelector("#display");
	let val = document.querySelector(`#${button}`);
	val.addEventListener("click", function() {
		if (val.textContent == "." && display.value.includes(".")) {
			display.value = display.value;
		} else {
			display.value += val.textContent;
		}
	});
	window.addEventListener("keydown", function(e) {
		const key = document.querySelector(`#${button}[data-key='${e.keyCode}'`).click();
	});
}

function parse(string) {
	string = string.replace(" ", "");
	if (!isNaN(string)) {
		return Number(string);
	} else {
		if (string.includes("(") && string.includes(")")) {
			let inside = string.substring(string.indexOf("(") + 1, string.indexOf(")"));
			let result = string.substring(0, string.indexOf("(")) + 
										parse(inside) + string.substring(string.indexOf(")") + 1, string.length);
			return parse(result);
		}
		if (string.includes("+")) {
			let sumArray = string.split(/\+(.+)/); // Split only at first occurrence
			return parse(sumArray[0]) + parse(sumArray[1]);
		} else if (string.includes("-")) {
			if (!string.match(/[+*/]/)) {
				let subArray = string.split("-");
				return subtract(subArray);
			} else {
				let subArray = string.split(/\-(.+)/);
				return parse(subArray[0]) - parse(subArray[1]);
			}
		} else if (string.includes("*")) {
			let mulArray = string.split(/\*(.+)/);
			return parse(mulArray[0]) * parse(mulArray[1]);
		} else if (string.includes("/")) {
			if (!string.match(/[+*-]/)) {
				let subArray = string.split("/");
				return divide(subArray);
			}
			let divArray = string.split(/\/(.+)/);
			return parse(divArray[0]) / parse(divArray[1]);
		}
	}
}



// IMPLEMENTING THE FUNCTIONS

// Making the display return to zero

const log = document.querySelector(".log textarea")
const display = document.querySelector("#display");
display.value = "";
log.value = "";

const clear = document.querySelector("#clear");
clear.addEventListener("click", function() {
	display.value = "";
});

// Giving the buttons functionality

write("zero");
write("one");
write("two");
write("three");
write("four");
write("five");
write("six");
write("seven");
write("eight");
write("nine");
write("add");
write("subtract");
write("multiply");
write("divide");
write("dot");
write("open-p");
write("close-p");

// Clearing the log

const logClear = document.querySelector(".log button")
logClear.addEventListener("click", function() {
	log.value = "";
});

// Backspace 

const back = document.querySelector("#back");
back.addEventListener("click", function() {
	display.value = display.value.substring(0, display.value.length - 1);
});
window.addEventListener("keydown", function(e) {
	if (e.keyCode == 8) {
		display.value = display.value.substring(0, display.value.length - 1);
	}
});

// Implementing the operations

const op = document.querySelector("#op");
op.addEventListener("click", function() {
	log.value += display.value + "\n";
	let result = parse(display.value);
	if (result % 1 === 0) {
		display.value = result;
		log.value += result + "\n\n";
	} else {
		display.value = result.toFixed(3);
		log.value += result.toFixed(3) + "\n\n";
	}
});

window.addEventListener("keydown", function(e) {
	if (e.keyCode == 13) {
		log.value += display.value + "\n";
		let result = parse(display.value);
		if (result % 1 === 0) {
			display.value = result;
			log.value += result + "\n\n";
		} else {
			display.value = result.toFixed(3);
			log.value += result.toFixed(3) + "\n\n";
		}
	}
	
});

// Miscellaneous

if (display.value == "NaN") {
	display.value = "";
}

// log
// Add chained parentheses
// Make it pretty
