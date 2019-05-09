function component() {
	const element = document.createElement("div");
	element.innerHTML = "Hello my dude!";

	return element;
}

document.body.appendChild(component());
