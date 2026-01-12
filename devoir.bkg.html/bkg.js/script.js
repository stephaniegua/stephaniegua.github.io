  // Gestion du burger


document.querySelector(".burg-icon").addEventListener("click", function() {
    document.querySelector(".menu-overlay").classList.add("visible");
});

document.querySelector(".Close-menu").addEventListener("click", () => {
  const menu = document.querySelector(".menu-overlay");
  menu.style.display = 'none'; // Hides the menu when the button is clicked
});




    // Gestion du bouton "Lire la suite"


    document.querySelectorAll(".read-more-btn").forEach(button => {
        button.addEventListener("click", function() {
            const article = this.closest("article");
            const dots = article.querySelector(".dots");
            const moreText = article.querySelector(".more");

            if (dots.style.display === "none") {
                dots.style.display = "inline";
                moreText.style.display = "none";
                this.textContent = "Lire la suite";
            } else {
                dots.style.display = "none";
                moreText.style.display = "inline";
                this.textContent = "Lire moins";
            }
        });
    });



           
