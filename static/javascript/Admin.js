var btns = document.getElementsByClassName("button__edit");

for (var i = 0; i < btns.length; i++) {
    btns[i].onclick = function() {
      try {
        // Obtén el ID del producto desde el atributo de datos del botón
        var productId = this.dataset.productId;

        // Muestra el modal
        modal.style.display = "block";
    
        // Haz una solicitud AJAX para obtener los datos del producto
        fetch('/get_product/' + productId)
          .then(response => response.json())
          .then(product => {
            // Rellena los campos del formulario con los datos del producto
            document.getElementById('edit-name').value = product.name;
            document.getElementById('edit-marca').value = product.marca;
            document.getElementById('edit-modelo').value = product.modelo;
            document.getElementById('edit-cilindraje').value = product.cilindraje;
            document.getElementById('edit-cantidad').value = product.cantidad;
            document.getElementById('edit-precio').value = product.precio;
    
            // Modifica la acción del formulario para incluir el ID del producto
            document.querySelector('#edit-form').action = '/admin/edit_product/' + productId;
          });
      } catch (e) {
        console.log(e);
      }
    }
}
