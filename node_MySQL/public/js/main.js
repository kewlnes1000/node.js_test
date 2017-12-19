$(document).ready(()=>{
    $('.delete-article').on('click',(e)=>{
        $target = $(e.target);
        console.log($target.attr('data-id'));
        const id = $target.attr('data-id');
        $.ajax({
            type:'DELETE',
            url:'/article/'+id,
            success: function(res){
                alert('Deleting Article');
                window.location.href='/';
            },
            error: function(err){
                console.log(err);
            }
        });
    });
});