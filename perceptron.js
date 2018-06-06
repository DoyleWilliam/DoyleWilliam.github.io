var learning_rate = .1;
var input_size = 2;
var training_size = 2;
var training = [];
var temp_inputs = [];
var answer;
var x;
var training_points = [];
var run_button;
var settings_button;
var user_training_size;
var user_function;
var user_inputs = [];
var c = 0;
var gc = 0;
var user_points = [];
var temp_input;
var user_output;
var m = 1;
var b = 0;
var bias = 1;



function setup(){
    createCanvas(window.innerWidth, window.innerHeight);

    //new perceptron
    perc = new Perceptron(input_size);

    //creating the training set
    create_training_points();

    //creating the inputs and button
    fill(0);
    strokeWeight(1);
    stroke(0);
    for (let i = 0; i < input_size; i++)
    {
        user_inputs[i] = createInput();
        text('Input' + i + ': ', (window.innerWidth / 2) - 400, (window.innerHeight / 2) + (20 * i) + 100);
        user_inputs[i].position((window.innerWidth / 2) - 320, (window.innerHeight / 2) + (20 * i) + 85);
    }
    run_button = createButton('Run');
    run_button.position((window.innerWidth / 2) - 320, (window.innerHeight / 2) + 150);
    run_button.mousePressed(run);

    // settings
    user_training_size = createInput();
    //text('Training Size: ', (window.innerWidth / 3), (window.innerheight / 3) + 60);
    //user_training_size.position((window.innerWidth / 3) + 30, (window.innerheight / 3) + 60);

    user_function_m = createInput();
    user_function_b = createInput();
    //text('Model Function: ', (window.innerWidth / 3), (window.innerheight / 3) + 40);
    //user_function.position((window.innerWidth / 3) + 30, (window.innerheight / 3) + 40);

    settings_button = createButton('Change');
    //settings_button.position((window.innerWidth / 3), window.innerheight);
    //settings_button.mousePressed(setting);
}

function create_training_points()
{
    for (let i = 0; i < training_size; i++)
    {
        for (let k = 0; k < input_size; k++)
        {
            temp_inputs[k] = random(-1, 1);
        }
        if (temp_inputs[1] < f(temp_inputs[0]))
        {
            answer = -1;
        }
        else
        {
            answer = 1;
        }
        training[i] =
        {
            input: [temp_inputs[0], temp_inputs[1]],
            output: answer
        }
    }

    // putting the training points in the point display
    for (let k = 0; k < training_size; k++)
    {
        training_points[k] = new Point;

        for(let i = 0; i < input_size; i++)
        {
            training_points[k].inputs[i] = training[k].input[i];
        }
        training_points[k].output = training[k].output;
    }
}

function setting()
{
    c = 0;

    for (let i = 0; i < input_size; i++)
    {
        perc.weights[i] = random(-1, 1);
    }

    training_size = user_training_size.value();
    create_training_points();

    m = float(user_function_m.value());
    b = float(user_function_b.value());



}

function run()
{
    var curr_user_point = 0;
    user_points.push(new Point);
    for (let i = 0; i < input_size; i++)
    {
        temp_input = user_inputs[i].value();
        perc.inputs[i] = temp_input;
        user_points[curr_user_point].inputs[i] = temp_input;
    }
    curr_user_point++;
    user_output = perc.activate();
}

function draw(){
    background("white");
    graph(f);
    fill(255);
    stroke(255);
    textSize(20);
    //draws over any extra graph
    rect(window.innerWidth / 2, window.innerHeight / 2, window.innerWidth, window.innerHeight);
    // training points

    perc.display(input_size);

    if (c == 0)
    {
        perc.train(training, training_size, input_size, learning_rate);
    }

    for (let i = 0; i < training_size; i++)
    {
        fill(155)
        training_points[i].display();
    }

    for (let i = 0; i < user_points.length; i++)
    {
        fill(0, 0, 255)
        user_points[i].output = user_output;
        user_points[i].display();
    }

    //settings
    fill(0);
    strokeWeight(1);
    stroke(0);
    text('Settings',(width / 8), (height / 4));

    text('Training Size: ', (width / 8), (height / 4) + 40);
    user_training_size.style('font-size', '10px');
    user_training_size.position((width / 8) + 130, (height / 4) + 25);

    //y = mx + b
    text('Model Function: y = ', (width / 8), (height / 4) + 80);
    user_function_m.style('font-size', '10px');
    user_function_m.position((width / 8) + 180, (height / 4) + 65);
    text('x + ', (width / 8) + 315, (height / 4) + 80);
    user_function_b.style('font-size', '10px');
    user_function_b.position((width / 8) + 350, (height / 4) + 65);

    //change button
    settings_button.position((width / 8), (height / 4) + 100);
    settings_button.mousePressed(setting);

    //input
    fill(0);
    strokeWeight(1);
    stroke(0);
    for (let i = 0; i < input_size; i++)
    {
        text('Input' + i + ': ', (window.innerWidth / 2) - 400, (window.innerHeight / 2) + (20 * i) + 100);
        user_inputs[i].position((window.innerWidth / 2) - 320, (window.innerHeight / 2) + (20 * i) + 85);
    }
    run_button.position((window.innerWidth / 2) - 320, (window.innerHeight / 2) + 150);

    //constant
    c = 1;

    //about
    text('About: The projected created is a basic neural network that involves a simple', (width / 8) - 50, (height / 8));
    text('machine learing algorithm called a perceptron. The goal of the perceptron', (width / 8) - 50, (height / 8) + 20);
    text('is to try to figure out whether a certain point is above or below the line on', (width / 8) - 50, (height / 8) + 40);
    text('the graph. However the perceptron doesnt actually know where the line is so it', (width / 8) - 50, (height / 8) + 60);
    text('must learn by looking at training data points. when training the percetron', (width / 8) - 50, (height / 8) + 80);
    text('knows whether the training point is above or below so it can guess and compare', (width / 8) - 50, (height / 8) + 100);
    text('the guess to the actual answer and get the error. Then from the error it tunes', (width / 8) - 50, (height / 8) + 120);
    text('the weights accordingly. The new tuned weights can then be used to process new', (width / 8) - 50, (height / 8) + 140);
    text('points to determine whether the point is above or below the line.', (width / 8) - 50, (height / 8) + 160);
}

class Point{
    constructor()
    {
        this.size = 20;
        this.stroke1 = color(0, 255, 0);
        this.stroke2 = color(255, 0, 0);
        this.strokeSize = 5;
        this.color = 150;
        this.inputs = [];
        this.output;
    }

    display(i)
    {
        if (this.output == 1)
        {
            stroke(this.stroke1);
            strokeWeight(this.strokeSize);
            ellipse(((window.innerWidth * (3/4)) + (this.inputs[0] * (window.innerWidth / 4))), (window.innerHeight / 4) - (this.inputs[1] * (window.innerHeight / 4)), this.size = 20, this.size = 20);
        }
        else
        {
            stroke(this.stroke2);
            strokeWeight(this.strokeSize);
            ellipse(((window.innerWidth * (3/4)) + (this.inputs[0] * (window.innerWidth / 4))), (window.innerHeight / 4) - (this.inputs[1] * (window.innerHeight / 4)), this.size = 20, this.size = 20);
        }
    }
}

class Perceptron{
    constructor(input_size){
        this.stext = 20;
        this.color = 10;
        this.size = 75;
        this.weights = [];
        this.inputs = [];
        this.bias;
        this.bias_weight = random(-1, 1);
        for (let i = 0; i < input_size; i++)
        {
            this.weights[i] = random(-1, 1);
        }
    }

    process(input_size){
        let sum = 0;

        for (let i = 0; i < input_size; i++)
        {
            sum += this.inputs[i] * this.weights[i];
        }
         return sum
    }

    display(input_size){
        fill(this.color)
        stroke(0);
        strokeWeight(1);
        //ellipse((window.innerWidth / 2) - 200, (window.innerHeight / 2) - 100, this.size, this.size);

        for (let i = 0; i < input_size; i++)
        {
            textSize(this.stext);
            text('Weight' + i + ': ' + this.weights[i], (window.innerWidth / 2), (window.innerHeight / 2) + (20 * i) + 100)
        }

        /*for (let i = 0; i < input_size; i++)
        {
            textSize(this.stext);
            text('Input' + i + ': ' + this.inputs[i], (window.innerWidth / 2) - 400, (window.innerHeight / 2) + (20 * i) + 100)
        }
        */
        textSize(this.stext);
        text('Output' + ': ' + this.activate(), (window.innerWidth / 2) + 400, (window.innerHeight / 2) + 100)
    }

    train(training, training_size, input_size, learning_rate, i){
        for (let i = 0; i < training_size; i++)
        {
            for (let k = 0; k < input_size; k++)
            {
                this.inputs[k] = training[i].input[k]
            }

            let guess = this.process();
            let desired = training[i].output;
            let error = desired - guess;

            for (let l = 0; l < input_size; l++)
            {
                this.weights[l] += ((learning_rate) * (error) * (this.inputs[l]));
            }
        }

        for (let i = 0; i < input_size; i++)
        {
            this.weights[i] = random(-1, 1);
        }
    }

    activate()
    {
        if (this.process(input_size) >= 0)
        {
            return 1;
        }
        else
        {
            return -1;
        }
    }
}

function f(x)
{
    let y = (m * x) + b;
    return y;
}

function graph(f, gc)
{
    stroke(0);
    //outer graph lines
    strokeWeight(5);
    line((window.innerWidth / 2) , 0, (window.innerWidth / 2) , window.innerHeight / 2);
    line((window.innerWidth / 2) , window.innerHeight / 2, (window.innerWidth) , window.innerHeight / 2);
    line((window.innerWidth / 2) , 0, (window.innerWidth) , 0);
    line((window.innerWidth) , 0, (window.innerWidth) , window.innerHeight / 2);
    // x and y axis
    strokeWeight(2);
    line((window.innerWidth * (3/4)) , 0, (window.innerWidth * (3/4)) , window.innerHeight / 2);
    line((window.innerWidth / 2) , (window.innerHeight * (1/4)) , window.innerWidth, window.innerHeight * (1/4));
    //graph of function f(x)
    line((window.innerWidth / 2) , (window.innerHeight * (1/4)) - (window.innerHeight * (1/4) * f(-1)), (window.innerWidth) , (window.innerHeight * (1/4) - (window.innerHeight * (1/4) * f(1))));
}


