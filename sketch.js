/*
@author Kiwi
@date 2021-09-24

ideas: first, we need to play APICO more
.   cursor point at mouseX mouseY: make your own cursor!
    main menu box:
        black outline, rounded corner, transparent fill
        mouseover = additional white outline


    generate single tree with rounded rectangle
        how do we do the roots?
            two tree sizes, variety of root orientations
                just pixels along the bottom

        tree highlight: how do we make an outline?
    menus. how do we use a pixel font?
        menu system. draggable with buttons on left
    inventory box
        big mono font displaying quantity, limited to 99
    menu bar with hotkey and yellow highlights
        mousewheel selects and highlights!
    bezier curve procedurally generated slash

 */
let font
let cursor, big_cursor

function preload() {
    font = loadFont('fonts/Meiryo-01.ttf')
    cursor = loadImage('img/apico-6x8-cursor.png')
}

function setup() {
    createCanvas(640, 360)
    colorMode(HSB, 360, 100, 100, 100)
    imageMode(CORNER)
    noSmooth()
    noCursor()
    big_cursor = scale_image(cursor, 12)
}

// read a pixel art image and blow it up by n times in each dimension
function scale_image(img, factor) {
    let result = createImage(img.width*factor, img.height*factor)

    result.loadPixels()
    let c
    for (let i = 0; i < img.width; i++)
        for (let j = 0; j < img.height; j++) {
            // get the color of pixel at i.j
            c = img.get(i, j)

            // set the appropriate nxn section of our result to the color of
            // that single pixel
            for (let m=i*factor; m<i*factor+factor; m++)
                for (let n=j*factor; n<j*factor+factor; n++)
                    result.set(m, n, c)
        }

    result.updatePixels()
    return result
}

function draw() {
    background(209, 80, 30)
    image(big_cursor, mouseX, mouseY)
}

function mousePressed() {
    console.log(mouseX)
}