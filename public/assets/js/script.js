// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
    $(".eat").on("click", () => {
      console.log("eating the burger")
      const id = $(this).data("id");
      const name = $(this).data("name");
      //const devoured = $(this).data("devoured"); //isnt necessary we now it should be devoured
  
      const eatenBurger = {
        id: id,
        name: name,
        devoured: 1
      };
  
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
  
    $("#makeBurgerButton").on("click", () => {
      // Make sure to preventDefault on a submit event.
      event.preventDefault();
      console.log("making the burger")
      const name = $(this).data("name");
  
      // Send the POST request.
      $.ajax("/api/burgers", {
        type: "POST",
        data: {burger_name: name}
      }).then(
        function() {
          console.log("created new burger");

          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  
    $(".delete-burger").on("click", function(event) {
      const id = $(this).data("id");
  
      // Send the DELETE request.
      $.ajax("/api/burgers/" + id, {
        type: "DELETE"
      }).then(
        function() {
          console.log("deleted burger", id);
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  });
  