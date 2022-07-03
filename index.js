$(document).ready(() => {
    $('#sl-opt').change(function () {
        var valor = $('#sl-opt option:selected').val();
        switch (valor){
            case 'posts':
                $('#content div').remove();
                $.ajax({
                    url: 'https://jsonplaceholder.typicode.com/posts',
                    beforeSend: function(){
                        $('#modal-aguardar').show();
                    }
                })
                .done((dados)=>{
                    $('#modal-aguardar').hide();
                    $('#content div').remove();

                    $(dados).each(function(){
                        $('#content').append(
                            `<div id="posts${this.id}" style="border-bottom: 1px solid black"><h2>`+this.title+'</h2>'+
                            '<p>'+this.body+'</p></div>'
                        )
                    })

                })                

            break;
            case 'comments':
                $('#content div').remove();

                $.ajax({
                    url: 'https://jsonplaceholder.typicode.com/comments',
                    beforeSend: function(){
                        $('#modal-aguardar').show();
                    }
                })
                .done((dados)=>{
                    $('#modal-aguardar').hide();
                    $(dados).each(function(){
                        $('#content').append(
                            `<div id="comments${this.id}" style=" margin-bottom: 30px;">`+
                                '<div class="d-flex" style="align-items: center;">'+
                                    '<img src="img/generic_avatar.jpg" class="thumbnail-border-radius" alt="" style="border-radius: 50%; margin-right: 15px;">'+
                                    '<h2>'+this.name+'</h2>'+
                                '</div>'+
                                '<p>'+this.body+'</p>'+
                                '<div class="d-flex">'+
                                    '<div>'+
                                        '<img src="img/email_icon.png" alt="" style="width: 25px;">'+
                                        '<a href="#" style="text-decoration: none;">'+this.email+'</a>'+
                
                                        '<img src="img/like_icon.png" style="width: 25px; margin-left: 15px;">'+
                                        '<span>0</span>'+
                
                                        '<img src="img/dislike_icon.png" style="width: 25px; margin-left: 15px;">'+
                                        '<span>0</span>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'
                            
                            


                        )
                    })

                })         


            break;
            case 'photos':
                $('#content div').remove();
                
                $.ajax({
                    url: 'https://jsonplaceholder.typicode.com/photos',
                    beforeSend: function(){
                        $('#modal-aguardar').show();
                    }
                })
                .done((dados)=>{
                    $('#modal-aguardar').hide();

                    console.log(dados)
                    var cont = 0
                    var aux = 1

                    var val1 = 101
                    var val2 = 200

                    $(window).bind('scroll' , function () {
                        if(Math.ceil($(window).scrollTop()) == Math.ceil(($(document).height() - $(window).height()))) {
                            if (cont <= aux){
                                let dadosAux = dados.slice(val1,val2, aux)

                                $(dadosAux).each(function(){
                                    $('#content').append(
                                        `<div id="img${this.id}" onclick="chamaThumblr(url${this.id}, titleImgThumblr${this.id});" class="d-flex " style="width: 300px; height: 300px; margin: 10px;
                                            display: flex;
                                            align-items: center;" >`+ 
                                            '<img src="'+this.thumbnailUrl+'" class="img-thumbnail" style="width: 100%;">'+
                                            `<input type="hidden" id="url${this.id}" name="url${this.id}" value="${this.url}">`+
                                            `<input type="hidden" id="titleImgThumblr${this.id}" name="titleImgThumblr${this.id}" value="${this.title}">`+
                                        '</div>'
                                    )   
                                })
                                val1 += 100
                                val2 += 100 
                            }
                            

                            aux = cont + 1;
                            cont += 1;

                        }
                        
                    });
                    dadosAux = dados.slice(0,100)
                    console.log(dadosAux)
                    
                    $(dadosAux).each(function(){
                        $('#content').append(
                            `<div id="img${this.id}" onclick="chamaThumblr(url${this.id}, titleImgThumblr${this.id});" class="d-flex " style="width: 300px; height: 300px; margin: 10px;
                                display: flex;
                                align-items: center;" >`+ 
                                '<img src="'+this.thumbnailUrl+'" class="img-thumbnail" style="width: 100%;">'+
                                `<input type="hidden" id="url${this.id}" name="url${this.id}" value="${this.url}">`+
                                `<input type="hidden" id="titleImgThumblr${this.id}" name="titleImgThumblr${this.id}" value="${this.title}">`+
                            '</div>'
                        )
                    })
                })         
            break;
        }
    })
})


function chamaThumblr(url, title){
    $('#staticBackdropLabel').text(title.value)
    $('#bodyModel').css({
        "background-image": `url(${url.value})`,
        "width": "598px",
        "height": "598px"
    })
    $('#imgTumblr').modal('show');
}