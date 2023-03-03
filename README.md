# Explanation

## getColoredMap() 

The getColoredMap function takes the Rawmap and colors all the land squares using a recursive algorithm.

First the function initializes an empty object to store used colors and gets the raw map. 

Then it defines a colorate function that takes the current position, a color, and recursively colors all the neighboring land squares with the same color.

Next the function loops through each square in the raw map. If the square is land, it generates a random color that hasn't been used before for a neighboring land square. 

Then it calls the colorate function with the current position and the selected color to color all the connected land squares.

And then returns the colored map.
