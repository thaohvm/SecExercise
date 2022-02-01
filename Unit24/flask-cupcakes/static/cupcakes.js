const api = 'http://127.0.0.1:5000/api/cupcakes';

async function getCupcakes() {
  const response = await axios.get(api);
  const cupcakes = response.data.cupcakes;
  return cupcakes;
}

async function listCupcakes() {
  const list = $('#cupcakes-list');
  const cupcakes = await getCupcakes();
  list.empty();
  for (cupcake of cupcakes) {
    list.append(`<li>${cupcake.flavor}</li>`);
  }
}

listCupcakes();

const form = $('#new-cupcake-form');

form.on('submit', async function(event) {
	event.preventDefault();
	var $inputs = $('#new-cupcake-form :input');
	var values = {};
	$inputs.each(function() {
		if (this.name) {
			values[this.name] = $(this).val();
		}
	});

	await axios.post(api, values);
	listCupcakes();
});
