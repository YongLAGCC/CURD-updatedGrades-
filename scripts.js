$(function(){   // get/read
    $('#get-button').click (function(){
        $.ajax({
            url: '/grades',
            type: "GET",
            data: 'application/json',
            success: function(response){
                var tbodyEle = $('tbody');
                tbodyEle.html(''); 
                
                console.log(response.grades[0].id);
                response.grades.forEach(function(grade){
                    tbodyEle.append(
                    `<tr>
                        <td class="id">${grade.id}  </td>
                        <td> <input type="text" class = "name" value= " ${grade.name}">  </td>
                        <td><input type="text" class = "grade" value= " ${grade.grade}" ></td>
                        <td>
                            <button class="update-button"> Update/put </button>
                            <button class="Delete-button"> Delete </button>
                        </td>
                     </tr>
                    `) 
                });
      
             }
        }) 
    })
    $("#create-form").submit(function(event){
        //console.log('created form')
        event.preventDefault(); // avoid to execute the actual submit form
        var createInput = $('#name-input');
        var createGradeInput= $('#grade-input');
        //console.log(createGradeInput + "new greade" + createInput)
        $.ajax({
            url: '/grades',
            type: "post",
            contentType: 'application/json',
            data: JSON.stringify({name: createInput.val(), grade: createGradeInput.val() }), // server handle this data exactly
            success: function(response){
                createInput.val('');
                createGradeInput.val('');
                $('#get-button').click(); 
            }
        });
    })

    $('table').on('click', '.update-button', function() {
        var rowEl = $(this).closest('tr');
        var id = rowEl.find('.id').text(); 
        var newName = rowEl.find('.name').val(); 
        var newGrade = rowEl.find('.grade').val(); 
       
        $.ajax({
            url: "/grades/" + id,
            type: 'PUT', 
            contentType: 'application/json',
            data: JSON.stringify({newName:newName, newGrade:newGrade}),
            success:function(response){
                console.log(response);
    
                $('#get-button').click(); 
            }
        })
    })
    $('table').on('click', '.Delete-button', function(){

        var rowEle = $(this).closest('tr');
        var id = rowEle.find('.id').text();  
 
        $.ajax({
            url:'/grades/' + id, 
            method: 'delete', 
            contentType: 'application/json', 
            success: function(response) {
                console.log(response)
                $('#get-button').click(); 
            
            }
        })


    })
})