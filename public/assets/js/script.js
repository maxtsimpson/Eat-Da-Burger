// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
    $(".eat").on("click", (event) => {
      event.preventDefault();
      const id = $(event.target).data("id");
      const name = $(event.target).data("name");
  
      const eatenBurger = {
        id: id,
        name: name,
        devoured: 1
      };

      console.log(eatenBurger)
  
      // Send the PUT request.
      $.ajax("/api/burgers/" + id, {
        type: "PUT",
        data: eatenBurger
      }).then(() => {
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  
    $("#makeBurgerButton").on("click", (event) => {
      // Make sure to preventDefault on a submit event.
      event.preventDefault();
      const name = $(event.target).parent().children("#burgerNameInput")[0].value
  
      // Send the POST request.
      $.ajax("/api/burgers", {
        type: "POST",
        data: {burger_name: name}
      }).then(() => {
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  
    $(".delete").on("click", function(event) {
      const id = $(this).data("id");
  
      // Send the DELETE request.
      $.ajax("/api/burgers/" + id, {
        type: "DELETE"
      }).then(() => {
          console.log("deleted burger", id);
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  });
  