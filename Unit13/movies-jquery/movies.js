let currentId = 0;
let moviesList = [];

$(function() {
    $("#new-form").on("submit", function(evt) {
        evt.preventDefault();
        let title = $("#title").val();
        let rating = $("#rating").val();

        let movieData = { title, rating, currentId };
        const HTMLtoAppend = createMovieDataHTML(movieData);

        currentId++;
        moviesList.push(movieData);

        $("#movie-table-body").append(HTMLtoAppend);
        $("#new-form").trigger("reset");
    });

    $("tbody").on("click", ".btn.btn-danger", function(evt) {
        // find index of the movie wanted to delete
        let indexToRevmove = moviesList.findIndex(movie => movie.currentId === +$(evt.target).data("deleteId"));
        //remove from list
        moviesList.splice(indexToRevmove, 1);
        //remove from DOM
        $(evt.target).closest("tr").remove();
    })
})

function createMovieDataHTML(data) {
    return `
      <tr>
        <td>${data.title}</td>
        <td>${data.rating}</td>
        <td>
          <button class="btn btn-danger" data-delete-id=${data.currentId}>
            Delete
          </button>
        </td>
      <tr>
    `;
  }
