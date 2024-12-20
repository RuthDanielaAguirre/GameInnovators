fetch("juegos.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    console.log(data);

    const row = document.querySelector(".row");
    data.forEach((element) => {
      const gameCard = `   
      <div class="card animate__animated  border border-2 border-purple  mx-auto overflow:hidden;" style="opacity: 0; transition: opacity 0.6s ease-in-out;" data-effect="animate__fadeInUp">
        <img src="${element.imagen}" class="card-img-top mt-3 border  rounded" style="height:12rem; object-fit: cover;" alt="${element.nombre}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title text-light ">${element.nombre}</h5>
          <p class="card-text text-light">${element.descripcion}</p>
         <button type="button" class="btn btn-purple btn-purple:hover mt-auto style=""" 
         data-bs-toggle="modal" 
         data-bs-target="#gameModal"
         data-nombre="${element.nombre}"
         data-descripcion="${element.descripcion}"
         data-imagen="${element.imagen}"
         data-plataforma="${element.plataforma.join(', ')}"
         data-genero="${element.genero}"
         data-calificacion="${element.calificacion}">
          Saber más
          </button>
        </div>
      </div>`;
      row.innerHTML += gameCard;
    });

    initScrollAnimations();

    const modalElement= document.getElementById('gameModal');
    modalElement.addEventListener('show.bs.modal',(event)=>{
      const button = event.relatedTarget;
      const nombre= button.getAttribute('data-nombre');
      const descripcion = button.getAttribute('data-descripcion');
      const imagen = button.getAttribute('data-imagen');
      const plataforma= button.getAttribute('data-plataforma');
      const genero = button.getAttribute('data-genero');
      const calificacion = button.getAttribute('data-calificacion');
    
      document.getElementById('gameModalLabel').textContent =nombre;
      document.getElementById('gameModalImg').src =imagen;
      document.getElementById('gameModalImg').alt =nombre;
      document.getElementById('gameModalDesc').textContent =`Descripción: ${descripcion}`;
      document.getElementById('gameModalGenero').textContent =`Género: ${genero}`;
      document.getElementById('gameModalPlataforma').textContent =`Plataformas: ${plataforma}`;
      document.getElementById('gameModalCalificacion').textContent =`Calificación: ${calificacion}`;
    });

    

  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });

  function initScrollAnimations(){
    const cards = document.querySelectorAll('.card');

    const observer = new IntersectionObserver(
      (entries) =>{
        entries.forEach((entry)=>{
          if (entry.isIntersecting){
            const effect = entry.target.getAttribute("data-effect");
            entry.target.classList.add(effect);
            entry.target.computedStyleMap.opacity =1;
            observer.unobserve(entry.target);
          }
        });
      },
      {threshold: 0.1}
    );
    cards.forEach((card)=> observer.observe(card));
  }

