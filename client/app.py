from flask import Flask, render_template, request

app = Flask(__name__, static_folder="static", template_folder="templates")


@app.route("/")
def home():
    model_file = request.args.get(
        "model", "models/tooth-data-T2-14.ply"
    )  # `static/models/` に移動
    return render_template("index.html", model_file=model_file)


if __name__ == "__main__":
    app.run(debug=True)
