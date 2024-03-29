# TraViewl

hotel review search system

# Create history

## frontend

`yarn create react-app frontend --template typescript`

## backend

1. 先載 pyenv(https://www.maxlist.xyz/2020/04/01/python-pyenv-virtualenv/)，在pyenv中下載 python3.9.2 的版本 \
2. 建置 python3.9 的環境 \
   `python3 -m virtualenv -p ~/.pyenv/versions/3.9.2/bin/python TraViewl-backend-env`
3. 進入虛擬環境 \
   `source TraViewl-backend-env/bin/activate`
4. 下載 flask
   ` pip3 install flask`
5. 下載 psycopg2
   `pip3 install psycopg2-binary`
   <br>
   <br>

# Start Project

## frontend

`yarn start`

## backend

1. 照 create history 1,2,3 步驟先建置並進入 python 虛擬環境
2. 下載所需套件
   ` pip3 install -r requirements.txt`
3. 打開後端
   ` python3 app.py`
4. 測試（得到 hello world 即可）
   `curl http://127.0.0.1:8081/helloWorld`

### 其他
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
