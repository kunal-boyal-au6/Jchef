
    document.querySelector('#sub').addEventListener('click',function(event){
        location.hash = "#home"
        event.preventDefault()
        var inputValue = document.querySelector('#foodie').value
        if( inputValue.length == 0){
            alert('Enter some food item')
            location.href = ""
        }
        var baseURL = 'https://forkify-api.herokuapp.com/api/search?q=';
        var newURL = baseURL += inputValue
        fetch(newURL).then(function(response){
            return response.json()
        })
        .then(function(filterRecipes){
            return filterRecipes.recipes
        })
        .then(function(superfilterRecipes){
            document.querySelector('.page01').style.display = 'none'
            document.querySelector('.page02').style.display = 'block' 
            for(var i = 0; i<superfilterRecipes.length; i++){
                document.querySelector('.page02').insertAdjacentHTML('beforeend',`<div class="card foodItem" style="width: 18rem;display:inline-block;margin-left:5rem;text-align:center;margin-top:2rem;">
                <a href="`+superfilterRecipes[i].source_url+`" target="_blank" > <img style="width: 18rem;height:17rem;" src="`+superfilterRecipes[i].image_url+`" class="card-img-top cardImg" alt="`+inputValue+`"> </a>
                <div class="card-body" >
                <a href="`+superfilterRecipes[i].source_url+`" target="_blank" > <h5 class="card-title">`+superfilterRecipes[i].title+`</h5> </a>
                <button type="button" class="btn btn-outline-secondary detail" value="`+superfilterRecipes[i].recipe_id+`">Ingredients</button><br><br>
                <p>Published By<p>
                <a href="`+superfilterRecipes[i].publisher_url+`" target="_blank" class="btn btn-light">`+superfilterRecipes[i].publisher+` </a>
                </div>
                </div>`)
                var a = document.querySelectorAll('.detail')
                a[i].addEventListener('click',function(event){
                    document.querySelector('.page02').style.display = 'none'
                    document.querySelector('.page03').removeAttribute("style");

                    var recipeId = event.target.value;
                    var base02URL = 'https://forkify-api.herokuapp.com/api/get?rId=';
                    var new02URL = base02URL+=recipeId;
                    fetch(new02URL).then(function(response){
                        return response.json()
                    })
                    .then(function(filteredData){
                        return filteredData.recipe
                    })
                    .then(function(superfilteredData){
                        document.querySelector('.page03').insertAdjacentHTML('beforeend',`<div style="text-align: center"> <img style="width: 18rem;height:17rem;" src="`+superfilteredData.image_url+`" class="card-img" alt="Food Item"> </div>`)
                        for(var j=0; j<superfilteredData.ingredients.length; j++){
                            document.querySelector('.page03').insertAdjacentHTML('beforeend',`<div style="text-align: center"><ul style="list-style:none"><li>`+superfilteredData.ingredients[j]+`</li></ul> </div>`)
                        }
                    })
                })
                

            }
        })
    })


    document.querySelector('.registerNav').addEventListener('click',function(event){
        
        document.querySelector('.page01').style.display = 'none'
        document.querySelector('.page02').style.display = 'none' 
        document.querySelector('.page03').style.display = 'none'
        document.querySelector('.registerPage').style.display = 'block'



        document.querySelector('.join').addEventListener('click',function(event){
            
            var name = document.querySelector('#rName').value
            var email = document.querySelector('#rEmail').value
            var password = document.querySelector('#rPass').value
            var confirmPassword = document.querySelector('#rCPass').value

            if((name.length && email.length && password.length && confirmPassword.length) == 0){
                alert('Fields can not be empty')
            }
            
            if(password !== confirmPassword){
                alert('Passwords did not match')
            }
        })
    })


