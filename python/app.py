# You will need request from flask to monitor your traces
from flask import Flask, request

# Add these 3 lines as it is
from apmpythonpackage import apmpythonclass
tracker=apmpythonclass()
tracker.mw_tracer("custom-project", "custom-service")

# for logger
tracker.error('python error log sample')
tracker.debug('ipython debug log sample')
tracker.warn('python warning log sample')
tracker.info('python info log sample')


app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello World!'

@app.route('/exception')
def generate_exception():
    randomList = ['a', 0, 2]

    for entry in randomList:
        try:
            print("The entry is", entry)
            r = 1/int(entry)
            break
        except Exception as e:
            tracker.record_error(e)
    print("The reciprocal of", entry, "is", r)
    return 'Exception Generated!'

if __name__ == '__main__':
    app.run('0.0.0.0')
