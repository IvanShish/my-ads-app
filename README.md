# My-ads-app

Веб-приложение с объялениями по типу Авито. Создано в декабре 2021 года. Клиентская часть (папка client) на Ext JS, серверная - на Spring Boot. В качестве БД используется PostgreSQL. 

## Документация

Документация в Postman доступна по ссылке: https://documenter.getpostman.com/view/15653942/UVC2FoPY

## Запуск

Клиент: `.\client\start_watch.bat`

Сервер:

`.\mvnw -DSPRING_DATASOURCE_URL=<url> -DSPRING_DATASOURCE_USERNAME=<username> -DSPRING_DATASOURCE_PASSWORD=<pass> package`

`java -DSPRING_DATASOURCE_URL=<url> -DSPRING_DATASOURCE_USERNAME=<username> -DSPRING_DATASOURCE_PASSWORD=<pass> -jar .\target\my-ads-app-0.0.1-SNAPSHOT.j
ar`
