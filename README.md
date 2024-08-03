# TraViewl

hotel review search system

# Methods Introduction

![alt text](image-1.png)
![alt text](image.png)

# Demo

![alt text](image-2.png)
![alt text](image-3.png)
![alt text](image-4.png)
![alt text](image-5.png)
![alt text](image-6.png)

# Create history

## frontend

`yarn create react-app frontend --template typescript`

## backend

1. Download pyenv(https://www.maxlist.xyz/2020/04/01/python-pyenv-virtualenv/), then download python3.9.2 in pyenv \
2. Create the environment for python3.9 \
   `python3 -m virtualenv -p ~/.pyenv/versions/3.9.2/bin/python TraViewl-backend-env`
3. Get into the virtual environment \
   `source TraViewl-backend-env/bin/activate`
4. Download flask
   ` pip3 install flask`
5. Download psycopg2
   `pip3 install psycopg2-binary`
   <br>
   <br>

# Start Project

## frontend

`yarn start`

## backend

1. Follow the steps 1, 2, 3 in create history, create the virtual environment
2. Download packages
   ` pip3 install -r requirements.txt`
3. Start the backend server
   ` python3 app.py`
4. Test（you will get an response of "hello world" ）
   `curl http://127.0.0.1:8081/helloWorld`

### Others

- use the venv in jupyter notebook \
   https://anbasile.github.io/posts/2017-06-25-jupyter-venv/
- save packages in requirements.txt \
   `pip3 freeze > requirements.txt `
- activate virtual env \
   `source Traviewl-backend/bin/activate`
- deactivate \
   `deactivate`
- vs code 開後端盡量直接開 backend 的 folder，文字編輯區塊會比較好看到編譯的提示
- vs code terminal 不想一直 activate 可以參考這篇 (https://pythonviz.com/vscode/visual-studio-code-virtual-environment-setup/)
