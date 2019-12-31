// DEFINING FUNCTIONS

function add(args) {
	const addTotal = args.reduce((total, item) => {
		return total + item;
	}, 0);
	return addTotal;
}

function subtract(args) {
	const subTotal = args.reduce((total, item) => {
		return total - item;
	}, (args[0]) * 2);
  return subTotal;
}
    
function multiply(args) {
  const multTotal = args.reduce((total, item) => {
	  return total * item;
  }, 1);
  return multTotal;
}

function divide(args) {
	const divTotal = args.reduce((total, item) => {
		return total / item;
	}, (args[0]) * (args[0]));
  if (divTotal == Infinity) {
		return "ERROR";
	} else {
		return divTotal;
	}
}

function operate(op, args) {
	if (op == "+") {
		return add(args);
	} else if (op == "-") {
		return subtract(args);
	} else if (op == "*") {
		return multiply(args);
	} else if (op == "/") {
		return divide(args);
	}
}

function writing(button) {
	const display = document.querySelector("#display");
	let val = document.querySelector(`#${button}`);
	val.addEventListener("click", function() {
		display.value += val.textContent;
	})
}

function parse(string) {
	string = string.replace(" ", "");
	if (!isNaN(string)) {
		return Number(string);
	} else {
		if (string.includes("+")) {
			let sumArray = string.split(/\+(.+)/); // Split only at first occurrence
			return parse(sumArray[0]) + parse(sumArray[1]);
		} else if (string.includes("-")) {
			if (!string.match(/[+*/]/)) {
				let subArray = string.split("-");
				return operate("-", subArray);
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
				return operate("/", subArray);
			}
			let divArray = string.split(/\/(.+)/);
			return parse(divArray[0]) / parse(divArray[1]);
		}
	}
}

// IMPLEMENTING THE FUNCTIONS

// Making the display return to zero on refresh

const display = document.querySelector("#display");
display.value = "";

const clear = document.querySelector("#clear");
clear.addEventListener("click", function() {
	display.value = "";
});

// Giving the buttons functionality

writing("zero");
writing("one");
writing("two");
writing("three");
writing("four");
writing("five");
writing("six");
writing("seven");
writing("eight");
writing("nine");
writing("add");
writing("subtract");
writing("multiply");
writing("divide");

// Implementing the operations

const op = document.querySelector("#op");
op.addEventListener("click", function() {
	let result = parse(display.value);
	display.value = result;
});

// log
// Have to fix division by zero, it displays error but it also displays whathever number you were calculating before
// Add keyboard support
// Clean code (add, multiply, operate)
// Add parentheses
// Add history