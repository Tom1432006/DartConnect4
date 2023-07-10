function addClickEventsToBoard(game){
    $(".board_cell").on('click', function(event){
        event.stopPropagation();
        event.stopImmediatePropagation();
        var collumn = $(this).attr("data-collumn");
        game.makeMove(collumn)
    })
}