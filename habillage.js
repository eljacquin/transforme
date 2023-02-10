document.addEventListener("DOMContentLoaded", function() {
    let canvas = document.getElementById("cvs");
    const WIDTH = canvas.width = window.innerWidth;
    const HEIGHT = canvas.height = window.innerHeight;
    let ctx = canvas.getContext("2d");
    var body = new Image();
    body.src="perso.png";
    var x_body=0;
    var y_body=0;
    //size_large=600;
    size_large=HEIGHT*(4/5);
    size_hauteur=HEIGHT;
    var x_garde_robe=HEIGHT*(4/5)+50;
    var y_garde_robe=0;
    var gr_size_item=HEIGHT/8;

    var tab_cheveux = ["cheveux_carre","cheveux_anais"];
    var tab_sourcils = ["sourcils_fronces","sourcils_normaux","sourcils_points"];
    var tab_yeux = ["yeux_bleus","yeux_fermes","yeux_bruns"];
    var tab_nez = ["nez"];
    var tab_bouche = ["bouche_chat","bouche_contente"];
    var tab_haut = ["haut_debardeur","haut_t-shirt","haut_t-shirt_blanc","haut_veste_sorciere","haut_raincoat","haut_veste_brune"];
    var tab_bas = ["bas_jeans","bas_jupe_blanche","bas_jupe_noire"];
    var tab_chaussures = ["chaussures_baskets_blanches","chaussures_tongs"];

    var porter = new Array();
    porter.push("perso");
    ctx.drawImage(body,x_body,y_body,size_large, size_hauteur);

    var garde_robe = [tab_cheveux,tab_sourcils,tab_yeux,tab_nez,tab_bouche,tab_haut,tab_bas,tab_chaussures];

    garde_robe.forEach(function (element,n_etagere){
        element.forEach(function (item,index) {afficherItemZ(element,n_etagere,index)});
    });

    function afficherItemZ(tab,n_etagere,index){
        var item_z= new Image();
        item_z.src="images/"+tab[index]+"_z.png";
        ctx.fillStyle="rgb(243, 231, 191)";
        ctx.fillRect(x_garde_robe+(index*gr_size_item),y_garde_robe+(n_etagere*gr_size_item),gr_size_item, gr_size_item);
        ctx.fillStyle="rgb(255, 249, 227)";
        ctx.fillRect(x_garde_robe+(index*gr_size_item)+5,y_garde_robe+(n_etagere*gr_size_item)+5,gr_size_item-10, gr_size_item-10);
        ctx.drawImage(item_z,x_garde_robe+(index*gr_size_item),y_garde_robe+(n_etagere*gr_size_item),gr_size_item, gr_size_item);
    }

    function afficherItem(tab,index){
        var item= new Image();
        item.src="images/"+tab[index]+".png";
        ctx.drawImage(item,x_body,y_body,size_large, size_hauteur);
    }

    function afficherItemNom(nom,ctx){
        var item= new Image();
        item.src="images/"+nom+".png";
        ctx.drawImage(item,x_body,y_body,size_large, size_hauteur);
    }

    canvas.addEventListener('click', function(event) {
            var x = event.pageX;
            var y = event.pageY;

            var n_etagere = Math.floor((y-y_garde_robe)/gr_size_item);
            var n_item = Math.floor((x-x_garde_robe)/gr_size_item);
             
            if (x < x_garde_robe+8*gr_size_item &&  x > x_garde_robe && y < y_garde_robe+gr_size_item*8 && y > y_garde_robe){
                if(!porter.includes(garde_robe[n_etagere][n_item])){
                    porter.push(garde_robe[n_etagere][n_item]);
                }else{
                    const index = porter.indexOf(garde_robe[n_etagere][n_item]);
                    porter.splice(index, 1);
                }
            }
    }, false);

    function afficherVetementPerso(ctx){
        porter.forEach(function (item) {afficherItemNom(item,ctx)});
    }


    function render() {
        ctx.globalAlpha=1;
        ctx.clearRect(x_body, y_body, size_large, size_hauteur);
        afficherVetementPerso(ctx);
        garde_robe.forEach(function (element,n_etagere){
            element.forEach(function (item,index) {afficherItemZ(element,n_etagere,index)});
        });
        ctx.fillStyle="white";
        ctx.font='30px serif';
    }

    (function loop() {
        requestAnimationFrame(loop);
        render();
    })();

});