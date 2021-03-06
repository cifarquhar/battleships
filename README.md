# Battleships

An implementation of the board game Battleships using the React JavaScript library, along with socket.io, npm and node express server. 

*__Please note:__ This is a work in progress. The game works as per the standard boardgame rules, but there are some issues still to be addressed. The two most obvious are handling clicks on the tracking board (a second click is required to change the colour of the square, although the response form the other player is received immediately) and errors in initial ship placement (in most cases the user has to restart completely, losing any ships which were correctly placed). In the back-end, there are changes to be made in terms of file structure, in particular moving the validation functions into their own file.*


## Setup

First, give start.sh permission to run using:

*chmod 755 start.sh*

Execute the start.sh script and navigate to the browser tabs it opens (it may be necessary to refresh one/both of them). From there click on the top board to place ships and make sure each is in a valid position using the "validate placement" button. Once all ships are placed click the "ready" button and wait for your opponent to do the same.

## Primary Board

A board component is rendered within the GameContainer class with a type "primary" passed to it in props. The board in turn renders ten columns, each of which renders ten squares for a total of 100 squares on the board. Each square has a "full" boolean in its state which is false on creation. When a square is clicked this changes to true, the square is re-rendered in a different colour to show it has been clicked and a counter is incremented in the container's state. The square's click handler method checks the value of this counter before changing the "full" boolean, only allowing the change if that value is less than 17. A further guard ensures each square can only be clicked once.


## Tracking Board

A second board is rendered by the container, this time with "targeting" as its type in props. The board is rendered in the same way, although in a different colour to distinguish it from the primary board. 

Each square is created with a "hit" attribute, which is "unknown" on creation. When a square is clicked a socket.io event is triggered indicating which player clicked and on which square. when the opposing player receives the event the coordinates of the square are checked against their own primary grid before a response is transmitted indicating if the shot hit or missed. When the response is received the square on the attacking player's tracking grid is updated to show the response, with a hit counter being incremented if the response is "hit". Note that a second click is required to change the colour of the square, although this is not treated as a separate event. As with ship placement, a guard prevents the same square being targeted twice.


## Validation

When the game is initialised an array is created showing the sizes of the ships to be placed. A second empty array is generated in which to store squares to be verified.

The player clicks the number of squares shown by the "ship to place" instruction before clicking the "validate placement" button. Methods within the GameContainer class then check that the squares are all in the same row or column and that the squares are adjacent to each other. If these conditions are met the "ship to place" variable is updated to show the next ship size and the array of squares to check is cleared, while a confirmation message is shown to the player. If the conditions are not met, or if an incorrect number of squares has been clicked, an error message is shown to the player. Note that if a mistake is made in ship placement, the window must be refreshed in order to clear the misplaced squares. 

Once all ships are placed the player can click the "ready" button to indicate they are ready to start the game. Once both players have clicked the button, the player who was first to click it takes the first turn.


## Determining A Winner

If a player guesses a square which contains an opponent's ship they score a hit, and make another guess. If they miss their turn is over. The change of turns is handled on the back end as part of processing the response to a guess. Before the turn switches the players hit counter is checked, and if it has reached 17 the player is declared the winner. Both players are notified by pop-ups.
