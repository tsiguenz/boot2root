import turtle as t

if __name__ == "__main__":
    with open("turtle", "r") as file:
        fileContent = file.read()
    colors = ["red", "blue", "green", "brown", "black", "purple", "yellow"]
    lines = fileContent.split("\n")
    i = 0
    t.pensize(10)
    t.color(colors[i])
    for line in lines:
        words = line.split()
        if len(words) == 0:
            i += 1
            t.color(colors[i])
            continue
        match words[0]:
            case "Avance":
                t.forward(int(words[1]))
            case "Recule":
                t.backward(int(words[1]))
            case "Tourne":
                if words[1] == "droite":
                    t.right(int(words[3]))
                if words[1] == "gauche":
                    t.left(int(words[3]))
    t.exitonclick()
