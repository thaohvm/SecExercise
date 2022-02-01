let searchResults = $("#search-results");

function addImg(data) {
    let newImg = document.createElement("img");
    newImg.setAttribute("src", data.data[0].images.original.url);
    searchResults.append(newImg);
}

$("#new-form").on("submit", async function (evt) {
    evt.preventDefault();
    const res = await axios.get("http://api.giphy.com/v1/gifs/search", {
        params: {
            q: $("#search-input").val(),
            api_key: "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym"
        }
    })
    addImg(res.data);
})

let deleteImg = document.getElementById("remove-btn");
deleteImg.addEventListener("click", function() {
    searchResults.html("");
})
