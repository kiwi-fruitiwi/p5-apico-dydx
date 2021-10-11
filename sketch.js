/*
@author Kiwi
@date 2021-09-24

ideas: first, we need to play APICO more
.   cursor point at mouseX mouseY: make your own cursor!
.   small object creation: bee, beehive
    shadows are generated on the fly as the first (lowest) layer!
    mirror function
    generate single tree top with rounded rectangle
        https://p5js.org/examples/structure-create-graphics.html
        how do we do the roots?
            two tree sizes, variety of root orientations
                just pixels along the bottom
        tree highlight: how do we make an outline?
            is this a convex hull thing?
            or do we set an outline ahead of time and call .outline lol

    bees are three pixels: [black, yellow, black]
        they leave a fading particle trail
    the terrain is procedurally generated
        research needed on how to do water and reflections
    main menu box:
        black outline, rounded corner, transparent fill
        mouseover = additional white outline
    menus. how do we use a pixel font?
        menu system. draggable with buttons on left
    inventory box
        big mono font displaying quantity, limited to 99
    menu bar with hotkey and yellow highlights
        mousewheel selects and highlights!
    bezier curve procedurally generated slash

 */

// this function does nothing except code wrap my comments in WebStorm :P
function comment_wrapper() {
/* 🔧

cursor point at mouseX mouseY: make your own cursor!
    import pixel cursor and display it at mouseX, mouseY using image(i, x, y)
        optional:
            install and teach aseprite?
            have bears convert some pixel art
    test img.resize(s) and note how blurry it is
    make art scale function with no blur
        look at https://p5js.org/reference/#/p5/createImage
        loadPixels, updatePixels, get, set

🔧 generate bee with createGraphics
🔧 make beehive with aseprite


pixel art procreate setup?

 */
}

// returns an image of a tree in APICO style
function generate_tree(w, h) {
    // tree colors in 3 types
    let tree_border = color(205, 52, 29)
    let light_tree_body = color(165, 51, 67)
    let light_tree_shadow = color(170, 51, 51)
    let medium_tree_body = color(170, 51, 60)
    let medium_tree_shadow = color(183, 51, 47)
    let dark_tree_body = color(175, 52, 54)
    let dark_tree_shadow = color(183, 51, 40)

    // trunk browns (3), +black
    let light_tree_trunk = color(328, 22, 46)
    let medium_tree_trunk = color(277, 22, 33)
    let dark_tree_trunk = color(221, 66, 20)
    let tree_trunk_shadow = color(165, 40, 63)

    let pg = createGraphics(w, h);
    pg.loadPixels()

    // let's make the fill: this is the main tree color
    for (let i = 1; i < w-1; i++)
        for (let j = 1; j < h-1; j++) {
            // get the color of pixel at i.j
            // c = img.get(i, j)
            pg.set(i, j, medium_tree_body)
        }

    // vertical borders and shadows
    for (let r = 1; r < h-1; r++) {
        pg.set(0, r, tree_border) // left border
        pg.set(w-1, r, tree_border) // right border
        pg.set(w-2, r, medium_tree_shadow) // tree shadow

    }

    // horizontal borders and shadows
    for (let c=1; c < w-1; c++) {
        pg.set(c, 0, tree_border) // top border
        pg.set(c, h-1, tree_border) // bottom border
        pg.set(c, h-2, medium_tree_shadow) // tree shadow
    }

    // 4 shadow points at each corner
    pg.set(1, 1, medium_tree_shadow)
    pg.set(1, h-3, medium_tree_shadow)
    pg.set(w-3, 1, medium_tree_shadow)
    pg.set(w-3, h-3, medium_tree_shadow)

    // generate random shadow points on bottom



    // generate random shadow points on right

    pg.updatePixels()
    return pg
}

function generate_tree_trunk() {
    let light_brown = color(328, 22, 46)
    let medium_brown = color(277, 22, 33)
    let dark_brown = color(276, 35, 25)
    let trunk_border = color(221, 66, 20)
    let shadow = color(165, 40, 63)
    // the shadow might be just lower brightness on whatever it's on
    // maybe it's a semi-transparent black mask

    let pg = createGraphics(13, 6);
    pg.loadPixels()

    pg.updatePixels()
    return pg
}

function generate_rock() {
    // rocks are just like trees, except their corners are more rounded!

    let rock_body = color(196, 8, 85)
    let rock_shadow = color(204, 15, 74)
    let rock_border = color(217, 33, 39)
    let rock_ground_shadow = color(163, 41, 72)
}


// bees are always 3 pixels wide
function generate_bee() {
    let yellow = color(42, 69, 84)
    let black = color(221, 66, 20)
    let wing = color(34, 3, 91)

    let pg = createGraphics(3, 2);
    pg.loadPixels()

    pg.set(1, 0, wing)
    pg.set(0, 1, black)
    pg.set(1, 1, yellow)
    pg.set(2, 1, black)

    pg.updatePixels()
    return pg
}

let font
let cursor, big_cursor, environment
let tree, bee, beehive


function preload() {
    font = loadFont('fonts/Meiryo-01.ttf')
    cursor = loadImage('img/classically trained 83x5.png')
    environment = loadImage('img/environment-640x360.png')
    beehive = loadImage('img/apico-12x12-beehive.png')
}

function setup() {
    createCanvas(640, 360)
    colorMode(HSB, 360, 100, 100, 100)
    imageMode(CORNER)

    noSmooth()
    noCursor()
    big_cursor = scale_image(cursor, 6)
    // tree = scale_image(generate_tree(13, 24), 3)
    bee = scale_image(generate_bee(), 6)
    // bee.save('saved-image', 'png');
    // tree = generate_tree(13, 24)
}

function draw() {
    background(209, 80, 30)
    image(environment, 0, 0)
    // image(big_cursor, mouseX, mouseY)
    image(big_cursor, mouseX, mouseY)

}

function mousePressed() {
    console.log(mouseX)
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
    result.save()
    return result
}