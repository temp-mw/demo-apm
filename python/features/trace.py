# You will need request from flask to monitor your traces
from flask import Flask, request

# Add these 3 lines as it is
from apmpythonpackage import apmpythonclass
tracker=apmpythonclass()
tracker.mw_tracer("custom-project", "custom-service")

app = Flask(__name__)

@app.route('/')
def hello_world():
      return 'Hello World!'

if __name__ == '__main__':
    app.run()

