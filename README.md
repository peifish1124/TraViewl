# TraViewl
hotel review search system

# Create history
## frontend
``` yarn create react-app frontend --template typescript ```
## backend
先載pyenv(https://www.maxlist.xyz/2020/04/01/python-pyenv-virtualenv/) \

```python3 -m virtualenv -p ~/.pyenv/versions/3.9.2/bin/python TraViewl-backend-env```
進入虛擬環境
```source TraViewl-backend-env/bin/activate```
``` python3 -m virtualenv Traviewl-backend ```
``` pip3 install -r requirements.txt ```

# start 
## frontend 
```yarn start```
## backend
* save packages \
    ```pip3 freeze > requirements.txt ```
* activate virtual env \
    ```source Traviewl-backend/bin/activate```
* deactivate \
    ```deactivate```



